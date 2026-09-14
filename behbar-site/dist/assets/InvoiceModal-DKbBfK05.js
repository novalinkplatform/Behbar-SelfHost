import{C as e,a as t,c as n,d as r,f as i,i as a,l as o,m as s,o as c,p as l,s as u,v as d,x as f}from"./appReady-giJ54-6J.js";var p=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],m=[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`];function h(e,t){return new Date(e,t,0).getDate()}function g(e,t,n){return new Date(e,t-1,n).getDay()}function _(){let e=new Date;return{y:e.getFullYear(),m:e.getMonth()+1,d:e.getDate()}}function v(e,t){let n=new Date(e.y,e.m-1,e.d);return n.setDate(n.getDate()+t),{y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate()}}function y(e){return`${p[e.m-1]} ${e.d}, ${e.y}`}function b(){return f(`انتخاب تاریخ`,`Select date`)}function x(t,n){let r=n??b();return`
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
        <span class="calendar-trigger-text" id="${t}-trigger-text">${r}</span>
      </button>
      <div class="calendar-panel" id="${t}-panel" role="dialog" aria-label="${f(`انتخاب تاریخ`,`Select date`)}" hidden>
        <div class="calendar-header">
          <button type="button" class="calendar-nav" id="${t}-prev" aria-label="${f(`ماه قبل`,`Previous month`)}">${e.chevronRight}</button>
          <div class="calendar-month-label" id="${t}-month-label"></div>
          <button type="button" class="calendar-nav" id="${t}-next" aria-label="${f(`ماه بعد`,`Next month`)}">${e.chevronLeft}</button>
        </div>
        <div class="calendar-weekdays" id="${t}-weekdays"></div>
        <div class="calendar-days" id="${t}-days"></div>
      </div>
    </div>
  `}function S(e,n={}){let f=document.getElementById(e),x=document.getElementById(`${e}-trigger`),S=document.getElementById(`${e}-trigger-text`),C=document.getElementById(`${e}-panel`),w=document.getElementById(`${e}-month-label`),T=document.getElementById(`${e}-weekdays`),E=document.getElementById(`${e}-days`),D=document.getElementById(`${e}-prev`),O=document.getElementById(`${e}-next`),k={getSelected:()=>null,reset:()=>{}};if(!f||!x||!S||!C||!w||!T||!E||!D||!O)return k;let A=d()!==`fa`,j=n.placeholder??b(),M=n.maxDaysAhead,N,P;if(A){let e=_();N={y:e.y,m:e.m,d:e.d};let t=M==null?null:v(e,M);P=t?{y:t.y,m:t.m,d:t.d}:null}else{let e=s();N={y:e.jy,m:e.jm,d:e.jd};let t=M==null?null:u(e,M);P=t?{y:t.jy,m:t.jm,d:t.jd}:null}let F=N.y,I=N.m,L=null,R=(e,t,n)=>e===N.y?t===N.m?n<N.d:t<N.m:e<N.y,z=(e,t,n)=>P?e===P.y?t===P.m?n>P.d:t>P.m:e>P.y:!1,B=(e,t)=>A?h(e,t):r(e,t),V=(e,t)=>A?g(e,t,1):i(e,t,1),H=A?p:d()===`fa`?a:t,U=A?m:c,W=e=>A?y(e):o({jy:e.y,jm:e.m,jd:e.d});T.innerHTML=U.map(e=>`<span>${e}</span>`).join(``);let G=e=>{f.contains(e.target)||Y()},K=()=>Y();function q(){if(!C||!x)return;let e=x.getBoundingClientRect();C.style.top=`${e.bottom+8}px`,C.style.right=`${Math.max(8,window.innerWidth-e.right)}px`,C.style.left=`auto`}function J(){!C||!x||(C.hidden=!1,x.setAttribute(`aria-expanded`,`true`),X(),q(),document.addEventListener(`click`,G,!0),window.addEventListener(`scroll`,K,!0),window.addEventListener(`resize`,q))}function Y(){!C||!x||(C.hidden=!0,x.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`click`,G,!0),window.removeEventListener(`scroll`,K,!0),window.removeEventListener(`resize`,q))}function X(){if(!w||!E||!D||!O)return;w.textContent=A?`${H[I-1]} ${F}`:`${H[I-1]} ${l(F)}`;let e=V(F,I),t=B(F,I),r=[];for(let t=0;t<e;t+=1)r.push(`<span class="calendar-day calendar-day-empty" aria-hidden="true"></span>`);for(let e=1;e<=t;e+=1){let t=R(F,I,e)||z(F,I,e),n=!!L&&L.y===F&&L.m===I&&L.d===e,i=F===N.y&&I===N.m&&e===N.d,a=[`calendar-day`];n&&a.push(`is-selected`),i&&a.push(`is-today`);let o=A?String(e):l(e);r.push(`<button type="button" class="${a.join(` `)}" data-day="${e}" ${t?`disabled`:``}>${o}</button>`)}E.innerHTML=r.join(``),E.querySelectorAll(`.calendar-day:not(.calendar-day-empty)`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.day);L={y:F,m:I,d:t};let r=W(L);S&&(S.textContent=r),x?.classList.add(`has-value`),Y(),n.onSelect?.(r)})}),D.disabled=F===N.y&&I===N.m,O.disabled=!!P&&F===P.y&&I===P.m}return x.addEventListener(`click`,()=>{C.hidden?J():Y()}),D.addEventListener(`click`,()=>{--I,I<1&&(I=12,--F),X()}),O.addEventListener(`click`,()=>{I+=1,I>12&&(I=1,F+=1),X()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!C.hidden&&Y()}),{getSelected:()=>L?W(L):null,reset:()=>{L=null,F=N.y,I=N.m,S&&(S.textContent=j),x.classList.remove(`has-value`)}}}var C=Array.from({length:24},(e,t)=>t),w=[0,15,30,45];function T(e){return String(e).padStart(2,`0`)}function E(t){return`
    <div class="time-picker" id="${t}">
      <span class="icon time-picker-icon">${e.clock}</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${t}-hour" aria-label="${f(`ساعت`,`Hour`)}">
          <option value="">${f(`ساعت`,`HH`)}</option>
          ${C.map(e=>`<option value="${e}">${l(T(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${e.chevronDown}</span>
      </div>
      <span class="time-picker-colon">:</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${t}-minute" aria-label="${f(`دقیقه`,`Minute`)}">
          <option value="">${f(`دقیقه`,`MM`)}</option>
          ${w.map(e=>`<option value="${e}">${l(T(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${e.chevronDown}</span>
      </div>
    </div>
  `}function D(e){return l(`${T(e.hour)}:${T(e.minute)}`)}function O(e){let t=document.getElementById(`${e}-hour`),n=document.getElementById(`${e}-minute`);return!t||!n?{getSelected:()=>null,reset:()=>{}}:{getSelected:()=>t.value===``||n.value===``?null:{hour:Number(t.value),minute:Number(n.value)},reset:()=>{t.value=``,n.value=``}}}function k(e){let t=(Math.round(e/1e3)*1e3).toLocaleString(`en-US`);return`${l(t)} ${f(`تومان`,`Toman`)}`}var A=45,j={residential:0,commercial:6e5,office:45e4,warehouse:8e5,other:0},M=18e4,N=9e5,P=7e5;function F(e,t,n,r){let i=(n-e)*Math.PI/180,a=(r-t)*Math.PI/180,o=Math.sin(i/2)**2+Math.cos(e*Math.PI/180)*Math.cos(n*Math.PI/180)*Math.sin(a/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}function I(e,t,n){return t||e<=0||n?0:e*M}function L(e){return e===`both`?P*2:e===`origin`||e===`destination`?P:0}function R(e){return j[e]??0}var z=25e4,B=18e4;function V(e,t){let n=e.originLat!=null&&e.originLng!=null&&e.destinationLat!=null&&e.destinationLng!=null?F(e.originLat,e.originLng,e.destinationLat,e.destinationLng):null,r=(n??0)>A,i=r?e.perKmRate*n:e.basePrice,a=I(e.originFloor,e.originHasElevator,e.floorCostExempt),o=I(e.destinationFloor,e.destinationHasElevator,e.floorCostExempt),s=a+o,c=R(e.originPropertyType)+R(e.destinationPropertyType),l=L(e.laborChoice),u=e.wantsPacking?N:0,d=z,f=B,p=Math.round(i+c),m=[{id:`freight`,title:`کرایه پایه حمل و نقل`,description:r&&n?`حمل بار بین‌شهری — مسافت تقریبی ${Math.round(n)} کیلومتر`:`کرایه ناوگان و راننده در مسیر درون‌شهری`,amount:p}];if(l>0){let t=e.laborChoice===`both`?`خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)`:e.laborChoice===`origin`?`خدمات کارگر بارگیری در مبدأ`:`خدمات کارگر تخلیه در مقصد`;m.push({id:`labor`,title:`خدمات نیروی کارگر باربری`,description:t,amount:l})}else m.push({id:`labor`,title:`خدمات نیروی کارگر باربری`,description:`عدم درخواست کارگر توسط مشتری`,amount:0});if(m.push({id:`insurance`,title:`حق بیمه‌نامه رسمی باربری`,description:`پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا`,amount:d}),m.push({id:`waybill`,title:`صدور بارنامه رسمی راهداری`,description:`سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری`,amount:f}),u>0&&m.push({id:`packing`,title:`خدمات بسته‌بندی و لوازم ایمن`,description:`کارتن‌های ۵ لایه، بابل‌رپ، سلفون‌کشی و بسته‌بندی حرفه‌ای اثاثیه`,amount:u}),s>0){let t=[];a>0&&t.push(`مبدأ: طبقه ${e.originFloor} بدون آسانسور`),o>0&&t.push(`مقصد: طبقه ${e.destinationFloor} بدون آسانسور`),m.push({id:`floors`,title:`هزینه جابه‌جایی طبقات`,description:t.join(` · `),amount:s})}let h=p+l+d+f+u+s;return{items:m,subtotal:h,discount:0,tax:0,total:h,isIntercity:r,distanceKm:n==null?null:Math.round(n)}}function H(e){let t=e.laborChoice||`none`,n=0,r=`عدم درخواست کارگر`;t===`both`?(n=P*2,r=`خدمات کارگر متخصص بارگیری و تخلیه (مبدأ و مقصد)`):t===`origin`?(n=P,r=`خدمات کارگر بارگیری در مبدأ`):t===`destination`&&(n=P,r=`خدمات کارگر تخلیه در مقصد`);let i=e.wantsPacking?N:0,a=0,o=[];!e.originElevator&&(e.originFloor??0)>0&&(a+=(e.originFloor??0)*M,o.push(`مبدأ: طبقه ${e.originFloor}`)),!e.destinationElevator&&(e.destinationFloor??0)>0&&(a+=(e.destinationFloor??0)*M,o.push(`مقصد: طبقه ${e.destinationFloor}`));let s=z,c=B,l=Math.max(e.estimateAvg||0,1e6),u=l-(n+i+a+s+c);u<4e5&&(u=Math.round(l*.55));let d=u+n+s+c+i+a,f=[{id:`freight`,title:`کرایه پایه حمل و نقل`,description:e.originCity&&e.destinationCity?`کرایه ترابری از ${e.originCity} به ${e.destinationCity}`:`کرایه پایه ناوگان و راننده`,amount:u},{id:`labor`,title:`خدمات نیروی کارگر باربری`,description:r,amount:n},{id:`insurance`,title:`حق بیمه‌نامه رسمی باربری`,description:`پوشش کامل حوادث، آتش‌سوزی، سرقت و خسارت حین بارگیری و حمل کالا`,amount:s},{id:`waybill`,title:`صدور بارنامه رسمی راهداری`,description:`سند الکترونیک رسمی راهداری، تمبر دولتی و کد رهگیری ترابری کشوری`,amount:c}];return i>0&&f.push({id:`packing`,title:`خدمات بسته‌بندی و لوازم ایمن`,description:`بسته‌بندی حرفه‌ای و لوازم محافظ اثاثیه`,amount:i}),a>0&&f.push({id:`floors`,title:`هزینه جابه‌جایی طبقات بدون آسانسور`,description:o.join(` · `),amount:a}),{items:f,subtotal:d,discount:0,tax:0,total:d,isIntercity:!1,distanceKm:null}}function U(e){let t=V(e),n=t.total;return{min:Math.round(n*.9),avg:Math.round(n),max:Math.round(n*1.15),distanceKm:t.distanceKm,isIntercity:t.isIntercity}}function W(e){let t=document.getElementById(e);if(!t){window.print();return}let n=document.createElement(`iframe`);n.style.position=`fixed`,n.style.right=`0`,n.style.bottom=`0`,n.style.width=`0`,n.style.height=`0`,n.style.border=`0`,n.style.opacity=`0`,n.setAttribute(`aria-hidden`,`true`),document.body.appendChild(n);let r=n.contentWindow?.document;if(!r){let e=document.title;document.title=` `,window.print(),window.addEventListener(`afterprint`,()=>{document.title=e},{once:!0}),setTimeout(()=>{document.title=e},3e3),n.remove();return}r.open(),r.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="utf-8" />
      <title> </title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        * {
          box-sizing: border-box;
          font-family: Tahoma, 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff !important;
          color: #111827 !important;
          direction: rtl;
        }
        .behbar-invoice-sheet {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          background: white;
          padding: 16px 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
        .behbar-invoice-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #059669;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .behbar-invoice-meta {
          text-align: left;
          font-size: 0.82rem;
          line-height: 1.6;
          color: #4b5563;
        }
        .behbar-invoice-parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: #f9fafb;
          padding: 12px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
          font-size: 0.84rem;
        }
        .behbar-invoice-route {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          background: #ecfdf5;
          border: 1px solid #d1fae5;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
          font-size: 0.82rem;
        }
        .behbar-invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
          font-size: 0.85rem;
        }
        .behbar-invoice-table th {
          background: #f3f4f6;
          color: #374151;
          font-weight: 700;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          text-align: right;
        }
        .behbar-invoice-table td {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          text-align: right;
          vertical-align: middle;
        }
        .behbar-invoice-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }
        .behbar-invoice-footer-sign {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 0.78rem;
          color: #6b7280;
        }
        .invoice-badge-status {
          display: inline-block;
          padding: 2px 8px;
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.75rem;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .behbar-invoice-sheet {
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      ${t.outerHTML}
    </body>
    </html>
  `),r.close(),setTimeout(()=>{try{n.contentWindow?.focus(),n.contentWindow?.print()}catch{window.print()}finally{setTimeout(()=>n.remove(),2500)}},300)}function G(e,t){let n=document.getElementById(e);if(!n)return;let r=`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>فاکتور رسمی بهبار - #${t}</title>
  <style>
    body { font-family: Tahoma, 'Vazirmatn', sans-serif; background: #f8fafc; padding: 20px; color: #111827; margin: 0; }
    .behbar-invoice-sheet { background: white; max-width: 760px; margin: 0 auto; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .behbar-invoice-head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
    .behbar-invoice-meta { text-align: left; font-size: 0.82rem; line-height: 1.6; color: #4b5563; }
    .behbar-invoice-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f9fafb; padding: 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.85rem; }
    .behbar-invoice-route { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; background: #ecfdf5; border: 1px solid #d1fae5; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.84rem; }
    .behbar-invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.86rem; }
    .behbar-invoice-table th { background: #f3f4f6; color: #374151; font-weight: 700; padding: 10px 12px; border: 1px solid #e5e7eb; text-align: right; }
    .behbar-invoice-table td { padding: 10px 12px; border: 1px solid #e5e7eb; text-align: right; }
    .behbar-invoice-total { display: flex; justify-content: space-between; align-items: center; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 14px 18px; border-radius: 8px; font-size: 1.1rem; margin-bottom: 24px; }
    .behbar-invoice-footer-sign { display: flex; justify-content: space-between; align-items: flex-end; font-size: 0.8rem; color: #6b7280; }
    .invoice-badge-status { display: inline-block; padding: 2px 8px; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; border-radius: 6px; font-weight: 600; font-size: 0.75rem; }
    @media print {
      body { background: white; padding: 0; }
      .behbar-invoice-sheet { box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  ${n.outerHTML}
</body>
</html>`,i=new Blob([r],{type:`text/html;charset=utf-8`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`behbar-invoice-${t}.html`,document.body.appendChild(o),o.click(),setTimeout(()=>{o.remove(),URL.revokeObjectURL(a)},1e3)}function K(t){let r=document.getElementById(`behbar-invoice-modal-overlay`);r&&r.remove();let i=n(t.createdAt),a=n(t.scheduledDate),o=t.invoice.items.map((e,t)=>`
    <tr>
      <td style="text-align: center; width: 40px;">${l(t+1)}</td>
      <td>
        <strong style="display: block; color: #1f2937; font-size: 0.92rem;">${e.title}</strong>
        <span style="display: block; color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${e.description}</span>
      </td>
      <td style="text-align: left; font-weight: 700; color: ${e.amount===0?`#9ca3af`:`#059669`}; white-space: nowrap; font-size: 0.92rem;">
        ${e.amount===0?f(`رایگان / بدون سفارش`,`Free / Not requested`):k(e.amount)}
      </td>
    </tr>
  `).join(``),s=`
    <div class="invoice-modal-overlay" id="behbar-invoice-modal-overlay">
      <div class="invoice-modal-dialog">
        <div class="invoice-modal-topbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="icon" style="color: #059669; width: 22px; height: 22px;">${e.fileText}</span>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 700;">${f(`فاکتور رسمی خدمات بهبار`,`Official Service Invoice`)}</h3>
          </div>
          <button type="button" class="invoice-modal-close-btn" id="invoice-modal-close" title="${f(`بستن`,`Close`)}">
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
                  <h2 style="margin: 0; font-size: 1.28rem; color: #059669; font-weight: 800;">${f(`سامانه ترابری هوشمند بهبار`,`Behbar Smart Transport`)}</h2>
                  <span style="font-size: 0.78rem; color: #6b7280;">${f(`صورتحساب و سند رسمی خدمات حمل‌ونقل کالا و اثاثیه`,`Official Transport & Moving Invoice`)}</span>
                </div>
              </div>
              <div class="behbar-invoice-meta">
                <div><strong>${f(`شماره سند / پیگیری:`,`Doc / Tracking No:`)}</strong> <span style="font-family: monospace; direction: ltr; font-weight: 700;">#${l(t.trackingCode)}</span></div>
                <div><strong>${f(`تاریخ صدور:`,`Issue Date:`)}</strong> ${i}</div>
                ${t.statusLabel?`<div><strong>${f(`وضعیت درخواست:`,`Status:`)}</strong> <span class="invoice-badge-status">${t.statusLabel}</span></div>`:``}
              </div>
            </div>

            <!-- Parties -->
            <div class="behbar-invoice-parties">
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${f(`صادرکننده خدمات:`,`Service Provider:`)}</div>
                <div style="font-weight: 600; color: #111827;">${f(`شرکت خدمات ترابری بهبار`,`Behbar Transport Co.`)}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${f(`شناسه ثبت رسمی ترابری · سامانه برخط پشتیبانی ۲۴ ساعته`,`Licensed Transport Provider · 24/7 Support`)}</div>
              </div>
              <div>
                <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">${f(`طرف حساب (کارفرما / مشتری):`,`Customer / Bill To:`)}</div>
                <div style="font-weight: 600; color: #111827;">${t.customerName||f(`مشتری گرامی`,`Valued Customer`)}</div>
                <div style="color: #6b7280; font-size: 0.78rem; margin-top: 2px;">${f(`شماره تماس:`,`Phone:`)} ${l(t.phone)}</div>
              </div>
            </div>

            <!-- Logistics Details -->
            <div class="behbar-invoice-route">
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.pin}</span>
                <span><strong>${f(`مبدأ و مقصد:`,`Route:`)}</strong> ${t.originCity} ← ${t.destinationCity}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.calendar}</span>
                <span><strong>${f(`زمان‌بندی حمل:`,`Schedule:`)}</strong> ${a} — ${f(`ساعت`,`at`)} ${l(t.scheduledTime)}</span>
              </div>
              <div>
                <span class="icon" style="width: 16px; height: 16px; color: #059669;">${e.route}</span>
                <span><strong>${f(`نوع خدمت:`,`Service:`)}</strong> ${t.serviceLabel}</span>
              </div>
            </div>

            <!-- Itemized Table -->
            <table class="behbar-invoice-table">
              <thead>
                <tr>
                  <th style="text-align: center; width: 40px;">${f(`ردیف`,`#`)}</th>
                  <th>${f(`شرح اقلام خدمات و هزینه‌ها`,`Description of Services & Fees`)}</th>
                  <th style="text-align: left; width: 140px;">${f(`مبلغ (تومان)`,`Amount (Toman)`)}</th>
                </tr>
              </thead>
              <tbody>
                ${o}
              </tbody>
            </table>

            <!-- Total -->
            <div class="behbar-invoice-total">
              <div>
                <span style="font-weight: 700; color: #374151;">${f(`جمع کل صورتحساب نهایی:`,`Total Invoice Amount:`)}</span>
              </div>
              <div style="font-size: 1.22rem; font-weight: 800; color: #059669;">
                ${k(t.invoice.total)}
              </div>
            </div>

            <!-- Legal Footer -->
            <div class="behbar-invoice-footer-sign">
              <div style="font-size: 0.76rem; color: #6b7280; max-width: 480px; line-height: 1.5;">
                ${f(`این فاکتور به‌صورت الکترونیکی و رسمی توسط سامانه بهبار صادر شده و دارای پوشش بیمه‌نامه معتبر و تمبر قانونی بارنامه می‌باشد.`,`This invoice was generated electronically by Behbar with valid cargo insurance and official waybill coverage.`)}
              </div>
              <div style="text-align: center; border-top: 1px dashed #d1d5db; padding-top: 6px; width: 150px; font-size: 0.78rem; color: #4b5563;">
                ${f(`مهر و امضای دیجیتال ترابری بهبار`,`Digital Seal & Signature`)}
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-modal-actions">
          <button type="button" class="btn btn-primary" id="btn-print-customer-invoice" title="${f(`چاپ یا ذخیره فاکتور به‌صورت PDF بدون عنوان اضافی`,`Print or Save as PDF`)}">
            <span class="icon">${e.printer}</span>
            <span>${f(`چاپ و ذخیره PDF`,`Print / Save PDF`)}</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-download-customer-invoice" style="display: inline-flex; align-items: center; gap: 6px;" title="${f(`دریافت فایل سند آفلاین فاکتور`,`Download Offline Invoice File`)}">
            <span class="icon" style="width: 16px; height: 16px;">${e.download}</span>
            <span>${f(`دریافت فایل فاکتور`,`Download Invoice`)}</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-close-customer-invoice">
            ${f(`بستن`,`Close`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,s);let c=document.getElementById(`behbar-invoice-modal-overlay`),u=document.getElementById(`invoice-modal-close`),d=document.getElementById(`btn-close-customer-invoice`),p=document.getElementById(`btn-print-customer-invoice`),m=document.getElementById(`btn-download-customer-invoice`),h=()=>c?.remove();u?.addEventListener(`click`,h),d?.addEventListener(`click`,h),c?.addEventListener(`click`,e=>{e.target===c&&h()}),p?.addEventListener(`click`,()=>{W(`behbar-customer-printable-sheet`)}),m?.addEventListener(`click`,()=>{G(`behbar-customer-printable-sheet`,t.trackingCode)})}export{k as a,E as c,H as i,S as l,V as n,D as o,U as r,O as s,K as t,x as u};