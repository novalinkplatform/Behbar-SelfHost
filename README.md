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

Connect to your server via SSH and run this single command:

```bash
curl -fsSL https://raw.githubusercontent.com/novalinkplatform/Behbar-SelfHost/main/quick-install.sh | sudo bash
```

Alternatively, you can clone and run via Git:

```bash
git clone https://github.com/novalinkplatform/Behbar-SelfHost.git /opt/behbar && cd /opt/behbar && sudo bash install.sh
```

During installation, you only need to enter your domain name when prompted (e.g. `yourdomain.com`).
Docker setup, container builds, database creation, and automatic HTTPS certificate provisioning will all complete automatically.

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
