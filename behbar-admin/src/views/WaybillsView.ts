import { icons } from '../components/icons.ts';
import { fetchRequests } from '../utils/api.ts';
import type { OrderRecord } from '../utils/api.ts';
import type { StaffInfo } from '../utils/auth.ts';
import { showToast } from '../utils/toast.ts';

export interface WaybillRecord {
  id: string;
  waybillNumber: string; // e.g. "IR-1403-98214"
  issueDate: string; // e.g. "۱۴۰۳/۰۶/۲۴"
  status: 'active' | 'delivered' | 'pending' | 'canceled';
  sender: {
    name: string;
    phone: string;
    city: string;
    address: string;
    nationalId?: string;
  };
  receiver: {
    name: string;
    phone: string;
    city: string;
    address: string;
    nationalId?: string;
  };
  driver: {
    name: string;
    nationalId: string;
    licenseNumber: string;
    phone: string;
    smartCardNumber: string;
  };
  fleet: {
    vehicleType: string;
    plateNumber: string;
    smartCardNumber: string;
  };
  cargo: {
    description: string;
    weightKg: number;
    packaging: string;
    declaredValueToman: number;
  };
  insurance: {
    policyNumber: string;
    insurerName: string;
    coverageType: string;
    coverageCeilingToman: number;
    premiumToman: number;
  };
  freightCostToman: number;
  notes?: string;
}

const STORAGE_WAYBILLS_KEY = 'behbar_waybill_records';

const DEFAULT_MOCK_WAYBILLS: WaybillRecord[] = [
  {
    id: 'wb-1',
    waybillNumber: 'IR-1403-882190',
    issueDate: '۱۴۰۳/۰۶/۲۴',
    status: 'active',
    sender: {
      name: 'شرکت پتروشیمی آریا',
      phone: '02188765432',
      city: 'تهران',
      address: 'بزرگراه فتح، کیلومتر ۸، انبار مرکزی',
      nationalId: '10103498210',
    },
    receiver: {
      name: 'صنایع پلاستیک اروند',
      phone: '06153219876',
      city: 'اهواز',
      address: 'شهرک صنعتی شماره ۲، فاز دوم، خیابان تلاش ۳',
      nationalId: '10861234509',
    },
    driver: {
      name: 'محمدعلی رستمی',
      nationalId: '1289456712',
      licenseNumber: ' پایه یک ۴۹۸۲۱',
      phone: '09123456789',
      smartCardNumber: '9823412',
    },
    fleet: {
      vehicleType: 'تریلی چادری (ترانزیت)',
      plateNumber: '۱۲ ع ۷۸۹ ایران ۴۴',
      smartCardNumber: '3489102',
    },
    cargo: {
      description: 'گرانول پلی‌اتیلن پتروشیمی در پالت بسته‌بندی شده',
      weightKg: 22000,
      packaging: 'پالت و شیرینگ پلاستیکی',
      declaredValueToman: 1850000000,
    },
    insurance: {
      policyNumber: 'INS-403-99214',
      insurerName: 'بیمه ایران',
      coverageType: 'پوشش کامل تمام‌خطر (کلوز A) + مسئولیت مدنی متصدی حمل',
      coverageCeilingToman: 2000000000,
      premiumToman: 5500000,
    },
    freightCostToman: 38000000,
    notes: 'حمل فوری، تحویل با ارائه حواله انبار و مهر مقصد',
  },
  {
    id: 'wb-2',
    waybillNumber: 'IR-1403-882185',
    issueDate: '۱۴۰۳/۰۶/۲۳',
    status: 'active',
    sender: {
      name: 'تجهیزات پزشکی بهمن',
      phone: '02166543210',
      city: 'کرج',
      address: 'بلوار جمهوری، نبش کوچه یاس',
      nationalId: '10105544332',
    },
    receiver: {
      name: 'بیمارستان امام رضا (ع)',
      phone: '05138543210',
      city: 'مشهد',
      address: 'میدان بیمارستان، خیابان ابن‌سینا',
      nationalId: '14008765432',
    },
    driver: {
      name: 'حسین صادقی',
      nationalId: '0943218765',
      licenseNumber: 'پایه دو ۳۲۱۴۵',
      phone: '09151122334',
      smartCardNumber: '7612984',
    },
    fleet: {
      vehicleType: 'خاور مسقف مجهز به مهاربند',
      plateNumber: '۳۴ ب ۵۶۷ ایران ۱۲',
      smartCardNumber: '4455667',
    },
    cargo: {
      description: 'دستگاه‌های تشخیصی و مانیتور علائم حیاتی آزمایشگاهی',
      weightKg: 3500,
      packaging: 'کارتن پالت‌بندی شده ضدضربه',
      declaredValueToman: 950000000,
    },
    insurance: {
      policyNumber: 'INS-403-99180',
      insurerName: 'بیمه آسیا',
      coverageType: 'بیمه‌نامه رسمی راهداری + الحاقیه شکست و نوسان',
      coverageCeilingToman: 1000000000,
      premiumToman: 3200000,
    },
    freightCostToman: 18500000,
    notes: 'بار حساس و نیازمند سرعت مطمئنه و عدم تکان شدید',
  },
  {
    id: 'wb-3',
    waybillNumber: 'IR-1403-881950',
    issueDate: '۱۴۰۳/۰۶/۲۱',
    status: 'delivered',
    sender: {
      name: 'بازرگانی پارس سرام',
      phone: '03536214589',
      city: 'یزد',
      address: 'بلوار آزادگان، روبروی پارک صنعتی',
      nationalId: '10840019283',
    },
    receiver: {
      name: 'پروژه برج سپهر تبریز',
      phone: '04133445566',
      city: 'تبریز',
      address: 'بلوار ائل‌گلی، کوی فردوس',
      nationalId: '14002345678',
    },
    driver: {
      name: 'رضا کریمیان',
      nationalId: '1198765432',
      licenseNumber: 'پایه یک ۶۵۴۳۲',
      phone: '09139876543',
      smartCardNumber: '8877665',
    },
    fleet: {
      vehicleType: 'کامیون ده چرخ جفت',
      plateNumber: '۶۵ ج ۲۳۴ ایران ۵۵',
      smartCardNumber: '9988112',
    },
    cargo: {
      description: 'سرامیک و پرسلان کف ساختمانی صادراتی',
      weightKg: 14500,
      packaging: 'پالت چوبی با استرچ',
      declaredValueToman: 620000000,
    },
    insurance: {
      policyNumber: 'INS-403-98910',
      insurerName: 'بیمه دانا',
      coverageType: 'پوشش مسئولیت مدنی متصدی حمل کالا',
      coverageCeilingToman: 700000000,
      premiumToman: 1900000,
    },
    freightCostToman: 24000000,
    notes: 'تحویل صحیح و سالم بدون هیچ‌گونه شکستگی تایید شد',
  },
  {
    id: 'wb-4',
    waybillNumber: 'IR-1403-882205',
    issueDate: '۱۴۰۳/۰۶/۲۴',
    status: 'pending',
    sender: {
      name: 'فولاد غرب پارس',
      phone: '03133887766',
      city: 'اصفهان',
      address: 'شهرک صنعتی مورچه‌خورت، خیابان ابوریحان',
      nationalId: '10260384910',
    },
    receiver: {
      name: 'اسکلت فلزی شمال',
      phone: '01132233445',
      city: 'ساری',
      address: 'جاده دریا، کیلومتر ۴',
      nationalId: '10760192837',
    },
    driver: {
      name: 'ابراهیم قاسمی',
      nationalId: '1276543219',
      licenseNumber: 'پایه یک ۷۷۶۶۵',
      phone: '09132211445',
      smartCardNumber: '3344551',
    },
    fleet: {
      vehicleType: 'تریلی کفی ۱۲ متری',
      plateNumber: '۸۸ د ۴۵۶ ایران ۳۳',
      smartCardNumber: '1122334',
    },
    cargo: {
      description: 'تیرآهن سنگین و میلگرد ساختمانی شاخه ۱۲ متری',
      weightKg: 24000,
      packaging: 'بندیل تسمه‌کشی شده',
      declaredValueToman: 1200000000,
    },
    insurance: {
      policyNumber: 'INS-403-99302',
      insurerName: 'بیمه ایران',
      coverageType: 'بیمه‌نامه جامع باربری راهداری کلوز A',
      coverageCeilingToman: 1300000000,
      premiumToman: 3800000,
    },
    freightCostToman: 31000000,
    notes: 'در انتظار تایید بارگیری و مهاربندی ایمن روی کفی',
  },
];

