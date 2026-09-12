import { fetchPlugins, updateSetting, testAiConnection, testSmsConnection } from '../utils/api.ts';

interface AiProviderLastCheck {
  ok: boolean;
  at: string;
  message: string;
}

interface SmsPluginConfig {
  enabled: boolean;
  username: string;
  password: string;
  bodyId: string;
  autoNotifyStatusChange: boolean;
  lastCheck?: AiProviderLastCheck;
}

interface AiProviderEntry {
  enabled: boolean;
  apiKey: string;
  model?: string;
  priority: number;
  lastCheck?: AiProviderLastCheck;
}

// شکل قدیمی/تک‌ارائه‌دهنده‌ای — فقط برای مهاجرت یک‌باره‌ی نصب‌های قبلی که هنوز روی این شکل مانده‌اند.
interface LegacyAiAssistantConfig {
  provider?: AiProviderId;
  apiKey?: string;
  model?: string;
}

type AiProviderId = 'gemini' | 'deepseek' | 'openai' | 'openrouter';
type AiProvidersConfig = Partial<Record<AiProviderId, AiProviderEntry>>;

// «همکاری» چند ارائه‌دهنده‌ی هم‌زمان‌فعال به شکل زنجیره‌ی جایگزین (fallback chain) در بک‌اند پیاده
// شده: به ترتیب اولویت امتحان می‌شوند، اولین پاسخ موفق برگردانده می‌شود و بقیه صدا زده نمی‌شوند —
// پس هیچ‌وقت دو ارائه‌دهنده هم‌زمان با هم «تداخل» نمی‌کنند، فقط اگر یکی جواب نداد، خودکار به بعدی
// می‌رود. این‌جا فقط فعال/غیرفعال‌کردن و اولویت هر کدام تنظیم می‌شود.
const AI_PROVIDERS: { id: AiProviderId; label: string }[] = [
  { id: 'gemini', label: 'Gemini' },
  { id: 'deepseek', label: 'DeepSeek' },
  { id: 'openai', label: 'ChatGPT (OpenAI)' },
  { id: 'openrouter', label: 'OpenRouter' },
];

function renderAiProviderCard(p: { id: AiProviderId; label: string }): string {
  return `
    <div class="editor-sidebar-card" data-ai-provider-card="${p.id}">
      <div class="plugin-card-head">
        <h3>${p.label}</h3>
        <label class="settings-inline-toggle"><input type="checkbox" data-ai-field="enabled" /> فعال</label>
      </div>
      <div class="settings-form-grid">
        <div class="form-field">
          <label>کلید API</label>
          <input type="text" dir="ltr" data-ai-field="apiKey" placeholder="sk-..." />
        </div>
        <div class="form-field">
          <label>مدل (اختیاری)</label>
          <input type="text" dir="ltr" data-ai-field="model" placeholder="پیش‌فرض کافی است" />
        </div>
        <div class="form-field">
          <label>اولویت</label>
          <input type="number" min="1" step="1" data-ai-field="priority" style="max-width: 90px" />
        </div>
      </div>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-secondary btn-sm" data-ai-test-btn>تست اتصال</button>
        <span data-ai-status></span>
      </div>
      <p class="error-text" data-ai-error hidden></p>
    </div>
  `;
}

