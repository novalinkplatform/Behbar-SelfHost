import { phoneNumberDisplay, resolveContact } from '../data/contact.ts';
import { icons } from './icons.ts';
import { pick } from '../i18n/lang.ts';
import type { AppLinkSetting, CertificationBadge, SiteSettings, SocialLinkSetting } from '../utils/dynamicContent.ts';

export function buildFooterLinks(settings?: SiteSettings): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = [];

  // همیشه خانه در ابتدا قرار می‌گیرد
  links.push({ href: '/', label: pick('خانه', 'Home') });

  const legal = settings?.legal_pages;

  // قوانین و مقررات (پیش‌فرض روشن مگر اینکه خاموش شده باشد)
  const termsShow = legal?.terms ? legal.terms.showInFooter !== false : true;
  if (termsShow) {
    links.push({
      href: '/terms',
      label: pick(legal?.terms?.title, legal?.terms?.titleEn) || pick('قوانین و مقررات', 'Terms & Conditions'),
    });
  }

  // حریم خصوصی (پیش‌فرض روشن مگر اینکه خاموش شده باشد)
  const privacyShow = legal?.privacy ? legal.privacy.showInFooter !== false : true;
  if (privacyShow) {
    links.push({
      href: '/privacy',
      label: pick(legal?.privacy?.title, legal?.privacy?.titleEn) || pick('حریم خصوصی', 'Privacy Policy'),
    });
  }

  // درباره ما (پیش‌فرض روشن مگر اینکه خاموش شده باشد)
  const aboutShow = legal?.about ? legal.about.showInFooter !== false : true;
  if (aboutShow) {
    links.push({
      href: '/about',
      label: pick(legal?.about?.title, legal?.about?.titleEn) || pick('درباره ما', 'About Us'),
    });
  }

  // صفحات اختصاصی جدید با تیک نمایش در فوتر
  if (Array.isArray(settings?.nav_pages)) {
    for (const p of settings.nav_pages) {
      if (p.showInFooter) {
        links.push({
          href: `/page/${encodeURIComponent(p.slug)}`,
          label: pick(p.title, p.titleEn) || p.title,
        });
      }
    }
  }

  return links;
}

function renderFooterLinks(settings?: SiteSettings): string {
  return buildFooterLinks(settings)
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('');
}

const FALLBACK_SITE_NAME = { fa: 'بهبار', en: 'Behbar' };
const FALLBACK_COPYRIGHT = {
  fa: 'همه حقوق برای بهبار محفوظ است.',
  en: 'All rights reserved for Behbar.',
};

