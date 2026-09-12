import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync, unlinkSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
const EXT_TO_CONTENT_TYPE = {
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
async function walk(dir, baseDir) {
    if (!existsSync(dir))
        return [];
    const entries = await readdir(dir, { withFileTypes: true });
    const results = [];
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...(await walk(full, baseDir)));
        }
        else {
            const stat = statSync(full);
            results.push({ key: path.relative(baseDir, full).split(path.sep).join('/'), size: stat.size, uploaded: stat.mtime.toISOString() });
        }
    }
    return results;
}
// جایگزین سبک R2 برای حالت خوداستقرار — فایل‌ها را روی دیسک کنار دیتابیس نگه می‌دارد (باید همان جلد Docker باشد
// تا با ری‌استارت کانتینر از بین نرود).
export class LocalMediaBucket {
    dir;
    constructor(dir) {
        this.dir = dir;
        if (!existsSync(dir))
            mkdirSync(dir, { recursive: true });
    }
    async put(key, body) {
        if (!body)
            return;
        const filePath = path.join(this.dir, key);
        const parentDir = path.dirname(filePath);
        if (!existsSync(parentDir))
            mkdirSync(parentDir, { recursive: true });
        const nodeStream = Readable.fromWeb(body);
        await new Promise((resolve, reject) => {
            const out = createWriteStream(filePath);
            nodeStream.pipe(out);
            out.on('finish', () => resolve());
            out.on('error', reject);
            nodeStream.on('error', reject);
        });
    }
    async get(key) {
        const filePath = path.join(this.dir, key);
        if (!existsSync(filePath))
            return null;
        const ext = key.split('.').pop() ?? '';
        const contentType = EXT_TO_CONTENT_TYPE[ext] ?? 'application/octet-stream';
        const webStream = Readable.toWeb(createReadStream(filePath));
        return { body: webStream, httpMetadata: { contentType } };
    }
    async list(prefix) {
        const startDir = prefix ? path.join(this.dir, prefix) : this.dir;
        return walk(startDir, this.dir);
    }
    async delete(key) {
        const filePath = path.join(this.dir, key);
        if (existsSync(filePath))
            unlinkSync(filePath);
    }
}
