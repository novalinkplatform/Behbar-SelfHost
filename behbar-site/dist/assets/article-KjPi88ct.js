import{S as e,b as t,l as n,n as r,p as i,t as a,u as o}from"./appReady-JFOdjg2Y.js";import{C as s,D as c,E as l,S as u,T as d,_ as f,a as p,b as m,c as h,g,h as _,i as v,l as y,n as b,r as x,t as S,u as C,v as w,w as T,x as E,y as D}from"./languageMode-BQU1S8Yk.js";function O(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function k(e){if(e.type===`heading`)return`<h2>${t(e.text,e.textEn)}</h2>`;if(e.type===`paragraph`)return`<p>${t(e.text,e.textEn)}</p>`;if(e.type===`list`)return`<ul class="article-list">${t(e.items,e.itemsEn).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let n=t(e.html,e.htmlEn);return n?`<div class="article-richtext">${n}</div>`:``}if(e.type===`image`){let n=t(e.caption,e.captionEn);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let n=O(e.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${t(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function A(r){let a=r.publishedAt?n(o(new Date(r.publishedAt))):``;return`
    <article class="article-page">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <a href="/magazine">${t(`مجله`,`Magazine`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(r.title,r.titleEn)}</span>
        </nav>

        <div class="article-card">
          <span class="article-category">${t(r.category,r.categoryEn)}</span>
          <h1 class="article-title">${t(r.title,r.titleEn)}</h1>
          <p class="article-excerpt">${t(r.excerpt,r.excerptEn)}</p>

          ${r.coverImageUrl?`<img class="article-cover" src="${r.coverImageUrl}" alt="" />`:``}

          <div class="article-meta">
            <span><span class="icon">${e.calendar}</span>${a}</span>
            <span><span class="icon">${e.clock}</span>${i(r.readingTime)} ${t(`دقیقه مطالعه`,`min read`)}</span>
          </div>

          <div class="article-body">
            ${r.content.map(k).join(``)}
          </div>

          <div class="article-cta">
            <h3>${t(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${t(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${e.plusCircle}</span>
              ${t(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function j(){return`
    <div class="container article-not-found">
      <h1>${t(`مقاله پیدا نشد`,`Article not found`)}</h1>
      <p>${t(`این مقاله حذف شده یا هرگز منتشر نشده است.`,`This article was removed or never published.`)}</p>
      <a class="btn btn-primary" href="/magazine">${t(`بازگشت به مجله`,`Back to magazine`)}</a>
    </div>
  `}function M(){let e=location.pathname.match(/^\/magazine\/([a-z0-9-]+)/);return e?e[1]:``}function N(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${l(n)}
    <main id="main-content">
      ${e?A(e):j()}
    </main>
    ${T(n)}
    ${u()}
    <div class="header-quick-actions">
      ${m(n)}
      ${D(n)}
      ${w()}
    </div>
  `)}async function P(){r();let[e,t]=await Promise.all([C(M()),_()]);S(t.language_mode),y(t.theme),h(t.seo),e&&p(e),N(e,t),a(),x(t.branding),v(t.site_name),b(t.language_mode),d(t),s(t),E(),c(),f()}g(()=>void P());