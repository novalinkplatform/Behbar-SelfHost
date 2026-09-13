import{S as e,b as t,n,t as r}from"./appReady-JFOdjg2Y.js";import{C as i,D as a,E as o,S as s,T as c,_ as l,b as u,c as d,f,g as p,h as m,i as h,l as g,n as _,r as v,s as y,t as b,v as x,w as S,x as C,y as w}from"./languageMode-BQU1S8Yk.js";function T(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function E(e){if(e.type===`heading`)return`<h2>${t(e.text,e.textEn||e.text)}</h2>`;if(e.type===`paragraph`)return`<p>${t(e.text,e.textEn||e.text)}</p>`;if(e.type===`list`)return`<ul class="article-list">${t(e.items,e.itemsEn&&e.itemsEn.length?e.itemsEn:e.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let n=t(e.html,e.htmlEn||e.html);return n?`<div class="article-richtext">${n}</div>`:``}if(e.type===`image`){let n=t(e.caption,e.captionEn||e.caption);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let n=T(e.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${t(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function D(n){return`
    <article class="article-page custom-page-view">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(n.title,n.titleEn||n.title)}</span>
        </nav>

        <div class="article-card">
          <h1 class="article-title">${t(n.title,n.titleEn||n.title)}</h1>
          ${n.excerpt?`<p class="article-excerpt">${t(n.excerpt,n.excerptEn||n.excerpt)}</p>`:``}

          ${n.coverImageUrl?`<img class="article-cover" src="${n.coverImageUrl}" alt="${t(n.title,n.titleEn||n.title)}" />`:``}

          <div class="article-body">
            ${n.content.map(E).join(``)}
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
  `}function O(){return`
    <div class="container article-not-found">
      <h1>${t(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${t(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${t(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function k(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function A(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(n)}
    <main id="main-content">
      ${e?D(e):O()}
    </main>
    ${S(n)}
    ${s()}
    <div class="header-quick-actions">
      ${u(n)}
      ${w(n)}
      ${x()}
    </div>
  `)}async function j(){n();let e=k(),[t,o]=await Promise.all([e?f(e):Promise.resolve(null),m()]);b(o.language_mode),g(o.theme),d(o.seo),t&&y(t),A(t,o),r(),v(o.branding),h(o.site_name),_(o.language_mode),c(o),i(o),C(),a(),l()}p(()=>void j());