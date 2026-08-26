#!/usr/bin/env bash
set -euo pipefail

# روی برخی سرورهای تازه‌نصب، locale پیش‌فرض UTF-8 نیست (مثلاً C/POSIX) و همین باعث می‌شود
# متن فارسی در ترمینال به‌هم‌ریخته چاپ شود؛ اینجا صریحاً یک locale استاندارد UTF-8 را اجبار می‌کنیم
# (C.UTF-8 روی تقریباً همه‌ی توزیع‌های لینوکس مدرن، از جمله نصب حداقلی، از قبل موجود است).
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

REPO_RAW_BASE="https://raw.githubusercontent.com/siamakgarawan/Behbar-SelfHost/main"
INSTALL_DIR="/opt/behbar"

# --- زبان: پیش‌فرض انگلیسی، در صورت انتخاب کاربر فارسی (راست‌چین) نمایش داده می‌شود ---
echo "Language / زبان:"
echo "  [1] English (default)"
echo "  [2] فارسی"
read -rp "> " LANG_CHOICE < /dev/tty || true
if [ "$LANG_CHOICE" = "2" ]; then
  LANG_FA=1
else
  LANG_FA=0
fi

# msg <en-text> <fa-text> — پیام فارسی همیشه به‌صورت جمله‌ی کامل و راست‌به‌چپ چاپ می‌شود، نه با متن انگلیسی
# قاطی، تا الگوریتم BIDI ترمینال آن را خراب نکند.
msg() {
  if [ "$LANG_FA" = "1" ]; then printf '%s\n' "$2"; else printf '%s\n' "$1"; fi
}

msg "=== Installing Behbar ===" "=== نصب بهبار ==="
echo ""

if [ "$(id -u)" -ne 0 ]; then
  msg "This script must be run as root (e.g.: sudo bash install.sh)" \
      "این اسکریپت باید با دسترسی root اجرا شود (مثلاً: sudo bash install.sh)"
  exit 1
fi

# --- نصب داکر در صورت نبود ---
if ! command -v docker >/dev/null 2>&1; then
  msg "Installing Docker..." "در حال نصب Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  msg "Docker Compose plugin not found. Please install a newer version of Docker." \
      "افزونه‌ی Docker Compose پیدا نشد. لطفاً یک نسخه‌ی جدیدتر Docker نصب کنید."
  exit 1
fi

# --- گرفتن دو آدرس از کاربر ---
# چون این اسکریپت معمولاً با curl | bash اجرا می‌شود، ورودی باید مستقیم از ترمینال (/dev/tty) خوانده شود.
echo ""
read -rp "$(msg 'Customer site domain (e.g.: behbar.example.com): ' 'آدرس دامنه‌ی سایت مشتری (مثلاً: behbar.example.com): ')" SITE_DOMAIN < /dev/tty
read -rp "$(msg 'Admin panel domain (e.g.: admin.example.com): ' 'آدرس دامنه‌ی پنل مدیریت (مثلاً: admin.example.com): ')" ADMIN_DOMAIN < /dev/tty

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')
ADMIN_DOMAIN=$(echo "$ADMIN_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ] || [ -z "$ADMIN_DOMAIN" ]; then
  msg "Both domains are required." "هر دو آدرس الزامی هستند."
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
  msg "Checking DNS for both domains..." "در حال بررسی DNS دامنه‌ها..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")
  ADMIN_IP=$(resolve_domain "$ADMIN_DOMAIN" || echo "")

  # نکته: خط فنی (دامنه/آی‌پی) همیشه جدا از جمله‌ی فارسی چاپ می‌شود — ترکیب فلش/علامت با متن
  # راست‌به‌چپ در یک خط باعث به‌هم‌ریختن ترتیب نمایش در بسیاری از ترمینال‌ها می‌شود.
  check_domain() {
    local domain="$1" resolved="$2"
    if [ "$resolved" = "$SERVER_IP" ]; then
      msg "  [OK]   $domain -> $resolved" "  [درست]   $domain -> $resolved"
    elif [ -n "$resolved" ]; then
      msg "  [FAIL] $domain -> $resolved" "  [نادرست]   $domain -> $resolved"
      msg "         should be $SERVER_IP — fix the A record at your domain provider." \
          "         باید به $SERVER_IP اشاره کند؛ رکورد A را در پنل دامنه اصلاح کنید."
    else
      msg "  [FAIL] $domain -> not resolving yet" "  [نادرست]   $domain -> هنوز قابل ریزالو نیست"
      msg "         no A record, or DNS hasn't propagated yet." \
          "         رکورد A ثبت نشده یا DNS هنوز منتشر نشده است."
    fi
  }
  check_domain "$SITE_DOMAIN" "$SITE_IP"
  check_domain "$ADMIN_DOMAIN" "$ADMIN_IP"

  echo ""
  msg "Note: if these domains use Cloudflare DNS, turn off the orange-cloud proxy (set to DNS only / grey cloud) on both records — otherwise HTTPS certificate issuance will fail." \
      "نکته: اگر DNS دامنه روی Cloudflare است، پراکسی نارنجی‌رنگ (Proxy status) هر دو رکورد را خاموش کنید (DNS only / ابر خاکستری) — در غیر این صورت صدور گواهی HTTPS با خطا مواجه می‌شود."
  echo ""
  read -rp "$(msg 'Press Enter to continue (or Ctrl+C to cancel and fix DNS)...' 'برای ادامه Enter را بزنید (یا Ctrl+C برای لغو و اصلاح DNS)...')" _ < /dev/tty
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
msg "Downloading images and starting services..." "در حال دانلود ایمیج‌ها و راه‌اندازی..."
if ! docker compose pull; then
  echo ""
  msg "Failed to download the images (see the error above)." \
      "دانلود ایمیج‌ها ناموفق بود (خطای بالا را ببینید)."
  msg "This is usually a temporary problem on the seller's side — please contact the seller and try again later." \
      "معمولاً این یک مشکل موقت از سمت فروشنده است — لطفاً با فروشنده تماس بگیرید و بعداً دوباره امتحان کنید."
  exit 1
fi
docker compose up -d

# --- منتظر ماندن برای ساخته‌شدن حساب ادمین ---
msg "Creating the initial admin account..." "در حال ساخت حساب مدیر اولیه..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

echo ""
echo "================================================================"
if [ "$LANG_FA" = "1" ]; then
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
else
  echo " Behbar installation complete"
  echo ""
  echo "   Customer site : https://$SITE_DOMAIN"
  echo "   Admin panel   : https://$ADMIN_DOMAIN"
  echo ""
  if [ -n "$CREDS" ]; then
    echo " Admin panel login:"
    echo "$CREDS" | sed 's/^/   /'
  else
    echo " Admin account creation is taking longer than expected — check later with:"
    echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api cat /data/admin-credentials.txt"
  fi
  echo ""
  echo " Note: HTTPS certificate issuance can take a few minutes (until DNS has propagated)."
fi
echo "================================================================"
