import{C as e,l as t,n,p as r,t as i,u as a,x as o}from"./appReady-giJ54-6J.js";import{C as s,S as c,T as l,_ as u,b as d,c as f,g as p,h as m,i as h,l as g,n as ee,r as te,t as ne,v as _,w as re,x as ie,y as ae}from"./languageMode-CjuVnjFU.js";import{a as oe,c as se,d as ce,i as le,n as ue,o as v,r as de,s as fe,t as pe}from"./customerAuth-CfTRIeAR.js";import{n as me,t as he}from"./addresses-BlTNlrvW.js";function y(e,t=6){return`
    <div class="otp-input-group" id="${e}-group">${Array.from({length:t},(e,t)=>`<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" class="otp-digit" data-otp-index="${t}" />`).join(``)}</div>
    <div class="otp-resend-row">
      <span class="otp-timer" id="${e}-timer"></span>
      <button type="button" class="otp-resend-btn" id="${e}-resend-btn" hidden>${o(`ارسال دوباره‌ی کد`,`Resend code`)}</button>
    </div>
  `}function ge(e,t){let n=t.length??6,r=t.resendSeconds??60,i=document.getElementById(`${e}-group`),a=document.getElementById(`${e}-timer`),s=document.getElementById(`${e}-resend-btn`);if(!i||!a||!s)return null;let c=Array.from(i.querySelectorAll(`.otp-digit`)),l=null,u=null;function d(){return c.map(e=>e.value).join(``)}function f(){let e=d();e.length===n&&/^\d+$/.test(e)&&(g(),t.onComplete(e))}c.forEach((e,t)=>{e.addEventListener(`input`,()=>{e.value=e.value.replace(/\D/g,``).slice(-1),e.value&&t<c.length-1&&c[t+1].focus(),f()}),e.addEventListener(`keydown`,n=>{n.key===`Backspace`&&!e.value&&t>0&&c[t-1].focus()}),e.addEventListener(`paste`,e=>{let t=e.clipboardData?.getData(`text`).replace(/\D/g,``)??``;if(!t)return;e.preventDefault(),t.slice(0,n).split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)});let r=Math.min(t.length,n)-1;r>=0&&c[r].focus(),f()})});function p(){let e=r;s.hidden=!0,a.hidden=!1,l&&window.clearInterval(l);let t=()=>{let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);a.textContent=`${o(`ارسال دوباره تا`,`Resend in`)} ${t}:${n}`,e<=0&&(l&&window.clearInterval(l),a.hidden=!0,s.hidden=!1),--e};t(),l=window.setInterval(t,1e3)}s.addEventListener(`click`,()=>{t.onResend(),m(),p()});function m(){c.forEach(e=>e.value=``),c[0]?.focus()}function h(){c[0]?.focus()}function g(){u?.abort(),u=null}return`OTPCredential`in window&&(u=new AbortController,navigator.credentials.get({otp:{transport:[`sms`]},signal:u.signal}).then(e=>{let t=e?.code?.replace(/\D/g,``);t&&t.length===n&&(t.split(``).forEach((e,t)=>{c[t]&&(c[t].value=e)}),f())}).catch(()=>{})),p(),h(),{reset:m,focusFirst:h,stopWebOtp:g,getCode:d}}function b(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${o(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${o(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${o(`حساب کاربری`,`Account`)}</span>
        </nav>

        <h1 class="article-title">${o(`حساب کاربری`,`Account`)}</h1>

        <div id="profile-auth-section">
          <!-- گام ۱: شماره موبایل (ورود و ثبت‌نام یکپارچه) -->
          <form class="profile-auth-form" id="profile-phone-form">
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.user}</span></div>
              <h2 class="profile-auth-title">${o(`ورود یا ثبت‌نام در بهبار`,`Log in or Sign up`)}</h2>
              <p class="profile-auth-subtitle">${o(`شماره موبایل خود را وارد کنید تا کد تأیید پیامک شود.`,`Enter your mobile number to receive a verification code.`)}</p>
            </div>

            <div class="form-field">
              <label for="profile-phone-input">${o(`شماره موبایل`,`Mobile number`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${e.phone}</span>
                <input type="tel" id="profile-phone-input" dir="ltr" placeholder="${o(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-phone-submit-btn">
              <span>${o(`دریافت کد تأیید`,`Send verification code`)}</span>
            </button>

            <p class="request-panel-error" id="profile-phone-error" hidden></p>
          </form>

          <!-- گام ۲: کد تأیید پیامک -->
          <form class="profile-auth-form" id="profile-otp-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.shield}</span></div>
              <h2 class="profile-auth-title">${o(`کد تأیید پیامکی`,`Verification Code`)}</h2>
              <div class="profile-otp-phone-row">
                <span>${o(`کد تأیید به شماره`,`Code sent to`)}</span>
                <strong id="profile-otp-phone-display" dir="ltr"></strong>
                <button type="button" class="profile-edit-phone-btn" id="profile-change-phone-btn">${o(`ویرایش شماره`,`Edit`)}</button>
              </div>
            </div>

            <div class="form-field otp-center-field">
              ${y(`profile-otp`,5)}
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-otp-submit-btn">
              <span>${o(`تأیید و ادامه`,`Verify and continue`)}</span>
            </button>

            <p class="request-panel-error" id="profile-otp-error" hidden></p>
          </form>

          <!-- گام ۳: انتخاب هویت و مشخصات حساب (آقا، خانم، شرکتی، اداری و سازمانی) -->
          <form class="profile-auth-form" id="profile-details-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${e.badge}</span></div>
              <h2 class="profile-auth-title">${o(`تکمیل اطلاعات حساب`,`Complete Profile`)}</h2>
              <p class="profile-auth-subtitle">${o(`لطفاً نوع حساب و مشخصات خود را برای ورود مشخص کنید.`,`Please select your account type and enter your details.`)}</p>
            </div>

            <!-- انتخاب هویت و ماهیت حساب -->
            <div class="form-field">
              <label class="form-field-label">${o(`نوع حساب / هویت`,`Account Type / Identity`)}</label>
              <div class="profile-gender-picker profile-identity-picker" role="radiogroup" aria-label="${o(`انتخاب نوع حساب`,`Account type selection`)}">
                <button type="button" class="profile-gender-btn" data-gender="female" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.female}</span>
                  <span class="profile-gender-text">${o(`خانم`,`Female`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="male" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.male}</span>
                  <span class="profile-gender-text">${o(`آقا`,`Male`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="company" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.building}</span>
                  <span class="profile-gender-text">${o(`شرکتی`,`Company`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="organization" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${e.organization}</span>
                  <span class="profile-gender-text">${o(`اداری و سازمانی`,`Organization`)}</span>
                  <span class="profile-gender-check">${e.checkCircle}</span>
                </button>
              </div>
              <input type="hidden" id="profile-gender-input" value="" />
            </div>

            <!-- نام شرکت یا سازمان (ویژه اشخاص حقوقی) -->
            <div class="form-field" id="profile-company-field" hidden>
              <label for="profile-company-input" id="profile-company-label">${o(`نام شرکت / سازمان`,`Company / Organization name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon" id="profile-company-icon">${e.building}</span>
                <input type="text" id="profile-company-input" placeholder="${o(`نام کامل شرکت، اداره یا سازمان`,`Enter company/organization name`)}" />
              </div>
            </div>

            <!-- نام و نام خانوادگی / نام رابط -->
            <div class="form-field">
              <label for="profile-fullname-input" id="profile-fullname-label">${o(`نام و نام خانوادگی`,`Full name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${e.user}</span>
                <input type="text" id="profile-fullname-input" autocomplete="name" placeholder="${o(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)}" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-details-submit-btn">
              <span>${o(`تکمیل و ورود به حساب`,`Complete & Enter`)}</span>
            </button>

            <p class="request-panel-error" id="profile-details-error" hidden></p>
          </form>
        </div>

        <div class="orders-content" id="profile-page-content" hidden>
          <section class="orders-block">
            <h2>${o(`اطلاعات حساب`,`Account information`)}</h2>
            <div class="orders-profile-card" id="profile-info-card"></div>
          </section>

          <!-- دفترچه آدرس‌ها -->
          <section class="orders-block" id="profile-addressbook-block">
            <div class="profile-section-header">
              <div>
                <h2>${o(`دفترچه آدرس‌ها`,`Address Book`)}</h2>
                <p class="profile-section-sub">${o(`آدرس‌های منتخب برای استفاده در سفارش‌ها`,`Saved addresses for quick selection`)}</p>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="profile-add-address-btn">
                <span class="icon">${e.plus}</span>
                <span>${o(`افزودن آدرس جدید`,`Add New Address`)}</span>
              </button>
            </div>

            <!-- فرم درج آدرس جدید -->
            <form class="profile-new-address-form" id="profile-new-address-form" hidden>
              <h3 class="profile-form-inner-title">${o(`ثبت آدرس جدید`,`New Address`)}</h3>

              <div class="form-field">
                <label class="form-field-label">${o(`عنوان آدرس`,`Address Title`)}</label>
                <div class="profile-address-chips" id="profile-address-chips">
                  <button type="button" class="profile-chip" data-chip="${o(`منزل`,`Home`)}">${o(`منزل`,`Home`)}</button>
                  <button type="button" class="profile-chip" data-chip="${o(`محل کار`,`Work`)}">${o(`محل کار`,`Work`)}</button>
                  <button type="button" class="profile-chip" data-chip="${o(`دفتر مرکزی`,`Headquarters`)}">${o(`دفتر مرکزی`,`Headquarters`)}</button>
                  <button type="button" class="profile-chip" data-chip="${o(`انبار`,`Warehouse`)}">${o(`انبار`,`Warehouse`)}</button>
                  <button type="button" class="profile-chip" data-chip="${o(`شعبه`,`Branch`)}">${o(`شعبه`,`Branch`)}</button>
                </div>
                <div class="input-wrapper" style="margin-top: 8px;">
                  <span class="icon input-icon">${e.pin}</span>
                  <input type="text" id="profile-address-title-input" placeholder="${o(`عنوان دلخواه (مثلاً: منزل، شرکت یا انبار)`,`Title (e.g. Home, Office, Warehouse)`)}" required />
                </div>
              </div>

              <div class="profile-address-fields-row">
                <div class="form-field profile-city-col">
                  <label for="profile-address-city-input">${o(`شهر`,`City`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-city-input" value="تهران" required />
                  </div>
                </div>
                <div class="form-field profile-address-col">
                  <label for="profile-address-text-input">${o(`نشانی دقیق`,`Full Address`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-text-input" placeholder="${o(`خیابان، کوچه، پلاک...`,`Street, alley, building number...`)}" required />
                  </div>
                </div>
              </div>

              <div class="profile-address-meta-row">
                <div class="form-field">
                  <label for="profile-address-floor-input">${o(`طبقه`,`Floor`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-floor-input" placeholder="${o(`مثلاً ۲`,`e.g. 2`)}" />
                  </div>
                </div>
                <div class="form-field">
                  <label for="profile-address-unit-input">${o(`واحد`,`Unit`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-unit-input" placeholder="${o(`مثلاً ۴`,`e.g. 4`)}" />
                  </div>
                </div>
                <div class="form-field profile-elevator-col">
                  <label class="form-field-label">${o(`آسانسور`,`Elevator`)}</label>
                  <label class="profile-checkbox-wrap">
                    <input type="checkbox" id="profile-address-elevator-input" />
                    <span>${o(`آسانسور دارد`,`Has elevator`)}</span>
                  </label>
                </div>
              </div>

              <div class="profile-address-actions">
                <button type="submit" class="btn btn-primary btn-sm" id="profile-save-address-btn">
                  <span>${o(`ذخیره آدرس`,`Save Address`)}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-sm" id="profile-cancel-address-btn">
                  <span>${o(`انصراف`,`Cancel`)}</span>
                </button>
              </div>
              <p class="request-panel-error" id="profile-address-form-error" hidden></p>
            </form>

            <div class="profile-addresses-grid" id="profile-addresses-grid">
              <div class="profile-addresses-empty" id="profile-addresses-empty">
                <span class="icon">${e.pin}</span>
                <p>${o(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
              </div>
            </div>
          </section>

          <section class="orders-block" id="profile-addresses-block" hidden>
            <h2>${o(`آدرس‌های سفارش‌های قبلی`,`Previous orders addresses`)}</h2>
            <div class="saved-address-groups">
              <div class="saved-address-group" id="profile-origin-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${e.pin}</span>${o(`مبدأها`,`Origins`)}</h3>
                <ul class="saved-address-list" id="profile-origin-address-list"></ul>
              </div>
              <div class="saved-address-group" id="profile-destination-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${e.flag}</span>${o(`مقصدها`,`Destinations`)}</h3>
                <ul class="saved-address-list" id="profile-destination-address-list"></ul>
              </div>
            </div>
          </section>

          <button type="button" class="btn btn-secondary btn-block" id="profile-logout-btn">
            <span class="icon">${e.logout}</span>
            <span>${o(`خروج از حساب`,`Log out`)}</span>
          </button>
        </div>
      </div>
    </article>
  `}var x={},_e=/^09\d{9}$/;function ve(e){let t=e.replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).trim().replace(/[\s\-_]/g,``);return t.startsWith(`+98`)?t=`0`+t.slice(3):t.startsWith(`0098`)?t=`0`+t.slice(4):t.startsWith(`98`)&&(t=`0`+t.slice(2)),t}function ye(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${o(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${c(x)}
    <main id="main-content">
      ${b()}
    </main>
    ${d(x)}
    ${_()}
    ${l(x)}
  `)}function be(e){if(!e.length)return o(`نامشخص`,`Unknown`);let n=e.reduce((e,t)=>new Date(t.createdAt)<new Date(e.createdAt)?t:e);return t(a(new Date(n.createdAt)))}async function S(){n(),x=await m(),ne(x.language_mode),g(x.theme),f(x.seo),ye(),i(),te(x.branding),h(x.site_name),ee(x.language_mode),ie(x),ae(x),u(),s(),re(x);let t=document.getElementById(`profile-auth-section`),a=document.getElementById(`profile-page-content`),c=document.getElementById(`profile-info-card`),l=document.getElementById(`profile-addresses-block`),d=document.getElementById(`profile-origin-addresses`),p=document.getElementById(`profile-origin-address-list`),_=document.getElementById(`profile-destination-addresses`),y=document.getElementById(`profile-destination-address-list`),b=document.getElementById(`profile-logout-btn`),S=document.getElementById(`profile-phone-form`),C=document.getElementById(`profile-phone-input`),w=document.getElementById(`profile-phone-submit-btn`),T=document.getElementById(`profile-phone-error`),E=document.getElementById(`profile-otp-form`),D=document.getElementById(`profile-otp-phone-display`),O=document.getElementById(`profile-change-phone-btn`),k=document.getElementById(`profile-otp-submit-btn`),A=document.getElementById(`profile-otp-error`),j=document.getElementById(`profile-details-form`),M=Array.from(document.querySelectorAll(`.profile-gender-btn`)),N=document.getElementById(`profile-gender-input`),P=document.getElementById(`profile-fullname-input`),F=document.getElementById(`profile-fullname-label`),I=document.getElementById(`profile-company-field`),L=document.getElementById(`profile-company-input`),R=document.getElementById(`profile-company-label`),z=document.getElementById(`profile-details-submit-btn`),B=document.getElementById(`profile-details-error`),V=document.getElementById(`profile-add-address-btn`),H=document.getElementById(`profile-new-address-form`),U=document.getElementById(`profile-cancel-address-btn`),W=document.getElementById(`profile-address-title-input`),xe=document.getElementById(`profile-address-city-input`),Se=document.getElementById(`profile-address-text-input`),Ce=document.getElementById(`profile-address-floor-input`),we=document.getElementById(`profile-address-unit-input`),Te=document.getElementById(`profile-address-elevator-input`),G=document.getElementById(`profile-address-form-error`),K=document.getElementById(`profile-addresses-grid`),Ee=Array.from(document.querySelectorAll(`.profile-chip`));if(!t||!a||!c||!l||!d||!p||!_||!y||!b||!S||!C||!w||!T||!E||!D||!O||!k||!A||!j||!N||!P||!z||!B)return;let q=``,J=null;async function Y(){if(!K)return;let t=await le();if(!t.length){K.innerHTML=`
        <div class="profile-addresses-empty">
          <span class="icon">${e.pin}</span>
          <p>${o(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
        </div>
      `;return}K.innerHTML=t.map(t=>{let n=[];return t.city&&n.push(`<span class="profile-address-tag">${t.city}</span>`),t.floor&&n.push(`<span class="profile-address-tag">${o(`طبقه`,`Floor`)} ${r(t.floor)}</span>`),t.unit&&n.push(`<span class="profile-address-tag">${o(`واحد`,`Unit`)} ${r(t.unit)}</span>`),t.hasElevator&&n.push(`<span class="profile-address-tag">${o(`دارای آسانسور`,`With elevator`)}</span>`),`
          <div class="profile-address-card" data-address-id="${t.id}">
            <div class="profile-address-card-header">
              <span class="profile-address-badge"><span class="icon">${e.pin}</span>${t.title}</span>
              <button type="button" class="profile-address-del-btn" data-delete-id="${t.id}" title="${o(`حذف آدرس`,`Delete address`)}">
                <span class="icon">${e.trash}</span>
              </button>
            </div>
            <p class="profile-address-text">${t.address}</p>
            ${n.length?`<div class="profile-address-tags">${n.join(``)}</div>`:``}
          </div>
        `}).join(``),Array.from(K.querySelectorAll(`.profile-address-del-btn`)).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.deleteId);t&&(e.disabled=!0,ue(t).then(()=>Y()).catch(t=>{alert(t instanceof Error?t.message:o(`حذف ناموفق بود.`,`Failed to delete`)),e.disabled=!1}))})})}function De(t,n){let i=be(n),a=e.user,s=``,u=`profile-badge-male`;t.gender===`female`?(a=e.female,s=o(`خانم`,`Female`),u=`profile-badge-female`):t.gender===`male`?(a=e.male,s=o(`آقا`,`Male`),u=`profile-badge-male`):t.gender===`company`?(a=e.building,s=o(`شرکتی`,`Company`),u=`profile-badge-company`):t.gender===`organization`&&(a=e.organization,s=o(`اداری و سازمانی`,`Organization`),u=`profile-badge-org`);let f=t.companyName?`
        <div class="orders-profile-row">
          <span class="icon">${t.gender===`organization`?e.organization:e.building}</span>
          <strong>${t.companyName}</strong>
          ${t.gender?`<span class="profile-gender-badge ${u}">${s}</span>`:``}
        </div>
      `:``,m=!t.companyName&&s?`<span class="profile-gender-badge ${u}">${s}</span>`:``;c.innerHTML=`
      ${f}
      <div class="orders-profile-row">
        <span class="icon">${a}</span>
        <strong>${t.fullName}</strong>
        ${m}
      </div>
      <div class="orders-profile-row">
        <span class="icon">${e.phone}</span>
        <span dir="ltr">${r(t.phone)}</span>
      </div>
      <div class="orders-profile-row">
        <span class="icon">${e.calendar}</span>
        <span>${o(`عضویت از`,`Member since`)} ${i}</span>
      </div>
    `,Y();let{origins:h,destinations:g}=he(n);h.length?(d.hidden=!1,p.innerHTML=h.map(t=>`<li class="saved-address-item"><span class="icon">${e.pin}</span><span>${me(t)}</span></li>`).join(``)):d.hidden=!0,g.length?(_.hidden=!1,y.innerHTML=g.map(t=>`<li class="saved-address-item"><span class="icon">${e.flag}</span><span>${me(t)}</span></li>`).join(``)):_.hidden=!0,l.hidden=!h.length&&!g.length}function X(e){t.hidden=!0,a.hidden=!1,ce(e.phone).then(t=>De(e,t)).catch(()=>De(e,[]))}function Z(){t.hidden=!1,a.hidden=!0,S.hidden=!1,E.hidden=!0,j.hidden=!0,T.hidden=!0,C.focus()}function Oe(e){q=e,t.hidden=!1,a.hidden=!0,S.hidden=!0,E.hidden=!1,j.hidden=!0,A.hidden=!0,D.textContent=r(e),J?.stopWebOtp(),J=ge(`profile-otp`,{length:5,onComplete:e=>{$(e)},onResend:()=>{Ae()}}),J?.focusFirst()}function ke(e){t.hidden=!1,a.hidden=!0,S.hidden=!0,E.hidden=!0,j.hidden=!1,B.hidden=!0,e.fullName&&(P.value=e.fullName),e.companyName&&L&&(L.value=e.companyName),e.gender?Q(e.gender):Q(``),e.gender===`company`||e.gender===`organization`?L?.focus():P.focus()}function Q(e){N.value=e,M.forEach(t=>{let n=t.dataset.gender===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-checked`,String(n))});let t=e===`company`||e===`organization`;I&&(I.hidden=!t,t?(R&&(R.textContent=e===`company`?o(`نام شرکت یا مجموعه تجاری`,`Company name`):o(`نام اداره یا سازمان`,`Organization name`)),L&&(L.placeholder=e===`company`?o(`نام شرکت، فروشگاه یا برند تجاری`,`Enter company name`):o(`نام اداره، سازمان یا نهاد دولتی/عمومی`,`Enter organization name`),L.required=!0)):L&&(L.required=!1,L.value=``)),F&&P&&(t?(F.textContent=o(`نام و نام خانوادگی رابط / نماینده`,`Representative full name`),P.placeholder=o(`نام و نام خانوادگی شخص رابط یا مسئول هماهنگی`,`Representative name`)):(F.textContent=o(`نام و نام خانوادگی`,`Full name`),P.placeholder=o(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)))}M.forEach(e=>{e.addEventListener(`click`,()=>{Q(e.dataset.gender??``),B.hidden=!0})}),V&&H&&V.addEventListener(`click`,()=>{H.hidden=!H.hidden,!H.hidden&&W&&W.focus()}),U&&H&&U.addEventListener(`click`,()=>{H.hidden=!0,H.reset(),G&&(G.hidden=!0)}),Ee.forEach(e=>{e.addEventListener(`click`,()=>{W&&(W.value=e.dataset.chip??e.textContent??``,W.focus())})}),H&&H.addEventListener(`submit`,e=>{e.preventDefault(),G&&(G.hidden=!0);let t=W?.value.trim()??``,n=xe?.value.trim()??`تهران`,r=Se?.value.trim()??``,i=Ce?.value.trim()||void 0,a=we?.value.trim()||void 0,s=Te?.checked??!1;if(!t){G&&(G.hidden=!1,G.textContent=o(`لطفاً عنوان آدرس را وارد کنید.`,`Please enter address title.`));return}if(!r||r.length<5){G&&(G.hidden=!1,G.textContent=o(`لطفاً نشانی کامل را وارد کنید.`,`Please enter full address.`));return}let c=document.getElementById(`profile-save-address-btn`);c&&(c.disabled=!0,c.textContent=o(`در حال ذخیره...`,`Saving...`)),pe({title:t,city:n,address:r,floor:i,unit:a,hasElevator:s}).then(()=>{H.reset(),H.hidden=!0,Y()}).catch(e=>{G&&(G.hidden=!1,G.textContent=e instanceof Error?e.message:o(`خطایی در ثبت آدرس پیش آمد.`,`Failed to add address.`))}).finally(()=>{c&&(c.disabled=!1,c.textContent=o(`ذخیره آدرس`,`Save Address`))})}),O.addEventListener(`click`,()=>{J?.stopWebOtp(),Z()}),S.addEventListener(`submit`,e=>{e.preventDefault();let t=C.value,n=ve(t);if(T.hidden=!0,!_e.test(n)){T.hidden=!1,T.textContent=o(`شماره موبایل معتبر ۱۱ رقمی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).`,`Enter a valid 11-digit mobile number.`);return}w.disabled=!0,w.textContent=o(`در حال ارسال کد...`,`Sending code...`),v(n).then(()=>{Oe(n)}).catch(e=>{T.hidden=!1,T.textContent=e instanceof Error?e.message:o(`خطایی در ارسال کد پیش آمد.`,`Failed to send code.`)}).finally(()=>{w.disabled=!1,w.textContent=o(`دریافت کد تأیید`,`Send verification code`)})});function Ae(){return A.hidden=!0,v(q).catch(e=>{A.hidden=!1,A.textContent=e instanceof Error?e.message:o(`ارسال مجدد کد با خطا مواجه شد.`,`Failed to resend code.`)})}async function $(e){A.hidden=!0,k.disabled=!0,k.textContent=o(`در حال بررسی...`,`Verifying...`);try{let t=await se(q,e);J?.stopWebOtp(),t.needsProfile?ke(t.customer):X(t.customer)}catch(e){A.hidden=!1,A.textContent=e instanceof Error?e.message:o(`کد واردشده معتبر نیست.`,`Invalid code.`),J?.reset()}finally{k.disabled=!1,k.textContent=o(`تأیید و ادامه`,`Verify and continue`)}}E.addEventListener(`submit`,e=>{e.preventDefault();let t=J?.getCode()??``;if(t.length!==5){A.hidden=!1,A.textContent=o(`لطفاً کد ۵ رقمی را کامل وارد کنید.`,`Please enter the full 5-digit code.`);return}$(t)}),j.addEventListener(`submit`,e=>{e.preventDefault(),B.hidden=!0;let t=N.value,n=P.value.trim(),r=L?.value.trim()||void 0;if(!t||![`female`,`male`,`company`,`organization`].includes(t)){B.hidden=!1,B.textContent=o(`لطفاً نوع حساب کاربری را انتخاب کنید.`,`Please select account type.`);return}if((t===`company`||t===`organization`)&&!r){B.hidden=!1,B.textContent=t===`company`?o(`لطفاً نام شرکت را وارد کنید.`,`Please enter company name.`):o(`لطفاً نام اداره یا سازمان را وارد کنید.`,`Please enter organization name.`);return}if(!n||n.length<2){B.hidden=!1,B.textContent=o(`لطفاً نام و نام خانوادگی را وارد کنید.`,`Please enter full name.`);return}z.disabled=!0,z.textContent=o(`در حال ثبت...`,`Saving...`),fe(n,t,r).then(e=>{X(e)}).catch(e=>{B.hidden=!1,B.textContent=e instanceof Error?e.message:o(`خطایی در ثبت اطلاعات رخ داد.`,`Failed to save profile.`)}).finally(()=>{z.disabled=!1,z.textContent=o(`تکمیل و ورود به حساب`,`Complete & Enter`)})}),b.addEventListener(`click`,()=>{oe().finally(()=>{Z(),S.reset(),E.reset(),j.reset(),Q(``)})}),de().then(e=>{e?!e.fullName||!e.gender?ke(e):X(e):Z()}).catch(()=>Z())}p(()=>void S());