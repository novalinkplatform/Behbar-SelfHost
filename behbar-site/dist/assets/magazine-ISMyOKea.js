import{C as e,l as t,n,p as r,t as i,u as a,x as o}from"./appReady-giJ54-6J.js";import{C as s,S as c,T as l,_ as u,b as d,c as f,d as p,g as m,h,i as g,l as _,n as v,r as y,t as b,v as x,w as S,x as C,y as w}from"./languageMode-CjuVnjFU.js";function T(e){return`${r(e.readingTime)} ${o(`دقیقه`,`min`)}`}function E(e){return e.publishedAt?t(a(new Date(e.publishedAt))):``}function D(t,n,r){return`
    <a class="magazine-card${r?` magazine-card-featured`:``}" href="/magazine/${t.slug}" style="animation-delay: ${n*90}ms">
      <div class="magazine-card-cover">
        ${t.coverImageUrl?`<img src="${t.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${e.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${o(t.category,t.categoryEn)}</span>
        <h2 class="magazine-card-title">${o(t.title,t.titleEn)}</h2>
        <p class="magazine-card-excerpt">${o(t.excerpt,t.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${e.calendar}</span>${E(t)}</span>
          <span><span class="icon">${e.clock}</span>${T(t)}</span>
        </div>
        <span class="magazine-card-more">
          ${o(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${e.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function O(e){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${o(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${o(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${o(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${o(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${e.length?e.map((t,n)=>D(t,n,e.length>1&&n===0)).join(``):`<p class="magazine-empty">${o(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function k(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${o(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${c(t)}
    <main id="main-content">
      ${O(e)}
    </main>
    ${d(t)}
    ${x()}
    ${l(t)}
  `)}async function A(){n();let[e,t]=await Promise.all([p(),h()]);b(t.language_mode),_(t.theme),f(t.seo),k(e,t),i(),y(t.branding),g(t.site_name),v(t.language_mode),C(t),w(t),u(),s(),S(t)}m(()=>void A());