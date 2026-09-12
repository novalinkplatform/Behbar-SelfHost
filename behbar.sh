#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

INSTALL_DIR="/opt/behbar"
COMPOSE="docker compose -f $INSTALL_DIR/docker-compose.yml"

if [ "$(id -u)" -ne 0 ]; then
  echo "Error: Please run as root (e.g.: sudo behbar)"
  exit 1
fi

if [ ! -f "$INSTALL_DIR/docker-compose.yml" ]; then
  echo "Error: Behbar does not appear to be installed at $INSTALL_DIR."
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

do_update() {
  echo ""
  echo "================================================================"
  echo "                     Update Behbar System                       "
  echo "================================================================"
  echo "This will download the latest version from GitHub, rebuild"
  echo "containers, and restart services without losing your data."
  echo ""
  read -rp "Do you want to proceed? [y/N] " CONFIRM < /dev/tty
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Cancelled."
    return
  fi

  echo ""
  echo "Downloading latest version from GitHub..."
  TMP_UP="/tmp/behbar-update"
  rm -rf "$TMP_UP"
  mkdir -p "$TMP_UP"
  if curl -fsSL "https://github.com/novalinkplatform/Behbar-SelfHost/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_UP" --strip-components=1; then
    cp "$TMP_UP/docker-compose.yml" "$INSTALL_DIR/docker-compose.yml"
    cp "$TMP_UP/Caddyfile" "$INSTALL_DIR/Caddyfile"
    cp "$TMP_UP/behbar.sh" /usr/local/bin/behbar
    chmod +x /usr/local/bin/behbar
    ln -sf /usr/local/bin/behbar /usr/local/bin/beh-manager 2>/dev/null || true

    if [ -d "$TMP_UP/behbar-api" ]; then
      rm -rf "$INSTALL_DIR/behbar-api"
      cp -r "$TMP_UP/behbar-api" "$INSTALL_DIR/"
    fi
    if [ -d "$TMP_UP/behbar-site" ]; then
      rm -rf "$INSTALL_DIR/behbar-site"
      cp -r "$TMP_UP/behbar-site" "$INSTALL_DIR/"
    fi
    if [ -d "$TMP_UP/behbar-admin" ]; then
      rm -rf "$INSTALL_DIR/behbar-admin"
      cp -r "$TMP_UP/behbar-admin" "$INSTALL_DIR/"
    fi
    rm -rf "$TMP_UP"

    echo "Rebuilding containers from updated source..."
    $COMPOSE build
    $COMPOSE up -d
    echo ""
    echo "[OK] Behbar updated successfully to the latest version!"
  else
    echo "Error: Failed to download update. Please check your internet connection."
  fi
}

do_change_password() {
  echo ""
  echo "================================================================"
  echo "                   Change Admin Password                        "
  echo "================================================================"
  read -rsp "Enter new password for "admin" (minimum 6 characters): " NEW_PASS < /dev/tty
  echo
  if [ -z "$NEW_PASS" ] || [ "${#NEW_PASS}" -lt 6 ]; then
    echo "Error: Password must be at least 6 characters. No changes made."
    return
  fi
  $COMPOSE exec -T behbar-api node dist-node/selfhost/reset-admin-password.js "$NEW_PASS"
  echo ""
  echo "[OK] Admin password changed successfully."
}

show_info() {
  load_env
  SERVER_IP=$(curl -fsSL https://api.ipify.org 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo "Unknown")
  echo ""
  echo "================================================================"
  echo "                Behbar System Info & Credentials                "
  echo "================================================================"
  echo " Server IP        : $SERVER_IP"
  echo " Domain           : ${SITE_DOMAIN:-not set}"
  echo " Customer Website : https://${SITE_DOMAIN:-not set}"
  echo " Management Panel : https://${SITE_DOMAIN:-not set}/management"
  echo ""
  echo " Admin Credentials:"
  if [ -f "$INSTALL_DIR/admin-credentials.txt" ]; then
    cat "$INSTALL_DIR/admin-credentials.txt" | sed 's/^/   /'
  else
    $COMPOSE exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null | sed 's/^/   /' || echo "   Username: admin"
  fi
  echo ""
  echo " Container Status:"
  $COMPOSE ps
}

do_change_domain() {
  load_env
  echo ""
  echo "================================================================"
  echo "                   Switch to Another Domain                     "
  echo "================================================================"
  echo " Current domain : ${SITE_DOMAIN:-not set}"
  echo ""
  read -rp "Enter new domain or subdomain (e.g. new.example.com): " NEW_SITE < /dev/tty
  NEW_SITE=$(echo "$NEW_SITE" | sed -E 's#https?://##; s#/$##')

  if [ -z "$NEW_SITE" ]; then
    echo "No domain entered. No changes made."
    return
  fi

  SERVER_IP=$(curl -fsSL https://api.ipify.org 2>/dev/null || "")
  if [ -n "$SERVER_IP" ]; then
    echo ""
    echo "Checking DNS resolution for $NEW_SITE..."
    RESOLVED=$(resolve_domain "$NEW_SITE" || echo "")
    if [ "$RESOLVED" = "$SERVER_IP" ]; then
      echo "  [OK] Domain points correctly to this server ($SERVER_IP)."
    else
      echo "  [WARNING] $NEW_SITE -> ${RESOLVED:-not resolved yet} (Server IP: $SERVER_IP)"
      echo "  Make sure DNS A record points to $SERVER_IP (Cloudflare: DNS Only / grey cloud)."
    fi
  fi

  cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$NEW_SITE
EOF

  echo ""
  echo "Applying changes and requesting SSL for $NEW_SITE..."
  $COMPOSE up -d
  echo ""
  echo "[OK] Switched to new domain!"
  echo "  Customer Website : https://$NEW_SITE"
  echo "  Management Panel : https://$NEW_SITE/management"
}

do_uninstall() {
  echo ""
  echo "================================================================"
  echo "                        Uninstall Behbar                        "
  echo "================================================================"
  echo "WARNING: This will completely stop and remove Behbar services."
  read -rp "Are you sure you want to uninstall Behbar? [y/N] " CONFIRM < /dev/tty
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Uninstall cancelled."
    return
  fi

  echo ""
  read -rp "Do you also want to delete all database data and uploads? [y/N] " PURGE_DATA < /dev/tty

  echo ""
  echo "Stopping services..."
  if [ "$PURGE_DATA" = "y" ] || [ "$PURGE_DATA" = "Y" ]; then
    $COMPOSE down -v --remove-orphans || true
  else
    $COMPOSE down --remove-orphans || true
  fi

  echo "Removing installation files..."
  rm -rf "$INSTALL_DIR"
  rm -f /usr/local/bin/behbar /usr/local/bin/beh-manager

  echo ""
  echo "[OK] Behbar has been completely uninstalled from this server."
  exit 0
}

while true; do
  echo ""
  echo "================================================================"
  echo "                   Behbar Management Console                    "
  echo "================================================================"
  echo " 1) Update"
  echo " 2) Change Password"
  echo " 3) System Info & Credentials"
  echo " 4) Switch to Another Domain"
  echo " 5) Uninstall"
  echo " 0) Exit"
  echo "================================================================"
  read -rp "Enter choice [0-5]: " CHOICE < /dev/tty
  case "$CHOICE" in
    1) do_update ;;
    2) do_change_password ;;
    3) show_info ;;
    4) do_change_domain ;;
    5) do_uninstall ;;
    0) echo "Goodbye."; exit 0 ;;
    *) echo "Invalid choice. Please enter a number between 0 and 5." ;;
  esac
done
