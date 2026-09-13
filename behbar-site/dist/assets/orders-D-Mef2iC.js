import{S as e,b as t,n,p as r,t as i}from"./appReady-JFOdjg2Y.js";import{C as a,D as o,E as s,S as c,T as l,_ as u,b as d,c as f,g as p,h as m,i as h,l as g,n as _,r as v,t as y,v as b,w as x,x as S,y as C}from"./languageMode-BQU1S8Yk.js";import{d as w,f as T,l as E,m as D,r as O,u as k}from"./customerAuth-IN36AEms.js";import{a as A,i as j,n as M,o as N,r as P,t as F}from"./format-NciyQP_v.js";function I(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(`درخواست‌های من`,`My requests`)}</span>
        </nav>

        <div class="orders-island">
          <div id="orders-loading" class="orders-loading">
            <span class="orders-spinner" aria-hidden="true"></span>
          </div>

          <div id="orders-login-prompt" class="orders-login-prompt" hidden>
            <span class="icon orders-login-prompt-icon">${e.user}</span>
            <h1>${t(`درخواست‌های من`,`My requests`)}</h1>
            <p>${t(`هنوز وارد نشده‌اید.`,`You haven't logged in yet.`)}</p>
            <a class="btn btn-primary btn-sm" href="/profile.html">${t(`برای ورود یا ثبت‌نام وارد شوید`,`Log in or sign up`)}</a>
          </div>

          <div class="orders-content" id="orders-page-content" hidden>
            <div class="orders-page-heading">
              <h1 class="article-title">${t(`درخواست‌های من`,`My requests`)}</h1>
              <a class="btn btn-primary btn-sm" href="/#request" id="orders-new-request-btn">
                <span class="icon">${e.plusCircle}</span>
                <span>${t(`ثبت درخواست جدید`,`Submit new request`)}</span>
              </a>
            </div>

            <div class="orders-tabs" role="tablist">
              <button type="button" class="orders-tab is-active" data-orders-tab="active" role="tab" aria-selected="true">
                <span>${t(`درخواست‌های جاری`,`Active requests`)}</span>
                <span class="orders-tab-count" id="orders-active-count"></span>
              </button>
              <button type="button" class="orders-tab" data-orders-tab="history" role="tab" aria-selected="false">
                <span>${t(`تاریخچه`,`History`)}</span>
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
  `}function L(e){return`
    <div class="order-edit-form" id="edit-form-${e}" hidden>
      <div class="form-field">
        <span class="field-label">${t(`تاریخ جدید`,`New date`)}</span>
        ${N(`edit-calendar-${e}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${t(`ساعت جدید`,`New time`)}</span>
        ${j(`edit-time-${e}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${e}">${t(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${e}">${t(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${e}" hidden></p>
    </div>
  `}var R={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},z={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function B(e){return t(R[e]??e,z[e]??e)}var V=[`pending`,`contacted`,`scheduled`,`in_progress`],H=[`completed`,`cancelled`],U={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},W={};function G(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(W)}
    <main id="main-content">
      ${I()}
    </main>
    ${x(W)}
    ${c()}
    <div class="header-quick-actions">
      ${d(W)}
      ${C(W)}
      ${b()}
    </div>
  `)}function K(n){let i=E.includes(n.status);return`
    <div class="order-card" data-order-id="${n.id}" style="--card-accent:${U[n.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${r(n.trackingCode)}</span>
        <span class="order-status order-status-${n.status}">${B(n.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${e.pin}</span>
        <span>${D(n.originProvince,n.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${e.flag}</span>
        <span>${D(n.destinationProvince,n.destinationCity)}</span>
      </div>
      <div class="order-meta">${n.serviceLabel} · <span id="order-schedule-${n.id}">${n.scheduledDate} — ${t(`ساعت`,`at`)} ${r(n.scheduledTime)}</span></div>
      <div class="order-estimate">${F(n.estimateAvg)}</div>
      ${i?`
        <div class="order-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${n.id}">${t(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${n.id}">${t(`لغو درخواست`,`Cancel request`)}</button>
        </div>
        ${L(n.id)}
      `:``}
    </div>
  `}async function q(){n(),W=await m(),y(W.language_mode),g(W.theme),f(W.seo),G(),i(),v(W.branding),h(W.site_name),_(W.language_mode),l(W),a(W),S(),o(),u();let e=document.getElementById(`orders-loading`),s=document.getElementById(`orders-login-prompt`),c=document.getElementById(`orders-page-content`),d=document.getElementById(`orders-active-results`),p=document.getElementById(`orders-history-results`),b=document.getElementById(`orders-active-panel`),x=document.getElementById(`orders-history-panel`),C=document.getElementById(`orders-active-count`),E=document.getElementById(`orders-history-count`),D=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!e||!s||!c||!d||!p||!b||!x||!C||!E)return;let j=``;D.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;b.hidden=t!==`active`,x.hidden=t!==`history`,D.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function N(){document.querySelectorAll(`[data-edit-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.editToggle,i=document.getElementById(`edit-form-${n}`);if(!i||!n)return;let a=i.hidden;if(i.hidden=!a,a&&!i.dataset.wired){i.dataset.wired=`true`;let e=A(`edit-calendar-${n}`,{maxDaysAhead:7}),a=P(`edit-time-${n}`),o=i.querySelector(`[data-save-schedule="${n}"]`),s=document.getElementById(`edit-error-${n}`);o?.addEventListener(`click`,()=>{let c=e.getSelected(),l=a.getSelected();if(!c||!l){s&&(s.hidden=!1,s.textContent=t(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}o.disabled=!0,o.textContent=t(`در حال ذخیره...`,`Saving...`),T(Number(n),j,c,M(l)).then(e=>{let a=document.getElementById(`order-schedule-${n}`);a&&(a.textContent=`${e.scheduledDate} — ${t(`ساعت`,`at`)} ${r(e.scheduledTime)}`),i.hidden=!0,s&&(s.hidden=!0)}).catch(e=>{s&&(s.hidden=!1,s.textContent=e instanceof Error?e.message:t(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{o.disabled=!1,o.textContent=t(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-cancel-order]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.cancelOrder;n&&window.confirm(t(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(e.disabled=!0,k(Number(n),j).then(()=>I(j)).catch(n=>{window.alert(n instanceof Error?n.message:t(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),e.disabled=!1}))})})}function F(e){let n=e.filter(e=>V.includes(e.status)),i=e.filter(e=>H.includes(e.status));d.innerHTML=n.length?n.map(K).join(``):`<p class="orders-empty">${t(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,p.innerHTML=i.length?i.map(K).join(``):`<p class="orders-empty">${t(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,C.textContent=n.length?r(n.length):``,E.textContent=i.length?r(i.length):``,N()}function I(e){j=e,w(e).then(e=>F(e)).catch(()=>F([]))}O().then(t=>{if(e.hidden=!0,t){s.hidden=!0,c.hidden=!1,I(t.phone);return}s.hidden=!1}).catch(()=>{e.hidden=!0,s.hidden=!1})}p(()=>void q());