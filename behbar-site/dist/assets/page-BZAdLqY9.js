import{B as e,C as t,D as n,E as r,O as i,S as a,T as o,V as s,_ as c,a as l,b as u,c as d,g as f,i as p,l as m,n as h,p as g,r as _,t as v,u as y,v as b,w as x,y as S}from"./appReady-BWGY9_tm.js";function C(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function w(t){if(t.type===`heading`)return`<h2>${e(t.text,t.textEn||t.text)}</h2>`;if(t.type===`paragraph`)return`<p>${e(t.text,t.textEn||t.text)}</p>`;if(t.type===`list`)return`<ul class="article-list">${e(t.items,t.itemsEn&&t.itemsEn.length?t.itemsEn:t.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(t.type===`richtext`){let n=e(t.html,t.htmlEn||t.html);return n?`<div class="article-richtext">${n}</div>`:``}if(t.type===`image`){let n=e(t.caption,t.captionEn||t.caption);return`
      <figure class="article-image">
        <img src="${t.url}" alt="${n}" loading="lazy" />
        ${n?`<figcaption>${n}</figcaption>`:``}
      </figure>
    `}if(t.type===`video`){let n=C(t.url);return n?`<div class="article-video"><iframe src="${n}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${t.url}" target="_blank" rel="noopener">${e(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function T(t){return`
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
            ${t.content.map(w).join(``)}
          </div>

          <div class="article-cta">
            <h3>${e(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${e(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${s.plusCircle}</span>
              ${e(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function E(){return`
    <div class="container article-not-found">
      <h1>${e(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${e(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${e(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function D(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function O(n,r){let a=document.querySelector(`#app`);a&&(a.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(r)}
    <main id="main-content">
      ${n?T(n):E()}
    </main>
    ${t(r)}
    ${S()}
    ${i(r)}
  `)}async function k(){u();let e=D(),[t,i]=await Promise.all([e?g(e):Promise.resolve(null),f()]);h(i.language_mode),y(i.theme),m(i.seo),t&&d(t),O(t,i),v(),p(i.branding),l(i.site_name),_(i.language_mode),x(i),a(i),b(),r(),n(i)}c(()=>void k());