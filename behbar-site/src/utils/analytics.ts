import { API_BASE_URL } from '../data/config.ts';

const VISITOR_KEY = 'behbar_visitor_id';

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

// هرگز نباید رندر صفحه را کند یا مسدود کند یا خطایی نشان دهد — کاملاً fire-and-forget.
export function trackPageView(): void {
  try {
    const referrerHostname = document.referrer ? new URL(document.referrer).hostname : '';
    const referrer = referrerHostname && referrerHostname !== location.hostname ? referrerHostname : '';

    void fetch(`${API_BASE_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId: getVisitorId(), path: location.pathname, referrer }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* silent */
  }
}