function getStoredWaybills(): WaybillRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_WAYBILLS_KEY);
    if (!raw) {
      saveStoredWaybills(DEFAULT_MOCK_WAYBILLS);
      return DEFAULT_MOCK_WAYBILLS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MOCK_WAYBILLS;
  } catch {
    return DEFAULT_MOCK_WAYBILLS;
  }
}

function saveStoredWaybills(docs: WaybillRecord[]): void {
  try {
    localStorage.setItem(STORAGE_WAYBILLS_KEY, JSON.stringify(docs));
  } catch {
    // ignore
  }
}

function toPersianDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

function formatPriceToman(amount: number): string {
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  return toPersianDigits(parts);
}

const STATUS_MAP: Record<string, { label: string; badgeClass: string }> = {
  active: { label: 'در مسیر حمل', badgeClass: 'waybill-badge-active' },
  delivered: { label: 'تحویل‌شده', badgeClass: 'waybill-badge-delivered' },
  pending: { label: 'در انتظار صدور', badgeClass: 'waybill-badge-pending' },
  canceled: { label: 'باطله', badgeClass: 'waybill-badge-canceled' },
};

export function renderWaybillsView(_staff: StaffInfo): string {
  return `
    <div class="waybills-view">
      <header class="waybills-header">
        <div>
          <h1 class="dash-title">مدیریت بیمه‌نامه و بارنامه</h1>
          <p class="dash-subtitle">صدور، رهگیری و بایگانی رسمی بارنامه‌های جاده‌ای و بیمه‌نامه‌های باربری تحت پوشش بهبار</p>
        </div>
        <div class="waybills-header-actions">
          <button type="button" class="waybills-btn-excel" id="wb-export-excel-btn" title="دریافت فایل اکسل بارنامه‌ها و بیمه‌نامه‌ها">
            <span class="icon">${icons.fileSpreadsheet}</span>
            <span>دریافت اکسل (Excel)</span>
          </button>
          <button type="button" class="waybills-btn-primary" id="wb-add-btn">
            <span class="icon">${icons.plusCircle}</span>
            <span>صدور بارنامه و بیمه‌نامه جدید</span>
          </button>
        </div>
      </header>

      <!-- شاخص‌های کلی (KPI) -->
      <section class="waybills-stats-grid" id="wb-stats-grid">
        <div class="waybill-stat-card">
          <div class="waybill-stat-icon blue">
            ${icons.article}
          </div>
          <div class="waybill-stat-content">
            <span class="waybill-stat-label">کل بارنامه‌ها</span>
            <span class="waybill-stat-value" id="stat-total-count">...</span>
          </div>
        </div>
        <div class="waybill-stat-card">
          <div class="waybill-stat-icon green">
            ${icons.truck}
          </div>
          <div class="waybill-stat-content">
            <span class="waybill-stat-label">بارنامه‌های فعال و در مسیر</span>
            <span class="waybill-stat-value" id="stat-active-count">...</span>
          </div>
        </div>
        <div class="waybill-stat-card">
          <div class="waybill-stat-icon purple">
            ${icons.shield}
          </div>
          <div class="waybill-stat-content">
            <span class="waybill-stat-label">ارزش محموله‌های تحت پوشش بیمه</span>
            <span class="waybill-stat-value" id="stat-insurance-value">...</span>
          </div>
        </div>
        <div class="waybill-stat-card">
          <div class="waybill-stat-icon amber">
            ${icons.clock}
          </div>
          <div class="waybill-stat-content">
            <span class="waybill-stat-label">در انتظار صدور / بررسی</span>
            <span class="waybill-stat-value" id="stat-pending-count">...</span>
          </div>
        </div>
      </section>

      <!-- نوار جستجو و فیلتر -->
      <section class="waybills-filters">
        <div class="waybills-search-wrap">
          <input
            type="text"
            id="wb-search-input"
            class="waybills-search-input"
            placeholder="جستجو بر اساس شماره بارنامه، راننده، خودرو، فرستنده یا گیرنده..."
          />
        </div>
        <select id="wb-status-filter" class="waybills-filter-select">
          <option value="all">همه وضعیت‌ها</option>
          <option value="active">در مسیر حمل</option>
          <option value="delivered">تحویل‌شده</option>
          <option value="pending">در انتظار صدور</option>
          <option value="canceled">باطله</option>
        </select>
        <select id="wb-insurer-filter" class="waybills-filter-select">
          <option value="all">همه بیمه‌گرها</option>
          <option value="ایران">بیمه ایران</option>
          <option value="آسیا">بیمه آسیا</option>
          <option value="دانا">بیمه دانا</option>
        </select>
      </section>

      <!-- جدول بارنامه‌ها و بیمه‌نامه‌ها -->
      <div class="waybills-table-container">
        <table class="waybills-table">
          <thead>
            <tr>
              <th>شماره بارنامه</th>
              <th>بیمه‌نامه و شرکت پوشش‌دهنده</th>
              <th>فرستنده / گیرنده (مسیر)</th>
              <th>راننده و خودرو</th>
              <th>ارزش محموله (تومان)</th>
              <th>تاریخ صدور</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody id="wb-table-body">
            <!-- ردیف‌ها توسط جاوااسکریپت تزریق می‌شوند -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- کانتینر مودال‌ها -->
    <div id="wb-modal-container"></div>
  `;
}

