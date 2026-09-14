import { icons } from './icons.ts';
import { formatToman } from '../utils/format.ts';
import { toPersianDigits } from '../utils/jalali.ts';
import { pick } from '../i18n/lang.ts';
import type { DetailedInvoice } from '../data/pricing.ts';

export interface CustomerInvoiceData {
  trackingCode: string;
  customerName: string;
  phone: string;
  serviceLabel: string;
  originProvince?: string;
  originCity: string;
  destinationProvince?: string;
  destinationCity: string;
  scheduledDate: string;
  scheduledTime: string;
  createdAt?: string;
  statusLabel?: string;
  invoice: DetailedInvoice;
}

export function openCustomerInvoiceModal(data: CustomerInvoiceData): void {
  const existing = document.getElementById('behbar-invoice-modal-overlay');
  if (existing) existing.remove();

  const issueDate = data.createdAt ? data.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10);

  const rowsHtml = data.invoice.items
    .map(
      (item, idx) => `
    <tr>
      <td style="text-align: center; width: 40px;">${toPersianDigits(idx + 1)}</td>
      <td>
        <strong style="display: block; color: #1f2937; font-size: 0.92rem;">${item.title}</strong>
        <span style="display: block; color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${item.description}</span>
      </td>
      <td style="text-align: left; font-weight: 700; color: ${item.amount === 0 ? '#9ca3af' : '#059669'}; white-space: nowrap; font-size: 0.92rem;">
        ${item.amount === 0 ? pick('رایگان / بدون سفارش', 'Free / Not requested') : formatToman(item.amount)}
      </td>
    </tr>
  `,
    )
    .join('');

  const modalHtml = `
    <div class="invoice-modal-overlay" id="behbar-invoice-modal-overlay">
      <div class="invoice-modal-dialog">
        <div class="invoice-modal-topbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="icon" style="color: #059669; width: 22px; height: 22px;">${icons.fileText}</span>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 700;">${pick('فاکتور رسمی خدمات بهبار', 'Official Service Invoice')}</h3>
          </div>
          <button type="button" class="invoice-modal-close-btn" id="invoice-modal-close" title="${pick('بستن', 'Close')}">
            <span class="icon">${icons.close}</span>
          </button>
        </div>

        <div class="invoice-modal-body">
          <div class="behbar-invoice-sheet" id="behbar-customer-printable-sheet">
            <!-- Header -->
            <div class="behbar-invoice-head">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="/favicon.svg" alt="بهبار" style="width: 44px; height: 44px;" />
                <div>
                  <h2 style="margin: 0; font-size: 1.28rem; color: #059669; font-weight: 800;">${pick('سامانه ترابری هوشمند بهبار', 'Behbar Smart Transport')}</h2>
                  <span style="font-size: 0.78rem; color: #6b7280;">${pick('صورتحساب و سند رسمی خدمات حمل‌ونقل کالا و اثاثیه', 'Official Transport & Moving Invoice')}</span>
                </div>
              </div>
              <div class="behbar-invoice-meta">
                <div><strong>${pick('شماره سند / پیگیری:', 'Doc / Tracking No:')}</strong> <span style="font-family: monospace; direction: ltr; font-weight: 700;">#${toPersianDigits(data.trackingCode)}</span></div>
                <div><strong>${pick('تاریخ صدور:', 'Issue Date:')}</strong> ${toPersianDigits(issueDate)}</div>
                ${data.statusLabel ? `<div><strong>${pick('وضعیت درخواست:', 'Status:')}</strong> <span class="invoice-badge-status">${data.statusLabel}</span></div>` : ''}
              </div>
            </div>

            <!-- Parties -->
            <div class="behbar-invoice-parties">
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${pick('صادرکننده خدمات:', 'Service Provider:')}</div>
                <div style="font-weight: 600; color: #111827;">${pick('شرکت خدمات ترابری بهبار', 'Behbar Transport Co.')}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${pick('شناسه ثبت رسمی ترابری · سامانه برخط پشتیبانی ۲۴ ساعته', 'Licensed Transport Provider · 24/7 Support')}</div>
              </div>
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${pick('طرف حساب (کارفرما / مشتری):', 'Customer / Bill To:')}</div>
                <div style="font-weight: 600; color: #111827;">${data.customerName || pick('مشتری گرامی', 'Valued Customer')}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${pick('شماره تماس:', 'Phone:')} ${toPersianDigits(data.phone)}</div>
              </div>
            </div>

            <!-- Logistics Details -->
            <div class="behbar-invoice-route">
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${icons.pin}</span>
                <span><strong>${pick('مبدأ و مقصد:', 'Route:')}</strong> ${data.originCity} ← ${data.destinationCity}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${icons.calendar}</span>
                <span><strong>${pick('زمان‌بندی حمل:', 'Schedule:')}</strong> ${data.scheduledDate} — ${pick('ساعت', 'at')} ${toPersianDigits(data.scheduledTime)}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${icons.route}</span>
                <span><strong>${pick('نوع خدمت:', 'Service:')}</strong> ${data.serviceLabel}</span>
              </div>
            </div>

            <!-- Itemized Table -->
            <table class="behbar-invoice-table">
              <thead>
                <tr>
                  <th style="text-align: center; width: 40px;">${pick('ردیف', '#')}</th>
                  <th>${pick('شرح اقلام خدمات و هزینه‌ها', 'Description of Services & Fees')}</th>
                  <th style="text-align: left; width: 140px;">${pick('مبلغ (تومان)', 'Amount (Toman)')}</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>

            <!-- Total -->
            <div class="behbar-invoice-total">
              <div>
                <span style="font-weight: 700; color: #374151;">${pick('جمع کل صورتحساب نهایی:', 'Total Invoice Amount:')}</span>
              </div>
              <div style="font-size: 1.22rem; font-weight: 800; color: #059669;">
                ${formatToman(data.invoice.total)}
              </div>
            </div>

            <!-- Legal Footer -->
            <div class="behbar-invoice-footer-sign">
              <div style="font-size: 0.76rem; color: #6b7280; max-width: 480px; line-height: 1.5;">
                ${pick(
                  'این فاکتور به‌صورت الکترونیکی و رسمی توسط سامانه بهبار صادر شده و دارای پوشش بیمه‌نامه معتبر و تمبر قانونی بارنامه می‌باشد.',
                  'This invoice was generated electronically by Behbar with valid cargo insurance and official waybill coverage.',
                )}
              </div>
              <div style="text-align: center; border-top: 1px dashed #d1d5db; padding-top: 6px; width: 150px; font-size: 0.78rem; color: #4b5563;">
                ${pick('مهر و امضای دیجیتال ترابری بهبار', 'Digital Seal & Signature')}
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-modal-actions">
          <button type="button" class="btn btn-primary" id="btn-print-customer-invoice">
            <span class="icon">${icons.printer}</span>
            <span>${pick('چاپ و دریافت فاکتور', 'Print / Save Invoice')}</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-close-customer-invoice">
            ${pick('بستن', 'Close')}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const overlay = document.getElementById('behbar-invoice-modal-overlay');
  const closeBtn = document.getElementById('invoice-modal-close');
  const closeBottomBtn = document.getElementById('btn-close-customer-invoice');
  const printBtn = document.getElementById('btn-print-customer-invoice');

  const close = () => overlay?.remove();

  closeBtn?.addEventListener('click', close);
  closeBottomBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  printBtn?.addEventListener('click', () => {
    window.print();
  });
}
