import { Readable } from 'node:stream';
export async function toFetchRequest(req, baseUrl) {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
        if (Array.isArray(value))
            value.forEach((v) => headers.append(key, v));
        else if (value !== undefined)
            headers.set(key, value);
    }
    const method = req.method ?? 'GET';
    const init = { method, headers };
    if (method !== 'GET' && method !== 'HEAD') {
        init.body = Readable.toWeb(req);
        init.duplex = 'half';
    }
    return new Request(new URL(req.url ?? '/', baseUrl), init);
}
export async function sendFetchResponse(res, response) {
    const headers = {};
    response.headers.forEach((value, key) => {
        headers[key] = value;
    });
    res.writeHead(response.status, headers);
    if (!response.body) {
        res.end();
        return;
    }
    const nodeStream = Readable.fromWeb(response.body);
    await new Promise((resolve, reject) => {
        nodeStream.pipe(res);
        nodeStream.on('error', reject);
        res.on('finish', () => resolve());
    });
}
