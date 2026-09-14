import{C as e,n as t,t as n,x as r}from"./appReady-giJ54-6J.js";import{C as i,S as a,T as o,_ as s,b as c,c as l,f as u,g as d,h as f,i as p,l as m,n as h,r as g,s as _,t as v,v as y,w as b,x,y as S}from"./languageMode-CjuVnjFU.js";function C(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function w(e){if(e.type===`heading`)return`<h2>${r(e.text,e.textEn||e.text)}</h2>`;if(e.type===`paragraph`)return`<p>${r(e.text,e.textEn||e.text)}</p>`;if(e.type===`list`)return`<ul class="article-list">${r(e.items,e.itemsEn&&e.itemsEn.length?e.itemsEn:e.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let t=r(e.html,e.htmlEn||e.html);return t?`<div class="article-richtext">${t}</div>`:``}if(e.type===`image`){let t=r(e.caption,e.captionEn||e.caption);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${t}" loading="lazy" />
        ${t?`<figcaption>${t}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let t=C(e.url);return t?`<div class="article-video"><iframe src="${t}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${r(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function T(t){return`
    <article class="article-page custom-page-view">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${r(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${r(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${r(t.title,t.titleEn||t.title)}</span>
        </nav>

        <div class="article-card">
          <h1 class="article-title">${r(t.title,t.titleEn||t.title)}</h1>
          ${t.excerpt?`<p class="article-excerpt">${r(t.excerpt,t.excerptEn||t.excerpt)}</p>`:``}

          ${t.coverImageUrl?`<img class="article-cover" src="${t.coverImageUrl}" alt="${r(t.title,t.titleEn||t.title)}" />`:``}

          <div class="article-body">
            ${t.content.map(w).join(``)}
          </div>

          <div class="article-cta">
            <h3>${r(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${r(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${e.plusCircle}</span>
              ${r(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function E(){return`
    <div class="container article-not-found">
      <h1>${r(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${r(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${r(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function D(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function O(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${r(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(t)}
    <main id="main-content">
      ${e?T(e):E()}
    </main>
    ${c(t)}
    ${y()}
    ${o(t)}
  `)}async function k(){t();let e=D(),[r,a]=await Promise.all([e?u(e):Promise.resolve(null),f()]);v(a.language_mode),m(a.theme),l(a.seo),r&&_(r),O(r,a),n(),g(a.branding),p(a.site_name),h(a.language_mode),x(a),S(a),s(),i(),b(a)}d(()=>void k());