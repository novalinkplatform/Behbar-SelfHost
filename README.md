# Behbar Server Self-Host Installation Guide (v1.4.1)

This package contains everything required to deploy and run **Behbar** on your Linux server or VPS.

---

## 1. Requirements

- **OS:** Ubuntu (22.04 or 24.04 LTS recommended) or Debian (11/12)
- **Specs:** 1 CPU core, 1 GB RAM (2 GB recommended), 10 GB disk space
- **Root access:** via SSH
- **Domain:** A domain or subdomain with an `A` record pointing to this server's public IP.
  - *Cloudflare Note:* Set proxy status to DNS Only (grey cloud) initially for SSL certificate issuance.

---

## 2. Quick Installation (One Command)

1. Upload the archive (`Behbar-Server-Package.zip` or `Behbar-Server-Package.tar.gz`) to your server.
2. Connect via SSH and run:

```bash
mkdir -p /opt/behbar-install
cd /opt/behbar-install
tar -xzf ~/Behbar-Server-Package.tar.gz --strip-components=1
# OR if using zip:
# apt update && apt install -y unzip && unzip -o ~/Behbar-Server-Package.zip

sudo bash install.sh
```

3. Enter your domain name when prompted (e.g. `yourdomain.com`).
4. Installation completes automatically with Docker setup, container builds, database creation, and automatic HTTPS certificate provisioning.

---

## 3. Post-Installation

Once complete, your access URLs and credentials will be displayed:
- **Customer Website:** `https://yourdomain.com`
- **Management Panel:** `https://yourdomain.com/management`
- **Default Username:** `admin`
- **Default Password:** displayed at the end of installation (and stored in `/opt/behbar/admin-credentials.txt`).

---

## 4. Server Management Tool (`beh-manager`)

Manage your installation anytime by running:

```bash
sudo beh-manager
```

Options available:
1) Show service status
2) Update & rebuild containers
3) Change admin password
4) Change domain name

---

## 5. Useful Docker Commands

From `/opt/behbar`:

```bash
cd /opt/behbar
docker compose ps
docker compose logs -f behbar-api
docker compose restart
```