export function renderPluginsView(): string {
  return `
    <div class="view-header">
      <h1>افزونه‌ها</h1>
    </div>
    <p class="error-text" id="plugins-error" hidden></p>
    <p class="settings-saved-note" id="plugins-saved-note" hidden>ذخیره شد.</p>

    <div class="editor-sidebar-card">
      <div class="plugin-card-head">
        <h3>پیامک (ملی‌پیامک)</h3>
        <label class="settings-inline-toggle"><input type="checkbox" id="settings-sms-enabled" /> فعال</label>
      </div>
      <p class="settings-panel-hint">نام کاربری و رمز عبور همان حساب پنل ملی‌پیامک شماست (نه یک توکن جدا).</p>
      <div class="settings-form-grid">
        <div class="form-field">
          <label for="settings-sms-username">نام کاربری پنل</label>
          <input type="text" id="settings-sms-username" dir="ltr" autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="settings-sms-password">رمز عبور پنل</label>
          <input type="password" id="settings-sms-password" dir="ltr" autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="settings-sms-body-id">شناسه پترن خط خدماتی</label>
          <input type="text" id="settings-sms-body-id" dir="ltr" required />
        </div>
      </div>
      <p class="settings-panel-hint">ارسال همیشه از طریق همین پترن (خط خدماتی اشتراکی) انجام می‌شود — چون پترن خودش خط ارسال را هم مشخص می‌کند، شماره‌ی خط جدا لازم نیست. شناسه‌ی پترن را باید قبلاً در پنل ملی‌پیامک ثبت کرده باشید.</p>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-secondary btn-sm" id="settings-sms-test-btn">تست اتصال</button>
        <span id="settings-sms-status"></span>
      </div>
      <p class="settings-panel-hint">«تست اتصال» فقط نام‌کاربری/رمز را ذخیره می‌کند (برای بررسی اعتبار)؛ شناسه‌ی پترن و بقیه‌ی تنظیمات این کارت را با دکمه‌ی زیر ذخیره کنید.</p>
      <p class="error-text" id="settings-sms-test-error" hidden></p>
      <label class="settings-inline-toggle">
        <input type="checkbox" id="settings-sms-auto-notify" />
        ارسال خودکار پیامک به مشتری در مراحل مهم (هماهنگی زمان، شروع کار، پایان کار، لغو درخواست)
      </label>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-primary btn-sm" id="settings-sms-save-btn">ذخیره پیامک</button>
        <span class="settings-saved-note" id="settings-sms-saved-note" hidden>ذخیره شد.</span>
      </div>
    </div>

    <h2 class="editor-section-title">دستیار هوش مصنوعی</h2>
    <p class="settings-panel-hint">
      هر ارائه‌دهنده مستقل است — می‌توانید فقط یکی را فعال کنید یا چند تا را هم‌زمان. اگر چند تا فعال باشند، طبق
      «اولویت» (عدد کوچک‌تر زودتر) امتحان می‌شوند: به محض جواب‌گرفتن از یکی، بقیه اصلاً صدا زده نمی‌شوند؛ فقط اگر
      ارائه‌دهنده‌ای جواب نداد (مثلاً اعتبارش تمام شده)، خودکار سراغ بعدی می‌رود — یعنی یک نسخه‌ی پشتیبان زنده،
      نه رقابت هم‌زمان چند تا با هم. کلیدها فقط برای حساب شمایند و جایی به‌جز این سرور فرستاده نمی‌شوند.
    </p>
    ${AI_PROVIDERS.map(renderAiProviderCard).join('')}

    <div class="settings-panel-footer">
      <button type="button" class="btn btn-primary" id="plugins-save-btn">ذخیره افزونه‌ها</button>
    </div>
  `;
}

// زمان به‌صورت نسبی («چند دقیقه پیش») نمایش داده می‌شود تا روشن باشد این وضعیت همین الان تست نشده،
// نتیجه‌ی آخرین باری است که تست اتصال زده شده یا در استفاده‌ی واقعی کشف شده.
function relativeTimeFa(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return 'همین الان';
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} ساعت پیش`;
  return `${Math.round(hours / 24)} روز پیش`;
}

function renderLastCheckStatus(el: Element | null, lastCheck: AiProviderLastCheck | undefined): void {
  if (!el) return;
  if (!lastCheck) {
    el.innerHTML = `<span class="article-status-badge">هنوز تست نشده</span>`;
    return;
  }
  const badgeClass = lastCheck.ok ? 'article-status-published' : 'article-status-draft';
  const label = lastCheck.ok ? 'متصل' : 'قطع';
  el.innerHTML = `<span class="article-status-badge ${badgeClass}" title="${lastCheck.message.replace(/"/g, '&quot;')}">${label} · ${relativeTimeFa(lastCheck.at)}</span>`;
}

