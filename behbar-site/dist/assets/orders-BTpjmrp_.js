import{C as e,F as t,H as n,I as r,L as i,N as a,R as o,S as s,V as c,_ as l,a as u,b as d,g as f,i as p,l as m,n as h,r as g,t as _,u as v,v as y,w as b,x,y as S,z as C}from"./appReady-CnRz7xfg.js";import{d as w,f as T,l as E,m as D,r as O,u as k}from"./customerAuth-Bptkxt3g.js";import{a as A,i as j,n as M,o as N,r as P,t as F}from"./format-VCnDXlTY.js";function I(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${c(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${c(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${c(`درخواست‌های من`,`My requests`)}</span>
        </nav>

        <div class="orders-island">
          <div id="orders-loading" class="orders-loading">
            <span class="orders-spinner" aria-hidden="true"></span>
          </div>

          <div id="orders-login-prompt" class="orders-login-prompt" hidden>
            <span class="icon orders-login-prompt-icon">${n.user}</span>
            <h1>${c(`درخواست‌های من`,`My requests`)}</h1>
            <p>${c(`هنوز وارد نشده‌اید.`,`You haven't logged in yet.`)}</p>
            <a class="btn btn-primary btn-sm" href="/profile.html">${c(`برای ورود یا ثبت‌نام وارد شوید`,`Log in or sign up`)}</a>
          </div>

          <div class="orders-content" id="orders-page-content" hidden>
            <div class="orders-page-heading">
              <h1 class="article-title">${c(`درخواست‌های من`,`My requests`)}</h1>
              <a class="btn btn-primary btn-sm" href="/#request" id="orders-new-request-btn">
                <span class="icon">${n.plusCircle}</span>
                <span>${c(`ثبت درخواست جدید`,`Submit new request`)}</span>
              </a>
            </div>

            <div class="orders-tabs" role="tablist">
              <button type="button" class="orders-tab is-active" data-orders-tab="active" role="tab" aria-selected="true">
                <span>${c(`درخواست‌های جاری`,`Active requests`)}</span>
                <span class="orders-tab-count" id="orders-active-count"></span>
              </button>
              <button type="button" class="orders-tab" data-orders-tab="history" role="tab" aria-selected="false">
                <span>${c(`تاریخچه`,`History`)}</span>
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
        <span class="field-label">${c(`تاریخ جدید`,`New date`)}</span>
        ${N(`edit-calendar-${e}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${c(`ساعت جدید`,`New time`)}</span>
        ${j(`edit-time-${e}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${e}">${c(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${e}">${c(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${e}" hidden></p>
    </div>
  `}var R={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},z={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function B(e){return c(R[e]??e,z[e]??e)}var V=[`pending`,`contacted`,`scheduled`,`in_progress`],H=[`completed`,`cancelled`],U={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},W={};function G(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${c(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(W)}
    <main id="main-content">
      ${I()}
    </main>
    ${r(W)}
    ${b()}
    <div class="header-quick-actions">
      ${s(W)}
      ${x(W)}
      ${d()}
    </div>
  `)}function K(e){let t=E.includes(e.status);return`
    <div class="order-card" data-order-id="${e.id}" style="--card-accent:${U[e.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${a(e.trackingCode)}</span>
        <span class="order-status order-status-${e.status}">${B(e.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${n.pin}</span>
        <span>${D(e.originProvince,e.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${n.flag}</span>
        <span>${D(e.destinationProvince,e.destinationCity)}</span>
      </div>
      <div class="order-meta">${e.serviceLabel} · <span id="order-schedule-${e.id}">${e.scheduledDate} — ${c(`ساعت`,`at`)} ${a(e.scheduledTime)}</span></div>
      <div class="order-estimate">${F(e.estimateAvg)}</div>
      ${t?`
        <div class="order-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${e.id}">${c(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${e.id}">${c(`لغو درخواست`,`Cancel request`)}</button>
        </div>
        ${L(e.id)}
      `:``}
    </div>
  `}async function q(){l(),W=await f(),h(W.language_mode),v(W.theme),m(W.seo),G(),_(),p(W.branding),u(W.site_name),g(W.language_mode),i(W),t(W),e(),C(),S();let n=document.getElementById(`orders-loading`),r=document.getElementById(`orders-login-prompt`),o=document.getElementById(`orders-page-content`),s=document.getElementById(`orders-active-results`),d=document.getElementById(`orders-history-results`),y=document.getElementById(`orders-active-panel`),b=document.getElementById(`orders-history-panel`),x=document.getElementById(`orders-active-count`),E=document.getElementById(`orders-history-count`),D=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!n||!r||!o||!s||!d||!y||!b||!x||!E)return;let j=``;D.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;y.hidden=t!==`active`,b.hidden=t!==`history`,D.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function N(){document.querySelectorAll(`[data-edit-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.editToggle,n=document.getElementById(`edit-form-${t}`);if(!n||!t)return;let r=n.hidden;if(n.hidden=!r,r&&!n.dataset.wired){n.dataset.wired=`true`;let e=A(`edit-calendar-${t}`,{maxDaysAhead:7}),r=P(`edit-time-${t}`),i=n.querySelector(`[data-save-schedule="${t}"]`),o=document.getElementById(`edit-error-${t}`);i?.addEventListener(`click`,()=>{let s=e.getSelected(),l=r.getSelected();if(!s||!l){o&&(o.hidden=!1,o.textContent=c(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}i.disabled=!0,i.textContent=c(`در حال ذخیره...`,`Saving...`),T(Number(t),j,s,M(l)).then(e=>{let r=document.getElementById(`order-schedule-${t}`);r&&(r.textContent=`${e.scheduledDate} — ${c(`ساعت`,`at`)} ${a(e.scheduledTime)}`),n.hidden=!0,o&&(o.hidden=!0)}).catch(e=>{o&&(o.hidden=!1,o.textContent=e instanceof Error?e.message:c(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{i.disabled=!1,i.textContent=c(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-cancel-order]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelOrder;t&&window.confirm(c(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(e.disabled=!0,k(Number(t),j).then(()=>I(j)).catch(t=>{window.alert(t instanceof Error?t.message:c(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),e.disabled=!1}))})})}function F(e){let t=e.filter(e=>V.includes(e.status)),n=e.filter(e=>H.includes(e.status));s.innerHTML=t.length?t.map(K).join(``):`<p class="orders-empty">${c(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,d.innerHTML=n.length?n.map(K).join(``):`<p class="orders-empty">${c(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,x.textContent=t.length?a(t.length):``,E.textContent=n.length?a(n.length):``,N()}function I(e){j=e,w(e).then(e=>F(e)).catch(()=>F([]))}O().then(e=>{if(n.hidden=!0,e){r.hidden=!0,o.hidden=!1,I(e.phone);return}r.hidden=!1}).catch(()=>{n.hidden=!0,r.hidden=!1})}y(()=>void q());