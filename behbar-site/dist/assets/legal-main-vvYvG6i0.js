import{C as e,F as t,I as n,L as r,N as i,R as a,S as o,V as s,_ as c,a as l,b as u,g as d,i as f,l as p,n as m,r as h,t as g,u as _,v,w as y,x as b,y as x,z as S}from"./appReady-jYOMNzjt.js";function C(e,t){let n=s(e.paragraphs,e.paragraphsEn).map(e=>`<p>${e}</p>`).join(``),r=e.list?`<ul class="legal-list">${s(e.list,e.listEn??e.list).map(e=>`<li>${e}</li>`).join(``)}</ul>`:``;return`
    <section class="legal-section">
      <div class="legal-section-head">
        <span class="legal-section-index">${i(t+1)}</span>
        <h2>${s(e.heading,e.headingEn)}</h2>
      </div>
      <div class="legal-section-body">
        ${n}
        ${r}
      </div>
    </section>
  `}function w(e){return`
    <article class="legal-page">
      <div class="container legal-container">
        <nav class="article-breadcrumb" aria-label="${s(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${s(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${s(e.title,e.titleEn)}</span>
        </nav>

        <h1 class="article-title">${s(e.title,e.titleEn)}</h1>
        <p class="article-excerpt">${s(e.intro,e.introEn)}</p>

        <div class="legal-body">
          ${e.sections.map(C).join(``)}
        </div>
      </div>
    </article>
  `}function T(){return location.pathname.startsWith(`/terms`)?`terms`:location.pathname.startsWith(`/privacy`)?`privacy`:`about`}function E(e,t){let r=document.querySelector(`#app`);r&&(r.innerHTML=`
    <a class="skip-link" href="#main-content">${s(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(t)}
    <main id="main-content">
      ${e?w(e):`<div class="container legal-container"><p class="orders-empty">${s(`خطا در بارگذاری این صفحه.`,`Failed to load this page.`)}</p></div>`}
    </main>
    ${n(t)}
    ${y()}
    <div class="header-quick-actions">
      ${o(t)}
      ${b(t)}
      ${u()}
    </div>
  `)}async function D(){c();let n=await d();m(n.language_mode),_(n.theme),p(n.seo),E(n.legal_pages?.[T()]??null,n),g(),f(n.branding),l(n.site_name),h(n.language_mode),r(n),t(n),e(),S(),x()}v(()=>void D());