// اتصال به Google Drive با OAuth «ورود با گوگل» (نه Service Account) — هر خریدار یک OAuth Client خودش را در
// Google Cloud Console می‌سازد (چون Google آدرس بازگشت را از قبل و دقیق می‌خواهد و هر خریدار دامنه‌ی خودش را
// دارد؛ یک OAuth Client مشترک بین همه‌ی خریدارها امکان‌پذیر نیست). فقط با Web Crypto و fetch پیاده شده، پس هم
// روی Worker کلادفلر و هم روی Node (حالت خوداستقرار) بدون هیچ تغییری کار می‌کند.

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

export function buildAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: DRIVE_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

interface TokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

export async function exchangeCodeForTokens(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }).toString(),
  });
  const body = (await res.json().catch(() => ({}))) as TokenResponse;
  if (!res.ok || !body.access_token || !body.refresh_token) {
    throw new Error(body.error_description ?? 'تکمیل ورود با گوگل ناموفق بود — شناسه/کلید کلاینت را بررسی کنید.');
  }
  return { accessToken: body.access_token, refreshToken: body.refresh_token };
}

async function getAccessTokenFromRefreshToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }).toString(),
  });
  const body = (await res.json().catch(() => ({}))) as TokenResponse;
  if (!res.ok || !body.access_token) {
    throw new Error(body.error_description ?? 'تمدید دسترسی گوگل درایو ناموفق بود — شاید لازم باشد دوباره متصل شوید.');
  }
  return body.access_token;
}

async function uploadFile(accessToken: string, folderId: string, filename: string, content: string): Promise<void> {
  const boundary = `behbar-backup-${crypto.randomUUID()}`;
  const metadata: Record<string, unknown> = { name: filename, mimeType: 'application/sql' };
  if (folderId) metadata.parents = [folderId];

  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: application/sql\r\n\r\n${content}\r\n` +
    `--${boundary}--`;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const message = (errBody as { error?: { message?: string } })?.error?.message ?? 'آپلود در Google Drive ناموفق بود.';
    throw new Error(message);
  }
}

export async function backupToDrive(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  folderId: string,
  filename: string,
  content: string,
): Promise<void> {
  const accessToken = await getAccessTokenFromRefreshToken(clientId, clientSecret, refreshToken);
  await uploadFile(accessToken, folderId, filename, content);
}
