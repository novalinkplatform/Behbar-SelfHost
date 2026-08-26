#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

REPO_RAW_BASE="https://raw.githubusercontent.com/siamakgarawan/Behbar-SelfHost/main"
INSTALL_DIR="/opt/behbar"

echo "=== Installing Behbar ==="
echo ""

if [ "$(id -u)" -ne 0 ]; then
  echo "This script must be run as root (e.g.: sudo bash install.sh)"
  exit 1
fi

# --- update the OS package index and installed packages first ---
# DEBIAN_FRONTEND/NEEDRESTART_MODE above, plus the dpkg options here, keep this from blocking on
# interactive prompts (config-file conflicts, "restart these services?" dialogs) since this script
# usually runs non-interactively via curl | sudo bash.
if command -v apt-get >/dev/null 2>&1; then
  echo "Updating system packages..."
  apt-get update -y
  apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
fi

# --- install Docker if missing ---
if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose plugin not found. Please install a newer version of Docker."
  exit 1
fi

# --- get the two domains from the user ---
# this script normally runs via curl | bash, so input must be read directly from the terminal (/dev/tty)
echo ""
read -rp "Customer site domain (e.g.: behbar.example.com): " SITE_DOMAIN < /dev/tty
read -rp "Admin panel domain (e.g.: admin.example.com): " ADMIN_DOMAIN < /dev/tty

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')
ADMIN_DOMAIN=$(echo "$ADMIN_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ] || [ -z "$ADMIN_DOMAIN" ]; then
  echo "Both domains are required."
  exit 1
fi

# --- check that both domains actually point at this server ---
# uses Google's DNS-over-HTTPS (independent of who manages the domain's DNS — Cloudflare, others, anywhere)
resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
if [ -n "$SERVER_IP" ]; then
  echo ""
  echo "Checking DNS for both domains..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")
  ADMIN_IP=$(resolve_domain "$ADMIN_DOMAIN" || echo "")

  check_domain() {
    local domain="$1" resolved="$2"
    if [ "$resolved" = "$SERVER_IP" ]; then
      echo "  [OK]   $domain -> $resolved"
    elif [ -n "$resolved" ]; then
      echo "  [FAIL] $domain -> $resolved (should be $SERVER_IP — fix the A record at your domain provider)"
    else
      echo "  [FAIL] $domain -> not resolving yet (no A record, or DNS hasn't propagated)"
    fi
  }
  check_domain "$SITE_DOMAIN" "$SITE_IP"
  check_domain "$ADMIN_DOMAIN" "$ADMIN_IP"

  echo ""
  echo "Note: if these domains use Cloudflare DNS, turn off the orange-cloud proxy (set to DNS only / grey cloud) on both records — otherwise HTTPS certificate issuance will fail."
  echo "Continuing automatically — if a domain isn't pointed at this server yet, fix its A record and HTTPS will be issued as soon as DNS propagates, no need to re-run this script."
fi

# --- download the install files ---
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"
curl -fsSL -o docker-compose.yml "$REPO_RAW_BASE/docker-compose.yml"
curl -fsSL -o Caddyfile "$REPO_RAW_BASE/Caddyfile"

cat > .env <<EOF
SITE_DOMAIN=$SITE_DOMAIN
ADMIN_DOMAIN=$ADMIN_DOMAIN
EOF

# --- bring the services up ---
echo ""
echo "Downloading images and starting services..."
if ! docker compose pull; then
  echo ""
  echo "Failed to download the images (see the error above)."
  echo "This is usually a temporary problem on the seller's side — please contact the seller and try again later."
  exit 1
fi
docker compose up -d

# --- wait for the initial admin account to be created ---
echo "Creating the initial admin account..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

echo ""
echo "================================================================"
echo " Behbar installation complete"
echo ""
echo "   Customer site : https://$SITE_DOMAIN"
echo "   Admin panel   : https://$ADMIN_DOMAIN"
echo ""
echo " Note: HTTPS certificate issuance can take a few minutes (until DNS has propagated)."
echo "================================================================"
echo ""
if [ -n "$CREDS" ]; then
  echo " Admin panel login (save this now — it will not be shown again):"
  echo "$CREDS" | sed 's/^/   /'
  echo ""
  echo " You can change this password later from the admin panel, or on the server with:"
  echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api node dist-node/selfhost/reset-admin-password.js <new-password>"
else
  echo " Admin account creation is taking longer than expected — check later with:"
  echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api cat /data/admin-credentials.txt"
fi
