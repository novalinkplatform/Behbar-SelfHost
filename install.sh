#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="/opt/behbar"

echo "================================================================"
echo "               Behbar Self-Host Installation                    "
echo "================================================================"
echo ""

if [ "$(id -u)" -ne 0 ]; then
  echo "Error: This script must be run as root (e.g.: sudo bash install.sh)"
  exit 1
fi

# --- Ensure installation source files are present ---
if [ ! -f "$SCRIPT_DIR/docker-compose.yml" ] || [ ! -d "$SCRIPT_DIR/behbar-api" ]; then
  echo "Downloading Behbar Self-Host package from GitHub..."
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y
    apt-get install -y curl ca-certificates tar
  fi
  TMP_DL="/tmp/behbar-source"
  rm -rf "$TMP_DL"
  mkdir -p "$TMP_DL"
  curl -fsSL "https://github.com/novalinkplatform/Behbar-SelfHost/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DL" --strip-components=1
  SCRIPT_DIR="$TMP_DL"
fi

for req_file in "docker-compose.yml" "Caddyfile" "beh-manager.sh"; do
  if [ ! -f "$SCRIPT_DIR/$req_file" ]; then
    echo "Error: Required file $req_file not found."
    exit 1
  fi
done

# --- System package updates ---
if command -v apt-get >/dev/null 2>&1; then
  echo "Updating system package repositories..."
  apt-get update -y
  apt-get install -y curl ca-certificates
fi

# --- Install Docker if not present ---
if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: Docker Compose plugin not found. Please install latest Docker."
  exit 1
fi

# --- Prompt for domain (or accept as argument) ---
SITE_DOMAIN="${1:-}"
if [ -z "$SITE_DOMAIN" ]; then
  echo ""
  read -rp "Enter your site domain or subdomain (e.g. behbar.example.com): " SITE_DOMAIN < /dev/tty
fi

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ]; then
  echo "Error: Domain name is required."
  exit 1
fi

# --- Check DNS record ---
resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

SERVER_IP=$(curl -fsSL https://api.ipify.org || echo "")
if [ -n "$SERVER_IP" ]; then
  echo ""
  echo "Checking DNS resolution for $SITE_DOMAIN..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")

  if [ "$SITE_IP" = "$SERVER_IP" ]; then
    echo "  [OK] Domain A record correctly points to this server ($SERVER_IP)."
  elif [ -n "$SITE_IP" ]; then
    echo "  [WARNING] $SITE_DOMAIN resolves to $SITE_IP, but server IP is $SERVER_IP."
    echo "  Please update the A record in your DNS provider."
  else
    echo "  [NOTE] DNS record not resolved yet or still propagating."
  fi

  echo ""
  echo "Note: If using Cloudflare DNS, set the proxy status to DNS Only (grey cloud) for automatic SSL issuance."
  echo "Continuing installation..."
fi

# --- Copy configuration files ---
mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/docker-compose.yml" "$INSTALL_DIR/docker-compose.yml"
cp "$SCRIPT_DIR/Caddyfile" "$INSTALL_DIR/Caddyfile"

# Copy source containers if present in package
if [ -d "$SCRIPT_DIR/behbar-api" ]; then
  echo "Copying backend application files..."
  rm -rf "$INSTALL_DIR/behbar-api"
  cp -r "$SCRIPT_DIR/behbar-api" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-site" ]; then
  echo "Copying customer website files..."
  rm -rf "$INSTALL_DIR/behbar-site"
  cp -r "$SCRIPT_DIR/behbar-site" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-admin" ]; then
  echo "Copying management dashboard files..."
  rm -rf "$INSTALL_DIR/behbar-admin"
  cp -r "$SCRIPT_DIR/behbar-admin" "$INSTALL_DIR/"
fi

# --- Install beh-manager CLI ---
cp "$SCRIPT_DIR/beh-manager.sh" /usr/local/bin/beh-manager
chmod +x /usr/local/bin/beh-manager

cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$SITE_DOMAIN
EOF

cd "$INSTALL_DIR"

# --- Launch services ---
echo ""
if [ -d "$INSTALL_DIR/behbar-api" ] && [ -d "$INSTALL_DIR/behbar-site" ] && [ -d "$INSTALL_DIR/behbar-admin" ]; then
  echo "Building container images from source..."
  docker compose build
  echo "Starting services..."
  docker compose up -d
else
  echo "Pulling container images and starting services..."
  if ! docker compose pull; then
    echo "Attempting local container build..."
    docker compose build || {
      echo "Failed to pull or build container images."
      exit 1
    }
  fi
  docker compose up -d
fi

# --- Wait for admin credentials generation ---
echo "Configuring database and creating default admin account..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

echo ""
echo "================================================================"
echo "           Behbar installation completed successfully!          "
echo ""
echo "   Customer Website : https://$SITE_DOMAIN"
echo "   Management Panel : https://$SITE_DOMAIN/management"
echo ""
echo " Note: Automatic HTTPS SSL certificate may take 1-2 minutes."
echo "================================================================"
echo ""
echo " To manage, change domain, update or change password, run:"
echo " sudo beh-manager"
echo ""
if [ -n "$CREDS" ]; then
  echo " Initial Admin Credentials (save these credentials):"
  echo "$CREDS" | sed 's/^/   /'
else
  echo " To view initial admin credentials, run:"
  echo "   docker compose -f $INSTALL_DIR/docker-compose.yml exec behbar-api cat /data/admin-credentials.txt"
fi

if [ -d "/tmp/behbar-source" ]; then
  rm -rf "/tmp/behbar-source"
fi

