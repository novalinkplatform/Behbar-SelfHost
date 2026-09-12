import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import './styles/main.css';

import { renderHeader, initHeader } from './components/Header.ts';
import { renderFooter, initFooter } from './components/Footer.ts';
import { renderHero } from './sections/Hero.ts';
import { renderContentBlock, initContentBlocks } from './sections/ContentBlock.ts';
import { initRequestWizard } from './sections/RequestWizard.ts';
import { renderBottomNav, initBottomNav } from './components/BottomNav.ts';
import { renderFloatingCallButton } from './components/FloatingCallButton.ts';
import { renderFloatingWhatsAppButton } from './components/FloatingWhatsAppButton.ts';
import { renderChatWidget, initChatWidget } from './components/ChatWidget.ts';
import { renderDemoBadges } from './components/DemoBadges.ts';
import { renderStoriesStrip, initStoriesStrip } from './components/StoriesStrip.ts';
import { initLangToggle } from './components/LangToggle.ts';
import { bootstrapI18n } from './i18n/bootstrap.ts';
import { trackPageView } from './utils/analytics.ts';
import { pick } from './i18n/lang.ts';
import { loadSettings, fetchPublicTestimonials, fetchPublicStories } from './utils/dynamicContent.ts';
import type { PublicTestimonial, PublicStory, HomepageSection } from './utils/dynamicContent.ts';
import { applyTheme } from './utils/theme.ts';
import { applySiteSeoSettings } from './utils/seo.ts';
import { applyBranding, applySiteNameEverywhere } from './utils/branding.ts';
import { forceSiteLanguageIfSingleMode, hideLanguageToggleIfSingleMode } from './i18n/languageMode.ts';
import { DEFAULT_VEHICLE_TYPES } from './data/services.ts';
import { markAppReady } from './utils/appReady.ts';
import { fetchCurrentCustomer } from './utils/customerAuth.ts';
import { fetchOrdersByPhone } from './utils/api.ts';
import { extractSavedAddresses } from './utils/addresses.ts';

