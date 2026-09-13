import{b as e,n as t,p as n,t as r}from"./appReady-JFOdjg2Y.js";import{C as i,D as a,E as o,S as s,T as c,_ as l,b as u,c as d,g as f,h as p,i as m,l as h,n as g,r as _,t as v,v as y,w as b,x,y as S}from"./languageMode-BQU1S8Yk.js";function C(t,r){let i=e(t.paragraphs,t.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),a=t.list?`<ul class="legal-list">${e(t.list,t.listEn??t.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${n(r+1)}</span>
        <h2>${e(t.heading,t.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${i}
        ${a}
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
  `}function T(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function E(t,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(n)}
    <main id="main-content">
      ${t?w(t):`<div class="container legal-container"><p class="orders-empty">${e(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${b(n)}
    ${s()}
    <div class="header-quick-actions">
      ${u(n)}
      ${S(n)}
      ${y()}
    </div>
  `)}async function D(){t();let e=await p();v(e.language_mode),h(e.theme),d(e.seo),E(e.legal_pages?.[T()]??null,e),r(),_(e.branding),m(e.site_name),g(e.language_mode),c(e),i(e),x(),a(),l()}f(()=>void D());