function renderAiStatus(card: HTMLElement, lastCheck: AiProviderLastCheck | undefined): void {
  renderLastCheckStatus(card.querySelector('[data-ai-status]'), lastCheck);
}

export function initPluginsView(): void {
  const errorEl = document.getElementById('plugins-error');
  const savedNote = document.getElementById('plugins-saved-note');
  const saveBtn = document.getElementById('plugins-save-btn') as HTMLButtonElement | null;
  if (!errorEl || !savedNote || !saveBtn) return;

  function showSaved(): void {
    savedNote!.hidden = false;
    window.setTimeout(() => (savedNote!.hidden = true), 2500);
  }
  function showError(err: unknown): void {
    errorEl!.hidden = false;
    errorEl!.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
  }

  let plugins: Record<string, unknown> = {};

  function aiEntryFor(id: AiProviderId, providersConfig: AiProvidersConfig): AiProviderEntry {
    return providersConfig[id] ?? { enabled: false, apiKey: '', model: '', priority: AI_PROVIDERS.findIndex((p) => p.id === id) + 1 };
  }

  function renderAll(): void {
    const sms = (plugins.sms as SmsPluginConfig | undefined) ?? {
      enabled: false,
      username: '',
      password: '',
      bodyId: '',
      autoNotifyStatusChange: false,
    };
    (document.getElementById('settings-sms-enabled') as HTMLInputElement).checked = Boolean(sms.enabled);
    (document.getElementById('settings-sms-username') as HTMLInputElement).value = sms.username ?? '';
    (document.getElementById('settings-sms-password') as HTMLInputElement).value = sms.password ?? '';
    (document.getElementById('settings-sms-body-id') as HTMLInputElement).value = sms.bodyId ?? '';
    (document.getElementById('settings-sms-auto-notify') as HTMLInputElement).checked = Boolean(sms.autoNotifyStatusChange);
    renderLastCheckStatus(document.getElementById('settings-sms-status'), sms.lastCheck);

    // سازگاری با نصب‌های قبلی: اگر هنوز فقط aiAssistant تکی ذخیره شده (نه aiProviders)، همان یکی
    // به‌عنوان تنها ارائه‌دهنده‌ی فعال (اولویت ۱) در فرم نمایش داده می‌شود.
    let providersConfig = plugins.aiProviders as AiProvidersConfig | undefined;
    if (!providersConfig) {
      const legacy = plugins.aiAssistant as LegacyAiAssistantConfig | undefined;
      providersConfig = legacy?.provider && legacy.apiKey ? { [legacy.provider]: { enabled: true, apiKey: legacy.apiKey, model: legacy.model, priority: 1 } } : {};
    }

    AI_PROVIDERS.forEach((p) => {
      const card = document.querySelector<HTMLElement>(`[data-ai-provider-card="${p.id}"]`);
      if (!card) return;
      const entry = aiEntryFor(p.id, providersConfig!);
      (card.querySelector('[data-ai-field="enabled"]') as HTMLInputElement).checked = Boolean(entry.enabled);
      (card.querySelector('[data-ai-field="apiKey"]') as HTMLInputElement).value = entry.apiKey ?? '';
      (card.querySelector('[data-ai-field="model"]') as HTMLInputElement).value = entry.model ?? '';
      (card.querySelector('[data-ai-field="priority"]') as HTMLInputElement).value = String(entry.priority ?? AI_PROVIDERS.findIndex((x) => x.id === p.id) + 1);
      renderAiStatus(card, entry.lastCheck);
    });
  }

  document.querySelectorAll<HTMLElement>('[data-ai-provider-card]').forEach((card) => {
    const providerId = card.dataset.aiProviderCard as AiProviderId;
    card.querySelector('[data-ai-test-btn]')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const testError = card.querySelector<HTMLElement>('[data-ai-error]');
      const apiKey = (card.querySelector('[data-ai-field="apiKey"]') as HTMLInputElement).value.trim();
      const model = (card.querySelector('[data-ai-field="model"]') as HTMLInputElement).value.trim();
      if (testError) testError.hidden = true;
      if (!apiKey) {
        if (testError) {
          testError.hidden = false;
          testError.textContent = 'ابتدا کلید API را وارد کنید.';
        }
        return;
      }
      btn.disabled = true;
      btn.textContent = 'در حال تست...';
      const lastCheck: AiProviderLastCheck = { ok: false, at: new Date().toISOString(), message: '' };
      try {
        await testAiConnection(providerId, apiKey, model);
        lastCheck.ok = true;
        lastCheck.message = 'اتصال موفق بود.';
      } catch (err) {
        lastCheck.message = err instanceof Error ? err.message : 'اتصال ناموفق بود.';
        if (testError) {
          testError.hidden = false;
          testError.textContent = lastCheck.message;
        }
      } finally {
        btn.disabled = false;
        btn.textContent = 'تست اتصال';
      }
      const providersConfig = ((plugins.aiProviders as AiProvidersConfig | undefined) ??= {});
      const existing = aiEntryFor(providerId, providersConfig);
      providersConfig[providerId] = { ...existing, apiKey, model, lastCheck };
      plugins.aiProviders = providersConfig;
      renderAiStatus(card, lastCheck);
    });
  });

  document.getElementById('settings-sms-test-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('settings-sms-test-btn') as HTMLButtonElement;
    const testError = document.getElementById('settings-sms-test-error')!;
    const username = (document.getElementById('settings-sms-username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('settings-sms-password') as HTMLInputElement).value;
    testError.hidden = true;
    if (!username || !password) {
      testError.hidden = false;
      testError.textContent = 'ابتدا نام کاربری و رمز عبور پنل را وارد کنید.';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'در حال تست...';
    const lastCheck: AiProviderLastCheck = { ok: false, at: new Date().toISOString(), message: '' };
    try {
      const result = await testSmsConnection(username, password);
      lastCheck.ok = true;
      lastCheck.message = result.credit ? `اتصال موفق — اعتبار باقی‌مانده: ${result.credit}` : 'اتصال موفق بود.';
      // تست موفق، پلاگین را هم فعال می‌کند (سرور هم همین را ذخیره می‌کند) — وگرنه با وجود تست موفق،
      // کارمند فکر می‌کند همه‌چیز آماده است در حالی که هنوز enabled=false مانده و پیامک واقعی نمی‌رود.
      (document.getElementById('settings-sms-enabled') as HTMLInputElement).checked = true;
    } catch (err) {
      lastCheck.message = err instanceof Error ? err.message : 'اتصال ناموفق بود.';
      testError.hidden = false;
      testError.textContent = lastCheck.message;
    } finally {
      btn.disabled = false;
      btn.textContent = 'تست اتصال';
    }
    const existingSms = (plugins.sms as SmsPluginConfig | undefined) ?? ({} as SmsPluginConfig);
    plugins.sms = { ...existingSms, username, password, lastCheck, enabled: lastCheck.ok ? true : existingSms.enabled };
    renderLastCheckStatus(document.getElementById('settings-sms-status'), lastCheck);
  });

  // ذخیره‌ی جدا و کنار همین کارت — چون «تست اتصال» فقط نام‌کاربری/رمز را ذخیره می‌کند، نه شناسه‌ی
  // پترن یا تیک‌های فعال/ارسال‌خودکار را؛ منتظرماندن برای دکمه‌ی سراسری «ذخیره افزونه‌ها» (زیر همه‌ی
  // کارت‌های هوش مصنوعی) باعث می‌شد بعضی وقت‌ها شناسه‌ی پترن اصلاً ذخیره نشود.
  document.getElementById('settings-sms-save-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('settings-sms-save-btn') as HTMLButtonElement;
    const savedNoteEl = document.getElementById('settings-sms-saved-note')!;
    const testError = document.getElementById('settings-sms-test-error')!;
    const bodyId = (document.getElementById('settings-sms-body-id') as HTMLInputElement).value.trim();
    testError.hidden = true;
    savedNoteEl.hidden = true;
    if (!bodyId) {
      testError.hidden = false;
      testError.textContent = 'شناسه‌ی پترن الزامی است.';
      return;
    }
    const existingSms = (plugins.sms as SmsPluginConfig | undefined) ?? ({} as SmsPluginConfig);
    const nextSms: SmsPluginConfig = {
      ...existingSms,
      enabled: (document.getElementById('settings-sms-enabled') as HTMLInputElement).checked,
      username: (document.getElementById('settings-sms-username') as HTMLInputElement).value.trim(),
      password: (document.getElementById('settings-sms-password') as HTMLInputElement).value,
      bodyId,
      autoNotifyStatusChange: (document.getElementById('settings-sms-auto-notify') as HTMLInputElement).checked,
    };
    btn.disabled = true;
    try {
      await updateSetting('plugins', { ...plugins, sms: nextSms });
      plugins.sms = nextSms;
      savedNoteEl.hidden = false;
      window.setTimeout(() => (savedNoteEl.hidden = true), 2500);
    } catch (err) {
      testError.hidden = false;
      testError.textContent = err instanceof Error ? err.message : 'ذخیره ناموفق بود.';
    } finally {
      btn.disabled = false;
    }
  });

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    try {
      const providersConfig: AiProvidersConfig = { ...((plugins.aiProviders as AiProvidersConfig | undefined) ?? {}) };
      AI_PROVIDERS.forEach((p) => {
        const card = document.querySelector<HTMLElement>(`[data-ai-provider-card="${p.id}"]`);
        if (!card) return;
        const existing = aiEntryFor(p.id, providersConfig);
        providersConfig[p.id] = {
          // lastCheck اینجا حفظ می‌شود — این دکمه فقط ذخیره می‌کند، تست نمی‌زند.
          lastCheck: existing.lastCheck,
          enabled: (card.querySelector('[data-ai-field="enabled"]') as HTMLInputElement).checked,
          apiKey: (card.querySelector('[data-ai-field="apiKey"]') as HTMLInputElement).value.trim(),
          model: (card.querySelector('[data-ai-field="model"]') as HTMLInputElement).value.trim(),
          priority: Number((card.querySelector('[data-ai-field="priority"]') as HTMLInputElement).value) || AI_PROVIDERS.findIndex((x) => x.id === p.id) + 1,
        };
      });

      const existingSms = (plugins.sms as SmsPluginConfig | undefined) ?? ({} as SmsPluginConfig);
      plugins = {
        ...plugins,
        sms: {
          // lastCheck اینجا حفظ می‌شود — این دکمه فقط ذخیره می‌کند، تست نمی‌زند.
          lastCheck: existingSms.lastCheck,
          enabled: (document.getElementById('settings-sms-enabled') as HTMLInputElement).checked,
          username: (document.getElementById('settings-sms-username') as HTMLInputElement).value.trim(),
          password: (document.getElementById('settings-sms-password') as HTMLInputElement).value,
          bodyId: (document.getElementById('settings-sms-body-id') as HTMLInputElement).value.trim(),
          autoNotifyStatusChange: (document.getElementById('settings-sms-auto-notify') as HTMLInputElement).checked,
        },
        aiProviders: providersConfig,
      };
      delete plugins.aiAssistant; // شکل قدیمی تک‌ارائه‌دهنده‌ای دیگر لازم نیست؛ همه‌چیز در aiProviders است.
      await updateSetting('plugins', plugins);
      showSaved();
    } catch (err) {
      showError(err);
    } finally {
      saveBtn.disabled = false;
    }
  });

  fetchPlugins()
    .then((data) => {
      plugins = data;
      renderAll();
    })
    .catch(showError);
}
