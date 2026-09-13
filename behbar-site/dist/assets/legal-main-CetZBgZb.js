import{b as e,f as t,n,t as r}from"./appReady-JxiP_u2W.js";import{C as i,S as a,T as o,_ as s,b as c,c as l,g as u,h as d,i as f,l as p,n as m,r as h,t as g,v as _,w as v,x as y,y as b}from"./languageMode-ldGds71Q.js";function x(n,r){let i=e(n.paragraphs,n.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),a=n.list?`<ul class="legal-list">${e(n.list,n.listEn??n.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${t(r+1)}</span>
        <h2>${e(n.heading,n.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${i}
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
  `}function C(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function w(t,n){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(n)}
    <main id="main-content">
      ${t?S(t):`<div class="container legal-container"><p class="orders-empty">${e(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${c(n)}
    ${_()}
    ${o(n)}
  `)}async function T(){n();let e=await d();g(e.language_mode),p(e.theme),l(e.seo),w(e.legal_pages?.[C()]??null,e),r(),h(e.branding),f(e.site_name),m(e.language_mode),y(e),b(e),s(),i(),v(e)}u(()=>void T());