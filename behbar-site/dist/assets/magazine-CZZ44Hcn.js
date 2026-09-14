import{S as e,b as t,c as n,f as r,l as i,n as a,t as o}from"./appReady-DVpveje2.js";import{C as s,S as c,T as l,_ as u,b as d,c as f,d as p,g as m,h,i as g,l as _,n as v,r as y,t as b,v as x,w as S,x as C,y as w}from"./languageMode-MHBiRO0M.js";function T(e){return`${r(e.readingTime)} ${t(`دقیقه`,`min`)}`}function E(e){return e.publishedAt?n(i(new Date(e.publishedAt))):``}function D(n,r,i){return`
    <a class="magazine-card${i?` magazine-card-featured`:``}" href="/magazine/${n.slug}" style="animation-delay: ${r*90}ms">
      <div class="magazine-card-cover">
        ${n.coverImageUrl?`<img src="${n.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${e.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${t(n.category,n.categoryEn)}</span>
        <h2 class="magazine-card-title">${t(n.title,n.titleEn)}</h2>
        <p class="magazine-card-excerpt">${t(n.excerpt,n.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${e.calendar}</span>${E(n)}</span>
          <span><span class="icon">${e.clock}</span>${T(n)}</span>
        </div>
        <span class="magazine-card-more">
          ${t(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${e.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function O(e){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${t(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${e.length?e.map((t,n)=>D(t,n,e.length>1&&n===0)).join(``):`<p class="magazine-empty">${t(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function k(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${c(n)}
    <main id="main-content">
      ${O(e)}
    </main>
    ${d(n)}
    ${x()}
    ${l(n)}
  `)}async function A(){a();let[e,t]=await Promise.all([p(),h()]);b(t.language_mode),_(t.theme),f(t.seo),k(e,t),o(),y(t.branding),g(t.site_name),v(t.language_mode),C(t),w(t),u(),s(),S(t)}m(()=>void A());