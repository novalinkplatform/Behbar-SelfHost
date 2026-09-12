import{C as e,F as t,H as n,I as r,L as i,R as a,S as o,V as s,_ as c,a as l,b as u,g as d,i as f,l as p,n as m,r as h,t as g,u as _,v,w as y,x as b,y as x,z as S}from"./appReady-CnRz7xfg.js";import{n as C}from"./services-DpdU4zSZ.js";var w=[{id:`driver`,label:`راننده`,labelEn:`Driver`,requiresVehicle:!0},{id:`worker`,label:`کارگر`,labelEn:`Laborer`,requiresVehicle:!1},{id:`other`,label:`سایر`,labelEn:`Other`,requiresVehicle:!1}];function T(e=C,t,r){let i=Array.isArray(t)&&t.length?t.filter(e=>e.active!==!1).map(e=>({id:e.id,label:e.title,labelEn:e.titleEn||e.title,requiresVehicle:!!e.requiresVehicle})):w,a=i.length?i:w,o=r?.fa||`بهبار`,c=r?.en||`Behbar`;return`
    <article class="orders-page careers-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${s(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${s(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${s(`فرصت‌های شغلی`,`Careers`)}</span>
        </nav>

        <h1 class="article-title">${s(`فرصت‌های شغلی ${o}`,`Careers at ${c}`)}</h1>
        <p class="article-excerpt">${s(`به تیم ${o} بپیوندید؛ به نیروی راننده، کارگر و سایر همکاران نیاز داریم. فرم زیر را پر کنید تا همکاران ما با شما تماس بگیرند.`,`Join the ${c} team — we’re hiring drivers, laborers, and other roles. Fill out the form below and our team will get in touch.`)}</p>

        <div class="careers-form-card" id="careers-form-card">
          <form id="careers-form">
            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-name">${s(`نام و نام خانوادگی`,`Full name`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${n.user}</span>
                  <input type="text" id="careers-name" autocomplete="name" required />
                </div>
              </div>
              <div class="form-field">
                <label for="careers-phone">${s(`شماره موبایل`,`Mobile number`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${n.phone}</span>
                  <input type="tel" id="careers-phone" placeholder="${s(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
                </div>
              </div>
            </div>

            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-position">${s(`موقعیت شغلی مورد نظر`,`Position of interest`)}</label>
                <div class="select-wrapper">
                  <select id="careers-position">
                    ${a.map(e=>`<option value="${e.id}" data-requires-vehicle="${!!e.requiresVehicle}">${s(e.label,e.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${n.chevronDown}</span>
                </div>
              </div>
              <div class="form-field">
                <label for="careers-city">${s(`شهر محل سکونت (اختیاری)`,`City (optional)`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${n.pin}</span>
                  <input type="text" id="careers-city" autocomplete="address-level2" />
                </div>
              </div>
            </div>

            <div class="form-field" id="careers-custom-position-field" hidden>
              <label for="careers-custom-position">${s(`عنوان شغلی مورد نظر`,`Desired position title`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${n.briefcase}</span>
                <input type="text" id="careers-custom-position" />
              </div>
            </div>

            <div class="careers-form-grid" id="careers-vehicle-field" hidden>
              <div class="form-field">
                <label for="careers-has-vehicle">${s(`آیا وسیله نقلیه دارید؟`,`Do you have your own vehicle?`)}</label>
                <div class="select-wrapper">
                  <select id="careers-has-vehicle">
                    <option value="yes">${s(`بله`,`Yes`)}</option>
                    <option value="no">${s(`خیر`,`No`)}</option>
                  </select>
                  <span class="icon select-chevron">${n.chevronDown}</span>
                </div>
              </div>
              <div class="form-field" id="careers-vehicle-type-field">
                <label for="careers-vehicle-type">${s(`نوع وسیله`,`Vehicle type`)}</label>
                <div class="select-wrapper">
                  <select id="careers-vehicle-type">
                    ${e.map(e=>`<option value="${e.id}">${s(e.label,e.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${n.chevronDown}</span>
                </div>
              </div>
            </div>

            <div class="form-field">
              <label for="careers-message">${s(`توضیحات و سابقه کاری (اختیاری)`,`Notes and work experience (optional)`)}</label>
              <textarea id="careers-message" class="careers-textarea" rows="4"></textarea>
            </div>

            <p class="request-panel-error" id="careers-form-error" hidden></p>
            <button type="submit" class="btn btn-primary btn-block" id="careers-submit-btn">${s(`ارسال درخواست همکاری`,`Submit application`)}</button>
          </form>
        </div>

        <div class="request-panel wizard-success careers-success" id="careers-success" hidden>
          <span class="request-success-icon">${n.checkCircle}</span>
          <h3>${s(`درخواست شما ثبت شد`,`Your application has been submitted`)}</h3>
          <p>${s(`همکاران ما پس از بررسی با شما تماس می‌گیرند.`,`Our team will review it and get in touch with you.`)}</p>
        </div>
      </div>
    </article>
  `}function E(){let e=document.getElementById(`careers-form`),t=document.getElementById(`careers-form-card`),n=document.getElementById(`careers-success`),r=document.getElementById(`careers-form-error`),i=document.getElementById(`careers-position`),a=document.getElementById(`careers-custom-position-field`),o=document.getElementById(`careers-vehicle-field`),c=document.getElementById(`careers-has-vehicle`),l=document.getElementById(`careers-vehicle-type-field`),u=document.getElementById(`careers-submit-btn`);if(!e||!t||!n||!r||!i||!a||!o||!c||!l||!u)return;function d(){let e=i.selectedOptions?.[0],t=i.value===`other`||i.value.startsWith(`pos_other`),n=e?.getAttribute(`data-requires-vehicle`)===`true`||i.value===`driver`;a.hidden=!t,o.hidden=!n,l.hidden=c.value!==`yes`}i.addEventListener(`change`,d),c.addEventListener(`change`,d),d(),e.addEventListener(`submit`,async e=>{e.preventDefault(),r.hidden=!0;let a=document.getElementById(`careers-name`).value.trim(),o=document.getElementById(`careers-phone`).value.trim(),l=i.selectedOptions?.[0],d=i.value===`other`||i.value.startsWith(`pos_other`),f=l?.getAttribute(`data-requires-vehicle`)===`true`||i.value===`driver`,p=i.value,m=document.getElementById(`careers-custom-position`).value.trim(),h=d?m:l?.textContent?.trim()||p,g=document.getElementById(`careers-city`).value.trim(),_=document.getElementById(`careers-message`).value.trim(),v=f?c.value===`yes`:void 0,y=v?document.getElementById(`careers-vehicle-type`).value:void 0;if(!a||!o){r.hidden=!1,r.textContent=s(`نام و شماره موبایل الزامی است.`,`Full name and mobile number are required.`);return}if(d&&!h){r.hidden=!1,r.textContent=s(`عنوان شغلی مورد نظر را وارد کنید.`,`Please enter the desired position title.`);return}u.disabled=!0;try{let e=await fetch(`/api/job-applications`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fullName:a,phone:o,position:p,positionLabel:h,city:g||void 0,message:_||void 0,hasVehicle:v,vehicleType:y})}),r=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof r?.error==`string`?r.error:s(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`));t.hidden=!0,n.hidden=!1}catch(e){r.hidden=!1,r.textContent=e instanceof Error?e.message:s(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`)}finally{u.disabled=!1}})}function D(e){let t=document.querySelector(`#app`);if(!t)return;let n=e.vehicle_types?.length?e.vehicle_types:C;t.innerHTML=`
    <a class="skip-link" href="#main-content">${s(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${a(e)}
    <main id="main-content">
      ${T(n,e.career_positions,e.site_name)}
    </main>
    ${r(e)}
    ${y()}
    <div class="header-quick-actions">
      ${o(e)}
      ${b(e)}
      ${u()}
    </div>
  `}async function O(){c();let n=await d();m(n.language_mode),_(n.theme),p(n.seo),D(n),g(),f(n.branding),l(n.site_name),h(n.language_mode),i(n),t(n),e(),S(),x(),E()}v(()=>void O());