import{B as e,C as t,D as n,E as r,L as i,O as a,S as o,T as s,_ as c,a as l,b as u,g as d,i as f,l as p,n as m,r as h,t as g,u as _,v,w as y,y as b}from"./appReady-BWGY9_tm.js";function x(t,n){let r=e(t.paragraphs,t.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),a=t.list?`<ul class="legal-list">${e(t.list,t.listEn??t.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${i(n+1)}</span>
        <h2>${e(t.heading,t.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${r}
        ${a}
      </div>
    </section>
  `}function S(t){return`
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
          ${t.sections.map(x).join(``)}
        </div>
      </div>
    </article>
  `}function C(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function w(n,r){let i=document.querySelector(`#app`);i&&(i.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${s(r)}
    <main id="main-content">
      ${n?S(n):`<div class="container legal-container"><p class="orders-empty">${e(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${t(r)}
    ${b()}
    ${a(r)}
  `)}async function T(){u();let e=await d();m(e.language_mode),_(e.theme),p(e.seo),w(e.legal_pages?.[C()]??null,e),g(),f(e.branding),l(e.site_name),h(e.language_mode),y(e),o(e),v(),r(),n(e)}c(()=>void T());