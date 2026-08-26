#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

INSTALL_DIR="/opt/behbar"
COMPOSE="docker compose -f $INSTALL_DIR/docker-compose.yml"

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (e.g.: sudo beh-manager)"
  exit 1
fi

if [ ! -f "$INSTALL_DIR/docker-compose.yml" ]; then
  echo "Behbar doesn't seem to be installed at $INSTALL_DIR."
  exit 1
fi

resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

load_env() {
  SITE_DOMAIN=""
  ADMIN_DOMAIN=""
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
  echo "Customer site : https://${SITE_DOMAIN:-not set}"
  echo "Admin panel   : https://${ADMIN_DOMAIN:-not set}"
}

do_update() {
  echo ""
  echo "This downloads the latest images and restarts the services (your data is untouched — it lives in a separate Docker volume)."
  echo "It's still a good idea to take a backup first: admin panel -> Settings -> Backup -> Download backup."
  read -rp "Continue with the update? [y/N] " CONFIRM < /dev/tty
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Cancelled."
    return
  fi
  if ! $COMPOSE pull; then
    echo "Failed to download the images — check your internet connection and try again later."
    return
  fi
  $COMPOSE up -d
  echo ""
  echo "Update complete."
}

do_change_password() {
  echo ""
  read -rsp "New password for the \"admin\" account (at least 6 characters): " NEW_PASS < /dev/tty
  echo
  if [ -z "$NEW_PASS" ] || [ "${#NEW_PASS}" -lt 6 ]; then
    echo "Password must be at least 6 characters — nothing changed."
    return
  fi
  $COMPOSE exec -T behbar-api node dist-node/selfhost/reset-admin-password.js "$NEW_PASS"
}

do_change_domains() {
  load_env
  echo ""
  echo "Current customer site domain : ${SITE_DOMAIN:-not set}"
  echo "Current admin panel domain   : ${ADMIN_DOMAIN:-not set}"
  echo ""
  read -rp "New customer site domain (leave empty to keep current): " NEW_SITE < /dev/tty
  read -rp "New admin panel domain (leave empty to keep current): " NEW_ADMIN < /dev/tty
  NEW_SITE=${NEW_SITE:-$SITE_DOMAIN}
  NEW_ADMIN=${NEW_ADMIN:-$ADMIN_DOMAIN}
  NEW_SITE=$(echo "$NEW_SITE" | sed -E 's#https?://##; s#/$##')
  NEW_ADMIN=$(echo "$NEW_ADMIN" | sed -E 's#https?://##; s#/$##')

  if [ -z "$NEW_SITE" ] || [ -z "$NEW_ADMIN" ]; then
    echo "Both domains are required — nothing changed."
    return
  fi

  SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
  if [ -n "$SERVER_IP" ]; then
    echo ""
    echo "Checking DNS..."
    for d in "$NEW_SITE" "$NEW_ADMIN"; do
      RESOLVED=$(resolve_domain "$d" || echo "")
      if [ "$RESOLVED" = "$SERVER_IP" ]; then
        echo "  [OK]   $d -> $RESOLVED"
      else
        echo "  [WARN] $d -> ${RESOLVED:-not resolving yet} (should be $SERVER_IP)"
      fi
    done
  fi

  cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$NEW_SITE
ADMIN_DOMAIN=$NEW_ADMIN
EOF

  echo ""
  echo "Applying new domains..."
  $COMPOSE up -d
  echo ""
  echo "Done. HTTPS certificates for the new domains are issued automatically once DNS points here — that can take a few minutes."
  echo "  Customer site : https://$NEW_SITE"
  echo "  Admin panel   : https://$NEW_ADMIN"
}

while true; do
  echo ""
  echo "================================================================"
  echo " Behbar server manager"
  echo "================================================================"
  echo " 1) Show status"
  echo " 2) Update Behbar (pull latest images and restart)"
  echo " 3) Change admin password"
  echo " 4) Change domain addresses"
  echo " 5) Exit"
  read -rp "> " CHOICE < /dev/tty
  case "$CHOICE" in
    1) show_status ;;
    2) do_update ;;
    3) do_change_password ;;
    4) do_change_domains ;;
    5) exit 0 ;;
    *) echo "Invalid choice." ;;
  esac
done
