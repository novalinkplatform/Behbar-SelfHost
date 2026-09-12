import{B as e,C as t,F as n,I as r,L as i,M as a,O as o,P as s,R as c,S as l,V as u,_ as d,a as f,b as p,c as m,g as h,h as g,i as ee,k as _,l as te,n as ne,r as re,t as ie,v as ae,x as v,y}from"./appReady-DNSS-HAw.js";import{a as oe,c as se,d as ce,i as le,n as ue,o as b,r as de,s as fe,t as pe}from"./customerAuth-BPtzfzOh.js";import{n as x,t as me}from"./addresses-gsDhzTww.js";function S(t,n=6){return`
    <div class="otp-input-group" id="${t}-group">${Array.from({length:n},(e,t)=>`<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" class="otp-digit" data-otp-index="${t}" />`).join(``)}</div>
    <div class="otp-resend-row">
      <span class="otp-timer" id="${t}-timer"></span>
      <button type="button" class="otp-resend-btn" id="${t}-resend-btn" hidden>${e(`ارسال دوباره‌ی کد`,`Resend code`)}</button>
    </div>
  `}function he(t,n){let r=n.length??6,i=n.resendSeconds??60,a=document.getElementById(`${t}-group`),o=document.getElementById(`${t}-timer`),s=document.getElementById(`${t}-resend-btn`);if(!a||!o||!s)return null;let c=Array.from(a.querySelectorAll(`.otp-digit`)),l=null,u=null;function d(){return c.map(e=>e.value).join(``)}function f(){let e=d();e.length===r&&/^\d+$/.test(e)&&(g(),n.onComplete(e))}c.forEach((e,t)=>{e.addEventListener(`input`,()=>{e.value=e.value.replace(/\D/g,``).slice(-1),e.value&&t<c.length-1&&c[t+1].focus(),f()}),e.addEventListener(`keydown`,n=>{n.key===`Backspace`&&!e.value&&t>0&&c[t-1].focus()}),e.addEventListener(`paste`,e=>{let t=e.clipboardData?.getData(`text`).replace(/\D/g,``)??``;if(!t)return;e.preventDefault(),t.slice(0,r).split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)});let n=Math.min(t.length,r)-1;n>=0&&c[n].focus(),f()})});function p(){let t=i;s.hidden=!0,o.hidden=!1,l&&window.clearInterval(l);let n=()=>{let n=String(Math.floor(t/60)).padStart(2,`0`),r=String(t%60).padStart(2,`0`);o.textContent=`${e(`ارسال دوباره تا`,`Resend in`)} ${n}:${r}`,t<=0&&(l&&window.clearInterval(l),o.hidden=!0,s.hidden=!1),--t};n(),l=window.setInterval(n,1e3)}s.addEventListener(`click`,()=>{n.onResend(),m(),p()});function m(){c.forEach(e=>e.value=``),c[0]?.focus()}function h(){c[0]?.focus()}function g(){u?.abort(),u=null}return`OTPCredential`in window&&(u=new AbortController,navigator.credentials.get({otp:{transport:[`sms`]},signal:u.signal}).then(e=>{let t=e?.code?.replace(/\D/g,``);t&&t.length===r&&(t.split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)}),f())}).catch(()=>{})),p(),h(),{reset:m,focusFirst:h,stopWebOtp:g,getCode:d}}function C(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(`حساب کاربری`,`Account`)}</span>
        </nav>

        <h1 class="article-title">${e(`حساب کاربری`,`Account`)}</h1>

        <div id="profile-auth-section">
          <!-- گام ۱: شماره موبایل (ورود و ثبت‌نام یکپارچه) -->
          <form class="profile-auth-form" id="profile-phone-form">
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${u.user}</span></div>
              <h2 class="profile-auth-title">${e(`ورود یا ثبت‌نام در بهبار`,`Log in or Sign up`)}</h2>
              <p class="profile-auth-subtitle">${e(`شماره موبایل خود را وارد کنید تا کد تأیید پیامک شود.`,`Enter your mobile number to receive a verification code.`)}</p>
            </div>

            <div class="form-field">
              <label for="profile-phone-input">${e(`شماره موبایل`,`Mobile number`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${u.phone}</span>
                <input type="tel" id="profile-phone-input" dir="ltr" placeholder="${e(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-phone-submit-btn">
              <span>${e(`دریافت کد تأیید`,`Send verification code`)}</span>
            </button>

            <p class="request-panel-error" id="profile-phone-error" hidden></p>
          </form>

          <!-- گام ۲: کد تأیید پیامک -->
          <form class="profile-auth-form" id="profile-otp-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${u.shield}</span></div>
              <h2 class="profile-auth-title">${e(`کد تأیید پیامکی`,`Verification Code`)}</h2>
              <div class="profile-otp-phone-row">
                <span>${e(`کد تأیید به شماره`,`Code sent to`)}</span>
                <strong id="profile-otp-phone-display" dir="ltr"></strong>
                <button type="button" class="profile-edit-phone-btn" id="profile-change-phone-btn">${e(`ویرایش شماره`,`Edit`)}</button>
              </div>
            </div>

            <div class="form-field otp-center-field">
              ${S(`profile-otp`,5)}
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-otp-submit-btn">
              <span>${e(`تأیید و ادامه`,`Verify and continue`)}</span>
            </button>

            <p class="request-panel-error" id="profile-otp-error" hidden></p>
          </form>

          <!-- گام ۳: انتخاب هویت و مشخصات حساب (آقا، خانم، شرکتی، اداری و سازمانی) -->
          <form class="profile-auth-form" id="profile-details-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${u.badge}</span></div>
              <h2 class="profile-auth-title">${e(`تکمیل اطلاعات حساب`,`Complete Profile`)}</h2>
              <p class="profile-auth-subtitle">${e(`لطفاً نوع حساب و مشخصات خود را برای ورود مشخص کنید.`,`Please select your account type and enter your details.`)}</p>
            </div>

            <!-- انتخاب هویت و ماهیت حساب -->
            <div class="form-field">
              <label class="form-field-label">${e(`نوع حساب / هویت`,`Account Type / Identity`)}</label>
              <div class="profile-gender-picker profile-identity-picker" role="radiogroup" aria-label="${e(`انتخاب نوع حساب`,`Account type selection`)}">
                <button type="button" class="profile-gender-btn" data-gender="female" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${u.female}</span>
                  <span class="profile-gender-text">${e(`خانم`,`Female`)}</span>
                  <span class="profile-gender-check">${u.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="male" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${u.male}</span>
                  <span class="profile-gender-text">${e(`آقا`,`Male`)}</span>
                  <span class="profile-gender-check">${u.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="company" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${u.building}</span>
                  <span class="profile-gender-text">${e(`شرکتی`,`Company`)}</span>
                  <span class="profile-gender-check">${u.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="organization" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${u.organization}</span>
                  <span class="profile-gender-text">${e(`اداری و سازمانی`,`Organization`)}</span>
                  <span class="profile-gender-check">${u.checkCircle}</span>
                </button>
              </div>
              <input type="hidden" id="profile-gender-input" value="" />
            </div>

            <!-- نام شرکت یا سازمان (ویژه اشخاص حقوقی) -->
            <div class="form-field" id="profile-company-field" hidden>
              <label for="profile-company-input" id="profile-company-label">${e(`نام شرکت / سازمان`,`Company / Organization name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon" id="profile-company-icon">${u.building}</span>
                <input type="text" id="profile-company-input" placeholder="${e(`نام کامل شرکت، اداره یا سازمان`,`Enter company/organization name`)}" />
              </div>
            </div>

            <!-- نام و نام خانوادگی / نام رابط -->
            <div class="form-field">
              <label for="profile-fullname-input" id="profile-fullname-label">${e(`نام و نام خانوادگی`,`Full name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${u.user}</span>
                <input type="text" id="profile-fullname-input" autocomplete="name" placeholder="${e(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)}" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-details-submit-btn">
              <span>${e(`تکمیل و ورود به حساب`,`Complete & Enter`)}</span>
            </button>

            <p class="request-panel-error" id="profile-details-error" hidden></p>
          </form>
        </div>

        <div class="orders-content" id="profile-page-content" hidden>
          <section class="orders-block">
            <h2>${e(`اطلاعات حساب`,`Account information`)}</h2>
            <div class="orders-profile-card" id="profile-info-card"></div>
          </section>

          <!-- دفترچه آدرس‌ها -->
          <section class="orders-block" id="profile-addressbook-block">
            <div class="profile-section-header">
              <div>
                <h2>${e(`دفترچه آدرس‌ها`,`Address Book`)}</h2>
                <p class="profile-section-sub">${e(`آدرس‌های منتخب برای استفاده در سفارش‌ها`,`Saved addresses for quick selection`)}</p>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="profile-add-address-btn">
                <span class="icon">${u.plus}</span>
                <span>${e(`افزودن آدرس جدید`,`Add New Address`)}</span>
              </button>
            </div>

            <!-- فرم درج آدرس جدید -->
            <form class="profile-new-address-form" id="profile-new-address-form" hidden>
              <h3 class="profile-form-inner-title">${e(`ثبت آدرس جدید`,`New Address`)}</h3>

              <div class="form-field">
                <label class="form-field-label">${e(`عنوان آدرس`,`Address Title`)}</label>
                <div class="profile-address-chips" id="profile-address-chips">
                  <button type="button" class="profile-chip" data-chip="${e(`منزل`,`Home`)}">${e(`منزل`,`Home`)}</button>
                  <button type="button" class="profile-chip" data-chip="${e(`محل کار`,`Work`)}">${e(`محل کار`,`Work`)}</button>
                  <button type="button" class="profile-chip" data-chip="${e(`دفتر مرکزی`,`Headquarters`)}">${e(`دفتر مرکزی`,`Headquarters`)}</button>
                  <button type="button" class="profile-chip" data-chip="${e(`انبار`,`Warehouse`)}">${e(`انبار`,`Warehouse`)}</button>
                  <button type="button" class="profile-chip" data-chip="${e(`شعبه`,`Branch`)}">${e(`شعبه`,`Branch`)}</button>
                </div>
                <div class="input-wrapper" style="margin-top: 8px;">
                  <span class="icon input-icon">${u.pin}</span>
                  <input type="text" id="profile-address-title-input" placeholder="${e(`عنوان دلخواه (مثلاً: منزل، شرکت یا انبار)`,`Title (e.g. Home, Office, Warehouse)`)}" required />
                </div>
              </div>

              <div class="profile-address-fields-row">
                <div class="form-field profile-city-col">
                  <label for="profile-address-city-input">${e(`شهر`,`City`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-city-input" value="تهران" required />
                  </div>
                </div>
                <div class="form-field profile-address-col">
                  <label for="profile-address-text-input">${e(`نشانی دقیق`,`Full Address`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-text-input" placeholder="${e(`خیابان، کوچه، پلاک...`,`Street, alley, building number...`)}" required />
                  </div>
                </div>
              </div>

              <div class="profile-address-meta-row">
                <div class="form-field">
                  <label for="profile-address-floor-input">${e(`طبقه`,`Floor`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-floor-input" placeholder="${e(`مثلاً ۲`,`e.g. 2`)}" />
                  </div>
                </div>
                <div class="form-field">
                  <label for="profile-address-unit-input">${e(`واحد`,`Unit`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-unit-input" placeholder="${e(`مثلاً ۴`,`e.g. 4`)}" />
                  </div>
                </div>
                <div class="form-field profile-elevator-col">
                  <label class="form-field-label">${e(`آسانسور`,`Elevator`)}</label>
                  <label class="profile-checkbox-wrap">
                    <input type="checkbox" id="profile-address-elevator-input" />
                    <span>${e(`آسانسور دارد`,`Has elevator`)}</span>
                  </label>
                </div>
              </div>

              <div class="profile-address-actions">
                <button type="submit" class="btn btn-primary btn-sm" id="profile-save-address-btn">
                  <span>${e(`ذخیره آدرس`,`Save Address`)}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-sm" id="profile-cancel-address-btn">
                  <span>${e(`انصراف`,`Cancel`)}</span>
                </button>
              </div>
              <p class="request-panel-error" id="profile-address-form-error" hidden></p>
            </form>

            <div class="profile-addresses-grid" id="profile-addresses-grid">
              <div class="profile-addresses-empty" id="profile-addresses-empty">
                <span class="icon">${u.pin}</span>
                <p>${e(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
              </div>
            </div>
          </section>

          <section class="orders-block" id="profile-addresses-block" hidden>
            <h2>${e(`آدرس‌های سفارش‌های قبلی`,`Previous orders addresses`)}</h2>
            <div class="saved-address-groups">
              <div class="saved-address-group" id="profile-origin-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${u.pin}</span>${e(`مبدأها`,`Origins`)}</h3>
                <ul class="saved-address-list" id="profile-origin-address-list"></ul>
              </div>
              <div class="saved-address-group" id="profile-destination-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${u.flag}</span>${e(`مقصدها`,`Destinations`)}</h3>
                <ul class="saved-address-list" id="profile-destination-address-list"></ul>
              </div>
            </div>
          </section>

          <button type="button" class="btn btn-secondary btn-block" id="profile-logout-btn">
            <span class="icon">${u.logout}</span>
            <span>${e(`خروج از حساب`,`Log out`)}</span>
          </button>
        </div>
      </div>
    </article>
  `}var w={},ge=/^09\d{9}$/;function _e(e){let t=e.replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).trim().replace(/[\s\-_]/g,``);return t.startsWith(`+98`)?t=`0`+t.slice(3):t.startsWith(`0098`)?t=`0`+t.slice(4):t.startsWith(`98`)&&(t=`0`+t.slice(2)),t}function ve(){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(w)}
    <main id="main-content">
      ${C()}
    </main>
    ${n(w)}
    ${t()}
    <div class="header-quick-actions">
      ${v(w)}
      ${p(w)}
      ${y()}
    </div>
  `)}function ye(t){if(!t.length)return e(`نامشخص`,`Unknown`);let n=t.reduce((e,t)=>new Date(t.createdAt)<new Date(e.createdAt)?t:e);return o(_(new Date(n.createdAt)))}async function T(){h(),w=await g(),ne(w.language_mode),te(w.theme),m(w.seo),ve(),ie(),ee(w.branding),f(w.site_name),re(w.language_mode),r(w),s(w),l(),c(),ae();let t=document.getElementById(`profile-auth-section`),n=document.getElementById(`profile-page-content`),i=document.getElementById(`profile-info-card`),o=document.getElementById(`profile-addresses-block`),d=document.getElementById(`profile-origin-addresses`),p=document.getElementById(`profile-origin-address-list`),_=document.getElementById(`profile-destination-addresses`),v=document.getElementById(`profile-destination-address-list`),y=document.getElementById(`profile-logout-btn`),S=document.getElementById(`profile-phone-form`),C=document.getElementById(`profile-phone-input`),T=document.getElementById(`profile-phone-submit-btn`),E=document.getElementById(`profile-phone-error`),D=document.getElementById(`profile-otp-form`),be=document.getElementById(`profile-otp-phone-display`),O=document.getElementById(`profile-change-phone-btn`),k=document.getElementById(`profile-otp-submit-btn`),A=document.getElementById(`profile-otp-error`),j=document.getElementById(`profile-details-form`),M=Array.from(document.querySelectorAll(`.profile-gender-btn`)),N=document.getElementById(`profile-gender-input`),P=document.getElementById(`profile-fullname-input`),F=document.getElementById(`profile-fullname-label`),I=document.getElementById(`profile-company-field`),L=document.getElementById(`profile-company-input`),R=document.getElementById(`profile-company-label`),z=document.getElementById(`profile-details-submit-btn`),B=document.getElementById(`profile-details-error`),V=document.getElementById(`profile-add-address-btn`),H=document.getElementById(`profile-new-address-form`),U=document.getElementById(`profile-cancel-address-btn`),W=document.getElementById(`profile-address-title-input`),xe=document.getElementById(`profile-address-city-input`),Se=document.getElementById(`profile-address-text-input`),Ce=document.getElementById(`profile-address-floor-input`),we=document.getElementById(`profile-address-unit-input`),Te=document.getElementById(`profile-address-elevator-input`),G=document.getElementById(`profile-address-form-error`),K=document.getElementById(`profile-addresses-grid`),Ee=Array.from(document.querySelectorAll(`.profile-chip`));if(!t||!n||!i||!o||!d||!p||!_||!v||!y||!S||!C||!T||!E||!D||!be||!O||!k||!A||!j||!N||!P||!z||!B)return;let q=``,J=null;async function Y(){if(!K)return;let t=await le();if(!t.length){K.innerHTML=`
        <div class="profile-addresses-empty">
          <span class="icon">${u.pin}</span>
          <p>${e(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
        </div>
      `;return}K.innerHTML=t.map(t=>{let n=[];return t.city&&n.push(`<span class="profile-address-tag">${t.city}</span>`),t.floor&&n.push(`<span class="profile-address-tag">${e(`طبقه`,`Floor`)} ${a(t.floor)}</span>`),t.unit&&n.push(`<span class="profile-address-tag">${e(`واحد`,`Unit`)} ${a(t.unit)}</span>`),t.hasElevator&&n.push(`<span class="profile-address-tag">${e(`دارای آسانسور`,`With elevator`)}</span>`),`
          <div class="profile-address-card" data-address-id="${t.id}">
            <div class="profile-address-card-header">
              <span class="profile-address-badge"><span class="icon">${u.pin}</span>${t.title}</span>
              <button type="button" class="profile-address-del-btn" data-delete-id="${t.id}" title="${e(`حذف آدرس`,`Delete address`)}">
                <span class="icon">${u.trash}</span>
              </button>
            </div>
            <p class="profile-address-text">${t.address}</p>
            ${n.length?`<div class="profile-address-tags">${n.join(``)}</div>`:``}
          </div>
        `}).join(``),Array.from(K.querySelectorAll(`.profile-address-del-btn`)).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.deleteId);n&&(t.disabled=!0,ue(n).then(()=>Y()).catch(n=>{alert(n instanceof Error?n.message:e(`حذف ناموفق بود.`,`Failed to delete`)),t.disabled=!1}))})})}function X(t,n){let r=ye(n),s=u.user,c=``,l=`profile-badge-male`;t.gender===`female`?(s=u.female,c=e(`خانم`,`Female`),l=`profile-badge-female`):t.gender===`male`?(s=u.male,c=e(`آقا`,`Male`),l=`profile-badge-male`):t.gender===`company`?(s=u.building,c=e(`شرکتی`,`Company`),l=`profile-badge-company`):t.gender===`organization`&&(s=u.organization,c=e(`اداری و سازمانی`,`Organization`),l=`profile-badge-org`);let f=t.companyName?`
        <div class="orders-profile-row">
          <span class="icon">${t.gender===`organization`?u.organization:u.building}</span>
          <strong>${t.companyName}</strong>
          ${t.gender?`<span class="profile-gender-badge ${l}">${c}</span>`:``}
        </div>
      `:``,m=!t.companyName&&c?`<span class="profile-gender-badge ${l}">${c}</span>`:``;i.innerHTML=`
      ${f}
      <div class="orders-profile-row">
        <span class="icon">${s}</span>
        <strong>${t.fullName}</strong>
        ${m}
      </div>
      <div class="orders-profile-row">
        <span class="icon">${u.phone}</span>
        <span dir="ltr">${a(t.phone)}</span>
      </div>
      <div class="orders-profile-row">
        <span class="icon">${u.calendar}</span>
        <span>${e(`عضویت از`,`Member since`)} ${r}</span>
      </div>
    `,Y();let{origins:h,destinations:g}=me(n);h.length?(d.hidden=!1,p.innerHTML=h.map(e=>`<li class="saved-address-item"><span class="icon">${u.pin}</span><span>${x(e)}</span></li>`).join(``)):d.hidden=!0,g.length?(_.hidden=!1,v.innerHTML=g.map(e=>`<li class="saved-address-item"><span class="icon">${u.flag}</span><span>${x(e)}</span></li>`).join(``)):_.hidden=!0,o.hidden=!h.length&&!g.length}function Z(e){t.hidden=!0,n.hidden=!1,ce(e.phone).then(t=>X(e,t)).catch(()=>X(e,[]))}function Q(){t.hidden=!1,n.hidden=!0,S.hidden=!1,D.hidden=!0,j.hidden=!0,E.hidden=!0,C.focus()}function De(e){q=e,t.hidden=!1,n.hidden=!0,S.hidden=!0,D.hidden=!1,j.hidden=!0,A.hidden=!0,be.textContent=a(e),J?.stopWebOtp(),J=he(`profile-otp`,{length:5,onComplete:e=>{Ae(e)},onResend:()=>{ke()}}),J?.focusFirst()}function Oe(e){t.hidden=!1,n.hidden=!0,S.hidden=!0,D.hidden=!0,j.hidden=!1,B.hidden=!0,e.fullName&&(P.value=e.fullName),e.companyName&&L&&(L.value=e.companyName),e.gender?$(e.gender):$(``),e.gender===`company`||e.gender===`organization`?L?.focus():P.focus()}function $(t){N.value=t,M.forEach(e=>{let n=e.dataset.gender===t;e.classList.toggle(`is-active`,n),e.setAttribute(`aria-checked`,String(n))});let n=t===`company`||t===`organization`;I&&(I.hidden=!n,n?(R&&(R.textContent=t===`company`?e(`نام شرکت یا مجموعه تجاری`,`Company name`):e(`نام اداره یا سازمان`,`Organization name`)),L&&(L.placeholder=t===`company`?e(`نام شرکت، فروشگاه یا برند تجاری`,`Enter company name`):e(`نام اداره، سازمان یا نهاد دولتی/عمومی`,`Enter organization name`),L.required=!0)):L&&(L.required=!1,L.value=``)),F&&P&&(n?(F.textContent=e(`نام و نام خانوادگی رابط / نماینده`,`Representative full name`),P.placeholder=e(`نام و نام خانوادگی شخص رابط یا مسئول هماهنگی`,`Representative name`)):(F.textContent=e(`نام و نام خانوادگی`,`Full name`),P.placeholder=e(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)))}M.forEach(e=>{e.addEventListener(`click`,()=>{$(e.dataset.gender??``),B.hidden=!0})}),V&&H&&V.addEventListener(`click`,()=>{H.hidden=!H.hidden,!H.hidden&&W&&W.focus()}),U&&H&&U.addEventListener(`click`,()=>{H.hidden=!0,H.reset(),G&&(G.hidden=!0)}),Ee.forEach(e=>{e.addEventListener(`click`,()=>{W&&(W.value=e.dataset.chip??e.textContent??``,W.focus())})}),H&&H.addEventListener(`submit`,t=>{t.preventDefault(),G&&(G.hidden=!0);let n=W?.value.trim()??``,r=xe?.value.trim()??`تهران`,i=Se?.value.trim()??``,a=Ce?.value.trim()||void 0,o=we?.value.trim()||void 0,s=Te?.checked??!1;if(!n){G&&(G.hidden=!1,G.textContent=e(`لطفاً عنوان آدرس را وارد کنید.`,`Please enter address title.`));return}if(!i||i.length<5){G&&(G.hidden=!1,G.textContent=e(`لطفاً نشانی کامل را وارد کنید.`,`Please enter full address.`));return}let c=document.getElementById(`profile-save-address-btn`);c&&(c.disabled=!0,c.textContent=e(`در حال ذخیره...`,`Saving...`)),pe({title:n,city:r,address:i,floor:a,unit:o,hasElevator:s}).then(()=>{H.reset(),H.hidden=!0,Y()}).catch(t=>{G&&(G.hidden=!1,G.textContent=t instanceof Error?t.message:e(`خطایی در ثبت آدرس پیش آمد.`,`Failed to add address.`))}).finally(()=>{c&&(c.disabled=!1,c.textContent=e(`ذخیره آدرس`,`Save Address`))})}),O.addEventListener(`click`,()=>{J?.stopWebOtp(),Q()}),S.addEventListener(`submit`,t=>{t.preventDefault();let n=C.value,r=_e(n);if(E.hidden=!0,!ge.test(r)){E.hidden=!1,E.textContent=e(`شماره موبایل معتبر ۱۱ رقمی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).`,`Enter a valid 11-digit mobile number.`);return}T.disabled=!0,T.textContent=e(`در حال ارسال کد...`,`Sending code...`),b(r).then(()=>{De(r)}).catch(t=>{E.hidden=!1,E.textContent=t instanceof Error?t.message:e(`خطایی در ارسال کد پیش آمد.`,`Failed to send code.`)}).finally(()=>{T.disabled=!1,T.textContent=e(`دریافت کد تأیید`,`Send verification code`)})});function ke(){return A.hidden=!0,b(q).catch(t=>{A.hidden=!1,A.textContent=t instanceof Error?t.message:e(`ارسال مجدد کد با خطا مواجه شد.`,`Failed to resend code.`)})}async function Ae(t){A.hidden=!0,k.disabled=!0,k.textContent=e(`در حال بررسی...`,`Verifying...`);try{let e=await se(q,t);J?.stopWebOtp(),e.needsProfile?Oe(e.customer):Z(e.customer)}catch(t){A.hidden=!1,A.textContent=t instanceof Error?t.message:e(`کد واردشده معتبر نیست.`,`Invalid code.`),J?.reset()}finally{k.disabled=!1,k.textContent=e(`تأیید و ادامه`,`Verify and continue`)}}D.addEventListener(`submit`,t=>{t.preventDefault();let n=J?.getCode()??``;if(n.length!==5){A.hidden=!1,A.textContent=e(`لطفاً کد ۵ رقمی را کامل وارد کنید.`,`Please enter the full 5-digit code.`);return}Ae(n)}),j.addEventListener(`submit`,t=>{t.preventDefault(),B.hidden=!0;let n=N.value,r=P.value.trim(),i=L?.value.trim()||void 0;if(!n||![`female`,`male`,`company`,`organization`].includes(n)){B.hidden=!1,B.textContent=e(`لطفاً نوع حساب کاربری را انتخاب کنید.`,`Please select account type.`);return}if((n===`company`||n===`organization`)&&!i){B.hidden=!1,B.textContent=n===`company`?e(`لطفاً نام شرکت را وارد کنید.`,`Please enter company name.`):e(`لطفاً نام اداره یا سازمان را وارد کنید.`,`Please enter organization name.`);return}if(!r||r.length<2){B.hidden=!1,B.textContent=e(`لطفاً نام و نام خانوادگی را وارد کنید.`,`Please enter full name.`);return}z.disabled=!0,z.textContent=e(`در حال ثبت...`,`Saving...`),fe(r,n,i).then(e=>{Z(e)}).catch(t=>{B.hidden=!1,B.textContent=t instanceof Error?t.message:e(`خطایی در ثبت اطلاعات رخ داد.`,`Failed to save profile.`)}).finally(()=>{z.disabled=!1,z.textContent=e(`تکمیل و ورود به حساب`,`Complete & Enter`)})}),y.addEventListener(`click`,()=>{oe().finally(()=>{Q(),S.reset(),D.reset(),j.reset(),$(``)})}),de().then(e=>{e?!e.fullName||!e.gender?Oe(e):Z(e):Q()}).catch(()=>Q())}d(()=>void T());