import{C as e,l as t,n,p as r,t as i,u as a,x as o}from"./appReady-giJ54-6J.js";import{C as s,S as c,T as l,_ as u,a as d,b as f,c as p,g as m,h,i as g,l as _,n as v,r as y,t as b,u as x,v as S,w as C,x as w,y as T}from"./languageMode-CjuVnjFU.js";function E(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function D(e){if(e.type===`heading`)return`<h2>${o(e.text,e.textEn)}</h2>`;if(e.type===`paragraph`)return`<p>${o(e.text,e.textEn)}</p>`;if(e.type===`list`)return`<ul class="article-list">${o(e.items,e.itemsEn).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let t=o(e.html,e.htmlEn);return t?`<div class="article-richtext">${t}</div>`:``}if(e.type===`image`){let t=o(e.caption,e.captionEn);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${t}" loading="lazy" />
        ${t?`<figcaption>${t}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let t=E(e.url);return t?`<div class="article-video"><iframe src="${t}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${o(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function O(n){let i=n.publishedAt?t(a(new Date(n.publishedAt))):``;return`
    <article class="article-page">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${o(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${o(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <a href="/magazine">${o(`مجله`,`Magazine`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${o(n.title,n.titleEn)}</span>
        </nav>

        <div class="article-card">
          <span class="article-category">${o(n.category,n.categoryEn)}</span>
          <h1 class="article-title">${o(n.title,n.titleEn)}</h1>
          <p class="article-excerpt">${o(n.excerpt,n.excerptEn)}</p>

          ${n.coverImageUrl?`<img class="article-cover" src="${n.coverImageUrl}" alt="" />`:``}

          <div class="article-meta">
            <span><span class="icon">${e.calendar}</span>${i}</span>
            <span><span class="icon">${e.clock}</span>${r(n.readingTime)} ${o(`دقیقه مطالعه`,`min read`)}</span>
          </div>

          <div class="article-body">
            ${n.content.map(D).join(``)}
          </div>

          <div class="article-cta">
            <h3>${o(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${o(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${e.plusCircle}</span>
              ${o(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function k(){return`
    <div class="container article-not-found">
      <h1>${o(`مقاله پیدا نشد`,`Article not found`)}</h1>
      <p>${o(`این مقاله حذف شده یا هرگز منتشر نشده است.`,`This article was removed or never published.`)}</p>
      <a class="btn btn-primary" href="/magazine">${o(`بازگشت به مجله`,`Back to magazine`)}</a>
    </div>
  `}function A(){let e=location.pathname.match(/^\/magazine\/([a-z0-9-]+)/);return e?e[1]:``}function j(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${o(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${c(t)}
    <main id="main-content">
      ${e?O(e):k()}
    </main>
    ${f(t)}
    ${S()}
    ${l(t)}
  `)}async function M(){n();let[e,t]=await Promise.all([x(A()),h()]);b(t.language_mode),_(t.theme),p(t.seo),e&&d(e),j(e,t),i(),y(t.branding),g(t.site_name),v(t.language_mode),w(t),T(t),u(),s(),C(t)}m(()=>void M());