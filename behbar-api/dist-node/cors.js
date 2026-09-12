// روی کلادفلر همیشه همین دو آدرس ثابت است. روی حالت خوداستقرار (self-host)، دامنه‌های واقعی خریدار
// در self-host-server.ts با configureAllowedOrigins جایگزین می‌شود — همان منطق CORS برای هر دو ران‌تایم کافی است.
let STABLE_ORIGINS = [
    'https://behbarapp.ir',
    'https://admin.behbarapp.ir',
    'https://behbar.pages.dev',
    'https://behbar-admin.pages.dev',
];
const PREVIEW_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.behbar(-admin)?\.pages\.dev$/;
const LOCAL_DEV_PATTERN = /^https?:\/\/localhost(:\d+)?$/;
export function configureAllowedOrigins(origins) {
    if (origins.length)
        STABLE_ORIGINS = origins;
}
export function resolveAllowedOrigin(origin) {
    if (origin && (STABLE_ORIGINS.includes(origin) || PREVIEW_ORIGIN_PATTERN.test(origin) || LOCAL_DEV_PATTERN.test(origin))) {
        return origin;
    }
    return STABLE_ORIGINS[0];
}
export function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': resolveAllowedOrigin(origin),
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
    };
}
export function json(data, status, origin) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders(origin),
        },
    });
}
