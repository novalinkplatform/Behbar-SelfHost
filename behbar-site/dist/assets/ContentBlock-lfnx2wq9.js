import{S as e,b as t,f as n,m as r}from"./appReady-u0XdWzsQ.js";function i(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function a(e,n,r){return i(t(e.heading||n,e.headingEn||e.heading||r))}function o(e){let n=t(e.subheading??``,e.subheadingEn??e.subheading??``);return n?`<p class="section-description">${i(n)}</p>`:``}function s(e){return i(t(e.title??``,e.titleEn??e.title??``))}function c(e){return i(t(e.text??``,e.textEn??e.text??``))}function l(e,t){if(e.videoUrl){let n=/\.(mp4|webm|ogg)(\?|$)/i.test(e.videoUrl),r=i(e.videoUrl);return n?`<video class="${t}" src="${r}" controls preload="metadata"></video>`:`<iframe class="${t}" src="${r}" loading="lazy" allowfullscreen></iframe>`}return e.imageUrl?`<img class="${t}" src="${i(e.imageUrl)}" alt="" loading="lazy" />`:``}function u(e,t){return`
    <li class="step-card" style="animation-delay: ${t*120}ms">
      <span class="step-number">${n(t+1)}</span>
      <h3>${s(e)}</h3>
      <p>${c(e)}</p>
    </li>
  `}function d(e){return`
    <ol class="steps-grid">
      ${(e.items??[]).map(u).join(``)}
    </ol>
  `}function f(e,t){return`
    <div class="stat-card" style="animation-delay: ${t*120}ms">
      <span class="stat-number">${s(e)}</span>
      <span class="stat-label">${c(e)}</span>
    </div>
  `}function p(e){return`
    <div class="stats-grid">
      ${(e.items??[]).map(f).join(``)}
    </div>
  `}function m(t,n,r){let i=`${t.id}-trigger-${r}`,a=`${t.id}-panel-${r}`;return`
    <li class="faq-item">
      <h3 class="faq-question">
        <button type="button" class="faq-trigger" id="${i}" aria-expanded="false" aria-controls="${a}">
          <span>${s(n)}</span>
          <span class="icon faq-trigger-icon">${e.chevronDown}</span>
        </button>
      </h3>
      <div class="faq-panel" id="${a}" role="region" aria-labelledby="${i}" hidden>
        <p>${c(n)}</p>
      </div>
    </li>
  `}function h(e){return`
    <ul class="faq-list">
      ${(e.items??[]).map((t,n)=>m(e,t,n)).join(``)}
    </ul>
  `}function g(){document.querySelectorAll(`.faq-list`).forEach(e=>{let t=Array.from(e.querySelectorAll(`.faq-trigger`));t.forEach(e=>{e.addEventListener(`click`,()=>{let n=e.getAttribute(`aria-controls`),r=n?document.getElementById(n):null;if(!r)return;let i=e.getAttribute(`aria-expanded`)===`true`;t.forEach(t=>{if(t===e)return;let n=t.getAttribute(`aria-controls`),r=n?document.getElementById(n):null;t.setAttribute(`aria-expanded`,`false`),r&&(r.hidden=!0),t.closest(`.faq-item`)?.classList.remove(`is-open`)}),e.setAttribute(`aria-expanded`,String(!i)),r.hidden=i,e.closest(`.faq-item`)?.classList.toggle(`is-open`,!i)})})});let e=document.getElementById(`testimonial-submit-toggle`),t=document.getElementById(`testimonial-submit-form`);e&&t&&(e.addEventListener(`click`,()=>{t.hidden=!t.hidden}),t.addEventListener(`submit`,e=>{e.preventDefault(),_(t)}))}async function _(e){let n=document.getElementById(`testimonial-submit-name`),i=document.getElementById(`testimonial-submit-rating`),a=document.getElementById(`testimonial-submit-text`),o=document.getElementById(`testimonial-submit-btn`),s=document.getElementById(`testimonial-submit-message`),c=n.value.trim(),l=a.value.trim();if(!(!c||!l)){o.disabled=!0,s.hidden=!0;try{let n=await fetch(`${r}/api/testimonials`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({customerName:c,text:l,rating:Number(i.value)})}),a=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof a?.error==`string`?a.error:t(`ثبت نظر ناموفق بود.`,`Failed to submit your review.`));e.reset(),document.getElementById(`testimonial-submit-fields`).setAttribute(`hidden`,``),s.textContent=t(`با تشکر از شما؛ نظرتان پس از بررسی نمایش داده می‌شود.`,`Thanks! Your review will appear after being reviewed.`),s.hidden=!1}catch(e){s.textContent=e instanceof Error?e.message:t(`خطایی پیش آمد.`,`Something went wrong.`),s.hidden=!1}finally{o.disabled=!1}}}function v(t,n){let r=t.imageUrl?`<img src="${i(t.imageUrl)}" alt="" loading="lazy" />`:e.checkCircle,a=c(t);return`
    <li class="trust-item" style="animation-delay: ${n*90}ms">
      <span class="trust-icon">${r}</span>
      <span class="trust-label">${s(t)}</span>
      ${a?`<span class="trust-desc">${a}</span>`:``}
    </li>
  `}function y(e){return`
    <ul class="trust-grid">
      ${(e.items??[]).map(v).join(``)}
    </ul>
  `}function b(e){let n=l(e,`content-slide-media`),r=s(e),a=c(e);return`
    <li class="content-slide">
      ${n}
      ${r||a||e.linkUrl?`
        <div class="content-slide-body">
          ${r?`<h3>${r}</h3>`:``}
          ${a?`<p>${a}</p>`:``}
          ${e.linkUrl?`<a class="content-slide-link" href="${i(e.linkUrl)}">${t(`بیشتر بدانید`,`Learn more`)}</a>`:``}
        </div>
      `:``}
    </li>
  `}function x(e){return`
    <ul class="content-slider-track">
      ${(e.items??[]).map(b).join(``)}
    </ul>
  `}function S(e){return e.trim().slice(0,1)||`؟`}function C(e){let t=s(e);return`
    <li class="testimonial-card">
      <p class="testimonial-text">${c(e)}</p>
      ${t?`
        <div class="testimonial-author">
          <span class="testimonial-avatar">
            ${e.imageUrl?`<img src="${i(e.imageUrl)}" alt="" loading="lazy" />`:`<span>${S(t)}</span>`}
          </span>
          <span class="testimonial-name">${t}</span>
        </div>
      `:``}
    </li>
  `}function w(e){let t=e.items??[];return`
    <div class="testimonials-viewport">
      <ul class="testimonials-track" style="--testimonial-count:${t.length}">
        ${t.map(C).join(``)}
      </ul>
    </div>
  `}function T(e){return e.trim().slice(0,1)||`؟`}function E(e){return Array.from({length:5},(t,n)=>n<e?`★`:`☆`).join(``)}function D(e){let n=i(t(e.customerName,e.customerNameEn||e.customerName)),r=i(t(e.text,e.textEn||e.text));return`
    <li class="testimonial-card">
      <p class="testimonial-stars" aria-hidden="true">${E(e.rating)}</p>
      <p class="testimonial-text">${r}</p>
      <div class="testimonial-author">
        <span class="testimonial-avatar">
          ${e.avatarUrl?`<img src="${i(e.avatarUrl)}" alt="" loading="lazy" />`:`<span>${T(n)}</span>`}
        </span>
        <span class="testimonial-name">${n}</span>
      </div>
    </li>
  `}function O(e){if(!e.length)return``;let t=[...e,...e];return`
    <div class="testimonials-viewport">
      <ul class="testimonials-track" style="--testimonial-count:${e.length}">
        ${t.map(D).join(``)}
      </ul>
    </div>
  `}function k(){return`
    <div class="testimonial-submit-cta container">
      <button type="button" class="btn btn-secondary" id="testimonial-submit-toggle">
        ${t(`ثبت نظر شما`,`Write a review`)}
      </button>
      <form class="testimonial-submit-form" id="testimonial-submit-form" hidden>
        <div class="testimonial-submit-fields" id="testimonial-submit-fields">
          <div class="form-field">
            <label for="testimonial-submit-name">${t(`نام شما`,`Your name`)}</label>
            <input type="text" id="testimonial-submit-name" maxlength="80" required />
          </div>
          <div class="form-field">
            <label for="testimonial-submit-rating">${t(`امتیاز`,`Rating`)}</label>
            <select id="testimonial-submit-rating">
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
          <div class="form-field">
            <label for="testimonial-submit-text">${t(`متن نظر`,`Your review`)}</label>
            <textarea id="testimonial-submit-text" maxlength="1000" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" id="testimonial-submit-btn">${t(`ارسال`,`Submit`)}</button>
        </div>
        <p class="testimonial-submit-message" id="testimonial-submit-message" hidden></p>
      </form>
    </div>
  `}function A(e){let n=t(e.body??``,e.bodyEn??e.body??``);return n?`<div class="rich-text-body">${n.split(`
`).filter(Boolean).map(e=>`<p>${i(e)}</p>`).join(``)}</div>`:``}var j={steps:[``,``],accordion:[``,``],grid:[``,``],slider:[``,``],quote:[``,``],testimonials:[`نظرات مشتریان ما`,`What our customers say`],stats:[``,``],text:[``,``]};function M(e,t){let n=e.layout??`text`;if(n===`testimonials`&&!t.length)return``;let[r,i]=j[n]??[``,``],s=a(e,r,i),c=``;switch(n){case`steps`:c=d(e);break;case`accordion`:c=h(e);break;case`grid`:c=y(e);break;case`slider`:c=x(e);break;case`quote`:c=w(e);break;case`testimonials`:c=O(t);break;case`stats`:c=p(e);break;default:c=A(e)}if(!s&&!c)return``;let l=n===`slider`||n===`quote`||n===`testimonials`;return`
    <section class="section content-block content-block-${n}" id="${e.id}">
      <div class="container">
        ${s?`<div class="section-header"><h2>${s}</h2>${o(e)}</div>`:``}
        ${l?``:c}
      </div>
      ${l?c:``}
      ${n===`testimonials`?k():``}
    </section>
  `}export{M as n,g as t};