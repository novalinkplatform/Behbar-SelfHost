// یک Worker مستقل و کوچک، جدا از behbar-api: فقط مسیر /management روی دامنه‌ی اصلی را به‌صورت
// شفاف به پروژه‌ی جداگانه‌ی Behbar-Admin روی Pages پروکسی می‌کند (Pages خودش نمی‌تواند به یک
// پروژه‌ی دیگر پروکسی کند — فقط مسیرهای داخلی همان پروژه را). هر چیز دیگر روی دامنه همچنان
// مستقیم توسط پروژه‌ی behbar در Pages سرو می‌شود و اصلاً وارد این Worker نمی‌شود.
const ADMIN_ORIGIN = 'https://behbar-admin.pages.dev';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // HTML/JS ساخته‌شده با base:/management/ درخواست‌ها را با همین پیشوند می‌فرستد، اما خود پروژه‌ی
    // Behbar-Admin روی Pages فایل‌هایش را بدون پیشوند سرو می‌کند — پس اینجا باید حذف شود.
    const strippedPath = url.pathname.replace(/^\/management/, '') || '/';
    const upstreamUrl = new URL(strippedPath + url.search, ADMIN_ORIGIN);
    const upstreamRequest = new Request(upstreamUrl, request);
    return fetch(upstreamRequest);
  },
};
