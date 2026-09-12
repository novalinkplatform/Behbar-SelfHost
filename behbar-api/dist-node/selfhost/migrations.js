export const SELFHOST_MIGRATIONS = [
    {
        version: 14,
        sql: `
      ALTER TABLE staff ADD COLUMN avatar_url TEXT;
      ALTER TABLE chat_conversations ADD COLUMN assigned_staff_id INTEGER REFERENCES staff(id);
      CREATE INDEX IF NOT EXISTS idx_chat_conversations_assigned_staff_id ON chat_conversations(assigned_staff_id);
    `,
    },
    {
        version: 15,
        sql: `
      ALTER TABLE staff ADD COLUMN national_id TEXT;
      ALTER TABLE staff ADD COLUMN address TEXT;
      ALTER TABLE staff ADD COLUMN hire_date TEXT;
      ALTER TABLE staff ADD COLUMN emergency_contact_name TEXT;
      ALTER TABLE staff ADD COLUMN emergency_contact_phone TEXT;
      ALTER TABLE staff ADD COLUMN notes TEXT;
    `,
    },
    {
        version: 16,
        sql: `
      ALTER TABLE job_applications ADD COLUMN has_vehicle INTEGER;
      ALTER TABLE job_applications ADD COLUMN vehicle_type TEXT;
      CREATE TABLE IF NOT EXISTS fleet_vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        label TEXT NOT NULL,
        plate_number TEXT,
        model TEXT,
        year INTEGER,
        status TEXT NOT NULL DEFAULT 'active',
        driver_staff_id INTEGER REFERENCES staff(id),
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_fleet_vehicles_driver_staff_id ON fleet_vehicles(driver_staff_id);
    `,
    },
    {
        version: 17,
        sql: `
      ALTER TABLE chat_messages ADD COLUMN message_type TEXT NOT NULL DEFAULT 'text';
    `,
    },
    {
        version: 18,
        sql: `
      ALTER TABLE chat_conversations ADD COLUMN archived_at TEXT;
    `,
    },
    {
        version: 19,
        sql: `
      ALTER TABLE requests ADD COLUMN origin_country TEXT NOT NULL DEFAULT 'ایران';
      ALTER TABLE requests ADD COLUMN destination_country TEXT NOT NULL DEFAULT 'ایران';
    `,
    },
    {
        version: 20,
        sql: `
      ALTER TABLE staff ADD COLUMN gender TEXT;
    `,
    },
    {
        version: 21,
        sql: `
      CREATE TABLE IF NOT EXISTS request_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER NOT NULL REFERENCES requests(id),
        event_type TEXT NOT NULL,
        description TEXT NOT NULL,
        staff_id INTEGER REFERENCES staff(id),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_request_events_request_id ON request_events(request_id);
    `,
    },
    {
        version: 22,
        sql: `
      ALTER TABLE staff ADD COLUMN failed_login_attempts INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE staff ADD COLUMN locked_until TEXT;
    `,
    },
    {
        version: 23,
        sql: `
      CREATE TABLE IF NOT EXISTS rate_limits (
        bucket_key TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0,
        window_start TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS staff_activity_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        staff_id INTEGER,
        staff_name TEXT NOT NULL,
        action TEXT NOT NULL,
        target_type TEXT NOT NULL,
        target_label TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_staff_activity_log_created_at ON staff_activity_log(created_at);
    `,
    },
    {
        version: 24,
        sql: `
      ALTER TABLE staff ADD COLUMN is_read_only INTEGER NOT NULL DEFAULT 0;
    `,
    },
    {
        version: 25,
        sql: `
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        full_name TEXT NOT NULL,
        failed_login_attempts INTEGER NOT NULL DEFAULT 0,
        locked_until TEXT,
        reset_code_hash TEXT,
        reset_code_salt TEXT,
        reset_code_expires_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
      CREATE TABLE IF NOT EXISTS customer_sessions (
        token TEXT PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(id),
        expires_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_customer_sessions_customer_id ON customer_sessions(customer_id);
    `,
    },
    {
        version: 26,
        sql: `
      ALTER TABLE requests ADD COLUMN origin_notes TEXT;
      ALTER TABLE requests ADD COLUMN destination_notes TEXT;
    `,
    },
    {
        version: 27,
        sql: `
      CREATE TABLE IF NOT EXISTS ai_conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        staff_id INTEGER NOT NULL REFERENCES staff(id),
        title TEXT NOT NULL DEFAULT '',
        messages_json TEXT NOT NULL DEFAULT '[]',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_ai_conversations_staff_id ON ai_conversations(staff_id);
    `,
    },
    {
        version: 28,
        sql: `
      CREATE TABLE IF NOT EXISTS customer_notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL REFERENCES customers(id),
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        data_json TEXT NOT NULL DEFAULT '{}',
        is_read INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_customer_notifications_customer_id ON customer_notifications(customer_id);
    `,
    },
    {
        version: 29,
        sql: `
      ALTER TABLE staff ADD COLUMN sms_2fa_enabled INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE staff ADD COLUMN two_fa_code_hash TEXT;
      ALTER TABLE staff ADD COLUMN two_fa_code_salt TEXT;
      ALTER TABLE staff ADD COLUMN two_fa_code_expires_at TEXT;
      CREATE TABLE IF NOT EXISTS staff_2fa_challenges (
        token TEXT PRIMARY KEY,
        staff_id INTEGER NOT NULL REFERENCES staff(id),
        expires_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_staff_2fa_challenges_staff_id ON staff_2fa_challenges(staff_id);
    `,
    },
    {
        version: 30,
        sql: `
      ALTER TABLE staff ADD COLUMN salary_amount_override INTEGER;
      ALTER TABLE staff ADD COLUMN bonus_type_override TEXT;
      ALTER TABLE staff ADD COLUMN bonus_amount_override INTEGER;
      ALTER TABLE roles ADD COLUMN default_salary_amount INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE roles ADD COLUMN default_bonus_type TEXT NOT NULL DEFAULT 'flat';
      ALTER TABLE roles ADD COLUMN default_bonus_amount INTEGER NOT NULL DEFAULT 0;
      CREATE TABLE IF NOT EXISTS wallet_payout_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        staff_id INTEGER,
        staff_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        staff_note TEXT,
        admin_note TEXT,
        decided_by_staff_id INTEGER REFERENCES staff(id),
        decided_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_wallet_payout_requests_staff_id ON wallet_payout_requests(staff_id);
      CREATE INDEX IF NOT EXISTS idx_wallet_payout_requests_status ON wallet_payout_requests(status);
      CREATE TABLE IF NOT EXISTS wallet_transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        staff_id INTEGER,
        staff_name TEXT NOT NULL,
        type TEXT NOT NULL,
        direction TEXT NOT NULL,
        amount INTEGER NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        related_request_id INTEGER REFERENCES requests(id),
        payroll_month TEXT,
        payout_request_id INTEGER REFERENCES wallet_payout_requests(id),
        created_by_staff_id INTEGER REFERENCES staff(id),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_wallet_transactions_staff_id ON wallet_transactions(staff_id);
      CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_tx_payroll_unique ON wallet_transactions(staff_id, payroll_month) WHERE type = 'salary';
      CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_tx_bonus_unique ON wallet_transactions(related_request_id) WHERE type = 'bonus';
    `,
    },
    {
        version: 32,
        sql: `
      ALTER TABLE customers ADD COLUMN gender TEXT;
      CREATE TABLE IF NOT EXISTS customer_otp_codes (
        phone TEXT PRIMARY KEY,
        code_hash TEXT NOT NULL,
        code_salt TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `,
    },
    {
        version: 33,
        sql: `
      ALTER TABLE customers ADD COLUMN company_name TEXT;
      CREATE TABLE IF NOT EXISTS customer_addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        floor TEXT,
        unit TEXT,
        has_elevator INTEGER DEFAULT 0,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_customer_addresses_cid ON customer_addresses(customer_id);
    `,
    },
    {
        version: 34,
        sql: `
      CREATE TABLE IF NOT EXISTS custom_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        title_en TEXT DEFAULT '',
        excerpt TEXT DEFAULT '',
        excerpt_en TEXT DEFAULT '',
        content_json TEXT DEFAULT '[]',
        cover_image_url TEXT,
        meta_title TEXT,
        meta_description TEXT,
        status TEXT DEFAULT 'draft',
        author_staff_id INTEGER,
        published_at TEXT,
        show_in_header INTEGER DEFAULT 0,
        show_in_footer INTEGER DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_custom_pages_slug ON custom_pages(slug);
    `,
    },
];
export const LATEST_SELFHOST_MIGRATION_VERSION = SELFHOST_MIGRATIONS.reduce((max, m) => Math.max(max, m.version), 0);
