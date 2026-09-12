import{C as e,F as t,H as n,I as r,L as i,R as a,S as o,V as s,_ as c,a as l,b as u,c as d,g as f,i as p,l as m,n as h,p as g,r as _,t as v,u as y,v as b,w as x,x as S,y as C,z as w}from"./appReady-jYOMNzjt.js";function T(e){try{let t=new URL(e);if(t.hostname.includes(`youtube.com`)){let e=t.searchParams.get(`v`);return e?`https://www.youtube.com/embed/${e}`:null}return t.hostname===`youtu.be`?`https://www.youtube.com/embed/${t.pathname.slice(1)}`:t.hostname.includes(`aparat.com`)&&e.replace(`/v/`,`/video/embed/videohash/`).includes(`embed`)?e:null}catch{return null}}function E(e){if(e.type===`heading`)return`<h2>${s(e.text,e.textEn||e.text)}</h2>`;if(e.type===`paragraph`)return`<p>${s(e.text,e.textEn||e.text)}</p>`;if(e.type===`list`)return`<ul class="article-list">${s(e.items,e.itemsEn&&e.itemsEn.length?e.itemsEn:e.items).map(e=>`<li>${e}</li>`).join(``)}</ul>`;if(e.type===`richtext`){let t=s(e.html,e.htmlEn||e.html);return t?`<div class="article-richtext">${t}</div>`:``}if(e.type===`image`){let t=s(e.caption,e.captionEn||e.caption);return`
      <figure class="article-image">
        <img src="${e.url}" alt="${t}" loading="lazy" />
        ${t?`<figcaption>${t}</figcaption>`:``}
      </figure>
    `}if(e.type===`video`){let t=T(e.url);return t?`<div class="article-video"><iframe src="${t}" title="video" allowfullscreen loading="lazy"></iframe></div>`:`<p class="article-video-link"><a href="${e.url}" target="_blank" rel="noopener">${s(`مشاهده ویدئو`,`Watch video`)}</a></p>`}return``}function D(e){return`
    <article class="article-page custom-page-view">
      <div class="container article-container">
        <nav class="article-breadcrumb" aria-label="${s(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${s(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${s(e.title,e.titleEn||e.title)}</span>
        </nav>

        <div class="article-card">
          <h1 class="article-title">${s(e.title,e.titleEn||e.title)}</h1>
          ${e.excerpt?`<p class="article-excerpt">${s(e.excerpt,e.excerptEn||e.excerpt)}</p>`:``}

          ${e.coverImageUrl?`<img class="article-cover" src="${e.coverImageUrl}" alt="${s(e.title,e.titleEn||e.title)}" />`:``}

          <div class="article-body">
            ${e.content.map(E).join(``)}
          </div>

          <div class="article-cta">
            <h3>${s(`آماده جابه‌جایی هستید؟`,`Ready to move?`)}</h3>
            <p>${s(`مبدأ و مقصد را روی نقشه مشخص کنید و در چند دقیقه یک برآورد هزینه شفاف دریافت کنید.`,`Pinpoint the origin and destination on the map and get a transparent cost estimate in minutes.`)}</p>
            <a class="btn btn-primary" href="/#request">
              <span class="icon">${n.plusCircle}</span>
              ${s(`ثبت درخواست در بهبار`,`Submit a request on Behbar`)}
            </a>
          </div>
        </div>
      </div>
    </article>
  `}function O(){return`
    <div class="container article-not-found">
      <h1>${s(`برگه پیدا نشد`,`Page not found`)}</h1>
      <p>${s(`این برگه وجود ندارد یا هنوز منتشر نشده است.`,`This page does not exist or has not been published yet.`)}</p>
      <a class="btn btn-primary" href="/">${s(`بازگشت به صفحه اصلی`,`Back to homepage`)}</a>
    </div>
  `}function k(){let e=location.pathname.match(/^\/(?:p|page)\/([^/?#]+)/);if(e)return decodeURIComponent(e[1]);let t=new URLSearchParams(location.search).get(`slug`);return t?decodeURIComponent(t):``}function A(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${s(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(t)}
    <main id="main-content">
      ${e?D(e):O()}
    </main>
    ${r(t)}
    ${x()}
    <div class="header-quick-actions">
      ${o(t)}
      ${S(t)}
      ${u()}
    </div>
  `)}async function j(){c();let n=k(),[r,a]=await Promise.all([n?g(n):Promise.resolve(null),f()]);h(a.language_mode),y(a.theme),m(a.seo),r&&d(r),A(r,a),v(),p(a.branding),l(a.site_name),_(a.language_mode),i(a),t(a),e(),w(),C()}b(()=>void j());