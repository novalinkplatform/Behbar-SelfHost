import{B as e,C as t,D as n,E as r,L as i,O as a,S as o,T as s,V as c,_ as l,a as u,b as d,g as f,i as p,l as m,n as h,r as g,t as _,u as v,v as y,w as b,y as x}from"./appReady-BWGY9_tm.js";import{d as S,f as C,l as w,m as T,r as E,u as D}from"./customerAuth-NoQE0YwS.js";import{a as O,i as k,n as A,o as j,r as M,t as N}from"./format-DQRk0SL4.js";function P(){return`
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
            <span class="icon orders-login-prompt-icon">${c.user}</span>
            <h1>${e(`درخواست‌های من`,`My requests`)}</h1>
            <p>${e(`هنوز وارد نشده‌اید.`,`You haven't logged in yet.`)}</p>
            <a class="btn btn-primary btn-sm" href="/profile.html">${e(`برای ورود یا ثبت‌نام وارد شوید`,`Log in or sign up`)}</a>
          </div>

          <div class="orders-content" id="orders-page-content" hidden>
            <div class="orders-page-heading">
              <h1 class="article-title">${e(`درخواست‌های من`,`My requests`)}</h1>
              <a class="btn btn-primary btn-sm" href="/#request" id="orders-new-request-btn">
                <span class="icon">${c.plusCircle}</span>
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
  `}function F(t){return`
    <div class="order-edit-form" id="edit-form-${t}" hidden>
      <div class="form-field">
        <span class="field-label">${e(`تاریخ جدید`,`New date`)}</span>
        ${j(`edit-calendar-${t}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${e(`ساعت جدید`,`New time`)}</span>
        ${k(`edit-time-${t}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${t}">${e(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${t}">${e(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${t}" hidden></p>
    </div>
  `}var I={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},L={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function R(t){return e(I[t]??t,L[t]??t)}var z=[`pending`,`contacted`,`scheduled`,`in_progress`],B=[`completed`,`cancelled`],V={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},H={};function U(){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(H)}
    <main id="main-content">
      ${P()}
    </main>
    ${t(H)}
    ${x()}
    ${a(H)}
  `)}function W(t){let n=w.includes(t.status);return`
    <div class="order-card" data-order-id="${t.id}" style="--card-accent:${V[t.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${i(t.trackingCode)}</span>
        <span class="order-status order-status-${t.status}">${R(t.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${c.pin}</span>
        <span>${T(t.originProvince,t.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${c.flag}</span>
        <span>${T(t.destinationProvince,t.destinationCity)}</span>
      </div>
      <div class="order-meta">${t.serviceLabel} · <span id="order-schedule-${t.id}">${t.scheduledDate} — ${e(`ساعت`,`at`)} ${i(t.scheduledTime)}</span></div>
      <div class="order-estimate">${N(t.estimateAvg)}</div>
      ${n?`
        <div class="order-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${t.id}">${e(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${t.id}">${e(`لغو درخواست`,`Cancel request`)}</button>
        </div>
        ${F(t.id)}
      `:``}
    </div>
  `}async function G(){d(),H=await f(),h(H.language_mode),v(H.theme),m(H.seo),U(),_(),p(H.branding),u(H.site_name),g(H.language_mode),b(H),o(H),y(),r(),n(H);let t=document.getElementById(`orders-loading`),a=document.getElementById(`orders-login-prompt`),s=document.getElementById(`orders-page-content`),c=document.getElementById(`orders-active-results`),l=document.getElementById(`orders-history-results`),x=document.getElementById(`orders-active-panel`),w=document.getElementById(`orders-history-panel`),T=document.getElementById(`orders-active-count`),k=document.getElementById(`orders-history-count`),j=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!t||!a||!s||!c||!l||!x||!w||!T||!k)return;let N=``;j.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;x.hidden=t!==`active`,w.hidden=t!==`history`,j.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function P(){document.querySelectorAll(`[data-edit-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.editToggle,r=document.getElementById(`edit-form-${n}`);if(!r||!n)return;let a=r.hidden;if(r.hidden=!a,a&&!r.dataset.wired){r.dataset.wired=`true`;let t=O(`edit-calendar-${n}`,{maxDaysAhead:7}),a=M(`edit-time-${n}`),o=r.querySelector(`[data-save-schedule="${n}"]`),s=document.getElementById(`edit-error-${n}`);o?.addEventListener(`click`,()=>{let c=t.getSelected(),l=a.getSelected();if(!c||!l){s&&(s.hidden=!1,s.textContent=e(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}o.disabled=!0,o.textContent=e(`در حال ذخیره...`,`Saving...`),C(Number(n),N,c,A(l)).then(t=>{let a=document.getElementById(`order-schedule-${n}`);a&&(a.textContent=`${t.scheduledDate} — ${e(`ساعت`,`at`)} ${i(t.scheduledTime)}`),r.hidden=!0,s&&(s.hidden=!0)}).catch(t=>{s&&(s.hidden=!1,s.textContent=t instanceof Error?t.message:e(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{o.disabled=!1,o.textContent=e(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-cancel-order]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.cancelOrder;n&&window.confirm(e(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(t.disabled=!0,D(Number(n),N).then(()=>I(N)).catch(n=>{window.alert(n instanceof Error?n.message:e(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),t.disabled=!1}))})})}function F(t){let n=t.filter(e=>z.includes(e.status)),r=t.filter(e=>B.includes(e.status));c.innerHTML=n.length?n.map(W).join(``):`<p class="orders-empty">${e(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,l.innerHTML=r.length?r.map(W).join(``):`<p class="orders-empty">${e(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,T.textContent=n.length?i(n.length):``,k.textContent=r.length?i(r.length):``,P()}function I(e){N=e,S(e).then(e=>F(e)).catch(()=>F([]))}E().then(e=>{if(t.hidden=!0,e){a.hidden=!0,s.hidden=!1,I(e.phone);return}a.hidden=!1}).catch(()=>{t.hidden=!0,a.hidden=!1})}l(()=>void G());