// وقتی خریدار هنوز چیدمان صفحه اصلی را شخصی‌سازی نکرده، این چیدمان نمونه (نه ثابت و نه اجباری) نمایش داده
// می‌شود تا صفحه از همان اول خالی به نظر نرسد — ولی از دید سیستم، این‌ها هم فقط چند بلوک عادی‌اند که از تنظیمات
// سایت کاملاً قابل ویرایش، جابه‌جایی یا حذف‌اند، نه نوع بخش ثابت و مخصوص.
const DEFAULT_HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: 'hero', type: 'hero', visible: true },
  {
    id: 'starter-steps',
    type: 'block',
    layout: 'steps',
    visible: true,
    items: [
      {
        id: 'step-1',
        title: 'درخواست خود را ثبت کنید',
        titleEn: 'Submit your request',
        text: 'مبدأ، مقصد و نوع بار را مشخص کنید.',
        textEn: 'Specify the origin, destination, and type of load.',
      },
      {
        id: 'step-2',
        title: 'با شما هماهنگ می‌کنیم',
        titleEn: "We'll coordinate with you",
        text: 'در کوتاه‌ترین زمان تماس می‌گیریم و زمان دقیق را هماهنگ می‌کنیم.',
        textEn: "We'll call you shortly to confirm the exact time.",
      },
      {
        id: 'step-3',
        title: 'کار را انجام می‌دهیم',
        titleEn: 'We get it done',
        text: 'با دقت و مسئولیت، بار یا وسایل شما را جابه‌جا می‌کنیم.',
        textEn: 'We move your goods or belongings carefully and responsibly.',
      },
    ],
  },
  {
    id: 'starter-grid',
    type: 'block',
    layout: 'grid',
    visible: true,
    items: [
      { id: 'trust-1', title: 'درخواست سریع و آسان', titleEn: 'Fast and easy request' },
      { id: 'trust-2', title: 'هماهنگی مستقیم، بدون واسطه', titleEn: 'Direct coordination, no middlemen' },
      { id: 'trust-3', title: 'انجام کار توسط خودمان', titleEn: 'The work is done by our own team' },
      { id: 'trust-4', title: 'پوشش خدمات مختلف حمل', titleEn: 'Coverage of various moving services' },
      { id: 'trust-5', title: 'طراحی ساده و شفاف', titleEn: 'Simple, transparent design' },
    ],
  },
  {
    id: 'starter-faq',
    type: 'block',
    layout: 'accordion',
    visible: true,
    items: [
      {
        id: 'faq-1',
        title: 'بهبار دقیقاً چه خدماتی ارائه می‌دهد؟',
        titleEn: 'What services does Behbar offer exactly?',
        text: 'بهبار امکان ثبت آنلاین درخواست اسباب‌کشی، باربری و حمل بار را در سراسر ایران فراهم می‌کند. خدمات شامل جابه‌جایی با وانت، نیسان، خاور و کامیون، برای منازل مسکونی و همچنین واحدهای تجاری، اداری و انباری است.',
        textEn:
          'Behbar lets you submit online requests for moving, hauling, and freight services across Iran. Services include moving by pickup, van, light truck, and truck, for residential homes as well as commercial, office, and warehouse units.',
      },
      {
        id: 'faq-2',
        title: 'هزینه‌ای که پیش از ثبت درخواست نمایش داده می‌شود قطعی است؟',
        titleEn: 'Is the price shown before submitting a request final?',
        text: 'خیر. عدد نمایش‌داده‌شده یک برآورد اولیه بر اساس اطلاعاتی است که در فرم وارد می‌کنید. قیمت نهایی پیش از شروع کار با کارشناسان بهبار هماهنگ و تأیید می‌شود.',
        textEn: 'No. The number shown is a preliminary estimate based on the information you enter in the form. The final price is confirmed with the Behbar team before the work begins.',
      },
      {
        id: 'faq-3',
        title: 'چقدر طول می‌کشد تا با من تماس بگیرید؟',
        titleEn: 'How long until you contact me?',
        text: 'پس از ثبت درخواست، تیم بهبار در کوتاه‌ترین زمان ممکن با شماره‌ای که وارد کرده‌اید تماس می‌گیرد تا جزئیات کار و زمان دقیق اجرا را هماهنگ کند.',
        textEn: 'After you submit a request, the Behbar team calls the number you provided as soon as possible to confirm the details and exact time of the job.',
      },
      {
        id: 'faq-4',
        title: 'آیا امکان جابه‌جایی بین‌شهری هم وجود دارد؟',
        titleEn: 'Is intercity moving available too?',
        text: 'بله. مبدأ و مقصد می‌توانند در دو شهر یا استان متفاوت باشند. در این حالت، برآورد هزینه بر اساس فاصله واقعی بین مبدأ و مقصد محاسبه می‌شود.',
        textEn: 'Yes. The origin and destination can be in two different cities or provinces. In that case, the cost estimate is calculated based on the actual distance between them.',
      },
      {
        id: 'faq-5',
        title: 'اگر طبقه محل من آسانسور نداشته باشد چه می‌شود؟',
        titleEn: "What if my building's floor has no elevator?",
        text: 'وضعیت آسانسور و شماره طبقه در فرآیند ثبت درخواست پرسیده می‌شود و در برآورد هزینه لحاظ می‌شود، زیرا حمل بار در طبقات بدون آسانسور معمولاً هزینه بیشتری دارد.',
        textEn: "The elevator status and floor number are asked during the request process and factored into the cost estimate, since carrying loads on floors without an elevator usually costs more.",
      },
      {
        id: 'faq-6',
        title: 'آیا خدمات بسته‌بندی هم ارائه می‌دهید؟',
        titleEn: 'Do you offer packing services?',
        text: 'بله. در فرآیند ثبت درخواست می‌توانید نیاز به خدمات بسته‌بندی را مشخص کنید تا این خدمت به‌عنوان بخشی از برآورد هزینه در نظر گرفته شود.',
        textEn: 'Yes. During the request process you can indicate that you need packing services, and it will be factored into the cost estimate.',
      },
      {
        id: 'faq-7',
        title: 'چگونه می‌توانم وضعیت درخواست خود را پیگیری کنم؟',
        titleEn: 'How can I track the status of my request?',
        text: 'از طریق بخش «درخواست‌های من» و با وارد کردن شماره موبایلی که هنگام ثبت درخواست استفاده کرده‌اید، می‌توانید وضعیت سفارش خود را مشاهده کنید.',
        textEn: 'Go to the "My Requests" section and enter the mobile number you used when submitting the request to view its status.',
      },
      {
        id: 'faq-8',
        title: 'آیا می‌توانم زمان درخواست را تغییر دهم یا آن را لغو کنم؟',
        titleEn: 'Can I change the time of my request or cancel it?',
        text: 'بله. برای تغییر زمان یا لغو یک درخواست ثبت‌شده کافی است از طریق شماره تماس بهبار با تیم پشتیبانی در ارتباط باشید.',
        textEn: "Yes. To reschedule or cancel a submitted request, simply reach the support team via Behbar's phone number.",
      },
      {
        id: 'faq-9',
        title: 'برای چه نوع مکان‌هایی می‌توانم درخواست ثبت کنم؟',
        titleEn: 'What types of locations can I submit a request for?',
        text: 'در فرآیند ثبت درخواست، نوع مکان مبدأ و مقصد—مسکونی، تجاری، اداری یا انباری—مشخص می‌شود، زیرا این موضوع در نحوه اجرای کار و برآورد هزینه اثرگذار است.',
        textEn:
          'During the request process, the type of the origin and destination location — residential, commercial, office, or warehouse — is specified, since it affects how the job is carried out and the cost estimate.',
      },
      {
        id: 'faq-10',
        title: 'آیا اطلاعات من نزد بهبار محفوظ می‌ماند؟',
        titleEn: 'Is my information kept safe by Behbar?',
        text: 'بله. اطلاعات ثبت‌شده صرفاً برای هماهنگی و اجرای درخواست شما استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد. جزئیات کامل در صفحه حریم خصوصی درج شده است.',
        textEn: 'Yes. The information submitted is used solely to coordinate and carry out your request and is not shared with third parties. Full details are on the privacy page.',
      },
    ],
  },
  { id: 'starter-testimonials', type: 'block', layout: 'testimonials', visible: true },
];

