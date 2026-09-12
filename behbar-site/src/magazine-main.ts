import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import './styles/main.css';

import { renderHeader, initHeader } from './components/Header.ts';
import { renderFooter, initFooter } from './components/Footer.ts';
import { renderBottomNav, initBottomNav } from './components/BottomNav.ts';
import { renderFloatingCallButton } from './components/FloatingCallButton.ts';
import { renderFloatingWhatsAppButton } from './components/FloatingWhatsAppButton.ts';
import { renderChatWidget, initChatWidget } from './components/ChatWidget.ts';
import { renderMagazineIndex } from './sections/MagazineIndex.ts';
import { initLangToggle } from './components/LangToggle.ts';
import { bootstrapI18n } from './i18n/bootstrap.ts';
import { trackPageView } from './utils/analytics.ts';
import { pick } from './i18n/lang.ts';
import { fetchPublicArticles, loadSettings } from './utils/dynamicContent.ts';
import type { DynamicArticle } from './utils/dynamicContent.ts';
import { applyTheme } from './utils/theme.ts';
import { applySiteSeoSettings } from './utils/seo.ts';
import { applyBranding, applySiteNameEverywhere } from './utils/branding.ts';
import { forceSiteLanguageIfSingleMode, hideLanguageToggleIfSingleMode } from './i18n/languageMode.ts';
import { markAppReady } from './utils/appReady.ts';

function renderApp(articles: DynamicArticle[], settings: Awaited<ReturnType<typeof loadSettings>>): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  app.innerHTML = `
    <a class="skip-link" href="#main-content">${pick('رفتن به محتوای اصلی', 'Skip to main content')}</a>
    ${renderHeader(settings)}
    <main id="main-content">
      ${renderMagazineIndex(articles)}
    </main>
    ${renderFooter(settings)}
    ${renderBottomNav()}
    <div class="header-quick-actions">
      ${renderFloatingCallButton(settings)}
      ${renderFloatingWhatsAppButton(settings)}
      ${renderChatWidget()}
    </div>
  `;
}

async function init(): Promise<void> {
  trackPageView();
  const [articles, settings] = await Promise.all([fetchPublicArticles(), loadSettings()]);
  forceSiteLanguageIfSingleMode(settings.language_mode);
  applyTheme(settings.theme);
  applySiteSeoSettings(settings.seo);
  renderApp(articles, settings);
  markAppReady();
  applyBranding(settings.branding);
  applySiteNameEverywhere(settings.site_name);
  hideLanguageToggleIfSingleMode(settings.language_mode);
  initHeader(settings);
  initFooter(settings);
  initBottomNav();
  initLangToggle();
  initChatWidget();
}

bootstrapI18n(() => void init());
