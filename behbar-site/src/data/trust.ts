import type { TrustPoint } from '../types/index.ts';

// icon اینجا کلید نگاشت به آیکن است (نه SVG خام)، چون همین آرایه هم به‌عنوان مقدار پیش‌فرض تنظیمات
// قابل‌ویرایش «چرا بهبار؟» در پنل ادمین استفاده می‌شود — همان الگوی icon در DEFAULT_VEHICLE_TYPES.
export const trustPoints: TrustPoint[] = [
  { label: 'درخواست سریع و آسان', labelEn: 'Fast and easy request', icon: 'bolt' },
  { label: 'هماهنگی مستقیم، بدون واسطه', labelEn: 'Direct coordination, no middlemen', icon: 'network' },
  { label: 'انجام کار توسط خودمان', labelEn: 'The work is done by our own team', icon: 'checkCircle' },
  { label: 'پوشش خدمات مختلف حمل', labelEn: 'Coverage of various moving services', icon: 'layers' },
  { label: 'طراحی ساده و شفاف', labelEn: 'Simple, transparent design', icon: 'shield' },
];
