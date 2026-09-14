import { icons } from '../components/icons.ts';
import { formatToman, toPersianDigits } from './format.ts';
import { formatIranianDate } from './jalali.ts';

export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  amount: number;
}

export interface DetailedInvoice {
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  isIntercity: boolean;
  distanceKm: number | null;
}

export const INSURANCE_BASE_COST = 250000;
export const WAYBILL_BASE_COST = 180000;
export const FLOOR_COST_WITHOUT_ELEVATOR = 180000;
export const PACKING_COST = 900000;
export const LABOR_COST_PER_SIDE = 700000;

export function resolveOrderInvoice(order: {
  estimateAvg: number;
  serviceLabel?: string;
  originFloor?: number;
  originElevator?: boolean;
  destinationFloor?: number;
  destinationElevator?: boolean;
  wantsPacking?: boolean;
  laborChoice?: string;
  originCity?: string;
  destinationCity?: string;
}): DetailedInvoice {
  const laborChoice = (order.laborChoice || 'none') as 'none' | 'origin' | 'destination' | 'both';
  let laborAmount = 0;
  let laborDesc = 'عدم درخواست کارگر توسط مشتری';
  if (laborChoice === 'both') {
    laborAmount = LABOR_COST_PER_SIDE * 2;
    laborDesc = 'خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)';
  } else if (laborChoice === 'origin') {
    laborAmount = LABOR_COST_PER_SIDE;
    laborDesc = 'خدمات کارگر بارگیری در مبدأ';
  } else if (laborChoice === 'destination') {
    laborAmount = LABOR_COST_PER_SIDE;
    laborDesc = 'خدمات کارگر تخلیه در مقصد';
  }

  const packingAmount = order.wantsPacking ? PACKING_COST : 0;
  let floorAmount = 0;
  const floorDetails: string[] = [];
  if (!order.originElevator && (order.originFloor ?? 0) > 0) {
    floorAmount += (order.originFloor ?? 0) * FLOOR_COST_WITHOUT_ELEVATOR;
    floorDetails.push(`مبدأ: طبقه ${order.originFloor}`);
  }
  if (!order.destinationElevator && (order.destinationFloor ?? 0) > 0) {
    floorAmount += (order.destinationFloor ?? 0) * FLOOR_COST_WITHOUT_ELEVATOR;
    floorDetails.push(`مقصد: طبقه ${order.destinationFloor}`);
  }

  const insuranceAmount = INSURANCE_BASE_COST;
  const waybillAmount = WAYBILL_BASE_COST;

  const total = Math.max(order.estimateAvg || 0, 1000000);
  const extraCosts = laborAmount + packingAmount + floorAmount + insuranceAmount + waybillAmount;
  let freightAmount = total - extraCosts;
  if (freightAmount < 400000) {
    freightAmount = Math.round(total * 0.55);
  }

  const itemsSum = freightAmount + laborAmount + insuranceAmount + waybillAmount + packingAmount + floorAmount;

  const items: InvoiceItem[] = [
    {
      id: 'freight',
      title: 'کرایه پایه حمل و نقل',
      description: order.originCity && order.destinationCity
        ? `کرایه ترابری و راننده از ${order.originCity} به ${order.destinationCity}`
        : 'کرایه پایه ناوگان و راننده',
      amount: freightAmount,
    },
    {
      id: 'labor',
      title: 'خدمات نیروی کارگر باربری',
      description: laborDesc,
      amount: laborAmount,
    },
    {
      id: 'insurance',
      title: 'حق بیمه‌نامه رسمی باربری',
      description: 'پوشش کامل حوادث، آتش‌سوزی، سرقت و مسئولیت مدنی کالا حین بارگیری و حمل',
      amount: insuranceAmount,
    },
    {
      id: 'waybill',
      title: 'صدور بارنامه رسمی راهداری',
      description: 'سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری',
      amount: waybillAmount,
    },
  ];

  if (packingAmount > 0) {
    items.push({
      id: 'packing',
      title: 'خدمات بسته‌بندی و لوازم ایمن',
      description: 'کارتن‌های ۵ لایه، بابل‌رپ، سلفون‌کشی و بسته‌بندی حرفه‌ای اثاثیه',
      amount: packingAmount,
    });
  }

  if (floorAmount > 0) {
    items.push({
      id: 'floors',
      title: 'هزینه جابه‌جایی طبقات بدون آسانسور',
      description: floorDetails.join(' · '),
      amount: floorAmount,
    });
  }

  return {
    items,
    subtotal: itemsSum,
    discount: 0,
    tax: 0,
    total: itemsSum,
    isIntercity: false,
    distanceKm: null,
  };
}

