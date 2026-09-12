import type { BrandingSettings } from './dynamicContent.ts';

// عنوان صفحه، og:site_name/og:title/twitter:title و name داخل JSON-LD همه به‌صورت ثابت «بهبار» در سورس
// نوشته شده‌اند (چون این‌ها فقط در همان بارگذاری اول صفحه معنا دارند و pick() برایشان به کار نمی‌رود) —
// اگر خریدار نام سایت را عوض کرده باشد، همین‌جا با جایگزینی مستقیم رشته اصلاح می‌شوند.
export function applySiteNameEverywhere(siteName?: { fa?: string; en?: string }): void {
  const name = siteName?.fa?.trim();
  if (!name || name === 'بهبار') return;

  if (document.title.includes('بهبار')) document.title = document.title.replace(/بهبار/g, name);

  document.querySelectorAll<HTMLMetaElement>('meta[property="og:site_name"], meta[property="og:title"], meta[name="twitter:title"]').forEach(
    (meta) => {
      const content = meta.getAttribute('content');
      if (content?.includes('بهبار')) meta.setAttribute('content', content.replace(/بهبار/g, name));
    },
  );

  document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((script) => {
    try {
      const data = JSON.parse(script.textContent ?? '') as Record<string, unknown>;
      let changed = false;
      if (data.name === 'بهبار') {
        data.name = name;
        changed = true;
      }
      const isPartOf = data.isPartOf as Record<string, unknown> | undefined;
      if (isPartOf?.name === 'بهبار') {
        isPartOf.name = name;
        changed = true;
      }
      if (changed) script.textContent = JSON.stringify(data);
    } catch {
      /* JSON-LD نامعتبر — نادیده گرفته می‌شود */
    }
  });
}

// پیش‌فرض همیشه همین فایل باندل‌شده است؛ اگر خریدار در تنظیمات لوگوی خودش را گذاشته باشد، همین‌جا
// جایگزین می‌شود — هم لوگوی داخل صفحه (هدر/فوتر) و هم فاوآیکن.
export function applyBranding(branding?: BrandingSettings): void {
  if (!branding) return;

  if (branding.logoUrl) {
    document.querySelectorAll<HTMLImageElement>('.header-logo img, .logo-mark').forEach((img) => {
      img.src = branding.logoUrl as string;
    });
  }

  const faviconUrl = branding.faviconUrl || branding.logoUrl;
  if (faviconUrl) {
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
      link.href = faviconUrl;
    });
  }
}
