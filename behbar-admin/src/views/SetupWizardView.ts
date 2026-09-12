import { icons } from '../components/icons.ts';
import { fetchSettings, updateSetting, updateStaff } from '../utils/api.ts';
import type { StaffInfo } from '../utils/auth.ts';

interface WizardVehicleType {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  basePrice: number;
  perKmRate: number;
  floorCostExempt: boolean;
  active: boolean;
  sortOrder: number;
}

const FALLBACK_VEHICLE_TYPES: WizardVehicleType[] = [
  { id: 'motorcycle', label: 'موتور', labelEn: 'Motorcycle', icon: 'motorcycle', basePrice: 180000, perKmRate: 6000, floorCostExempt: true, active: true, sortOrder: 1 },
  { id: 'pickup', label: 'وانت', labelEn: 'Pickup', icon: 'pickup', basePrice: 950000, perKmRate: 26000, floorCostExempt: false, active: true, sortOrder: 2 },
  { id: 'van', label: 'نیسان', labelEn: 'Van', icon: 'van', basePrice: 1300000, perKmRate: 32000, floorCostExempt: false, active: true, sortOrder: 3 },
  { id: 'light-truck', label: 'خاور', labelEn: 'Light truck', icon: 'lightTruck', basePrice: 2100000, perKmRate: 55000, floorCostExempt: false, active: true, sortOrder: 4 },
  { id: 'truck', label: 'کامیون', labelEn: 'Truck', icon: 'truck', basePrice: 3000000, perKmRate: 90000, floorCostExempt: false, active: true, sortOrder: 5 },
  { id: 'trailer', label: 'تریلی', labelEn: 'Trailer', icon: 'trailer', basePrice: 4500000, perKmRate: 140000, floorCostExempt: false, active: true, sortOrder: 6 },
];

const STEP_COUNT = 8;

export function needsSetupWizard(settings: Record<string, unknown>): boolean {
  const explicit = settings.setup_completed;
  if (typeof explicit === 'boolean') return !explicit;
  const siteName = settings.site_name as { fa?: string } | undefined;
  return !siteName?.fa;
}

