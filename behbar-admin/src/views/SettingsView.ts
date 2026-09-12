import { icons } from '../components/icons.ts';
import {
  fetchSettings,
  updateSetting,
  fetchPlugins,
  fetchLicense,
  activateLicense,
  downloadBackup,
  restoreBackup,
  testDriveBackup,
  prepareDriveOAuth,
  disconnectDrive,
  uploadImage,
} from '../utils/api.ts';
import type { LicenseInfo } from '../utils/api.ts';
import { getStaff, hasPermission } from '../utils/auth.ts';
import { renderUpdatePanel, initUpdatePanel } from '../components/UpdatePanel.ts';
import { ensureLanguageMode, applyLanguageVisibility } from '../utils/languageMode.ts';
import { renderPagesListView, initPagesListView } from './PagesListView.ts';
import { API_BASE_URL } from '../data/config.ts';
import type { Permission } from '../utils/auth.ts';


interface SocialLinkSetting {
  id: string;
  platform: string;
  label: string;
  url: string;
}

interface ContactSettings {
  phoneDisplay: string;
  phoneTelHref: string;
  socialIconColor?: string;
  socialLinks: SocialLinkSetting[];
}

interface AppLinkSetting {
  id: string;
  platform: string;
  label: string;
  url: string;
}

interface AppLinksSettings {
  enabled: boolean;
  links: AppLinkSetting[];
}

interface CertificationBadge {
  id: string;
  label: string;
  imageUrl: string;
  linkUrl: string;
}

interface CertificationsSettings {
  enabled: boolean;
  badges: CertificationBadge[];
}

const SOCIAL_PLATFORMS: { value: string; label: string }[] = [
  { value: 'whatsapp', label: 'واتس‌اپ' },
  { value: 'telegram', label: 'تلگرام' },
  { value: 'instagram', label: 'اینستاگرام' },
  { value: 'linkedin', label: 'لینکدین' },
  { value: 'youtube', label: 'یوتیوب' },
  { value: 'twitterX', label: 'ایکس (توییتر)' },
  { value: 'facebook', label: 'فیس‌بوک' },
  { value: 'mail', label: 'ایمیل' },
  { value: 'globe', label: 'وبسایت / سایر' },
];

const APP_PLATFORMS: { value: string; label: string }[] = [
  { value: 'googlePlay', label: 'گوگل پلی' },
  { value: 'appStore', label: 'اپ استور' },
  { value: 'bazaar', label: 'کافه‌بازار' },
  { value: 'custom', label: 'سایر' },
];


interface GoogleDrivePluginConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  refreshToken?: string;
  folderId: string;
}

interface ThemeField {
  key: string;
  label: string;
  group: string;
}

const THEME_FIELDS: ThemeField[] = [
  { key: 'primary', label: 'رنگ اصلی', group: 'برند اصلی' },
  { key: 'primaryDark', label: 'رنگ اصلی (تیره)', group: 'برند اصلی' },
  { key: 'secondary', label: 'رنگ ثانویه', group: 'برند اصلی' },
  { key: 'secondaryLight', label: 'رنگ ثانویه (روشن)', group: 'برند اصلی' },
  { key: 'background', label: 'پس‌زمینه', group: 'پس‌زمینه و متن' },
  { key: 'surface', label: 'سطح (کارت‌ها)', group: 'پس‌زمینه و متن' },
  { key: 'surfaceAlt', label: 'سطح جایگزین', group: 'پس‌زمینه و متن' },
  { key: 'text', label: 'متن', group: 'پس‌زمینه و متن' },
  { key: 'muted', label: 'متن کم‌رنگ', group: 'پس‌زمینه و متن' },
  { key: 'border', label: 'خط دور', group: 'پس‌زمینه و متن' },
  { key: 'success', label: 'موفقیت', group: 'وضعیت‌ها' },
  { key: 'successDark', label: 'موفقیت (تیره)', group: 'وضعیت‌ها' },
  { key: 'successBg', label: 'پس‌زمینه موفقیت', group: 'وضعیت‌ها' },
  { key: 'warning', label: 'هشدار', group: 'وضعیت‌ها' },
  { key: 'callGreen', label: 'رنگ تماس/واتس‌اپ', group: 'تماس' },
  { key: 'callGreenDark', label: 'رنگ تماس (تیره)', group: 'تماس' },
  { key: 'accentPurple', label: 'رنگ تاکیدی', group: 'سایر' },
  { key: 'accentPurpleLight', label: 'رنگ تاکیدی (روشن)', group: 'سایر' },
  { key: 'accentPurpleLightHover', label: 'رنگ تاکیدی (هاور)', group: 'سایر' },
  { key: 'gooseGreen', label: 'رنگ نشان‌های شماره‌دار', group: 'سایر' },
  { key: 'gooseGreenLight', label: 'رنگ نشان‌های شماره‌دار (روشن)', group: 'سایر' },
];

const THEME_DEFAULTS: Record<string, string> = {
  primary: '#1656c9',
  primaryDark: '#0f3f9c',
  secondary: '#3b7ff0',
  secondaryLight: '#e9f0fd',
  background: '#fdfcfa',
  surface: '#f6f5f1',
  surfaceAlt: '#eeece5',
  text: '#1c1b18',
  muted: '#78766f',
  border: '#e3e1d9',
  success: '#4a5940',
  successDark: '#363f2e',
  successBg: '#eef1e9',
  warning: '#a3714c',
  callGreen: '#008080',
  callGreenDark: '#005f5f',
  accentPurple: '#8b5cf6',
  accentPurpleLight: '#f2ecfd',
  accentPurpleLightHover: '#e8ddfb',
  gooseGreen: '#008080',
  gooseGreenLight: '#d9efee',
};

const SETTINGS_TABS: { id: string; label: string; permission: Permission }[] = [
  { id: 'pages', label: 'صفحات سایت', permission: 'settings' },
  { id: 'language', label: 'زبان', permission: 'settings' },
  { id: 'general', label: 'نام سایت و فوتر', permission: 'settings' },
  { id: 'contact', label: 'تماس و شبکه‌های اجتماعی', permission: 'settings' },
  { id: 'theme', label: 'رنگ‌بندی و تم', permission: 'settings' },
  { id: 'license', label: 'لایسنس', permission: 'settings' },
  { id: 'backup-update', label: 'پشتیبان‌گیری و به‌روزرسانی', permission: 'settings' },
];

function visibleTabs(): { id: string; label: string; permission: Permission }[] {
  const staff = getStaff();
  if (!staff) return [];
  return SETTINGS_TABS.filter((t) => {
    if (t.id === 'pages') return hasPermission(staff, 'settings') || hasPermission(staff, 'homepage') || hasPermission(staff, 'content');
    return hasPermission(staff, t.permission);
  });
}

