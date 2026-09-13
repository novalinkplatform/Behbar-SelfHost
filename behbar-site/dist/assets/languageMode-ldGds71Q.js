import{S as e,_ as t,b as n,f as r,g as i,h as a,m as o,v as s,x as c,y as l}from"./appReady-JxiP_u2W.js";var u={phoneDisplay:`021-200200`,phoneTelHref:`tel:+9821200200`,socialLinks:[{id:`wa1`,platform:`whatsapp`,label:`واتساپ`,url:`https://wa.me/9821200200`},{id:`tg1`,platform:`telegram`,label:`تلگرام`,url:`#`},{id:`ig1`,platform:`instagram`,label:`اینستاگرام`,url:`#`},{id:`em1`,platform:`mail`,label:`ایمیل`,url:`#`}]};function d(e){return e?{...e,socialLinks:e.socialLinks??u.socialLinks}:u}function f(e){return s(d(e).phoneDisplay)}function p(t){let r=d(t?.contact);return`
    <a class="floating-call" href="${r.phoneTelHref}" aria-label="${n(`تماس با بهبار`,`Call Behbar`)}">
      <span class="floating-call-icon-wrap">
        <span class="floating-call-wave"></span>
        <span class="floating-call-wave floating-call-wave-delay"></span>
        <span class="icon">${e.phone}</span>
      </span>
      <span class="floating-call-number" dir="ltr">${f(r)}</span>
    </a>
  `}function m(t){let r=d(t?.contact).socialLinks?.find(e=>e.platform===`whatsapp`&&e.url&&e.url!==`#`);return r?`
    <a class="floating-whatsapp" href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="${n(`پیام در واتساپ`,`Message on WhatsApp`)}">
      <span class="floating-whatsapp-icon-wrap">
        <span class="floating-whatsapp-wave"></span>
        <span class="floating-whatsapp-wave floating-whatsapp-wave-delay"></span>
        <span class="icon">${e.whatsapp}</span>
      </span>
      <span class="floating-whatsapp-label">${n(`واتساپ`,`WhatsApp`)}</span>
    </a>
  `:``}var h=`behbar_chat_token`,g=`behbar_chat_name`,ee=4e3;function _(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return``;let n=String(t.getHours()).padStart(2,`0`),i=String(t.getMinutes()).padStart(2,`0`);return r(`${n}:${i}`)}function v(e,t){return t?`<img class="chat-avatar" src="${t}" alt="${e}" />`:`<span class="chat-avatar chat-avatar-fallback">${e.trim().charAt(0)||`؟`}</span>`}function y(t){if(t.type===`image`){let e=`${o}${t.text}`;return`<a href="${e}" target="_blank" rel="noopener"><img class="chat-bubble-image" src="${e}" alt="${n(`تصویر ارسالی`,`Sent image`)}" loading="lazy" /></a>`}if(t.type===`location`){let r=``;try{let e=JSON.parse(t.text);typeof e.lat==`number`&&typeof e.lng==`number`&&(r=`https://www.google.com/maps?q=${e.lat},${e.lng}`)}catch{}return r?`<a class="chat-bubble-location" href="${r}" target="_blank" rel="noopener"><span class="icon">${e.pin}</span><span>${n(`مشاهده موقعیت روی نقشه`,`View location on map`)}</span></a>`:`<p>${n(`موقعیت نامعتبر`,`Invalid location`)}</p>`}return`<p>${t.text.replace(/</g,`&lt;`)}</p>`}function b(){let e=localStorage.getItem(h);return e||(e=crypto.randomUUID(),localStorage.setItem(h,e)),e}function x(){return`
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
  `}function S(){let e=document.getElementById(`chat-widget-toggle`),t=document.getElementById(`chat-widget-close`),r=document.getElementById(`chat-widget-panel`),i=document.getElementById(`chat-widget-header-avatar`),a=document.getElementById(`chat-widget-header-title`),s=document.getElementById(`chat-widget-messages`),c=document.getElementById(`chat-widget-form`),l=document.getElementById(`chat-widget-input`),u=document.getElementById(`chat-widget-notice`),d=document.getElementById(`chat-widget-attach-btn`),f=document.getElementById(`chat-widget-image-input`),p=document.getElementById(`chat-widget-location-btn`);if(!e||!t||!r||!i||!a||!s||!c||!l||!u||!d||!f||!p)return;let m=b(),h,x=!1,S;function C(e){u.textContent=e,u.hidden=!1,S!==void 0&&window.clearTimeout(S),S=window.setTimeout(()=>{u.hidden=!0},4e3)}function w(e){if(!e.length){s.innerHTML=`<p class="chat-widget-empty">${n(`پیامی هنوز ثبت نشده؛ اولین پیام را بفرستید!`,`No messages yet — send the first one!`)}</p>`;return}let t=s.scrollHeight-s.scrollTop-s.clientHeight<40;s.innerHTML=e.map((t,r)=>{let i=t.staffName??n(`پشتیبانی`,`Support`),a=e[r-1]?.sender===t.sender;return`
      <div class="chat-bubble chat-bubble-${t.sender}${a?` chat-bubble-grouped`:``}">
        ${t.sender===`staff`&&!a?`<span class="chat-bubble-author">${v(i,t.staffAvatar)}<span>${i}</span></span>`:``}
        ${y(t)}
        <span class="chat-bubble-time">${_(t.createdAt)}</span>
      </div>
    `}).join(``),t&&(s.scrollTop=s.scrollHeight)}function T(e){e?(i.hidden=!1,i.innerHTML=v(e.name,e.avatarUrl),a.textContent=e.name):(i.hidden=!0,i.innerHTML=``,a.textContent=n(`گفتگو با پشتیبانی بهبار`,`Chat with Behbar support`))}async function E(){try{let e=await(await fetch(`${o}/api/chat/${m}`)).json().catch(()=>({}));w(e?.messages??[]),T(e?.conversation?.assignedStaff??null)}catch{}}let D=()=>window.matchMedia(`(max-width: 768px)`).matches;function O(){x=!0,r.hidden=!1,e.setAttribute(`aria-expanded`,`true`),D()&&(document.body.style.overflow=`hidden`),E(),h===void 0&&(h=window.setInterval(()=>void E(),ee))}function k(){x=!1,r.hidden=!0,e.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``,h!==void 0&&(window.clearInterval(h),h=void 0)}e.addEventListener(`click`,()=>x?k():O()),t.addEventListener(`click`,k);async function A(e){try{return(await fetch(`https://api.behbarapp.ir/api/chat/${m}/messages`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({customerName:localStorage.getItem(g)??void 0,...e})})).ok?(await E(),!0):!1}catch{return!1}}d.addEventListener(`click`,()=>f.click()),f.addEventListener(`change`,async()=>{let e=f.files?.[0];if(f.value=``,e){d.disabled=!0;try{let t=await fetch(`${o}/api/chat/${m}/upload`,{method:`POST`,headers:{"Content-Type":e.type},body:e});if(!t.ok){C(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`));return}let{url:r}=await t.json();await A({type:`image`,text:r})||C(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}catch{C(n(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}finally{d.disabled=!1}}}),p.addEventListener(`click`,()=>{if(!navigator.geolocation){C(n(`مرورگر شما از ارسال موقعیت پشتیبانی نمی‌کند.`,`Your browser does not support sharing location.`));return}p.disabled=!0,navigator.geolocation.getCurrentPosition(async e=>{await A({type:`location`,lat:e.coords.latitude,lng:e.coords.longitude})||C(n(`ارسال موقعیت ناموفق بود.`,`Sending the location failed.`)),p.disabled=!1},()=>{C(n(`دسترسی به موقعیت مکانی رد شد یا در دسترس نیست.`,`Location access was denied or is unavailable.`)),p.disabled=!1},{enableHighAccuracy:!0,timeout:8e3})}),c.addEventListener(`submit`,async e=>{e.preventDefault();let t=l.value.trim();t&&(l.value=``,await A({text:t}))})}var C=`behbar_quick_actions_side`;function w(e){e===`left`?(document.documentElement.classList.add(`quick-actions-left`),document.documentElement.classList.remove(`quick-actions-right`)):(document.documentElement.classList.add(`quick-actions-right`),document.documentElement.classList.remove(`quick-actions-left`))}function T(t){return`
    <div class="header-quick-actions" id="header-quick-actions">
      <button
        type="button"
        class="quick-actions-side-toggle"
        id="quick-actions-side-toggle"
        aria-label="${n(`تغییر سمت دکمه‌ها (چپ / راست)`,`Switch button position (left / right)`)}"
        title="${n(`تغییر سمت دکمه‌ها (چپ / راست)`,`Switch button position (left / right)`)}"
      >
        <span class="icon">${e.arrowLeftRight}</span>
      </button>
      ${p(t)}
      ${m(t)}
      ${x()}
    </div>
  `}function E(e){S();let t=document.getElementById(`quick-actions-side-toggle`);t&&t.addEventListener(`click`,()=>{let e=document.documentElement.classList.contains(`quick-actions-left`)?`right`:`left`;w(e),localStorage.setItem(C,e)})}function D(e=``){let n=t();return`
    <button type="button" class="lang-toggle ${e}" data-lang-toggle aria-label="Switch language / تغییر زبان">
      <span data-lang-option="fa" class="${n===`fa`?`is-active`:``}">فا</span>
      <span data-lang-option="en" class="${n===`en`?`is-active`:``}">EN</span>
    </button>
  `}function O(){document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{c(t()===`fa`?`en`:`fa`)})})}function k(t=``){return`
    <button type="button" class="theme-toggle ${t}" data-theme-toggle aria-label="${n(`تغییر تم شب/روز`,`Toggle theme`)}" title="${n(`تغییر حالت شب/روز (تم سبز تیره شیشه‌ای)`,`Toggle Dark/Light theme`)}">
      <span class="icon icon-theme-sun" data-theme-sun hidden>${e.sun}</span>
      <span class="icon icon-theme-moon" data-theme-moon>${e.moon}</span>
    </button>
  `}function A(){let e=document.documentElement.getAttribute(`data-theme`)===`dark`;document.querySelectorAll(`[data-theme-sun]`).forEach(t=>{t.hidden=!e}),document.querySelectorAll(`[data-theme-moon]`).forEach(t=>{t.hidden=e})}function te(){A(),document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{document.documentElement.getAttribute(`data-theme`)===`dark`?(document.documentElement.removeAttribute(`data-theme`),localStorage.setItem(`behbar_theme`,`light`)):(document.documentElement.setAttribute(`data-theme`,`dark`),localStorage.setItem(`behbar_theme`,`dark`)),A()})})}function j(t){let r=[],i=t?.legal_pages;if(i?.about?.showInHeader&&r.push({href:`/about`,label:n(i.about.title,i.about.titleEn)||n(`درباره ما`,`About Us`),icon:e.user}),i?.terms?.showInHeader&&r.push({href:`/terms`,label:n(i.terms.title,i.terms.titleEn)||n(`قوانین و مقررات`,`Terms & Conditions`),icon:e.shield}),i?.privacy?.showInHeader&&r.push({href:`/privacy`,label:n(i.privacy.title,i.privacy.titleEn)||n(`حریم خصوصی`,`Privacy Policy`),icon:e.lock}),Array.isArray(t?.nav_pages))for(let i of t.nav_pages)i.showInHeader&&r.push({href:`/page/${encodeURIComponent(i.slug)}`,label:n(i.title,i.titleEn)||i.title,icon:e.article});return r}function M(e){if(!e?.site_name)return`بهبار`;let t=e.site_name;return typeof t==`object`?n(t.fa,t.en)||t.fa||`بهبار`:String(t)}function N(t){let r=j(t).map(e=>`
        <a class="header-item header-extra-item" href="${e.href}">
          <span class="icon">${e.icon}</span>
          <span class="header-label">${e.label}</span>
        </a>
      `).join(``),i=M(t);return`
    <header class="site-header">
      <div class="header-group">
        <a class="header-brand" href="/" aria-label="${n(`خانه`,`Home`)}">
          <span class="header-logo">
            <img src="/favicon.svg" alt="" />
          </span>
          <span class="header-brand-title">${i}</span>
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

        ${k()}
        ${D()}

        <a class="header-profile" href="/profile">
          <span class="icon">${e.user}</span>
          <span class="header-label">${n(`ورود`,`Log in`)}</span>
        </a>
      </div>
    </header>
  `}var P=null;function F(e){te();let t=document.querySelector(`.site-header`);if(t){if(e){let n=t.querySelector(`.header-pill`);if(n&&!n.querySelector(`.header-extra-item`)){let t=j(e);if(t.length){let e=t.map(e=>`
              <a class="header-item header-extra-item" href="${e.href}">
                <span class="icon">${e.icon}</span>
                <span class="header-label">${e.label}</span>
              </a>
            `).join(``);n.insertAdjacentHTML(`beforeend`,e)}}}P&&window.removeEventListener(`scroll`,P),P=()=>{t.classList.toggle(`is-scrolled`,window.scrollY>24),document.body.classList.toggle(`page-scrolled`,window.scrollY>200)},P(),window.addEventListener(`scroll`,P,{passive:!0})}}function I(e){let t=[];t.push({href:`/`,label:n(`خانه`,`Home`)});let r=e?.legal_pages;if((!r?.terms||r.terms.showInFooter!==!1)&&t.push({href:`/terms`,label:n(r?.terms?.title,r?.terms?.titleEn)||n(`قوانین و مقررات`,`Terms & Conditions`)}),(!r?.privacy||r.privacy.showInFooter!==!1)&&t.push({href:`/privacy`,label:n(r?.privacy?.title,r?.privacy?.titleEn)||n(`حریم خصوصی`,`Privacy Policy`)}),(!r?.about||r.about.showInFooter!==!1)&&t.push({href:`/about`,label:n(r?.about?.title,r?.about?.titleEn)||n(`درباره ما`,`About Us`)}),Array.isArray(e?.nav_pages))for(let r of e.nav_pages)r.showInFooter&&t.push({href:`/page/${encodeURIComponent(r.slug)}`,label:n(r.title,r.titleEn)||r.title});return t}function L(e){return I(e).map(e=>`<li><a href="${e.href}">${e.label}</a></li>`).join(``)}var R={fa:`بهبار`,en:`Behbar`},z={telegram:`telegramFilled`,whatsapp:`whatsappFilled`,instagram:`instagramFilled`,linkedin:`linkedinFilled`,youtube:`youtubeFilled`,twitterX:`twitterXFilled`,facebook:`facebookFilled`,mail:`mailFilled`,globe:`globeFilled`},B={googlePlay:`Google Play`,appStore:`App Store`,bazaar:`کافه‌بازار`,custom:``};function V(t,n){return t.length?`
    <div class="footer-social" ${n}>
      ${t.map(t=>{let n=t.customIconUrl?`<img src="${t.customIconUrl}" alt="${t.label}" style="width:20px;height:20px;object-fit:contain;border-radius:4px;" />`:e[z[t.platform]??`globe`],r=t.platform===`mail`;return`<a href="${t.url}" ${r?``:`target="_blank" rel="noopener"`} aria-label="${t.label}"><span class="icon">${n}</span></a>`}).join(``)}
    </div>
  `:``}function H(t){return!t?.enabled||!t.links.length?``:`
    <div class="footer-extras-column">
      <span class="footer-extras-label">${n(`دانلود اپلیکیشن`,`Get the app`)}</span>
      <div class="footer-app-links">
        ${t.links.map(t=>`
          <a class="footer-app-badge" href="${t.url}" target="_blank" rel="noopener">
            <span class="icon">${e.download}</span>
            <span>${t.label||B[t.platform]}</span>
          </a>
        `).join(``)}
      </div>
    </div>
  `}function U(e){return!e?.enabled||!e.badges.length?``:`
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
  `}function W(e){let t=H(e?.app_links),n=U(e?.certifications);return!t&&!n?``:`<div class="footer-extras">${t}${n}</div>`}function G(t){let r=new Date().getFullYear(),i=t?.site_name??R,a=t?.footer,o=a?.copyright?.fa;o?i.fa&&i.fa!==`بهبار`&&o.includes(`بهبار`)&&(o=o.replace(/به‌بار|به بار|بهبار/g,i.fa)):o=i.fa?`همه حقوق برای ${i.fa} محفوظ است.`:`همه حقوق محفوظ است.`;let s=a?.copyright?.en;s?i.en&&i.en.toLowerCase()!==`behbar`&&/behbar/i.test(s)&&(s=s.replace(/behbar/gi,i.en)):s=i.en?`All rights reserved for ${i.en}.`:`All rights reserved.`;let c={fa:o,en:s},l=a?.seoParagraphs,u=(Array.isArray(l)?l:[]).map(e=>({fa:e.fa.replace(/به‌بار|به بار/g,`بهبار`),en:e.en})),p=d(t?.contact),m=p.socialIconColor?`style="--footer-social-color:${p.socialIconColor}"`:``;return`
    <footer class="site-footer" id="footer">
      <div class="container footer-islands">
        <div class="footer-island footer-island-main">
          <div class="footer-menu-row">
            <nav class="footer-nav" aria-label="${n(`ناوبری فوتر`,`Footer navigation`)}">
              <ul>
                ${L(t)}
              </ul>
            </nav>
          </div>

          <div class="footer-contact-row">
            ${V(p.socialLinks,m)}
            <a class="footer-phone" href="${p.phoneTelHref}">
              <span class="icon">${e.phone}</span>
              <span dir="ltr">${f(p)}</span>
            </a>
          </div>

          ${W(t)}

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
  `}function K(e){if(e){let t=document.querySelector(`.site-footer .footer-nav ul`);t&&(t.innerHTML=L(e))}let t=document.getElementById(`footer-seo-box`),r=document.getElementById(`footer-seo-toggle`),i=r?.querySelector(`.footer-seo-toggle-label`);!t||!r||!i||r.addEventListener(`click`,()=>{let e=t.classList.toggle(`is-expanded`);r.setAttribute(`aria-expanded`,String(e)),i.textContent=e?n(`بستن`,`Close`):n(`ادامه مطلب`,`Read more`)})}function q(){return`
    ${k(`theme-toggle-floating`)}
    ${D(`lang-toggle-floating`)}
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
  `}function ne(){let e=document.querySelectorAll(`.bottom-nav-item[href]`),t=location.pathname;for(let n of e){let e=(n.getAttribute(`href`)??`/`).split(`#`)[0]||`/`;if(e===`/`?t===`/`:t.startsWith(e)){n.classList.add(`is-active`);break}}document.getElementById(`bottom-nav-chat-btn`)?.addEventListener(`click`,()=>{document.getElementById(`chat-widget-toggle`)?.click()})}function J(e){a(),e(),l(()=>e())}var Y=null,X=null;async function Z(){return Y||X||(X=fetch(`${o}/api/settings`).then(e=>e.json()).then(e=>(Y=e?.settings??{},Y)).catch(()=>({})),X)}async function re(){try{return(await(await fetch(`https://api.behbarapp.ir/api/magazine/articles`)).json().catch(()=>({})))?.articles??[]}catch{return[]}}async function ie(e){try{let t=await fetch(`${o}/api/magazine/articles/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.article??null:null}catch{return null}}async function ae(e){try{let t=await fetch(`${o}/api/pages/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.page??null:null}catch{return null}}async function oe(){try{return(await(await fetch(`https://api.behbarapp.ir/api/testimonials`)).json().catch(()=>({})))?.testimonials??[]}catch{return[]}}async function se(){try{return(await(await fetch(`https://api.behbarapp.ir/api/stories`)).json().catch(()=>({})))?.stories??[]}catch{return[]}}var ce={primary:`--primary`,primaryDark:`--primary-dark`,secondary:`--secondary`,secondaryLight:`--secondary-light`,background:`--background`,surface:`--surface`,surfaceAlt:`--surface-alt`,text:`--text`,muted:`--muted`,border:`--border`,success:`--success`,successDark:`--success-dark`,successBg:`--success-bg`,warning:`--warning`,callGreen:`--call-green`,callGreenDark:`--call-green-dark`,accentPurple:`--accent-purple`,accentPurpleLight:`--accent-purple-light`,accentPurpleLightHover:`--accent-purple-light-hover`,gooseGreen:`--goose-green`,gooseGreenLight:`--goose-green-light`},le=/^#[0-9a-fA-F]{6}$/;function ue(e){document.documentElement.classList.toggle(`quick-actions-fixed`,e?.quickActionsStyle===`fixed`);let t=localStorage.getItem(`behbar_quick_actions_side`),n=t===`left`||t===`right`?t:e?.quickActionsPosition===`left`?`left`:`right`;if(document.documentElement.classList.toggle(`quick-actions-left`,n===`left`),document.documentElement.classList.toggle(`quick-actions-right`,n===`right`),!e)return;let r=document.documentElement.style;for(let[t,n]of Object.entries(ce)){let i=e[t];i&&le.test(i)&&r.setProperty(n,i)}}function Q(e,t=`name`){let n=document.head.querySelector(`meta[${t}="${e}"]`);return n||(n=document.createElement(`meta`),n.setAttribute(t,e),document.head.appendChild(n)),n}function de(e){if(e){if(e.googleSiteVerification&&Q(`google-site-verification`).setAttribute(`content`,e.googleSiteVerification),e.googleAnalyticsId&&!document.getElementById(`ga4-loader`)){let t=document.createElement(`script`);t.id=`ga4-loader`,t.async=!0,t.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(e.googleAnalyticsId)}`,document.head.appendChild(t);let n=document.createElement(`script`);n.id=`ga4-inline`,n.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${e.googleAnalyticsId}');`,document.head.appendChild(n)}e.defaultOgImage&&(Q(`og:image`,`property`).setAttribute(`content`,e.defaultOgImage),Q(`twitter:image`).setAttribute(`content`,e.defaultOgImage))}}function fe(e,t){let n=t?.fa?.trim()||`بهبار`,r=e?.headline?.fa?.trim()||`حمل و جابه‌جایی، ساده‌تر از همیشه`,i=`${n} | ${r} - ${e?.subtitle?.fa?.trim()||`برای اثاث‌کشی یا حمل بار درخواست خود را ثبت کنید؛ در سریع‌ترین زمان با شما هماهنگ می‌کنیم.`}`;Q(`description`).setAttribute(`content`,i),Q(`og:description`,`property`).setAttribute(`content`,i),Q(`og:title`,`property`).setAttribute(`content`,`${n} | ${r}`),Q(`og:site_name`,`property`).setAttribute(`content`,n),Q(`twitter:description`).setAttribute(`content`,i),Q(`twitter:title`).setAttribute(`content`,`${n} | ${r}`),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let t=JSON.parse(e.textContent??``),r=!1;(t[`@type`]===`WebSite`||t[`@type`]===`LocalBusiness`||t[`@type`]===`Organization`)&&(t.description=i,t.name&&=n,r=!0),r&&(e.textContent=JSON.stringify(t))}catch{}})}function pe(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/magazine/${e.slug}`;document.title=t,Q(`description`).setAttribute(`content`,n),Q(`og:title`,`property`).setAttribute(`content`,t),Q(`og:description`,`property`).setAttribute(`content`,n),Q(`og:url`,`property`).setAttribute(`content`,r),Q(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&(Q(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),Q(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`Article`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},...e.publishedAt?{datePublished:e.publishedAt}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function me(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/p/${e.slug}`;document.title=t,Q(`description`).setAttribute(`content`,n),Q(`og:title`,`property`).setAttribute(`content`,t),Q(`og:description`,`property`).setAttribute(`content`,n),Q(`og:url`,`property`).setAttribute(`content`,r),Q(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&(Q(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),Q(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`WebPage`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function he(e){let t=e?.fa?.trim();if(!(!t||t===`بهبار`)&&(document.title.includes(`بهبار`)&&(document.title=document.title.replace(/بهبار/g,t)),document.querySelectorAll(`meta[property="og:site_name"], meta[property="og:title"], meta[name="twitter:title"]`).forEach(e=>{let n=e.getAttribute(`content`);n?.includes(`بهبار`)&&e.setAttribute(`content`,n.replace(/بهبار/g,t))}),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let n=JSON.parse(e.textContent??``),r=!1;n.name===`بهبار`&&(n.name=t,r=!0);let i=n.isPartOf;i?.name===`بهبار`&&(i.name=t,r=!0),r&&(e.textContent=JSON.stringify(n))}catch{}}),typeof document<`u`&&document.body)){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(e){let t=e.parentElement;if(!t)return NodeFilter.FILTER_SKIP;let n=t.tagName;return n===`SCRIPT`||n===`STYLE`||n===`INPUT`||n===`TEXTAREA`||n===`CODE`?NodeFilter.FILTER_SKIP:e.nodeValue?.includes(`بهبار`)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(let e of n)e.nodeValue=(e.nodeValue||``).replace(/بهبار/g,t)}}function ge(e){if(!e)return;e.logoUrl&&document.querySelectorAll(`.header-logo img, .logo-mark`).forEach(t=>{t.src=e.logoUrl});let t=e.faviconUrl||e.logoUrl;t&&document.querySelectorAll(`link[rel="icon"], link[rel="apple-touch-icon"]`).forEach(e=>{e.href=t})}function $(e){!e||e===`both`||t()!==e&&i(e)}function _e(e){!e||e===`both`||document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.style.display=`none`})}export{O as C,N as S,T,ne as _,pe as a,G as b,de as c,re as d,ae as f,J as g,Z as h,he as i,ue as l,oe as m,_e as n,fe as o,se as p,ge as r,me as s,$ as t,ie as u,q as v,E as w,F as x,K as y};