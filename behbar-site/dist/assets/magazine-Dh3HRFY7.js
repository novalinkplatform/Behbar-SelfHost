import{S as e,b as t,l as n,n as r,p as i,t as a,u as o}from"./appReady-JFOdjg2Y.js";import{C as s,D as c,E as l,S as u,T as d,_ as f,b as p,c as m,d as h,g,h as _,i as v,l as y,n as b,r as x,t as S,v as C,w,x as T,y as E}from"./languageMode-BQU1S8Yk.js";function D(e){return`${i(e.readingTime)} ${t(`دقیقه`,`min`)}`}function O(e){return e.publishedAt?n(o(new Date(e.publishedAt))):``}function k(n,r,i){return`
    <a class="magazine-card${i?` magazine-card-featured`:``}" href="/magazine/${n.slug}" style="animation-delay: ${r*90}ms">
      <div class="magazine-card-cover">
        ${n.coverImageUrl?`<img src="${n.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${e.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${t(n.category,n.categoryEn)}</span>
        <h2 class="magazine-card-title">${t(n.title,n.titleEn)}</h2>
        <p class="magazine-card-excerpt">${t(n.excerpt,n.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${e.calendar}</span>${O(n)}</span>
          <span><span class="icon">${e.clock}</span>${D(n)}</span>
        </div>
        <span class="magazine-card-more">
          ${t(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${e.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function A(e){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${t(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${e.length?e.map((t,n)=>k(t,n,e.length>1&&n===0)).join(``):`<p class="magazine-empty">${t(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function j(e,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${l(n)}
    <main id="main-content">
      ${A(e)}
    </main>
    ${w(n)}
    ${u()}
    <div class="header-quick-actions">
      ${p(n)}
      ${E(n)}
      ${C()}
    </div>
  `)}async function M(){r();let[e,t]=await Promise.all([h(),_()]);S(t.language_mode),y(t.theme),m(t.seo),j(e,t),a(),x(t.branding),v(t.site_name),b(t.language_mode),d(t),s(t),T(),c(),f()}g(()=>void M());