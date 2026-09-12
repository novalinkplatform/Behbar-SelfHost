#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

INSTALL_DIR="/opt/behbar"
COMPOSE="docker compose -f $INSTALL_DIR/docker-compose.yml"

if [ "$(id -u)" -ne 0 ]; then
  echo "خطا: لطفاً با دسترسی روت اجرا کنید (مثال: sudo beh-manager)"
  exit 1
fi

if [ ! -f "$INSTALL_DIR/docker-compose.yml" ]; then
  echo "خطا: به نظر می‌رسد بهبار در مسیر $INSTALL_DIR نصب نشده است."
  exit 1
fi

resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

load_env() {
  SITE_DOMAIN=""
  if [ -f "$INSTALL_DIR/.env" ]; then
    # shellcheck disable=SC1090
    source "$INSTALL_DIR/.env"
  fi
}

show_status() {
  load_env
  echo ""
  $COMPOSE ps
  echo ""
  echo "سایت مشتریان : https://${SITE_DOMAIN:-تنظیم نشده}"
  echo "پنل مدیریت   : https://${SITE_DOMAIN:-تنظیم نشده}/management"
}

do_update() {
  echo ""
  echo "این عملیات کانتینرها را با آخرین تغییرات بازسازی/به‌روزرسانی و مجدداً راه‌اندازی می‌کند."
  echo "(داده‌های دیتابیس در ولوم ماندگار داکر محفوظ و دست‌نخورده باقی می‌ماند)."
  read -rp "آیا ادامه می‌دهید؟ [y/N] " CONFIRM < /dev/tty
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "عملیات لغو شد."
    return
  fi
  if [ -d "$INSTALL_DIR/behbar-api" ]; then
    echo "در حال بازسازی کانتینرها از سورس کد..."
    $COMPOSE build
  else
    echo "در حال دریافت آخرین ایمیج‌ها..."
    if ! $COMPOSE pull; then
      echo "دریافت ایمیج‌ها ناموفق بود — اتصال اینترنت سرور را بررسی کنید."
      return
    fi
  fi
  $COMPOSE up -d
  echo ""
  echo "به‌روزرسانی با موفقیت انجام شد."
}

do_change_password() {
  echo ""
  read -rsp "رمز عبور جدید برای حساب «admin» (حداقل ۶ کاراکتر): " NEW_PASS < /dev/tty
  echo
  if [ -z "$NEW_PASS" ] || [ "${#NEW_PASS}" -lt 6 ]; then
    echo "رمز عبور باید حداقل ۶ کاراکتر باشد — تغییری اعمال نشد."
    return
  fi
  $COMPOSE exec -T behbar-api node dist-node/selfhost/reset-admin-password.js "$NEW_PASS"
  echo "رمز عبور مدیر با موفقیت تغییر یافت."
}

do_change_domain() {
  load_env
  echo ""
  echo "دامنه فعلی : ${SITE_DOMAIN:-تنظیم نشده}"
  echo ""
  read -rp "دامنه جدید (برای عدم تغییر خالی بگذارید): " NEW_SITE < /dev/tty
  NEW_SITE=${NEW_SITE:-$SITE_DOMAIN}
  NEW_SITE=$(echo "$NEW_SITE" | sed -E 's#https?://##; s#/$##')

  if [ -z "$NEW_SITE" ]; then
    echo "وارد کردن دامنه الزامی است — تغییری اعمال نشد."
    return
  fi

  SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
  if [ -n "$SERVER_IP" ]; then
    echo ""
    echo "در حال بررسی DNS..."
    RESOLVED=$(resolve_domain "$NEW_SITE" || echo "")
    if [ "$RESOLVED" = "$SERVER_IP" ]; then
      echo "  [تایید]   $NEW_SITE -> $RESOLVED"
    else
      echo "  [هشدار] $NEW_SITE -> ${RESOLVED:-هنوز ثبت نشده} (باید به $SERVER_IP اشاره کند)"
    fi
  fi

  cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$NEW_SITE
EOF

  echo ""
  echo "در حال اعمال دامنه جدید..."
  $COMPOSE up -d
  echo ""
  echo "انجام شد. گواهی امنیتی HTTPS خودکار پس از اتصال دامنه صادر می‌شود."
  echo "  سایت مشتریان : https://$NEW_SITE"
  echo "  پنل مدیریت   : https://$NEW_SITE/management"
}

while true; do
  echo ""
  echo "================================================================"
  echo "             ابزار مدیریت سرور بهبار (beh-manager)              "
  echo "================================================================"
  echo " ۱) مشاهده وضعیت سرویس‌ها"
  echo " ۲) به‌روزرسانی و راه‌اندازی مجدد"
  echo " ۳) تغییر رمز عبور مدیر (admin)"
  echo " ۴) تغییر دامنه سایت"
  echo " ۵) خروج"
  read -rp "> " CHOICE < /dev/tty
  case "$CHOICE" in
    1|۱) show_status ;;
    2|۲) do_update ;;
    3|۳) do_change_password ;;
    4|۴) do_change_domain ;;
    5|۵) exit 0 ;;
    *) echo "گزینه نامعتبر است." ;;
  esac
done
