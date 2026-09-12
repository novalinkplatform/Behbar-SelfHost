import{A as e,C as t,F as n,H as r,I as i,L as a,N as o,R as s,S as c,V as l,_ as u,a as d,b as f,d as p,g as m,i as h,k as g,l as _,n as v,o as y,r as b,t as x,u as S,v as C,w,x as T,y as E,z as D}from"./appReady-CnRz7xfg.js";function O(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function k(e){if(e.type===`heading`)return`<h2>${l(e.text,e.textEn)}</h2>`;if(e.type===`paragraph`)return`<p>${l(e.text,e.textEn)}</p>`;if(e.type===`list`)return`<ul class="article-list">${l(e.items,e.itemsEn).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let t=l(e.html,e.htmlEn);return t?`<div class="article-richtext">${t}</div>`:``}if(e.type===`image`){let t=l(e.caption,e.captionEn);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${t}" loading="lazy" />
        ${t?`<figcaption>${t}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let t=O(e.url);return t?`<div class="article-video"><iframe src="${t}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${l(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function A(t){let n=t.publishedAt?g(e(new Date(t.publishedAt))):``;return`
    <article class="article-page">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${l(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${l(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <a href="/magazine">${l(`مجله`,`Magazine`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${l(t.title,t.titleEn)}</span>
        </nav>

        <div class="article-card">
          <span class="article-category">${l(t.category,t.categoryEn)}</span>
          <h1 class="article-title">${l(t.title,t.titleEn)}</h1>
          <p class="article-excerpt">${l(t.excerpt,t.excerptEn)}</p>

          ${t.coverImageUrl?`<img class="article-cover" src="${t.coverImageUrl}" alt="" />`:``}

          <div class="article-meta">
            <span><span class="icon">${r.calendar}</span>${n}</span>
            <span><span class="icon">${r.clock}</span>${o(t.readingTime)} ${l(`دقیقه مطالعه`,`min read`)}</span>
          </div>

          <div class="article-body">
            ${t.content.map(k).join(``)}
          </div>

          <div class="article-cta">
            <h3>${l(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${l(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${r.plusCircle}</span>
              ${l(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function j(){return`
    <div class="container article-not-found">
      <h1>${l(`مقاله پیدا نشد`,`Article not found`)}</h1>
      <p>${l(`این مقاله حذف شده یا هرگز منتشر نشده است.`,`This article was removed or never published.`)}</p>
      <a class="btn btn-primary" href="/magazine">${l(`بازگشت به مجله`,`Back to magazine`)}</a>
    </div>
  `}function M(){let e=location.pathname.match(/^\/magazine\/([a-z0-9-]+)/);return e?e[1]:``}function N(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${l(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(t)}
    <main id="main-content">
      ${e?A(e):j()}
    </main>
    ${i(t)}
    ${w()}
    <div class="header-quick-actions">
      ${c(t)}
      ${T(t)}
      ${f()}
    </div>
  `)}async function P(){u();let[e,r]=await Promise.all([p(M()),m()]);v(r.language_mode),S(r.theme),_(r.seo),e&&y(e),N(e,r),x(),h(r.branding),d(r.site_name),b(r.language_mode),a(r),n(r),t(),D(),E()}C(()=>void P());