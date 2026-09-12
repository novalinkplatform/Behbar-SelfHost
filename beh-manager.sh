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
  echo "Behbar does not appear to be installed at $INSTALL_DIR."
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
  echo "Customer site : https://${SITE_DOMAIN:-not set}"
  echo "Admin panel   : https://${SITE_DOMAIN:-not set}/management"
}

do_update() {
  echo ""
  echo "This rebuilds/updates containers and restarts services."
  echo "(Database data is safely preserved in the persistent Docker volume)."
  read -rp "Do you want to proceed? [y/N] " CONFIRM < /dev/tty
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Cancelled."
    return
  fi
  if [ -d "$INSTALL_DIR/behbar-api" ]; then
    echo "Rebuilding containers from source..."
    $COMPOSE build
  else
    echo "Pulling latest images..."
    if ! $COMPOSE pull; then
      echo "Failed to pull images - check server internet connection."
      return
    fi
  fi
  $COMPOSE up -d
  echo ""
  echo "Update completed successfully."
}

do_change_password() {
  echo ""
  read -rsp "New password for \"admin\" account (min 6 chars): " NEW_PASS < /dev/tty
  echo
  if [ -z "$NEW_PASS" ] || [ "${#NEW_PASS}" -lt 6 ]; then
    echo "Password must be at least 6 characters - no changes made."
    return
  fi
  $COMPOSE exec -T behbar-api node dist-node/selfhost/reset-admin-password.js "$NEW_PASS"
  echo "Admin password updated successfully."
}

do_change_domain() {
  load_env
  echo ""
  echo "Current domain : ${SITE_DOMAIN:-not set}"
  echo ""
  read -rp "New domain (press Enter to keep current): " NEW_SITE < /dev/tty
  NEW_SITE=${NEW_SITE:-$SITE_DOMAIN}
  NEW_SITE=$(echo "$NEW_SITE" | sed -E 's#https?://##; s#/$##')

  if [ -z "$NEW_SITE" ]; then
    echo "Domain is required - no changes made."
    return
  fi

  SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
  if [ -n "$SERVER_IP" ]; then
    echo ""
    echo "Checking DNS..."
    RESOLVED=$(resolve_domain "$NEW_SITE" || echo "")
    if [ "$RESOLVED" = "$SERVER_IP" ]; then
      echo "  [OK]   $NEW_SITE -> $RESOLVED"
    else
      echo "  [WARN] $NEW_SITE -> ${RESOLVED:-not resolved yet} (should point to $SERVER_IP)"
    fi
  fi

  cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$NEW_SITE
EOF

  echo ""
  echo "Applying new domain..."
  $COMPOSE up -d
  echo ""
  echo "Done. HTTPS certificate will be issued automatically once DNS points here."
  echo "  Customer site : https://$NEW_SITE"
  echo "  Admin panel   : https://$NEW_SITE/management"
}

while true; do
  echo ""
  echo "================================================================"
  echo "                 Behbar Server Manager (beh-manager)            "
  echo "================================================================"
  echo " 1) Show service status"
  echo " 2) Update & rebuild containers"
  echo " 3) Change admin password"
  echo " 4) Change domain"
  echo " 5) Exit"
  read -rp "> " CHOICE < /dev/tty
  case "$CHOICE" in
    1) show_status ;;
    2) do_update ;;
    3) do_change_password ;;
    4) do_change_domain ;;
    5) exit 0 ;;
    *) echo "Invalid choice." ;;
  esac
done
