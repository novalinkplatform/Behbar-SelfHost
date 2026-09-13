import{S as e,b as t,m as n,n as r,t as i}from"./appReady-JxiP_u2W.js";import{C as a,S as o,T as s,_ as c,b as l,c as u,g as d,h as f,i as p,l as m,n as h,r as g,t as _,v,w as y,x as b,y as x}from"./languageMode-ldGds71Q.js";import{n as S}from"./services-DmseYqSl.js";var C=[{id:`driver`,label:`راننده`,labelEn:`Driver`,requiresVehicle:!0},{id:`worker`,label:`کارگر`,labelEn:`Laborer`,requiresVehicle:!1},{id:`other`,label:`سایر`,labelEn:`Other`,requiresVehicle:!1}];function w(n=S,r,i){let a=Array.isArray(r)&&r.length?r.filter(e=>e.active!==!1).map(e=>({id:e.id,label:e.title,labelEn:e.titleEn||e.title,requiresVehicle:!!e.requiresVehicle})):C,o=a.length?a:C,s=i?.fa||`بهبار`,c=i?.en||`Behbar`;return`
    <article class="orders-page careers-page">
      <div class="container orders-container">
        <nav class="article-breadcrumb" aria-label="${t(`مسیر صفحه`,`Breadcrumb`)}">
          <a href="/">${t(`خانه`,`Home`)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${t(`فرصت‌های شغلی`,`Careers`)}</span>
        </nav>

        <h1 class="article-title">${t(`فرصت‌های شغلی ${s}`,`Careers at ${c}`)}</h1>
        <p class="article-excerpt">${t(`به تیم ${s} بپیوندید؛ به نیروی راننده، کارگر و سایر همکاران نیاز داریم. فرم زیر را پر کنید تا همکاران ما با شما تماس بگیرند.`,`Join the ${c} team — we’re hiring drivers, laborers, and other roles. Fill out the form below and our team will get in touch.`)}</p>

        <div class="careers-form-card" id="careers-form-card">
          <form id="careers-form">
            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-name">${t(`نام و نام خانوادگی`,`Full name`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${e.user}</span>
                  <input type="text" id="careers-name" autocomplete="name" required />
                </div>
              </div>
              <div class="form-field">
                <label for="careers-phone">${t(`شماره موبایل`,`Mobile number`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${e.phone}</span>
                  <input type="tel" id="careers-phone" placeholder="${t(`۰۹xxxxxxxxx`,`09xxxxxxxxx`)}" inputmode="numeric" autocomplete="tel" required />
                </div>
              </div>
            </div>

            <div class="careers-form-grid">
              <div class="form-field">
                <label for="careers-position">${t(`موقعیت شغلی مورد نظر`,`Position of interest`)}</label>
                <div class="select-wrapper">
                  <select id="careers-position">
                    ${o.map(e=>`<option value="${e.id}" data-requires-vehicle="${!!e.requiresVehicle}">${t(e.label,e.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${e.chevronDown}</span>
                </div>
              </div>
              <div class="form-field">
                <label for="careers-city">${t(`شهر محل سکونت (اختیاری)`,`City (optional)`)}</label>
                <div class="input-wrapper">
                  <span class="icon input-icon">${e.pin}</span>
                  <input type="text" id="careers-city" autocomplete="address-level2" />
                </div>
              </div>
            </div>

            <div class="form-field" id="careers-custom-position-field" hidden>
              <label for="careers-custom-position">${t(`عنوان شغلی مورد نظر`,`Desired position title`)}</label>
              <div class="input-wrapper">
                <span class="icon input-icon">${e.briefcase}</span>
                <input type="text" id="careers-custom-position" />
              </div>
            </div>

            <div class="careers-form-grid" id="careers-vehicle-field" hidden>
              <div class="form-field">
                <label for="careers-has-vehicle">${t(`آیا وسیله نقلیه دارید؟`,`Do you have your own vehicle?`)}</label>
                <div class="select-wrapper">
                  <select id="careers-has-vehicle">
                    <option value="yes">${t(`بله`,`Yes`)}</option>
                    <option value="no">${t(`خیر`,`No`)}</option>
                  </select>
                  <span class="icon select-chevron">${e.chevronDown}</span>
                </div>
              </div>
              <div class="form-field" id="careers-vehicle-type-field">
                <label for="careers-vehicle-type">${t(`نوع وسیله`,`Vehicle type`)}</label>
                <div class="select-wrapper">
                  <select id="careers-vehicle-type">
                    ${n.map(e=>`<option value="${e.id}">${t(e.label,e.labelEn)}</option>`).join(``)}
                  </select>
                  <span class="icon select-chevron">${e.chevronDown}</span>
                </div>
              </div>
            </div>

            <div class="form-field">
              <label for="careers-message">${t(`توضیحات و سابقه کاری (اختیاری)`,`Notes and work experience (optional)`)}</label>
              <textarea id="careers-message" class="careers-textarea" rows="4"></textarea>
            </div>

            <p class="request-panel-error" id="careers-form-error" hidden></p>
            <button type="submit" class="btn btn-primary btn-block" id="careers-submit-btn">${t(`ارسال درخواست همکاری`,`Submit application`)}</button>
          </form>
        </div>

        <div class="request-panel wizard-success careers-success" id="careers-success" hidden>
          <span class="request-success-icon">${e.checkCircle}</span>
          <h3>${t(`درخواست شما ثبت شد`,`Your application has been submitted`)}</h3>
          <p>${t(`همکاران ما پس از بررسی با شما تماس می‌گیرند.`,`Our team will review it and get in touch with you.`)}</p>
        </div>
      </div>
    </article>
  `}function T(){let e=document.getElementById(`careers-form`),r=document.getElementById(`careers-form-card`),i=document.getElementById(`careers-success`),a=document.getElementById(`careers-form-error`),o=document.getElementById(`careers-position`),s=document.getElementById(`careers-custom-position-field`),c=document.getElementById(`careers-vehicle-field`),l=document.getElementById(`careers-has-vehicle`),u=document.getElementById(`careers-vehicle-type-field`),d=document.getElementById(`careers-submit-btn`);if(!e||!r||!i||!a||!o||!s||!c||!l||!u||!d)return;function f(){let e=o.selectedOptions?.[0],t=o.value===`other`||o.value.startsWith(`pos_other`),n=e?.getAttribute(`data-requires-vehicle`)===`true`||o.value===`driver`;s.hidden=!t,c.hidden=!n,u.hidden=l.value!==`yes`}o.addEventListener(`change`,f),l.addEventListener(`change`,f),f(),e.addEventListener(`submit`,async e=>{e.preventDefault(),a.hidden=!0;let s=document.getElementById(`careers-name`).value.trim(),c=document.getElementById(`careers-phone`).value.trim(),u=o.selectedOptions?.[0],f=o.value===`other`||o.value.startsWith(`pos_other`),p=u?.getAttribute(`data-requires-vehicle`)===`true`||o.value===`driver`,m=o.value,h=document.getElementById(`careers-custom-position`).value.trim(),g=f?h:u?.textContent?.trim()||m,_=document.getElementById(`careers-city`).value.trim(),v=document.getElementById(`careers-message`).value.trim(),y=p?l.value===`yes`:void 0,b=y?document.getElementById(`careers-vehicle-type`).value:void 0;if(!s||!c){a.hidden=!1,a.textContent=t(`نام و شماره موبایل الزامی است.`,`Full name and mobile number are required.`);return}if(f&&!g){a.hidden=!1,a.textContent=t(`عنوان شغلی مورد نظر را وارد کنید.`,`Please enter the desired position title.`);return}d.disabled=!0;try{let e=await fetch(`${n}/api/job-applications`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fullName:s,phone:c,position:m,positionLabel:g,city:_||void 0,message:v||void 0,hasVehicle:y,vehicleType:b})}),a=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof a?.error==`string`?a.error:t(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`));r.hidden=!0,i.hidden=!1}catch(e){a.hidden=!1,a.textContent=e instanceof Error?e.message:t(`ارسال درخواست ناموفق بود.`,`Failed to submit the application.`)}finally{d.disabled=!1}})}function E(e){let n=document.querySelector(`#app`);if(!n)return;let r=e.vehicle_types?.length?e.vehicle_types:S;n.innerHTML=`
    <a class="skip-link" href="#main-content">${t(`رفتن به محتوای اصلی`,`Skip to main content`)}</a>
    ${o(e)}
    <main id="main-content">
      ${w(r,e.career_positions,e.site_name)}
    </main>
    ${l(e)}
    ${v()}
    ${s(e)}
  `}async function D(){r();let e=await f();_(e.language_mode),m(e.theme),u(e.seo),E(e),i(),g(e.branding),p(e.site_name),h(e.language_mode),b(e),x(e),c(),a(),y(e),T()}d(()=>void D());