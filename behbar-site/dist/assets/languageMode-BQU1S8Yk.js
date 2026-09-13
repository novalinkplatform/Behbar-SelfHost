import{S as e,_ as t,b as n,g as r,h as i,i as a,p as o,v as s,x as c,y as l}from"./appReady-JFOdjg2Y.js";function u(e=``){let n=t();return`
    <button type="button" class="lang-toggle ${e}" data-lang-toggle aria-label="Switch language / تغییر زبان">
      <span data-lang-option="fa" class="${n===`fa`?`is-active`:``}">فا</span>
      <span data-lang-option="en" class="${n===`en`?`is-active`:``}">EN</span>
    </button>
  `}function d(){document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{c(t()===`fa`?`en`:`fa`)})})}function f(t=``){return`
    <button type="button" class="theme-toggle ${t}" data-theme-toggle aria-label="${n(`تغییر تم شب/روز`,`Toggle theme`)}" title="${n(`تغییر حالت شب/روز (تم سبز تیره شیشه‌ای)`,`Toggle Dark/Light theme`)}">
      <span class="icon icon-theme-sun" data-theme-sun hidden>${e.sun}</span>
      <span class="icon icon-theme-moon" data-theme-moon>${e.moon}</span>
    </button>
  `}function p(){let e=document.documentElement.getAttribute(`data-theme`)===`dark`;document.querySelectorAll(`[data-theme-sun]`).forEach(t=>{t.hidden=!e}),document.querySelectorAll(`[data-theme-moon]`).forEach(t=>{t.hidden=e})}function m(){p(),document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{document.documentElement.getAttribute(`data-theme`)===`dark`?(document.documentElement.removeAttribute(`data-theme`),localStorage.setItem(`behbar_theme`,`light`)):(document.documentElement.setAttribute(`data-theme`,`dark`),localStorage.setItem(`behbar_theme`,`dark`)),p()})})}function h(t){let r=[],i=t?.legal_pages;if(i?.about?.showInHeader&&r.push({href:`/about`,label:n(i.about.title,i.about.titleEn)||n(`درباره ما`,`About Us`),icon:e.user}),i?.terms?.showInHeader&&r.push({href:`/terms`,label:n(i.terms.title,i.terms.titleEn)||n(`قوانین و مقررات`,`Terms & Conditions`),icon:e.shield}),i?.privacy?.showInHeader&&r.push({href:`/privacy`,label:n(i.privacy.title,i.privacy.titleEn)||n(`حریم خصوصی`,`Privacy Policy`),icon:e.lock}),Array.isArray(t?.nav_pages))for(let i of t.nav_pages)i.showInHeader&&r.push({href:`/page/${encodeURIComponent(i.slug)}`,label:n(i.title,i.titleEn)||i.title,icon:e.article});return r}function g(t){let r=h(t).map(e=>`
        <a class="header-item header-extra-item" href="${e.href}">
          <span class="icon">${e.icon}</span>
          <span class="header-label">${e.label}</span>
        </a>
      `).join(``);return`
    <header class="site-header">
      <div class="header-group">
        <a class="header-logo" href="/" aria-label="${n(`خانه`,`Home`)}">
          <img src="/favicon.svg" alt="" />
        </a>

        <div class="header-pill">
          <a class="header-item header-home" href="/" aria-label="${n(`خانه`,`Home`)}">
            <span class="icon">${e.home}</span>
            <span class="header-label">${n(`خانه`,`Home`)}</span>
          </a>

          <a class="header-item" href="/magazine">
            <span class="icon">${e.article}</span>
            <span class="header-label">${n(`مجله`,`Magazine`)}</span>
          </a>

          <a class="header-item" href="/orders">
            <span class="icon">${e.box}</span>
            <span class="header-label">${n(`درخواست‌های من`,`My requests`)}</span>
          </a>

          ${r}
        </div>

        <a class="header-cta" href="/#request">
          <span class="icon">${e.plusCircle}</span>
          <span class="header-label">${n(`ثبت درخواست`,`Submit request`)}</span>
        </a>

        ${f()}
        ${u()}

        <a class="header-profile" href="/profile">
          <span class="icon">${e.user}</span>
          <span class="header-label">${n(`ورود`,`Log in`)}</span>
        </a>
      </div>
    </header>
  `}var _=null;function v(e){m();let t=document.querySelector(`.site-header`);if(t){if(e){let n=t.querySelector(`.header-pill`);if(n&&!n.querySelector(`.header-extra-item`)){let t=h(e);if(t.length){let e=t.map(e=>`
              <a class="header-item header-extra-item" href="${e.href}">
                <span class="icon">${e.icon}</span>
                <span class="header-label">${e.label}</span>
              </a>
            `).join(``);n.insertAdjacentHTML(`beforeend`,e)}}}_&&window.removeEventListener(`scroll`,_),_=()=>{t.classList.toggle(`is-scrolled`,window.scrollY>24),document.body.classList.toggle(`page-scrolled`,window.scrollY>200)},_(),window.addEventListener(`scroll`,_,{passive:!0})}}var y={phoneDisplay:`021-200200`,phoneTelHref:`tel:+9821200200`,socialLinks:[{id:`wa1`,platform:`whatsapp`,label:`واتساپ`,url:`https://wa.me/9821200200`},{id:`tg1`,platform:`telegram`,label:`تلگرام`,url:`#`},{id:`ig1`,platform:`instagram`,label:`اینستاگرام`,url:`#`},{id:`em1`,platform:`mail`,label:`ایمیل`,url:`#`}]};function b(e){return e?{...e,socialLinks:e.socialLinks??y.socialLinks}:y}function x(e){return s(b(e).phoneDisplay)}function S(e){let t=[];t.push({href:`/`,label:n(`خانه`,`Home`)});let r=e?.legal_pages;if((!r?.terms||r.terms.showInFooter!==!1)&&t.push({href:`/terms`,label:n(r?.terms?.title,r?.terms?.titleEn)||n(`قوانین و مقررات`,`Terms & Conditions`)}),(!r?.privacy||r.privacy.showInFooter!==!1)&&t.push({href:`/privacy`,label:n(r?.privacy?.title,r?.privacy?.titleEn)||n(`حریم خصوصی`,`Privacy Policy`)}),(!r?.about||r.about.showInFooter!==!1)&&t.push({href:`/about`,label:n(r?.about?.title,r?.about?.titleEn)||n(`درباره ما`,`About Us`)}),Array.isArray(e?.nav_pages))for(let r of e.nav_pages)r.showInFooter&&t.push({href:`/page/${encodeURIComponent(r.slug)}`,label:n(r.title,r.titleEn)||r.title});return t}function C(e){return S(e).map(e=>`<li><a href="${e.href}">${e.label}</a></li>`).join(``)}var w={fa:`بهبار`,en:`Behbar`},T={telegram:`telegramFilled`,whatsapp:`whatsappFilled`,instagram:`instagramFilled`,linkedin:`linkedinFilled`,youtube:`youtubeFilled`,twitterX:`twitterXFilled`,facebook:`facebookFilled`,mail:`mailFilled`,globe:`globeFilled`},E={googlePlay:`Google Play`,appStore:`App Store`,bazaar:`کافه‌بازار`,custom:``};function D(t,n){return t.length?`
    <div class="footer-social" ${n}>
      ${t.map(t=>{let n=t.customIconUrl?`<img src="${t.customIconUrl}" alt="${t.label}" style="width:20px;height:20px;object-fit:contain;border-radius:4px;" />`:e[T[t.platform]??`globe`],r=t.platform===`mail`;return`<a href="${t.url}" ${r?``:`target="_blank" rel="noopener"`} aria-label="${t.label}"><span class="icon">${n}</span></a>`}).join(``)}
    </div>
  `:``}function O(t){return!t?.enabled||!t.links.length?``:`
    <div class="footer-extras-column">
      <span class="footer-extras-label">${n(`دانلود اپلیکیشن`,`Get the app`)}</span>
      <div class="footer-app-links">
        ${t.links.map(t=>`
          <a class="footer-app-badge" href="${t.url}" target="_blank" rel="noopener">
            <span class="icon">${e.download}</span>
            <span>${t.label||E[t.platform]}</span>
          </a>
        `).join(``)}
      </div>
    </div>
  `}function ee(e){return!e?.enabled||!e.badges.length?``:`
    <div class="footer-extras-column">
      <span class="footer-extras-label">${n(`مجوزها و نمادها`,`Licenses & trust seals`)}</span>
      <div class="footer-certifications">
        ${e.badges.map(e=>`
          <a class="footer-cert-badge" href="${e.linkUrl||`#`}" target="_blank" rel="noopener" aria-label="${e.label}">
            <img src="${e.imageUrl}" alt="${e.label}" loading="lazy" />
          </a>
        `).join(``)}
      </div>
    </div>
  `}function te(e){let t=O(e?.app_links),n=ee(e?.certifications);return!t&&!n?``:`<div class="footer-extras">${t}${n}</div>`}function ne(t){let r=new Date().getFullYear(),i=t?.site_name??w,a=t?.footer,o=a?.copyright?.fa;o?i.fa&&i.fa!==`بهبار`&&o.includes(`بهبار`)&&(o=o.replace(/به‌بار|به بار|بهبار/g,i.fa)):o=i.fa?`همه حقوق برای ${i.fa} محفوظ است.`:`همه حقوق محفوظ است.`;let s=a?.copyright?.en;s?i.en&&i.en.toLowerCase()!==`behbar`&&/behbar/i.test(s)&&(s=s.replace(/behbar/gi,i.en)):s=i.en?`All rights reserved for ${i.en}.`:`All rights reserved.`;let c={fa:o,en:s},l=a?.seoParagraphs,u=(Array.isArray(l)?l:[]).map(e=>({fa:e.fa.replace(/به‌بار|به بار/g,`بهبار`),en:e.en})),d=b(t?.contact),f=d.socialIconColor?`style="--footer-social-color:${d.socialIconColor}"`:``;return`
    <footer class="site-footer" id="footer">
      <div class="container footer-islands">
        <div class="footer-island footer-island-main">
          <div class="footer-menu-row">
            <nav class="footer-nav" aria-label="${n(`ناوبری فوتر`,`Footer navigation`)}">
              <ul>
                ${C(t)}
              </ul>
            </nav>
          </div>

          <div class="footer-contact-row">
            ${D(d.socialLinks,f)}
            <a class="footer-phone" href="${d.phoneTelHref}">
              <span class="icon">${e.phone}</span>
              <span dir="ltr">${x(d)}</span>
            </a>
          </div>

          ${te(t)}

          <div class="footer-bottom">
            <p>© ${r} ${n(c.fa,c.en)}</p>
          </div>
        </div>

        ${u.length?`
        <div class="footer-island footer-island-seo">
          <div class="footer-seo-box" id="footer-seo-box">
            <h2 class="visually-hidden">${n(`درباره اسکریپت ${i.fa}`,`About ${i.en} Script`)}</h2>
            <div class="footer-seo-text" id="footer-seo-text">
              ${u.map(e=>`<p>${n(e.fa,e.en)}</p>`).join(``)}
            </div>
            <button type="button" class="footer-seo-toggle" id="footer-seo-toggle" aria-expanded="false">
              <span class="footer-seo-toggle-label">${n(`ادامه مطلب`,`Read more`)}</span>
              <span class="icon">${e.chevronDown}</span>
            </button>
          </div>
        </div>
        `:``}
      </div>
    </footer>
  `}function k(e){if(e){let t=document.querySelector(`.site-footer .footer-nav ul`);t&&(t.innerHTML=C(e))}let t=document.getElementById(`footer-seo-box`),r=document.getElementById(`footer-seo-toggle`),i=r?.querySelector(`.footer-seo-toggle-label`);!t||!r||!i||r.addEventListener(`click`,()=>{let e=t.classList.toggle(`is-expanded`);r.setAttribute(`aria-expanded`,String(e)),i.textContent=e?n(`بستن`,`Close`):n(`ادامه مطلب`,`Read more`)})}function A(){return`
    ${f(`theme-toggle-floating`)}
    ${u(`lang-toggle-floating`)}
    <nav class="bottom-nav" aria-label="${n(`ناوبری پایین صفحه`,`Bottom navigation`)}">
      <a class="bottom-nav-item" href="/">
        <span class="icon">${e.home}</span>
        <span>${n(`خانه`,`Home`)}</span>
      </a>
      <a class="bottom-nav-item" href="/magazine">
        <span class="icon">${e.layers}</span>
        <span>${n(`مجله`,`Magazine`)}</span>
      </a>
      <a class="bottom-nav-item" href="/orders">
        <span class="icon">${e.box}</span>
        <span>${n(`درخواست‌ها`,`Orders`)}</span>
      </a>
      <button type="button" class="bottom-nav-item" id="bottom-nav-chat-btn">
        <span class="icon">${e.chat}</span>
        <span>${n(`پیام`,`Message`)}</span>
      </button>
      <a class="bottom-nav-item" href="/profile">
        <span class="icon">${e.user}</span>
        <span>${n(`پروفایل`,`Profile`)}</span>
      </a>
    </nav>
  `}function j(){let e=document.querySelectorAll(`.bottom-nav-item[href]`),t=location.pathname;for(let n of e){let e=(n.getAttribute(`href`)??`/`).split(`#`)[0]||`/`;if(e===`/`?t===`/`:t.startsWith(e)){n.classList.add(`is-active`);break}}document.getElementById(`bottom-nav-chat-btn`)?.addEventListener(`click`,()=>{document.getElementById(`chat-widget-toggle`)?.click()})}function M(t){let r=b(t?.contact);return`
    <a class="floating-call" href="${r.phoneTelHref}" aria-label="${n(`تماس با بهبار`,`Call Behbar`)}">
      <span class="floating-call-icon-wrap">
        <span class="floating-call-wave"></span>
        <span class="floating-call-wave floating-call-wave-delay"></span>
        <span class="icon">${e.phone}</span>
      </span>
      <span class="floating-call-number" dir="ltr">${x(r)}</span>
    </a>
  `}function N(t){let r=b(t?.contact).socialLinks?.find(e=>e.platform===`whatsapp`&&e.url&&e.url!==`#`);return r?`
    <a class="floating-whatsapp" href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="${n(`پیام در واتساپ`,`Message on WhatsApp`)}">
      <span class="floating-whatsapp-icon-wrap">
        <span class="floating-whatsapp-wave"></span>
        <span class="floating-whatsapp-wave floating-whatsapp-wave-delay"></span>
        <span class="icon">${e.whatsapp}</span>
      </span>
      <span class="floating-whatsapp-label">${n(`واتساپ`,`WhatsApp`)}</span>
    </a>
  `:``}var P=`behbar_chat_token`,F=`behbar_chat_name`,I=4e3;function L(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return``;let n=String(t.getHours()).padStart(2,`0`),r=String(t.getMinutes()).padStart(2,`0`);return o(`${n}:${r}`)}function R(e,t){return t?`<img class="chat-avatar" src="${t}" alt="${e}" />`:`<span class="chat-avatar chat-avatar-fallback">${e.trim().charAt(0)||`؟`}</span>`}function z(t){if(t.type===`image`){let e=`${a}${t.text}`;return`<a href="${e}" target="_blank" rel="noopener"><img class="chat-bubble-image" src="${e}" alt="${n(`تصویر ارسالی`,`Sent image`)}" loading="lazy" /></a>`}if(t.type===`location`){let r=``;try{let e=JSON.parse(t.text);typeof e.lat==`number`&&typeof e.lng==`number`&&(r=`https://www.google.com/maps?q=${e.lat},${e.lng}`)}catch{}return r?`<a class="chat-bubble-location" href="${r}" target="_blank" rel="noopener"><span class="icon">${e.pin}</span><span>${n(`مشاهده موقعیت روی نقشه`,`View location on map`)}</span></a>`:`<p>${n(`موقعیت نامعتبر`,`Invalid location`)}</p>`}return`<p>${t.text.replace(/</g,`&lt;`)}</p>`}function B(){let e=localStorage.getItem(P);return e||(e=crypto.randomUUID(),localStorage.setItem(P,e)),e}function V(){return`
    <button type="button" class="chat-widget-button" id="chat-widget-toggle" aria-label="${n(`چت با پشتیبانی`,`Chat with support`)}" aria-expanded="false">
      <span class="chat-widget-icon-wrap">
        <span class="icon">${e.chat}</span>
      </span>
      <span class="chat-widget-label">${n(`پیام برخط با پشتیبانی`,`Live chat with support`)}</span>
    </button>
    <div class="chat-widget-panel" id="chat-widget-panel" hidden>
      <div class="chat-widget-header">
        <div class="chat-widget-header-info">
          <span id="chat-widget-header-avatar" hidden></span>
          <span id="chat-widget-header-title">${n(`گفتگو با پشتیبانی بهبار`,`Chat with Behbar support`)}</span>
        </div>
        <button type="button" class="chat-widget-close" id="chat-widget-close" aria-label="${n(`بستن`,`Close`)}">
          <span class="icon">${e.close}</span>
        </button>
      </div>
      <div class="chat-widget-messages" id="chat-widget-messages"></div>
      <p class="chat-widget-notice" id="chat-widget-notice" hidden></p>
      <form class="chat-widget-input-row" id="chat-widget-form">
        <input type="file" accept="image/*" id="chat-widget-image-input" hidden />
        <button type="button" class="chat-widget-attach-btn" id="chat-widget-attach-btn" aria-label="${n(`ارسال عکس`,`Send photo`)}">
          <span class="icon">${e.image}</span>
        </button>
        <button type="button" class="chat-widget-location-btn" id="chat-widget-location-btn" aria-label="${n(`ارسال موقعیت`,`Send location`)}">
          <span class="icon">${e.pin}</span>
        </button>
        <input type="text" id="chat-widget-input" placeholder="${n(`پیام خود را بنویسید...`,`Type your message...`)}" autocomplete="off" />
        <button type="submit" class="chat-widget-send" aria-label="${n(`ارسال`,`Send`)}">
          <span class="icon">${e.telegram}</span>
        </button>
      </form>
    </div>
  `}function H(){let e=document.getElementById(`chat-widget-toggle`),t=document.getElementById(`chat-widget-close`),r=document.getElementById(`chat-widget-panel`),i=document.getElementById(`chat-widget-header-avatar`),o=document.getElementById(`chat-widget-header-title`),s=document.getElementById(`chat-widget-messages`),c=document.getElementById(`chat-widget-form`),l=document.getElementById(`chat-widget-input`),u=document.getElementById(`chat-widget-notice`),d=document.getElementById(`chat-widget-attach-btn`),f=document.getElementById(`chat-widget-image-input`),p=document.getElementById(`chat-widget-location-btn`);if(!e||!t||!r||!i||!o||!s||!c||!l||!u||!d||!f||!p)return;let m=B(),h,g=!1,_;function v(e){u.textContent=e,u.hidden=!1,_!==void 0&&window.clearTimeout(_),_=window.setTimeout(()=>{u.hidden=!0},4e3)}function y(e){if(!e.length){s.innerHTML=`<p class="chat-widget-empty">${n(`پیامی هنوز ثبت نشده؛ اولین پیام را بفرستید!`,`No messages yet — send the first one!`)}</p>`;return}let t=s.scrollHeight-s.scrollTop-s.clientHeight<40;s.innerHTML=e.map((t,r)=>{let i=t.staffName??n(`پشتیبانی`,`Support`),a=e[r-1]?.sender===t.sender;return`
      <div class="chat-bubble chat-bubble-${t.sender}${a?` chat-bubble-grouped`:``}">
        ${t.sender===`staff`&&!a?`<span class="chat-bubble-author">${R(i,t.staffAvatar)}<span>${i}</span></span>`:``}
        ${z(t)}
        <span class="chat-bubble-time">${L(t.createdAt)}</span>
      </div>
    `}).join(``),t&&(s.scrollTop=s.scrollHeight)}function b(e){e?(i.hidden=!1,i.innerHTML=R(e.name,e.avatarUrl),o.textContent=e.name):(i.hidden=!0,i.innerHTML=``,o.textContent=n(`گفتگو با پشتیبانی بهبار`,`Chat with Behbar support`))}async function x(){try{let e=await(await fetch(`${a}/api/chat/${m}`)).json().catch(()=>({}));y(e?.messages??[]),b(e?.conversation?.assignedStaff??null)}catch{}}let S=()=>window.matchMedia(`(max-width: 768px)`).matches;function C(){g=!0,r.hidden=!1,e.setAttribute(`aria-expanded`,`true`),S()&&(document.body.style.overflow=`hidden`),x(),h===void 0&&(h=window.setInterval(()=>void x(),I))}function w(){g=!1,r.hidden=!0,e.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``,h!==void 0&&(window.clearInterval(h),h=void 0)}e.addEventListener(`click`,()=>g?w():C()),t.addEventListener(`click`,w);async function T(e){try{return(await fetch(`https://api.behbarapp.ir/api/chat/${m}/messages`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({customerName:localStorage.getItem(F)??void 0,...e})})).ok?(await x(),!0):!1}catch{return!1}}d.addEventListener(`click`,()=>f.click()),f.addEventListener(`change`,async()=>{let e=f.files?.[0];if(f.value=``,e){d.disabled=!0;try{let t=await fetch(`${a}/api/chat/${m}/upload`,{method:`POST`,headers:{"Content-Type":e.type},body:e});if(!t.ok){v(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`));return}let{url:r}=await t.json();await T({type:`image`,text:r})||v(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}catch{v(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}finally{d.disabled=!1}}}),p.addEventListener(`click`,()=>{if(!navigator.geolocation){v(n(`مرورگر شما از ارسال موقعیت پشتیبانی نمی‌کند.`,`Your browser does not support sharing location.`));return}p.disabled=!0,navigator.geolocation.getCurrentPosition(async e=>{await T({type:`location`,lat:e.coords.latitude,lng:e.coords.longitude})||v(n(`ارسال موقعیت ناموفق بود.`,`Sending the location failed.`)),p.disabled=!1},()=>{v(n(`دسترسی به موقعیت مکانی رد شد یا در دسترس نیست.`,`Location access was denied or is unavailable.`)),p.disabled=!1},{enableHighAccuracy:!0,timeout:8e3})}),c.addEventListener(`submit`,async e=>{e.preventDefault();let t=l.value.trim();t&&(l.value=``,await T({text:t}))})}function U(e){i(),e(),l(()=>e())}var W=null,G=null;async function K(){return W||G||(G=fetch(`${a}/api/settings`).then(e=>e.json()).then(e=>(W=e?.settings??{},W)).catch(()=>({})),G)}async function q(){try{return(await(await fetch(`https://api.behbarapp.ir/api/magazine/articles`)).json().catch(()=>({})))?.articles??[]}catch{return[]}}async function J(e){try{let t=await fetch(`${a}/api/magazine/articles/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.article??null:null}catch{return null}}async function Y(e){try{let t=await fetch(`${a}/api/pages/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.page??null:null}catch{return null}}async function X(){try{return(await(await fetch(`https://api.behbarapp.ir/api/testimonials`)).json().catch(()=>({})))?.testimonials??[]}catch{return[]}}async function Z(){try{return(await(await fetch(`https://api.behbarapp.ir/api/stories`)).json().catch(()=>({})))?.stories??[]}catch{return[]}}var re={primary:`--primary`,primaryDark:`--primary-dark`,secondary:`--secondary`,secondaryLight:`--secondary-light`,background:`--background`,surface:`--surface`,surfaceAlt:`--surface-alt`,text:`--text`,muted:`--muted`,border:`--border`,success:`--success`,successDark:`--success-dark`,successBg:`--success-bg`,warning:`--warning`,callGreen:`--call-green`,callGreenDark:`--call-green-dark`,accentPurple:`--accent-purple`,accentPurpleLight:`--accent-purple-light`,accentPurpleLightHover:`--accent-purple-light-hover`,gooseGreen:`--goose-green`,gooseGreenLight:`--goose-green-light`},ie=/^#[0-9a-fA-F]{6}$/;function ae(e){if(document.documentElement.classList.toggle(`quick-actions-fixed`,e?.quickActionsStyle===`fixed`),!e)return;let t=document.documentElement.style;for(let[n,r]of Object.entries(re)){let i=e[n];i&&ie.test(i)&&t.setProperty(r,i)}}function Q(e,t=`name`){let n=document.head.querySelector(`meta[${t}="${e}"]`);return n||(n=document.createElement(`meta`),n.setAttribute(t,e),document.head.appendChild(n)),n}function oe(e){if(e){if(e.googleSiteVerification&&Q(`google-site-verification`).setAttribute(`content`,e.googleSiteVerification),e.googleAnalyticsId&&!document.getElementById(`ga4-loader`)){let t=document.createElement(`script`);t.id=`ga4-loader`,t.async=!0,t.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(e.googleAnalyticsId)}`,document.head.appendChild(t);let n=document.createElement(`script`);n.id=`ga4-inline`,n.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${e.googleAnalyticsId}');`,document.head.appendChild(n)}e.defaultOgImage&&(Q(`og:image`,`property`).setAttribute(`content`,e.defaultOgImage),Q(`twitter:image`).setAttribute(`content`,e.defaultOgImage))}}function $(e,t){let n=t?.fa?.trim()||`بهبار`,r=e?.headline?.fa?.trim()||`حمل و جابه‌جایی، ساده‌تر از همیشه`,i=`${n} | ${r} - ${e?.subtitle?.fa?.trim()||`برای اثاث‌کشی یا حمل بار درخواست خود را ثبت کنید؛ در سریع‌ترین زمان با شما هماهنگ می‌کنیم.`}`;Q(`description`).setAttribute(`content`,i),Q(`og:description`,`property`).setAttribute(`content`,i),Q(`og:title`,`property`).setAttribute(`content`,`${n} | ${r}`),Q(`og:site_name`,`property`).setAttribute(`content`,n),Q(`twitter:description`).setAttribute(`content`,i),Q(`twitter:title`).setAttribute(`content`,`${n} | ${r}`),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let t=JSON.parse(e.textContent??``),r=!1;(t[`@type`]===`WebSite`||t[`@type`]===`LocalBusiness`||t[`@type`]===`Organization`)&&(t.description=i,t.name&&=n,r=!0),r&&(e.textContent=JSON.stringify(t))}catch{}})}function se(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/magazine/${e.slug}`;document.title=t,Q(`description`).setAttribute(`content`,n),Q(`og:title`,`property`).setAttribute(`content`,t),Q(`og:description`,`property`).setAttribute(`content`,n),Q(`og:url`,`property`).setAttribute(`content`,r),Q(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&(Q(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),Q(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`Article`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},...e.publishedAt?{datePublished:e.publishedAt}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function ce(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/p/${e.slug}`;document.title=t,Q(`description`).setAttribute(`content`,n),Q(`og:title`,`property`).setAttribute(`content`,t),Q(`og:description`,`property`).setAttribute(`content`,n),Q(`og:url`,`property`).setAttribute(`content`,r),Q(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&(Q(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),Q(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`WebPage`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function le(e){let t=e?.fa?.trim();if(!(!t||t===`بهبار`)&&(document.title.includes(`بهبار`)&&(document.title=document.title.replace(/بهبار/g,t)),document.querySelectorAll(`meta[property="og:site_name"], meta[property="og:title"], meta[name="twitter:title"]`).forEach(e=>{let n=e.getAttribute(`content`);n?.includes(`بهبار`)&&e.setAttribute(`content`,n.replace(/بهبار/g,t))}),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let n=JSON.parse(e.textContent??``),r=!1;n.name===`بهبار`&&(n.name=t,r=!0);let i=n.isPartOf;i?.name===`بهبار`&&(i.name=t,r=!0),r&&(e.textContent=JSON.stringify(n))}catch{}}),typeof document<`u`&&document.body)){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(e){let t=e.parentElement;if(!t)return NodeFilter.FILTER_SKIP;let n=t.tagName;return n===`SCRIPT`||n===`STYLE`||n===`INPUT`||n===`TEXTAREA`||n===`CODE`?NodeFilter.FILTER_SKIP:e.nodeValue?.includes(`بهبار`)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(let e of n)e.nodeValue=(e.nodeValue||``).replace(/بهبار/g,t)}}function ue(e){if(!e)return;e.logoUrl&&document.querySelectorAll(`.header-logo img, .logo-mark`).forEach(t=>{t.src=e.logoUrl});let t=e.faviconUrl||e.logoUrl;t&&document.querySelectorAll(`link[rel="icon"], link[rel="apple-touch-icon"]`).forEach(e=>{e.href=t})}function de(e){!e||e===`both`||t()!==e&&r(e)}function fe(e){!e||e===`both`||document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.style.display=`none`})}export{k as C,d as D,g as E,A as S,v as T,H as _,se as a,M as b,oe as c,q as d,Y as f,U as g,K as h,le as i,ae as l,X as m,fe as n,$ as o,Z as p,ue as r,ce as s,de as t,J as u,V as v,ne as w,j as x,N as y};