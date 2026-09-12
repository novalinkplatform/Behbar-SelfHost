import{B as e,C as t,F as n,I as r,L as i,M as a,P as o,R as s,S as c,V as l,_ as u,a as d,b as f,c as p,g as m,h,i as g,l as _,n as v,r as y,t as b,v as x,x as S,y as C}from"./appReady-DNSS-HAw.js";import{d as w,f as T,l as E,m as D,r as O,u as k}from"./customerAuth-BPtzfzOh.js";import{a as A,i as j,n as M,o as N,r as P,t as F}from"./format-_0nhBJ4U.js";function I(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(`درخواست‌های من`,`My requests`)}</span>
        </nav>

        <div class="orders-island">
          <div id="orders-loading" class="orders-loading">
            <span class="orders-spinner" aria-hidden="true"></span>
          </div>

          <div id="orders-login-prompt" class="orders-login-prompt" hidden>
            <span class="icon orders-login-prompt-icon">${l.user}</span>
            <h1>${e(`درخواست‌های من`,`My requests`)}</h1>
            <p>${e(`هنوز وارد نشده‌اید.`,`You haven't logged in yet.`)}</p>
            <a class="btn btn-primary btn-sm" href="/profile.html">${e(`برای ورود یا ثبت‌نام وارد شوید`,`Log in or sign up`)}</a>
          </div>

          <div class="orders-content" id="orders-page-content" hidden>
            <div class="orders-page-heading">
              <h1 class="article-title">${e(`درخواست‌های من`,`My requests`)}</h1>
              <a class="btn btn-primary btn-sm" href="/#request" id="orders-new-request-btn">
                <span class="icon">${l.plusCircle}</span>
                <span>${e(`ثبت درخواست جدید`,`Submit new request`)}</span>
              </a>
            </div>

            <div class="orders-tabs" role="tablist">
              <button type="button" class="orders-tab is-active" data-orders-tab="active" role="tab" aria-selected="true">
                <span>${e(`درخواست‌های جاری`,`Active requests`)}</span>
                <span class="orders-tab-count" id="orders-active-count"></span>
              </button>
              <button type="button" class="orders-tab" data-orders-tab="history" role="tab" aria-selected="false">
                <span>${e(`تاریخچه`,`History`)}</span>
                <span class="orders-tab-count" id="orders-history-count"></span>
              </button>
            </div>

            <div class="orders-tab-panel" id="orders-active-panel">
              <div class="orders-results" id="orders-active-results"></div>
            </div>
            <div class="orders-tab-panel" id="orders-history-panel" hidden>
              <div class="orders-results" id="orders-history-results"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function L(t){return`
    <div class="order-edit-form" id="edit-form-${t}" hidden>
      <div class="form-field">
        <span class="field-label">${e(`تاریخ جدید`,`New date`)}</span>
        ${N(`edit-calendar-${t}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${e(`ساعت جدید`,`New time`)}</span>
        ${j(`edit-time-${t}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${t}">${e(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${t}">${e(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${t}" hidden></p>
    </div>
  `}var R={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},z={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function B(t){return e(R[t]??t,z[t]??t)}var V=[`pending`,`contacted`,`scheduled`,`in_progress`],H=[`completed`,`cancelled`],U={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},W={};function G(){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(W)}
    <main id="main-content">
      ${I()}
    </main>
    ${n(W)}
    ${t()}
    <div class="header-quick-actions">
      ${S(W)}
      ${f(W)}
      ${C()}
    </div>
  `)}function K(t){let n=E.includes(t.status);return`
    <div class="order-card" data-order-id="${t.id}" style="--card-accent:${U[t.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${a(t.trackingCode)}</span>
        <span class="order-status order-status-${t.status}">${B(t.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${l.pin}</span>
        <span>${D(t.originProvince,t.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${l.flag}</span>
        <span>${D(t.destinationProvince,t.destinationCity)}</span>
      </div>
      <div class="order-meta">${t.serviceLabel} · <span id="order-schedule-${t.id}">${t.scheduledDate} — ${e(`ساعت`,`at`)} ${a(t.scheduledTime)}</span></div>
      <div class="order-estimate">${F(t.estimateAvg)}</div>
      ${n?`
        <div class="order-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${t.id}">${e(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${t.id}">${e(`لغو درخواست`,`Cancel request`)}</button>
        </div>
        ${L(t.id)}
      `:``}
    </div>
  `}async function q(){m(),W=await h(),v(W.language_mode),_(W.theme),p(W.seo),G(),b(),g(W.branding),d(W.site_name),y(W.language_mode),r(W),o(W),c(),s(),x();let t=document.getElementById(`orders-loading`),n=document.getElementById(`orders-login-prompt`),i=document.getElementById(`orders-page-content`),l=document.getElementById(`orders-active-results`),u=document.getElementById(`orders-history-results`),f=document.getElementById(`orders-active-panel`),S=document.getElementById(`orders-history-panel`),C=document.getElementById(`orders-active-count`),E=document.getElementById(`orders-history-count`),D=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!t||!n||!i||!l||!u||!f||!S||!C||!E)return;let j=``;D.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;f.hidden=t!==`active`,S.hidden=t!==`history`,D.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function N(){document.querySelectorAll(`[data-edit-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.editToggle,r=document.getElementById(`edit-form-${n}`);if(!r||!n)return;let i=r.hidden;if(r.hidden=!i,i&&!r.dataset.wired){r.dataset.wired=`true`;let t=A(`edit-calendar-${n}`,{maxDaysAhead:7}),i=P(`edit-time-${n}`),o=r.querySelector(`[data-save-schedule="${n}"]`),s=document.getElementById(`edit-error-${n}`);o?.addEventListener(`click`,()=>{let c=t.getSelected(),l=i.getSelected();if(!c||!l){s&&(s.hidden=!1,s.textContent=e(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}o.disabled=!0,o.textContent=e(`در حال ذخیره...`,`Saving...`),T(Number(n),j,c,M(l)).then(t=>{let i=document.getElementById(`order-schedule-${n}`);i&&(i.textContent=`${t.scheduledDate} — ${e(`ساعت`,`at`)} ${a(t.scheduledTime)}`),r.hidden=!0,s&&(s.hidden=!0)}).catch(t=>{s&&(s.hidden=!1,s.textContent=t instanceof Error?t.message:e(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{o.disabled=!1,o.textContent=e(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-cancel-order]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.cancelOrder;n&&window.confirm(e(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(t.disabled=!0,k(Number(n),j).then(()=>I(j)).catch(n=>{window.alert(n instanceof Error?n.message:e(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),t.disabled=!1}))})})}function F(t){let n=t.filter(e=>V.includes(e.status)),r=t.filter(e=>H.includes(e.status));l.innerHTML=n.length?n.map(K).join(``):`<p class="orders-empty">${e(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,u.innerHTML=r.length?r.map(K).join(``):`<p class="orders-empty">${e(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,C.textContent=n.length?a(n.length):``,E.textContent=r.length?a(r.length):``,N()}function I(e){j=e,w(e).then(e=>F(e)).catch(()=>F([]))}O().then(e=>{if(t.hidden=!0,e){n.hidden=!0,i.hidden=!1,I(e.phone);return}n.hidden=!1}).catch(()=>{t.hidden=!0,n.hidden=!1})}u(()=>void q());