export function renderSetupWizardView(): string {
  return `
    <div class="setup-wizard-screen">
      <div class="setup-wizard-card">
        <div class="setup-wizard-progress">
          <div class="setup-wizard-progress-bar"><div class="setup-wizard-progress-fill" id="setup-progress-fill"></div></div>
          <span class="setup-wizard-progress-text" id="setup-progress-text"></span>
        </div>

        <div data-setup-step="0" class="setup-wizard-step setup-wizard-welcome">
          <span class="icon setup-wizard-hero-icon">${icons.settings}</span>
          <h2>به پنل مدیریت خوش آمدید</h2>
          <p>پیش از شروع، چند مرحله‌ی کوتاه اطلاعات اصلی سایتتان را تکمیل کنید. هر مرحله را می‌توانید بعداً هم از «تنظیمات سایت» ویرایش کنید.</p>
        </div>

        <div data-setup-step="1" class="setup-wizard-step" hidden>
          <h2>نام سایت شما چیست؟</h2>
          <div class="form-field">
            <label for="setup-site-name-fa">نام سایت (فارسی)</label>
            <input type="text" id="setup-site-name-fa" placeholder="مثلاً بهبار" />
          </div>
          <div class="form-field">
            <label for="setup-site-name-en">نام سایت (انگلیسی)</label>
            <input type="text" id="setup-site-name-en" dir="ltr" placeholder="e.g. Behbar" />
          </div>
          <p class="error-text" id="setup-site-name-error" hidden>نام فارسی سایت را وارد کنید.</p>
        </div>

        <div data-setup-step="2" class="setup-wizard-step" hidden>
          <h2>لوگوی سایت</h2>
          <div class="form-field">
            <label for="setup-logo-url">آدرس تصویر لوگو (اختیاری)</label>
            <input type="text" id="setup-logo-url" dir="ltr" placeholder="https://.../logo.png" />
          </div>
          <p class="setup-wizard-hint">این را می‌توانید بعداً از «تنظیمات سایت» با آپلود مستقیم هم تغییر دهید.</p>
        </div>

        <div data-setup-step="3" class="setup-wizard-step" hidden>
          <h2>اطلاعات تماس</h2>
          <div class="form-field">
            <label for="setup-phone-display">شماره تماس (نمایشی)</label>
            <input type="text" id="setup-phone-display" dir="ltr" placeholder="021-200200" />
          </div>
          <div class="form-field">
            <label for="setup-phone-tel">لینک شماره‌گیری</label>
            <input type="text" id="setup-phone-tel" dir="ltr" placeholder="tel:+9821200200" />
          </div>
        </div>

        <div data-setup-step="4" class="setup-wizard-step" hidden>
          <h2>شهر مبدأ خدمات</h2>
          <p class="setup-wizard-hint">شهری که کار شما از آن‌جا شروع می‌شود — این شهر در فرم ثبت درخواست مشتریان از پیش انتخاب‌شده نمایش داده می‌شود.</p>
          <div class="settings-form-grid">
            <div class="form-field">
              <label for="setup-origin-province">استان</label>
              <input type="text" id="setup-origin-province" placeholder="مثلاً تهران" />
            </div>
            <div class="form-field">
              <label for="setup-origin-city">شهر</label>
              <input type="text" id="setup-origin-city" placeholder="مثلاً تهران" />
            </div>
          </div>
          <p class="setup-wizard-hint">این مرحله اختیاری است — اگر خالی بگذارید، مشتریان از بین همه‌ی شهرهای ایران انتخاب می‌کنند.</p>
        </div>

        <div data-setup-step="5" class="setup-wizard-step" hidden>
          <h2>قیمت پایه‌ی وسایل نقلیه</h2>
          <p class="setup-wizard-hint">این اعداد فقط یک نقطه‌ی شروع هستند؛ هر زمان از «ناوگان → تعریف وسیله» قابل تغییرند.</p>
          <div id="setup-vehicle-list" class="setup-wizard-vehicle-list"></div>
        </div>

        <div data-setup-step="6" class="setup-wizard-step" hidden>
          <h2>رمز عبور حساب مدیر</h2>
          <p class="setup-wizard-hint">برای امنیت بیشتر، رمز پیش‌فرض را همین حالا عوض کنید (اختیاری).</p>
          <div class="form-field">
            <label for="setup-new-password">رمز عبور جدید</label>
            <input type="password" id="setup-new-password" autocomplete="new-password" />
          </div>
          <div class="form-field">
            <label for="setup-confirm-password">تکرار رمز عبور</label>
            <input type="password" id="setup-confirm-password" autocomplete="new-password" />
          </div>
          <p class="error-text" id="setup-password-error" hidden></p>
        </div>

        <div data-setup-step="7" class="setup-wizard-step setup-wizard-welcome" hidden>
          <span class="icon setup-wizard-hero-icon setup-wizard-done-icon">${icons.checkCircle}</span>
          <h2>آماده‌اید!</h2>
          <p>سایت شما تنظیم شد. می‌توانید همین حالا کار را شروع کنید و هر زمان خواستید این اطلاعات را از «تنظیمات سایت» تغییر دهید.</p>
        </div>

        <p class="error-text" id="setup-general-error" hidden></p>

        <div class="setup-wizard-footer">
          <button type="button" class="setup-wizard-skip-link" id="setup-skip-all">بعداً، رفتن به پنل</button>
          <div class="setup-wizard-nav-buttons">
            <button type="button" class="btn btn-secondary" id="setup-back" hidden>قبلی</button>
            <button type="button" class="btn btn-primary" id="setup-next">بعدی</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSetupWizardView(staff: StaffInfo, onDone: (skippedOnly: boolean) => void): void {
  const card = document.querySelector('.setup-wizard-card');
  const progressFill = document.getElementById('setup-progress-fill');
  const progressText = document.getElementById('setup-progress-text');
  const backBtn = document.getElementById('setup-back') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('setup-next') as HTMLButtonElement | null;
  const skipAllBtn = document.getElementById('setup-skip-all') as HTMLButtonElement | null;
  const generalError = document.getElementById('setup-general-error');
  const vehicleListEl = document.getElementById('setup-vehicle-list');

  if (!card || !progressFill || !progressText || !backBtn || !nextBtn || !skipAllBtn || !generalError || !vehicleListEl) return;

  let currentStep = 0;
  let settings: Record<string, unknown> = {};
  let vehicleTypes: WizardVehicleType[] = FALLBACK_VEHICLE_TYPES;

  function renderVehicleList(): void {
    vehicleListEl!.innerHTML = vehicleTypes
      .map(
        (v, i) => `
        <div class="setup-wizard-vehicle-row">
          <span class="setup-wizard-vehicle-label">${v.label}</span>
          <div class="form-field">
            <label>قیمت پایه (تومان)</label>
            <input type="number" min="0" step="1000" data-vehicle-base-price="${i}" value="${v.basePrice}" />
          </div>
          <div class="form-field">
            <label>هر کیلومتر (تومان)</label>
            <input type="number" min="0" step="1000" data-vehicle-per-km="${i}" value="${v.perKmRate}" />
          </div>
        </div>
      `,
      )
      .join('');
  }

  function updateStepUI(): void {
    document.querySelectorAll<HTMLElement>('[data-setup-step]').forEach((el) => {
      el.hidden = el.dataset.setupStep !== String(currentStep);
    });
    progressFill!.style.width = `${((currentStep + 1) / STEP_COUNT) * 100}%`;
    progressText!.textContent = `مرحله ${currentStep + 1} از ${STEP_COUNT}`;
    backBtn!.hidden = currentStep === 0;
    nextBtn!.textContent = currentStep === STEP_COUNT - 1 ? 'شروع کار با پنل' : currentStep === 0 ? 'شروع' : 'بعدی';
    generalError!.hidden = true;
  }

  async function saveCurrentStep(): Promise<boolean> {
    generalError!.hidden = true;
    try {
      if (currentStep === 1) {
        const fa = (document.getElementById('setup-site-name-fa') as HTMLInputElement).value.trim();
        const en = (document.getElementById('setup-site-name-en') as HTMLInputElement).value.trim();
        const errorEl = document.getElementById('setup-site-name-error')!;
        if (!fa) {
          errorEl.hidden = false;
          return false;
        }
        errorEl.hidden = true;
        await updateSetting('site_name', { fa, en });
      } else if (currentStep === 2) {
        const logoUrl = (document.getElementById('setup-logo-url') as HTMLInputElement).value.trim();
        if (logoUrl) {
          const branding = (settings.branding as { logoUrl?: string; faviconUrl?: string } | undefined) ?? {};
          await updateSetting('branding', { ...branding, logoUrl });
        }
      } else if (currentStep === 3) {
        const phoneDisplay = (document.getElementById('setup-phone-display') as HTMLInputElement).value.trim();
        const phoneTelHref = (document.getElementById('setup-phone-tel') as HTMLInputElement).value.trim();
        if (phoneDisplay || phoneTelHref) {
          const contact = (settings.contact as Record<string, unknown> | undefined) ?? {};
          await updateSetting('contact', { ...contact, phoneDisplay, phoneTelHref });
        }
      } else if (currentStep === 4) {
        const province = (document.getElementById('setup-origin-province') as HTMLInputElement).value.trim();
        const city = (document.getElementById('setup-origin-city') as HTMLInputElement).value.trim();
        if (city && province) {
          const cities = (settings.service_cities as Record<string, unknown> | undefined) ?? {};
          await updateSetting('service_cities', {
            coverageMode: 'all',
            destinationCities: [],
            internationalShippingEnabled: false,
            ...cities,
            originCity: { city, cityEn: '', province, provinceEn: '' },
          });
        }
      } else if (currentStep === 5) {
        const updated = vehicleTypes.map((v, i) => ({
          ...v,
          basePrice: Number(vehicleListEl!.querySelector<HTMLInputElement>(`[data-vehicle-base-price="${i}"]`)?.value) || v.basePrice,
          perKmRate: Number(vehicleListEl!.querySelector<HTMLInputElement>(`[data-vehicle-per-km="${i}"]`)?.value) || v.perKmRate,
        }));
        await updateSetting('vehicle_types', updated);
      } else if (currentStep === 6) {
        const pw = (document.getElementById('setup-new-password') as HTMLInputElement).value;
        const confirm = (document.getElementById('setup-confirm-password') as HTMLInputElement).value;
        const errorEl = document.getElementById('setup-password-error')!;
        if (pw || confirm) {
          if (pw.length < 6) {
            errorEl.hidden = false;
            errorEl.textContent = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
            return false;
          }
          if (pw !== confirm) {
            errorEl.hidden = false;
            errorEl.textContent = 'رمز عبور و تکرار آن یکسان نیستند.';
            return false;
          }
          errorEl.hidden = true;
          await updateStaff(staff.id, { password: pw });
        }
      } else if (currentStep === 7) {
        await updateSetting('setup_completed', true);
      }
      return true;
    } catch (err) {
      generalError!.hidden = false;
      generalError!.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
      return false;
    }
  }

  nextBtn.addEventListener('click', async () => {
    nextBtn!.disabled = true;
    const ok = await saveCurrentStep();
    nextBtn!.disabled = false;
    if (!ok) return;

    if (currentStep === STEP_COUNT - 1) {
      onDone(false);
      return;
    }
    currentStep += 1;
    updateStepUI();
  });

  backBtn.addEventListener('click', () => {
    if (currentStep === 0) return;
    currentStep -= 1;
    updateStepUI();
  });

  skipAllBtn.addEventListener('click', async () => {
    skipAllBtn!.disabled = true;
    try {
      await updateSetting('setup_completed', true);
    } catch {
      // اگر ذخیره‌ی این پرچم شکست بخورد هم اجازه می‌دهیم کاربر وارد پنل شود؛
      // فقط ویزارد ممکن است دفعه‌ی بعد دوباره نمایش داده شود.
    }
    onDone(true);
  });

  fetchSettings()
    .then((fetched) => {
      settings = fetched;
      const siteName = (settings.site_name as { fa?: string; en?: string } | undefined) ?? {};
      (document.getElementById('setup-site-name-fa') as HTMLInputElement).value = siteName.fa ?? '';
      (document.getElementById('setup-site-name-en') as HTMLInputElement).value = siteName.en ?? '';

      const branding = (settings.branding as { logoUrl?: string } | undefined) ?? {};
      (document.getElementById('setup-logo-url') as HTMLInputElement).value = branding.logoUrl ?? '';

      const contact = (settings.contact as { phoneDisplay?: string; phoneTelHref?: string } | undefined) ?? {};
      (document.getElementById('setup-phone-display') as HTMLInputElement).value = contact.phoneDisplay ?? '';
      (document.getElementById('setup-phone-tel') as HTMLInputElement).value = contact.phoneTelHref ?? '';

      const cities = settings.service_cities as { originCity?: { city?: string; province?: string } } | undefined;
      (document.getElementById('setup-origin-province') as HTMLInputElement).value = cities?.originCity?.province ?? '';
      (document.getElementById('setup-origin-city') as HTMLInputElement).value = cities?.originCity?.city ?? '';

      const existingVehicles = settings.vehicle_types as WizardVehicleType[] | undefined;
      vehicleTypes = existingVehicles && existingVehicles.length ? existingVehicles : FALLBACK_VEHICLE_TYPES;
      renderVehicleList();
    })
    .catch(() => {
      renderVehicleList();
    });

  updateStepUI();
}
