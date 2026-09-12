import{B as e,C as t,F as n,I as r,L as i,M as a,O as o,P as s,R as c,S as l,V as u,_ as d,a as f,b as p,c as m,g as h,h as g,i as _,k as v,l as y,n as b,o as x,r as S,t as C,u as w,v as T,x as E,y as D}from"./appReady-DNSS-HAw.js";function O(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function k(t){if(t.type===`heading`)return`<h2>${e(t.text,t.textEn)}</h2>`;if(t.type===`paragraph`)return`<p>${e(t.text,t.textEn)}</p>`;if(t.type===`list`)return`<ul class="article-list">${e(t.items,t.itemsEn).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(t.type===`richtext`){let n=e(t.html,t.htmlEn);return n?`<div class="article-richtext">${n}</div>`:``}if(t.type===`image`){let n=e(t.caption,t.captionEn);return`
      <figure class="article-image">
        <img src="${t.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(t.type===`video`){let n=O(t.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${t.url}" target="_blank" rel="noopener">${e(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function A(t){let n=t.publishedAt?o(v(new Date(t.publishedAt))):``;return`
    <article class="article-page">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <a href="/magazine">${e(`مجله`,`Magazine`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(t.title,t.titleEn)}</span>
        </nav>

        <div class="article-card">
          <span class="article-category">${e(t.category,t.categoryEn)}</span>
          <h1 class="article-title">${e(t.title,t.titleEn)}</h1>
          <p class="article-excerpt">${e(t.excerpt,t.excerptEn)}</p>

          ${t.coverImageUrl?`<img class="article-cover" src="${t.coverImageUrl}" alt="" />`:``}

          <div class="article-meta">
            <span><span class="icon">${u.calendar}</span>${n}</span>
            <span><span class="icon">${u.clock}</span>${a(t.readingTime)} ${e(`دقیقه مطالعه`,`min read`)}</span>
          </div>

          <div class="article-body">
            ${t.content.map(k).join(``)}
          </div>

          <div class="article-cta">
            <h3>${e(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${e(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${u.plusCircle}</span>
              ${e(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function j(){return`
    <div class="container article-not-found">
      <h1>${e(`مقاله پیدا نشد`,`Article not found`)}</h1>
      <p>${e(`این مقاله حذف شده یا هرگز منتشر نشده است.`,`This article was removed or never published.`)}</p>
      <a class="btn btn-primary" href="/magazine">${e(`بازگشت به مجله`,`Back to magazine`)}</a>
    </div>
  `}function M(){let e=location.pathname.match(/^\/magazine\/([a-z0-9-]+)/);return e?e[1]:``}function N(r,a){let o=document.querySelector(`#app`);o&&(o.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(a)}
    <main id="main-content">
      ${r?A(r):j()}
    </main>
    ${n(a)}
    ${t()}
    <div class="header-quick-actions">
      ${E(a)}
      ${p(a)}
      ${D()}
    </div>
  `)}async function P(){h();let[e,t]=await Promise.all([w(M()),g()]);b(t.language_mode),y(t.theme),m(t.seo),e&&x(e),N(e,t),C(),_(t.branding),f(t.site_name),S(t.language_mode),r(t),s(t),l(),c(),T()}d(()=>void P());