export interface AdminInvoiceModalOptions {
  doc: any;
  onClose?: () => void;
}

/**
 * Isolated print function ensuring NO browser-injected header (such as "پنل مدیریت بهبار")
 * appears on top of the print or PDF output.
 */
export function printAdminInvoiceSheet(elementId: string): void {
  const sheet = document.getElementById(elementId);
  if (!sheet) {
    window.print();
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    const origTitle = document.title;
    document.title = ' ';
    window.print();
    window.addEventListener('afterprint', () => { document.title = origTitle; }, { once: true });
    setTimeout(() => { document.title = origTitle; }, 3000);
    iframe.remove();
    return;
  }

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="utf-8" />
      <title> </title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        * {
          box-sizing: border-box;
          font-family: Tahoma, 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff !important;
          color: #111827 !important;
          direction: rtl;
        }
        .behbar-invoice-sheet {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          background: white;
          padding: 16px 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
        .behbar-invoice-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #059669;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .behbar-invoice-meta {
          text-align: left;
          font-size: 0.82rem;
          line-height: 1.6;
          color: #4b5563;
        }
        .behbar-invoice-parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: #f9fafb;
          padding: 12px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
          font-size: 0.84rem;
        }
        .behbar-invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
          font-size: 0.85rem;
        }
        .behbar-invoice-table th {
          background: #f3f4f6;
          color: #374151;
          font-weight: 700;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          text-align: right;
        }
        .behbar-invoice-table td {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          text-align: right;
          vertical-align: middle;
        }
        .behbar-invoice-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }
        .behbar-invoice-footer-sign {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 0.78rem;
          color: #6b7280;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .behbar-invoice-sheet {
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      ${sheet.outerHTML}
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      window.print();
    } finally {
      setTimeout(() => iframe.remove(), 2500);
    }
  }, 300);
}

