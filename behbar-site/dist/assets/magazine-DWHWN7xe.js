import{B as e,C as t,D as n,E as r,L as i,N as a,O as o,P as s,S as c,T as l,V as u,_ as d,a as f,b as p,f as m,g as h,i as g,l as _,n as v,r as y,t as b,u as x,v as S,w as C,y as w}from"./appReady-BWGY9_tm.js";function T(t){return`${i(t.readingTime)} ${e(`دقیقه`,`min`)}`}function E(e){return e.publishedAt?a(s(new Date(e.publishedAt))):``}function D(t,n,r){return`
    <a class="magazine-card${r?` magazine-card-featured`:``}" href="/magazine/${t.slug}" style="animation-delay: ${n*90}ms">
      <div class="magazine-card-cover">
        ${t.coverImageUrl?`<img src="${t.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${u.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${e(t.category,t.categoryEn)}</span>
        <h2 class="magazine-card-title">${e(t.title,t.titleEn)}</h2>
        <p class="magazine-card-excerpt">${e(t.excerpt,t.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${u.calendar}</span>${E(t)}</span>
          <span><span class="icon">${u.clock}</span>${T(t)}</span>
        </div>
        <span class="magazine-card-more">
          ${e(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${u.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function O(t){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${e(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${t.length?t.map((e,n)=>D(e,n,t.length>1&&n===0)).join(``):`<p class="magazine-empty">${e(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function k(n,r){let i=document.querySelector(`#app`);i&&(i.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${l(r)}
    <main id="main-content">
      ${O(n)}
    </main>
    ${t(r)}
    ${w()}
    ${o(r)}
  `)}async function A(){p();let[e,t]=await Promise.all([m(),h()]);v(t.language_mode),x(t.theme),_(t.seo),k(e,t),b(),g(t.branding),f(t.site_name),y(t.language_mode),C(t),c(t),S(),r(),n(t)}d(()=>void A());