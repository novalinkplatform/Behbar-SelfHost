import { icons } from '../components/icons.ts';
import {
  fetchFleetVehicles,
  createFleetVehicle,
  updateFleetVehicle,
  deleteFleetVehicle,
  fetchStaff,
  fetchSettings,
  updateSetting,
} from '../utils/api.ts';
import type { FleetVehicle, StaffRecord } from '../utils/api.ts';
import { ensureLanguageMode, applyLanguageVisibility } from '../utils/languageMode.ts';

interface VehicleType {
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

const VEHICLE_ICONS = ['motorcycle', 'pickup', 'van', 'lightTruck', 'truck', 'trailer'];

interface ServiceCity {
  city: string;
  cityEn: string;
  province: string;
  provinceEn: string;
}

const DEFAULT_VEHICLE_TYPES = [
  { id: 'motorcycle', label: 'موتور' },
  { id: 'pickup', label: 'وانت' },
  { id: 'van', label: 'نیسان' },
  { id: 'light-truck', label: 'خاور' },
  { id: 'truck', label: 'کامیون' },
];

const STATUS_OPTIONS: { id: FleetVehicle['status']; label: string }[] = [
  { id: 'active', label: 'فعال' },
  { id: 'inactive', label: 'غیرفعال' },
  { id: 'in_repair', label: 'در حال تعمیر' },
];

const STATUS_LABELS: Record<string, string> = Object.fromEntries(STATUS_OPTIONS.map((s) => [s.id, s.label]));

function statusBadgeClass(status: string): string {
  if (status === 'active') return 'article-status-published';
  if (status === 'in_repair') return 'article-status-busy';
  return 'article-status-draft';
}

function renderRow(v: FleetVehicle, typeLabels: Record<string, string>): string {
  return `
    <tr data-vehicle-row="${v.id}">
      <td>${v.label}</td>
      <td>${typeLabels[v.type] ?? v.type}</td>
      <td dir="ltr">${v.plateNumber ?? '—'}</td>
      <td>${v.model ?? '—'}</td>
      <td>${v.driverName ?? '—'}</td>
      <td><span class="article-status-badge ${statusBadgeClass(v.status)}">${STATUS_LABELS[v.status] ?? v.status}</span></td>
      <td class="staff-table-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-edit-vehicle="${v.id}">ویرایش</button>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-vehicle="${v.id}">حذف</button>
      </td>
    </tr>
  `;
}

function renderForm(): string {
  return `
    <div class="editor-sidebar-card" id="vehicle-form-card" hidden>
      <h3 id="vehicle-form-title">وسیله جدید</h3>
      <input type="hidden" id="vehicle-form-id" />
      <div class="staff-form-grid">
        <div class="form-field">
          <label for="vehicle-label">عنوان (مثلاً «نیسان شماره ۱»)</label>
          <input type="text" id="vehicle-label" required />
        </div>
        <div class="form-field">
          <label for="vehicle-type">نوع</label>
          <select id="vehicle-type"></select>
        </div>
        <div class="form-field">
          <label for="vehicle-plate">شماره پلاک</label>
          <input type="text" id="vehicle-plate" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="vehicle-model">مدل</label>
          <input type="text" id="vehicle-model" />
        </div>
        <div class="form-field">
          <label for="vehicle-year">سال ساخت</label>
          <input type="number" id="vehicle-year" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="vehicle-status">وضعیت</label>
          <select id="vehicle-status">
            ${STATUS_OPTIONS.map((s) => `<option value="${s.id}">${s.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label for="vehicle-driver">راننده</label>
          <select id="vehicle-driver"></select>
        </div>
      </div>
      <div class="form-field">
        <label for="vehicle-notes">یادداشت</label>
        <textarea id="vehicle-notes" rows="2"></textarea>
      </div>
      <p class="error-text" id="vehicle-form-error" hidden></p>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="vehicle-form-cancel">انصراف</button>
        <button type="button" class="btn btn-primary" id="vehicle-form-submit">ایجاد وسیله</button>
      </div>
    </div>
  `;
}

function renderVehicleTypesPanel(): string {
  return `
    <div id="vehicle-types-list"></div>
    <button type="button" class="btn btn-secondary" id="vehicle-type-add-btn">
      <span class="icon">${icons.plusCircle}</span>
      افزودن وسیله
    </button>
    <div class="settings-panel-footer">
      <button type="button" class="btn btn-primary" id="vehicle-type-save-btn">ذخیره وسیله‌ها</button>
    </div>
  `;
}

export function renderFleetView(): string {
  return `
    <div class="view-header">
      <h1>ناوگان</h1>
    </div>

    <div class="settings-tabs">
      <button type="button" class="settings-tab is-active" data-fleet-tab="vehicles">ناوگان</button>
      <button type="button" class="settings-tab" data-fleet-tab="types">تعریف وسیله</button>
      <button type="button" class="settings-tab" data-fleet-tab="cities">شهرها</button>
      <button type="button" class="settings-tab" data-fleet-tab="categories">دسته‌بندی خدمات</button>
    </div>

    <div data-fleet-panel="vehicles">
      <div class="editor-header-actions" style="margin-bottom: var(--space-4)">
        <button type="button" class="btn btn-primary" id="vehicle-add-toggle">
          <span class="icon">${icons.plusCircle}</span>
          وسیله جدید
        </button>
      </div>
      ${renderForm()}
      <p class="error-text" id="vehicles-error" hidden></p>
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>نوع</th>
              <th>پلاک</th>
              <th>مدل</th>
              <th>راننده</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody id="vehicles-table-body"></tbody>
        </table>
      </div>
    </div>

    <div data-fleet-panel="types" hidden>
      <p class="error-text" id="vehicle-types-error" hidden></p>
      <p class="settings-saved-note" id="vehicle-types-saved-note" hidden>ذخیره شد.</p>
      ${renderVehicleTypesPanel()}
    </div>

    <div data-fleet-panel="cities" hidden>
      <p class="error-text" id="cities-error" hidden></p>
      <p class="settings-saved-note" id="cities-saved-note" hidden>ذخیره شد.</p>

      <div class="editor-sidebar-card">
        <h3>شهر مبدأ (مرکز ثابت)</h3>
        <p class="settings-panel-hint">
          اگر اینجا شهری مشخص کنید، همان شهر در فرم ثبت درخواست به‌عنوان مبدأ از پیش انتخاب‌شده نمایش داده می‌شود
          (خدمات شما همیشه از همان شهر آغاز می‌شود). اگر خالی بگذارید، مشتری خودش مبدأ را از بین همه‌ی شهرهای ایران انتخاب می‌کند.
        </p>
        <div class="settings-form-grid">
          <div class="form-field" data-i18n="fa"><label for="origin-city-fa">شهر (فارسی)</label><input type="text" id="origin-city-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="origin-city-en">شهر (انگلیسی)</label><input type="text" id="origin-city-en" dir="ltr" /></div>
          <div class="form-field" data-i18n="fa"><label for="origin-province-fa">استان (فارسی)</label><input type="text" id="origin-province-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="origin-province-en">استان (انگلیسی)</label><input type="text" id="origin-province-en" dir="ltr" /></div>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <h3>پوشش شهرهای مقصد</h3>
        <div class="form-field" style="max-width: 280px">
          <label for="coverage-mode">مقصدهای قابل‌انتخاب برای مشتری</label>
          <select id="coverage-mode">
            <option value="all">همه‌ی ایران</option>
            <option value="selected">فقط شهرهای مشخص‌شده در پایین</option>
          </select>
        </div>
        <div id="destination-cities-section">
          <div id="cities-list"></div>
          <button type="button" class="btn btn-secondary" id="city-add-btn">
            <span class="icon">${icons.plusCircle}</span>
            افزودن شهر
          </button>
        </div>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="service_cities">ذخیره تنظیمات شهرها</button>
      </div>
    </div>

    <div data-fleet-panel="categories" hidden>
      <p class="error-text" id="categories-error" hidden></p>
      <p class="settings-saved-note" id="categories-saved-note" hidden>ذخیره شد.</p>

      <div class="editor-sidebar-card">
        <h3>دسته‌بندی‌های خدمات</h3>
        <p class="settings-panel-hint">
          اگر کسب‌وکار شما فقط بخشی از این خدمات را ارائه می‌دهد، بقیه را غیرفعال کنید تا اصلاً به مشتری نشان داده نشوند.
        </p>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="category-domestic-enabled" />
          ثبت بارهای داخلی (باربری) فعال باشد
        </label>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="category-moving-enabled" />
          ثبت بار اسباب‌کشی فعال باشد
        </label>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="international-shipping-enabled" />
          ثبت بارهای ترانزیت (حمل و نقل بین‌المللی) فعال باشد — یک فیلد انتخاب کشور مبدأ/مقصد هم به فرم ثبت درخواست اضافه می‌شود
        </label>
        <p class="settings-panel-hint">
          توجه: اگر یک دسته را فعال نگه دارید ولی در تب «تعریف وسیله» هیچ وسیله‌ی فعالی برایش نماند،
          آن دسته باز هم به‌صورت خودکار از فرم ثبت درخواست مشتری حذف می‌شود.
        </p>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="service_categories">ذخیره دسته‌بندی‌ها</button>
      </div>
    </div>
  `;
}

export function initFleetView(): void {
  const addToggleBtn = document.getElementById('vehicle-add-toggle') as HTMLButtonElement | null;
  const formCard = document.getElementById('vehicle-form-card');
  const formTitle = document.getElementById('vehicle-form-title');
  const cancelBtn = document.getElementById('vehicle-form-cancel');
  const formError = document.getElementById('vehicle-form-error');
  const submitBtn = document.getElementById('vehicle-form-submit') as HTMLButtonElement | null;
  const idInput = document.getElementById('vehicle-form-id') as HTMLInputElement | null;
  const labelInput = document.getElementById('vehicle-label') as HTMLInputElement | null;
  const typeSelect = document.getElementById('vehicle-type') as HTMLSelectElement | null;
  const plateInput = document.getElementById('vehicle-plate') as HTMLInputElement | null;
  const modelInput = document.getElementById('vehicle-model') as HTMLInputElement | null;
  const yearInput = document.getElementById('vehicle-year') as HTMLInputElement | null;
  const statusSelect = document.getElementById('vehicle-status') as HTMLSelectElement | null;
  const driverSelect = document.getElementById('vehicle-driver') as HTMLSelectElement | null;
  const notesInput = document.getElementById('vehicle-notes') as HTMLTextAreaElement | null;
  const errorEl = document.getElementById('vehicles-error');
  const tableBody = document.getElementById('vehicles-table-body');

  if (
    !addToggleBtn ||
    !formCard ||
    !formTitle ||
    !cancelBtn ||
    !formError ||
    !submitBtn ||
    !idInput ||
    !labelInput ||
    !typeSelect ||
    !plateInput ||
    !modelInput ||
    !yearInput ||
    !statusSelect ||
    !driverSelect ||
    !notesInput ||
    !errorEl ||
    !tableBody
  ) {
    return;
  }

  let vehicles: FleetVehicle[] = [];
  let staff: StaffRecord[] = [];
  let typeLabels: Record<string, string> = Object.fromEntries(DEFAULT_VEHICLE_TYPES.map((t) => [t.id, t.label]));
  let vehicleTypes: VehicleType[] = [];
  let settings: Record<string, unknown> = {};
  let destinationCities: ServiceCity[] = [];
  let originCity: ServiceCity = { city: '', cityEn: '', province: '', provinceEn: '' };
  let coverageMode: 'all' | 'selected' = 'all';
  let categoryDomesticEnabled = true;
  let categoryMovingEnabled = true;
  let internationalShippingEnabled = false;

  void ensureLanguageMode().then(() => applyLanguageVisibility(document.getElementById('view-container') ?? document.body));

  document.querySelectorAll<HTMLButtonElement>('[data-fleet-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-fleet-tab]').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelectorAll<HTMLElement>('[data-fleet-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.fleetPanel !== tab.dataset.fleetTab;
      });
    });
  });

  function renderVehicleTypesList(): void {
    const list = document.getElementById('vehicle-types-list');
    if (!list) return;
    list.innerHTML = vehicleTypes
      .map(
        (v, i) => `
      <div class="block-editor" data-vehicle-type-index="${i}">
        <div class="block-editor-head">
          <span class="block-editor-type">وسیله ${i + 1}</span>
          <div class="block-editor-actions">
            <label class="settings-inline-toggle"><input type="checkbox" data-field="active" ${v.active ? 'checked' : ''} /> فعال</label>
            <button type="button" class="btn btn-ghost btn-sm" data-remove-vehicle-type="${i}">حذف</button>
          </div>
        </div>
        <div class="block-editor-body">
          <div class="settings-form-grid">
            <div class="form-field" data-i18n="fa"><label>نام (فارسی)</label><input type="text" data-field="label" value="${v.label}" /></div>
            <div class="form-field" data-i18n="en"><label>نام (انگلیسی)</label><input type="text" dir="ltr" data-field="labelEn" value="${v.labelEn}" /></div>
            <div class="form-field"><label>آیکون</label>
              <select data-field="icon">
                ${VEHICLE_ICONS.map((icon) => `<option value="${icon}" ${icon === v.icon ? 'selected' : ''}>${icon}</option>`).join('')}
              </select>
            </div>
            <div class="form-field"><label>قیمت پایه (تومان)</label><input type="number" data-field="basePrice" value="${v.basePrice}" /></div>
            <div class="form-field"><label>نرخ هر کیلومتر (تومان)</label><input type="number" data-field="perKmRate" value="${v.perKmRate}" /></div>
          </div>
        </div>
      </div>
    `,
      )
      .join('');
    applyLanguageVisibility(list);
  }

  function readVehicleTypesFromDom(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-vehicle-type-index]'));
    vehicleTypes = els.map((el, i) => ({
      id: vehicleTypes[i]?.id ?? `vehicle-${crypto.randomUUID().slice(0, 8)}`,
      label: el.querySelector<HTMLInputElement>('[data-field="label"]')!.value,
      labelEn: el.querySelector<HTMLInputElement>('[data-field="labelEn"]')!.value,
      icon: el.querySelector<HTMLSelectElement>('[data-field="icon"]')!.value,
      basePrice: Number(el.querySelector<HTMLInputElement>('[data-field="basePrice"]')!.value) || 0,
      perKmRate: Number(el.querySelector<HTMLInputElement>('[data-field="perKmRate"]')!.value) || 0,
      floorCostExempt: vehicleTypes[i]?.floorCostExempt ?? false,
      active: el.querySelector<HTMLInputElement>('[data-field="active"]')!.checked,
      sortOrder: i + 1,
    }));
  }

  document.getElementById('vehicle-types-list')?.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-vehicle-type]');
    if (!btn) return;
    readVehicleTypesFromDom();
    vehicleTypes.splice(Number(btn.dataset.removeVehicleType), 1);
    renderVehicleTypesList();
  });

  document.getElementById('vehicle-type-add-btn')?.addEventListener('click', () => {
    readVehicleTypesFromDom();
    vehicleTypes.push({
      id: `vehicle-${crypto.randomUUID().slice(0, 8)}`,
      label: '',
      labelEn: '',
      icon: 'van',
      basePrice: 0,
      perKmRate: 0,
      floorCostExempt: false,
      active: true,
      sortOrder: vehicleTypes.length + 1,
    });
    renderVehicleTypesList();
  });

  document.getElementById('vehicle-type-save-btn')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const savedNote = document.getElementById('vehicle-types-saved-note');
    const typesError = document.getElementById('vehicle-types-error');
    btn.disabled = true;
    try {
      readVehicleTypesFromDom();
      await updateSetting('vehicle_types', vehicleTypes);
      if (savedNote) {
        savedNote.hidden = false;
        window.setTimeout(() => (savedNote.hidden = true), 2500);
      }
    } catch (err) {
      if (typesError) {
        typesError.hidden = false;
        typesError.textContent = err instanceof Error ? err.message : 'ذخیره ناموفق بود.';
      }
    } finally {
      btn.disabled = false;
    }
  });

  // ----- شهرها -----
  function renderCities(): void {
    const list = document.getElementById('cities-list')!;
    list.innerHTML = destinationCities
      .map(
        (c, i) => `
      <div class="settings-form-grid" data-city-index="${i}">
        <div class="form-field" data-i18n="fa"><label>شهر (فارسی)</label><input type="text" data-field="city" value="${c.city}" /></div>
        <div class="form-field" data-i18n="en"><label>شهر (انگلیسی)</label><input type="text" dir="ltr" data-field="cityEn" value="${c.cityEn}" /></div>
        <div class="form-field" data-i18n="fa"><label>استان (فارسی)</label><input type="text" data-field="province" value="${c.province}" /></div>
        <div class="form-field" data-i18n="en"><label>استان (انگلیسی)</label><input type="text" dir="ltr" data-field="provinceEn" value="${c.provinceEn}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-city="${i}">حذف</button>
      </div>
    `,
      )
      .join('');
    applyLanguageVisibility(list);
  }

  function readCitiesFromDom(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-city-index]'));
    destinationCities = els.map((el) => ({
      city: el.querySelector<HTMLInputElement>('[data-field="city"]')!.value,
      cityEn: el.querySelector<HTMLInputElement>('[data-field="cityEn"]')!.value,
      province: el.querySelector<HTMLInputElement>('[data-field="province"]')!.value,
      provinceEn: el.querySelector<HTMLInputElement>('[data-field="provinceEn"]')!.value,
    }));
  }

  function renderCitiesSettings(): void {
    (document.getElementById('origin-city-fa') as HTMLInputElement).value = originCity.city;
    (document.getElementById('origin-city-en') as HTMLInputElement).value = originCity.cityEn;
    (document.getElementById('origin-province-fa') as HTMLInputElement).value = originCity.province;
    (document.getElementById('origin-province-en') as HTMLInputElement).value = originCity.provinceEn;
    (document.getElementById('coverage-mode') as HTMLSelectElement).value = coverageMode;
    const destSection = document.getElementById('destination-cities-section');
    if (destSection) destSection.hidden = coverageMode !== 'selected';
    renderCities();
  }

  function renderCategoriesSettings(): void {
    (document.getElementById('category-domestic-enabled') as HTMLInputElement).checked = categoryDomesticEnabled;
    (document.getElementById('category-moving-enabled') as HTMLInputElement).checked = categoryMovingEnabled;
    (document.getElementById('international-shipping-enabled') as HTMLInputElement).checked = internationalShippingEnabled;
  }

  document.getElementById('coverage-mode')?.addEventListener('change', (e) => {
    coverageMode = (e.currentTarget as HTMLSelectElement).value === 'selected' ? 'selected' : 'all';
    const destSection = document.getElementById('destination-cities-section');
    if (destSection) destSection.hidden = coverageMode !== 'selected';
  });

  document.getElementById('cities-list')?.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-city]');
    if (!btn) return;
    readCitiesFromDom();
    destinationCities.splice(Number(btn.dataset.removeCity), 1);
    renderCities();
  });

  document.getElementById('city-add-btn')?.addEventListener('click', () => {
    readCitiesFromDom();
    destinationCities.push({ city: '', cityEn: '', province: '', provinceEn: '' });
    renderCities();
  });

  document.querySelector('[data-save-setting="service_cities"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const savedNote = document.getElementById('cities-saved-note');
    const citiesError = document.getElementById('cities-error');
    btn.disabled = true;
    try {
      readCitiesFromDom();
      originCity = {
        city: (document.getElementById('origin-city-fa') as HTMLInputElement).value.trim(),
        cityEn: (document.getElementById('origin-city-en') as HTMLInputElement).value.trim(),
        province: (document.getElementById('origin-province-fa') as HTMLInputElement).value.trim(),
        provinceEn: (document.getElementById('origin-province-en') as HTMLInputElement).value.trim(),
      };
      destinationCities = destinationCities.filter((c) => c.city.trim() !== '');
      // internationalShippingEnabled دیگر اینجا ویرایش نمی‌شود (به تب «دسته‌بندی خدمات» منتقل شده)؛
      // مقدار فعلی‌اش را از تنظیمات ذخیره‌شده نگه می‌داریم تا این ذخیره آن را پاک نکند.
      const existingCities = (settings.service_cities as Record<string, unknown> | undefined) ?? {};
      const payload = {
        originCity: originCity.city ? originCity : null,
        coverageMode,
        destinationCities,
        internationalShippingEnabled: Boolean(existingCities.internationalShippingEnabled),
      };
      await updateSetting('service_cities', payload);
      settings.service_cities = payload;
      renderCities();
      if (savedNote) {
        savedNote.hidden = false;
        window.setTimeout(() => (savedNote.hidden = true), 2500);
      }
    } catch (err) {
      if (citiesError) {
        citiesError.hidden = false;
        citiesError.textContent = err instanceof Error ? err.message : 'ذخیره ناموفق بود.';
      }
    } finally {
      btn.disabled = false;
    }
  });

  // ----- دسته‌بندی خدمات -----
  document.querySelector('[data-save-setting="service_categories"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const savedNote = document.getElementById('categories-saved-note');
    const categoriesError = document.getElementById('categories-error');
    btn.disabled = true;
    try {
      categoryDomesticEnabled = (document.getElementById('category-domestic-enabled') as HTMLInputElement).checked;
      categoryMovingEnabled = (document.getElementById('category-moving-enabled') as HTMLInputElement).checked;
      internationalShippingEnabled = (document.getElementById('international-shipping-enabled') as HTMLInputElement).checked;
      await updateSetting('service_categories', { domestic: categoryDomesticEnabled, moving: categoryMovingEnabled });
      // بارهای ترانزیت هنوز از طریق کلید service_cities کنترل می‌شود (چون همان پرچم فیلد کشور را هم
      // نشان می‌دهد)، فقط این‌جا (تب دسته‌بندی خدمات) ویرایش می‌شود؛ بقیه‌ی داده‌ی شهرها دست‌نخورده می‌ماند.
      const existingCities = (settings.service_cities as Record<string, unknown> | undefined) ?? {};
      const citiesPayload = { ...existingCities, internationalShippingEnabled };
      await updateSetting('service_cities', citiesPayload);
      settings.service_cities = citiesPayload;
      if (savedNote) {
        savedNote.hidden = false;
        window.setTimeout(() => (savedNote.hidden = true), 2500);
      }
    } catch (err) {
      if (categoriesError) {
        categoriesError.hidden = false;
        categoriesError.textContent = err instanceof Error ? err.message : 'ذخیره ناموفق بود.';
      }
    } finally {
      btn.disabled = false;
    }
  });

  // این dropdown فقط انواع وسیله‌ی «فعال» (تعریف‌شده در تب «تعریف وسیله») را پیشنهاد می‌دهد —
  // بی‌فایده و گمراه‌کننده است که انواعی را که این کاربر اصلاً ندارد/استفاده نمی‌کند به او نشان
  // دهیم. استثنا: وقتی یک وسیله‌ی موجود ویرایش می‌شود که نوعش بعداً غیرفعال شده، همان نوع (با
  // برچسب «غیرفعال») هم اضافه می‌شود — وگرنه ذخیره‌ی فرم بدون تغییر آن فیلد، نوع واقعی وسیله را
  // خاموش‌وروشن به اولین گزینه‌ی فعال تغییر می‌دهد (خطای داده‌ی بی‌صدا).
  function populateTypeSelect(currentType?: string): void {
    const options = vehicleTypes.filter((t) => t.active).map((t) => [t.id, t.label] as const);
    if (currentType && !options.some(([id]) => id === currentType)) {
      options.push([currentType, `${typeLabels[currentType] ?? currentType} (غیرفعال)`]);
    }
    typeSelect!.innerHTML = options.map(([id, label]) => `<option value="${id}">${label}</option>`).join('');
  }

  function openForm(vehicle: FleetVehicle | null): void {
    formError!.hidden = true;
    formTitle!.textContent = vehicle ? `ویرایش ${vehicle.label}` : 'وسیله جدید';
    idInput!.value = vehicle ? String(vehicle.id) : '';
    labelInput!.value = vehicle?.label ?? '';
    populateTypeSelect(vehicle?.type);
    typeSelect!.value = vehicle?.type ?? typeSelect!.options[0]?.value ?? '';
    plateInput!.value = vehicle?.plateNumber ?? '';
    modelInput!.value = vehicle?.model ?? '';
    yearInput!.value = vehicle?.year ? String(vehicle.year) : '';
    statusSelect!.value = vehicle?.status ?? 'active';
    driverSelect!.value = vehicle?.driverStaffId ? String(vehicle.driverStaffId) : '';
    notesInput!.value = vehicle?.notes ?? '';
    submitBtn!.textContent = vehicle ? 'ذخیره تغییرات' : 'ایجاد وسیله';
    formCard!.hidden = false;
    formCard!.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function closeForm(): void {
    formCard!.hidden = true;
  }

  async function load(): Promise<void> {
    errorEl!.hidden = true;
    try {
      const [vehiclesData, staffData, fetchedSettings] = await Promise.all([fetchFleetVehicles(), fetchStaff(), fetchSettings()]);
      vehicles = vehiclesData;
      staff = staffData;
      settings = fetchedSettings;

      const configuredTypes = settings.vehicle_types as VehicleType[] | undefined;
      if (configuredTypes?.length) typeLabels = Object.fromEntries(configuredTypes.map((t) => [t.id, t.label]));
      vehicleTypes = configuredTypes ?? [];
      renderVehicleTypesList();

      // shape قدیمی service_cities یک آرایه‌ی مسطح بود؛ اگر تنظیمات قدیمی هنوز به همان شکل ذخیره شده باشد،
      // به‌عنوان فهرست مقصدهای مشخص (coverageMode: 'selected') در نظر گرفته می‌شود تا داده‌ای از دست نرود.
      const rawServiceCities = settings.service_cities as unknown;
      if (Array.isArray(rawServiceCities)) {
        destinationCities = rawServiceCities as ServiceCity[];
        coverageMode = destinationCities.length ? 'selected' : 'all';
      } else {
        const sc = (rawServiceCities as Record<string, unknown> | undefined) ?? {};
        destinationCities = (sc.destinationCities as ServiceCity[] | undefined) ?? [];
        coverageMode = sc.coverageMode === 'selected' ? 'selected' : 'all';
        originCity = (sc.originCity as ServiceCity | undefined) ?? { city: '', cityEn: '', province: '', provinceEn: '' };
        internationalShippingEnabled = Boolean(sc.internationalShippingEnabled);
      }
      renderCitiesSettings();

      const sCat = (settings.service_categories as Record<string, unknown> | undefined) ?? {};
      categoryDomesticEnabled = typeof sCat.domestic === 'boolean' ? sCat.domestic : true;
      categoryMovingEnabled = typeof sCat.moving === 'boolean' ? sCat.moving : true;
      renderCategoriesSettings();

      populateTypeSelect();
      driverSelect!.innerHTML = [
        `<option value="">بدون راننده</option>`,
        ...staff.map((s) => `<option value="${s.id}">${s.fullName}</option>`),
      ].join('');

      tableBody!.innerHTML = vehicles.length
        ? vehicles.map((v) => renderRow(v, typeLabels)).join('')
        : '<tr><td colspan="7" class="staff-table-empty">هنوز وسیله‌ای ثبت نشده است.</td></tr>';
      wireRowActions();

      // بدون دست‌کم یک نوع وسیله‌ی فعال، امکان تعریف وسیله‌ی جدید معنا ندارد (چیزی برای انتخاب
      // در dropdown نیست) — دکمه غیرفعال می‌شود تا کاربر با فرم نیمه‌کاره مواجه نشود.
      const hasActiveType = vehicleTypes.some((t) => t.active);
      addToggleBtn!.disabled = !hasActiveType;
      addToggleBtn!.title = hasActiveType ? '' : 'ابتدا از تب «تعریف وسیله» دست‌کم یک نوع وسیله را فعال کنید.';
    } catch (err) {
      errorEl!.hidden = false;
      errorEl!.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
    }
  }

  function wireRowActions(): void {
    tableBody!.querySelectorAll<HTMLButtonElement>('[data-edit-vehicle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const vehicle = vehicles.find((v) => v.id === Number(btn.dataset.editVehicle));
        if (vehicle) openForm(vehicle);
      });
    });

    tableBody!.querySelectorAll<HTMLButtonElement>('[data-delete-vehicle]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const vehicle = vehicles.find((v) => v.id === Number(btn.dataset.deleteVehicle));
        if (!vehicle) return;
        if (!window.confirm(`«${vehicle.label}» برای همیشه حذف شود؟`)) return;
        btn.disabled = true;
        try {
          await deleteFleetVehicle(vehicle.id);
          await load();
        } catch (err) {
          errorEl!.hidden = false;
          errorEl!.textContent = err instanceof Error ? err.message : 'حذف ناموفق بود.';
          btn.disabled = false;
        }
      });
    });
  }

  addToggleBtn.addEventListener('click', () => openForm(null));
  cancelBtn.addEventListener('click', closeForm);

  submitBtn.addEventListener('click', async () => {
    formError!.hidden = true;

    const label = labelInput!.value.trim();
    const type = typeSelect!.value;
    if (!label || !type) {
      formError!.hidden = false;
      formError!.textContent = 'عنوان و نوع وسیله الزامی است.';
      return;
    }

    const isEditing = Boolean(idInput!.value);
    const payload = {
      type,
      label,
      plateNumber: plateInput!.value.trim(),
      model: modelInput!.value.trim(),
      year: yearInput!.value.trim() ? Number(yearInput!.value) : null,
      status: statusSelect!.value as FleetVehicle['status'],
      driverStaffId: driverSelect!.value ? Number(driverSelect!.value) : null,
      notes: notesInput!.value.trim(),
    };

    submitBtn!.disabled = true;
    submitBtn!.textContent = isEditing ? 'در حال ذخیره...' : 'در حال ایجاد...';
    try {
      if (isEditing) await updateFleetVehicle(Number(idInput!.value), payload);
      else await createFleetVehicle(payload);
      closeForm();
      await load();
    } catch (err) {
      formError!.hidden = false;
      formError!.textContent = err instanceof Error ? err.message : 'ذخیره ناموفق بود.';
    } finally {
      submitBtn!.disabled = false;
      submitBtn!.textContent = isEditing ? 'ذخیره تغییرات' : 'ایجاد وسیله';
    }
  });

  void load();
}
