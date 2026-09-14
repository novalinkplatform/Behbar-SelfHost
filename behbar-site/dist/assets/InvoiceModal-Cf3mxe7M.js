import{S as e,_ as t,a as n,b as r,c as i,d as a,f as o,i as s,o as c,p as l,s as u,u as d}from"./appReady-DVpveje2.js";var f=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],p=[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`];function m(e,t){return new Date(e,t,0).getDate()}function h(e,t,n){return new Date(e,t-1,n).getDay()}function g(){let e=new Date;return{y:e.getFullYear(),m:e.getMonth()+1,d:e.getDate()}}function _(e,t){let n=new Date(e.y,e.m-1,e.d);return n.setDate(n.getDate()+t),{y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate()}}function v(e){return`${f[e.m-1]} ${e.d}, ${e.y}`}function y(){return r(`انتخاب تاریخ`,`Select date`)}function b(t,n){let i=n??y();return`
    <div class="calendar-picker" id="${t}">
      <button
        type="button"
        class="calendar-trigger"
        id="${t}-trigger"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="${t}-panel"
      >
        <span class="icon">${e.calendar}</span>
        <span class="calendar-trigger-text" id="${t}-trigger-text">${i}</span>
      </button>
      <div class="calendar-panel" id="${t}-panel" role="dialog" aria-label="${r(`انتخاب تاریخ`,`Select date`)}" hidden>
        <div class="calendar-header">
          <button type="button" class="calendar-nav" id="${t}-prev" aria-label="${r(`ماه قبل`,`Previous month`)}">${e.chevronRight}</button>
          <div class="calendar-month-label" id="${t}-month-label"></div>
          <button type="button" class="calendar-nav" id="${t}-next" aria-label="${r(`ماه بعد`,`Next month`)}">${e.chevronLeft}</button>
        </div>
        <div class="calendar-weekdays" id="${t}-weekdays"></div>
        <div class="calendar-days" id="${t}-days"></div>
      </div>
    </div>
  `}function x(e,r={}){let b=document.getElementById(e),x=document.getElementById(`${e}-trigger`),S=document.getElementById(`${e}-trigger-text`),C=document.getElementById(`${e}-panel`),w=document.getElementById(`${e}-month-label`),T=document.getElementById(`${e}-weekdays`),E=document.getElementById(`${e}-days`),D=document.getElementById(`${e}-prev`),O=document.getElementById(`${e}-next`),k={getSelected:()=>null,reset:()=>{}};if(!b||!x||!S||!C||!w||!T||!E||!D||!O)return k;let A=t()!==`fa`,j=r.placeholder??y(),M=r.maxDaysAhead,N,P;if(A){let e=g();N={y:e.y,m:e.m,d:e.d};let t=M==null?null:_(e,M);P=t?{y:t.y,m:t.m,d:t.d}:null}else{let e=l();N={y:e.jy,m:e.jm,d:e.jd};let t=M==null?null:u(e,M);P=t?{y:t.jy,m:t.jm,d:t.jd}:null}let F=N.y,I=N.m,L=null,R=(e,t,n)=>e===N.y?t===N.m?n<N.d:t<N.m:e<N.y,z=(e,t,n)=>P?e===P.y?t===P.m?n>P.d:t>P.m:e>P.y:!1,B=(e,t)=>A?m(e,t):d(e,t),V=(e,t)=>A?h(e,t,1):a(e,t,1),H=A?f:t()===`fa`?s:n,U=A?p:c,W=e=>A?v(e):i({jy:e.y,jm:e.m,jd:e.d});T.innerHTML=U.map(e=>`<span>${e}</span>`).join(``);let G=e=>{b.contains(e.target)||Y()},K=()=>Y();function q(){if(!C||!x)return;let e=x.getBoundingClientRect();C.style.top=`${e.bottom+8}px`,C.style.right=`${Math.max(8,window.innerWidth-e.right)}px`,C.style.left=`auto`}function J(){!C||!x||(C.hidden=!1,x.setAttribute(`aria-expanded`,`true`),X(),q(),document.addEventListener(`click`,G,!0),window.addEventListener(`scroll`,K,!0),window.addEventListener(`resize`,q))}function Y(){!C||!x||(C.hidden=!0,x.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`click`,G,!0),window.removeEventListener(`scroll`,K,!0),window.removeEventListener(`resize`,q))}function X(){if(!w||!E||!D||!O)return;w.textContent=A?`${H[I-1]} ${F}`:`${H[I-1]} ${o(F)}`;let e=V(F,I),t=B(F,I),n=[];for(let t=0;t<e;t+=1)n.push(`<span class="calendar-day calendar-day-empty" aria-hidden="true"></span>`);for(let e=1;e<=t;e+=1){let t=R(F,I,e)||z(F,I,e),r=!!L&&L.y===F&&L.m===I&&L.d===e,i=F===N.y&&I===N.m&&e===N.d,a=[`calendar-day`];r&&a.push(`is-selected`),i&&a.push(`is-today`);let s=A?String(e):o(e);n.push(`<button type="button" class="${a.join(` `)}" data-day="${e}" ${t?`disabled`:``}>${s}</button>`)}E.innerHTML=n.join(``),E.querySelectorAll(`.calendar-day:not(.calendar-day-empty)`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.day);L={y:F,m:I,d:t};let n=W(L);S&&(S.textContent=n),x?.classList.add(`has-value`),Y(),r.onSelect?.(n)})}),D.disabled=F===N.y&&I===N.m,O.disabled=!!P&&F===P.y&&I===P.m}return x.addEventListener(`click`,()=>{C.hidden?J():Y()}),D.addEventListener(`click`,()=>{--I,I<1&&(I=12,--F),X()}),O.addEventListener(`click`,()=>{I+=1,I>12&&(I=1,F+=1),X()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!C.hidden&&Y()}),{getSelected:()=>L?W(L):null,reset:()=>{L=null,F=N.y,I=N.m,S&&(S.textContent=j),x.classList.remove(`has-value`)}}}var S=Array.from({length:24},(e,t)=>t),C=[0,15,30,45];function w(e){return String(e).padStart(2,`0`)}function T(t){return`
    <div class="time-picker" id="${t}">
      <span class="icon time-picker-icon">${e.clock}</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${t}-hour" aria-label="${r(`ساعت`,`Hour`)}">
          <option value="">${r(`ساعت`,`HH`)}</option>
          ${S.map(e=>`<option value="${e}">${o(w(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${e.chevronDown}</span>
      </div>
      <span class="time-picker-colon">:</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${t}-minute" aria-label="${r(`دقیقه`,`Minute`)}">
          <option value="">${r(`دقیقه`,`MM`)}</option>
          ${C.map(e=>`<option value="${e}">${o(w(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${e.chevronDown}</span>
      </div>
    </div>
  `}function E(e){return o(`${w(e.hour)}:${w(e.minute)}`)}function D(e){let t=document.getElementById(`${e}-hour`),n=document.getElementById(`${e}-minute`);return!t||!n?{getSelected:()=>null,reset:()=>{}}:{getSelected:()=>t.value===``||n.value===``?null:{hour:Number(t.value),minute:Number(n.value)},reset:()=>{t.value=``,n.value=``}}}function O(e){let t=(Math.round(e/1e3)*1e3).toLocaleString(`en-US`);return`${o(t)} ${r(`تومان`,`Toman`)}`}var k=45,A={residential:0,commercial:6e5,office:45e4,warehouse:8e5,other:0},j=18e4,M=9e5,N=7e5;function P(e,t,n,r){let i=(n-e)*Math.PI/180,a=(r-t)*Math.PI/180,o=Math.sin(i/2)**2+Math.cos(e*Math.PI/180)*Math.cos(n*Math.PI/180)*Math.sin(a/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}function F(e,t,n){return t||e<=0||n?0:e*j}function I(e){return e===`both`?N*2:e===`origin`||e===`destination`?N:0}function L(e){return A[e]??0}var R=25e4,z=18e4;function B(e,t){let n=e.originLat!=null&&e.originLng!=null&&e.destinationLat!=null&&e.destinationLng!=null?P(e.originLat,e.originLng,e.destinationLat,e.destinationLng):null,r=(n??0)>k,i=r?e.perKmRate*n:e.basePrice,a=F(e.originFloor,e.originHasElevator,e.floorCostExempt),o=F(e.destinationFloor,e.destinationHasElevator,e.floorCostExempt),s=a+o,c=L(e.originPropertyType)+L(e.destinationPropertyType),l=I(e.laborChoice),u=e.wantsPacking?M:0,d=R,f=z,p=Math.round(i+c),m=[{id:`freight`,title:`کرایه پایه حمل و نقل`,description:r&&n?`حمل بار بین‌شهری — مسافت تقریبی ${Math.round(n)} کیلومتر`:`کرایه ناوگان و راننده در مسیر درون‌شهری`,amount:p}];if(l>0){let t=e.laborChoice===`both`?`خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)`:e.laborChoice===`origin`?`خدمات کارگر بارگیری در مبدأ`:`خدمات کارگر تخلیه در مقصد`;m.push({id:`labor`,title:`خدمات نیروی کارگر باربری`,description:t,amount:l})}else m.push({id:`labor`,title:`خدمات نیروی کارگر باربری`,description:`عدم درخواست کارگر توسط مشتری`,amount:0});if(m.push({id:`insurance`,title:`حق بیمه‌نامه رسمی باربری`,description:`پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا`,amount:d}),m.push({id:`waybill`,title:`صدور بارنامه رسمی راهداری`,description:`سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری`,amount:f}),u>0&&m.push({id:`packing`,title:`خدمات بسته‌بندی و لوازم ایمن`,description:`کارتن‌های ۵ لایه، بابل‌رپ، سلفون‌کشی و بسته‌بندی حرفه‌ای اثاثیه`,amount:u}),s>0){let t=[];a>0&&t.push(`مبدأ: طبقه ${e.originFloor} بدون آسانسور`),o>0&&t.push(`مقصد: طبقه ${e.destinationFloor} بدون آسانسور`),m.push({id:`floors`,title:`هزینه جابه‌جایی طبقات`,description:t.join(` · `),amount:s})}let h=p+l+d+f+u+s;return{items:m,subtotal:h,discount:0,tax:0,total:h,isIntercity:r,distanceKm:n==null?null:Math.round(n)}}function V(e){let t=e.laborChoice||`none`,n=0,r=`عدم درخواست کارگر`;t===`both`?(n=N*2,r=`خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)`):t===`origin`?(n=N,r=`خدمات کارگر بارگیری در مبدأ`):t===`destination`&&(n=N,r=`خدمات کارگر تخلیه در مقصد`);let i=e.wantsPacking?M:0,a=0,o=[];!e.originElevator&&(e.originFloor??0)>0&&(a+=(e.originFloor??0)*j,o.push(`مبدأ: طبقه ${e.originFloor}`)),!e.destinationElevator&&(e.destinationFloor??0)>0&&(a+=(e.destinationFloor??0)*j,o.push(`مقصد: طبقه ${e.destinationFloor}`));let s=R,c=z,l=Math.max(e.estimateAvg||0,1e6),u=l-(n+i+a+s+c);u<4e5&&(u=Math.round(l*.55));let d=u+n+s+c+i+a,f=[{id:`freight`,title:`کرایه پایه حمل و نقل`,description:e.originCity&&e.destinationCity?`کرایه ترابری از ${e.originCity} به ${e.destinationCity}`:`کرایه پایه ناوگان و راننده`,amount:u},{id:`labor`,title:`خدمات نیروی کارگر باربری`,description:r,amount:n},{id:`insurance`,title:`حق بیمه‌نامه رسمی باربری`,description:`پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا`,amount:s},{id:`waybill`,title:`صدور بارنامه رسمی راهداری`,description:`سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری`,amount:c}];return i>0&&f.push({id:`packing`,title:`خدمات بسته‌بندی و لوازم ایمن`,description:`بسته‌بندی حرفه‌ای و لوازم محافظ اثاثیه`,amount:i}),a>0&&f.push({id:`floors`,title:`هزینه جابه‌جایی طبقات بدون آسانسور`,description:o.join(` · `),amount:a}),{items:f,subtotal:d,discount:0,tax:0,total:d,isIntercity:!1,distanceKm:null}}function H(e){let t=B(e),n=t.total;return{min:Math.round(n*.9),avg:Math.round(n),max:Math.round(n*1.15),distanceKm:t.distanceKm,isIntercity:t.isIntercity}}function U(t){let n=document.getElementById(`behbar-invoice-modal-overlay`);n&&n.remove();let i=t.createdAt?t.createdAt.slice(0,10):new Date().toISOString().slice(0,10),a=t.invoice.items.map((e,t)=>`
    <tr>
      <td style="text-align: center; width: 40px;">${o(t+1)}</td>
      <td>
        <strong style="display: block; color: #1f2937; font-size: 0.92rem;">${e.title}</strong>
        <span style="display: block; color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${e.description}</span>
      </td>
      <td style="text-align: left; font-weight: 700; color: ${e.amount===0?`#9ca3af`:`#059669`}; white-space: nowrap; font-size: 0.92rem;">
        ${e.amount===0?r(`رایگان / بدون سفارش`,`Free / Not requested`):O(e.amount)}
      </td>
    </tr>
  `).join(``),s=`
    <div class="invoice-modal-overlay" id="behbar-invoice-modal-overlay">
      <div class="invoice-modal-dialog">
        <div class="invoice-modal-topbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="icon" style="color: #059669; width: 22px; height: 22px;">${e.fileText}</span>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 700;">${r(`فاکتور رسمی خدمات بهبار`,`Official Service Invoice`)}</h3>
          </div>
          <button type="button" class="invoice-modal-close-btn" id="invoice-modal-close" title="${r(`بستن`,`Close`)}">
            <span class="icon">${e.close}</span>
          </button>
        </div>

        <div class="invoice-modal-body">
          <div class="behbar-invoice-sheet" id="behbar-customer-printable-sheet">
            <!-- Header -->
            <div class="behbar-invoice-head">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="/favicon.svg" alt="بهبار" style="width: 44px; height: 44px;" />
                <div>
                  <h2 style="margin: 0; font-size: 1.28rem; color: #059669; font-weight: 800;">${r(`سامانه ترابری هوشمند بهبار`,`Behbar Smart Transport`)}</h2>
                  <span style="font-size: 0.78rem; color: #6b7280;">${r(`صورتحساب و سند رسمی خدمات حمل‌ونقل کالا و اثاثیه`,`Official Transport & Moving Invoice`)}</span>
                </div>
              </div>
              <div class="behbar-invoice-meta">
                <div><strong>${r(`شماره سند / پیگیری:`,`Doc / Tracking No:`)}</strong> <span style="font-family: monospace; direction: ltr; font-weight: 700;">#${o(t.trackingCode)}</span></div>
                <div><strong>${r(`تاریخ صدور:`,`Issue Date:`)}</strong> ${o(i)}</div>
                ${t.statusLabel?`<div><strong>${r(`وضعیت درخواست:`,`Status:`)}</strong> <span class="invoice-badge-status">${t.statusLabel}</span></div>`:``}
              </div>
            </div>

            <!-- Parties -->
            <div class="behbar-invoice-parties">
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${r(`صادرکننده خدمات:`,`Service Provider:`)}</div>
                <div style="font-weight: 600; color: #111827;">${r(`شرکت خدمات ترابری بهبار`,`Behbar Transport Co.`)}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${r(`شناسه ثبت رسمی ترابری · سامانه برخط پشتیبانی ۲۴ ساعته`,`Licensed Transport Provider · 24/7 Support`)}</div>
              </div>
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${r(`طرف حساب (کارفرما / مشتری):`,`Customer / Bill To:`)}</div>
                <div style="font-weight: 600; color: #111827;">${t.customerName||r(`مشتری گرامی`,`Valued Customer`)}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${r(`شماره تماس:`,`Phone:`)} ${o(t.phone)}</div>
              </div>
            </div>

            <!-- Logistics Details -->
            <div class="behbar-invoice-route">
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.pin}</span>
                <span><strong>${r(`مبدأ و مقصد:`,`Route:`)}</strong> ${t.originCity} ← ${t.destinationCity}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.calendar}</span>
                <span><strong>${r(`زمان‌بندی حمل:`,`Schedule:`)}</strong> ${t.scheduledDate} — ${r(`ساعت`,`at`)} ${o(t.scheduledTime)}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.route}</span>
                <span><strong>${r(`نوع خدمت:`,`Service:`)}</strong> ${t.serviceLabel}</span>
              </div>
            </div>

            <!-- Itemized Table -->
            <table class="behbar-invoice-table">
              <thead>
                <tr>
                  <th style="text-align: center; width: 40px;">${r(`ردیف`,`#`)}</th>
                  <th>${r(`شرح اقلام خدمات و هزینه‌ها`,`Description of Services & Fees`)}</th>
                  <th style="text-align: left; width: 140px;">${r(`مبلغ (تومان)`,`Amount (Toman)`)}</th>
                </tr>
              </thead>
              <tbody>
                ${a}
              </tbody>
            </table>

            <!-- Total -->
            <div class="behbar-invoice-total">
              <div>
                <span style="font-weight: 700; color: #374151;">${r(`جمع کل صورتحساب نهایی:`,`Total Invoice Amount:`)}</span>
              </div>
              <div style="font-size: 1.22rem; font-weight: 800; color: #059669;">
                ${O(t.invoice.total)}
              </div>
            </div>

            <!-- Legal Footer -->
            <div class="behbar-invoice-footer-sign">
              <div style="font-size: 0.76rem; color: #6b7280; max-width: 480px; line-height: 1.5;">
                ${r(`این فاکتور به‌صورت الکترونیکی و رسمی توسط سامانه بهبار صادر شده و دارای پوشش بیمه‌نامه معتبر و تمبر قانونی بارنامه می‌باشد.`,`This invoice was generated electronically by Behbar with valid cargo insurance and official waybill coverage.`)}
              </div>
              <div style="text-align: center; border-top: 1px dashed #d1d5db; padding-top: 6px; width: 150px; font-size: 0.78rem; color: #4b5563;">
                ${r(`مهر و امضای دیجیتال ترابری بهبار`,`Digital Seal & Signature`)}
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-modal-actions">
          <button type="button" class="btn btn-primary" id="btn-print-customer-invoice">
            <span class="icon">${e.printer}</span>
            <span>${r(`چاپ و دریافت فاکتور`,`Print / Save Invoice`)}</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-close-customer-invoice">
            ${r(`بستن`,`Close`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,s);let c=document.getElementById(`behbar-invoice-modal-overlay`),l=document.getElementById(`invoice-modal-close`),u=document.getElementById(`btn-close-customer-invoice`),d=document.getElementById(`btn-print-customer-invoice`),f=()=>c?.remove();l?.addEventListener(`click`,f),u?.addEventListener(`click`,f),c?.addEventListener(`click`,e=>{e.target===c&&f()}),d?.addEventListener(`click`,()=>{window.print()})}export{O as a,T as c,V as i,x as l,B as n,E as o,H as r,D as s,U as t,b as u};