import{B as e,C as t,F as n,I as r,L as i,M as a,O as o,P as s,R as c,S as l,V as u,_ as d,a as f,b as p,c as m,d as h,g,h as _,i as v,k as y,l as b,n as x,r as S,t as C,v as w,x as T,y as E}from"./appReady-Dy-K2yk_.js";function D(t){return`${a(t.readingTime)} ${e(`دقیقه`,`min`)}`}function O(e){return e.publishedAt?o(y(new Date(e.publishedAt))):``}function k(t,n,r){return`
    <a class="magazine-card${r?` magazine-card-featured`:``}" href="/magazine/${t.slug}" style="animation-delay: ${n*90}ms">
      <div class="magazine-card-cover">
        ${t.coverImageUrl?`<img src="${t.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${u.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${e(t.category,t.categoryEn)}</span>
        <h2 class="magazine-card-title">${e(t.title,t.titleEn)}</h2>
        <p class="magazine-card-excerpt">${e(t.excerpt,t.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${u.calendar}</span>${O(t)}</span>
          <span><span class="icon">${u.clock}</span>${D(t)}</span>
        </div>
        <span class="magazine-card-more">
          ${e(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${u.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function A(t){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${e(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${t.length?t.map((e,n)=>k(e,n,t.length>1&&n===0)).join(``):`<p class="magazine-empty">${e(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function j(r,a){let o=document.querySelector(`#app`);o&&(o.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(a)}
    <main id="main-content">
      ${A(r)}
    </main>
    ${n(a)}
    ${t()}
    <div class="header-quick-actions">
      ${T(a)}
      ${p(a)}
      ${E()}
    </div>
  `)}async function M(){g();let[e,t]=await Promise.all([h(),_()]);x(t.language_mode),b(t.theme),m(t.seo),j(e,t),C(),v(t.branding),f(t.site_name),S(t.language_mode),r(t),s(t),l(),c(),w()}d(()=>void M());