import type { CustomerNotifyHubLike, D1Like, D1LikeStatement, Env, MediaLike } from './types.ts';

// فقط برای ران‌تایم Worker کلادفلر — bindings خام (D1Database/R2Bucket واقعی) را با حداقل رابط D1Like/MediaLike
// که src/index.ts انتظار دارد سازگار می‌کند. prepare/exec/put/get از قبل به‌صورت طبیعی همان شکل را دارند (به همین
// دلیل تا الان بدون هیچ adapter ای کار می‌کردند)؛ batchRun و list باید adapt شوند چون شکل واقعی‌شان روی
// D1Database/R2Bucket با MediaLike/D1Like فرق دارد (batch به‌جای batchRun، و list یک {objects,...} برمی‌گرداند
// نه آرایه‌ی مسطح). حالت خوداستقرار نیازی به این فایل ندارد — SqliteD1/LocalMediaBucket خودشان این شکل را دارند.
interface RawWorkersEnv {
  DB: D1Database;
  MEDIA?: R2Bucket;
  CUSTOMER_NOTIFY_HUB?: CustomerNotifyHubLike;
  ALLOWED_ORIGIN: string;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  LICENSE_API_URL: string;
}

function adaptD1(db: D1Database): D1Like {
  return {
    prepare: (query: string) => db.prepare(query) as unknown as D1LikeStatement,
    exec: (query: string) => db.exec(query),
    batchRun: async (statements: string[]) => {
      await db.batch(statements.map((s) => db.prepare(s)));
    },
  };
}

function adaptR2(bucket: R2Bucket): MediaLike {
  return {
    put: (key, body, options) => bucket.put(key, body, options),
    get: (key) => bucket.get(key) as unknown as ReturnType<MediaLike['get']>,
    list: async (prefix) => {
      const result = await bucket.list(prefix ? { prefix } : undefined);
      return result.objects.map((o) => ({ key: o.key, size: o.size, uploaded: o.uploaded.toISOString() }));
    },
    delete: (key) => bucket.delete(key),
  };
}

export function adaptWorkersEnv(raw: RawWorkersEnv): Env {
  return {
    ...raw,
    DB: adaptD1(raw.DB),
    MEDIA: raw.MEDIA ? adaptR2(raw.MEDIA) : undefined,
    CUSTOMER_NOTIFY_HUB: raw.CUSTOMER_NOTIFY_HUB,
    RUNTIME: 'cloudflare',
  };
}
