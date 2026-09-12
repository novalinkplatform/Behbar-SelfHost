(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`,t=`viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" focusable="false"`,n={motorcycle:`<svg ${e}><circle cx="5.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/><path d="M5.5 18h6l4-6h4"/><path d="M17.5 18 15.5 12"/><path d="M19.5 12 18 8h3"/></svg>`,pickup:`<svg ${e}><path d="M3 16V9a1 1 0 0 1 1-1h8l4 4h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><circle cx="7.5" cy="17.5" r="1.7"/><circle cx="16.5" cy="17.5" r="1.7"/><path d="M12 8v4"/></svg>`,van:`<svg ${e}><path d="M2 16V8a1 1 0 0 1 1-1h11v9"/><path d="M14 10h4.5l2.5 3v3h-2"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/><path d="M2 16h3.3M9 16h6"/></svg>`,lightTruck:`<svg ${e}><path d="M2 15V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8"/><path d="M12 11h4.8l3.2 2.6V16h-2"/><circle cx="6.5" cy="17" r="1.7"/><circle cx="16.5" cy="17" r="1.7"/><path d="M2 15h2.8M18.2 15h1.8"/></svg>`,truck:`<svg ${e}><path d="M1.5 14V6.5a1 1 0 0 1 1-1H14v9"/><path d="M14 9.5h4l3.5 3V15h-2"/><circle cx="6" cy="16.5" r="1.7"/><circle cx="17" cy="16.5" r="1.7"/><path d="M1.5 14h2.8M18.7 14h2.3"/></svg>`,trailer:`<svg ${e}><path d="M1 15.5V9.5a1 1 0 0 1 1-1h3.5v7"/><path d="M5.5 11h14"/><path d="M19.5 11l2 2.3v2.2h-2"/><circle cx="4" cy="17" r="1.6"/><circle cx="12.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/><path d="M1 15.5h1.4M8.9 15.5h1.6M18.1 15.5h1.4"/></svg>`,home:`<svg ${e}><path d="M3.5 11.5 12 4l8.5 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9"/><path d="M9.5 20v-5.5h5V20"/></svg>`,box:`<svg ${e}><path d="M3.5 8 12 4l8.5 4-8.5 4-8.5-4Z"/><path d="M3.5 8v8L12 20l8.5-4V8"/><path d="M12 12v8"/></svg>`,worker:`<svg ${e}><circle cx="12" cy="6" r="2.5"/><path d="M6 20v-3.5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4V20"/><path d="M9.5 12.5 8 20M14.5 12.5 16 20"/></svg>`,route:`<svg ${e}><circle cx="5.5" cy="6" r="2"/><circle cx="18.5" cy="18" r="2"/><path d="M5.5 8v3a3 3 0 0 0 3 3h7a3 3 0 0 1 3 3"/></svg>`,bolt:`<svg ${e}><path d="M12.5 3 5 13.5h5.5L11 21l7.5-10.5H13L12.5 3Z"/></svg>`,network:`<svg ${e}><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6.7 7.3 10.5 16.3M17.3 7.3 13.5 16.3M7 6h10"/></svg>`,compare:`<svg ${e}><path d="M7 4v16M17 4v16"/><path d="M4 8h6M4 16h6M14 8h6M14 16h6"/></svg>`,layers:`<svg ${e}><path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z"/><path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5"/></svg>`,shield:`<svg ${e}><path d="M12 3.5 19 6.5v5c0 5-3 8-7 9-4-1-7-4-7-9v-5l7-3Z"/><path d="m9.3 12 1.9 1.9L15 10"/></svg>`,pin:`<svg ${e}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></svg>`,flag:`<svg ${e}><path d="M6 21V4"/><path d="M6 4.5h10.5L14 8l2.5 3.5H6"/></svg>`,calendar:`<svg ${e}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>`,search:`<svg ${e}><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.3-4.3"/></svg>`,chevronDown:`<svg ${e}><path d="m6 9 6 6 6-6"/></svg>`,chevronLeft:`<svg ${e}><path d="m15 6-6 6 6 6"/></svg>`,chevronRight:`<svg ${e}><path d="m9 6 6 6-6 6"/></svg>`,checkCircle:`<svg ${e}><circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.3 2.3 4.7-5"/></svg>`,clock:`<svg ${e}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,lock:`<svg ${e}><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>`,phone:`<svg ${e}><path d="M5.5 4h2.8l1.2 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.2v2.8c0 1-.9 1.7-1.8 1.5-6-1.1-10.6-5.7-11.7-11.7C4.3 5.4 5 4 5.5 4Z"/></svg>`,plusCircle:`<svg ${e}><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>`,menu:`<svg ${e}><path d="M4 6.5h16M4 12h16M4 17.5h16"/></svg>`,close:`<svg ${e}><path d="m5 5 14 14M19 5 5 19"/></svg>`,user:`<svg ${e}><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>`,female:`<svg ${e}><circle cx="12" cy="7.5" r="3.5"/><path d="M7 8c.3 4 2 6 5 6s4.7-2 5-6"/><path d="M5.5 21v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1"/></svg>`,male:`<svg ${e}><circle cx="12" cy="7.5" r="3.5"/><path d="M5.5 21v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1"/><path d="M12 14.5v3"/></svg>`,building:`<svg ${e}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/></svg>`,organization:`<svg ${e}><path d="m3 9 9-6 9 6M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18"/></svg>`,plus:`<svg ${e}><path d="M12 5v14M5 12h14"/></svg>`,article:`<svg ${e}><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>`,whatsapp:`<svg ${e}><path d="M12 3.5a8 8 0 0 0-7 11.9L4 20.5l5.2-1.4A8 8 0 1 0 12 3.5Z"/><path d="M9 9.2c0-.4.3-.7.7-.7h.6c.3 0 .6.2.7.5l.5 1.4c.1.3 0 .6-.2.8l-.5.5a5 5 0 0 0 2.5 2.5l.5-.5c.2-.2.5-.3.8-.2l1.4.5c.3.1.5.4.5.7v.6c0 .4-.3.7-.7.7-3.8 0-7-3.2-7-7Z"/></svg>`,telegram:`<svg ${e}><path d="m21 4-9 16-2.5-6.5L3 11Z"/><path d="M21 4 9.5 13.5"/></svg>`,instagram:`<svg ${e}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none"/></svg>`,mail:`<svg ${e}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,logout:`<svg ${e}><path d="M9 4H5.5a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 5.5 20H9"/><path d="M14 15.5 18.5 12 14 8.5"/><path d="M18.2 12H9.5"/></svg>`,linkedin:`<svg ${e}><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5v6M8 7.8v.1"/><path d="M12 16.5v-3.7a2.3 2.3 0 0 1 4.5 0v3.7M12 11v5.5"/></svg>`,youtube:`<svg ${e}><rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none"/></svg>`,twitterX:`<svg ${e}><path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5"/></svg>`,facebook:`<svg ${e}><circle cx="12" cy="12" r="8.5"/><path d="M14 8.5h-1.5a2 2 0 0 0-2 2V12H8.5v2.5H10.5V20h2.5v-5.5H15L15.5 12H13v-1a.7.7 0 0 1 .7-.7H14Z"/></svg>`,globe:`<svg ${e}><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.3 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.3-3.5-8.5S9.7 5.8 12 3.5Z"/></svg>`,download:`<svg ${e}><path d="M12 3.5v11M8 10.5l4 4 4-4"/><path d="M4.5 17v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2"/></svg>`,badge:`<svg ${e}><path d="M12 3.5 19 6.5v5c0 5-3 8-7 9-4-1-7-4-7-9v-5l7-3Z"/><path d="M9.5 12 11 13.5 14.5 10"/></svg>`,trash:`<svg ${e}><path d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M18 7l-.8 11.5a2 2 0 0 1-2 1.8H8.8a2 2 0 0 1-2-1.8L6 7"/><path d="M10 11v5M14 11v5"/></svg>`,chat:`<svg ${e}><path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h9a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 15 15H9l-4 3.5v-3.5H6a2.5 2.5 0 0 1-2.5-2.5v-6Z"/><circle cx="7.5" cy="9.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="11.5" cy="9.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="0.9" fill="currentColor" stroke="none"/></svg>`,image:`<svg ${e}><rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="m4 17 5-5 4 4 2.5-2.5L21 17.5"/></svg>`,briefcase:`<svg ${e}><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18M10.5 12.5v2h3v-2"/></svg>`,whatsappFilled:`<svg ${t}><path d="M12 2.5c-5.2 0-9.5 4.3-9.5 9.5 0 1.7.4 3.3 1.3 4.7L2.5 21.5l4.9-1.3c1.4.8 2.9 1.2 4.6 1.2 5.2 0 9.5-4.3 9.5-9.5s-4.3-9.4-9.5-9.4Zm5.6 13.4c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.6-.6-2.9-1.2-4.7-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.2.5-.3.8-.3h.5c.2 0 .4 0 .5.4.2.5.8 1.8.8 1.9.1.1.1.3 0 .4-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.1.1-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1.2-.2.7-.8 1-1.1.2-.3.4-.2.6-.1.2.1 1.6.8 1.9.9.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>`,telegramFilled:`<svg ${t}><path d="M21.9 4.3 2.7 11.9c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.4.8.8.8.4 0 .6-.2.8-.5l2.4-2.3 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.2-.4-1.7-1-1.4ZM9.4 14.4 18 8.8c.4-.3.8-.1.5.2L11.3 15c-.2.2-.4.4-.4.6l-.2 2.4-.9-3.6Z"/></svg>`,instagramFilled:`<svg ${t}><path fill-rule="evenodd" d="M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5Zm5 5.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.3-1.8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/></svg>`,linkedinFilled:`<svg ${t}><path fill-rule="evenodd" d="M4.5 2.5h15a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2ZM8.7 10v7.3H6.3V10h2.4Zm-1.2-3.7a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm4 3.7h2.3v1c.5-.7 1.3-1.2 2.4-1.2 1.9 0 3 1.3 3 3.7v4.5h-2.4V13c0-1-.4-1.6-1.3-1.6-.8 0-1.3.6-1.5 1.2-.1.2-.1.5-.1.8v3.9h-2.4V10Z"/></svg>`,youtubeFilled:`<svg ${t}><path fill-rule="evenodd" d="M12 4c2.4 0 6.7.2 8.4.7.9.3 1.7 1 1.9 1.9.5 1.7.7 5 .7 5.4 0 .4-.2 3.7-.7 5.4-.3.9-1 1.7-1.9 1.9-1.7.5-6 .7-8.4.7s-6.7-.2-8.4-.7a2.6 2.6 0 0 1-1.9-1.9C1.2 15.7 1 12.4 1 12c0-.4.2-3.7.7-5.4.3-.9 1-1.6 1.9-1.9C5.3 4.2 9.6 4 12 4Zm-2 4.5v7l6-3.5-6-3.5Z"/></svg>`,twitterXFilled:`<svg ${t}><path d="M13.6 10.6 20 3h-2l-5.6 6.4L7.9 3H3l6.9 9.8L3 21h2l6-6.8L15.9 21H21l-7.4-10.4Zm-2.2 2.5-.7-1L4.9 4.5h2l4.5 6.3.7 1 5.8 8.1h-2l-4.7-6.4Z"/></svg>`,facebookFilled:`<svg ${t}><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>`,mailFilled:`<svg ${t}><path d="M3.5 5h17a1 1 0 0 1 .9.5L12 11 2.6 5.5a1 1 0 0 1 .9-.5Z"/><path d="M2.5 6.7 12 12.5l9.5-5.8V17a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V6.7Z"/></svg>`,globeFilled:`<svg ${t}><circle cx="12" cy="12" r="9.5"/></svg>`},r=`behbar_lang`;function i(){try{let e=localStorage.getItem(r);if(e===`fa`||e===`en`)return e}catch{}return`fa`}var a=i(),o=new Set;function s(){return a}function c(){document.documentElement.lang=a,document.documentElement.dir=a===`fa`?`rtl`:`ltr`}function l(e){if(e!==a){a=e;try{localStorage.setItem(r,e)}catch{}c(),o.forEach(t=>t(e))}}function u(e){if(e!==a){a=e;try{localStorage.setItem(r,e)}catch{}c()}}function d(e){return o.add(e),()=>o.delete(e)}function f(e,t){return a===`fa`?e:t}var p=[`۰`,`۱`,`۲`,`۳`,`۴`,`۵`,`۶`,`۷`,`۸`,`۹`];function m(e){let t=String(e);return a===`fa`?t.replace(/[0-9]/g,e=>p[Number(e)]):t}function h(e=``){let t=s();return`
    <button type="button" class="lang-toggle ${e}" data-lang-toggle aria-label="Switch language / تغییر زبان">
      <span data-lang-option="fa" class="${t===`fa`?`is-active`:``}">فا</span>
      <span data-lang-option="en" class="${t===`en`?`is-active`:``}">EN</span>
    </button>
  `}function g(){document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{l(s()===`fa`?`en`:`fa`)})})}function _(e){let t=[],r=e?.legal_pages;if(r?.about?.showInHeader&&t.push({href:`/about`,label:f(r.about.title,r.about.titleEn)||f(`درباره ما`,`About Us`),icon:n.user}),r?.terms?.showInHeader&&t.push({href:`/terms`,label:f(r.terms.title,r.terms.titleEn)||f(`قوانین و مقررات`,`Terms & Conditions`),icon:n.shield}),r?.privacy?.showInHeader&&t.push({href:`/privacy`,label:f(r.privacy.title,r.privacy.titleEn)||f(`حریم خصوصی`,`Privacy Policy`),icon:n.lock}),Array.isArray(e?.nav_pages))for(let r of e.nav_pages)r.showInHeader&&t.push({href:`/page/${encodeURIComponent(r.slug)}`,label:f(r.title,r.titleEn)||r.title,icon:n.article});return t}function v(e){let t=_(e).map(e=>`
        <a class="header-item header-extra-item" href="${e.href}">
          <span class="icon">${e.icon}</span>
          <span class="header-label">${e.label}</span>
        </a>
      `).join(``);return`
    <header class="site-header">
      <div class="header-group">
        <a class="header-logo" href="/" aria-label="${f(`خانه`,`Home`)}">
          <img src="/favicon.svg" alt="" />
        </a>

        <div class="header-pill">
          <a class="header-item header-home" href="/" aria-label="${f(`خانه`,`Home`)}">
            <span class="icon">${n.home}</span>
            <span class="header-label">${f(`خانه`,`Home`)}</span>
          </a>

          <a class="header-item" href="/magazine">
            <span class="icon">${n.article}</span>
            <span class="header-label">${f(`مجله`,`Magazine`)}</span>
          </a>

          <a class="header-item" href="/orders">
            <span class="icon">${n.box}</span>
            <span class="header-label">${f(`درخواست‌های من`,`My requests`)}</span>
          </a>

          ${t}
        </div>

        <a class="header-cta" href="/#request">
          <span class="icon">${n.plusCircle}</span>
          <span class="header-label">${f(`ثبت درخواست`,`Submit request`)}</span>
        </a>

        ${h()}

        <a class="header-profile" href="/profile">
          <span class="icon">${n.user}</span>
          <span class="header-label">${f(`ورود`,`Log in`)}</span>
        </a>
      </div>
    </header>
  `}var y=null;function b(e){let t=document.querySelector(`.site-header`);if(t){if(e){let n=t.querySelector(`.header-pill`);if(n&&!n.querySelector(`.header-extra-item`)){let t=_(e);if(t.length){let e=t.map(e=>`
              <a class="header-item header-extra-item" href="${e.href}">
                <span class="icon">${e.icon}</span>
                <span class="header-label">${e.label}</span>
              </a>
            `).join(``);n.insertAdjacentHTML(`beforeend`,e)}}}y&&window.removeEventListener(`scroll`,y),y=()=>{t.classList.toggle(`is-scrolled`,window.scrollY>24),document.body.classList.toggle(`page-scrolled`,window.scrollY>200)},y(),window.addEventListener(`scroll`,y,{passive:!0})}}var x={phoneDisplay:`021-200200`,phoneTelHref:`tel:+9821200200`,socialLinks:[{id:`wa1`,platform:`whatsapp`,label:`واتساپ`,url:`https://wa.me/9821200200`},{id:`tg1`,platform:`telegram`,label:`تلگرام`,url:`#`},{id:`ig1`,platform:`instagram`,label:`اینستاگرام`,url:`#`},{id:`em1`,platform:`mail`,label:`ایمیل`,url:`#`}]};function S(e){return e?{...e,socialLinks:e.socialLinks??x.socialLinks}:x}function C(e){return m(S(e).phoneDisplay)}function w(e){let t=[];t.push({href:`/`,label:f(`خانه`,`Home`)});let n=e?.legal_pages;if((!n?.terms||n.terms.showInFooter!==!1)&&t.push({href:`/terms`,label:f(n?.terms?.title,n?.terms?.titleEn)||f(`قوانین و مقررات`,`Terms & Conditions`)}),(!n?.privacy||n.privacy.showInFooter!==!1)&&t.push({href:`/privacy`,label:f(n?.privacy?.title,n?.privacy?.titleEn)||f(`حریم خصوصی`,`Privacy Policy`)}),(!n?.about||n.about.showInFooter!==!1)&&t.push({href:`/about`,label:f(n?.about?.title,n?.about?.titleEn)||f(`درباره ما`,`About Us`)}),Array.isArray(e?.nav_pages))for(let n of e.nav_pages)n.showInFooter&&t.push({href:`/page/${encodeURIComponent(n.slug)}`,label:f(n.title,n.titleEn)||n.title});return t}function T(e){return w(e).map(e=>`<li><a href="${e.href}">${e.label}</a></li>`).join(``)}var ee={fa:`بهبار`,en:`Behbar`},E={telegram:`telegramFilled`,whatsapp:`whatsappFilled`,instagram:`instagramFilled`,linkedin:`linkedinFilled`,youtube:`youtubeFilled`,twitterX:`twitterXFilled`,facebook:`facebookFilled`,mail:`mailFilled`,globe:`globeFilled`},D={googlePlay:`Google Play`,appStore:`App Store`,bazaar:`کافه‌بازار`,custom:``};function O(e,t){return e.length?`
    <div class="footer-social" ${t}>
      ${e.map(e=>{let t=e.customIconUrl?`<img src="${e.customIconUrl}" alt="${e.label}" style="width:20px;height:20px;object-fit:contain;border-radius:4px;" />`:n[E[e.platform]??`globe`],r=e.platform===`mail`;return`<a href="${e.url}" ${r?``:`target="_blank" rel="noopener"`} aria-label="${e.label}"><span class="icon">${t}</span></a>`}).join(``)}
    </div>
  `:``}function k(e){return!e?.enabled||!e.links.length?``:`
    <div class="footer-extras-column">
      <span class="footer-extras-label">${f(`دانلود اپلیکیشن`,`Get the app`)}</span>
      <div class="footer-app-links">
        ${e.links.map(e=>`
          <a class="footer-app-badge" href="${e.url}" target="_blank" rel="noopener">
            <span class="icon">${n.download}</span>
            <span>${e.label||D[e.platform]}</span>
          </a>
        `).join(``)}
      </div>
    </div>
  `}function A(e){return!e?.enabled||!e.badges.length?``:`
    <div class="footer-extras-column">
      <span class="footer-extras-label">${f(`مجوزها و نمادها`,`Licenses & trust seals`)}</span>
      <div class="footer-certifications">
        ${e.badges.map(e=>`
          <a class="footer-cert-badge" href="${e.linkUrl||`#`}" target="_blank" rel="noopener" aria-label="${e.label}">
            <img src="${e.imageUrl}" alt="${e.label}" loading="lazy" />
          </a>
        `).join(``)}
      </div>
    </div>
  `}function te(e){let t=k(e?.app_links),n=A(e?.certifications);return!t&&!n?``:`<div class="footer-extras">${t}${n}</div>`}function ne(e){let t=new Date().getFullYear(),r=e?.site_name??ee,i=e?.footer,a=i?.copyright?.fa?i.copyright:{fa:r.fa?`همه حقوق برای ${r.fa} محفوظ است.`:`همه حقوق محفوظ است.`,en:r.en?`All rights reserved for ${r.en}.`:`All rights reserved.`},o=i?.seoParagraphs,s=(Array.isArray(o)?o:[]).map(e=>({fa:e.fa.replace(/به‌بار|به بار/g,`بهبار`),en:e.en})),c=S(e?.contact),l=c.socialIconColor?`style="--footer-social-color:${c.socialIconColor}"`:``;return`
    <footer class="site-footer" id="footer">
      <div class="container footer-islands">
        <div class="footer-island footer-island-main">
          <div class="footer-menu-row">
            <nav class="footer-nav" aria-label="${f(`ناوبری فوتر`,`Footer navigation`)}">
              <ul>
                ${T(e)}
              </ul>
            </nav>
          </div>

          <div class="footer-contact-row">
            ${O(c.socialLinks,l)}
            <a class="footer-phone" href="${c.phoneTelHref}">
              <span class="icon">${n.phone}</span>
              <span dir="ltr">${C(c)}</span>
            </a>
          </div>

          ${te(e)}

          <div class="footer-bottom">
            <p>© ${t} ${f(a.fa,a.en)}</p>
          </div>
        </div>

        ${s.length?`
        <div class="footer-island footer-island-seo">
          <div class="footer-seo-box" id="footer-seo-box">
            <h2 class="visually-hidden">${f(`درباره اسکریپت ${r.fa}`,`About ${r.en} Script`)}</h2>
            <div class="footer-seo-text" id="footer-seo-text">
              ${s.map(e=>`<p>${f(e.fa,e.en)}</p>`).join(``)}
            </div>
            <button type="button" class="footer-seo-toggle" id="footer-seo-toggle" aria-expanded="false">
              <span class="footer-seo-toggle-label">${f(`ادامه مطلب`,`Read more`)}</span>
              <span class="icon">${n.chevronDown}</span>
            </button>
          </div>
        </div>
        `:``}
      </div>
    </footer>
  `}function re(e){if(e){let t=document.querySelector(`.site-footer .footer-nav ul`);t&&(t.innerHTML=T(e))}let t=document.getElementById(`footer-seo-box`),n=document.getElementById(`footer-seo-toggle`),r=n?.querySelector(`.footer-seo-toggle-label`);!t||!n||!r||n.addEventListener(`click`,()=>{let e=t.classList.toggle(`is-expanded`);n.setAttribute(`aria-expanded`,String(e)),r.textContent=e?f(`بستن`,`Close`):f(`ادامه مطلب`,`Read more`)})}function j(e,t){return~~(e/t)}function M(e,t){return e-~~(e/t)*t}var N=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];function P(e){let t=N.length,n=e+621,r=-14,i=N[0];if(e<i||e>=N[t-1])throw Error(`Invalid Jalaali year ${e}`);let a=0;for(let n=1;n<t;n+=1){let t=N[n];if(a=t-i,e<t)break;r=r+j(a,33)*8+j(M(a,33),4),i=t}let o=e-i;r=r+j(o,33)*8+j(M(o,33)+3,4),M(a,33)===4&&a-o===4&&(r+=1);let s=j(n,4)-j((j(n,100)+1)*3,4)-150,c=20+r-s;a-o<6&&(o=o-a+j(a,33)*33);let l=M(M(o+1,33)-1,4);return l===-1&&(l=4),{leap:l,gy:n,march:c}}function F(e,t,n){let r=j((e+j(t-8,6)+100100)*1461,4)+j(153*M(t+9,12)+2,5)+n-34840408;return r=r-j(j(e+100100+j(t-8,6),100)*3,4)+752,r}function I(e){let t=4*e+139361631;t=t+j(j(4*e+183187720,146097)*3,4)*4-3908;let n=j(M(t,1461),4)*5+308,r=j(M(n,153),5)+1,i=M(j(n,153),12)+1;return{gy:j(t,1461)-100100+j(8-i,6),gm:i,gd:r}}function ie(e,t,n){let r=P(e);return F(r.gy,3,r.march)+(t-1)*31-j(t,7)*(t-7)+n-1}function ae(e){let t=I(e).gy-621,n=P(t),r=e-F(n.gy,3,n.march),i,a;if(r>=0){if(r<=185)return i=1+j(r,31),a=M(r,31)+1,{jy:t,jm:i,jd:a};r-=186}else--t,r+=179,n.leap===1&&(r+=1);return i=7+j(r,30),a=M(r,30)+1,{jy:t,jm:i,jd:a}}function oe(e){return P(e).leap===0}function se(e,t){return t<=6?31:t<=11||oe(e)?30:29}function L(e){return ae(F(e.getFullYear(),e.getMonth()+1,e.getDate()))}function R(e,t,n){let{gy:r,gm:i,gd:a}=I(ie(e,t,n));return new Date(r,i-1,a)}function z(e,t,n){return(R(e,t,n).getDay()+1)%7}var B=[`فروردین`,`اردیبهشت`,`خرداد`,`تیر`,`مرداد`,`شهریور`,`مهر`,`آبان`,`آذر`,`دی`,`بهمن`,`اسفند`],V=[`Farvardin`,`Ordibehesht`,`Khordad`,`Tir`,`Mordad`,`Shahrivar`,`Mehr`,`Aban`,`Azar`,`Dey`,`Bahman`,`Esfand`],H=[`ش`,`ی`,`د`,`س`,`چ`,`پ`,`ج`];function U(e){return m(e)}function W(e){let t=s(),n=t===`fa`?B:V,r=U(e.jd),i=U(e.jy);return t===`fa`?`${n[e.jm-1]} ${r}، ${i}`:`${n[e.jm-1]} ${r}, ${i}`}function G(){return L(new Date)}function K(e,t){let n=R(e.jy,e.jm,e.jd);return n.setDate(n.getDate()+t),L(n)}function ce(){return`
    ${h(`lang-toggle-floating`)}
    <nav class="bottom-nav" aria-label="${f(`ناوبری پایین صفحه`,`Bottom navigation`)}">
      <a class="bottom-nav-item" href="/">
        <span class="icon">${n.home}</span>
        <span>${f(`خانه`,`Home`)}</span>
      </a>
      <a class="bottom-nav-item" href="/magazine">
        <span class="icon">${n.layers}</span>
        <span>${f(`مجله`,`Magazine`)}</span>
      </a>
      <a class="bottom-nav-item" href="/orders">
        <span class="icon">${n.box}</span>
        <span>${f(`درخواست‌ها`,`Orders`)}</span>
      </a>
      <button type="button" class="bottom-nav-item" id="bottom-nav-chat-btn">
        <span class="icon">${n.chat}</span>
        <span>${f(`پیام`,`Message`)}</span>
      </button>
      <a class="bottom-nav-item" href="/profile">
        <span class="icon">${n.user}</span>
        <span>${f(`پروفایل`,`Profile`)}</span>
      </a>
    </nav>
  `}function le(){let e=document.querySelectorAll(`.bottom-nav-item[href]`),t=location.pathname;for(let n of e){let e=(n.getAttribute(`href`)??`/`).split(`#`)[0]||`/`;if(e===`/`?t===`/`:t.startsWith(e)){n.classList.add(`is-active`);break}}document.getElementById(`bottom-nav-chat-btn`)?.addEventListener(`click`,()=>{document.getElementById(`chat-widget-toggle`)?.click()})}function ue(e){let t=S(e?.contact);return`
    <a class="floating-call" href="${t.phoneTelHref}" aria-label="${f(`تماس با بهبار`,`Call Behbar`)}">
      <span class="floating-call-icon-wrap">
        <span class="floating-call-wave"></span>
        <span class="floating-call-wave floating-call-wave-delay"></span>
        <span class="icon">${n.phone}</span>
      </span>
      <span class="floating-call-number" dir="ltr">${C(t)}</span>
    </a>
  `}function de(e){let t=S(e?.contact).socialLinks?.find(e=>e.platform===`whatsapp`&&e.url&&e.url!==`#`);return t?`
    <a class="floating-whatsapp" href="${t.url}" target="_blank" rel="noopener noreferrer" aria-label="${f(`پیام در واتساپ`,`Message on WhatsApp`)}">
      <span class="floating-whatsapp-icon-wrap">
        <span class="floating-whatsapp-wave"></span>
        <span class="floating-whatsapp-wave floating-whatsapp-wave-delay"></span>
        <span class="icon">${n.whatsapp}</span>
      </span>
      <span class="floating-whatsapp-label">${f(`واتساپ`,`WhatsApp`)}</span>
    </a>
  `:``}var q=`behbar_chat_token`,fe=`behbar_chat_name`,pe=4e3;function me(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:U(`${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`)}function J(e,t){return t?`<img class="chat-avatar" src="${t}" alt="${e}" />`:`<span class="chat-avatar chat-avatar-fallback">${e.trim().charAt(0)||`؟`}</span>`}function he(e){if(e.type===`image`){let t=`${e.text}`;return`<a href="${t}" target="_blank" rel="noopener"><img class="chat-bubble-image" src="${t}" alt="${f(`تصویر ارسالی`,`Sent image`)}" loading="lazy" /></a>`}if(e.type===`location`){let t=``;try{let n=JSON.parse(e.text);typeof n.lat==`number`&&typeof n.lng==`number`&&(t=`https://www.google.com/maps?q=${n.lat},${n.lng}`)}catch{}return t?`<a class="chat-bubble-location" href="${t}" target="_blank" rel="noopener"><span class="icon">${n.pin}</span><span>${f(`مشاهده موقعیت روی نقشه`,`View location on map`)}</span></a>`:`<p>${f(`موقعیت نامعتبر`,`Invalid location`)}</p>`}return`<p>${e.text.replace(/</g,`&lt;`)}</p>`}function ge(){let e=localStorage.getItem(q);return e||(e=crypto.randomUUID(),localStorage.setItem(q,e)),e}function _e(){return`
    <button type="button" class="chat-widget-button" id="chat-widget-toggle" aria-label="${f(`چت با پشتیبانی`,`Chat with support`)}" aria-expanded="false">
      <span class="chat-widget-icon-wrap">
        <span class="icon">${n.chat}</span>
      </span>
      <span class="chat-widget-label">${f(`پیام برخط با پشتیبانی`,`Live chat with support`)}</span>
    </button>
    <div class="chat-widget-panel" id="chat-widget-panel" hidden>
      <div class="chat-widget-header">
        <div class="chat-widget-header-info">
          <span id="chat-widget-header-avatar" hidden></span>
          <span id="chat-widget-header-title">${f(`گفتگو با پشتیبانی بهبار`,`Chat with Behbar support`)}</span>
        </div>
        <button type="button" class="chat-widget-close" id="chat-widget-close" aria-label="${f(`بستن`,`Close`)}">
          <span class="icon">${n.close}</span>
        </button>
      </div>
      <div class="chat-widget-messages" id="chat-widget-messages"></div>
      <p class="chat-widget-notice" id="chat-widget-notice" hidden></p>
      <form class="chat-widget-input-row" id="chat-widget-form">
        <input type="file" accept="image/*" id="chat-widget-image-input" hidden />
        <button type="button" class="chat-widget-attach-btn" id="chat-widget-attach-btn" aria-label="${f(`ارسال عکس`,`Send photo`)}">
          <span class="icon">${n.image}</span>
        </button>
        <button type="button" class="chat-widget-location-btn" id="chat-widget-location-btn" aria-label="${f(`ارسال موقعیت`,`Send location`)}">
          <span class="icon">${n.pin}</span>
        </button>
        <input type="text" id="chat-widget-input" placeholder="${f(`پیام خود را بنویسید...`,`Type your message...`)}" autocomplete="off" />
        <button type="submit" class="chat-widget-send" aria-label="${f(`ارسال`,`Send`)}">
          <span class="icon">${n.telegram}</span>
        </button>
      </form>
    </div>
  `}function Y(){let e=document.getElementById(`chat-widget-toggle`),t=document.getElementById(`chat-widget-close`),n=document.getElementById(`chat-widget-panel`),r=document.getElementById(`chat-widget-header-avatar`),i=document.getElementById(`chat-widget-header-title`),a=document.getElementById(`chat-widget-messages`),o=document.getElementById(`chat-widget-form`),s=document.getElementById(`chat-widget-input`),c=document.getElementById(`chat-widget-notice`),l=document.getElementById(`chat-widget-attach-btn`),u=document.getElementById(`chat-widget-image-input`),d=document.getElementById(`chat-widget-location-btn`);if(!e||!t||!n||!r||!i||!a||!o||!s||!c||!l||!u||!d)return;let p=ge(),m,h=!1,g;function _(e){c.textContent=e,c.hidden=!1,g!==void 0&&window.clearTimeout(g),g=window.setTimeout(()=>{c.hidden=!0},4e3)}function v(e){if(!e.length){a.innerHTML=`<p class="chat-widget-empty">${f(`پیامی هنوز ثبت نشده؛ اولین پیام را بفرستید!`,`No messages yet — send the first one!`)}</p>`;return}let t=a.scrollHeight-a.scrollTop-a.clientHeight<40;a.innerHTML=e.map((t,n)=>{let r=t.staffName??f(`پشتیبانی`,`Support`),i=e[n-1]?.sender===t.sender;return`
      <div class="chat-bubble chat-bubble-${t.sender}${i?` chat-bubble-grouped`:``}">
        ${t.sender===`staff`&&!i?`<span class="chat-bubble-author">${J(r,t.staffAvatar)}<span>${r}</span></span>`:``}
        ${he(t)}
        <span class="chat-bubble-time">${me(t.createdAt)}</span>
      </div>
    `}).join(``),t&&(a.scrollTop=a.scrollHeight)}function y(e){e?(r.hidden=!1,r.innerHTML=J(e.name,e.avatarUrl),i.textContent=e.name):(r.hidden=!0,r.innerHTML=``,i.textContent=f(`گفتگو با پشتیبانی بهبار`,`Chat with Behbar support`))}async function b(){try{let e=await(await fetch(`/api/chat/${p}`)).json().catch(()=>({}));v(e?.messages??[]),y(e?.conversation?.assignedStaff??null)}catch{}}let x=()=>window.matchMedia(`(max-width: 768px)`).matches;function S(){h=!0,n.hidden=!1,e.setAttribute(`aria-expanded`,`true`),x()&&(document.body.style.overflow=`hidden`),b(),m===void 0&&(m=window.setInterval(()=>void b(),pe))}function C(){h=!1,n.hidden=!0,e.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``,m!==void 0&&(window.clearInterval(m),m=void 0)}e.addEventListener(`click`,()=>h?C():S()),t.addEventListener(`click`,C);async function w(e){try{return(await fetch(`/api/chat/${p}/messages`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({customerName:localStorage.getItem(fe)??void 0,...e})})).ok?(await b(),!0):!1}catch{return!1}}l.addEventListener(`click`,()=>u.click()),u.addEventListener(`change`,async()=>{let e=u.files?.[0];if(u.value=``,e){l.disabled=!0;try{let t=await fetch(`/api/chat/${p}/upload`,{method:`POST`,headers:{"Content-Type":e.type},body:e});if(!t.ok){_(f(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`));return}let{url:n}=await t.json();await w({type:`image`,text:n})||_(f(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}catch{_(f(`ارسال تصویر ناموفق بود.`,`Sending the image failed.`))}finally{l.disabled=!1}}}),d.addEventListener(`click`,()=>{if(!navigator.geolocation){_(f(`مرورگر شما از ارسال موقعیت پشتیبانی نمی‌کند.`,`Your browser does not support sharing location.`));return}d.disabled=!0,navigator.geolocation.getCurrentPosition(async e=>{await w({type:`location`,lat:e.coords.latitude,lng:e.coords.longitude})||_(f(`ارسال موقعیت ناموفق بود.`,`Sending the location failed.`)),d.disabled=!1},()=>{_(f(`دسترسی به موقعیت مکانی رد شد یا در دسترس نیست.`,`Location access was denied or is unavailable.`)),d.disabled=!1},{enableHighAccuracy:!0,timeout:8e3})}),o.addEventListener(`submit`,async e=>{e.preventDefault();let t=s.value.trim();t&&(s.value=``,await w({text:t}))})}function ve(e){c(),e(),d(()=>e())}var X=`behbar_visitor_id`;function ye(){let e=localStorage.getItem(X);return e||(e=crypto.randomUUID(),localStorage.setItem(X,e)),e}function be(){try{let e=document.referrer?new URL(document.referrer).hostname:``,t=e&&e!==location.hostname?e:``;fetch(`/api/track`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({visitorId:ye(),path:location.pathname,referrer:t}),keepalive:!0}).catch(()=>{})}catch{}}var Z=null,Q=null;async function xe(){return Z||Q||(Q=fetch(`/api/settings`).then(e=>e.json()).then(e=>(Z=e?.settings??{},Z)).catch(()=>({})),Q)}async function Se(){try{return(await(await fetch(`/api/magazine/articles`)).json().catch(()=>({})))?.articles??[]}catch{return[]}}async function Ce(e){try{let t=await fetch(`/api/magazine/articles/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.article??null:null}catch{return null}}async function we(e){try{let t=await fetch(`/api/pages/${encodeURIComponent(e)}`);return t.ok?(await t.json().catch(()=>({})))?.page??null:null}catch{return null}}async function Te(){try{return(await(await fetch(`/api/testimonials`)).json().catch(()=>({})))?.testimonials??[]}catch{return[]}}async function Ee(){try{return(await(await fetch(`/api/stories`)).json().catch(()=>({})))?.stories??[]}catch{return[]}}var De={primary:`--primary`,primaryDark:`--primary-dark`,secondary:`--secondary`,secondaryLight:`--secondary-light`,background:`--background`,surface:`--surface`,surfaceAlt:`--surface-alt`,text:`--text`,muted:`--muted`,border:`--border`,success:`--success`,successDark:`--success-dark`,successBg:`--success-bg`,warning:`--warning`,callGreen:`--call-green`,callGreenDark:`--call-green-dark`,accentPurple:`--accent-purple`,accentPurpleLight:`--accent-purple-light`,accentPurpleLightHover:`--accent-purple-light-hover`,gooseGreen:`--goose-green`,gooseGreenLight:`--goose-green-light`},Oe=/^#[0-9a-fA-F]{6}$/;function ke(e){if(document.documentElement.classList.toggle(`quick-actions-fixed`,e?.quickActionsStyle===`fixed`),!e)return;let t=document.documentElement.style;for(let[n,r]of Object.entries(De)){let i=e[n];i&&Oe.test(i)&&t.setProperty(r,i)}}function $(e,t=`name`){let n=document.head.querySelector(`meta[${t}="${e}"]`);return n||(n=document.createElement(`meta`),n.setAttribute(t,e),document.head.appendChild(n)),n}function Ae(e){if(e){if(e.googleSiteVerification&&$(`google-site-verification`).setAttribute(`content`,e.googleSiteVerification),e.googleAnalyticsId&&!document.getElementById(`ga4-loader`)){let t=document.createElement(`script`);t.id=`ga4-loader`,t.async=!0,t.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(e.googleAnalyticsId)}`,document.head.appendChild(t);let n=document.createElement(`script`);n.id=`ga4-inline`,n.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${e.googleAnalyticsId}');`,document.head.appendChild(n)}e.defaultOgImage&&($(`og:image`,`property`).setAttribute(`content`,e.defaultOgImage),$(`twitter:image`).setAttribute(`content`,e.defaultOgImage))}}function je(e,t){let n=t?.fa?.trim()||`بهبار`,r=e?.headline?.fa?.trim()||`حمل و جابه‌جایی، ساده‌تر از همیشه`,i=`${n} | ${r} - ${e?.subtitle?.fa?.trim()||`برای اثاث‌کشی یا حمل بار درخواست خود را ثبت کنید؛ در سریع‌ترین زمان با شما هماهنگ می‌کنیم.`}`;$(`description`).setAttribute(`content`,i),$(`og:description`,`property`).setAttribute(`content`,i),$(`og:title`,`property`).setAttribute(`content`,`${n} | ${r}`),$(`og:site_name`,`property`).setAttribute(`content`,n),$(`twitter:description`).setAttribute(`content`,i),$(`twitter:title`).setAttribute(`content`,`${n} | ${r}`),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let t=JSON.parse(e.textContent??``),r=!1;(t[`@type`]===`WebSite`||t[`@type`]===`LocalBusiness`||t[`@type`]===`Organization`)&&(t.description=i,t.name&&=n,r=!0),r&&(e.textContent=JSON.stringify(t))}catch{}})}function Me(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/magazine/${e.slug}`;document.title=t,$(`description`).setAttribute(`content`,n),$(`og:title`,`property`).setAttribute(`content`,t),$(`og:description`,`property`).setAttribute(`content`,n),$(`og:url`,`property`).setAttribute(`content`,r),$(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&($(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),$(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`Article`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},...e.publishedAt?{datePublished:e.publishedAt}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function Ne(e){let t=e.metaTitle||e.title,n=e.metaDescription||e.excerpt,r=`${location.origin}/p/${e.slug}`;document.title=t,$(`description`).setAttribute(`content`,n),$(`og:title`,`property`).setAttribute(`content`,t),$(`og:description`,`property`).setAttribute(`content`,n),$(`og:url`,`property`).setAttribute(`content`,r),$(`twitter:title`).setAttribute(`content`,t);let i=document.head.querySelector(`link[rel="canonical"]`);i||(i=document.createElement(`link`),i.rel=`canonical`,document.head.appendChild(i)),i.href=r,e.coverImageUrl&&($(`og:image`,`property`).setAttribute(`content`,e.coverImageUrl),$(`twitter:image`).setAttribute(`content`,e.coverImageUrl));let a=document.createElement(`script`);a.type=`application/ld+json`,a.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`WebPage`,headline:t,description:n,...e.coverImageUrl?{image:e.coverImageUrl}:{},mainEntityOfPage:r}),document.head.appendChild(a)}function Pe(e){let t=e?.fa?.trim();if(!(!t||t===`بهبار`)&&(document.title.includes(`بهبار`)&&(document.title=document.title.replace(/بهبار/g,t)),document.querySelectorAll(`meta[property="og:site_name"], meta[property="og:title"], meta[name="twitter:title"]`).forEach(e=>{let n=e.getAttribute(`content`);n?.includes(`بهبار`)&&e.setAttribute(`content`,n.replace(/بهبار/g,t))}),document.querySelectorAll(`script[type="application/ld+json"]`).forEach(e=>{try{let n=JSON.parse(e.textContent??``),r=!1;n.name===`بهبار`&&(n.name=t,r=!0);let i=n.isPartOf;i?.name===`بهبار`&&(i.name=t,r=!0),r&&(e.textContent=JSON.stringify(n))}catch{}}),typeof document<`u`&&document.body)){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(e){let t=e.parentElement;if(!t)return NodeFilter.FILTER_SKIP;let n=t.tagName;return n===`SCRIPT`||n===`STYLE`||n===`INPUT`||n===`TEXTAREA`||n===`CODE`?NodeFilter.FILTER_SKIP:e.nodeValue?.includes(`بهبار`)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(let e of n)e.nodeValue=(e.nodeValue||``).replace(/بهبار/g,t)}}function Fe(e){if(!e)return;e.logoUrl&&document.querySelectorAll(`.header-logo img, .logo-mark`).forEach(t=>{t.src=e.logoUrl});let t=e.faviconUrl||e.logoUrl;t&&document.querySelectorAll(`link[rel="icon"], link[rel="apple-touch-icon"]`).forEach(e=>{e.href=t})}function Ie(e){!e||e===`both`||s()!==e&&u(e)}function Le(e){!e||e===`both`||document.querySelectorAll(`[data-lang-toggle]`).forEach(e=>{e.style.display=`none`})}function Re(){document.getElementById(`app`)?.classList.add(`app-ready`);let e=document.querySelector(`.app-loading-overlay`);e&&window.setTimeout(()=>e.remove(),250)}export{L as A,s as B,le as C,H as D,V as E,re as F,n as H,ne as I,b as L,z as M,U as N,K as O,G as P,v as R,ue as S,B as T,f as V,be as _,Pe as a,_e as b,Ne as c,Ce as d,Se as f,xe as g,Te as h,Fe as i,se as j,W as k,Ae as l,Ee as m,Ie as n,Me as o,we as p,Le as r,je as s,Re as t,ke as u,ve as v,ce as w,de as x,Y as y,g as z};