import{S as e,b as t,f as n,n as r,t as i}from"./appReady-D0myfZwC.js";import{C as a,S as o,T as s,_ as c,b as l,c as u,g as d,h as f,i as p,l as m,n as h,r as g,t as _,v,w as y,x as b,y as x}from"./languageMode-COrdPCfF.js";import{d as S,f as C,l as w,m as T,r as E,u as D}from"./customerAuth-C8Gn5xvu.js";import{a as O,i as k,n as A,o as j,r as M,t as N}from"./format-s9r9Yz2l.js";function P(){return`
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
  `}function F(e){return`
    <div class="order-edit-form" id="edit-form-${e}" hidden>
      <div class="form-field">
        <span class="field-label">${t(`تاریخ جدید`,`New date`)}</span>
        ${j(`edit-calendar-${e}`)}
      </div>
      <div class="form-field">
        <span class="field-label">${t(`ساعت جدید`,`New time`)}</span>
        ${k(`edit-time-${e}`)}
      </div>
      <div class="order-edit-actions">
        <button type="button" class="btn btn-primary btn-sm" data-save-schedule="${e}">${t(`ذخیره تغییرات`,`Save changes`)}</button>
        <button type="button" class="btn btn-secondary btn-sm" data-cancel-edit="${e}">${t(`انصراف`,`Cancel`)}</button>
      </div>
      <p class="request-panel-error" id="edit-error-${e}" hidden></p>
    </div>
  `}var I={pending:`در انتظار بررسی`,contacted:`تماس گرفته شده`,scheduled:`زمان‌بندی شده`,in_progress:`در حال انجام`,completed:`انجام شده`,cancelled:`لغو شده`},L={pending:`Pending review`,contacted:`Contacted`,scheduled:`Scheduled`,in_progress:`In progress`,completed:`Completed`,cancelled:`Cancelled`};function R(e){return t(I[e]??e,L[e]??e)}var z=[`pending`,`contacted`,`scheduled`,`in_progress`],B=[`completed`,`cancelled`],V={pending:`var(--primary)`,contacted:`var(--warning)`,scheduled:`var(--warning)`,in_progress:`var(--primary-dark)`,completed:`var(--success)`,cancelled:`var(--muted)`},H={};function U(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(H)}
    <main id="main-content">
      ${P()}
    </main>
    ${l(H)}
    ${v()}
    ${s(H)}
  `)}function W(r){let i=w.includes(r.status);return`
    <div class="order-card" data-order-id="${r.id}" style="--card-accent:${V[r.status]??`var(--muted)`}">
      <div class="order-card-header">
        <span class="order-tracking">#${n(r.trackingCode)}</span>
        <span class="order-status order-status-${r.status}">${R(r.status)}</span>
      </div>
      <div class="order-route">
        <span class="icon">${e.pin}</span>
        <span>${T(r.originProvince,r.originCity)}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${e.flag}</span>
        <span>${T(r.destinationProvince,r.destinationCity)}</span>
      </div>
      <div class="order-meta">${r.serviceLabel} · <span id="order-schedule-${r.id}">${r.scheduledDate} — ${t(`ساعت`,`at`)} ${n(r.scheduledTime)}</span></div>
      <div class="order-estimate">${N(r.estimateAvg)}</div>
      ${i?`
        <div class="order-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-toggle="${r.id}">${t(`ویرایش زمان`,`Edit time`)}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel-order="${r.id}">${t(`لغو درخواست`,`Cancel request`)}</button>
        </div>
        ${F(r.id)}
      `:``}
    </div>
  `}async function G(){r(),H=await f(),_(H.language_mode),m(H.theme),u(H.seo),U(),i(),g(H.branding),p(H.site_name),h(H.language_mode),b(H),x(H),c(),a(),y(H);let e=document.getElementById(`orders-loading`),o=document.getElementById(`orders-login-prompt`),s=document.getElementById(`orders-page-content`),l=document.getElementById(`orders-active-results`),d=document.getElementById(`orders-history-results`),v=document.getElementById(`orders-active-panel`),w=document.getElementById(`orders-history-panel`),T=document.getElementById(`orders-active-count`),k=document.getElementById(`orders-history-count`),j=Array.from(document.querySelectorAll(`[data-orders-tab]`));if(!e||!o||!s||!l||!d||!v||!w||!T||!k)return;let N=``;j.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.ordersTab===`history`?`history`:`active`;v.hidden=t!==`active`,w.hidden=t!==`history`,j.forEach(t=>{let n=t===e;t.classList.toggle(`is-active`,n),t.setAttribute(`aria-selected`,String(n))})})});function P(){document.querySelectorAll(`[data-edit-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.editToggle,i=document.getElementById(`edit-form-${r}`);if(!i||!r)return;let a=i.hidden;if(i.hidden=!a,a&&!i.dataset.wired){i.dataset.wired=`true`;let e=O(`edit-calendar-${r}`,{maxDaysAhead:7}),a=M(`edit-time-${r}`),o=i.querySelector(`[data-save-schedule="${r}"]`),s=document.getElementById(`edit-error-${r}`);o?.addEventListener(`click`,()=>{let c=e.getSelected(),l=a.getSelected();if(!c||!l){s&&(s.hidden=!1,s.textContent=t(`تاریخ و ساعت جدید را انتخاب کنید.`,`Select a new date and time.`));return}o.disabled=!0,o.textContent=t(`در حال ذخیره...`,`Saving...`),C(Number(r),N,c,A(l)).then(e=>{let a=document.getElementById(`order-schedule-${r}`);a&&(a.textContent=`${e.scheduledDate} — ${t(`ساعت`,`at`)} ${n(e.scheduledTime)}`),i.hidden=!0,s&&(s.hidden=!0)}).catch(e=>{s&&(s.hidden=!1,s.textContent=e instanceof Error?e.message:t(`ویرایش ناموفق بود.`,`Update failed.`))}).finally(()=>{o.disabled=!1,o.textContent=t(`ذخیره تغییرات`,`Save changes`)})})}})}),document.querySelectorAll(`[data-cancel-edit]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.cancelEdit,n=document.getElementById(`edit-form-${t}`);n&&(n.hidden=!0)})}),document.querySelectorAll(`[data-cancel-order]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.cancelOrder;n&&window.confirm(t(`از لغو این درخواست مطمئن هستید؟`,`Are you sure you want to cancel this request?`))&&(e.disabled=!0,D(Number(n),N).then(()=>I(N)).catch(n=>{window.alert(n instanceof Error?n.message:t(`لغو درخواست ناموفق بود.`,`Cancellation failed.`)),e.disabled=!1}))})})}function F(e){let r=e.filter(e=>z.includes(e.status)),i=e.filter(e=>B.includes(e.status));l.innerHTML=r.length?r.map(W).join(``):`<p class="orders-empty">${t(`درخواست جاری وجود ندارد.`,`No active requests.`)}</p>`,d.innerHTML=i.length?i.map(W).join(``):`<p class="orders-empty">${t(`تاریخچه‌ای وجود ندارد.`,`No history yet.`)}</p>`,T.textContent=r.length?n(r.length):``,k.textContent=i.length?n(i.length):``,P()}function I(e){N=e,S(e).then(e=>F(e)).catch(()=>F([]))}E().then(t=>{if(e.hidden=!0,t){o.hidden=!0,s.hidden=!1,I(t.phone);return}o.hidden=!1}).catch(()=>{e.hidden=!0,o.hidden=!1})}d(()=>void G());