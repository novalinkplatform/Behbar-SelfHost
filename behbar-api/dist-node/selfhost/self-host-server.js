import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { SqliteD1, bootstrapIfEmpty, applyPendingSelfhostMigrations, ensureDataDir } from "./sqlite-d1.js";
import { LocalMediaBucket } from "./local-media.js";
import { toFetchRequest, sendFetchResponse } from "./http-adapter.js";
import { handleRequest, runDailyScheduledTasks, registerTrialLicenseIfNeeded } from "../index.js";
import { configureAllowedOrigins } from "../cors.js";
import { generateSalt, hashPassword } from "../auth.js";
const PORT = Number(process.env.PORT ?? 8787);
const DATA_DIR = process.env.DATA_DIR ?? '/data';
const DB_PATH = path.join(DATA_DIR, 'behbar.db');
const MEDIA_DIR = path.join(DATA_DIR, 'media');
const CREDENTIALS_PATH = path.join(DATA_DIR, 'admin-credentials.txt');
// این کد لایسنس‌منیجرِ فروشنده است؛ خریدارها نباید آن را عوض کنند مگر با یک SETUP دیگر توافق شده باشد.
const LICENSE_API_URL = process.env.LICENSE_API_URL ?? 'https://license.behbarapp.ir';
const SITE_ORIGIN = process.env.SITE_ORIGIN;
if (!SITE_ORIGIN) {
    console.error('SITE_ORIGIN باید تنظیم شده باشد.');
    process.exit(1);
}
// پنل مدیریت حالا زیر همان دامنه، روی مسیر /management سرو می‌شود — پس هم‌مبدأ با سایت است.
// ADMIN_ORIGIN فقط برای سازگاری با نصب‌های قدیمی‌تر (دو دامنه‌ی جدا) که هنوز این متغیر را
// صریحاً می‌فرستند نگه داشته شده؛ اگر نباشد، به همان SITE_ORIGIN می‌افتد.
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN ?? SITE_ORIGIN;
configureAllowedOrigins([SITE_ORIGIN, ADMIN_ORIGIN]);
ensureDataDir(DB_PATH);
const sqlite = new SqliteD1(DB_PATH);
await bootstrapIfEmpty(sqlite, process.cwd());
await applyPendingSelfhostMigrations(sqlite);
const env = {
    DB: sqlite,
    MEDIA: new LocalMediaBucket(MEDIA_DIR),
    ALLOWED_ORIGIN: SITE_ORIGIN,
    ADMIN_PASSWORD: '',
    SESSION_SECRET: '',
    LICENSE_API_URL,
    RUNTIME: 'selfhost',
};
function randomPassword() {
    return randomBytes(12).toString('base64url');
}
async function createFirstAdminIfNeeded() {
    const existing = await sqlite.prepare('SELECT id FROM staff LIMIT 1').first();
    if (existing)
        return;
    const username = 'admin';
    const password = randomPassword();
    const salt = generateSalt();
    const hash = await hashPassword(password, salt);
    await sqlite
        .prepare('INSERT INTO staff (username, password_hash, password_salt, full_name, role, phone, is_active) VALUES (?,?,?,?,?,?,?)')
        .bind(username, hash, salt, 'مدیر سیستم', 'admin', null, 1)
        .run();
    const message = [
        '',
        '================================================================',
        ' نصب بهبار کامل شد — حساب مدیر اولیه ساخته شد:',
        '',
        `   نام کاربری : ${username}`,
        `   رمز عبور   : ${password}`,
        '',
        ' این رمز فقط همین یک‌بار نمایش داده می‌شود — همین حالا جایی امن ذخیره‌اش کنید.',
        ` (همچنین در فایل ${CREDENTIALS_PATH} داخل کانتینر ذخیره شد.)`,
        '================================================================',
        '',
    ].join('\n');
    console.log(message);
    writeFileSync(CREDENTIALS_PATH, `username: ${username}\npassword: ${password}\n`, { mode: 0o600 });
}
await createFirstAdminIfNeeded();
// اگر هنوز هیچ لایسنسی (نه آزمایشی، نه واقعی) ثبت نشده، یک اشتراک آزمایشی یک‌هفته‌ای واقعی از
// License-Manager می‌گیرد. بی‌سروصدا شکست می‌خورد و هرگز بالا آمدن سرور را متوقف نمی‌کند — قطعی شبکه
// در لحظه‌ی بوت یعنی صرفاً تلاش بعدی (بوت بعدی همین کانتینر) دوباره امتحان می‌شود.
await registerTrialLicenseIfNeeded(env);
// چک روزانه‌ی اعتبار لایسنس + بک‌آپ گوگل درایو (در صورت فعال بودن) — معادل خودمختار همان کرون روزانه‌ای
// که روی کلادفلر با triggers.crons تعریف شده.
void runDailyScheduledTasks(env);
setInterval(() => void runDailyScheduledTasks(env), 24 * 60 * 60 * 1000);
const server = createServer((req, res) => {
    void (async () => {
        try {
            const request = await toFetchRequest(req, `http://localhost:${PORT}`);
            const response = await handleRequest(request, env);
            await sendFetchResponse(res, response);
        }
        catch (err) {
            console.error('request handling failed:', err);
            if (!res.headersSent)
                res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'خطای داخلی سرور.' }));
        }
    })();
});
server.listen(PORT, () => {
    console.log(`behbar-api (self-host) listening on :${PORT}`);
    console.log(`  site origin:  ${SITE_ORIGIN}`);
    console.log(`  admin origin: ${ADMIN_ORIGIN}`);
});
