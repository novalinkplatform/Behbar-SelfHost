#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive

if [ "$(id -u)" -ne 0 ]; then
  echo "Error: This script must be run as root (e.g.: sudo bash)"
  exit 1
fi

echo "================================================================"
echo "               Behbar Self-Host Quick Installer                 "
echo "================================================================"
echo ""

# Step 1: Update system packages & basic tools
echo "[1/4] Updating system packages and installing prerequisites..."
if command -v apt-get >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y curl ca-certificates tar git
fi

# Step 2: Create dedicated behbar folder (isolated from root)
INSTALL_DIR="/opt/behbar"
echo ""
echo "[2/4] Creating dedicated folder at $INSTALL_DIR (isolated from root)..."
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

echo "Downloading Behbar files directly into $INSTALL_DIR..."
curl -fsSL "https://github.com/novalinkplatform/Behbar-SelfHost/archive/refs/heads/main.tar.gz" | tar -xz -C "$INSTALL_DIR" --strip-components=1

# Step 3 & 4: Run installation inside /opt/behbar
bash "$INSTALL_DIR/install.sh" "$@"
