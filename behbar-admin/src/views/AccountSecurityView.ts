import { getStaff } from '../utils/auth.ts';
import { setupSmsTwoFactor, confirmSmsTwoFactor, disableTwoFactor } from '../utils/api.ts';
import { renderOtpInputMarkup, initOtpInput } from '../components/OtpInput.ts';

// این صفحه خودسرویس است — هر کارمند فقط روی حساب خودش کار می‌کند، نه نیاز به مجوز خاصی (شبیه staffMe
// سمت سرور).
export function renderAccountSecurityView(): string {
  const staff = getStaff();
  const enabled = staff?.twoFactorEnabled ?? false;

  return `
    <div class="settings-view">
      <div class="settings-panel">
        <h2>امنیت حساب</h2>
        <p class="settings-panel-hint">ورود دومرحله‌ای، لایه‌ی امنیتی اضافه‌ای است — حتی اگر رمز عبورتان لو برود، ورود بدون کد پیامکی ممکن نیست.</p>

        <div class="editor-sidebar-card" id="account-security-status-card">
          ${
            enabled
              ? `
            <p><strong>وضعیت فعلی:</strong> ورود دومرحله‌ای پیامکی فعال است.</p>
            <form id="account-security-disable-form" style="display:flex; flex-direction:column; gap: var(--space-3);">
              <div class="form-field">
                <label for="account-security-disable-password">برای غیرفعال‌سازی، رمز عبور فعلی را وارد کنید</label>
                <input type="password" id="account-security-disable-password" autocomplete="current-password" required />
              </div>
              <p class="error-text" id="account-security-disable-error" hidden></p>
              <button type="submit" class="btn btn-ghost" id="account-security-disable-btn">غیرفعال‌سازی ورود دومرحله‌ای</button>
            </form>
          `
              : `
            <p><strong>وضعیت فعلی:</strong> ورود دومرحله‌ای فعال نیست.</p>
            <button type="button" class="btn btn-primary" id="account-security-start-sms">فعال‌سازی ورود دومرحله‌ای پیامکی</button>
          `
          }
        </div>

        <div class="editor-sidebar-card" id="account-security-sms-setup-card" hidden>
          <p>یک کد ۶رقمی به شماره‌ی ثبت‌شده‌ی شما پیامک شد.</p>
          ${renderOtpInputMarkup('account-security-sms')}
          <p class="error-text" id="account-security-sms-error" hidden></p>
          <p class="login-2fa-verifying" id="account-security-sms-verifying" hidden>در حال تأیید...</p>
        </div>
      </div>
    </div>
  `;
}

export function initAccountSecurityView(): void {
  const statusCard = document.getElementById('account-security-status-card');
  const smsCard = document.getElementById('account-security-sms-setup-card');

  const smsErrorEl = document.getElementById('account-security-sms-error')!;
  const smsVerifyingEl = document.getElementById('account-security-sms-verifying')!;

  async function confirmCode(code: string, otpHandle: ReturnType<typeof initOtpInput>): Promise<void> {
    smsErrorEl.hidden = true;
    smsVerifyingEl.hidden = false;
    try {
      await confirmSmsTwoFactor(code);
      window.location.reload();
    } catch (err) {
      smsVerifyingEl.hidden = true;
      smsErrorEl.hidden = false;
      smsErrorEl.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
      otpHandle?.reset();
    }
  }

  document.getElementById('account-security-start-sms')?.addEventListener('click', () => {
    void (async () => {
      try {
        await setupSmsTwoFactor();
        statusCard!.hidden = true;
        smsCard!.hidden = false;
        const otpHandle = initOtpInput('account-security-sms', {
          onComplete: (code) => void confirmCode(code, otpHandle),
          onResend: () => void setupSmsTwoFactor().catch((err) => window.alert(err instanceof Error ? err.message : 'ارسال دوباره‌ی کد ناموفق بود.')),
        });
      } catch (err) {
        window.alert(err instanceof Error ? err.message : 'خطایی پیش آمد.');
      }
    })();
  });

  document.getElementById('account-security-disable-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById('account-security-disable-password') as HTMLInputElement;
    const errorEl = document.getElementById('account-security-disable-error')!;
    void (async () => {
      errorEl.hidden = true;
      try {
        await disableTwoFactor(passwordInput.value);
        window.location.reload();
      } catch (err) {
        errorEl.hidden = false;
        errorEl.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
      }
    })();
  });
}
