import{S as e,b as t,c as n,f as r,l as i,n as a,t as o}from"./appReady-D0myfZwC.js";import{C as s,S as c,T as l,_ as u,a as d,b as f,c as p,g as m,h,i as g,l as _,n as v,r as y,t as b,u as x,v as S,w as C,x as w,y as T}from"./languageMode-COrdPCfF.js";function E(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function D(e){if(e.type===`heading`)return`<h2>${t(e.text,e.textEn)}</h2>`;if(e.type===`paragraph`)return`<p>${t(e.text,e.textEn)}</p>`;if(e.type===`list`)return`<ul class="article-list">${t(e.items,e.itemsEn).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let n=t(e.html,e.htmlEn);return n?`<div class="article-richtext">${n}</div>`:``}if(e.type===`image`){let n=t(e.caption,e.captionEn);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let n=E(e.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${t(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function O(a){let o=a.publishedAt?n(i(new Date(a.publishedAt))):``;return`
    <article class="article-page">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <a href="/magazine">${t(`مجله`,`Magazine`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(a.title,a.titleEn)}</span>
        </nav>

        <div class="article-card">
          <span class="article-category">${t(a.category,a.categoryEn)}</span>
          <h1 class="article-title">${t(a.title,a.titleEn)}</h1>
          <p class="article-excerpt">${t(a.excerpt,a.excerptEn)}</p>

          ${a.coverImageUrl?`<img class="article-cover" src="${a.coverImageUrl}" alt="" />`:``}

          <div class="article-meta">
            <span><span class="icon">${e.calendar}</span>${o}</span>
            <span><span class="icon">${e.clock}</span>${r(a.readingTime)} ${t(`دقیقه مطالعه`,`min read`)}</span>
          </div>

          <div class="article-body">
            ${a.content.map(D).join(``)}
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
  `}function k(){return`
    <div class="container article-not-found">
      <h1>${t(`مقاله پیدا نشد`,`Article not found`)}</h1>
      <p>${t(`این مقاله حذف شده یا هرگز منتشر نشده است.`,`This article was removed or never published.`)}</p>
      <a class="btn btn-primary" href="/magazine">${t(`بازگشت به مجله`,`Back to magazine`)}</a>
    </div>
  `}function A(){let e=location.pathname.match(/^\/magazine\/([a-z0-9-]+)/);return e?e[1]:``}function j(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${c(n)}
    <main id="main-content">
      ${e?O(e):k()}
    </main>
    ${f(n)}
    ${S()}
    ${l(n)}
  `)}async function M(){a();let[e,t]=await Promise.all([x(A()),h()]);b(t.language_mode),_(t.theme),p(t.seo),e&&d(e),j(e,t),o(),y(t.branding),g(t.site_name),v(t.language_mode),w(t),T(t),u(),s(),C(t)}m(()=>void M());