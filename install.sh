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

# ================================================================
# Step 1: Automatic System Updates & Prerequisites Installation
# ================================================================
echo "[1/4] Updating system packages and installing prerequisites..."
if command -v apt-get >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y curl ca-certificates tar git
fi

# Ensure installation source files are present
if [ ! -f "$SCRIPT_DIR/docker-compose.yml" ] || [ ! -d "$SCRIPT_DIR/behbar-api" ]; then
  echo "Downloading Behbar Self-Host package from GitHub..."
  TMP_DL="/tmp/behbar-source"
  rm -rf "$TMP_DL"
  mkdir -p "$TMP_DL"
  curl -fsSL "https://github.com/novalinkplatform/Behbar-SelfHost/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DL" --strip-components=1
  SCRIPT_DIR="$TMP_DL"
fi

for req_file in "docker-compose.yml" "Caddyfile" "behbar.sh"; do
  if [ ! -f "$SCRIPT_DIR/$req_file" ]; then
    echo "Error: Required file $req_file not found."
    exit 1
  fi
done

# ================================================================
# Step 2: Automatic Docker Installation & Verification
# ================================================================
echo ""
echo "[2/4] Verifying Docker environment..."
if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: Docker Compose plugin not found. Please install latest Docker."
  exit 1
fi

# ================================================================
# Step 3: Domain Prompt
# ================================================================
echo ""
echo "[3/4] System Configuration"
echo "All prerequisites installed successfully."
echo ""

SITE_DOMAIN="${1:-}"
if [ -z "$SITE_DOMAIN" ]; then
  read -rp "Enter your site domain or subdomain (e.g. example.com): " SITE_DOMAIN < /dev/tty
fi

SITE_DOMAIN=$(echo "$SITE_DOMAIN" | sed -E 's#https?://##; s#/$##')

if [ -z "$SITE_DOMAIN" ]; then
  echo "Error: Domain name is required."
  exit 1
fi

# Check DNS record
resolve_domain() {
  curl -fsSL "https://dns.google/resolve?name=$1&type=A" 2>/dev/null \
    | grep -oE '"data": ?"[0-9.]+"' | grep -oE '[0-9.]+' | head -1
}

SERVER_IP=$(curl -fsSL https://api.ipify.org 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo "")
if [ -n "$SERVER_IP" ]; then
  echo ""
  echo "Checking DNS resolution for $SITE_DOMAIN..."
  SITE_IP=$(resolve_domain "$SITE_DOMAIN" || echo "")

  if [ "$SITE_IP" = "$SERVER_IP" ]; then
    echo "  [OK] Domain A record correctly points to this server ($SERVER_IP)."
  elif [ -n "$SITE_IP" ]; then
    echo "  [WARNING] $SITE_DOMAIN resolves to $SITE_IP, but server IP is $SERVER_IP."
    echo "  Please ensure DNS A record points to $SERVER_IP (Cloudflare: DNS Only / grey cloud)."
  else
    echo "  [NOTE] DNS record not resolved yet or still propagating."
  fi
fi

# Copy configuration files
mkdir -p "$INSTALL_DIR"
cp "$SCRIPT_DIR/docker-compose.yml" "$INSTALL_DIR/docker-compose.yml"
cp "$SCRIPT_DIR/Caddyfile" "$INSTALL_DIR/Caddyfile"

# Copy source containers if present in package
if [ -d "$SCRIPT_DIR/behbar-api" ]; then
  rm -rf "$INSTALL_DIR/behbar-api"
  cp -r "$SCRIPT_DIR/behbar-api" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-site" ]; then
  rm -rf "$INSTALL_DIR/behbar-site"
  cp -r "$SCRIPT_DIR/behbar-site" "$INSTALL_DIR/"
fi
if [ -d "$SCRIPT_DIR/behbar-admin" ]; then
  rm -rf "$INSTALL_DIR/behbar-admin"
  cp -r "$SCRIPT_DIR/behbar-admin" "$INSTALL_DIR/"
fi

# Install behbar management CLI
cp "$SCRIPT_DIR/behbar.sh" /usr/local/bin/behbar
chmod +x /usr/local/bin/behbar
ln -sf /usr/local/bin/behbar /usr/local/bin/beh-manager 2>/dev/null || true

cat > "$INSTALL_DIR/.env" <<EOF
SITE_DOMAIN=$SITE_DOMAIN
EOF

cd "$INSTALL_DIR"

# ================================================================
# Step 4: Build & Launch Services
# ================================================================
echo ""
echo "[4/4] Building and launching Behbar services..."
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

# Wait for admin credentials generation
echo ""
echo "Configuring database and creating default admin account..."
CREDS=""
for _ in $(seq 1 60); do
  if CREDS=$(docker compose exec -T behbar-api cat /data/admin-credentials.txt 2>/dev/null); then
    break
  fi
  sleep 2
done

if [ -n "$CREDS" ]; then
  echo "$CREDS" > "$INSTALL_DIR/admin-credentials.txt"
  chmod 600 "$INSTALL_DIR/admin-credentials.txt"
fi

if [ -d "/tmp/behbar-source" ]; then
  rm -rf "/tmp/behbar-source"
fi

echo ""
echo "================================================================"
echo "           Behbar installation completed successfully!          "
echo "================================================================"
echo ""
echo "   Customer Website : https://$SITE_DOMAIN"
echo "   Management Panel : https://$SITE_DOMAIN/management"
echo ""
if [ -n "$CREDS" ]; then
  echo " Initial Admin Credentials:"
  echo "$CREDS" | sed 's/^/   /'
else
  echo " Admin username: admin"
fi
echo ""
echo " Note: Automatic HTTPS SSL certificate may take 1-2 minutes to activate."
echo " You can manage your installation anytime by running: sudo behbar"
echo "================================================================"
echo ""

# Launch the interactive behbar management console
exec /usr/local/bin/behbar