export function renderSettingsView(): string {
  const tabs = visibleTabs();
  const activeId = tabs[0]?.id;
  const hiddenAttr = (id: string): string => (id === activeId ? '' : 'hidden');

  return `
    <div class="view-header">
      <h1>تنظیمات سایت</h1>
    </div>
    <p class="error-text" id="settings-error" hidden></p>
    <p class="settings-saved-note" id="settings-saved-note" hidden>ذخیره شد.</p>

    <div class="settings-tabs">
      ${tabs.map((t, i) => `<button type="button" class="settings-tab ${i === 0 ? 'is-active' : ''}" data-settings-tab="${t.id}">${t.label}</button>`).join('')}
    </div>

    <div class="settings-panel" data-settings-panel="pages" ${hiddenAttr('pages')}>
      ${renderPagesListView(true)}
    </div>

    <div class="settings-panel" data-settings-panel="language" ${hiddenAttr('language')}>
      <div class="editor-sidebar-card">
        <h3>زبان سایت</h3>
        <p class="settings-panel-hint">
          اگر سایت فقط یک زبانه است، فیلد زبان دیگر هم روی سایت (دکمه تعویض زبان) و هم در همین فرم‌های پنل مدیریت مخفی می‌شود.
        </p>
        <div class="form-field" style="max-width: 260px">
          <label for="settings-language-mode">حالت زبان</label>
          <select id="settings-language-mode">
            <option value="both">دوزبانه (فارسی و انگلیسی)</option>
            <option value="fa">فقط فارسی</option>
            <option value="en">فقط انگلیسی</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="language_mode">ذخیره زبان سایت</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="general" ${hiddenAttr('general')}>
      <div class="editor-sidebar-card">
        <h3>نام سایت</h3>
        <div class="settings-form-grid">
          <div class="form-field" data-i18n="fa"><label for="settings-site-name-fa">فارسی</label><input type="text" id="settings-site-name-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="settings-site-name-en">انگلیسی</label><input type="text" id="settings-site-name-en" dir="ltr" /></div>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="site_name">ذخیره نام سایت</button>
      </div>

      <div class="editor-sidebar-card">
        <h3>لوگو و فاوآیکن</h3>
        <p class="settings-panel-hint">
          اگر خالی بگذارید، لوگوی پیش‌فرض بهبار (در هدر، فوتر، فاوآیکن و پنل مدیریت) استفاده می‌شود.
          برای لوگوی خودتان، آدرس یک تصویر مربعی (ترجیحاً SVG یا PNG با پس‌زمینه) وارد کنید.
        </p>
        <div class="settings-form-grid">
          <div class="form-field">
            <label for="settings-logo-url">آدرس لوگو</label>
            <div class="staff-avatar-upload-row">
              <span class="staff-avatar staff-avatar-preview" id="settings-logo-preview"></span>
              <input type="text" id="settings-logo-url" dir="ltr" placeholder="/logo.svg یا https://..." />
              <button type="button" class="btn btn-secondary btn-sm" id="settings-logo-upload-btn">آپلود</button>
              <input type="file" id="settings-logo-file-input" accept="image/*" hidden />
            </div>
          </div>
          <div class="form-field">
            <label for="settings-favicon-url">آدرس فاوآیکن (اختیاری)</label>
            <div class="staff-avatar-upload-row">
              <span class="staff-avatar staff-avatar-preview" id="settings-favicon-preview"></span>
              <input type="text" id="settings-favicon-url" dir="ltr" placeholder="خالی = همان لوگو" />
              <button type="button" class="btn btn-secondary btn-sm" id="settings-favicon-upload-btn">آپلود</button>
              <input type="file" id="settings-favicon-file-input" accept="image/*" hidden />
            </div>
          </div>
        </div>
        <p class="error-text" id="settings-branding-upload-error" hidden></p>
        <button type="button" class="btn btn-primary" data-save-setting="branding">ذخیره لوگو</button>
      </div>

      <div class="editor-sidebar-card">
        <h3>شعار و پیام اصلی سایت (هیرو)</h3>
        <p class="settings-panel-hint">
          پیام و متن خوش‌آمدگویی که در بالای صفحه اصلی کنار فرم استعلام قیمت نمایش داده می‌شود.
        </p>
        <div style="margin-bottom: var(--space-4)">
          <label class="custom-page-checkbox-label" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="settings-hero-slogan-enabled" />
            <span style="font-weight: 500;">نمایش شعار در بالای صفحه اصلی</span>
          </label>
        </div>
        <div class="settings-form-grid">
          <div class="form-field" data-i18n="fa">
            <label for="settings-hero-slogan-headline-fa">عنوان اصلی / شعار (فارسی)</label>
            <input type="text" id="settings-hero-slogan-headline-fa" placeholder="حمل و جابه‌جایی، ساده‌تر از همیشه" />
          </div>
          <div class="form-field" data-i18n="en">
            <label for="settings-hero-slogan-headline-en">عنوان اصلی / شعار (انگلیسی)</label>
            <input type="text" id="settings-hero-slogan-headline-en" dir="ltr" placeholder="Moving and hauling, easier than ever" />
          </div>
        </div>
        <div class="settings-form-grid" style="margin-top: var(--space-3)">
          <div class="form-field" data-i18n="fa">
            <label for="settings-hero-slogan-subtitle-fa">توضیحات تکمیلی / زیرعنوان (فارسی)</label>
            <textarea id="settings-hero-slogan-subtitle-fa" rows="2" placeholder="برای اثاث‌کشی یا حمل بار درخواست خود را ثبت کنید؛ در سریع‌ترین زمان با شما هماهنگ می‌کنیم."></textarea>
          </div>
          <div class="form-field" data-i18n="en">
            <label for="settings-hero-slogan-subtitle-en">توضیحات تکمیلی / زیرعنوان (انگلیسی)</label>
            <textarea id="settings-hero-slogan-subtitle-en" rows="2" dir="ltr" placeholder="Submit your request for moving or freight; we'll get in touch with you as quickly as possible."></textarea>
          </div>
        </div>
        <button type="button" class="btn btn-primary" style="margin-top: var(--space-3)" data-save-setting="hero_slogan">ذخیره شعار سایت</button>
      </div>

      <div class="editor-sidebar-card">
        <h3>متن فوتر (سئو)</h3>
        <div id="settings-footer-paragraphs"></div>
        <div class="settings-form-grid" style="margin-top: var(--space-4)">
          <div class="form-field" data-i18n="fa"><label for="settings-copyright-fa">متن کپی‌رایت (فارسی)</label><input type="text" id="settings-copyright-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="settings-copyright-en">متن کپی‌رایت (انگلیسی)</label><input type="text" id="settings-copyright-en" dir="ltr" /></div>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="footer">ذخیره فوتر</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="contact" ${hiddenAttr('contact')}>
      <div class="editor-sidebar-card">
        <h3>شماره تماس</h3>
        <div class="settings-form-grid">
          <div class="form-field">
            <label for="settings-phone-display">شماره تماس (نمایشی)</label>
            <input type="text" id="settings-phone-display" dir="ltr" placeholder="021-200200" />
          </div>
          <div class="form-field">
            <label for="settings-phone-tel">لینک شماره‌گیری</label>
            <input type="text" id="settings-phone-tel" dir="ltr" placeholder="tel:+9821200200" />
          </div>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <h3>شبکه‌های اجتماعی</h3>
        <div class="form-field" style="max-width: 260px">
          <label for="social-color-hex">رنگ آیکون‌ها (اختیاری)</label>
          <div class="theme-color-input-row">
            <input type="color" id="social-color-picker" />
            <input type="text" id="social-color-hex" dir="ltr" maxlength="7" placeholder="پیش‌فرض" />
          </div>
        </div>
        <div id="social-links-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="social-link-add-btn">
          <span class="icon">${icons.plusCircle}</span>
          افزودن شبکه اجتماعی
        </button>
      </div>

      <div class="editor-sidebar-card">
        <h3>دکمه‌های تماس و چت</h3>
        <div class="form-field">
          <label for="theme-quick-actions-style">نحوه نمایش</label>
          <select id="theme-quick-actions-style">
            <option value="floating">شناور (همیشه روی صفحه ثابت می‌ماند)</option>
            <option value="fixed">فیکس (با اسکرول صفحه جابه‌جا می‌شود)</option>
          </select>
        </div>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="contact">ذخیره تماس و شبکه‌های اجتماعی</button>
      </div>

      <div class="editor-sidebar-card">
        <div class="plugin-card-head">
          <h3>دکمه‌های دانلود اپلیکیشن</h3>
          <label class="settings-inline-toggle"><input type="checkbox" id="applinks-enabled" /> فعال</label>
        </div>
        <p class="settings-panel-hint">اگر اپلیکیشن موبایل دارید، دکمه‌های دانلود آن در فوتر سایت نمایش داده می‌شود.</p>
        <div id="app-links-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="app-link-add-btn">
          <span class="icon">${icons.plusCircle}</span>
          افزودن لینک اپلیکیشن
        </button>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-primary" data-save-setting="app_links">ذخیره دکمه‌های دانلود اپ</button>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <div class="plugin-card-head">
          <h3>مجوزها و نمادهای اعتماد</h3>
          <label class="settings-inline-toggle"><input type="checkbox" id="certifications-enabled" /> فعال</label>
        </div>
        <p class="settings-panel-hint">مثلاً نماد اعتماد الکترونیکی یا ساماندهی؛ لینک تصویر نماد و لینک صفحه تایید را وارد کنید.</p>
        <div id="certifications-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="certification-add-btn">
          <span class="icon">${icons.plusCircle}</span>
          افزودن مجوز
        </button>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-primary" data-save-setting="certifications">ذخیره مجوزها</button>
        </div>
      </div>
    </div>


    <div class="settings-panel" data-settings-panel="theme" ${hiddenAttr('theme')}>
      ${Array.from(new Set(THEME_FIELDS.map((f) => f.group)))
        .map(
          (group) => `
        <div class="editor-sidebar-card">
          <h3>${group}</h3>
          <div class="theme-color-grid">
            ${THEME_FIELDS.filter((f) => f.group === group)
              .map(
                (f) => `
              <div class="theme-color-field">
                <label for="theme-${f.key}">${f.label}</label>
                <div class="theme-color-input-row">
                  <input type="color" id="theme-${f.key}-picker" data-theme-picker="${f.key}" />
                  <input type="text" id="theme-${f.key}" dir="ltr" data-theme-hex="${f.key}" maxlength="7" placeholder="#000000" />
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="theme-reset-btn">بازگردانی به پیش‌فرض</button>
        <button type="button" class="btn btn-primary" data-save-setting="theme">ذخیره رنگ‌بندی</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="license" ${hiddenAttr('license')}>
      <div class="editor-sidebar-card">
        <h3>فعال‌سازی لایسنس</h3>
        <p class="settings-panel-hint">کد لایسنسی که هنگام خرید قالب دریافت کرده‌اید را وارد کنید.</p>
        <div class="license-activate-row">
          <input type="text" id="license-key-input" dir="ltr" placeholder="BHBR-XXXX-XXXX-XXXX-XXXX" />
          <button type="button" class="btn btn-primary" id="license-activate-btn">فعال‌سازی</button>
        </div>
        <p class="error-text" id="license-activate-error" hidden></p>
      </div>
      <div id="license-panel-content"></div>
    </div>

    <div class="settings-panel" data-settings-panel="backup-update" ${hiddenAttr('backup-update')}>
      <div class="editor-sidebar-card">
        <h3>پشتیبان‌گیری دستی</h3>
        <p class="settings-panel-hint">یک فایل کامل از تمام محتوای سایت (درخواست‌ها، کارمندان، تنظیمات، مقالات، نظرات، چت‌ها، استوری‌ها و ...) دانلود یا بازیابی کنید.</p>
        <div class="settings-panel-footer" style="justify-content:flex-start">
          <button type="button" class="btn btn-secondary" id="backup-download-btn">
            <span class="icon">${icons.download}</span>
            دانلود بک‌آپ کامل
          </button>
        </div>
        <p class="error-text" id="backup-download-error" hidden></p>

        <hr style="margin:var(--space-5) 0; border:none; border-top:1px solid var(--border)" />

        <label for="backup-restore-file" style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:var(--space-2)">بازیابی از فایل بک‌آپ</label>
        <input type="file" id="backup-restore-file" accept=".sql" />
        <p class="settings-panel-hint" style="color:var(--danger)">
          توجه: بازیابی، تمام داده‌های فعلی سایت را با محتوای فایل بک‌آپ جایگزین می‌کند و غیرقابل‌بازگشت است.
        </p>
        <div class="settings-panel-footer" style="justify-content:flex-start">
          <button type="button" class="btn btn-secondary" id="backup-restore-btn" disabled>بازیابی از این فایل</button>
        </div>
        <p class="error-text" id="backup-restore-error" hidden></p>
        <p class="settings-saved-note" id="backup-restore-success" hidden>بازیابی با موفقیت انجام شد.</p>
      </div>

      <div class="editor-sidebar-card">
        <h3>ارسال خودکار روزانه به گوگل درایو</h3>
        <p class="settings-panel-hint">
          با اتصال حساب گوگل خودتان، هر شب یک نسخه‌ی پشتیبان به‌صورت خودکار در Google Drive شما ذخیره می‌شود.
        </p>

        <div class="drive-connection-status" id="drive-connection-status"></div>

        <details class="drive-oauth-setup">
          <summary>راه‌اندازی اولیه (فقط یک‌بار لازم است)</summary>
          <ol class="settings-panel-hint" style="padding-inline-start:1.2rem; margin:var(--space-2) 0">
            <li>در <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Google Cloud Console → Credentials</a> یک «OAuth client ID» از نوع Web application بسازید.</li>
            <li>این آدرس را به‌عنوان «Authorized redirect URI» اضافه کنید: <code id="drive-redirect-uri" dir="ltr"></code></li>
            <li>شناسه (Client ID) و کلید (Client Secret) را اینجا وارد و ذخیره کنید.</li>
            <li>روی «اتصال به گوگل درایو» بزنید و با حساب گوگل خودتان وارد شوید.</li>
          </ol>
        </details>

        <div class="form-field" style="margin-top:var(--space-3)">
          <label for="backup-drive-client-id">Client ID</label>
          <input type="text" id="backup-drive-client-id" dir="ltr" placeholder="xxxxx.apps.googleusercontent.com" />
        </div>
        <div class="form-field">
          <label for="backup-drive-client-secret">Client Secret</label>
          <input type="password" id="backup-drive-client-secret" dir="ltr" placeholder="GOCSPX-..." />
        </div>
        <div class="form-field">
          <label for="backup-drive-folder">شناسه‌ی پوشه‌ی Google Drive (اختیاری)</label>
          <input type="text" id="backup-drive-folder" dir="ltr" placeholder="1AbCdEfG..." />
        </div>
        <label class="settings-inline-toggle"><input type="checkbox" id="backup-drive-enabled" /> ارسال خودکار روزانه فعال باشد</label>

        <p class="error-text" id="backup-drive-error" hidden></p>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-secondary" id="backup-drive-test-btn">ارسال آزمایشی الان</button>
          <button type="button" class="btn btn-secondary" id="backup-drive-save-btn">ذخیره تنظیمات</button>
          <button type="button" class="btn btn-primary" id="backup-drive-connect-btn">اتصال به گوگل درایو</button>
          <button type="button" class="btn btn-ghost" id="backup-drive-disconnect-btn" hidden>قطع اتصال</button>
        </div>
      </div>

      ${renderUpdatePanel()}
    </div>
  `;
}

export function initSettingsView(onNavigate?: (screen: string, detail?: unknown) => void, initialTab?: string): void {
  const errorEl = document.getElementById('settings-error');
  const savedNote = document.getElementById('settings-saved-note');
  if (!errorEl || !savedNote) return;

  initPagesListView((id) => onNavigate?.('page-editor', id));

  if (initialTab) {
    const targetTabBtn = document.querySelector<HTMLButtonElement>(`[data-settings-tab="${initialTab}"]`);
    if (targetTabBtn) {
      document.querySelectorAll('[data-settings-tab]').forEach((t) => t.classList.remove('is-active'));
      targetTabBtn.classList.add('is-active');
      document.querySelectorAll<HTMLElement>('[data-settings-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.settingsPanel !== initialTab;
      });
    }
  }

  // این تابع در چند جا برای جلوگیری از فراخوانی درخواست‌های پس‌زمینه‌ای استفاده می‌شود که کارمند
  // به آن‌ها دسترسی ندارد — چون هر ۴۰۱ (حتی «این دسترسی رو نداری» برای یک بخش دیگر، نه انقضای نشست)
  // کاربر را کامل از پنل خارج می‌کند (authedFetch → onUnauthorized روی هر ۴۰۱ای فراخوانی می‌شود).
  const currentStaff = getStaff();
  void ensureLanguageMode().then(() => applyLanguageVisibility(document.body));

  function showSaved(): void {
    savedNote!.hidden = false;
    window.setTimeout(() => (savedNote!.hidden = true), 2500);
  }
  function showError(err: unknown): void {
    errorEl!.hidden = false;
    errorEl!.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
  }

  // ----- tabs -----
  document.querySelectorAll<HTMLButtonElement>('[data-settings-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-settings-tab]').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelectorAll<HTMLElement>('[data-settings-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.settingsPanel !== tab.dataset.settingsTab;
      });
    });
  });

  let settings: Record<string, unknown> = {};
  let plugins: Record<string, unknown> = {};

  // ----- لوگو و فاوآیکن: هم آدرس دستی و هم آپلود مستقیم فایل پشتیبانی می‌شود -----
  function updateBrandingPreview(kind: 'logo' | 'favicon'): void {
    const preview = document.getElementById(`settings-${kind}-preview`);
    const url = (document.getElementById(`settings-${kind}-url`) as HTMLInputElement)?.value.trim();
    if (!preview) return;
    preview.innerHTML = url ? `<img src="${url}" alt="" />` : '';
  }

  function wireBrandingUpload(kind: 'logo' | 'favicon'): void {
    const urlInput = document.getElementById(`settings-${kind}-url`) as HTMLInputElement | null;
    const uploadBtn = document.getElementById(`settings-${kind}-upload-btn`) as HTMLButtonElement | null;
    const fileInput = document.getElementById(`settings-${kind}-file-input`) as HTMLInputElement | null;
    const uploadError = document.getElementById('settings-branding-upload-error');
    if (!urlInput || !uploadBtn || !fileInput) return;

    urlInput.addEventListener('input', () => updateBrandingPreview(kind));
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      if (uploadError) uploadError.hidden = true;
      uploadBtn.disabled = true;
      const originalText = uploadBtn.textContent;
      uploadBtn.textContent = 'در حال آپلود...';
      try {
        const url = await uploadImage(file);
        urlInput.value = url;
        updateBrandingPreview(kind);
      } catch (err) {
        if (uploadError) {
          uploadError.hidden = false;
          uploadError.textContent = err instanceof Error ? err.message : 'آپلود عکس ناموفق بود.';
        }
      } finally {
        fileInput.value = '';
        uploadBtn.disabled = false;
        uploadBtn.textContent = originalText;
      }
    });
  }

  wireBrandingUpload('logo');
  wireBrandingUpload('favicon');

  // ----- general -----
  function renderGeneral(): void {
    const siteName = (settings.site_name as { fa: string; en: string } | undefined) ?? { fa: '', en: '' };
    (document.getElementById('settings-site-name-fa') as HTMLInputElement).value = siteName.fa ?? '';
    (document.getElementById('settings-site-name-en') as HTMLInputElement).value = siteName.en ?? '';

    (document.getElementById('settings-language-mode') as HTMLSelectElement).value = (settings.language_mode as string | undefined) ?? 'both';

    const branding = (settings.branding as { logoUrl?: string; faviconUrl?: string } | undefined) ?? {};
    (document.getElementById('settings-logo-url') as HTMLInputElement).value = branding.logoUrl ?? '';
    (document.getElementById('settings-favicon-url') as HTMLInputElement).value = branding.faviconUrl ?? '';
    updateBrandingPreview('logo');
    updateBrandingPreview('favicon');

    const footer = (settings.footer as { seoParagraphs: { fa: string; en: string }[]; copyright: { fa: string; en: string } } | undefined) ?? {
      seoParagraphs: [],
      copyright: { fa: '', en: '' },
    };
    const container = document.getElementById('settings-footer-paragraphs')!;
    container.innerHTML = footer.seoParagraphs
      .map(
        (p, i) => `
        <div class="settings-form-grid" data-footer-paragraph="${i}">
          <div class="form-field" data-i18n="fa"><label>پاراگراف ${i + 1} (فارسی)</label><textarea rows="3" data-field="fa">${p.fa}</textarea></div>
          <div class="form-field" data-i18n="en"><label>پاراگراف ${i + 1} (انگلیسی)</label><textarea rows="3" dir="ltr" data-field="en">${p.en}</textarea></div>
        </div>`,
      )
      .join('');
    applyLanguageVisibility(container);
    (document.getElementById('settings-copyright-fa') as HTMLInputElement).value = footer.copyright?.fa ?? '';
    (document.getElementById('settings-copyright-en') as HTMLInputElement).value = footer.copyright?.en ?? '';

    const heroSlogan = (settings.hero_slogan as {
      enabled?: boolean;
      headline?: { fa?: string; en?: string };
      subtitle?: { fa?: string; en?: string };
    } | undefined) ?? {};
    (document.getElementById('settings-hero-slogan-enabled') as HTMLInputElement).checked = heroSlogan.enabled !== false;
    (document.getElementById('settings-hero-slogan-headline-fa') as HTMLInputElement).value = heroSlogan.headline?.fa ?? '';
    (document.getElementById('settings-hero-slogan-headline-en') as HTMLInputElement).value = heroSlogan.headline?.en ?? '';
    (document.getElementById('settings-hero-slogan-subtitle-fa') as HTMLTextAreaElement).value = heroSlogan.subtitle?.fa ?? '';
    (document.getElementById('settings-hero-slogan-subtitle-en') as HTMLTextAreaElement).value = heroSlogan.subtitle?.en ?? '';
  }

  document.querySelector('[data-save-setting="site_name"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      await updateSetting('site_name', {
        fa: (document.getElementById('settings-site-name-fa') as HTMLInputElement).value,
        en: (document.getElementById('settings-site-name-en') as HTMLInputElement).value,
      });
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.querySelector('[data-save-setting="language_mode"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      await updateSetting('language_mode', (document.getElementById('settings-language-mode') as HTMLSelectElement).value);
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.querySelector('[data-save-setting="branding"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      await updateSetting('branding', {
        logoUrl: (document.getElementById('settings-logo-url') as HTMLInputElement).value.trim(),
        faviconUrl: (document.getElementById('settings-favicon-url') as HTMLInputElement).value.trim(),
      });
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.querySelector('[data-save-setting="footer"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      const paragraphNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-footer-paragraph]'));
      const seoParagraphs = paragraphNodes.map((node) => ({
        fa: node.querySelector<HTMLTextAreaElement>('[data-field="fa"]')!.value,
        en: node.querySelector<HTMLTextAreaElement>('[data-field="en"]')!.value,
      }));
      await updateSetting('footer', {
        seoParagraphs,
        copyright: {
          fa: (document.getElementById('settings-copyright-fa') as HTMLInputElement).value,
          en: (document.getElementById('settings-copyright-en') as HTMLInputElement).value,
        },
      });
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.querySelector('[data-save-setting="hero_slogan"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      await updateSetting('hero_slogan', {
        enabled: (document.getElementById('settings-hero-slogan-enabled') as HTMLInputElement).checked,
        headline: {
          fa: (document.getElementById('settings-hero-slogan-headline-fa') as HTMLInputElement).value.trim(),
          en: (document.getElementById('settings-hero-slogan-headline-en') as HTMLInputElement).value.trim(),
        },
        subtitle: {
          fa: (document.getElementById('settings-hero-slogan-subtitle-fa') as HTMLTextAreaElement).value.trim(),
          en: (document.getElementById('settings-hero-slogan-subtitle-en') as HTMLTextAreaElement).value.trim(),
        },
      });
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  // ----- contact & social -----
  let socialLinks: SocialLinkSetting[] = [];
  let appLinksState: AppLinksSettings = { enabled: false, links: [] };
  let certificationsState: CertificationsSettings = { enabled: false, badges: [] };

  function renderSocialLinksList(): void {
    const list = document.getElementById('social-links-list');
    if (!list) return;
    list.innerHTML = socialLinks
      .map(
        (link, i) => `
      <div class="settings-form-grid" data-social-link-index="${i}">
        <div class="form-field">
          <label>شبکه</label>
          <select data-field="platform">
            ${SOCIAL_PLATFORMS.map((p) => `<option value="${p.value}" ${p.value === link.platform ? 'selected' : ''}>${p.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-field"><label>برچسب</label><input type="text" data-field="label" value="${link.label}" /></div>
        <div class="form-field"><label>لینک</label><input type="text" dir="ltr" data-field="url" value="${link.url}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-social-link="${i}">حذف</button>
      </div>
    `,
      )
      .join('');
  }

  function readSocialLinksFromDom(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-social-link-index]'));
    socialLinks = els.map((el, i) => ({
      id: socialLinks[i]?.id ?? `social-${crypto.randomUUID().slice(0, 8)}`,
      platform: el.querySelector<HTMLSelectElement>('[data-field="platform"]')!.value,
      label: el.querySelector<HTMLInputElement>('[data-field="label"]')!.value,
      url: el.querySelector<HTMLInputElement>('[data-field="url"]')!.value,
    }));
  }

  document.getElementById('social-links-list')?.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-social-link]');
    if (!btn) return;
    readSocialLinksFromDom();
    socialLinks.splice(Number(btn.dataset.removeSocialLink), 1);
    renderSocialLinksList();
  });

  document.getElementById('social-link-add-btn')?.addEventListener('click', () => {
    readSocialLinksFromDom();
    socialLinks.push({ id: `social-${crypto.randomUUID().slice(0, 8)}`, platform: 'globe', label: '', url: '' });
    renderSocialLinksList();
  });

  document.getElementById('social-color-picker')?.addEventListener('input', (e) => {
    (document.getElementById('social-color-hex') as HTMLInputElement).value = (e.currentTarget as HTMLInputElement).value;
  });

  function renderContact(): void {
    const contact = (settings.contact as ContactSettings | undefined) ?? { phoneDisplay: '', phoneTelHref: '', socialLinks: [] };
    (document.getElementById('settings-phone-display') as HTMLInputElement).value = contact.phoneDisplay ?? '';
    (document.getElementById('settings-phone-tel') as HTMLInputElement).value = contact.phoneTelHref ?? '';
    (document.getElementById('social-color-hex') as HTMLInputElement).value = contact.socialIconColor ?? '';
    if (contact.socialIconColor && /^#[0-9a-fA-F]{6}$/.test(contact.socialIconColor)) {
      (document.getElementById('social-color-picker') as HTMLInputElement).value = contact.socialIconColor;
    }
    socialLinks = contact.socialLinks ?? [];
    renderSocialLinksList();
    // این فیلد رنگ نیست، ولی چون درباره‌ی همین دکمه‌های شناور تماس/چت است، اینجا ویرایش می‌شود؛
    // برای سازگاری با نسخه‌های قبلی همچنان زیر کلید «theme» ذخیره می‌شود (نه یک کلید جدید).
    const themeSettings = (settings.theme as Record<string, string> | undefined) ?? {};
    (document.getElementById('theme-quick-actions-style') as HTMLSelectElement).value =
      themeSettings.quickActionsStyle === 'fixed' ? 'fixed' : 'floating';
  }

  document.querySelector('[data-save-setting="contact"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      readSocialLinksFromDom();
      await updateSetting('contact', {
        phoneDisplay: (document.getElementById('settings-phone-display') as HTMLInputElement).value,
        phoneTelHref: (document.getElementById('settings-phone-tel') as HTMLInputElement).value,
        socialIconColor: (document.getElementById('social-color-hex') as HTMLInputElement).value.trim(),
        socialLinks,
      });
      const quickActionsStyle = (document.getElementById('theme-quick-actions-style') as HTMLSelectElement).value;
      const existingTheme = (settings.theme as Record<string, string> | undefined) ?? {};
      await updateSetting('theme', { ...existingTheme, quickActionsStyle });
      settings.theme = { ...existingTheme, quickActionsStyle };
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  // ----- app download links -----
  function renderAppLinksList(): void {
    const list = document.getElementById('app-links-list');
    if (!list) return;
    list.innerHTML = appLinksState.links
      .map(
        (link, i) => `
      <div class="settings-form-grid" data-app-link-index="${i}">
        <div class="form-field">
          <label>پلتفرم</label>
          <select data-field="platform">
            ${APP_PLATFORMS.map((p) => `<option value="${p.value}" ${p.value === link.platform ? 'selected' : ''}>${p.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-field"><label>برچسب (اختیاری)</label><input type="text" data-field="label" value="${link.label}" /></div>
        <div class="form-field"><label>لینک دانلود</label><input type="text" dir="ltr" data-field="url" value="${link.url}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-app-link="${i}">حذف</button>
      </div>
    `,
      )
      .join('');
  }

  function readAppLinksFromDom(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-app-link-index]'));
    appLinksState.links = els.map((el, i) => ({
      id: appLinksState.links[i]?.id ?? `app-${crypto.randomUUID().slice(0, 8)}`,
      platform: el.querySelector<HTMLSelectElement>('[data-field="platform"]')!.value,
      label: el.querySelector<HTMLInputElement>('[data-field="label"]')!.value,
      url: el.querySelector<HTMLInputElement>('[data-field="url"]')!.value,
    }));
  }

  document.getElementById('app-links-list')?.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-app-link]');
    if (!btn) return;
    readAppLinksFromDom();
    appLinksState.links.splice(Number(btn.dataset.removeAppLink), 1);
    renderAppLinksList();
  });

  document.getElementById('app-link-add-btn')?.addEventListener('click', () => {
    readAppLinksFromDom();
    appLinksState.links.push({ id: `app-${crypto.randomUUID().slice(0, 8)}`, platform: 'googlePlay', label: '', url: '' });
    renderAppLinksList();
  });

  function renderAppLinks(): void {
    const data = (settings.app_links as AppLinksSettings | undefined) ?? { enabled: false, links: [] };
    appLinksState = { enabled: data.enabled ?? false, links: data.links ?? [] };
    (document.getElementById('applinks-enabled') as HTMLInputElement).checked = appLinksState.enabled;
    renderAppLinksList();
  }

  document.querySelector('[data-save-setting="app_links"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      readAppLinksFromDom();
      appLinksState.enabled = (document.getElementById('applinks-enabled') as HTMLInputElement).checked;
      await updateSetting('app_links', appLinksState);
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  // ----- certifications / trust badges -----
  function renderCertificationsList(): void {
    const list = document.getElementById('certifications-list');
    if (!list) return;
    list.innerHTML = certificationsState.badges
      .map(
        (badge, i) => `
      <div class="settings-form-grid" data-certification-index="${i}">
        <div class="form-field"><label>عنوان</label><input type="text" data-field="label" value="${badge.label}" /></div>
        <div class="form-field"><label>لینک تصویر نماد</label><input type="text" dir="ltr" data-field="imageUrl" value="${badge.imageUrl}" /></div>
        <div class="form-field"><label>لینک صفحه تایید</label><input type="text" dir="ltr" data-field="linkUrl" value="${badge.linkUrl}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-certification="${i}">حذف</button>
      </div>
    `,
      )
      .join('');
  }

  function readCertificationsFromDom(): void {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-certification-index]'));
    certificationsState.badges = els.map((el, i) => ({
      id: certificationsState.badges[i]?.id ?? `cert-${crypto.randomUUID().slice(0, 8)}`,
      label: el.querySelector<HTMLInputElement>('[data-field="label"]')!.value,
      imageUrl: el.querySelector<HTMLInputElement>('[data-field="imageUrl"]')!.value,
      linkUrl: el.querySelector<HTMLInputElement>('[data-field="linkUrl"]')!.value,
    }));
  }

  document.getElementById('certifications-list')?.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-certification]');
    if (!btn) return;
    readCertificationsFromDom();
    certificationsState.badges.splice(Number(btn.dataset.removeCertification), 1);
    renderCertificationsList();
  });

  document.getElementById('certification-add-btn')?.addEventListener('click', () => {
    readCertificationsFromDom();
    certificationsState.badges.push({ id: `cert-${crypto.randomUUID().slice(0, 8)}`, label: '', imageUrl: '', linkUrl: '' });
    renderCertificationsList();
  });

  function renderCertifications(): void {
    const data = (settings.certifications as CertificationsSettings | undefined) ?? { enabled: false, badges: [] };
    certificationsState = { enabled: data.enabled ?? false, badges: data.badges ?? [] };
    (document.getElementById('certifications-enabled') as HTMLInputElement).checked = certificationsState.enabled;
    renderCertificationsList();
  }

  document.querySelector('[data-save-setting="certifications"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      readCertificationsFromDom();
      certificationsState.enabled = (document.getElementById('certifications-enabled') as HTMLInputElement).checked;
      await updateSetting('certifications', certificationsState);
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  // ----- license -----
  function renderLicensePanel(license: LicenseInfo | null): void {
    const container = document.getElementById('license-panel-content');
    if (!container) return;
    if (!license) {
      container.innerHTML = '<p class="pipeline-empty">اطلاعات لایسنسی ثبت نشده است.</p>';
      return;
    }

    const issued = new Date(license.issuedAt).getTime();
    const expires = new Date(license.expiresAt).getTime();
    const now = Date.now();
    const totalDays = Math.max(1, Math.round((expires - issued) / 86400000));
    const daysLeft = Math.max(0, Math.round((expires - now) / 86400000));
    const percentUsed = Math.min(100, Math.max(0, Math.round(((now - issued) / (expires - issued)) * 100)));
    const statusLabels: Record<LicenseInfo['status'], string> = {
      active: 'فعال',
      trial: 'آزمایشی',
      expired: 'منقضی‌شده',
      invalid: 'نامعتبر',
      suspended: 'معلق‌شده',
      revoked: 'باطل‌شده',
      domain_mismatch: 'دامنه مطابقت ندارد',
      unreachable: 'عدم دسترسی به سرور اعتبارسنجی',
    };
    const statusLabel = statusLabels[license.status] ?? license.status;

    container.innerHTML = `
      <div class="editor-sidebar-card license-card">
        <div class="plugin-card-head">
          <h3>${license.productName}</h3>
          <span class="article-status-badge article-status-${license.status === 'active' ? 'published' : 'draft'}">${statusLabel}</span>
        </div>
        <div class="license-grid">
          <div><label>کلید لایسنس</label><p dir="ltr">${license.key}</p></div>
          <div><label>طرح</label><p>${license.plan}</p></div>
          <div><label>متعلق به</label><p>${license.licensedTo}</p></div>
          <div><label>تاریخ صدور</label><p>${license.issuedAt}</p></div>
          <div><label>تاریخ انقضا</label><p>${license.expiresAt}</p></div>
          <div><label>روز باقی‌مانده</label><p class="license-days-left">${daysLeft} روز</p></div>
        </div>
        <div class="license-timeline">
          <div class="license-timeline-bar"><div class="license-timeline-fill" style="width:${percentUsed}%"></div></div>
          <div class="license-timeline-labels"><span>${totalDays - daysLeft} روز گذشته</span><span>${daysLeft} روز مانده</span></div>
        </div>
      </div>
    `;
  }

  // ----- plugins -----
  // این تابع (و باقی متغیرها/دکمه‌های زیر) فقط بخش گوگل‌درایو را پر می‌کند — پیامک و دستیار هوش
  // مصنوعی حالا صفحه‌ی مستقل خودشان را دارند («افزونه‌ها» در کاشی‌های خانه).
  function renderPlugins(): void {
    const drive = (plugins.googleDrive as GoogleDrivePluginConfig | undefined) ?? { enabled: false, clientId: '', clientSecret: '', folderId: '' };
    (document.getElementById('backup-drive-enabled') as HTMLInputElement).checked = Boolean(drive.enabled);
    (document.getElementById('backup-drive-client-id') as HTMLInputElement).value = drive.clientId ?? '';
    (document.getElementById('backup-drive-client-secret') as HTMLInputElement).value = drive.clientSecret ?? '';
    (document.getElementById('backup-drive-folder') as HTMLInputElement).value = drive.folderId ?? '';
    renderDriveConnectionStatus(Boolean(drive.refreshToken));
  }

  function renderDriveConnectionStatus(connected: boolean): void {
    const statusEl = document.getElementById('drive-connection-status');
    const disconnectBtn = document.getElementById('backup-drive-disconnect-btn');
    if (statusEl) {
      statusEl.innerHTML = connected
        ? `<span class="article-status-badge article-status-published">متصل به گوگل درایو</span>`
        : `<span class="article-status-badge">هنوز متصل نشده</span>`;
    }
    if (disconnectBtn) disconnectBtn.hidden = !connected;
  }

  // ----- theme -----
  function applyThemeFieldValue(key: string, hex: string): void {
    const hexInput = document.getElementById(`theme-${key}`) as HTMLInputElement | null;
    const pickerInput = document.getElementById(`theme-${key}-picker`) as HTMLInputElement | null;
    if (hexInput) hexInput.value = hex;
    if (pickerInput && /^#[0-9a-fA-F]{6}$/.test(hex)) pickerInput.value = hex;
  }

  function renderTheme(): void {
    const theme = (settings.theme as Record<string, string> | undefined) ?? {};
    THEME_FIELDS.forEach((f) => applyThemeFieldValue(f.key, theme[f.key] ?? THEME_DEFAULTS[f.key]));
  }

  document.querySelectorAll<HTMLInputElement>('[data-theme-picker]').forEach((picker) => {
    picker.addEventListener('input', () => {
      const key = picker.dataset.themePicker!;
      applyThemeFieldValue(key, picker.value);
    });
  });

  document.getElementById('theme-reset-btn')?.addEventListener('click', () => {
    THEME_FIELDS.forEach((f) => applyThemeFieldValue(f.key, THEME_DEFAULTS[f.key]));
  });

  document.querySelector('[data-save-setting="theme"]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    try {
      const theme: Record<string, string> = {};
      THEME_FIELDS.forEach((f) => {
        const value = (document.getElementById(`theme-${f.key}`) as HTMLInputElement).value.trim();
        theme[f.key] = /^#[0-9a-fA-F]{6}$/.test(value) ? value : THEME_DEFAULTS[f.key];
      });
      // این فیلد دیگر اینجا ویرایش نمی‌شود (به تب «تماس و شبکه‌های اجتماعی» منتقل شده)؛ برای این‌که
      // ذخیره‌ی رنگ‌بندی آخرین مقدارش را پاک نکند، همان مقدار فعلی‌اش نگه داشته می‌شود.
      const existingTheme = (settings.theme as Record<string, string> | undefined) ?? {};
      theme.quickActionsStyle = existingTheme.quickActionsStyle === 'fixed' ? 'fixed' : 'floating';
      await updateSetting('theme', theme);
      settings.theme = theme;
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      btn.disabled = false;
    }
  });

  // ----- load everything -----
  fetchSettings()
    .then((data) => {
      settings = data;

      renderGeneral();
      renderContact();
      renderTheme();
      renderAppLinks();
      renderCertifications();
    })
    .catch(showError);

  if (currentStaff && hasPermission(currentStaff, 'plugins')) {
    fetchPlugins()
      .then((data) => {
        plugins = data;
        renderPlugins();
      })
      .catch(showError);
  }

  if (currentStaff && hasPermission(currentStaff, 'settings')) {
    fetchLicense()
      .then((license) => renderLicensePanel(license))
      .catch(showError);
  }

  const licenseKeyInput = document.getElementById('license-key-input') as HTMLInputElement | null;
  const licenseActivateBtn = document.getElementById('license-activate-btn') as HTMLButtonElement | null;
  const licenseActivateError = document.getElementById('license-activate-error');
  licenseActivateBtn?.addEventListener('click', async () => {
    if (!licenseKeyInput || !licenseActivateError) return;
    const licenseKey = licenseKeyInput.value.trim();
    licenseActivateError.hidden = true;
    if (!licenseKey) {
      licenseActivateError.hidden = false;
      licenseActivateError.textContent = 'کد لایسنس را وارد کنید.';
      return;
    }
    licenseActivateBtn.disabled = true;
    try {
      const license = await activateLicense(licenseKey);
      licenseKeyInput.value = '';
      renderLicensePanel(license);
    } catch (err) {
      licenseActivateError.hidden = false;
      licenseActivateError.textContent = err instanceof Error ? err.message : 'فعال‌سازی لایسنس ناموفق بود.';
    } finally {
      licenseActivateBtn.disabled = false;
    }
  });

  // ----- پشتیبان‌گیری -----
  const backupDownloadBtn = document.getElementById('backup-download-btn') as HTMLButtonElement | null;
  const backupDownloadError = document.getElementById('backup-download-error');
  backupDownloadBtn?.addEventListener('click', async () => {
    if (!backupDownloadError) return;
    backupDownloadError.hidden = true;
    backupDownloadBtn.disabled = true;
    try {
      await downloadBackup();
    } catch (err) {
      backupDownloadError.hidden = false;
      backupDownloadError.textContent = err instanceof Error ? err.message : 'دریافت فایل پشتیبان ناموفق بود.';
    } finally {
      backupDownloadBtn.disabled = false;
    }
  });

  const backupRestoreFile = document.getElementById('backup-restore-file') as HTMLInputElement | null;
  const backupRestoreBtn = document.getElementById('backup-restore-btn') as HTMLButtonElement | null;
  const backupRestoreError = document.getElementById('backup-restore-error');
  const backupRestoreSuccess = document.getElementById('backup-restore-success');
  backupRestoreFile?.addEventListener('change', () => {
    if (backupRestoreBtn) backupRestoreBtn.disabled = !backupRestoreFile.files?.length;
    if (backupRestoreSuccess) backupRestoreSuccess.hidden = true;
  });
  backupRestoreBtn?.addEventListener('click', async () => {
    if (!backupRestoreFile || !backupRestoreError || !backupRestoreSuccess) return;
    const file = backupRestoreFile.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      'با ادامه، تمام داده‌های فعلی سایت (درخواست‌ها، کارمندان، تنظیمات، محتوا و ...) با محتوای این فایل جایگزین می‌شود و این عمل غیرقابل‌بازگشت است. مطمئنید؟',
    );
    if (!confirmed) return;

    backupRestoreError.hidden = true;
    backupRestoreSuccess.hidden = true;
    backupRestoreBtn.disabled = true;
    try {
      const text = await file.text();
      await restoreBackup(text);
      backupRestoreSuccess.hidden = false;
      backupRestoreFile.value = '';
    } catch (err) {
      backupRestoreError.hidden = false;
      backupRestoreError.textContent = err instanceof Error ? err.message : 'بازیابی پشتیبان ناموفق بود.';
    } finally {
      backupRestoreBtn.disabled = !backupRestoreFile.files?.length;
    }
  });

  // آدرس بک‌اند را نشان می‌دهیم، نه آدرس پنل — روی کلادفلر این دو دامنه‌ی متفاوتی هستند (باید همان چیزی
  // باشد که Worker خودش هنگام ساخت redirect_uri محاسبه می‌کند: new URL(request.url).origin).
  const redirectUriEl = document.getElementById('drive-redirect-uri');
  if (redirectUriEl) redirectUriEl.textContent = `${API_BASE_URL || location.origin}/api/admin/backup/drive-oauth/callback`;

  const backupDriveError = document.getElementById('backup-drive-error');
  document.getElementById('backup-drive-save-btn')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    if (!backupDriveError) return;
    backupDriveError.hidden = true;
    btn.disabled = true;
    try {
      const existing = (plugins.googleDrive as GoogleDrivePluginConfig | undefined) ?? {};
      plugins = {
        ...plugins,
        googleDrive: {
          ...existing,
          enabled: (document.getElementById('backup-drive-enabled') as HTMLInputElement).checked,
          clientId: (document.getElementById('backup-drive-client-id') as HTMLInputElement).value.trim(),
          clientSecret: (document.getElementById('backup-drive-client-secret') as HTMLInputElement).value.trim(),
          folderId: (document.getElementById('backup-drive-folder') as HTMLInputElement).value.trim(),
        },
      };
      await updateSetting('plugins', plugins);
      showSaved();
    } catch (err) {
      backupDriveError.hidden = false;
      backupDriveError.textContent = err instanceof Error ? err.message : 'ذخیره تنظیمات ناموفق بود.';
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById('backup-drive-test-btn')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    if (!backupDriveError) return;
    backupDriveError.hidden = true;
    btn.disabled = true;
    btn.textContent = 'در حال ارسال...';
    try {
      await testDriveBackup();
      showSaved();
    } catch (err) {
      backupDriveError.hidden = false;
      backupDriveError.textContent = err instanceof Error ? err.message : 'ارسال آزمایشی ناموفق بود.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'ارسال آزمایشی الان';
    }
  });

  document.getElementById('backup-drive-connect-btn')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    if (!backupDriveError) return;
    backupDriveError.hidden = true;
    btn.disabled = true;
    try {
      const authUrl = await prepareDriveOAuth();
      window.location.href = authUrl;
    } catch (err) {
      backupDriveError.hidden = false;
      backupDriveError.textContent = err instanceof Error ? err.message : 'آماده‌سازی اتصال ناموفق بود.';
      btn.disabled = false;
    }
  });

  document.getElementById('backup-drive-disconnect-btn')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    if (!backupDriveError) return;
    if (!window.confirm('اتصال به گوگل درایو قطع شود؟ ارسال خودکار روزانه متوقف می‌شود.')) return;
    backupDriveError.hidden = true;
    btn.disabled = true;
    try {
      await disconnectDrive();
      renderDriveConnectionStatus(false);
      const enabledEl = document.getElementById('backup-drive-enabled') as HTMLInputElement | null;
      if (enabledEl) enabledEl.checked = false;
    } catch (err) {
      backupDriveError.hidden = false;
      backupDriveError.textContent = err instanceof Error ? err.message : 'قطع اتصال ناموفق بود.';
    } finally {
      btn.disabled = false;
    }
  });

  if (currentStaff && hasPermission(currentStaff, 'settings')) initUpdatePanel();
}