const FALLBACK_SEO_PARAGRAPHS = [
  {
    fa: 'اسکریپت و سامانه جامع باربری و اسباب‌کشی آنلاین بهبار، یک راهکار نرم‌افزاری اختصاصی و پیشرفته برای اتوبارها، شرکت‌های حمل بار شهری و بین‌شهری، دفاتر لجستیک و استارتاپ‌های نوین حمل‌ونقل است. این محصول با حذف چالش‌ها و هزینه‌های بالای برنامه‌نویسی، بستری آماده، پایدار و با کارایی بسیار بالا را برای کسب‌وکارهای باربری فراهم می‌آورد تا در کوتاه‌ترین زمان ممکن، سامانه رزرواسیون آنلاین و مدیریت هوشمند ناوگان خود را با نام، نشان تجاری و دامنه اختصاصی راه‌اندازی نمایند.',
    en: 'Behbar is a comprehensive software script and automation solution for online freight, hauling, and moving operations, designed specifically for moving companies, freight dispatchers, logistics firms, and transport startups. Eliminating heavy from-scratch development costs, it provides a modern, fast, and ready-to-deploy platform for business owners to launch their branded online booking and fleet management platform.',
  },
  {
    fa: 'این سامانه بر پایه مدرن‌ترین فناوری‌های توسعه وب از جمله Node.js و زبان TypeScript بهینه‌سازی شده و از طراحی تمام‌واکنش‌گرا با فونت استاندارد Yekan Bakh بهره می‌برد. سیستم محاسبه هوشمند مسافت و برآورد زنده هزینه بر اساس کیلومتر، انتخاب چندمرحله‌ای ناوگان (وانت، نیسان، خاور، کامیون و تریلی)، تفکیک طبقات مبدأ و مقصد و جزئیات بسته‌بندی و نیروی کمکی، سیستم پیامکی احراز هویت سریع و مرکز پشتیبانی برخط از مهم‌ترین امکانات تعبیه‌شده در بخش کاربری این اسکریپت است.',
    en: 'Built on a modern web stack with Node.js and TypeScript, the software features a responsive design styled with the Yekan Bakh typeface. Key user-facing capabilities include interactive map-based pickup and delivery selection, dynamic distance-based pricing, multi-tier vehicle selection (pickups, vans, light trucks, heavy trucks, and trailers), floor and elevator factors, packing and moving labor options, fast SMS verification, and live support chat.',
  },
  {
    fa: 'پنل مدیریت یکپارچه و پیشرفته بهبار به مدیران امکان نظارت جامع بر روند سفارش‌ها، ثبت و دسته‌بندی ناوگان و رانندگان، مدیریت دقیق سطوح اختیارات پرسنل، آمار و گزارش‌های دقیق عملکردی، تنظیمات پویا روی قیمت‌گذاری و نرخ پایه‌ای، و ویرایش بلادرنگ تمام متون و صفحات وب‌سایت را بدون نیاز به دانش کدنویسی می‌دهد. ساختار سبک و بهینه‌سازی کم‌نظیر هسته سامانه، امکان اجرای روان بر روی انواع سرورها و استقرار خودکار را به ارمغان آورده است.',
    en: 'The advanced Behbar management dashboard provides complete operational oversight: live order tracking, vehicle and driver onboarding, granular role-based access control, analytics and revenue reporting, dynamic pricing management, and visual content editing for all pages without coding. The lightweight, performant architecture ensures smooth execution across various hosting environments and fast deployment.',
  },
  {
    fa: 'اسکریپت باربری آنلاین بهبار همراه با ۶ ماه پشتیبانی کامل، فایل‌های جامع راهنمای نصب و راه‌اندازی، و دسترسی به نسخه‌های به‌روزرسانی بعدی به‌صورت رسمی در مارکت معتبر ژاکت عرضه شده است. صفحه‌ای که مشاهده می‌فرمایید نسخه نمایشی زنده (Live Demo) سامانه است تا کارشناسان و خریداران گرامی بتوانند پیش از خرید، تمامی قابلیت‌های فنی، ظاهری و پنل کاربری و مدیریتی آن را بررسی فرمایند.',
    en: 'The Behbar online transport script is officially distributed on the Zhaket marketplace, including 6 months of support, complete documentation and deployment guides, and future updates. The website you are viewing is the active Live Demo, enabling prospective buyers and review specialists to explore all frontend workflows and the management panel hands-on before purchasing.',
  },
];

const SOCIAL_ICON_MAP: Record<SocialLinkSetting['platform'], keyof typeof icons> = {
  whatsapp: 'whatsappFilled',
  telegram: 'telegramFilled',
  instagram: 'instagramFilled',
  linkedin: 'linkedinFilled',
  youtube: 'youtubeFilled',
  twitterX: 'twitterXFilled',
  facebook: 'facebookFilled',
  mail: 'mailFilled',
  globe: 'globeFilled',
};

const APP_STORE_LABELS: Record<AppLinkSetting['platform'], string> = {
  googlePlay: 'Google Play',
  appStore: 'App Store',
  bazaar: 'کافه‌بازار',
  custom: '',
};

function renderSocialLinks(links: SocialLinkSetting[], colorStyle: string): string {
  if (!links.length) return '';
  return `
    <div class="footer-social" ${colorStyle}>
      ${links
        .map((link) => {
          const icon = icons[SOCIAL_ICON_MAP[link.platform] ?? 'globe'];
          const isMail = link.platform === 'mail';
          return `<a href="${link.url}" ${isMail ? '' : 'target="_blank" rel="noopener"'} aria-label="${link.label}"><span class="icon">${icon}</span></a>`;
        })
        .join('')}
    </div>
  `;
}

