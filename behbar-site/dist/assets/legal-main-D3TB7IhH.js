import{B as e,C as t,F as n,I as r,L as i,M as a,P as o,R as s,S as c,_ as l,a as u,b as d,c as f,g as p,h as m,i as h,l as g,n as _,r as v,t as y,v as b,x,y as S}from"./appReady-DNSS-HAw.js";function C(t,n){let r=e(t.paragraphs,t.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),i=t.list?`<ul class="legal-list">${e(t.list,t.listEn??t.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${a(n+1)}</span>
        <h2>${e(t.heading,t.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${r}
        ${i}
      </div>
    </section>
  `}function w(t){return`
    <article class="legal-page">
      <div class="container legal-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(t.title,t.titleEn)}</span>
        </nav>

        <h1 class="article-title">${e(t.title,t.titleEn)}</h1>
        <p class="article-excerpt">${e(t.intro,t.introEn)}</p>

        <div class="legal-body">
          ${t.sections.map(C).join(``)}
        </div>
      </div>
    </article>
  `}function T(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function E(r,a){let o=document.querySelector(`#app`);o&&(o.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(a)}
    <main id="main-content">
      ${r?w(r):`<div class="container legal-container"><p class="orders-empty">${e(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${n(a)}
    ${t()}
    <div class="header-quick-actions">
      ${x(a)}
      ${d(a)}
      ${S()}
    </div>
  `)}async function D(){p();let e=await m();_(e.language_mode),g(e.theme),f(e.seo),E(e.legal_pages?.[T()]??null,e),y(),h(e.branding),u(e.site_name),v(e.language_mode),r(e),o(e),c(),s(),b()}l(()=>void D());