function renderApp(settings: Awaited<ReturnType<typeof loadSettings>>, testimonials: PublicTestimonial[], stories: PublicStory[]): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const vehicleTypes = settings.vehicle_types?.length ? settings.vehicle_types : DEFAULT_VEHICLE_TYPES;
  const sections = settings.homepage_layout?.sections?.length ? settings.homepage_layout.sections : DEFAULT_HOMEPAGE_SECTIONS;
  const hasHero = sections.some((s) => s.type === 'hero');
  const visibleStories = settings.homepage_layout?.storiesEnabled === false ? [] : stories;

  const body = (hasHero ? sections : [{ id: 'hero', type: 'hero' as const, visible: true }, ...sections])
    .map((section) => {
      if (section.type !== 'hero' && section.visible === false) return '';
      return section.type === 'hero'
        ? renderHero(vehicleTypes, section, settings.service_cities, settings.service_categories)
        : renderContentBlock(section, testimonials);
    })
    .join('');

  app.innerHTML = `
    <a class="skip-link" href="#main-content">${pick('رفتن به محتوای اصلی', 'Skip to main content')}</a>
    ${renderHeader(settings)}
    ${renderStoriesStrip(visibleStories)}
    <main id="main-content">
      ${body}
    </main>
    ${renderFooter(settings)}
    ${renderBottomNav()}
    <div class="header-quick-actions">
      ${renderFloatingCallButton(settings)}
      ${renderFloatingWhatsAppButton(settings)}
      ${renderChatWidget()}
    </div>
    ${renderDemoBadges()}
  `;
}

function scrollToHashIfPresent(): void {
  if (!location.hash) return;
  document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
}

async function init(): Promise<void> {
  trackPageView();
  const [settings, testimonials, stories] = await Promise.all([loadSettings(), fetchPublicTestimonials(), fetchPublicStories()]);
  forceSiteLanguageIfSingleMode(settings.language_mode);
  applyTheme(settings.theme);
  applySiteSeoSettings(settings.seo);
  const vehicleTypes = settings.vehicle_types?.length ? settings.vehicle_types : DEFAULT_VEHICLE_TYPES;
  renderApp(settings, testimonials, stories);
  markAppReady();
  applyBranding(settings.branding);
  applySiteNameEverywhere(settings.site_name);
  hideLanguageToggleIfSingleMode(settings.language_mode);

  initHeader(settings);
  initFooter(settings);
  const wizardController = initRequestWizard(vehicleTypes, settings.service_cities);
  initContentBlocks();
  initBottomNav();
  initLangToggle();
  initChatWidget();
  initStoriesStrip(settings.homepage_layout?.storiesEnabled === false ? [] : stories);

  scrollToHashIfPresent();

  // اگر مشتری وارد حساب کاربری خود شده، آدرس‌های مبدأ/مقصد سفارش‌های قبلی‌اش برای انتخاب سریع در فرم آماده می‌شود.
  fetchCurrentCustomer()
    .then((customer) => {
      if (!customer) return;
      return fetchOrdersByPhone(customer.phone).then((orders) => {
        wizardController.setSavedAddresses(extractSavedAddresses(orders));
      });
    })
    .catch(() => {
      /* بی‌اهمیت — فرم بدون لیست آدرس‌های قبلی هم کاملاً کار می‌کند. */
    });
}

bootstrapI18n(() => void init());
