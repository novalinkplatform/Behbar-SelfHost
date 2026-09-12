// حداقل رابطی که هم D1Database واقعی کلادفلر و هم شبیه‌ساز SQLite در حالت خوداستقرار (self-host) آن را برآورده می‌کنند —
// این‌طوری منطق src/index.ts بدون هیچ تغییری روی هر دو ران‌تایم کار می‌کند.
export interface D1LikeStatement {
  bind(...args: unknown[]): D1LikeStatement;
  all<T = unknown>(): Promise<{ results: T[] }>;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<{ meta: { last_row_id: number } }>;
}
export interface D1Like {
  prepare(query: string): D1LikeStatement;
  exec(query: string): Promise<unknown>;
  // اجرای اتمیک چند دستور بدون پارامتر (مثلاً بازیابی بک‌آپ) — روی D1 واقعی از .batch() استفاده می‌شود
  // (که کلادفلر رسماً برای همین منظور توصیه می‌کند، برخلاف .exec() که رفتار غیرقابل‌اعتمادی نشان داد)،
  // روی حالت خوداستقرار با یک تراکنش صریح BEGIN/COMMIT/ROLLBACK شبیه‌سازی می‌شود.
  batchRun(statements: string[]): Promise<void>;
}

export interface MediaObjectLike {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
}
export interface MediaListEntry {
  key: string;
  size: number;
  uploaded: string;
}
export interface MediaLike {
  put(key: string, body: ReadableStream | null, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
  get(key: string): Promise<MediaObjectLike | null>;
  list(prefix?: string): Promise<MediaListEntry[]>;
  delete(key: string): Promise<void>;
}

// حداقل رابطی که هم DurableObjectNamespace واقعی کلادفلر برآورده می‌کند و هم — چون فقط روی حالت
// خوداستقرار وجود ندارد — به‌سادگی undefined می‌ماند؛ کد باید همیشه قبل از استفاده وجودش را چک کند.
export interface CustomerNotifyHubLike {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(request: Request | string, init?: RequestInit): Promise<Response> };
}

export interface Env {
  DB: D1Like;
  // هنوز روی کلادفلر متصل نشده (بدون r2_buckets در wrangler.jsonc) — اختیاری است تا کد واقعاً همین
  // وضعیت را منعکس کند، نه اینکه چیزی را قطعی فرض کند که نیست.
  MEDIA?: MediaLike;
  // فقط روی Worker کلادفلر (Durable Object) در دسترس است؛ در حالت خوداستقرار نیست — اتصال زنده‌ی
  // اعلان به مشتری آن‌جا در دسترس نیست، اما خود اعلان‌ها همچنان در جدول customer_notifications ذخیره
  // و هنگام باز شدن اپ قابل بازیابی‌اند.
  CUSTOMER_NOTIFY_HUB?: CustomerNotifyHubLike;
  ALLOWED_ORIGIN: string;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  LICENSE_API_URL: string;
  // فقط حالت خوداستقرار 'selfhost' است؛ روی Worker کلادفلر همیشه 'cloudflare' — تعیین می‌کند که آیا بخش
  // به‌روزرسانی (که بر پایه‌ی docker compose است) در پنل ادمین نمایش داده شود یا نه.
  RUNTIME: 'selfhost' | 'cloudflare';
}

// نقش‌ها دیگر ثابت نیستند؛ در جدول roles نگه داشته می‌شوند و مقدار role در staff فقط یک کلید متنی است.
export type StaffRole = string;

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
] as const;
export type Permission = (typeof PERMISSIONS)[number]['key'];
export const PERMISSION_KEYS: Permission[] = PERMISSIONS.map((p) => p.key);

export interface RoleRow {
  id: number;
  key: string;
  label: string;
  label_en: string;
  permissions_json: string;
  is_system: number;
  default_salary_amount: number;
  default_bonus_type: WalletBonusType;
  default_bonus_amount: number;
  created_at: string;
  updated_at: string;
}

export interface StaffRow {
  id: number;
  username: string;
  password_hash: string;
  password_salt: string;
  full_name: string;
  role: StaffRole;
  phone: string | null;
  avatar_url: string | null;
  national_id: string | null;
  address: string | null;
  hire_date: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
  gender: string | null;
  is_active: number;
  is_read_only: number;
  failed_login_attempts: number;
  locked_until: string | null;
  sms_2fa_enabled: number;
  two_fa_code_hash: string | null;
  two_fa_code_salt: string | null;
  two_fa_code_expires_at: string | null;
  salary_amount_override: number | null;
  bonus_type_override: WalletBonusType | null;
  bonus_amount_override: number | null;
  created_at: string;
}

export interface CustomerRow {
  id: number;
  phone: string;
  password_hash: string;
  password_salt: string;
  full_name: string;
  gender?: string | null;
  company_name?: string | null;
  failed_login_attempts: number;
  locked_until: string | null;
  reset_code_hash: string | null;
  reset_code_salt: string | null;
  reset_code_expires_at: string | null;
  created_at: string;
}

export interface CustomerAddressRow {
  id: number;
  customer_id: number;
  title: string;
  city: string;
  address: string;
  floor?: string | null;
  unit?: string | null;
  has_elevator: number;
  notes?: string | null;
  created_at: string;
}

export interface AuthedStaff extends StaffRow {
  permissions: Permission[];
}

// کیف پول — یک دفتر حسابداری داخلی است (نه جابه‌جایی پول واقعی)، پس همین ثابت‌ها به‌جای CHECK سطح
// دیتابیس، اعتبارسنجی سطح برنامه را انجام می‌دهند — دقیقاً همان الگوی REQUEST_STATUSES پایین‌تر.
export const WALLET_BONUS_TYPES = ['flat', 'percent'] as const;
export type WalletBonusType = (typeof WALLET_BONUS_TYPES)[number];

