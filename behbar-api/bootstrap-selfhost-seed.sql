-- این فایل فقط برای نصب خوداستقرار (self-host) استفاده می‌شود.
-- schema.sql از قبل ساختار کامل و به‌روز همه‌ی جدول‌ها را دارد (شامل تمام تغییرات ساختاری migration-002 تا
-- migration-012)، پس migration-*.sql دوباره روی آن اجرا نمی‌شوند — فقط داده‌ی seed لازم (نقش‌ها) اینجاست،
-- با مجوزهای نهایی همان‌طور که پس از همه‌ی migration ها روی نسخه‌ی کلادفلر شکل گرفته است.
INSERT INTO roles (key, label, label_en, permissions_json, is_system) VALUES
  ('admin', 'مدیر کل', 'Admin', '["pipeline","map","dashboard","content","homepage","stories","chat","staff","roles","settings","plugins","recruitment"]', 1),
  ('manager', 'مدیر', 'Manager', '["pipeline","map","dashboard","content","stories","chat","recruitment"]', 0),
  ('driver', 'راننده', 'Driver', '["assignments"]', 0),
  ('worker', 'کارگر', 'Worker', '["assignments"]', 0),
  ('writer', 'نویسنده', 'Writer', '["content","stories"]', 0),
  ('seo', 'سئوکار', 'SEO', '["content","homepage","seo","ai"]', 0),
  ('support_agent', 'مسئول پاسخگویی', 'Support Agent', '["chat"]', 0);
