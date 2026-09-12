export const PERMISSIONS = [
    { key: 'pipeline', label: 'مراحل درخواست‌ها', labelEn: 'Pipeline' },
    { key: 'map', label: 'نقشه', labelEn: 'Map' },
    { key: 'dashboard', label: 'آمار و گزارش', labelEn: 'Dashboard' },
    { key: 'content', label: 'مجله و نظرات مشتریان', labelEn: 'Content' },
    { key: 'homepage', label: 'طراحی صفحه اصلی', labelEn: 'Homepage design' },
    { key: 'stories', label: 'استوری‌ها', labelEn: 'Stories' },
    { key: 'chat', label: 'چت پشتیبانی', labelEn: 'Chat' },
    { key: 'recruitment', label: 'فرصت‌های شغلی', labelEn: 'Recruitment' },
    { key: 'staff', label: 'مدیریت کارمندان', labelEn: 'Staff' },
    { key: 'roles', label: 'مدیریت نقش‌ها و اختیارات', labelEn: 'Roles' },
    { key: 'settings', label: 'تنظیمات سایت', labelEn: 'Settings' },
    { key: 'seo', label: 'سئو', labelEn: 'SEO' },
    { key: 'ai', label: 'دستیار هوش مصنوعی', labelEn: 'AI Assistant' },
    { key: 'plugins', label: 'افزونه‌ها', labelEn: 'Plugins' },
    { key: 'assignments', label: 'دریافت درخواست (راننده/کارگر)', labelEn: 'Assignments' },
    { key: 'wallet', label: 'کیف پول و حقوق و دستمزد', labelEn: 'Wallet & Payroll' },
];
export const PERMISSION_KEYS = PERMISSIONS.map((p) => p.key);
// کیف پول — یک دفتر حسابداری داخلی است (نه جابه‌جایی پول واقعی)، پس همین ثابت‌ها به‌جای CHECK سطح
// دیتابیس، اعتبارسنجی سطح برنامه را انجام می‌دهند — دقیقاً همان الگوی REQUEST_STATUSES پایین‌تر.
export const WALLET_BONUS_TYPES = ['flat', 'percent'];
export const WALLET_TX_TYPES = ['salary', 'bonus', 'adjustment', 'payout'];
export const WALLET_TX_DIRECTIONS = ['credit', 'debit'];
export const PAYOUT_REQUEST_STATUSES = ['pending', 'approved', 'rejected'];
export const REQUEST_STATUSES = [
    'pending',
    'contacted',
    'scheduled',
    'in_progress',
    'completed',
    'cancelled',
];
export const ARTICLE_STATUSES = ['draft', 'published'];
export const TESTIMONIAL_STATUSES = ['draft', 'published'];
export const JOB_APPLICATION_STATUSES = ['new', 'reviewed', 'contacted', 'hired', 'rejected'];
export const FLEET_VEHICLE_STATUSES = ['active', 'inactive', 'in_repair'];
