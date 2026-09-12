import{B as e,C as t,F as n,I as r,L as i,P as a,R as o,S as s,V as c,_ as l,a as u,b as d,c as f,g as p,h as m,i as h,l as g,n as _,r as v,t as y,v as b,x,y as S}from"./appReady-Dy-K2yk_.js";import{n as C}from"./services-CZvw-ekZ.js";var w=[{id:`driver`,label:`راننده`,labelEn:`Driver`,requiresVehicle:!0},{id:`worker`,label:`کارگر`,labelEn:`Laborer`,requiresVehicle:!1},{id:`other`,label:`سایر`,labelEn:`Other`,requiresVehicle:!1}];function T(t=C,n,r){let i=Array.isArray(n)&&n.length?n.filter(e=>e.active!==!1).map(e=>({id:e.id,label:e.title,labelEn:e.titleEn||e.title,requiresVehicle:!!e.requiresVehicle})):w,a=i.length?i:w,o=r?.fa||`بهبار`,s=r?.en||`Behbar`;return`
    <article class="orders-page careers-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${e(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${e(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${e(`فرصت‌های شغلی`,`Careers`)}</span>
        </nav>

        <h1 class="article-title">${e(`فرصت‌های شغلی ${o}`,`Careers at ${s}`)}</h1>
        <p class="article-excerpt">${e(`به تیم ${o} بپیوندید؛ به نیروی راننده، کارگر و سایر همکاران نیاز داریم. فرم زیر را پر کنید تا همکاران ما با شما تماس بگیرند.`,`Join the ${s} team — we’re hiring drivers, laborers, and other roles. Fill out the form below and our team will get in touch.`)}</p>

        <div class="careers-form-card" id="careers-form-card">
          <form id="careers-form">
            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-name">${e(`نام و نام خانوادگی`,`Full name`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${c.user}</span>
                  <input type="text" id="careers-name" autocomplete="name" required />
                </div>
              </div>
              <div class="form-field">
                <label for="careers-phone">${e(`شماره موبایل`,`Mobile number`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${c.phone}</span>
                  <input type="tel" id="careers-phone" placeholder="${e(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
                </div>
              </div>
            </div>

            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-position">${e(`موقعیت شغلی مورد نظر`,`Position of interest`)}</label>
                <div class="select-wrapper">
                  <select id="careers-position">
                    ${a.map(t=>`<option value="${t.id}" data-requires-vehicle="${!!t.requiresVehicle}">${e(t.label,t.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${c.chevronDown}</span>
                </div>
              </div>
              <div class="form-field">
                <label for="careers-city">${e(`شهر محل سکونت (اختیاری)`,`City (optional)`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${c.pin}</span>
                  <input type="text" id="careers-city" autocomplete="address-level2" />
                </div>
              </div>
            </div>

            <div class="form-field" id="careers-custom-position-field" hidden>
              <label for="careers-custom-position">${e(`عنوان شغلی مورد نظر`,`Desired position title`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${c.briefcase}</span>
                <input type="text" id="careers-custom-position" />
              </div>
            </div>

            <div class="careers-form-grid" id="careers-vehicle-field" hidden>
              <div class="form-field">
                <label for="careers-has-vehicle">${e(`آیا وسیله نقلیه دارید؟`,`Do you have your own vehicle?`)}</label>
                <div class="select-wrapper">
                  <select id="careers-has-vehicle">
                    <option value="yes">${e(`بله`,`Yes`)}</option>
                    <option value="no">${e(`خیر`,`No`)}</option>
                  </select>
                  <span class="icon select-chevron">${c.chevronDown}</span>
                </div>
              </div>
              <div class="form-field" id="careers-vehicle-type-field">
                <label for="careers-vehicle-type">${e(`نوع وسیله`,`Vehicle type`)}</label>
                <div class="select-wrapper">
                  <select id="careers-vehicle-type">
                    ${t.map(t=>`<option value="${t.id}">${e(t.label,t.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${c.chevronDown}</span>
                </div>
              </div>
            </div>

            <div class="form-field">
              <label for="careers-message">${e(`توضیحات و سابقه کاری (اختیاری)`,`Notes and work experience (optional)`)}</label>
              <textarea id="careers-message" class="careers-textarea" rows="4"></textarea>
            </div>

            <p class="request-panel-error" id="careers-form-error" hidden></p>
            <button type="submit" class="btn btn-primary btn-block" id="careers-submit-btn">${e(`ارسال درخواست همکاری`,`Submit application`)}</button>
          </form>
        </div>

        <div class="request-panel wizard-success careers-success" id="careers-success" hidden>
          <span class="request-success-icon">${c.checkCircle}</span>
          <h3>${e(`درخواست شما ثبت شد`,`Your application has been submitted`)}</h3>
          <p>${e(`همکاران ما پس از بررسی با شما تماس می‌گیرند.`,`Our team will review it and get in touch with you.`)}</p>
        </div>
      </div>
    </article>
  `}function E(){let t=document.getElementById(`careers-form`),n=document.getElementById(`careers-form-card`),r=document.getElementById(`careers-success`),i=document.getElementById(`careers-form-error`),a=document.getElementById(`careers-position`),o=document.getElementById(`careers-custom-position-field`),s=document.getElementById(`careers-vehicle-field`),c=document.getElementById(`careers-has-vehicle`),l=document.getElementById(`careers-vehicle-type-field`),u=document.getElementById(`careers-submit-btn`);if(!t||!n||!r||!i||!a||!o||!s||!c||!l||!u)return;function d(){let e=a.selectedOptions?.[0],t=a.value===`other`||a.value.startsWith(`pos_other`),n=e?.getAttribute(`data-requires-vehicle`)===`true`||a.value===`driver`;o.hidden=!t,s.hidden=!n,l.hidden=c.value!==`yes`}a.addEventListener(`change`,d),c.addEventListener(`change`,d),d(),t.addEventListener(`submit`,async t=>{t.preventDefault(),i.hidden=!0;let o=document.getElementById(`careers-name`).value.trim(),s=document.getElementById(`careers-phone`).value.trim(),l=a.selectedOptions?.[0],d=a.value===`other`||a.value.startsWith(`pos_other`),f=l?.getAttribute(`data-requires-vehicle`)===`true`||a.value===`driver`,p=a.value,m=document.getElementById(`careers-custom-position`).value.trim(),h=d?m:l?.textContent?.trim()||p,g=document.getElementById(`careers-city`).value.trim(),_=document.getElementById(`careers-message`).value.trim(),v=f?c.value===`yes`:void 0,y=v?document.getElementById(`careers-vehicle-type`).value:void 0;if(!o||!s){i.hidden=!1,i.textContent=e(`نام و شماره موبایل الزامی است.`,`Full name and mobile number are required.`);return}if(d&&!h){i.hidden=!1,i.textContent=e(`عنوان شغلی مورد نظر را وارد کنید.`,`Please enter the desired position title.`);return}u.disabled=!0;try{let t=await fetch(`/api/job-applications`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fullName:o,phone:s,position:p,positionLabel:h,city:g||void 0,message:_||void 0,hasVehicle:v,vehicleType:y})}),i=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof i?.error==`string`?i.error:e(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`));n.hidden=!0,r.hidden=!1}catch(t){i.hidden=!1,i.textContent=t instanceof Error?t.message:e(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`)}finally{u.disabled=!1}})}function D(r){let a=document.querySelector(`#app`);if(!a)return;let o=r.vehicle_types?.length?r.vehicle_types:C;a.innerHTML=`
    <a class="skip-link" href="#main-content">${e(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${i(r)}
    <main id="main-content">
      ${T(o,r.career_positions,r.site_name)}
    </main>
    ${n(r)}
    ${t()}
    <div class="header-quick-actions">
      ${x(r)}
      ${d(r)}
      ${S()}
    </div>
  `}async function O(){p();let e=await m();_(e.language_mode),g(e.theme),f(e.seo),D(e),y(),h(e.branding),u(e.site_name),v(e.language_mode),r(e),a(e),s(),o(),b(),E()}l(()=>void O());