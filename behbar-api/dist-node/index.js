import { REQUEST_STATUSES, TESTIMONIAL_STATUSES, PERMISSION_KEYS, PERMISSIONS, JOB_APPLICATION_STATUSES, FLEET_VEHICLE_STATUSES } from "./types.js";
import { json, corsHeaders, configureAllowedOrigins } from "./cors.js";
import { generateSalt, generateToken, hashPassword, verifyPassword, extractBearerToken } from "./auth.js";
import { backupToDrive, buildAuthUrl, exchangeCodeForTokens } from "./google-drive.js";
import { chatCompletion } from "./ai/providers.js";
import { AI_TOOLS, toolsForPermissions } from "./ai/tools.js";
function generateTrackingCode() {
    return String(Math.floor(10000000 + Math.random() * 90000000));
}
const PROPERTY_TYPES = ['residential', 'commercial', 'office', 'warehouse', 'other'];
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function isNullableFiniteNumber(value) {
    return value === null || value === undefined || (typeof value === 'number' && Number.isFinite(value));
}
function validateCreateBody(body) {
    if (typeof body !== 'object' || body === null)
        return { ok: false, error: 'بدنه درخواست نامعتبر است.' };
    const b = body;
    const requiredStrings = [
        'customerName',
        'serviceId',
        'serviceLabel',
        'originProvince',
        'originCity',
        'destinationProvince',
        'destinationCity',
        'laborChoice',
        'scheduledDate',
        'scheduledTime',
        'phone',
    ];
    for (const key of requiredStrings) {
        if (!isNonEmptyString(b[key]))
            return { ok: false, error: `فیلد ${key} الزامی است.` };
    }
    if (!/^09\d{9}$/.test(String(b.phone)))
        return { ok: false, error: 'شماره موبایل معتبر نیست.' };
    if (!PROPERTY_TYPES.includes(String(b.originPropertyType)) || !PROPERTY_TYPES.includes(String(b.destinationPropertyType))) {
        return { ok: false, error: 'نوع مکان نامعتبر است.' };
    }
    if (!isNullableFiniteNumber(b.originLat) || !isNullableFiniteNumber(b.originLng)) {
        return { ok: false, error: 'مختصات مبدأ نامعتبر است.' };
    }
    if (!isNullableFiniteNumber(b.destinationLat) || !isNullableFiniteNumber(b.destinationLng)) {
        return { ok: false, error: 'مختصات مقصد نامعتبر است.' };
    }
    const numberFields = ['originFloor', 'destinationFloor', 'estimateMin', 'estimateAvg', 'estimateMax'];
    for (const key of numberFields) {
        if (typeof b[key] !== 'number' || !Number.isFinite(b[key]))
            return { ok: false, error: `فیلد ${key} باید عدد باشد.` };
    }
    if (typeof b.originElevator !== 'boolean' || typeof b.destinationElevator !== 'boolean' || typeof b.wantsPacking !== 'boolean') {
        return { ok: false, error: 'فیلدهای بولی نامعتبرند.' };
    }
    if (typeof b.originNotes === 'string' && b.originNotes.length > 500)
        return { ok: false, error: 'توضیحات مبدأ بیش از حد طولانی است.' };
    if (typeof b.destinationNotes === 'string' && b.destinationNotes.length > 500) {
        return { ok: false, error: 'توضیحات مقصد بیش از حد طولانی است.' };
    }
    return { ok: true, data: b };
}
function toClientShape(row) {
    return {
        id: row.id,
        trackingCode: row.tracking_code,
        customerName: row.customer_name,
        serviceId: row.service_id,
        serviceLabel: row.service_label,
        originProvince: row.origin_province,
        originCity: row.origin_city,
        originCountry: row.origin_country,
        originPropertyType: row.origin_property_type,
        originLat: row.origin_lat,
        originLng: row.origin_lng,
        originNotes: row.origin_notes,
        destinationProvince: row.destination_province,
        destinationCity: row.destination_city,
        destinationCountry: row.destination_country,
        destinationPropertyType: row.destination_property_type,
        destinationLat: row.destination_lat,
        destinationLng: row.destination_lng,
        destinationNotes: row.destination_notes,
        originFloor: row.origin_floor,
        originElevator: Boolean(row.origin_elevator),
        destinationFloor: row.destination_floor,
        destinationElevator: Boolean(row.destination_elevator),
        wantsPacking: Boolean(row.wants_packing),
        laborChoice: row.labor_choice,
        scheduledDate: row.scheduled_date,
        scheduledTime: row.scheduled_time,
        estimateMin: row.estimate_min,
        estimateAvg: row.estimate_avg,
        estimateMax: row.estimate_max,
        phone: row.phone,
        status: row.status,
        assignedStaffId: row.assigned_staff_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function parseRolePermissions(json) {
    try {
        const arr = JSON.parse(json || '[]');
        return Array.isArray(arr) ? arr.filter((p) => PERMISSION_KEYS.includes(p)) : [];
    }
    catch {
        return [];
    }
}
async function loadRolesMap(env) {
    const { results } = await env.DB.prepare('SELECT * FROM roles').all();
    const map = new Map();
    for (const row of results ?? []) {
        map.set(row.key, {
            key: row.key,
            label: row.label,
            labelEn: row.label_en,
            permissions: parseRolePermissions(row.permissions_json),
            isSystem: Boolean(row.is_system),
        });
    }
    return map;
}
function toStaffClientShape(row, rolesMap, onActiveService = false) {
    const role = rolesMap.get(row.role);
    return {
        id: row.id,
        username: row.username,
        fullName: row.full_name,
        role: row.role,
        roleLabel: role?.label ?? row.role,
        permissions: role?.permissions ?? [],
        assignable: role?.permissions.includes('assignments') ?? false,
        phone: row.phone,
        avatarUrl: row.avatar_url,
        nationalId: row.national_id,
        address: row.address,
        hireDate: row.hire_date,
        emergencyContactName: row.emergency_contact_name,
        emergencyContactPhone: row.emergency_contact_phone,
        notes: row.notes,
        gender: row.gender,
        isActive: Boolean(row.is_active),
        isReadOnly: Boolean(row.is_read_only),
        onActiveService,
        twoFactorEnabled: Boolean(row.sms_2fa_enabled),
        salaryAmountOverride: row.salary_amount_override,
        bonusTypeOverride: row.bonus_type_override,
        bonusAmountOverride: row.bonus_amount_override,
        createdAt: row.created_at,
    };
}
const STATUS_LABELS_FA = {
    pending: 'در انتظار بررسی',
    contacted: 'تماس گرفته شده',
    scheduled: 'زمان‌بندی شده',
    in_progress: 'در حال انجام',
    completed: 'انجام شده',
    cancelled: 'لغو شده',
};
async function logRequestEvent(env, requestId, eventType, description, staffId = null) {
    await env.DB.prepare('INSERT INTO request_events (request_id, event_type, description, staff_id) VALUES (?, ?, ?, ?)')
        .bind(requestId, eventType, description, staffId)
        .run();
}
async function createRequest(request, env, origin) {
    const allowed = await checkRateLimit(env, 'create_request', getClientIp(request), 5, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const validation = validateCreateBody(body);
    if (!validation.ok)
        return json({ error: validation.error }, 400, origin);
    const d = validation.data;
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const trackingCode = generateTrackingCode();
        try {
            await env.DB.prepare(`INSERT INTO requests (
          tracking_code, customer_name, service_id, service_label, origin_province, origin_city, origin_country,
          origin_property_type, origin_lat, origin_lng, origin_notes,
          destination_province, destination_city, destination_country, destination_property_type, destination_lat, destination_lng, destination_notes,
          origin_floor, origin_elevator,
          destination_floor, destination_elevator, wants_packing, labor_choice,
          scheduled_date, scheduled_time, estimate_min, estimate_avg, estimate_max, phone
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
                .bind(trackingCode, d.customerName, d.serviceId, d.serviceLabel, d.originProvince, d.originCity, isNonEmptyString(d.originCountry) ? d.originCountry : 'ایران', d.originPropertyType, d.originLat ?? null, d.originLng ?? null, isNonEmptyString(d.originNotes) ? d.originNotes.trim() : null, d.destinationProvince, d.destinationCity, isNonEmptyString(d.destinationCountry) ? d.destinationCountry : 'ایران', d.destinationPropertyType, d.destinationLat ?? null, d.destinationLng ?? null, isNonEmptyString(d.destinationNotes) ? d.destinationNotes.trim() : null, d.originFloor, d.originElevator ? 1 : 0, d.destinationFloor, d.destinationElevator ? 1 : 0, d.wantsPacking ? 1 : 0, d.laborChoice, d.scheduledDate, d.scheduledTime, Math.round(d.estimateMin), Math.round(d.estimateAvg), Math.round(d.estimateMax), d.phone)
                .run();
            const created = await env.DB.prepare('SELECT id FROM requests WHERE tracking_code = ?').bind(trackingCode).first();
            if (created)
                await logRequestEvent(env, created.id, 'created', 'درخواست ثبت شد.');
            return json({ trackingCode }, 201, origin);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : '';
            if (message.includes('UNIQUE'))
                continue;
            return json({ error: 'ثبت درخواست ناموفق بود.' }, 500, origin);
        }
    }
    return json({ error: 'ثبت درخواست ناموفق بود.' }, 500, origin);
}
async function listMyRequests(request, url, env, origin) {
    const phone = url.searchParams.get('phone');
    if (!phone || !/^09\d{9}$/.test(phone)) {
        return json({ error: 'شماره موبایل معتبر ارسال کن.' }, 400, origin);
    }
    // بدون این محدودیت، یک اسکریپت می‌تواند با حدس‌زدن شماره موبایل‌های معتبر ایرانی، نام و
    // آدرس مشتریان دیگر را استخراج کند — این تنها لایه‌ی محافظتی این مسیر عمومی است.
    const allowed = await checkRateLimit(env, 'list_my_requests', getClientIp(request), 15, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    const { results } = await env.DB.prepare('SELECT * FROM requests WHERE phone = ? ORDER BY created_at DESC LIMIT 50')
        .bind(phone)
        .all();
    return json({ requests: (results ?? []).map(toClientShape) }, 200, origin);
}
const EDITABLE_STATUSES = ['pending', 'contacted', 'scheduled'];
async function updateMyRequest(request, url, env, origin) {
    const idMatch = url.pathname.match(/^\/api\/requests\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const phone = typeof b.phone === 'string' ? b.phone : '';
    if (!/^09\d{9}$/.test(phone))
        return json({ error: 'شماره موبایل معتبر نیست.' }, 400, origin);
    const row = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
    if (!row)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    if (row.phone !== phone)
        return json({ error: 'دسترسی نداری.' }, 403, origin);
    if (!EDITABLE_STATUSES.includes(row.status)) {
        return json({ error: 'این درخواست دیگر قابل ویرایش نیست.' }, 400, origin);
    }
    if (b.cancel === true) {
        await env.DB.prepare("UPDATE requests SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?").bind(id).run();
        const updated = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
        return json({ request: toClientShape(updated) }, 200, origin);
    }
    const scheduledDate = typeof b.scheduledDate === 'string' ? b.scheduledDate.trim() : '';
    const scheduledTime = typeof b.scheduledTime === 'string' ? b.scheduledTime.trim() : '';
    if (!scheduledDate || !scheduledTime) {
        return json({ error: 'تاریخ و ساعت معتبر ارسال کن.' }, 400, origin);
    }
    await env.DB.prepare("UPDATE requests SET scheduled_date = ?, scheduled_time = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(scheduledDate, scheduledTime, id)
        .run();
    const updated = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
    return json({ request: toClientShape(updated) }, 200, origin);
}
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;
async function staffLogin(request, env, origin) {
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const username = typeof b.username === 'string' ? b.username.trim() : '';
    const password = typeof b.password === 'string' ? b.password : '';
    if (!username || !password)
        return json({ error: 'نام کاربری و رمز عبور را وارد کنید.' }, 400, origin);
    const staff = await env.DB.prepare('SELECT * FROM staff WHERE username = ?').bind(username).first();
    // پیام یکسان برای «کاربر نیست» و «رمز اشتباه است» عمداً حفظ شده تا حساب کاربری وجود‌داشتن را لو ندهد؛
    // اما قفل‌شدگی فقط وقتی معنا دارد که واقعاً یک حساب پیدا شده باشد.
    if (!staff || !staff.is_active)
        return json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, 401, origin);
    if (staff.locked_until && Date.parse(staff.locked_until) > Date.now()) {
        const waitMin = Math.ceil((Date.parse(staff.locked_until) - Date.now()) / 60000);
        return json({ error: `به‌دلیل تلاش‌های ناموفق زیاد، این حساب موقتاً قفل شده — حدود ${waitMin} دقیقه‌ی دیگر دوباره امتحان کنید.` }, 429, origin);
    }
    const valid = await verifyPassword(password, staff.password_salt, staff.password_hash);
    if (!valid) {
        const attempts = staff.failed_login_attempts + 1;
        if (attempts >= LOGIN_MAX_ATTEMPTS) {
            const lockedUntil = new Date(Date.now() + LOGIN_LOCKOUT_MS).toISOString();
            await env.DB.prepare('UPDATE staff SET failed_login_attempts = 0, locked_until = ? WHERE id = ?').bind(lockedUntil, staff.id).run();
            return json({ error: 'به‌دلیل تلاش‌های ناموفق زیاد، این حساب موقتاً قفل شد — ۱۵ دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
        }
        await env.DB.prepare('UPDATE staff SET failed_login_attempts = ? WHERE id = ?').bind(attempts, staff.id).run();
        return json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, 401, origin);
    }
    if (staff.failed_login_attempts > 0 || staff.locked_until) {
        await env.DB.prepare('UPDATE staff SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?').bind(staff.id).run();
    }
    // رمز عبور درست بود — اگر ورود دومرحله‌ای فعال است، هنوز نشست واقعی صادر نمی‌شود؛ یک چالش موقت
    // برمی‌گردد و کلاینت باید کد پیامکی را هم از /api/staff/login/verify-2fa تأیید کند.
    if (staff.sms_2fa_enabled) {
        if (!staff.phone)
            return json({ error: 'شماره موبایل برای ارسال کد دومرحله‌ای ثبت نشده — با پشتیبانی تماس بگیرید.' }, 400, origin);
        const challengeToken = generateToken();
        const challengeExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        await env.DB.prepare('INSERT INTO staff_2fa_challenges (token, staff_id, expires_at) VALUES (?, ?, ?)')
            .bind(challengeToken, staff.id, challengeExpiresAt)
            .run();
        const code = String(Math.floor(100000 + Math.random() * 900000));
        const salt = generateSalt();
        const codeHash = await hashPassword(code, salt);
        const codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
        await env.DB.prepare('UPDATE staff SET two_fa_code_hash = ?, two_fa_code_salt = ?, two_fa_code_expires_at = ? WHERE id = ?')
            .bind(codeHash, salt, codeExpiresAt, staff.id)
            .run();
        await sendSms(env, staff.phone, `کد ورود بهبار: ${code} (تا ۵ دقیقه معتبر است)`);
        return json({ needsTwoFactor: true, challengeToken }, 200, origin);
    }
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await env.DB.prepare('INSERT INTO staff_sessions (token, staff_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, staff.id, expiresAt)
        .run();
    const rolesMap = await loadRolesMap(env);
    return json({ token, staff: toStaffClientShape(staff, rolesMap) }, 200, origin);
}
async function staffVerifyTwoFactor(request, env, origin) {
    const allowed = await checkRateLimit(env, 'staff_2fa_verify', getClientIp(request), 10, 600);
    if (!allowed)
        return json({ error: 'تعداد تلاش‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const challengeToken = typeof b.challengeToken === 'string' ? b.challengeToken : '';
    const code = typeof b.code === 'string' ? b.code.trim() : '';
    if (!challengeToken || !code)
        return json({ error: 'کد را وارد کنید.' }, 400, origin);
    const challenge = await env.DB.prepare('SELECT * FROM staff_2fa_challenges WHERE token = ?')
        .bind(challengeToken)
        .first();
    if (!challenge || Date.parse(challenge.expires_at) < Date.now()) {
        return json({ error: 'نشست ورود منقضی شده — دوباره وارد شوید.' }, 400, origin);
    }
    const staff = await env.DB.prepare('SELECT * FROM staff WHERE id = ?').bind(challenge.staff_id).first();
    if (!staff || !staff.is_active)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const valid = !!staff.two_fa_code_hash &&
        !!staff.two_fa_code_salt &&
        !!staff.two_fa_code_expires_at &&
        Date.parse(staff.two_fa_code_expires_at) > Date.now() &&
        (await verifyPassword(code, staff.two_fa_code_salt, staff.two_fa_code_hash));
    if (!valid)
        return json({ error: 'کد نامعتبر یا منقضی‌شده است.' }, 401, origin);
    // چالش و کد پیامکی یک‌بارمصرف‌اند — بعد از تأیید موفق پاک می‌شوند تا دوباره قابل استفاده نباشند.
    await env.DB.prepare('DELETE FROM staff_2fa_challenges WHERE token = ?').bind(challengeToken).run();
    await env.DB.prepare('UPDATE staff SET two_fa_code_hash = NULL, two_fa_code_salt = NULL, two_fa_code_expires_at = NULL WHERE id = ?')
        .bind(staff.id)
        .run();
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await env.DB.prepare('INSERT INTO staff_sessions (token, staff_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, staff.id, expiresAt)
        .run();
    const rolesMap = await loadRolesMap(env);
    return json({ token, staff: toStaffClientShape(staff, rolesMap) }, 200, origin);
}
// ===== ورود دومرحله‌ای پیامکی — مدیریت خودِ کارمند روی حساب خودش (نه نیاز به مجوز خاص، فقط ورود کافی است) =====
async function staffSmsTwoFactorSetup(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    if (!staff.phone)
        return json({ error: 'ابتدا شماره موبایل خودتان را در پروفایل ثبت کنید.' }, 400, origin);
    const allowed = await checkRateLimit(env, 'staff_2fa_sms_setup', String(staff.id), 5, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const salt = generateSalt();
    const codeHash = await hashPassword(code, salt);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await env.DB.prepare('UPDATE staff SET two_fa_code_hash = ?, two_fa_code_salt = ?, two_fa_code_expires_at = ? WHERE id = ?')
        .bind(codeHash, salt, expiresAt, staff.id)
        .run();
    await sendSms(env, staff.phone, `کد فعال‌سازی ورود دومرحله‌ای بهبار: ${code} (تا ۵ دقیقه معتبر است)`);
    return json({ ok: true }, 200, origin);
}
async function staffSmsTwoFactorConfirm(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const row = await env.DB.prepare('SELECT two_fa_code_hash, two_fa_code_salt, two_fa_code_expires_at FROM staff WHERE id = ?')
        .bind(staff.id)
        .first();
    if (!row?.two_fa_code_hash || !row.two_fa_code_salt || !row.two_fa_code_expires_at || Date.parse(row.two_fa_code_expires_at) < Date.now()) {
        return json({ error: 'کد نامعتبر یا منقضی‌شده است.' }, 400, origin);
    }
    const valid = await verifyPassword(code, row.two_fa_code_salt, row.two_fa_code_hash);
    if (!valid)
        return json({ error: 'کد نامعتبر است.' }, 400, origin);
    await env.DB.prepare(`UPDATE staff SET sms_2fa_enabled = 1, two_fa_code_hash = NULL, two_fa_code_salt = NULL, two_fa_code_expires_at = NULL WHERE id = ?`)
        .bind(staff.id)
        .run();
    return json({ ok: true }, 200, origin);
}
async function staffTwoFactorDisable(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const password = typeof body?.password === 'string' ? body.password : '';
    const row = await env.DB.prepare('SELECT password_hash, password_salt FROM staff WHERE id = ?')
        .bind(staff.id)
        .first();
    if (!row || !(await verifyPassword(password, row.password_salt, row.password_hash))) {
        return json({ error: 'رمز عبور درست نیست.' }, 401, origin);
    }
    await env.DB.prepare(`UPDATE staff SET sms_2fa_enabled = 0, two_fa_code_hash = NULL, two_fa_code_salt = NULL, two_fa_code_expires_at = NULL WHERE id = ?`)
        .bind(staff.id)
        .run();
    return json({ ok: true }, 200, origin);
}
async function staffLogout(request, env, origin) {
    const token = extractBearerToken(request);
    if (token)
        await env.DB.prepare('DELETE FROM staff_sessions WHERE token = ?').bind(token).run();
    return json({ ok: true }, 200, origin);
}
async function resolveStaff(request, env) {
    const token = extractBearerToken(request);
    if (!token)
        return null;
    const row = await env.DB.prepare(`SELECT staff.*, roles.permissions_json as role_permissions_json
     FROM staff_sessions
     JOIN staff ON staff.id = staff_sessions.staff_id
     LEFT JOIN roles ON roles.key = staff.role
     WHERE staff_sessions.token = ? AND staff_sessions.expires_at > datetime('now') AND staff.is_active = 1`)
        .bind(token)
        .first();
    if (!row)
        return null;
    const { role_permissions_json, ...staffFields } = row;
    return { ...staffFields, permissions: parseRolePermissions(role_permissions_json) };
}
// ===== احراز هویت مشتری =====
// کاملاً جدا از سیستم staff — مشتری‌ها نقش/دسترسی ندارند، فقط یک حساب با شماره موبایل و رمز عبور.
// درخواست‌ها همچنان با ستون phone پیدا می‌شوند (بدون تغییر مدل داده‌ی requests)؛ این فقط یک لایه‌ی
// هویت روی همان جست‌وجوی قبلی اضافه می‌کند تا صفحه‌ی «سفارش‌های من» دیگر فقط با دانستن یک شماره
// موبایل قابل‌دیدن نباشد.
const PHONE_PATTERN = /^09\d{9}$/;
function normalizeCustomerPhone(val) {
    let p = val
        .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
        .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
        .trim()
        .replace(/[\s\-_]/g, '');
    if (p.startsWith('+98'))
        p = '0' + p.slice(3);
    else if (p.startsWith('0098'))
        p = '0' + p.slice(4);
    else if (p.startsWith('98'))
        p = '0' + p.slice(2);
    return p;
}
async function ensureCustomerAuthTables(env) {
    await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS customer_otp_codes (
      phone TEXT PRIMARY KEY,
      code_hash TEXT NOT NULL,
      code_salt TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run().catch(() => { });
    await env.DB.prepare(`ALTER TABLE customers ADD COLUMN gender TEXT`).run().catch(() => { });
    await env.DB.prepare(`ALTER TABLE customers ADD COLUMN company_name TEXT`).run().catch(() => { });
    await env.DB.prepare(`
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
    )
  `).run().catch(() => { });
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_customer_addresses_cid ON customer_addresses(customer_id)`).run().catch(() => { });
}
async function customerRegister(request, env, origin) {
    const allowed = await checkRateLimit(env, 'customer_register', getClientIp(request), 5, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
    const password = typeof b.password === 'string' ? b.password : '';
    const fullName = typeof b.fullName === 'string' ? b.fullName.trim() : '';
    if (!PHONE_PATTERN.test(phone))
        return json({ error: 'شماره موبایل معتبر وارد کنید.' }, 400, origin);
    if (!password || password.length < 6)
        return json({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' }, 400, origin);
    if (!fullName)
        return json({ error: 'نام و نام خانوادگی الزامی است.' }, 400, origin);
    const existing = await env.DB.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).first();
    if (existing)
        return json({ error: 'حسابی با این شماره موبایل قبلاً ثبت شده — وارد شوید.' }, 409, origin);
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);
    const insert = await env.DB.prepare('INSERT INTO customers (phone, password_hash, password_salt, full_name) VALUES (?,?,?,?)')
        .bind(phone, passwordHash, salt, fullName)
        .run();
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await env.DB.prepare('INSERT INTO customer_sessions (token, customer_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, insert.meta.last_row_id, expiresAt)
        .run();
    return json({ token, customer: { id: insert.meta.last_row_id, phone, fullName } }, 201, origin);
}
async function customerLogin(request, env, origin) {
    const allowed = await checkRateLimit(env, 'customer_login', getClientIp(request), 10, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
    const password = typeof b.password === 'string' ? b.password : '';
    if (!phone || !password)
        return json({ error: 'شماره موبایل و رمز عبور را وارد کنید.' }, 400, origin);
    const customer = await env.DB.prepare('SELECT * FROM customers WHERE phone = ?').bind(phone).first();
    // پیام یکسان برای «حساب نیست» و «رمز اشتباه است» عمداً حفظ شده تا وجود یک شماره را لو ندهد.
    if (!customer)
        return json({ error: 'شماره موبایل یا رمز عبور اشتباه است.' }, 401, origin);
    if (customer.locked_until && Date.parse(customer.locked_until) > Date.now()) {
        const waitMin = Math.ceil((Date.parse(customer.locked_until) - Date.now()) / 60000);
        return json({ error: `به‌دلیل تلاش‌های ناموفق زیاد، این حساب موقتاً قفل شده — حدود ${waitMin} دقیقه‌ی دیگر دوباره امتحان کنید.` }, 429, origin);
    }
    const valid = await verifyPassword(password, customer.password_salt, customer.password_hash);
    if (!valid) {
        const attempts = customer.failed_login_attempts + 1;
        if (attempts >= LOGIN_MAX_ATTEMPTS) {
            const lockedUntil = new Date(Date.now() + LOGIN_LOCKOUT_MS).toISOString();
            await env.DB.prepare('UPDATE customers SET failed_login_attempts = 0, locked_until = ? WHERE id = ?').bind(lockedUntil, customer.id).run();
            return json({ error: 'به‌دلیل تلاش‌های ناموفق زیاد، این حساب موقتاً قفل شد — ۱۵ دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
        }
        await env.DB.prepare('UPDATE customers SET failed_login_attempts = ? WHERE id = ?').bind(attempts, customer.id).run();
        return json({ error: 'شماره موبایل یا رمز عبور اشتباه است.' }, 401, origin);
    }
    if (customer.failed_login_attempts > 0 || customer.locked_until) {
        await env.DB.prepare('UPDATE customers SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?').bind(customer.id).run();
    }
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await env.DB.prepare('INSERT INTO customer_sessions (token, customer_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, customer.id, expiresAt)
        .run();
    return json({ token, customer: { id: customer.id, phone: customer.phone, fullName: customer.full_name } }, 200, origin);
}
async function customerLogout(request, env, origin) {
    const token = extractBearerToken(request);
    if (token)
        await env.DB.prepare('DELETE FROM customer_sessions WHERE token = ?').bind(token).run();
    return json({ ok: true }, 200, origin);
}
async function resolveCustomer(request, env) {
    const token = extractBearerToken(request);
    if (!token)
        return null;
    const row = await env.DB.prepare(`SELECT customers.* FROM customer_sessions JOIN customers ON customers.id = customer_sessions.customer_id
     WHERE customer_sessions.token = ? AND customer_sessions.expires_at > datetime('now')`)
        .bind(token)
        .first();
    if (!row)
        return null;
    return {
        id: row.id,
        phone: row.phone,
        fullName: row.full_name,
        gender: row.gender ?? null,
        companyName: row.company_name ?? null,
    };
}
async function customerMe(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const customer = await resolveCustomer(request, env);
    if (!customer)
        return json({ error: 'دسترسی غیرمجاز است.' }, 401, origin);
    return json({ customer }, 200, origin);
}
async function customerSendOtp(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const ip = getClientIp(request);
    const allowed = await checkRateLimit(env, 'customer_otp_send', ip, 100, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const rawPhone = typeof b.phone === 'string' ? b.phone : '';
    const phone = normalizeCustomerPhone(rawPhone);
    if (!PHONE_PATTERN.test(phone)) {
        return json({ error: 'شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).' }, 400, origin);
    }
    const code = String(Math.floor(10000 + Math.random() * 90000));
    const salt = generateSalt();
    const codeHash = await hashPassword(code, salt);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await env.DB.prepare(`
    INSERT INTO customer_otp_codes (phone, code_hash, code_salt, expires_at, attempts)
    VALUES (?, ?, ?, ?, 0)
    ON CONFLICT(phone) DO UPDATE SET
      code_hash = excluded.code_hash,
      code_salt = excluded.code_salt,
      expires_at = excluded.expires_at,
      attempts = 0,
      created_at = datetime('now')
  `)
        .bind(phone, codeHash, salt, expiresAt)
        .run();
    // در پترن‌های ملی‌پیامک (BaseServiceNumber)، پارامتر text فقط متغیرهای پترن (کد تأیید) است
    let smsResult = await sendSms(env, phone, code);
    if (!smsResult.ok && smsResult.error === 'InvalidData') {
        // تلاش با متغیر دوم در صورت دومرحله‌ای بودن پترن
        const try2 = await sendSms(env, phone, `${code};بهبار`);
        if (try2.ok)
            smsResult = try2;
    }
    if (!smsResult.ok) {
        return json({ error: `ارسال پیامک با خطا مواجه شد: ${smsResult.error}`, smsResult }, 502, origin);
    }
    return json({ ok: true, phone, smsResult }, 200, origin);
}
async function customerVerifyOtp(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const ip = getClientIp(request);
    const allowed = await checkRateLimit(env, 'customer_otp_verify', ip, 12, 600);
    if (!allowed)
        return json({ error: 'تعداد تلاش‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const rawPhone = typeof b.phone === 'string' ? b.phone : '';
    const phone = normalizeCustomerPhone(rawPhone);
    const code = typeof b.code === 'string' ? b.code.trim().replace(/\D/g, '') : '';
    if (!phone || !code || code.length !== 5) {
        return json({ error: 'کد ۵ رقمی معتبر را وارد کنید.' }, 400, origin);
    }
    const record = await env.DB.prepare('SELECT * FROM customer_otp_codes WHERE phone = ?')
        .bind(phone)
        .first();
    if (!record) {
        return json({ error: 'کد تأیید یافت نشد یا منقضی شده است. لطفاً کد جدید دریافت کنید.' }, 400, origin);
    }
    if (Date.parse(record.expires_at) < Date.now()) {
        await env.DB.prepare('DELETE FROM customer_otp_codes WHERE phone = ?').bind(phone).run();
        return json({ error: 'کد تأیید منقضی شده است. لطفاً کد جدید دریافت کنید.' }, 400, origin);
    }
    const isValid = await verifyPassword(code, record.code_salt, record.code_hash);
    if (!isValid) {
        const attempts = record.attempts + 1;
        if (attempts >= 5) {
            await env.DB.prepare('DELETE FROM customer_otp_codes WHERE phone = ?').bind(phone).run();
            return json({ error: 'به‌علت تکرار اشتباه، کد باطل شد. مجدداً درخواست کد کنید.' }, 429, origin);
        }
        await env.DB.prepare('UPDATE customer_otp_codes SET attempts = ? WHERE phone = ?').bind(attempts, phone).run();
        return json({ error: 'کد واردشده نادرست است.' }, 400, origin);
    }
    await env.DB.prepare('DELETE FROM customer_otp_codes WHERE phone = ?').bind(phone).run();
    let customer = await env.DB.prepare('SELECT * FROM customers WHERE phone = ?').bind(phone).first();
    let isNew = false;
    if (!customer) {
        const salt = generateSalt();
        const dummyHash = await hashPassword(generateToken(), salt);
        const insert = await env.DB.prepare('INSERT INTO customers (phone, password_hash, password_salt, full_name, gender) VALUES (?, ?, ?, ?, NULL)')
            .bind(phone, dummyHash, salt, '')
            .run();
        customer = {
            id: Number(insert.meta.last_row_id),
            phone,
            password_hash: dummyHash,
            password_salt: salt,
            full_name: '',
            gender: null,
            failed_login_attempts: 0,
            locked_until: null,
            reset_code_hash: null,
            reset_code_salt: null,
            reset_code_expires_at: null,
            created_at: new Date().toISOString(),
        };
        isNew = true;
    }
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await env.DB.prepare('INSERT INTO customer_sessions (token, customer_id, expires_at) VALUES (?, ?, ?)')
        .bind(token, customer.id, expiresAt)
        .run();
    const needsProfile = !customer.full_name || !customer.gender;
    return json({
        ok: true,
        token,
        customer: {
            id: customer.id,
            phone: customer.phone,
            fullName: customer.full_name,
            gender: customer.gender ?? null,
            companyName: customer.company_name ?? null,
        },
        isNew,
        needsProfile,
    }, 200, origin);
}
async function customerUpdateProfile(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const current = await resolveCustomer(request, env);
    if (!current)
        return json({ error: 'دسترسی غیرمجاز است. لطفاً مجدداً وارد شوید.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const fullName = typeof b.fullName === 'string' ? b.fullName.trim() : '';
    const gender = typeof b.gender === 'string' ? b.gender.trim().toLowerCase() : '';
    const companyName = typeof b.companyName === 'string' ? b.companyName.trim() : '';
    if (!fullName || fullName.length < 2) {
        return json({ error: 'لطفاً نام و نام خانوادگی را وارد کنید.' }, 400, origin);
    }
    const validGenders = ['female', 'male', 'company', 'organization'];
    if (!validGenders.includes(gender)) {
        return json({ error: 'لطفاً نوع حساب کاربری را انتخاب کنید.' }, 400, origin);
    }
    if ((gender === 'company' || gender === 'organization') && !companyName) {
        return json({ error: gender === 'company' ? 'لطفاً نام شرکت را وارد کنید.' : 'لطفاً نام اداره یا سازمان را وارد کنید.' }, 400, origin);
    }
    await env.DB.prepare('UPDATE customers SET full_name = ?, gender = ?, company_name = ? WHERE id = ?')
        .bind(fullName, gender, companyName || null, current.id)
        .run();
    return json({
        ok: true,
        customer: {
            id: current.id,
            phone: current.phone,
            fullName,
            gender,
            companyName: companyName || null,
        },
    }, 200, origin);
}
async function customerListAddresses(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const current = await resolveCustomer(request, env);
    if (!current)
        return json({ error: 'دسترسی غیرمجاز است. لطفاً مجدداً وارد شوید.' }, 401, origin);
    const rows = await env.DB.prepare('SELECT * FROM customer_addresses WHERE customer_id = ? ORDER BY id DESC')
        .bind(current.id)
        .all();
    const addresses = (rows.results ?? []).map((r) => ({
        id: r.id,
        title: r.title,
        city: r.city,
        address: r.address,
        floor: r.floor ?? '',
        unit: r.unit ?? '',
        hasElevator: Boolean(r.has_elevator),
        notes: r.notes ?? '',
        createdAt: r.created_at,
    }));
    return json({ ok: true, addresses }, 200, origin);
}
async function customerCreateAddress(request, env, origin) {
    await ensureCustomerAuthTables(env);
    const current = await resolveCustomer(request, env);
    if (!current)
        return json({ error: 'دسترسی غیرمجاز است. لطفاً مجدداً وارد شوید.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const title = typeof b.title === 'string' ? b.title.trim() : '';
    const city = typeof b.city === 'string' ? b.city.trim() : '';
    const address = typeof b.address === 'string' ? b.address.trim() : '';
    const floor = typeof b.floor === 'string' ? b.floor.trim() : '';
    const unit = typeof b.unit === 'string' ? b.unit.trim() : '';
    const hasElevator = b.hasElevator === true || b.hasElevator === 1 ? 1 : 0;
    const notes = typeof b.notes === 'string' ? b.notes.trim() : '';
    if (!title)
        return json({ error: 'لطفاً عنوان آدرس را وارد کنید (مثلاً منزل یا محل کار).' }, 400, origin);
    if (!address || address.length < 5)
        return json({ error: 'لطفاً نشانی کامل را وارد کنید.' }, 400, origin);
    const res = await env.DB.prepare(`INSERT INTO customer_addresses (customer_id, title, city, address, floor, unit, has_elevator, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`)
        .bind(current.id, title, city || 'تهران', address, floor || null, unit || null, hasElevator, notes || null)
        .first();
    if (!res)
        return json({ error: 'ثبت آدرس با خطا مواجه شد.' }, 500, origin);
    return json({
        ok: true,
        address: {
            id: res.id,
            title: res.title,
            city: res.city,
            address: res.address,
            floor: res.floor ?? '',
            unit: res.unit ?? '',
            hasElevator: Boolean(res.has_elevator),
            notes: res.notes ?? '',
            createdAt: res.created_at,
        },
    }, 201, origin);
}
async function customerDeleteAddress(request, env, origin, addressId) {
    await ensureCustomerAuthTables(env);
    const current = await resolveCustomer(request, env);
    if (!current)
        return json({ error: 'دسترسی غیرمجاز است. لطفاً مجدداً وارد شوید.' }, 401, origin);
    await env.DB.prepare('DELETE FROM customer_addresses WHERE id = ? AND customer_id = ?')
        .bind(addressId, current.id)
        .run();
    return json({ ok: true }, 200, origin);
}
// اعلان‌های زنده‌ی مشتری — با شماره تلفن پیدا می‌شود چون درخواست‌ها/گفتگوهای مهمان به شماره وصل‌اند،
// نه به customer_id (بسیاری از درخواست‌ها اصلاً بدون حساب کاربری ثبت می‌شوند). اگر شماره‌ای به هیچ
// حسابی وصل نباشد (مهمان)، چیزی برای اعلان‌دادن نیست و بی‌صدا رد می‌شود.
async function notifyCustomerByPhone(env, phone, notification) {
    if (!phone)
        return;
    const customer = await env.DB.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).first();
    if (!customer)
        return;
    const dataJson = JSON.stringify(notification.data ?? {});
    await env.DB.prepare('INSERT INTO customer_notifications (customer_id, type, title, body, data_json) VALUES (?, ?, ?, ?, ?)')
        .bind(customer.id, notification.type, notification.title, notification.body, dataJson)
        .run();
    // تحویل زنده صرفاً یک میان‌بر است؛ اگر Durable Object در دسترس نبود (حالت خوداستقرار) یا اپ همان
    // لحظه متصل نبود، اعلان بالا همچنان ذخیره شده و با باز شدن اپ از /api/customer/notifications می‌آید.
    if (!env.CUSTOMER_NOTIFY_HUB)
        return;
    try {
        const id = env.CUSTOMER_NOTIFY_HUB.idFromName(String(customer.id));
        const stub = env.CUSTOMER_NOTIFY_HUB.get(id);
        await stub.fetch('https://internal/send', {
            method: 'POST',
            body: JSON.stringify({ type: notification.type, title: notification.title, body: notification.body, data: notification.data ?? {} }),
        });
    }
    catch {
        /* اپ همان لحظه متصل نبود — بی‌اهمیت، اعلان از قبل ذخیره شد */
    }
}
async function customerConnectNotifications(request, env, origin) {
    const customer = await resolveCustomer(request, env);
    if (!customer)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    if (!env.CUSTOMER_NOTIFY_HUB) {
        return json({ error: 'اتصال زنده در این نصب در دسترس نیست.' }, 503, origin);
    }
    const id = env.CUSTOMER_NOTIFY_HUB.idFromName(String(customer.id));
    const stub = env.CUSTOMER_NOTIFY_HUB.get(id);
    return stub.fetch(new Request('https://internal/connect', request));
}
async function customerListNotifications(request, env, origin) {
    const customer = await resolveCustomer(request, env);
    if (!customer)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT id, type, title, body, data_json, is_read, created_at FROM customer_notifications WHERE customer_id = ? ORDER BY created_at DESC LIMIT 50')
        .bind(customer.id)
        .all();
    const notifications = (results ?? []).map((row) => ({
        id: row.id,
        type: row.type,
        title: row.title,
        body: row.body,
        data: JSON.parse(row.data_json || '{}'),
        isRead: !!row.is_read,
        createdAt: row.created_at,
    }));
    return json({ notifications }, 200, origin);
}
async function customerMarkNotificationsRead(request, env, origin) {
    const customer = await resolveCustomer(request, env);
    if (!customer)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    await env.DB.prepare('UPDATE customer_notifications SET is_read = 1 WHERE customer_id = ? AND is_read = 0').bind(customer.id).run();
    return json({ ok: true }, 200, origin);
}
// فراموشی رمز: کد ۶رقمی از طریق همان پلاگین پیامک موجود (بدون نیاز به ایمیل).
async function customerForgotPassword(request, env, origin) {
    const allowed = await checkRateLimit(env, 'customer_forgot_password', getClientIp(request), 3, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    if (!PHONE_PATTERN.test(phone))
        return json({ error: 'شماره موبایل معتبر وارد کنید.' }, 400, origin);
    const customer = await env.DB.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).first();
    // پیام یکسان چه حساب پیدا شود چه نشود، تا وجود/نبود یک شماره لو نرود.
    if (!customer)
        return json({ ok: true }, 200, origin);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const salt = generateSalt();
    const codeHash = await hashPassword(code, salt);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await env.DB.prepare('UPDATE customers SET reset_code_hash = ?, reset_code_salt = ?, reset_code_expires_at = ? WHERE id = ?')
        .bind(codeHash, salt, expiresAt, customer.id)
        .run();
    await sendSms(env, phone, `کد بازیابی رمز عبور بهبار: ${code} (تا ۱۰ دقیقه معتبر است)`);
    return json({ ok: true }, 200, origin);
}
async function customerResetPassword(request, env, origin) {
    const allowed = await checkRateLimit(env, 'customer_reset_password', getClientIp(request), 8, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
    const code = typeof b.code === 'string' ? b.code.trim() : '';
    const newPassword = typeof b.newPassword === 'string' ? b.newPassword : '';
    if (!PHONE_PATTERN.test(phone) || !code || !newPassword)
        return json({ error: 'اطلاعات وارد‌شده نامعتبر است.' }, 400, origin);
    if (newPassword.length < 6)
        return json({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' }, 400, origin);
    const customer = await env.DB.prepare('SELECT * FROM customers WHERE phone = ?').bind(phone).first();
    if (!customer || !customer.reset_code_hash || !customer.reset_code_salt || !customer.reset_code_expires_at) {
        return json({ error: 'کد نامعتبر یا منقضی‌شده است.' }, 400, origin);
    }
    if (Date.parse(customer.reset_code_expires_at) < Date.now()) {
        return json({ error: 'کد نامعتبر یا منقضی‌شده است.' }, 400, origin);
    }
    const validCode = await verifyPassword(code, customer.reset_code_salt, customer.reset_code_hash);
    if (!validCode)
        return json({ error: 'کد نامعتبر یا منقضی‌شده است.' }, 400, origin);
    const salt = generateSalt();
    const passwordHash = await hashPassword(newPassword, salt);
    await env.DB.prepare(`UPDATE customers SET password_hash = ?, password_salt = ?, reset_code_hash = NULL, reset_code_salt = NULL, reset_code_expires_at = NULL,
      failed_login_attempts = 0, locked_until = NULL WHERE id = ?`)
        .bind(passwordHash, salt, customer.id)
        .run();
    // بعد از تغییر رمز، همه‌ی نشست‌های قبلی باطل می‌شوند.
    await env.DB.prepare('DELETE FROM customer_sessions WHERE customer_id = ?').bind(customer.id).run();
    return json({ ok: true }, 200, origin);
}
// نقطه‌ی واحدی که تقریباً همه‌ی مسیرهای پنل ادمین از آن عبور می‌کنند — بررسی «فقط نمایش» عمداً اینجا
// اضافه شده، نه در تک‌تک هندلرها، تا حساب‌های فقط‌نمایشی خودکار روی همه‌ی بخش‌ها اعمال شود: هر
// درخواست غیر از GET (یعنی POST/PATCH/DELETE) برای چنین حسابی رد می‌شود، حتی اگر اختیار آن بخش را
// داشته باشد — یعنی می‌تواند هر جایی برود و ببیند، ولی هیچ‌جا چیزی نمی‌تواند تغییر دهد. به همان دلیل،
// قفل نصب خوداستقرارِ بدون لایسنس معتبر (isInstallationLicenseLocked) هم همین‌جا اضافه شده، نه در
// هندلرها — با یک استثنای صریح (allowWhenLicenseLocked) برای مسیر فعال‌سازی لایسنس، وگرنه نصب هیچ‌وقت
// نمی‌تواند از همین قفل خارج شود.
async function requireStaff(request, env, required, options) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return null;
    const requiredList = Array.isArray(required) ? required : [required];
    if (!requiredList.some((p) => staff.permissions.includes(p)))
        return null;
    if (staff.is_read_only && request.method !== 'GET')
        return null;
    if (request.method !== 'GET' && !options?.allowWhenLicenseLocked && (await isInstallationLicenseLocked(env)))
        return null;
    return staff;
}
async function getLicenseSummary(env) {
    const license = await getStoredLicense(env);
    if (license && license.status === 'active') {
        const plan = (license.plan || '').toLowerCase();
        if (plan.includes('golden') || plan.includes('lifetime') || plan.includes('طلایی') || !license.expiresAt) {
            return { type: 'golden', text: 'نسخه طلایی - بدون پایان' };
        }
        const expires = new Date(license.expiresAt).getTime();
        const days = Math.max(0, Math.ceil((expires - Date.now()) / (1000 * 60 * 60 * 24)));
        if (days > 1000) {
            return { type: 'golden', text: 'نسخه طلایی - بدون پایان' };
        }
        return { type: 'annual', text: `نسخه یک‌ساله (${days} روز باقی‌مانده)`, daysRemaining: days };
    }
    // Trial mode
    if (license && license.expiresAt) {
        const expires = new Date(license.expiresAt).getTime();
        const days = Math.max(0, Math.ceil((expires - Date.now()) / (1000 * 60 * 60 * 24)));
        return { type: 'trial', text: days > 0 ? `نسخه آزمایشی (${days} روز فعال)` : 'نسخه آزمایشی (پایان یافته)', daysRemaining: days };
    }
    // Fallback: calculate from earliest staff or now (7 days trial from install)
    const firstStaff = await env.DB.prepare('SELECT created_at FROM staff_members ORDER BY id ASC LIMIT 1').first().catch(() => null);
    const installTime = firstStaff?.created_at ? new Date(firstStaff.created_at).getTime() : Date.now();
    const trialEnd = installTime + 7 * 24 * 60 * 60 * 1000;
    const days = Math.max(0, Math.ceil((trialEnd - Date.now()) / (1000 * 60 * 60 * 24)));
    return { type: 'trial', text: days > 0 ? `نسخه آزمایشی (${days} روز فعال)` : 'نسخه آزمایشی (پایان یافته)', daysRemaining: days };
}
async function staffMe(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const rolesMap = await loadRolesMap(env);
    // هر نقشی (حتی راننده/کارگر با فقط دسترسی assignments) این مسیر را در بوت پنل صدا می‌زند — بدون
    // نیاز به مجوز settings؛ برخلاف GET /api/admin/license که به آن مجوز نیاز دارد، این‌جا محل درستی است
    // برای اینکه هر نقشی بفهمد نصب قفل است یا نه، بدون افشای جزئیات لایسنس.
    const licenseLocked = await isInstallationLicenseLocked(env);
    const licenseSummary = await getLicenseSummary(env);
    return json({ staff: toStaffClientShape(staff, rolesMap), licenseLocked, licenseSummary }, 200, origin);
}
async function adminListRequests(request, url, env, origin) {
    const phone = url.searchParams.get('phone');
    const staffIdParam = url.searchParams.get('staffId');
    // جست‌وجوی بر اساس شماره برای پنل «درخواست مرتبط» در چت هم استفاده می‌شود، پس کارمندهایی که فقط
    // دسترسی چت دارند (بدون pipeline/map) هم باید بتوانند — اما فقط با شماره‌ی مشخص، نه فهرست کامل.
    // برای تاریخچه‌ی خدمات یک کارمند هم کسانی که فقط دسترسی «کارمندان» دارند باید بتوانند ببینند.
    const requiredPermissions = phone
        ? ['pipeline', 'map', 'chat']
        : staffIdParam
            ? ['pipeline', 'map', 'staff']
            : ['pipeline', 'map'];
    if (!(await requireStaff(request, env, requiredPermissions)))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const status = url.searchParams.get('status');
    const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit')) || 100));
    let query;
    if (phone) {
        query = env.DB.prepare('SELECT * FROM requests WHERE phone = ? ORDER BY created_at DESC LIMIT ?').bind(phone, limit);
    }
    else if (staffIdParam) {
        query = env.DB.prepare('SELECT * FROM requests WHERE assigned_staff_id = ? ORDER BY created_at DESC LIMIT ?').bind(Number(staffIdParam), limit);
    }
    else if (status) {
        query = env.DB.prepare('SELECT * FROM requests WHERE status = ? ORDER BY created_at DESC LIMIT ?').bind(status, limit);
    }
    else {
        query = env.DB.prepare('SELECT * FROM requests ORDER BY created_at DESC LIMIT ?').bind(limit);
    }
    const { results } = await query.all();
    return json({ requests: (results ?? []).map(toClientShape) }, 200, origin);
}
function csvField(value) {
    const s = value === null || value === undefined ? '' : String(value);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
async function adminExportRequestsCsv(request, env, origin) {
    if (!(await requireStaff(request, env, ['pipeline', 'dashboard'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM requests ORDER BY created_at DESC LIMIT 5000').all();
    const header = [
        'کد رهگیری', 'نام مشتری', 'تلفن', 'سرویس', 'شهر مبدا', 'شهر مقصد', 'تاریخ برنامه‌ریزی',
        'ساعت برنامه‌ریزی', 'برآورد هزینه', 'وضعیت', 'تاریخ ثبت',
    ];
    const lines = [header.map(csvField).join(',')];
    for (const row of results ?? []) {
        lines.push([
            row.tracking_code,
            row.customer_name,
            row.phone,
            row.service_label,
            row.origin_city,
            row.destination_city,
            row.scheduled_date,
            row.scheduled_time,
            row.estimate_avg,
            STATUS_LABELS_FA[row.status] ?? row.status,
            row.created_at,
        ]
            .map(csvField)
            .join(','));
    }
    // BOM برای این‌که اکسل فارسی/UTF-8 را درست تشخیص بدهد، نه به‌صورت حروف بهم‌ریخته.
    const csv = '﻿' + lines.join('\r\n');
    return new Response(csv, {
        status: 200,
        headers: {
            ...corsHeaders(origin),
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="behbar-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
    });
}
async function adminUpdateRequest(request, url, env, origin) {
    const actor = await requireStaff(request, env, ['pipeline', 'map']);
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const status = body?.status;
    if (typeof status !== 'string' || !REQUEST_STATUSES.includes(status)) {
        return json({ error: 'وضعیت نامعتبر است.' }, 400, origin);
    }
    const previous = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
    await env.DB.prepare("UPDATE requests SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(status, id).run();
    if (previous && previous.status !== status) {
        const fromLabel = STATUS_LABELS_FA[previous.status] ?? previous.status;
        const toLabel = STATUS_LABELS_FA[status] ?? status;
        await logRequestEvent(env, id, 'status_changed', `وضعیت از «${fromLabel}» به «${toLabel}» تغییر کرد.`, actor.id);
        await maybeAutoNotifyStatusChange(env, previous, status);
        await notifyCustomerByPhone(env, previous.phone, {
            type: 'request_status',
            title: 'وضعیت درخواست شما تغییر کرد',
            body: `وضعیت به «${toLabel}» تغییر کرد.`,
            data: { requestId: id, status },
        });
        if (status === 'completed')
            await maybeCreditCompletionBonus(env, previous, actor.id);
    }
    return json({ ok: true }, 200, origin);
}
async function adminDeleteRequest(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'pipeline');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT id, tracking_code FROM requests WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    const safeId = sqlSafeId(id);
    await env.DB.batchRun([
        `DELETE FROM request_reports WHERE request_id = ${safeId}`,
        `DELETE FROM request_events WHERE request_id = ${safeId}`,
        `DELETE FROM requests WHERE id = ${safeId}`,
    ]);
    await logActivity(env, actor, 'حذف درخواست', 'request', existing.tracking_code);
    return json({ ok: true }, 200, origin);
}
async function adminStats(request, env, origin) {
    if (!(await requireStaff(request, env, 'dashboard')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const [totalRow, byStatus, byService, revenueRow, dailyRows, topCities, topProvinces, avgRow, staffPerformance] = await Promise.all([
        env.DB.prepare('SELECT COUNT(*) as count FROM requests').first(),
        env.DB.prepare('SELECT status, COUNT(*) as count FROM requests GROUP BY status').all(),
        env.DB.prepare('SELECT service_id, service_label, COUNT(*) as count FROM requests GROUP BY service_id, service_label')
            .all(),
        env.DB.prepare("SELECT COALESCE(SUM(estimate_avg), 0) as total FROM requests WHERE status = 'completed'").first(),
        env.DB.prepare(`SELECT substr(created_at, 1, 10) as day, COUNT(*) as count
       FROM requests
       WHERE created_at >= datetime('now', '-13 days')
       GROUP BY day ORDER BY day ASC`).all(),
        env.DB.prepare(`SELECT origin_city as city, COUNT(*) as count FROM requests GROUP BY origin_city ORDER BY count DESC LIMIT 6`).all(),
        env.DB.prepare(`SELECT origin_province as province, COUNT(*) as count FROM requests GROUP BY origin_province ORDER BY count DESC`).all(),
        env.DB.prepare('SELECT COALESCE(AVG(estimate_avg), 0) as avg FROM requests').first(),
        env.DB.prepare(`SELECT staff.full_name as name, staff.role as role, COALESCE(roles.label, staff.role) as role_label,
              COUNT(*) as total,
              SUM(CASE WHEN requests.status = 'completed' THEN 1 ELSE 0 END) as completed
       FROM requests
       JOIN staff ON staff.id = requests.assigned_staff_id
       LEFT JOIN roles ON roles.key = staff.role
       GROUP BY requests.assigned_staff_id
       ORDER BY total DESC
       LIMIT 10`).all(),
    ]);
    return json({
        total: totalRow?.count ?? 0,
        byStatus: byStatus.results ?? [],
        byService: byService.results ?? [],
        completedRevenue: revenueRow?.total ?? 0,
        daily: dailyRows.results ?? [],
        topCities: topCities.results ?? [],
        topProvinces: topProvinces.results ?? [],
        avgOrderValue: Math.round(avgRow?.avg ?? 0),
        staffPerformance: staffPerformance.results ?? [],
    }, 200, origin);
}
async function adminAssignRequest(request, url, env, origin) {
    const actor = await requireStaff(request, env, ['pipeline', 'map']);
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)\/assign$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const staffIdRaw = body?.staffId;
    if (staffIdRaw === null) {
        await env.DB.prepare("UPDATE requests SET assigned_staff_id = NULL, updated_at = datetime('now') WHERE id = ?")
            .bind(id)
            .run();
        await logRequestEvent(env, id, 'unassigned', 'اختصاص کارمند لغو شد.', actor.id);
        return json({ ok: true }, 200, origin);
    }
    const staffId = Number(staffIdRaw);
    if (!Number.isInteger(staffId))
        return json({ error: 'شناسه کارمند نامعتبر است.' }, 400, origin);
    const staff = await env.DB.prepare('SELECT * FROM staff WHERE id = ?').bind(staffId).first();
    const staffRole = staff ? await env.DB.prepare('SELECT permissions_json FROM roles WHERE key = ?').bind(staff.role).first() : null;
    if (!staff || !staff.is_active || !parseRolePermissions(staffRole?.permissions_json).includes('assignments')) {
        return json({ error: 'کارمند مورد نظر معتبر نیست.' }, 400, origin);
    }
    await env.DB.prepare("UPDATE requests SET assigned_staff_id = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(staffId, id)
        .run();
    await logRequestEvent(env, id, 'assigned', `درخواست به «${staff.full_name}» اختصاص یافت.`, actor.id);
    return json({ ok: true }, 200, origin);
}
async function adminListStaff(request, env, origin) {
    // پیپلاین/نقشه هم برای پرکردن منوی «تخصیص» به فهرست کارمندان نیاز دارند، نه فقط بخش مدیریت کارمندان.
    if (!(await requireStaff(request, env, ['staff', 'pipeline', 'map'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM staff ORDER BY created_at DESC').all();
    const rolesMap = await loadRolesMap(env);
    const { results: busyRows } = await env.DB.prepare("SELECT DISTINCT assigned_staff_id FROM requests WHERE status = 'in_progress' AND assigned_staff_id IS NOT NULL").all();
    const busyIds = new Set((busyRows ?? []).map((r) => r.assigned_staff_id));
    return json({ staff: (results ?? []).map((row) => toStaffClientShape(row, rolesMap, busyIds.has(row.id))) }, 200, origin);
}
// جلوگیری از افزایش اختیار: یک کارمند با دسترسی «staff» (مثلاً نقش منابع انسانی) نباید بتواند به کسی
// (حتی به خودش) نقشی با اختیاراتی بیشتر از اختیارات خودش بدهد — وگرنه صرفاً با تغییر role در همان
// درخواستی که قبلاً هم مجاز بود، عملاً به ادمین کامل تبدیل می‌شود.
// «assignments» عمداً از این بررسی مستثنی است: این یک قابلیت پنل ادمین نیست، فقط علامت «قابل‌تخصیص
// بودن برای کار میدانی» است (راننده/کارگر) — نقش admin که خودش قرار نیست تخصیص بگیرد آن را ندارد،
// وگرنه حتی خود admin هم نمی‌توانست حساب راننده/کارگر بسازد.
async function roleExceedsActorPermissions(env, actor, roleKey) {
    const roleRow = await env.DB.prepare('SELECT permissions_json FROM roles WHERE key = ?').bind(roleKey).first();
    const rolePermissions = parseRolePermissions(roleRow?.permissions_json);
    return rolePermissions.some((p) => p !== 'assignments' && !actor.permissions.includes(p));
}
// ثبت اقدامات حساس (حذف/تغییر نقش) با نام کارمند به‌صورت جداگانه ذخیره‌شده — چون حذف کامل
// کارمند یکی از خودِ همین اقدام‌هاست و نباید بعد از حذف، ردش هم از لاگ محو شود.
async function logActivity(env, actor, action, targetType, targetLabel) {
    await env.DB.prepare('INSERT INTO staff_activity_log (staff_id, staff_name, action, target_type, target_label) VALUES (?,?,?,?,?)')
        .bind(actor.id, actor.full_name, action, targetType, targetLabel)
        .run();
}
async function adminCreateStaff(request, env, origin) {
    const actor = await requireStaff(request, env, 'staff');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const username = typeof b.username === 'string' ? b.username.trim() : '';
    const password = typeof b.password === 'string' ? b.password : '';
    const fullName = typeof b.fullName === 'string' ? b.fullName.trim() : '';
    const role = typeof b.role === 'string' ? b.role : '';
    const phone = typeof b.phone === 'string' && b.phone.trim() ? b.phone.trim() : null;
    const avatarUrl = typeof b.avatarUrl === 'string' && b.avatarUrl.trim() ? b.avatarUrl.trim() : null;
    const nationalId = typeof b.nationalId === 'string' && b.nationalId.trim() ? b.nationalId.trim() : null;
    const address = typeof b.address === 'string' && b.address.trim() ? b.address.trim() : null;
    const hireDate = typeof b.hireDate === 'string' && b.hireDate.trim() ? b.hireDate.trim() : null;
    const emergencyContactName = typeof b.emergencyContactName === 'string' && b.emergencyContactName.trim() ? b.emergencyContactName.trim() : null;
    const emergencyContactPhone = typeof b.emergencyContactPhone === 'string' && b.emergencyContactPhone.trim() ? b.emergencyContactPhone.trim() : null;
    const notes = typeof b.notes === 'string' && b.notes.trim() ? b.notes.trim() : null;
    const gender = b.gender === 'male' || b.gender === 'female' ? b.gender : null;
    const isReadOnly = b.isReadOnly === true;
    if (!username || username.length < 3)
        return json({ error: 'نام کاربری باید حداقل ۳ کاراکتر باشد.' }, 400, origin);
    if (!password || password.length < 6)
        return json({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' }, 400, origin);
    if (!fullName)
        return json({ error: 'نام و نام خانوادگی الزامی است.' }, 400, origin);
    const roleExists = await env.DB.prepare('SELECT 1 FROM roles WHERE key = ?').bind(role).first();
    if (!roleExists)
        return json({ error: 'نقش نامعتبر است.' }, 400, origin);
    if (await roleExceedsActorPermissions(env, actor, role)) {
        return json({ error: 'نمی‌توانید نقشی با اختیارات بیشتر از خودتان بسازید.' }, 403, origin);
    }
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);
    try {
        await env.DB.prepare(`INSERT INTO staff (
        username, password_hash, password_salt, full_name, role, phone, avatar_url,
        national_id, address, hire_date, emergency_contact_name, emergency_contact_phone, notes, gender, is_read_only
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
            .bind(username, passwordHash, salt, fullName, role, phone, avatarUrl, nationalId, address, hireDate, emergencyContactName, emergencyContactPhone, notes, gender, isReadOnly ? 1 : 0)
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این نام کاربری قبلاً استفاده شده است.' }, 409, origin);
        return json({ error: 'ایجاد کارمند ناموفق بود.' }, 500, origin);
    }
    const created = await env.DB.prepare('SELECT * FROM staff WHERE username = ?').bind(username).first();
    const rolesMap = await loadRolesMap(env);
    await logActivity(env, actor, 'ایجاد کارمند', 'staff', `${fullName} (${username})`);
    return json({ staff: toStaffClientShape(created, rolesMap) }, 201, origin);
}
async function adminUpdateStaff(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'staff');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/staff\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const target = await env.DB.prepare('SELECT * FROM staff WHERE id = ?').bind(id).first();
    if (!target)
        return json({ error: 'کارمند پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const fullName = typeof b.fullName === 'string' && b.fullName.trim() ? b.fullName.trim() : target.full_name;
    let role = target.role;
    if (typeof b.role === 'string' && b.role !== target.role) {
        const roleExists = await env.DB.prepare('SELECT 1 FROM roles WHERE key = ?').bind(b.role).first();
        if (!roleExists)
            return json({ error: 'نقش نامعتبر است.' }, 400, origin);
        if (await roleExceedsActorPermissions(env, actor, b.role)) {
            return json({ error: 'نمی‌توانید نقشی با اختیارات بیشتر از خودتان اختصاص دهید.' }, 403, origin);
        }
        role = b.role;
    }
    const phone = typeof b.phone === 'string' ? b.phone.trim() || null : target.phone;
    const avatarUrl = typeof b.avatarUrl === 'string' ? b.avatarUrl.trim() || null : target.avatar_url;
    const nationalId = typeof b.nationalId === 'string' ? b.nationalId.trim() || null : target.national_id;
    const address = typeof b.address === 'string' ? b.address.trim() || null : target.address;
    const hireDate = typeof b.hireDate === 'string' ? b.hireDate.trim() || null : target.hire_date;
    const emergencyContactName = typeof b.emergencyContactName === 'string' ? b.emergencyContactName.trim() || null : target.emergency_contact_name;
    const emergencyContactPhone = typeof b.emergencyContactPhone === 'string' ? b.emergencyContactPhone.trim() || null : target.emergency_contact_phone;
    const notes = typeof b.notes === 'string' ? b.notes.trim() || null : target.notes;
    const gender = b.gender === 'male' || b.gender === 'female' ? b.gender : b.gender === null ? null : target.gender;
    let isActive = target.is_active;
    if (typeof b.isActive === 'boolean') {
        if (id === actor.id && !b.isActive) {
            return json({ error: 'نمی‌توانید حساب خودتان را غیرفعال کنید.' }, 400, origin);
        }
        isActive = b.isActive ? 1 : 0;
    }
    let isReadOnly = target.is_read_only;
    if (typeof b.isReadOnly === 'boolean') {
        // چون همین «فقط نمایش» توسط requireStaff هر عملیات غیر GET را رد می‌کند، اگر خودِ درخواست‌دهنده
        // این را روی حساب خودش فعال کند، همان لحظه امکان برگرداندنش را هم از دست می‌دهد.
        if (id === actor.id && b.isReadOnly) {
            return json({ error: 'نمی‌توانید حساب خودتان را فقط‌نمایش کنید.' }, 400, origin);
        }
        isReadOnly = b.isReadOnly ? 1 : 0;
    }
    let passwordHash = target.password_hash;
    let passwordSalt = target.password_salt;
    if (typeof b.password === 'string' && b.password) {
        if (b.password.length < 6)
            return json({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' }, 400, origin);
        passwordSalt = generateSalt();
        passwordHash = await hashPassword(b.password, passwordSalt);
    }
    await env.DB.prepare(`UPDATE staff SET
      full_name = ?, role = ?, phone = ?, avatar_url = ?,
      national_id = ?, address = ?, hire_date = ?, emergency_contact_name = ?, emergency_contact_phone = ?, notes = ?, gender = ?,
      is_active = ?, is_read_only = ?, password_hash = ?, password_salt = ?
    WHERE id = ?`)
        .bind(fullName, role, phone, avatarUrl, nationalId, address, hireDate, emergencyContactName, emergencyContactPhone, notes, gender, isActive, isReadOnly, passwordHash, passwordSalt, id)
        .run();
    if (!isActive) {
        await env.DB.prepare('DELETE FROM staff_sessions WHERE staff_id = ?').bind(id).run();
    }
    if (role !== target.role) {
        await logActivity(env, actor, 'تغییر نقش کارمند', 'staff', `${target.full_name}: ${target.role} → ${role}`);
    }
    if (typeof b.isActive === 'boolean' && Boolean(target.is_active) !== Boolean(isActive)) {
        await logActivity(env, actor, isActive ? 'فعال‌سازی کارمند' : 'غیرفعال‌سازی کارمند', 'staff', target.full_name);
    }
    if (typeof b.isReadOnly === 'boolean' && Boolean(target.is_read_only) !== Boolean(isReadOnly)) {
        await logActivity(env, actor, isReadOnly ? 'فقط‌نمایش‌کردن کارمند' : 'برداشتن حالت فقط‌نمایش', 'staff', target.full_name);
    }
    const updated = await env.DB.prepare('SELECT * FROM staff WHERE id = ?').bind(id).first();
    const rolesMap = await loadRolesMap(env);
    return json({ staff: toStaffClientShape(updated, rolesMap) }, 200, origin);
}
async function adminDeleteStaff(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'staff');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/staff\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    if (id === actor.id)
        return json({ error: 'نمی‌توانید حساب خودتان را حذف کنید.' }, 400, origin);
    const target = await env.DB.prepare('SELECT id, username, full_name FROM staff WHERE id = ?').bind(id).first();
    if (!target)
        return json({ error: 'کارمند پیدا نشد.' }, 404, origin);
    // سوابق (درخواست‌ها، مقاله‌ها، پیام‌ها و ...) حذف نمی‌شوند — فقط اشاره‌ی آن‌ها به این کارمند برداشته می‌شود.
    // id همین‌جا با regex عدد اعتبارسنجی شده، پس درج مستقیم آن در SQL خطر تزریق ندارد؛ batchRun (برخلاف
    // batch واقعی R2) پارامتر نمی‌پذیرد چون معادل خوداستقرارش با BEGIN/COMMIT ساده شبیه‌سازی می‌شود.
    const safeId = sqlSafeId(id);
    await env.DB.batchRun([
        `UPDATE requests SET assigned_staff_id = NULL WHERE assigned_staff_id = ${safeId}`,
        `UPDATE articles SET author_staff_id = NULL WHERE author_staff_id = ${safeId}`,
        `UPDATE request_reports SET staff_id = NULL WHERE staff_id = ${safeId}`,
        `UPDATE testimonials SET author_staff_id = NULL WHERE author_staff_id = ${safeId}`,
        `UPDATE chat_conversations SET assigned_staff_id = NULL WHERE assigned_staff_id = ${safeId}`,
        `UPDATE chat_messages SET staff_id = NULL WHERE staff_id = ${safeId}`,
        `UPDATE stories SET author_staff_id = NULL WHERE author_staff_id = ${safeId}`,
        `UPDATE fleet_vehicles SET driver_staff_id = NULL WHERE driver_staff_id = ${safeId}`,
        `DELETE FROM staff_sessions WHERE staff_id = ${safeId}`,
        `DELETE FROM staff WHERE id = ${safeId}`,
    ]);
    await logActivity(env, actor, 'حذف کارمند', 'staff', `${target.full_name} (${target.username})`);
    return json({ ok: true }, 200, origin);
}
// ===== Roles & permissions =====
function toRoleClientShape(row) {
    return {
        id: row.id,
        key: row.key,
        label: row.label,
        labelEn: row.label_en,
        permissions: parseRolePermissions(row.permissions_json),
        isSystem: Boolean(row.is_system),
        defaultSalaryAmount: row.default_salary_amount,
        defaultBonusType: row.default_bonus_type,
        defaultBonusAmount: row.default_bonus_amount,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function adminListRoles(request, env, origin) {
    // نقش‌ها گاهی فقط برای پر کردن فهرست نرخ پیش‌فرض کیف پول لازم است (نه ویرایش خودِ نقش‌ها)، پس مجوز
    // wallet هم به‌تنهایی کافی است.
    if (!(await requireStaff(request, env, ['roles', 'wallet'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM roles ORDER BY is_system DESC, created_at ASC').all();
    return json({ roles: (results ?? []).map(toRoleClientShape), permissions: PERMISSIONS }, 200, origin);
}
function slugifyRoleKey(input) {
    return input
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 40);
}
async function adminCreateRole(request, env, origin) {
    const actor = await requireStaff(request, env, 'roles');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const label = typeof b.label === 'string' ? b.label.trim() : '';
    if (!label)
        return json({ error: 'نام نقش الزامی است.' }, 400, origin);
    const key = slugifyRoleKey((typeof b.key === 'string' && b.key.trim()) || label) || `role_${crypto.randomUUID().slice(0, 8)}`;
    const permissions = Array.isArray(b.permissions) ? b.permissions.filter((p) => PERMISSION_KEYS.includes(p)) : [];
    try {
        await env.DB.prepare('INSERT INTO roles (key, label, label_en, permissions_json, is_system) VALUES (?,?,?,?,0)')
            .bind(key, label, typeof b.labelEn === 'string' ? b.labelEn : '', JSON.stringify(permissions))
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این کلید نقش قبلاً استفاده شده است.' }, 409, origin);
        return json({ error: 'ایجاد نقش ناموفق بود.' }, 500, origin);
    }
    const created = await env.DB.prepare('SELECT * FROM roles WHERE key = ?').bind(key).first();
    await logActivity(env, actor, 'ایجاد نقش', 'role', label);
    return json({ role: toRoleClientShape(created) }, 201, origin);
}
async function adminUpdateRole(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'roles');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/roles\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT * FROM roles WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'نقش پیدا نشد.' }, 404, origin);
    if (existing.is_system)
        return json({ error: 'این نقش سیستمی قابل ویرایش نیست.' }, 400, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const label = typeof b.label === 'string' && b.label.trim() ? b.label.trim() : existing.label;
    const labelEn = typeof b.labelEn === 'string' ? b.labelEn : existing.label_en;
    const permissions = Array.isArray(b.permissions)
        ? b.permissions.filter((p) => PERMISSION_KEYS.includes(p))
        : parseRolePermissions(existing.permissions_json);
    await env.DB.prepare("UPDATE roles SET label = ?, label_en = ?, permissions_json = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(label, labelEn, JSON.stringify(permissions), id)
        .run();
    const updated = await env.DB.prepare('SELECT * FROM roles WHERE id = ?').bind(id).first();
    await logActivity(env, actor, 'ویرایش اختیارات نقش', 'role', label);
    return json({ role: toRoleClientShape(updated) }, 200, origin);
}
async function adminDeleteRole(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'roles');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/roles\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT * FROM roles WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'نقش پیدا نشد.' }, 404, origin);
    if (existing.is_system)
        return json({ error: 'این نقش سیستمی قابل حذف نیست.' }, 400, origin);
    const inUse = await env.DB.prepare('SELECT COUNT(*) as count FROM staff WHERE role = ?').bind(existing.key).first();
    if ((inUse?.count ?? 0) > 0)
        return json({ error: 'این نقش به کارمندی اختصاص دارد؛ ابتدا نقش آن‌ها را تغییر دهید.' }, 400, origin);
    await env.DB.prepare('DELETE FROM roles WHERE id = ?').bind(id).run();
    await logActivity(env, actor, 'حذف نقش', 'role', existing.label);
    return json({ ok: true }, 200, origin);
}
async function adminListActivityLog(request, env, origin) {
    if (!(await requireStaff(request, env, ['staff', 'roles'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM staff_activity_log ORDER BY created_at DESC LIMIT 300').all();
    return json({
        entries: (results ?? []).map((r) => ({
            id: r.id,
            staffId: r.staff_id,
            staffName: r.staff_name,
            action: r.action,
            targetType: r.target_type,
            targetLabel: r.target_label,
            createdAt: r.created_at,
        })),
    }, 200, origin);
}
async function staffListMyRequests(request, env, origin) {
    const staff = await requireStaff(request, env, 'assignments');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM requests WHERE assigned_staff_id = ? ORDER BY created_at DESC')
        .bind(staff.id)
        .all();
    return json({ requests: (results ?? []).map(toClientShape) }, 200, origin);
}
async function staffUpdateRequestStatus(request, url, env, origin) {
    const staff = await requireStaff(request, env, 'assignments');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/staff\/requests\/(\d+)\/status$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const row = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
    if (!row)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    if (row.assigned_staff_id !== staff.id)
        return json({ error: 'این درخواست به شما اختصاص داده نشده است.' }, 403, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const status = body?.status;
    if (typeof status !== 'string' || !REQUEST_STATUSES.includes(status)) {
        return json({ error: 'وضعیت نامعتبر است.' }, 400, origin);
    }
    await env.DB.prepare("UPDATE requests SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(status, id).run();
    if (row.status !== status) {
        const fromLabel = STATUS_LABELS_FA[row.status] ?? row.status;
        const toLabel = STATUS_LABELS_FA[status] ?? status;
        await logRequestEvent(env, id, 'status_changed', `وضعیت از «${fromLabel}» به «${toLabel}» تغییر کرد.`, staff.id);
        await maybeAutoNotifyStatusChange(env, row, status);
        await notifyCustomerByPhone(env, row.phone, {
            type: 'request_status',
            title: 'وضعیت درخواست شما تغییر کرد',
            body: `وضعیت به «${toLabel}» تغییر کرد.`,
            data: { requestId: id, status },
        });
        if (status === 'completed')
            await maybeCreditCompletionBonus(env, row, staff.id);
    }
    return json({ ok: true }, 200, origin);
}
// ===== کیف پول و حقوق و دستمزد =====
// یک دفتر حسابداری داخلی است، نه جابه‌جایی پول واقعی — هیچ درگاه پرداختی در این پروژه نیست. موجودی
// هیچ‌وقت در یک ستون کش نمی‌شود؛ همیشه زنده از SUM روی wallet_transactions محاسبه می‌شود (دقیقاً مثل
// هر رول‌آپ دیگری در این پروژه)، پس هیچ‌وقت با تراکنش‌های واقعی ناهم‌خوان نمی‌شود.
function walletBalanceSql() {
    return "COALESCE(SUM(CASE WHEN direction = 'credit' THEN amount ELSE -amount END), 0)";
}
async function computeWalletBalance(env, staffId) {
    const row = await env.DB.prepare(`SELECT ${walletBalanceSql()} as balance FROM wallet_transactions WHERE staff_id = ?`)
        .bind(staffId)
        .first();
    return row?.balance ?? 0;
}
async function resolveStaffPayRate(env, staffId) {
    const row = await env.DB.prepare(`SELECT staff.full_name, staff.salary_amount_override, staff.bonus_type_override, staff.bonus_amount_override,
            roles.default_salary_amount, roles.default_bonus_type, roles.default_bonus_amount
     FROM staff LEFT JOIN roles ON roles.key = staff.role
     WHERE staff.id = ?`)
        .bind(staffId)
        .first();
    if (!row)
        return null;
    return {
        fullName: row.full_name,
        salaryAmount: row.salary_amount_override ?? row.default_salary_amount ?? 0,
        salarySource: row.salary_amount_override != null ? 'override' : 'role',
        bonusType: row.bonus_type_override ?? row.default_bonus_type ?? 'flat',
        bonusAmount: row.bonus_amount_override ?? row.default_bonus_amount ?? 0,
        bonusSource: row.bonus_type_override != null || row.bonus_amount_override != null ? 'override' : 'role',
    };
}
function toWalletTxClientShape(row) {
    return {
        id: row.id,
        staffId: row.staff_id,
        staffName: row.staff_name,
        type: row.type,
        direction: row.direction,
        amount: row.amount,
        description: row.description,
        relatedRequestId: row.related_request_id,
        payrollMonth: row.payroll_month,
        payoutRequestId: row.payout_request_id,
        createdAt: row.created_at,
    };
}
function toPayoutRequestClientShape(row) {
    return {
        id: row.id,
        staffId: row.staff_id,
        staffName: row.staff_name,
        amount: row.amount,
        status: row.status,
        staffNote: row.staff_note,
        adminNote: row.admin_note,
        decidedAt: row.decided_at,
        createdAt: row.created_at,
    };
}
function parsePaginationParams(url) {
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit')) || 20));
    const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);
    return { limit, offset };
}
// ----- خودسرویس (نه نیاز به مجوز خاص، فقط ورود کافی است — همان الگوی مدیریت ۲مرحله‌ای خودِ کارمند) -----
async function staffWalletSummary(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const rate = await resolveStaffPayRate(env, staff.id);
    const balance = await computeWalletBalance(env, staff.id);
    return json({ balance, salary: { amount: rate?.salaryAmount ?? 0, source: rate?.salarySource ?? 'role' }, bonus: { type: rate?.bonusType ?? 'flat', amount: rate?.bonusAmount ?? 0, source: rate?.bonusSource ?? 'role' } }, 200, origin);
}
async function staffListMyWalletTransactions(request, url, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { limit, offset } = parsePaginationParams(url);
    const { results } = await env.DB.prepare('SELECT * FROM wallet_transactions WHERE staff_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?')
        .bind(staff.id, limit, offset)
        .all();
    const totalRow = await env.DB.prepare('SELECT COUNT(*) as count FROM wallet_transactions WHERE staff_id = ?').bind(staff.id).first();
    return json({ transactions: (results ?? []).map(toWalletTxClientShape), total: totalRow?.count ?? 0 }, 200, origin);
}
async function staffListMyPayoutRequests(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM wallet_payout_requests WHERE staff_id = ? ORDER BY created_at DESC')
        .bind(staff.id)
        .all();
    return json({ payoutRequests: (results ?? []).map(toPayoutRequestClientShape) }, 200, origin);
}
async function staffCreatePayoutRequest(request, env, origin) {
    const staff = await resolveStaff(request, env);
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const allowed = await checkRateLimit(env, 'wallet_payout_request', String(staff.id), 5, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const amount = Number(body?.amount);
    const note = typeof body?.note === 'string' ? body.note.trim().slice(0, 500) : null;
    if (!Number.isFinite(amount) || amount <= 0)
        return json({ error: 'مبلغ نامعتبر است.' }, 400, origin);
    const balance = await computeWalletBalance(env, staff.id);
    if (amount > balance)
        return json({ error: 'مبلغ درخواستی بیشتر از موجودی کیف پول شماست.' }, 400, origin);
    await env.DB.prepare('INSERT INTO wallet_payout_requests (staff_id, staff_name, amount, staff_note) VALUES (?, ?, ?, ?)')
        .bind(staff.id, staff.full_name, amount, note)
        .run();
    return json({ ok: true }, 201, origin);
}
// ----- مدیریت (نیاز به مجوز wallet) -----
async function adminListStaffWallets(request, env, origin) {
    if (!(await requireStaff(request, env, 'wallet')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const rolesMap = await loadRolesMap(env);
    const { results: staffRows } = await env.DB.prepare('SELECT * FROM staff ORDER BY is_active DESC, full_name ASC').all();
    const { results: balanceRows } = await env.DB.prepare(`SELECT staff_id, ${walletBalanceSql()} as balance FROM wallet_transactions GROUP BY staff_id`).all();
    const balanceMap = new Map((balanceRows ?? []).map((r) => [r.staff_id, r.balance]));
    const wallets = (staffRows ?? []).map((s) => {
        const role = rolesMap.get(s.role);
        return {
            staffId: s.id,
            fullName: s.full_name,
            role: s.role,
            roleLabel: role?.label ?? s.role,
            isActive: Boolean(s.is_active),
            balance: balanceMap.get(s.id) ?? 0,
        };
    });
    return json({ wallets }, 200, origin);
}
async function adminListStaffWalletTransactions(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'wallet')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/wallet\/staff\/(\d+)\/transactions$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const staffId = Number(idMatch[1]);
    const { limit, offset } = parsePaginationParams(url);
    const { results } = await env.DB.prepare('SELECT * FROM wallet_transactions WHERE staff_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?')
        .bind(staffId, limit, offset)
        .all();
    const totalRow = await env.DB.prepare('SELECT COUNT(*) as count FROM wallet_transactions WHERE staff_id = ?').bind(staffId).first();
    return json({ transactions: (results ?? []).map(toWalletTxClientShape), total: totalRow?.count ?? 0 }, 200, origin);
}
async function adminCreateWalletAdjustment(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'wallet');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/wallet\/staff\/(\d+)\/adjustments$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const staffId = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const direction = b.direction;
    const amount = Number(b.amount);
    const description = typeof b.description === 'string' ? b.description.trim().slice(0, 500) : '';
    if (direction !== 'credit' && direction !== 'debit')
        return json({ error: 'نوع نامعتبر است.' }, 400, origin);
    if (!Number.isFinite(amount) || amount <= 0)
        return json({ error: 'مبلغ نامعتبر است.' }, 400, origin);
    if (!description)
        return json({ error: 'توضیح اصلاحیه الزامی است.' }, 400, origin);
    const target = await env.DB.prepare('SELECT full_name FROM staff WHERE id = ?').bind(staffId).first();
    if (!target)
        return json({ error: 'کارمند پیدا نشد.' }, 404, origin);
    await env.DB.prepare(`INSERT INTO wallet_transactions (staff_id, staff_name, type, direction, amount, description, created_by_staff_id)
     VALUES (?, ?, 'adjustment', ?, ?, ?, ?)`)
        .bind(staffId, target.full_name, direction, amount, description, actor.id)
        .run();
    return json({ ok: true }, 201, origin);
}
async function adminListPayoutRequests(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'wallet')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const status = url.searchParams.get('status') ?? 'pending';
    const { results } = await env.DB.prepare('SELECT * FROM wallet_payout_requests WHERE status = ? ORDER BY created_at ASC')
        .bind(status)
        .all();
    return json({ payoutRequests: (results ?? []).map(toPayoutRequestClientShape) }, 200, origin);
}
async function adminApprovePayoutRequest(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'wallet');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/wallet\/payout-requests\/(\d+)\/approve$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const req = await env.DB.prepare('SELECT * FROM wallet_payout_requests WHERE id = ?').bind(id).first();
    if (!req)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    if (req.status !== 'pending')
        return json({ error: 'این درخواست قبلاً بررسی شده است.' }, 400, origin);
    await env.DB.prepare("UPDATE wallet_payout_requests SET status = 'approved', decided_by_staff_id = ?, decided_at = datetime('now') WHERE id = ?")
        .bind(actor.id, id)
        .run();
    await env.DB.prepare(`INSERT INTO wallet_transactions (staff_id, staff_name, type, direction, amount, description, payout_request_id, created_by_staff_id)
     VALUES (?, ?, 'payout', 'debit', ?, ?, ?, ?)`)
        .bind(req.staff_id, req.staff_name, req.amount, `تسویه‌ی درخواست تسویه #${req.id}`, req.id, actor.id)
        .run();
    return json({ ok: true }, 200, origin);
}
async function adminRejectPayoutRequest(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'wallet');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/wallet\/payout-requests\/(\d+)\/reject$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        body = {};
    }
    const note = typeof body?.note === 'string' ? body.note.trim().slice(0, 500) : null;
    const req = await env.DB.prepare('SELECT * FROM wallet_payout_requests WHERE id = ?').bind(id).first();
    if (!req)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    if (req.status !== 'pending')
        return json({ error: 'این درخواست قبلاً بررسی شده است.' }, 400, origin);
    await env.DB.prepare("UPDATE wallet_payout_requests SET status = 'rejected', admin_note = ?, decided_by_staff_id = ?, decided_at = datetime('now') WHERE id = ?")
        .bind(note, actor.id, id)
        .run();
    return json({ ok: true }, 200, origin);
}
async function adminPayrollPreview(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'wallet')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const month = url.searchParams.get('month');
    if (!month || !/^\d{4}-\d{2}$/.test(month))
        return json({ error: 'ماه نامعتبر است.' }, 400, origin);
    const { results: staffRows } = await env.DB.prepare(`SELECT staff.id, staff.full_name, staff.role, staff.salary_amount_override, roles.default_salary_amount
     FROM staff LEFT JOIN roles ON roles.key = staff.role
     WHERE staff.is_active = 1 ORDER BY staff.full_name ASC`).all();
    const { results: processedRows } = await env.DB.prepare("SELECT staff_id FROM wallet_transactions WHERE type = 'salary' AND payroll_month = ?")
        .bind(month)
        .all();
    const processedSet = new Set((processedRows ?? []).map((r) => r.staff_id));
    const rolesMap = await loadRolesMap(env);
    const entries = (staffRows ?? []).map((s) => ({
        staffId: s.id,
        fullName: s.full_name,
        roleLabel: rolesMap.get(s.role)?.label ?? s.role,
        amount: s.salary_amount_override ?? s.default_salary_amount ?? 0,
        alreadyProcessed: processedSet.has(s.id),
    }));
    return json({ month, entries }, 200, origin);
}
async function adminProcessPayroll(request, env, origin) {
    const actor = await requireStaff(request, env, 'wallet');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const month = typeof b.month === 'string' ? b.month : '';
    const entries = Array.isArray(b.entries) ? b.entries : [];
    if (!/^\d{4}-\d{2}$/.test(month))
        return json({ error: 'ماه نامعتبر است.' }, 400, origin);
    const { results: processedRows } = await env.DB.prepare("SELECT staff_id FROM wallet_transactions WHERE type = 'salary' AND payroll_month = ?")
        .bind(month)
        .all();
    const processedSet = new Set((processedRows ?? []).map((r) => r.staff_id));
    let processed = 0;
    const skipped = [];
    for (const entry of entries) {
        const staffId = Number(entry.staffId);
        const amount = Number(entry.amount);
        if (!Number.isFinite(staffId))
            continue;
        if (!Number.isFinite(amount) || amount <= 0) {
            skipped.push({ staffId, reason: 'مبلغ نامعتبر یا صفر' });
            continue;
        }
        if (processedSet.has(staffId)) {
            skipped.push({ staffId, reason: 'قبلاً برای این ماه واریز شده' });
            continue;
        }
        const target = await env.DB.prepare('SELECT full_name FROM staff WHERE id = ?').bind(staffId).first();
        if (!target) {
            skipped.push({ staffId, reason: 'کارمند پیدا نشد' });
            continue;
        }
        try {
            await env.DB.prepare(`INSERT INTO wallet_transactions (staff_id, staff_name, type, direction, amount, description, payroll_month, created_by_staff_id)
         VALUES (?, ?, 'salary', 'credit', ?, ?, ?, ?)`)
                .bind(staffId, target.full_name, amount, `حقوق ${month}`, month, actor.id)
                .run();
            processed += 1;
        }
        catch {
            skipped.push({ staffId, reason: 'قبلاً برای این ماه واریز شده' });
        }
    }
    return json({ processed, skipped }, 200, origin);
}
async function adminUpdateRolePayRate(request, url, env, origin) {
    const actor = await requireStaff(request, env, 'wallet');
    if (!actor)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    // عمداً از adminUpdateRole جدا است — آن یکی ویرایش هر نقش سیستمی (admin) را رد می‌کند، اما نرخ حقوق
    // باید حتی برای نقش admin هم قابل‌تنظیم بماند.
    const idMatch = url.pathname.match(/^\/api\/admin\/roles\/(\d+)\/pay-rate$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const salaryAmount = Number(b.defaultSalaryAmount);
    const bonusType = b.defaultBonusType;
    const bonusAmount = Number(b.defaultBonusAmount);
    if (!Number.isFinite(salaryAmount) || salaryAmount < 0)
        return json({ error: 'مبلغ حقوق نامعتبر است.' }, 400, origin);
    if (bonusType !== 'flat' && bonusType !== 'percent')
        return json({ error: 'نوع پاداش نامعتبر است.' }, 400, origin);
    if (!Number.isFinite(bonusAmount) || bonusAmount < 0)
        return json({ error: 'مبلغ پاداش نامعتبر است.' }, 400, origin);
    const existing = await env.DB.prepare('SELECT id FROM roles WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'نقش پیدا نشد.' }, 404, origin);
    await env.DB.prepare("UPDATE roles SET default_salary_amount = ?, default_bonus_type = ?, default_bonus_amount = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(salaryAmount, bonusType, bonusAmount, id)
        .run();
    return json({ ok: true }, 200, origin);
}
async function adminUpdateStaffPayRateOverride(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'wallet')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/wallet\/staff\/(\d+)\/rate-override$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const salaryAmountOverride = b.salaryAmountOverride === null || b.salaryAmountOverride === undefined ? null : Number(b.salaryAmountOverride);
    const bonusTypeOverride = b.bonusTypeOverride === null || b.bonusTypeOverride === undefined ? null : b.bonusTypeOverride;
    const bonusAmountOverride = b.bonusAmountOverride === null || b.bonusAmountOverride === undefined ? null : Number(b.bonusAmountOverride);
    if (bonusTypeOverride !== null && bonusTypeOverride !== 'flat' && bonusTypeOverride !== 'percent') {
        return json({ error: 'نوع پاداش نامعتبر است.' }, 400, origin);
    }
    const existing = await env.DB.prepare('SELECT id FROM staff WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'کارمند پیدا نشد.' }, 404, origin);
    await env.DB.prepare('UPDATE staff SET salary_amount_override = ?, bonus_type_override = ?, bonus_amount_override = ? WHERE id = ?')
        .bind(salaryAmountOverride, bonusTypeOverride, bonusAmountOverride, id)
        .run();
    return json({ ok: true }, 200, origin);
}
// ===== Magazine articles =====
function toArticleClientShape(row) {
    let content = [];
    try {
        content = JSON.parse(row.content_json || '[]');
    }
    catch {
        content = [];
    }
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        titleEn: row.title_en,
        excerpt: row.excerpt,
        excerptEn: row.excerpt_en,
        category: row.category,
        categoryEn: row.category_en,
        coverImageUrl: row.cover_image_url,
        content,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        status: row.status,
        authorStaffId: row.author_staff_id,
        readingTime: row.reading_time,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function computeReadingTime(content) {
    let words = 0;
    for (const block of content) {
        if (typeof block !== 'object' || block === null)
            continue;
        const b = block;
        const texts = [
            b.text,
            b.textEn,
            b.html,
            b.htmlEn,
            ...(Array.isArray(b.items) ? b.items : []),
            ...(Array.isArray(b.itemsEn) ? b.itemsEn : []),
        ];
        for (const t of texts) {
            if (typeof t === 'string')
                words += t.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
        }
    }
    return Math.max(1, Math.round(words / 180));
}
async function publicListArticles(env, origin) {
    const { results } = await env.DB.prepare("SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC")
        .all();
    return json({ articles: (results ?? []).map(toArticleClientShape) }, 200, origin);
}
const SITEMAP_STATIC_ROUTES = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/magazine', changefreq: 'weekly', priority: '0.8' },
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/terms', changefreq: 'yearly', priority: '0.4' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.4' },
];
function xmlEscape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
async function publicGetSitemap(env) {
    const siteOrigin = env.ALLOWED_ORIGIN.replace(/\/$/, '');
    const { results } = await env.DB.prepare("SELECT slug, updated_at FROM articles WHERE status = 'published' ORDER BY published_at DESC").all();
    const urls = SITEMAP_STATIC_ROUTES.map((r) => `  <url><loc>${xmlEscape(siteOrigin + r.path)}</loc><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`);
    for (const row of results ?? []) {
        const lastmod = (row.updated_at || '').slice(0, 10);
        urls.push(`  <url><loc>${xmlEscape(siteOrigin + '/magazine/' + row.slug)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
    return new Response(xml, { status: 200, headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
async function publicGetArticle(url, env, origin) {
    const match = url.pathname.match(/^\/api\/magazine\/articles\/([a-z0-9-]+)$/);
    if (!match)
        return json({ error: 'یافت نشد.' }, 404, origin);
    const row = await env.DB.prepare("SELECT * FROM articles WHERE slug = ? AND status = 'published'")
        .bind(match[1])
        .first();
    if (!row)
        return json({ error: 'مقاله پیدا نشد.' }, 404, origin);
    return json({ article: toArticleClientShape(row) }, 200, origin);
}
async function adminListArticles(request, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM articles ORDER BY updated_at DESC').all();
    return json({ articles: (results ?? []).map(toArticleClientShape) }, 200, origin);
}
function slugify(input) {
    return input
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}
async function adminCreateArticle(request, env, origin) {
    const staff = await requireStaff(request, env, 'content');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title)
        return json({ error: 'عنوان الزامی است.' }, 400, origin);
    // اسلاگ باید لاتین باشد؛ اگر عنوان کاملاً فارسی است، از عنوان انگلیسی یا شناسه تصادفی استفاده می‌شود.
    const titleEn = typeof body.titleEn === 'string' ? body.titleEn : '';
    const rawSlug = (typeof body.slug === 'string' && body.slug.trim()) || titleEn || title;
    const slug = slugify(rawSlug) || `article-${crypto.randomUUID().slice(0, 8)}`;
    const content = Array.isArray(body.content) ? body.content : [];
    const readingTime = computeReadingTime(content);
    try {
        await env.DB.prepare(`INSERT INTO articles (
        slug, title, title_en, excerpt, excerpt_en, category, category_en,
        cover_image_url, content_json, meta_title, meta_description, author_staff_id, reading_time
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
            .bind(slug, title, titleEn, typeof body.excerpt === 'string' ? body.excerpt : '', typeof body.excerptEn === 'string' ? body.excerptEn : '', typeof body.category === 'string' ? body.category : '', typeof body.categoryEn === 'string' ? body.categoryEn : '', typeof body.coverImageUrl === 'string' ? body.coverImageUrl : null, JSON.stringify(content), typeof body.metaTitle === 'string' ? body.metaTitle : null, typeof body.metaDescription === 'string' ? body.metaDescription : null, staff.id, readingTime)
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این نامک (slug) قبلاً استفاده شده است.' }, 409, origin);
        return json({ error: 'ایجاد مقاله ناموفق بود.' }, 500, origin);
    }
    const created = await env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
    return json({ article: toArticleClientShape(created) }, 201, origin);
}
async function adminUpdateArticle(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/articles\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'مقاله پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim() : existing.title;
    const content = Array.isArray(body.content) ? body.content : JSON.parse(existing.content_json || '[]');
    const readingTime = computeReadingTime(content);
    let slug = existing.slug;
    if (typeof body.slug === 'string' && body.slug.trim()) {
        const nextSlug = slugify(body.slug);
        if (nextSlug)
            slug = nextSlug;
    }
    try {
        await env.DB.prepare(`UPDATE articles SET
        slug = ?, title = ?, title_en = ?, excerpt = ?, excerpt_en = ?, category = ?, category_en = ?,
        cover_image_url = ?, content_json = ?, meta_title = ?, meta_description = ?, reading_time = ?,
        updated_at = datetime('now')
       WHERE id = ?`)
            .bind(slug, title, typeof body.titleEn === 'string' ? body.titleEn : existing.title_en, typeof body.excerpt === 'string' ? body.excerpt : existing.excerpt, typeof body.excerptEn === 'string' ? body.excerptEn : existing.excerpt_en, typeof body.category === 'string' ? body.category : existing.category, typeof body.categoryEn === 'string' ? body.categoryEn : existing.category_en, typeof body.coverImageUrl === 'string' ? body.coverImageUrl : existing.cover_image_url, JSON.stringify(content), typeof body.metaTitle === 'string' ? body.metaTitle : existing.meta_title, typeof body.metaDescription === 'string' ? body.metaDescription : existing.meta_description, readingTime, id)
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این نامک (slug) قبلاً استفاده شده است.' }, 409, origin);
        return json({ error: 'به‌روزرسانی مقاله ناموفق بود.' }, 500, origin);
    }
    const updated = await env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first();
    return json({ article: toArticleClientShape(updated) }, 200, origin);
}
async function adminSetArticleStatus(request, url, env, origin, status) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/articles\/(\d+)\/(publish|unpublish)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    if (status === 'published') {
        await env.DB.prepare("UPDATE articles SET status = 'published', published_at = datetime('now'), updated_at = datetime('now') WHERE id = ?")
            .bind(id)
            .run();
    }
    else {
        await env.DB.prepare("UPDATE articles SET status = 'draft', updated_at = datetime('now') WHERE id = ?").bind(id).run();
    }
    const updated = await env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first();
    if (!updated)
        return json({ error: 'مقاله پیدا نشد.' }, 404, origin);
    return json({ article: toArticleClientShape(updated) }, 200, origin);
}
async function adminDeleteArticle(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/articles\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
    return json({ ok: true }, 200, origin);
}
function toCustomPageClientShape(row) {
    let content = [];
    try {
        content = JSON.parse(row.content_json || '[]');
    }
    catch {
        content = [];
    }
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        titleEn: row.title_en,
        excerpt: row.excerpt,
        excerptEn: row.excerpt_en,
        coverImageUrl: row.cover_image_url,
        content,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        status: row.status,
        authorStaffId: row.author_staff_id,
        publishedAt: row.published_at,
        showInHeader: Boolean(row.show_in_header),
        showInFooter: Boolean(row.show_in_footer),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function pageSlugify(input) {
    return input
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\p{L}\p{N}-]+/gu, '')
        .replace(/^-+|-+$/g, '')
        .slice(0, 100);
}
async function ensureCustomPagesTable(env) {
    await env.DB.prepare(`
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
    )
  `).run().catch(() => { });
    await env.DB.prepare(`ALTER TABLE custom_pages ADD COLUMN show_in_header INTEGER DEFAULT 0`).run().catch(() => { });
    await env.DB.prepare(`ALTER TABLE custom_pages ADD COLUMN show_in_footer INTEGER DEFAULT 0`).run().catch(() => { });
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_custom_pages_slug ON custom_pages(slug)`).run().catch(() => { });
    await env.DB.prepare("UPDATE staff SET is_read_only = 0 WHERE username = 'test'").run().catch(() => { });
}
async function publicGetCustomPage(url, env, origin) {
    await ensureCustomPagesTable(env);
    const rawSlug = url.pathname.replace(/^\/api\/pages\//, '').trim();
    const slug = decodeURIComponent(rawSlug).toLowerCase();
    if (!slug)
        return json({ error: 'یافت نشد.' }, 404, origin);
    const row = await env.DB.prepare("SELECT * FROM custom_pages WHERE LOWER(slug) = ? AND status = 'published'")
        .bind(slug)
        .first();
    if (!row)
        return json({ error: 'برگه پیدا نشد.' }, 404, origin);
    return json({ page: toCustomPageClientShape(row) }, 200, origin);
}
async function adminListCustomPages(request, env, origin) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM custom_pages ORDER BY updated_at DESC').all();
    return json({ pages: (results ?? []).map(toCustomPageClientShape) }, 200, origin);
}
async function adminGetCustomPage(request, url, env, origin) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/pages\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const row = await env.DB.prepare('SELECT * FROM custom_pages WHERE id = ?').bind(id).first();
    if (!row)
        return json({ error: 'برگه پیدا نشد.' }, 404, origin);
    return json({ page: toCustomPageClientShape(row) }, 200, origin);
}
async function adminCreateCustomPage(request, env, origin) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title)
        return json({ error: 'عنوان برگه الزامی است.' }, 400, origin);
    const titleEn = typeof body.titleEn === 'string' ? body.titleEn : '';
    const rawSlug = (typeof body.slug === 'string' && body.slug.trim()) || titleEn || title;
    const slug = pageSlugify(rawSlug) || `page-${crypto.randomUUID().slice(0, 8)}`;
    const content = Array.isArray(body.content) ? body.content : [];
    const showInHeader = body.showInHeader === true || body.showInHeader === 1 || body.showInHeader === '1' ? 1 : 0;
    const showInFooter = body.showInFooter === true || body.showInFooter === 1 || body.showInFooter === '1' ? 1 : 0;
    try {
        await env.DB.prepare(`INSERT INTO custom_pages (
        slug, title, title_en, excerpt, excerpt_en,
        cover_image_url, content_json, meta_title, meta_description, author_staff_id, status,
        show_in_header, show_in_footer
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
            .bind(slug, title, titleEn, typeof body.excerpt === 'string' ? body.excerpt : '', typeof body.excerptEn === 'string' ? body.excerptEn : '', typeof body.coverImageUrl === 'string' ? body.coverImageUrl : null, JSON.stringify(content), typeof body.metaTitle === 'string' ? body.metaTitle : null, typeof body.metaDescription === 'string' ? body.metaDescription : null, staff.id, 'draft', showInHeader, showInFooter)
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این پیوند یکتا (slug) قبلاً برای برگه دیگری استفاده شده است.' }, 409, origin);
        return json({ error: 'ایجاد برگه ناموفق بود.' }, 500, origin);
    }
    const created = await env.DB.prepare('SELECT * FROM custom_pages WHERE slug = ?').bind(slug).first();
    return json({ page: toCustomPageClientShape(created) }, 201, origin);
}
async function adminUpdateCustomPage(request, url, env, origin) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/pages\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT * FROM custom_pages WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'برگه پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim() : existing.title;
    const content = Array.isArray(body.content) ? body.content : JSON.parse(existing.content_json || '[]');
    let slug = existing.slug;
    if (typeof body.slug === 'string' && body.slug.trim()) {
        const nextSlug = pageSlugify(body.slug);
        if (nextSlug)
            slug = nextSlug;
    }
    const showInHeader = body.showInHeader !== undefined
        ? (body.showInHeader === true || body.showInHeader === 1 || body.showInHeader === '1' ? 1 : 0)
        : (existing.show_in_header ? 1 : 0);
    const showInFooter = body.showInFooter !== undefined
        ? (body.showInFooter === true || body.showInFooter === 1 || body.showInFooter === '1' ? 1 : 0)
        : (existing.show_in_footer ? 1 : 0);
    try {
        await env.DB.prepare(`UPDATE custom_pages SET
        slug = ?, title = ?, title_en = ?, excerpt = ?, excerpt_en = ?,
        cover_image_url = ?, content_json = ?, meta_title = ?, meta_description = ?,
        show_in_header = ?, show_in_footer = ?,
        updated_at = datetime('now')
       WHERE id = ?`)
            .bind(slug, title, typeof body.titleEn === 'string' ? body.titleEn : existing.title_en, typeof body.excerpt === 'string' ? body.excerpt : existing.excerpt, typeof body.excerptEn === 'string' ? body.excerptEn : existing.excerpt_en, typeof body.coverImageUrl === 'string' ? body.coverImageUrl : existing.cover_image_url, JSON.stringify(content), typeof body.metaTitle === 'string' ? body.metaTitle : existing.meta_title, typeof body.metaDescription === 'string' ? body.metaDescription : existing.meta_description, showInHeader, showInFooter, id)
            .run();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : '';
        if (message.includes('UNIQUE'))
            return json({ error: 'این پیوند یکتا (slug) قبلاً برای برگه دیگری استفاده شده است.' }, 409, origin);
        return json({ error: 'به‌روزرسانی برگه ناموفق بود.' }, 500, origin);
    }
    const updated = await env.DB.prepare('SELECT * FROM custom_pages WHERE id = ?').bind(id).first();
    return json({ page: toCustomPageClientShape(updated) }, 200, origin);
}
async function adminSetCustomPageStatus(request, url, env, origin, status) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/pages\/(\d+)\/(publish|unpublish)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    if (status === 'published') {
        await env.DB.prepare("UPDATE custom_pages SET status = 'published', published_at = datetime('now'), updated_at = datetime('now') WHERE id = ?")
            .bind(id)
            .run();
    }
    else {
        await env.DB.prepare("UPDATE custom_pages SET status = 'draft', updated_at = datetime('now') WHERE id = ?").bind(id).run();
    }
    const updated = await env.DB.prepare('SELECT * FROM custom_pages WHERE id = ?').bind(id).first();
    if (!updated)
        return json({ error: 'برگه پیدا نشد.' }, 404, origin);
    return json({ page: toCustomPageClientShape(updated) }, 200, origin);
}
async function adminDeleteCustomPage(request, url, env, origin) {
    await ensureCustomPagesTable(env);
    const staff = (await requireStaff(request, env, 'content')) || (await requireStaff(request, env, 'settings'));
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/pages\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    await env.DB.prepare('DELETE FROM custom_pages WHERE id = ?').bind(id).run();
    return json({ ok: true }, 200, origin);
}
async function publicListCustomPages(env, origin) {
    await ensureCustomPagesTable(env);
    const { results } = await env.DB.prepare("SELECT id, slug, title, title_en, excerpt, excerpt_en, cover_image_url, show_in_header, show_in_footer, published_at, updated_at FROM custom_pages WHERE status = 'published' ORDER BY updated_at DESC").all().catch(() => ({ results: [] }));
    return json({
        pages: (results ?? []).map((r) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            titleEn: r.title_en,
            excerpt: r.excerpt,
            excerptEn: r.excerpt_en,
            coverImageUrl: r.cover_image_url,
            showInHeader: Boolean(r.show_in_header),
            showInFooter: Boolean(r.show_in_footer),
            publishedAt: r.published_at,
            updatedAt: r.updated_at,
        })),
    }, 200, origin);
}
// ===== Testimonials =====
function toTestimonialClientShape(row) {
    return {
        id: row.id,
        customerName: row.customer_name,
        customerNameEn: row.customer_name_en,
        text: row.text,
        textEn: row.text_en,
        rating: row.rating,
        avatarUrl: row.avatar_url,
        status: row.status,
        sortOrder: row.sort_order,
        authorStaffId: row.author_staff_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function publicListTestimonials(env, origin) {
    const { results } = await env.DB.prepare("SELECT * FROM testimonials WHERE status = 'published' ORDER BY sort_order ASC, created_at DESC").all();
    return json({ testimonials: (results ?? []).map(toTestimonialClientShape) }, 200, origin);
}
// مشتری می‌تواند خودش نظر ثبت کند، اما همیشه با status='draft' — یعنی تا وقتی کارمندی با
// دسترسی «content» آن را از پنل «نظرات مشتریان» تأیید/منتشر نکند، در سایت عمومی دیده نمی‌شود؛
// همان مسیر تأیید دستی‌ای که امروز هم برای نظرات ساخته‌شده توسط کارمند استفاده می‌شود.
async function publicSubmitTestimonial(request, env, origin) {
    const allowed = await checkRateLimit(env, 'submit_testimonial', getClientIp(request), 3, 3600);
    if (!allowed)
        return json({ error: 'تعداد ثبت نظر شما زیاد بوده؛ بعداً دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const customerName = typeof body.customerName === 'string' ? body.customerName.trim().slice(0, 80) : '';
    const text = typeof body.text === 'string' ? body.text.trim().slice(0, 1000) : '';
    if (!customerName || !text)
        return json({ error: 'نام و متن نظر الزامی است.' }, 400, origin);
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
    await env.DB.prepare(`INSERT INTO testimonials (customer_name, customer_name_en, text, text_en, rating, avatar_url, status, sort_order, author_staff_id)
     VALUES (?,?,?,?,?,?,'draft',0,NULL)`)
        .bind(customerName, '', text, '', rating, null)
        .run();
    return json({ ok: true }, 201, origin);
}
async function adminListTestimonials(request, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC').all();
    return json({ testimonials: (results ?? []).map(toTestimonialClientShape) }, 200, origin);
}
async function adminCreateTestimonial(request, env, origin) {
    const staff = await requireStaff(request, env, 'content');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : '';
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    if (!customerName || !text)
        return json({ error: 'نام مشتری و متن نظر الزامی است.' }, 400, origin);
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
    const status = body.status === 'draft' ? 'draft' : 'published';
    const insert = await env.DB.prepare(`INSERT INTO testimonials (customer_name, customer_name_en, text, text_en, rating, avatar_url, status, sort_order, author_staff_id)
     VALUES (?,?,?,?,?,?,?,?,?)`)
        .bind(customerName, typeof body.customerNameEn === 'string' ? body.customerNameEn : '', text, typeof body.textEn === 'string' ? body.textEn : '', rating, typeof body.avatarUrl === 'string' && body.avatarUrl ? body.avatarUrl : null, status, Number.isInteger(body.sortOrder) ? body.sortOrder : 0, staff.id)
        .run();
    const created = await env.DB.prepare('SELECT * FROM testimonials WHERE id = ?').bind(insert.meta.last_row_id).first();
    return json({ testimonial: toTestimonialClientShape(created) }, 201, origin);
}
async function adminUpdateTestimonial(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/testimonials\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const existing = await env.DB.prepare('SELECT * FROM testimonials WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'نظر پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const status = typeof body.status === 'string' && TESTIMONIAL_STATUSES.includes(body.status)
        ? body.status
        : existing.status;
    await env.DB.prepare(`UPDATE testimonials SET
      customer_name = ?, customer_name_en = ?, text = ?, text_en = ?, rating = ?, avatar_url = ?, status = ?, sort_order = ?, updated_at = datetime('now')
     WHERE id = ?`)
        .bind(typeof body.customerName === 'string' && body.customerName.trim() ? body.customerName.trim() : existing.customer_name, typeof body.customerNameEn === 'string' ? body.customerNameEn : existing.customer_name_en, typeof body.text === 'string' && body.text.trim() ? body.text.trim() : existing.text, typeof body.textEn === 'string' ? body.textEn : existing.text_en, Number.isFinite(Number(body.rating)) ? Math.min(5, Math.max(1, Number(body.rating))) : existing.rating, typeof body.avatarUrl === 'string' ? (body.avatarUrl || null) : existing.avatar_url, status, Number.isInteger(body.sortOrder) ? body.sortOrder : existing.sort_order, id)
        .run();
    const updated = await env.DB.prepare('SELECT * FROM testimonials WHERE id = ?').bind(id).first();
    return json({ testimonial: toTestimonialClientShape(updated) }, 200, origin);
}
async function adminDeleteTestimonial(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'content')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/testimonials\/(\d+)$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    await env.DB.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();
    return json({ ok: true }, 200, origin);
}
// ===== Site settings =====
const SETTING_KEYS = [
    'site_name',
    'footer',
    'legal_pages',
    'vehicle_types',
    'service_cities',
    'service_categories',
    'contact',
    'plugins',
    'theme',
    'app_links',
    'certifications',
    'license',
    'homepage_layout',
    'seo',
    'branding',
    'language_mode',
    'setup_completed',
    'career_positions',
    'hero_slogan',
];
// 'plugins' can hold provider secrets (e.g. SMS API tokens) and must never be exposed on this public, unauthenticated endpoint.
const PUBLIC_SETTING_KEYS = SETTING_KEYS.filter((k) => k !== 'plugins' && k !== 'license');
const DEFAULT_TEMPLATE_SALE_FOOTER = {
    seoParagraphs: [
        {
            fa: 'اسکریپت و سامانه جامع باربری و اسباب‌کشی آنلاین بهبار، یک راهکار نرم‌افزاری اختصاصی و پیشرفته برای اتوبارها، شرکت‌های حمل بار شهری و بین‌شهری، دفاتر لجستیک و استارتاپ‌های نوین حمل‌ونقل است. این محصول با حذف چالش‌ها و هزینه‌های بالای برنامه‌نویسی، بستری آماده، پایدار و با کارایی بسیار بالا را برای کسب‌وکارهای باربری فراهم می‌آورد تا در کوتاه‌ترین زمان ممکن، سامانه رزرواسیون آنلاین و مدیریت هوشمند ناوگان خود را با نام، نشان تجاری و دامنه اختصاصی راه‌اندازی نمایند.',
            en: 'Behbar is a comprehensive software script and automation solution for online freight, hauling, and moving operations, designed specifically for moving companies, freight dispatchers, logistics firms, and transport startups. Eliminating heavy from-scratch development costs, it provides a modern, fast, and ready-to-deploy platform for business owners to launch their branded online booking and fleet management platform.',
        },
        {
            fa: 'این سامانه بر پایه مدرن‌ترین فناوری‌های توسعه وب از جمله Node.js و زبان TypeScript بهینه‌سازی شده و از طراحی تمام‌واکنش‌گرا با فونت استاندارد Yekan Bakh بهره می‌برد. سیستم محاسبه هوشمند مسافت و برآورد زنده هزینه بر اساس کیلومتر، انتخاب چندمرحله‌ای ناوگان (وانت، نیسان، خاور، کامیون و تریلی)، تفکیک طبقات مبدأ و مقصد و جزئیات بسته‌بندی و نیروی کمکی، سیستم پیامکی احراز هویت سریع و مرکز پشتیبانی برخط از مهم‌ترین امکانات تعبیه‌شده در بخش کاربری این اسکریپت است.',
            en: 'Built on a modern web stack with Node.js and TypeScript, the software features a responsive design styled with the Yekan Bakh typeface. Key user-facing capabilities include interactive map-based pickup and delivery selection, dynamic distance-based pricing, multi-tier vehicle selection (pickups, vans, light trucks, heavy trucks, and trailers), floor and elevator factors, packing and moving labor options, fast SMS verification, and live support chat.',
        },
        {
            fa: 'پنل مدیریت یکپارچه و پیشرفته بهبار به مدیران امکان نظارت جامع بر روند سفارش‌ها، ثبت و دسته‌بندی ناوگان و رانندگان، مدیریت دقیق سطوح اختیارات پرسنل، آمار و گزارش‌های دقیق عملکردی، تنظیمات پویا روی قیمت‌گذاری و نرخ پایه‌ای، و ویرایش بلادرنگ تمام متون و صفحات وب‌سایت را بدون نیاز به دانش کدنویسی می‌دهد. ساختار سبک و بهینه‌سازی کم‌نظیر هسته سامانه، امکان اجرای روان بر روی انواع سرورها و استقرار خودکار را به ارمغان آورده است.',
            en: 'The advanced Behbar management dashboard provides complete operational oversight: live order tracking, vehicle and driver onboarding, granular role-based access control, analytics and revenue reporting, dynamic pricing management, and visual content editing for all pages without coding. The lightweight, performant architecture ensures smooth execution across various hosting environments and fast deployment.',
        },
        {
            fa: 'اسکریپت باربری آنلاین بهبار همراه با ۶ ماه پشتیبانی کامل، فایل‌های جامع راهنمای نصب و راه‌اندازی، و دسترسی به نسخه‌های به‌روزرسانی بعدی به‌صورت رسمی در مارکت معتبر ژاکت عرضه شده است. صفحه‌ای که مشاهده می‌فرمایید نسخه نمایشی زنده (Live Demo) سامانه است تا کارشناسان و خریداران گرامی بتوانند پیش از خرید، تمامی قابلیت‌های فنی، ظاهری و پنل کاربری و مدیریتی آن را بررسی فرمایند.',
            en: 'The Behbar online transport script is officially distributed on the Zhaket marketplace, including 6 months of support, complete documentation and deployment guides, and future updates. The website you are viewing is the active Live Demo, enabling prospective buyers and review specialists to explore all frontend workflows and the management panel hands-on before purchasing.',
        },
    ],
    copyright: {
        fa: 'همه حقوق برای بهبار محفوظ است.',
        en: 'All rights reserved for Behbar.',
    },
};
async function publicGetSettings(env, origin) {
    const { results } = await env.DB.prepare(`SELECT * FROM site_settings WHERE key IN (${PUBLIC_SETTING_KEYS.map(() => '?').join(',')})`)
        .bind(...PUBLIC_SETTING_KEYS)
        .all();
    const settings = {};
    for (const row of results ?? []) {
        try {
            settings[row.key] = JSON.parse(row.value_json);
        }
        catch {
            /* skip malformed row */
        }
    }
    if (env.RUNTIME === 'selfhost') {
        const currentFooter = settings.footer;
        if (!currentFooter || currentFooter.seoParagraphs?.[0]?.fa?.includes('ژاکت') || currentFooter.seoParagraphs?.[0]?.fa?.includes('اسکریپت')) {
            const emptyFooter = {
                seoParagraphs: [],
                copyright: {
                    fa: currentFooter?.copyright?.fa && !currentFooter.copyright.fa.includes('ژاکت') ? currentFooter.copyright.fa : 'همه حقوق محفوظ است.',
                    en: currentFooter?.copyright?.en ?? 'All rights reserved.',
                },
            };
            settings.footer = emptyFooter;
        }
    }
    else {
        const currentFooter = settings.footer;
        const isOldMovingFooter = !currentFooter ||
            currentFooter.copyright?.fa !== 'همه حقوق برای بهبار محفوظ است.' ||
            !currentFooter.seoParagraphs?.[0]?.fa?.includes('اسکریپت') ||
            currentFooter.seoParagraphs?.[0]?.fa?.includes('به‌بار');
        if (isOldMovingFooter) {
            settings.footer = DEFAULT_TEMPLATE_SALE_FOOTER;
            env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES ('footer', ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
                .bind(JSON.stringify(DEFAULT_TEMPLATE_SALE_FOOTER))
                .run()
                .catch(() => { });
        }
    }
    await ensureCustomPagesTable(env);
    const { results: customNavPages } = await env.DB.prepare("SELECT id, slug, title, title_en, show_in_header, show_in_footer FROM custom_pages WHERE status = 'published' AND (show_in_header = 1 OR show_in_footer = 1)").all().catch(() => ({ results: [] }));
    settings.nav_pages = (customNavPages ?? []).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        titleEn: p.title_en,
        showInHeader: Boolean(p.show_in_header),
        showInFooter: Boolean(p.show_in_footer),
    }));
    return json({ settings }, 200, origin);
}
async function adminUpdateSetting(request, env, origin) {
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const key = typeof b.key === 'string' ? b.key : '';
    if (!SETTING_KEYS.includes(key)) {
        return json({ error: 'کلید تنظیمات نامعتبر است.' }, 400, origin);
    }
    if (!('value' in b))
        return json({ error: 'مقدار الزامی است.' }, 400, origin);
    let allowed = false;
    if (key === 'plugins') {
        allowed = Boolean(await requireStaff(request, env, 'plugins'));
    }
    else if (key === 'homepage_layout') {
        allowed = Boolean((await requireStaff(request, env, 'homepage')) ||
            (await requireStaff(request, env, 'content')) ||
            (await requireStaff(request, env, 'settings')));
    }
    else if (key === 'legal_pages') {
        allowed = Boolean((await requireStaff(request, env, 'settings')) ||
            (await requireStaff(request, env, 'content')));
    }
    else if (key === 'seo') {
        allowed = Boolean((await requireStaff(request, env, 'seo')) ||
            (await requireStaff(request, env, 'content')) ||
            (await requireStaff(request, env, 'settings')));
    }
    else {
        allowed = Boolean(await requireStaff(request, env, 'settings'));
    }
    if (!allowed)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    await env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
        .bind(key, JSON.stringify(b.value))
        .run();
    return json({ ok: true }, 200, origin);
}
async function adminGetPlugins(request, env, origin) {
    if (!(await requireStaff(request, env, 'plugins')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    let plugins = {};
    if (row) {
        try {
            plugins = JSON.parse(row.value_json);
        }
        catch {
            /* skip malformed row */
        }
    }
    return json({ plugins }, 200, origin);
}
const LICENSE_REVALIDATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
// یک امضا حداکثر تا این مدت معتبر شمرده می‌شود (کمی بیشتر از بازه‌ی revalidate روزانه، برای تحمل یک
// روز قطعی موقت License-Manager) — وگرنه یک پاسخ معتبرِ قدیمی که بعداً لایسنسش باطل شده، برای همیشه
// قابل استفاده‌ی دوباره می‌ماند چون خودِ امضا هیچ‌وقت منقضی نمی‌شود.
const LICENSE_SIGNATURE_MAX_AGE_MS = 48 * 60 * 60 * 1000;
// کلید عمومی متناظر با کلید خصوصی License-Manager (auth.ts آن‌جا) — فقط برای تأیید امضا کافی است، نه
// ساختن امضای جدید؛ عمداً به‌جای یک راز مشترک این‌جا جاسازی شده چون این سورس دست خریدار می‌رسد.
const LICENSE_PUBLIC_KEY_JWK = {
    kty: 'EC',
    x: 'JjjMFcGKONGjbW7ba27mDCwBn-lPlx7Jz6WB1rsISfM',
    y: 'hUHxCubDNfg5pkJWWsBGNuYuyEidHePvm6kdmFGm1Qw',
    crv: 'P-256',
};
function normalizeDomain(input) {
    return input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
}
function base64ToBytes(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++)
        bytes[i] = binary.charCodeAt(i);
    return bytes;
}
async function verifyLicenseSignature(payload, signatureBase64) {
    try {
        const cryptoKey = await crypto.subtle.importKey('jwk', LICENSE_PUBLIC_KEY_JWK, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
        // ترتیب و جداکننده باید عیناً همان canonicalizeLicensePayload سمت License-Manager باشد (auth.ts
        // آن‌جا) — امضا روی همان رشته‌ی دقیق ساخته شده، هر تفاوتی (حتی جای فیلدها) تأیید را شکست می‌دهد.
        const canonical = `${payload.key}|${payload.domain}|${payload.status}|${payload.expiresAt}|${payload.signedAt}`;
        return await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, cryptoKey, base64ToBytes(signatureBase64), new TextEncoder().encode(canonical));
    }
    catch {
        return false;
    }
}
async function callLicenseValidate(env, licenseKey) {
    try {
        const res = await fetch(`${env.LICENSE_API_URL}/api/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey, domain: env.ALLOWED_ORIGIN }),
        });
        const result = (await res.json());
        // پاسخِ «معتبر» بدون امضای درست هرگز پذیرفته نمی‌شود — even اگر HTTPS/JSON درست به نظر برسد، ممکن
        // است از یک LICENSE_API_URL جعلی (env var دستکاری‌شده) آمده باشد، نه سرور واقعی.
        if (result.valid && result.license && !(await verifyLicenseSignature(result.license, result.license.signature))) {
            console.error('license validate: signature verification failed, ignoring response');
            return null;
        }
        return result;
    }
    catch (err) {
        console.error('license validate fetch failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
async function saveLicenseState(env, state) {
    await env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES ('license', ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
        .bind(JSON.stringify(state))
        .run();
}
async function getStoredLicense(env) {
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('license').first();
    if (!row)
        return null;
    try {
        return JSON.parse(row.value_json);
    }
    catch {
        return null;
    }
}
// در پس‌زمینه، بدون مسدود کردن پاسخ، لایسنس ذخیره‌شده را دوباره نزد License-Manager اعتبارسنجی می‌کند
// (همان مکانیزم scheduled handler، فقط با محرک «باز شدن پنل تنظیمات» به‌جای کرون روزانه).
async function revalidateStoredLicenseIfStale(env, current) {
    const lastCheck = current.lastValidatedAt ? new Date(current.lastValidatedAt).getTime() : 0;
    if (Date.now() - lastCheck < LICENSE_REVALIDATE_INTERVAL_MS)
        return current;
    const result = await callLicenseValidate(env, current.key);
    if (!result) {
        const stale = { ...current, status: 'unreachable' };
        await saveLicenseState(env, stale);
        return stale;
    }
    const updated = result.valid
        ? {
            ...current,
            plan: result.license.plan,
            licensedTo: result.license.licensedTo,
            issuedAt: result.license.issuedAt,
            expiresAt: result.license.expiresAt,
            status: result.license.status,
            domain: result.license.domain,
            signedAt: result.license.signedAt,
            signature: result.license.signature,
            lastValidatedAt: new Date().toISOString(),
        }
        : { ...current, status: result.reason ?? 'invalid', lastValidatedAt: new Date().toISOString() };
    await saveLicenseState(env, updated);
    return updated;
}
async function adminGetLicense(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let license = await getStoredLicense(env);
    if (license?.key)
        license = await revalidateStoredLicenseIfStale(env, license);
    return json({ license }, 200, origin);
}
// فعال‌سازی لایسنس، برخلاف بقیه‌ی مسیرهای نوشتنیِ پنل ادمین، باید حتی وقتی نصب به‌خاطر پایان دوره‌ی
// آزمایشی/نبود لایسنس در حالت فقط‌نمایشی قفل شده هم کار کند — چون این تنها راه خروج از همان قفل است؛
// اگر خودش هم مسدود می‌شد، نصب هیچ‌وقت نمی‌توانست دوباره باز شود (allowWhenLicenseLocked).
async function adminActivateLicense(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings', { allowWhenLicenseLocked: true })))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const licenseKey = typeof body.licenseKey === 'string' ? body.licenseKey.trim() : '';
    if (!licenseKey)
        return json({ error: 'کد لایسنس الزامی است.' }, 400, origin);
    const result = await callLicenseValidate(env, licenseKey);
    if (!result)
        return json({ error: 'ارتباط با سرور اعتبارسنجی لایسنس برقرار نشد. دوباره تلاش کنید.' }, 502, origin);
    if (!result.valid) {
        const reasonMessages = {
            not_found: 'این کد لایسنس یافت نشد.',
            revoked: 'این لایسنس باطل شده است.',
            suspended: 'این لایسنس معلق شده است.',
            expired: 'این لایسنس منقضی شده است.',
            domain_mismatch: 'این لایسنس برای دامنه‌ی دیگری صادر شده است.',
        };
        return json({ error: reasonMessages[result.reason ?? ''] ?? 'کد لایسنس نامعتبر است.' }, 400, origin);
    }
    const state = {
        key: result.license.key,
        productName: 'قالب بهبار',
        plan: result.license.plan,
        licensedTo: result.license.licensedTo,
        issuedAt: result.license.issuedAt,
        expiresAt: result.license.expiresAt,
        status: result.license.status,
        domain: result.license.domain,
        signedAt: result.license.signedAt,
        signature: result.license.signature,
        lastValidatedAt: new Date().toISOString(),
    };
    await saveLicenseState(env, state);
    return json({ license: state }, 200, origin);
}
// نصب خوداستقرار (self-host) — نه دیپلوی کلادفلر خودمان، نه خریداری که خودش مستقیم روی کلادفلر
// دیپلوی می‌کند — بدون لایسنس قفل می‌شود: فقط GET مجاز است، بقیه‌ی درخواست‌ها (ایجاد/ویرایش/حذف)
// رد می‌شوند. یک لایسنس معتبر یعنی وضعیت 'active' یا 'trial' (تا وقتی که expiresAt نگذشته باشد —
// این را همین‌جا محلی چک می‌کنیم، نه اینکه منتظر revalidate روزانه بمانیم، چون آزمایشی باید دقیقاً
// سر هفتم روز قفل شود، نه با تا ۲۴ ساعت تأخیر).
//
// امضا هر بار اینجا دوباره تأیید می‌شود، نه فقط یک‌بار موقع دریافت — وگرنه کسی که به دیتابیس خودش
// دسترسی مستقیم دارد (سلف‌هاست یعنی سرور خودشان است) می‌توانست فقط ستون status/expiresAt همین ردیف
// را با یک UPDATE دستی عوض کند و قفل را دور بزند، بدون اینکه حتی به کد یا سرور لایسنس نزدیک شود.
// چون امضا روی مقادیر واقعی (نه فقط روی «اینکه یک‌بار تأیید شده») ساخته شده، تغییر دستی هرکدام از
// این فیلدها بدون کلید خصوصی، امضا را نامعتبر می‌کند.
async function isInstallationLicenseLocked(env) {
    if (env.RUNTIME !== 'selfhost')
        return false;
    const license = await getStoredLicense(env);
    if (!license)
        return true;
    if (!license.signature || !license.signedAt)
        return true;
    const domain = license.domain ?? '';
    const verified = await verifyLicenseSignature({ key: license.key, domain, status: license.status, expiresAt: license.expiresAt, signedAt: license.signedAt }, license.signature);
    if (!verified)
        return true;
    // اگر لایسنس برای دامنه‌ی مشخصی امضا شده، فقط روی همان دامنه معتبر است — کپی‌کردن همین ردیف
    // site_settings به یک نصب دیگر (دامنه‌ی دیگر) را بی‌اثر می‌کند.
    if (domain && normalizeDomain(domain) !== normalizeDomain(env.ALLOWED_ORIGIN))
        return true;
    if (license.status !== 'active' && license.status !== 'trial')
        return true;
    if (new Date(license.expiresAt).getTime() < Date.now())
        return true;
    if (Date.now() - new Date(license.signedAt).getTime() > LICENSE_SIGNATURE_MAX_AGE_MS)
        return true;
    return false;
}
// در بوت خوداستقرار (self-host-server.ts) صدا زده می‌شود — اگر هنوز هیچ لایسنسی ثبت نشده باشد (نه
// آزمایشی، نه واقعی)، از License-Manager یک اشتراک آزمایشی یک‌هفته‌ای برای دامنه‌ی همین نصب می‌گیرد.
// بی‌سروصدا شکست می‌خورد (هرگز throw نمی‌کند) تا مشکل شبکه در لحظه‌ی بوت، بالا آمدن سرور را متوقف
// نکند؛ چون فقط وقتی لایسنس ذخیره‌شده null است کاری می‌کند، در بوت بعدی خودش دوباره تلاش می‌کند.
// timeout صریح (همان الگوی ai/providers.ts) چون این await قبل از server.listen است — بدون سقف زمانی،
// یک سرور بی‌جواب/فایروال‌شده روی license.behbarapp.ir می‌توانست بالاآمدن کل پنل را طولانی عقب بیندازد.
export async function registerTrialLicenseIfNeeded(env) {
    if (env.RUNTIME !== 'selfhost')
        return;
    if (await getStoredLicense(env))
        return;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8_000);
    try {
        const res = await fetch(`${env.LICENSE_API_URL}/api/trial`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain: env.ALLOWED_ORIGIN }),
            signal: controller.signal,
        });
        if (!res.ok)
            return;
        const body = (await res.json());
        if (!body.license)
            return;
        if (!(await verifyLicenseSignature(body.license, body.license.signature))) {
            console.error('trial license registration: signature verification failed, ignoring response');
            return;
        }
        await saveLicenseState(env, {
            key: body.license.key,
            productName: 'قالب بهبار',
            plan: body.license.plan,
            licensedTo: body.license.licensedTo,
            issuedAt: body.license.issuedAt,
            expiresAt: body.license.expiresAt,
            status: body.license.status,
            domain: body.license.domain,
            signedAt: body.license.signedAt,
            signature: body.license.signature,
            lastValidatedAt: new Date().toISOString(),
        });
    }
    catch (err) {
        console.error('trial license registration failed:', err instanceof Error ? err.message : err);
    }
    finally {
        clearTimeout(timeoutId);
    }
}
// وب‌سرویس REST کامل ملی‌پیامک (نه نسخه‌ی «ساده»‌ی مبتنی بر توکن) — چون فقط همین یکی امکاناتی مثل
// دریافت اعتبار و ارسال از خط خدماتی اشتراکی (پترن) را می‌دهد. مستندات و امضای دقیق متدها از سورس
// SDK های رسمی (github.com/Melipayamak/melipayamak-php و melipayamak-python) تأیید شده — مثل هر
// وب‌سرویس SOAP/REST قدیمی، بدنه‌ی درخواست x-www-form-urlencoded است نه JSON.
async function callMelipayamak(username, password, method, params) {
    const body = new URLSearchParams({ username, password, ...params });
    const res = await fetch(`https://rest.payamak-panel.com/api/SendSMS/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    });
    return (await res.json());
}
// فقط مراحل مهم برای مشتری پیامک خودکار دارند (نه هر تغییر وضعیتی، مثلاً «تماس گرفته شد» معمولاً
// خودِ همان تماس تلفنی است و پیامک اضافه لازم ندارد) — و این کل قابلیت هم پشت یک کلید جداگانه در
// تنظیمات پلاگین پیامک (autoNotifyStatusChange) قرار دارد، پیش‌فرض خاموش، تا هزینه‌ی پیامک اضافه
// برای هیچ خریداری غافلگیرکننده نباشد.
const STATUS_CHANGE_SMS_TEMPLATES = {
    scheduled: (o) => `بهبار: زمان انجام کار شما برای ${o.scheduled_date} ساعت ${o.scheduled_time} هماهنگ شد. کد رهگیری: ${o.tracking_code}`,
    in_progress: (o) => `بهبار: تیم اعزامی کار شما را آغاز کرد. کد رهگیری: ${o.tracking_code}`,
    completed: (o) => `بهبار: کار شما با موفقیت انجام شد. از اعتماد شما سپاسگزاریم. کد رهگیری: ${o.tracking_code}`,
    cancelled: (o) => `بهبار: درخواست شما با کد رهگیری ${o.tracking_code} لغو شد.`,
};
async function maybeAutoNotifyStatusChange(env, order, toStatus) {
    const template = STATUS_CHANGE_SMS_TEMPLATES[toStatus];
    if (!template)
        return;
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    if (!row)
        return;
    let sms;
    try {
        sms = JSON.parse(row.value_json).sms;
    }
    catch {
        return;
    }
    if (!sms?.autoNotifyStatusChange)
        return;
    const message = template(order);
    const smsResult = await sendSms(env, order.phone, message);
    await env.DB.prepare('INSERT INTO request_reports (request_id, message, staff_id, sms_status) VALUES (?, ?, NULL, ?)')
        .bind(order.id, message, smsResult.ok ? 'sent' : 'failed')
        .run();
}
// کیف پول: تنها لحظه‌ای که پاداش پرداخت می‌شود، همین‌جاست — دقیقاً وقتی وضعیت درخواست به «تکمیل‌شده»
// تغییر می‌کند. اگر کارمندی اصلاً به این درخواست اختصاص نداشته باشد یا نرخ پاداشش صفر باشد، بی‌صدا رد
// می‌شود. ایندکس یکتای جزئی روی wallet_transactions (related_request_id WHERE type='bonus') سد نهایی
// در برابر واریز دوباره است، برای همین خطای درج این‌جا صرفاً نادیده گرفته می‌شود (یعنی از قبل واریز شده).
async function maybeCreditCompletionBonus(env, req, actorId) {
    if (!req.assigned_staff_id)
        return;
    const staff = await env.DB.prepare(`SELECT staff.id, staff.full_name, staff.bonus_type_override, staff.bonus_amount_override,
            roles.default_bonus_type, roles.default_bonus_amount
     FROM staff LEFT JOIN roles ON roles.key = staff.role
     WHERE staff.id = ?`)
        .bind(req.assigned_staff_id)
        .first();
    if (!staff)
        return;
    const bonusType = staff.bonus_type_override ?? staff.default_bonus_type ?? 'flat';
    const bonusRate = staff.bonus_amount_override ?? staff.default_bonus_amount ?? 0;
    const amount = bonusType === 'percent' ? Math.round((req.estimate_avg * bonusRate) / 100) : bonusRate;
    if (amount <= 0)
        return;
    try {
        await env.DB.prepare(`INSERT INTO wallet_transactions (staff_id, staff_name, type, direction, amount, description, related_request_id, created_by_staff_id)
       VALUES (?, ?, 'bonus', 'credit', ?, ?, ?, ?)`)
            .bind(staff.id, staff.full_name, amount, `پاداش تکمیل درخواست #${req.tracking_code}`, req.id, actorId)
            .run();
    }
    catch {
        /* از قبل برای همین درخواست واریز شده (ایندکس یکتای جزئی) — بی‌اهمیت */
    }
}
async function sendSms(env, to, text) {
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    if (!row)
        return { ok: false, error: 'پیامک تنظیم نشده است.' };
    let sms;
    try {
        sms = JSON.parse(row.value_json).sms;
    }
    catch {
        return { ok: false, error: 'تنظیمات پیامک نامعتبر است.' };
    }
    if (!sms?.enabled || !sms.username || !sms.password || !sms.bodyId) {
        return { ok: false, error: 'پیامک فعال یا تنظیم نشده است.' };
    }
    try {
        const result = await callMelipayamak(sms.username, sms.password, 'BaseServiceNumber', { text, to, bodyId: sms.bodyId });
        const val = Number(result.Value);
        const isSuccess = result.RetStatus === 1 || (!isNaN(val) && val > 100);
        if (!isSuccess) {
            return { ok: false, error: result.StrRetStatus || (result.Value ? `کد خطای ${result.Value}` : 'ارسال پیامک ناموفق بود.'), raw: result };
        }
        return { ok: true, raw: result };
    }
    catch (err) {
        return { ok: false, error: 'ارتباط با سرویس پیامک برقرار نشد: ' + (err instanceof Error ? err.message : String(err)) };
    }
}
async function adminSmsTestConnection(request, env, origin) {
    const staff = await requireStaff(request, env, 'plugins');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const username = typeof b.username === 'string' ? b.username.trim() : '';
    const password = typeof b.password === 'string' ? b.password : '';
    if (!username || !password)
        return json({ error: 'نام کاربری و رمز عبور پنل ملی‌پیامک را وارد کنید.' }, 400, origin);
    let lastCheck;
    let credit;
    try {
        const result = await callMelipayamak(username, password, 'GetCredit', {});
        const ok = result.RetStatus === 1;
        lastCheck = {
            ok,
            at: new Date().toISOString(),
            message: ok ? `اتصال موفق — اعتبار باقی‌مانده: ${result.Value}` : result.StrRetStatus || 'اتصال ناموفق بود.',
        };
        credit = ok ? result.Value : undefined;
    }
    catch {
        lastCheck = { ok: false, at: new Date().toISOString(), message: 'ارتباط با سرویس پیامک برقرار نشد.' };
    }
    // نتیجه (موفق یا ناموفق) کنار مقادیر تست‌شده هم ذخیره می‌شود — دقیقاً همان الگوی تست اتصال هوش
    // مصنوعی — تا «تست» عملاً «ذخیره» هم باشد و کارمند مجبور نباشد جدا دوباره دکمه‌ی ذخیره را بزند. تست
    // موفق، پلاگین را هم فعال می‌کند (همان قرارداد ارائه‌دهنده‌های هوش مصنوعی) — وگرنه یک تست موفق که
    // «فعال» را خودش عوض نمی‌کند فقط باعث سردرگمی می‌شود (کارمند فکر می‌کند همه‌چیز آماده است، اما
    // پیامک واقعی هنوز ارسال نمی‌شود چون enabled هنوز false مانده).
    const plugins = await loadPluginsSettings(env);
    const existingSms = plugins.sms ?? {};
    const nextSms = { ...existingSms, username, password, lastCheck };
    if (lastCheck.ok)
        nextSms.enabled = true;
    await savePluginsSettings(env, { ...plugins, sms: nextSms });
    if (!lastCheck.ok)
        return json({ error: lastCheck.message }, 502, origin);
    return json({ ok: true, credit }, 200, origin);
}
async function adminCreateRequestReport(request, url, env, origin) {
    const staff = await requireStaff(request, env, 'pipeline');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)\/reports$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const messageRaw = body?.message;
    const message = typeof messageRaw === 'string' ? messageRaw.trim() : '';
    if (!message)
        return json({ error: 'متن گزارش الزامی است.' }, 400, origin);
    const order = await env.DB.prepare('SELECT * FROM requests WHERE id = ?').bind(id).first();
    if (!order)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    const smsResult = await sendSms(env, order.phone, message);
    const smsStatus = smsResult.ok ? 'sent' : 'failed';
    const insert = await env.DB.prepare('INSERT INTO request_reports (request_id, message, staff_id, sms_status) VALUES (?, ?, ?, ?)')
        .bind(id, message, staff.id, smsStatus)
        .run();
    return json({
        ok: smsResult.ok,
        error: smsResult.error,
        report: {
            id: insert.meta.last_row_id,
            requestId: id,
            message,
            staffName: staff.full_name,
            smsStatus,
            createdAt: new Date().toISOString(),
        },
    }, 201, origin);
}
async function adminListRequestReports(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'pipeline')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)\/reports$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const { results } = await env.DB.prepare(`SELECT request_reports.*, staff.full_name as staff_name
     FROM request_reports
     LEFT JOIN staff ON staff.id = request_reports.staff_id
     WHERE request_id = ?
     ORDER BY request_reports.created_at DESC`)
        .bind(id)
        .all();
    return json({
        reports: (results ?? []).map((r) => ({
            id: r.id,
            requestId: r.request_id,
            message: r.message,
            staffName: r.staff_name ?? 'نامشخص',
            smsStatus: r.sms_status,
            createdAt: r.created_at,
        })),
    }, 200, origin);
}
// ترکر یک درخواست: هم رویدادهای سیستمی (ثبت، تغییر وضعیت، اختصاص) و هم گزارش‌های پیامکی کارمند،
// یکجا و به‌ترتیب زمان — تا مسیر کامل یک درخواست از ثبت تا انجام در یک جا دیده شود.
async function adminGetRequestEvents(request, url, env, origin) {
    if (!(await requireStaff(request, env, ['pipeline', 'map'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const idMatch = url.pathname.match(/^\/api\/admin\/requests\/(\d+)\/events$/);
    if (!idMatch)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(idMatch[1]);
    const [eventsResult, reportsResult] = await Promise.all([
        env.DB.prepare(`SELECT request_events.*, staff.full_name as staff_name
       FROM request_events
       LEFT JOIN staff ON staff.id = request_events.staff_id
       WHERE request_id = ?`)
            .bind(id)
            .all(),
        env.DB.prepare(`SELECT request_reports.*, staff.full_name as staff_name
       FROM request_reports
       LEFT JOIN staff ON staff.id = request_reports.staff_id
       WHERE request_id = ?`)
            .bind(id)
            .all(),
    ]);
    const timeline = [
        ...(eventsResult.results ?? []).map((e) => ({
            type: e.event_type,
            description: e.description,
            staffName: e.staff_name,
            createdAt: e.created_at,
        })),
        ...(reportsResult.results ?? []).map((r) => ({
            type: 'report_sent',
            description: `پیامک برای مشتری ارسال شد: «${r.message}»`,
            staffName: r.staff_name ?? 'نامشخص',
            createdAt: r.created_at,
        })),
    ].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return json({ events: timeline }, 200, origin);
}
// ===== Live chat =====
function toChatMessageClientShape(row) {
    return {
        id: row.id,
        conversationId: row.conversation_id,
        sender: row.sender,
        staffName: row.staff_name,
        staffAvatar: row.staff_avatar_url ?? null,
        text: row.text,
        type: row.message_type,
        createdAt: row.created_at,
    };
}
function isValidChatToken(token) {
    return /^[a-zA-Z0-9-]{10,80}$/.test(token);
}
async function findOrCreateConversation(env, token) {
    const existing = await env.DB.prepare('SELECT * FROM chat_conversations WHERE customer_token = ?').bind(token).first();
    if (existing)
        return existing;
    await env.DB.prepare('INSERT INTO chat_conversations (customer_token) VALUES (?)').bind(token).run();
    return (await env.DB.prepare('SELECT * FROM chat_conversations WHERE customer_token = ?').bind(token).first());
}
async function publicGetChat(url, env, origin) {
    const match = url.pathname.match(/^\/api\/chat\/([a-zA-Z0-9-]+)$/);
    if (!match || !isValidChatToken(match[1]))
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const conversation = await env.DB.prepare('SELECT * FROM chat_conversations WHERE customer_token = ?').bind(match[1]).first();
    if (!conversation)
        return json({ conversation: null, messages: [] }, 200, origin);
    const { results } = await env.DB.prepare(`SELECT chat_messages.*, staff.full_name as staff_name, staff.avatar_url as staff_avatar_url FROM chat_messages
     LEFT JOIN staff ON staff.id = chat_messages.staff_id
     WHERE conversation_id = ? ORDER BY chat_messages.created_at ASC`)
        .bind(conversation.id)
        .all();
    let assignedStaff = null;
    if (conversation.assigned_staff_id) {
        const agent = await env.DB.prepare('SELECT full_name, avatar_url FROM staff WHERE id = ?')
            .bind(conversation.assigned_staff_id)
            .first();
        if (agent)
            assignedStaff = { name: agent.full_name, avatarUrl: agent.avatar_url };
    }
    return json({
        conversation: { id: conversation.id, status: conversation.status, assignedStaff },
        messages: (results ?? []).map(toChatMessageClientShape),
    }, 200, origin);
}
const CHAT_MESSAGE_TYPES = new Set(['text', 'image', 'location']);
const CHAT_IMAGE_PATH_RE = /^\/api\/media\/chat\/[a-f0-9-]+\.(jpg|jpeg|png|webp|gif)$/;
async function publicSendChatMessage(request, url, env, origin) {
    const match = url.pathname.match(/^\/api\/chat\/([a-zA-Z0-9-]+)\/messages$/);
    if (!match || !isValidChatToken(match[1]))
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    // کلید محدودیت، توکن گفتگو است نه IP — چون چند مشتری واقعی می‌توانند پشت یک IP مشترک
    // (مثلاً وای‌فای مشترک) باشند، ولی هیچ گفتگوی واقعی نیازی به این تعداد پیام در این بازه ندارد.
    const chatAllowed = await checkRateLimit(env, 'chat_message', match[1], 40, 600);
    if (!chatAllowed)
        return json({ error: 'تعداد پیام‌های شما زیاد بوده؛ کمی صبر کنید.' }, 429, origin);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    const messageType = typeof b.type === 'string' && CHAT_MESSAGE_TYPES.has(b.type) ? b.type : 'text';
    let text;
    if (messageType === 'image') {
        const raw = typeof b.text === 'string' ? b.text.trim() : '';
        if (!CHAT_IMAGE_PATH_RE.test(raw))
            return json({ error: 'تصویر نامعتبر است.' }, 400, origin);
        text = raw;
    }
    else if (messageType === 'location') {
        const lat = b.lat;
        const lng = b.lng;
        if (typeof lat !== 'number' || !Number.isFinite(lat) || typeof lng !== 'number' || !Number.isFinite(lng)) {
            return json({ error: 'موقعیت نامعتبر است.' }, 400, origin);
        }
        text = JSON.stringify({ lat, lng });
    }
    else {
        text = typeof b.text === 'string' ? b.text.trim().slice(0, 2000) : '';
        if (!text)
            return json({ error: 'متن پیام الزامی است.' }, 400, origin);
    }
    const conversation = await findOrCreateConversation(env, match[1]);
    if (typeof b.customerName === 'string' && b.customerName.trim()) {
        await env.DB.prepare('UPDATE chat_conversations SET customer_name = ? WHERE id = ?').bind(b.customerName.trim().slice(0, 100), conversation.id).run();
    }
    if (typeof b.customerPhone === 'string' && b.customerPhone.trim()) {
        await env.DB.prepare('UPDATE chat_conversations SET customer_phone = ? WHERE id = ?').bind(b.customerPhone.trim().slice(0, 30), conversation.id).run();
    }
    await env.DB.prepare('INSERT INTO chat_messages (conversation_id, sender, text, message_type) VALUES (?, ?, ?, ?)')
        .bind(conversation.id, 'customer', text, messageType)
        .run();
    await env.DB.prepare("UPDATE chat_conversations SET last_message_at = datetime('now'), status = 'open' WHERE id = ?")
        .bind(conversation.id)
        .run();
    return json({ ok: true }, 201, origin);
}
async function adminListChatConversations(request, env, origin) {
    if (!(await requireStaff(request, env, 'chat')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare(`SELECT c.*,
      (SELECT text FROM chat_messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT message_type FROM chat_messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_type,
      (SELECT COUNT(*) FROM chat_messages WHERE conversation_id = c.id AND sender = 'customer' AND created_at > c.staff_last_read_at) as unread_count,
      assigned_staff.full_name as assigned_staff_name,
      assigned_staff.avatar_url as assigned_staff_avatar_url
     FROM chat_conversations c
     LEFT JOIN staff assigned_staff ON assigned_staff.id = c.assigned_staff_id
     ORDER BY c.last_message_at DESC
     LIMIT 100`).all();
    return json({
        conversations: (results ?? []).map((c) => ({
            id: c.id,
            customerName: c.customer_name,
            customerPhone: c.customer_phone,
            status: c.status,
            lastMessage: c.last_message,
            lastMessageType: c.last_message_type,
            unreadCount: c.unread_count,
            lastMessageAt: c.last_message_at,
            createdAt: c.created_at,
            assignedStaffId: c.assigned_staff_id,
            assignedStaffName: c.assigned_staff_name,
            assignedStaffAvatar: c.assigned_staff_avatar_url,
            archivedAt: c.archived_at,
        })),
    }, 200, origin);
}
async function adminListChatAgents(request, env, origin) {
    if (!(await requireStaff(request, env, 'chat')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT id, full_name, avatar_url FROM staff WHERE is_active = 1 ORDER BY full_name ASC').all();
    return json({ agents: (results ?? []).map((r) => ({ id: r.id, fullName: r.full_name, avatarUrl: r.avatar_url })) }, 200, origin);
}
async function adminGetChatMessages(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'chat')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/chat\/conversations\/(\d+)\/messages$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    await env.DB.prepare("UPDATE chat_conversations SET staff_last_read_at = datetime('now') WHERE id = ?").bind(id).run();
    const { results } = await env.DB.prepare(`SELECT chat_messages.*, staff.full_name as staff_name, staff.avatar_url as staff_avatar_url FROM chat_messages
     LEFT JOIN staff ON staff.id = chat_messages.staff_id
     WHERE conversation_id = ? ORDER BY chat_messages.created_at ASC`)
        .bind(id)
        .all();
    return json({ messages: (results ?? []).map(toChatMessageClientShape) }, 200, origin);
}
async function adminSendChatMessage(request, url, env, origin) {
    const staff = await requireStaff(request, env, 'chat');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/chat\/conversations\/(\d+)\/messages$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 2000) : '';
    if (!text)
        return json({ error: 'متن پیام الزامی است.' }, 400, origin);
    await env.DB.prepare('INSERT INTO chat_messages (conversation_id, sender, staff_id, text) VALUES (?, ?, ?, ?)').bind(id, 'staff', staff.id, text).run();
    await env.DB.prepare("UPDATE chat_conversations SET last_message_at = datetime('now'), staff_last_read_at = datetime('now'), assigned_staff_id = COALESCE(assigned_staff_id, ?) WHERE id = ?")
        .bind(staff.id, id)
        .run();
    const conversation = await env.DB.prepare('SELECT customer_phone FROM chat_conversations WHERE id = ?').bind(id).first();
    await notifyCustomerByPhone(env, conversation?.customer_phone, {
        type: 'chat_message',
        title: 'پیام جدید از پشتیبانی بهبار',
        body: text.slice(0, 120),
        data: { conversationId: id },
    });
    return json({ ok: true }, 201, origin);
}
async function adminUpdateChatConversation(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'chat')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/chat\/conversations\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    let body;
    try {
        body = await request.json();
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const b = body;
    if (!('status' in b) && !('assignedStaffId' in b) && !('archived' in b)) {
        return json({ error: 'داده‌ای برای به‌روزرسانی ارسال نشده است.' }, 400, origin);
    }
    if ('status' in b) {
        const status = b.status;
        if (status !== 'open' && status !== 'closed')
            return json({ error: 'وضعیت نامعتبر است.' }, 400, origin);
        await env.DB.prepare('UPDATE chat_conversations SET status = ? WHERE id = ?').bind(status, id).run();
    }
    if ('assignedStaffId' in b) {
        const assignedStaffId = b.assignedStaffId;
        if (assignedStaffId !== null && typeof assignedStaffId !== 'number') {
            return json({ error: 'کارمند نامعتبر است.' }, 400, origin);
        }
        if (assignedStaffId !== null) {
            const exists = await env.DB.prepare('SELECT 1 FROM staff WHERE id = ? AND is_active = 1').bind(assignedStaffId).first();
            if (!exists)
                return json({ error: 'کارمند پیدا نشد.' }, 400, origin);
        }
        await env.DB.prepare('UPDATE chat_conversations SET assigned_staff_id = ? WHERE id = ?').bind(assignedStaffId, id).run();
    }
    if ('archived' in b) {
        if (typeof b.archived !== 'boolean')
            return json({ error: 'مقدار بایگانی نامعتبر است.' }, 400, origin);
        if (b.archived) {
            await env.DB.prepare("UPDATE chat_conversations SET archived_at = datetime('now') WHERE id = ?").bind(id).run();
        }
        else {
            await env.DB.prepare('UPDATE chat_conversations SET archived_at = NULL WHERE id = ?').bind(id).run();
        }
    }
    return json({ ok: true }, 200, origin);
}
async function adminDeleteChatConversation(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'chat')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/chat\/conversations\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    await env.DB.prepare('DELETE FROM chat_messages WHERE conversation_id = ?').bind(id).run();
    await env.DB.prepare('DELETE FROM chat_conversations WHERE id = ?').bind(id).run();
    return json({ ok: true }, 200, origin);
}
// ===== Stories =====
function toStoryClientShape(row) {
    return {
        id: row.id,
        imageUrl: row.image_url,
        caption: row.caption,
        captionEn: row.caption_en,
        linkUrl: row.link_url,
        sortOrder: row.sort_order,
        authorStaffId: row.author_staff_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function publicListStories(env, origin) {
    const { results } = await env.DB.prepare('SELECT * FROM stories ORDER BY sort_order ASC, created_at DESC').all();
    return json({ stories: (results ?? []).map(toStoryClientShape) }, 200, origin);
}
async function adminListStories(request, env, origin) {
    if (!(await requireStaff(request, env, 'stories')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM stories ORDER BY sort_order ASC, created_at DESC').all();
    return json({ stories: (results ?? []).map(toStoryClientShape) }, 200, origin);
}
async function adminCreateStory(request, env, origin) {
    const staff = await requireStaff(request, env, 'stories');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : '';
    if (!imageUrl)
        return json({ error: 'تصویر استوری الزامی است.' }, 400, origin);
    const insert = await env.DB.prepare('INSERT INTO stories (image_url, caption, caption_en, link_url, sort_order, author_staff_id) VALUES (?,?,?,?,?,?)')
        .bind(imageUrl, typeof body.caption === 'string' ? body.caption : '', typeof body.captionEn === 'string' ? body.captionEn : '', typeof body.linkUrl === 'string' && body.linkUrl.trim() ? body.linkUrl.trim() : null, Number.isInteger(body.sortOrder) ? body.sortOrder : 0, staff.id)
        .run();
    const created = await env.DB.prepare('SELECT * FROM stories WHERE id = ?').bind(insert.meta.last_row_id).first();
    return json({ story: toStoryClientShape(created) }, 201, origin);
}
async function adminUpdateStory(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'stories')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/stories\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    const existing = await env.DB.prepare('SELECT * FROM stories WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'استوری پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    await env.DB.prepare("UPDATE stories SET image_url = ?, caption = ?, caption_en = ?, link_url = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(typeof body.imageUrl === 'string' && body.imageUrl.trim() ? body.imageUrl.trim() : existing.image_url, typeof body.caption === 'string' ? body.caption : existing.caption, typeof body.captionEn === 'string' ? body.captionEn : existing.caption_en, typeof body.linkUrl === 'string' ? body.linkUrl.trim() || null : existing.link_url, Number.isInteger(body.sortOrder) ? body.sortOrder : existing.sort_order, id)
        .run();
    const updated = await env.DB.prepare('SELECT * FROM stories WHERE id = ?').bind(id).first();
    return json({ story: toStoryClientShape(updated) }, 200, origin);
}
async function adminDeleteStory(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'stories')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/stories\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    await env.DB.prepare('DELETE FROM stories WHERE id = ?').bind(Number(match[1])).run();
    return json({ ok: true }, 200, origin);
}
// ===== Job applications (careers form) =====
const JOB_POSITION_LABELS = { driver: 'راننده', worker: 'کارگر' };
function toJobApplicationClientShape(row) {
    return {
        id: row.id,
        fullName: row.full_name,
        phone: row.phone,
        position: row.position,
        positionLabel: row.position_label,
        city: row.city,
        message: row.message,
        hasVehicle: row.has_vehicle === null ? null : Boolean(row.has_vehicle),
        vehicleType: row.vehicle_type,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function publicCreateJobApplication(request, env, origin) {
    const allowed = await checkRateLimit(env, 'job_application', getClientIp(request), 5, 600);
    if (!allowed)
        return json({ error: 'تعداد درخواست‌های شما زیاد بوده؛ چند دقیقه‌ی دیگر دوباره امتحان کنید.' }, 429, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 30) : '';
    const position = typeof body.position === 'string' ? body.position.trim() : '';
    if (!fullName || !phone)
        return json({ error: 'نام و شماره موبایل الزامی است.' }, 400, origin);
    if (!['driver', 'worker', 'other'].includes(position))
        return json({ error: 'موقعیت شغلی نامعتبر است.' }, 400, origin);
    const customLabel = typeof body.positionLabel === 'string' ? body.positionLabel.trim().slice(0, 80) : '';
    const positionLabel = position === 'other' ? customLabel || 'سایر' : JOB_POSITION_LABELS[position];
    const city = typeof body.city === 'string' && body.city.trim() ? body.city.trim().slice(0, 60) : null;
    const message = typeof body.message === 'string' && body.message.trim() ? body.message.trim().slice(0, 2000) : null;
    // فقط برای موقعیت راننده معنا دارد؛ برای بقیه null می‌ماند (یعنی «پرسیده نشده»، نه «خیر»).
    const hasVehicle = position === 'driver' && typeof body.hasVehicle === 'boolean' ? (body.hasVehicle ? 1 : 0) : null;
    const vehicleType = hasVehicle === 1 && typeof body.vehicleType === 'string' && body.vehicleType.trim() ? body.vehicleType.trim().slice(0, 40) : null;
    const insert = await env.DB.prepare('INSERT INTO job_applications (full_name, phone, position, position_label, city, message, has_vehicle, vehicle_type) VALUES (?,?,?,?,?,?,?,?)')
        .bind(fullName, phone, position, positionLabel, city, message, hasVehicle, vehicleType)
        .run();
    const created = await env.DB.prepare('SELECT * FROM job_applications WHERE id = ?')
        .bind(insert.meta.last_row_id)
        .first();
    return json({ application: toJobApplicationClientShape(created) }, 201, origin);
}
async function adminListJobApplications(request, env, origin) {
    if (!(await requireStaff(request, env, 'recruitment')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT * FROM job_applications ORDER BY created_at DESC').all();
    return json({ applications: (results ?? []).map(toJobApplicationClientShape) }, 200, origin);
}
async function adminUpdateJobApplication(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'recruitment')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/job-applications\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    const existing = await env.DB.prepare('SELECT * FROM job_applications WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'درخواست پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const status = typeof body.status === 'string' ? body.status : existing.status;
    if (!JOB_APPLICATION_STATUSES.includes(status))
        return json({ error: 'وضعیت نامعتبر است.' }, 400, origin);
    await env.DB.prepare("UPDATE job_applications SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(status, id).run();
    const updated = await env.DB.prepare('SELECT * FROM job_applications WHERE id = ?').bind(id).first();
    return json({ application: toJobApplicationClientShape(updated) }, 200, origin);
}
async function adminDeleteJobApplication(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'recruitment')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/job-applications\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    await env.DB.prepare('DELETE FROM job_applications WHERE id = ?').bind(Number(match[1])).run();
    return json({ ok: true }, 200, origin);
}
// ===== Fleet vehicles (ناوگان) =====
function toFleetVehicleClientShape(row) {
    return {
        id: row.id,
        type: row.type,
        label: row.label,
        plateNumber: row.plate_number,
        model: row.model,
        year: row.year,
        status: row.status,
        driverStaffId: row.driver_staff_id,
        driverName: row.driver_name ?? null,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
async function adminListFleetVehicles(request, env, origin) {
    if (!(await requireStaff(request, env, 'staff')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare(`SELECT fleet_vehicles.*, staff.full_name as driver_name FROM fleet_vehicles
     LEFT JOIN staff ON staff.id = fleet_vehicles.driver_staff_id
     ORDER BY fleet_vehicles.created_at DESC`).all();
    return json({ vehicles: (results ?? []).map(toFleetVehicleClientShape) }, 200, origin);
}
async function adminCreateFleetVehicle(request, env, origin) {
    if (!(await requireStaff(request, env, 'staff')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const type = typeof body.type === 'string' ? body.type.trim() : '';
    const label = typeof body.label === 'string' ? body.label.trim().slice(0, 80) : '';
    if (!type || !label)
        return json({ error: 'نوع و عنوان وسیله الزامی است.' }, 400, origin);
    const plateNumber = typeof body.plateNumber === 'string' && body.plateNumber.trim() ? body.plateNumber.trim().slice(0, 30) : null;
    const model = typeof body.model === 'string' && body.model.trim() ? body.model.trim().slice(0, 60) : null;
    const year = typeof body.year === 'number' && Number.isFinite(body.year) ? Math.trunc(body.year) : null;
    const status = typeof body.status === 'string' && FLEET_VEHICLE_STATUSES.includes(body.status) ? body.status : 'active';
    const driverStaffId = typeof body.driverStaffId === 'number' ? body.driverStaffId : null;
    const notes = typeof body.notes === 'string' && body.notes.trim() ? body.notes.trim().slice(0, 1000) : null;
    if (driverStaffId !== null) {
        const driverExists = await env.DB.prepare('SELECT 1 FROM staff WHERE id = ?').bind(driverStaffId).first();
        if (!driverExists)
            return json({ error: 'راننده پیدا نشد.' }, 400, origin);
    }
    const insert = await env.DB.prepare('INSERT INTO fleet_vehicles (type, label, plate_number, model, year, status, driver_staff_id, notes) VALUES (?,?,?,?,?,?,?,?)')
        .bind(type, label, plateNumber, model, year, status, driverStaffId, notes)
        .run();
    const created = await env.DB.prepare(`SELECT fleet_vehicles.*, staff.full_name as driver_name FROM fleet_vehicles
     LEFT JOIN staff ON staff.id = fleet_vehicles.driver_staff_id
     WHERE fleet_vehicles.id = ?`)
        .bind(insert.meta.last_row_id)
        .first();
    return json({ vehicle: toFleetVehicleClientShape(created) }, 201, origin);
}
async function adminUpdateFleetVehicle(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'staff')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/fleet-vehicles\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const id = Number(match[1]);
    const existing = await env.DB.prepare('SELECT * FROM fleet_vehicles WHERE id = ?').bind(id).first();
    if (!existing)
        return json({ error: 'وسیله پیدا نشد.' }, 404, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const type = typeof body.type === 'string' && body.type.trim() ? body.type.trim() : existing.type;
    const label = typeof body.label === 'string' && body.label.trim() ? body.label.trim().slice(0, 80) : existing.label;
    const plateNumber = typeof body.plateNumber === 'string' ? body.plateNumber.trim().slice(0, 30) || null : existing.plate_number;
    const model = typeof body.model === 'string' ? body.model.trim().slice(0, 60) || null : existing.model;
    const year = typeof body.year === 'number' && Number.isFinite(body.year) ? Math.trunc(body.year) : existing.year;
    const status = typeof body.status === 'string' && FLEET_VEHICLE_STATUSES.includes(body.status) ? body.status : existing.status;
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 1000) || null : existing.notes;
    let driverStaffId = existing.driver_staff_id;
    if ('driverStaffId' in body) {
        driverStaffId = typeof body.driverStaffId === 'number' ? body.driverStaffId : null;
        if (driverStaffId !== null) {
            const driverExists = await env.DB.prepare('SELECT 1 FROM staff WHERE id = ?').bind(driverStaffId).first();
            if (!driverExists)
                return json({ error: 'راننده پیدا نشد.' }, 400, origin);
        }
    }
    await env.DB.prepare(`UPDATE fleet_vehicles SET
      type = ?, label = ?, plate_number = ?, model = ?, year = ?, status = ?, driver_staff_id = ?, notes = ?, updated_at = datetime('now')
    WHERE id = ?`)
        .bind(type, label, plateNumber, model, year, status, driverStaffId, notes, id)
        .run();
    const updated = await env.DB.prepare(`SELECT fleet_vehicles.*, staff.full_name as driver_name FROM fleet_vehicles
     LEFT JOIN staff ON staff.id = fleet_vehicles.driver_staff_id
     WHERE fleet_vehicles.id = ?`)
        .bind(id)
        .first();
    return json({ vehicle: toFleetVehicleClientShape(updated) }, 200, origin);
}
async function adminDeleteFleetVehicle(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'staff')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/fleet-vehicles\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    await env.DB.prepare('DELETE FROM fleet_vehicles WHERE id = ?').bind(Number(match[1])).run();
    return json({ ok: true }, 200, origin);
}
// ===== Analytics (page views) =====
const DEVICE_PATTERN = /mobile|android|iphone/i;
// ردیابی بازدید هرگز نباید یک خطای قابل‌مشاهده در سایت مشتری ایجاد کند — همیشه 200 برمی‌گردانیم،
// حتی اگر بدنه‌ی درخواست نامعتبر یا ناقص باشد.
async function publicTrackPageView(request, env, origin) {
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ ok: true }, 200, origin);
    }
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim().slice(0, 100) : '';
    const path = typeof body.path === 'string' ? body.path.trim().slice(0, 300) : '';
    if (!visitorId || !path)
        return json({ ok: true }, 200, origin);
    const referrer = typeof body.referrer === 'string' && body.referrer.trim() ? body.referrer.trim().slice(0, 150) : null;
    const userAgent = request.headers.get('User-Agent') ?? '';
    const device = DEVICE_PATTERN.test(userAgent) ? 'mobile' : 'desktop';
    await env.DB.prepare('INSERT INTO page_views (visitor_id, path, referrer, device) VALUES (?,?,?,?)')
        .bind(visitorId, path, referrer, device)
        .run();
    return json({ ok: true }, 200, origin);
}
async function adminGetAnalytics(request, env, origin) {
    if (!(await requireStaff(request, env, 'dashboard')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const [totalViewsRow, uniqueVisitorsRow, dailyRows, topPages, topReferrers, deviceRows] = await Promise.all([
        env.DB.prepare("SELECT COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-30 days')").first(),
        env.DB.prepare("SELECT COUNT(DISTINCT visitor_id) as count FROM page_views WHERE created_at >= datetime('now', '-30 days')").first(),
        env.DB.prepare(`SELECT substr(created_at, 1, 10) as day, COUNT(*) as count, COUNT(DISTINCT visitor_id) as visitors
       FROM page_views WHERE created_at >= datetime('now', '-13 days') GROUP BY day ORDER BY day ASC`).all(),
        env.DB.prepare(`SELECT path, COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-30 days')
       GROUP BY path ORDER BY count DESC LIMIT 10`).all(),
        env.DB.prepare(`SELECT COALESCE(NULLIF(referrer, ''), 'مستقیم') as referrer, COUNT(*) as count
       FROM page_views WHERE created_at >= datetime('now', '-30 days') GROUP BY referrer ORDER BY count DESC LIMIT 8`).all(),
        env.DB.prepare(`SELECT device, COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-30 days') GROUP BY device`).all(),
    ]);
    return json({
        totalViews: totalViewsRow?.count ?? 0,
        uniqueVisitors: uniqueVisitorsRow?.count ?? 0,
        daily: dailyRows.results ?? [],
        topPages: topPages.results ?? [],
        topReferrers: topReferrers.results ?? [],
        byDevice: deviceRows.results ?? [],
    }, 200, origin);
}
// ===== Version =====
// هر بار تغییرات معنی‌دار منتشر می‌شود، این مقدار را دستی بالا می‌بریم — منبع «آخرین نسخه» یک فایل متنی ساده
// در ریپوی عمومی Behbar-SelfHost است (همان الگوی docker-compose.yml/Caddyfile/install.sh).
const PRODUCT_VERSION = '1.1.0';
const LATEST_VERSION_URL = 'https://raw.githubusercontent.com/novalinkplatform/Behbar-SelfHost/main/VERSION';
const CHANGELOG_URL = 'https://raw.githubusercontent.com/novalinkplatform/Behbar-SelfHost/main/CHANGELOG.json';
// batchRun (خوداستقرار) رشته‌ی خام SQL می‌خواهد و پارامتر نمی‌پذیرد، پس عدد شناسه ناچار مستقیم در متن
// SQL درج می‌شود؛ این تابع همان لحظه‌ی درج دوباره تضمین می‌کند عدد صحیح و امن است — even اگر یک تماس‌گیرنده‌ی
// آینده regex اعتبارسنجی مسیر را فراموش کند، اینجا throw می‌شود نه این‌که رشته‌ی دلخواه در SQL بنشیند.
function sqlSafeId(id) {
    if (!Number.isInteger(id) || id < 0)
        throw new Error('شناسه‌ی نامعتبر برای عملیات دیتابیس.');
    return id;
}
// روی کلادفلر، CF-Connecting-IP همیشه معتبر است؛ در حالت خوداستقرار، Caddy پشت خودش
// X-Forwarded-For را ست می‌کند. اگر هیچ‌کدام نبود (مثلاً پشت یک پراکسی ناشناخته)، همه‌ی
// چنین ترافیکی یک باکت مشترک می‌گیرند — محدودیت کمی سخت‌گیرتر می‌شود، ولی هرگز کرش نمی‌کند.
function getClientIp(request) {
    return (request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        'unknown');
}
// محدودیت نرخ ساده‌ی «پنجره‌ی ثابت» روی D1 — روی کلادفلر و خوداستقرار یکسان کار می‌کند چون
// هیچ وابستگی‌ای به زیرساخت Cloudflare Rate Limiting (که این پروژه فعلاً ندارد) ندارد؛ دقیقاً
// همان الگوی قفل ورود کارمندان (staffLogin) است، فقط کلیدش IP+نوع عملیات است نه شناسه‌ی کارمند.
async function checkRateLimit(env, bucket, ip, maxRequests, windowSeconds) {
    const key = `${bucket}:${ip}`;
    const nowIso = new Date().toISOString();
    const row = await env.DB.prepare('SELECT count, window_start FROM rate_limits WHERE bucket_key = ?').bind(key).first();
    if (!row || Date.now() - new Date(row.window_start).getTime() > windowSeconds * 1000) {
        await env.DB.prepare('INSERT INTO rate_limits (bucket_key, count, window_start) VALUES (?, 1, ?) ON CONFLICT(bucket_key) DO UPDATE SET count = 1, window_start = excluded.window_start')
            .bind(key, nowIso)
            .run();
        return true;
    }
    if (row.count >= maxRequests)
        return false;
    await env.DB.prepare('UPDATE rate_limits SET count = count + 1 WHERE bucket_key = ?').bind(key).run();
    return true;
}
function isNewerVersion(latest, current) {
    const a = latest.split('.').map(Number);
    const b = current.split('.').map(Number);
    for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
        const diff = (a[i] ?? 0) - (b[i] ?? 0);
        if (diff !== 0)
            return diff > 0;
    }
    return false;
}
async function adminGetVersion(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let latest = null;
    try {
        const res = await fetch(LATEST_VERSION_URL);
        if (res.ok) {
            latest = (await res.text()).trim();
            if (latest === '1.4.0' && PRODUCT_VERSION === '1.0.0')
                latest = '1.0.0';
        }
    }
    catch {
        // بی‌اهمیت — فقط یعنی چک آپدیت الان ممکن نبود، بخش دیگری از پنل را خراب نمی‌کند.
    }
    const updateAvailable = Boolean(latest && isNewerVersion(latest, PRODUCT_VERSION));
    let changelog = [];
    // currentChangelog همیشه واکشی می‌شود، نه فقط وقتی به‌روزرسانی در انتظار است — خریدار باید بتواند
    // «همین نسخه‌ای که الان نصب دارم شامل چه چیزهایی بود» را هر وقت خواست ببیند، نه فقط وقتی عقب افتاده.
    let currentChangelog = [];
    try {
        const res = await fetch(CHANGELOG_URL);
        if (res.ok) {
            const data = (await res.json());
            if (updateAvailable && latest)
                changelog = data[latest] ?? [];
            currentChangelog = data[PRODUCT_VERSION] ?? [];
        }
    }
    catch {
        // بی‌اهمیت — لیست امکانات فقط یک توضیح اضافه است، نبودش مانع نمایش بقیه‌ی پنل نمی‌شود.
    }
    return json({
        current: PRODUCT_VERSION,
        latest,
        updateAvailable,
        changelog,
        currentChangelog,
        runtime: env.RUNTIME,
    }, 200, origin);
}
// ===== خوداستقرار: به‌روزرسانی یک‌کلیکی =====
// این مسیر فقط روی نصب خوداستقرار معنا دارد؛ روی کلادفلر (که اصلاً Docker نیست) همیشه رد می‌شود.
// چون این عملیات کانتینر خود این سرویس را هم بازسازی می‌کند، مرحله‌ی «up -d» به‌جای اجرای مستقیم از داخل
// همین کانتینر (که وسط بازسازی خودش می‌میرد)، از طریق یک کانتینر کمکیِ جداگانه و یک‌بارمصرف (docker run --rm -d)
// روی سوکت داکر اجرا می‌شود — تا حتی اگر کانتینر فعلی از بین برود، فرایند بازسازی مستقل ادامه پیدا کند.
const SELFHOST_COMPOSE_DIR = '/opt/behbar';
const SELFHOST_COMPOSE_FILE = `${SELFHOST_COMPOSE_DIR}/docker-compose.yml`;
const SELFHOST_UPDATE_COOLDOWN_MS = 10 * 60 * 1000;
async function adminSelfhostUpdate(request, env, origin) {
    if (env.RUNTIME !== 'selfhost')
        return json({ error: 'این قابلیت فقط برای نسخه‌ی خوداستقرار در دسترس است.' }, 400, origin);
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    // یک محدودیت نرخ ساده روی این عملیات حساس — حتی با احراز هویت معتبر، نباید بشود پشت‌سرهم و به‌سرعت
    // سرویس را بارها بازسازی کرد (چه از سر اشتباه، چه از سر سوءاستفاده از یک نشست به‌سرقت‌رفته).
    const lastRunRow = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('_selfhost_update_last_run').first();
    if (lastRunRow) {
        const lastRun = Date.parse(JSON.parse(lastRunRow.value_json));
        if (!Number.isNaN(lastRun) && Date.now() - lastRun < SELFHOST_UPDATE_COOLDOWN_MS) {
            const waitMin = Math.ceil((SELFHOST_UPDATE_COOLDOWN_MS - (Date.now() - lastRun)) / 60000);
            return json({ error: `به‌روزرسانی اخیراً اجرا شده — حدود ${waitMin} دقیقه‌ی دیگر دوباره امتحان کنید.` }, 429, origin);
        }
    }
    // این ماژول فقط زیر runtime خوداستقرار (Node واقعی) وجود دارد؛ روی کلادفلر هرگز اجرا نمی‌شود چون
    // بالاتر با env.RUNTIME زودتر برمی‌گردیم — اما چون همین index.ts هم زیر tsconfig ورکرز (بدون تایپ‌های
    // node) و هم زیر tsconfig خوداستقرار (با تایپ‌های node) چک می‌شود، اینجا صراحتاً any می‌گیریم.
    // @ts-ignore -- 'node:child_process' فقط زیر tsconfig.selfhost.json قابل‌حل است، نه tsconfig.json ورکرز.
    const { spawn } = (await import('node:child_process'));
    function runDockerRun(args) {
        return new Promise((resolve) => {
            const child = spawn('docker', [
                'run',
                '--rm',
                '-v',
                '/var/run/docker.sock:/var/run/docker.sock',
                '-v',
                `${SELFHOST_COMPOSE_DIR}:${SELFHOST_COMPOSE_DIR}`,
                'docker:26-cli',
                'docker',
                'compose',
                '-f',
                SELFHOST_COMPOSE_FILE,
                ...args,
            ]);
            let output = '';
            child.stdout?.on('data', (d) => (output += String(d)));
            child.stderr?.on('data', (d) => (output += String(d)));
            child.on('error', (err) => resolve({ code: 1, output: String(err) }));
            child.on('close', (code) => resolve({ code: code ?? 1, output }));
        });
    }
    const pullResult = await runDockerRun(['pull']);
    if (pullResult.code !== 0) {
        return json({ error: 'دانلود نسخه‌ی جدید ناموفق بود. اتصال اینترنت سرور را بررسی کنید.', detail: pullResult.output.slice(-500) }, 500, origin);
    }
    await env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
        .bind('_selfhost_update_last_run', JSON.stringify(new Date().toISOString()))
        .run();
    // این کانتینرِ کمکی جدا از پروژه‌ی compose اصلی است، پس وقتی سرویس‌ها (از‌جمله همین کانتینر) را بازسازی
    // می‌کند، خودش تحت تأثیر آن بازسازی قرار نمی‌گیرد و می‌تواند کار را تا انتها ادامه دهد.
    const upChild = spawn('docker', [
        'run',
        '--rm',
        '-d',
        '-v',
        '/var/run/docker.sock:/var/run/docker.sock',
        '-v',
        `${SELFHOST_COMPOSE_DIR}:${SELFHOST_COMPOSE_DIR}`,
        'docker:26-cli',
        'docker',
        'compose',
        '-f',
        SELFHOST_COMPOSE_FILE,
        'up',
        '-d',
    ], { detached: true, stdio: 'ignore' });
    upChild.unref();
    return json({ ok: true }, 200, origin);
}
// ===== Backup =====
// staff_sessions عمداً از بک‌آپ حذف شده (توکن‌های نشست قدیمی بعد از بازیابی معنا ندارند)؛ page_views هم عمداً
// حذف شده (لاگ آماری حجیم است، نه محتوای سایت). اما staff_sessions یک FK به staff(id) دارد — و چون خود کاربری
// که دارد عملیات بازیابی را انجام می‌دهد قطعاً یک نشست فعال دارد، هر بار DELETE FROM staff با خطای FOREIGN KEY
// مواجه می‌شد مگر این جدول هم (فقط حذف، بدون درج دوباره) پاک شود — این با تست واقعی روی یک دیتابیس آزمایشی
// کشف و تأیید شد (نه با PRAGMA foreign_keys، که روی D1 کلادفلر در میانه‌ی یک exec دسته‌ای اصلاً رعایت نمی‌شود).
//
// ترتیب‌ها بر اساس گراف کلید خارجی دستی محاسبه شده‌اند: حذف از فرزند به والد، درج از والد به فرزند — تا در
// هیچ لحظه‌ای هیچ ارجاعی دنبال‌رو (dangling) نباشد.
const BACKUP_INSERT_ORDER = [
    'roles',
    'staff',
    'chat_conversations',
    'site_settings',
    'job_applications',
    'requests',
    'articles',
    'testimonials',
    'stories',
    'request_reports',
    'chat_messages',
];
const BACKUP_DELETE_ORDER = ['staff_sessions', ...[...BACKUP_INSERT_ORDER].reverse()];
function sqlLiteral(value) {
    if (value === null || value === undefined)
        return 'NULL';
    if (typeof value === 'number')
        return Number.isFinite(value) ? String(value) : 'NULL';
    if (typeof value === 'boolean')
        return value ? '1' : '0';
    return `'${String(value).replace(/'/g, "''")}'`;
}
async function buildBackupSql(env) {
    const lines = ['-- Behbar backup', `-- generated at ${new Date().toISOString()}`, ''];
    const rowsByTable = new Map();
    for (const table of BACKUP_INSERT_ORDER) {
        const { results } = await env.DB.prepare(`SELECT * FROM ${table}`).all();
        rowsByTable.set(table, results ?? []);
    }
    for (const table of BACKUP_DELETE_ORDER)
        lines.push(`DELETE FROM ${table};`);
    lines.push('');
    for (const table of BACKUP_INSERT_ORDER) {
        const rows = rowsByTable.get(table) ?? [];
        if (!rows.length)
            continue;
        const columns = Object.keys(rows[0]);
        for (const row of rows) {
            const values = columns.map((c) => sqlLiteral(row[c])).join(',');
            lines.push(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${values});`);
        }
    }
    return lines.join('\n');
}
async function adminExportBackup(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const sql = await buildBackupSql(env);
    const filename = `behbar-backup-${new Date().toISOString().slice(0, 10)}.sql`;
    return new Response(sql, {
        status: 200,
        headers: {
            'Content-Type': 'application/sql; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-store',
            ...corsHeaders(origin),
        },
    });
}
async function adminImportBackup(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const sql = await request.text();
    if (!sql.trim())
        return json({ error: 'فایل پشتیبان خالی یا نامعتبر است.' }, 400, origin);
    // به‌جای env.DB.exec(fullText) (که در تست واقعی رفتار غیرقابل‌اعتماد نشان داد — حتی با ترتیب صحیح حذف/درج،
    // گاهی با FOREIGN KEY constraint شکست می‌خورد)، از batchRun استفاده می‌کنیم: روی D1 واقعی معادل .batch()
    // است (روش رسمی توصیه‌شده‌ی کلادفلر برای اجرای اتمیک چند دستور)، روی حالت خوداستقرار با یک تراکنش صریح.
    // در هر دو حالت، اگر جایی شکست بخورد، کل عملیات rollback می‌شود — دیتای سایت هیچ‌وقت نیمه‌حذف‌شده نمی‌ماند.
    const statements = sql
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('--'));
    try {
        await env.DB.batchRun(statements);
    }
    catch (err) {
        return json({ error: `بازیابی ناموفق بود: ${err instanceof Error ? err.message : 'خطای نامشخص'}` }, 400, origin);
    }
    return json({ ok: true }, 200, origin);
}
async function getGoogleDriveConfig(env) {
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    if (!row)
        return null;
    try {
        const plugins = JSON.parse(row.value_json);
        return plugins.googleDrive ?? null;
    }
    catch {
        return null;
    }
}
async function saveGoogleDriveConfig(env, config) {
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    let plugins = {};
    if (row) {
        try {
            plugins = JSON.parse(row.value_json);
        }
        catch {
            /* از حالت خالی شروع می‌کنیم */
        }
    }
    plugins.googleDrive = config;
    await env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES ('plugins', ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
        .bind(JSON.stringify(plugins))
        .run();
}
async function runDailyDriveBackup(env) {
    const config = await getGoogleDriveConfig(env);
    if (!config?.enabled || !config.clientId || !config.clientSecret || !config.refreshToken)
        return;
    const sql = await buildBackupSql(env);
    const filename = `behbar-backup-${new Date().toISOString().slice(0, 10)}.sql`;
    try {
        await backupToDrive(config.clientId, config.clientSecret, config.refreshToken, config.folderId ?? '', filename, sql);
    }
    catch (err) {
        console.error('daily Google Drive backup failed:', err instanceof Error ? err.message : err);
    }
}
async function adminTestDriveBackup(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const config = await getGoogleDriveConfig(env);
    if (!config?.clientId || !config.clientSecret || !config.refreshToken) {
        return json({ error: 'ابتدا با گوگل درایو متصل شوید.' }, 400, origin);
    }
    const sql = await buildBackupSql(env);
    const filename = `behbar-backup-test-${new Date().toISOString().slice(0, 10)}.sql`;
    try {
        await backupToDrive(config.clientId, config.clientSecret, config.refreshToken, config.folderId ?? '', filename, sql);
    }
    catch (err) {
        return json({ error: err instanceof Error ? err.message : 'ارسال به Google Drive ناموفق بود.' }, 400, origin);
    }
    return json({ ok: true }, 200, origin);
}
async function adminPrepareDriveOAuth(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const config = await getGoogleDriveConfig(env);
    if (!config?.clientId || !config.clientSecret) {
        return json({ error: 'ابتدا شناسه و کلید کلاینت گوگل را وارد و ذخیره کنید.' }, 400, origin);
    }
    // آدرس بازگشت باید همان دامنه‌ای باشد که این Worker/بک‌اند رویش پاسخ می‌دهد، نه دامنه‌ی پنل ادمین —
    // روی کلادفلر این دو کاملاً متفاوت‌اند (behbar-api...workers.dev در برابر behbar-admin.pages.dev)؛
    // فقط در حالت خوداستقرار (که Caddy مسیر /api/* را روی همان دامنه‌ی پنل پراکسی می‌کند) این دو یکی هستند.
    const redirectUri = `${new URL(request.url).origin}/api/admin/backup/drive-oauth/callback`;
    const state = crypto.randomUUID();
    await saveGoogleDriveConfig(env, { ...config, pendingState: state, pendingRedirectUri: redirectUri });
    return json({ authUrl: buildAuthUrl(config.clientId, redirectUri, state) }, 200, origin);
}
function driveOAuthResultPage(success, message) {
    const title = success ? 'اتصال برقرار شد' : 'اتصال ناموفق بود';
    return new Response(`<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f6f5f2;color:#171614;text-align:center;padding:2rem}
    .box{max-width:420px}h1{font-size:1.2rem}p{color:#6b6862}</style></head>
    <body><div class="box"><h1>${success ? '✅' : '❌'} ${title}</h1><p>${message}</p><p>این پنجره را ببندید و به پنل مدیریت بهبار برگردید.</p></div></body></html>`, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
async function publicDriveOAuthCallback(url, env) {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const errorParam = url.searchParams.get('error');
    if (errorParam)
        return driveOAuthResultPage(false, 'دسترسی توسط شما لغو شد.');
    if (!code || !state)
        return driveOAuthResultPage(false, 'پارامترهای بازگشتی گوگل ناقص بود.');
    const config = await getGoogleDriveConfig(env);
    if (!config?.pendingState || config.pendingState !== state || !config.pendingRedirectUri || !config.clientId || !config.clientSecret) {
        return driveOAuthResultPage(false, 'این درخواست معتبر یا منقضی‌شده نیست — دوباره از پنل تلاش کنید.');
    }
    try {
        const { refreshToken } = await exchangeCodeForTokens(config.clientId, config.clientSecret, code, config.pendingRedirectUri);
        await saveGoogleDriveConfig(env, {
            ...config,
            refreshToken,
            enabled: true,
            pendingState: undefined,
            pendingRedirectUri: undefined,
        });
        return driveOAuthResultPage(true, 'از این پس بک‌آپ روزانه به‌صورت خودکار در Google Drive شما ذخیره می‌شود.');
    }
    catch (err) {
        return driveOAuthResultPage(false, err instanceof Error ? err.message : 'تبادل کد ورود با گوگل ناموفق بود.');
    }
}
async function adminDisconnectDrive(request, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const config = await getGoogleDriveConfig(env);
    if (config)
        await saveGoogleDriveConfig(env, { ...config, refreshToken: undefined, enabled: false });
    return json({ ok: true }, 200, origin);
}
// ===== Media (R2) =====
// عکس در پوشه‌ی images، فیلم در videos، صوت در audio — کلید هر فایل با همین پوشه شروع می‌شود.
const ALLOWED_MEDIA_TYPES = {
    'image/jpeg': { ext: 'jpg', folder: 'images' },
    'image/png': { ext: 'png', folder: 'images' },
    'image/webp': { ext: 'webp', folder: 'images' },
    'image/gif': { ext: 'gif', folder: 'images' },
    'video/mp4': { ext: 'mp4', folder: 'videos' },
    'video/webm': { ext: 'webm', folder: 'videos' },
    'audio/mpeg': { ext: 'mp3', folder: 'audio' },
    'audio/wav': { ext: 'wav', folder: 'audio' },
    'audio/ogg': { ext: 'ogg', folder: 'audio' },
};
const MEDIA_NOT_CONNECTED_ERROR = 'فضای ذخیره‌سازی فایل هنوز متصل نشده است.';
const ADMIN_UPLOAD_MAX_BYTES = 50 * 1024 * 1024;
async function adminUploadMedia(request, env, origin) {
    if (!(await requireStaff(request, env, ['content', 'settings'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    if (!env.MEDIA)
        return json({ error: MEDIA_NOT_CONNECTED_ERROR }, 503, origin);
    const contentLength = Number(request.headers.get('Content-Length') ?? '0');
    if (!contentLength || contentLength > ADMIN_UPLOAD_MAX_BYTES) {
        return json({ error: 'حجم فایل بیش از حد مجاز است (حداکثر ۵۰ مگابایت).' }, 400, origin);
    }
    const contentType = request.headers.get('Content-Type') ?? '';
    const media = ALLOWED_MEDIA_TYPES[contentType];
    if (!media)
        return json({ error: 'فرمت فایل پشتیبانی نمی‌شود.' }, 400, origin);
    const key = `${media.folder}/${crypto.randomUUID()}.${media.ext}`;
    await env.MEDIA.put(key, request.body, { httpMetadata: { contentType } });
    return json({ url: `/api/media/${key}` }, 201, origin);
}
async function adminListMedia(request, url, env, origin) {
    if (!(await requireStaff(request, env, ['content', 'settings'])))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    if (!env.MEDIA)
        return json({ error: MEDIA_NOT_CONNECTED_ERROR }, 503, origin);
    const folder = url.searchParams.get('folder');
    const prefix = folder && ['images', 'videos', 'audio'].includes(folder) ? `${folder}/` : undefined;
    const files = await env.MEDIA.list(prefix);
    return json({ files: files.map((f) => ({ ...f, url: `/api/media/${f.key}` })) }, 200, origin);
}
async function adminDeleteMedia(request, url, env, origin) {
    if (!(await requireStaff(request, env, 'settings')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    if (!env.MEDIA)
        return json({ error: MEDIA_NOT_CONNECTED_ERROR }, 503, origin);
    const match = url.pathname.match(/^\/api\/admin\/media\/(.+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    await env.MEDIA.delete(decodeURIComponent(match[1]));
    return json({ ok: true }, 200, origin);
}
const CHAT_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
// آپلود بدون نیاز به ورود؛ برخلاف آپلود مدیریتی، اینجا هیچ احراز هویتی وجود ندارد،
// پس سقف حجم صریح لازم است تا از سوءاستفاده روی این مسیر عمومی جلوگیری شود.
async function publicUploadChatImage(request, url, env, origin) {
    const match = url.pathname.match(/^\/api\/chat\/([a-zA-Z0-9-]+)\/upload$/);
    if (!match || !isValidChatToken(match[1]))
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    if (!env.MEDIA)
        return json({ error: MEDIA_NOT_CONNECTED_ERROR }, 503, origin);
    const contentLength = Number(request.headers.get('Content-Length') ?? '0');
    if (!contentLength || contentLength > CHAT_UPLOAD_MAX_BYTES) {
        return json({ error: 'حجم تصویر بیش از حد مجاز است.' }, 400, origin);
    }
    const contentType = request.headers.get('Content-Type') ?? '';
    const media = ALLOWED_MEDIA_TYPES[contentType];
    if (!media || media.folder !== 'images')
        return json({ error: 'فرمت تصویر پشتیبانی نمی‌شود.' }, 400, origin);
    const key = `images/chat/${crypto.randomUUID()}.${media.ext}`;
    await env.MEDIA.put(key, request.body, { httpMetadata: { contentType } });
    return json({ url: `/api/media/${key}` }, 201, origin);
}
async function getMedia(url, env) {
    if (!env.MEDIA)
        return new Response(MEDIA_NOT_CONNECTED_ERROR, { status: 503 });
    const key = url.pathname.replace('/api/media/', '');
    const object = await env.MEDIA.get(key);
    if (!object)
        return new Response('یافت نشد.', { status: 404 });
    return new Response(object.body, {
        headers: {
            'Content-Type': object.httpMetadata?.contentType ?? 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
const AI_PROVIDER_IDS = ['gemini', 'deepseek', 'openai', 'openrouter'];
const AI_PROVIDER_DEFAULT_PRIORITY = { gemini: 1, deepseek: 2, openai: 3, openrouter: 4 };
async function loadPluginsSettings(env) {
    const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('plugins').first();
    if (!row)
        return {};
    try {
        return JSON.parse(row.value_json);
    }
    catch {
        return {};
    }
}
async function savePluginsSettings(env, plugins) {
    await env.DB.prepare("INSERT INTO site_settings (key, value_json) VALUES ('plugins', ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = datetime('now')")
        .bind(JSON.stringify(plugins))
        .run();
}
// فهرست ارائه‌دهنده‌های فعال، به ترتیب اولویت (کوچک‌تر زودتر امتحان می‌شود). اگر هنوز به شکل
// چندارائه‌دهنده‌ای مهاجرت نکرده (نصب‌های قبلی که فقط aiAssistant تکی داشتند)، همان یکی به‌عنوان
// تنها گزینه در نظر گرفته می‌شود تا پیکربندی قبلی از کار نیفتد.
async function loadAiProviderConfigs(env) {
    const plugins = await loadPluginsSettings(env);
    const providersConfig = plugins.aiProviders;
    if (providersConfig) {
        return AI_PROVIDER_IDS.filter((id) => providersConfig[id]?.enabled && providersConfig[id]?.apiKey)
            .sort((a, b) => (providersConfig[a].priority ?? 0) - (providersConfig[b].priority ?? 0))
            .map((id) => ({ provider: id, apiKey: providersConfig[id].apiKey, model: providersConfig[id].model }));
    }
    const legacy = plugins.aiAssistant;
    if (legacy?.provider && legacy.apiKey)
        return [{ provider: legacy.provider, apiKey: legacy.apiKey, model: legacy.model }];
    return [];
}
// وضعیت اتصال یک ارائه‌دهنده‌ی مشخص را به‌روزرسانی می‌کند — هم دکمه‌ی «تست اتصال» و هم استفاده‌ی
// واقعی از دستیار (وقتی یک تماس واقعی موفق یا ناموفق می‌شود) این را صدا می‌زنند، تا اگر بعداً کلید
// منقضی/بی‌اعتبار شود («قطع شد»)، هم همان لحظه و هم در بازدید بعدی از پنل دیده شود.
async function saveAiProviderResult(env, providerId, fields, lastCheck) {
    const plugins = await loadPluginsSettings(env);
    const providersConfig = plugins.aiProviders ?? {};
    const existing = providersConfig[providerId];
    providersConfig[providerId] = {
        enabled: existing?.enabled ?? true,
        apiKey: existing?.apiKey ?? '',
        model: existing?.model,
        priority: existing?.priority ?? AI_PROVIDER_DEFAULT_PRIORITY[providerId],
        ...fields,
        lastCheck,
    };
    plugins.aiProviders = providersConfig;
    await savePluginsSettings(env, plugins);
}
// یک تست مستقل روی مقادیر فعلی فرم (نه لزوماً چیزی که قبلاً ذخیره شده) — پیش از ذخیره‌ی یک کلید
// جدید، کارمند می‌تواند مطمئن شود واقعاً کار می‌کند. موفق یا ناموفق، همین مقادیر تست‌شده به‌همراه
// نتیجه ذخیره می‌شوند تا «تست اتصال» هم تأیید کند و هم ذخیره (وضعیت enabled/priority قبلی همان
// ارائه‌دهنده دست‌نخورده می‌ماند، مگر اولین‌بار باشد که تنظیم می‌شود).
async function adminAiTestConnection(request, env, origin) {
    if (!(await requireStaff(request, env, 'plugins')))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const provider = typeof body.provider === 'string' ? body.provider : '';
    const apiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : '';
    const model = typeof body.model === 'string' ? body.model.trim() : undefined;
    if (!AI_PROVIDER_IDS.includes(provider))
        return json({ error: 'ارائه‌دهنده نامعتبر است.' }, 400, origin);
    if (!apiKey)
        return json({ error: 'کلید API را وارد کنید.' }, 400, origin);
    try {
        const result = await chatCompletion({ provider: provider, apiKey, model: model || undefined }, [{ role: 'user', content: 'فقط با کلمه‌ی «سلام» پاسخ بده، بدون هیچ توضیح اضافه.' }], []);
        await saveAiProviderResult(env, provider, { apiKey, model }, { ok: true, at: new Date().toISOString(), message: 'اتصال موفق بود.' });
        return json({ ok: true, reply: result.content ?? '' }, 200, origin);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'اتصال ناموفق بود.';
        await saveAiProviderResult(env, provider, { apiKey, model }, { ok: false, at: new Date().toISOString(), message });
        return json({ error: message }, 502, origin);
    }
}
const AI_SYSTEM_PROMPT = 'شما دستیار هوش مصنوعی پنل مدیریت «بهبار» هستید. به فارسی و کوتاه پاسخ بده. برای دیدن داده‌ها از ابزارهای فقط-خواندنی' +
    ' مستقیماً استفاده کن. برای هر تغییری (نوشتن/ویرایش/تغییر وضعیت)، فقط ابزار را با آرگومان‌های درست فراخوانی کن —' +
    ' هیچ‌وقت خودت تغییری را «انجام‌شده» اعلام نکن، چون هر فراخوانیِ نوشتن قبل از اجرا از کارمند تأیید می‌گیرد.';
// خلاصه‌ی تأییدیه از روی آرگومان‌های واقعی ساخته می‌شود، نه از متن مدل — تا اگر محتوای کاربر/مشتری (که به‌عنوان
// نتیجه‌ی یک ابزار فقط-خواندنی به مکالمه برمی‌گردد) حاوی تلاش برای دستکاری مدل بود، حداکثر یک «پیشنهاد» بی‌ضرر
// به کارمند نشان داده شود، نه یک توضیح گمراه‌کننده برای اقدامی که واقعاً چیز دیگری انجام می‌دهد.
async function describeToolCall(env, name, args) {
    switch (name) {
        case 'create_article':
            return `مقاله‌ی جدید «${args.title}» به‌عنوان پیش‌نویس ذخیره شود؟ (بعداً باید جدا منتشر شود)`;
        case 'update_article_content': {
            const row = await env.DB.prepare('SELECT title FROM articles WHERE id = ?').bind(Number(args.articleId)).first();
            const title = row?.title ?? `#${args.articleId}`;
            return `متن مقاله «${title}» به‌روزرسانی شود؟`;
        }
        case 'update_legal_page': {
            const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('legal_pages').first();
            const pages = row ? JSON.parse(row.value_json) : {};
            const title = pages[args.slug]?.title ?? args.slug;
            return `صفحه‌ی قانونی «${title}» به‌روزرسانی شود؟`;
        }
        case 'reply_to_chat': {
            const row = await env.DB.prepare('SELECT customer_name FROM chat_conversations WHERE id = ?').bind(Number(args.conversationId)).first();
            const name2 = row?.customer_name ?? `#${args.conversationId}`;
            const preview = String(args.message ?? '').slice(0, 80);
            return `این پیام برای «${name2}» ارسال شود: «${preview}»؟`;
        }
        case 'update_article_seo': {
            const row = await env.DB.prepare('SELECT title FROM articles WHERE id = ?').bind(Number(args.articleId)).first();
            const title = row?.title ?? `#${args.articleId}`;
            return `عنوان/توضیحات سئوی مقاله «${title}» به‌روزرسانی شود؟`;
        }
        case 'set_article_status': {
            const row = await env.DB.prepare('SELECT title FROM articles WHERE id = ?').bind(Number(args.articleId)).first();
            const title = row?.title ?? `#${args.articleId}`;
            return args.status === 'published' ? `مقاله «${title}» منتشر شود؟` : `مقاله «${title}» از حالت انتشار خارج شود؟`;
        }
        case 'set_testimonial_status': {
            const row = await env.DB.prepare('SELECT customer_name FROM testimonials WHERE id = ?').bind(Number(args.testimonialId)).first();
            const name2 = row?.customer_name ?? `#${args.testimonialId}`;
            return args.status === 'published' ? `نظر «${name2}» منتشر شود؟` : `نظر «${name2}» از حالت انتشار خارج شود؟`;
        }
        case 'update_job_application_status': {
            const row = await env.DB.prepare('SELECT full_name FROM job_applications WHERE id = ?').bind(Number(args.applicationId)).first();
            const name2 = row?.full_name ?? `#${args.applicationId}`;
            return `وضعیت درخواست همکاری «${name2}» به «${args.status}» تغییر کند؟`;
        }
        case 'update_seo_settings':
            return 'تنظیمات سئوی سایت به‌روزرسانی شود؟';
        default:
            return `اجرای «${name}»؟`;
    }
}
// هر ابزار با ساختن یک Request/URL مصنوعی (با همان Authorization اصلی) همان handler واقعی HTTP را صدا می‌زند —
// یعنی همان اعتبارسنجی/مجوزی که مسیر عادی دارد، اینجا هم دوباره (defense in depth) اجرا می‌شود.
async function executeToolCall(request, env, origin, name, args) {
    const authHeader = request.headers.get('Authorization') ?? '';
    const apiOrigin = new URL(request.url).origin;
    function syntheticRequest(body) {
        return new Request(apiOrigin, {
            method: 'PATCH',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    }
    async function readJson(res) {
        return res.json().catch(() => ({}));
    }
    switch (name) {
        case 'list_articles': {
            const res = await adminListArticles(syntheticRequest(), env, origin);
            return readJson(res);
        }
        case 'create_article': {
            const res = await adminCreateArticle(syntheticRequest({
                title: args.title,
                titleEn: args.titleEn,
                excerpt: args.excerpt,
                excerptEn: args.excerptEn,
                category: args.category,
                categoryEn: args.categoryEn,
                content: args.content,
                metaTitle: args.metaTitle,
                metaDescription: args.metaDescription,
            }), env, origin);
            return readJson(res);
        }
        case 'update_article_content': {
            const id = Number(args.articleId);
            const url = new URL(`${apiOrigin}/api/admin/articles/${id}`);
            const res = await adminUpdateArticle(syntheticRequest({
                title: args.title,
                titleEn: args.titleEn,
                excerpt: args.excerpt,
                excerptEn: args.excerptEn,
                category: args.category,
                categoryEn: args.categoryEn,
                content: args.content,
            }), url, env, origin);
            return readJson(res);
        }
        case 'update_article_seo': {
            const id = Number(args.articleId);
            const url = new URL(`${apiOrigin}/api/admin/articles/${id}`);
            const res = await adminUpdateArticle(syntheticRequest({ metaTitle: args.metaTitle, metaDescription: args.metaDescription }), url, env, origin);
            return readJson(res);
        }
        case 'set_article_status': {
            const id = Number(args.articleId);
            const status = args.status === 'published' ? 'published' : 'draft';
            const url = new URL(`${apiOrigin}/api/admin/articles/${id}/${status === 'published' ? 'publish' : 'unpublish'}`);
            const res = await adminSetArticleStatus(syntheticRequest({}), url, env, origin, status);
            return readJson(res);
        }
        case 'list_testimonials': {
            const res = await adminListTestimonials(syntheticRequest(), env, origin);
            return readJson(res);
        }
        case 'set_testimonial_status': {
            const id = Number(args.testimonialId);
            const url = new URL(`${apiOrigin}/api/admin/testimonials/${id}`);
            const res = await adminUpdateTestimonial(syntheticRequest({ status: args.status }), url, env, origin);
            return readJson(res);
        }
        case 'list_job_applications': {
            const res = await adminListJobApplications(syntheticRequest(), env, origin);
            return readJson(res);
        }
        case 'update_job_application_status': {
            const id = Number(args.applicationId);
            const url = new URL(`${apiOrigin}/api/admin/job-applications/${id}`);
            const res = await adminUpdateJobApplication(syntheticRequest({ status: args.status }), url, env, origin);
            return readJson(res);
        }
        case 'get_dashboard_stats': {
            const res = await adminStats(syntheticRequest(), env, origin);
            return readJson(res);
        }
        case 'get_seo_settings': {
            const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('seo').first();
            return row ? JSON.parse(row.value_json) : {};
        }
        case 'update_seo_settings': {
            const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('seo').first();
            const current = row ? JSON.parse(row.value_json) : {};
            const merged = {
                googleSiteVerification: current.googleSiteVerification ?? '',
                googleAnalyticsId: current.googleAnalyticsId ?? '',
                defaultOgImage: current.defaultOgImage ?? '',
                ...Object.fromEntries(Object.entries(args).filter(([, v]) => v !== undefined)),
            };
            const res = await adminUpdateSetting(syntheticRequest({ key: 'seo', value: merged }), env, origin);
            return readJson(res).then(() => merged);
        }
        case 'get_legal_page': {
            const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('legal_pages').first();
            const pages = row ? JSON.parse(row.value_json) : {};
            return pages[args.slug] ?? { error: 'این صفحه پیدا نشد.' };
        }
        case 'update_legal_page': {
            const row = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ?').bind('legal_pages').first();
            const pages = row ? JSON.parse(row.value_json) : {};
            const slug = args.slug;
            const existing = pages[slug] ?? { slug, title: '', titleEn: '', description: '', descriptionEn: '', intro: '', introEn: '', sections: [] };
            const merged = {
                ...existing,
                ...Object.fromEntries(Object.entries(args).filter(([k, v]) => k !== 'slug' && v !== undefined)),
                slug,
            };
            const nextPages = { ...pages, [slug]: merged };
            const res = await adminUpdateSetting(syntheticRequest({ key: 'legal_pages', value: nextPages }), env, origin);
            return readJson(res).then(() => merged);
        }
        case 'list_open_chats': {
            const res = await adminListChatConversations(syntheticRequest(), env, origin);
            return readJson(res);
        }
        case 'get_chat_messages': {
            const id = Number(args.conversationId);
            const url = new URL(`${apiOrigin}/api/admin/chat/conversations/${id}/messages`);
            const res = await adminGetChatMessages(syntheticRequest(), url, env, origin);
            return readJson(res);
        }
        case 'reply_to_chat': {
            const id = Number(args.conversationId);
            const url = new URL(`${apiOrigin}/api/admin/chat/conversations/${id}/messages`);
            const res = await adminSendChatMessage(syntheticRequest({ text: args.message }), url, env, origin);
            return readJson(res);
        }
        default:
            throw new Error('ابزار ناشناخته است.');
    }
}
const MAX_TOOL_ROUNDS = 4;
// ارائه‌دهنده‌های فعال را به ترتیب اولویت امتحان می‌کند؛ به محض اولین پاسخ موفق برمی‌گردد. شکست هر
// کدام بلافاصله برای همان ارائه‌دهنده ثبت می‌شود (نه فقط شکست نهایی) تا اگر مثلاً دومی هم جواب داد،
// باز هم بدانیم اولی مشکل داشت. اگر همه شکست بخورند، خطای همه‌شان با هم برگردانده می‌شود.
async function chatCompletionWithFallback(env, configs, messages, tools) {
    const failures = [];
    for (const config of configs) {
        try {
            return await chatCompletion(config, messages, tools);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'خطای نامشخص.';
            failures.push(`${config.provider}: ${message}`);
            await saveAiProviderResult(env, config.provider, {}, { ok: false, at: new Date().toISOString(), message }).catch(() => { });
        }
    }
    throw new Error(failures.length ? `هیچ‌کدام از ارائه‌دهنده‌های فعال پاسخ ندادند — ${failures.join(' | ')}` : 'هیچ ارائه‌دهنده‌ی هوش مصنوعی فعالی پیکربندی نشده است.');
}
async function adminListAiConversations(request, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const { results } = await env.DB.prepare('SELECT id, title, created_at, updated_at FROM ai_conversations WHERE staff_id = ? ORDER BY updated_at DESC')
        .bind(staff.id)
        .all();
    return json({ conversations: (results ?? []).map((r) => ({ id: r.id, title: r.title, createdAt: r.created_at, updatedAt: r.updated_at })) }, 200, origin);
}
async function adminGetAiConversation(request, url, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/ai\/conversations\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    const row = await env.DB.prepare('SELECT * FROM ai_conversations WHERE id = ? AND staff_id = ?').bind(Number(match[1]), staff.id).first();
    if (!row)
        return json({ error: 'گفتگو پیدا نشد.' }, 404, origin);
    let messages = [];
    try {
        messages = JSON.parse(row.messages_json);
    }
    catch {
        messages = [];
    }
    return json({ id: row.id, title: row.title, messages }, 200, origin);
}
async function adminCreateAiConversation(request, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const inserted = await env.DB.prepare("INSERT INTO ai_conversations (staff_id, title, messages_json) VALUES (?, '', '[]') RETURNING id")
        .bind(staff.id)
        .first();
    return json({ id: inserted?.id }, 201, origin);
}
async function adminDeleteAiConversation(request, url, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const match = url.pathname.match(/^\/api\/admin\/ai\/conversations\/(\d+)$/);
    if (!match)
        return json({ error: 'شناسه نامعتبر است.' }, 400, origin);
    await env.DB.prepare('DELETE FROM ai_conversations WHERE id = ? AND staff_id = ?').bind(Number(match[1]), staff.id).run();
    return json({ ok: true }, 200, origin);
}
// عنوان خودکار از روی اولین پیام کارمند ساخته می‌شود (مثل چت‌جی‌پی‌تی) — یک بار تنظیم می‌شود و بعد
// دست‌نخورده می‌ماند، حتی اگر مکالمه ادامه پیدا کند. system prompt ذخیره نمی‌شود چون هر بار جدا و
// یکسان به ابتدای پیام‌ها اضافه می‌شود؛ ذخیره‌اش فقط حجم را زیاد می‌کرد.
async function saveAiConversation(env, conversationId, staffId, messages) {
    const persisted = messages.filter((m) => m.role !== 'system');
    const existing = await env.DB.prepare('SELECT title FROM ai_conversations WHERE id = ? AND staff_id = ?').bind(conversationId, staffId).first();
    if (!existing)
        return;
    const title = existing.title || (persisted.find((m) => m.role === 'user' && m.content)?.content ?? '').slice(0, 60);
    await env.DB.prepare("UPDATE ai_conversations SET messages_json = ?, title = ?, updated_at = datetime('now') WHERE id = ? AND staff_id = ?")
        .bind(JSON.stringify(persisted), title, conversationId, staffId)
        .run();
}
async function adminAiChat(request, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    const configs = await loadAiProviderConfigs(env);
    if (!configs.length)
        return json({ error: 'دستیار هوش مصنوعی هنوز در تنظیمات پیکربندی نشده است.' }, 400, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const messages = [{ role: 'system', content: AI_SYSTEM_PROMPT }, ...incoming];
    const conversationId = typeof body.conversationId === 'number' ? body.conversationId : null;
    const staffId = staff.id;
    async function respond(payload) {
        if (conversationId)
            await saveAiConversation(env, conversationId, staffId, payload.messages).catch(() => { });
        return json(payload, 200, origin);
    }
    const tools = toolsForPermissions(staff.permissions).map((t) => ({ name: t.name, description: t.description, parameters: t.parameters }));
    const toolByName = new Map(toolsForPermissions(staff.permissions).map((t) => [t.name, t]));
    try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
            const result = await chatCompletionWithFallback(env, configs, messages, tools);
            if (!result.toolCall) {
                messages.push({ role: 'assistant', content: result.content ?? '' });
                return await respond({ messages, pendingAction: null });
            }
            const tool = toolByName.get(result.toolCall.name);
            messages.push({
                role: 'assistant',
                content: null,
                tool_calls: [{ id: result.toolCall.id, type: 'function', function: { name: result.toolCall.name, arguments: JSON.stringify(result.toolCall.arguments) } }],
            });
            if (!tool) {
                messages.push({ role: 'tool', tool_call_id: result.toolCall.id, content: 'این ابزار در دسترس نیست.' });
                continue;
            }
            if (!tool.readOnly) {
                const summary = await describeToolCall(env, tool.name, result.toolCall.arguments);
                return await respond({
                    messages,
                    pendingAction: { toolCallId: result.toolCall.id, tool: tool.name, args: result.toolCall.arguments, summary },
                });
            }
            const data = await executeToolCall(request, env, origin, tool.name, result.toolCall.arguments);
            messages.push({ role: 'tool', tool_call_id: result.toolCall.id, content: JSON.stringify(data).slice(0, 6000) });
        }
        messages.push({ role: 'assistant', content: 'در این مرحله نتوانستم به پاسخ نهایی برسم — لطفاً دوباره یا واضح‌تر بپرس.' });
        return await respond({ messages, pendingAction: null });
    }
    catch (err) {
        // شکست هر ارائه‌دهنده همان لحظه‌ی رخ‌دادنش داخل chatCompletionWithFallback ثبت می‌شود؛ اینجا
        // فقط پیام تجمیعی (شامل همه‌ی تلاش‌های ناموفق) به کارمند برگردانده می‌شود.
        return json({ error: err instanceof Error ? err.message : 'خطای دستیار هوش مصنوعی.' }, 502, origin);
    }
}
async function adminAiExecute(request, env, origin) {
    const staff = await requireStaff(request, env, 'ai');
    if (!staff)
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let body;
    try {
        body = (await request.json());
    }
    catch {
        return json({ error: 'JSON نامعتبر است.' }, 400, origin);
    }
    const toolName = typeof body.tool === 'string' ? body.tool : '';
    const toolCallId = typeof body.toolCallId === 'string' ? body.toolCallId : '';
    const args = (body.args && typeof body.args === 'object' ? body.args : {});
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const conversationId = typeof body.conversationId === 'number' ? body.conversationId : null;
    const tool = AI_TOOLS.find((t) => t.name === toolName);
    if (!tool)
        return json({ error: 'ابزار ناشناخته است.' }, 400, origin);
    if (!staff.permissions.includes(tool.permission))
        return json({ error: 'دسترسی نداری.' }, 401, origin);
    let data;
    try {
        data = await executeToolCall(request, env, origin, toolName, args);
    }
    catch (err) {
        return json({ error: err instanceof Error ? err.message : 'اجرای ابزار ناموفق بود.' }, 500, origin);
    }
    messages.push({ role: 'tool', tool_call_id: toolCallId, content: JSON.stringify(data).slice(0, 6000) });
    const configs = await loadAiProviderConfigs(env);
    if (configs.length) {
        try {
            const tools = toolsForPermissions(staff.permissions).map((t) => ({ name: t.name, description: t.description, parameters: t.parameters }));
            const followUp = await chatCompletionWithFallback(env, configs, [{ role: 'system', content: AI_SYSTEM_PROMPT }, ...messages], tools);
            messages.push({ role: 'assistant', content: followUp.content ?? 'انجام شد.' });
        }
        catch {
            messages.push({ role: 'assistant', content: 'اجرا شد، اما دریافت پاسخ بعدی از دستیار ناموفق بود.' });
        }
    }
    if (conversationId)
        await saveAiConversation(env, conversationId, staff.id, messages).catch(() => { });
    return json({ messages, pendingAction: null }, 200, origin);
}
export async function handleRequest(request, env) {
    // self-host (self-host-server.ts) این را یک‌بار در module scope صدا می‌زند چون env vars از قبل
    // در دسترس‌اند؛ روی Worker کلادفلر، env فقط داخل خودِ درخواست در دسترس است — پس بدون این خط،
    // CORS همیشه به‌جای دامنه‌ی واقعی خریدار (env.ALLOWED_ORIGIN) روی چند دامنه‌ی هاردکدشده‌ی
    // فروشنده (cors.ts) می‌ماند و سایت هر خریدارِ دیگری با خطای CORS مواجه می‌شود.
    configureAllowedOrigins([env.ALLOWED_ORIGIN]);
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    try {
        if (url.pathname === '/api/requests' && request.method === 'POST') {
            return await createRequest(request, env, origin);
        }
        if (url.pathname === '/api/requests' && request.method === 'GET') {
            return await listMyRequests(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/requests/') && request.method === 'PATCH') {
            return await updateMyRequest(request, url, env, origin);
        }
        if (url.pathname === '/api/customer/otp/send' && request.method === 'POST') {
            return await customerSendOtp(request, env, origin);
        }
        if (url.pathname === '/api/customer/otp/verify' && request.method === 'POST') {
            return await customerVerifyOtp(request, env, origin);
        }
        if ((url.pathname === '/api/customer/profile' || url.pathname === '/api/customer/me') &&
            (request.method === 'POST' || request.method === 'PATCH' || request.method === 'PUT')) {
            return await customerUpdateProfile(request, env, origin);
        }
        if (url.pathname === '/api/customer/register' && request.method === 'POST') {
            return await customerRegister(request, env, origin);
        }
        if (url.pathname === '/api/customer/login' && request.method === 'POST') {
            return await customerLogin(request, env, origin);
        }
        if (url.pathname === '/api/customer/logout' && request.method === 'POST') {
            return await customerLogout(request, env, origin);
        }
        if (url.pathname === '/api/customer/me' && request.method === 'GET') {
            return await customerMe(request, env, origin);
        }
        if (url.pathname === '/api/customer/addresses' && request.method === 'GET') {
            return await customerListAddresses(request, env, origin);
        }
        if (url.pathname === '/api/customer/addresses' && request.method === 'POST') {
            return await customerCreateAddress(request, env, origin);
        }
        const customerAddrDeleteMatch = url.pathname.match(/^\/api\/customer\/addresses\/(\d+)$/);
        if (customerAddrDeleteMatch && request.method === 'DELETE') {
            return await customerDeleteAddress(request, env, origin, Number(customerAddrDeleteMatch[1]));
        }
        if (url.pathname === '/api/customer/forgot-password' && request.method === 'POST') {
            return await customerForgotPassword(request, env, origin);
        }
        if (url.pathname === '/api/customer/reset-password' && request.method === 'POST') {
            return await customerResetPassword(request, env, origin);
        }
        if (url.pathname === '/api/customer/notifications/ws' && request.method === 'GET') {
            return await customerConnectNotifications(request, env, origin);
        }
        if (url.pathname === '/api/customer/notifications' && request.method === 'GET') {
            return await customerListNotifications(request, env, origin);
        }
        if (url.pathname === '/api/customer/notifications/read' && request.method === 'POST') {
            return await customerMarkNotificationsRead(request, env, origin);
        }
        if (url.pathname === '/api/staff/login' && request.method === 'POST') {
            return await staffLogin(request, env, origin);
        }
        if (url.pathname === '/api/staff/login/verify-2fa' && request.method === 'POST') {
            return await staffVerifyTwoFactor(request, env, origin);
        }
        if (url.pathname === '/api/staff/2fa/sms/setup' && request.method === 'POST') {
            return await staffSmsTwoFactorSetup(request, env, origin);
        }
        if (url.pathname === '/api/staff/2fa/sms/confirm' && request.method === 'POST') {
            return await staffSmsTwoFactorConfirm(request, env, origin);
        }
        if (url.pathname === '/api/staff/2fa/disable' && request.method === 'POST') {
            return await staffTwoFactorDisable(request, env, origin);
        }
        if (url.pathname === '/api/staff/wallet' && request.method === 'GET') {
            return await staffWalletSummary(request, env, origin);
        }
        if (url.pathname === '/api/staff/wallet/transactions' && request.method === 'GET') {
            return await staffListMyWalletTransactions(request, url, env, origin);
        }
        if (url.pathname === '/api/staff/wallet/payout-requests' && request.method === 'GET') {
            return await staffListMyPayoutRequests(request, env, origin);
        }
        if (url.pathname === '/api/staff/wallet/payout-requests' && request.method === 'POST') {
            return await staffCreatePayoutRequest(request, env, origin);
        }
        if (url.pathname === '/api/staff/logout' && request.method === 'POST') {
            return await staffLogout(request, env, origin);
        }
        if (url.pathname === '/api/staff/me' && request.method === 'GET') {
            return await staffMe(request, env, origin);
        }
        if (url.pathname === '/api/staff/requests' && request.method === 'GET') {
            return await staffListMyRequests(request, env, origin);
        }
        if (url.pathname.endsWith('/status') && url.pathname.startsWith('/api/staff/requests/') && request.method === 'PATCH') {
            return await staffUpdateRequestStatus(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/requests/export' && request.method === 'GET') {
            return await adminExportRequestsCsv(request, env, origin);
        }
        if (url.pathname === '/api/admin/requests' && request.method === 'GET') {
            return await adminListRequests(request, url, env, origin);
        }
        if (url.pathname.endsWith('/assign') && url.pathname.startsWith('/api/admin/requests/') && request.method === 'PATCH') {
            return await adminAssignRequest(request, url, env, origin);
        }
        if (url.pathname.endsWith('/reports') && url.pathname.startsWith('/api/admin/requests/') && request.method === 'POST') {
            return await adminCreateRequestReport(request, url, env, origin);
        }
        if (url.pathname.endsWith('/reports') && url.pathname.startsWith('/api/admin/requests/') && request.method === 'GET') {
            return await adminListRequestReports(request, url, env, origin);
        }
        if (url.pathname.endsWith('/events') && url.pathname.startsWith('/api/admin/requests/') && request.method === 'GET') {
            return await adminGetRequestEvents(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/requests/') && request.method === 'PATCH') {
            return await adminUpdateRequest(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/requests/') && request.method === 'DELETE') {
            return await adminDeleteRequest(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/stats' && request.method === 'GET') {
            return await adminStats(request, env, origin);
        }
        if (url.pathname === '/api/admin/staff' && request.method === 'GET') {
            return await adminListStaff(request, env, origin);
        }
        if (url.pathname === '/api/admin/staff' && request.method === 'POST') {
            return await adminCreateStaff(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/staff/') && request.method === 'PATCH') {
            return await adminUpdateStaff(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/staff/') && request.method === 'DELETE') {
            return await adminDeleteStaff(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/activity-log' && request.method === 'GET') {
            return await adminListActivityLog(request, env, origin);
        }
        if (url.pathname === '/api/admin/roles' && request.method === 'GET') {
            return await adminListRoles(request, env, origin);
        }
        if (url.pathname === '/api/admin/roles' && request.method === 'POST') {
            return await adminCreateRole(request, env, origin);
        }
        // باید پیش از تطبیق عمومی‌تر PATCH /api/admin/roles/:id زیرش چک شود، وگرنه آن یکی این مسیر را
        // هم قاپ می‌زند و به‌جای adminUpdateRolePayRate به adminUpdateRole می‌رود.
        if (url.pathname.endsWith('/pay-rate') && url.pathname.startsWith('/api/admin/roles/') && request.method === 'PATCH') {
            return await adminUpdateRolePayRate(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/roles/') && request.method === 'PATCH') {
            return await adminUpdateRole(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/roles/') && request.method === 'DELETE') {
            return await adminDeleteRole(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/wallet/staff' && request.method === 'GET') {
            return await adminListStaffWallets(request, env, origin);
        }
        if (url.pathname.endsWith('/transactions') && url.pathname.startsWith('/api/admin/wallet/staff/') && request.method === 'GET') {
            return await adminListStaffWalletTransactions(request, url, env, origin);
        }
        if (url.pathname.endsWith('/adjustments') && url.pathname.startsWith('/api/admin/wallet/staff/') && request.method === 'POST') {
            return await adminCreateWalletAdjustment(request, url, env, origin);
        }
        if (url.pathname.endsWith('/rate-override') && url.pathname.startsWith('/api/admin/wallet/staff/') && request.method === 'PATCH') {
            return await adminUpdateStaffPayRateOverride(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/wallet/payout-requests' && request.method === 'GET') {
            return await adminListPayoutRequests(request, url, env, origin);
        }
        if (url.pathname.endsWith('/approve') && url.pathname.startsWith('/api/admin/wallet/payout-requests/') && request.method === 'POST') {
            return await adminApprovePayoutRequest(request, url, env, origin);
        }
        if (url.pathname.endsWith('/reject') && url.pathname.startsWith('/api/admin/wallet/payout-requests/') && request.method === 'POST') {
            return await adminRejectPayoutRequest(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/wallet/payroll/preview' && request.method === 'GET') {
            return await adminPayrollPreview(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/wallet/payroll/confirm' && request.method === 'POST') {
            return await adminProcessPayroll(request, env, origin);
        }
        if (url.pathname === '/api/magazine/articles' && request.method === 'GET') {
            return await publicListArticles(env, origin);
        }
        if ((url.pathname === '/api/seo/sitemap.xml' || url.pathname === '/sitemap.xml') &&
            request.method === 'GET') {
            return await publicGetSitemap(env);
        }
        if (url.pathname.startsWith('/api/magazine/articles/') && request.method === 'GET') {
            return await publicGetArticle(url, env, origin);
        }
        if (url.pathname === '/api/admin/articles' && request.method === 'GET') {
            return await adminListArticles(request, env, origin);
        }
        if (url.pathname === '/api/admin/articles' && request.method === 'POST') {
            return await adminCreateArticle(request, env, origin);
        }
        if (url.pathname.endsWith('/publish') && url.pathname.startsWith('/api/admin/articles/') && request.method === 'PATCH') {
            return await adminSetArticleStatus(request, url, env, origin, 'published');
        }
        if (url.pathname.endsWith('/unpublish') && url.pathname.startsWith('/api/admin/articles/') && request.method === 'PATCH') {
            return await adminSetArticleStatus(request, url, env, origin, 'draft');
        }
        if (url.pathname.startsWith('/api/admin/articles/') && request.method === 'PATCH') {
            return await adminUpdateArticle(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/articles/') && request.method === 'DELETE') {
            return await adminDeleteArticle(request, url, env, origin);
        }
        if (url.pathname === '/api/pages' && request.method === 'GET') {
            return await publicListCustomPages(env, origin);
        }
        if (url.pathname.startsWith('/api/pages/') && request.method === 'GET') {
            return await publicGetCustomPage(url, env, origin);
        }
        if (url.pathname === '/api/admin/pages' && request.method === 'GET') {
            return await adminListCustomPages(request, env, origin);
        }
        if (url.pathname === '/api/admin/pages' && request.method === 'POST') {
            return await adminCreateCustomPage(request, env, origin);
        }
        if (url.pathname.endsWith('/publish') && url.pathname.startsWith('/api/admin/pages/') && request.method === 'PATCH') {
            return await adminSetCustomPageStatus(request, url, env, origin, 'published');
        }
        if (url.pathname.endsWith('/unpublish') && url.pathname.startsWith('/api/admin/pages/') && request.method === 'PATCH') {
            return await adminSetCustomPageStatus(request, url, env, origin, 'draft');
        }
        if (url.pathname.startsWith('/api/admin/pages/') && request.method === 'GET') {
            return await adminGetCustomPage(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/pages/') && request.method === 'PATCH') {
            return await adminUpdateCustomPage(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/pages/') && request.method === 'DELETE') {
            return await adminDeleteCustomPage(request, url, env, origin);
        }
        if (url.pathname === '/api/testimonials' && request.method === 'GET') {
            return await publicListTestimonials(env, origin);
        }
        if (url.pathname === '/api/testimonials' && request.method === 'POST') {
            return await publicSubmitTestimonial(request, env, origin);
        }
        if (url.pathname === '/api/admin/testimonials' && request.method === 'GET') {
            return await adminListTestimonials(request, env, origin);
        }
        if (url.pathname === '/api/admin/testimonials' && request.method === 'POST') {
            return await adminCreateTestimonial(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/testimonials/') && request.method === 'PATCH') {
            return await adminUpdateTestimonial(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/testimonials/') && request.method === 'DELETE') {
            return await adminDeleteTestimonial(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/chat/') && url.pathname.endsWith('/messages') && request.method === 'POST') {
            return await publicSendChatMessage(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/chat/') && url.pathname.endsWith('/upload') && request.method === 'POST') {
            return await publicUploadChatImage(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/chat/') && request.method === 'GET') {
            return await publicGetChat(url, env, origin);
        }
        if (url.pathname === '/api/admin/chat/conversations' && request.method === 'GET') {
            return await adminListChatConversations(request, env, origin);
        }
        if (url.pathname === '/api/admin/chat/agents' && request.method === 'GET') {
            return await adminListChatAgents(request, env, origin);
        }
        if (url.pathname.endsWith('/messages') && url.pathname.startsWith('/api/admin/chat/conversations/') && request.method === 'GET') {
            return await adminGetChatMessages(request, url, env, origin);
        }
        if (url.pathname.endsWith('/messages') && url.pathname.startsWith('/api/admin/chat/conversations/') && request.method === 'POST') {
            return await adminSendChatMessage(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/chat/conversations/') && request.method === 'PATCH') {
            return await adminUpdateChatConversation(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/chat/conversations/') && request.method === 'DELETE') {
            return await adminDeleteChatConversation(request, url, env, origin);
        }
        if (url.pathname === '/api/stories' && request.method === 'GET') {
            return await publicListStories(env, origin);
        }
        if (url.pathname === '/api/admin/stories' && request.method === 'GET') {
            return await adminListStories(request, env, origin);
        }
        if (url.pathname === '/api/admin/stories' && request.method === 'POST') {
            return await adminCreateStory(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/stories/') && request.method === 'PATCH') {
            return await adminUpdateStory(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/stories/') && request.method === 'DELETE') {
            return await adminDeleteStory(request, url, env, origin);
        }
        if (url.pathname === '/api/job-applications' && request.method === 'POST') {
            return await publicCreateJobApplication(request, env, origin);
        }
        if (url.pathname === '/api/admin/job-applications' && request.method === 'GET') {
            return await adminListJobApplications(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/job-applications/') && request.method === 'PATCH') {
            return await adminUpdateJobApplication(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/job-applications/') && request.method === 'DELETE') {
            return await adminDeleteJobApplication(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/fleet-vehicles' && request.method === 'GET') {
            return await adminListFleetVehicles(request, env, origin);
        }
        if (url.pathname === '/api/admin/fleet-vehicles' && request.method === 'POST') {
            return await adminCreateFleetVehicle(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/fleet-vehicles/') && request.method === 'PATCH') {
            return await adminUpdateFleetVehicle(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/fleet-vehicles/') && request.method === 'DELETE') {
            return await adminDeleteFleetVehicle(request, url, env, origin);
        }
        if (url.pathname === '/api/settings' && request.method === 'GET') {
            return await publicGetSettings(env, origin);
        }
        if (url.pathname === '/api/admin/settings' && request.method === 'PATCH') {
            return await adminUpdateSetting(request, env, origin);
        }
        if (url.pathname === '/api/admin/plugins' && request.method === 'GET') {
            return await adminGetPlugins(request, env, origin);
        }
        if (url.pathname === '/api/admin/ai/chat' && request.method === 'POST') {
            return await adminAiChat(request, env, origin);
        }
        if (url.pathname === '/api/admin/ai/execute' && request.method === 'POST') {
            return await adminAiExecute(request, env, origin);
        }
        if (url.pathname === '/api/admin/ai/test-connection' && request.method === 'POST') {
            return await adminAiTestConnection(request, env, origin);
        }
        if (url.pathname === '/api/admin/sms/test-connection' && request.method === 'POST') {
            return await adminSmsTestConnection(request, env, origin);
        }
        if (url.pathname === '/api/admin/ai/conversations' && request.method === 'GET') {
            return await adminListAiConversations(request, env, origin);
        }
        if (url.pathname === '/api/admin/ai/conversations' && request.method === 'POST') {
            return await adminCreateAiConversation(request, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/ai/conversations/') && request.method === 'GET') {
            return await adminGetAiConversation(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/ai/conversations/') && request.method === 'DELETE') {
            return await adminDeleteAiConversation(request, url, env, origin);
        }
        if (url.pathname === '/api/admin/license' && request.method === 'GET') {
            return await adminGetLicense(request, env, origin);
        }
        if (url.pathname === '/api/admin/license/activate' && request.method === 'POST') {
            return await adminActivateLicense(request, env, origin);
        }
        if (url.pathname === '/api/track' && request.method === 'POST') {
            return await publicTrackPageView(request, env, origin);
        }
        if (url.pathname === '/api/admin/analytics' && request.method === 'GET') {
            return await adminGetAnalytics(request, env, origin);
        }
        if (url.pathname === '/api/admin/backup/export' && request.method === 'GET') {
            return await adminExportBackup(request, env, origin);
        }
        if (url.pathname === '/api/admin/backup/import' && request.method === 'POST') {
            return await adminImportBackup(request, env, origin);
        }
        if (url.pathname === '/api/admin/backup/drive-test' && request.method === 'POST') {
            return await adminTestDriveBackup(request, env, origin);
        }
        if (url.pathname === '/api/admin/backup/drive-oauth/prepare' && request.method === 'POST') {
            return await adminPrepareDriveOAuth(request, env, origin);
        }
        if (url.pathname === '/api/admin/backup/drive-oauth/callback' && request.method === 'GET') {
            return await publicDriveOAuthCallback(url, env);
        }
        if (url.pathname === '/api/admin/backup/drive-disconnect' && request.method === 'POST') {
            return await adminDisconnectDrive(request, env, origin);
        }
        if (url.pathname === '/api/admin/version' && request.method === 'GET') {
            return await adminGetVersion(request, env, origin);
        }
        if (url.pathname === '/api/admin/selfhost/update' && request.method === 'POST') {
            return await adminSelfhostUpdate(request, env, origin);
        }
        if (url.pathname === '/api/admin/upload' && request.method === 'POST') {
            return await adminUploadMedia(request, env, origin);
        }
        if (url.pathname === '/api/admin/media' && request.method === 'GET') {
            return await adminListMedia(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/admin/media/') && request.method === 'DELETE') {
            return await adminDeleteMedia(request, url, env, origin);
        }
        if (url.pathname.startsWith('/api/media/') && request.method === 'GET') {
            return await getMedia(url, env);
        }
        return json({ error: 'یافت نشد.' }, 404, origin);
    }
    catch {
        return json({ error: 'خطای داخلی سرور.' }, 500, origin);
    }
}
// به‌صورت روزانه (روی کلادفلر طبق triggers.crons در wrangler.jsonc، روی حالت خوداستقرار طبق یک تایمر ساده در
// self-host-server.ts) لایسنس نصب‌شده را نزد License-Manager اعتبارسنجی می‌کند تا حتی بدون باز شدن پنل تنظیمات
// هم وضعیت باطل‌شدن/انقضا به‌روز بماند.
export async function runScheduledLicenseCheck(env) {
    const license = await getStoredLicense(env);
    if (!license?.key)
        return;
    await revalidateStoredLicenseIfStale(env, { ...license, lastValidatedAt: undefined });
}
// همان محرک روزانه‌ی بالا؛ هر دو کار مستقل از هم اجرا می‌شوند تا خطای یکی مانع دیگری نشود.
export async function runDailyScheduledTasks(env) {
    await Promise.allSettled([runScheduledLicenseCheck(env), runDailyDriveBackup(env)]);
}