export function initWaybillsView(): void {
  let waybills = getStoredWaybills();
  let ordersList: OrderRecord[] = [];

  // بارگذاری درخواست‌ها برای ادغام و انتخاب خودکار
  void fetchRequests().then((res) => {
    if (Array.isArray(res)) {
      ordersList = res;
    }
  });

  const searchInput = document.getElementById('wb-search-input') as HTMLInputElement | null;
  const statusFilter = document.getElementById('wb-status-filter') as HTMLSelectElement | null;
  const insurerFilter = document.getElementById('wb-insurer-filter') as HTMLSelectElement | null;
  const tableBody = document.getElementById('wb-table-body');
  const addBtn = document.getElementById('wb-add-btn');
  const exportBtn = document.getElementById('wb-export-excel-btn');

  function updateStats(): void {
    const totalCount = waybills.length;
    const activeCount = waybills.filter((w) => w.status === 'active').length;
    const pendingCount = waybills.filter((w) => w.status === 'pending').length;
    const totalCargoValue = waybills.reduce((sum, w) => sum + (w.cargo.declaredValueToman || 0), 0);

    const totalEl = document.getElementById('stat-total-count');
    const activeEl = document.getElementById('stat-active-count');
    const pendingEl = document.getElementById('stat-pending-count');
    const valueEl = document.getElementById('stat-insurance-value');

    if (totalEl) totalEl.textContent = `${toPersianDigits(totalCount)} فقره`;
    if (activeEl) activeEl.textContent = `${toPersianDigits(activeCount)} فقره`;
    if (pendingEl) pendingEl.textContent = `${toPersianDigits(pendingCount)} فقره`;
    if (valueEl) valueEl.textContent = `${formatPriceToman(totalCargoValue)} تومان`;
  }

  function renderTable(): void {
    if (!tableBody) return;

    const query = (searchInput?.value || '').trim().toLowerCase();
    const selectedStatus = statusFilter?.value || 'all';
    const selectedInsurer = insurerFilter?.value || 'all';

    const filtered = waybills.filter((wb) => {
      if (selectedStatus !== 'all' && wb.status !== selectedStatus) return false;
      if (selectedInsurer !== 'all' && !wb.insurance.insurerName.includes(selectedInsurer)) return false;

      if (query) {
        const fullText = `
          ${wb.waybillNumber}
          ${wb.insurance.policyNumber}
          ${wb.insurance.insurerName}
          ${wb.sender.name} ${wb.sender.city}
          ${wb.receiver.name} ${wb.receiver.city}
          ${wb.driver.name} ${wb.driver.phone}
          ${wb.fleet.vehicleType} ${wb.fleet.plateNumber}
          ${wb.cargo.description}
        `.toLowerCase();
        if (!fullText.includes(query)) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
            سندی با مشخصات جستجو شده یافت نشد.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered
      .map((wb) => {
        const statusMeta = STATUS_MAP[wb.status] || { label: wb.status, badgeClass: 'waybill-badge-pending' };
        return `
          <tr>
            <td>
              <span class="waybill-code-tag">${wb.waybillNumber}</span>
            </td>
            <td>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span class="waybill-insurer-tag">${icons.shield} ${wb.insurance.insurerName}</span>
                <span style="font-size: 0.76rem; color: #64748b; font-family: monospace;">${wb.insurance.policyNumber}</span>
              </div>
            </td>
            <td>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-weight: 700;">${wb.sender.city} ➔ ${wb.receiver.city}</span>
                <span style="font-size: 0.78rem; color: #64748b;">${wb.sender.name} به ${wb.receiver.name}</span>
              </div>
            </td>
            <td>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-weight: 700;">${wb.driver.name}</span>
                <span style="font-size: 0.78rem; color: #64748b;">${wb.fleet.vehicleType} (${toPersianDigits(wb.fleet.plateNumber)})</span>
              </div>
            </td>
            <td>
              <span style="font-weight: 800; color: #047857;">${formatPriceToman(wb.cargo.declaredValueToman)}</span>
            </td>
            <td>
              <span style="font-size: 0.84rem;">${toPersianDigits(wb.issueDate)}</span>
            </td>
            <td>
              <span class="waybill-badge ${statusMeta.badgeClass}">${statusMeta.label}</span>
            </td>
            <td>
              <div class="waybill-actions-cell">
                <button type="button" class="waybill-action-btn print" data-wb-print="${wb.id}" title="چاپ و مشاهده برگه رسمی بارنامه و بیمه‌نامه">
                  ${icons.printer}
                </button>
                <button type="button" class="waybill-action-btn" data-wb-status="${wb.id}" title="تغییر وضعیت سند">
                  ${icons.checkCircle}
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join('');

    // اتصالات دکمه‌های جدول
    tableBody.querySelectorAll<HTMLButtonElement>('[data-wb-print]').forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-wb-print');
        const found = waybills.find((w) => w.id === id);
        if (found) openPrintModal(found);
      };
    });

    tableBody.querySelectorAll<HTMLButtonElement>('[data-wb-status]').forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-wb-status');
        const found = waybills.find((w) => w.id === id);
        if (found) openStatusModal(found);
      };
    });
  }

  function openStatusModal(wb: WaybillRecord): void {
    const modalContainer = document.getElementById('wb-modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="waybill-modal-overlay" id="wb-status-overlay">
        <div class="waybill-modal-content" style="max-width: 440px;">
          <div class="waybill-modal-header">
            <h3 class="waybill-modal-title">تغییر وضعیت بارنامه ${wb.waybillNumber}</h3>
            <button type="button" class="waybill-modal-close" id="wb-status-close">${icons.close}</button>
          </div>
          <div class="waybill-modal-body">
            <div class="waybill-form-group">
              <label class="waybill-form-label">وضعیت جدید را انتخاب کنید:</label>
              <select class="waybill-form-select" id="wb-new-status-select">
                <option value="active" ${wb.status === 'active' ? 'selected' : ''}>در مسیر حمل</option>
                <option value="delivered" ${wb.status === 'delivered' ? 'selected' : ''}>تحویل‌شده</option>
                <option value="pending" ${wb.status === 'pending' ? 'selected' : ''}>در انتظار صدور</option>
                <option value="canceled" ${wb.status === 'canceled' ? 'selected' : ''}>باطله</option>
              </select>
            </div>
          </div>
          <div class="waybill-modal-footer">
            <button type="button" class="waybills-btn-secondary" id="wb-status-cancel">انصراف</button>
            <button type="button" class="waybills-btn-primary" id="wb-status-save">ذخیره وضعیت</button>
          </div>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    document.getElementById('wb-status-close')?.addEventListener('click', close);
    document.getElementById('wb-status-cancel')?.addEventListener('click', close);

    document.getElementById('wb-status-save')?.addEventListener('click', () => {
      const select = document.getElementById('wb-new-status-select') as HTMLSelectElement | null;
      if (select) {
        wb.status = select.value as any;
        saveStoredWaybills(waybills);
        updateStats();
        renderTable();
        showToast('وضعیت سند با موفقیت به‌روزرسانی شد.', 'success');
      }
      close();
    });
  }

  function openPrintModal(wb: WaybillRecord): void {
    const modalContainer = document.getElementById('wb-modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="waybill-modal-overlay" id="wb-print-overlay">
        <div class="waybill-modal-content" style="max-width: 920px;">
          <div class="waybill-modal-header">
            <h3 class="waybill-modal-title">
              <span>${icons.shield}</span>
              <span>برگه رسمی بارنامه سراسری و بیمه‌نامه باربری بهبار</span>
            </h3>
            <button type="button" class="waybill-modal-close" id="wb-print-close">${icons.close}</button>
          </div>
          <div class="waybill-modal-body">
            
            <!-- برگه قابل چاپ رسمی -->
            <div class="official-waybill-sheet" id="official-sheet-content">
              <!-- سربرگ رسمی -->
              <div class="sheet-header">
                <div class="sheet-logo-area">
                  <div style="font-size: 2.2rem; line-height: 1;">🚛</div>
                  <div>
                    <h1 class="sheet-brand-title">بهبار</h1>
                    <div class="sheet-brand-sub">سامانه هوشمند ترابری و لجستیک سراسری کشور</div>
                  </div>
                </div>

                <div class="sheet-center-title">
                  <h2>بارنامه دولتی و بیمه‌نامه رسمی حمل کالا</h2>
                  <span>تحت نظارت سازمان راهداری و حمل‌ونقل جاده‌ای و بیمه مرکزی</span>
                </div>

                <div class="sheet-meta-area">
                  <div>شماره بارنامه: <span class="num">${wb.waybillNumber}</span></div>
                  <div>شماره بیمه‌نامه: <span class="num">${wb.insurance.policyNumber}</span></div>
                  <div>تاریخ صدور: <strong>${toPersianDigits(wb.issueDate)}</strong></div>
                </div>
              </div>

              <!-- مشخصات بیمه و پوشش خسارت (بخش برجسته) -->
              <div class="sheet-insurance-highlight">
                <div class="item">
                  <span class="title">شرکت بیمه‌گر طرف قرارداد:</span>
                  <span class="val">${wb.insurance.insurerName}</span>
                </div>
                <div class="item">
                  <span class="title">نوع پوشش و کلوز بیمه‌ای:</span>
                  <span class="val">${wb.insurance.coverageType}</span>
                </div>
                <div class="item">
                  <span class="title">سقف تعهد پرداخت غرامت:</span>
                  <span class="val">${formatPriceToman(wb.insurance.coverageCeilingToman)} تومان</span>
                </div>
                <div class="item">
                  <span class="title">ارزش اظهارشده کالا:</span>
                  <span class="val">${formatPriceToman(wb.cargo.declaredValueToman)} تومان</span>
                </div>
              </div>

              <!-- بخش فرستنده و گیرنده -->
              <div class="sheet-section">
                <div class="sheet-section-head">۱. مشخصات متعاملین (فرستنده و گیرنده)</div>
                <div class="sheet-grid-row">
                  <div class="sheet-item">
                    <span class="sheet-item-label">فرستنده:</span>
                    <span class="sheet-item-value">${wb.sender.name}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شهر مبدا:</span>
                    <span class="sheet-item-value">${wb.sender.city}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">تلفن فرستنده:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.sender.phone)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شناسه ملی / کد ملی:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.sender.nationalId || '---')}</span>
                  </div>
                </div>
                <div style="padding: 0 12px 8px 12px; font-size: 0.8rem; color: #475569;">
                  نشانی مبدا: ${wb.sender.address}
                </div>
                <div style="border-top: 1px dashed #cbd5e1; margin: 4px 12px;"></div>
                <div class="sheet-grid-row">
                  <div class="sheet-item">
                    <span class="sheet-item-label">گیرنده محموله:</span>
                    <span class="sheet-item-value">${wb.receiver.name}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شهر مقصد:</span>
                    <span class="sheet-item-value">${wb.receiver.city}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">تلفن گیرنده:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.receiver.phone)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شناسه ملی / کد ملی:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.receiver.nationalId || '---')}</span>
                  </div>
                </div>
                <div style="padding: 0 12px 8px 12px; font-size: 0.8rem; color: #475569;">
                  نشانی مقصد: ${wb.receiver.address}
                </div>
              </div>

              <!-- بخش راننده و ناوگان -->
              <div class="sheet-section">
                <div class="sheet-section-head">۲. مشخصات راننده، ناوگان و وسیله نقلیه</div>
                <div class="sheet-grid-row">
                  <div class="sheet-item">
                    <span class="sheet-item-label">نام راننده:</span>
                    <span class="sheet-item-value">${wb.driver.name}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">کد ملی راننده:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.driver.nationalId)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">کارت هوشمند راننده:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.driver.smartCardNumber)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شماره تماس راننده:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.driver.phone)}</span>
                  </div>
                </div>
                <div class="sheet-grid-row" style="border-top: 1px dashed #cbd5e1;">
                  <div class="sheet-item">
                    <span class="sheet-item-label">نوع ناوگان:</span>
                    <span class="sheet-item-value">${wb.fleet.vehicleType}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">شماره پلاک انتظامی:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.fleet.plateNumber)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">کارت هوشمند ناوگان:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.fleet.smartCardNumber)}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">کرایه کل حمل:</span>
                    <span class="sheet-item-value" style="color: #047857;">${formatPriceToman(wb.freightCostToman)} تومان</span>
                  </div>
                </div>
              </div>

              <!-- مشخصات محموله -->
              <div class="sheet-section">
                <div class="sheet-section-head">۳. مشخصات بار و شرایط حمل</div>
                <div class="sheet-grid-row">
                  <div class="sheet-item" style="grid-column: span 2;">
                    <span class="sheet-item-label">شرح کالا / محموله:</span>
                    <span class="sheet-item-value">${wb.cargo.description}</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">وزن ناخالص:</span>
                    <span class="sheet-item-value">${toPersianDigits(wb.cargo.weightKg)} کیلوگرم</span>
                  </div>
                  <div class="sheet-item">
                    <span class="sheet-item-label">نوع بسته‌بندی:</span>
                    <span class="sheet-item-value">${wb.cargo.packaging}</span>
                  </div>
                </div>
              </div>

              <!-- امضاها و تاییدیه رسمی -->
              <div class="sheet-footer">
                <div class="sheet-sign-box">
                  <span>مهر و امضای فرستنده کالا</span>
                  <span style="font-size: 0.72rem; color: #94a3b8;">صحت وزن و مشخصات محموله تایید شد</span>
                </div>
                <div class="sheet-sign-box">
                  <span>مهر و امضای شرکت حمل‌ونقل بهبار</span>
                  <span style="font-size: 0.72rem; color: #166534; font-weight: 700;">صادر شده از طریق وب‌سرویس راهداری</span>
                </div>
                <div class="sheet-sign-box">
                  <span>امضای راننده و تحویل‌گیرنده</span>
                  <span style="font-size: 0.72rem; color: #94a3b8;">محل امضای تحویل در مقصد</span>
                </div>
              </div>

            </div>
          </div>

          <div class="waybill-modal-footer">
            <button type="button" class="waybills-btn-secondary" id="wb-print-modal-cancel">بستن</button>
            <button type="button" class="waybills-btn-primary" id="wb-print-modal-do">
              <span class="icon">${icons.printer}</span>
              <span>چاپ مستقیم برگه بارنامه و بیمه‌نامه</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    document.getElementById('wb-print-close')?.addEventListener('click', close);
    document.getElementById('wb-print-modal-cancel')?.addEventListener('click', close);

    document.getElementById('wb-print-modal-do')?.addEventListener('click', () => {
      window.print();
    });
  }

  function openAddModal(): void {
    const modalContainer = document.getElementById('wb-modal-container');
    if (!modalContainer) return;

    // گزینه‌های سفارش برای انتخاب سریع
    const orderOptions = ordersList
      .slice(0, 15)
      .map(
        (o) => `
          <option value="${o.id}">
            #${o.id} - ${o.customerName} (${o.originCity || 'مبدا'} به ${o.destinationCity || 'مقصد'})
          </option>
        `
      )
      .join('');

    modalContainer.innerHTML = `
      <div class="waybill-modal-overlay" id="wb-add-overlay">
        <div class="waybill-modal-content">
          <div class="waybill-modal-header">
            <h3 class="waybill-modal-title">
              <span>${icons.plusCircle}</span>
              <span>صدور بارنامه دولتی و بیمه‌نامه جدید بهبار</span>
            </h3>
            <button type="button" class="waybill-modal-close" id="wb-add-close">${icons.close}</button>
          </div>
          <div class="waybill-modal-body">
            
            ${
              orderOptions
                ? `
              <div class="waybill-form-group">
                <label class="waybill-form-label">بارگذاری سریع از درخواست‌های ثبت‌شده سایت (اختیاری):</label>
                <select class="waybill-form-select" id="wb-quick-select-order">
                  <option value="">-- انتخاب درخواست برای پر کردن خودکار --</option>
                  ${orderOptions}
                </select>
              </div>
            `
                : ''
            }

            <div class="waybill-form-section-title">مشخصات فرستنده و گیرنده</div>
            <div class="waybill-form-grid">
              <div class="waybill-form-group">
                <label class="waybill-form-label">نام فرستنده:</label>
                <input type="text" class="waybill-form-input" id="wb-sender-name" placeholder="مثال: بازرگانی نوین یا شرکت..." required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شهر مبدا:</label>
                <input type="text" class="waybill-form-input" id="wb-sender-city" placeholder="مثال: تهران" required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">تلفن فرستنده:</label>
                <input type="tel" class="waybill-form-input" id="wb-sender-phone" placeholder="021..." />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شناسه ملی / کد ملی فرستنده:</label>
                <input type="text" class="waybill-form-input" id="wb-sender-nid" placeholder="۱۰ یا ۱۱ رقم" />
              </div>
              <div class="waybill-form-group full">
                <label class="waybill-form-label">آدرس دقیق مبدا بارگیری:</label>
                <input type="text" class="waybill-form-input" id="wb-sender-address" placeholder="خیابان، پلاک، نام انبار..." />
              </div>

              <div class="waybill-form-group">
                <label class="waybill-form-label">نام گیرنده محموله:</label>
                <input type="text" class="waybill-form-input" id="wb-receiver-name" placeholder="نام شخص یا شرکت تحویل‌گیرنده" required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شهر مقصد تخلیه:</label>
                <input type="text" class="waybill-form-input" id="wb-receiver-city" placeholder="مثال: شیراز" required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">تلفن گیرنده:</label>
                <input type="tel" class="waybill-form-input" id="wb-receiver-phone" placeholder="091..." />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شناسه ملی / کد ملی گیرنده:</label>
                <input type="text" class="waybill-form-input" id="wb-receiver-nid" placeholder="۱۰ یا ۱۱ رقم" />
              </div>
              <div class="waybill-form-group full">
                <label class="waybill-form-label">آدرس دقیق مقصد تخلیه:</label>
                <input type="text" class="waybill-form-input" id="wb-receiver-address" placeholder="خیابان، پلاک، کارخانه یا انبار مقصد..." />
              </div>
            </div>

            <div class="waybill-form-section-title">مشخصات ناوگان و راننده</div>
            <div class="waybill-form-grid">
              <div class="waybill-form-group">
                <label class="waybill-form-label">نام و نام خانوادگی راننده:</label>
                <input type="text" class="waybill-form-input" id="wb-driver-name" placeholder="مثال: رضا احمدی" required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">کد ملی راننده:</label>
                <input type="text" class="waybill-form-input" id="wb-driver-nid" placeholder="۱۰ رقم" />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شماره تماس راننده:</label>
                <input type="tel" class="waybill-form-input" id="wb-driver-phone" placeholder="0912..." />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">کارت هوشمند راننده:</label>
                <input type="text" class="waybill-form-input" id="wb-driver-smart" placeholder="کارت هوشمند ناوگان" />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">نوع خودرو / ناوگان:</label>
                <select class="waybill-form-select" id="wb-fleet-type">
                  <option value="وانت نیسان">وانت نیسان</option>
                  <option value="خاور روباز">خاور روباز</option>
                  <option value="خاور مسقف چادری">خاور مسقف چادری</option>
                  <option value="کامیون تک (۶ چرخ)">کامیون تک (۶ چرخ)</option>
                  <option value="کامیون جفت (۱۰ چرخ)">کامیون جفت (۱۰ چرخ)</option>
                  <option value="تریلی کفی">تریلی کفی</option>
                  <option value="تریلی لبه‌دار">تریلی لبه‌دار</option>
                  <option value="تریلی ترانزیت چادری">تریلی ترانزیت چادری</option>
                  <option value="تریلی یخچالی">تریلی یخچالی</option>
                  <option value="بوژی و کمرشکن">بوژی و کمرشکن ترافیکی</option>
                </select>
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">پلاک انتظامی:</label>
                <input type="text" class="waybill-form-input" id="wb-fleet-plate" placeholder="مثال: ۱۲ ع ۳۴۵ ایران ۲۲" />
              </div>
            </div>

            <div class="waybill-form-section-title">مشخصات محموله و پوشش بیمه‌ای</div>
            <div class="waybill-form-grid">
              <div class="waybill-form-group full">
                <label class="waybill-form-label">شرح محموله و کالا:</label>
                <input type="text" class="waybill-form-input" id="wb-cargo-desc" placeholder="شرح کامل محموله بارگیری شده..." required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">وزن ناخالص بار (کیلوگرم):</label>
                <input type="number" class="waybill-form-input" id="wb-cargo-weight" placeholder="مثال: 5000" />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">نوع بسته‌بندی:</label>
                <input type="text" class="waybill-form-input" id="wb-cargo-pack" placeholder="کارتن، پالت، فله، بشکه..." value="پالت صنعتی" />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">ارزش اعلامی محموله (تومان):</label>
                <input type="number" class="waybill-form-input" id="wb-cargo-value" placeholder="ارزش کالا جهت صدور بیمه" required />
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">شرکت بیمه‌گر طرف قرارداد:</label>
                <select class="waybill-form-select" id="wb-insurer-select">
                  <option value="بیمه ایران">بیمه ایران (پوشش کامل راهداری)</option>
                  <option value="بیمه آسیا">بیمه آسیا (کلوز تمام‌خطر)</option>
                  <option value="بیمه دانا">بیمه دانا (مسئولیت متصدی)</option>
                  <option value="بیمه البرز">بیمه البرز</option>
                </select>
              </div>
              <div class="waybill-form-group">
                <label class="waybill-form-label">کرایه خالص حمل (تومان):</label>
                <input type="number" class="waybill-form-input" id="wb-freight-cost" placeholder="کرایه توافق‌شده راننده" />
              </div>
            </div>

          </div>
          <div class="waybill-modal-footer">
            <button type="button" class="waybills-btn-secondary" id="wb-add-cancel">انصراف</button>
            <button type="button" class="waybills-btn-primary" id="wb-add-submit">
              <span class="icon">${icons.checkCircle}</span>
              <span>تایید و صدور بارنامه الکترونیک</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    document.getElementById('wb-add-close')?.addEventListener('click', close);
    document.getElementById('wb-add-cancel')?.addEventListener('click', close);

    // پیش‌پر کردن در صورت انتخاب درخواست
    const quickSelect = document.getElementById('wb-quick-select-order') as HTMLSelectElement | null;
    if (quickSelect) {
      quickSelect.addEventListener('change', () => {
        const selId = Number(quickSelect.value);
        const order = ordersList.find((o) => o.id === selId);
        if (order) {
          (document.getElementById('wb-sender-name') as HTMLInputElement).value = order.customerName || '';
          (document.getElementById('wb-sender-city') as HTMLInputElement).value = order.originCity || '';
          (document.getElementById('wb-sender-phone') as HTMLInputElement).value = order.phone || '';
          (document.getElementById('wb-sender-address') as HTMLInputElement).value = order.originNotes || '';
          (document.getElementById('wb-receiver-city') as HTMLInputElement).value = order.destinationCity || '';
          (document.getElementById('wb-receiver-address') as HTMLInputElement).value = order.destinationNotes || '';
          (document.getElementById('wb-cargo-desc') as HTMLInputElement).value = order.serviceLabel || 'کالای عمومی تجاری';
          (document.getElementById('wb-cargo-value') as HTMLInputElement).value = String(order.estimateAvg ? order.estimateAvg * 10 : 200000000);
          (document.getElementById('wb-freight-cost') as HTMLInputElement).value = String(order.estimateAvg || 15000000);
        }
      });
    }

    document.getElementById('wb-add-submit')?.addEventListener('click', () => {
      const senderName = (document.getElementById('wb-sender-name') as HTMLInputElement).value.trim();
      const senderCity = (document.getElementById('wb-sender-city') as HTMLInputElement).value.trim();
      const receiverName = (document.getElementById('wb-receiver-name') as HTMLInputElement).value.trim();
      const receiverCity = (document.getElementById('wb-receiver-city') as HTMLInputElement).value.trim();
      const driverName = (document.getElementById('wb-driver-name') as HTMLInputElement).value.trim();
      const cargoDesc = (document.getElementById('wb-cargo-desc') as HTMLInputElement).value.trim();
      const cargoVal = Number((document.getElementById('wb-cargo-value') as HTMLInputElement).value) || 100000000;

      if (!senderName || !senderCity || !receiverName || !receiverCity || !driverName || !cargoDesc) {
        showToast('لطفاً مشخصات الزامی فرستنده، گیرنده، راننده و محموله را تکمیل فرمایید.', 'error');
        return;
      }

      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const newWaybill: WaybillRecord = {
        id: `wb-${Date.now()}`,
        waybillNumber: `IR-1403-${randomNum}`,
        issueDate: '۱۴۰۳/۰۶/۲۴',
        status: 'active',
        sender: {
          name: senderName,
          city: senderCity,
          phone: (document.getElementById('wb-sender-phone') as HTMLInputElement).value.trim(),
          address: (document.getElementById('wb-sender-address') as HTMLInputElement).value.trim() || 'تهران، بارگیری مرکزی',
          nationalId: (document.getElementById('wb-sender-nid') as HTMLInputElement).value.trim(),
        },
        receiver: {
          name: receiverName,
          city: receiverCity,
          phone: (document.getElementById('wb-receiver-phone') as HTMLInputElement).value.trim(),
          address: (document.getElementById('wb-receiver-address') as HTMLInputElement).value.trim() || 'مقصد تحویل سراسری',
          nationalId: (document.getElementById('wb-receiver-nid') as HTMLInputElement).value.trim(),
        },
        driver: {
          name: driverName,
          nationalId: (document.getElementById('wb-driver-nid') as HTMLInputElement).value.trim() || '1234567890',
          licenseNumber: 'پایه یک راهداری',
          phone: (document.getElementById('wb-driver-phone') as HTMLInputElement).value.trim() || '09120000000',
          smartCardNumber: (document.getElementById('wb-driver-smart') as HTMLInputElement).value.trim() || String(randomNum),
        },
        fleet: {
          vehicleType: (document.getElementById('wb-fleet-type') as HTMLSelectElement).value,
          plateNumber: (document.getElementById('wb-fleet-plate') as HTMLInputElement).value.trim() || '۲۱ ع ۷۸۹ ایران ۳۳',
          smartCardNumber: String(randomNum + 1000),
        },
        cargo: {
          description: cargoDesc,
          weightKg: Number((document.getElementById('wb-cargo-weight') as HTMLInputElement).value) || 5000,
          packaging: (document.getElementById('wb-cargo-pack') as HTMLInputElement).value.trim() || 'پالت استاندارد',
          declaredValueToman: cargoVal,
        },
        insurance: {
          policyNumber: `INS-403-${randomNum}`,
          insurerName: (document.getElementById('wb-insurer-select') as HTMLSelectElement).value,
          coverageType: 'پوشش مسئولیت مدنی متصدی و کلوز جامع باربری راهداری',
          coverageCeilingToman: cargoVal,
          premiumToman: Math.round(cargoVal * 0.003),
        },
        freightCostToman: Number((document.getElementById('wb-freight-cost') as HTMLInputElement).value) || 20000000,
      };

      waybills.unshift(newWaybill);
      saveStoredWaybills(waybills);
      updateStats();
      renderTable();
      close();
      showToast(`بارنامه و بیمه‌نامه شماره ${newWaybill.waybillNumber} با موفقیت صادر گردید.`, 'success');
      openPrintModal(newWaybill);
    });
  }

  function exportToExcel(): void {
    if (waybills.length === 0) {
      showToast('هیچ داده‌ای برای خروجی اکسل موجود نیست.', 'error');
      return;
    }

    const headers = [
      'شماره بارنامه',
      'تاریخ صدور',
      'وضعیت',
      'شرکت بیمه‌گر',
      'شماره بیمه‌نامه',
      'سقف تعهد بیمه (تومان)',
      'فرستنده',
      'شهر مبدا',
      'تلفن فرستنده',
      'گیرنده',
      'شهر مقصد',
      'تلفن گیرنده',
      'راننده',
      'کد ملی راننده',
      'تلفن راننده',
      'نوع ناوگان',
      'پلاک انتظامی',
      'شرح محموله',
      'وزن (کیلوگرم)',
      'ارزش اعلامی محموله (تومان)',
      'کرایه حمل (تومان)',
    ];

    const rows = waybills.map((wb) => [
      wb.waybillNumber,
      wb.issueDate,
      STATUS_MAP[wb.status]?.label || wb.status,
      wb.insurance.insurerName,
      wb.insurance.policyNumber,
      wb.insurance.coverageCeilingToman,
      wb.sender.name,
      wb.sender.city,
      wb.sender.phone,
      wb.receiver.name,
      wb.receiver.city,
      wb.receiver.phone,
      wb.driver.name,
      wb.driver.nationalId,
      wb.driver.phone,
      wb.fleet.vehicleType,
      wb.fleet.plateNumber,
      `"${(wb.cargo.description || '').replace(/"/g, '""')}"`,
      wb.cargo.weightKg,
      wb.cargo.declaredValueToman,
      wb.freightCostToman,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `behbar_waybills_insurance_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('فایل اکسل بارنامه‌ها و بیمه‌نامه‌ها با موفقیت دریافت شد.', 'success');
  }

  // رویدادهای جستجو و دکمه‌ها
  searchInput?.addEventListener('input', renderTable);
  statusFilter?.addEventListener('change', renderTable);
  insurerFilter?.addEventListener('change', renderTable);
  addBtn?.addEventListener('click', openAddModal);
  exportBtn?.addEventListener('click', exportToExcel);

  updateStats();
  renderTable();
}
