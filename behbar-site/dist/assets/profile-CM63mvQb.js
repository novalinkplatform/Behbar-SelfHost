import{A as e,C as t,F as n,H as r,I as i,L as a,N as o,R as s,S as c,V as l,_ as u,a as d,b as f,g as p,i as m,k as h,l as g,n as ee,r as te,t as ne,u as re,v as _,w as v,x as y,y as ie,z as ae}from"./appReady-jYOMNzjt.js";import{a as oe,c as se,d as ce,i as le,n as ue,o as b,r as de,s as fe,t as pe}from"./customerAuth-B9s0OIdi.js";import{n as me,t as he}from"./addresses-D3RG1mIt.js";function x(e,t=6){return`
    <div class="otp-input-group" id="${e}-group">${Array.from({length:t},(e,t)=>`<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" class="otp-digit" data-otp-index="${t}" />`).join(``)}</div>
    <div class="otp-resend-row">
      <span class="otp-timer" id="${e}-timer"></span>
      <button type="button" class="otp-resend-btn" id="${e}-resend-btn" hidden>${l(`ارسال دوباره‌ی کد`,`Resend code`)}</button>
    </div>
  `}function ge(e,t){let n=t.length??6,r=t.resendSeconds??60,i=document.getElementById(`${e}-group`),a=document.getElementById(`${e}-timer`),o=document.getElementById(`${e}-resend-btn`);if(!i||!a||!o)return null;let s=Array.from(i.querySelectorAll(`.otp-digit`)),c=null,u=null;function d(){return s.map(e=>e.value).join(``)}function f(){let e=d();e.length===n&&/^\d+$/.test(e)&&(g(),t.onComplete(e))}s.forEach((e,t)=>{e.addEventListener(`input`,()=>{e.value=e.value.replace(/\D/g,``).slice(-1),e.value&&t<s.length-1&&s[t+1].focus(),f()}),e.addEventListener(`keydown`,n=>{n.key===`Backspace`&&!e.value&&t>0&&s[t-1].focus()}),e.addEventListener(`paste`,e=>{let t=e.clipboardData?.getData(`text`).replace(/\D/g,``)??``;if(!t)return;e.preventDefault(),t.slice(0,n).split(``).forEach((e,t)=>{s[t]&&(s[t].value=e)});let r=Math.min(t.length,n)-1;r>=0&&s[r].focus(),f()})});function p(){let e=r;o.hidden=!0,a.hidden=!1,c&&window.clearInterval(c);let t=()=>{let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);a.textContent=`${l(`ارسال دوباره تا`,`Resend in`)} ${t}:${n}`,e<=0&&(c&&window.clearInterval(c),a.hidden=!0,o.hidden=!1),--e};t(),c=window.setInterval(t,1e3)}o.addEventListener(`click`,()=>{t.onResend(),m(),p()});function m(){s.forEach(e=>e.value=``),s[0]?.focus()}function h(){s[0]?.focus()}function g(){u?.abort(),u=null}return`OTPCredential`in window&&(u=new AbortController,navigator.credentials.get({otp:{transport:[`sms`]},signal:u.signal}).then(e=>{let t=e?.code?.replace(/\D/g,``);t&&t.length===n&&(t.split(``).forEach((e,t)=>{s[t]&&(s[t].value=e)}),f())}).catch(()=>{})),p(),h(),{reset:m,focusFirst:h,stopWebOtp:g,getCode:d}}function S(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${l(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${l(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${l(`حساب کاربری`,`Account`)}</span>
        </nav>

        <h1 class="article-title">${l(`حساب کاربری`,`Account`)}</h1>

        <div id="profile-auth-section">
          <!-- گام ۱: شماره موبایل (ورود و ثبت‌نام یکپارچه) -->
          <form class="profile-auth-form" id="profile-phone-form">
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${r.user}</span></div>
              <h2 class="profile-auth-title">${l(`ورود یا ثبت‌نام در بهبار`,`Log in or Sign up`)}</h2>
              <p class="profile-auth-subtitle">${l(`شماره موبایل خود را وارد کنید تا کد تأیید پیامک شود.`,`Enter your mobile number to receive a verification code.`)}</p>
            </div>

            <div class="form-field">
              <label for="profile-phone-input">${l(`شماره موبایل`,`Mobile number`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${r.phone}</span>
                <input type="tel" id="profile-phone-input" dir="ltr" placeholder="${l(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-phone-submit-btn">
              <span>${l(`دریافت کد تأیید`,`Send verification code`)}</span>
            </button>

            <p class="request-panel-error" id="profile-phone-error" hidden></p>
          </form>

          <!-- گام ۲: کد تأیید پیامک -->
          <form class="profile-auth-form" id="profile-otp-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${r.shield}</span></div>
              <h2 class="profile-auth-title">${l(`کد تأیید پیامکی`,`Verification Code`)}</h2>
              <div class="profile-otp-phone-row">
                <span>${l(`کد تأیید به شماره`,`Code sent to`)}</span>
                <strong id="profile-otp-phone-display" dir="ltr"></strong>
                <button type="button" class="profile-edit-phone-btn" id="profile-change-phone-btn">${l(`ویرایش شماره`,`Edit`)}</button>
              </div>
            </div>

            <div class="form-field otp-center-field">
              ${x(`profile-otp`,5)}
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-otp-submit-btn">
              <span>${l(`تأیید و ادامه`,`Verify and continue`)}</span>
            </button>

            <p class="request-panel-error" id="profile-otp-error" hidden></p>
          </form>

          <!-- گام ۳: انتخاب هویت و مشخصات حساب (آقا، خانم، شرکتی، اداری و سازمانی) -->
          <form class="profile-auth-form" id="profile-details-form" hidden>
            <div class="profile-auth-header">
              <div class="profile-auth-badge"><span class="icon">${r.badge}</span></div>
              <h2 class="profile-auth-title">${l(`تکمیل اطلاعات حساب`,`Complete Profile`)}</h2>
              <p class="profile-auth-subtitle">${l(`لطفاً نوع حساب و مشخصات خود را برای ورود مشخص کنید.`,`Please select your account type and enter your details.`)}</p>
            </div>

            <!-- انتخاب هویت و ماهیت حساب -->
            <div class="form-field">
              <label class="form-field-label">${l(`نوع حساب / هویت`,`Account Type / Identity`)}</label>
              <div class="profile-gender-picker profile-identity-picker" role="radiogroup" aria-label="${l(`انتخاب نوع حساب`,`Account type selection`)}">
                <button type="button" class="profile-gender-btn" data-gender="female" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${r.female}</span>
                  <span class="profile-gender-text">${l(`خانم`,`Female`)}</span>
                  <span class="profile-gender-check">${r.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="male" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${r.male}</span>
                  <span class="profile-gender-text">${l(`آقا`,`Male`)}</span>
                  <span class="profile-gender-check">${r.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="company" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${r.building}</span>
                  <span class="profile-gender-text">${l(`شرکتی`,`Company`)}</span>
                  <span class="profile-gender-check">${r.checkCircle}</span>
                </button>
                <button type="button" class="profile-gender-btn" data-gender="organization" role="radio" aria-checked="false">
                  <span class="profile-gender-icon">${r.organization}</span>
                  <span class="profile-gender-text">${l(`اداری و سازمانی`,`Organization`)}</span>
                  <span class="profile-gender-check">${r.checkCircle}</span>
                </button>
              </div>
              <input type="hidden" id="profile-gender-input" value="" />
            </div>

            <!-- نام شرکت یا سازمان (ویژه اشخاص حقوقی) -->
            <div class="form-field" id="profile-company-field" hidden>
              <label for="profile-company-input" id="profile-company-label">${l(`نام شرکت / سازمان`,`Company / Organization name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon" id="profile-company-icon">${r.building}</span>
                <input type="text" id="profile-company-input" placeholder="${l(`نام کامل شرکت، اداره یا سازمان`,`Enter company/organization name`)}" />
              </div>
            </div>

            <!-- نام و نام خانوادگی / نام رابط -->
            <div class="form-field">
              <label for="profile-fullname-input" id="profile-fullname-label">${l(`نام و نام خانوادگی`,`Full name`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${r.user}</span>
                <input type="text" id="profile-fullname-input" autocomplete="name" placeholder="${l(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)}" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" id="profile-details-submit-btn">
              <span>${l(`تکمیل و ورود به حساب`,`Complete & Enter`)}</span>
            </button>

            <p class="request-panel-error" id="profile-details-error" hidden></p>
          </form>
        </div>

        <div class="orders-content" id="profile-page-content" hidden>
          <section class="orders-block">
            <h2>${l(`اطلاعات حساب`,`Account information`)}</h2>
            <div class="orders-profile-card" id="profile-info-card"></div>
          </section>

          <!-- دفترچه آدرس‌ها -->
          <section class="orders-block" id="profile-addressbook-block">
            <div class="profile-section-header">
              <div>
                <h2>${l(`دفترچه آدرس‌ها`,`Address Book`)}</h2>
                <p class="profile-section-sub">${l(`آدرس‌های منتخب برای استفاده در سفارش‌ها`,`Saved addresses for quick selection`)}</p>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="profile-add-address-btn">
                <span class="icon">${r.plus}</span>
                <span>${l(`افزودن آدرس جدید`,`Add New Address`)}</span>
              </button>
            </div>

            <!-- فرم درج آدرس جدید -->
            <form class="profile-new-address-form" id="profile-new-address-form" hidden>
              <h3 class="profile-form-inner-title">${l(`ثبت آدرس جدید`,`New Address`)}</h3>

              <div class="form-field">
                <label class="form-field-label">${l(`عنوان آدرس`,`Address Title`)}</label>
                <div class="profile-address-chips" id="profile-address-chips">
                  <button type="button" class="profile-chip" data-chip="${l(`منزل`,`Home`)}">${l(`منزل`,`Home`)}</button>
                  <button type="button" class="profile-chip" data-chip="${l(`محل کار`,`Work`)}">${l(`محل کار`,`Work`)}</button>
                  <button type="button" class="profile-chip" data-chip="${l(`دفتر مرکزی`,`Headquarters`)}">${l(`دفتر مرکزی`,`Headquarters`)}</button>
                  <button type="button" class="profile-chip" data-chip="${l(`انبار`,`Warehouse`)}">${l(`انبار`,`Warehouse`)}</button>
                  <button type="button" class="profile-chip" data-chip="${l(`شعبه`,`Branch`)}">${l(`شعبه`,`Branch`)}</button>
                </div>
                <div class="input-wrapper" style="margin-top: 8px;">
                  <span class="icon input-icon">${r.pin}</span>
                  <input type="text" id="profile-address-title-input" placeholder="${l(`عنوان دلخواه (مثلاً: منزل، شرکت یا انبار)`,`Title (e.g. Home, Office, Warehouse)`)}" required />
                </div>
              </div>

              <div class="profile-address-fields-row">
                <div class="form-field profile-city-col">
                  <label for="profile-address-city-input">${l(`شهر`,`City`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-city-input" value="تهران" required />
                  </div>
                </div>
                <div class="form-field profile-address-col">
                  <label for="profile-address-text-input">${l(`نشانی دقیق`,`Full Address`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-text-input" placeholder="${l(`خیابان، کوچه، پلاک...`,`Street, alley, building number...`)}" required />
                  </div>
                </div>
              </div>

              <div class="profile-address-meta-row">
                <div class="form-field">
                  <label for="profile-address-floor-input">${l(`طبقه`,`Floor`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-floor-input" placeholder="${l(`مثلاً ۲`,`e.g. 2`)}" />
                  </div>
                </div>
                <div class="form-field">
                  <label for="profile-address-unit-input">${l(`واحد`,`Unit`)}</label>
                  <div class="input-wrapper">
                    <input type="text" id="profile-address-unit-input" placeholder="${l(`مثلاً ۴`,`e.g. 4`)}" />
                  </div>
                </div>
                <div class="form-field profile-elevator-col">
                  <label class="form-field-label">${l(`آسانسور`,`Elevator`)}</label>
                  <label class="profile-checkbox-wrap">
                    <input type="checkbox" id="profile-address-elevator-input" />
                    <span>${l(`آسانسور دارد`,`Has elevator`)}</span>
                  </label>
                </div>
              </div>

              <div class="profile-address-actions">
                <button type="submit" class="btn btn-primary btn-sm" id="profile-save-address-btn">
                  <span>${l(`ذخیره آدرس`,`Save Address`)}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-sm" id="profile-cancel-address-btn">
                  <span>${l(`انصراف`,`Cancel`)}</span>
                </button>
              </div>
              <p class="request-panel-error" id="profile-address-form-error" hidden></p>
            </form>

            <div class="profile-addresses-grid" id="profile-addresses-grid">
              <div class="profile-addresses-empty" id="profile-addresses-empty">
                <span class="icon">${r.pin}</span>
                <p>${l(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
              </div>
            </div>
          </section>

          <section class="orders-block" id="profile-addresses-block" hidden>
            <h2>${l(`آدرس‌های سفارش‌های قبلی`,`Previous orders addresses`)}</h2>
            <div class="saved-address-groups">
              <div class="saved-address-group" id="profile-origin-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${r.pin}</span>${l(`مبدأها`,`Origins`)}</h3>
                <ul class="saved-address-list" id="profile-origin-address-list"></ul>
              </div>
              <div class="saved-address-group" id="profile-destination-addresses" hidden>
                <h3 class="saved-address-group-title"><span class="icon">${r.flag}</span>${l(`مقصدها`,`Destinations`)}</h3>
                <ul class="saved-address-list" id="profile-destination-address-list"></ul>
              </div>
            </div>
          </section>

          <button type="button" class="btn btn-secondary btn-block" id="profile-logout-btn">
            <span class="icon">${r.logout}</span>
            <span>${l(`خروج از حساب`,`Log out`)}</span>
          </button>
        </div>
      </div>
    </article>
  `}var C={},_e=/^09\d{9}$/;function ve(e){let t=e.replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).trim().replace(/[\s\-_]/g,``);return t.startsWith(`+98`)?t=`0`+t.slice(3):t.startsWith(`0098`)?t=`0`+t.slice(4):t.startsWith(`98`)&&(t=`0`+t.slice(2)),t}function ye(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${l(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(C)}
    <main id="main-content">
      ${S()}
    </main>
    ${i(C)}
    ${v()}
    <div class="header-quick-actions">
      ${c(C)}
      ${y(C)}
      ${f()}
    </div>
  `)}function be(t){if(!t.length)return l(`نامشخص`,`Unknown`);let n=t.reduce((e,t)=>new Date(t.createdAt)<new Date(e.createdAt)?t:e);return h(e(new Date(n.createdAt)))}async function w(){u(),C=await p(),ee(C.language_mode),re(C.theme),g(C.seo),ye(),ne(),m(C.branding),d(C.site_name),te(C.language_mode),a(C),n(C),t(),ae(),ie();let e=document.getElementById(`profile-auth-section`),i=document.getElementById(`profile-page-content`),s=document.getElementById(`profile-info-card`),c=document.getElementById(`profile-addresses-block`),f=document.getElementById(`profile-origin-addresses`),h=document.getElementById(`profile-origin-address-list`),_=document.getElementById(`profile-destination-addresses`),v=document.getElementById(`profile-destination-address-list`),y=document.getElementById(`profile-logout-btn`),x=document.getElementById(`profile-phone-form`),S=document.getElementById(`profile-phone-input`),w=document.getElementById(`profile-phone-submit-btn`),T=document.getElementById(`profile-phone-error`),E=document.getElementById(`profile-otp-form`),D=document.getElementById(`profile-otp-phone-display`),O=document.getElementById(`profile-change-phone-btn`),k=document.getElementById(`profile-otp-submit-btn`),A=document.getElementById(`profile-otp-error`),j=document.getElementById(`profile-details-form`),M=Array.from(document.querySelectorAll(`.profile-gender-btn`)),N=document.getElementById(`profile-gender-input`),P=document.getElementById(`profile-fullname-input`),F=document.getElementById(`profile-fullname-label`),I=document.getElementById(`profile-company-field`),L=document.getElementById(`profile-company-input`),R=document.getElementById(`profile-company-label`),z=document.getElementById(`profile-details-submit-btn`),B=document.getElementById(`profile-details-error`),V=document.getElementById(`profile-add-address-btn`),H=document.getElementById(`profile-new-address-form`),U=document.getElementById(`profile-cancel-address-btn`),W=document.getElementById(`profile-address-title-input`),xe=document.getElementById(`profile-address-city-input`),Se=document.getElementById(`profile-address-text-input`),Ce=document.getElementById(`profile-address-floor-input`),we=document.getElementById(`profile-address-unit-input`),Te=document.getElementById(`profile-address-elevator-input`),G=document.getElementById(`profile-address-form-error`),K=document.getElementById(`profile-addresses-grid`),Ee=Array.from(document.querySelectorAll(`.profile-chip`));if(!e||!i||!s||!c||!f||!h||!_||!v||!y||!x||!S||!w||!T||!E||!D||!O||!k||!A||!j||!N||!P||!z||!B)return;let q=``,J=null;async function Y(){if(!K)return;let e=await le();if(!e.length){K.innerHTML=`
        <div class="profile-addresses-empty">
          <span class="icon">${r.pin}</span>
          <p>${l(`هنوز هیچ آدرسی ثبت نکرده‌اید. با زدن دکمه «افزودن آدرس جدید» اولین آدرس خود را ذخیره کنید.`,`No saved addresses yet.`)}</p>
        </div>
      `;return}K.innerHTML=e.map(e=>{let t=[];return e.city&&t.push(`<span class="profile-address-tag">${e.city}</span>`),e.floor&&t.push(`<span class="profile-address-tag">${l(`طبقه`,`Floor`)} ${o(e.floor)}</span>`),e.unit&&t.push(`<span class="profile-address-tag">${l(`واحد`,`Unit`)} ${o(e.unit)}</span>`),e.hasElevator&&t.push(`<span class="profile-address-tag">${l(`دارای آسانسور`,`With elevator`)}</span>`),`
          <div class="profile-address-card" data-address-id="${e.id}">
            <div class="profile-address-card-header">
              <span class="profile-address-badge"><span class="icon">${r.pin}</span>${e.title}</span>
              <button type="button" class="profile-address-del-btn" data-delete-id="${e.id}" title="${l(`حذف آدرس`,`Delete address`)}">
                <span class="icon">${r.trash}</span>
              </button>
            </div>
            <p class="profile-address-text">${e.address}</p>
            ${t.length?`<div class="profile-address-tags">${t.join(``)}</div>`:``}
          </div>
        `}).join(``),Array.from(K.querySelectorAll(`.profile-address-del-btn`)).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.deleteId);t&&(e.disabled=!0,ue(t).then(()=>Y()).catch(t=>{alert(t instanceof Error?t.message:l(`حذف ناموفق بود.`,`Failed to delete`)),e.disabled=!1}))})})}function De(e,t){let n=be(t),i=r.user,a=``,u=`profile-badge-male`;e.gender===`female`?(i=r.female,a=l(`خانم`,`Female`),u=`profile-badge-female`):e.gender===`male`?(i=r.male,a=l(`آقا`,`Male`),u=`profile-badge-male`):e.gender===`company`?(i=r.building,a=l(`شرکتی`,`Company`),u=`profile-badge-company`):e.gender===`organization`&&(i=r.organization,a=l(`اداری و سازمانی`,`Organization`),u=`profile-badge-org`);let d=e.companyName?`
        <div class="orders-profile-row">
          <span class="icon">${e.gender===`organization`?r.organization:r.building}</span>
          <strong>${e.companyName}</strong>
          ${e.gender?`<span class="profile-gender-badge ${u}">${a}</span>`:``}
        </div>
      `:``,p=!e.companyName&&a?`<span class="profile-gender-badge ${u}">${a}</span>`:``;s.innerHTML=`
      ${d}
      <div class="orders-profile-row">
        <span class="icon">${i}</span>
        <strong>${e.fullName}</strong>
        ${p}
      </div>
      <div class="orders-profile-row">
        <span class="icon">${r.phone}</span>
        <span dir="ltr">${o(e.phone)}</span>
      </div>
      <div class="orders-profile-row">
        <span class="icon">${r.calendar}</span>
        <span>${l(`عضویت از`,`Member since`)} ${n}</span>
      </div>
    `,Y();let{origins:m,destinations:g}=he(t);m.length?(f.hidden=!1,h.innerHTML=m.map(e=>`<li class="saved-address-item"><span class="icon">${r.pin}</span><span>${me(e)}</span></li>`).join(``)):f.hidden=!0,g.length?(_.hidden=!1,v.innerHTML=g.map(e=>`<li class="saved-address-item"><span class="icon">${r.flag}</span><span>${me(e)}</span></li>`).join(``)):_.hidden=!0,c.hidden=!m.length&&!g.length}function X(t){e.hidden=!0,i.hidden=!1,ce(t.phone).then(e=>De(t,e)).catch(()=>De(t,[]))}function Z(){e.hidden=!1,i.hidden=!0,x.hidden=!1,E.hidden=!0,j.hidden=!0,T.hidden=!0,S.focus()}function Oe(t){q=t,e.hidden=!1,i.hidden=!0,x.hidden=!0,E.hidden=!1,j.hidden=!0,A.hidden=!0,D.textContent=o(t),J?.stopWebOtp(),J=ge(`profile-otp`,{length:5,onComplete:e=>{$(e)},onResend:()=>{Ae()}}),J?.focusFirst()}function ke(t){e.hidden=!1,i.hidden=!0,x.hidden=!0,E.hidden=!0,j.hidden=!1,B.hidden=!0,t.fullName&&(P.value=t.fullName),t.companyName&&L&&(L.value=t.companyName),t.gender?Q(t.gender):Q(``),t.gender===`company`||t.gender===`organization`?L?.focus():P.focus()}function Q(e){N.value=e,M.forEach(t=>{let n=t.dataset.gender===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-checked`,String(n))});let t=e===`company`||e===`organization`;I&&(I.hidden=!t,t?(R&&(R.textContent=e===`company`?l(`نام شرکت یا مجموعه تجاری`,`Company name`):l(`نام اداره یا سازمان`,`Organization name`)),L&&(L.placeholder=e===`company`?l(`نام شرکت، فروشگاه یا برند تجاری`,`Enter company name`):l(`نام اداره، سازمان یا نهاد دولتی/عمومی`,`Enter organization name`),L.required=!0)):L&&(L.required=!1,L.value=``)),F&&P&&(t?(F.textContent=l(`نام و نام خانوادگی رابط / نماینده`,`Representative full name`),P.placeholder=l(`نام و نام خانوادگی شخص رابط یا مسئول هماهنگی`,`Representative name`)):(F.textContent=l(`نام و نام خانوادگی`,`Full name`),P.placeholder=l(`نام و نام خانوادگی خود را وارد کنید`,`Enter your full name`)))}M.forEach(e=>{e.addEventListener(`click`,()=>{Q(e.dataset.gender??``),B.hidden=!0})}),V&&H&&V.addEventListener(`click`,()=>{H.hidden=!H.hidden,!H.hidden&&W&&W.focus()}),U&&H&&U.addEventListener(`click`,()=>{H.hidden=!0,H.reset(),G&&(G.hidden=!0)}),Ee.forEach(e=>{e.addEventListener(`click`,()=>{W&&(W.value=e.dataset.chip??e.textContent??``,W.focus())})}),H&&H.addEventListener(`submit`,e=>{e.preventDefault(),G&&(G.hidden=!0);let t=W?.value.trim()??``,n=xe?.value.trim()??`تهران`,r=Se?.value.trim()??``,i=Ce?.value.trim()||void 0,a=we?.value.trim()||void 0,o=Te?.checked??!1;if(!t){G&&(G.hidden=!1,G.textContent=l(`لطفاً عنوان آدرس را وارد کنید.`,`Please enter address title.`));return}if(!r||r.length<5){G&&(G.hidden=!1,G.textContent=l(`لطفاً نشانی کامل را وارد کنید.`,`Please enter full address.`));return}let s=document.getElementById(`profile-save-address-btn`);s&&(s.disabled=!0,s.textContent=l(`در حال ذخیره...`,`Saving...`)),pe({title:t,city:n,address:r,floor:i,unit:a,hasElevator:o}).then(()=>{H.reset(),H.hidden=!0,Y()}).catch(e=>{G&&(G.hidden=!1,G.textContent=e instanceof Error?e.message:l(`خطایی در ثبت آدرس پیش آمد.`,`Failed to add address.`))}).finally(()=>{s&&(s.disabled=!1,s.textContent=l(`ذخیره آدرس`,`Save Address`))})}),O.addEventListener(`click`,()=>{J?.stopWebOtp(),Z()}),x.addEventListener(`submit`,e=>{e.preventDefault();let t=S.value,n=ve(t);if(T.hidden=!0,!_e.test(n)){T.hidden=!1,T.textContent=l(`شماره موبایل معتبر ۱۱ رقمی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).`,`Enter a valid 11-digit mobile number.`);return}w.disabled=!0,w.textContent=l(`در حال ارسال کد...`,`Sending code...`),b(n).then(()=>{Oe(n)}).catch(e=>{T.hidden=!1,T.textContent=e instanceof Error?e.message:l(`خطایی در ارسال کد پیش آمد.`,`Failed to send code.`)}).finally(()=>{w.disabled=!1,w.textContent=l(`دریافت کد تأیید`,`Send verification code`)})});function Ae(){return A.hidden=!0,b(q).catch(e=>{A.hidden=!1,A.textContent=e instanceof Error?e.message:l(`ارسال مجدد کد با خطا مواجه شد.`,`Failed to resend code.`)})}async function $(e){A.hidden=!0,k.disabled=!0,k.textContent=l(`در حال بررسی...`,`Verifying...`);try{let t=await se(q,e);J?.stopWebOtp(),t.needsProfile?ke(t.customer):X(t.customer)}catch(e){A.hidden=!1,A.textContent=e instanceof Error?e.message:l(`کد واردشده معتبر نیست.`,`Invalid code.`),J?.reset()}finally{k.disabled=!1,k.textContent=l(`تأیید و ادامه`,`Verify and continue`)}}E.addEventListener(`submit`,e=>{e.preventDefault();let t=J?.getCode()??``;if(t.length!==5){A.hidden=!1,A.textContent=l(`لطفاً کد ۵ رقمی را کامل وارد کنید.`,`Please enter the full 5-digit code.`);return}$(t)}),j.addEventListener(`submit`,e=>{e.preventDefault(),B.hidden=!0;let t=N.value,n=P.value.trim(),r=L?.value.trim()||void 0;if(!t||![`female`,`male`,`company`,`organization`].includes(t)){B.hidden=!1,B.textContent=l(`لطفاً نوع حساب کاربری را انتخاب کنید.`,`Please select account type.`);return}if((t===`company`||t===`organization`)&&!r){B.hidden=!1,B.textContent=t===`company`?l(`لطفاً نام شرکت را وارد کنید.`,`Please enter company name.`):l(`لطفاً نام اداره یا سازمان را وارد کنید.`,`Please enter organization name.`);return}if(!n||n.length<2){B.hidden=!1,B.textContent=l(`لطفاً نام و نام خانوادگی را وارد کنید.`,`Please enter full name.`);return}z.disabled=!0,z.textContent=l(`در حال ثبت...`,`Saving...`),fe(n,t,r).then(e=>{X(e)}).catch(e=>{B.hidden=!1,B.textContent=e instanceof Error?e.message:l(`خطایی در ثبت اطلاعات رخ داد.`,`Failed to save profile.`)}).finally(()=>{z.disabled=!1,z.textContent=l(`تکمیل و ورود به حساب`,`Complete & Enter`)})}),y.addEventListener(`click`,()=>{oe().finally(()=>{Z(),x.reset(),E.reset(),j.reset(),Q(``)})}),de().then(e=>{e?!e.fullName||!e.gender?ke(e):X(e):Z()}).catch(()=>Z())}_(()=>void w());