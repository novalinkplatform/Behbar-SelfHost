import{S as e,b as t,n,t as r}from"./appReady-D0myfZwC.js";import{C as i,S as a,T as o,_ as s,b as c,c as l,f as u,g as d,h as f,i as p,l as m,n as h,r as g,s as _,t as v,v as y,w as b,x,y as S}from"./languageMode-COrdPCfF.js";function C(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function w(e){if(e.type===`heading`)return`<h2>${t(e.text,e.textEn||e.text)}</h2>`;if(e.type===`paragraph`)return`<p>${t(e.text,e.textEn||e.text)}</p>`;if(e.type===`list`)return`<ul class="article-list">${t(e.items,e.itemsEn&&e.itemsEn.length?e.itemsEn:e.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let n=t(e.html,e.htmlEn||e.html);return n?`<div class="article-richtext">${n}</div>`:``}if(e.type===`image`){let n=t(e.caption,e.captionEn||e.caption);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let n=C(e.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${t(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function T(n){return`
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
            ${n.content.map(w).join(``)}
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
  `}function E(){return`
    <div class="container article-not-found">
      <h1>${t(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${t(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${t(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function D(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function O(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(n)}
    <main id="main-content">
      ${e?T(e):E()}
    </main>
    ${c(n)}
    ${y()}
    ${o(n)}
  `)}async function k(){n();let e=D(),[t,a]=await Promise.all([e?u(e):Promise.resolve(null),f()]);v(a.language_mode),m(a.theme),l(a.seo),t&&_(t),O(t,a),r(),g(a.branding),p(a.site_name),h(a.language_mode),x(a),S(a),s(),i(),b(a)}d(()=>void k());