export const WALLET_TX_TYPES = ['salary', 'bonus', 'adjustment', 'payout'] as const;
export type WalletTxType = (typeof WALLET_TX_TYPES)[number];

export const WALLET_TX_DIRECTIONS = ['credit', 'debit'] as const;
export type WalletTxDirection = (typeof WALLET_TX_DIRECTIONS)[number];

export const PAYOUT_REQUEST_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type PayoutRequestStatus = (typeof PAYOUT_REQUEST_STATUSES)[number];

export interface WalletTransactionRow {
  id: number;
  staff_id: number | null;
  staff_name: string;
  type: WalletTxType;
  direction: WalletTxDirection;
  amount: number;
  description: string;
  related_request_id: number | null;
  payroll_month: string | null;
  payout_request_id: number | null;
  created_by_staff_id: number | null;
  created_at: string;
}

export interface WalletPayoutRequestRow {
  id: number;
  staff_id: number | null;
  staff_name: string;
  amount: number;
  status: PayoutRequestStatus;
  staff_note: string | null;
  admin_note: string | null;
  decided_by_staff_id: number | null;
  decided_at: string | null;
  created_at: string;
}

export const REQUEST_STATUSES = [
  'pending',
  'contacted',
  'scheduled',
  'in_progress',
  'completed',
  'cancelled',
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface RequestEventRow {
  id: number;
  request_id: number;
  event_type: string;
  description: string;
  staff_id: number | null;
  created_at: string;
}

export interface RequestRow {
  id: number;
  tracking_code: string;
  customer_name: string;
  service_id: string;
  service_label: string;
  origin_province: string;
  origin_city: string;
  origin_country: string;
  origin_property_type: string;
  origin_lat: number | null;
  origin_lng: number | null;
  origin_notes: string | null;
  destination_province: string;
  destination_city: string;
  destination_country: string;
  destination_property_type: string;
  destination_lat: number | null;
  destination_lng: number | null;
  destination_notes: string | null;
  origin_floor: number;
  origin_elevator: number;
  destination_floor: number;
  destination_elevator: number;
  wants_packing: number;
  labor_choice: string;
  scheduled_date: string;
  scheduled_time: string;
  estimate_min: number;
  estimate_avg: number;
  estimate_max: number;
  phone: string;
  status: RequestStatus;
  assigned_staff_id: number | null;
  created_at: string;
  updated_at: string;
}

export const ARTICLE_STATUSES = ['draft', 'published'] as const;
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export interface ArticleRow {
  id: number;
  slug: string;
  title: string;
  title_en: string;
  excerpt: string;
  excerpt_en: string;
  category: string;
  category_en: string;
  cover_image_url: string | null;
  content_json: string;
  meta_title: string | null;
  meta_description: string | null;
  status: ArticleStatus;
  author_staff_id: number | null;
  reading_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SettingRow {
  key: string;
  value_json: string;
  updated_at: string;
}

export const TESTIMONIAL_STATUSES = ['draft', 'published'] as const;
export type TestimonialStatus = (typeof TESTIMONIAL_STATUSES)[number];

export interface TestimonialRow {
  id: number;
  customer_name: string;
  customer_name_en: string;
  text: string;
  text_en: string;
  rating: number;
  avatar_url: string | null;
  status: TestimonialStatus;
  sort_order: number;
  author_staff_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface RequestReportRow {
  id: number;
  request_id: number;
  message: string;
  staff_id: number | null;
  staff_name: string | null;
  sms_status: string;
  created_at: string;
}

export interface ChatConversationRow {
  id: number;
  customer_token: string;
  customer_name: string | null;
  customer_phone: string | null;
  status: string;
  staff_last_read_at: string;
  assigned_staff_id: number | null;
  last_message_at: string;
  created_at: string;
  archived_at: string | null;
}

export interface ChatMessageRow {
  id: number;
  conversation_id: number;
  sender: string;
  staff_id: number | null;
  staff_name: string | null;
  staff_avatar_url: string | null;
  text: string;
  message_type: string;
  created_at: string;
}

export interface StoryRow {
  id: number;
  image_url: string;
  caption: string;
  caption_en: string;
  link_url: string | null;
  sort_order: number;
  author_staff_id: number | null;
  created_at: string;
  updated_at: string;
}

export const JOB_APPLICATION_STATUSES = ['new', 'reviewed', 'contacted', 'hired', 'rejected'] as const;
export type JobApplicationStatus = (typeof JOB_APPLICATION_STATUSES)[number];

export interface JobApplicationRow {
  id: number;
  full_name: string;
  phone: string;
  position: string;
  position_label: string;
  city: string | null;
  message: string | null;
  has_vehicle: number | null;
  vehicle_type: string | null;
  status: JobApplicationStatus;
  created_at: string;
  updated_at: string;
}

export const FLEET_VEHICLE_STATUSES = ['active', 'inactive', 'in_repair'] as const;
export type FleetVehicleStatus = (typeof FLEET_VEHICLE_STATUSES)[number];

export interface FleetVehicleRow {
  id: number;
  type: string;
  label: string;
  plate_number: string | null;
  model: string | null;
  year: number | null;
  status: FleetVehicleStatus;
  driver_staff_id: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageViewRow {
  id: number;
  visitor_id: string;
  path: string;
  referrer: string | null;
  device: string;
  created_at: string;
}
