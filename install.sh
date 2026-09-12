#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="/opt/behbar"

echo "================================================================"
echo "          نصب و راه‌اندازی اسکریپت اختصاصی بهبار (Behbar)        "
echo "================================================================"
echo ""

if [ "$(id -u)" -ne 0 ]; then
  echo "خطا: این اسکریپت باید با دسترسی روت اجرا شود (مثال: sudo bash install.sh)"
  exit 1
fi

# --- بررسی وجود فایل‌های موردنیاز در کنار نصاب ---
for req_file in "docker-compose.yml" "Caddyfile" "beh-manager.sh"; do
  if [ ! -f "$SCRIPT_DIR/$req_file" ]; then
    echo "خطا: فایل $req_file در کنار اسکریپت نصب یافت نشد."
    echo "لطفاً مطمئن شوید که تمام فایل‌های بسته را در همین مسیر استخراج نموده‌اید."
    exit 1
  fi
done

# --- بروزرسانی بسته‌های سیستم‌عامل ---
if command -v apt-get >/dev/null 2>&1; then
  echo "در حال بررسی و بروزرسانی مخازن سیستم‌عامل..."
  apt-get update -y
  apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
fi

# --- نصب داکر در صورت عدم وجود ---
if ! command -v docker >/dev/null 2>&1; then
  echo "در حال نصب خودکار Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "خطا: افزونه Docker Compose پیدا نشد. لطفاً نسخه جدید داکر را نصب نمایید."
  exit 1
fi

# --- دریافت دامنه از خریدار ---
echo ""
read -rp "دامنه یا زیردامنه سایت (مثال: behbar.example.com): " SITE_DOMAIN < /dev/tty

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ]; then
  echo "خطا: وارد کردن نام دامنه الزامی است."
  exit 1
fi

# --- بررسی اتصال DNS دامنه به این سرور ---
resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
if [ -n "$SERVER_IP" ]; then
  echo ""
  echo "در حال بررسی رکورد DNS دامنه..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")

  if [ "$SITE_IP" = "$SERVER_IP" ]; then
    echo "  [تایید] رکورد A دامنه $SITE_DOMAIN با موفقیت به آی‌پی این سرور ($SERVER_IP) متصل است."
  elif [ -n "$SITE_IP" ]; then
    echo "  [هشدار] دامنه $SITE_DOMAIN به آی‌پی $SITE_IP اشاره می‌کند در حالی که آی‌پی این سرور $SERVER_IP است."
    echo "  لطفاً رکورد A را در پنل دامنه یا کلادفلر خود ویرایش کنید."
  else
    echo "  [توجه] هنوز رکورد A برای این دامنه یافت نشد یا در حال انتشار در اینترنت است."
  fi

  echo ""
  echo "نکته مهم: اگر از کلادفلر استفاده می‌کنید، ابر پروکسی دامنه را خاموش (خاکستری / DNS only) قرار دهید تا گواهی SSL بدون مشکل صادر شود."
  echo "نصب ادامه می‌یابد..."
fi

# --- کپی فایل‌های پیکربندی و کانتینرها ---
mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/docker-compose.yml" "$INSTALL_DIR/docker-compose.yml"
cp "$SCRIPT_DIR/Caddyfile" "$INSTALL_DIR/Caddyfile"

# کپی سورس کانتینرها در صورت وجود در بسته
if [ -d "$SCRIPT_DIR/behbar-api" ]; then
  echo "در حال انتقال فایل‌های هسته برنامه..."
  rm -rf "$INSTALL_DIR/behbar-api"
  cp -r "$SCRIPT_DIR/behbar-api" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-site" ]; then
  echo "در حال انتقال فایل‌های وب‌سایت..."
  rm -rf "$INSTALL_DIR/behbar-site"
  cp -r "$SCRIPT_DIR/behbar-site" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-admin" ]; then
  echo "در حال انتقال فایل‌های پنل مدیریت..."
  rm -rf "$INSTALL_DIR/behbar-admin"
  cp -r "$SCRIPT_DIR/behbar-admin" "$INSTALL_DIR/"
fi

# --- نصب ابزار مدیریت beh-manager ---
cp "$SCRIPT_DIR/beh-manager.sh" /usr/local/bin/beh-manager
chmod +x /usr/local/bin/beh-manager

cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$SITE_DOMAIN
EOF

cd "$INSTALL_DIR"

# --- راه‌اندازی سرویس‌ها ---
echo ""
if [ -d "$INSTALL_DIR/behbar-api" ] && [ -d "$INSTALL_DIR/behbar-site" ] && [ -d "$INSTALL_DIR/behbar-admin" ]; then
  echo "در حال ساخت کانتینرهای اختصاصی بهبار (Build)..."
  docker compose build
  echo "در حال اجرای سرویس‌ها..."
  docker compose up -d
else
  echo "در حال دانلود ایمیج‌های بهبار و اجرای سرویس‌ها..."
  if ! docker compose pull; then
    echo "در حال تلاش برای ساخت مستقیم کانتینرها..."
    docker compose build || {
      echo "خطا در دانلود یا ساخت ایمیج‌ها."
      exit 1
    }
  fi
  docker compose up -d
fi

# --- انتظار برای ساخت حساب مدیر پیش‌فرض ---
echo "در حال پیکربندی اولیه و ساخت حساب مدیریت..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

echo ""
echo "================================================================"
echo "              نصب اسکریپت بهبار با موفقیت انجام شد              "
echo ""
echo "   آدرس سایت مشتریان: https://$SITE_DOMAIN"
echo "   آدرس پنل مدیریت   : https://$SITE_DOMAIN/management"
echo ""
echo " توجه: صدور گواهی امنیتی HTTPS ممکن است چند دقیقه زمان ببرد."
echo "================================================================"
echo ""
echo " برای مدیریت، تغییر دامنه، تغییر رمز مدیر یا بروزرسانی، دستور زیر را اجرا کنید:"
echo " sudo beh-manager"
echo ""
if [ -n "$CREDS" ]; then
  echo " اطلاعات ورود به پنل مدیریت (این اطلاعات را یادداشت نمایید):"
  echo "$CREDS" | sed 's/^/   /'
else
  echo " جهت مشاهده اطلاعات ورود، بعد از چند لحظه دستور زیر را اجرا کنید:"
  echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api cat /data/admin-credentials.txt"
fi
