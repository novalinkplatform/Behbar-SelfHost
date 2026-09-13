import{S as e,b as t,l as n,n as r,p as i,t as a,u as o}from"./appReady-JFOdjg2Y.js";import{C as s,D as c,E as l,S as u,T as d,_ as f,b as p,c as m,g as h,h as g,i as ee,l as te,n as ne,r as re,t as ie,v as _,w as v,x as ae,y}from"./languageMode-BQU1S8Yk.js";import{a as oe,c as se,d as ce,i as le,n as ue,o as b,r as de,s as fe,t as pe}from"./customerAuth-IN36AEms.js";import{n as x,t as me}from"./addresses-DageI49m.js";function S(e,n=6){return`
    <div class="otp-input-group" id="${e}-group">${Array.from({length:n},(e,t)=>`<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" class="otp-digit" data-otp-index="${t}" />`).join(``)}</div>
    <div class="otp-resend-row">
      <span class="otp-timer" id="${e}-timer"></span>
      <button type="button" class="otp-resend-btn" id="${e}-resend-btn" hidden>${t(`ارسال دوباره‌ی کد`,`Resend code`)}</button>
    </div>
  `}function he(e,n){let r=n.length??6,i=n.resendSeconds??60,a=document.getElementById(`${e}-group`),o=document.getElementById(`${e}-timer`),s=document.getElementById(`${e}-resend-btn`);if(!a||!o||!s)return null;let c=Array.from(a.querySelectorAll(`.otp-digit`)),l=null,u=null;function d(){return c.map(e=>e.value).join(``)}function f(){let e=d();e.length===r&&/^\d+$/.test(e)&&(g(),n.onComplete(e))}c.forEach((e,t)=>{e.addEventListener(`input`,()=>{e.value=e.value.replace(/\D/g,``).slice(-1),e.value&&t<c.length-1&&c[t+1].focus(),f()}),e.addEventListener(`keydown`,n=>{n.key===`Backspace`&&!e.value&&t>0&&c[t-1].focus()}),e.addEventListener(`paste`,e=>{let t=e.clipboardData?.getData(`text`).replace(/\D/g,``)??``;if(!t)return;e.preventDefault(),t.slice(0,r).split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)});let n=Math.min(t.length,r)-1;n>=0&&c[n].focus(),f()})});function p(){let e=i;s.hidden=!0,o.hidden=!1,l&&window.clearInterval(l);let n=()=>{let n=String(Math.floor(e/60)).padStart(2,`0`),r=String(e%60).padStart(2,`0`);o.textContent=`${t(`ارسال دوباره تا`,`Resend in`)} ${n}:${r}`,e<=0&&(l&&window.clearInterval(l),o.hidden=!0,s.hidden=!1),--e};n(),l=window.setInterval(n,1e3)}s.addEventListener(`click`,()=>{n.onResend(),m(),p()});function m(){c.forEach(e=>e.value=``),c[0]?.focus()}function h(){c[0]?.focus()}function g(){u?.abort(),u=null}return`OTPCredential`in window&&(u=new AbortController,navigator.credentials.get({otp:{transport:[`sms`]},signal:u.signal}).then(e=>{let t=e?.code?.replace(/\D/g,``);t&&t.length===r&&(t.split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)}),f())}).catch(()=>{})),p(),h(),{reset:m,focusFirst:h,stopWebOtp:g,getCode:d}}function C(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(`حساب کاربری`,`Account`)}</span>
        </nav>

        <h1 class="article-title">${t(`حساب کاربری`,`Account`)}</h1>

        <div id="profile-auth-section">
          <!-- گام ۱: شماره موبایل (ورود و ثبت‌نام یکپارچه) -->
          <form class="profile-auth-form" id="profile-phone-form">
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.user}</span></div>
              <h2 class="profile-auth-title">${t(`ورود یا ثبت‌نام در بهبار`,`Log in or Sign up`)}</h2>
              <p class="profile-auth-subtitle">${t(`شماره موبایل خود را وارد کنید تا کد تأیید پیامک شود.`,`Enter your mobile number to receive a verification code.`)}</p>
            </div>

            <div class="form-field">
              <label for="profile-phone-input">${t(`شماره موبایل`,`Mobile number`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${e.phone}</span>
                <input type="tel" id="profile-phone-input" dir="ltr" placeholder="${t(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-phone-submit-btn">
              <span>${t(`دریافت کد تأیید`,`Send verification code`)}</span>
            </button>

            <p class="request-panel-error" id="profile-phone-error" hidden></p>
          </form>

          <!-- گام ۲: کد تأیید پیامک -->
          <form class="profile-auth-form" id="profile-otp-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.shield}</span></div>
              <h2 class="profile-auth-title">${t(`کد تأیید پیامکی`,`Verification Code`)}</h2>
              <div class="profile-otp-phone-row">
                <span>${t(`کد تأیید به شماره`,`Code sent to`)}</span>
                <strong id="profile-otp-phone-display" dir="ltr"></strong>
                <button type="button" class="profile-edit-phone-btn" id="profile-change-phone-btn">${t(`ویرایش شماره`,`Edit`)}</button>
              </div>
            </div>

            <div class="form-field otp-center-field">
              ${S(`profile-otp`,5)}
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-otp-submit-btn">
              <span>${t(`تأیید و ادامه`,`Verify and continue`)}</span>
            </button>

            <p class="request-panel-error" id="profile-otp-error" hidden></p>
          </form>

          <!-- گام ۳: انتخاب هویت و مشخصات حساب (آقا، خانم، شرکتی، اداری و سازمانی) -->
          <form class="profile-auth-form" id="profile-details-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.badge}</span></div>
              <h2 class="profile-auth-title">${t(`تکمیل اطلاعات حساب`,`Complete Profile`)}</h2>
              <p class="profile-auth-subtitle">${t(`لطفاً نوع حساب و مشخصات خود را برای ورود مشخص کنید.`,`Please select your account type and enter your details.`)}</p>
            </div>

            <!-- انتخاب هویت و ماهیت حساب -->
            <div class="form-field">
              <label class="form-field-label">${t(`نوع حساب / هویت`,`Account Type / Identity`)}</label>
              <div class="profile-gender-picker profile-identity-picker" role="radiogroup" aria-label="${t(`انتخاب نوع حساب`,`Account type selection`)}">
                <button type="button" class="profile-gender-btn" data-gender="female" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.female}</span>
                  <span class="profile-gender-text">${t(`خانم`,`Female`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="male" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.male}</span>
                  <span class="profile-gender-text">${t(`آقا`,`Male`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="company" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.building}</span>
                  <span class="profile-gender-text">${t(`شرکتی`,`Company`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="organization" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.organization}</span>
                  <span class="profile-gender-text">${t(`اداری و سازمانی`,`Organization`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
              </div>
              <input type="hidden" id="profile-gender-input" value="" />
            </div>

            <!-- نام شرکت یا سازمان (ویژه اشخاص حقوقی) -->
            <div class="form-field" id="profile-company-field" hidden>
              <label for="profile-company-input" id="profile-company-label">${t(`نام شرکت / سازمان`,`Company / Organization name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon" id="profile-company-icon">${e.building}</span>
                <input type="text" id="profile-company-input" placeholder="${t(`نام کامل شرکت، اداره یا سازمان`,`Enter company/organization name`)}" />
              </div>
            </div>

            <!-- نام و نام خانوادگی / نام رابط -->
            <div class="form-field">
              <label for="profile-fullname-input" id="profile-fullname-label">${t(`نام و نام خانوادگی`,`Full name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${e.user}</span>
                <input type="text" id="profile-fullname-input" autocomplete="name" placeholder="${t(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)}" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-details-submit-btn">
              <span>${t(`تکمیل و ورود به حساب`,`Complete & Enter`)}</span>
            </button>

            <p class="request-panel-error" id="profile-details-error" hidden></p>
          </form>
        </div>

        <div class="orders-content" id="profile-page-content" hidden>
          <section class="orders-block">
            <h2>${t(`اطلاعات حساب`,`Account information`)}</h2>
            <div class="orders-profile-card" id="profile-info-card"></div>
          </section>

          <!-- دفترچه آدرس‌ها -->
          <section class="orders-block" id="profile-addressbook-block">
            <div class="profile-section-header">
              <div>
                <h2>${t(`دفترچه آدرس‌ها`,`Address Book`)}</h2>
                <p class="profile-section-sub">${t(`آدرس‌های منتخب برای استفاده در سفارش‌ها`,`Saved addresses for quick selection`)}</p>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="profile-add-address-btn">
                <span class="icon">${e.plus}</span>
                <span>${t(`افزودن آدرس جدید`,`Add New Address`)}</span>
              </button>
            </div>

            <!-- فرم درج آدرس جدید -->
            <form class="profile-new-address-form" id="profile-new-address-form" hidden>
              <h3 class="profile-form-inner-title">${t(`ثبت آدرس جدید`,`New Address`)}</h3>

              <div class="form-field">
                <label class="form-field-label">${t(`عنوان آدرس`,`Address Title`)}</label>
                <div class="profile-address-chips" id="profile-address-chips">
                  <button type="button" class="profile-chip" data-chip="${t(`منزل`,`Home`)}">${t(`منزل`,`Home`)}</button>
                  <button type="button" class="profile-chip" data-chip="${t(`محل کار`,`Work`)}">${t(`محل کار`,`Work`)}</button>
                  <button type="button" class="profile-chip" data-chip="${t(`دفتر مرکزی`,`Headquarters`)}">${t(`دفتر مرکزی`,`Headquarters`)}</button>
                  <button type="button" class="profile-chip" data-chip="${t(`انبار`,`Warehouse`)}">${t(`انبار`,`Warehouse`)}</button>
                  <button type="button" class="profile-chip" data-chip="${t(`شعبه`,`Branch`)}">${t(`شعبه`,`Branch`)}</button>
                </div>
                <div class="input-wrapper" style="margin-top: 8px;">
                  <span class="icon input-icon">${e.pin}</span>
                  <input type="text" id="profile-address-title-input" placeholder="${t(`عنوان دلخواه (مثلاً: منزل، شرکت یا انبار)`,`Title (e.g. Home, Office, Warehouse)`)}" required />
                </div>
              </div>

              <div class="profile-address-fields-row">
                <div class="form-field profile-city-col">
                  <label for="profile-address-city-input">${t(`شهر`,`City`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-city-input" value="تهران" required />
                  </div>
                </div>
                <div class="form-field profile-address-col">
                  <label for="profile-address-text-input">${t(`نشانی دقیق`,`Full Address`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-text-input" placeholder="${t(`خیابان، کوچه، پلاک...`,`Street, alley, building number...`)}" required />
                  </div>
                </div>
              </div>

              <div class="profile-address-meta-row">
                <div class="form-field">
                  <label for="profile-address-floor-input">${t(`طبقه`,`Floor`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-floor-input" placeholder="${t(`مثلاً ۲`,`e.g. 2`)}" />
                  </div>
                </div>
                <div class="form-field">
                  <label for="profile-address-unit-input">${t(`واحد`,`Unit`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-unit-input" placeholder="${t(`مثلاً ۴`,`e.g. 4`)}" />
                  </div>
                </div>
                <div class="form-field profile-elevator-col">
                  <label class="form-field-label">${t(`آسانسور`,`Elevator`)}</label>
                  <label class="profile-checkbox-wrap">
                    <input type="checkbox" id="profile-address-elevator-input" />
                    <span>${t(`آسانسور دارد`,`Has elevator`)}</span>
                  </label>
                </div>
              </div>

              <div class="profile-address-actions">
                <button type="submit" class="btn btn-primary btn-sm" id="profile-save-address-btn">
                  <span>${t(`ذخیره آدرس`,`Save Address`)}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-sm" id="profile-cancel-address-btn">
                  <span>${t(`انصراف`,`Cancel`)}</span>
                </button>
              </div>
              <p class="request-panel-error" id="profile-address-form-error" hidden></p>
            </form>

            <div class="profile-addresses-grid" id="profile-addresses-grid">
              <div class="profile-addresses-empty" id="profile-addresses-empty">
                <span class="icon">${e.pin}</span>
                <p>${t(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
              </div>
            </div>
          </section>

          <section class="orders-block" id="profile-addresses-block" hidden>
            <h2>${t(`آدرس‌های سفارش‌های قبلی`,`Previous orders addresses`)}</h2>
            <div class="saved-address-groups">
              <div class="saved-address-group" id="profile-origin-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${e.pin}</span>${t(`مبدأها`,`Origins`)}</h3>
                <ul class="saved-address-list" id="profile-origin-address-list"></ul>
              </div>
              <div class="saved-address-group" id="profile-destination-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${e.flag}</span>${t(`مقصدها`,`Destinations`)}</h3>
                <ul class="saved-address-list" id="profile-destination-address-list"></ul>
              </div>
            </div>
          </section>

          <button type="button" class="btn btn-secondary btn-block" id="profile-logout-btn">
            <span class="icon">${e.logout}</span>
            <span>${t(`خروج از حساب`,`Log out`)}</span>
          </button>
        </div>
      </div>
    </article>
  `}var w={},ge=/^09\d{9}$/;function _e(e){let t=e.replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).trim().replace(/[\s\-_]/g,``);return t.startsWith(`+98`)?t=`0`+t.slice(3):t.startsWith(`0098`)?t=`0`+t.slice(4):t.startsWith(`98`)&&(t=`0`+t.slice(2)),t}function ve(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${l(w)}
    <main id="main-content">
      ${C()}
    </main>
    ${v(w)}
    ${u()}
    <div class="header-quick-actions">
      ${p(w)}
      ${y(w)}
      ${_()}
    </div>
  `)}function ye(e){if(!e.length)return t(`نامشخص`,`Unknown`);let r=e.reduce((e,t)=>new Date(t.createdAt)<new Date(e.createdAt)?t:e);return n(o(new Date(r.createdAt)))}async function T(){r(),w=await g(),ie(w.language_mode),te(w.theme),m(w.seo),ve(),a(),re(w.branding),ee(w.site_name),ne(w.language_mode),d(w),s(w),ae(),c(),f();let n=document.getElementById(`profile-auth-section`),o=document.getElementById(`profile-page-content`),l=document.getElementById(`profile-info-card`),u=document.getElementById(`profile-addresses-block`),p=document.getElementById(`profile-origin-addresses`),h=document.getElementById(`profile-origin-address-list`),_=document.getElementById(`profile-destination-addresses`),v=document.getElementById(`profile-destination-address-list`),y=document.getElementById(`profile-logout-btn`),S=document.getElementById(`profile-phone-form`),C=document.getElementById(`profile-phone-input`),T=document.getElementById(`profile-phone-submit-btn`),E=document.getElementById(`profile-phone-error`),D=document.getElementById(`profile-otp-form`),O=document.getElementById(`profile-otp-phone-display`),k=document.getElementById(`profile-change-phone-btn`),A=document.getElementById(`profile-otp-submit-btn`),j=document.getElementById(`profile-otp-error`),M=document.getElementById(`profile-details-form`),N=Array.from(document.querySelectorAll(`.profile-gender-btn`)),P=document.getElementById(`profile-gender-input`),F=document.getElementById(`profile-fullname-input`),I=document.getElementById(`profile-fullname-label`),L=document.getElementById(`profile-company-field`),R=document.getElementById(`profile-company-input`),z=document.getElementById(`profile-company-label`),B=document.getElementById(`profile-details-submit-btn`),V=document.getElementById(`profile-details-error`),H=document.getElementById(`profile-add-address-btn`),U=document.getElementById(`profile-new-address-form`),be=document.getElementById(`profile-cancel-address-btn`),W=document.getElementById(`profile-address-title-input`),xe=document.getElementById(`profile-address-city-input`),Se=document.getElementById(`profile-address-text-input`),Ce=document.getElementById(`profile-address-floor-input`),we=document.getElementById(`profile-address-unit-input`),Te=document.getElementById(`profile-address-elevator-input`),G=document.getElementById(`profile-address-form-error`),K=document.getElementById(`profile-addresses-grid`),Ee=Array.from(document.querySelectorAll(`.profile-chip`));if(!n||!o||!l||!u||!p||!h||!_||!v||!y||!S||!C||!T||!E||!D||!O||!k||!A||!j||!M||!P||!F||!B||!V)return;let q=``,J=null;async function Y(){if(!K)return;let n=await le();if(!n.length){K.innerHTML=`
        <div class="profile-addresses-empty">
          <span class="icon">${e.pin}</span>
          <p>${t(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
        </div>
      `;return}K.innerHTML=n.map(n=>{let r=[];return n.city&&r.push(`<span class="profile-address-tag">${n.city}</span>`),n.floor&&r.push(`<span class="profile-address-tag">${t(`طبقه`,`Floor`)} ${i(n.floor)}</span>`),n.unit&&r.push(`<span class="profile-address-tag">${t(`واحد`,`Unit`)} ${i(n.unit)}</span>`),n.hasElevator&&r.push(`<span class="profile-address-tag">${t(`دارای آسانسور`,`With elevator`)}</span>`),`
          <div class="profile-address-card" data-address-id="${n.id}">
            <div class="profile-address-card-header">
              <span class="profile-address-badge"><span class="icon">${e.pin}</span>${n.title}</span>
              <button type="button" class="profile-address-del-btn" data-delete-id="${n.id}" title="${t(`حذف آدرس`,`Delete address`)}">
                <span class="icon">${e.trash}</span>
              </button>
            </div>
            <p class="profile-address-text">${n.address}</p>
            ${r.length?`<div class="profile-address-tags">${r.join(``)}</div>`:``}
          </div>
        `}).join(``),Array.from(K.querySelectorAll(`.profile-address-del-btn`)).forEach(e=>{e.addEventListener(`click`,()=>{let n=Number(e.dataset.deleteId);n&&(e.disabled=!0,ue(n).then(()=>Y()).catch(n=>{alert(n instanceof Error?n.message:t(`حذف ناموفق بود.`,`Failed to delete`)),e.disabled=!1}))})})}function De(n,r){let a=ye(r),o=e.user,s=``,c=`profile-badge-male`;n.gender===`female`?(o=e.female,s=t(`خانم`,`Female`),c=`profile-badge-female`):n.gender===`male`?(o=e.male,s=t(`آقا`,`Male`),c=`profile-badge-male`):n.gender===`company`?(o=e.building,s=t(`شرکتی`,`Company`),c=`profile-badge-company`):n.gender===`organization`&&(o=e.organization,s=t(`اداری و سازمانی`,`Organization`),c=`profile-badge-org`);let d=n.companyName?`
        <div class="orders-profile-row">
          <span class="icon">${n.gender===`organization`?e.organization:e.building}</span>
          <strong>${n.companyName}</strong>
          ${n.gender?`<span class="profile-gender-badge ${c}">${s}</span>`:``}
        </div>
      `:``,f=!n.companyName&&s?`<span class="profile-gender-badge ${c}">${s}</span>`:``;l.innerHTML=`
      ${d}
      <div class="orders-profile-row">
        <span class="icon">${o}</span>
        <strong>${n.fullName}</strong>
        ${f}
      </div>
      <div class="orders-profile-row">
        <span class="icon">${e.phone}</span>
        <span dir="ltr">${i(n.phone)}</span>
      </div>
      <div class="orders-profile-row">
        <span class="icon">${e.calendar}</span>
        <span>${t(`عضویت از`,`Member since`)} ${a}</span>
      </div>
    `,Y();let{origins:m,destinations:g}=me(r);m.length?(p.hidden=!1,h.innerHTML=m.map(t=>`<li class="saved-address-item"><span class="icon">${e.pin}</span><span>${x(t)}</span></li>`).join(``)):p.hidden=!0,g.length?(_.hidden=!1,v.innerHTML=g.map(t=>`<li class="saved-address-item"><span class="icon">${e.flag}</span><span>${x(t)}</span></li>`).join(``)):_.hidden=!0,u.hidden=!m.length&&!g.length}function X(e){n.hidden=!0,o.hidden=!1,ce(e.phone).then(t=>De(e,t)).catch(()=>De(e,[]))}function Z(){n.hidden=!1,o.hidden=!0,S.hidden=!1,D.hidden=!0,M.hidden=!0,E.hidden=!0,C.focus()}function Oe(e){q=e,n.hidden=!1,o.hidden=!0,S.hidden=!0,D.hidden=!1,M.hidden=!0,j.hidden=!0,O.textContent=i(e),J?.stopWebOtp(),J=he(`profile-otp`,{length:5,onComplete:e=>{$(e)},onResend:()=>{Ae()}}),J?.focusFirst()}function ke(e){n.hidden=!1,o.hidden=!0,S.hidden=!0,D.hidden=!0,M.hidden=!1,V.hidden=!0,e.fullName&&(F.value=e.fullName),e.companyName&&R&&(R.value=e.companyName),e.gender?Q(e.gender):Q(``),e.gender===`company`||e.gender===`organization`?R?.focus():F.focus()}function Q(e){P.value=e,N.forEach(t=>{let n=t.dataset.gender===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-checked`,String(n))});let n=e===`company`||e===`organization`;L&&(L.hidden=!n,n?(z&&(z.textContent=e===`company`?t(`نام شرکت یا مجموعه تجاری`,`Company name`):t(`نام اداره یا سازمان`,`Organization name`)),R&&(R.placeholder=e===`company`?t(`نام شرکت، فروشگاه یا برند تجاری`,`Enter company name`):t(`نام اداره، سازمان یا نهاد دولتی/عمومی`,`Enter organization name`),R.required=!0)):R&&(R.required=!1,R.value=``)),I&&F&&(n?(I.textContent=t(`نام و نام خانوادگی رابط / نماینده`,`Representative full name`),F.placeholder=t(`نام و نام خانوادگی شخص رابط یا مسئول هماهنگی`,`Representative name`)):(I.textContent=t(`نام و نام خانوادگی`,`Full name`),F.placeholder=t(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)))}N.forEach(e=>{e.addEventListener(`click`,()=>{Q(e.dataset.gender??``),V.hidden=!0})}),H&&U&&H.addEventListener(`click`,()=>{U.hidden=!U.hidden,!U.hidden&&W&&W.focus()}),be&&U&&be.addEventListener(`click`,()=>{U.hidden=!0,U.reset(),G&&(G.hidden=!0)}),Ee.forEach(e=>{e.addEventListener(`click`,()=>{W&&(W.value=e.dataset.chip??e.textContent??``,W.focus())})}),U&&U.addEventListener(`submit`,e=>{e.preventDefault(),G&&(G.hidden=!0);let n=W?.value.trim()??``,r=xe?.value.trim()??`تهران`,i=Se?.value.trim()??``,a=Ce?.value.trim()||void 0,o=we?.value.trim()||void 0,s=Te?.checked??!1;if(!n){G&&(G.hidden=!1,G.textContent=t(`لطفاً عنوان آدرس را وارد کنید.`,`Please enter address title.`));return}if(!i||i.length<5){G&&(G.hidden=!1,G.textContent=t(`لطفاً نشانی کامل را وارد کنید.`,`Please enter full address.`));return}let c=document.getElementById(`profile-save-address-btn`);c&&(c.disabled=!0,c.textContent=t(`در حال ذخیره...`,`Saving...`)),pe({title:n,city:r,address:i,floor:a,unit:o,hasElevator:s}).then(()=>{U.reset(),U.hidden=!0,Y()}).catch(e=>{G&&(G.hidden=!1,G.textContent=e instanceof Error?e.message:t(`خطایی در ثبت آدرس پیش آمد.`,`Failed to add address.`))}).finally(()=>{c&&(c.disabled=!1,c.textContent=t(`ذخیره آدرس`,`Save Address`))})}),k.addEventListener(`click`,()=>{J?.stopWebOtp(),Z()}),S.addEventListener(`submit`,e=>{e.preventDefault();let n=C.value,r=_e(n);if(E.hidden=!0,!ge.test(r)){E.hidden=!1,E.textContent=t(`شماره موبایل معتبر ۱۱ رقمی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).`,`Enter a valid 11-digit mobile number.`);return}T.disabled=!0,T.textContent=t(`در حال ارسال کد...`,`Sending code...`),b(r).then(()=>{Oe(r)}).catch(e=>{E.hidden=!1,E.textContent=e instanceof Error?e.message:t(`خطایی در ارسال کد پیش آمد.`,`Failed to send code.`)}).finally(()=>{T.disabled=!1,T.textContent=t(`دریافت کد تأیید`,`Send verification code`)})});function Ae(){return j.hidden=!0,b(q).catch(e=>{j.hidden=!1,j.textContent=e instanceof Error?e.message:t(`ارسال مجدد کد با خطا مواجه شد.`,`Failed to resend code.`)})}async function $(e){j.hidden=!0,A.disabled=!0,A.textContent=t(`در حال بررسی...`,`Verifying...`);try{let t=await se(q,e);J?.stopWebOtp(),t.needsProfile?ke(t.customer):X(t.customer)}catch(e){j.hidden=!1,j.textContent=e instanceof Error?e.message:t(`کد واردشده معتبر نیست.`,`Invalid code.`),J?.reset()}finally{A.disabled=!1,A.textContent=t(`تأیید و ادامه`,`Verify and continue`)}}D.addEventListener(`submit`,e=>{e.preventDefault();let n=J?.getCode()??``;if(n.length!==5){j.hidden=!1,j.textContent=t(`لطفاً کد ۵ رقمی را کامل وارد کنید.`,`Please enter the full 5-digit code.`);return}$(n)}),M.addEventListener(`submit`,e=>{e.preventDefault(),V.hidden=!0;let n=P.value,r=F.value.trim(),i=R?.value.trim()||void 0;if(!n||![`female`,`male`,`company`,`organization`].includes(n)){V.hidden=!1,V.textContent=t(`لطفاً نوع حساب کاربری را انتخاب کنید.`,`Please select account type.`);return}if((n===`company`||n===`organization`)&&!i){V.hidden=!1,V.textContent=n===`company`?t(`لطفاً نام شرکت را وارد کنید.`,`Please enter company name.`):t(`لطفاً نام اداره یا سازمان را وارد کنید.`,`Please enter organization name.`);return}if(!r||r.length<2){V.hidden=!1,V.textContent=t(`لطفاً نام و نام خانوادگی را وارد کنید.`,`Please enter full name.`);return}B.disabled=!0,B.textContent=t(`در حال ثبت...`,`Saving...`),fe(r,n,i).then(e=>{X(e)}).catch(e=>{V.hidden=!1,V.textContent=e instanceof Error?e.message:t(`خطایی در ثبت اطلاعات رخ داد.`,`Failed to save profile.`)}).finally(()=>{B.disabled=!1,B.textContent=t(`تکمیل و ورود به حساب`,`Complete & Enter`)})}),y.addEventListener(`click`,()=>{oe().finally(()=>{Z(),S.reset(),D.reset(),M.reset(),Q(``)})}),de().then(e=>{e?!e.fullName||!e.gender?ke(e):X(e):Z()}).catch(()=>Z())}h(()=>void T());