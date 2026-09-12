// نقطه‌ی ورود مخصوص Worker کلادفلر — نازک نگه داشته شده، فقط bindings خام را با adaptWorkersEnv سازگار می‌کند
// و به منطق مشترک src/index.ts پاس می‌دهد. معادل خوداستقرارش src/selfhost/self-host-server.ts است.
import { handleRequest, runDailyScheduledTasks } from './index.ts';
import { adaptWorkersEnv } from './workers-adapter.ts';

// کلادفلر کلاس Durable Object را باید از همین ماژول ورودی export شده ببیند (طبق binding در wrangler.jsonc).
export { CustomerNotifyHub } from './notify/hub.ts';

export default {
  fetch: (request: Request, rawEnv: Parameters<typeof adaptWorkersEnv>[0]) => handleRequest(request, adaptWorkersEnv(rawEnv)),
  scheduled: (_event: unknown, rawEnv: Parameters<typeof adaptWorkersEnv>[0]) => runDailyScheduledTasks(adaptWorkersEnv(rawEnv)),
};
