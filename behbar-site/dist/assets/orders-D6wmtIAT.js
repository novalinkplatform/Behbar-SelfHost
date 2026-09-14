import{C as e,c as t,n,p as r,t as i,x as a}from"./appReady-giJ54-6J.js";import{C as o,S as s,T as c,_ as l,b as u,c as d,g as f,h as p,i as m,l as h,n as g,r as _,t as v,v as y,w as b,x,y as S}from"./languageMode-CjuVnjFU.js";import{d as C,f as w,l as T,m as E,r as D,u as O}from"./customerAuth-CfTRIeAR.js";import{a as k,c as A,i as j,l as M,o as N,s as P,t as F,u as I}from"./InvoiceModal-DKbBfK05.js";function L(){return`
    <article class="orders-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${a(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${a(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${a(`درخواست‌های من`,`My requests`)}</span>
        </nav>

        <div class="orders-island">
          <div id="orders-loading" class="orders-loading">
            <span class="orders-spinner" aria-hidden="true"></span>
          </div>

          <div id="orders-login-prompt" class="orders-login-prompt" hidden>
            <span class="icon orders-login-prompt-icon">${e.user}</span>
            <h1>${a(`درخواست‌های من`,`My requests`)}</h1>
            <p>${a(`هنوز وارد نشده‌اید.`,`You haven't logged in yet.`)}</p>
            <a class="btn btn-primary btn-sm" href="/profile.html">${a(`برای ورود یا ثبت‌نام وارد شوید`,`Log in or sign up`)}</a>
          </div>

          <div class="orders-content" id="orders-page-content" hidden>
            <div class="orders-page-heading">
              <h1 class="article-title">${a(`درخواست‌های من`,`My requests`)}</h1>
              <a class="btn btn-primary btn-sm" href="/#request" id="orders-new-request-btn">
                <span class="icon">${e.plusCircle}</span>
                <span>${a(`ثبت درخواست جدید`,`Submit new request`)}</span>
              </a>
            </div>

            <div class="orders-tabs" role="tablist">
              <button type="button" class="orders-tab is-active" data-orders-tab="active" role="tab" aria-selected="true">
                <span>${a(`درخواست‌های جاری`,`Active requests`)}</span>
                <span class="orders-tab-count" id="orders-active-count"></span>
              </button>
              <button type="button" class="orders-tab" data-orders-tab="history" role="tab" aria-selected="false">
                <span>${a(`تاریخچه`,`History`)}</span>
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
  `}function R(e){return`
    <div class="order-edit-form" id="edit-form-${e}" hidden>
      <div class="form-field">
        <span class="field-label">${a(`تاریخ جدید`,`New date`)}</span>
        ${I(`edit-calendar-${e}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${a(`ساعت جدید`,`New time`)}</span>
        ${A(`edit-time-${e}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${e}">${a(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${e}">${a(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${e}" hidden></p>
    </div>
  `}var z={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},B={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function V(e){return a(z[e]??e,B[e]??e)}var H=[`pending`,`contacted`,`scheduled`,`in_progress`],U=[`completed`,`cancelled`],W={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},G={};function K(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${a(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(G)}
    <main id="main-content">
      ${L()}
    </main>
    ${u(G)}
    ${y()}
    ${c(G)}
  `)}function q(n){let i=T.includes(n.status);return`
    <div class="order-card" data-order-id="${n.id}" style="--card-accent:${W[n.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${r(n.trackingCode)}</span>
        <span class="order-status order-status-${n.status}">${V(n.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${e.pin}</span>
        <span>${E(n.originProvince,n.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${e.flag}</span>
        <span>${E(n.destinationProvince,n.destinationCity)}</span>
      </div>
      <div class="order-meta">${n.serviceLabel} · <span id="order-schedule-${n.id}">${t(n.scheduledDate)} — ${a(`ساعت`,`at`)} ${r(n.scheduledTime)}</span></div>
      <div class="order-estimate">${k(n.estimateAvg)}</div>
      <div class="order-actions" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-order-invoice="${n.id}">
          <span class="icon" style="width: 14px; height: 14px;">${e.fileText}</span>
          <span>${a(`مشاهده و دریافت فاکتور`,`View & download invoice`)}</span>
        </button>
        ${i?`
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${n.id}">${a(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${n.id}">${a(`لغو درخواست`,`Cancel request`)}</button>
        `:``}
      </div>
      ${i?R(n.id):``}
    </div>
  `}async function J(){n(),G=await p(),v(G.language_mode),h(G.theme),d(G.seo),K(),i(),_(G.branding),m(G.site_name),g(G.language_mode),x(G),S(G),l(),o(),b(G);let e=document.getElementById(`orders-loading`),t=document.getElementById(`orders-login-prompt`),s=document.getElementById(`orders-page-content`),c=document.getElementById(`orders-active-results`),u=document.getElementById(`orders-history-results`),f=document.getElementById(`orders-active-panel`),y=document.getElementById(`orders-history-panel`),T=document.getElementById(`orders-active-count`),E=document.getElementById(`orders-history-count`),k=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!e||!t||!s||!c||!u||!f||!y||!T||!E)return;let A=``;k.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;f.hidden=t!==`active`,y.hidden=t!==`history`,k.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function I(){document.querySelectorAll(`[data-edit-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.editToggle,n=document.getElementById(`edit-form-${t}`);if(!n||!t)return;let i=n.hidden;if(n.hidden=!i,i&&!n.dataset.wired){n.dataset.wired=`true`;let e=M(`edit-calendar-${t}`,{maxDaysAhead:7}),i=P(`edit-time-${t}`),o=n.querySelector(`[data-save-schedule="${t}"]`),s=document.getElementById(`edit-error-${t}`);o?.addEventListener(`click`,()=>{let c=e.getSelected(),l=i.getSelected();if(!c||!l){s&&(s.hidden=!1,s.textContent=a(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}o.disabled=!0,o.textContent=a(`در حال ذخیره...`,`Saving...`),w(Number(t),A,c,N(l)).then(e=>{let i=document.getElementById(`order-schedule-${t}`);i&&(i.textContent=`${e.scheduledDate} — ${a(`ساعت`,`at`)} ${r(e.scheduledTime)}`),n.hidden=!0,s&&(s.hidden=!0)}).catch(e=>{s&&(s.hidden=!1,s.textContent=e instanceof Error?e.message:a(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{o.disabled=!1,o.textContent=a(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-order-invoice]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.orderInvoice),n=L.find(e=>e.id===t);if(!n)return;let r=j(n);F({trackingCode:n.trackingCode,customerName:n.customerName,phone:n.phone,serviceLabel:n.serviceLabel,originProvince:n.originProvince,originCity:n.originCity,destinationProvince:n.destinationProvince,destinationCity:n.destinationCity,scheduledDate:n.scheduledDate,scheduledTime:n.scheduledTime,createdAt:n.createdAt,statusLabel:V(n.status),invoice:r})})}),document.querySelectorAll(`[data-cancel-order]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelOrder;t&&window.confirm(a(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(e.disabled=!0,O(Number(t),A).then(()=>z(A)).catch(t=>{window.alert(t instanceof Error?t.message:a(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),e.disabled=!1}))})})}let L=[];function R(e){L=e;let t=e.filter(e=>H.includes(e.status)),n=e.filter(e=>U.includes(e.status));c.innerHTML=t.length?t.map(q).join(``):`<p class="orders-empty">${a(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,u.innerHTML=n.length?n.map(q).join(``):`<p class="orders-empty">${a(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,T.textContent=t.length?r(t.length):``,E.textContent=n.length?r(n.length):``,I()}function z(e){A=e,C(e).then(e=>R(e)).catch(()=>R([]))}D().then(n=>{if(e.hidden=!0,n){t.hidden=!0,s.hidden=!1,z(n.phone);return}t.hidden=!1}).catch(()=>{e.hidden=!0,t.hidden=!1})}f(()=>void J());