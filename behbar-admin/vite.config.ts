import { defineConfig } from 'vite';

// پنل مدیریت پشت مسیر /management روی دامنه‌ی اصلی قرار می‌گیرد (پروکسی توسط Worker در حالت
// ابری، یا Caddy با handle_path در حالت self-host) — این base باعث می‌شود همه‌ی مسیرهای assets در
// HTML/JS ساخته‌شده با همین پیشوند تولید شوند تا درخواست‌های مرورگر درست به پروکسی برسند.
export default defineConfig({
  base: '/management/',
});
