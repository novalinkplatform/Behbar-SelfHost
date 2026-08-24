#!/usr/bin/env bash
set -euo pipefail

REPO_RAW_BASE="https://raw.githubusercontent.com/siamakgarawan/Behbar-SelfHost/main"
INSTALL_DIR="/opt/behbar"

echo "=== نصب بهبار ==="
echo ""

if [ "$(id -u)" -ne 0 ]; then
  echo "این اسکریپت باید با دسترسی root اجرا شود (مثلاً: sudo bash install.sh)"
  exit 1
fi

# --- نصب داکر در صورت نبود ---
if ! command -v docker >/dev/null 2>&1; then
  echo "در حال نصب Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "افزونه‌ی Docker Compose پیدا نشد. لطفاً یک نسخه‌ی جدیدتر Docker نصب کنید."
  exit 1
fi

# --- گرفتن دو آدرس از کاربر ---
# چون این اسکریپت معمولاً با curl | bash اجرا می‌شود، ورودی باید مستقیم از ترمینال (/dev/tty) خوانده شود.
read -rp "آدرس دامنه‌ی سایت مشتری (مثلاً: behbar.example.com): " SITE_DOMAIN < /dev/tty
read -rp "آدرس دامنه‌ی پنل مدیریت (مثلاً: admin.example.com): " ADMIN_DOMAIN < /dev/tty

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')
ADMIN_DOMAIN=$(echo "$ADMIN_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ] || [ -z "$ADMIN_DOMAIN" ]; then
  echo "هر دو آدرس الزامی هستند."
  exit 1
fi

# --- بررسی اینکه هر دو دامنه واقعاً به این سرور اشاره می‌کنند ---
# با DNS-over-HTTPS گوگل چک می‌شود (مستقل از اینکه DNS خود دامنه کجا مدیریت می‌شود — کلادفلر، سایر شرکت‌ها، هرجا).
resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
if [ -n "$SERVER_IP" ]; then
  echo ""
  echo "در حال بررسی DNS دامنه‌ها..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")
  ADMIN_IP=$(resolve_domain "$ADMIN_DOMAIN" || echo "")

  check_domain() {
    local domain="$1" resolved="$2"
    if [ "$resolved" = "$SERVER_IP" ]; then
      echo "  ✓ $domain  ->  $resolved (درست)"
    elif [ -n "$resolved" ]; then
      echo "  ✗ $domain  ->  $resolved (باید $SERVER_IP باشد — رکورد A را در پنل دامنه اصلاح کنید)"
    else
      echo "  ✗ $domain  ->  هنوز قابل ریزالو نیست (رکورد A ثبت نشده یا DNS هنوز منتشر نشده)"
    fi
  }
  check_domain "$SITE_DOMAIN" "$SITE_IP"
  check_domain "$ADMIN_DOMAIN" "$ADMIN_IP"

  echo ""
  echo "نکته: اگر DNS دامنه روی Cloudflare است، پراکسی نارنجی‌رنگ (Proxy status) هر دو رکورد را"
  echo "خاموش کنید (DNS only / ابر خاکستری) — در غیر این صورت صدور گواهی HTTPS با خطا مواجه می‌شود."
  echo ""
  read -rp "برای ادامه Enter را بزنید (یا Ctrl+C برای لغو و اصلاح DNS)..." _ < /dev/tty
fi

# --- دانلود فایل‌های نصب ---
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"
curl -fsSL -o docker-compose.yml "$REPO_RAW_BASE/docker-compose.yml"
curl -fsSL -o Caddyfile "$REPO_RAW_BASE/Caddyfile"

cat > .env <<EOF
SITE_DOMAIN=$SITE_DOMAIN
ADMIN_DOMAIN=$ADMIN_DOMAIN
EOF

# --- بالا آوردن سرویس‌ها ---
echo ""
echo "در حال دانلود ایمیج‌ها و راه‌اندازی..."
docker compose pull
docker compose up -d

# --- منتظر ماندن برای ساخته‌شدن حساب ادمین ---
echo "در حال ساخت حساب مدیر اولیه..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

echo ""
echo "================================================================"
echo " نصب بهبار کامل شد"
echo ""
echo "   سایت مشتری  : https://$SITE_DOMAIN"
echo "   پنل مدیریت  : https://$ADMIN_DOMAIN"
echo ""
if [ -n "$CREDS" ]; then
  echo " اطلاعات ورود به پنل مدیریت:"
  echo "$CREDS" | sed 's/^/   /'
else
  echo " ساخت خودکار حساب مدیر طول کشید — با این دستور بعداً بررسی کنید:"
  echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api cat /data/admin-credentials.txt"
fi
echo ""
echo " توجه: صدور گواهی HTTPS ممکن است چند دقیقه طول بکشد (تا زمانی که DNS دامنه‌ها منتشر شود)."
echo "================================================================"
