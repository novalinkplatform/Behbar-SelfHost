import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync, unlinkSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeWebReadableStream } from 'node:stream/web';
import type { MediaLike, MediaListEntry, MediaObjectLike } from '../types.ts';

const EXT_TO_CONTENT_TYPE: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
};

async function walk(dir: string, baseDir: string): Promise<MediaListEntry[]> {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const results: MediaListEntry[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walk(full, baseDir)));
    } else {
      const stat = statSync(full);
      results.push({ key: path.relative(baseDir, full).split(path.sep).join('/'), size: stat.size, uploaded: stat.mtime.toISOString() });
    }
  }
  return results;
}

// جایگزین سبک R2 برای حالت خوداستقرار — فایل‌ها را روی دیسک کنار دیتابیس نگه می‌دارد (باید همان جلد Docker باشد
// تا با ری‌استارت کانتینر از بین نرود).
export class LocalMediaBucket implements MediaLike {
  constructor(private dir: string) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  async put(key: string, body: ReadableStream | null): Promise<void> {
    if (!body) return;
    const filePath = path.join(this.dir, key);
    const parentDir = path.dirname(filePath);
    if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true });
    const nodeStream = Readable.fromWeb(body as unknown as NodeWebReadableStream);
    await new Promise<void>((resolve, reject) => {
      const out = createWriteStream(filePath);
      nodeStream.pipe(out);
      out.on('finish', () => resolve());
      out.on('error', reject);
      nodeStream.on('error', reject);
    });
  }

  async get(key: string): Promise<MediaObjectLike | null> {
    const filePath = path.join(this.dir, key);
    if (!existsSync(filePath)) return null;
    const ext = key.split('.').pop() ?? '';
    const contentType = EXT_TO_CONTENT_TYPE[ext] ?? 'application/octet-stream';
    const webStream = Readable.toWeb(createReadStream(filePath)) as unknown as ReadableStream;
    return { body: webStream, httpMetadata: { contentType } };
  }

  async list(prefix?: string): Promise<MediaListEntry[]> {
    const startDir = prefix ? path.join(this.dir, prefix) : this.dir;
    return walk(startDir, this.dir);
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.dir, key);
    if (existsSync(filePath)) unlinkSync(filePath);
  }
}