function renderAppLinksColumn(appLinks: SiteSettings['app_links']): string {
  if (!appLinks?.enabled || !appLinks.links.length) return '';
  return `
    <div class="footer-extras-column">
      <span class="footer-extras-label">${pick('دانلود اپلیکیشن', 'Get the app')}</span>
      <div class="footer-app-links">
        ${appLinks.links
          .map(
            (l) => `
          <a class="footer-app-badge" href="${l.url}" target="_blank" rel="noopener">
            <span class="icon">${icons.download}</span>
            <span>${l.label || APP_STORE_LABELS[l.platform]}</span>
          </a>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderCertificationsColumn(certifications: SiteSettings['certifications']): string {
  if (!certifications?.enabled || !certifications.badges.length) return '';
  return `
    <div class="footer-extras-column">
      <span class="footer-extras-label">${pick('مجوزها و نمادها', 'Licenses & trust seals')}</span>
      <div class="footer-certifications">
        ${certifications.badges
          .map(
            (b: CertificationBadge) => `
          <a class="footer-cert-badge" href="${b.linkUrl || '#'}" target="_blank" rel="noopener" aria-label="${b.label}">
            <img src="${b.imageUrl}" alt="${b.label}" loading="lazy" />
          </a>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderFooterExtras(settings?: SiteSettings): string {
  const appColumn = renderAppLinksColumn(settings?.app_links);
  const certColumn = renderCertificationsColumn(settings?.certifications);
  if (!appColumn && !certColumn) return '';
  return `<div class="footer-extras">${appColumn}${certColumn}</div>`;
}

export function renderFooter(settings?: SiteSettings): string {
  const year = new Date().getFullYear();
  const siteName = settings?.site_name ?? FALLBACK_SITE_NAME;
  const footerData = settings?.footer;
  const copyright = FALLBACK_COPYRIGHT;

  const rawSeo = footerData?.seoParagraphs;
  const isOldMovingText = !rawSeo?.length || rawSeo.some((p) => p.fa.includes('یک پلتفرم آنلاین برای ثبت درخواست اسباب‌کشی'));
  const sourceSeo = isOldMovingText ? FALLBACK_SEO_PARAGRAPHS : rawSeo;
  const seoParagraphs = sourceSeo.map((p) => ({
    fa: p.fa.replace(/به‌بار|به بار/g, 'بهبار'),
    en: p.en,
  }));

  const contact = resolveContact(settings?.contact);
  const colorStyle = contact.socialIconColor ? `style="--footer-social-color:${contact.socialIconColor}"` : '';

  return `
    <footer class="site-footer" id="footer">
      <div class="container footer-islands">
        <div class="footer-island footer-island-main">
          <div class="footer-menu-row">
            <nav class="footer-nav" aria-label="${pick('ناوبری فوتر', 'Footer navigation')}">
              <ul>
                ${renderFooterLinks(settings)}
              </ul>
            </nav>
          </div>

          <div class="footer-contact-row">
            ${renderSocialLinks(contact.socialLinks, colorStyle)}
            <a class="footer-phone" href="${contact.phoneTelHref}">
              <span class="icon">${icons.phone}</span>
              <span dir="ltr">${phoneNumberDisplay(contact)}</span>
            </a>
          </div>

          ${renderFooterExtras(settings)}

          <div class="footer-bottom">
            <p>© ${year} ${pick(copyright.fa, copyright.en)}</p>
          </div>
        </div>

        ${
          seoParagraphs.length
            ? `
        <div class="footer-island footer-island-seo">
          <div class="footer-seo-box" id="footer-seo-box">
            <h2 class="visually-hidden">${pick(`درباره اسکریپت ${siteName.fa}`, `About ${siteName.en} Script`)}</h2>
            <div class="footer-seo-text" id="footer-seo-text">
              ${seoParagraphs.map((p) => `<p>${pick(p.fa, p.en)}</p>`).join('')}
            </div>
            <button type="button" class="footer-seo-toggle" id="footer-seo-toggle" aria-expanded="false">
              <span class="footer-seo-toggle-label">${pick('ادامه مطلب', 'Read more')}</span>
              <span class="icon">${icons.chevronDown}</span>
            </button>
          </div>
        </div>
        `
            : ''
        }
      </div>
    </footer>
  `;
}

export function initFooter(settings?: SiteSettings): void {
  if (settings) {
    const navUl = document.querySelector<HTMLUListElement>('.site-footer .footer-nav ul');
    if (navUl) {
      navUl.innerHTML = renderFooterLinks(settings);
    }
  }

  const box = document.getElementById('footer-seo-box');
  const toggle = document.getElementById('footer-seo-toggle') as HTMLButtonElement | null;
  const label = toggle?.querySelector('.footer-seo-toggle-label');
  if (!box || !toggle || !label) return;

  toggle.addEventListener('click', () => {
    const expanded = box.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded ? pick('بستن', 'Close') : pick('ادامه مطلب', 'Read more');
  });
}