export function downloadAdminInvoiceHtml(elementId: string, trackingCode: string): void {
  const sheet = document.getElementById(elementId);
  if (!sheet) return;

  const htmlContent = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>فاکتور رسمی بهبار - #${trackingCode}</title>
  <style>
    body { font-family: Tahoma, 'Vazirmatn', sans-serif; background: #f8fafc; padding: 20px; color: #111827; margin: 0; }
    .behbar-invoice-sheet { background: white; max-width: 760px; margin: 0 auto; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .behbar-invoice-head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
    .behbar-invoice-meta { text-align: left; font-size: 0.82rem; line-height: 1.6; color: #4b5563; }
    .behbar-invoice-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f9fafb; padding: 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.85rem; }
    .behbar-invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.86rem; }
    .behbar-invoice-table th { background: #f3f4f6; color: #374151; font-weight: 700; padding: 10px 12px; border: 1px solid #e5e7eb; text-align: right; }
    .behbar-invoice-table td { padding: 10px 12px; border: 1px solid #e5e7eb; text-align: right; }
    .behbar-invoice-total { display: flex; justify-content: space-between; align-items: center; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 14px 18px; border-radius: 8px; font-size: 1.1rem; margin-bottom: 24px; }
    .behbar-invoice-footer-sign { display: flex; justify-content: space-between; align-items: flex-end; font-size: 0.8rem; color: #6b7280; }
    @media print {
      body { background: white; padding: 0; }
      .behbar-invoice-sheet { box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  ${sheet.outerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `behbar-invoice-${trackingCode}.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}

export function openAdminInvoiceModal(doc: any): void {
  let container = document.getElementById('admin-invoice-modal-portal');
  if (!container) {
    container = document.createElement('div');
    container.id = 'admin-invoice-modal-portal';
    document.body.appendChild(container);
  }

  const invoice = resolveOrderInvoice(doc);
  // Always format dates to Iranian (Jalali) calendar
  const dateStr = formatIranianDate(doc.createdAt);
  const scheduledDateStr = doc.scheduledDate ? formatIranianDate(doc.scheduledDate) : '';
  const trackingCode = doc.trackingCode || doc.tracking_code || `${doc.id}`;

  const rowsHtml = invoice.items
    .map(
      (item, idx) => `
    <tr>
      <td style="text-align: center; width: 40px; border: 1px solid #e5e7eb; padding: 10px 12px;">${toPersianDigits(idx + 1)}</td>
      <td style="border: 1px solid #e5e7eb; padding: 10px 12px;">
        <strong style="display: block; color: #1f2937; font-size: 0.92rem;">${item.title}</strong>
        <span style="display: block; color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${item.description}</span>
      </td>
      <td style="text-align: left; font-weight: 700; color: ${item.amount === 0 ? '#9ca3af' : '#059669'}; white-space: nowrap; font-size: 0.92rem; border: 1px solid #e5e7eb; padding: 10px 12px;">
        ${item.amount === 0 ? 'رایگان / بدون سفارش' : formatToman(item.amount)}
      </td>
    </tr>
  `,
    )
    .join('');

  container.innerHTML = `
    <div class="finance-modal-backdrop" id="admin-invoice-modal-backdrop" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; overflow-y: auto;">
      <div class="finance-modal-content" style="background: white; border-radius: 16px; width: 100%; max-width: 820px; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
        <div class="finance-modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="icon" style="color: #059669; width: 22px; height: 22px;">${icons.fileText}</span>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700;">فاکتور رسمی و تفکیکی بهبار</h3>
          </div>
          <button type="button" class="admin-topbar-icon-btn" id="admin-invoice-close-btn" style="background: none; border: 1px solid #e2e8f0; border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span class="icon" style="width: 18px; height: 18px;">${icons.close}</span>
          </button>
        </div>

        <div class="finance-modal-body" style="padding: 24px; overflow-y: auto; flex: 1;">
          <div class="behbar-invoice-sheet" id="admin-printable-invoice" style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; max-width: 760px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
            <!-- Header -->
            <div class="behbar-invoice-head" style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="/favicon.svg" alt="بهبار" style="width: 44px; height: 44px;" />
                <div>
                  <h2 style="margin: 0; font-size: 1.28rem; color: #059669; font-weight: 800;">سامانه ترابری هوشمند بهبار</h2>
                  <span style="font-size: 0.78rem; color: #6b7280;">سند و فاکتور رسمی خدمات حمل‌ونقل کالا، بیمه و بارنامه</span>
                </div>
              </div>
              <div class="behbar-invoice-meta" style="text-align: left; font-size: 0.82rem; line-height: 1.6; color: #4b5563;">
                <div><strong>شماره سند:</strong> <span style="font-family: monospace; direction: ltr; font-weight: 700;">#${toPersianDigits(trackingCode)}</span></div>
                <div><strong>تاریخ صدور:</strong> ${dateStr}</div>
                <div><strong>وضعیت سند:</strong> <span style="display: inline-block; padding: 2px 8px; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; border-radius: 6px; font-weight: 600; font-size: 0.75rem;">رسمی و ثبت‌شده</span></div>
              </div>
            </div>

            <!-- Parties -->
            <div class="behbar-invoice-parties" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f9fafb; padding: 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.85rem;">
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">صادرکننده خدمات:</div>
                <div style="font-weight: 600; color: #111827;">شرکت خدمات حمل‌ونقل و ترابری بهبار</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">شناسه ثبت ملی: ۵۴۹۰۲۱ · پشتیبانی شبانه‌روزی ترابری</div>
              </div>
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">طرف حساب (کارفرما / مشتری):</div>
                <div style="font-weight: 600; color: #111827;">${doc.customerName || 'مشتری گرامی'}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">شماره تماس: ${toPersianDigits(doc.phone || '-')}</div>
              </div>
            </div>

            <!-- Logistics Details -->
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; background: #ecfdf5; border: 1px solid #d1fae5; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.84rem;">
              <div>
                <span style="color: #059669; font-weight: 700;">مسیر بار:</span> ${doc.originCity || '-'} ← ${doc.destinationCity || '-'}
              </div>
              ${scheduledDateStr ? `<div><span style="color: #059669; font-weight: 700;">زمان‌بندی:</span> ${scheduledDateStr} — ساعت ${toPersianDigits(doc.scheduledTime || '')}</div>` : ''}
              <div>
                <span style="color: #059669; font-weight: 700;">خدمت:</span> ${doc.serviceLabel || 'حمل‌ونقل بار'}
              </div>
            </div>

            <!-- Table of Itemized Lines -->
            <table class="behbar-invoice-table" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.86rem;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="text-align: center; width: 40px; padding: 10px 12px; border: 1px solid #e5e7eb;">ردیف</th>
                  <th style="text-align: right; padding: 10px 12px; border: 1px solid #e5e7eb;">شرح اقلام خدمات و هزینه‌ها</th>
                  <th style="text-align: left; width: 140px; padding: 10px 12px; border: 1px solid #e5e7eb;">مبلغ (تومان)</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>

            <!-- Total -->
            <div class="behbar-invoice-total" style="display: flex; justify-content: space-between; align-items: center; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 14px 18px; border-radius: 8px; font-size: 1.1rem; margin-bottom: 24px;">
              <div>
                <span style="font-weight: 700; color: #374151;">جمع کل صورتحساب نهایی:</span>
              </div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #059669;">
                ${formatToman(invoice.total)}
              </div>
            </div>

            <!-- Stamp & Sign -->
            <div class="behbar-invoice-footer-sign" style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 0.8rem; color: #6b7280;">
              <div style="max-width: 480px; line-height: 1.5; font-size: 0.76rem;">
                این سند به‌صورت دیجیتال توسط سیستم مالی و ترابری هوشمند بهبار صادر گردیده و دارای اعتبار رسمی، پوشش بیمه‌نامه و تمبر الکترونیک بارنامه می‌باشد.
              </div>
              <div style="text-align: center; border-top: 1px dashed #d1d5db; padding-top: 6px; width: 150px; font-size: 0.78rem; color: #4b5563;">
                مهر و امضای امور مالی بهبار
              </div>
            </div>
          </div>
        </div>

        <div class="finance-modal-footer" style="display: flex; justify-content: flex-end; gap: 12px; padding: 14px 20px; border-top: 1px solid #e2e8f0; background: #f8fafc;">
          <button type="button" class="btn btn-primary" id="btn-admin-print-invoice" style="background: #059669; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="چاپ یا ذخیره فاکتور به‌صورت PDF بدون عنوان اضافی">
            <span class="icon" style="width: 16px; height: 16px;">${icons.printer}</span>
            <span>چاپ و ذخیره PDF</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-admin-download-invoice" style="background: white; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="دریافت فایل سند آفلاین فاکتور">
            <span class="icon" style="width: 16px; height: 16px;">${icons.download}</span>
            <span>دریافت فایل فاکتور</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-admin-close-modal" style="background: white; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; cursor: pointer;">
            بستن
          </button>
        </div>
      </div>
    </div>
  `;

  const close = () => {
    container!.innerHTML = '';
  };

  document.getElementById('admin-invoice-close-btn')?.addEventListener('click', close);
  document.getElementById('btn-admin-close-modal')?.addEventListener('click', close);
  document.getElementById('admin-invoice-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('admin-invoice-modal-backdrop')) close();
  });

  document.getElementById('btn-admin-print-invoice')?.addEventListener('click', () => {
    printAdminInvoiceSheet('admin-printable-invoice');
  });

  document.getElementById('btn-admin-download-invoice')?.addEventListener('click', () => {
    downloadAdminInvoiceHtml('admin-printable-invoice', trackingCode);
  });
}

