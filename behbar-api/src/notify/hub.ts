// هر مشتری یک نمونه‌ی Durable Object جدا دارد (کلید: شناسه‌ی مشتری) که اتصال WebSocket زنده‌ی اپ
// اندرویدی را نگه می‌دارد. وقتی رویدادی روی سرور رخ می‌دهد (تغییر وضعیت درخواست، پیام جدید چت)،
// index.ts پیامی به همین نمونه POST می‌کند و اگر سوکتی متصل بود، بی‌درنگ برایش ارسال می‌شود —
// اگر متصل نبود، اعلان همچنان در جدول customer_notifications ذخیره شده و بعداً از طریق
// GET /api/customer/notifications قابل بازیابی است (پس هیچ اعلانی واقعاً گم نمی‌شود).
export class CustomerNotifyHub {
  private sockets = new Set<WebSocket>();

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/connect') {
      if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('Expected websocket', { status: 426 });
      }
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair) as [WebSocket, WebSocket];
      server.accept();
      this.sockets.add(server);
      const remove = () => this.sockets.delete(server);
      server.addEventListener('close', remove);
      server.addEventListener('error', remove);
      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname === '/send' && request.method === 'POST') {
      const payload = await request.text();
      for (const socket of this.sockets) {
        try {
          socket.send(payload);
        } catch {
          this.sockets.delete(socket);
        }
      }
      return new Response('ok');
    }

    return new Response('not found', { status: 404 });
  }
}
