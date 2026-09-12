import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import type { D1Like, D1LikeStatement } from '../types.ts';
import { SELFHOST_MIGRATIONS, LATEST_SELFHOST_MIGRATION_VERSION } from './migrations.ts';

// شبیه‌ساز D1Database روی node:sqlite — چون امضای prepare().bind().all()/.first()/.run() هر دو یکسان است،
// کل src/index.ts بدون هیچ تغییری هم روی Worker کلادفلر و هم روی این ران‌تایم کار می‌کند.
export class SqliteD1 implements D1Like {
  private db: DatabaseSync;

  constructor(filePath: string) {
    this.db = new DatabaseSync(filePath);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec('PRAGMA foreign_keys = ON;');
  }

  prepare(query: string): D1LikeStatement {
    const db = this.db;

    function makeStatement(params: unknown[]): D1LikeStatement {
      return {
        bind(...args: unknown[]) {
          return makeStatement(args);
        },
        async all<T>() {
          const rows = db.prepare(query).all(...(params as never[])) as T[];
          return { results: rows };
        },
        async first<T>() {
          const row = db.prepare(query).get(...(params as never[])) as T | undefined;
          return row ?? null;
        },
        async run() {
          const info = db.prepare(query).run(...(params as never[]));
          return { meta: { last_row_id: Number(info.lastInsertRowid) } };
        },
      };
    }

    return makeStatement([]);
  }

  async exec(sql: string): Promise<void> {
    this.db.exec(sql);
  }

  execSync(sql: string): void {
    this.db.exec(sql);
  }

  async batchRun(statements: string[]): Promise<void> {
    this.db.exec('BEGIN');
    try {
      for (const statement of statements) this.db.exec(statement);
      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  getUserVersion(): number {
    const row = this.db.prepare('PRAGMA user_version').get() as { user_version: number } | undefined;
    return row?.user_version ?? 0;
  }

  setUserVersion(version: number): void {
    this.db.exec(`PRAGMA user_version = ${version}`);
  }
}

// در اولین اجرا (وقتی جدول staff اصلاً وجود ندارد)، schema.sql (که از قبل ساختار کامل و به‌روز همه‌ی جدول‌ها
// را دارد، شامل تمام تغییرات ساختاری migration-002 تا migration-012) و سپس seed نقش‌ها را اجرا می‌کند.
// migration-*.sql دوباره روی این دیتابیس تازه اجرا نمی‌شوند — بخش‌های ساختاری‌شان تکراری‌اند (و برخی، مثل
// ALTER TABLE ADD COLUMN، روی schema.sql خطا می‌دهند چون آن ستون از قبل وجود دارد) و بخش‌های seed لازم‌شان
// (نقش‌ها با مجوزهای نهایی) در bootstrap-selfhost-seed.sql خلاصه شده است.
export async function bootstrapIfEmpty(db: SqliteD1, projectRoot: string): Promise<void> {
  const hasStaffTable = await db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='staff'")
    .first();
  if (hasStaffTable) return;

  console.log('[bootstrap] Empty database detected — applying schema.sql and seed data...');

  db.execSync(readFileSync(path.join(projectRoot, 'schema.sql'), 'utf-8'));
  db.execSync(readFileSync(path.join(projectRoot, 'bootstrap-selfhost-seed.sql'), 'utf-8'));
  // schema.sql از قبل شامل تمام ستون‌های آخرین migration است، پس نسخه روی آخرین شماره تنظیم می‌شود
  // تا applyPendingSelfhostMigrations دوباره سعی نکند همان ستون‌ها را اضافه کند (که خطا می‌دهد).
  db.setUserVersion(LATEST_SELFHOST_MIGRATION_VERSION);

  console.log('[bootstrap] done.');
}

// روی یک نصب خوداستقرار قبلاً موجود (نه بوت‌استرپ تازه)، بعد از هر آپدیت ایمیج، ستون‌های ساختاری‌ای که از
// آخرین بار عقب مانده‌اند این‌جا اعمال می‌شوند — در هر بار بالا آمدن سرور صدا زده می‌شود و اگر چیزی برای
// اعمال نباشد کاری انجام نمی‌دهد.
export async function applyPendingSelfhostMigrations(db: SqliteD1): Promise<void> {
  const current = db.getUserVersion();
  const pending = SELFHOST_MIGRATIONS.filter((m) => m.version > current).sort((a, b) => a.version - b.version);
  for (const migration of pending) {
    console.log(`[migrate] applying self-host migration ${migration.version}...`);
    db.execSync(migration.sql);
    db.setUserVersion(migration.version);
  }
  if (pending.length) console.log('[migrate] done.');
}

export function ensureDataDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}
