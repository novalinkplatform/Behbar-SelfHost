import { icons } from './icons.ts';
import type { StaffInfo } from '../utils/auth.ts';
import { hasPermission } from '../utils/auth.ts';
import { renderAiWidget } from './AiWidget.ts';
import { renderLicenseLockBanner } from './LicenseLockBanner.ts';
import { renderDemoAccountBanner } from './DemoAccountBanner.ts';

export function renderShell(staff: StaffInfo): string {
  const tabs: string[] = [];
  if (hasPermission(staff, 'dashboard')) {
    tabs.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="dashboard">
        <span class="icon">${icons.chart}</span>
        <span>داشبورد</span>
      </button>
    `);
  }
  if (hasPermission(staff, 'pipeline')) {
    tabs.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="pipeline">
        <span class="icon">${icons.columns}</span>
        <span>درخواست‌ها</span>
      </button>
    `);
  }
  if (hasPermission(staff, 'map')) {
    tabs.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="map">
        <span class="icon">${icons.map}</span>
        <span>نقشه زنده</span>
      </button>
    `);
  }
  if (hasPermission(staff, 'staff')) {
    tabs.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="fleet">
        <span class="icon">${icons.truck}</span>
        <span>ناوگان</span>
      </button>
    `);
  }
  tabs.push(`
    <button type="button" class="admin-topbar-tab" data-admin-tab="home">
      <span class="icon">${icons.grid}</span>
      <span>سایر بخش‌ها</span>
    </button>
  `);

  return `
    <div class="admin-shell">
      <header class="admin-topbar">
        <div class="admin-topbar-start">
          <button type="button" class="admin-back-btn" id="admin-back-btn" hidden>
            <span class="icon">${icons.arrowRight}</span>
            <span>بازگشت</span>
          </button>
          <div class="admin-logo" id="admin-logo-btn" role="button" tabindex="0" title="صفحه اصلی">
            <img class="admin-logo-mark" src="/favicon.svg" alt="" />
            <span class="admin-logo-title">بهبار</span>
          </div>
          <nav class="admin-topbar-nav" id="admin-topbar-nav" aria-label="ناوبری اصلی">
            ${tabs.join('')}
          </nav>
        </div>
        <div class="admin-topbar-end">
          <span class="admin-topbar-version" id="admin-sidebar-version" hidden></span>
          <button type="button" class="admin-topbar-icon-btn" id="admin-wallet-btn" title="کیف پول من">
            <span class="icon">${icons.wallet}</span>
          </button>
          <button type="button" class="admin-topbar-user" id="admin-account-btn" title="امنیت حساب">${staff.fullName} · ${staff.roleLabel}</button>
          <button type="button" class="admin-nav-item admin-logout" id="logout-btn">
            <span class="icon">${icons.logout}</span>
            <span>خروج</span>
          </button>
        </div>
      </header>
      ${staff.licenseLocked ? renderLicenseLockBanner() : ''}
      ${staff.username === 'test' ? renderDemoAccountBanner() : ''}
      <main class="admin-main">
        <div id="view-container"></div>
      </main>
      ${hasPermission(staff, 'ai') ? renderAiWidget() : ''}
    </div>
  `;
}
