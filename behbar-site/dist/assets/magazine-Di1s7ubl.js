import{A as e,C as t,F as n,H as r,I as i,L as a,N as o,R as s,S as c,V as l,_ as u,a as d,b as f,f as p,g as m,i as h,k as g,l as _,n as v,r as y,t as b,u as x,v as S,w as C,x as w,y as T,z as E}from"./appReady-CnRz7xfg.js";function D(e){return`${o(e.readingTime)} ${l(`دقیقه`,`min`)}`}function O(t){return t.publishedAt?g(e(new Date(t.publishedAt))):``}function k(e,t,n){return`
    <a class="magazine-card${n?` magazine-card-featured`:``}" href="/magazine/${e.slug}" style="animation-delay: ${t*90}ms">
      <div class="magazine-card-cover">
        ${e.coverImageUrl?`<img src="${e.coverImageUrl}" alt="" loading="lazy" />`:`<span class="icon">${r.article}</span>`}
      </div>
      <div class="magazine-card-content">
        <span class="magazine-card-category">${l(e.category,e.categoryEn)}</span>
        <h2 class="magazine-card-title">${l(e.title,e.titleEn)}</h2>
        <p class="magazine-card-excerpt">${l(e.excerpt,e.excerptEn)}</p>
        <div class="magazine-card-meta">
          <span><span class="icon">${r.calendar}</span>${O(e)}</span>
          <span><span class="icon">${r.clock}</span>${D(e)}</span>
        </div>
        <span class="magazine-card-more">
          ${l(`بیشتر بخوانید`,`Read more`)}
          <span class="icon">${r.chevronLeft}</span>
        </span>
      </div>
    </a>
  `}function A(e){return`
    <section class="magazine-page">
      <div class="container">
        <h1 class="visually-hidden">${l(`مجله بهبار`,`Behbar Magazine`)}</h1>
        <nav class="article-breadcrumb" aria-label="${l(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${l(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${l(`مجله`,`Magazine`)}</span>
        </nav>
        <div class="magazine-grid magazine-puzzle">
          ${e.length?e.map((t,n)=>k(t,n,e.length>1&&n===0)).join(``):`<p class="magazine-empty">${l(`هنوز مقاله‌ای منتشر نشده است.`,`No articles have been published yet.`)}</p>`}
        </div>
      </div>
    </section>
  `}function j(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${l(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(t)}
    <main id="main-content">
      ${A(e)}
    </main>
    ${i(t)}
    ${C()}
    <div class="header-quick-actions">
      ${c(t)}
      ${w(t)}
      ${f()}
    </div>
  `)}async function M(){u();let[e,r]=await Promise.all([p(),m()]);v(r.language_mode),x(r.theme),_(r.seo),j(e,r),b(),h(r.branding),d(r.site_name),y(r.language_mode),a(r),n(r),t(),E(),T()}S(()=>void M());