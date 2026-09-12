// یک شکل واحد (سازگار با OpenAI chat-completions + tools) برای هر ارائه‌دهنده — دیپ‌سیک، OpenAI و OpenRouter به همین
// شکل صحبت می‌کنند و جمنای هم یک لایه‌ی سازگار با OpenAI دارد، پس فقط baseUrl/model فرق می‌کند، نه کد.
const PROVIDER_DEFAULTS = {
    // نسخه‌ی دقیق مدل‌های Gemini مرتب منقضی/تغییر می‌کند؛ به همین دلیل به‌جای پین‌کردن یک نسخه‌ی خاص،
    // از alias «آخرین نسخه‌ی flash» گوگل استفاده می‌شود که همیشه به مدل توصیه‌شده‌ی فعلی اشاره دارد.
    gemini: { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai', model: 'gemini-flash-latest' },
    deepseek: { baseUrl: 'https://api.deepseek.com', model: 'deepseek-chat' },
    openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
    // OpenRouter یک دروازه‌ی یکپارچه به چند ارائه‌دهنده است؛ نام مدل باید با پیشوند ارائه‌دهنده باشد (مثل «openai/gpt-4o-mini»).
    openrouter: { baseUrl: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4o-mini' },
};
export async function chatCompletion(config, messages, tools) {
    const defaults = PROVIDER_DEFAULTS[config.provider];
    if (!defaults)
        throw new Error('ارائه‌دهنده هوش مصنوعی نامعتبر است.');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);
    let res;
    try {
        res = await fetch(`${defaults.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                model: config.model?.trim() || defaults.model,
                messages,
                ...(tools.length ? { tools: tools.map((t) => ({ type: 'function', function: t })) } : {}),
            }),
            signal: controller.signal,
        });
    }
    catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('پاسخ سرویس هوش مصنوعی طول کشید و لغو شد.');
        }
        throw new Error('ارتباط با سرویس هوش مصنوعی برقرار نشد.');
    }
    finally {
        clearTimeout(timeoutId);
    }
    if (!res.ok) {
        const bodyText = await res.text().catch(() => '');
        throw new Error(`سرویس هوش مصنوعی خطا داد (${res.status}): ${bodyText.slice(0, 300)}`);
    }
    const data = (await res.json().catch(() => null));
    const message = data?.choices?.[0]?.message;
    const rawToolCall = message?.tool_calls?.[0];
    if (rawToolCall) {
        let args = {};
        try {
            args = JSON.parse(rawToolCall.function.arguments || '{}');
        }
        catch {
            args = {};
        }
        return { content: null, toolCall: { id: rawToolCall.id, name: rawToolCall.function.name, arguments: args } };
    }
    return { content: message?.content ?? '', toolCall: null };
}
