import{n as e,p as t,t as n,x as r}from"./appReady-giJ54-6J.js";import{C as i,S as a,T as o,_ as s,b as c,c as l,g as u,h as d,i as f,l as p,n as m,r as h,t as g,v as _,w as v,x as y,y as b}from"./languageMode-CjuVnjFU.js";function x(e,n){let i=r(e.paragraphs,e.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),a=e.list?`<ul class="legal-list">${r(e.list,e.listEn??e.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${t(n+1)}</span>
        <h2>${r(e.heading,e.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${i}
        ${a}
      </div>
    </section>
  `}function S(e){return`
    <article class="legal-page">
      <div class="container legal-container">
        <nav class="article-breadcrumb" aria-label="${r(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${r(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${r(e.title,e.titleEn)}</span>
        </nav>

        <h1 class="article-title">${r(e.title,e.titleEn)}</h1>
        <p class="article-excerpt">${r(e.intro,e.introEn)}</p>

        <div class="legal-body">
          ${e.sections.map(x).join(``)}
        </div>
      </div>
    </article>
  `}function C(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function w(e,t){let n=document.querySelector(`#app`);n&&(n.innerHTML=`
    <a class="skip-link" href="#main-content">${r(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(t)}
    <main id="main-content">
      ${e?S(e):`<div class="container legal-container"><p class="orders-empty">${r(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${c(t)}
    ${_()}
    ${o(t)}
  `)}async function T(){e();let t=await d();g(t.language_mode),p(t.theme),l(t.seo),w(t.legal_pages?.[C()]??null,t),n(),h(t.branding),f(t.site_name),m(t.language_mode),y(t),b(t),s(),i(),v(t)}u(()=>void T());