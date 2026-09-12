#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export DEBIAN_FRONTEND=noninteractive

if [ "$(id -u)" -ne 0 ]; then
  echo "Error: This script must be run as root (e.g.: sudo bash)"
  exit 1
fi

if command -v apt-get >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y curl ca-certificates tar
fi

TMP_DIR="/tmp/behbar-bootstrap"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

echo "Downloading Behbar Self-Host installer from GitHub..."
curl -fsSL "https://github.com/novalinkplatform/Behbar-SelfHost/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP_DIR" --strip-components=1

cd "$TMP_DIR"
bash "$TMP_DIR/install.sh" "$@"

rm -rf "$TMP_DIR"
