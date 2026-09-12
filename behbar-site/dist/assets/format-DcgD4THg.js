import{B as e,D as t,E as n,H as r,M as i,N as a,O as o,P as s,T as c,V as l,j as u,k as d}from"./appReady-jYOMNzjt.js";var f=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],p=[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`];function m(e,t){return new Date(e,t,0).getDate()}function h(e,t,n){return new Date(e,t-1,n).getDay()}function g(){let e=new Date;return{y:e.getFullYear(),m:e.getMonth()+1,d:e.getDate()}}function _(e,t){let n=new Date(e.y,e.m-1,e.d);return n.setDate(n.getDate()+t),{y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate()}}function v(e){return`${f[e.m-1]} ${e.d}, ${e.y}`}function y(){return l(`انتخاب تاریخ`,`Select date`)}function b(e,t){let n=t??y();return`
    <div class="calendar-picker" id="${e}">
      <button
        type="button"
        class="calendar-trigger"
        id="${e}-trigger"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="${e}-panel"
      >
        <span class="icon">${r.calendar}</span>
        <span class="calendar-trigger-text" id="${e}-trigger-text">${n}</span>
      </button>
      <div class="calendar-panel" id="${e}-panel" role="dialog" aria-label="${l(`انتخاب تاریخ`,`Select date`)}" hidden>
        <div class="calendar-header">
          <button type="button" class="calendar-nav" id="${e}-prev" aria-label="${l(`ماه قبل`,`Previous month`)}">${r.chevronRight}</button>
          <div class="calendar-month-label" id="${e}-month-label"></div>
          <button type="button" class="calendar-nav" id="${e}-next" aria-label="${l(`ماه بعد`,`Next month`)}">${r.chevronLeft}</button>
        </div>
        <div class="calendar-weekdays" id="${e}-weekdays"></div>
        <div class="calendar-days" id="${e}-days"></div>
      </div>
    </div>
  `}function x(r,l={}){let b=document.getElementById(r),x=document.getElementById(`${r}-trigger`),S=document.getElementById(`${r}-trigger-text`),C=document.getElementById(`${r}-panel`),w=document.getElementById(`${r}-month-label`),T=document.getElementById(`${r}-weekdays`),E=document.getElementById(`${r}-days`),D=document.getElementById(`${r}-prev`),O=document.getElementById(`${r}-next`),k={getSelected:()=>null,reset:()=>{}};if(!b||!x||!S||!C||!w||!T||!E||!D||!O)return k;let A=e()!==`fa`,j=l.placeholder??y(),M=l.maxDaysAhead,N,P;if(A){let e=g();N={y:e.y,m:e.m,d:e.d};let t=M==null?null:_(e,M);P=t?{y:t.y,m:t.m,d:t.d}:null}else{let e=s();N={y:e.jy,m:e.jm,d:e.jd};let t=M==null?null:o(e,M);P=t?{y:t.jy,m:t.jm,d:t.jd}:null}let F=N.y,I=N.m,L=null,R=(e,t,n)=>e===N.y?t===N.m?n<N.d:t<N.m:e<N.y,z=(e,t,n)=>P?e===P.y?t===P.m?n>P.d:t>P.m:e>P.y:!1,B=(e,t)=>A?m(e,t):u(e,t),V=(e,t)=>A?h(e,t,1):i(e,t,1),H=A?f:e()===`fa`?c:n,U=A?p:t,W=e=>A?v(e):d({jy:e.y,jm:e.m,jd:e.d});T.innerHTML=U.map(e=>`<span>${e}</span>`).join(``);let G=e=>{b.contains(e.target)||Y()},K=()=>Y();function q(){if(!C||!x)return;let e=x.getBoundingClientRect();C.style.top=`${e.bottom+8}px`,C.style.right=`${Math.max(8,window.innerWidth-e.right)}px`,C.style.left=`auto`}function J(){!C||!x||(C.hidden=!1,x.setAttribute(`aria-expanded`,`true`),X(),q(),document.addEventListener(`click`,G,!0),window.addEventListener(`scroll`,K,!0),window.addEventListener(`resize`,q))}function Y(){!C||!x||(C.hidden=!0,x.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`click`,G,!0),window.removeEventListener(`scroll`,K,!0),window.removeEventListener(`resize`,q))}function X(){if(!w||!E||!D||!O)return;w.textContent=A?`${H[I-1]} ${F}`:`${H[I-1]} ${a(F)}`;let e=V(F,I),t=B(F,I),n=[];for(let t=0;t<e;t+=1)n.push(`<span class="calendar-day calendar-day-empty" aria-hidden="true"></span>`);for(let e=1;e<=t;e+=1){let t=R(F,I,e)||z(F,I,e),r=!!L&&L.y===F&&L.m===I&&L.d===e,i=F===N.y&&I===N.m&&e===N.d,o=[`calendar-day`];r&&o.push(`is-selected`),i&&o.push(`is-today`);let s=A?String(e):a(e);n.push(`<button type="button" class="${o.join(` `)}" data-day="${e}" ${t?`disabled`:``}>${s}</button>`)}E.innerHTML=n.join(``),E.querySelectorAll(`.calendar-day:not(.calendar-day-empty)`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.day);L={y:F,m:I,d:t};let n=W(L);S&&(S.textContent=n),x?.classList.add(`has-value`),Y(),l.onSelect?.(n)})}),D.disabled=F===N.y&&I===N.m,O.disabled=!!P&&F===P.y&&I===P.m}return x.addEventListener(`click`,()=>{C.hidden?J():Y()}),D.addEventListener(`click`,()=>{--I,I<1&&(I=12,--F),X()}),O.addEventListener(`click`,()=>{I+=1,I>12&&(I=1,F+=1),X()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!C.hidden&&Y()}),{getSelected:()=>L?W(L):null,reset:()=>{L=null,F=N.y,I=N.m,S&&(S.textContent=j),x.classList.remove(`has-value`)}}}var S=Array.from({length:24},(e,t)=>t),C=[0,15,30,45];function w(e){return String(e).padStart(2,`0`)}function T(e){return`
    <div class="time-picker" id="${e}">
      <span class="icon time-picker-icon">${r.clock}</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${e}-hour" aria-label="${l(`ساعت`,`Hour`)}">
          <option value="">${l(`ساعت`,`HH`)}</option>
          ${S.map(e=>`<option value="${e}">${a(w(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${r.chevronDown}</span>
      </div>
      <span class="time-picker-colon">:</span>
      <div class="select-wrapper time-select-wrapper">
        <select class="time-select" id="${e}-minute" aria-label="${l(`دقیقه`,`Minute`)}">
          <option value="">${l(`دقیقه`,`MM`)}</option>
          ${C.map(e=>`<option value="${e}">${a(w(e))}</option>`).join(``)}
        </select>
        <span class="icon select-chevron">${r.chevronDown}</span>
      </div>
    </div>
  `}function E(e){return a(`${w(e.hour)}:${w(e.minute)}`)}function D(e){let t=document.getElementById(`${e}-hour`),n=document.getElementById(`${e}-minute`);return!t||!n?{getSelected:()=>null,reset:()=>{}}:{getSelected:()=>t.value===``||n.value===``?null:{hour:Number(t.value),minute:Number(n.value)},reset:()=>{t.value=``,n.value=``}}}function O(e){let t=(Math.round(e/1e3)*1e3).toLocaleString(`en-US`);return`${a(t)} ${l(`تومان`,`Toman`)}`}export{x as a,T as i,E as n,b as o,D as r,O as t};