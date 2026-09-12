import{B as e,C as t,F as n,I as r,L as i,P as a,R as o,S as s,V as c,_ as l,a as u,b as d,c as f,f as p,g as m,h,i as g,l as _,n as v,r as y,s as b,t as x,v as S,x as C,y as w}from"./appReady-Dy-K2yk_.js";function T(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function E(t){if(t.type===`heading`)return`<h2>${e(t.text,t.textEn||t.text)}</h2>`;if(t.type===`paragraph`)return`<p>${e(t.text,t.textEn||t.text)}</p>`;if(t.type===`list`)return`<ul class="article-list">${e(t.items,t.itemsEn&&t.itemsEn.length?t.itemsEn:t.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(t.type===`richtext`){let n=e(t.html,t.htmlEn||t.html);return n?`<div class="article-richtext">${n}</div>`:``}if(t.type===`image`){let n=e(t.caption,t.captionEn||t.caption);return`
      <figure class="article-image">
        <img src="${t.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(t.type===`video`){let n=T(t.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${t.url}" target="_blank" rel="noopener">${e(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function D(t){return`
    <article class="article-page custom-page-view">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(t.title,t.titleEn||t.title)}</span>
        </nav>

        <div class="article-card">
          <h1 class="article-title">${e(t.title,t.titleEn||t.title)}</h1>
          ${t.excerpt?`<p class="article-excerpt">${e(t.excerpt,t.excerptEn||t.excerpt)}</p>`:``}

          ${t.coverImageUrl?`<img class="article-cover" src="${t.coverImageUrl}" alt="${e(t.title,t.titleEn||t.title)}" />`:``}

          <div class="article-body">
            ${t.content.map(E).join(``)}
          </div>

          <div class="article-cta">
            <h3>${e(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${e(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${c.plusCircle}</span>
              ${e(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function O(){return`
    <div class="container article-not-found">
      <h1>${e(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${e(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${e(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function k(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function A(r,a){let o=document.querySelector(`#app`);o&&(o.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(a)}
    <main id="main-content">
      ${r?D(r):O()}
    </main>
    ${n(a)}
    ${t()}
    <div class="header-quick-actions">
      ${C(a)}
      ${d(a)}
      ${w()}
    </div>
  `)}async function j(){m();let e=k(),[t,n]=await Promise.all([e?p(e):Promise.resolve(null),h()]);v(n.language_mode),_(n.theme),f(n.seo),t&&b(t),A(t,n),x(),g(n.branding),u(n.site_name),y(n.language_mode),r(n),a(n),s(),o(),S()}l(()=>void j());