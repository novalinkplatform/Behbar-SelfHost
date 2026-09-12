CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL DEFAULT '',
  service_id TEXT NOT NULL,
  service_label TEXT NOT NULL,
  origin_province TEXT NOT NULL,
  origin_city TEXT NOT NULL,
  origin_country TEXT NOT NULL DEFAULT 'ایران',
  origin_property_type TEXT NOT NULL DEFAULT 'residential',
  origin_lat REAL,
  origin_lng REAL,
  origin_notes TEXT,
  destination_province TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  destination_country TEXT NOT NULL DEFAULT 'ایران',
  destination_property_type TEXT NOT NULL DEFAULT 'residential',
  destination_lat REAL,
  destination_lng REAL,
  destination_notes TEXT,
  origin_floor INTEGER NOT NULL,
  origin_elevator INTEGER NOT NULL,
  destination_floor INTEGER NOT NULL,
  destination_elevator INTEGER NOT NULL,
  wants_packing INTEGER NOT NULL,
  labor_choice TEXT NOT NULL,
  scheduled_date TEXT NOT NULL,
  scheduled_time TEXT NOT NULL,
  estimate_min INTEGER NOT NULL,
  estimate_avg INTEGER NOT NULL,
  estimate_max INTEGER NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_staff_id INTEGER REFERENCES staff(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_requests_phone ON requests(phone);
CREATE INDEX IF NOT EXISTS idx_requests_tracking_code ON requests(tracking_code);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON requests(created_at);
CREATE INDEX IF NOT EXISTS idx_requests_assigned_staff_id ON requests(assigned_staff_id);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  full_name TEXT NOT NULL,
  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  reset_code_hash TEXT,
  reset_code_salt TEXT,
  reset_code_expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

CREATE TABLE IF NOT EXISTS customer_sessions (
  token TEXT PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_customer_sessions_customer_id ON customer_sessions(customer_id);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  window_start TEXT NOT NULL
);

-- staff_id عمداً nullable و بدون ON DELETE CASCADE است — چون خودِ حذف کامل یک کارمند یکی از
-- رویدادهایی است که این‌جا ثبت می‌شود، رکورد لاگ باید بعد از حذف کارمند هم باقی و خوانا بماند
-- (به همین دلیل staff_name هم جداگانه ذخیره می‌شود، نه فقط با JOIN از جدول staff).
CREATE TABLE IF NOT EXISTS staff_activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER,
  staff_name TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_label TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_staff_activity_log_created_at ON staff_activity_log(created_at);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  national_id TEXT,
  address TEXT,
  hire_date TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  notes TEXT,
  gender TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  is_read_only INTEGER NOT NULL DEFAULT 0,
  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  -- ورود دومرحله‌ای پیامکی — two_fa_code_* برای هم تأیید فعال‌سازی و هم کد لحظه‌ی ورود استفاده می‌شود
  -- (هیچ‌وقت هم‌زمان لازم نیست).
  sms_2fa_enabled INTEGER NOT NULL DEFAULT 0,
  two_fa_code_hash TEXT,
  two_fa_code_salt TEXT,
  two_fa_code_expires_at TEXT,
  -- کیف پول: اگر خالی باشند، از نرخ پیش‌فرض نقش (roles.default_*) استفاده می‌شود — این‌جا فقط استثنای
  -- فردی هر کارمند نگه داشته می‌شود.
  salary_amount_override INTEGER,
  bonus_type_override TEXT,
  bonus_amount_override INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_staff_username ON staff(username);

CREATE TABLE IF NOT EXISTS staff_sessions (
  token TEXT PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_staff_sessions_staff_id ON staff_sessions(staff_id);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  content_json TEXT NOT NULL DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  author_staff_id INTEGER REFERENCES staff(id),
  reading_time INTEGER NOT NULL DEFAULT 5,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS request_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL REFERENCES requests(id),
  message TEXT NOT NULL,
  staff_id INTEGER REFERENCES staff(id),
  sms_status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_request_reports_request_id ON request_reports(request_id);

CREATE TABLE IF NOT EXISTS request_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL REFERENCES requests(id),
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  staff_id INTEGER REFERENCES staff(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_request_events_request_id ON request_events(request_id);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_name_en TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  text_en TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  sort_order INTEGER NOT NULL DEFAULT 0,
  author_staff_id INTEGER REFERENCES staff(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  label_en TEXT NOT NULL DEFAULT '',
  permissions_json TEXT NOT NULL DEFAULT '[]',
  is_system INTEGER NOT NULL DEFAULT 0,
  -- نرخ پیش‌فرض پرداخت این نقش — هر کارمند می‌تواند با staff.*_override آن را برای خودش عوض کند.
  default_salary_amount INTEGER NOT NULL DEFAULT 0,
  default_bonus_type TEXT NOT NULL DEFAULT 'flat',
  default_bonus_amount INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_roles_key ON roles(key);

CREATE TABLE IF NOT EXISTS chat_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_token TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  staff_last_read_at TEXT NOT NULL DEFAULT '1970-01-01 00:00:00',
  assigned_staff_id INTEGER REFERENCES staff(id),
  last_message_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  archived_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_token ON chat_conversations(customer_token);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_last_message ON chat_conversations(last_message_at);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_assigned_staff_id ON chat_conversations(assigned_staff_id);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL REFERENCES chat_conversations(id),
  sender TEXT NOT NULL,
  staff_id INTEGER REFERENCES staff(id),
  text TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);

CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  link_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  author_staff_id INTEGER REFERENCES staff(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_stories_sort_order ON stories(sort_order);

CREATE TABLE IF NOT EXISTS job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  position_label TEXT NOT NULL DEFAULT '',
  city TEXT,
  message TEXT,
  has_vehicle INTEGER,
  vehicle_type TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at);

CREATE TABLE IF NOT EXISTS fleet_vehicles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  label TEXT NOT NULL,
  plate_number TEXT,
  model TEXT,
  year INTEGER,
  status TEXT NOT NULL DEFAULT 'active',
  driver_staff_id INTEGER REFERENCES staff(id),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_fleet_vehicles_driver_staff_id ON fleet_vehicles(driver_staff_id);

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  device TEXT NOT NULL DEFAULT 'desktop',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);

-- هر کارمند گفتگوهای هوش مصنوعی مستقل و خصوصی خودش را دارد (نه مشترک بین کارمندان) — چون سطح
-- دسترسی ابزارها هم به همان کارمند بسته است. کل آرایه‌ی پیام‌ها به‌صورت یک JSON نگه داشته می‌شود
-- (نه یک ردیف به‌ازای هر پیام) چون همین شکل، همان چیزی است که در حافظه/شبکه رد و بدل می‌شود.
CREATE TABLE IF NOT EXISTS ai_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  title TEXT NOT NULL DEFAULT '',
  messages_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_staff_id ON ai_conversations(staff_id);

-- اعلان‌های زنده‌ی مشتری (تغییر وضعیت درخواست، پیام جدید چت پشتیبانی، ...). هر رویداد این‌جا هم ذخیره
-- می‌شود، ولو اپ اندرویدی همان لحظه متصل نبوده باشد — تا با باز شدن اپ، از طریق
-- GET /api/customer/notifications قابل بازیابی و نمایش باشد (تحویل زنده صرفاً یک میان‌بر روی همین
-- رویداد است، نه جایگزین ذخیره‌سازی آن).
CREATE TABLE IF NOT EXISTS customer_notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data_json TEXT NOT NULL DEFAULT '{}',
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_customer_notifications_customer_id ON customer_notifications(customer_id);

-- چالش موقت بین «رمز عبور تأیید شد» و «کد پیامکی هم تأیید شد» هنگام ورود — عمداً یک جدول جدا
-- (نه ستون روی staff) چون شبیه staff_sessions یک نشست موقت و مصرف‌شدنی است، نه وضعیت دائمی حساب.
CREATE TABLE IF NOT EXISTS staff_2fa_challenges (
  token TEXT PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id),
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_staff_2fa_challenges_staff_id ON staff_2fa_challenges(staff_id);

-- کیف پول کارمندان — یک دفتر حسابداری داخلی است، نه جابه‌جایی پول واقعی (هیچ درگاه پرداختی در این
-- پروژه نیست). موجودی هیچ‌وقت در ستونی ذخیره نمی‌شود؛ همیشه از SUM روی همین جدول محاسبه می‌شود، دقیقاً
-- مثل هر جای دیگر این پروژه که رول‌آپ کش‌نشده محاسبه می‌شود. staff_id عمداً nullable و بدون cascade
-- است و staff_name هم ذخیره می‌شود — دقیقاً همان الگوی staff_activity_log — چون سابقه‌ی مالی باید حتی
-- بعد از حذف کارمند خوانا بماند.
CREATE TABLE IF NOT EXISTS wallet_payout_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER,
  staff_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  staff_note TEXT,
  admin_note TEXT,
  decided_by_staff_id INTEGER REFERENCES staff(id),
  decided_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_wallet_payout_requests_staff_id ON wallet_payout_requests(staff_id);
CREATE INDEX IF NOT EXISTS idx_wallet_payout_requests_status ON wallet_payout_requests(status);

-- amount همیشه مثبت است؛ جهت واقعی از direction می‌آید — این‌طوری هیچ باگ علامت منفی/مثبتی در
-- گزارش‌ها یا خروجی‌ها ممکن نیست. یک ایندکس یکتای جزئی برای هرکدام از salary/bonus هم به‌عنوان
-- سد نهایی در برابر واریز دوباره‌ی اشتباه (نه فقط چک سطح برنامه) گذاشته شده.
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER,
  staff_name TEXT NOT NULL,
  type TEXT NOT NULL,
  direction TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  related_request_id INTEGER REFERENCES requests(id),
  payroll_month TEXT,
  payout_request_id INTEGER REFERENCES wallet_payout_requests(id),
  created_by_staff_id INTEGER REFERENCES staff(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_staff_id ON wallet_transactions(staff_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_tx_payroll_unique ON wallet_transactions(staff_id, payroll_month) WHERE type = 'salary';
CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_tx_bonus_unique ON wallet_transactions(related_request_id) WHERE type = 'bonus';

CREATE TABLE IF NOT EXISTS custom_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  content_json TEXT DEFAULT '[]',
  cover_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft',
  author_staff_id INTEGER,
  published_at TEXT,
  show_in_header INTEGER DEFAULT 0,
  show_in_footer INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_custom_pages_slug ON custom_pages(slug);
