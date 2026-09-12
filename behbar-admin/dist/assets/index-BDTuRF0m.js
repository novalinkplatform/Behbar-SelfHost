var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`,u={route:`<svg ${l}><circle cx="5.5" cy="6" r="2"/><circle cx="18.5" cy="18" r="2"/><path d="M5.5 8v3a3 3 0 0 0 3 3h7a3 3 0 0 1 3 3"/></svg>`,grid:`<svg ${l}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>`,chart:`<svg ${l}><path d="M4 20V10M12 20V4M20 20v-7"/><path d="M2 20h20"/></svg>`,columns:`<svg ${l}><rect x="3.5" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="10" rx="1"/><rect x="15.5" y="4" width="5" height="13" rx="1"/></svg>`,phone:`<svg ${l}><path d="M5.5 4h2.8l1.2 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.2v2.8c0 1-.9 1.7-1.8 1.5-6-1.1-10.6-5.7-11.7-11.7C4.3 5.4 5 4 5.5 4Z"/></svg>`,pin:`<svg ${l}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></svg>`,flag:`<svg ${l}><path d="M6 21V4"/><path d="M6 4.5h10.5L14 8l2.5 3.5H6"/></svg>`,calendar:`<svg ${l}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>`,logout:`<svg ${l}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>`,lock:`<svg ${l}><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>`,close:`<svg ${l}><path d="m5 5 14 14M19 5 5 19"/></svg>`,chevronDown:`<svg ${l}><path d="m6 9 6 6 6-6"/></svg>`,refresh:`<svg ${l}><path d="M3.5 12a8.5 8.5 0 0 1 14.5-6M20.5 12a8.5 8.5 0 0 1-14.5 6"/><path d="M18 3v4h-4M6 21v-4h4"/></svg>`,map:`<svg ${l}><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>`,users:`<svg ${l}><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 20a4.5 4.5 0 0 1 5.5-4.4"/></svg>`,plusCircle:`<svg ${l}><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>`,checkCircle:`<svg ${l}><circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.3 2.3 4.7-5"/></svg>`,user:`<svg ${l}><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>`,article:`<svg ${l}><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>`,settings:`<svg ${l}><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6"/></svg>`,message:`<svg ${l}><path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.5 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M7.5 9.5h9M7.5 13h6"/></svg>`,chat:`<svg ${l}><path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h9a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 15 15H9l-4 3.5v-3.5H6a2.5 2.5 0 0 1-2.5-2.5v-6Z"/><circle cx="7.5" cy="9.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="11.5" cy="9.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="0.9" fill="currentColor" stroke="none"/></svg>`,story:`<svg ${l}><rect x="7" y="3" width="10" height="17" rx="2.2"/><circle cx="12" cy="7.2" r="1.5" fill="currentColor" stroke="none"/></svg>`,briefcase:`<svg ${l}><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18M10.5 12.5v2h3v-2"/></svg>`,download:`<svg ${l}><path d="M12 3.5v11M8 10.5l4 4 4-4"/><path d="M4.5 17v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2"/></svg>`,truck:`<svg ${l}><rect x="2" y="7" width="11" height="7" rx="1"/><path d="M13 10h4l3 3v1h-2"/><path d="M7.8 17h6.9"/><circle cx="6" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/></svg>`,seo:`<svg ${l}><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/><path d="M7.5 10.5h6M10.5 7.5v6"/></svg>`,ai:`<svg ${l}><path d="M11 3 12.7 8 17.5 9.7 12.7 11.4 11 16.4 9.3 11.4 4.5 9.7 9.3 8Z"/><path d="M18 15.5 18.8 17.7 21 18.5 18.8 19.3 18 21.5 17.2 19.3 15 18.5 17.2 17.7Z"/></svg>`,image:`<svg ${l}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m5 17 5-5 3 3 3-4 3 6"/></svg>`,video:`<svg ${l}><rect x="3" y="6" width="12" height="12" rx="2"/><path d="m15 10 6-3v10l-6-3Z"/></svg>`,audio:`<svg ${l}><path d="M9 18V6l8-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/></svg>`,arrowRight:`<svg ${l}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,arrowLeft:`<svg ${l}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,maleAvatar:`<svg ${l}><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>`,femaleAvatar:`<svg ${l}><circle cx="12" cy="7.5" r="4"/><path d="M12 11.5v6M9 15h6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>`,eye:`<svg ${l}><path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,history:`<svg ${l}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>`,link:`<svg ${l}><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.6 4.9a3.7 3.7 0 0 1 5.2 5.2L16 12"/><path d="M13 17.5 11.4 19.1a3.7 3.7 0 0 1-5.2-5.2L8 12"/></svg>`,externalLink:`<svg ${l}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,unlink:`<svg ${l}><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.2 5.3a3.7 3.7 0 0 1 5.2 5.2L16.2 11.7"/><path d="M13 17.5 11.8 18.7a3.7 3.7 0 0 1-5.2-5.2L7.8 12.3"/><path d="m4 4 16 16"/></svg>`,quote:`<svg ${l}><path d="M7.5 8.5a3 3 0 0 0-3 3V16h5v-4.5h-2a3 3 0 0 1 2-3V8.5Z"/><path d="M16.5 8.5a3 3 0 0 0-3 3V16h5v-4.5h-2a3 3 0 0 1 2-3V8.5Z"/></svg>`,undo:`<svg ${l}><path d="M4 12a8 8 0 1 1 2.6 5.9"/><path d="M4 6.5V12h5.5"/></svg>`,redo:`<svg ${l}><path d="M20 12a8 8 0 1 0-2.6 5.9"/><path d="M20 6.5V12h-5.5"/></svg>`,minus:`<svg ${l}><path d="M4 12h16"/></svg>`,eraser:`<svg ${l}><path d="m17.5 8.5-9 9H4l-1-1L14 5.5a2 2 0 0 1 2.8 0l2 2a2 2 0 0 1-.3 2.9L9.5 19"/></svg>`,alignLeft:`<svg ${l}><path d="M4 6h16M4 12h10M4 18h13"/></svg>`,alignCenter:`<svg ${l}><path d="M4 6h16M7 12h10M5.5 18h13"/></svg>`,alignRight:`<svg ${l}><path d="M4 6h16M10 12h10M7 18h13"/></svg>`,listBullet:`<svg ${l}><circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none"/><path d="M9 6h11M9 12h11M9 18h11"/></svg>`,listNumber:`<svg ${l}><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 5v3M3.3 5H4.7M3 11.5h1.6c.5 0 .9.4.9.9 0 .3-.2.5-.4.7L3 15h2.6M3.3 19h1.4c.5 0 .9-.4.9-.9s-.4-.9-.9-.9H3.3"/></svg>`,plugin:`<svg ${l}><path d="M12 3 4 7v10l8 4 8-4V7Z"/><path d="M4 7l8 4 8-4M12 11v10"/></svg>`,wallet:`<svg ${l}><path d="M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/><path d="M3 7v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5"/><circle cx="16" cy="13" r="1.2" fill="currentColor" stroke="none"/></svg>`},d=`behbar_admin_token`,f=`behbar_admin_staff`,p=`behbar_admin_screen`;function m(e,t){localStorage.setItem(d,e),localStorage.setItem(f,JSON.stringify(t))}function h(){return localStorage.getItem(d)}function g(){let e=localStorage.getItem(f);if(!e)return null;try{let t=JSON.parse(e);return Array.isArray(t.permissions)?t:(_(),null)}catch{return null}}function _(){localStorage.removeItem(d),localStorage.removeItem(f),localStorage.removeItem(p)}function v(e){localStorage.setItem(p,JSON.stringify(e))}function y(){let e=localStorage.getItem(p);if(!e)return null;try{return JSON.parse(e)}catch{return null}}function b(){return h()!==null&&g()!==null}function x(e,t){return(e.permissions??[]).includes(t)}function S(e){return(e.permissions??[]).some(e=>e!==`assignments`)}var C=class extends Error{},w=null;function T(e){w=e}async function E(e,t={}){let n=h(),r=await fetch(`${e}`,{...t,headers:{...t.headers,...n?{Authorization:`Bearer ${n}`}:{}}});if(r.status===401)throw _(),w?.(),new C(`نشست شما منقضی شده است.`);return r}async function D(e,t){let n=await fetch(`/api/staff/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({username:e,password:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ورود ناموفق بود.`);return r?.needsTwoFactor?{needsTwoFactor:!0,challengeToken:r.challengeToken}:{needsTwoFactor:!1,token:r.token,staff:r.staff}}async function O(e,t){let n=await fetch(`/api/staff/login/verify-2fa`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({challengeToken:e,code:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`کد نامعتبر است.`);return r}async function ee(){let e=await E(`/api/staff/2fa/sms/setup`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`ارسال کد ناموفق بود.`)}async function k(e){let t=await E(`/api/staff/2fa/sms/confirm`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`تأیید کد ناموفق بود.`)}async function A(e){let t=await E(`/api/staff/2fa/disable`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({password:e})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`غیرفعال‌سازی ناموفق بود.`)}async function j(){await E(`/api/staff/logout`,{method:`POST`}).catch(()=>{})}async function te(){let e=await E(`/api/staff/me`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت اطلاعات ناموفق بود.`);return{...t.staff,licenseLocked:!!t.licenseLocked}}async function M(e){let t=await E(`/api/admin/requests${e?`?status=${encodeURIComponent(e)}`:``}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت درخواست‌ها ناموفق بود.`);return n.requests??[]}async function N(e,t){let n=await E(`/api/admin/requests/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({status:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی ناموفق بود.`)}async function P(e){let t=await E(`/api/admin/requests/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف درخواست ناموفق بود.`)}async function F(){let e=await E(`/api/admin/requests/export`);if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(typeof t?.error==`string`?t.error:`دریافت خروجی ناموفق بود.`)}let t=await e.blob(),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`behbar-requests-${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)}async function I(){let e=await E(`/api/admin/activity-log`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت گزارش فعالیت ناموفق بود.`);return t.entries??[]}async function R(e,t){let n=await E(`/api/admin/requests/${e}/assign`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({staffId:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`اختصاص ناموفق بود.`)}async function z(){let e=await E(`/api/admin/stats`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت آمار ناموفق بود.`);return t}async function B(){let e=await E(`/api/admin/staff`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت کارمندان ناموفق بود.`);return t.staff??[]}async function ne(e){let t=await E(`/api/admin/staff`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد کارمند ناموفق بود.`);return n.staff}async function re(){let e=await E(`/api/admin/roles`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت نقش‌ها ناموفق بود.`);return{roles:t.roles??[],permissions:t.permissions??[]}}async function ie(e){let t=await E(`/api/admin/roles`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد نقش ناموفق بود.`);return n.role}async function ae(e,t){let n=await E(`/api/admin/roles/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی نقش ناموفق بود.`);return r.role}async function oe(e){let t=await E(`/api/admin/roles/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف نقش ناموفق بود.`)}async function se(e,t){let n=await E(`/api/admin/staff/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی کارمند ناموفق بود.`);return r.staff}async function ce(e){let t=await E(`/api/admin/staff/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف کارمند ناموفق بود.`)}async function le(){let e=await E(`/api/staff/requests`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت درخواست‌ها ناموفق بود.`);return t.requests??[]}async function ue(e,t){let n=await E(`/api/staff/requests/${e}/status`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({status:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی ناموفق بود.`)}async function de(){let e=await E(`/api/admin/articles`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت مقالات ناموفق بود.`);return t.articles??[]}async function fe(e){let t=await E(`/api/admin/articles`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد مقاله ناموفق بود.`);return n.article}async function pe(e,t){let n=await E(`/api/admin/articles/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی مقاله ناموفق بود.`);return r.article}async function me(e,t){let n=await E(`/api/admin/articles/${e}/${t?`publish`:`unpublish`}`,{method:`PATCH`}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی وضعیت ناموفق بود.`);return r.article}async function he(e){let t=await E(`/api/admin/articles/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف مقاله ناموفق بود.`)}async function ge(){let e=await E(`/api/admin/pages`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت برگه‌ها ناموفق بود.`);return t.pages??[]}async function _e(e){let t=await E(`/api/admin/pages/${e}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت برگه ناموفق بود.`);return n.page}async function ve(e){let t=await E(`/api/admin/pages`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد برگه ناموفق بود.`);return n.page}async function ye(e,t){let n=await E(`/api/admin/pages/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی برگه ناموفق بود.`);return r.page}async function be(e,t){let n=await E(`/api/admin/pages/${e}/${t?`publish`:`unpublish`}`,{method:`PATCH`}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی وضعیت برگه ناموفق بود.`);return r.page}async function xe(e){let t=await E(`/api/admin/pages/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف برگه ناموفق بود.`)}async function Se(e){let t=h(),n=await fetch(`/api/admin/upload`,{method:`POST`,headers:{"Content-Type":e.type,...t?{Authorization:`Bearer ${t}`}:{}},body:e}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`آپلود تصویر ناموفق بود.`);return`${r.url}`}async function Ce(e){let t=await E(`/api/admin/media${e?`?folder=${e}`:``}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت فهرست فایل‌ها ناموفق بود.`);return n.files??[]}async function we(e){let t=await E(`/api/admin/media/${encodeURIComponent(e)}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف فایل ناموفق بود.`)}async function Te(){let e=await fetch(`/api/settings`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت تنظیمات ناموفق بود.`);return t.settings??{}}async function V(e,t){let n=await E(`/api/admin/settings`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({key:e,value:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی تنظیمات ناموفق بود.`)}async function Ee(e,t,n){let r=await E(`/api/admin/ai/test-connection`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({provider:e,apiKey:t,model:n})}),i=await r.json().catch(()=>({}));if(!r.ok)throw Error(typeof i?.error==`string`?i.error:`اتصال ناموفق بود.`);return i}async function De(e,t){let n=await E(`/api/admin/sms/test-connection`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({username:e,password:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`اتصال ناموفق بود.`);return r}async function Oe(){let e=await E(`/api/admin/testimonials`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت نظرات ناموفق بود.`);return t.testimonials??[]}async function ke(e){let t=await E(`/api/admin/testimonials`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد نظر ناموفق بود.`);return n.testimonial}async function Ae(e,t){let n=await E(`/api/admin/testimonials/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی نظر ناموفق بود.`);return r.testimonial}async function je(e){let t=await E(`/api/admin/testimonials/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف نظر ناموفق بود.`)}async function Me(){let e=await E(`/api/admin/license`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت اطلاعات لایسنس ناموفق بود.`);return t.license??null}async function Ne(e){let t=await E(`/api/admin/license/activate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({licenseKey:e})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`فعال‌سازی لایسنس ناموفق بود.`);return n.license}async function Pe(){let e=await E(`/api/admin/chat/conversations`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت گفتگوها ناموفق بود.`);return t.conversations??[]}async function Fe(e){let t=await E(`/api/admin/chat/conversations/${e}/messages`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت پیام‌ها ناموفق بود.`);return n.messages??[]}async function Ie(e,t){let n=await E(`/api/admin/chat/conversations/${e}/messages`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({text:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ارسال پیام ناموفق بود.`)}async function Le(e,t){let n=await E(`/api/admin/chat/conversations/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({status:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی وضعیت ناموفق بود.`)}async function Re(e,t){let n=await E(`/api/admin/chat/conversations/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({assignedStaffId:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`واگذاری گفتگو ناموفق بود.`)}async function ze(e,t){let n=await E(`/api/admin/chat/conversations/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({archived:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`بایگانی گفتگو ناموفق بود.`)}async function Be(e){let t=await E(`/api/admin/chat/conversations/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف گفتگو ناموفق بود.`)}async function Ve(e){let t=await E(`/api/admin/requests?phone=${encodeURIComponent(e)}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت درخواست‌های مرتبط ناموفق بود.`);return n.requests??[]}async function He(e){let t=await E(`/api/admin/requests?staffId=${e}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت تاریخچه ناموفق بود.`);return n.requests??[]}async function Ue(e){let t=await E(`/api/admin/requests/${e}/events`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت تاریخچه ناموفق بود.`);return n.events??[]}async function We(){let e=await E(`/api/admin/chat/agents`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت پشتیبان‌ها ناموفق بود.`);return t.agents??[]}async function Ge(){let e=await E(`/api/admin/stories`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت استوری‌ها ناموفق بود.`);return t.stories??[]}async function Ke(e){let t=await E(`/api/admin/stories`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد استوری ناموفق بود.`);return n.story}async function qe(e,t){let n=await E(`/api/admin/stories/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی استوری ناموفق بود.`);return r.story}async function H(e){let t=await E(`/api/admin/stories/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف استوری ناموفق بود.`)}async function Je(){let e=await E(`/api/admin/job-applications`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت درخواست‌های همکاری ناموفق بود.`);return t.applications??[]}async function Ye(e,t){let n=await E(`/api/admin/job-applications/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({status:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی وضعیت ناموفق بود.`);return r.application}async function Xe(e){let t=await E(`/api/admin/job-applications/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف درخواست ناموفق بود.`)}async function Ze(){let e=await E(`/api/admin/fleet-vehicles`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت وسایل نقلیه ناموفق بود.`);return t.vehicles??[]}async function Qe(e){let t=await E(`/api/admin/fleet-vehicles`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`ایجاد وسیله نقلیه ناموفق بود.`);return n.vehicle}async function $e(e,t){let n=await E(`/api/admin/fleet-vehicles/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`به‌روزرسانی وسیله نقلیه ناموفق بود.`);return r.vehicle}async function et(e){let t=await E(`/api/admin/fleet-vehicles/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف وسیله نقلیه ناموفق بود.`)}async function tt(){let e=await E(`/api/admin/plugins`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت افزونه‌ها ناموفق بود.`);return t.plugins??{}}async function nt(e){let t=await E(`/api/admin/requests/${e}/reports`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت گزارش‌ها ناموفق بود.`);return n.reports??[]}async function rt(e,t){let n=await E(`/api/admin/requests/${e}/reports`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({message:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ثبت گزارش ناموفق بود.`);return r}async function it(){let e=await E(`/api/admin/analytics`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت آمار بازدید ناموفق بود.`);return t}async function at(){let e=await E(`/api/admin/backup/export`);if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(typeof t?.error==`string`?t.error:`دریافت فایل پشتیبان ناموفق بود.`)}let t=(e.headers.get(`Content-Disposition`)??``).match(/filename="([^"]+)"/)?.[1]??`behbar-backup.sql`,n=await e.blob(),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}async function ot(e){let t=await E(`/api/admin/backup/import`,{method:`POST`,headers:{"Content-Type":`application/sql`},body:e}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`بازیابی پشتیبان ناموفق بود.`)}async function st(){let e=await E(`/api/admin/backup/drive-test`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`ارسال آزمایشی به گوگل درایو ناموفق بود.`)}async function ct(){let e=await E(`/api/admin/backup/drive-oauth/prepare`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`آماده‌سازی اتصال به گوگل ناموفق بود.`);return t.authUrl}async function lt(){let e=await E(`/api/admin/backup/drive-disconnect`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`قطع اتصال ناموفق بود.`)}async function ut(e,t){let n=await E(`/api/admin/ai/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({messages:e,conversationId:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ارتباط با دستیار هوش مصنوعی ناموفق بود.`);return r}async function dt(e,t,n){let r=await E(`/api/admin/ai/execute`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({messages:e,toolCallId:t.toolCallId,tool:t.tool,args:t.args,conversationId:n})}),i=await r.json().catch(()=>({}));if(!r.ok)throw Error(typeof i?.error==`string`?i.error:`اجرای اقدام ناموفق بود.`);return i}async function ft(){let e=await E(`/api/admin/ai/conversations`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`فهرست گفتگوها دریافت نشد.`);return t.conversations??[]}async function pt(e){let t=await E(`/api/admin/ai/conversations/${e}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`گفتگو دریافت نشد.`);return n}async function mt(){let e=await E(`/api/admin/ai/conversations`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`ساخت گفتگوی جدید ناموفق بود.`);return t.id}async function ht(e){let t=await E(`/api/admin/ai/conversations/${e}`,{method:`DELETE`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`حذف گفتگو ناموفق بود.`)}async function gt(){let e=await E(`/api/admin/version`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت اطلاعات نسخه ناموفق بود.`);return t}async function _t(){let e=await E(`/api/admin/selfhost/update`,{method:`POST`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`به‌روزرسانی ناموفق بود.`)}async function vt(){let e=await E(`/api/staff/wallet`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت کیف پول ناموفق بود.`);return t}async function U(e,t){let n=await E(`/api/staff/wallet/transactions?limit=${e}&offset=${t}`),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`دریافت تراکنش‌ها ناموفق بود.`);return{transactions:r.transactions??[],total:r.total??0}}async function W(){let e=await E(`/api/staff/wallet/payout-requests`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت درخواست‌های تسویه ناموفق بود.`);return t.payoutRequests??[]}async function yt(e,t){let n=await E(`/api/staff/wallet/payout-requests`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({amount:e,note:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ثبت درخواست تسویه ناموفق بود.`)}async function bt(){let e=await E(`/api/admin/wallet/staff`),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(typeof t?.error==`string`?t.error:`دریافت کیف پول‌ها ناموفق بود.`);return t.wallets??[]}async function xt(e,t,n){let r=await E(`/api/admin/wallet/staff/${e}/transactions?limit=${t}&offset=${n}`),i=await r.json().catch(()=>({}));if(!r.ok)throw Error(typeof i?.error==`string`?i.error:`دریافت تراکنش‌ها ناموفق بود.`);return{transactions:i.transactions??[],total:i.total??0}}async function St(e,t,n,r){let i=await E(`/api/admin/wallet/staff/${e}/adjustments`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({direction:t,amount:n,description:r})}),a=await i.json().catch(()=>({}));if(!i.ok)throw Error(typeof a?.error==`string`?a.error:`ثبت اصلاحیه ناموفق بود.`)}async function G(e,t){let n=await E(`/api/admin/wallet/staff/${e}/rate-override`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ذخیره نرخ ناموفق بود.`)}async function Ct(e,t){let n=await E(`/api/admin/roles/${e}/pay-rate`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`ذخیره نرخ نقش ناموفق بود.`)}async function wt(e=`pending`){let t=await E(`/api/admin/wallet/payout-requests?status=${e}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت درخواست‌های تسویه ناموفق بود.`);return n.payoutRequests??[]}async function Tt(e){let t=await E(`/api/admin/wallet/payout-requests/${e}/approve`,{method:`POST`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`تأیید درخواست ناموفق بود.`)}async function Et(e,t){let n=await E(`/api/admin/wallet/payout-requests/${e}/reject`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({note:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`رد درخواست ناموفق بود.`)}async function Dt(e){let t=await E(`/api/admin/wallet/payroll/preview?month=${e}`),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(typeof n?.error==`string`?n.error:`دریافت پیش‌نمایش حقوق ناموفق بود.`);return n.entries??[]}async function Ot(e,t){let n=await E(`/api/admin/wallet/payroll/confirm`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({month:e,entries:t})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(typeof r?.error==`string`?r.error:`پردازش حقوق ناموفق بود.`);return r}function kt(e,t=6){return`
    <div class="otp-input-group" id="${e}-group">${Array.from({length:t},(e,t)=>`<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" class="otp-digit" data-otp-index="${t}" />`).join(``)}</div>
    <div class="otp-resend-row">
      <span class="otp-timer" id="${e}-timer"></span>
      <button type="button" class="otp-resend-btn" id="${e}-resend-btn" hidden>ارسال دوباره‌ی کد</button>
    </div>
  `}function K(e,t){let n=t.length??6,r=t.resendSeconds??60,i=document.getElementById(`${e}-group`),a=document.getElementById(`${e}-timer`),o=document.getElementById(`${e}-resend-btn`);if(!i||!a||!o)return null;let s=Array.from(i.querySelectorAll(`.otp-digit`)),c=null,l=null;function u(){return s.map(e=>e.value).join(``)}function d(){let e=u();e.length===n&&/^\d+$/.test(e)&&(h(),t.onComplete(e))}s.forEach((e,t)=>{e.addEventListener(`input`,()=>{e.value=e.value.replace(/\D/g,``).slice(-1),e.value&&t<s.length-1&&s[t+1].focus(),d()}),e.addEventListener(`keydown`,n=>{n.key===`Backspace`&&!e.value&&t>0&&s[t-1].focus()}),e.addEventListener(`paste`,e=>{let t=e.clipboardData?.getData(`text`).replace(/\D/g,``)??``;if(!t)return;e.preventDefault(),t.slice(0,n).split(``).forEach((e,t)=>{s[t]&&(s[t].value=e)});let r=Math.min(t.length,n)-1;r>=0&&s[r].focus(),d()})});function f(){let e=r;o.hidden=!0,a.hidden=!1,c&&window.clearInterval(c);let t=()=>{let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);a.textContent=`ارسال دوباره تا ${t}:${n}`,e<=0&&(c&&window.clearInterval(c),a.hidden=!0,o.hidden=!1),--e};t(),c=window.setInterval(t,1e3)}o.addEventListener(`click`,()=>{t.onResend(),p(),f()});function p(){s.forEach(e=>e.value=``),s[0]?.focus()}function m(){s[0]?.focus()}function h(){l?.abort(),l=null}return`OTPCredential`in window&&(l=new AbortController,navigator.credentials.get({otp:{transport:[`sms`]},signal:l.signal}).then(e=>{let t=e?.code?.replace(/\D/g,``);t&&t.length===n&&(t.split(``).forEach((e,t)=>{s[t]&&(s[t].value=e)}),d())}).catch(()=>{})),f(),m(),{reset:p,focusFirst:m,stopWebOtp:h,getCode:u}}function At(){return`
    <div class="login-screen">
      <form class="login-card" id="login-form" novalidate>
        <div class="login-brand">
          <img class="login-brand-logo" src="/favicon.svg" alt="" />
          <span id="login-brand-text">پنل مدیریت بهبار</span>
        </div>
        <p class="login-demo-notice" id="login-demo-notice" hidden>
          این یک حساب آزمایشی (فقط نمایش) است — اطلاعات ورود از پیش پر شده، فقط روی «ورود» بزنید.
        </p>
        <div class="form-field">
          <label for="login-username">نام کاربری</label>
          <div class="login-input-wrapper">
            <span class="icon">${u.user}</span>
            <input type="text" id="login-username" autocomplete="username" autofocus />
          </div>
        </div>
        <div class="form-field">
          <label for="login-password">رمز عبور</label>
          <div class="login-input-wrapper">
            <span class="icon">${u.lock}</span>
            <input type="password" id="login-password" autocomplete="current-password" />
          </div>
        </div>
        <p class="error-text" id="login-error" hidden></p>
        <button type="submit" class="btn btn-primary btn-block" id="login-submit">ورود</button>
      </form>

      <div class="login-card" id="login-2fa-form" hidden>
        <div class="login-brand">
          <img class="login-brand-logo" src="/favicon.svg" alt="" />
          <span id="login-2fa-title">تأیید ورود</span>
        </div>
        <p class="login-2fa-hint" id="login-2fa-hint"></p>
        ${kt(`login-2fa`)}
        <p class="error-text" id="login-2fa-error" hidden></p>
        <p class="login-2fa-verifying" id="login-2fa-verifying" hidden>در حال تأیید...</p>
        <button type="button" class="btn btn-ghost btn-block" id="login-2fa-back">بازگشت</button>
      </div>
    </div>
  `}function jt(e){let t=document.getElementById(`login-form`),n=document.getElementById(`login-username`),r=document.getElementById(`login-password`),i=document.getElementById(`login-error`),a=document.getElementById(`login-submit`),o=document.getElementById(`login-2fa-form`),s=document.getElementById(`login-2fa-hint`),c=document.getElementById(`login-2fa-error`),l=document.getElementById(`login-2fa-verifying`),u=document.getElementById(`login-2fa-back`);if(!t||!n||!r||!i||!a||!o||!s||!c||!l||!u)return;new URLSearchParams(location.search).get(`demo`)===`1`&&(n.value=`test`,r.value=`12345678`,document.getElementById(`login-demo-notice`).hidden=!1);let d=``,f=null;async function p(t){c.hidden=!0,l.hidden=!1;try{let{token:n,staff:r}=await O(d,t);m(n,r),e(r)}catch(e){l.hidden=!0,c.hidden=!1,c.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`,f?.reset()}}async function h(){try{let e=await D(n.value.trim(),r.value);e.needsTwoFactor&&(d=e.challengeToken)}catch(e){c.hidden=!1,c.textContent=e instanceof Error?e.message:`ارسال دوباره‌ی کد ناموفق بود.`}}function g(){t.hidden=!0,o.hidden=!1,s.textContent=`کد ۶رقمی که همین الان پیامک شد را وارد کنید.`,f=K(`login-2fa`,{onComplete:e=>void p(e),onResend:()=>void h()})}function _(){d=``,f?.stopWebOtp(),f=null,o.hidden=!0,t.hidden=!1,r.value=``,r.focus()}t.addEventListener(`submit`,async t=>{t.preventDefault(),i.hidden=!0,a.disabled=!0,a.textContent=`در حال ورود...`;try{let t=await D(n.value.trim(),r.value);t.needsTwoFactor?(d=t.challengeToken,g()):(m(t.token,t.staff),e(t.staff))}catch(e){i.hidden=!1,i.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}finally{a.disabled=!1,a.textContent=`ورود`}}),u.addEventListener(`click`,_)}function Mt(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var Nt=`سلام! از من درباره‌ی مقاله‌ها، نظرات مشتریان، درخواست‌های همکاری، آمار یا تنظیمات سئو بپرس. برای هر تغییری، قبل از اجرا از تو تأیید می‌گیرم.`;function Pt(){return`
    <button type="button" class="ai-widget-toggle" id="ai-widget-toggle" aria-label="دستیار هوش مصنوعی">
      <span class="icon">${u.ai}</span>
    </button>
    <div class="ai-widget-overlay" id="ai-widget-panel" hidden>
      <aside class="ai-widget-sidebar">
        <button type="button" class="btn btn-primary btn-block" id="ai-widget-new-chat-btn">
          <span class="icon">${u.plusCircle}</span>
          گفتگوی جدید
        </button>
        <div class="ai-widget-conversation-list" id="ai-widget-conversation-list"></div>
      </aside>
      <div class="ai-widget-main">
        <div class="ai-widget-header">
          <span class="ai-widget-title"><span class="icon">${u.ai}</span> دستیار هوش مصنوعی</span>
          <button type="button" class="ai-widget-close" id="ai-widget-close" aria-label="بستن">${u.close}</button>
        </div>
        <p class="error-text" id="ai-widget-error" hidden></p>
        <div class="chat-thread ai-widget-thread">
          <div class="chat-thread-messages" id="ai-widget-messages"></div>
          <form class="chat-thread-form" id="ai-widget-form">
            <textarea id="ai-widget-input" rows="1" placeholder="مثلاً: چند مقاله عنوان سئو ندارند؟"></textarea>
            <button type="submit" class="btn btn-primary" id="ai-widget-send-btn">
              <span class="icon">${u.ai}</span>
              ارسال
            </button>
          </form>
        </div>
      </div>
    </div>
  `}function Ft(){let e=document.getElementById(`ai-widget-toggle`),t=document.getElementById(`ai-widget-close`),n=document.getElementById(`ai-widget-panel`),r=document.getElementById(`ai-widget-error`),i=document.getElementById(`ai-widget-messages`),a=document.getElementById(`ai-widget-form`),o=document.getElementById(`ai-widget-input`),s=document.getElementById(`ai-widget-send-btn`),c=document.getElementById(`ai-widget-new-chat-btn`),l=document.getElementById(`ai-widget-conversation-list`);if(!e||!t||!n||!r||!i||!a||!o||!s||!c||!l)return;let d=[],f=null,p=[],m=null,h=!1;function g(e){r.hidden=!1,r.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}function _(){l.innerHTML=d.length?d.map(e=>`
        <div class="ai-widget-conversation-row ${e.id===f?`is-active`:``}" data-conversation-id="${e.id}">
          <button type="button" class="ai-widget-conversation-title" data-select-conversation="${e.id}">${Mt(e.title||`گفتگوی جدید`)}</button>
          <button type="button" class="ai-widget-conversation-delete" data-delete-conversation="${e.id}" title="حذف">حذف</button>
        </div>
      `).join(``):`<p class="ai-widget-empty-list">هنوز گفتگویی نداری.</p>`}function v(){let e=[];p.length||e.push(`<div class="chat-bubble-admin chat-bubble-admin-customer"><div class="chat-bubble-body"><p>${Mt(Nt)}</p></div></div>`);for(let t of p)t.role===`user`&&t.content?e.push(`<div class="chat-bubble-admin chat-bubble-admin-staff"><div class="chat-bubble-body"><p>${Mt(t.content)}</p></div></div>`):t.role===`assistant`&&t.content&&e.push(`<div class="chat-bubble-admin chat-bubble-admin-customer"><div class="chat-bubble-body"><p>${Mt(t.content)}</p></div></div>`);m&&e.push(`
        <div class="chat-bubble-admin chat-bubble-admin-customer">
          <div class="chat-bubble-body">
            <p>${Mt(m.summary)}</p>
            <div class="staff-table-actions" style="margin-top: var(--space-2)">
              <button type="button" class="btn btn-primary btn-sm" id="ai-widget-confirm-btn">تأیید و اجرا</button>
              <button type="button" class="btn btn-ghost btn-sm" id="ai-widget-cancel-btn">لغو</button>
            </div>
          </div>
        </div>
      `),i.innerHTML=e.join(``),i.scrollTop=i.scrollHeight,document.getElementById(`ai-widget-confirm-btn`)?.addEventListener(`click`,()=>void w()),document.getElementById(`ai-widget-cancel-btn`)?.addEventListener(`click`,T)}function y(e){o.disabled=e,s.disabled=e,e?s.textContent=`در حال پاسخ...`:s.innerHTML=`<span class="icon">${u.ai}</span>ارسال`}async function b(e){r.hidden=!0,m=null,f=e,_();try{p=(await pt(e)).messages,v()}catch(e){g(e)}}async function x(){r.hidden=!0;try{let e=await mt();d=[{id:e,title:``,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},...d],f=e,p=[],m=null,_(),v(),o.focus()}catch(e){g(e)}}async function S(){if(!h){h=!0;try{d=await ft(),_(),d.length?await b(d[0].id):await x()}catch(e){g(e)}}}e.addEventListener(`click`,()=>{n.hidden=!n.hidden,n.hidden||(S(),o.focus())}),t.addEventListener(`click`,()=>{n.hidden=!0}),c.addEventListener(`click`,()=>void x()),l.addEventListener(`click`,e=>{let t=e.target.closest(`[data-select-conversation]`);if(t){let e=Number(t.dataset.selectConversation);e!==f&&b(e);return}let n=e.target.closest(`[data-delete-conversation]`);if(n){let e=Number(n.dataset.deleteConversation);if(!window.confirm(`این گفتگو برای همیشه حذف شود؟`))return;(async()=>{try{await ht(e),d=d.filter(t=>t.id!==e),_(),e===f&&(d.length?await b(d[0].id):await x())}catch(e){g(e)}})()}});async function C(e){f||await x(),r.hidden=!0,p=[...p,{role:`user`,content:e}],v(),y(!0);try{let e=await ut(p,f);p=e.messages,m=e.pendingAction,v(),d=await ft().catch(()=>d),_()}catch(e){g(e)}finally{y(!1)}}async function w(){if(!m||!f)return;r.hidden=!0;let e=m;m=null,y(!0);try{let t=await dt(p,e,f);p=t.messages,m=t.pendingAction,v()}catch(e){g(e)}finally{y(!1)}}function T(){m&&(p=[...p,{role:`tool`,tool_call_id:m.toolCallId,content:`کارمند این اقدام را لغو کرد.`}],m=null,v())}a.addEventListener(`submit`,e=>{e.preventDefault();let t=o.value.trim();t&&(o.value=``,C(t))}),o.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),a.requestSubmit())})}function It(){return`
    <div class="license-lock-banner">
      <span class="icon">${u.lock}</span>
      <span>دوره‌ی آزمایشی این نصب به پایان رسیده — تا خرید لایسنس، فقط امکان مشاهده دارید.</span>
      <a class="btn btn-primary btn-sm" href="https://behbarapp.ir/sale" target="_blank" rel="noopener noreferrer">خرید لایسنس</a>
    </div>
  `}function Lt(){return`
    <div class="demo-account-banner">
      <span class="icon">${u.eye}</span>
      <span>حساب کاربری آزمایشی بهبار با دسترسی مدیریتی کامل برای بررسی و آزمایش تمامی امکانات سامانه.</span>
    </div>
  `}function Rt(e){let t=[];return x(e,`dashboard`)&&t.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="dashboard">
        <span class="icon">${u.chart}</span>
        <span>داشبورد</span>
      </button>
    `),x(e,`pipeline`)&&t.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="pipeline">
        <span class="icon">${u.columns}</span>
        <span>درخواست‌ها</span>
      </button>
    `),x(e,`map`)&&t.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="map">
        <span class="icon">${u.map}</span>
        <span>نقشه زنده</span>
      </button>
    `),x(e,`staff`)&&t.push(`
      <button type="button" class="admin-topbar-tab" data-admin-tab="fleet">
        <span class="icon">${u.truck}</span>
        <span>ناوگان</span>
      </button>
    `),t.push(`
    <button type="button" class="admin-topbar-tab" data-admin-tab="home">
      <span class="icon">${u.grid}</span>
      <span>سایر بخش‌ها</span>
    </button>
  `),`
    <div class="admin-shell">
      <header class="admin-topbar">
        <div class="admin-topbar-start">
          <button type="button" class="admin-back-btn" id="admin-back-btn" hidden>
            <span class="icon">${u.arrowRight}</span>
            <span>بازگشت</span>
          </button>
          <div class="admin-logo" id="admin-logo-btn" role="button" tabindex="0" title="صفحه اصلی">
            <img class="admin-logo-mark" src="/favicon.svg" alt="" />
            <span class="admin-logo-title">بهبار</span>
          </div>
          <nav class="admin-topbar-nav" id="admin-topbar-nav" aria-label="ناوبری اصلی">
            ${t.join(``)}
          </nav>
        </div>
        <div class="admin-topbar-end">
          <span class="admin-topbar-version" id="admin-sidebar-version" hidden></span>
          <button type="button" class="admin-topbar-icon-btn" id="admin-wallet-btn" title="کیف پول من">
            <span class="icon">${u.wallet}</span>
          </button>
          <button type="button" class="admin-topbar-user" id="admin-account-btn" title="امنیت حساب">${e.fullName} · ${e.roleLabel}</button>
          <button type="button" class="admin-nav-item admin-logout" id="logout-btn">
            <span class="icon">${u.logout}</span>
            <span>خروج</span>
          </button>
        </div>
      </header>
      ${e.licenseLocked?It():``}
      ${e.username===`test`?Lt():``}
      <main class="admin-main">
        <div id="view-container"></div>
      </main>
      ${x(e,`ai`)?Pt():``}
    </div>
  `}var zt=[{id:`pending`,label:`در انتظار بررسی`,color:`var(--muted)`},{id:`contacted`,label:`تماس گرفته شده`,color:`var(--warning)`},{id:`scheduled`,label:`زمان‌بندی شده`,color:`var(--secondary)`},{id:`in_progress`,label:`در حال انجام`,color:`var(--primary)`},{id:`completed`,label:`انجام شده`,color:`var(--success)`},{id:`cancelled`,label:`لغو شده`,color:`var(--danger)`}],Bt=Object.fromEntries(zt.map(e=>[e.id,e.label])),Vt=Object.fromEntries(zt.map(e=>[e.id,e.color])),Ht=[`۰`,`۱`,`۲`,`۳`,`۴`,`۵`,`۶`,`۷`,`۸`,`۹`];function q(e){return String(e).replace(/[0-9]/g,e=>Ht[Number(e)])}function J(e){return`${q(Math.round(e).toLocaleString(`en-US`))} تومان`}function Y(e,t){return~~(e/t)}function X(e,t){return e-~~(e/t)*t}var Ut=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];function Wt(e){let t=Ut.length,n=e+621,r=-14,i=Ut[0];if(e<i||e>=Ut[t-1])throw Error(`Invalid Jalaali year ${e}`);let a=0;for(let n=1;n<t;n+=1){let t=Ut[n];if(a=t-i,e<t)break;r=r+Y(a,33)*8+Y(X(a,33),4),i=t}let o=e-i;r=r+Y(o,33)*8+Y(X(o,33)+3,4),X(a,33)===4&&a-o===4&&(r+=1);let s=Y(n,4)-Y((Y(n,100)+1)*3,4)-150,c=20+r-s;a-o<6&&(o=o-a+Y(a,33)*33);let l=X(X(o+1,33)-1,4);return l===-1&&(l=4),{leap:l,gy:n,march:c}}function Gt(e,t,n){let r=Y((e+Y(t-8,6)+100100)*1461,4)+Y(153*X(t+9,12)+2,5)+n-34840408;return r=r-Y(Y(e+100100+Y(t-8,6),100)*3,4)+752,r}function Kt(e){let t=4*e+139361631;t=t+Y(Y(4*e+183187720,146097)*3,4)*4-3908;let n=Y(X(t,1461),4)*5+308,r=Y(X(n,153),5)+1,i=X(Y(n,153),12)+1;return{gy:Y(t,1461)-100100+Y(8-i,6),gm:i,gd:r}}function qt(e){let t=Kt(e).gy-621,n=Wt(t),r=e-Gt(n.gy,3,n.march),i,a;if(r>=0){if(r<=185)return i=1+Y(r,31),a=X(r,31)+1,{jy:t,jm:i,jd:a};r-=186}else--t,r+=179,n.leap===1&&(r+=1);return i=7+Y(r,30),a=X(r,30)+1,{jy:t,jm:i,jd:a}}function Jt(e){return qt(Gt(e.getFullYear(),e.getMonth()+1,e.getDate()))}var Yt=[`فروردین`,`اردیبهشت`,`خرداد`,`تیر`,`مرداد`,`شهریور`,`مهر`,`آبان`,`آذر`,`دی`,`بهمن`,`اسفند`],Xt=[`۰`,`۱`,`۲`,`۳`,`۴`,`۵`,`۶`,`۷`,`۸`,`۹`];function Zt(e){return String(e).replace(/[0-9]/g,e=>Xt[Number(e)])}function Qt(e){return`${Yt[e.jm-1]} ${Zt(e.jd)}، ${Zt(e.jy)}`}function $t(e){return new Date(e.replace(` `,`T`)+`Z`)}function en(e){let t=$t(e),n=Jt(new Date),r=Jt(t),i=`${Zt(String(t.getHours()).padStart(2,`0`))}:${Zt(String(t.getMinutes()).padStart(2,`0`))}`;return n.jy===r.jy&&n.jm===r.jm&&n.jd===r.jd?`امروز، ${i}`:`${Qt(r)}، ${i}`}var tn=3e4,nn=`pending`,rn;function an(e){return zt.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${t.label}</option>`).join(``)}function Z(e,t){return`<option value="">اختصاص‌نیافته</option>${t.map(t=>{let n=t.onActiveService&&t.id!==e,r=n?`${t.fullName} (${t.roleLabel} — در حال سرویس)`:`${t.fullName} (${t.roleLabel})`;return`<option value="${t.id}" ${t.id===e?`selected`:``} ${n?`disabled`:``}>${r}</option>`}).join(``)}`}function on(e,t){return!t||`${e.trackingCode} ${e.phone} ${e.originCity} ${e.destinationCity} ${e.customerName}`.toLowerCase().includes(t.toLowerCase())}function sn(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function cn(e){return e?e.length?e.map(e=>`
      <div class="pipeline-report-item">
        <div class="pipeline-report-item-head">
          <span>${sn(e.staffName)}</span>
          <span class="pipeline-report-status pipeline-report-status-${e.smsStatus}">${e.smsStatus===`sent`?`پیامک ارسال شد`:`پیامک ارسال نشد`}</span>
        </div>
        <p>${sn(e.message)}</p>
      </div>
    `).join(``):`<p class="pipeline-report-empty">هنوز گزارشی ثبت نشده است.</p>`:``}function ln(e){return e?e.length?`
    <ol class="pipeline-timeline">
      ${e.map(e=>`
        <li class="pipeline-timeline-item pipeline-timeline-${e.type}">
          <span class="pipeline-timeline-dot"></span>
          <div class="pipeline-timeline-body">
            <p>${sn(e.description)}</p>
            <span class="pipeline-timeline-meta">${e.staffName?`${sn(e.staffName)} — `:``}${en(e.createdAt)}</span>
          </div>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="pipeline-report-empty">هنوز رویدادی ثبت نشده است.</p>`:``}function un(e,t,n,r,i,a,o){return`
    <div class="pipeline-card" data-card-id="${e.id}" style="--card-accent:${Vt[e.status]??`var(--muted)`}">
      <div class="pipeline-card-top">
        <span class="pipeline-tracking">#${q(e.trackingCode)}</span>
        <span class="pipeline-card-top-end">
          <span class="pipeline-estimate">${J(e.estimateAvg)}</span>
          <button type="button" class="pipeline-delete-btn" data-delete-request-id="${e.id}" title="حذف کامل درخواست" aria-label="حذف کامل درخواست">${u.close}</button>
        </span>
      </div>
      <div class="pipeline-row">
        <span class="pipeline-service">${e.serviceLabel}</span>
        <span class="pipeline-muted">${e.customerName}</span>
      </div>
      <div class="pipeline-row">
        <span class="icon">${u.pin}</span>
        <span>${e.originCity}${e.originCountry&&e.originCountry!==`ایران`?` (${e.originCountry})`:``}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${u.flag}</span>
        <span>${e.destinationCity}${e.destinationCountry&&e.destinationCountry!==`ایران`?` (${e.destinationCountry})`:``}</span>
      </div>
      <div class="pipeline-row pipeline-muted">
        <span class="icon">${u.calendar}</span>
        <span>${e.scheduledDate} — ساعت ${q(e.scheduledTime)}</span>
        <a class="pipeline-phone" href="tel:${e.phone}" dir="ltr">${e.phone}</a>
      </div>
      ${e.originNotes?`<p class="pipeline-note"><strong>یادداشت مبدأ:</strong> ${sn(e.originNotes)}</p>`:``}
      ${e.destinationNotes?`<p class="pipeline-note"><strong>یادداشت مقصد:</strong> ${sn(e.destinationNotes)}</p>`:``}
      <div class="pipeline-selects">
        <select class="pipeline-status-select" data-status-select-id="${e.id}">
          ${an(e.status)}
        </select>
        <select class="pipeline-status-select" data-assign-select-id="${e.id}">
          ${Z(e.assignedStaffId,t)}
        </select>
      </div>
      <div class="pipeline-report">
        <button type="button" class="pipeline-report-toggle" data-report-toggle-id="${e.id}" aria-expanded="${n}">
          <span class="icon">${u.message}</span>
          ثبت گزارش
        </button>
        <div class="pipeline-report-body" data-report-body-id="${e.id}" ${n?``:`hidden`}>
          <div class="pipeline-report-list" data-report-list-id="${e.id}">${cn(r)}</div>
          <textarea class="pipeline-report-textarea" data-report-textarea-id="${e.id}" rows="2" placeholder="متنی که برای مشتری پیامک می‌شود...">${sn(i)}</textarea>
          <div class="pipeline-report-actions">
            <p class="pipeline-report-error" data-report-error-id="${e.id}" hidden></p>
            <button type="button" class="btn btn-secondary btn-sm" data-report-send-id="${e.id}">ارسال پیامک به مشتری</button>
          </div>
        </div>
      </div>
      <div class="pipeline-report">
        <button type="button" class="pipeline-report-toggle" data-history-toggle-id="${e.id}" aria-expanded="${a}">
          <span class="icon">${u.refresh}</span>
          تاریخچه
        </button>
        <div class="pipeline-report-body" data-history-body-id="${e.id}" ${a?``:`hidden`}>
          <div data-history-list-id="${e.id}">${ln(o)}</div>
        </div>
      </div>
    </div>
  `}function dn(){return`
    <div class="view-header">
      <h1>مراحل درخواست‌ها</h1>
      <div class="pipeline-toolbar">
        <input type="text" class="pipeline-search" id="pipeline-search" placeholder="جست‌وجو: کد رهگیری، شماره، شهر، نام..." />
        <span class="pipeline-live" id="pipeline-live" title="هر ۳۰ ثانیه به‌روزرسانی می‌شود">
          <span class="pipeline-live-dot"></span>
          زنده
        </span>
        <button type="button" class="btn btn-secondary" id="pipeline-refresh">
          <span class="icon">${u.refresh}</span>
          به‌روزرسانی
        </button>
        <button type="button" class="btn btn-secondary" id="pipeline-export-csv">
          <span class="icon">${u.download}</span>
          خروجی CSV
        </button>
      </div>
    </div>
    <p class="error-text" id="pipeline-error" hidden></p>
    <div class="pipeline-tabs" id="pipeline-tabs">
      ${zt.map(e=>`
          <button type="button" class="pipeline-tab ${e.id===nn?`is-active`:``}" data-pipeline-tab="${e.id}" style="--tab-accent:${e.color}">
            <span>${e.label}</span>
            <span class="pipeline-count" id="pipeline-count-${e.id}">۰</span>
          </button>
        `).join(``)}
    </div>
    <div class="pipeline-list" id="pipeline-list"></div>
  `}function fn(){let e=document.getElementById(`pipeline-list`),t=document.getElementById(`pipeline-tabs`),n=document.getElementById(`pipeline-error`),r=document.getElementById(`pipeline-refresh`),i=document.getElementById(`pipeline-search`);if(!e||!t||!n||!r||!i)return;let a=[],o=[],s=``,c=nn,l=new Set,u=new Map,d=new Map,f=new Set,p=new Map;function m(){zt.forEach(e=>{let t=document.getElementById(`pipeline-count-${e.id}`);t&&(t.textContent=q(a.filter(t=>t.status===e.id).length))});let t=a.filter(e=>e.status===c&&on(e,s));e.innerHTML=t.length?t.map(e=>un(e,o,l.has(e.id),u.get(e.id),d.get(e.id)??``,f.has(e.id),p.get(e.id))).join(``):`<p class="pipeline-empty">موردی نیست</p>`,g(),_(),v()}async function h(){n.hidden=!0;try{let[e,t]=await Promise.all([M(),B()]);a=e,o=t.filter(e=>e.assignable&&e.isActive),m()}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function g(){e.querySelectorAll(`[data-status-select-id]`).forEach(e=>{e.addEventListener(`change`,async()=>{let t=Number(e.dataset.statusSelectId),r=e.value;e.disabled=!0;try{await N(t,r),await h()}catch(t){n.hidden=!1,n.textContent=t instanceof Error?t.message:`به‌روزرسانی ناموفق بود.`,e.disabled=!1}})}),e.querySelectorAll(`[data-assign-select-id]`).forEach(e=>{e.addEventListener(`change`,async()=>{let t=Number(e.dataset.assignSelectId),r=e.value?Number(e.value):null;e.disabled=!0;try{await R(t,r),await h()}catch(t){n.hidden=!1,n.textContent=t instanceof Error?t.message:`اختصاص ناموفق بود.`,e.disabled=!1}})}),e.querySelectorAll(`[data-delete-request-id]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.deleteRequestId);if(window.confirm(`این درخواست برای همیشه از سرور حذف شود؟ این کار قابل بازگشت نیست.`)){e.disabled=!0;try{await P(t),await h()}catch(t){n.hidden=!1,n.textContent=t instanceof Error?t.message:`حذف درخواست ناموفق بود.`,e.disabled=!1}}})})}function _(){e.querySelectorAll(`[data-report-textarea-id]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=Number(e.dataset.reportTextareaId);e.value?d.set(t,e.value):d.delete(t)})}),e.querySelectorAll(`[data-report-toggle-id]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.reportToggleId),r=e.querySelector(`[data-report-body-id="${n}"]`);if(r){if(l.has(n)){l.delete(n),r.hidden=!0,t.setAttribute(`aria-expanded`,`false`);return}if(l.add(n),r.hidden=!1,t.setAttribute(`aria-expanded`,`true`),!u.has(n))try{let t=await nt(n);u.set(n,t);let r=e.querySelector(`[data-report-list-id="${n}"]`);r&&(r.innerHTML=cn(t))}catch{}}})}),e.querySelectorAll(`[data-report-send-id]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.reportSendId),r=e.querySelector(`[data-report-textarea-id="${n}"]`),i=e.querySelector(`[data-report-error-id="${n}"]`);if(!r||!i)return;let a=r.value.trim();if(i.hidden=!0,!a){i.hidden=!1,i.textContent=`متن گزارش را بنویسید.`;return}t.disabled=!0;try{let t=await rt(n,a),o=[t.report,...u.get(n)??[]];u.set(n,o);let s=e.querySelector(`[data-report-list-id="${n}"]`);s&&(s.innerHTML=cn(o)),r.value=``,d.delete(n),!t.ok&&t.error&&(i.hidden=!1,i.textContent=`گزارش ثبت شد اما ${t.error}`)}catch(e){i.hidden=!1,i.textContent=e instanceof Error?e.message:`ثبت گزارش ناموفق بود.`}finally{t.disabled=!1}})})}function v(){e.querySelectorAll(`[data-history-toggle-id]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.historyToggleId),r=e.querySelector(`[data-history-body-id="${n}"]`);if(r){if(f.has(n)){f.delete(n),r.hidden=!0,t.setAttribute(`aria-expanded`,`false`);return}if(f.add(n),r.hidden=!1,t.setAttribute(`aria-expanded`,`true`),!p.has(n))try{let t=await Ue(n);p.set(n,t);let r=e.querySelector(`[data-history-list-id="${n}"]`);r&&(r.innerHTML=ln(t))}catch{}}})})}t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-pipeline-tab]`);n&&(t.querySelectorAll(`[data-pipeline-tab]`).forEach(e=>e.classList.remove(`is-active`)),n.classList.add(`is-active`),c=n.dataset.pipelineTab,m())}),i.addEventListener(`input`,()=>{s=i.value.trim(),m()}),r.addEventListener(`click`,()=>void h());let y=document.getElementById(`pipeline-export-csv`);y?.addEventListener(`click`,async()=>{y.disabled=!0;try{await F()}catch(e){n.textContent=e instanceof Error?e.message:`دریافت خروجی ناموفق بود.`,n.hidden=!1}finally{y.disabled=!1}}),rn!==void 0&&window.clearInterval(rn),rn=window.setInterval(()=>void h(),tn),h()}function pn(e){if(e.length===0)return`<p class="chart-empty">داده‌ای موجود نیست.</p>`;let t=Math.max(...e.map(e=>e.value),1);return`
    <div class="bar-chart">
      ${e.map(e=>`
            <div class="bar-chart-row">
              <span class="bar-chart-label">${e.label}</span>
              <div class="bar-chart-track">
                <div class="bar-chart-fill" style="width:${e.value/t*100}%"></div>
              </div>
              <span class="bar-chart-value">${q(e.value)}</span>
            </div>
          `).join(``)}
    </div>
  `}function mn(e){if(e.length===0)return`<p class="chart-empty">داده‌ای موجود نیست.</p>`;let t=Math.max(...e.map(e=>e.value),1),n=e.length>1?576/(e.length-1):0,r=e.map((e,r)=>({x:32+r*n,y:168-e.value/t*136})),i=r.map((e,t)=>`${t===0?`M`:`L`}${e.x},${e.y}`).join(` `);return`
    <svg viewBox="0 0 640 200" class="line-chart-svg" role="img" aria-label="روند تعداد درخواست‌ها">
      <line x1="32" y1="168" x2="608" y2="168" class="line-chart-baseline" />
      <path d="${`${i} L${r[r.length-1].x},168 L${r[0].x},168 Z`}" class="line-chart-area" />
      <path d="${i}" class="line-chart-line" />
      ${r.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="3.5" class="line-chart-dot" />`).join(``)}
      <text x="32" y="192" class="line-chart-axis-label">${e[0]?.label??``}</text>
      <text x="608" y="192" class="line-chart-axis-label" text-anchor="end">${e[e.length-1]?.label??``}</text>
    </svg>
  `}var hn={mobile:`موبایل`,desktop:`رایانه`};function gn(e){let t=e.split(`-`);return t.length===3?q(`${t[1]}/${t[2]}`):q(e)}function _n(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function vn(){return`
    <div class="dash-view">
      <header class="dash-header">
        <div class="dash-header-main">
          <div class="dash-live-badge">
            <span class="dash-live-dot"></span>
            <span>سامانه آنلاین و فعال</span>
          </div>
          <h1 class="dash-title">پیشخوان مدیریت و مانیتورینگ بهبار</h1>
          <p class="dash-subtitle">مرکز کنترل و رصد برخط عملیات حمل بار، اسباب‌کشی، ناوگان و درخواست‌ها</p>
        </div>
        <div class="dash-header-actions">
          <button type="button" class="btn btn-secondary dash-refresh-btn" id="dash-refresh-btn">
            <span class="icon">${u.refresh}</span>
            <span>به‌روزرسانی داده‌ها</span>
          </button>
        </div>
      </header>

      <nav class="dash-subnav" id="dash-subnav" aria-label="بخش‌های پیشخوان">
        <button type="button" class="dash-subnav-btn is-active" data-dash-tab="overview">
          <span class="icon">${u.chart}</span>
          <span>نمای کلی عملیات</span>
        </button>
        <button type="button" class="dash-subnav-btn" data-dash-tab="orders">
          <span class="icon">${u.columns}</span>
          <span>تحلیل سفارش‌ها و تقاضا</span>
        </button>
        <button type="button" class="dash-subnav-btn" data-dash-tab="visitors">
          <span class="icon">${u.eye}</span>
          <span>بازدید و ترافیک</span>
        </button>
        <button type="button" class="dash-subnav-btn" data-dash-tab="staff">
          <span class="icon">${u.users}</span>
          <span>عملکرد پرسنل</span>
        </button>
      </nav>

      <p class="error-text" id="dash-error" hidden></p>

      <div class="dash-body" id="dash-body">
        <div class="dash-loading">
          <span class="dash-spinner"></span>
          <span>در حال بارگذاری اطلاعات پیشخوان...</span>
        </div>
      </div>
    </div>
  `}function yn(e){let t=document.getElementById(`dash-body`),n=document.getElementById(`dash-error`),r=document.getElementById(`dash-refresh-btn`),i=document.querySelectorAll(`#dash-subnav [data-dash-tab]`);if(!t)return;let a=`overview`;async function o(){if(t){t.innerHTML=`
      <div class="dash-loading">
        <span class="dash-spinner"></span>
        <span>در حال پایش اطلاعات عملیات...</span>
      </div>
    `;try{let[n,r,i,a]=await Promise.allSettled([z(),it(),Ze(),M()]),o=n.status===`fulfilled`?n.value:null,s=r.status===`fulfilled`?r.value:null,c=i.status===`fulfilled`?i.value:[],l=a.status===`fulfilled`?a.value:[],d=o?.byStatus?.find(e=>e.status===`pending`)?.count??0,f=o?.byStatus?.find(e=>e.status===`in_progress`)?.count??0,p=o?.byStatus?.find(e=>e.status===`completed`)?.count??0,m=o?.completedRevenue??0,h=o?.avgOrderValue??0,g=c.filter(e=>e.status===`active`).length,_=c.length,v=s?.totalViews??0,y=s?.uniqueVisitors??0,b=l.slice(0,8),x=`
        <!-- KPI Cards Grid -->
        <div class="dash-kpi-grid">
          <div class="dash-kpi-card ${d>0?`is-alert`:``}">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">در انتظار بررسی و تماس</span>
              <span class="dash-kpi-badge ${d>0?`badge-warning`:`badge-neutral`}">
                ${d>0?`نیازمند اقدام`:`به‌روز`}
              </span>
            </div>
            <div class="dash-kpi-value">${q(d)}</div>
            <div class="dash-kpi-sub">سفارش‌های جدید بدون رسیدگی</div>
          </div>

          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">سفارش‌های در حال انجام</span>
              <span class="dash-kpi-badge badge-primary">سرویس فعال</span>
            </div>
            <div class="dash-kpi-value">${q(f)}</div>
            <div class="dash-kpi-sub">جابجایی‌های جاری در سطح شهر</div>
          </div>

          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">سفارش‌های انجام‌شده</span>
              <span class="dash-kpi-badge badge-success">موفق</span>
            </div>
            <div class="dash-kpi-value">${q(p)}</div>
            <div class="dash-kpi-sub">کل جابجایی‌های خاتمه‌یافته</div>
          </div>

          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">درآمد سفارش‌های انجام‌شده</span>
              <span class="dash-kpi-badge badge-success">تومان</span>
            </div>
            <div class="dash-kpi-value is-currency">${J(m)}</div>
            <div class="dash-kpi-sub">میانگین هر سفارش: ${J(h)}</div>
          </div>

          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">ناوگان آماده به کار</span>
              <span class="dash-kpi-badge badge-neutral">خودروها</span>
            </div>
            <div class="dash-kpi-value">${q(g)} <span class="dash-kpi-unit">از ${q(_)}</span></div>
            <div class="dash-kpi-sub">خودروهای آماده ارائه خدمات</div>
          </div>

          <div class="dash-kpi-card">
            <div class="dash-kpi-header">
              <span class="dash-kpi-label">بازدید ۳۰ روز اخیر</span>
              <span class="dash-kpi-badge badge-neutral">ترافیک</span>
            </div>
            <div class="dash-kpi-value">${q(v)}</div>
            <div class="dash-kpi-sub">${q(y)} کاربر یکتا در ماه گذشته</div>
          </div>
        </div>

        <!-- Quick Operational Hub -->
        <div class="dash-section">
          <div class="dash-section-header">
            <div>
              <h2 class="dash-section-title">دسترسی سریع عملیاتی</h2>
              <p class="dash-section-desc">انتقال سریع به ماژول‌های پرکاربرد سامانه بهبار</p>
            </div>
          </div>
          <div class="dash-quick-grid">
            <button type="button" class="dash-quick-card" data-dash-nav="pipeline">
              <div class="dash-quick-icon icon-pipeline">${u.columns}</div>
              <div class="dash-quick-body">
                <strong>مراحل درخواست‌ها</strong>
                <span>بررسی، تعیین وضعیت و تخصیص سفارش‌ها</span>
              </div>
              <span class="dash-quick-arrow">${u.arrowLeft}</span>
            </button>

            <button type="button" class="dash-quick-card" data-dash-nav="map">
              <div class="dash-quick-icon icon-map">${u.map}</div>
              <div class="dash-quick-body">
                <strong>نقشه زنده درخواست‌ها</strong>
                <span>ردیابی موقعیت مبادی، مقاصد و ناوگان</span>
              </div>
              <span class="dash-quick-arrow">${u.arrowLeft}</span>
            </button>

            <button type="button" class="dash-quick-card" data-dash-nav="fleet">
              <div class="dash-quick-icon icon-fleet">${u.truck}</div>
              <div class="dash-quick-body">
                <strong>مدیریت ناوگان حمل‌ونقل</strong>
                <span>تعریف خودروها، رانندگان و نرخ‌گذاری</span>
              </div>
              <span class="dash-quick-arrow">${u.arrowLeft}</span>
            </button>

            <button type="button" class="dash-quick-card" data-dash-nav="chat">
              <div class="dash-quick-icon icon-chat">${u.chat}</div>
              <div class="dash-quick-body">
                <strong>چت و پشتیبانی برخط</strong>
                <span>پاسخگویی زنده به سوالات کاربران</span>
              </div>
              <span class="dash-quick-arrow">${u.arrowLeft}</span>
            </button>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="dash-charts-grid">
          <div class="dash-card">
            <div class="dash-card-header">
              <h2 class="dash-card-title">روند روزانه درخواست‌ها (۱۴ روز اخیر)</h2>
            </div>
            <div class="dash-card-body">
              ${o?.daily?.length?mn(o.daily.map(e=>({label:gn(e.day),value:e.count}))):`<p class="dash-empty">داده‌ای ثبت نشده است.</p>`}
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-card-header">
              <h2 class="dash-card-title">وضعیت درخواست‌های سامانه</h2>
            </div>
            <div class="dash-card-body">
              ${o?.byStatus?.length?pn(o.byStatus.map(e=>({label:Bt[e.status]??e.status,value:e.count}))):`<p class="dash-empty">داده‌ای ثبت نشده است.</p>`}
            </div>
          </div>
        </div>

        <!-- Recent Orders Feed -->
        <div class="dash-section">
          <div class="dash-section-header">
            <div class="dash-section-title-group">
              <h2 class="dash-section-title">سفارش‌های اخیر دریافتی</h2>
              <span class="dash-count-pill">${q(b.length)} سفارش آخر</span>
            </div>
            <button type="button" class="dash-link-btn" data-dash-nav="pipeline">
              <span>مشاهده همه در مراحل درخواست‌ها</span>
              <span class="icon">${u.arrowLeft}</span>
            </button>
          </div>

          <div class="dash-card dash-table-card">
            <div class="dash-table-wrapper">
              ${b.length===0?`<p class="dash-empty">هنوز سفارشی در سامانه بهبار ثبت نشده است.</p>`:`
                <table class="dash-table">
                  <thead>
                    <tr>
                      <th>کد رهگیری</th>
                      <th>مشتری و تماس</th>
                      <th>نوع خدمت</th>
                      <th>مسیر جابجایی</th>
                      <th>برآورد هزینه</th>
                      <th>وضعیت</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${b.map(e=>{let t=Vt[e.status]??`var(--muted)`,n=Bt[e.status]??e.status,r=`${_n(e.originCity||`—`)} به ${_n(e.destinationCity||`—`)}`;return`
                        <tr>
                          <td><span class="dash-code">${_n(e.trackingCode)}</span></td>
                          <td>
                            <div class="dash-customer-cell">
                              <span class="dash-customer-name">${_n(e.customerName||`بدون نام`)}</span>
                              <span class="dash-customer-phone">${q(e.phone||``)}</span>
                            </div>
                          </td>
                          <td><span class="dash-service-tag">${_n(e.serviceLabel||`حمل بار`)}</span></td>
                          <td><span class="dash-route">${r}</span></td>
                          <td><span class="dash-price">${e.estimateAvg?J(e.estimateAvg):`توافقی`}</span></td>
                          <td>
                            <span class="dash-status-pill" style="--status-color: ${t}">
                              <span class="dash-status-dot"></span>
                              ${n}
                            </span>
                          </td>
                          <td>
                            <button type="button" class="btn btn-sm btn-ghost dash-view-order-btn" data-dash-nav="pipeline">
                              <span>بررسی</span>
                              <span class="icon">${u.arrowLeft}</span>
                            </button>
                          </td>
                        </tr>
                      `}).join(``)}
                  </tbody>
                </table>
              `}
            </div>
          </div>
        </div>
      `;t.innerHTML=x,t.querySelectorAll(`[data-dash-nav]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.dashNav;n&&e(n)})})}catch(e){t.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`بارگذاری پیشخوان با خطا مواجه شد.`}</p>`}}}async function s(){if(t){t.innerHTML=`
      <div class="dash-loading">
        <span class="dash-spinner"></span>
        <span>در حال بارگذاری تحلیل سفارش‌ها...</span>
      </div>
    `;try{let e=await z(),n=e.byStatus.find(e=>e.status===`in_progress`)?.count??0,r=e.byStatus.find(e=>e.status===`completed`)?.count??0;t.innerHTML=`
        <div class="dash-kpi-grid">
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">کل درخواست‌ها</span>
            <span class="dash-kpi-value">${q(e.total)}</span>
          </div>
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">در حال انجام</span>
            <span class="dash-kpi-value">${q(n)}</span>
          </div>
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">انجام‌شده</span>
            <span class="dash-kpi-value">${q(r)}</span>
          </div>
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">درآمد سفارش‌های انجام‌شده</span>
            <span class="dash-kpi-value is-currency">${J(e.completedRevenue)}</span>
          </div>
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">میانگین ارزش هر سفارش</span>
            <span class="dash-kpi-value is-currency">${J(e.avgOrderValue)}</span>
          </div>
        </div>

        <div class="dash-charts-grid">
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">روند درخواست‌ها (۱۴ روز اخیر)</h2></div>
            <div class="dash-card-body">${mn(e.daily.map(e=>({label:gn(e.day),value:e.count})))}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">وضعیت درخواست‌ها</h2></div>
            <div class="dash-card-body">${pn(e.byStatus.map(e=>({label:Bt[e.status]??e.status,value:e.count})))}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">نوع خدمات</h2></div>
            <div class="dash-card-body">${pn(e.byService.map(e=>({label:e.service_label,value:e.count})))}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">پرتقاضاترین شهرهای مبدأ</h2></div>
            <div class="dash-card-body">${e.topCities.length?pn(e.topCities.map(e=>({label:e.city,value:e.count}))):`<p class="dash-empty">داده‌ای وجود ندارد.</p>`}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">درخواست‌ها به تفکیک استان مبدأ</h2></div>
            <div class="dash-card-body">${e.topProvinces.length?pn(e.topProvinces.map(e=>({label:e.province,value:e.count}))):`<p class="dash-empty">داده‌ای وجود ندارد.</p>`}</div>
          </div>
        </div>
      `}catch(e){t.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`خطایی پیش آمد.`}</p>`}}}async function c(){if(t){t.innerHTML=`
      <div class="dash-loading">
        <span class="dash-spinner"></span>
        <span>در حال بارگذاری آمار بازدید و ترافیک...</span>
      </div>
    `;try{let e=await it();t.innerHTML=`
        <div class="dash-kpi-grid">
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">بازدید (۳۰ روز اخیر)</span>
            <span class="dash-kpi-value">${q(e.totalViews)}</span>
          </div>
          <div class="dash-kpi-card">
            <span class="dash-kpi-label">بازدیدکننده‌ی یکتا (۳۰ روز اخیر)</span>
            <span class="dash-kpi-value">${q(e.uniqueVisitors)}</span>
          </div>
        </div>

        <div class="dash-charts-grid">
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">روند بازدید (۱۴ روز اخیر)</h2></div>
            <div class="dash-card-body">${e.daily.length?mn(e.daily.map(e=>({label:gn(e.day),value:e.count}))):`<p class="dash-empty">هنوز بازدیدی ثبت نشده است.</p>`}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">صفحات پربازدید</h2></div>
            <div class="dash-card-body">${e.topPages.length?pn(e.topPages.map(e=>({label:e.path,value:e.count}))):`<p class="dash-empty">داده‌ای وجود ندارد.</p>`}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">منابع ورودی</h2></div>
            <div class="dash-card-body">${e.topReferrers.length?pn(e.topReferrers.map(e=>({label:e.referrer,value:e.count}))):`<p class="dash-empty">داده‌ای وجود ندارد.</p>`}</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-header"><h2 class="dash-card-title">دستگاه‌ها</h2></div>
            <div class="dash-card-body">${e.byDevice.length?pn(e.byDevice.map(e=>({label:hn[e.device]??e.device,value:e.count}))):`<p class="dash-empty">داده‌ای وجود ندارد.</p>`}</div>
          </div>
        </div>
      `}catch(e){t.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`دریافت آمار بازدید ناموفق بود.`}</p>`}}}async function l(){if(t){t.innerHTML=`
      <div class="dash-loading">
        <span class="dash-spinner"></span>
        <span>در حال بارگذاری عملکرد پرسنل...</span>
      </div>
    `;try{let e=await z();t.innerHTML=`
        <div class="dash-card dash-table-card">
          <div class="dash-card-header">
            <h2 class="dash-card-title">عملکرد کارمندان و مأموریت‌های ثبت‌شده</h2>
          </div>
          <div class="dash-table-wrapper">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>نام کارمند</th>
                  <th>نقش سازمانی</th>
                  <th>کل درخواست‌های اختصاص‌یافته</th>
                  <th>سفارش‌های انجام‌شده</th>
                </tr>
              </thead>
              <tbody>
                ${e.staffPerformance.length?e.staffPerformance.map(e=>`
                    <tr>
                      <td><strong>${_n(e.name)}</strong></td>
                      <td><span class="dash-service-tag">${_n(e.role_label)}</span></td>
                      <td>${q(e.total)}</td>
                      <td><strong style="color: var(--success);">${q(e.completed)}</strong></td>
                    </tr>
                  `).join(``):`<tr><td colspan="4" class="dash-empty">هنوز درخواستی اختصاص داده نشده است.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `}catch(e){t.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`دریافت عملکرد پرسنل ناموفق بود.`}</p>`}}}function d(e){a=e,i.forEach(t=>t.classList.toggle(`is-active`,t.dataset.dashTab===e)),n&&(n.hidden=!0),e===`overview`?o():e===`orders`?s():e===`visitors`?c():e===`staff`&&l()}i.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.dashTab;t&&d(t)})}),r?.addEventListener(`click`,()=>{d(a)}),d(`overview`)}function bn(){return vn()}function xn(){return vn()}function Sn(){return vn()}var Cn=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.leaflet={}))})(e,(function(e){var t=`1.9.4`;function n(e){var t,n,r,i;for(n=1,r=arguments.length;n<r;n++)for(t in i=arguments[n],i)e[t]=i[t];return e}var r=Object.create||(function(){function e(){}return function(t){return e.prototype=t,new e}})();function i(e,t){var n=Array.prototype.slice;if(e.bind)return e.bind.apply(e,n.call(arguments,1));var r=n.call(arguments,2);return function(){return e.apply(t,r.length?r.concat(n.call(arguments)):arguments)}}var a=0;function o(e){return`_leaflet_id`in e||(e._leaflet_id=++a),e._leaflet_id}function s(e,t,n){var r,i,a,o=function(){r=!1,i&&=(a.apply(n,i),!1)};return a=function(){r?i=arguments:(e.apply(n,arguments),setTimeout(o,t),r=!0)},a}function c(e,t,n){var r=t[1],i=t[0],a=r-i;return e===r&&n?e:((e-i)%a+a)%a+i}function l(){return!1}function u(e,t){if(t===!1)return e;var n=10**(t===void 0?6:t);return Math.round(e*n)/n}function d(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,``)}function f(e){return d(e).split(/\s+/)}function p(e,t){for(var n in Object.prototype.hasOwnProperty.call(e,`options`)||(e.options=e.options?r(e.options):{}),t)e.options[n]=t[n];return e.options}function m(e,t,n){var r=[];for(var i in e)r.push(encodeURIComponent(n?i.toUpperCase():i)+`=`+encodeURIComponent(e[i]));return(!t||t.indexOf(`?`)===-1?`?`:`&`)+r.join(`&`)}var h=/\{ *([\w_ -]+) *\}/g;function g(e,t){return e.replace(h,function(e,n){var r=t[n];if(r===void 0)throw Error(`No value provided for variable `+e);return typeof r==`function`&&(r=r(t)),r})}var _=Array.isArray||function(e){return Object.prototype.toString.call(e)===`[object Array]`};function v(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1}var y=`data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;function b(e){return window[`webkit`+e]||window[`moz`+e]||window[`ms`+e]}var x=0;function S(e){var t=+new Date,n=Math.max(0,16-(t-x));return x=t+n,window.setTimeout(e,n)}var C=window.requestAnimationFrame||b(`RequestAnimationFrame`)||S,w=window.cancelAnimationFrame||b(`CancelAnimationFrame`)||b(`CancelRequestAnimationFrame`)||function(e){window.clearTimeout(e)};function T(e,t,n){if(n&&C===S)e.call(t);else return C.call(window,i(e,t))}function E(e){e&&w.call(window,e)}var D={__proto__:null,extend:n,create:r,bind:i,get lastId(){return a},stamp:o,throttle:s,wrapNum:c,falseFn:l,formatNum:u,trim:d,splitWords:f,setOptions:p,getParamString:m,template:g,isArray:_,indexOf:v,emptyImageUrl:y,requestFn:C,cancelFn:w,requestAnimFrame:T,cancelAnimFrame:E};function O(){}O.extend=function(e){var t=function(){p(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=t.__super__=this.prototype,a=r(i);for(var o in a.constructor=t,t.prototype=a,this)Object.prototype.hasOwnProperty.call(this,o)&&o!==`prototype`&&o!==`__super__`&&(t[o]=this[o]);return e.statics&&n(t,e.statics),e.includes&&(ee(e.includes),n.apply(null,[a].concat(e.includes))),n(a,e),delete a.statics,delete a.includes,a.options&&(a.options=i.options?r(i.options):{},n(a.options,e.options)),a._initHooks=[],a.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var e=0,t=a._initHooks.length;e<t;e++)a._initHooks[e].call(this)}},t},O.include=function(e){var t=this.prototype.options;return n(this.prototype,e),e.options&&(this.prototype.options=t,this.mergeOptions(e.options)),this},O.mergeOptions=function(e){return n(this.prototype.options,e),this},O.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),n=typeof e==`function`?e:function(){this[e].apply(this,t)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(n),this};function ee(e){if(!(typeof L>`u`||!L||!L.Mixin)){e=_(e)?e:[e];for(var t=0;t<e.length;t++)e[t]===L.Mixin.Events&&console.warn(`Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.`,Error().stack)}}var k={on:function(e,t,n){if(typeof e==`object`)for(var r in e)this._on(r,e[r],t);else{e=f(e);for(var i=0,a=e.length;i<a;i++)this._on(e[i],t,n)}return this},off:function(e,t,n){if(!arguments.length)delete this._events;else if(typeof e==`object`)for(var r in e)this._off(r,e[r],t);else{e=f(e);for(var i=arguments.length===1,a=0,o=e.length;a<o;a++)i?this._off(e[a]):this._off(e[a],t,n)}return this},_on:function(e,t,n,r){if(typeof t!=`function`){console.warn(`wrong listener type: `+typeof t);return}if(this._listens(e,t,n)===!1){n===this&&(n=void 0);var i={fn:t,ctx:n};r&&(i.once=!0),this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(i)}},_off:function(e,t,n){var r,i,a;if(this._events&&(r=this._events[e],r)){if(arguments.length===1){if(this._firingCount)for(i=0,a=r.length;i<a;i++)r[i].fn=l;delete this._events[e];return}if(typeof t!=`function`){console.warn(`wrong listener type: `+typeof t);return}var o=this._listens(e,t,n);if(o!==!1){var s=r[o];this._firingCount&&(s.fn=l,this._events[e]=r=r.slice()),r.splice(o,1)}}},fire:function(e,t,r){if(!this.listens(e,r))return this;var i=n({},t,{type:e,target:this,sourceTarget:t&&t.sourceTarget||this});if(this._events){var a=this._events[e];if(a){this._firingCount=this._firingCount+1||1;for(var o=0,s=a.length;o<s;o++){var c=a[o],l=c.fn;c.once&&this.off(e,l,c.ctx),l.call(c.ctx||this,i)}this._firingCount--}}return r&&this._propagateEvent(i),this},listens:function(e,t,n,r){typeof e!=`string`&&console.warn(`"string" type argument expected`);var i=t;typeof t!=`function`&&(r=!!t,i=void 0,n=void 0);var a=this._events&&this._events[e];if(a&&a.length&&this._listens(e,i,n)!==!1)return!0;if(r){for(var o in this._eventParents)if(this._eventParents[o].listens(e,t,n,r))return!0}return!1},_listens:function(e,t,n){if(!this._events)return!1;var r=this._events[e]||[];if(!t)return!!r.length;n===this&&(n=void 0);for(var i=0,a=r.length;i<a;i++)if(r[i].fn===t&&r[i].ctx===n)return i;return!1},once:function(e,t,n){if(typeof e==`object`)for(var r in e)this._on(r,e[r],t,!0);else{e=f(e);for(var i=0,a=e.length;i<a;i++)this._on(e[i],t,n,!0)}return this},addEventParent:function(e){return this._eventParents=this._eventParents||{},this._eventParents[o(e)]=e,this},removeEventParent:function(e){return this._eventParents&&delete this._eventParents[o(e)],this},_propagateEvent:function(e){for(var t in this._eventParents)this._eventParents[t].fire(e.type,n({layer:e.target,propagatedFrom:e.target},e),!0)}};k.addEventListener=k.on,k.removeEventListener=k.clearAllEventListeners=k.off,k.addOneTimeEventListener=k.once,k.fireEvent=k.fire,k.hasEventListeners=k.listens;var A=O.extend(k);function j(e,t,n){this.x=n?Math.round(e):e,this.y=n?Math.round(t):t}var te=Math.trunc||function(e){return e>0?Math.floor(e):Math.ceil(e)};j.prototype={clone:function(){return new j(this.x,this.y)},add:function(e){return this.clone()._add(M(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(M(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e){return this.clone()._divideBy(e)},_divideBy:function(e){return this.x/=e,this.y/=e,this},multiplyBy:function(e){return this.clone()._multiplyBy(e)},_multiplyBy:function(e){return this.x*=e,this.y*=e,this},scaleBy:function(e){return new j(this.x*e.x,this.y*e.y)},unscaleBy:function(e){return new j(this.x/e.x,this.y/e.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=te(this.x),this.y=te(this.y),this},distanceTo:function(e){e=M(e);var t=e.x-this.x,n=e.y-this.y;return Math.sqrt(t*t+n*n)},equals:function(e){return e=M(e),e.x===this.x&&e.y===this.y},contains:function(e){return e=M(e),Math.abs(e.x)<=Math.abs(this.x)&&Math.abs(e.y)<=Math.abs(this.y)},toString:function(){return`Point(`+u(this.x)+`, `+u(this.y)+`)`}};function M(e,t,n){return e instanceof j?e:_(e)?new j(e[0],e[1]):e==null?e:typeof e==`object`&&`x`in e&&`y`in e?new j(e.x,e.y):new j(e,t,n)}function N(e,t){if(e)for(var n=t?[e,t]:e,r=0,i=n.length;r<i;r++)this.extend(n[r])}N.prototype={extend:function(e){var t,n;if(!e)return this;if(e instanceof j||typeof e[0]==`number`||`x`in e)t=n=M(e);else if(e=P(e),t=e.min,n=e.max,!t||!n)return this;return!this.min&&!this.max?(this.min=t.clone(),this.max=n.clone()):(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(n.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(n.y,this.max.y)),this},getCenter:function(e){return M((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return M(this.min.x,this.max.y)},getTopRight:function(){return M(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(e){var t,n;return e=typeof e[0]==`number`||e instanceof j?M(e):P(e),e instanceof N?(t=e.min,n=e.max):t=n=e,t.x>=this.min.x&&n.x<=this.max.x&&t.y>=this.min.y&&n.y<=this.max.y},intersects:function(e){e=P(e);var t=this.min,n=this.max,r=e.min,i=e.max,a=i.x>=t.x&&r.x<=n.x,o=i.y>=t.y&&r.y<=n.y;return a&&o},overlaps:function(e){e=P(e);var t=this.min,n=this.max,r=e.min,i=e.max,a=i.x>t.x&&r.x<n.x,o=i.y>t.y&&r.y<n.y;return a&&o},isValid:function(){return!!(this.min&&this.max)},pad:function(e){var t=this.min,n=this.max,r=Math.abs(t.x-n.x)*e,i=Math.abs(t.y-n.y)*e;return P(M(t.x-r,t.y-i),M(n.x+r,n.y+i))},equals:function(e){return e?(e=P(e),this.min.equals(e.getTopLeft())&&this.max.equals(e.getBottomRight())):!1}};function P(e,t){return!e||e instanceof N?e:new N(e,t)}function F(e,t){if(e)for(var n=t?[e,t]:e,r=0,i=n.length;r<i;r++)this.extend(n[r])}F.prototype={extend:function(e){var t=this._southWest,n=this._northEast,r,i;if(e instanceof R)r=e,i=e;else if(e instanceof F){if(r=e._southWest,i=e._northEast,!r||!i)return this}else return e?this.extend(z(e)||I(e)):this;return!t&&!n?(this._southWest=new R(r.lat,r.lng),this._northEast=new R(i.lat,i.lng)):(t.lat=Math.min(r.lat,t.lat),t.lng=Math.min(r.lng,t.lng),n.lat=Math.max(i.lat,n.lat),n.lng=Math.max(i.lng,n.lng)),this},pad:function(e){var t=this._southWest,n=this._northEast,r=Math.abs(t.lat-n.lat)*e,i=Math.abs(t.lng-n.lng)*e;return new F(new R(t.lat-r,t.lng-i),new R(n.lat+r,n.lng+i))},getCenter:function(){return new R((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new R(this.getNorth(),this.getWest())},getSouthEast:function(){return new R(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(e){e=typeof e[0]==`number`||e instanceof R||`lat`in e?z(e):I(e);var t=this._southWest,n=this._northEast,r,i;return e instanceof F?(r=e.getSouthWest(),i=e.getNorthEast()):r=i=e,r.lat>=t.lat&&i.lat<=n.lat&&r.lng>=t.lng&&i.lng<=n.lng},intersects:function(e){e=I(e);var t=this._southWest,n=this._northEast,r=e.getSouthWest(),i=e.getNorthEast(),a=i.lat>=t.lat&&r.lat<=n.lat,o=i.lng>=t.lng&&r.lng<=n.lng;return a&&o},overlaps:function(e){e=I(e);var t=this._southWest,n=this._northEast,r=e.getSouthWest(),i=e.getNorthEast(),a=i.lat>t.lat&&r.lat<n.lat,o=i.lng>t.lng&&r.lng<n.lng;return a&&o},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(`,`)},equals:function(e,t){return e?(e=I(e),this._southWest.equals(e.getSouthWest(),t)&&this._northEast.equals(e.getNorthEast(),t)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function I(e,t){return e instanceof F?e:new F(e,t)}function R(e,t,n){if(isNaN(e)||isNaN(t))throw Error(`Invalid LatLng object: (`+e+`, `+t+`)`);this.lat=+e,this.lng=+t,n!==void 0&&(this.alt=+n)}R.prototype={equals:function(e,t){return e?(e=z(e),Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng))<=(t===void 0?1e-9:t)):!1},toString:function(e){return`LatLng(`+u(this.lat,e)+`, `+u(this.lng,e)+`)`},distanceTo:function(e){return ne.distance(this,z(e))},wrap:function(){return ne.wrapLatLng(this)},toBounds:function(e){var t=180*e/40075017,n=t/Math.cos(Math.PI/180*this.lat);return I([this.lat-t,this.lng-n],[this.lat+t,this.lng+n])},clone:function(){return new R(this.lat,this.lng,this.alt)}};function z(e,t,n){return e instanceof R?e:_(e)&&typeof e[0]!=`object`?e.length===3?new R(e[0],e[1],e[2]):e.length===2?new R(e[0],e[1]):null:e==null?e:typeof e==`object`&&`lat`in e?new R(e.lat,`lng`in e?e.lng:e.lon,e.alt):t===void 0?null:new R(e,t,n)}var B={latLngToPoint:function(e,t){var n=this.projection.project(e),r=this.scale(t);return this.transformation._transform(n,r)},pointToLatLng:function(e,t){var n=this.scale(t),r=this.transformation.untransform(e,n);return this.projection.unproject(r)},project:function(e){return this.projection.project(e)},unproject:function(e){return this.projection.unproject(e)},scale:function(e){return 256*2**e},zoom:function(e){return Math.log(e/256)/Math.LN2},getProjectedBounds:function(e){if(this.infinite)return null;var t=this.projection.bounds,n=this.scale(e);return new N(this.transformation.transform(t.min,n),this.transformation.transform(t.max,n))},infinite:!1,wrapLatLng:function(e){var t=this.wrapLng?c(e.lng,this.wrapLng,!0):e.lng,n=this.wrapLat?c(e.lat,this.wrapLat,!0):e.lat,r=e.alt;return new R(n,t,r)},wrapLatLngBounds:function(e){var t=e.getCenter(),n=this.wrapLatLng(t),r=t.lat-n.lat,i=t.lng-n.lng;if(r===0&&i===0)return e;var a=e.getSouthWest(),o=e.getNorthEast();return new F(new R(a.lat-r,a.lng-i),new R(o.lat-r,o.lng-i))}},ne=n({},B,{wrapLng:[-180,180],R:6371e3,distance:function(e,t){var n=Math.PI/180,r=e.lat*n,i=t.lat*n,a=Math.sin((t.lat-e.lat)*n/2),o=Math.sin((t.lng-e.lng)*n/2),s=a*a+Math.cos(r)*Math.cos(i)*o*o,c=2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));return this.R*c}}),re=6378137,ie={R:re,MAX_LATITUDE:85.0511287798,project:function(e){var t=Math.PI/180,n=this.MAX_LATITUDE,r=Math.max(Math.min(n,e.lat),-n),i=Math.sin(r*t);return new j(this.R*e.lng*t,this.R*Math.log((1+i)/(1-i))/2)},unproject:function(e){var t=180/Math.PI;return new R((2*Math.atan(Math.exp(e.y/this.R))-Math.PI/2)*t,e.x*t/this.R)},bounds:(function(){var e=re*Math.PI;return new N([-e,-e],[e,e])})()};function ae(e,t,n,r){if(_(e)){this._a=e[0],this._b=e[1],this._c=e[2],this._d=e[3];return}this._a=e,this._b=t,this._c=n,this._d=r}ae.prototype={transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t||=1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t||=1,new j((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}};function oe(e,t,n,r){return new ae(e,t,n,r)}var se=n({},ne,{code:`EPSG:3857`,projection:ie,transformation:function(){var e=.5/(Math.PI*ie.R);return oe(e,.5,-e,.5)}()}),ce=n({},se,{code:`EPSG:900913`});function le(e){return document.createElementNS(`http://www.w3.org/2000/svg`,e)}function ue(e,t){var n=``,r,i,a,o,s,c;for(r=0,a=e.length;r<a;r++){for(s=e[r],i=0,o=s.length;i<o;i++)c=s[i],n+=(i?`L`:`M`)+c.x+` `+c.y;n+=t?H.svg?`z`:`x`:``}return n||`M0 0`}var de=document.documentElement.style,fe=`ActiveXObject`in window,pe=fe&&!document.addEventListener,me=`msLaunchUri`in navigator&&!(`documentMode`in document),he=qe(`webkit`),ge=qe(`android`),_e=qe(`android 2`)||qe(`android 3`),ve=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),ye=ge&&qe(`Google`)&&ve<537&&!(`AudioNode`in window),be=!!window.opera,xe=!me&&qe(`chrome`),Se=qe(`gecko`)&&!he&&!be&&!fe,Ce=!xe&&qe(`safari`),we=qe(`phantom`),Te=`OTransition`in de,V=navigator.platform.indexOf(`Win`)===0,Ee=fe&&`transition`in de,De=`WebKitCSSMatrix`in window&&`m11`in new window.WebKitCSSMatrix&&!_e,Oe=`MozPerspective`in de,ke=!window.L_DISABLE_3D&&(Ee||De||Oe)&&!Te&&!we,Ae=typeof orientation<`u`||qe(`mobile`),je=Ae&&he,Me=Ae&&De,Ne=!window.PointerEvent&&window.MSPointerEvent,Pe=!!(window.PointerEvent||Ne),Fe=`ontouchstart`in window||!!window.TouchEvent,Ie=!window.L_NO_TOUCH&&(Fe||Pe),Le=Ae&&be,Re=Ae&&Se,ze=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Be=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener(`testPassiveEventSupport`,l,t),window.removeEventListener(`testPassiveEventSupport`,l,t)}catch{}return e}(),Ve=function(){return!!document.createElement(`canvas`).getContext}(),He=!!(document.createElementNS&&le(`svg`).createSVGRect),Ue=!!He&&(function(){var e=document.createElement(`div`);return e.innerHTML=`<svg/>`,(e.firstChild&&e.firstChild.namespaceURI)===`http://www.w3.org/2000/svg`})(),We=!He&&function(){try{var e=document.createElement(`div`);e.innerHTML=`<v:shape adj="1"/>`;var t=e.firstChild;return t.style.behavior=`url(#default#VML)`,t&&typeof t.adj==`object`}catch{return!1}}(),Ge=navigator.platform.indexOf(`Mac`)===0,Ke=navigator.platform.indexOf(`Linux`)===0;function qe(e){return navigator.userAgent.toLowerCase().indexOf(e)>=0}var H={ie:fe,ielt9:pe,edge:me,webkit:he,android:ge,android23:_e,androidStock:ye,opera:be,chrome:xe,gecko:Se,safari:Ce,phantom:we,opera12:Te,win:V,ie3d:Ee,webkit3d:De,gecko3d:Oe,any3d:ke,mobile:Ae,mobileWebkit:je,mobileWebkit3d:Me,msPointer:Ne,pointer:Pe,touch:Ie,touchNative:Fe,mobileOpera:Le,mobileGecko:Re,retina:ze,passiveEvents:Be,canvas:Ve,svg:He,vml:We,inlineSvg:Ue,mac:Ge,linux:Ke},Je=H.msPointer?`MSPointerDown`:`pointerdown`,Ye=H.msPointer?`MSPointerMove`:`pointermove`,Xe=H.msPointer?`MSPointerUp`:`pointerup`,Ze=H.msPointer?`MSPointerCancel`:`pointercancel`,Qe={touchstart:Je,touchmove:Ye,touchend:Xe,touchcancel:Ze},$e={touchstart:lt,touchmove:ct,touchend:ct,touchcancel:ct},et={},tt=!1;function nt(e,t,n){return t===`touchstart`&&st(),$e[t]?(n=$e[t].bind(this,n),e.addEventListener(Qe[t],n,!1),n):(console.warn(`wrong event specified:`,t),l)}function rt(e,t,n){if(!Qe[t]){console.warn(`wrong event specified:`,t);return}e.removeEventListener(Qe[t],n,!1)}function it(e){et[e.pointerId]=e}function at(e){et[e.pointerId]&&(et[e.pointerId]=e)}function ot(e){delete et[e.pointerId]}function st(){tt||=(document.addEventListener(Je,it,!0),document.addEventListener(Ye,at,!0),document.addEventListener(Xe,ot,!0),document.addEventListener(Ze,ot,!0),!0)}function ct(e,t){if(t.pointerType!==(t.MSPOINTER_TYPE_MOUSE||`mouse`)){for(var n in t.touches=[],et)t.touches.push(et[n]);t.changedTouches=[t],e(t)}}function lt(e,t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&Xt(t),ct(e,t)}function ut(e){var t={},n,r;for(r in e)n=e[r],t[r]=n&&n.bind?n.bind(e):n;return e=t,t.type=`dblclick`,t.detail=2,t.isTrusted=!1,t._simulated=!0,t}var dt=200;function ft(e,t){e.addEventListener(`dblclick`,t);var n=0,r;function i(e){if(e.detail!==1){r=e.detail;return}if(!(e.pointerType===`mouse`||e.sourceCapabilities&&!e.sourceCapabilities.firesTouchEvents)){var i=Qt(e);if(!(i.some(function(e){return e instanceof HTMLLabelElement&&e.attributes.for})&&!i.some(function(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement}))){var a=Date.now();a-n<=dt?(r++,r===2&&t(ut(e))):r=1,n=a}}}return e.addEventListener(`click`,i),{dblclick:t,simDblclick:i}}function pt(e,t){e.removeEventListener(`dblclick`,t.dblclick),e.removeEventListener(`click`,t.simDblclick)}var mt=Ot([`transform`,`webkitTransform`,`OTransform`,`MozTransform`,`msTransform`]),ht=Ot([`webkitTransition`,`transition`,`OTransition`,`MozTransition`,`msTransition`]),gt=ht===`webkitTransition`||ht===`OTransition`?ht+`End`:`transitionend`;function _t(e){return typeof e==`string`?document.getElementById(e):e}function vt(e,t){var n=e.style[t]||e.currentStyle&&e.currentStyle[t];if((!n||n===`auto`)&&document.defaultView){var r=document.defaultView.getComputedStyle(e,null);n=r?r[t]:null}return n===`auto`?null:n}function U(e,t,n){var r=document.createElement(e);return r.className=t||``,n&&n.appendChild(r),r}function W(e){var t=e.parentNode;t&&t.removeChild(e)}function yt(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function bt(e){var t=e.parentNode;t&&t.lastChild!==e&&t.appendChild(e)}function xt(e){var t=e.parentNode;t&&t.firstChild!==e&&t.insertBefore(e,t.firstChild)}function St(e,t){if(e.classList!==void 0)return e.classList.contains(t);var n=Tt(e);return n.length>0&&RegExp(`(^|\\s)`+t+`(\\s|$)`).test(n)}function G(e,t){if(e.classList!==void 0)for(var n=f(t),r=0,i=n.length;r<i;r++)e.classList.add(n[r]);else if(!St(e,t)){var a=Tt(e);wt(e,(a?a+` `:``)+t)}}function Ct(e,t){e.classList===void 0?wt(e,d((` `+Tt(e)+` `).replace(` `+t+` `,` `))):e.classList.remove(t)}function wt(e,t){e.className.baseVal===void 0?e.className=t:e.className.baseVal=t}function Tt(e){return e.correspondingElement&&(e=e.correspondingElement),e.className.baseVal===void 0?e.className:e.className.baseVal}function Et(e,t){`opacity`in e.style?e.style.opacity=t:`filter`in e.style&&Dt(e,t)}function Dt(e,t){var n=!1,r=`DXImageTransform.Microsoft.Alpha`;try{n=e.filters.item(r)}catch{if(t===1)return}t=Math.round(t*100),n?(n.Enabled=t!==100,n.Opacity=t):e.style.filter+=` progid:`+r+`(opacity=`+t+`)`}function Ot(e){for(var t=document.documentElement.style,n=0;n<e.length;n++)if(e[n]in t)return e[n];return!1}function kt(e,t,n){var r=t||new j(0,0);e.style[mt]=(H.ie3d?`translate(`+r.x+`px,`+r.y+`px)`:`translate3d(`+r.x+`px,`+r.y+`px,0)`)+(n?` scale(`+n+`)`:``)}function K(e,t){e._leaflet_pos=t,H.any3d?kt(e,t):(e.style.left=t.x+`px`,e.style.top=t.y+`px`)}function At(e){return e._leaflet_pos||new j(0,0)}var jt,Mt,Nt;if(`onselectstart`in document)jt=function(){J(window,`selectstart`,Xt)},Mt=function(){X(window,`selectstart`,Xt)};else{var Pt=Ot([`userSelect`,`WebkitUserSelect`,`OUserSelect`,`MozUserSelect`,`msUserSelect`]);jt=function(){if(Pt){var e=document.documentElement.style;Nt=e[Pt],e[Pt]=`none`}},Mt=function(){Pt&&(document.documentElement.style[Pt]=Nt,Nt=void 0)}}function Ft(){J(window,`dragstart`,Xt)}function It(){X(window,`dragstart`,Xt)}var Lt,Rt;function zt(e){for(;e.tabIndex===-1;)e=e.parentNode;e.style&&(Bt(),Lt=e,Rt=e.style.outlineStyle,e.style.outlineStyle=`none`,J(window,`keydown`,Bt))}function Bt(){Lt&&(Lt.style.outlineStyle=Rt,Lt=void 0,Rt=void 0,X(window,`keydown`,Bt))}function Vt(e){do e=e.parentNode;while((!e.offsetWidth||!e.offsetHeight)&&e!==document.body);return e}function Ht(e){var t=e.getBoundingClientRect();return{x:t.width/e.offsetWidth||1,y:t.height/e.offsetHeight||1,boundingClientRect:t}}var q={__proto__:null,TRANSFORM:mt,TRANSITION:ht,TRANSITION_END:gt,get:_t,getStyle:vt,create:U,remove:W,empty:yt,toFront:bt,toBack:xt,hasClass:St,addClass:G,removeClass:Ct,setClass:wt,getClass:Tt,setOpacity:Et,testProp:Ot,setTransform:kt,setPosition:K,getPosition:At,get disableTextSelection(){return jt},get enableTextSelection(){return Mt},disableImageDrag:Ft,enableImageDrag:It,preventOutline:zt,restoreOutline:Bt,getSizedParentNode:Vt,getScale:Ht};function J(e,t,n,r){if(t&&typeof t==`object`)for(var i in t)Gt(e,i,t[i],n);else{t=f(t);for(var a=0,o=t.length;a<o;a++)Gt(e,t[a],n,r)}return this}var Y=`_leaflet_events`;function X(e,t,n,r){if(arguments.length===1)Ut(e),delete e[Y];else if(t&&typeof t==`object`)for(var i in t)Kt(e,i,t[i],n);else if(t=f(t),arguments.length===2)Ut(e,function(e){return v(t,e)!==-1});else for(var a=0,o=t.length;a<o;a++)Kt(e,t[a],n,r);return this}function Ut(e,t){for(var n in e[Y]){var r=n.split(/\d/)[0];(!t||t(r))&&Kt(e,r,null,null,n)}}var Wt={mouseenter:`mouseover`,mouseleave:`mouseout`,wheel:!(`onwheel`in window)&&`mousewheel`};function Gt(e,t,n,r){var i=t+o(n)+(r?`_`+o(r):``);if(e[Y]&&e[Y][i])return this;var a=function(t){return n.call(r||e,t||window.event)},s=a;!H.touchNative&&H.pointer&&t.indexOf(`touch`)===0?a=nt(e,t,a):H.touch&&t===`dblclick`?a=ft(e,a):`addEventListener`in e?t===`touchstart`||t===`touchmove`||t===`wheel`||t===`mousewheel`?e.addEventListener(Wt[t]||t,a,H.passiveEvents?{passive:!1}:!1):t===`mouseenter`||t===`mouseleave`?(a=function(t){t||=window.event,nn(e,t)&&s(t)},e.addEventListener(Wt[t],a,!1)):e.addEventListener(t,s,!1):e.attachEvent(`on`+t,a),e[Y]=e[Y]||{},e[Y][i]=a}function Kt(e,t,n,r,i){i||=t+o(n)+(r?`_`+o(r):``);var a=e[Y]&&e[Y][i];if(!a)return this;!H.touchNative&&H.pointer&&t.indexOf(`touch`)===0?rt(e,t,a):H.touch&&t===`dblclick`?pt(e,a):`removeEventListener`in e?e.removeEventListener(Wt[t]||t,a,!1):e.detachEvent(`on`+t,a),e[Y][i]=null}function qt(e){return e.stopPropagation?e.stopPropagation():e.originalEvent?e.originalEvent._stopped=!0:e.cancelBubble=!0,this}function Jt(e){return Gt(e,`wheel`,qt),this}function Yt(e){return J(e,`mousedown touchstart dblclick contextmenu`,qt),e._leaflet_disable_click=!0,this}function Xt(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this}function Zt(e){return Xt(e),qt(e),this}function Qt(e){if(e.composedPath)return e.composedPath();for(var t=[],n=e.target;n;)t.push(n),n=n.parentNode;return t}function $t(e,t){if(!t)return new j(e.clientX,e.clientY);var n=Ht(t),r=n.boundingClientRect;return new j((e.clientX-r.left)/n.x-t.clientLeft,(e.clientY-r.top)/n.y-t.clientTop)}var en=H.linux&&H.chrome?window.devicePixelRatio:H.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function tn(e){return H.edge?e.wheelDeltaY/2:e.deltaY&&e.deltaMode===0?-e.deltaY/en:e.deltaY&&e.deltaMode===1?-e.deltaY*20:e.deltaY&&e.deltaMode===2?-e.deltaY*60:e.deltaX||e.deltaZ?0:e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:e.detail&&Math.abs(e.detail)<32765?-e.detail*20:e.detail?e.detail/-32765*60:0}function nn(e,t){var n=t.relatedTarget;if(!n)return!0;try{for(;n&&n!==e;)n=n.parentNode}catch{return!1}return n!==e}var rn={__proto__:null,on:J,off:X,stopPropagation:qt,disableScrollPropagation:Jt,disableClickPropagation:Yt,preventDefault:Xt,stop:Zt,getPropagationPath:Qt,getMousePosition:$t,getWheelDelta:tn,isExternalTarget:nn,addListener:J,removeListener:X},an=A.extend({run:function(e,t,n,r){this.stop(),this._el=e,this._inProgress=!0,this._duration=n||.25,this._easeOutPower=1/Math.max(r||.5,.2),this._startPos=At(e),this._offset=t.subtract(this._startPos),this._startTime=+new Date,this.fire(`start`),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=T(this._animate,this),this._step()},_step:function(e){var t=+new Date-this._startTime,n=this._duration*1e3;t<n?this._runFrame(this._easeOut(t/n),e):(this._runFrame(1),this._complete())},_runFrame:function(e,t){var n=this._startPos.add(this._offset.multiplyBy(e));t&&n._round(),K(this._el,n),this.fire(`step`)},_complete:function(){E(this._animId),this._inProgress=!1,this.fire(`end`)},_easeOut:function(e){return 1-(1-e)**this._easeOutPower}}),Z=A.extend({options:{crs:se,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(e,t){t=p(this,t),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(e),this._initLayout(),this._onResize=i(this._onResize,this),this._initEvents(),t.maxBounds&&this.setMaxBounds(t.maxBounds),t.zoom!==void 0&&(this._zoom=this._limitZoom(t.zoom)),t.center&&t.zoom!==void 0&&this.setView(z(t.center),t.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ht&&H.any3d&&!H.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),J(this._proxy,gt,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(e,t,r){return t=t===void 0?this._zoom:this._limitZoom(t),e=this._limitCenter(z(e),t,this.options.maxBounds),r||={},this._stop(),this._loaded&&!r.reset&&r!==!0&&(r.animate!==void 0&&(r.zoom=n({animate:r.animate},r.zoom),r.pan=n({animate:r.animate,duration:r.duration},r.pan)),this._zoom===t?this._tryAnimatedPan(e,r.pan):this._tryAnimatedZoom&&this._tryAnimatedZoom(e,t,r.zoom))?(clearTimeout(this._sizeTimer),this):(this._resetView(e,t,r.pan&&r.pan.noMoveStart),this)},setZoom:function(e,t){return this._loaded?this.setView(this.getCenter(),e,{zoom:t}):(this._zoom=e,this)},zoomIn:function(e,t){return e||=H.any3d?this.options.zoomDelta:1,this.setZoom(this._zoom+e,t)},zoomOut:function(e,t){return e||=H.any3d?this.options.zoomDelta:1,this.setZoom(this._zoom-e,t)},setZoomAround:function(e,t,n){var r=this.getZoomScale(t),i=this.getSize().divideBy(2),a=(e instanceof j?e:this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1-1/r),o=this.containerPointToLatLng(i.add(a));return this.setView(o,t,{zoom:n})},_getBoundsCenterZoom:function(e,t){t||={},e=e.getBounds?e.getBounds():I(e);var n=M(t.paddingTopLeft||t.padding||[0,0]),r=M(t.paddingBottomRight||t.padding||[0,0]),i=this.getBoundsZoom(e,!1,n.add(r));if(i=typeof t.maxZoom==`number`?Math.min(t.maxZoom,i):i,i===1/0)return{center:e.getCenter(),zoom:i};var a=r.subtract(n).divideBy(2),o=this.project(e.getSouthWest(),i),s=this.project(e.getNorthEast(),i);return{center:this.unproject(o.add(s).divideBy(2).add(a),i),zoom:i}},fitBounds:function(e,t){if(e=I(e),!e.isValid())throw Error(`Bounds are not valid.`);var n=this._getBoundsCenterZoom(e,t);return this.setView(n.center,n.zoom,t)},fitWorld:function(e){return this.fitBounds([[-90,-180],[90,180]],e)},panTo:function(e,t){return this.setView(e,this._zoom,{pan:t})},panBy:function(e,t){if(e=M(e).round(),t||={},!e.x&&!e.y)return this.fire(`moveend`);if(t.animate!==!0&&!this.getSize().contains(e))return this._resetView(this.unproject(this.project(this.getCenter()).add(e)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new an,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),t.noMoveStart||this.fire(`movestart`),t.animate!==!1){G(this._mapPane,`leaflet-pan-anim`);var n=this._getMapPanePos().subtract(e).round();this._panAnim.run(this._mapPane,n,t.duration||.25,t.easeLinearity)}else this._rawPanBy(e),this.fire(`move`).fire(`moveend`);return this},flyTo:function(e,t,n){if(n||={},n.animate===!1||!H.any3d)return this.setView(e,t,n);this._stop();var r=this.project(this.getCenter()),i=this.project(e),a=this.getSize(),o=this._zoom;e=z(e),t=t===void 0?o:t;var s=Math.max(a.x,a.y),c=s*this.getZoomScale(o,t),l=i.distanceTo(r)||1,u=1.42,d=u*u;function f(e){var t=e?-1:1,n=e?c:s,r=(c*c-s*s+t*d*d*l*l)/(2*n*d*l),i=Math.sqrt(r*r+1)-r;return i<1e-9?-18:Math.log(i)}function p(e){return(Math.exp(e)-Math.exp(-e))/2}function m(e){return(Math.exp(e)+Math.exp(-e))/2}function h(e){return p(e)/m(e)}var g=f(0);function _(e){return s*(m(g)/m(g+u*e))}function v(e){return s*(m(g)*h(g+u*e)-p(g))/d}function y(e){return 1-(1-e)**1.5}var b=Date.now(),x=(f(1)-g)/u,S=n.duration?1e3*n.duration:1e3*x*.8;function C(){var n=(Date.now()-b)/S,a=y(n)*x;n<=1?(this._flyToFrame=T(C,this),this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a)/l)),o),this.getScaleZoom(s/_(a),o),{flyTo:!0})):this._move(e,t)._moveEnd(!0)}return this._moveStart(!0,n.noMoveStart),C.call(this),this},flyToBounds:function(e,t){var n=this._getBoundsCenterZoom(e,t);return this.flyTo(n.center,n.zoom,t)},setMaxBounds:function(e){return e=I(e),this.listens(`moveend`,this._panInsideMaxBounds)&&this.off(`moveend`,this._panInsideMaxBounds),e.isValid()?(this.options.maxBounds=e,this._loaded&&this._panInsideMaxBounds(),this.on(`moveend`,this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(e){var t=this.options.minZoom;return this.options.minZoom=e,this._loaded&&t!==e&&(this.fire(`zoomlevelschange`),this.getZoom()<this.options.minZoom)?this.setZoom(e):this},setMaxZoom:function(e){var t=this.options.maxZoom;return this.options.maxZoom=e,this._loaded&&t!==e&&(this.fire(`zoomlevelschange`),this.getZoom()>this.options.maxZoom)?this.setZoom(e):this},panInsideBounds:function(e,t){this._enforcingBounds=!0;var n=this.getCenter(),r=this._limitCenter(n,this._zoom,I(e));return n.equals(r)||this.panTo(r,t),this._enforcingBounds=!1,this},panInside:function(e,t){t||={};var n=M(t.paddingTopLeft||t.padding||[0,0]),r=M(t.paddingBottomRight||t.padding||[0,0]),i=this.project(this.getCenter()),a=this.project(e),o=this.getPixelBounds(),s=P([o.min.add(n),o.max.subtract(r)]),c=s.getSize();if(!s.contains(a)){this._enforcingBounds=!0;var l=a.subtract(s.getCenter()),u=s.extend(a).getSize().subtract(c);i.x+=l.x<0?-u.x:u.x,i.y+=l.y<0?-u.y:u.y,this.panTo(this.unproject(i),t),this._enforcingBounds=!1}return this},invalidateSize:function(e){if(!this._loaded)return this;e=n({animate:!1,pan:!0},e===!0?{animate:!0}:e);var t=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var r=this.getSize(),a=t.divideBy(2).round(),o=r.divideBy(2).round(),s=a.subtract(o);return!s.x&&!s.y?this:(e.animate&&e.pan?this.panBy(s):(e.pan&&this._rawPanBy(s),this.fire(`move`),e.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(i(this.fire,this,`moveend`),200)):this.fire(`moveend`)),this.fire(`resize`,{oldSize:t,newSize:r}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire(`viewreset`),this._stop()},locate:function(e){if(e=this._locateOptions=n({timeout:1e4,watch:!1},e),!(`geolocation`in navigator))return this._handleGeolocationError({code:0,message:`Geolocation not supported.`}),this;var t=i(this._handleGeolocationResponse,this),r=i(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,r,e):navigator.geolocation.getCurrentPosition(t,r,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(e){if(this._container._leaflet_id){var t=e.code,n=e.message||(t===1?`permission denied`:t===2?`position unavailable`:`timeout`);this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire(`locationerror`,{code:t,message:`Geolocation error: `+n+`.`})}},_handleGeolocationResponse:function(e){if(this._container._leaflet_id){var t=e.coords.latitude,n=e.coords.longitude,r=new R(t,n),i=r.toBounds(e.coords.accuracy*2),a=this._locateOptions;if(a.setView){var o=this.getBoundsZoom(i);this.setView(r,a.maxZoom?Math.min(o,a.maxZoom):o)}var s={latlng:r,bounds:i,timestamp:e.timestamp};for(var c in e.coords)typeof e.coords[c]==`number`&&(s[c]=e.coords[c]);this.fire(`locationfound`,s)}},addHandler:function(e,t){if(!t)return this;var n=this[e]=new t(this);return this._handlers.push(n),this.options[e]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off(`moveend`,this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw Error(`Map container is being reused by another instance`);try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}for(var e in this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),W(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&=(E(this._resizeRequest),null),this._clearHandlers(),this._loaded&&this.fire(`unload`),this._layers)this._layers[e].remove();for(e in this._panes)W(this._panes[e]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(e,t){var n=U(`div`,`leaflet-pane`+(e?` leaflet-`+e.replace(`Pane`,``)+`-pane`:``),t||this._mapPane);return e&&(this._panes[e]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds();return new F(this.unproject(e.getBottomLeft()),this.unproject(e.getTopRight()))},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(e,t,n){e=I(e),n=M(n||[0,0]);var r=this.getZoom()||0,i=this.getMinZoom(),a=this.getMaxZoom(),o=e.getNorthWest(),s=e.getSouthEast(),c=this.getSize().subtract(n),l=P(this.project(s,r),this.project(o,r)).getSize(),u=H.any3d?this.options.zoomSnap:1,d=c.x/l.x,f=c.y/l.y,p=t?Math.max(d,f):Math.min(d,f);return r=this.getScaleZoom(p,r),u&&(r=Math.round(r/(u/100))*(u/100),r=t?Math.ceil(r/u)*u:Math.floor(r/u)*u),Math.max(i,Math.min(a,r))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new j(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(e,t){var n=this._getTopLeftPoint(e,t);return new N(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(e){return this.options.crs.getProjectedBounds(e===void 0?this.getZoom():e)},getPane:function(e){return typeof e==`string`?this._panes[e]:e},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e,t){var n=this.options.crs;return t=t===void 0?this._zoom:t,n.scale(e)/n.scale(t)},getScaleZoom:function(e,t){var n=this.options.crs;t=t===void 0?this._zoom:t;var r=n.zoom(e*n.scale(t));return isNaN(r)?1/0:r},project:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.latLngToPoint(z(e),t)},unproject:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.pointToLatLng(M(e),t)},layerPointToLatLng:function(e){var t=M(e).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(e){return this.project(z(e))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(e){return this.options.crs.wrapLatLng(z(e))},wrapLatLngBounds:function(e){return this.options.crs.wrapLatLngBounds(I(e))},distance:function(e,t){return this.options.crs.distance(z(e),z(t))},containerPointToLayerPoint:function(e){return M(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return M(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(M(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(z(e)))},mouseEventToContainerPoint:function(e){return $t(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=_t(e);if(!t)throw Error(`Map container not found.`);if(t._leaflet_id)throw Error(`Map container is already initialized.`);J(t,`scroll`,this._onScroll,this),this._containerId=o(t)},_initLayout:function(){var e=this._container;this._fadeAnimated=this.options.fadeAnimation&&H.any3d,G(e,`leaflet-container`+(H.touch?` leaflet-touch`:``)+(H.retina?` leaflet-retina`:``)+(H.ielt9?` leaflet-oldie`:``)+(H.safari?` leaflet-safari`:``)+(this._fadeAnimated?` leaflet-fade-anim`:``));var t=vt(e,`position`);t!==`absolute`&&t!==`relative`&&t!==`fixed`&&t!==`sticky`&&(e.style.position=`relative`),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._paneRenderers={},this._mapPane=this.createPane(`mapPane`,this._container),K(this._mapPane,new j(0,0)),this.createPane(`tilePane`),this.createPane(`overlayPane`),this.createPane(`shadowPane`),this.createPane(`markerPane`),this.createPane(`tooltipPane`),this.createPane(`popupPane`),this.options.markerZoomAnimation||(G(e.markerPane,`leaflet-zoom-hide`),G(e.shadowPane,`leaflet-zoom-hide`))},_resetView:function(e,t,n){K(this._mapPane,new j(0,0));var r=!this._loaded;this._loaded=!0,t=this._limitZoom(t),this.fire(`viewprereset`);var i=this._zoom!==t;this._moveStart(i,n)._move(e,t)._moveEnd(i),this.fire(`viewreset`),r&&this.fire(`load`)},_moveStart:function(e,t){return e&&this.fire(`zoomstart`),t||this.fire(`movestart`),this},_move:function(e,t,n,r){t===void 0&&(t=this._zoom);var i=this._zoom!==t;return this._zoom=t,this._lastCenter=e,this._pixelOrigin=this._getNewPixelOrigin(e),r?n&&n.pinch&&this.fire(`zoom`,n):((i||n&&n.pinch)&&this.fire(`zoom`,n),this.fire(`move`,n)),this},_moveEnd:function(e){return e&&this.fire(`zoomend`),this.fire(`moveend`)},_stop:function(){return E(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(e){K(this._mapPane,this._getMapPanePos().subtract(e))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw Error(`Set map center and zoom first.`)},_initEvents:function(e){this._targets={},this._targets[o(this._container)]=this;var t=e?X:J;t(this._container,`click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup`,this._handleDOMEvent,this),this.options.trackResize&&t(window,`resize`,this._onResize,this),H.any3d&&this.options.transform3DLimit&&(e?this.off:this.on).call(this,`moveend`,this._onMoveEnd)},_onResize:function(){E(this._resizeRequest),this._resizeRequest=T(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var e=this._getMapPanePos();Math.max(Math.abs(e.x),Math.abs(e.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(e,t){for(var n=[],r,i=t===`mouseout`||t===`mouseover`,a=e.target||e.srcElement,s=!1;a;){if(r=this._targets[o(a)],r&&(t===`click`||t===`preclick`)&&this._draggableMoved(r)){s=!0;break}if(r&&r.listens(t,!0)&&(i&&!nn(a,e)||(n.push(r),i))||a===this._container)break;a=a.parentNode}return!n.length&&!s&&!i&&this.listens(t,!0)&&(n=[this]),n},_isClickDisabled:function(e){for(;e&&e!==this._container;){if(e._leaflet_disable_click)return!0;e=e.parentNode}},_handleDOMEvent:function(e){var t=e.target||e.srcElement;if(!(!this._loaded||t._leaflet_disable_events||e.type===`click`&&this._isClickDisabled(t))){var n=e.type;n===`mousedown`&&zt(t),this._fireDOMEvent(e,n)}},_mouseEvents:[`click`,`dblclick`,`mouseover`,`mouseout`,`contextmenu`],_fireDOMEvent:function(e,t,r){if(e.type===`click`){var i=n({},e);i.type=`preclick`,this._fireDOMEvent(i,i.type,r)}var a=this._findEventTargets(e,t);if(r){for(var o=[],s=0;s<r.length;s++)r[s].listens(t,!0)&&o.push(r[s]);a=o.concat(a)}if(a.length){t===`contextmenu`&&Xt(e);var c=a[0],l={originalEvent:e};if(e.type!==`keypress`&&e.type!==`keydown`&&e.type!==`keyup`){var u=c.getLatLng&&(!c._radius||c._radius<=10);l.containerPoint=u?this.latLngToContainerPoint(c.getLatLng()):this.mouseEventToContainerPoint(e),l.layerPoint=this.containerPointToLayerPoint(l.containerPoint),l.latlng=u?c.getLatLng():this.layerPointToLatLng(l.layerPoint)}for(s=0;s<a.length;s++)if(a[s].fire(t,l,!0),l.originalEvent._stopped||a[s].options.bubblingMouseEvents===!1&&v(this._mouseEvents,t)!==-1)return}},_draggableMoved:function(e){return e=e.dragging&&e.dragging.enabled()?e:this,e.dragging&&e.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var e=0,t=this._handlers.length;e<t;e++)this._handlers[e].disable()},whenReady:function(e,t){return this._loaded?e.call(t||this,{target:this}):this.on(`load`,e,t),this},_getMapPanePos:function(){return At(this._mapPane)||new j(0,0)},_moved:function(){var e=this._getMapPanePos();return e&&!e.equals([0,0])},_getTopLeftPoint:function(e,t){return(e&&t!==void 0?this._getNewPixelOrigin(e,t):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(e,t){var n=this.getSize()._divideBy(2);return this.project(e,t)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(e,t,n){var r=this._getNewPixelOrigin(n,t);return this.project(e,t)._subtract(r)},_latLngBoundsToNewLayerBounds:function(e,t,n){var r=this._getNewPixelOrigin(n,t);return P([this.project(e.getSouthWest(),t)._subtract(r),this.project(e.getNorthWest(),t)._subtract(r),this.project(e.getSouthEast(),t)._subtract(r),this.project(e.getNorthEast(),t)._subtract(r)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitCenter:function(e,t,n){if(!n)return e;var r=this.project(e,t),i=this.getSize().divideBy(2),a=new N(r.subtract(i),r.add(i)),o=this._getBoundsOffset(a,n,t);return Math.abs(o.x)<=1&&Math.abs(o.y)<=1?e:this.unproject(r.add(o),t)},_limitOffset:function(e,t){if(!t)return e;var n=this.getPixelBounds(),r=new N(n.min.add(e),n.max.add(e));return e.add(this._getBoundsOffset(r,t))},_getBoundsOffset:function(e,t,n){var r=P(this.project(t.getNorthEast(),n),this.project(t.getSouthWest(),n)),i=r.min.subtract(e.min),a=r.max.subtract(e.max);return new j(this._rebound(i.x,-a.x),this._rebound(i.y,-a.y))},_rebound:function(e,t){return e+t>0?Math.round(e-t)/2:Math.max(0,Math.ceil(e))-Math.max(0,Math.floor(t))},_limitZoom:function(e){var t=this.getMinZoom(),n=this.getMaxZoom(),r=H.any3d?this.options.zoomSnap:1;return r&&(e=Math.round(e/r)*r),Math.max(t,Math.min(n,e))},_onPanTransitionStep:function(){this.fire(`move`)},_onPanTransitionEnd:function(){Ct(this._mapPane,`leaflet-pan-anim`),this.fire(`moveend`)},_tryAnimatedPan:function(e,t){var n=this._getCenterOffset(e)._trunc();return(t&&t.animate)!==!0&&!this.getSize().contains(n)?!1:(this.panBy(n,t),!0)},_createAnimProxy:function(){var e=this._proxy=U(`div`,`leaflet-proxy leaflet-zoom-animated`);this._panes.mapPane.appendChild(e),this.on(`zoomanim`,function(e){var t=mt,n=this._proxy.style[t];kt(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[t]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on(`load moveend`,this._animMoveEnd,this),this._on(`unload`,this._destroyAnimProxy,this)},_destroyAnimProxy:function(){W(this._proxy),this.off(`load moveend`,this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var e=this.getCenter(),t=this.getZoom();kt(this._proxy,this.project(e,t),this.getZoomScale(t,1))},_catchTransitionEnd:function(e){this._animatingZoom&&e.propertyName.indexOf(`transform`)>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName(`leaflet-zoom-animated`).length},_tryAnimatedZoom:function(e,t,n){if(this._animatingZoom)return!0;if(n||={},!this._zoomAnimated||n.animate===!1||this._nothingToAnimate()||Math.abs(t-this._zoom)>this.options.zoomAnimationThreshold)return!1;var r=this.getZoomScale(t),i=this._getCenterOffset(e)._divideBy(1-1/r);return n.animate!==!0&&!this.getSize().contains(i)?!1:(T(function(){this._moveStart(!0,n.noMoveStart||!1)._animateZoom(e,t,!0)},this),!0)},_animateZoom:function(e,t,n,r){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=e,this._animateToZoom=t,G(this._mapPane,`leaflet-zoom-anim`)),this.fire(`zoomanim`,{center:e,zoom:t,noUpdate:r}),this._tempFireZoomEvent||=this._zoom!==this._animateToZoom,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(i(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ct(this._mapPane,`leaflet-zoom-anim`),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire(`zoom`),delete this._tempFireZoomEvent,this.fire(`move`),this._moveEnd(!0))}});function on(e,t){return new Z(e,t)}var sn=O.extend({options:{position:`topright`},initialize:function(e){p(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},getContainer:function(){return this._container},addTo:function(e){this.remove(),this._map=e;var t=this._container=this.onAdd(e),n=this.getPosition(),r=e._controlCorners[n];return G(t,`leaflet-control`),n.indexOf(`bottom`)===-1?r.appendChild(t):r.insertBefore(t,r.firstChild),this._map.on(`unload`,this.remove,this),this},remove:function(){return this._map?(W(this._container),this.onRemove&&this.onRemove(this._map),this._map.off(`unload`,this.remove,this),this._map=null,this):this},_refocusOnMap:function(e){this._map&&e&&e.screenX>0&&e.screenY>0&&this._map.getContainer().focus()}}),cn=function(e){return new sn(e)};Z.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.remove(),this},_initControlPos:function(){var e=this._controlCorners={},t=`leaflet-`,n=this._controlContainer=U(`div`,t+`control-container`,this._container);function r(r,i){var a=t+r+` `+t+i;e[r+i]=U(`div`,a,n)}r(`top`,`left`),r(`top`,`right`),r(`bottom`,`left`),r(`bottom`,`right`)},_clearControlPos:function(){for(var e in this._controlCorners)W(this._controlCorners[e]);W(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var ln=sn.extend({options:{collapsed:!0,position:`topright`,autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(e,t,n,r){return n<r?-1:+(r<n)}},initialize:function(e,t,n){for(var r in p(this,n),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1,e)this._addLayer(e[r],r);for(r in t)this._addLayer(t[r],r,!0)},onAdd:function(e){this._initLayout(),this._update(),this._map=e,e.on(`zoomend`,this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.on(`add remove`,this._onLayerChange,this);return this._container},addTo:function(e){return sn.prototype.addTo.call(this,e),this._expandIfNotCollapsed()},onRemove:function(){this._map.off(`zoomend`,this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.off(`add remove`,this._onLayerChange,this)},addBaseLayer:function(e,t){return this._addLayer(e,t),this._map?this._update():this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._map?this._update():this},removeLayer:function(e){e.off(`add remove`,this._onLayerChange,this);var t=this._getLayer(o(e));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){G(this._container,`leaflet-control-layers-expanded`),this._section.style.height=null;var e=this._map.getSize().y-(this._container.offsetTop+50);return e<this._section.clientHeight?(G(this._section,`leaflet-control-layers-scrollbar`),this._section.style.height=e+`px`):Ct(this._section,`leaflet-control-layers-scrollbar`),this._checkDisabledLayers(),this},collapse:function(){return Ct(this._container,`leaflet-control-layers-expanded`),this},_initLayout:function(){var e=`leaflet-control-layers`,t=this._container=U(`div`,e),n=this.options.collapsed;t.setAttribute(`aria-haspopup`,!0),Yt(t),Jt(t);var r=this._section=U(`section`,e+`-list`);n&&(this._map.on(`click`,this.collapse,this),J(t,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var i=this._layersLink=U(`a`,e+`-toggle`,t);i.href=`#`,i.title=`Layers`,i.setAttribute(`role`,`button`),J(i,{keydown:function(e){e.keyCode===13&&this._expandSafely()},click:function(e){Xt(e),this._expandSafely()}},this),n||this.expand(),this._baseLayersList=U(`div`,e+`-base`,r),this._separator=U(`div`,e+`-separator`,r),this._overlaysList=U(`div`,e+`-overlays`,r),t.appendChild(r)},_getLayer:function(e){for(var t=0;t<this._layers.length;t++)if(this._layers[t]&&o(this._layers[t].layer)===e)return this._layers[t]},_addLayer:function(e,t,n){this._map&&e.on(`add remove`,this._onLayerChange,this),this._layers.push({layer:e,name:t,overlay:n}),this.options.sortLayers&&this._layers.sort(i(function(e,t){return this.options.sortFunction(e.layer,t.layer,e.name,t.name)},this)),this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;yt(this._baseLayersList),yt(this._overlaysList),this._layerControlInputs=[];var e,t,n,r,i=0;for(n=0;n<this._layers.length;n++)r=this._layers[n],this._addItem(r),t||=r.overlay,e||=!r.overlay,i+=+!r.overlay;return this.options.hideSingleBase&&(e&&=i>1,this._baseLayersList.style.display=e?``:`none`),this._separator.style.display=t&&e?``:`none`,this},_onLayerChange:function(e){this._handlingClick||this._update();var t=this._getLayer(o(e.target)),n=t.overlay?e.type===`add`?`overlayadd`:`overlayremove`:e.type===`add`?`baselayerchange`:null;n&&this._map.fire(n,t)},_createRadioElement:function(e,t){var n=`<input type="radio" class="leaflet-control-layers-selector" name="`+e+`"`+(t?` checked="checked"`:``)+`/>`,r=document.createElement(`div`);return r.innerHTML=n,r.firstChild},_addItem:function(e){var t=document.createElement(`label`),n=this._map.hasLayer(e.layer),r;e.overlay?(r=document.createElement(`input`),r.type=`checkbox`,r.className=`leaflet-control-layers-selector`,r.defaultChecked=n):r=this._createRadioElement(`leaflet-base-layers_`+o(this),n),this._layerControlInputs.push(r),r.layerId=o(e.layer),J(r,`click`,this._onInputClick,this);var i=document.createElement(`span`);i.innerHTML=` `+e.name;var a=document.createElement(`span`);return t.appendChild(a),a.appendChild(r),a.appendChild(i),(e.overlay?this._overlaysList:this._baseLayersList).appendChild(t),this._checkDisabledLayers(),t},_onInputClick:function(){if(!this._preventClick){var e=this._layerControlInputs,t,n,r=[],i=[];this._handlingClick=!0;for(var a=e.length-1;a>=0;a--)t=e[a],n=this._getLayer(t.layerId).layer,t.checked?r.push(n):t.checked||i.push(n);for(a=0;a<i.length;a++)this._map.hasLayer(i[a])&&this._map.removeLayer(i[a]);for(a=0;a<r.length;a++)this._map.hasLayer(r[a])||this._map.addLayer(r[a]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var e=this._layerControlInputs,t,n,r=this._map.getZoom(),i=e.length-1;i>=0;i--)t=e[i],n=this._getLayer(t.layerId).layer,t.disabled=n.options.minZoom!==void 0&&r<n.options.minZoom||n.options.maxZoom!==void 0&&r>n.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var e=this._section;this._preventClick=!0,J(e,`click`,Xt),this.expand();var t=this;setTimeout(function(){X(e,`click`,Xt),t._preventClick=!1})}}),un=function(e,t,n){return new ln(e,t,n)},dn=sn.extend({options:{position:`topleft`,zoomInText:`<span aria-hidden="true">+</span>`,zoomInTitle:`Zoom in`,zoomOutText:`<span aria-hidden="true">&#x2212;</span>`,zoomOutTitle:`Zoom out`},onAdd:function(e){var t=`leaflet-control-zoom`,n=U(`div`,t+` leaflet-bar`),r=this.options;return this._zoomInButton=this._createButton(r.zoomInText,r.zoomInTitle,t+`-in`,n,this._zoomIn),this._zoomOutButton=this._createButton(r.zoomOutText,r.zoomOutTitle,t+`-out`,n,this._zoomOut),this._updateDisabled(),e.on(`zoomend zoomlevelschange`,this._updateDisabled,this),n},onRemove:function(e){e.off(`zoomend zoomlevelschange`,this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(e){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1))},_zoomOut:function(e){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1))},_createButton:function(e,t,n,r,i){var a=U(`a`,n,r);return a.innerHTML=e,a.href=`#`,a.title=t,a.setAttribute(`role`,`button`),a.setAttribute(`aria-label`,t),Yt(a),J(a,`click`,Zt),J(a,`click`,i,this),J(a,`click`,this._refocusOnMap,this),a},_updateDisabled:function(){var e=this._map,t=`leaflet-disabled`;Ct(this._zoomInButton,t),Ct(this._zoomOutButton,t),this._zoomInButton.setAttribute(`aria-disabled`,`false`),this._zoomOutButton.setAttribute(`aria-disabled`,`false`),(this._disabled||e._zoom===e.getMinZoom())&&(G(this._zoomOutButton,t),this._zoomOutButton.setAttribute(`aria-disabled`,`true`)),(this._disabled||e._zoom===e.getMaxZoom())&&(G(this._zoomInButton,t),this._zoomInButton.setAttribute(`aria-disabled`,`true`))}});Z.mergeOptions({zoomControl:!0}),Z.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new dn,this.addControl(this.zoomControl))});var fn=function(e){return new dn(e)},pn=sn.extend({options:{position:`bottomleft`,maxWidth:100,metric:!0,imperial:!0},onAdd:function(e){var t=`leaflet-control-scale`,n=U(`div`,t),r=this.options;return this._addScales(r,t+`-line`,n),e.on(r.updateWhenIdle?`moveend`:`move`,this._update,this),e.whenReady(this._update,this),n},onRemove:function(e){e.off(this.options.updateWhenIdle?`moveend`:`move`,this._update,this)},_addScales:function(e,t,n){e.metric&&(this._mScale=U(`div`,t,n)),e.imperial&&(this._iScale=U(`div`,t,n))},_update:function(){var e=this._map,t=e.getSize().y/2,n=e.distance(e.containerPointToLatLng([0,t]),e.containerPointToLatLng([this.options.maxWidth,t]));this._updateScales(n)},_updateScales:function(e){this.options.metric&&e&&this._updateMetric(e),this.options.imperial&&e&&this._updateImperial(e)},_updateMetric:function(e){var t=this._getRoundNum(e),n=t<1e3?t+` m`:t/1e3+` km`;this._updateScale(this._mScale,n,t/e)},_updateImperial:function(e){var t=e*3.2808399,n,r,i;t>5280?(n=t/5280,r=this._getRoundNum(n),this._updateScale(this._iScale,r+` mi`,r/n)):(i=this._getRoundNum(t),this._updateScale(this._iScale,i+` ft`,i/t))},_updateScale:function(e,t,n){e.style.width=Math.round(this.options.maxWidth*n)+`px`,e.innerHTML=t},_getRoundNum:function(e){var t=10**((Math.floor(e)+``).length-1),n=e/t;return n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1,t*n}}),mn=function(e){return new pn(e)},hn=sn.extend({options:{position:`bottomright`,prefix:`<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">`+(H.inlineSvg?`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> `:``)+`Leaflet</a>`},initialize:function(e){p(this,e),this._attributions={}},onAdd:function(e){for(var t in e.attributionControl=this,this._container=U(`div`,`leaflet-control-attribution`),Yt(this._container),e._layers)e._layers[t].getAttribution&&this.addAttribution(e._layers[t].getAttribution());return this._update(),e.on(`layeradd`,this._addAttribution,this),this._container},onRemove:function(e){e.off(`layeradd`,this._addAttribution,this)},_addAttribution:function(e){e.layer.getAttribution&&(this.addAttribution(e.layer.getAttribution()),e.layer.once(`remove`,function(){this.removeAttribution(e.layer.getAttribution())},this))},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){return e?(this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update(),this):this},removeAttribution:function(e){return e&&this._attributions[e]&&(this._attributions[e]--,this._update()),this},_update:function(){if(this._map){var e=[];for(var t in this._attributions)this._attributions[t]&&e.push(t);var n=[];this.options.prefix&&n.push(this.options.prefix),e.length&&n.push(e.join(`, `)),this._container.innerHTML=n.join(` <span aria-hidden="true">|</span> `)}}});Z.mergeOptions({attributionControl:!0}),Z.addInitHook(function(){this.options.attributionControl&&new hn().addTo(this)}),sn.Layers=ln,sn.Zoom=dn,sn.Scale=pn,sn.Attribution=hn,cn.layers=un,cn.zoom=fn,cn.scale=mn,cn.attribution=function(e){return new hn(e)};var gn=O.extend({initialize:function(e){this._map=e},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});gn.addTo=function(e,t){return e.addHandler(t,this),this};var _n={Events:k},vn=H.touch?`touchstart mousedown`:`mousedown`,yn=A.extend({options:{clickTolerance:3},initialize:function(e,t,n,r){p(this,r),this._element=e,this._dragStartTarget=t||e,this._preventOutline=n},enable:function(){this._enabled||=(J(this._dragStartTarget,vn,this._onDown,this),!0)},disable:function(){this._enabled&&(yn._dragging===this&&this.finishDrag(!0),X(this._dragStartTarget,vn,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(e){if(this._enabled&&(this._moved=!1,!St(this._element,`leaflet-zoom-anim`))){if(e.touches&&e.touches.length!==1){yn._dragging===this&&this.finishDrag();return}if(!(yn._dragging||e.shiftKey||e.which!==1&&e.button!==1&&!e.touches)&&(yn._dragging=this,this._preventOutline&&zt(this._element),Ft(),jt(),!this._moving)){this.fire(`down`);var t=e.touches?e.touches[0]:e,n=Vt(this._element);this._startPoint=new j(t.clientX,t.clientY),this._startPos=At(this._element),this._parentScale=Ht(n);var r=e.type===`mousedown`;J(document,r?`mousemove`:`touchmove`,this._onMove,this),J(document,r?`mouseup`:`touchend touchcancel`,this._onUp,this)}}},_onMove:function(e){if(this._enabled){if(e.touches&&e.touches.length>1){this._moved=!0;return}var t=e.touches&&e.touches.length===1?e.touches[0]:e,n=new j(t.clientX,t.clientY)._subtract(this._startPoint);!n.x&&!n.y||Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(n.x/=this._parentScale.x,n.y/=this._parentScale.y,Xt(e),this._moved||(this.fire(`dragstart`),this._moved=!0,G(document.body,`leaflet-dragging`),this._lastTarget=e.target||e.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),G(this._lastTarget,`leaflet-drag-target`)),this._newPos=this._startPos.add(n),this._moving=!0,this._lastEvent=e,this._updatePosition())}},_updatePosition:function(){var e={originalEvent:this._lastEvent};this.fire(`predrag`,e),K(this._element,this._newPos),this.fire(`drag`,e)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(e){Ct(document.body,`leaflet-dragging`),this._lastTarget&&=(Ct(this._lastTarget,`leaflet-drag-target`),null),X(document,`mousemove touchmove`,this._onMove,this),X(document,`mouseup touchend touchcancel`,this._onUp,this),It(),Mt();var t=this._moved&&this._moving;this._moving=!1,yn._dragging=!1,t&&this.fire(`dragend`,{noInertia:e,distance:this._newPos.distanceTo(this._startPos)})}});function bn(e,t,n){var r,i=[1,4,2,8],a,o,s,c,l,u,d,f;for(a=0,u=e.length;a<u;a++)e[a]._code=Nn(e[a],t);for(s=0;s<4;s++){for(d=i[s],r=[],a=0,u=e.length,o=u-1;a<u;o=a++)c=e[a],l=e[o],c._code&d?l._code&d||(f=Mn(l,c,d,t,n),f._code=Nn(f,t),r.push(f)):(l._code&d&&(f=Mn(l,c,d,t,n),f._code=Nn(f,t),r.push(f)),r.push(c));e=r}return e}function xn(e,t){var n,r,i,a,o,s,c,l,u;if(!e||e.length===0)throw Error(`latlngs not passed`);In(e)||(console.warn(`latlngs are not flat! Only the first ring will be used`),e=e[0]);var d=z([0,0]),f=I(e);f.getNorthWest().distanceTo(f.getSouthWest())*f.getNorthEast().distanceTo(f.getNorthWest())<1700&&(d=Sn(e));var p=e.length,m=[];for(n=0;n<p;n++){var h=z(e[n]);m.push(t.project(z([h.lat-d.lat,h.lng-d.lng])))}for(s=c=l=0,n=0,r=p-1;n<p;r=n++)i=m[n],a=m[r],o=i.y*a.x-a.y*i.x,c+=(i.x+a.x)*o,l+=(i.y+a.y)*o,s+=o*3;u=s===0?m[0]:[c/s,l/s];var g=t.unproject(M(u));return z([g.lat+d.lat,g.lng+d.lng])}function Sn(e){for(var t=0,n=0,r=0,i=0;i<e.length;i++){var a=z(e[i]);t+=a.lat,n+=a.lng,r++}return z([t/r,n/r])}var Cn={__proto__:null,clipPolygon:bn,polygonCenter:xn,centroid:Sn};function wn(e,t){if(!t||!e.length)return e.slice();var n=t*t;return e=kn(e,n),e=Dn(e,n),e}function Tn(e,t,n){return Math.sqrt(Fn(e,t,n,!0))}function En(e,t,n){return Fn(e,t,n)}function Dn(e,t){var n=e.length,r=new(typeof Uint8Array<`u`?Uint8Array:Array)(n);r[0]=r[n-1]=1,On(e,r,t,0,n-1);var i,a=[];for(i=0;i<n;i++)r[i]&&a.push(e[i]);return a}function On(e,t,n,r,i){var a=0,o,s,c;for(s=r+1;s<=i-1;s++)c=Fn(e[s],e[r],e[i],!0),c>a&&(o=s,a=c);a>n&&(t[o]=1,On(e,t,n,r,o),On(e,t,n,o,i))}function kn(e,t){for(var n=[e[0]],r=1,i=0,a=e.length;r<a;r++)Pn(e[r],e[i])>t&&(n.push(e[r]),i=r);return i<a-1&&n.push(e[a-1]),n}var An;function jn(e,t,n,r,i){var a=r?An:Nn(e,n),o=Nn(t,n),s,c,l;for(An=o;;){if(!(a|o))return[e,t];if(a&o)return!1;s=a||o,c=Mn(e,t,s,n,i),l=Nn(c,n),s===a?(e=c,a=l):(t=c,o=l)}}function Mn(e,t,n,r,i){var a=t.x-e.x,o=t.y-e.y,s=r.min,c=r.max,l,u;return n&8?(l=e.x+a*(c.y-e.y)/o,u=c.y):n&4?(l=e.x+a*(s.y-e.y)/o,u=s.y):n&2?(l=c.x,u=e.y+o*(c.x-e.x)/a):n&1&&(l=s.x,u=e.y+o*(s.x-e.x)/a),new j(l,u,i)}function Nn(e,t){var n=0;return e.x<t.min.x?n|=1:e.x>t.max.x&&(n|=2),e.y<t.min.y?n|=4:e.y>t.max.y&&(n|=8),n}function Pn(e,t){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r}function Fn(e,t,n,r){var i=t.x,a=t.y,o=n.x-i,s=n.y-a,c=o*o+s*s,l;return c>0&&(l=((e.x-i)*o+(e.y-a)*s)/c,l>1?(i=n.x,a=n.y):l>0&&(i+=o*l,a+=s*l)),o=e.x-i,s=e.y-a,r?o*o+s*s:new j(i,a)}function In(e){return!_(e[0])||typeof e[0][0]!=`object`&&e[0][0]!==void 0}function Ln(e){return console.warn(`Deprecated use of _flat, please use L.LineUtil.isFlat instead.`),In(e)}function Rn(e,t){var n,r,i,a,o,s,c,l;if(!e||e.length===0)throw Error(`latlngs not passed`);In(e)||(console.warn(`latlngs are not flat! Only the first ring will be used`),e=e[0]);var u=z([0,0]),d=I(e);d.getNorthWest().distanceTo(d.getSouthWest())*d.getNorthEast().distanceTo(d.getNorthWest())<1700&&(u=Sn(e));var f=e.length,p=[];for(n=0;n<f;n++){var m=z(e[n]);p.push(t.project(z([m.lat-u.lat,m.lng-u.lng])))}for(n=0,r=0;n<f-1;n++)r+=p[n].distanceTo(p[n+1])/2;if(r===0)l=p[0];else for(n=0,a=0;n<f-1;n++)if(o=p[n],s=p[n+1],i=o.distanceTo(s),a+=i,a>r){c=(a-r)/i,l=[s.x-c*(s.x-o.x),s.y-c*(s.y-o.y)];break}var h=t.unproject(M(l));return z([h.lat+u.lat,h.lng+u.lng])}var zn={__proto__:null,simplify:wn,pointToSegmentDistance:Tn,closestPointOnSegment:En,clipSegment:jn,_getEdgeIntersection:Mn,_getBitCode:Nn,_sqClosestPointOnSegment:Fn,isFlat:In,_flat:Ln,polylineCenter:Rn},Bn={project:function(e){return new j(e.lng,e.lat)},unproject:function(e){return new R(e.y,e.x)},bounds:new N([-180,-90],[180,90])},Vn={R:6378137,R_MINOR:6356752.314245179,bounds:new N([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(e){var t=Math.PI/180,n=this.R,r=e.lat*t,i=this.R_MINOR/n,a=Math.sqrt(1-i*i),o=a*Math.sin(r),s=Math.tan(Math.PI/4-r/2)/((1-o)/(1+o))**(a/2);return r=-n*Math.log(Math.max(s,1e-10)),new j(e.lng*t*n,r)},unproject:function(e){for(var t=180/Math.PI,n=this.R,r=this.R_MINOR/n,i=Math.sqrt(1-r*r),a=Math.exp(-e.y/n),o=Math.PI/2-2*Math.atan(a),s=0,c=.1,l;s<15&&Math.abs(c)>1e-7;s++)l=i*Math.sin(o),l=((1-l)/(1+l))**(i/2),c=Math.PI/2-2*Math.atan(a*l)-o,o+=c;return new R(o*t,e.x*t/n)}},Hn={__proto__:null,LonLat:Bn,Mercator:Vn,SphericalMercator:ie},Un=n({},ne,{code:`EPSG:3395`,projection:Vn,transformation:function(){var e=.5/(Math.PI*Vn.R);return oe(e,.5,-e,.5)}()}),Wn=n({},ne,{code:`EPSG:4326`,projection:Bn,transformation:oe(1/180,1,-1/180,.5)}),Gn=n({},B,{projection:Bn,transformation:oe(1,0,-1,0),scale:function(e){return 2**e},zoom:function(e){return Math.log(e)/Math.LN2},distance:function(e,t){var n=t.lng-e.lng,r=t.lat-e.lat;return Math.sqrt(n*n+r*r)},infinite:!0});B.Earth=ne,B.EPSG3395=Un,B.EPSG3857=se,B.EPSG900913=ce,B.EPSG4326=Wn,B.Simple=Gn;var Q=A.extend({options:{pane:`overlayPane`,attribution:null,bubblingMouseEvents:!0},addTo:function(e){return e.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(e){return e&&e.removeLayer(this),this},getPane:function(e){return this._map.getPane(e?this.options[e]||e:this.options.pane)},addInteractiveTarget:function(e){return this._map._targets[o(e)]=this,this},removeInteractiveTarget:function(e){return delete this._map._targets[o(e)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(e){var t=e.target;if(t.hasLayer(this)){if(this._map=t,this._zoomAnimated=t._zoomAnimated,this.getEvents){var n=this.getEvents();t.on(n,this),this.once(`remove`,function(){t.off(n,this)},this)}this.onAdd(t),this.fire(`add`),t.fire(`layeradd`,{layer:this})}}});Z.include({addLayer:function(e){if(!e._layerAdd)throw Error(`The provided object is not a Layer.`);var t=o(e);return this._layers[t]?this:(this._layers[t]=e,e._mapToAdd=this,e.beforeAdd&&e.beforeAdd(this),this.whenReady(e._layerAdd,e),this)},removeLayer:function(e){var t=o(e);return this._layers[t]?(this._loaded&&e.onRemove(this),delete this._layers[t],this._loaded&&(this.fire(`layerremove`,{layer:e}),e.fire(`remove`)),e._map=e._mapToAdd=null,this):this},hasLayer:function(e){return o(e)in this._layers},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},_addLayers:function(e){e=e?_(e)?e:[e]:[];for(var t=0,n=e.length;t<n;t++)this.addLayer(e[t])},_addZoomLimit:function(e){(!isNaN(e.options.maxZoom)||!isNaN(e.options.minZoom))&&(this._zoomBoundLayers[o(e)]=e,this._updateZoomLevels())},_removeZoomLimit:function(e){var t=o(e);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var e=1/0,t=-1/0,n=this._getZoomSpan();for(var r in this._zoomBoundLayers){var i=this._zoomBoundLayers[r].options;e=i.minZoom===void 0?e:Math.min(e,i.minZoom),t=i.maxZoom===void 0?t:Math.max(t,i.maxZoom)}this._layersMaxZoom=t===-1/0?void 0:t,this._layersMinZoom=e===1/0?void 0:e,n!==this._getZoomSpan()&&this.fire(`zoomlevelschange`),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Kn=Q.extend({initialize:function(e,t){p(this,t),this._layers={};var n,r;if(e)for(n=0,r=e.length;n<r;n++)this.addLayer(e[n])},addLayer:function(e){var t=this.getLayerId(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=e in this._layers?e:this.getLayerId(e);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(e){return(typeof e==`number`?e:this.getLayerId(e))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(e){var t=Array.prototype.slice.call(arguments,1),n,r;for(n in this._layers)r=this._layers[n],r[e]&&r[e].apply(r,t);return this},onAdd:function(e){this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e)},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},getLayer:function(e){return this._layers[e]},getLayers:function(){var e=[];return this.eachLayer(e.push,e),e},setZIndex:function(e){return this.invoke(`setZIndex`,e)},getLayerId:function(e){return o(e)}}),qn=function(e,t){return new Kn(e,t)},Jn=Kn.extend({addLayer:function(e){return this.hasLayer(e)?this:(e.addEventParent(this),Kn.prototype.addLayer.call(this,e),this.fire(`layeradd`,{layer:e}))},removeLayer:function(e){return this.hasLayer(e)?(e in this._layers&&(e=this._layers[e]),e.removeEventParent(this),Kn.prototype.removeLayer.call(this,e),this.fire(`layerremove`,{layer:e})):this},setStyle:function(e){return this.invoke(`setStyle`,e)},bringToFront:function(){return this.invoke(`bringToFront`)},bringToBack:function(){return this.invoke(`bringToBack`)},getBounds:function(){var e=new F;for(var t in this._layers){var n=this._layers[t];e.extend(n.getBounds?n.getBounds():n.getLatLng())}return e}}),Yn=function(e,t){return new Jn(e,t)},Xn=O.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(e){p(this,e)},createIcon:function(e){return this._createIcon(`icon`,e)},createShadow:function(e){return this._createIcon(`shadow`,e)},_createIcon:function(e,t){var n=this._getIconUrl(e);if(!n){if(e===`icon`)throw Error(`iconUrl not set in Icon options (see the docs).`);return null}var r=this._createImg(n,t&&t.tagName===`IMG`?t:null);return this._setIconStyles(r,e),(this.options.crossOrigin||this.options.crossOrigin===``)&&(r.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),r},_setIconStyles:function(e,t){var n=this.options,r=n[t+`Size`];typeof r==`number`&&(r=[r,r]);var i=M(r),a=M(t===`shadow`&&n.shadowAnchor||n.iconAnchor||i&&i.divideBy(2,!0));e.className=`leaflet-marker-`+t+` `+(n.className||``),a&&(e.style.marginLeft=-a.x+`px`,e.style.marginTop=-a.y+`px`),i&&(e.style.width=i.x+`px`,e.style.height=i.y+`px`)},_createImg:function(e,t){return t||=document.createElement(`img`),t.src=e,t},_getIconUrl:function(e){return H.retina&&this.options[e+`RetinaUrl`]||this.options[e+`Url`]}});function Zn(e){return new Xn(e)}var Qn=Xn.extend({options:{iconUrl:`marker-icon.png`,iconRetinaUrl:`marker-icon-2x.png`,shadowUrl:`marker-shadow.png`,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(e){return typeof Qn.imagePath!=`string`&&(Qn.imagePath=this._detectIconPath()),(this.options.imagePath||Qn.imagePath)+Xn.prototype._getIconUrl.call(this,e)},_stripUrl:function(e){var t=function(e,t,n){var r=t.exec(e);return r&&r[n]};return e=t(e,/^url\((['"])?(.+)\1\)$/,2),e&&t(e,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var e=U(`div`,`leaflet-default-icon-path`,document.body),t=vt(e,`background-image`)||vt(e,`backgroundImage`);if(document.body.removeChild(e),t=this._stripUrl(t),t)return t;var n=document.querySelector(`link[href$="leaflet.css"]`);return n?n.href.substring(0,n.href.length-11-1):``}}),$n=gn.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||=new yn(e,e,!0),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),G(e,`leaflet-marker-draggable`)},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ct(this._marker._icon,`leaflet-marker-draggable`)},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(e){var t=this._marker,n=t._map,r=this._marker.options.autoPanSpeed,i=this._marker.options.autoPanPadding,a=At(t._icon),o=n.getPixelBounds(),s=n.getPixelOrigin(),c=P(o.min._subtract(s).add(i),o.max._subtract(s).subtract(i));if(!c.contains(a)){var l=M((Math.max(c.max.x,a.x)-c.max.x)/(o.max.x-c.max.x)-(Math.min(c.min.x,a.x)-c.min.x)/(o.min.x-c.min.x),(Math.max(c.max.y,a.y)-c.max.y)/(o.max.y-c.max.y)-(Math.min(c.min.y,a.y)-c.min.y)/(o.min.y-c.min.y)).multiplyBy(r);n.panBy(l,{animate:!1}),this._draggable._newPos._add(l),this._draggable._startPos._add(l),K(t._icon,this._draggable._newPos),this._onDrag(e),this._panRequest=T(this._adjustPan.bind(this,e))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire(`movestart`).fire(`dragstart`)},_onPreDrag:function(e){this._marker.options.autoPan&&(E(this._panRequest),this._panRequest=T(this._adjustPan.bind(this,e)))},_onDrag:function(e){var t=this._marker,n=t._shadow,r=At(t._icon),i=t._map.layerPointToLatLng(r);n&&K(n,r),t._latlng=i,e.latlng=i,e.oldLatLng=this._oldLatLng,t.fire(`move`,e).fire(`drag`,e)},_onDragEnd:function(e){E(this._panRequest),delete this._oldLatLng,this._marker.fire(`moveend`).fire(`dragend`,e)}}),er=Q.extend({options:{icon:new Qn,interactive:!0,keyboard:!0,title:``,alt:`Marker`,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:`markerPane`,shadowPane:`shadowPane`,bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(e,t){p(this,t),this._latlng=z(e)},onAdd:function(e){this._zoomAnimated=this._zoomAnimated&&e.options.markerZoomAnimation,this._zoomAnimated&&e.on(`zoomanim`,this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(e){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&e.off(`zoomanim`,this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(e){var t=this._latlng;return this._latlng=z(e),this.update(),this.fire(`move`,{oldLatLng:t,latlng:this._latlng})},setZIndexOffset:function(e){return this.options.zIndexOffset=e,this.update()},getIcon:function(){return this.options.icon},setIcon:function(e){return this.options.icon=e,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)}return this},_initIcon:function(){var e=this.options,t=`leaflet-zoom-`+(this._zoomAnimated?`animated`:`hide`),n=e.icon.createIcon(this._icon),r=!1;n!==this._icon&&(this._icon&&this._removeIcon(),r=!0,e.title&&(n.title=e.title),n.tagName===`IMG`&&(n.alt=e.alt||``)),G(n,t),e.keyboard&&(n.tabIndex=`0`,n.setAttribute(`role`,`button`)),this._icon=n,e.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&J(n,`focus`,this._panOnFocus,this);var i=e.icon.createShadow(this._shadow),a=!1;i!==this._shadow&&(this._removeShadow(),a=!0),i&&(G(i,t),i.alt=``),this._shadow=i,e.opacity<1&&this._updateOpacity(),r&&this.getPane().appendChild(this._icon),this._initInteraction(),i&&a&&this.getPane(e.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&X(this._icon,`focus`,this._panOnFocus,this),W(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&W(this._shadow),this._shadow=null},_setPos:function(e){this._icon&&K(this._icon,e),this._shadow&&K(this._shadow,e),this._zIndex=e.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(e){this._icon&&(this._icon.style.zIndex=this._zIndex+e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();this._setPos(t)},_initInteraction:function(){if(this.options.interactive&&(G(this._icon,`leaflet-interactive`),this.addInteractiveTarget(this._icon),$n)){var e=this.options.draggable;this.dragging&&(e=this.dragging.enabled(),this.dragging.disable()),this.dragging=new $n(this),e&&this.dragging.enable()}},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var e=this.options.opacity;this._icon&&Et(this._icon,e),this._shadow&&Et(this._shadow,e)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var e=this._map;if(e){var t=this.options.icon.options,n=t.iconSize?M(t.iconSize):M(0,0),r=t.iconAnchor?M(t.iconAnchor):M(0,0);e.panInside(this._latlng,{paddingTopLeft:r,paddingBottomRight:n.subtract(r)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function tr(e,t){return new er(e,t)}var nr=Q.extend({options:{stroke:!0,color:`#3388ff`,weight:3,opacity:1,lineCap:`round`,lineJoin:`round`,dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:`evenodd`,interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(e){this._renderer=e.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(e){return p(this,e),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&e&&Object.prototype.hasOwnProperty.call(e,`weight`)&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),rr=nr.extend({options:{fill:!0,radius:10},initialize:function(e,t){p(this,t),this._latlng=z(e),this._radius=this.options.radius},setLatLng:function(e){var t=this._latlng;return this._latlng=z(e),this.redraw(),this.fire(`move`,{oldLatLng:t,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(e){return this.options.radius=this._radius=e,this.redraw()},getRadius:function(){return this._radius},setStyle:function(e){var t=e&&e.radius||this._radius;return nr.prototype.setStyle.call(this,e),this.setRadius(t),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var e=this._radius,t=this._radiusY||e,n=this._clickTolerance(),r=[e+n,t+n];this._pxBounds=new N(this._point.subtract(r),this._point.add(r))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(e){return e.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function ir(e,t){return new rr(e,t)}var ar=rr.extend({initialize:function(e,t,r){if(typeof t==`number`&&(t=n({},r,{radius:t})),p(this,t),this._latlng=z(e),isNaN(this.options.radius))throw Error(`Circle radius cannot be NaN`);this._mRadius=this.options.radius},setRadius:function(e){return this._mRadius=e,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var e=[this._radius,this._radiusY||this._radius];return new F(this._map.layerPointToLatLng(this._point.subtract(e)),this._map.layerPointToLatLng(this._point.add(e)))},setStyle:nr.prototype.setStyle,_project:function(){var e=this._latlng.lng,t=this._latlng.lat,n=this._map,r=n.options.crs;if(r.distance===ne.distance){var i=Math.PI/180,a=this._mRadius/ne.R/i,o=n.project([t+a,e]),s=n.project([t-a,e]),c=o.add(s).divideBy(2),l=n.unproject(c).lat,u=Math.acos((Math.cos(a*i)-Math.sin(t*i)*Math.sin(l*i))/(Math.cos(t*i)*Math.cos(l*i)))/i;(isNaN(u)||u===0)&&(u=a/Math.cos(Math.PI/180*t)),this._point=c.subtract(n.getPixelOrigin()),this._radius=isNaN(u)?0:c.x-n.project([l,e-u]).x,this._radiusY=c.y-o.y}else{var d=r.unproject(r.project(this._latlng).subtract([this._mRadius,0]));this._point=n.latLngToLayerPoint(this._latlng),this._radius=this._point.x-n.latLngToLayerPoint(d).x}this._updateBounds()}});function or(e,t,n){return new ar(e,t,n)}var sr=nr.extend({options:{smoothFactor:1,noClip:!1},initialize:function(e,t){p(this,t),this._setLatLngs(e)},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._setLatLngs(e),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(e){for(var t=1/0,n=null,r=Fn,i,a,o=0,s=this._parts.length;o<s;o++)for(var c=this._parts[o],l=1,u=c.length;l<u;l++){i=c[l-1],a=c[l];var d=r(e,i,a,!0);d<t&&(t=d,n=r(e,i,a))}return n&&(n.distance=Math.sqrt(t)),n},getCenter:function(){if(!this._map)throw Error(`Must add layer to map before using getCenter()`);return Rn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(e,t){return t||=this._defaultShape(),e=z(e),t.push(e),this._bounds.extend(e),this.redraw()},_setLatLngs:function(e){this._bounds=new F,this._latlngs=this._convertLatLngs(e)},_defaultShape:function(){return In(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(e){for(var t=[],n=In(e),r=0,i=e.length;r<i;r++)n?(t[r]=z(e[r]),this._bounds.extend(t[r])):t[r]=this._convertLatLngs(e[r]);return t},_project:function(){var e=new N;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,e),this._bounds.isValid()&&e.isValid()&&(this._rawPxBounds=e,this._updateBounds())},_updateBounds:function(){var e=this._clickTolerance(),t=new j(e,e);this._rawPxBounds&&(this._pxBounds=new N([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(e,t,n){var r=e[0]instanceof R,i=e.length,a,o;if(r){for(o=[],a=0;a<i;a++)o[a]=this._map.latLngToLayerPoint(e[a]),n.extend(o[a]);t.push(o)}else for(a=0;a<i;a++)this._projectLatlngs(e[a],t,n)},_clipPoints:function(){var e=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}var t=this._parts,n,r,i,a,o,s,c;for(n=0,i=0,a=this._rings.length;n<a;n++)for(c=this._rings[n],r=0,o=c.length;r<o-1;r++)s=jn(c[r],c[r+1],e,r,!0),s&&(t[i]=t[i]||[],t[i].push(s[0]),(s[1]!==c[r+1]||r===o-2)&&(t[i].push(s[1]),i++))}},_simplifyPoints:function(){for(var e=this._parts,t=this.options.smoothFactor,n=0,r=e.length;n<r;n++)e[n]=wn(e[n],t)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(e,t){var n,r,i,a,o,s,c=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(n=0,a=this._parts.length;n<a;n++)for(s=this._parts[n],r=0,o=s.length,i=o-1;r<o;i=r++)if(!(!t&&r===0)&&Tn(e,s[i],s[r])<=c)return!0;return!1}});function cr(e,t){return new sr(e,t)}sr._flat=Ln;var lr=sr.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw Error(`Must add layer to map before using getCenter()`);return xn(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(e){var t=sr.prototype._convertLatLngs.call(this,e),n=t.length;return n>=2&&t[0]instanceof R&&t[0].equals(t[n-1])&&t.pop(),t},_setLatLngs:function(e){sr.prototype._setLatLngs.call(this,e),In(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return In(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var e=this._renderer._bounds,t=this.options.weight,n=new j(t,t);if(e=new N(e.min.subtract(n),e.max.add(n)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(e))){if(this.options.noClip){this._parts=this._rings;return}for(var r=0,i=this._rings.length,a;r<i;r++)a=bn(this._rings[r],e,!0),a.length&&this._parts.push(a)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(e){var t=!1,n,r,i,a,o,s,c,l;if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(a=0,c=this._parts.length;a<c;a++)for(n=this._parts[a],o=0,l=n.length,s=l-1;o<l;s=o++)r=n[o],i=n[s],r.y>e.y!=i.y>e.y&&e.x<(i.x-r.x)*(e.y-r.y)/(i.y-r.y)+r.x&&(t=!t);return t||sr.prototype._containsPoint.call(this,e,!0)}});function ur(e,t){return new lr(e,t)}var dr=Jn.extend({initialize:function(e,t){p(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t=_(e)?e:e.features,n,r,i;if(t){for(n=0,r=t.length;n<r;n++)i=t[n],(i.geometries||i.geometry||i.features||i.coordinates)&&this.addData(i);return this}var a=this.options;if(a.filter&&!a.filter(e))return this;var o=fr(e,a);return o?(o.feature=yr(e),o.defaultOptions=o.options,this.resetStyle(o),a.onEachFeature&&a.onEachFeature(e,o),this.addLayer(o)):this},resetStyle:function(e){return e===void 0?this.eachLayer(this.resetStyle,this):(e.options=n({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){e.setStyle&&(typeof t==`function`&&(t=t(e.feature)),e.setStyle(t))}});function fr(e,t){var n=e.type===`Feature`?e.geometry:e,r=n?n.coordinates:null,i=[],a=t&&t.pointToLayer,o=t&&t.coordsToLatLng||mr,s,c,l,u;if(!r&&!n)return null;switch(n.type){case`Point`:return s=o(r),pr(a,e,s,t);case`MultiPoint`:for(l=0,u=r.length;l<u;l++)s=o(r[l]),i.push(pr(a,e,s,t));return new Jn(i);case`LineString`:case`MultiLineString`:return c=hr(r,n.type===`LineString`?0:1,o),new sr(c,t);case`Polygon`:case`MultiPolygon`:return c=hr(r,n.type===`Polygon`?1:2,o),new lr(c,t);case`GeometryCollection`:for(l=0,u=n.geometries.length;l<u;l++){var d=fr({geometry:n.geometries[l],type:`Feature`,properties:e.properties},t);d&&i.push(d)}return new Jn(i);case`FeatureCollection`:for(l=0,u=n.features.length;l<u;l++){var f=fr(n.features[l],t);f&&i.push(f)}return new Jn(i);default:throw Error(`Invalid GeoJSON object.`)}}function pr(e,t,n,r){return e?e(t,n):new er(n,r&&r.markersInheritOptions&&r)}function mr(e){return new R(e[1],e[0],e[2])}function hr(e,t,n){for(var r=[],i=0,a=e.length,o;i<a;i++)o=t?hr(e[i],t-1,n):(n||mr)(e[i]),r.push(o);return r}function gr(e,t){return e=z(e),e.alt===void 0?[u(e.lng,t),u(e.lat,t)]:[u(e.lng,t),u(e.lat,t),u(e.alt,t)]}function _r(e,t,n,r){for(var i=[],a=0,o=e.length;a<o;a++)i.push(t?_r(e[a],In(e[a])?0:t-1,n,r):gr(e[a],r));return!t&&n&&i.length>0&&i.push(i[0].slice()),i}function vr(e,t){return e.feature?n({},e.feature,{geometry:t}):yr(t)}function yr(e){return e.type===`Feature`||e.type===`FeatureCollection`?e:{type:`Feature`,properties:{},geometry:e}}var br={toGeoJSON:function(e){return vr(this,{type:`Point`,coordinates:gr(this.getLatLng(),e)})}};er.include(br),ar.include(br),rr.include(br),sr.include({toGeoJSON:function(e){var t=!In(this._latlngs),n=_r(this._latlngs,+!!t,!1,e);return vr(this,{type:(t?`Multi`:``)+`LineString`,coordinates:n})}}),lr.include({toGeoJSON:function(e){var t=!In(this._latlngs),n=t&&!In(this._latlngs[0]),r=_r(this._latlngs,n?2:+!!t,!0,e);return t||(r=[r]),vr(this,{type:(n?`Multi`:``)+`Polygon`,coordinates:r})}}),Kn.include({toMultiPoint:function(e){var t=[];return this.eachLayer(function(n){t.push(n.toGeoJSON(e).geometry.coordinates)}),vr(this,{type:`MultiPoint`,coordinates:t})},toGeoJSON:function(e){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(t===`MultiPoint`)return this.toMultiPoint(e);var n=t===`GeometryCollection`,r=[];return this.eachLayer(function(t){if(t.toGeoJSON){var i=t.toGeoJSON(e);if(n)r.push(i.geometry);else{var a=yr(i);a.type===`FeatureCollection`?r.push.apply(r,a.features):r.push(a)}}}),n?vr(this,{geometries:r,type:`GeometryCollection`}):{type:`FeatureCollection`,features:r}}});function xr(e,t){return new dr(e,t)}var Sr=xr,Cr=Q.extend({options:{opacity:1,alt:``,interactive:!1,crossOrigin:!1,errorOverlayUrl:``,zIndex:1,className:``},initialize:function(e,t,n){this._url=e,this._bounds=I(t),p(this,n)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(G(this._image,`leaflet-interactive`),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){W(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(e){return this.options.opacity=e,this._image&&this._updateOpacity(),this},setStyle:function(e){return e.opacity&&this.setOpacity(e.opacity),this},bringToFront:function(){return this._map&&bt(this._image),this},bringToBack:function(){return this._map&&xt(this._image),this},setUrl:function(e){return this._url=e,this._image&&(this._image.src=e),this},setBounds:function(e){return this._bounds=I(e),this._map&&this._reset(),this},getEvents:function(){var e={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var e=this._url.tagName===`IMG`,t=this._image=e?this._url:U(`img`);if(G(t,`leaflet-image-layer`),this._zoomAnimated&&G(t,`leaflet-zoom-animated`),this.options.className&&G(t,this.options.className),t.onselectstart=l,t.onmousemove=l,t.onload=i(this.fire,this,`load`),t.onerror=i(this._overlayOnError,this,`error`),(this.options.crossOrigin||this.options.crossOrigin===``)&&(t.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),e){this._url=t.src;return}t.src=this._url,t.alt=this.options.alt},_animateZoom:function(e){var t=this._map.getZoomScale(e.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;kt(this._image,n,t)},_reset:function(){var e=this._image,t=new N(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),n=t.getSize();K(e,t.min),e.style.width=n.x+`px`,e.style.height=n.y+`px`},_updateOpacity:function(){Et(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire(`error`);var e=this.options.errorOverlayUrl;e&&this._url!==e&&(this._url=e,this._image.src=e)},getCenter:function(){return this._bounds.getCenter()}}),wr=function(e,t,n){return new Cr(e,t,n)},Tr=Cr.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var e=this._url.tagName===`VIDEO`,t=this._image=e?this._url:U(`video`);if(G(t,`leaflet-image-layer`),this._zoomAnimated&&G(t,`leaflet-zoom-animated`),this.options.className&&G(t,this.options.className),t.onselectstart=l,t.onmousemove=l,t.onloadeddata=i(this.fire,this,`load`),e){for(var n=t.getElementsByTagName(`source`),r=[],a=0;a<n.length;a++)r.push(n[a].src);this._url=n.length>0?r:[t.src];return}_(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(t.style,`objectFit`)&&(t.style.objectFit=`fill`),t.autoplay=!!this.options.autoplay,t.loop=!!this.options.loop,t.muted=!!this.options.muted,t.playsInline=!!this.options.playsInline;for(var o=0;o<this._url.length;o++){var s=U(`source`);s.src=this._url[o],t.appendChild(s)}}});function Er(e,t,n){return new Tr(e,t,n)}var Dr=Cr.extend({_initImage:function(){var e=this._image=this._url;G(e,`leaflet-image-layer`),this._zoomAnimated&&G(e,`leaflet-zoom-animated`),this.options.className&&G(e,this.options.className),e.onselectstart=l,e.onmousemove=l}});function Or(e,t,n){return new Dr(e,t,n)}var kr=Q.extend({options:{interactive:!1,offset:[0,0],className:``,pane:void 0,content:``},initialize:function(e,t){e&&(e instanceof R||_(e))?(this._latlng=z(e),p(this,t)):(p(this,e),this._source=t),this.options.content&&(this._content=this.options.content)},openOn:function(e){return e=arguments.length?e:this._source._map,e.hasLayer(this)||e.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(e){return this._map?this.close():(arguments.length?this._source=e:e=this._source,this._prepareOpen(),this.openOn(e._map)),this},onAdd:function(e){this._zoomAnimated=e._zoomAnimated,this._container||this._initLayout(),e._fadeAnimated&&Et(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),e._fadeAnimated&&Et(this._container,1),this.bringToFront(),this.options.interactive&&(G(this._container,`leaflet-interactive`),this.addInteractiveTarget(this._container))},onRemove:function(e){e._fadeAnimated?(Et(this._container,0),this._removeTimeout=setTimeout(i(W,void 0,this._container),200)):W(this._container),this.options.interactive&&(Ct(this._container,`leaflet-interactive`),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(e){return this._latlng=z(e),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(e){return this._content=e,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility=`hidden`,this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility=``,this._adjustPan())},getEvents:function(){var e={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&bt(this._container),this},bringToBack:function(){return this._map&&xt(this._container),this},_prepareOpen:function(e){var t=this._source;if(!t._map)return!1;if(t instanceof Jn){t=null;var n=this._source._layers;for(var r in n)if(n[r]._map){t=n[r];break}if(!t)return!1;this._source=t}if(!e){if(t.getCenter)e=t.getCenter();else if(t.getLatLng)e=t.getLatLng();else if(t.getBounds)e=t.getBounds().getCenter();else throw Error(`Unable to get source layer LatLng.`)}return this.setLatLng(e),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var e=this._contentNode,t=typeof this._content==`function`?this._content(this._source||this):this._content;if(typeof t==`string`)e.innerHTML=t;else{for(;e.hasChildNodes();)e.removeChild(e.firstChild);e.appendChild(t)}this.fire(`contentupdate`)}},_updatePosition:function(){if(this._map){var e=this._map.latLngToLayerPoint(this._latlng),t=M(this.options.offset),n=this._getAnchor();this._zoomAnimated?K(this._container,e.add(n)):t=t.add(e).add(n);var r=this._containerBottom=-t.y,i=this._containerLeft=-Math.round(this._containerWidth/2)+t.x;this._container.style.bottom=r+`px`,this._container.style.left=i+`px`}},_getAnchor:function(){return[0,0]}});Z.include({_initOverlay:function(e,t,n,r){var i=t;return i instanceof e||(i=new e(r).setContent(t)),n&&i.setLatLng(n),i}}),Q.include({_initOverlay:function(e,t,n,r){var i=n;return i instanceof e?(p(i,r),i._source=this):(i=t&&!r?t:new e(r,this),i.setContent(n)),i}});var Ar=kr.extend({options:{pane:`popupPane`,offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:``},openOn:function(e){return e=arguments.length?e:this._source._map,!e.hasLayer(this)&&e._popup&&e._popup.options.autoClose&&e.removeLayer(e._popup),e._popup=this,kr.prototype.openOn.call(this,e)},onAdd:function(e){kr.prototype.onAdd.call(this,e),e.fire(`popupopen`,{popup:this}),this._source&&(this._source.fire(`popupopen`,{popup:this},!0),this._source instanceof nr||this._source.on(`preclick`,qt))},onRemove:function(e){kr.prototype.onRemove.call(this,e),e.fire(`popupclose`,{popup:this}),this._source&&(this._source.fire(`popupclose`,{popup:this},!0),this._source instanceof nr||this._source.off(`preclick`,qt))},getEvents:function(){var e=kr.prototype.getEvents.call(this);return(this.options.closeOnClick===void 0?this._map.options.closePopupOnClick:this.options.closeOnClick)&&(e.preclick=this.close),this.options.keepInView&&(e.moveend=this._adjustPan),e},_initLayout:function(){var e=`leaflet-popup`,t=this._container=U(`div`,e+` `+(this.options.className||``)+` leaflet-zoom-animated`),n=this._wrapper=U(`div`,e+`-content-wrapper`,t);if(this._contentNode=U(`div`,e+`-content`,n),Yt(t),Jt(this._contentNode),J(t,`contextmenu`,qt),this._tipContainer=U(`div`,e+`-tip-container`,t),this._tip=U(`div`,e+`-tip`,this._tipContainer),this.options.closeButton){var r=this._closeButton=U(`a`,e+`-close-button`,t);r.setAttribute(`role`,`button`),r.setAttribute(`aria-label`,`Close popup`),r.href=`#close`,r.innerHTML=`<span aria-hidden="true">&#215;</span>`,J(r,`click`,function(e){Xt(e),this.close()},this)}},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width=``,t.whiteSpace=`nowrap`;var n=e.offsetWidth;n=Math.min(n,this.options.maxWidth),n=Math.max(n,this.options.minWidth),t.width=n+1+`px`,t.whiteSpace=``,t.height=``;var r=e.offsetHeight,i=this.options.maxHeight,a=`leaflet-popup-scrolled`;i&&r>i?(t.height=i+`px`,G(e,a)):Ct(e,a),this._containerWidth=this._container.offsetWidth},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),n=this._getAnchor();K(this._container,t.add(n))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var e=this._map,t=parseInt(vt(this._container,`marginBottom`),10)||0,n=this._container.offsetHeight+t,r=this._containerWidth,i=new j(this._containerLeft,-n-this._containerBottom);i._add(At(this._container));var a=e.layerPointToContainerPoint(i),o=M(this.options.autoPanPadding),s=M(this.options.autoPanPaddingTopLeft||o),c=M(this.options.autoPanPaddingBottomRight||o),l=e.getSize(),u=0,d=0;a.x+r+c.x>l.x&&(u=a.x+r-l.x+c.x),a.x-u-s.x<0&&(u=a.x-s.x),a.y+n+c.y>l.y&&(d=a.y+n-l.y+c.y),a.y-d-s.y<0&&(d=a.y-s.y),(u||d)&&(this.options.keepInView&&(this._autopanning=!0),e.fire(`autopanstart`).panBy([u,d]))}},_getAnchor:function(){return M(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),jr=function(e,t){return new Ar(e,t)};Z.mergeOptions({closePopupOnClick:!0}),Z.include({openPopup:function(e,t,n){return this._initOverlay(Ar,e,t,n).openOn(this),this},closePopup:function(e){return e=arguments.length?e:this._popup,e&&e.close(),this}}),Q.include({bindPopup:function(e,t){return this._popup=this._initOverlay(Ar,this._popup,e,t),this._popupHandlersAdded||=(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),!0),this},unbindPopup:function(){return this._popup&&=(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,null),this},openPopup:function(e){return this._popup&&(this instanceof Jn||(this._popup._source=this),this._popup._prepareOpen(e||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(e){return this._popup&&this._popup.setContent(e),this},getPopup:function(){return this._popup},_openPopup:function(e){if(!(!this._popup||!this._map)){Zt(e);var t=e.layer||e.target;if(this._popup._source===t&&!(t instanceof nr)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(e.latlng);return}this._popup._source=t,this.openPopup(e.latlng)}},_movePopup:function(e){this._popup.setLatLng(e.latlng)},_onKeyPress:function(e){e.originalEvent.keyCode===13&&this._openPopup(e)}});var Mr=kr.extend({options:{pane:`tooltipPane`,offset:[0,0],direction:`auto`,permanent:!1,sticky:!1,opacity:.9},onAdd:function(e){kr.prototype.onAdd.call(this,e),this.setOpacity(this.options.opacity),e.fire(`tooltipopen`,{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire(`tooltipopen`,{tooltip:this},!0))},onRemove:function(e){kr.prototype.onRemove.call(this,e),e.fire(`tooltipclose`,{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire(`tooltipclose`,{tooltip:this},!0))},getEvents:function(){var e=kr.prototype.getEvents.call(this);return this.options.permanent||(e.preclick=this.close),e},_initLayout:function(){var e=`leaflet-tooltip `+(this.options.className||``)+` leaflet-zoom-`+(this._zoomAnimated?`animated`:`hide`);this._contentNode=this._container=U(`div`,e),this._container.setAttribute(`role`,`tooltip`),this._container.setAttribute(`id`,`leaflet-tooltip-`+o(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(e){var t,n,r=this._map,i=this._container,a=r.latLngToContainerPoint(r.getCenter()),o=r.layerPointToContainerPoint(e),s=this.options.direction,c=i.offsetWidth,l=i.offsetHeight,u=M(this.options.offset),d=this._getAnchor();s===`top`?(t=c/2,n=l):s===`bottom`?(t=c/2,n=0):s===`center`?(t=c/2,n=l/2):s===`right`?(t=0,n=l/2):s===`left`?(t=c,n=l/2):o.x<a.x?(s=`right`,t=0,n=l/2):(s=`left`,t=c+(u.x+d.x)*2,n=l/2),e=e.subtract(M(t,n,!0)).add(u).add(d),Ct(i,`leaflet-tooltip-right`),Ct(i,`leaflet-tooltip-left`),Ct(i,`leaflet-tooltip-top`),Ct(i,`leaflet-tooltip-bottom`),G(i,`leaflet-tooltip-`+s),K(i,e)},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng);this._setPosition(e)},setOpacity:function(e){this.options.opacity=e,this._container&&Et(this._container,e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPosition(t)},_getAnchor:function(){return M(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Nr=function(e,t){return new Mr(e,t)};Z.include({openTooltip:function(e,t,n){return this._initOverlay(Mr,e,t,n).openOn(this),this},closeTooltip:function(e){return e.close(),this}}),Q.include({bindTooltip:function(e,t){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Mr,this._tooltip,e,t),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&=(this._initTooltipInteractions(!0),this.closeTooltip(),null),this},_initTooltipInteractions:function(e){if(!(!e&&this._tooltipHandlersAdded)){var t=e?`off`:`on`,n={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?n.add=this._openTooltip:(n.mouseover=this._openTooltip,n.mouseout=this.closeTooltip,n.click=this._openTooltip,this._map?this._addFocusListeners():n.add=this._addFocusListeners),this._tooltip.options.sticky&&(n.mousemove=this._moveTooltip),this[t](n),this._tooltipHandlersAdded=!e}},openTooltip:function(e){return this._tooltip&&(this instanceof Jn||(this._tooltip._source=this),this._tooltip._prepareOpen(e)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(e){return this._tooltip&&this._tooltip.setContent(e),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(e){var t=typeof e.getElement==`function`&&e.getElement();t&&(J(t,`focus`,function(){this._tooltip._source=e,this.openTooltip()},this),J(t,`blur`,this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(e){var t=typeof e.getElement==`function`&&e.getElement();t&&t.setAttribute(`aria-describedby`,this._tooltip._container.id)},_openTooltip:function(e){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var t=this;this._map.once(`moveend`,function(){t._openOnceFlag=!1,t._openTooltip(e)});return}this._tooltip._source=e.layer||e.target,this.openTooltip(this._tooltip.options.sticky?e.latlng:void 0)}},_moveTooltip:function(e){var t=e.latlng,n,r;this._tooltip.options.sticky&&e.originalEvent&&(n=this._map.mouseEventToContainerPoint(e.originalEvent),r=this._map.containerPointToLayerPoint(n),t=this._map.layerPointToLatLng(r)),this._tooltip.setLatLng(t)}});var Pr=Xn.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:`leaflet-div-icon`},createIcon:function(e){var t=e&&e.tagName===`DIV`?e:document.createElement(`div`),n=this.options;if(n.html instanceof Element?(yt(t),t.appendChild(n.html)):t.innerHTML=n.html===!1?``:n.html,n.bgPos){var r=M(n.bgPos);t.style.backgroundPosition=-r.x+`px `+-r.y+`px`}return this._setIconStyles(t,`icon`),t},createShadow:function(){return null}});function Fr(e){return new Pr(e)}Xn.Default=Qn;var Ir=Q.extend({options:{tileSize:256,opacity:1,updateWhenIdle:H.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:`tilePane`,className:``,keepBuffer:2},initialize:function(e){p(this,e)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(e){e._addZoomLimit(this)},onRemove:function(e){this._removeAllTiles(),W(this._container),e._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(bt(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(xt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var e=this._clampZoom(this._map.getZoom());e!==this._tileZoom&&(this._tileZoom=e,this._updateLevels()),this._update()}return this},getEvents:function(){var e={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||=s(this._onMoveEnd,this.options.updateInterval,this),e.move=this._onMove),this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},createTile:function(){return document.createElement(`div`)},getTileSize:function(){var e=this.options.tileSize;return e instanceof j?e:new j(e,e)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e){for(var t=this.getPane().children,n=-e(-1/0,1/0),r=0,i=t.length,a;r<i;r++)a=t[r].style.zIndex,t[r]!==this._container&&a&&(n=e(n,+a));isFinite(n)&&(this.options.zIndex=n+e(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!H.ielt9){Et(this._container,this.options.opacity);var e=+new Date,t=!1,n=!1;for(var r in this._tiles){var i=this._tiles[r];if(!(!i.current||!i.loaded)){var a=Math.min(1,(e-i.loaded)/200);Et(i.el,a),a<1?t=!0:(i.active?n=!0:this._onOpaqueTile(i),i.active=!0)}}n&&!this._noPrune&&this._pruneTiles(),t&&(E(this._fadeFrame),this._fadeFrame=T(this._updateOpacity,this))}},_onOpaqueTile:l,_initContainer:function(){this._container||(this._container=U(`div`,`leaflet-layer `+(this.options.className||``)),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var e=this._tileZoom,t=this.options.maxZoom;if(e!==void 0){for(var n in this._levels)n=Number(n),this._levels[n].el.children.length||n===e?(this._levels[n].el.style.zIndex=t-Math.abs(e-n),this._onUpdateLevel(n)):(W(this._levels[n].el),this._removeTilesAtZoom(n),this._onRemoveLevel(n),delete this._levels[n]);var r=this._levels[e],i=this._map;return r||(r=this._levels[e]={},r.el=U(`div`,`leaflet-tile-container leaflet-zoom-animated`,this._container),r.el.style.zIndex=t,r.origin=i.project(i.unproject(i.getPixelOrigin()),e).round(),r.zoom=e,this._setZoomTransform(r,i.getCenter(),i.getZoom()),r.el.offsetWidth,this._onCreateLevel(r)),this._level=r,r}},_onUpdateLevel:l,_onRemoveLevel:l,_onCreateLevel:l,_pruneTiles:function(){if(this._map){var e,t,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom){this._removeAllTiles();return}for(e in this._tiles)t=this._tiles[e],t.retain=t.current;for(e in this._tiles)if(t=this._tiles[e],t.current&&!t.active){var r=t.coords;this._retainParent(r.x,r.y,r.z,r.z-5)||this._retainChildren(r.x,r.y,r.z,r.z+2)}for(e in this._tiles)this._tiles[e].retain||this._removeTile(e)}},_removeTilesAtZoom:function(e){for(var t in this._tiles)this._tiles[t].coords.z===e&&this._removeTile(t)},_removeAllTiles:function(){for(var e in this._tiles)this._removeTile(e)},_invalidateAll:function(){for(var e in this._levels)W(this._levels[e].el),this._onRemoveLevel(Number(e)),delete this._levels[e];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(e,t,n,r){var i=Math.floor(e/2),a=Math.floor(t/2),o=n-1,s=new j(+i,+a);s.z=+o;var c=this._tileCoordsToKey(s),l=this._tiles[c];return l&&l.active?(l.retain=!0,!0):(l&&l.loaded&&(l.retain=!0),o>r&&this._retainParent(i,a,o,r))},_retainChildren:function(e,t,n,r){for(var i=2*e;i<2*e+2;i++)for(var a=2*t;a<2*t+2;a++){var o=new j(i,a);o.z=n+1;var s=this._tileCoordsToKey(o),c=this._tiles[s];if(c&&c.active){c.retain=!0;continue}c&&c.loaded&&(c.retain=!0),n+1<r&&this._retainChildren(i,a,n+1,r)}},_resetView:function(e){var t=e&&(e.pinch||e.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(e){this._setView(e.center,e.zoom,!0,e.noUpdate)},_clampZoom:function(e){var t=this.options;return t.minNativeZoom!==void 0&&e<t.minNativeZoom?t.minNativeZoom:t.maxNativeZoom!==void 0&&t.maxNativeZoom<e?t.maxNativeZoom:e},_setView:function(e,t,n,r){var i=Math.round(t);i=this.options.maxZoom!==void 0&&i>this.options.maxZoom||this.options.minZoom!==void 0&&i<this.options.minZoom?void 0:this._clampZoom(i);var a=this.options.updateWhenZooming&&i!==this._tileZoom;(!r||a)&&(this._tileZoom=i,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),i!==void 0&&this._update(e),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(e,t)},_setZoomTransforms:function(e,t){for(var n in this._levels)this._setZoomTransform(this._levels[n],e,t)},_setZoomTransform:function(e,t,n){var r=this._map.getZoomScale(n,e.zoom),i=e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t,n)).round();H.any3d?kt(e.el,i,r):K(e.el,i)},_resetGrid:function(){var e=this._map,t=e.options.crs,n=this._tileSize=this.getTileSize(),r=this._tileZoom,i=this._map.getPixelWorldBounds(this._tileZoom);i&&(this._globalTileRange=this._pxBoundsToTileRange(i)),this._wrapX=t.wrapLng&&!this.options.noWrap&&[Math.floor(e.project([0,t.wrapLng[0]],r).x/n.x),Math.ceil(e.project([0,t.wrapLng[1]],r).x/n.y)],this._wrapY=t.wrapLat&&!this.options.noWrap&&[Math.floor(e.project([t.wrapLat[0],0],r).y/n.x),Math.ceil(e.project([t.wrapLat[1],0],r).y/n.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(e){var t=this._map,n=t._animatingZoom?Math.max(t._animateToZoom,t.getZoom()):t.getZoom(),r=t.getZoomScale(n,this._tileZoom),i=t.project(e,this._tileZoom).floor(),a=t.getSize().divideBy(r*2);return new N(i.subtract(a),i.add(a))},_update:function(e){var t=this._map;if(t){var n=this._clampZoom(t.getZoom());if(e===void 0&&(e=t.getCenter()),this._tileZoom!==void 0){var r=this._getTiledPixelBounds(e),i=this._pxBoundsToTileRange(r),a=i.getCenter(),o=[],s=this.options.keepBuffer,c=new N(i.getBottomLeft().subtract([s,-s]),i.getTopRight().add([s,-s]));if(!(isFinite(i.min.x)&&isFinite(i.min.y)&&isFinite(i.max.x)&&isFinite(i.max.y)))throw Error(`Attempted to load an infinite number of tiles`);for(var l in this._tiles){var u=this._tiles[l].coords;(u.z!==this._tileZoom||!c.contains(new j(u.x,u.y)))&&(this._tiles[l].current=!1)}if(Math.abs(n-this._tileZoom)>1){this._setView(e,n);return}for(var d=i.min.y;d<=i.max.y;d++)for(var f=i.min.x;f<=i.max.x;f++){var p=new j(f,d);if(p.z=this._tileZoom,this._isValidTile(p)){var m=this._tiles[this._tileCoordsToKey(p)];m?m.current=!0:o.push(p)}}if(o.sort(function(e,t){return e.distanceTo(a)-t.distanceTo(a)}),o.length!==0){this._loading||(this._loading=!0,this.fire(`loading`));var h=document.createDocumentFragment();for(f=0;f<o.length;f++)this._addTile(o[f],h);this._level.el.appendChild(h)}}}},_isValidTile:function(e){var t=this._map.options.crs;if(!t.infinite){var n=this._globalTileRange;if(!t.wrapLng&&(e.x<n.min.x||e.x>n.max.x)||!t.wrapLat&&(e.y<n.min.y||e.y>n.max.y))return!1}if(!this.options.bounds)return!0;var r=this._tileCoordsToBounds(e);return I(this.options.bounds).overlaps(r)},_keyToBounds:function(e){return this._tileCoordsToBounds(this._keyToTileCoords(e))},_tileCoordsToNwSe:function(e){var t=this._map,n=this.getTileSize(),r=e.scaleBy(n),i=r.add(n);return[t.unproject(r,e.z),t.unproject(i,e.z)]},_tileCoordsToBounds:function(e){var t=this._tileCoordsToNwSe(e),n=new F(t[0],t[1]);return this.options.noWrap||(n=this._map.wrapLatLngBounds(n)),n},_tileCoordsToKey:function(e){return e.x+`:`+e.y+`:`+e.z},_keyToTileCoords:function(e){var t=e.split(`:`),n=new j(+t[0],+t[1]);return n.z=+t[2],n},_removeTile:function(e){var t=this._tiles[e];t&&(W(t.el),delete this._tiles[e],this.fire(`tileunload`,{tile:t.el,coords:this._keyToTileCoords(e)}))},_initTile:function(e){G(e,`leaflet-tile`);var t=this.getTileSize();e.style.width=t.x+`px`,e.style.height=t.y+`px`,e.onselectstart=l,e.onmousemove=l,H.ielt9&&this.options.opacity<1&&Et(e,this.options.opacity)},_addTile:function(e,t){var n=this._getTilePos(e),r=this._tileCoordsToKey(e),a=this.createTile(this._wrapCoords(e),i(this._tileReady,this,e));this._initTile(a),this.createTile.length<2&&T(i(this._tileReady,this,e,null,a)),K(a,n),this._tiles[r]={el:a,coords:e,current:!0},t.appendChild(a),this.fire(`tileloadstart`,{tile:a,coords:e})},_tileReady:function(e,t,n){t&&this.fire(`tileerror`,{error:t,tile:n,coords:e});var r=this._tileCoordsToKey(e);n=this._tiles[r],n&&(n.loaded=+new Date,this._map._fadeAnimated?(Et(n.el,0),E(this._fadeFrame),this._fadeFrame=T(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),t||(G(n.el,`leaflet-tile-loaded`),this.fire(`tileload`,{tile:n.el,coords:e})),this._noTilesToLoad()&&(this._loading=!1,this.fire(`load`),H.ielt9||!this._map._fadeAnimated?T(this._pruneTiles,this):setTimeout(i(this._pruneTiles,this),250)))},_getTilePos:function(e){return e.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(e){var t=new j(this._wrapX?c(e.x,this._wrapX):e.x,this._wrapY?c(e.y,this._wrapY):e.y);return t.z=e.z,t},_pxBoundsToTileRange:function(e){var t=this.getTileSize();return new N(e.min.unscaleBy(t).floor(),e.max.unscaleBy(t).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var e in this._tiles)if(!this._tiles[e].loaded)return!1;return!0}});function Lr(e){return new Ir(e)}var Rr=Ir.extend({options:{minZoom:0,maxZoom:18,subdomains:`abc`,errorTileUrl:``,zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(e,t){this._url=e,t=p(this,t),t.detectRetina&&H.retina&&t.maxZoom>0?(t.tileSize=Math.floor(t.tileSize/2),t.zoomReverse?(t.zoomOffset--,t.minZoom=Math.min(t.maxZoom,t.minZoom+1)):(t.zoomOffset++,t.maxZoom=Math.max(t.minZoom,t.maxZoom-1)),t.minZoom=Math.max(0,t.minZoom)):t.zoomReverse?t.minZoom=Math.min(t.maxZoom,t.minZoom):t.maxZoom=Math.max(t.minZoom,t.maxZoom),typeof t.subdomains==`string`&&(t.subdomains=t.subdomains.split(``)),this.on(`tileunload`,this._onTileRemove)},setUrl:function(e,t){return this._url===e&&t===void 0&&(t=!0),this._url=e,t||this.redraw(),this},createTile:function(e,t){var n=document.createElement(`img`);return J(n,`load`,i(this._tileOnLoad,this,t,n)),J(n,`error`,i(this._tileOnError,this,t,n)),(this.options.crossOrigin||this.options.crossOrigin===``)&&(n.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),typeof this.options.referrerPolicy==`string`&&(n.referrerPolicy=this.options.referrerPolicy),n.alt=``,n.src=this.getTileUrl(e),n},getTileUrl:function(e){var t={r:H.retina?`@2x`:``,s:this._getSubdomain(e),x:e.x,y:e.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var r=this._globalTileRange.max.y-e.y;this.options.tms&&(t.y=r),t[`-y`]=r}return g(this._url,n(t,this.options))},_tileOnLoad:function(e,t){H.ielt9?setTimeout(i(e,this,null,t),0):e(null,t)},_tileOnError:function(e,t,n){var r=this.options.errorTileUrl;r&&t.getAttribute(`src`)!==r&&(t.src=r),e(n,t)},_onTileRemove:function(e){e.tile.onload=null},_getZoomForUrl:function(){var e=this._tileZoom,t=this.options.maxZoom,n=this.options.zoomReverse,r=this.options.zoomOffset;return n&&(e=t-e),e+r},_getSubdomain:function(e){var t=Math.abs(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var e,t;for(e in this._tiles)if(this._tiles[e].coords.z!==this._tileZoom&&(t=this._tiles[e].el,t.onload=l,t.onerror=l,!t.complete)){t.src=y;var n=this._tiles[e].coords;W(t),delete this._tiles[e],this.fire(`tileabort`,{tile:t,coords:n})}},_removeTile:function(e){var t=this._tiles[e];if(t)return t.el.setAttribute(`src`,y),Ir.prototype._removeTile.call(this,e)},_tileReady:function(e,t,n){if(!(!this._map||n&&n.getAttribute(`src`)===y))return Ir.prototype._tileReady.call(this,e,t,n)}});function zr(e,t){return new Rr(e,t)}var Br=Rr.extend({defaultWmsParams:{service:`WMS`,request:`GetMap`,layers:``,styles:``,format:`image/jpeg`,transparent:!1,version:`1.1.1`},options:{crs:null,uppercase:!1},initialize:function(e,t){this._url=e;var r=n({},this.defaultWmsParams);for(var i in t)i in this.options||(r[i]=t[i]);t=p(this,t);var a=t.detectRetina&&H.retina?2:1,o=this.getTileSize();r.width=o.x*a,r.height=o.y*a,this.wmsParams=r},onAdd:function(e){this._crs=this.options.crs||e.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var t=this._wmsVersion>=1.3?`crs`:`srs`;this.wmsParams[t]=this._crs.code,Rr.prototype.onAdd.call(this,e)},getTileUrl:function(e){var t=this._tileCoordsToNwSe(e),n=this._crs,r=P(n.project(t[0]),n.project(t[1])),i=r.min,a=r.max,o=(this._wmsVersion>=1.3&&this._crs===Wn?[i.y,i.x,a.y,a.x]:[i.x,i.y,a.x,a.y]).join(`,`),s=Rr.prototype.getTileUrl.call(this,e);return s+m(this.wmsParams,s,this.options.uppercase)+(this.options.uppercase?`&BBOX=`:`&bbox=`)+o},setParams:function(e,t){return n(this.wmsParams,e),t||this.redraw(),this}});function Vr(e,t){return new Br(e,t)}Rr.WMS=Br,zr.wms=Vr;var Hr=Q.extend({options:{padding:.1},initialize:function(e){p(this,e),o(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),G(this._container,`leaflet-zoom-animated`)),this.getPane().appendChild(this._container),this._update(),this.on(`update`,this._updatePaths,this)},onRemove:function(){this.off(`update`,this._updatePaths,this),this._destroyContainer()},getEvents:function(){var e={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_onAnimZoom:function(e){this._updateTransform(e.center,e.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(e,t){var n=this._map.getZoomScale(t,this._zoom),r=this._map.getSize().multiplyBy(.5+this.options.padding),i=this._map.project(this._center,t),a=r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e,t));H.any3d?kt(this._container,a,n):K(this._container,a)},_reset:function(){for(var e in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[e]._reset()},_onZoomEnd:function(){for(var e in this._layers)this._layers[e]._project()},_updatePaths:function(){for(var e in this._layers)this._layers[e]._update()},_update:function(){var e=this.options.padding,t=this._map.getSize(),n=this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();this._bounds=new N(n,n.add(t.multiplyBy(1+e*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Ur=Hr.extend({options:{tolerance:0},getEvents:function(){var e=Hr.prototype.getEvents.call(this);return e.viewprereset=this._onViewPreReset,e},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Hr.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var e=this._container=document.createElement(`canvas`);J(e,`mousemove`,this._onMouseMove,this),J(e,`click dblclick mousedown mouseup contextmenu`,this._onClick,this),J(e,`mouseout`,this._handleMouseOut,this),e._leaflet_disable_events=!0,this._ctx=e.getContext(`2d`)},_destroyContainer:function(){E(this._redrawRequest),delete this._ctx,W(this._container),X(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var e;for(var t in this._redrawBounds=null,this._layers)e=this._layers[t],e._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Hr.prototype._update.call(this);var e=this._bounds,t=this._container,n=e.getSize(),r=H.retina?2:1;K(t,e.min),t.width=r*n.x,t.height=r*n.y,t.style.width=n.x+`px`,t.style.height=n.y+`px`,H.retina&&this._ctx.scale(2,2),this._ctx.translate(-e.min.x,-e.min.y),this.fire(`update`)}},_reset:function(){Hr.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(e){this._updateDashArray(e),this._layers[o(e)]=e;var t=e._order={layer:e,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(e){this._requestRedraw(e)},_removePath:function(e){var t=e._order,n=t.next,r=t.prev;n?n.prev=r:this._drawLast=r,r?r.next=n:this._drawFirst=n,delete e._order,delete this._layers[o(e)],this._requestRedraw(e)},_updatePath:function(e){this._extendRedrawBounds(e),e._project(),e._update(),this._requestRedraw(e)},_updateStyle:function(e){this._updateDashArray(e),this._requestRedraw(e)},_updateDashArray:function(e){if(typeof e.options.dashArray==`string`){var t=e.options.dashArray.split(/[, ]+/),n=[],r,i;for(i=0;i<t.length;i++){if(r=Number(t[i]),isNaN(r))return;n.push(r)}e.options._dashArray=n}else e.options._dashArray=e.options.dashArray},_requestRedraw:function(e){this._map&&(this._extendRedrawBounds(e),this._redrawRequest=this._redrawRequest||T(this._redraw,this))},_extendRedrawBounds:function(e){if(e._pxBounds){var t=(e.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new N,this._redrawBounds.extend(e._pxBounds.min.subtract([t,t])),this._redrawBounds.extend(e._pxBounds.max.add([t,t]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var e=this._redrawBounds;if(e){var t=e.getSize();this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var e,t=this._redrawBounds;if(this._ctx.save(),t){var n=t.getSize();this._ctx.beginPath(),this._ctx.rect(t.min.x,t.min.y,n.x,n.y),this._ctx.clip()}this._drawing=!0;for(var r=this._drawFirst;r;r=r.next)e=r.layer,(!t||e._pxBounds&&e._pxBounds.intersects(t))&&e._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(e,t){if(this._drawing){var n,r,i,a,o=e._parts,s=o.length,c=this._ctx;if(s){for(c.beginPath(),n=0;n<s;n++){for(r=0,i=o[n].length;r<i;r++)a=o[n][r],c[r?`lineTo`:`moveTo`](a.x,a.y);t&&c.closePath()}this._fillStroke(c,e)}}},_updateCircle:function(e){if(!(!this._drawing||e._empty())){var t=e._point,n=this._ctx,r=Math.max(Math.round(e._radius),1),i=(Math.max(Math.round(e._radiusY),1)||r)/r;i!==1&&(n.save(),n.scale(1,i)),n.beginPath(),n.arc(t.x,t.y/i,r,0,Math.PI*2,!1),i!==1&&n.restore(),this._fillStroke(n,e)}},_fillStroke:function(e,t){var n=t.options;n.fill&&(e.globalAlpha=n.fillOpacity,e.fillStyle=n.fillColor||n.color,e.fill(n.fillRule||`evenodd`)),n.stroke&&n.weight!==0&&(e.setLineDash&&e.setLineDash(t.options&&t.options._dashArray||[]),e.globalAlpha=n.opacity,e.lineWidth=n.weight,e.strokeStyle=n.color,e.lineCap=n.lineCap,e.lineJoin=n.lineJoin,e.stroke())},_onClick:function(e){for(var t=this._map.mouseEventToLayerPoint(e),n,r,i=this._drawFirst;i;i=i.next)n=i.layer,n.options.interactive&&n._containsPoint(t)&&(e.type!==`click`&&e.type!==`preclick`||!this._map._draggableMoved(n))&&(r=n);this._fireEvent(r?[r]:!1,e)},_onMouseMove:function(e){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var t=this._map.mouseEventToLayerPoint(e);this._handleMouseHover(e,t)}},_handleMouseOut:function(e){var t=this._hoveredLayer;t&&(Ct(this._container,`leaflet-interactive`),this._fireEvent([t],e,`mouseout`),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(e,t){if(!this._mouseHoverThrottled){for(var n,r,a=this._drawFirst;a;a=a.next)n=a.layer,n.options.interactive&&n._containsPoint(t)&&(r=n);r!==this._hoveredLayer&&(this._handleMouseOut(e),r&&(G(this._container,`leaflet-interactive`),this._fireEvent([r],e,`mouseover`),this._hoveredLayer=r)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,e),this._mouseHoverThrottled=!0,setTimeout(i(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(e,t,n){this._map._fireDOMEvent(t,n||t.type,e)},_bringToFront:function(e){var t=e._order;if(t){var n=t.next,r=t.prev;if(n)n.prev=r;else return;r?r.next=n:n&&(this._drawFirst=n),t.prev=this._drawLast,this._drawLast.next=t,t.next=null,this._drawLast=t,this._requestRedraw(e)}},_bringToBack:function(e){var t=e._order;if(t){var n=t.next,r=t.prev;if(r)r.next=n;else return;n?n.prev=r:r&&(this._drawLast=r),t.prev=null,t.next=this._drawFirst,this._drawFirst.prev=t,this._drawFirst=t,this._requestRedraw(e)}}});function Wr(e){return H.canvas?new Ur(e):null}var Gr=(function(){try{return document.namespaces.add(`lvml`,`urn:schemas-microsoft-com:vml`),function(e){return document.createElement(`<lvml:`+e+` class="lvml">`)}}catch{}return function(e){return document.createElement(`<`+e+` xmlns="urn:schemas-microsoft.com:vml" class="lvml">`)}})(),Kr={_initContainer:function(){this._container=U(`div`,`leaflet-vml-container`)},_update:function(){this._map._animatingZoom||(Hr.prototype._update.call(this),this.fire(`update`))},_initPath:function(e){var t=e._container=Gr(`shape`);G(t,`leaflet-vml-shape `+(this.options.className||``)),t.coordsize=`1 1`,e._path=Gr(`path`),t.appendChild(e._path),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){var t=e._container;this._container.appendChild(t),e.options.interactive&&e.addInteractiveTarget(t)},_removePath:function(e){var t=e._container;W(t),e.removeInteractiveTarget(t),delete this._layers[o(e)]},_updateStyle:function(e){var t=e._stroke,n=e._fill,r=e.options,i=e._container;i.stroked=!!r.stroke,i.filled=!!r.fill,r.stroke?(t||=e._stroke=Gr(`stroke`),i.appendChild(t),t.weight=r.weight+`px`,t.color=r.color,t.opacity=r.opacity,r.dashArray?t.dashStyle=_(r.dashArray)?r.dashArray.join(` `):r.dashArray.replace(/( *, *)/g,` `):t.dashStyle=``,t.endcap=r.lineCap.replace(`butt`,`flat`),t.joinstyle=r.lineJoin):t&&(i.removeChild(t),e._stroke=null),r.fill?(n||=e._fill=Gr(`fill`),i.appendChild(n),n.color=r.fillColor||r.color,n.opacity=r.fillOpacity):n&&(i.removeChild(n),e._fill=null)},_updateCircle:function(e){var t=e._point.round(),n=Math.round(e._radius),r=Math.round(e._radiusY||n);this._setPath(e,e._empty()?`M0 0`:`AL `+t.x+`,`+t.y+` `+n+`,`+r+` 0,23592600`)},_setPath:function(e,t){e._path.v=t},_bringToFront:function(e){bt(e._container)},_bringToBack:function(e){xt(e._container)}},qr=H.vml?Gr:le,Jr=Hr.extend({_initContainer:function(){this._container=qr(`svg`),this._container.setAttribute(`pointer-events`,`none`),this._rootGroup=qr(`g`),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){W(this._container),X(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Hr.prototype._update.call(this);var e=this._bounds,t=e.getSize(),n=this._container;(!this._svgSize||!this._svgSize.equals(t))&&(this._svgSize=t,n.setAttribute(`width`,t.x),n.setAttribute(`height`,t.y)),K(n,e.min),n.setAttribute(`viewBox`,[e.min.x,e.min.y,t.x,t.y].join(` `)),this.fire(`update`)}},_initPath:function(e){var t=e._path=qr(`path`);e.options.className&&G(t,e.options.className),e.options.interactive&&G(t,`leaflet-interactive`),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(e._path),e.addInteractiveTarget(e._path)},_removePath:function(e){W(e._path),e.removeInteractiveTarget(e._path),delete this._layers[o(e)]},_updatePath:function(e){e._project(),e._update()},_updateStyle:function(e){var t=e._path,n=e.options;t&&(n.stroke?(t.setAttribute(`stroke`,n.color),t.setAttribute(`stroke-opacity`,n.opacity),t.setAttribute(`stroke-width`,n.weight),t.setAttribute(`stroke-linecap`,n.lineCap),t.setAttribute(`stroke-linejoin`,n.lineJoin),n.dashArray?t.setAttribute(`stroke-dasharray`,n.dashArray):t.removeAttribute(`stroke-dasharray`),n.dashOffset?t.setAttribute(`stroke-dashoffset`,n.dashOffset):t.removeAttribute(`stroke-dashoffset`)):t.setAttribute(`stroke`,`none`),n.fill?(t.setAttribute(`fill`,n.fillColor||n.color),t.setAttribute(`fill-opacity`,n.fillOpacity),t.setAttribute(`fill-rule`,n.fillRule||`evenodd`)):t.setAttribute(`fill`,`none`))},_updatePoly:function(e,t){this._setPath(e,ue(e._parts,t))},_updateCircle:function(e){var t=e._point,n=Math.max(Math.round(e._radius),1),r=Math.max(Math.round(e._radiusY),1)||n,i=`a`+n+`,`+r+` 0 1,0 `,a=e._empty()?`M0 0`:`M`+(t.x-n)+`,`+t.y+i+n*2+`,0 `+i+-n*2+`,0 `;this._setPath(e,a)},_setPath:function(e,t){e._path.setAttribute(`d`,t)},_bringToFront:function(e){bt(e._path)},_bringToBack:function(e){xt(e._path)}});H.vml&&Jr.include(Kr);function Yr(e){return H.svg||H.vml?new Jr(e):null}Z.include({getRenderer:function(e){var t=e.options.renderer||this._getPaneRenderer(e.options.pane)||this.options.renderer||this._renderer;return t||=this._renderer=this._createRenderer(),this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(e){if(e===`overlayPane`||e===void 0)return!1;var t=this._paneRenderers[e];return t===void 0&&(t=this._createRenderer({pane:e}),this._paneRenderers[e]=t),t},_createRenderer:function(e){return this.options.preferCanvas&&Wr(e)||Yr(e)}});var Xr=lr.extend({initialize:function(e,t){lr.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){return this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return e=I(e),[e.getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast()]}});function Zr(e,t){return new Xr(e,t)}Jr.create=qr,Jr.pointsToPath=ue,dr.geometryToLayer=fr,dr.coordsToLatLng=mr,dr.coordsToLatLngs=hr,dr.latLngToCoords=gr,dr.latLngsToCoords=_r,dr.getFeature=vr,dr.asFeature=yr,Z.mergeOptions({boxZoom:!0});var Qr=gn.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane,this._resetStateTimeout=0,e.on(`unload`,this._destroy,this)},addHooks:function(){J(this._container,`mousedown`,this._onMouseDown,this)},removeHooks:function(){X(this._container,`mousedown`,this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){W(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(e){if(!e.shiftKey||e.which!==1&&e.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),jt(),Ft(),this._startPoint=this._map.mouseEventToContainerPoint(e),J(document,{contextmenu:Zt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(e){this._moved||(this._moved=!0,this._box=U(`div`,`leaflet-zoom-box`,this._container),G(this._container,`leaflet-crosshair`),this._map.fire(`boxzoomstart`)),this._point=this._map.mouseEventToContainerPoint(e);var t=new N(this._point,this._startPoint),n=t.getSize();K(this._box,t.min),this._box.style.width=n.x+`px`,this._box.style.height=n.y+`px`},_finish:function(){this._moved&&(W(this._box),Ct(this._container,`leaflet-crosshair`)),Mt(),It(),X(document,{contextmenu:Zt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(e){if((e.which===1||e.button===1)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(i(this._resetState,this),0);var t=new F(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(t).fire(`boxzoomend`,{boxZoomBounds:t})}},_onKeyDown:function(e){e.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});Z.addInitHook(`addHandler`,`boxZoom`,Qr),Z.mergeOptions({doubleClickZoom:!0});var $r=gn.extend({addHooks:function(){this._map.on(`dblclick`,this._onDoubleClick,this)},removeHooks:function(){this._map.off(`dblclick`,this._onDoubleClick,this)},_onDoubleClick:function(e){var t=this._map,n=t.getZoom(),r=t.options.zoomDelta,i=e.originalEvent.shiftKey?n-r:n+r;t.options.doubleClickZoom===`center`?t.setZoom(i):t.setZoomAround(e.containerPoint,i)}});Z.addInitHook(`addHandler`,`doubleClickZoom`,$r),Z.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ei=gn.extend({addHooks:function(){if(!this._draggable){var e=this._map;this._draggable=new yn(e._mapPane,e._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on(`predrag`,this._onPreDragLimit,this),e.options.worldCopyJump&&(this._draggable.on(`predrag`,this._onPreDragWrap,this),e.on(`zoomend`,this._onZoomEnd,this),e.whenReady(this._onZoomEnd,this))}G(this._map._container,`leaflet-grab leaflet-touch-drag`),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ct(this._map._container,`leaflet-grab`),Ct(this._map._container,`leaflet-touch-drag`),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var e=this._map;if(e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var t=I(this._map.options.maxBounds);this._offsetLimit=P(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;e.fire(`movestart`).fire(`dragstart`),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(e){if(this._map.options.inertia){var t=this._lastTime=+new Date,n=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(n),this._times.push(t),this._prunePositions(t)}this._map.fire(`move`,e).fire(`drag`,e)},_prunePositions:function(e){for(;this._positions.length>1&&e-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(e,t){return e-(e-t)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var e=this._draggable._newPos.subtract(this._draggable._startPos),t=this._offsetLimit;e.x<t.min.x&&(e.x=this._viscousLimit(e.x,t.min.x)),e.y<t.min.y&&(e.y=this._viscousLimit(e.y,t.min.y)),e.x>t.max.x&&(e.x=this._viscousLimit(e.x,t.max.x)),e.y>t.max.y&&(e.y=this._viscousLimit(e.y,t.max.y)),this._draggable._newPos=this._draggable._startPos.add(e)}},_onPreDragWrap:function(){var e=this._worldWidth,t=Math.round(e/2),n=this._initialWorldOffset,r=this._draggable._newPos.x,i=(r-t+n)%e+t-n,a=(r+t+n)%e-t-n,o=Math.abs(i+n)<Math.abs(a+n)?i:a;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=o},_onDragEnd:function(e){var t=this._map,n=t.options,r=!n.inertia||e.noInertia||this._times.length<2;if(t.fire(`dragend`,e),r)t.fire(`moveend`);else{this._prunePositions(+new Date);var i=this._lastPos.subtract(this._positions[0]),a=(this._lastTime-this._times[0])/1e3,o=n.easeLinearity,s=i.multiplyBy(o/a),c=s.distanceTo([0,0]),l=Math.min(n.inertiaMaxSpeed,c),u=s.multiplyBy(l/c),d=l/(n.inertiaDeceleration*o),f=u.multiplyBy(-d/2).round();!f.x&&!f.y?t.fire(`moveend`):(f=t._limitOffset(f,t.options.maxBounds),T(function(){t.panBy(f,{duration:d,easeLinearity:o,noMoveStart:!0,animate:!0})}))}}});Z.addInitHook(`addHandler`,`dragging`,ei),Z.mergeOptions({keyboard:!0,keyboardPanDelta:80});var ti=gn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(e){this._map=e,this._setPanDelta(e.options.keyboardPanDelta),this._setZoomDelta(e.options.zoomDelta)},addHooks:function(){var e=this._map._container;e.tabIndex<=0&&(e.tabIndex=`0`),J(e,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),X(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var e=document.body,t=document.documentElement,n=e.scrollTop||t.scrollTop,r=e.scrollLeft||t.scrollLeft;this._map._container.focus(),window.scrollTo(r,n)}},_onFocus:function(){this._focused=!0,this._map.fire(`focus`)},_onBlur:function(){this._focused=!1,this._map.fire(`blur`)},_setPanDelta:function(e){var t=this._panKeys={},n=this.keyCodes,r,i;for(r=0,i=n.left.length;r<i;r++)t[n.left[r]]=[-1*e,0];for(r=0,i=n.right.length;r<i;r++)t[n.right[r]]=[e,0];for(r=0,i=n.down.length;r<i;r++)t[n.down[r]]=[0,e];for(r=0,i=n.up.length;r<i;r++)t[n.up[r]]=[0,-1*e]},_setZoomDelta:function(e){var t=this._zoomKeys={},n=this.keyCodes,r,i;for(r=0,i=n.zoomIn.length;r<i;r++)t[n.zoomIn[r]]=e;for(r=0,i=n.zoomOut.length;r<i;r++)t[n.zoomOut[r]]=-e},_addHooks:function(){J(document,`keydown`,this._onKeyDown,this)},_removeHooks:function(){X(document,`keydown`,this._onKeyDown,this)},_onKeyDown:function(e){if(!(e.altKey||e.ctrlKey||e.metaKey)){var t=e.keyCode,n=this._map,r;if(t in this._panKeys){if(!n._panAnim||!n._panAnim._inProgress){if(r=this._panKeys[t],e.shiftKey&&(r=M(r).multiplyBy(3)),n.options.maxBounds&&(r=n._limitOffset(M(r),n.options.maxBounds)),n.options.worldCopyJump){var i=n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));n.panTo(i)}else n.panBy(r)}}else if(t in this._zoomKeys)n.setZoom(n.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[t]);else if(t===27&&n._popup&&n._popup.options.closeOnEscapeKey)n.closePopup();else return;Zt(e)}}});Z.addInitHook(`addHandler`,`keyboard`,ti),Z.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ni=gn.extend({addHooks:function(){J(this._map._container,`wheel`,this._onWheelScroll,this),this._delta=0},removeHooks:function(){X(this._map._container,`wheel`,this._onWheelScroll,this)},_onWheelScroll:function(e){var t=tn(e),n=this._map.options.wheelDebounceTime;this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),this._startTime||=+new Date;var r=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(i(this._performZoom,this),r),Zt(e)},_performZoom:function(){var e=this._map,t=e.getZoom(),n=this._map.options.zoomSnap||0;e._stop();var r=this._delta/(this._map.options.wheelPxPerZoomLevel*4),i=4*Math.log(2/(1+Math.exp(-Math.abs(r))))/Math.LN2,a=n?Math.ceil(i/n)*n:i,o=e._limitZoom(t+(this._delta>0?a:-a))-t;this._delta=0,this._startTime=null,o&&(e.options.scrollWheelZoom===`center`?e.setZoom(t+o):e.setZoomAround(this._lastMousePos,t+o))}});Z.addInitHook(`addHandler`,`scrollWheelZoom`,ni);var ri=600;Z.mergeOptions({tapHold:H.touchNative&&H.safari&&H.mobile,tapTolerance:15});var ii=gn.extend({addHooks:function(){J(this._map._container,`touchstart`,this._onDown,this)},removeHooks:function(){X(this._map._container,`touchstart`,this._onDown,this)},_onDown:function(e){if(clearTimeout(this._holdTimeout),e.touches.length===1){var t=e.touches[0];this._startPos=this._newPos=new j(t.clientX,t.clientY),this._holdTimeout=setTimeout(i(function(){this._cancel(),this._isTapValid()&&(J(document,`touchend`,Xt),J(document,`touchend touchcancel`,this._cancelClickPrevent),this._simulateEvent(`contextmenu`,t))},this),ri),J(document,`touchend touchcancel contextmenu`,this._cancel,this),J(document,`touchmove`,this._onMove,this)}},_cancelClickPrevent:function e(){X(document,`touchend`,Xt),X(document,`touchend touchcancel`,e)},_cancel:function(){clearTimeout(this._holdTimeout),X(document,`touchend touchcancel contextmenu`,this._cancel,this),X(document,`touchmove`,this._onMove,this)},_onMove:function(e){var t=e.touches[0];this._newPos=new j(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(e,t){var n=new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY});n._simulated=!0,t.target.dispatchEvent(n)}});Z.addInitHook(`addHandler`,`tapHold`,ii),Z.mergeOptions({touchZoom:H.touch,bounceAtZoomLimits:!0});var ai=gn.extend({addHooks:function(){G(this._map._container,`leaflet-touch-zoom`),J(this._map._container,`touchstart`,this._onTouchStart,this)},removeHooks:function(){Ct(this._map._container,`leaflet-touch-zoom`),X(this._map._container,`touchstart`,this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(!(!e.touches||e.touches.length!==2||t._animatingZoom||this._zooming)){var n=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]);this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),t.options.touchZoom!==`center`&&(this._pinchStartLatLng=t.containerPointToLatLng(n.add(r)._divideBy(2))),this._startDist=n.distanceTo(r),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),J(document,`touchmove`,this._onTouchMove,this),J(document,`touchend touchcancel`,this._onTouchEnd,this),Xt(e)}},_onTouchMove:function(e){if(!(!e.touches||e.touches.length!==2||!this._zooming)){var t=this._map,n=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]),a=n.distanceTo(r)/this._startDist;if(this._zoom=t.getScaleZoom(a,this._startZoom),!t.options.bounceAtZoomLimits&&(this._zoom<t.getMinZoom()&&a<1||this._zoom>t.getMaxZoom()&&a>1)&&(this._zoom=t._limitZoom(this._zoom)),t.options.touchZoom===`center`){if(this._center=this._startLatLng,a===1)return}else{var o=n._add(r)._divideBy(2)._subtract(this._centerPoint);if(a===1&&o.x===0&&o.y===0)return;this._center=t.unproject(t.project(this._pinchStartLatLng,this._zoom).subtract(o),this._zoom)}this._moved||=(t._moveStart(!0,!1),!0),E(this._animRequest);var s=i(t._move,t,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=T(s,this,!0),Xt(e)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,E(this._animRequest),X(document,`touchmove`,this._onTouchMove,this),X(document,`touchend touchcancel`,this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});Z.addInitHook(`addHandler`,`touchZoom`,ai),Z.BoxZoom=Qr,Z.DoubleClickZoom=$r,Z.Drag=ei,Z.Keyboard=ti,Z.ScrollWheelZoom=ni,Z.TapHold=ii,Z.TouchZoom=ai,e.Bounds=N,e.Browser=H,e.CRS=B,e.Canvas=Ur,e.Circle=ar,e.CircleMarker=rr,e.Class=O,e.Control=sn,e.DivIcon=Pr,e.DivOverlay=kr,e.DomEvent=rn,e.DomUtil=q,e.Draggable=yn,e.Evented=A,e.FeatureGroup=Jn,e.GeoJSON=dr,e.GridLayer=Ir,e.Handler=gn,e.Icon=Xn,e.ImageOverlay=Cr,e.LatLng=R,e.LatLngBounds=F,e.Layer=Q,e.LayerGroup=Kn,e.LineUtil=zn,e.Map=Z,e.Marker=er,e.Mixin=_n,e.Path=nr,e.Point=j,e.PolyUtil=Cn,e.Polygon=lr,e.Polyline=sr,e.Popup=Ar,e.PosAnimation=an,e.Projection=Hn,e.Rectangle=Xr,e.Renderer=Hr,e.SVG=Jr,e.SVGOverlay=Dr,e.TileLayer=Rr,e.Tooltip=Mr,e.Transformation=ae,e.Util=D,e.VideoOverlay=Tr,e.bind=i,e.bounds=P,e.canvas=Wr,e.circle=or,e.circleMarker=ir,e.control=cn,e.divIcon=Fr,e.extend=n,e.featureGroup=Yn,e.geoJSON=xr,e.geoJson=Sr,e.gridLayer=Lr,e.icon=Zn,e.imageOverlay=wr,e.latLng=z,e.latLngBounds=I,e.layerGroup=qn,e.map=on,e.marker=tr,e.point=M,e.polygon=ur,e.polyline=cr,e.popup=jr,e.rectangle=Zr,e.setOptions=p,e.stamp=o,e.svg=Yr,e.svgOverlay=Or,e.tileLayer=zr,e.tooltip=Nr,e.transformation=oe,e.version=t,e.videoOverlay=Er;var oi=window.L;e.noConflict=function(){return window.L=oi,this},window.L=e}))}))(),1),wn=[35.6892,51.389],Tn=[`pending`,`contacted`,`scheduled`,`in_progress`],En=Cn.default.divIcon({className:`admin-map-pin`,html:`<svg width="30" height="38" viewBox="0 0 34 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1C8.16 1 1 8.16 1 17c0 11.5 16 23.5 16 23.5S33 28.5 33 17C33 8.16 25.84 1 17 1Z" fill="#1656c9" stroke="#ffffff" stroke-width="2"/>
    <circle cx="17" cy="17" r="6" fill="#ffffff"/>
  </svg>`,iconSize:[30,38],iconAnchor:[15,36]});function Dn(){return`
    <div class="view-header">
      <h1>نقشه درخواست‌ها</h1>
      <button type="button" class="btn btn-secondary" id="map-refresh">به‌روزرسانی</button>
    </div>
    <p class="error-text" id="map-error" hidden></p>
    <div class="admin-map" id="admin-map"></div>
  `}function On(){let e=document.getElementById(`map-error`),t=document.getElementById(`map-refresh`),n=document.getElementById(`admin-map`);if(!e||!t||!n)return;let r=Cn.default.map(`admin-map`,{center:wn,zoom:11});Cn.default.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`© OpenStreetMap contributors`,maxZoom:19}).addTo(r);let i=[];function a(e,t){let n=t.map(t=>{let n=t.onActiveService&&t.id!==e.assignedStaffId,r=n?`${t.fullName} (${t.roleLabel} — در حال سرویس)`:`${t.fullName} (${t.roleLabel})`;return`<option value="${t.id}" ${t.id===e.assignedStaffId?`selected`:``} ${n?`disabled`:``}>${r}</option>`}).join(``);return`
      <div class="admin-map-popup">
        <div class="admin-map-popup-title">#${q(e.trackingCode)} — ${e.serviceLabel}</div>
        <div class="admin-map-popup-row">${e.originCity}${e.originCountry&&e.originCountry!==`ایران`?` (${e.originCountry})`:``} ← ${e.destinationCity}${e.destinationCountry&&e.destinationCountry!==`ایران`?` (${e.destinationCountry})`:``}</div>
        <div class="admin-map-popup-row">${Bt[e.status]??e.status}</div>
        <div class="admin-map-popup-row" dir="ltr">${e.phone}</div>
        <select class="admin-map-assign-select" data-map-assign-id="${e.id}">
          <option value="">اختصاص‌نیافته</option>
          ${n}
        </select>
      </div>
    `}async function o(){e.hidden=!0;try{let[t,n]=await Promise.all([M(),B()]),s=n.filter(e=>e.assignable&&e.isActive),c=t.filter(e=>Tn.includes(e.status)&&e.originLat!=null&&e.originLng!=null);i.forEach(e=>e.remove()),i=c.map(t=>{let n=Cn.default.marker([t.originLat,t.originLng],{icon:En}).addTo(r);return n.bindPopup(a(t,s)),n.on(`popupopen`,()=>{let r=document.querySelector(`[data-map-assign-id="${t.id}"]`);r?.addEventListener(`change`,async()=>{let i=r.value?Number(r.value):null;r.disabled=!0;try{await R(t.id,i),n.closePopup(),await o()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`اختصاص ناموفق بود.`,r.disabled=!1}})}),n})}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}t.addEventListener(`click`,()=>void o()),o(),window.setTimeout(()=>r.invalidateSize(),100)}function kn(e){return e.avatarUrl?`<img class="staff-avatar" src="${e.avatarUrl}" alt="${e.fullName}" />`:e.gender===`female`?`<span class="staff-avatar staff-avatar-fallback staff-avatar-female">${u.femaleAvatar}</span>`:e.gender===`male`?`<span class="staff-avatar staff-avatar-fallback staff-avatar-male">${u.maleAvatar}</span>`:`<span class="staff-avatar staff-avatar-fallback">${e.fullName.trim().charAt(0)||`؟`}</span>`}function An(e){return`
    <tr data-staff-row="${e.id}" class="${e.isActive?``:`is-inactive`}">
      <td>${kn(e)}</td>
      <td>
        ${e.fullName}
        ${e.onActiveService?`<span class="article-status-badge article-status-busy">در حال سرویس</span>`:``}
      </td>
      <td dir="ltr">${e.username}</td>
      <td>${e.roleLabel}</td>
      <td dir="ltr">${e.phone??`—`}</td>
      <td>
        <span class="article-status-badge article-status-${e.isActive?`published`:`draft`}">
          ${e.isActive?`فعال`:`غیرفعال`}
        </span>
        ${e.isReadOnly?`<span class="article-status-badge article-status-busy">فقط نمایش</span>`:``}
      </td>
      <td class="staff-table-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-view-history="${e.id}">تاریخچه خدمات و کارها</button>
        <button type="button" class="btn btn-secondary btn-sm" data-edit-staff="${e.id}">ویرایش پروفایل</button>
        <button type="button" class="btn btn-ghost btn-sm" data-toggle-active="${e.id}">
          ${e.isActive?`غیرفعال کردن`:`فعال کردن`}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-staff="${e.id}">حذف</button>
      </td>
    </tr>
  `}function jn(){return`
    <div class="editor-sidebar-card staff-form" id="staff-form-card" hidden>
      <h3 id="staff-form-title">کارمند جدید</h3>
      <input type="hidden" id="staff-form-id" />

      <h4 class="staff-form-section-title">اطلاعات ورود</h4>
      <div class="staff-form-grid">
        <div class="form-field">
          <label for="staff-full-name">نام و نام خانوادگی</label>
          <input type="text" id="staff-full-name" required />
        </div>
        <div class="form-field">
          <label for="staff-username">نام کاربری</label>
          <input type="text" id="staff-username" dir="ltr" required />
        </div>
        <div class="form-field">
          <label for="staff-password" id="staff-password-label">رمز عبور</label>
          <input type="password" id="staff-password" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="staff-role">نقش</label>
          <select id="staff-role"></select>
        </div>
        <div class="form-field">
          <label for="staff-gender">جنسیت</label>
          <select id="staff-gender">
            <option value="">مشخص نشده</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
      </div>

      <label class="settings-inline-toggle">
        <input type="checkbox" id="staff-read-only" />
        فقط نمایش — می‌تواند همه‌جا را ببیند، ولی هیچ‌چیز نمی‌تواند تغییر دهد
      </label>

      <h4 class="staff-form-section-title">پروفایل کاری</h4>
      <div class="staff-form-grid">
        <div class="form-field">
          <label for="staff-phone">شماره تماس</label>
          <input type="tel" id="staff-phone" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="staff-avatar-url">تصویر پروفایل</label>
          <div class="staff-avatar-upload-row">
            <span class="staff-avatar staff-avatar-preview" id="staff-avatar-preview">${u.maleAvatar}</span>
            <input type="url" id="staff-avatar-url" dir="ltr" placeholder="https://..." />
            <button type="button" class="btn btn-secondary btn-sm" id="staff-avatar-upload-btn">آپلود عکس</button>
            <input type="file" id="staff-avatar-file-input" accept="image/*" hidden />
          </div>
          <p class="error-text" id="staff-avatar-upload-error" hidden></p>
        </div>
        <div class="form-field">
          <label for="staff-national-id">کد ملی</label>
          <input type="text" id="staff-national-id" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="staff-hire-date">تاریخ استخدام</label>
          <input type="date" id="staff-hire-date" dir="ltr" />
        </div>
        <div class="form-field form-field-wide">
          <label for="staff-address">آدرس</label>
          <input type="text" id="staff-address" />
        </div>
      </div>

      <div id="staff-wallet-section" hidden>
        <h4 class="staff-form-section-title">کیف پول و حقوق</h4>
        <p class="settings-panel-hint">خالی بگذارید تا نرخ پیش‌فرض نقش استفاده شود (در «حقوق و دستمزد» قابل تنظیم است).</p>
        <div class="staff-form-grid">
          <div class="form-field">
            <label for="staff-salary-override">حقوق ماهانه (تومان) — استثنای این فرد</label>
            <input type="number" id="staff-salary-override" min="0" dir="ltr" placeholder="پیش‌فرض نقش" />
          </div>
          <div class="form-field">
            <label for="staff-bonus-type-override">نوع پاداش هر درخواست تکمیل‌شده</label>
            <select id="staff-bonus-type-override">
              <option value="">پیش‌فرض نقش</option>
              <option value="flat">مبلغ ثابت</option>
              <option value="percent">درصد برآورد</option>
            </select>
          </div>
          <div class="form-field">
            <label for="staff-bonus-amount-override">مقدار پاداش</label>
            <input type="number" id="staff-bonus-amount-override" min="0" dir="ltr" placeholder="پیش‌فرض نقش" />
          </div>
        </div>
      </div>

      <h4 class="staff-form-section-title">تماس اضطراری</h4>
      <div class="staff-form-grid">
        <div class="form-field">
          <label for="staff-emergency-name">نام تماس اضطراری</label>
          <input type="text" id="staff-emergency-name" />
        </div>
        <div class="form-field">
          <label for="staff-emergency-phone">شماره تماس اضطراری</label>
          <input type="tel" id="staff-emergency-phone" dir="ltr" />
        </div>
      </div>

      <div class="form-field">
        <label for="staff-notes">یادداشت مدیریتی</label>
        <textarea id="staff-notes" rows="3" placeholder="نکات، مهارت‌ها یا سوابق مهم برای مدیریت..."></textarea>
      </div>

      <p class="error-text" id="staff-form-error" hidden></p>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="staff-form-cancel">انصراف</button>
        <button type="button" class="btn btn-primary" id="staff-form-submit">ایجاد کارمند</button>
      </div>
    </div>
  `}function Mn(){return`
    <div class="view-header">
      <h1>کارمندان</h1>
      <button type="button" class="btn btn-primary" id="staff-add-toggle">
        <span class="icon">${u.plusCircle}</span>
        کارمند جدید
      </button>
    </div>

    ${jn()}

    <p class="error-text" id="staff-error" hidden></p>
    <div class="staff-table-wrapper">
      <table class="staff-table">
        <thead>
          <tr>
            <th>پروفایل</th>
            <th>نام</th>
            <th>نام کاربری</th>
            <th>نقش</th>
            <th>تماس</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody id="staff-table-body"></tbody>
      </table>
    </div>
  `}function Nn(e=()=>{}){let t=document.getElementById(`staff-add-toggle`),n=document.getElementById(`staff-form-card`),r=document.getElementById(`staff-form-title`),i=document.getElementById(`staff-form-cancel`),a=document.getElementById(`staff-form-error`),o=document.getElementById(`staff-form-submit`),s=document.getElementById(`staff-form-id`),c=document.getElementById(`staff-full-name`),l=document.getElementById(`staff-username`),d=document.getElementById(`staff-password`),f=document.getElementById(`staff-password-label`),p=document.getElementById(`staff-role`),m=document.getElementById(`staff-gender`),h=document.getElementById(`staff-read-only`),_=document.getElementById(`staff-phone`),v=document.getElementById(`staff-avatar-url`),y=document.getElementById(`staff-avatar-preview`),b=document.getElementById(`staff-avatar-upload-btn`),S=document.getElementById(`staff-avatar-file-input`),C=document.getElementById(`staff-avatar-upload-error`),w=document.getElementById(`staff-national-id`),T=document.getElementById(`staff-hire-date`),E=document.getElementById(`staff-address`),D=document.getElementById(`staff-emergency-name`),O=document.getElementById(`staff-emergency-phone`),ee=document.getElementById(`staff-notes`),k=document.getElementById(`staff-error`),A=document.getElementById(`staff-table-body`),j=document.getElementById(`staff-wallet-section`),te=document.getElementById(`staff-salary-override`),M=document.getElementById(`staff-bonus-type-override`),N=document.getElementById(`staff-bonus-amount-override`),P=x(g(),`wallet`);if(!t||!n||!r||!i||!a||!o||!s||!c||!l||!d||!f||!p||!m||!h||!_||!v||!y||!b||!S||!C||!w||!T||!E||!D||!O||!ee||!k||!A||!j||!te||!M||!N)return;let F=[],I=[];function R(){let e=v.value.trim();if(e){y.innerHTML=`<img src="${e}" alt="" />`;return}y.innerHTML=m.value===`female`?u.femaleAvatar:u.maleAvatar}function z(e){a.hidden=!0,C.hidden=!0,r.textContent=e?`ویرایش پروفایل ${e.fullName}`:`کارمند جدید`,s.value=e?String(e.id):``,c.value=e?.fullName??``,l.value=e?.username??``,l.disabled=!!e,d.value=``,d.required=!e,f.textContent=e?`رمز عبور جدید (اختیاری)`:`رمز عبور`,p.value=e?.role??F[0]?.key??``,m.value=e?.gender??``,h.checked=e?.isReadOnly??!1,_.value=e?.phone??``,v.value=e?.avatarUrl??``,w.value=e?.nationalId??``,T.value=e?.hireDate??``,E.value=e?.address??``,D.value=e?.emergencyContactName??``,O.value=e?.emergencyContactPhone??``,ee.value=e?.notes??``,j.hidden=!e||!P,te.value=e?.salaryAmountOverride==null?``:String(e.salaryAmountOverride),M.value=e?.bonusTypeOverride??``,N.value=e?.bonusAmountOverride==null?``:String(e.bonusAmountOverride),o.textContent=e?`ذخیره تغییرات`:`ایجاد کارمند`,R(),n.hidden=!1,n.scrollIntoView({behavior:`smooth`,block:`center`})}function ie(){n.hidden=!0}async function ae(){k.hidden=!0;try{let[e,t]=await Promise.all([B(),F.length?Promise.resolve({roles:F}):re()]);F=t.roles,I=e,p.innerHTML=F.map(e=>`<option value="${e.key}">${e.label}</option>`).join(``),A.innerHTML=e.map(e=>An(e)).join(``),oe()}catch(e){k.hidden=!1,k.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function oe(){A.querySelectorAll(`[data-view-history]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=I.find(e=>e.id===Number(t.dataset.viewHistory));n&&e(n)})}),A.querySelectorAll(`[data-edit-staff]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=I.find(t=>t.id===Number(e.dataset.editStaff));t&&z(t)})}),A.querySelectorAll(`[data-toggle-active]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.toggleActive),n=I.find(e=>e.id===t);if(n){e.disabled=!0;try{await se(t,{isActive:!n.isActive}),await ae()}catch(t){k.hidden=!1,k.textContent=t instanceof Error?t.message:`به‌روزرسانی ناموفق بود.`,e.disabled=!1}}})}),A.querySelectorAll(`[data-delete-staff]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.deleteStaff);if(window.confirm(`این کارمند برای همیشه حذف شود؟ درخواست‌ها و محتوای قبلی او حذف نمی‌شود، فقط از او جدا می‌شود.`)){e.disabled=!0;try{await ce(t),await ae()}catch(t){k.hidden=!1,k.textContent=t instanceof Error?t.message:`حذف کارمند ناموفق بود.`,e.disabled=!1}}})})}t.addEventListener(`click`,()=>z(null)),i.addEventListener(`click`,ie),v.addEventListener(`input`,R),m.addEventListener(`change`,R),b.addEventListener(`click`,()=>S.click()),S.addEventListener(`change`,async()=>{let e=S.files?.[0];if(e){C.hidden=!0,b.textContent=`در حال آپلود...`,b.disabled=!0;try{let t=await Se(e);v.value=t,R()}catch(e){C.hidden=!1,C.textContent=e instanceof Error?e.message:`آپلود عکس ناموفق بود.`}finally{S.value=``,b.textContent=`آپلود عکس`,b.disabled=!1}}}),o.addEventListener(`click`,async()=>{a.hidden=!0;let e=c.value.trim(),t=l.value.trim(),n=d.value,r=!!s.value;if(!e){a.hidden=!1,a.textContent=`نام و نام خانوادگی الزامی است.`;return}if(!r&&(!t||!n)){a.hidden=!1,a.textContent=`نام کاربری و رمز عبور برای کارمند جدید الزامی است.`;return}let i={fullName:e,role:p.value,gender:m.value||null,phone:_.value.trim(),avatarUrl:v.value.trim(),nationalId:w.value.trim(),hireDate:T.value.trim(),address:E.value.trim(),emergencyContactName:D.value.trim(),emergencyContactPhone:O.value.trim(),notes:ee.value.trim(),isReadOnly:h.checked};o.disabled=!0,o.textContent=r?`در حال ذخیره...`:`در حال ایجاد...`;try{if(r){let e={...i};n&&(e.password=n);let t=Number(s.value);await se(t,e),P&&await G(t,{salaryAmountOverride:te.value.trim()?Number(te.value):null,bonusTypeOverride:M.value||null,bonusAmountOverride:N.value.trim()?Number(N.value):null})}else await ne({...i,username:t,password:n});ie(),await ae()}catch(e){a.hidden=!1,a.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`}finally{o.disabled=!1,o.textContent=r?`ذخیره تغییرات`:`ایجاد کارمند`}}),ae()}function Pn(e){return`
    <div class="portal-card">
      <div class="portal-card-top">
        <span class="pipeline-tracking">#${q(e.trackingCode)}</span>
        <span class="portal-status">${Bt[e.status]??e.status}</span>
      </div>
      <div class="pipeline-service">${e.serviceLabel}</div>
      <div class="pipeline-row">
        <span class="icon">${u.pin}</span>
        <span>${e.originCity}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${u.flag}</span>
        <span>${e.destinationCity}</span>
      </div>
      <div class="pipeline-row pipeline-muted">
        <span class="icon">${u.calendar}</span>
        <span>${e.scheduledDate} — ساعت ${q(e.scheduledTime)}</span>
      </div>
      <div class="pipeline-estimate">${J(e.estimateAvg)}</div>
    </div>
  `}function Fn(e){return`
    <div class="view-header">
      <h1>تاریخچه خدمات و کارها — ${e.fullName}</h1>
      <button type="button" class="btn btn-secondary" id="staff-history-refresh">به‌روزرسانی</button>
    </div>
    <p class="error-text" id="staff-history-error" hidden></p>
    <div class="stat-cards" id="staff-history-stats"></div>
    <div class="portal-list" id="staff-history-list"></div>
  `}function In(e){let t=document.getElementById(`staff-history-error`),n=document.getElementById(`staff-history-stats`),r=document.getElementById(`staff-history-list`),i=document.getElementById(`staff-history-refresh`);if(!t||!n||!r||!i)return;async function a(){t.hidden=!0;try{let t=await He(e.id),i=t.filter(e=>e.status===`completed`).length,a=t.filter(e=>e.status===`in_progress`).length;n.innerHTML=`
        <div class="stat-card">
          <span class="stat-card-label">کل کارهای اختصاص‌یافته</span>
          <span class="stat-card-value">${q(t.length)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card-label">انجام‌شده</span>
          <span class="stat-card-value">${q(i)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card-label">در حال انجام</span>
          <span class="stat-card-value">${q(a)}</span>
        </div>
      `,r.innerHTML=t.length?t.map(Pn).join(``):`<p class="portal-empty">هنوز کاری به این کارمند اختصاص داده نشده است.</p>`}catch(e){t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}i.addEventListener(`click`,()=>void a()),a()}function Ln(){return`
    <div class="view-header">
      <h1>مدیریت فایل</h1>
      <div>
        <input type="file" id="media-upload-input" accept="image/*,video/mp4,video/webm,audio/mpeg,audio/wav,audio/ogg" hidden />
        <button type="button" class="btn btn-secondary btn-sm" id="media-upload-btn">آپلود فایل</button>
      </div>
    </div>
    <p class="settings-panel-hint">
      عکس، ویدیو و فایل صوتی که آپلود می‌کنید، بر اساس نوعش در پوشه‌ی مربوطه (عکس‌ها/ویدیوها/صوت‌ها) روی سرور ذخیره می‌شود.
    </p>
    <div class="settings-tabs" id="media-folder-filter" style="margin-bottom: 0">
      <button type="button" class="settings-tab is-active" data-media-folder="">همه</button>
      <button type="button" class="settings-tab" data-media-folder="images">عکس‌ها</button>
      <button type="button" class="settings-tab" data-media-folder="videos">ویدیوها</button>
      <button type="button" class="settings-tab" data-media-folder="audio">صوت‌ها</button>
    </div>
    <p class="error-text" id="media-error" hidden></p>
    <div id="media-list"></div>
  `}function Rn(){function e(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:`${(e/1048576).toFixed(1)} MB`}function t(e){return e.startsWith(`videos/`)?u.video:e.startsWith(`audio/`)?u.audio:u.image}let n=``;async function r(){let i=document.getElementById(`media-list`),a=document.getElementById(`media-error`);if(!(!i||!a)){a.hidden=!0;try{let o=await Ce(n||void 0);i.innerHTML=o.length?o.map(n=>`
        <div class="testimonial-row" data-media-key="${n.key}">
          <div class="testimonial-row-avatar"><span class="icon">${t(n.key)}</span></div>
          <div class="testimonial-row-body">
            <div class="testimonial-row-head"><strong dir="ltr">${n.key.split(`/`).pop()}</strong></div>
            <div class="job-application-meta"><span>${e(n.size)}</span><span>${new Date(n.uploaded).toLocaleDateString(`fa-IR`)}</span></div>
          </div>
          <div class="staff-table-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-copy-media="${n.url}">کپی لینک</button>
            <button type="button" class="btn btn-ghost btn-sm" data-delete-media="${n.key}">حذف</button>
          </div>
        </div>
      `).join(``):`<p class="pipeline-empty">فایلی آپلود نشده است.</p>`,i.querySelectorAll(`[data-copy-media]`).forEach(e=>{e.addEventListener(`click`,()=>{navigator.clipboard.writeText(`${e.dataset.copyMedia}`),e.textContent=`کپی شد`,window.setTimeout(()=>e.textContent=`کپی لینک`,1500)})}),i.querySelectorAll(`[data-delete-media]`).forEach(e=>{e.addEventListener(`click`,async()=>{if(window.confirm(`این فایل برای همیشه حذف شود؟`)){e.disabled=!0;try{await we(e.dataset.deleteMedia),await r()}catch(t){a.hidden=!1,a.textContent=t instanceof Error?t.message:`حذف فایل ناموفق بود.`,e.disabled=!1}}})})}catch(e){i.innerHTML=``,a.hidden=!1,a.textContent=e instanceof Error?e.message:`دریافت فهرست فایل‌ها ناموفق بود.`}}}document.getElementById(`media-folder-filter`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-media-folder]`);t&&(document.querySelectorAll(`#media-folder-filter .settings-tab`).forEach(e=>e.classList.remove(`is-active`)),t.classList.add(`is-active`),n=t.dataset.mediaFolder??``,r())});let i=document.getElementById(`media-upload-input`);document.getElementById(`media-upload-btn`)?.addEventListener(`click`,()=>i?.click()),i?.addEventListener(`change`,async()=>{let e=i.files?.[0];if(!e)return;let t=document.getElementById(`media-error`);try{await Se(e),i.value=``,await r()}catch(e){t&&(t.hidden=!1,t.textContent=e instanceof Error?e.message:`آپلود فایل ناموفق بود.`)}}),r()}function zn(e,t=`success`){let n=document.getElementById(`toast-container`);n||(n=document.createElement(`div`),n.id=`toast-container`,document.body.appendChild(n));let r=document.createElement(`div`);r.className=`toast toast-${t}`,r.textContent=e,n.appendChild(r),window.setTimeout(()=>r.classList.add(`is-visible`),10),window.setTimeout(()=>{r.classList.remove(`is-visible`),window.setTimeout(()=>r.remove(),300)},2500)}function Bn(){return`
    <div class="view-header">
      <h1>نقش‌ها و اختیارات</h1>
    </div>
    <p class="settings-panel-hint">برای هر نقش، دسترسی‌هایی که باید داشته باشد را تیک بزنید. پنل کارمندی که این نقش را دارد فقط شامل همین موارد خواهد بود.</p>
    <p class="error-text" id="roles-error" hidden></p>
    <div id="roles-list"></div>
    <div class="settings-panel-footer">
      <button type="button" class="btn btn-secondary" id="role-add-btn">
        <span class="icon">${u.plusCircle}</span>
        نقش جدید
      </button>
    </div>
  `}function Vn(){let e=document.getElementById(`roles-error`);if(!e)return;function t(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`,zn(t instanceof Error?t.message:`خطایی پیش آمد.`,`error`)}let n=[],r=[],i=null;function a(e){let t=e.isSystem;return`
      <div class="editor-sidebar-card" data-role-card="${e.id}">
        <div class="plugin-card-head">
          <div class="settings-form-grid" style="flex:1">
            <div class="form-field"><label>نام نقش (فارسی)</label><input type="text" data-role-label value="${e.label}" ${t?`disabled`:``} /></div>
            <div class="form-field"><label>نام نقش (انگلیسی)</label><input type="text" dir="ltr" data-role-label-en value="${e.labelEn}" ${t?`disabled`:``} /></div>
          </div>
          ${t?`<span class="article-status-badge">سیستمی</span>`:`<button type="button" class="btn btn-ghost btn-sm" data-role-delete="${e.id}">حذف</button>`}
        </div>
        <div class="role-permissions-grid">
          ${r.map(n=>`
            <label class="settings-inline-toggle">
              <input type="checkbox" data-role-permission="${n.key}" ${e.permissions.includes(n.key)?`checked`:``} ${t?`disabled`:``} />
              ${n.label}
            </label>
          `).join(``)}
        </div>
        ${t?``:`<div class="settings-panel-footer"><button type="button" class="btn btn-primary" data-role-save="${e.id}">ذخیره نقش</button></div>`}
      </div>
    `}function o(){return i?`
      <div class="editor-sidebar-card" data-role-card="new">
        <div class="plugin-card-head">
          <div class="settings-form-grid" style="flex:1">
            <div class="form-field"><label>نام نقش (فارسی)</label><input type="text" data-role-label placeholder="مثلاً: پشتیبان انبار" /></div>
            <div class="form-field"><label>نام نقش (انگلیسی)</label><input type="text" dir="ltr" data-role-label-en /></div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-role-cancel-new>انصراف</button>
        </div>
        <div class="role-permissions-grid">
          ${r.map(e=>`<label class="settings-inline-toggle"><input type="checkbox" data-role-permission="${e.key}" /> ${e.label}</label>`).join(``)}
        </div>
        <div class="settings-panel-footer"><button type="button" class="btn btn-primary" data-role-save="new">ایجاد نقش</button></div>
      </div>
    `:``}function s(){let e=document.getElementById(`roles-list`);e&&(e.innerHTML=o()+n.map(a).join(``),l())}function c(e){return Array.from(e.querySelectorAll(`[data-role-permission]:checked`)).map(e=>e.dataset.rolePermission)}function l(){document.querySelectorAll(`[data-role-save]`).forEach(e=>{e.addEventListener(`click`,async()=>{let r=e.closest(`[data-role-card]`);if(!r)return;let a=e.dataset.roleSave,o=r.querySelector(`[data-role-label]`).value.trim(),l=r.querySelector(`[data-role-label-en]`).value.trim();if(!o){t(Error(`نام نقش الزامی است.`));return}let u=c(r);e.disabled=!0;try{a===`new`?(await ie({label:o,labelEn:l,permissions:u}),i=null):await ae(Number(a),{label:o,labelEn:l,permissions:u}),n=(await re()).roles,s(),zn(`نقش ذخیره شد.`)}catch(n){t(n),e.disabled=!1}})}),document.querySelectorAll(`[data-role-delete]`).forEach(e=>{e.addEventListener(`click`,async()=>{if(window.confirm(`این نقش برای همیشه حذف شود؟`)){e.disabled=!0;try{await oe(Number(e.dataset.roleDelete)),n=(await re()).roles,s()}catch(n){t(n),e.disabled=!1}}})}),document.querySelector(`[data-role-cancel-new]`)?.addEventListener(`click`,()=>{i=null,s()})}document.getElementById(`role-add-btn`)?.addEventListener(`click`,()=>{i={label:``,labelEn:``,permissions:[]},s()}),re().then(e=>{n=e.roles,r=e.permissions,s()}).catch(t)}var Hn=null,Un=null;async function Wn(){return Hn||Un||(Un=Te().then(e=>(Hn=e.language_mode??`both`,Hn)).catch(()=>`both`),Un)}function Gn(){return Hn??`both`}function Q(e){let t=Gn();t!==`both`&&e.querySelectorAll(`[data-i18n]`).forEach(e=>{e.hidden=e.dataset.i18n!==t})}var Kn=[`motorcycle`,`pickup`,`van`,`lightTruck`,`truck`,`trailer`],qn=[{id:`motorcycle`,label:`موتور`},{id:`pickup`,label:`وانت`},{id:`van`,label:`نیسان`},{id:`light-truck`,label:`خاور`},{id:`truck`,label:`کامیون`}],Jn=[{id:`active`,label:`فعال`},{id:`inactive`,label:`غیرفعال`},{id:`in_repair`,label:`در حال تعمیر`}],Yn=Object.fromEntries(Jn.map(e=>[e.id,e.label]));function Xn(e){return e===`active`?`article-status-published`:e===`in_repair`?`article-status-busy`:`article-status-draft`}function Zn(e,t){return`
    <tr data-vehicle-row="${e.id}">
      <td>${e.label}</td>
      <td>${t[e.type]??e.type}</td>
      <td dir="ltr">${e.plateNumber??`—`}</td>
      <td>${e.model??`—`}</td>
      <td>${e.driverName??`—`}</td>
      <td><span class="article-status-badge ${Xn(e.status)}">${Yn[e.status]??e.status}</span></td>
      <td class="staff-table-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-edit-vehicle="${e.id}">ویرایش</button>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-vehicle="${e.id}">حذف</button>
      </td>
    </tr>
  `}function Qn(){return`
    <div class="editor-sidebar-card" id="vehicle-form-card" hidden>
      <h3 id="vehicle-form-title">وسیله جدید</h3>
      <input type="hidden" id="vehicle-form-id" />
      <div class="staff-form-grid">
        <div class="form-field">
          <label for="vehicle-label">عنوان (مثلاً «نیسان شماره ۱»)</label>
          <input type="text" id="vehicle-label" required />
        </div>
        <div class="form-field">
          <label for="vehicle-type">نوع</label>
          <select id="vehicle-type"></select>
        </div>
        <div class="form-field">
          <label for="vehicle-plate">شماره پلاک</label>
          <input type="text" id="vehicle-plate" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="vehicle-model">مدل</label>
          <input type="text" id="vehicle-model" />
        </div>
        <div class="form-field">
          <label for="vehicle-year">سال ساخت</label>
          <input type="number" id="vehicle-year" dir="ltr" />
        </div>
        <div class="form-field">
          <label for="vehicle-status">وضعیت</label>
          <select id="vehicle-status">
            ${Jn.map(e=>`<option value="${e.id}">${e.label}</option>`).join(``)}
          </select>
        </div>
        <div class="form-field">
          <label for="vehicle-driver">راننده</label>
          <select id="vehicle-driver"></select>
        </div>
      </div>
      <div class="form-field">
        <label for="vehicle-notes">یادداشت</label>
        <textarea id="vehicle-notes" rows="2"></textarea>
      </div>
      <p class="error-text" id="vehicle-form-error" hidden></p>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="vehicle-form-cancel">انصراف</button>
        <button type="button" class="btn btn-primary" id="vehicle-form-submit">ایجاد وسیله</button>
      </div>
    </div>
  `}function $n(){return`
    <div id="vehicle-types-list"></div>
    <button type="button" class="btn btn-secondary" id="vehicle-type-add-btn">
      <span class="icon">${u.plusCircle}</span>
      افزودن وسیله
    </button>
    <div class="settings-panel-footer">
      <button type="button" class="btn btn-primary" id="vehicle-type-save-btn">ذخیره وسیله‌ها</button>
    </div>
  `}function er(){return`
    <div class="view-header">
      <h1>ناوگان</h1>
    </div>

    <div class="settings-tabs">
      <button type="button" class="settings-tab is-active" data-fleet-tab="vehicles">ناوگان</button>
      <button type="button" class="settings-tab" data-fleet-tab="types">تعریف وسیله</button>
      <button type="button" class="settings-tab" data-fleet-tab="cities">شهرها</button>
      <button type="button" class="settings-tab" data-fleet-tab="categories">دسته‌بندی خدمات</button>
    </div>

    <div data-fleet-panel="vehicles">
      <div class="editor-header-actions" style="margin-bottom: var(--space-4)">
        <button type="button" class="btn btn-primary" id="vehicle-add-toggle">
          <span class="icon">${u.plusCircle}</span>
          وسیله جدید
        </button>
      </div>
      ${Qn()}
      <p class="error-text" id="vehicles-error" hidden></p>
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>نوع</th>
              <th>پلاک</th>
              <th>مدل</th>
              <th>راننده</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody id="vehicles-table-body"></tbody>
        </table>
      </div>
    </div>

    <div data-fleet-panel="types" hidden>
      <p class="error-text" id="vehicle-types-error" hidden></p>
      <p class="settings-saved-note" id="vehicle-types-saved-note" hidden>ذخیره شد.</p>
      ${$n()}
    </div>

    <div data-fleet-panel="cities" hidden>
      <p class="error-text" id="cities-error" hidden></p>
      <p class="settings-saved-note" id="cities-saved-note" hidden>ذخیره شد.</p>

      <div class="editor-sidebar-card">
        <h3>شهر مبدأ (مرکز ثابت)</h3>
        <p class="settings-panel-hint">
          اگر اینجا شهری مشخص کنید، همان شهر در فرم ثبت درخواست به‌عنوان مبدأ از پیش انتخاب‌شده نمایش داده می‌شود
          (خدمات شما همیشه از همان شهر آغاز می‌شود). اگر خالی بگذارید، مشتری خودش مبدأ را از بین همه‌ی شهرهای ایران انتخاب می‌کند.
        </p>
        <div class="settings-form-grid">
          <div class="form-field" data-i18n="fa"><label for="origin-city-fa">شهر (فارسی)</label><input type="text" id="origin-city-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="origin-city-en">شهر (انگلیسی)</label><input type="text" id="origin-city-en" dir="ltr" /></div>
          <div class="form-field" data-i18n="fa"><label for="origin-province-fa">استان (فارسی)</label><input type="text" id="origin-province-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="origin-province-en">استان (انگلیسی)</label><input type="text" id="origin-province-en" dir="ltr" /></div>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <h3>پوشش شهرهای مقصد</h3>
        <div class="form-field" style="max-width: 280px">
          <label for="coverage-mode">مقصدهای قابل‌انتخاب برای مشتری</label>
          <select id="coverage-mode">
            <option value="all">همه‌ی ایران</option>
            <option value="selected">فقط شهرهای مشخص‌شده در پایین</option>
          </select>
        </div>
        <div id="destination-cities-section">
          <div id="cities-list"></div>
          <button type="button" class="btn btn-secondary" id="city-add-btn">
            <span class="icon">${u.plusCircle}</span>
            افزودن شهر
          </button>
        </div>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="service_cities">ذخیره تنظیمات شهرها</button>
      </div>
    </div>

    <div data-fleet-panel="categories" hidden>
      <p class="error-text" id="categories-error" hidden></p>
      <p class="settings-saved-note" id="categories-saved-note" hidden>ذخیره شد.</p>

      <div class="editor-sidebar-card">
        <h3>دسته‌بندی‌های خدمات</h3>
        <p class="settings-panel-hint">
          اگر کسب‌وکار شما فقط بخشی از این خدمات را ارائه می‌دهد، بقیه را غیرفعال کنید تا اصلاً به مشتری نشان داده نشوند.
        </p>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="category-domestic-enabled" />
          ثبت بارهای داخلی (باربری) فعال باشد
        </label>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="category-moving-enabled" />
          ثبت بار اسباب‌کشی فعال باشد
        </label>
        <label class="settings-inline-toggle">
          <input type="checkbox" id="international-shipping-enabled" />
          ثبت بارهای ترانزیت (حمل و نقل بین‌المللی) فعال باشد — یک فیلد انتخاب کشور مبدأ/مقصد هم به فرم ثبت درخواست اضافه می‌شود
        </label>
        <p class="settings-panel-hint">
          توجه: اگر یک دسته را فعال نگه دارید ولی در تب «تعریف وسیله» هیچ وسیله‌ی فعالی برایش نماند،
          آن دسته باز هم به‌صورت خودکار از فرم ثبت درخواست مشتری حذف می‌شود.
        </p>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="service_categories">ذخیره دسته‌بندی‌ها</button>
      </div>
    </div>
  `}function tr(){let e=document.getElementById(`vehicle-add-toggle`),t=document.getElementById(`vehicle-form-card`),n=document.getElementById(`vehicle-form-title`),r=document.getElementById(`vehicle-form-cancel`),i=document.getElementById(`vehicle-form-error`),a=document.getElementById(`vehicle-form-submit`),o=document.getElementById(`vehicle-form-id`),s=document.getElementById(`vehicle-label`),c=document.getElementById(`vehicle-type`),l=document.getElementById(`vehicle-plate`),u=document.getElementById(`vehicle-model`),d=document.getElementById(`vehicle-year`),f=document.getElementById(`vehicle-status`),p=document.getElementById(`vehicle-driver`),m=document.getElementById(`vehicle-notes`),h=document.getElementById(`vehicles-error`),g=document.getElementById(`vehicles-table-body`);if(!e||!t||!n||!r||!i||!a||!o||!s||!c||!l||!u||!d||!f||!p||!m||!h||!g)return;let _=[],v=[],y=Object.fromEntries(qn.map(e=>[e.id,e.label])),b=[],x={},S=[],C={city:``,cityEn:``,province:``,provinceEn:``},w=`all`,T=!0,E=!0,D=!1;Wn().then(()=>Q(document.getElementById(`view-container`)??document.body)),document.querySelectorAll(`[data-fleet-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`[data-fleet-tab]`).forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),document.querySelectorAll(`[data-fleet-panel]`).forEach(t=>{t.hidden=t.dataset.fleetPanel!==e.dataset.fleetTab})})});function O(){let e=document.getElementById(`vehicle-types-list`);e&&(e.innerHTML=b.map((e,t)=>`
      <div class="block-editor" data-vehicle-type-index="${t}">
        <div class="block-editor-head">
          <span class="block-editor-type">وسیله ${t+1}</span>
          <div class="block-editor-actions">
            <label class="settings-inline-toggle"><input type="checkbox" data-field="active" ${e.active?`checked`:``} /> فعال</label>
            <button type="button" class="btn btn-ghost btn-sm" data-remove-vehicle-type="${t}">حذف</button>
          </div>
        </div>
        <div class="block-editor-body">
          <div class="settings-form-grid">
            <div class="form-field" data-i18n="fa"><label>نام (فارسی)</label><input type="text" data-field="label" value="${e.label}" /></div>
            <div class="form-field" data-i18n="en"><label>نام (انگلیسی)</label><input type="text" dir="ltr" data-field="labelEn" value="${e.labelEn}" /></div>
            <div class="form-field"><label>آیکون</label>
              <select data-field="icon">
                ${Kn.map(t=>`<option value="${t}" ${t===e.icon?`selected`:``}>${t}</option>`).join(``)}
              </select>
            </div>
            <div class="form-field"><label>قیمت پایه (تومان)</label><input type="number" data-field="basePrice" value="${e.basePrice}" /></div>
            <div class="form-field"><label>نرخ هر کیلومتر (تومان)</label><input type="number" data-field="perKmRate" value="${e.perKmRate}" /></div>
          </div>
        </div>
      </div>
    `).join(``),Q(e))}function ee(){b=Array.from(document.querySelectorAll(`[data-vehicle-type-index]`)).map((e,t)=>({id:b[t]?.id??`vehicle-${crypto.randomUUID().slice(0,8)}`,label:e.querySelector(`[data-field="label"]`).value,labelEn:e.querySelector(`[data-field="labelEn"]`).value,icon:e.querySelector(`[data-field="icon"]`).value,basePrice:Number(e.querySelector(`[data-field="basePrice"]`).value)||0,perKmRate:Number(e.querySelector(`[data-field="perKmRate"]`).value)||0,floorCostExempt:b[t]?.floorCostExempt??!1,active:e.querySelector(`[data-field="active"]`).checked,sortOrder:t+1}))}document.getElementById(`vehicle-types-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove-vehicle-type]`);t&&(ee(),b.splice(Number(t.dataset.removeVehicleType),1),O())}),document.getElementById(`vehicle-type-add-btn`)?.addEventListener(`click`,()=>{ee(),b.push({id:`vehicle-${crypto.randomUUID().slice(0,8)}`,label:``,labelEn:``,icon:`van`,basePrice:0,perKmRate:0,floorCostExempt:!1,active:!0,sortOrder:b.length+1}),O()}),document.getElementById(`vehicle-type-save-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget,n=document.getElementById(`vehicle-types-saved-note`),r=document.getElementById(`vehicle-types-error`);t.disabled=!0;try{ee(),await V(`vehicle_types`,b),n&&(n.hidden=!1,window.setTimeout(()=>n.hidden=!0,2500))}catch(e){r&&(r.hidden=!1,r.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`)}finally{t.disabled=!1}});function k(){let e=document.getElementById(`cities-list`);e.innerHTML=S.map((e,t)=>`
      <div class="settings-form-grid" data-city-index="${t}">
        <div class="form-field" data-i18n="fa"><label>شهر (فارسی)</label><input type="text" data-field="city" value="${e.city}" /></div>
        <div class="form-field" data-i18n="en"><label>شهر (انگلیسی)</label><input type="text" dir="ltr" data-field="cityEn" value="${e.cityEn}" /></div>
        <div class="form-field" data-i18n="fa"><label>استان (فارسی)</label><input type="text" data-field="province" value="${e.province}" /></div>
        <div class="form-field" data-i18n="en"><label>استان (انگلیسی)</label><input type="text" dir="ltr" data-field="provinceEn" value="${e.provinceEn}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-city="${t}">حذف</button>
      </div>
    `).join(``),Q(e)}function A(){S=Array.from(document.querySelectorAll(`[data-city-index]`)).map(e=>({city:e.querySelector(`[data-field="city"]`).value,cityEn:e.querySelector(`[data-field="cityEn"]`).value,province:e.querySelector(`[data-field="province"]`).value,provinceEn:e.querySelector(`[data-field="provinceEn"]`).value}))}function j(){document.getElementById(`origin-city-fa`).value=C.city,document.getElementById(`origin-city-en`).value=C.cityEn,document.getElementById(`origin-province-fa`).value=C.province,document.getElementById(`origin-province-en`).value=C.provinceEn,document.getElementById(`coverage-mode`).value=w;let e=document.getElementById(`destination-cities-section`);e&&(e.hidden=w!==`selected`),k()}function te(){document.getElementById(`category-domestic-enabled`).checked=T,document.getElementById(`category-moving-enabled`).checked=E,document.getElementById(`international-shipping-enabled`).checked=D}document.getElementById(`coverage-mode`)?.addEventListener(`change`,e=>{w=e.currentTarget.value===`selected`?`selected`:`all`;let t=document.getElementById(`destination-cities-section`);t&&(t.hidden=w!==`selected`)}),document.getElementById(`cities-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove-city]`);t&&(A(),S.splice(Number(t.dataset.removeCity),1),k())}),document.getElementById(`city-add-btn`)?.addEventListener(`click`,()=>{A(),S.push({city:``,cityEn:``,province:``,provinceEn:``}),k()}),document.querySelector(`[data-save-setting="service_cities"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget,n=document.getElementById(`cities-saved-note`),r=document.getElementById(`cities-error`);t.disabled=!0;try{A(),C={city:document.getElementById(`origin-city-fa`).value.trim(),cityEn:document.getElementById(`origin-city-en`).value.trim(),province:document.getElementById(`origin-province-fa`).value.trim(),provinceEn:document.getElementById(`origin-province-en`).value.trim()},S=S.filter(e=>e.city.trim()!==``);let e=x.service_cities??{},t={originCity:C.city?C:null,coverageMode:w,destinationCities:S,internationalShippingEnabled:!!e.internationalShippingEnabled};await V(`service_cities`,t),x.service_cities=t,k(),n&&(n.hidden=!1,window.setTimeout(()=>n.hidden=!0,2500))}catch(e){r&&(r.hidden=!1,r.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`)}finally{t.disabled=!1}}),document.querySelector(`[data-save-setting="service_categories"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget,n=document.getElementById(`categories-saved-note`),r=document.getElementById(`categories-error`);t.disabled=!0;try{T=document.getElementById(`category-domestic-enabled`).checked,E=document.getElementById(`category-moving-enabled`).checked,D=document.getElementById(`international-shipping-enabled`).checked,await V(`service_categories`,{domestic:T,moving:E});let e={...x.service_cities??{},internationalShippingEnabled:D};await V(`service_cities`,e),x.service_cities=e,n&&(n.hidden=!1,window.setTimeout(()=>n.hidden=!0,2500))}catch(e){r&&(r.hidden=!1,r.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`)}finally{t.disabled=!1}});function M(e){let t=b.filter(e=>e.active).map(e=>[e.id,e.label]);e&&!t.some(([t])=>t===e)&&t.push([e,`${y[e]??e} (غیرفعال)`]),c.innerHTML=t.map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}function N(e){i.hidden=!0,n.textContent=e?`ویرایش ${e.label}`:`وسیله جدید`,o.value=e?String(e.id):``,s.value=e?.label??``,M(e?.type),c.value=e?.type??c.options[0]?.value??``,l.value=e?.plateNumber??``,u.value=e?.model??``,d.value=e?.year?String(e.year):``,f.value=e?.status??`active`,p.value=e?.driverStaffId?String(e.driverStaffId):``,m.value=e?.notes??``,a.textContent=e?`ذخیره تغییرات`:`ایجاد وسیله`,t.hidden=!1,t.scrollIntoView({behavior:`smooth`,block:`center`})}function P(){t.hidden=!0}async function F(){h.hidden=!0;try{let[t,n,r]=await Promise.all([Ze(),B(),Te()]);_=t,v=n,x=r;let i=x.vehicle_types;i?.length&&(y=Object.fromEntries(i.map(e=>[e.id,e.label]))),b=i??[],O();let a=x.service_cities;if(Array.isArray(a))S=a,w=S.length?`selected`:`all`;else{let e=a??{};S=e.destinationCities??[],w=e.coverageMode===`selected`?`selected`:`all`,C=e.originCity??{city:``,cityEn:``,province:``,provinceEn:``},D=!!e.internationalShippingEnabled}j();let o=x.service_categories??{};T=typeof o.domestic!=`boolean`||o.domestic,E=typeof o.moving!=`boolean`||o.moving,te(),M(),p.innerHTML=[`<option value="">بدون راننده</option>`,...v.map(e=>`<option value="${e.id}">${e.fullName}</option>`)].join(``),g.innerHTML=_.length?_.map(e=>Zn(e,y)).join(``):`<tr><td colspan="7" class="staff-table-empty">هنوز وسیله‌ای ثبت نشده است.</td></tr>`,I();let s=b.some(e=>e.active);e.disabled=!s,e.title=s?``:`ابتدا از تب «تعریف وسیله» دست‌کم یک نوع وسیله را فعال کنید.`}catch(e){h.hidden=!1,h.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function I(){g.querySelectorAll(`[data-edit-vehicle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=_.find(t=>t.id===Number(e.dataset.editVehicle));t&&N(t)})}),g.querySelectorAll(`[data-delete-vehicle]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=_.find(t=>t.id===Number(e.dataset.deleteVehicle));if(t&&window.confirm(`«${t.label}» برای همیشه حذف شود؟`)){e.disabled=!0;try{await et(t.id),await F()}catch(t){h.hidden=!1,h.textContent=t instanceof Error?t.message:`حذف ناموفق بود.`,e.disabled=!1}}})})}e.addEventListener(`click`,()=>N(null)),r.addEventListener(`click`,P),a.addEventListener(`click`,async()=>{i.hidden=!0;let e=s.value.trim(),t=c.value;if(!e||!t){i.hidden=!1,i.textContent=`عنوان و نوع وسیله الزامی است.`;return}let n=!!o.value,r={type:t,label:e,plateNumber:l.value.trim(),model:u.value.trim(),year:d.value.trim()?Number(d.value):null,status:f.value,driverStaffId:p.value?Number(p.value):null,notes:m.value.trim()};a.disabled=!0,a.textContent=n?`در حال ذخیره...`:`در حال ایجاد...`;try{n?await $e(Number(o.value),r):await Qe(r),P(),await F()}catch(e){i.hidden=!1,i.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`}finally{a.disabled=!1,a.textContent=n?`ذخیره تغییرات`:`ایجاد وسیله`}}),F()}var nr=20;function rr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var ir={salary:`حقوق`,bonus:`پاداش`,adjustment:`اصلاحیه`,payout:`تسویه`},ar={pending:{label:`در انتظار بررسی`,badgeClass:`article-status-badge`},approved:{label:`تأیید شد`,badgeClass:`article-status-badge article-status-published`},rejected:{label:`رد شد`,badgeClass:`article-status-badge article-status-draft`}};function or(){return`
    <div class="settings-view">
      <div class="settings-panel">
        <h2>کیف پول من</h2>
        <div class="editor-sidebar-card" id="my-wallet-summary-card">
          <p class="settings-panel-hint">در حال بارگذاری...</p>
        </div>

        <div class="editor-sidebar-card">
          <h3>درخواست تسویه</h3>
          <p class="settings-panel-hint">مبلغی از موجودی خود را برای دریافت درخواست دهید — مدیر آن را بررسی و تأیید یا رد می‌کند.</p>
          <form id="payout-request-form" style="display:flex; flex-direction:column; gap: var(--space-3);">
            <div class="form-field">
              <label for="payout-request-amount">مبلغ (تومان)</label>
              <input type="number" id="payout-request-amount" min="1" dir="ltr" required />
            </div>
            <div class="form-field">
              <label for="payout-request-note">توضیح (اختیاری)</label>
              <input type="text" id="payout-request-note" maxlength="200" />
            </div>
            <p class="error-text" id="payout-request-error" hidden></p>
            <p class="settings-saved-note" id="payout-request-success" hidden>درخواست ثبت شد.</p>
            <button type="submit" class="btn btn-primary" id="payout-request-submit">ثبت درخواست</button>
          </form>
        </div>

        <div class="editor-sidebar-card">
          <h3>درخواست‌های تسویه‌ی من</h3>
          <div id="my-payout-requests-list"><p class="settings-panel-hint">در حال بارگذاری...</p></div>
        </div>

        <div class="editor-sidebar-card">
          <h3>تراکنش‌ها</h3>
          <div id="my-wallet-tx-list"><p class="settings-panel-hint">در حال بارگذاری...</p></div>
          <button type="button" class="btn btn-ghost btn-sm" id="my-wallet-load-more" hidden style="margin-top: var(--space-3)">بارگذاری بیشتر</button>
        </div>
      </div>
    </div>
  `}function sr(e){let t=e.direction===`credit`?`+`:`−`,n=e.direction===`credit`?`var(--success)`:`var(--danger)`;return`
    <div class="activity-log-row">
      <div class="activity-log-main">
        <span class="activity-log-action">${ir[e.type]??e.type}</span>
        <span class="activity-log-target">${rr(e.description)}</span>
      </div>
      <div class="activity-log-meta">
        <span style="color:${n}; font-weight:700;">${t} ${J(e.amount)}</span>
      </div>
    </div>
  `}function cr(e){let t=ar[e.status];return`
    <div class="activity-log-row">
      <div class="activity-log-main">
        <span class="activity-log-action">${J(e.amount)}</span>
        ${e.staffNote?`<span class="activity-log-target">${rr(e.staffNote)}</span>`:``}
        ${e.adminNote?`<span class="activity-log-target">پاسخ مدیر: ${rr(e.adminNote)}</span>`:``}
      </div>
      <div class="activity-log-meta"><span class="${t.badgeClass}">${t.label}</span></div>
    </div>
  `}function lr(){let e=document.getElementById(`my-wallet-summary-card`),t=document.getElementById(`my-wallet-tx-list`),n=document.getElementById(`my-wallet-load-more`),r=document.getElementById(`my-payout-requests-list`),i=0,a=0,o=[];async function s(){if(e)try{let t=await vt(),n=t.bonus.type===`percent`?`${t.bonus.amount}٪ برآورد هر درخواست`:J(t.bonus.amount);e.innerHTML=`
        <p class="settings-panel-hint">موجودی فعلی</p>
        <p style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">${J(t.balance)}</p>
        <div class="settings-form-grid" style="margin-top: var(--space-3)">
          <div><p class="settings-panel-hint">حقوق ماهانه</p><p><strong>${J(t.salary.amount)}</strong></p></div>
          <div><p class="settings-panel-hint">پاداش هر درخواست تکمیل‌شده</p><p><strong>${n}</strong></p></div>
        </div>
      `}catch(t){e.innerHTML=`<p class="error-text">${t instanceof Error?t.message:`خطایی پیش آمد.`}</p>`}}async function c(){if(t)try{let{transactions:e,total:r}=await U(nr,i);o=[...o,...e],a=r,i+=e.length,t.innerHTML=o.length?o.map(sr).join(``):`<p class="settings-panel-hint">هنوز تراکنشی ثبت نشده.</p>`,n&&(n.hidden=i>=a)}catch(e){t.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`خطایی پیش آمد.`}</p>`}}async function l(){if(r)try{let e=await W();r.innerHTML=e.length?e.map(cr).join(``):`<p class="settings-panel-hint">هنوز درخواستی ثبت نکرده‌اید.</p>`}catch(e){r.innerHTML=`<p class="error-text">${e instanceof Error?e.message:`خطایی پیش آمد.`}</p>`}}n?.addEventListener(`click`,()=>void c()),document.getElementById(`payout-request-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`payout-request-amount`),n=document.getElementById(`payout-request-note`),r=document.getElementById(`payout-request-error`),i=document.getElementById(`payout-request-success`),a=document.getElementById(`payout-request-submit`);r.hidden=!0,i.hidden=!0;let o=Number(t.value);if(!Number.isFinite(o)||o<=0){r.hidden=!1,r.textContent=`مبلغ نامعتبر است.`;return}a.disabled=!0,(async()=>{try{await yt(o,n.value.trim()||void 0),i.hidden=!1,t.value=``,n.value=``,await Promise.all([s(),l()])}catch(e){r.hidden=!1,r.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}finally{a.disabled=!1}})()}),s(),c(),l()}var ur={pending:{next:`in_progress`,label:`شروع کار`},contacted:{next:`in_progress`,label:`شروع کار`},scheduled:{next:`in_progress`,label:`شروع کار`},in_progress:{next:`completed`,label:`پایان کار`}};function dr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function fr(e){let t=ur[e.status],n=e.originLat!=null&&e.originLng!=null?`https://www.google.com/maps/dir/?api=1&destination=${e.originLat},${e.originLng}`:null,r=e.destinationLat!=null&&e.destinationLng!=null?`https://www.google.com/maps/dir/?api=1&destination=${e.destinationLat},${e.destinationLng}`:null;return`
    <div class="portal-card" data-portal-card-id="${e.id}">
      <div class="portal-card-top">
        <span class="pipeline-tracking">#${q(e.trackingCode)}</span>
        <span class="portal-status">${Bt[e.status]??e.status}</span>
      </div>
      <div class="pipeline-service">${e.serviceLabel}</div>
      <div class="pipeline-row">
        <span class="icon">${u.pin}</span>
        <span>${e.originCity}</span>
        <span aria-hidden="true">←</span>
        <span class="icon">${u.flag}</span>
        <span>${e.destinationCity}</span>
      </div>
      <div class="pipeline-row pipeline-muted">
        <span class="icon">${u.calendar}</span>
        <span>${e.scheduledDate} — ساعت ${q(e.scheduledTime)}</span>
      </div>
      ${e.originNotes?`<p class="pipeline-note"><strong>یادداشت مبدأ:</strong> ${dr(e.originNotes)}</p>`:``}
      ${e.destinationNotes?`<p class="pipeline-note"><strong>یادداشت مقصد:</strong> ${dr(e.destinationNotes)}</p>`:``}
      <a class="pipeline-row pipeline-phone" href="tel:${e.phone}">
        <span class="icon">${u.phone}</span>
        <span dir="ltr">${e.phone}</span>
      </a>
      <div class="pipeline-estimate">${J(e.estimateAvg)}</div>
      <div class="portal-actions">
        ${n?`<a class="btn btn-secondary btn-sm" href="${n}" target="_blank" rel="noopener">مسیریابی به مبدأ</a>`:``}
        ${r?`<a class="btn btn-secondary btn-sm" href="${r}" target="_blank" rel="noopener">مسیریابی به مقصد</a>`:``}
        ${t?`<button type="button" class="btn btn-primary btn-sm" data-advance-id="${e.id}" data-advance-status="${t.next}">${t.label}</button>`:``}
      </div>
    </div>
  `}function pr(e){return`
    <div class="portal-shell">
      <header class="portal-header">
        <div class="admin-logo">
          <img class="admin-logo-mark" src="/favicon.svg" alt="" />
          <span id="staff-portal-brand-text">بهبار</span>
        </div>
        <div class="portal-user">
          <span>${e.fullName}</span>
          <button type="button" class="btn btn-secondary btn-sm" id="portal-wallet-btn">
            <span class="icon">${u.wallet}</span>
            کیف پول من
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="portal-logout-btn">
            <span class="icon">${u.logout}</span>
            خروج
          </button>
        </div>
      </header>
      ${e.licenseLocked?It():``}
      ${e.username===`test`?Lt():``}
      <main class="portal-main">
        <div id="portal-jobs-container">
          <div class="view-header">
            <h1>کارهای فعال</h1>
            <button type="button" class="btn btn-secondary" id="portal-refresh">
              <span class="icon">${u.refresh}</span>
              به‌روزرسانی
            </button>
          </div>
          <p class="error-text" id="portal-error" hidden></p>
          <div class="portal-list" id="portal-list"></div>

          <div class="view-header" style="margin-top:var(--space-6)">
            <h1>تاریخچه خدمات و کارها</h1>
          </div>
          <div class="stat-cards" id="portal-history-stats"></div>
          <div class="portal-list" id="portal-history-list"></div>
        </div>
        <div id="portal-wallet-container" hidden>
          <button type="button" class="btn btn-ghost btn-sm" id="portal-back-to-jobs-btn" style="margin-bottom: var(--space-4)">بازگشت به کارها</button>
          <div id="portal-wallet-mount"></div>
        </div>
      </main>
    </div>
  `}var mr=new Set([`pending`,`contacted`,`scheduled`,`in_progress`]);function hr(e){let t=document.getElementById(`portal-error`),n=document.getElementById(`portal-list`),r=document.getElementById(`portal-history-stats`),i=document.getElementById(`portal-history-list`),a=document.getElementById(`portal-refresh`),o=document.getElementById(`portal-logout-btn`);if(!t||!n||!r||!i||!a||!o)return;async function s(){t.hidden=!0;try{let e=await le(),t=e.filter(e=>mr.has(e.status)),a=e.filter(e=>!mr.has(e.status)),o=a.filter(e=>e.status===`completed`).length;n.innerHTML=t.length?t.map(fr).join(``):`<p class="portal-empty">در حال حاضر کاری در جریان ندارید.</p>`,r.innerHTML=`
        <div class="stat-card">
          <span class="stat-card-label">کل خدمات ارائه‌شده</span>
          <span class="stat-card-value">${q(e.length)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card-label">انجام‌شده</span>
          <span class="stat-card-value">${q(o)}</span>
        </div>
      `,i.innerHTML=a.length?a.map(fr).join(``):`<p class="portal-empty">هنوز کاری در تاریخچه‌ی شما ثبت نشده است.</p>`,c()}catch(e){t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function c(){n.querySelectorAll(`[data-advance-id]`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.advanceId),r=e.dataset.advanceStatus;e.disabled=!0;try{await ue(n,r),await s()}catch(n){t.hidden=!1,t.textContent=n instanceof Error?n.message:`به‌روزرسانی ناموفق بود.`,e.disabled=!1}})})}a.addEventListener(`click`,()=>void s()),o.addEventListener(`click`,e),s();let l=document.getElementById(`portal-jobs-container`),u=document.getElementById(`portal-wallet-container`),d=document.getElementById(`portal-wallet-mount`),f=document.getElementById(`portal-wallet-btn`),p=document.getElementById(`portal-back-to-jobs-btn`),m=!1;f?.addEventListener(`click`,()=>{!l||!u||!d||(l.hidden=!0,u.hidden=!1,m||(m=!0,d.innerHTML=or(),lr()))}),p?.addEventListener(`click`,()=>{!l||!u||(u.hidden=!0,l.hidden=!1)})}function gr(e){return`
    <tr data-article-row="${e.id}">
      <td>${e.title||`(بدون عنوان)`}</td>
      <td>${e.category||`—`}</td>
      <td>
        <span class="article-status-badge article-status-${e.status}">
          ${e.status===`published`?`منتشرشده`:`پیش‌نویس`}
        </span>
      </td>
      <td>${q(e.readingTime)} دقیقه</td>
      <td>
        <div class="staff-table-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-edit-article="${e.id}">ویرایش</button>
          <button type="button" class="btn btn-ghost btn-sm" data-delete-article="${e.id}">حذف</button>
        </div>
      </td>
    </tr>
  `}function _r(){return`
    <div class="view-header">
      <h1>مجله</h1>
      <button type="button" class="btn btn-primary" id="magazine-new-btn">
        <span class="icon">${u.plusCircle}</span>
        مقاله جدید
      </button>
    </div>
    <p class="error-text" id="magazine-list-error" hidden></p>
    <div class="staff-table-wrapper">
      <table class="staff-table">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>دسته</th>
            <th>وضعیت</th>
            <th>زمان مطالعه</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="magazine-table-body"></tbody>
      </table>
    </div>
  `}function vr(e){let t=document.getElementById(`magazine-list-error`),n=document.getElementById(`magazine-table-body`),r=document.getElementById(`magazine-new-btn`);if(!t||!n||!r)return;async function i(){t.hidden=!0;try{let e=await de();n.innerHTML=e.length?e.map(gr).join(``):`<tr><td colspan="5" class="staff-table-empty">هنوز مقاله‌ای ثبت نشده است.</td></tr>`,a()}catch(e){t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function a(){n.querySelectorAll(`[data-edit-article]`).forEach(t=>{t.addEventListener(`click`,()=>e(Number(t.dataset.editArticle)))}),n.querySelectorAll(`[data-delete-article]`).forEach(e=>{e.addEventListener(`click`,async()=>{if(window.confirm(`این مقاله برای همیشه حذف شود؟`)){e.disabled=!0;try{await he(Number(e.dataset.deleteArticle)),await i()}catch(n){t.hidden=!1,t.textContent=n instanceof Error?n.message:`حذف ناموفق بود.`,e.disabled=!1}}})})}r.addEventListener(`click`,()=>e(null)),i()}var yr=[{value:`P`,label:`متن ساده`,labelEn:`Paragraph`},{value:`H1`,label:`سرتیتر ۱`,labelEn:`Heading 1`},{value:`H2`,label:`سرتیتر ۲`,labelEn:`Heading 2`},{value:`H3`,label:`سرتیتر ۳`,labelEn:`Heading 3`},{value:`H4`,label:`سرتیتر ۴`,labelEn:`Heading 4`},{value:`H5`,label:`سرتیتر ۵`,labelEn:`Heading 5`},{value:`H6`,label:`سرتیتر ۶`,labelEn:`Heading 6`},{value:`BLOCKQUOTE`,label:`نقل‌قول`,labelEn:`Quote`}];function br(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function xr(e,t,n){return`
    <div class="rte">
      <div class="rte-toolbar">
        <div class="rte-format-select-wrap">
          <select class="rte-format-select" data-rte-format title="${n===`rtl`?`قالب متن`:`Text format`}">
            ${yr.map(e=>`<option value="${e.value}">${n===`rtl`?e.label:e.labelEn}</option>`).join(``)}
          </select>
          <span class="rte-format-select-label" data-rte-format-label aria-hidden="true">${n===`rtl`?yr[0].label:yr[0].labelEn}</span>
        </div>
        <span class="rte-sep"></span>
        <button type="button" class="rte-btn rte-btn-glyph" data-rte-cmd="bold" title="ضخیم"><b>B</b></button>
        <button type="button" class="rte-btn rte-btn-glyph" data-rte-cmd="italic" title="مورب"><i>I</i></button>
        <button type="button" class="rte-btn rte-btn-glyph" data-rte-cmd="underline" title="زیرخط"><u>U</u></button>
        <button type="button" class="rte-btn rte-btn-glyph" data-rte-cmd="strikeThrough" title="خط‌خورده"><s>S</s></button>
        <span class="rte-sep"></span>
        <label class="rte-color-btn" title="رنگ متن">
          <span class="rte-color-swatch" data-rte-swatch="foreColor">A</span>
          <input type="color" data-rte-color="foreColor" value="#1c1b18" />
        </label>
        <label class="rte-color-btn" title="رنگ پس‌زمینه متن">
          <span class="rte-color-swatch" data-rte-swatch="hiliteColor">A</span>
          <input type="color" data-rte-color="hiliteColor" value="#fff59d" />
        </label>
        <span class="rte-sep"></span>
        <button type="button" class="rte-btn" data-rte-cmd="insertUnorderedList" title="لیست نقطه‌ای">${u.listBullet}</button>
        <button type="button" class="rte-btn" data-rte-cmd="insertOrderedList" title="لیست شماره‌دار">${u.listNumber}</button>
        <span class="rte-sep"></span>
        <button type="button" class="rte-btn" data-rte-cmd="justifyRight" title="راست‌چین">${u.alignRight}</button>
        <button type="button" class="rte-btn" data-rte-cmd="justifyCenter" title="وسط‌چین">${u.alignCenter}</button>
        <button type="button" class="rte-btn" data-rte-cmd="justifyLeft" title="چپ‌چین">${u.alignLeft}</button>
        <span class="rte-sep"></span>
        <button type="button" class="rte-btn" data-rte-action="link" title="افزودن/ویرایش لینک">${u.link}</button>
        <button type="button" class="rte-btn" data-rte-cmd="unlink" title="حذف لینک">${u.unlink}</button>
        <button type="button" class="rte-btn" data-rte-cmd="formatBlock" data-rte-cmd-value="BLOCKQUOTE" title="نقل‌قول">${u.quote}</button>
        <button type="button" class="rte-btn" data-rte-cmd="insertHorizontalRule" title="خط جداکننده">${u.minus}</button>
        <button type="button" class="rte-btn" data-rte-action="image" title="افزودن تصویر">${u.image}</button>
        <span class="rte-sep"></span>
        <button type="button" class="rte-btn" data-rte-cmd="removeFormat" title="پاک‌کردن قالب‌بندی">${u.eraser}</button>
        <button type="button" class="rte-btn" data-rte-cmd="undo" title="واگرد">${u.undo}</button>
        <button type="button" class="rte-btn" data-rte-cmd="redo" title="ازنو">${u.redo}</button>

        <div class="rte-link-popover" data-rte-link-popover hidden>
          <div class="form-field">
            <label>آدرس لینک</label>
            <input type="url" dir="ltr" placeholder="https://..." data-rte-link-url />
          </div>
          <label class="rte-checkbox"><input type="checkbox" data-rte-link-blank /> باز شدن در تب جدید</label>
          <label class="rte-checkbox"><input type="checkbox" data-rte-link-nofollow /> nofollow (این لینک دنبال نشود)</label>
          <div class="rte-link-popover-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-rte-link-cancel>انصراف</button>
            <button type="button" class="btn btn-primary btn-sm" data-rte-link-apply>اعمال</button>
          </div>
        </div>
      </div>
      <input type="file" accept="image/*" hidden data-rte-image-input />
      <textarea data-field="${e}" hidden>${br(t)}</textarea>
      <div class="rte-content" contenteditable="true" dir="${n}" data-rte-content>${t||`<p><br></p>`}</div>
    </div>
  `}var Sr=new WeakMap;function Cr(e){return e?.closest(`.rte`)??null}function wr(e){return e.querySelector(`[data-rte-content]`)}function Tr(e){let t=window.getSelection();t&&t.rangeCount>0&&e.contains(t.anchorNode)&&Sr.set(e,t.getRangeAt(0).cloneRange())}function Er(e){let t=Sr.get(e);if(!t)return;let n=window.getSelection();n?.removeAllRanges(),n?.addRange(t)}function Dr(e){let t=wr(e),n=e.querySelector(`textarea[data-field]`);t&&n&&(n.value=t.innerHTML===`<p><br></p>`?``:t.innerHTML)}function Or(e){let t=window.getSelection();if(!t||!t.anchorNode)return null;let n=(t.anchorNode.nodeType===3?t.anchorNode.parentElement:t.anchorNode)?.closest(`a`)??null;return n&&e.contains(n)?n:null}function kr(e){e.addEventListener(`input`,e=>{let t=e.target.closest(`[data-rte-content]`);if(!t)return;let n=Cr(t);n&&Dr(n)}),e.addEventListener(`mouseup`,e=>{let t=e.target.closest(`[data-rte-content]`);t&&Tr(t)}),e.addEventListener(`keyup`,e=>{let t=e.target.closest(`[data-rte-content]`);t&&Tr(t)}),e.addEventListener(`mousedown`,e=>{let t=e.target;if(t.closest(`[data-rte-cmd], [data-rte-action]`)){e.preventDefault();return}let n=t.closest(`.rte-color-btn`);if(n){let e=Cr(n),t=e&&wr(e);t&&Tr(t)}}),e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-rte-cmd]`);if(n){let e=Cr(n),t=e&&wr(e);if(!t)return;t.focus(),document.execCommand(n.dataset.rteCmd,!1,n.dataset.rteCmdValue??void 0),Dr(e);return}let r=t.closest(`[data-rte-link-cancel]`);if(r){Cr(r)?.querySelector(`[data-rte-link-popover]`)?.setAttribute(`hidden`,``);return}let i=t.closest(`[data-rte-link-apply]`);if(i){let e=Cr(i),t=e&&wr(e),n=e?.querySelector(`[data-rte-link-popover]`);if(!e||!t||!n)return;let r=n.querySelector(`[data-rte-link-url]`),a=n.querySelector(`[data-rte-link-blank]`),o=n.querySelector(`[data-rte-link-nofollow]`),s=r.value.trim();if(n.hidden=!0,!s)return;t.focus(),Er(t),document.execCommand(`createLink`,!1,s);let c=Or(t)??Array.from(t.querySelectorAll(`a[href]`)).find(e=>e.getAttribute(`href`)===s);if(c){let e=[];a.checked?(c.setAttribute(`target`,`_blank`),e.push(`noopener`)):c.removeAttribute(`target`),o.checked&&e.push(`nofollow`),e.length?c.setAttribute(`rel`,e.join(` `)):c.removeAttribute(`rel`)}Dr(e);return}let a=t.closest(`[data-rte-action]`);if(a){let e=Cr(a),t=e&&wr(e);if(!e||!t)return;if(a.dataset.rteAction===`link`){Tr(t);let n=e.querySelector(`[data-rte-link-popover]`),r=n.querySelector(`[data-rte-link-url]`),i=n.querySelector(`[data-rte-link-blank]`),a=n.querySelector(`[data-rte-link-nofollow]`),o=Or(t);r.value=o?.getAttribute(`href`)??``,i.checked=o?.getAttribute(`target`)===`_blank`,a.checked=(o?.getAttribute(`rel`)??``).includes(`nofollow`),n.hidden=!1,r.focus()}else a.dataset.rteAction===`image`&&(Tr(t),e.querySelector(`[data-rte-image-input]`)?.click())}}),e.addEventListener(`change`,e=>{let t=e.target,n=t.closest(`[data-rte-format]`);if(n){let e=Cr(n),t=e&&wr(e);if(!t)return;let r=e.querySelector(`[data-rte-format-label]`);r&&(r.textContent=n.options[n.selectedIndex]?.textContent??``),t.focus(),Er(t),document.execCommand(`formatBlock`,!1,`<${n.value}>`),Dr(e);return}let r=t.closest(`[data-rte-color]`);if(r){let e=Cr(r),t=e&&wr(e);if(!t)return;t.focus(),Er(t),document.execCommand(r.dataset.rteColor,!1,r.value),Dr(e);return}let i=t.closest(`[data-rte-image-input]`);if(i){let e=Cr(i),t=e&&wr(e),n=i.files?.[0];if(!e||!t||!n)return;Se(n).then(n=>{t.focus(),Er(t),document.execCommand(`insertImage`,!1,n),Dr(e)}).finally(()=>{i.value=``})}})}var Ar={richtext:`متن`,heading:`سرتیتر`,paragraph:`پاراگراف`,list:`لیست`,image:`تصویر`,video:`ویدئو`};function jr(e){return e===`richtext`?{type:`richtext`,html:``,htmlEn:``}:e===`heading`?{type:`heading`,text:``,textEn:``}:e===`paragraph`?{type:`paragraph`,text:``,textEn:``}:e===`list`?{type:`list`,items:[],itemsEn:[]}:e===`image`?{type:`image`,url:``,caption:``,captionEn:``}:{type:`video`,url:``}}function Mr(e,t){let n=`
    <div class="block-editor-head">
      <span class="block-editor-type">${Ar[e.type]}</span>
      <div class="block-editor-actions">
        <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-block-action="up" data-index="${t}" title="بالا">▲</button>
        <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-block-action="down" data-index="${t}" title="پایین">▼</button>
        <button type="button" class="btn btn-ghost btn-sm" data-block-action="remove" data-index="${t}">حذف</button>
      </div>
    </div>
  `,r=``;return e.type===`richtext`?r=`
      <div data-i18n="fa">${xr(`html`,e.html,`rtl`)}</div>
      <div data-i18n="en">${xr(`htmlEn`,e.htmlEn,`ltr`)}</div>
    `:e.type===`heading`?r=`
      <input type="text" data-field="text" data-i18n="fa" placeholder="متن سرتیتر (فارسی)" value="${Pr(e.text)}" />
      <input type="text" data-field="textEn" data-i18n="en" dir="ltr" placeholder="Heading text (English)" value="${Pr(e.textEn)}" />
    `:e.type===`paragraph`?r=`
      <textarea data-field="text" data-i18n="fa" placeholder="متن پاراگراف (فارسی)" rows="3">${Nr(e.text)}</textarea>
      <textarea data-field="textEn" data-i18n="en" dir="ltr" placeholder="Paragraph text (English)" rows="3">${Nr(e.textEn)}</textarea>
    `:e.type===`list`?r=`
      <textarea data-field="items" data-i18n="fa" placeholder="هر مورد در یک خط (فارسی)" rows="4">${Nr(e.items.join(`
`))}</textarea>
      <textarea data-field="itemsEn" data-i18n="en" dir="ltr" placeholder="One item per line (English)" rows="4">${Nr(e.itemsEn.join(`
`))}</textarea>
    `:e.type===`image`?r=`
      <div class="block-image-upload">
        ${e.url?`<img src="${Pr(e.url)}" alt="" class="block-image-preview" />`:`<span class="block-image-placeholder">تصویری انتخاب نشده</span>`}
        <input type="file" accept="image/*" data-image-upload hidden />
        <button type="button" class="btn btn-secondary btn-sm" data-image-upload-btn>انتخاب تصویر</button>
      </div>
      <input type="hidden" data-field="url" value="${Pr(e.url)}" />
      <input type="text" data-field="caption" data-i18n="fa" placeholder="زیرنویس تصویر (فارسی)" value="${Pr(e.caption)}" />
      <input type="text" data-field="captionEn" data-i18n="en" dir="ltr" placeholder="Image caption (English)" value="${Pr(e.captionEn)}" />
    `:e.type===`video`&&(r=`
      <input type="url" data-field="url" dir="ltr" placeholder="https://www.youtube.com/watch?v=..." value="${Pr(e.url)}" />
    `),`<div class="block-editor" data-block-index="${t}" data-block-type="${e.type}">${n}<div class="block-editor-body">${r}</div></div>`}function Nr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Pr(e){return Nr(e).replace(/"/g,`&quot;`)}function Fr(){return`
    <div class="view-header">
      <h1 id="editor-title-label">مقاله جدید</h1>
      <div class="editor-header-actions">
        <span class="article-status-badge" id="editor-status-badge" hidden></span>
        <button type="button" class="btn btn-secondary" id="editor-back-btn">بازگشت به لیست</button>
      </div>
    </div>
    <p class="error-text" id="editor-error" hidden></p>

    <div class="editor-grid">
      <div class="editor-main">
        <div class="form-field" data-i18n="fa">
          <label for="editor-title">عنوان (فارسی)</label>
          <input type="text" id="editor-title" />
        </div>
        <div class="form-field" data-i18n="en">
          <label for="editor-title-en">عنوان (انگلیسی)</label>
          <input type="text" id="editor-title-en" dir="ltr" />
        </div>
        <div class="form-field" data-i18n="fa">
          <label for="editor-excerpt">خلاصه (فارسی)</label>
          <textarea id="editor-excerpt" rows="2"></textarea>
        </div>
        <div class="form-field" data-i18n="en">
          <label for="editor-excerpt-en">خلاصه (انگلیسی)</label>
          <textarea id="editor-excerpt-en" dir="ltr" rows="2"></textarea>
        </div>

        <h2 class="editor-section-title">محتوا</h2>
        <div id="editor-blocks"></div>
        <div class="block-add-row">
          <select id="editor-add-block-type">
            <option value="richtext">متن</option>
            <option value="image">تصویر</option>
            <option value="video">ویدئو</option>
          </select>
          <button type="button" class="btn btn-secondary" id="editor-add-block-btn">
            <span class="icon">${u.plusCircle}</span>
            افزودن بلوک
          </button>
        </div>
      </div>

      <aside class="editor-sidebar">
        <div class="editor-sidebar-card">
          <h3>انتشار</h3>
          <button type="button" class="btn btn-secondary btn-block" id="editor-save-draft-btn">ذخیره پیش‌نویس</button>
          <button type="button" class="btn btn-primary btn-block" id="editor-publish-btn">انتشار</button>
          <button type="button" class="btn btn-ghost btn-block" id="editor-unpublish-btn" hidden>بازگرداندن به پیش‌نویس</button>
        </div>

        <div class="editor-sidebar-card">
          <h3>دسته‌بندی</h3>
          <div class="form-field" data-i18n="fa">
            <label for="editor-category">دسته (فارسی)</label>
            <input type="text" id="editor-category" />
          </div>
          <div class="form-field" data-i18n="en">
            <label for="editor-category-en">دسته (انگلیسی)</label>
            <input type="text" id="editor-category-en" dir="ltr" />
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>تصویر کاور</h3>
          <div class="block-image-upload">
            <img id="editor-cover-preview" alt="" class="block-image-preview" hidden />
            <span id="editor-cover-placeholder" class="block-image-placeholder">تصویری انتخاب نشده</span>
            <input type="file" accept="image/*" id="editor-cover-upload" hidden />
            <button type="button" class="btn btn-secondary btn-sm" id="editor-cover-upload-btn">انتخاب تصویر</button>
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>سئو</h3>
          <div class="form-field">
            <label for="editor-slug">نامک (Slug)</label>
            <input type="text" id="editor-slug" dir="ltr" placeholder="auto" />
          </div>
          <div class="form-field">
            <label for="editor-meta-title">عنوان متا</label>
            <input type="text" id="editor-meta-title" />
          </div>
          <div class="form-field">
            <label for="editor-meta-description">توضیحات متا</label>
            <textarea id="editor-meta-description" rows="3"></textarea>
          </div>
        </div>
      </aside>
    </div>
  `}function Ir(e,t){let n=document.getElementById(`editor-error`),r=document.getElementById(`editor-title-label`),i=document.getElementById(`editor-status-badge`),a=document.getElementById(`editor-back-btn`),o=document.getElementById(`editor-title`),s=document.getElementById(`editor-title-en`),c=document.getElementById(`editor-excerpt`),l=document.getElementById(`editor-excerpt-en`),u=document.getElementById(`editor-category`),d=document.getElementById(`editor-category-en`),f=document.getElementById(`editor-slug`),p=document.getElementById(`editor-meta-title`),m=document.getElementById(`editor-meta-description`),h=document.getElementById(`editor-blocks`),g=document.getElementById(`editor-add-block-type`),_=document.getElementById(`editor-add-block-btn`),v=document.getElementById(`editor-save-draft-btn`),y=document.getElementById(`editor-publish-btn`),b=document.getElementById(`editor-unpublish-btn`),x=document.getElementById(`editor-cover-preview`),S=document.getElementById(`editor-cover-placeholder`),C=document.getElementById(`editor-cover-upload`),w=document.getElementById(`editor-cover-upload-btn`);if(!n||!r||!i||!a||!o||!s||!c||!l||!u||!d||!f||!p||!m||!h||!g||!_||!v||!y||!b||!x||!S||!C||!w)return;let T=[],E=null,D=null;Wn().then(()=>{Q(document.getElementById(`view-container`)??document.body)}),kr(h);function O(){h.innerHTML=T.map(Mr).join(``)||`<p class="editor-empty-blocks">هنوز بلوکی اضافه نشده است.</p>`,Q(h)}function ee(){return Array.from(h.querySelectorAll(`[data-block-index]`)).map(e=>{let t=e.dataset.blockType,n=t=>e.querySelector(`[data-field="${t}"]`)?.value??``;return t===`richtext`?{type:t,html:n(`html`),htmlEn:n(`htmlEn`)}:t===`heading`||t===`paragraph`?{type:t,text:n(`text`),textEn:n(`textEn`)}:t===`list`?{type:t,items:n(`items`).split(`
`).map(e=>e.trim()).filter(Boolean),itemsEn:n(`itemsEn`).split(`
`).map(e=>e.trim()).filter(Boolean)}:t===`image`?{type:t,url:n(`url`),caption:n(`caption`),captionEn:n(`captionEn`)}:{type:`video`,url:n(`url`)}})}function k(e){E=e,e?(x.src=e,x.hidden=!1,S.hidden=!0):(x.hidden=!0,S.hidden=!1)}function A(e){if(!e){i.hidden=!0,b.hidden=!0;return}i.hidden=!1,i.textContent=e===`published`?`منتشرشده`:`پیش‌نویس`,i.className=`article-status-badge article-status-${e}`,b.hidden=e!==`published`}async function j(){if(e===null){r.textContent=`مقاله جدید`,T=[jr(`richtext`)],O(),A(null);return}try{let t=(await de()).find(t=>t.id===e);if(!t){n.hidden=!1,n.textContent=`مقاله پیدا نشد.`;return}D=t,r.textContent=t.title||`ویرایش مقاله`,o.value=t.title,s.value=t.titleEn,c.value=t.excerpt,l.value=t.excerptEn,u.value=t.category,d.value=t.categoryEn,f.value=t.slug,p.value=t.metaTitle??``,m.value=t.metaDescription??``,k(t.coverImageUrl),T=t.content.length?t.content:[jr(`richtext`)],O(),A(t.status)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}function te(){return{title:o.value.trim(),titleEn:s.value.trim(),excerpt:c.value.trim(),excerptEn:l.value.trim(),category:u.value.trim(),categoryEn:d.value.trim(),coverImageUrl:E,content:ee(),metaTitle:p.value.trim(),metaDescription:m.value.trim(),slug:f.value.trim()||void 0}}async function M(){if(n.hidden=!0,!o.value.trim())return n.hidden=!1,n.textContent=`عنوان مقاله الزامی است.`,null;let t=te();try{let n=D?await pe(D.id,t):await fe(t);return D=n,e=n.id,f.value=n.slug,r.textContent=n.title,A(n.status),n}catch(e){return n.hidden=!1,n.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`,null}}h.addEventListener(`click`,e=>{let t=e.target.closest(`[data-block-action]`);if(!t)return;T=ee();let n=Number(t.dataset.index),r=t.dataset.blockAction;r===`remove`?T.splice(n,1):r===`up`&&n>0?[T[n-1],T[n]]=[T[n],T[n-1]]:r===`down`&&n<T.length-1&&([T[n+1],T[n]]=[T[n],T[n+1]]),O()}),h.addEventListener(`click`,e=>{let t=e.target.closest(`[data-image-upload-btn]`);t&&t.closest(`.block-editor`)?.querySelector(`[data-image-upload]`)?.click()}),h.addEventListener(`change`,async e=>{let t=e.target;if(!t.matches(`[data-image-upload]`))return;let r=t.files?.[0];if(!r)return;let i=t.closest(`.block-editor`);if(i)try{let e=await Se(r),t=i.querySelector(`[data-field="url"]`);t&&(t.value=e);let n=i.querySelector(`.block-image-preview`),a=i.querySelector(`.block-image-placeholder`);n?(n.src=e,n.hidden=!1):i.querySelector(`.block-image-upload`)?.insertAdjacentHTML(`afterbegin`,`<img src="${e}" alt="" class="block-image-preview" />`),a&&(a.hidden=!0)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`آپلود ناموفق بود.`}}),_.addEventListener(`click`,()=>{T=ee(),T.push(jr(g.value)),O()}),w.addEventListener(`click`,()=>C.click()),C.addEventListener(`change`,async()=>{let e=C.files?.[0];if(e)try{k(await Se(e))}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`آپلود ناموفق بود.`}}),v.addEventListener(`click`,async()=>{v.disabled=!0,v.textContent=`در حال ذخیره...`,await M(),v.disabled=!1,v.textContent=`ذخیره پیش‌نویس`}),y.addEventListener(`click`,async()=>{y.disabled=!0;let e=await M();if(e)try{A((await me(e.id,!0)).status)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`انتشار ناموفق بود.`}y.disabled=!1}),b.addEventListener(`click`,async()=>{if(D){b.disabled=!0;try{A((await me(D.id,!1)).status)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`به‌روزرسانی ناموفق بود.`}b.disabled=!1}}),a.addEventListener(`click`,t),j()}var Lr={richtext:`متن پیشرفته`,heading:`سرتیتر`,paragraph:`پاراگراف`,list:`لیست`,image:`تصویر`,video:`ویدئو`};function Rr(e){return e===`richtext`?{type:`richtext`,html:``,htmlEn:``}:e===`heading`?{type:`heading`,text:``,textEn:``}:e===`paragraph`?{type:`paragraph`,text:``,textEn:``}:e===`list`?{type:`list`,items:[],itemsEn:[]}:e===`image`?{type:`image`,url:``,caption:``,captionEn:``}:{type:`video`,url:``}}function zr(e,t){let n=`
    <div class="block-editor-head">
      <span class="block-editor-type">${Lr[e.type]||e.type}</span>
      <div class="block-editor-actions">
        <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-block-action="up" data-index="${t}" title="بالا">▲</button>
        <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-block-action="down" data-index="${t}" title="پایین">▼</button>
        <button type="button" class="btn btn-ghost btn-sm" data-block-action="remove" data-index="${t}">حذف</button>
      </div>
    </div>
  `,r=``;return e.type===`richtext`?r=`
      <div data-i18n="fa">${xr(`html`,e.html,`rtl`)}</div>
      <div data-i18n="en">${xr(`htmlEn`,e.htmlEn,`ltr`)}</div>
    `:e.type===`heading`?r=`
      <input type="text" data-field="text" data-i18n="fa" placeholder="متن سرتیتر (فارسی)" value="${Vr(e.text)}" />
      <input type="text" data-field="textEn" data-i18n="en" dir="ltr" placeholder="Heading text (English)" value="${Vr(e.textEn)}" />
    `:e.type===`paragraph`?r=`
      <textarea data-field="text" data-i18n="fa" placeholder="متن پاراگراف (فارسی)" rows="3">${Br(e.text)}</textarea>
      <textarea data-field="textEn" data-i18n="en" dir="ltr" placeholder="Paragraph text (English)" rows="3">${Br(e.textEn)}</textarea>
    `:e.type===`list`?r=`
      <textarea data-field="items" data-i18n="fa" placeholder="هر مورد در یک خط (فارسی)" rows="4">${Br(e.items.join(`
`))}</textarea>
      <textarea data-field="itemsEn" data-i18n="en" dir="ltr" placeholder="One item per line (English)" rows="4">${Br(e.itemsEn.join(`
`))}</textarea>
    `:e.type===`image`?r=`
      <div class="block-image-upload">
        ${e.url?`<img src="${Vr(e.url)}" alt="" class="block-image-preview" />`:`<span class="block-image-placeholder">تصویری انتخاب نشده</span>`}
        <input type="file" accept="image/*" data-image-upload hidden />
        <button type="button" class="btn btn-secondary btn-sm" data-image-upload-btn>انتخاب تصویر</button>
      </div>
      <input type="hidden" data-field="url" value="${Vr(e.url)}" />
      <input type="text" data-field="caption" data-i18n="fa" placeholder="زیرنویس تصویر (فارسی)" value="${Vr(e.caption)}" />
      <input type="text" data-field="captionEn" data-i18n="en" dir="ltr" placeholder="Image caption (English)" value="${Vr(e.captionEn)}" />
    `:e.type===`video`&&(r=`
      <input type="url" data-field="url" dir="ltr" placeholder="https://www.aparat.com/v/... یا https://www.youtube.com/watch?v=..." value="${Vr(e.url)}" />
    `),`<div class="block-editor" data-block-index="${t}" data-block-type="${e.type}">${n}<div class="block-editor-body">${r}</div></div>`}function Br(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Vr(e){return Br(e).replace(/"/g,`&quot;`)}function Hr(){return`
    <div class="view-header">
      <div>
        <h1 id="page-editor-title-label">برگه جدید</h1>
        <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-top: 4px;">طراحی برگه دلخواه برای سایت بهبار</p>
      </div>
      <div class="editor-header-actions">
        <span class="article-status-badge" id="page-editor-status-badge" hidden></span>
        <button type="button" class="btn btn-secondary" id="page-editor-back-btn">بازگشت به صفحات سایت</button>
      </div>
    </div>
    <p class="error-text" id="page-editor-error" hidden></p>

    <div class="editor-grid">
      <div class="editor-main">
        <div class="form-field" data-i18n="fa">
          <label for="page-editor-title">عنوان برگه (فارسی) *</label>
          <input type="text" id="page-editor-title" placeholder="مثلاً: خدمات ویژه اسباب‌کشی VIP یا قوانین استرداد" />
        </div>
        <div class="form-field" data-i18n="en">
          <label for="page-editor-title-en">عنوان برگه (انگلیسی)</label>
          <input type="text" id="page-editor-title-en" dir="ltr" placeholder="e.g. VIP Moving Services" />
        </div>
        <div class="form-field" data-i18n="fa">
          <label for="page-editor-excerpt">توضیح کوتاه / خلاصه (فارسی)</label>
          <textarea id="page-editor-excerpt" rows="2" placeholder="توضیح مختصر درباره این صفحه"></textarea>
        </div>
        <div class="form-field" data-i18n="en">
          <label for="page-editor-excerpt-en">توضیح کوتاه (انگلیسی)</label>
          <textarea id="page-editor-excerpt-en" dir="ltr" rows="2"></textarea>
        </div>

        <h2 class="editor-section-title" style="margin-top: 2rem;">بخش‌های محتوایی برگه</h2>
        <div id="page-editor-blocks"></div>
        <div class="block-add-row">
          <select id="page-editor-add-block-type">
            <option value="richtext">متن با ویرایشگر پیشرفته (RichText)</option>
            <option value="heading">سرتیتر (Heading)</option>
            <option value="paragraph">پاراگراف متنی</option>
            <option value="list">لیست آیتم‌ها</option>
            <option value="image">تصویر با زیرنویس</option>
            <option value="video">ویدئو (آپارات یا یوتیوب)</option>
          </select>
          <button type="button" class="btn btn-secondary" id="page-editor-add-block-btn">
            <span class="icon">${u.plusCircle}</span>
            افزودن بلوک
          </button>
        </div>
      </div>

      <aside class="editor-sidebar">
        <div class="editor-sidebar-card">
          <h3>وضعیت و انتشار</h3>
          <button type="button" class="btn btn-secondary btn-block" id="page-editor-save-draft-btn">ذخیره پیش‌نویس</button>
          <button type="button" class="btn btn-primary btn-block" id="page-editor-publish-btn">انتشار برگه</button>
          <button type="button" class="btn btn-ghost btn-block" id="page-editor-unpublish-btn" hidden>بازگرداندن به پیش‌نویس</button>
          <div id="page-live-link-container" style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border); font-size: 0.85rem;" hidden>
            <span style="color: var(--color-text-muted); display: block; margin-bottom: 4px;">پیوند برگه:</span>
            <a id="page-live-link" href="#" target="_blank" style="color: var(--color-primary); word-break: break-all; font-weight: 500;"></a>
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>موقعیت نمایش در سایت</h3>
          <p class="settings-panel-hint" style="margin: 0 0 12px 0;">
            مشخص کنید لینک این برگه در کدام بخش‌های عمومی نمایش یابد:
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" id="page-editor-show-header" />
              <span>نمایش در هدر سایت</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" id="page-editor-show-footer" />
              <span>نمایش در فوتر سایت</span>
            </label>
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>پیوند یکتا (Slug / URL)</h3>
          <div class="form-field">
            <label for="page-editor-slug">پیوند صفحه (انگلیسی یا فارسی)</label>
            <input type="text" id="page-editor-slug" dir="ltr" placeholder="مثال: vip-moving یا privacy" />
            <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-top: 4px;">
              آدرس صفحه به شکل <code>behbarapp.ir/p/slug</code> خواهد بود.
            </span>
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>تصویر شاخص برگه</h3>
          <div class="block-image-upload">
            <img id="page-editor-cover-preview" alt="" class="block-image-preview" hidden />
            <span id="page-editor-cover-placeholder" class="block-image-placeholder">تصویری انتخاب نشده</span>
            <input type="file" accept="image/*" id="page-editor-cover-upload" hidden />
            <button type="button" class="btn btn-secondary btn-sm" id="page-editor-cover-upload-btn">انتخاب تصویر</button>
            <button type="button" class="btn btn-ghost btn-sm" id="page-editor-cover-remove-btn" hidden>حذف تصویر</button>
          </div>
        </div>

        <div class="editor-sidebar-card">
          <h3>بهینه‌سازی سئو (SEO)</h3>
          <div class="form-field">
            <label for="page-editor-meta-title">عنوان متا (Meta Title)</label>
            <input type="text" id="page-editor-meta-title" placeholder="پیش‌فرض: عنوان برگه" />
          </div>
          <div class="form-field">
            <label for="page-editor-meta-description">توضیحات متا (Meta Description)</label>
            <textarea id="page-editor-meta-description" rows="3" placeholder="توضیحات برای موتورهای جستجو"></textarea>
          </div>
        </div>
      </aside>
    </div>
  `}function Ur(e,t){let n=document.getElementById(`page-editor-error`),r=document.getElementById(`page-editor-title-label`),i=document.getElementById(`page-editor-status-badge`),a=document.getElementById(`page-editor-back-btn`),o=document.getElementById(`page-editor-title`),s=document.getElementById(`page-editor-title-en`),c=document.getElementById(`page-editor-excerpt`),l=document.getElementById(`page-editor-excerpt-en`),u=document.getElementById(`page-editor-slug`),d=document.getElementById(`page-editor-meta-title`),f=document.getElementById(`page-editor-meta-description`),p=document.getElementById(`page-editor-blocks`),m=document.getElementById(`page-editor-add-block-type`),h=document.getElementById(`page-editor-add-block-btn`),g=document.getElementById(`page-editor-save-draft-btn`),_=document.getElementById(`page-editor-publish-btn`),v=document.getElementById(`page-editor-unpublish-btn`),y=document.getElementById(`page-live-link-container`),b=document.getElementById(`page-live-link`),x=document.getElementById(`page-editor-cover-preview`),S=document.getElementById(`page-editor-cover-placeholder`),C=document.getElementById(`page-editor-cover-upload`),w=document.getElementById(`page-editor-cover-upload-btn`),T=document.getElementById(`page-editor-cover-remove-btn`),E=document.getElementById(`page-editor-show-header`),D=document.getElementById(`page-editor-show-footer`);if(!n||!r||!i||!a||!o||!s||!c||!l||!u||!d||!f||!p||!m||!h||!g||!_||!v||!x||!S||!C||!w)return;let O=[],ee=null,k=null;Wn().then(()=>{Q(document.getElementById(`view-container`)??document.body)}),kr(p);function A(){p.innerHTML=O.map(zr).join(``)||`<p class="editor-empty-blocks">هنوز بلوکی اضافه نشده است. یک نوع بلوک را انتخاب و دکمه افزودن را بزنید.</p>`,Q(p)}function j(){return Array.from(p.querySelectorAll(`[data-block-index]`)).map(e=>{let t=e.dataset.blockType,n=t=>e.querySelector(`[data-field="${t}"]`)?.value??``;return t===`richtext`?{type:t,html:n(`html`),htmlEn:n(`htmlEn`)}:t===`heading`||t===`paragraph`?{type:t,text:n(`text`),textEn:n(`textEn`)}:t===`list`?{type:t,items:n(`items`).split(`
`).map(e=>e.trim()).filter(Boolean),itemsEn:n(`itemsEn`).split(`
`).map(e=>e.trim()).filter(Boolean)}:t===`image`?{type:t,url:n(`url`),caption:n(`caption`),captionEn:n(`captionEn`)}:{type:`video`,url:n(`url`)}})}function te(e){ee=e,e?(x.src=e,x.hidden=!1,S.hidden=!0,T&&(T.hidden=!1)):(x.hidden=!0,S.hidden=!1,T&&(T.hidden=!0))}function M(e,t){if(!e){i.hidden=!0,v.hidden=!0,y&&(y.hidden=!0);return}if(i.hidden=!1,i.textContent=e===`published`?`منتشرشده`:`پیش‌نویس`,i.className=`article-status-badge article-status-${e}`,v.hidden=e!==`published`,y&&b){let e=t||u.value.trim();if(e){y.hidden=!1;let t=`https://behbarapp.ir/p/${encodeURIComponent(e)}`;b.href=t,b.textContent=`/p/${e}`}else y.hidden=!0}}async function N(){if(e===null){r.textContent=`برگه جدید`,O=[Rr(`richtext`)],A(),M(null),E&&(E.checked=!1),D&&(D.checked=!1);return}try{let t=await _e(e);if(!t){n.hidden=!1,n.textContent=`برگه پیدا نشد.`;return}k=t,r.textContent=t.title||`ویرایش برگه`,o.value=t.title,s.value=t.titleEn||``,c.value=t.excerpt||``,l.value=t.excerptEn||``,u.value=t.slug,d.value=t.metaTitle??``,f.value=t.metaDescription??``,E&&(E.checked=!!t.showInHeader),D&&(D.checked=!!t.showInFooter),te(t.coverImageUrl),O=t.content&&t.content.length?t.content:[Rr(`richtext`)],A(),M(t.status,t.slug)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی در بارگذاری برگه پیش آمد.`}}function P(){return{title:o.value.trim(),titleEn:s.value.trim(),excerpt:c.value.trim(),excerptEn:l.value.trim(),coverImageUrl:ee,content:j(),metaTitle:d.value.trim()||void 0,metaDescription:f.value.trim()||void 0,slug:u.value.trim()||void 0,showInHeader:E?.checked??!1,showInFooter:D?.checked??!1}}async function F(){if(n.hidden=!0,!o.value.trim())return n.hidden=!1,n.textContent=`عنوان برگه الزامی است.`,null;let t=P();try{let n=k?await ye(k.id,t):await ve(t);return k=n,e=n.id,u.value=n.slug,r.textContent=n.title,M(n.status,n.slug),n}catch(e){return n.hidden=!1,n.textContent=e instanceof Error?e.message:`ذخیره برگه ناموفق بود.`,null}}p.addEventListener(`click`,e=>{let t=e.target.closest(`[data-block-action]`);if(!t)return;O=j();let n=Number(t.dataset.index),r=t.dataset.blockAction;r===`remove`?O.splice(n,1):r===`up`&&n>0?[O[n-1],O[n]]=[O[n],O[n-1]]:r===`down`&&n<O.length-1&&([O[n+1],O[n]]=[O[n],O[n+1]]),A()}),p.addEventListener(`click`,e=>{let t=e.target.closest(`[data-image-upload-btn]`);t&&t.closest(`.block-editor`)?.querySelector(`[data-image-upload]`)?.click()}),p.addEventListener(`change`,async e=>{let t=e.target;if(!t.matches(`[data-image-upload]`))return;let r=t.files?.[0];if(!r)return;let i=t.closest(`.block-editor`);if(i)try{let e=await Se(r),t=i.querySelector(`[data-field="url"]`);t&&(t.value=e);let n=i.querySelector(`.block-image-preview`),a=i.querySelector(`.block-image-placeholder`);n?(n.src=e,n.hidden=!1):i.querySelector(`.block-image-upload`)?.insertAdjacentHTML(`afterbegin`,`<img src="${e}" alt="" class="block-image-preview" />`),a&&(a.hidden=!0)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`آپلود تصویر ناموفق بود.`}}),h.addEventListener(`click`,()=>{O=j(),O.push(Rr(m.value)),A()}),w.addEventListener(`click`,()=>C.click()),T&&T.addEventListener(`click`,()=>te(null)),C.addEventListener(`change`,async()=>{let e=C.files?.[0];if(e)try{te(await Se(e))}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`آپلود تصویر شاخص ناموفق بود.`}}),g.addEventListener(`click`,async()=>{g.disabled=!0,g.textContent=`در حال ذخیره...`,await F(),g.disabled=!1,g.textContent=`ذخیره پیش‌نویس`}),_.addEventListener(`click`,async()=>{_.disabled=!0;let e=await F();if(e)try{let t=await be(e.id,!0);M(t.status,t.slug)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`انتشار برگه ناموفق بود.`}_.disabled=!1}),v.addEventListener(`click`,async()=>{if(k){v.disabled=!0;try{let e=await be(k.id,!1);M(e.status,e.slug)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`تغییر به پیش‌نویس ناموفق بود.`}v.disabled=!1}}),a.addEventListener(`click`,t),N()}function Wr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Gr(e){return Array.from({length:5},(t,n)=>n<e?`★`:`☆`).join(``)}function Kr(e){return`
    <div class="testimonial-row" data-testimonial-row="${e.id}">
      <div class="testimonial-row-avatar">
        ${e.avatarUrl?`<img src="${Wr(e.avatarUrl)}" alt="" />`:`<span class="icon">${u.user}</span>`}
      </div>
      <div class="testimonial-row-body">
        <div class="testimonial-row-head">
          <strong>${Wr(e.customerName)||`(بدون نام)`}</strong>
          <span class="testimonial-row-stars">${Gr(e.rating)}</span>
          <span class="article-status-badge article-status-${e.status}">${e.status===`published`?`منتشرشده`:`پیش‌نویس`}</span>
        </div>
        <p class="testimonial-row-text">${Wr(e.text)}</p>
      </div>
      <div class="staff-table-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-edit-testimonial="${e.id}">ویرایش</button>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-testimonial="${e.id}">حذف</button>
      </div>
    </div>
  `}function qr(){return`
    <div class="editor-sidebar-card" id="testimonial-form-card" hidden>
      <h3 id="testimonial-form-title">نظر جدید</h3>
      <input type="hidden" id="testimonial-form-id" />
      <div class="settings-form-grid">
        <div class="form-field" data-i18n="fa"><label for="testimonial-name">نام مشتری (فارسی)</label><input type="text" id="testimonial-name" /></div>
        <div class="form-field" data-i18n="en"><label for="testimonial-name-en">نام مشتری (انگلیسی)</label><input type="text" id="testimonial-name-en" dir="ltr" /></div>
      </div>
      <div class="form-field" data-i18n="fa"><label for="testimonial-text">متن نظر (فارسی)</label><textarea id="testimonial-text" rows="3"></textarea></div>
      <div class="form-field" data-i18n="en"><label for="testimonial-text-en">متن نظر (انگلیسی)</label><textarea id="testimonial-text-en" dir="ltr" rows="3"></textarea></div>
      <div class="settings-form-grid">
        <div class="form-field">
          <label for="testimonial-rating">امتیاز</label>
          <select id="testimonial-rating">
            <option value="5">۵ ستاره</option>
            <option value="4">۴ ستاره</option>
            <option value="3">۳ ستاره</option>
            <option value="2">۲ ستاره</option>
            <option value="1">۱ ستاره</option>
          </select>
        </div>
        <div class="form-field"><label for="testimonial-avatar">لینک تصویر (اختیاری)</label><input type="text" id="testimonial-avatar" dir="ltr" /></div>
        <div class="form-field"><label for="testimonial-sort">ترتیب نمایش</label><input type="number" id="testimonial-sort" value="0" /></div>
        <div class="form-field">
          <label for="testimonial-status">وضعیت</label>
          <select id="testimonial-status">
            <option value="published">منتشرشده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
      </div>
      <p class="error-text" id="testimonial-form-error" hidden></p>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="testimonial-cancel-btn">انصراف</button>
        <button type="button" class="btn btn-primary" id="testimonial-save-btn">ذخیره</button>
      </div>
    </div>
  `}function Jr(){return`
    <div class="view-header">
      <h1>نظرات مشتریان</h1>
      <button type="button" class="btn btn-primary" id="testimonial-new-btn">
        <span class="icon">${u.plusCircle}</span>
        نظر جدید
      </button>
    </div>
    <p class="error-text" id="testimonials-list-error" hidden></p>
    ${qr()}
    <div class="testimonial-list" id="testimonials-list"></div>
  `}function Yr(){Wn().then(()=>Q(document.getElementById(`view-container`)??document.body));let e=document.getElementById(`testimonials-list-error`),t=document.getElementById(`testimonials-list`),n=document.getElementById(`testimonial-new-btn`),r=document.getElementById(`testimonial-form-card`),i=document.getElementById(`testimonial-form-title`),a=document.getElementById(`testimonial-form-error`),o=document.getElementById(`testimonial-cancel-btn`),s=document.getElementById(`testimonial-save-btn`);if(!e||!t||!n||!r||!i||!a||!o||!s)return;let c=[];function l(e){a.hidden=!0,i.textContent=e?`ویرایش نظر`:`نظر جدید`,document.getElementById(`testimonial-form-id`).value=e?String(e.id):``,document.getElementById(`testimonial-name`).value=e?.customerName??``,document.getElementById(`testimonial-name-en`).value=e?.customerNameEn??``,document.getElementById(`testimonial-text`).value=e?.text??``,document.getElementById(`testimonial-text-en`).value=e?.textEn??``,document.getElementById(`testimonial-rating`).value=String(e?.rating??5),document.getElementById(`testimonial-avatar`).value=e?.avatarUrl??``,document.getElementById(`testimonial-sort`).value=String(e?.sortOrder??0),document.getElementById(`testimonial-status`).value=e?.status??`published`,r.hidden=!1,r.scrollIntoView({behavior:`smooth`,block:`center`})}function u(){r.hidden=!0}async function d(){e.hidden=!0;try{c=await Oe(),t.innerHTML=c.length?c.map(Kr).join(``):`<p class="pipeline-empty">هنوز نظری ثبت نشده است.</p>`,f()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}function f(){t.querySelectorAll(`[data-edit-testimonial]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=c.find(t=>t.id===Number(e.dataset.editTestimonial));t&&l(t)})}),t.querySelectorAll(`[data-delete-testimonial]`).forEach(t=>{t.addEventListener(`click`,async()=>{if(window.confirm(`این نظر برای همیشه حذف شود؟`)){t.disabled=!0;try{await je(Number(t.dataset.deleteTestimonial)),await d()}catch(n){e.hidden=!1,e.textContent=n instanceof Error?n.message:`حذف ناموفق بود.`,t.disabled=!1}}})})}n.addEventListener(`click`,()=>l(null)),o.addEventListener(`click`,u),s.addEventListener(`click`,async()=>{a.hidden=!0;let e=document.getElementById(`testimonial-form-id`).value,t={customerName:document.getElementById(`testimonial-name`).value.trim(),customerNameEn:document.getElementById(`testimonial-name-en`).value.trim(),text:document.getElementById(`testimonial-text`).value.trim(),textEn:document.getElementById(`testimonial-text-en`).value.trim(),rating:Number(document.getElementById(`testimonial-rating`).value),avatarUrl:document.getElementById(`testimonial-avatar`).value.trim()||null,sortOrder:Number(document.getElementById(`testimonial-sort`).value)||0,status:document.getElementById(`testimonial-status`).value};if(!t.customerName||!t.text){a.hidden=!1,a.textContent=`نام مشتری و متن نظر الزامی است.`;return}s.disabled=!0;try{e?await Ae(Number(e),t):await ke(t),u(),await d()}catch(e){a.hidden=!1,a.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`}finally{s.disabled=!1}}),d()}var Xr=5e3,Zr;function Qr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function $r(e){return e.lastMessageType===`image`?`📷 تصویر`:e.lastMessageType===`location`?`📍 موقعیت مکانی`:e.lastMessage||``}function ei(e){if(e.type===`image`){let t=`${e.text}`;return`<a href="${t}" target="_blank" rel="noopener"><img class="chat-bubble-image" src="${t}" alt="تصویر ارسالی" loading="lazy" /></a>`}if(e.type===`location`){let t=``;try{let n=JSON.parse(e.text);typeof n.lat==`number`&&typeof n.lng==`number`&&(t=`https://www.google.com/maps?q=${n.lat},${n.lng}`)}catch{}return t?`<a class="chat-bubble-location" href="${t}" target="_blank" rel="noopener"><span class="icon">${u.pin}</span><span>مشاهده موقعیت روی نقشه</span></a>`:`<p>موقعیت نامعتبر</p>`}return`<p>${Qr(e.text)}</p>`}function ti(e,t,n=`sm`){let r=e??`؟`,i=`chat-avatar chat-avatar-${n}`;return t?`<img class="${i}" src="${t}" alt="${Qr(r)}" />`:`<span class="${i} chat-avatar-fallback">${Qr(r.trim().charAt(0)||`؟`)}</span>`}function ni(){return`
    <div class="view-header">
      <h1>چت پشتیبانی</h1>
    </div>
    <p class="error-text" id="chat-error" hidden></p>
    <div class="chat-layout">
      <div class="chat-sidebar">
        <div class="chat-filter-tabs" id="chat-filter-tabs">
          <button type="button" class="chat-filter-tab is-active" data-filter="all">همه</button>
          <button type="button" class="chat-filter-tab" data-filter="mine">پاسخگوی من</button>
          <button type="button" class="chat-filter-tab" data-filter="unassigned">بدون پاسخگو</button>
          <button type="button" class="chat-filter-tab" data-filter="archived">بایگانی</button>
        </div>
        <div class="chat-conversation-list" id="chat-conversation-list"></div>
      </div>
      <div class="chat-thread" id="chat-thread">
        <p class="chat-thread-empty" id="chat-thread-empty">یک گفتگو را از فهرست انتخاب کنید.</p>
        <div class="chat-thread-active" id="chat-thread-active" hidden>
          <div class="chat-thread-header">
            <div class="chat-thread-header-info">
              <strong id="chat-thread-name"></strong>
              <span class="chat-thread-phone" id="chat-thread-phone"></span>
              <div class="chat-responders-row" id="chat-responders-row" hidden></div>
            </div>
            <div class="chat-thread-header-actions">
              <select class="chat-assign-select" id="chat-assign-select"></select>
              <button type="button" class="btn btn-secondary btn-sm" id="chat-thread-status-btn"></button>
              <button type="button" class="btn btn-secondary btn-sm" id="chat-thread-archive-btn"></button>
              <button type="button" class="btn btn-ghost btn-sm" id="chat-thread-delete-btn">حذف</button>
            </div>
          </div>
          <div class="chat-thread-messages" id="chat-thread-messages"></div>
          <form class="chat-thread-form" id="chat-thread-form">
            <textarea id="chat-thread-input" rows="1" placeholder="پاسخ خود را بنویسید..."></textarea>
            <button type="submit" class="btn btn-primary">
              <span class="icon">${u.plusCircle}</span>
              ارسال
            </button>
          </form>
        </div>
      </div>
      <div class="editor-sidebar chat-info-panel" id="chat-info-panel" hidden>
        <div class="editor-sidebar-card" id="chat-request-card"></div>
      </div>
    </div>
  `}function ri(){let e=document.getElementById(`chat-error`),t=document.getElementById(`chat-filter-tabs`),n=document.getElementById(`chat-conversation-list`),r=document.getElementById(`chat-thread-empty`),i=document.getElementById(`chat-thread-active`),a=document.getElementById(`chat-thread-name`),o=document.getElementById(`chat-thread-phone`),s=document.getElementById(`chat-assign-select`),c=document.getElementById(`chat-thread-status-btn`),l=document.getElementById(`chat-thread-archive-btn`),d=document.getElementById(`chat-thread-delete-btn`),f=document.getElementById(`chat-responders-row`),p=document.getElementById(`chat-info-panel`),m=document.getElementById(`chat-request-card`),h=document.getElementById(`chat-thread-messages`),_=document.getElementById(`chat-thread-form`),v=document.getElementById(`chat-thread-input`);if(!e||!t||!n||!r||!i||!a||!o||!s||!c||!l||!d||!f||!p||!m||!h||!_||!v)return;let y=g(),b=[],x=[],S=null,C=`all`;function w(){if(C===`archived`)return b.filter(e=>e.archivedAt!==null);let e=b.filter(e=>e.archivedAt===null);return C===`mine`?e.filter(e=>e.assignedStaffId===y?.id):C===`unassigned`?e.filter(e=>e.assignedStaffId===null):e}function T(){let t=w();n.innerHTML=t.length?t.map(e=>`
        <div class="chat-conversation-item ${e.id===S?`is-active`:``}" data-conversation-id="${e.id}" role="button" tabindex="0">
          <div class="chat-conversation-item-top">
            <span>${Qr(e.customerName||`مهمان`)}</span>
            <span class="chat-conversation-item-top-end">
              <span class="chat-conversation-time">${en(e.lastMessageAt)}</span>
              <button type="button" class="chat-conversation-delete" data-delete-conversation="${e.id}" title="حذف کامل این گفتگو" aria-label="حذف کامل این گفتگو">${u.close}</button>
            </span>
          </div>
          <p class="chat-conversation-preview">${Qr($r(e))}</p>
          <div class="chat-conversation-item-bottom">
            <span class="article-status-badge article-status-${e.status===`open`?`published`:`draft`}">${e.status===`open`?`باز`:`بسته`}</span>
            ${e.unreadCount>0?`<span class="chat-unread-badge">${q(e.unreadCount)}</span>`:``}
            <span class="chat-conversation-agent">
              ${e.assignedStaffId?`${ti(e.assignedStaffName,e.assignedStaffAvatar,`sm`)}<span>${Qr(e.assignedStaffName??``)}</span>`:`<span class="chat-conversation-unassigned">بدون پاسخگو</span>`}
            </span>
          </div>
        </div>
      `).join(``):`<p class="pipeline-empty">گفتگویی در این فهرست نیست.</p>`,n.querySelectorAll(`[data-conversation-id]`).forEach(e=>{e.addEventListener(`click`,t=>{t.target.closest(`[data-delete-conversation]`)||M(Number(e.dataset.conversationId))}),e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),M(Number(e.dataset.conversationId)))})}),n.querySelectorAll(`[data-delete-conversation]`).forEach(t=>{t.addEventListener(`click`,async n=>{n.stopPropagation();let a=Number(t.dataset.deleteConversation);if(window.confirm(`این گفتگو برای همیشه حذف شود؟`)){t.disabled=!0;try{await Be(a),S===a&&(S=null,i.hidden=!0,r.hidden=!1),await O()}catch(n){e.hidden=!1,e.textContent=n instanceof Error?n.message:`حذف گفتگو ناموفق بود.`,t.disabled=!1}}})})}function E(e){let t=[`<option value="">بدون پاسخگو</option>`,...x.map(t=>`<option value="${t.id}" ${t.id===e?.assignedStaffId?`selected`:``}>${Qr(t.fullName)}${t.id===y?.id?` (من)`:``}</option>`)];s.innerHTML=t.join(``),e?.assignedStaffId||(s.value=``)}async function D(){try{x=await We()}catch{}}async function O(){try{if(b=await Pe(),T(),S!==null){let e=b.find(e=>e.id===S);e&&(a.textContent=e.customerName||`مهمان`,o.textContent=e.customerPhone||``,c.textContent=e.status===`open`?`بستن گفتگو`:`بازکردن گفتگو`,l.textContent=e.archivedAt?`خروج از بایگانی`:`بایگانی`,E(e))}}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}function ee(e){let t=b.find(e=>e.id===S)?.customerName||`مهمان`;h.innerHTML=e.map(e=>`
      <div class="chat-bubble-admin chat-bubble-admin-${e.sender}">
        <span class="chat-bubble-author">${e.sender===`staff`?`${ti(e.staffName,e.staffAvatar,`sm`)}<span>${Qr(e.staffName??``)}</span>`:`<span>${Qr(t)}</span>`}</span>
        ${ei(e)}
        <span class="chat-bubble-timestamp">${en(e.createdAt)}</span>
      </div>
    `).join(``),h.scrollTop=h.scrollHeight,k(e)}function k(e){let t=[],n=new Set;for(let r of e)r.sender!==`staff`||!r.staffName||n.has(r.staffName)||(n.add(r.staffName),t.push({name:r.staffName,avatar:r.staffAvatar}));if(!t.length){f.hidden=!0,f.innerHTML=``;return}f.hidden=!1,f.innerHTML=`<span class="chat-responders-label">پاسخ‌دهندگان:</span>`+t.map(e=>`<span class="chat-responder-chip">${ti(e.name,e.avatar,`sm`)}<span>${Qr(e.name)}</span></span>`).join(``)}async function A(){if(S!==null)try{ee(await Fe(S))}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}function j(e){if(!e.length){m.innerHTML=`<h3>درخواست‌های ثبت‌شده</h3><p class="chat-request-empty">درخواستی برای این شماره ثبت نشده است.</p>`;return}let[t,...n]=e;m.innerHTML=`
      <h3>درخواست‌های ثبت‌شده (${q(e.length)})</h3>
      <div class="chat-request-latest">
        <div class="chat-request-row"><span>کد رهگیری</span><span dir="ltr">#${q(t.trackingCode)}</span></div>
        <div class="chat-request-row"><span>خدمت</span><span>${Qr(t.serviceLabel)}</span></div>
        <div class="chat-request-row"><span>مسیر</span><span>${Qr(t.originCity)} ← ${Qr(t.destinationCity)}</span></div>
        <div class="chat-request-row"><span>زمان</span><span>${Qr(t.scheduledDate)} — ${q(t.scheduledTime)}</span></div>
        <div class="chat-request-row"><span>وضعیت</span><span>${Qr(Bt[t.status]??t.status)}</span></div>
        <div class="chat-request-row"><span>برآورد هزینه</span><span>${J(t.estimateAvg)}</span></div>
      </div>
      ${n.length?`<div class="chat-request-older"><span>${q(n.length)} درخواست قدیمی‌تر:</span>${n.map(e=>`<span class="chat-request-older-item" dir="ltr">#${q(e.trackingCode)}</span>`).join(``)}</div>`:``}
    `}async function te(e){if(!e){j([]);return}try{j(await Ve(e))}catch{m.innerHTML=`<h3>درخواست‌های ثبت‌شده</h3><p class="chat-request-empty">دریافت اطلاعات ناموفق بود.</p>`}}function M(e){S=e,r.hidden=!0,i.hidden=!1,p.hidden=!1;let t=b.find(t=>t.id===e);a.textContent=t?.customerName||`مهمان`,o.textContent=t?.customerPhone||``,c.textContent=t?.status===`open`?`بستن گفتگو`:`بازکردن گفتگو`,l.textContent=t?.archivedAt?`خروج از بایگانی`:`بایگانی`,E(t),T(),A(),te(t?.customerPhone??null)}t.querySelectorAll(`[data-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{C=e.dataset.filter,t.querySelectorAll(`[data-filter]`).forEach(t=>t.classList.toggle(`is-active`,t===e)),T()})}),s.addEventListener(`change`,async()=>{if(S===null)return;let t=s.value,n=t?Number(t):null;s.disabled=!0;try{await Re(S,n),await O()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}finally{s.disabled=!1}}),c.addEventListener(`click`,async()=>{if(S===null)return;let t=b.find(e=>e.id===S)?.status===`open`?`closed`:`open`;try{await Le(S,t),await O()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}),l.addEventListener(`click`,async()=>{if(S===null)return;let t=!b.find(e=>e.id===S)?.archivedAt;try{await ze(S,t),await O()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}),d.addEventListener(`click`,async()=>{if(S!==null&&window.confirm(`این گفتگو برای همیشه حذف شود؟`))try{await Be(S),S=null,r.hidden=!1,i.hidden=!0,p.hidden=!0,await O()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`حذف ناموفق بود.`}}),_.addEventListener(`submit`,async t=>{if(t.preventDefault(),S===null)return;let n=v.value.trim();if(n){v.value=``;try{await Ie(S,n),await A(),await O()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`ارسال ناموفق بود.`}}}),D(),O(),Zr!==void 0&&window.clearInterval(Zr),Zr=window.setInterval(()=>{O(),S!==null&&A()},Xr)}function ii(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function ai(e){return`
    <div class="testimonial-row" data-story-row="${e.id}">
      <div class="testimonial-row-avatar"><img src="${ii(e.imageUrl)}" alt="" /></div>
      <div class="testimonial-row-body">
        <div class="testimonial-row-head"><strong>${ii(e.caption)||`(بدون متن)`}</strong></div>
        <p class="testimonial-row-text">${ii(e.linkUrl??``)}</p>
      </div>
      <div class="staff-table-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-edit-story="${e.id}">ویرایش</button>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-story="${e.id}">حذف</button>
      </div>
    </div>
  `}function oi(){return`
    <div class="editor-sidebar-card" id="story-form-card" hidden>
      <h3 id="story-form-title">استوری جدید</h3>
      <input type="hidden" id="story-form-id" />
      <div class="form-field"><label for="story-image">لینک تصویر</label><input type="text" id="story-image" dir="ltr" placeholder="https://..." /></div>
      <div class="settings-form-grid">
        <div class="form-field" data-i18n="fa"><label for="story-caption">متن (فارسی)</label><input type="text" id="story-caption" /></div>
        <div class="form-field" data-i18n="en"><label for="story-caption-en">متن (انگلیسی)</label><input type="text" id="story-caption-en" dir="ltr" /></div>
        <div class="form-field"><label for="story-link">لینک مقصد (اختیاری)</label><input type="text" id="story-link" dir="ltr" /></div>
        <div class="form-field"><label for="story-sort">ترتیب نمایش</label><input type="number" id="story-sort" value="0" /></div>
      </div>
      <p class="error-text" id="story-form-error" hidden></p>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="story-cancel-btn">انصراف</button>
        <button type="button" class="btn btn-primary" id="story-save-btn">ذخیره</button>
      </div>
    </div>
  `}function si(){return`
    <div class="view-header">
      <h1>استوری‌ها</h1>
      <button type="button" class="btn btn-primary" id="story-new-btn">
        <span class="icon">${u.plusCircle}</span>
        استوری جدید
      </button>
    </div>
    <p class="error-text" id="stories-list-error" hidden></p>
    ${oi()}
    <div class="testimonial-list" id="stories-list"></div>
  `}function ci(){Wn().then(()=>Q(document.getElementById(`view-container`)??document.body));let e=document.getElementById(`stories-list-error`),t=document.getElementById(`stories-list`),n=document.getElementById(`story-new-btn`),r=document.getElementById(`story-form-card`),i=document.getElementById(`story-form-title`),a=document.getElementById(`story-form-error`),o=document.getElementById(`story-cancel-btn`),s=document.getElementById(`story-save-btn`);if(!e||!t||!n||!r||!i||!a||!o||!s)return;let c=[];function l(e){a.hidden=!0,i.textContent=e?`ویرایش استوری`:`استوری جدید`,document.getElementById(`story-form-id`).value=e?String(e.id):``,document.getElementById(`story-image`).value=e?.imageUrl??``,document.getElementById(`story-caption`).value=e?.caption??``,document.getElementById(`story-caption-en`).value=e?.captionEn??``,document.getElementById(`story-link`).value=e?.linkUrl??``,document.getElementById(`story-sort`).value=String(e?.sortOrder??0),r.hidden=!1,r.scrollIntoView({behavior:`smooth`,block:`center`})}function u(){r.hidden=!0}async function d(){e.hidden=!0;try{c=await Ge(),t.innerHTML=c.length?c.map(ai).join(``):`<p class="pipeline-empty">هنوز استوری‌ای ثبت نشده است.</p>`,f()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}function f(){t.querySelectorAll(`[data-edit-story]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=c.find(t=>t.id===Number(e.dataset.editStory));t&&l(t)})}),t.querySelectorAll(`[data-delete-story]`).forEach(t=>{t.addEventListener(`click`,async()=>{if(window.confirm(`این استوری برای همیشه حذف شود؟`)){t.disabled=!0;try{await H(Number(t.dataset.deleteStory)),await d()}catch(n){e.hidden=!1,e.textContent=n instanceof Error?n.message:`حذف ناموفق بود.`,t.disabled=!1}}})})}n.addEventListener(`click`,()=>l(null)),o.addEventListener(`click`,u),s.addEventListener(`click`,async()=>{a.hidden=!0;let e=document.getElementById(`story-form-id`).value,t={imageUrl:document.getElementById(`story-image`).value.trim(),caption:document.getElementById(`story-caption`).value.trim(),captionEn:document.getElementById(`story-caption-en`).value.trim(),linkUrl:document.getElementById(`story-link`).value.trim()||null,sortOrder:Number(document.getElementById(`story-sort`).value)||0};if(!t.imageUrl){a.hidden=!1,a.textContent=`لینک تصویر الزامی است.`;return}s.disabled=!0;try{e?await qe(Number(e),t):await Ke(t),u(),await d()}catch(e){a.hidden=!1,a.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`}finally{s.disabled=!1}}),d()}var li=[{id:`new`,label:`جدید`},{id:`reviewed`,label:`بررسی‌شده`},{id:`contacted`,label:`تماس گرفته شده`},{id:`hired`,label:`استخدام شده`},{id:`rejected`,label:`رد شده`}],ui=Object.fromEntries(li.map(e=>[e.id,e.label]));function di(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function fi(e){return li.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${t.label}</option>`).join(``)}function pi(e){return`
    <div class="testimonial-row" data-application-row="${e.id}">
      <div class="testimonial-row-avatar"><span class="icon">${u.briefcase}</span></div>
      <div class="testimonial-row-body">
        <div class="testimonial-row-head">
          <strong>${di(e.fullName)}</strong>
          <span class="article-status-badge article-status-${e.status}">${ui[e.status]??e.status}</span>
        </div>
        <div class="job-application-meta">
          <span>${di(e.positionLabel)}</span>
          <a href="tel:${e.phone}" dir="ltr">${e.phone}</a>
          ${e.city?`<span>${di(e.city)}</span>`:``}
          ${e.hasVehicle===!0?`<span>دارای وسیله نقلیه${e.vehicleType?` (${di(e.vehicleType)})`:``}</span>`:``}
          ${e.hasVehicle===!1?`<span>بدون وسیله نقلیه</span>`:``}
          <span>${new Date(e.createdAt).toLocaleDateString(`fa-IR`)}</span>
        </div>
        ${e.message?`<p class="testimonial-row-text">${di(e.message)}</p>`:``}
      </div>
      <div class="staff-table-actions">
        <select class="pipeline-status-select" data-status-select-id="${e.id}">
          ${fi(e.status)}
        </select>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-application="${e.id}">حذف</button>
      </div>
    </div>
  `}function mi(){return`
    <div class="view-header">
      <h1>فرصت‌های شغلی</h1>
    </div>
    <p class="error-text" id="job-applications-error" hidden></p>
    <div class="testimonial-list" id="job-applications-list"></div>
  `}function hi(){let e=document.getElementById(`job-applications-error`),t=document.getElementById(`job-applications-list`);if(!e||!t)return;let n=[];async function r(){e.hidden=!0;try{n=await Je(),t.innerHTML=n.length?n.map(pi).join(``):`<p class="pipeline-empty">هنوز درخواست همکاری‌ای ثبت نشده است.</p>`,i()}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}function i(){t.querySelectorAll(`[data-status-select-id]`).forEach(t=>{t.addEventListener(`change`,async()=>{let n=Number(t.dataset.statusSelectId);t.disabled=!0;try{await Ye(n,t.value),await r()}catch(n){e.hidden=!1,e.textContent=n instanceof Error?n.message:`به‌روزرسانی وضعیت ناموفق بود.`,t.disabled=!1}})}),t.querySelectorAll(`[data-delete-application]`).forEach(t=>{t.addEventListener(`click`,async()=>{if(window.confirm(`این درخواست برای همیشه حذف شود؟`)){t.disabled=!0;try{await Xe(Number(t.dataset.deleteApplication)),await r()}catch(n){e.hidden=!1,e.textContent=n instanceof Error?n.message:`حذف ناموفق بود.`,t.disabled=!1}}})})}r()}function gi(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function _i(e){return`
    <div class="activity-log-row">
      <div class="activity-log-main">
        <span class="activity-log-action">${gi(e.action)}</span>
        ${e.targetLabel?`<span class="activity-log-target">${gi(e.targetLabel)}</span>`:``}
      </div>
      <div class="activity-log-meta">
        <span>${gi(e.staffName)}</span>
        <span>${en(e.createdAt)}</span>
      </div>
    </div>
  `}function vi(){return`
    <div class="view-header">
      <h1>گزارش فعالیت کارمندان</h1>
      <button type="button" class="btn btn-secondary" id="activity-log-refresh">به‌روزرسانی</button>
    </div>
    <p class="settings-panel-hint">
      اقدامات حساس پنل ادمین (حذف کارمند/درخواست، تغییر نقش، ایجاد/ویرایش/حذف نقش) این‌جا ثبت می‌شود — آخرین ۳۰۰ مورد.
    </p>
    <p class="error-text" id="activity-log-error" hidden></p>
    <div class="activity-log-list" id="activity-log-list"></div>
  `}function yi(){let e=document.getElementById(`activity-log-list`),t=document.getElementById(`activity-log-error`),n=document.getElementById(`activity-log-refresh`);if(!e||!t||!n)return;async function r(){t.hidden=!0;try{let t=await I();e.innerHTML=t.length?t.map(_i).join(``):`<p class="portal-empty">هنوز فعالیتی ثبت نشده است.</p>`}catch(e){t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}n.addEventListener(`click`,()=>void r()),r()}function bi(){return`
    <div class="editor-sidebar-card">
      <h3>به‌روزرسانی</h3>
      <p class="settings-panel-hint" id="update-panel-current">در حال بارگذاری اطلاعات نسخه...</p>
      <div id="update-panel-current-changelog" hidden></div>
      <button type="button" class="btn btn-secondary" id="update-scan-btn">بررسی به‌روزرسانی</button>
      <div id="update-panel-result"></div>
      <div id="update-panel-manual-guide" hidden></div>
    </div>
  `}var xi=`sudo bash install.sh`;function Si(){return`
    <div class="update-manual-step">
      <h5>به‌روزرسانی سریع از طریق سرور</h5>
      <p class="settings-panel-hint">
        برای به‌روزرسانی آسان، کافیست بعد از اتصال SSH به سرور، دستور زیر را اجرا نمایید:
      </p>
      <p class="update-manual-cmd-plain" dir="ltr">sudo beh-manager</p>
      <p class="settings-panel-hint">سپس از منوی بازشده، گزینه ۲ (Update) را انتخاب فرمایید.</p>
    </div>
  `}function Ci(){return`
    <div class="update-manual-guide">
      <h4>راهنمای به‌روزرسانی یا نصب از طریق SSH</h4>

      <div class="update-manual-step">
        <h5>۱) وارد شدن به سرور</h5>
        <p class="settings-panel-hint">
          آدرس IP سرور و رمز عبور (یا کلید SSH) را از پنل میزبانی سرور خود پیدا کنید.
          سپس:
        </p>
        <ul class="update-manual-list">
          <li><strong>ویندوز:</strong> برنامه‌ی PowerShell یا Windows Terminal را باز کنید.</li>
          <li><strong>مک یا لینوکس:</strong> برنامه‌ی Terminal را باز کنید.</li>
        </ul>
        <p class="settings-panel-hint">این دستور را بزنید (به‌جای «IP-سرور-شما» آی‌پی واقعی سرورتان را بگذارید) و رمز عبور را وارد کنید:</p>
        <p class="update-manual-cmd-plain" dir="ltr">ssh root@IP-سرور-شما</p>
      </div>

      <div class="update-manual-step">
        <h5>۲) نصب اولیه</h5>
        <p class="settings-panel-hint">
          پس از استخراج بسته اسکریپت در سرور، وارد پوشه مربوطه شده و این دستور را اجرا نمایید:
        </p>
        <p class="update-manual-cmd-plain" dir="ltr">${xi}</p>
      </div>

      <div class="update-manual-step">
        <h5>۳) به‌روزرسانی / تغییر دامنه / تغییر رمز ادمین</h5>
        <p class="settings-panel-hint">
          برای مدیریت سرویس‌ها، به‌روزرسانی یا تغییر مشخصات، بعد از اتصال به سرور این دستور را بزنید:
        </p>
        <p class="update-manual-cmd-plain" dir="ltr">sudo beh-manager</p>
        <p class="settings-panel-hint">یک منو باز می‌شود؛ عدد گزینه‌ی مورد نظر (مثلاً «۲» برای به‌روزرسانی) را تایپ و Enter بزنید.</p>
      </div>
    </div>
  `}function wi(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Ti(){let e=document.getElementById(`update-panel-current`),t=document.getElementById(`update-panel-current-changelog`),n=document.getElementById(`update-panel-result`),r=document.getElementById(`update-scan-btn`),i=document.getElementById(`update-panel-manual-guide`);!e||!t||!n||!r||!i||(gt().then(n=>{e.textContent=`نسخه‌ی فعلی: ${n.current}`,n.currentChangelog.length&&(t.innerHTML=`
          <h4>این نسخه شامل چه چیزهایی است؟</h4>
          <ul class="update-modal-changelog">${n.currentChangelog.map(e=>`<li>${wi(e)}</li>`).join(``)}</ul>
          ${Si()}
        `,t.hidden=!1),i.innerHTML=Ci(),i.hidden=!1}).catch(()=>{e.textContent=``}),r.addEventListener(`click`,async()=>{r.disabled=!0;let t=r.textContent;r.textContent=`در حال بررسی...`,n.innerHTML=``;try{let t=await gt();if(e.textContent=`نسخه‌ی فعلی: ${t.current}`,!t.updateAvailable){zn(`نسخه‌ی شما به‌روز است.`);return}let r=t.changelog.length?`<ul class="update-modal-changelog">${t.changelog.map(e=>`<li>${wi(e)}</li>`).join(``)}</ul>`:``;if(t.runtime!==`selfhost`){n.innerHTML=`
          <h4>نسخه‌ی جدید موجود است: ${wi(t.latest??``)}</h4>
          ${r}
          <p class="settings-panel-hint">این استقرار روی کلادفلر است — به‌روزرسانی از طریق دیپلوی مستقیم انجام می‌شود، نه از این پنل.</p>
        `;return}n.innerHTML=`
        <h4>نسخه‌ی جدید موجود است: ${wi(t.latest??``)}</h4>
        ${r}
        <p class="update-modal-warning">قبل از به‌روزرسانی، حتماً یک نسخه پشتیبان دانلود کنید.</p>
        <div class="update-modal-actions">
          <button type="button" class="btn btn-secondary" id="update-panel-backup-btn">دانلود نسخه پشتیبان</button>
          <button type="button" class="btn btn-primary" id="update-panel-apply-btn">اعمال به‌روزرسانی</button>
        </div>
        <p class="error-text" id="update-panel-error" hidden></p>
      `,document.getElementById(`update-panel-backup-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0,t.textContent=`در حال دانلود...`;try{await at()}catch(e){zn(e instanceof Error?e.message:`دانلود پشتیبان ناموفق بود.`,`error`)}finally{t.disabled=!1,t.textContent=`دانلود نسخه پشتیبان`}}),document.getElementById(`update-panel-apply-btn`)?.addEventListener(`click`,async e=>{if(!window.confirm(`به‌روزرسانی سرویس را برای حدود یک دقیقه مختل می‌کند. آیا از پشتیبان‌گیری مطمئن هستید و می‌خواهید ادامه دهید؟`))return;let t=e.currentTarget,r=document.getElementById(`update-panel-error`);t.disabled=!0,t.textContent=`در حال اعمال...`;try{await _t(),n.innerHTML=`
            <h4>به‌روزرسانی آغاز شد</h4>
            <p>سرویس در حال بازسازی است — حدود یک دقیقه صبر کنید، سپس این صفحه را دوباره بارگذاری کنید.</p>
          `}catch(e){r&&(r.hidden=!1,r.textContent=e instanceof Error?e.message:`به‌روزرسانی ناموفق بود.`),t.disabled=!1,t.textContent=`اعمال به‌روزرسانی`}})}catch(e){zn(e instanceof Error?e.message:`بررسی به‌روزرسانی ناموفق بود.`,`error`)}finally{r.disabled=!1,r.textContent=t}}))}var Ei={text:`متن ساده`,steps:`مراحل شماره‌دار`,accordion:`آکاردئونی (پرسش و پاسخ)`,grid:`شبکه‌ی آیکون/عنوان`,slider:`اسلایدر`,quote:`نقل‌قول`,testimonials:`نظرات مشتریان (خودکار)`,stats:`آمار و ارقام`},Di=Object.keys(Ei),Oi=[{id:`hero`,type:`hero`,visible:!0}],ki={about:{label:`صفحه درباره ما`,livePath:`/about`,hint:`ویرایش مشخصات، تاریخچه، اهداف و بخش‌های معرفی بهبار در نشانی /about`},terms:{label:`صفحه قوانین و مقررات`,livePath:`/terms`,hint:`مدیریت شرایط، ضوابط، تعهدات و مقررات استفاده از سامانه بهبار در نشانی /terms`},privacy:{label:`صفحه حریم خصوصی`,livePath:`/privacy`,hint:`تنظیم سیاست‌های حفاظت از داده‌ها و امنیت حریم خصوصی کاربران بهبار در نشانی /privacy`}};function Ai(e,t){let n=[...e];return t?.length&&n.push(...t.map(e=>`- ${e}`)),n.join(`
`)}function ji(e){let t=e.split(`
`).map(e=>e.trim()).filter(Boolean),n=t.filter(e=>!e.startsWith(`- `)),r=t.filter(e=>e.startsWith(`- `)).map(e=>e.slice(2).trim());return{paragraphs:n,list:r.length?r:void 0}}function Mi(e){let t=`https://behbarapp.ir/p/${encodeURIComponent(e.slug)}`;return`
    <tr data-page-row="${e.id}">
      <td>
        <div style="font-weight: 600; color: var(--color-text);">${e.title||`(بدون عنوان)`}</div>
        ${e.excerpt?`<div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 2px;">${e.excerpt.slice(0,70)}...</div>`:``}
      </td>
      <td>
        <code style="font-family: monospace; font-size: 0.85rem; background: var(--color-bg-subtle, rgba(0,0,0,0.05)); padding: 2px 6px; border-radius: 4px;" dir="ltr">/p/${e.slug}</code>
      </td>
      <td>
        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
          ${e.showInHeader?`<span style="background: rgba(37,99,235,0.1); color: var(--color-primary); font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">هدر</span>`:``}
          ${e.showInFooter?`<span style="background: rgba(16,185,129,0.1); color: #059669; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">فوتر</span>`:``}
          ${!e.showInHeader&&!e.showInFooter?`<span style="color: var(--color-text-muted); font-size: 0.8rem;">—</span>`:``}
        </div>
      </td>
      <td>
        <span class="article-status-badge article-status-${e.status}">
          ${e.status===`published`?`منتشرشده`:`پیش‌نویس`}
        </span>
      </td>
      <td>
        <div class="staff-table-actions">
          ${e.status===`published`?`<a href="${t}" target="_blank" class="btn btn-ghost btn-sm" title="مشاهده برگه">مشاهده</a>`:``}
          <button type="button" class="btn btn-secondary btn-sm" data-edit-page="${e.id}">ویرایش</button>
          <button type="button" class="btn btn-ghost btn-sm" data-delete-page="${e.id}">حذف</button>
        </div>
      </td>
    </tr>
  `}function Ni(e=!1){return`
    ${e?``:`
    <div class="view-header" style="margin-bottom: var(--space-3);">
      <div>
        <h1>مدیریت صفحات</h1>
        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 4px;">طراحی صفحه اصلی، صفحات درباره ما، قوانین و مقررات، حریم خصوصی و برگه‌های سفارشی</p>
      </div>
    </div>
    `}
    <p class="error-text" id="pages-global-error" hidden></p>
    <p class="settings-saved-note" id="pages-global-saved" hidden>تغییرات با موفقیت ذخیره شد.</p>

    <!-- نوار تب‌های بالای صفحه -->
    <div class="page-nav-tabs settings-tabs" style="display: flex; align-items: center; justify-content: flex-start; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-4);">
      <button type="button" class="page-nav-tab settings-tab is-active" data-page-nav-tab="home">صفحه اصلی</button>
      <button type="button" class="page-nav-tab settings-tab" data-page-nav-tab="about">صفحه درباره ما</button>
      <button type="button" class="page-nav-tab settings-tab" data-page-nav-tab="terms">صفحه قوانین و مقررات</button>
      <button type="button" class="page-nav-tab settings-tab" data-page-nav-tab="privacy">صفحه حریم خصوصی</button>
      <button type="button" class="page-nav-tab settings-tab" data-page-nav-tab="custom">برگه‌های سفارشی</button>
      <button type="button" class="page-nav-tab settings-tab" id="pages-top-add-btn" style="margin-inline-start: auto; background-color: var(--primary); color: #fff; border-color: var(--primary); display: inline-flex; align-items: center; gap: 6px; font-weight: 700;">
        <span class="icon" style="width: 16px; height: 16px; display: inline-flex;">${u.plusCircle}</span>
        <span>افزودن صفحه تازه</span>
      </button>
    </div>

    <!-- پنل صفحه اصلی -->
    <div class="settings-panel" data-page-panel="home">
      <div class="editor-sidebar-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: 1rem;">طراحی و چیدمان صفحه اصلی</h3>
            <p class="settings-panel-hint" style="margin: 4px 0 0 0;">
              صفحه اصلی از بلوک‌های متنوع ساخته می‌شود. ترتیب، متن‌ها و نحوه نمایش هر بخش را به دلخواه تغییر دهید.
            </p>
          </div>
          <a href="https://behbarapp.ir/" target="_blank" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 4px;">
            <span>مشاهده صفحه اصلی</span>
            <span class="icon" style="width: 14px; height: 14px;">${u.externalLink||``}</span>
          </a>
        </div>
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border);">
          <label class="settings-inline-toggle"><input type="checkbox" id="homepage-stories-enabled" /> نمایش نوار استوری در بالای صفحه اصلی</label>
        </div>
      </div>

      <div id="homepage-sections-list"></div>

      <div class="settings-panel-footer" style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
        <select id="homepage-section-add-type" style="height: 40px; padding: 0 12px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--background);">
          ${Di.map(e=>`<option value="${e}">${Ei[e]}</option>`).join(``)}
        </select>
        <button type="button" class="btn btn-secondary" id="homepage-section-add-btn">
          <span class="icon">${u.plusCircle}</span>
          افزودن بلوک
        </button>
        <button type="button" class="btn btn-primary" id="homepage-save-btn" style="margin-inline-start: auto;">
          ذخیره چیدمان صفحه اصلی
        </button>
      </div>
    </div>

    <!-- پنل صفحه درباره ما -->
    <div class="settings-panel" data-page-panel="about" hidden>
      <div class="editor-sidebar-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: 1rem;">صفحه درباره ما</h3>
            <p class="settings-panel-hint" style="margin: 4px 0 0 0;">${ki.about.hint}</p>
          </div>
          <a href="https://behbarapp.ir/about" target="_blank" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 4px;">
            <span>مشاهده صفحه درباره ما</span>
            <span class="icon" style="width: 14px; height: 14px;">${u.externalLink||``}</span>
          </a>
        </div>
      </div>
      <div id="legal-editor-about"></div>
    </div>

    <!-- پنل صفحه قوانین و مقررات -->
    <div class="settings-panel" data-page-panel="terms" hidden>
      <div class="editor-sidebar-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: 1rem;">صفحه قوانین و مقررات</h3>
            <p class="settings-panel-hint" style="margin: 4px 0 0 0;">${ki.terms.hint}</p>
          </div>
          <a href="https://behbarapp.ir/terms" target="_blank" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 4px;">
            <span>مشاهده صفحه قوانین</span>
            <span class="icon" style="width: 14px; height: 14px;">${u.externalLink||``}</span>
          </a>
        </div>
      </div>
      <div id="legal-editor-terms"></div>
    </div>

    <!-- پنل صفحه حریم خصوصی -->
    <div class="settings-panel" data-page-panel="privacy" hidden>
      <div class="editor-sidebar-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: 1rem;">صفحه حریم خصوصی</h3>
            <p class="settings-panel-hint" style="margin: 4px 0 0 0;">${ki.privacy.hint}</p>
          </div>
          <a href="https://behbarapp.ir/privacy" target="_blank" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 4px;">
            <span>مشاهده صفحه حریم خصوصی</span>
            <span class="icon" style="width: 14px; height: 14px;">${u.externalLink||``}</span>
          </a>
        </div>
      </div>
      <div id="legal-editor-privacy"></div>
    </div>

    <!-- پنل برگه‌های سفارشی -->
    <div class="settings-panel" data-page-panel="custom" hidden>
      <div class="view-header" style="margin-bottom: var(--space-3);">
        <div>
          <h3 style="margin: 0; font-size: 1rem;">برگه‌های سفارشی سایت</h3>
          <p class="settings-panel-hint" style="margin: 4px 0 0 0;">مدیریت، طراحی و انتشار برگه‌ها با پیوند اختصاصی (/p/slug) و بلوک‌های چندرسانه‌ای</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="page-custom-new-btn">
          <span class="icon">${u.plusCircle}</span>
          برگه جدید
        </button>
      </div>
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr>
              <th>عنوان برگه</th>
              <th>پیوند یکتا (Slug)</th>
              <th>موقعیت نمایش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody id="page-custom-table-body"></tbody>
        </table>
      </div>
    </div>
  `}function Pi(e){let t=document.getElementById(`pages-global-error`),n=document.getElementById(`pages-global-saved`);function r(){n&&(n.hidden=!1,window.setTimeout(()=>n.hidden=!0,2500))}function i(e){t&&(t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی رخ داد.`,window.scrollTo({top:0,behavior:`smooth`}))}Wn().then(()=>Q(document.body));let a=document.querySelectorAll(`[data-page-nav-tab]`),o=document.querySelectorAll(`[data-page-panel]`);a.forEach(e=>{e.addEventListener(`click`,()=>{a.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`);let t=e.dataset.pageNavTab;o.forEach(e=>{e.hidden=e.dataset.pagePanel!==t})})}),document.getElementById(`pages-top-add-btn`)?.addEventListener(`click`,()=>e(null)),document.getElementById(`page-custom-new-btn`)?.addEventListener(`click`,()=>e(null));let s={},c=[],l=!0,d={};function f(e,t,n){return`
      <div class="settings-form-grid block-item-editor" data-section-index="${t}" data-item-index="${n}">
        <div class="form-field" data-i18n="fa"><label>عنوان (فارسی)</label><input type="text" data-field="title" value="${e.title??``}" /></div>
        <div class="form-field" data-i18n="en"><label>Title (English)</label><input type="text" dir="ltr" data-field="titleEn" value="${e.titleEn??``}" /></div>
        <div class="form-field" data-i18n="fa"><label>متن (فارسی)</label><textarea rows="2" data-field="text">${e.text??``}</textarea></div>
        <div class="form-field" data-i18n="en"><label>Text (English)</label><textarea rows="2" dir="ltr" data-field="textEn">${e.textEn??``}</textarea></div>
        <div class="form-field"><label>لینک تصویر</label><input type="text" dir="ltr" data-field="imageUrl" value="${e.imageUrl??``}" /></div>
        <div class="form-field"><label>لینک ویدئو (آپارات یا mp4)</label><input type="text" dir="ltr" data-field="videoUrl" value="${e.videoUrl??``}" /></div>
        <div class="form-field"><label>لینک دکمه/مقصد (اختیاری)</label><input type="text" dir="ltr" data-field="linkUrl" value="${e.linkUrl??``}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-item-action="remove">حذف مورد</button>
      </div>
    `}function p(e,t,n){let r=e.type===`hero`,i=e.layout??`text`,a=r?`هدر و بنر اصلی`:Ei[i],o=!r&&i!==`text`&&i!==`testimonials`;return`
      <div class="block-editor" data-homepage-section-index="${t}">
        <div class="block-editor-head">
          <span class="block-editor-type">${a}${r?` (بخش ثابت)`:``}</span>
          <div class="block-editor-actions">
            ${r?``:`
              <label class="settings-inline-toggle"><input type="checkbox" data-field="visible" ${e.visible===!1?``:`checked`} /> نمایش</label>
              <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-homepage-action="up" data-index="${t}" ${t<=1?`disabled`:``}>▲</button>
              <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-homepage-action="down" data-index="${t}" ${t>=n-1?`disabled`:``}>▼</button>
              <button type="button" class="btn btn-ghost btn-sm" data-homepage-action="remove" data-index="${t}">حذف</button>
            `}
          </div>
        </div>
        ${r?`
          <div class="block-editor-body">
            <input type="text" data-field="heading" data-i18n="fa" placeholder="عنوان اصلی (فارسی)" value="${e.heading??``}" />
            <input type="text" data-field="headingEn" data-i18n="en" dir="ltr" placeholder="Headline (English)" value="${e.headingEn??``}" />
            <textarea data-field="body" data-i18n="fa" rows="2" placeholder="توضیح زیر عنوان (فارسی)">${e.body??``}</textarea>
            <textarea data-field="bodyEn" data-i18n="en" dir="ltr" rows="2" placeholder="Subtext (English)">${e.bodyEn??``}</textarea>
            <input type="text" data-field="backgroundImageUrl" dir="ltr" placeholder="لینک تصویر پس‌زمینه هدر (اختیاری)" value="${e.backgroundImageUrl??``}" />
          </div>
        `:`
          <div class="block-editor-body">
            <div class="form-field">
              <label>شیوه‌ی نمایش</label>
              <select data-field="layout">
                ${Di.map(e=>`<option value="${e}" ${e===i?`selected`:``}>${Ei[e]}</option>`).join(``)}
              </select>
            </div>
            <input type="text" data-field="heading" data-i18n="fa" placeholder="عنوان بخش (فارسی)" value="${e.heading??``}" />
            <input type="text" data-field="headingEn" data-i18n="en" dir="ltr" placeholder="Section heading (English)" value="${e.headingEn??``}" />
            <input type="text" data-field="subheading" data-i18n="fa" placeholder="زیرعنوان (فارسی، اختیاری)" value="${e.subheading??``}" />
            <input type="text" data-field="subheadingEn" data-i18n="en" dir="ltr" placeholder="Subheading (English, optional)" value="${e.subheadingEn??``}" />
            ${i===`text`?`
              <textarea data-field="body" data-i18n="fa" rows="3" placeholder="متن بخش (فارسی)">${e.body??``}</textarea>
              <textarea data-field="bodyEn" data-i18n="en" dir="ltr" rows="3" placeholder="Section text (English)">${e.bodyEn??``}</textarea>
            `:``}
            ${i===`testimonials`?`<p class="settings-panel-hint">این بلوک به‌صورت خودکار از «نظرات مشتریان» تأییدشده پر می‌شود.</p>`:``}
          </div>
          ${o?`
            <div class="block-items-list" data-section-items="${t}">
              ${(e.items??[]).map((e,n)=>f(e,t,n)).join(``)}
            </div>
            <button type="button" class="btn btn-secondary btn-sm" data-item-action="add" data-section-index="${t}">
              <span class="icon">${u.plusCircle}</span>
              افزودن مورد
            </button>
          `:``}
        `}
      </div>
    `}function m(){let e=document.getElementById(`homepage-sections-list`);e&&(e.innerHTML=c.map((e,t)=>p(e,t,c.length)).join(``),Q(e))}function h(){c=Array.from(document.querySelectorAll(`[data-homepage-section-index]`)).map((e,t)=>{let n=c[t]??{id:`section-${crypto.randomUUID().slice(0,8)}`,type:`block`,visible:!0},r=e.querySelector(`[data-field="visible"]`),i=n.type===`hero`||!r||r.checked,a=e.querySelector(`[data-field="layout"]`)?.value??n.layout,o=n.type===`block`&&a&&a!==`text`&&a!==`testimonials`?Array.from(e.querySelectorAll(`[data-item-index]`)).map((e,t)=>({id:n.items?.[t]?.id??`item-${crypto.randomUUID().slice(0,8)}`,title:e.querySelector(`[data-field="title"]`)?.value??``,titleEn:e.querySelector(`[data-field="titleEn"]`)?.value??``,text:e.querySelector(`[data-field="text"]`)?.value??``,textEn:e.querySelector(`[data-field="textEn"]`)?.value??``,imageUrl:e.querySelector(`[data-field="imageUrl"]`)?.value??``,videoUrl:e.querySelector(`[data-field="videoUrl"]`)?.value??``,linkUrl:e.querySelector(`[data-field="linkUrl"]`)?.value??``})):n.items;return{...n,visible:i,layout:a,heading:e.querySelector(`[data-field="heading"]`)?.value??``,headingEn:e.querySelector(`[data-field="headingEn"]`)?.value??``,subheading:e.querySelector(`[data-field="subheading"]`)?.value??n.subheading??``,subheadingEn:e.querySelector(`[data-field="subheadingEn"]`)?.value??n.subheadingEn??``,body:e.querySelector(`[data-field="body"]`)?.value??n.body??``,bodyEn:e.querySelector(`[data-field="bodyEn"]`)?.value??n.bodyEn??``,backgroundImageUrl:e.querySelector(`[data-field="backgroundImageUrl"]`)?.value??n.backgroundImageUrl??``,items:o}})}document.getElementById(`homepage-sections-list`)?.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-homepage-action]`);if(n){h();let e=Number(n.dataset.index),t=n.dataset.homepageAction;t===`remove`?c.splice(e,1):t===`up`&&e>1?[c[e-1],c[e]]=[c[e],c[e-1]]:t===`down`&&e<c.length-1&&([c[e+1],c[e]]=[c[e],c[e+1]]),m();return}let r=t.closest(`[data-item-action]`);if(r){h();let e=Number(r.dataset.sectionIndex??r.closest(`[data-section-index]`)?.getAttribute(`data-section-index`)),t=r.dataset.itemAction,n=c[e];if(!n)return;if(n.items||=[],t===`add`)n.items.push({id:`item-${crypto.randomUUID().slice(0,8)}`});else if(t===`remove`){let e=r.closest(`[data-item-index]`),t=Number(e?.dataset.itemIndex);isNaN(t)||n.items.splice(t,1)}m()}}),document.getElementById(`homepage-section-add-btn`)?.addEventListener(`click`,()=>{h();let e=document.getElementById(`homepage-section-add-type`)?.value||`text`;c.push({id:`section-${crypto.randomUUID().slice(0,8)}`,type:`block`,visible:!0,layout:e,items:[]}),m()}),document.getElementById(`homepage-save-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`homepage-save-btn`);if(e){h(),l=document.getElementById(`homepage-stories-enabled`)?.checked??!0,e.disabled=!0;try{await V(`homepage_layout`,{sections:c,storiesEnabled:l}),r()}catch(e){i(e)}finally{e.disabled=!1}}});function g(e){let t=document.getElementById(`legal-editor-${e}`);if(!t)return;let n=d[e]??{slug:e,title:ki[e].label,titleEn:``,description:``,descriptionEn:``,intro:``,introEn:``,sections:[]};d[e]=n,t.innerHTML=`
      <div style="background: var(--color-surface-sunken, rgba(0,0,0,0.02)); border: 1px solid var(--color-border); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: var(--space-3); display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
        <span style="font-weight: 600; font-size: 0.9rem; color: var(--color-text);">موقعیت نمایش:</span>
        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem;">
          <input type="checkbox" id="legal-${e}-show-header" ${n.showInHeader?`checked`:``} />
          <span>نمایش در هدر سایت</span>
        </label>
        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem;">
          <input type="checkbox" id="legal-${e}-show-footer" ${n.showInFooter===!1?``:`checked`} />
          <span>نمایش در فوتر سایت</span>
        </label>
      </div>

      <div class="settings-form-grid">
        <div class="form-field" data-i18n="fa"><label>عنوان (فارسی)</label><input type="text" id="legal-${e}-title-fa" value="${n.title}" /></div>
        <div class="form-field" data-i18n="en"><label>عنوان (انگلیسی)</label><input type="text" dir="ltr" id="legal-${e}-title-en" value="${n.titleEn}" /></div>
        <div class="form-field" data-i18n="fa"><label>توضیح متا (فارسی)</label><input type="text" id="legal-${e}-desc-fa" value="${n.description}" /></div>
        <div class="form-field" data-i18n="en"><label>توضیح متا (انگلیسی)</label><input type="text" dir="ltr" id="legal-${e}-desc-en" value="${n.descriptionEn}" /></div>
      </div>
      <div class="form-field" data-i18n="fa"><label>مقدمه (فارسی)</label><textarea id="legal-${e}-intro-fa" rows="2">${n.intro}</textarea></div>
      <div class="form-field" data-i18n="en"><label>مقدمه (انگلیسی)</label><textarea id="legal-${e}-intro-en" dir="ltr" rows="2">${n.introEn}</textarea></div>

      <h3 class="editor-section-title">بخش‌های صفحه</h3>
      <div id="legal-${e}-sections">
        ${n.sections.map((t,n)=>`
          <div class="block-editor" data-legal-section="${n}">
            <div class="block-editor-head">
              <span class="block-editor-type">بخش ${n+1}</span>
              <div class="block-editor-actions">
                <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-legal-action="up" data-slug="${e}" data-index="${n}">▲</button>
                <button type="button" class="btn btn-secondary btn-sm block-move-btn" data-legal-action="down" data-slug="${e}" data-index="${n}">▼</button>
                <button type="button" class="btn btn-ghost btn-sm" data-legal-action="remove" data-slug="${e}" data-index="${n}">حذف</button>
              </div>
            </div>
            <div class="block-editor-body">
              <input type="text" data-field="heading" data-i18n="fa" placeholder="سرتیتر بخش (فارسی)" value="${t.heading}" />
              <input type="text" data-field="headingEn" data-i18n="en" dir="ltr" placeholder="Section heading (English)" value="${t.headingEn}" />
              <textarea data-field="body" data-i18n="fa" rows="4" placeholder="هر پاراگراف در یک خط؛ برای مورد لیستی خط را با «- » شروع کنید">${Ai(t.paragraphs,t.list)}</textarea>
              <textarea data-field="bodyEn" data-i18n="en" dir="ltr" rows="4" placeholder="One paragraph per line; prefix list items with '- '">${Ai(t.paragraphsEn,t.listEn)}</textarea>
            </div>
          </div>
        `).join(``)}
      </div>

      <div style="display: flex; gap: 10px; margin-top: 10px; align-items: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary" id="legal-${e}-add-section-btn">
          <span class="icon">${u.plusCircle}</span>
          افزودن بخش به این صفحه
        </button>
        <button type="button" class="btn btn-primary" id="legal-${e}-save-btn" style="margin-inline-start: auto;">
          ذخیره ${ki[e].label}
        </button>
      </div>
    `,Q(t),document.getElementById(`legal-${e}-sections`)?.addEventListener(`click`,t=>{let n=t.target.closest(`[data-legal-action]`);if(!n)return;_(e);let r=Number(n.dataset.index),i=n.dataset.legalAction,a=d[e].sections;i===`remove`?a.splice(r,1):i===`up`&&r>0?[a[r-1],a[r]]=[a[r],a[r-1]]:i===`down`&&r<a.length-1&&([a[r+1],a[r]]=[a[r],a[r+1]]),g(e)}),document.getElementById(`legal-${e}-add-section-btn`)?.addEventListener(`click`,()=>{_(e),d[e].sections.push({heading:``,headingEn:``,paragraphs:[],paragraphsEn:[]}),g(e)}),document.getElementById(`legal-${e}-save-btn`)?.addEventListener(`click`,async()=>{_(e);let t=document.getElementById(`legal-${e}-save-btn`);t&&(t.disabled=!0);try{await V(`legal_pages`,d),r()}catch(e){i(e)}finally{t&&(t.disabled=!1)}})}function _(e){let t=d[e];if(!t)return;t.showInHeader=document.getElementById(`legal-${e}-show-header`)?.checked??!1,t.showInFooter=document.getElementById(`legal-${e}-show-footer`)?.checked??!1,t.title=document.getElementById(`legal-${e}-title-fa`)?.value??``,t.titleEn=document.getElementById(`legal-${e}-title-en`)?.value??``,t.description=document.getElementById(`legal-${e}-desc-fa`)?.value??``,t.descriptionEn=document.getElementById(`legal-${e}-desc-en`)?.value??``,t.intro=document.getElementById(`legal-${e}-intro-fa`)?.value??``,t.introEn=document.getElementById(`legal-${e}-intro-en`)?.value??``;let n=document.getElementById(`legal-${e}-sections`);n&&(t.sections=Array.from(n.querySelectorAll(`[data-legal-section]`)).map(e=>{let{paragraphs:t,list:n}=ji(e.querySelector(`[data-field="body"]`)?.value??``),{paragraphs:r,list:i}=ji(e.querySelector(`[data-field="bodyEn"]`)?.value??``);return{heading:e.querySelector(`[data-field="heading"]`)?.value??``,headingEn:e.querySelector(`[data-field="headingEn"]`)?.value??``,paragraphs:t,paragraphsEn:r,list:n,listEn:i}}))}let v=document.getElementById(`page-custom-table-body`);async function y(){if(v)try{let e=await ge();v.innerHTML=e.length?e.map(Mi).join(``):`<tr><td colspan="5" class="staff-table-empty">هنوز برگه‌ای ساخته نشده است. روی «افزودن صفحه تازه» کلیک کنید.</td></tr>`,b()}catch(e){i(e)}}function b(){v&&(v.querySelectorAll(`[data-edit-page]`).forEach(t=>{t.addEventListener(`click`,()=>e(Number(t.dataset.editPage)))}),v.querySelectorAll(`[data-delete-page]`).forEach(e=>{e.addEventListener(`click`,async()=>{if(window.confirm(`این برگه برای همیشه حذف شود؟`)){e.disabled=!0;try{await xe(Number(e.dataset.deletePage)),await y()}catch(t){i(t),e.disabled=!1}}})}))}async function x(){try{s=await Te();let e=s.homepage_layout;c=e?.sections?.length?e.sections:Oi,c.some(e=>e.type===`hero`)||(c=[{id:`hero`,type:`hero`,visible:!0},...c]),l=e?.storiesEnabled!==!1;let t=document.getElementById(`homepage-stories-enabled`);t&&(t.checked=l),m(),d=s.legal_pages??{},g(`about`),g(`terms`),g(`privacy`),await y()}catch(e){i(e)}}x()}var Fi=[{value:`whatsapp`,label:`واتس‌اپ`},{value:`telegram`,label:`تلگرام`},{value:`instagram`,label:`اینستاگرام`},{value:`linkedin`,label:`لینکدین`},{value:`youtube`,label:`یوتیوب`},{value:`twitterX`,label:`ایکس (توییتر)`},{value:`facebook`,label:`فیس‌بوک`},{value:`mail`,label:`ایمیل`},{value:`globe`,label:`وبسایت / سایر`}],Ii=[{value:`googlePlay`,label:`گوگل پلی`},{value:`appStore`,label:`اپ استور`},{value:`bazaar`,label:`کافه‌بازار`},{value:`custom`,label:`سایر`}],Li=[{key:`primary`,label:`رنگ اصلی`,group:`برند اصلی`},{key:`primaryDark`,label:`رنگ اصلی (تیره)`,group:`برند اصلی`},{key:`secondary`,label:`رنگ ثانویه`,group:`برند اصلی`},{key:`secondaryLight`,label:`رنگ ثانویه (روشن)`,group:`برند اصلی`},{key:`background`,label:`پس‌زمینه`,group:`پس‌زمینه و متن`},{key:`surface`,label:`سطح (کارت‌ها)`,group:`پس‌زمینه و متن`},{key:`surfaceAlt`,label:`سطح جایگزین`,group:`پس‌زمینه و متن`},{key:`text`,label:`متن`,group:`پس‌زمینه و متن`},{key:`muted`,label:`متن کم‌رنگ`,group:`پس‌زمینه و متن`},{key:`border`,label:`خط دور`,group:`پس‌زمینه و متن`},{key:`success`,label:`موفقیت`,group:`وضعیت‌ها`},{key:`successDark`,label:`موفقیت (تیره)`,group:`وضعیت‌ها`},{key:`successBg`,label:`پس‌زمینه موفقیت`,group:`وضعیت‌ها`},{key:`warning`,label:`هشدار`,group:`وضعیت‌ها`},{key:`callGreen`,label:`رنگ تماس/واتس‌اپ`,group:`تماس`},{key:`callGreenDark`,label:`رنگ تماس (تیره)`,group:`تماس`},{key:`accentPurple`,label:`رنگ تاکیدی`,group:`سایر`},{key:`accentPurpleLight`,label:`رنگ تاکیدی (روشن)`,group:`سایر`},{key:`accentPurpleLightHover`,label:`رنگ تاکیدی (هاور)`,group:`سایر`},{key:`gooseGreen`,label:`رنگ نشان‌های شماره‌دار`,group:`سایر`},{key:`gooseGreenLight`,label:`رنگ نشان‌های شماره‌دار (روشن)`,group:`سایر`}],Ri={primary:`#1656c9`,primaryDark:`#0f3f9c`,secondary:`#3b7ff0`,secondaryLight:`#e9f0fd`,background:`#fdfcfa`,surface:`#f6f5f1`,surfaceAlt:`#eeece5`,text:`#1c1b18`,muted:`#78766f`,border:`#e3e1d9`,success:`#4a5940`,successDark:`#363f2e`,successBg:`#eef1e9`,warning:`#a3714c`,callGreen:`#008080`,callGreenDark:`#005f5f`,accentPurple:`#8b5cf6`,accentPurpleLight:`#f2ecfd`,accentPurpleLightHover:`#e8ddfb`,gooseGreen:`#008080`,gooseGreenLight:`#d9efee`},zi=[{id:`pages`,label:`صفحات سایت`,permission:`settings`},{id:`language`,label:`زبان`,permission:`settings`},{id:`general`,label:`نام سایت و فوتر`,permission:`settings`},{id:`contact`,label:`تماس و شبکه‌های اجتماعی`,permission:`settings`},{id:`theme`,label:`رنگ‌بندی و تم`,permission:`settings`},{id:`license`,label:`لایسنس`,permission:`settings`},{id:`backup-update`,label:`پشتیبان‌گیری و به‌روزرسانی`,permission:`settings`}];function Bi(){let e=g();return e?zi.filter(t=>t.id===`pages`?x(e,`settings`)||x(e,`homepage`)||x(e,`content`):x(e,t.permission)):[]}function Vi(){let e=Bi(),t=e[0]?.id,n=e=>e===t?``:`hidden`;return`
    <div class="view-header">
      <h1>تنظیمات سایت</h1>
    </div>
    <p class="error-text" id="settings-error" hidden></p>
    <p class="settings-saved-note" id="settings-saved-note" hidden>ذخیره شد.</p>

    <div class="settings-tabs">
      ${e.map((e,t)=>`<button type="button" class="settings-tab ${t===0?`is-active`:``}" data-settings-tab="${e.id}">${e.label}</button>`).join(``)}
    </div>

    <div class="settings-panel" data-settings-panel="pages" ${n(`pages`)}>
      ${Ni(!0)}
    </div>

    <div class="settings-panel" data-settings-panel="language" ${n(`language`)}>
      <div class="editor-sidebar-card">
        <h3>زبان سایت</h3>
        <p class="settings-panel-hint">
          اگر سایت فقط یک زبانه است، فیلد زبان دیگر هم روی سایت (دکمه تعویض زبان) و هم در همین فرم‌های پنل مدیریت مخفی می‌شود.
        </p>
        <div class="form-field" style="max-width: 260px">
          <label for="settings-language-mode">حالت زبان</label>
          <select id="settings-language-mode">
            <option value="both">دوزبانه (فارسی و انگلیسی)</option>
            <option value="fa">فقط فارسی</option>
            <option value="en">فقط انگلیسی</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="language_mode">ذخیره زبان سایت</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="general" ${n(`general`)}>
      <div class="editor-sidebar-card">
        <h3>نام سایت</h3>
        <div class="settings-form-grid">
          <div class="form-field" data-i18n="fa"><label for="settings-site-name-fa">فارسی</label><input type="text" id="settings-site-name-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="settings-site-name-en">انگلیسی</label><input type="text" id="settings-site-name-en" dir="ltr" /></div>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="site_name">ذخیره نام سایت</button>
      </div>

      <div class="editor-sidebar-card">
        <h3>لوگو و فاوآیکن</h3>
        <p class="settings-panel-hint">
          اگر خالی بگذارید، لوگوی پیش‌فرض بهبار (در هدر، فوتر، فاوآیکن و پنل مدیریت) استفاده می‌شود.
          برای لوگوی خودتان، آدرس یک تصویر مربعی (ترجیحاً SVG یا PNG با پس‌زمینه) وارد کنید.
        </p>
        <div class="settings-form-grid">
          <div class="form-field">
            <label for="settings-logo-url">آدرس لوگو</label>
            <div class="staff-avatar-upload-row">
              <span class="staff-avatar staff-avatar-preview" id="settings-logo-preview"></span>
              <input type="text" id="settings-logo-url" dir="ltr" placeholder="/logo.svg یا https://..." />
              <button type="button" class="btn btn-secondary btn-sm" id="settings-logo-upload-btn">آپلود</button>
              <input type="file" id="settings-logo-file-input" accept="image/*" hidden />
            </div>
          </div>
          <div class="form-field">
            <label for="settings-favicon-url">آدرس فاوآیکن (اختیاری)</label>
            <div class="staff-avatar-upload-row">
              <span class="staff-avatar staff-avatar-preview" id="settings-favicon-preview"></span>
              <input type="text" id="settings-favicon-url" dir="ltr" placeholder="خالی = همان لوگو" />
              <button type="button" class="btn btn-secondary btn-sm" id="settings-favicon-upload-btn">آپلود</button>
              <input type="file" id="settings-favicon-file-input" accept="image/*" hidden />
            </div>
          </div>
        </div>
        <p class="error-text" id="settings-branding-upload-error" hidden></p>
        <button type="button" class="btn btn-primary" data-save-setting="branding">ذخیره لوگو</button>
      </div>

      <div class="editor-sidebar-card">
        <h3>متن فوتر (سئو)</h3>
        <div id="settings-footer-paragraphs"></div>
        <div class="settings-form-grid" style="margin-top: var(--space-4)">
          <div class="form-field" data-i18n="fa"><label for="settings-copyright-fa">متن کپی‌رایت (فارسی)</label><input type="text" id="settings-copyright-fa" /></div>
          <div class="form-field" data-i18n="en"><label for="settings-copyright-en">متن کپی‌رایت (انگلیسی)</label><input type="text" id="settings-copyright-en" dir="ltr" /></div>
        </div>
        <button type="button" class="btn btn-primary" data-save-setting="footer">ذخیره فوتر</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="contact" ${n(`contact`)}>
      <div class="editor-sidebar-card">
        <h3>شماره تماس</h3>
        <div class="settings-form-grid">
          <div class="form-field">
            <label for="settings-phone-display">شماره تماس (نمایشی)</label>
            <input type="text" id="settings-phone-display" dir="ltr" placeholder="021-200200" />
          </div>
          <div class="form-field">
            <label for="settings-phone-tel">لینک شماره‌گیری</label>
            <input type="text" id="settings-phone-tel" dir="ltr" placeholder="tel:+9821200200" />
          </div>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <h3>شبکه‌های اجتماعی</h3>
        <div class="form-field" style="max-width: 260px">
          <label for="social-color-hex">رنگ آیکون‌ها (اختیاری)</label>
          <div class="theme-color-input-row">
            <input type="color" id="social-color-picker" />
            <input type="text" id="social-color-hex" dir="ltr" maxlength="7" placeholder="پیش‌فرض" />
          </div>
        </div>
        <div id="social-links-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="social-link-add-btn">
          <span class="icon">${u.plusCircle}</span>
          افزودن شبکه اجتماعی
        </button>
      </div>

      <div class="editor-sidebar-card">
        <h3>دکمه‌های تماس و چت</h3>
        <div class="form-field">
          <label for="theme-quick-actions-style">نحوه نمایش</label>
          <select id="theme-quick-actions-style">
            <option value="floating">شناور (همیشه روی صفحه ثابت می‌ماند)</option>
            <option value="fixed">فیکس (با اسکرول صفحه جابه‌جا می‌شود)</option>
          </select>
        </div>
      </div>

      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" data-save-setting="contact">ذخیره تماس و شبکه‌های اجتماعی</button>
      </div>

      <div class="editor-sidebar-card">
        <div class="plugin-card-head">
          <h3>دکمه‌های دانلود اپلیکیشن</h3>
          <label class="settings-inline-toggle"><input type="checkbox" id="applinks-enabled" /> فعال</label>
        </div>
        <p class="settings-panel-hint">اگر اپلیکیشن موبایل دارید، دکمه‌های دانلود آن در فوتر سایت نمایش داده می‌شود.</p>
        <div id="app-links-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="app-link-add-btn">
          <span class="icon">${u.plusCircle}</span>
          افزودن لینک اپلیکیشن
        </button>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-primary" data-save-setting="app_links">ذخیره دکمه‌های دانلود اپ</button>
        </div>
      </div>

      <div class="editor-sidebar-card">
        <div class="plugin-card-head">
          <h3>مجوزها و نمادهای اعتماد</h3>
          <label class="settings-inline-toggle"><input type="checkbox" id="certifications-enabled" /> فعال</label>
        </div>
        <p class="settings-panel-hint">مثلاً نماد اعتماد الکترونیکی یا ساماندهی؛ لینک تصویر نماد و لینک صفحه تایید را وارد کنید.</p>
        <div id="certifications-list"></div>
        <button type="button" class="btn btn-secondary btn-sm" id="certification-add-btn">
          <span class="icon">${u.plusCircle}</span>
          افزودن مجوز
        </button>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-primary" data-save-setting="certifications">ذخیره مجوزها</button>
        </div>
      </div>
    </div>


    <div class="settings-panel" data-settings-panel="theme" ${n(`theme`)}>
      ${Array.from(new Set(Li.map(e=>e.group))).map(e=>`
        <div class="editor-sidebar-card">
          <h3>${e}</h3>
          <div class="theme-color-grid">
            ${Li.filter(t=>t.group===e).map(e=>`
              <div class="theme-color-field">
                <label for="theme-${e.key}">${e.label}</label>
                <div class="theme-color-input-row">
                  <input type="color" id="theme-${e.key}-picker" data-theme-picker="${e.key}" />
                  <input type="text" id="theme-${e.key}" dir="ltr" data-theme-hex="${e.key}" maxlength="7" placeholder="#000000" />
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      `).join(``)}
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-secondary" id="theme-reset-btn">بازگردانی به پیش‌فرض</button>
        <button type="button" class="btn btn-primary" data-save-setting="theme">ذخیره رنگ‌بندی</button>
      </div>
    </div>

    <div class="settings-panel" data-settings-panel="license" ${n(`license`)}>
      <div class="editor-sidebar-card">
        <h3>فعال‌سازی لایسنس</h3>
        <p class="settings-panel-hint">کد لایسنسی که هنگام خرید قالب دریافت کرده‌اید را وارد کنید.</p>
        <div class="license-activate-row">
          <input type="text" id="license-key-input" dir="ltr" placeholder="BHBR-XXXX-XXXX-XXXX-XXXX" />
          <button type="button" class="btn btn-primary" id="license-activate-btn">فعال‌سازی</button>
        </div>
        <p class="error-text" id="license-activate-error" hidden></p>
      </div>
      <div id="license-panel-content"></div>
    </div>

    <div class="settings-panel" data-settings-panel="backup-update" ${n(`backup-update`)}>
      <div class="editor-sidebar-card">
        <h3>پشتیبان‌گیری دستی</h3>
        <p class="settings-panel-hint">یک فایل کامل از تمام محتوای سایت (درخواست‌ها، کارمندان، تنظیمات، مقالات، نظرات، چت‌ها، استوری‌ها و ...) دانلود یا بازیابی کنید.</p>
        <div class="settings-panel-footer" style="justify-content:flex-start">
          <button type="button" class="btn btn-secondary" id="backup-download-btn">
            <span class="icon">${u.download}</span>
            دانلود بک‌آپ کامل
          </button>
        </div>
        <p class="error-text" id="backup-download-error" hidden></p>

        <hr style="margin:var(--space-5) 0; border:none; border-top:1px solid var(--border)" />

        <label for="backup-restore-file" style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:var(--space-2)">بازیابی از فایل بک‌آپ</label>
        <input type="file" id="backup-restore-file" accept=".sql" />
        <p class="settings-panel-hint" style="color:var(--danger)">
          توجه: بازیابی، تمام داده‌های فعلی سایت را با محتوای فایل بک‌آپ جایگزین می‌کند و غیرقابل‌بازگشت است.
        </p>
        <div class="settings-panel-footer" style="justify-content:flex-start">
          <button type="button" class="btn btn-secondary" id="backup-restore-btn" disabled>بازیابی از این فایل</button>
        </div>
        <p class="error-text" id="backup-restore-error" hidden></p>
        <p class="settings-saved-note" id="backup-restore-success" hidden>بازیابی با موفقیت انجام شد.</p>
      </div>

      <div class="editor-sidebar-card">
        <h3>ارسال خودکار روزانه به گوگل درایو</h3>
        <p class="settings-panel-hint">
          با اتصال حساب گوگل خودتان، هر شب یک نسخه‌ی پشتیبان به‌صورت خودکار در Google Drive شما ذخیره می‌شود.
        </p>

        <div class="drive-connection-status" id="drive-connection-status"></div>

        <details class="drive-oauth-setup">
          <summary>راه‌اندازی اولیه (فقط یک‌بار لازم است)</summary>
          <ol class="settings-panel-hint" style="padding-inline-start:1.2rem; margin:var(--space-2) 0">
            <li>در <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Google Cloud Console → Credentials</a> یک «OAuth client ID» از نوع Web application بسازید.</li>
            <li>این آدرس را به‌عنوان «Authorized redirect URI» اضافه کنید: <code id="drive-redirect-uri" dir="ltr"></code></li>
            <li>شناسه (Client ID) و کلید (Client Secret) را اینجا وارد و ذخیره کنید.</li>
            <li>روی «اتصال به گوگل درایو» بزنید و با حساب گوگل خودتان وارد شوید.</li>
          </ol>
        </details>

        <div class="form-field" style="margin-top:var(--space-3)">
          <label for="backup-drive-client-id">Client ID</label>
          <input type="text" id="backup-drive-client-id" dir="ltr" placeholder="xxxxx.apps.googleusercontent.com" />
        </div>
        <div class="form-field">
          <label for="backup-drive-client-secret">Client Secret</label>
          <input type="password" id="backup-drive-client-secret" dir="ltr" placeholder="GOCSPX-..." />
        </div>
        <div class="form-field">
          <label for="backup-drive-folder">شناسه‌ی پوشه‌ی Google Drive (اختیاری)</label>
          <input type="text" id="backup-drive-folder" dir="ltr" placeholder="1AbCdEfG..." />
        </div>
        <label class="settings-inline-toggle"><input type="checkbox" id="backup-drive-enabled" /> ارسال خودکار روزانه فعال باشد</label>

        <p class="error-text" id="backup-drive-error" hidden></p>
        <div class="settings-panel-footer">
          <button type="button" class="btn btn-secondary" id="backup-drive-test-btn">ارسال آزمایشی الان</button>
          <button type="button" class="btn btn-secondary" id="backup-drive-save-btn">ذخیره تنظیمات</button>
          <button type="button" class="btn btn-primary" id="backup-drive-connect-btn">اتصال به گوگل درایو</button>
          <button type="button" class="btn btn-ghost" id="backup-drive-disconnect-btn" hidden>قطع اتصال</button>
        </div>
      </div>

      ${bi()}
    </div>
  `}function Hi(e,t){let n=document.getElementById(`settings-error`),r=document.getElementById(`settings-saved-note`);if(!n||!r)return;if(Pi(t=>e?.(`page-editor`,t)),t){let e=document.querySelector(`[data-settings-tab="${t}"]`);e&&(document.querySelectorAll(`[data-settings-tab]`).forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),document.querySelectorAll(`[data-settings-panel]`).forEach(e=>{e.hidden=e.dataset.settingsPanel!==t}))}let i=g();Wn().then(()=>Q(document.body));function a(){r.hidden=!1,window.setTimeout(()=>r.hidden=!0,2500)}function o(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}document.querySelectorAll(`[data-settings-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`[data-settings-tab]`).forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),document.querySelectorAll(`[data-settings-panel]`).forEach(t=>{t.hidden=t.dataset.settingsPanel!==e.dataset.settingsTab})})});let s={},c={};function l(e){let t=document.getElementById(`settings-${e}-preview`),n=document.getElementById(`settings-${e}-url`)?.value.trim();t&&(t.innerHTML=n?`<img src="${n}" alt="" />`:``)}function u(e){let t=document.getElementById(`settings-${e}-url`),n=document.getElementById(`settings-${e}-upload-btn`),r=document.getElementById(`settings-${e}-file-input`),i=document.getElementById(`settings-branding-upload-error`);!t||!n||!r||(t.addEventListener(`input`,()=>l(e)),n.addEventListener(`click`,()=>r.click()),r.addEventListener(`change`,async()=>{let a=r.files?.[0];if(!a)return;i&&(i.hidden=!0),n.disabled=!0;let o=n.textContent;n.textContent=`در حال آپلود...`;try{let n=await Se(a);t.value=n,l(e)}catch(e){i&&(i.hidden=!1,i.textContent=e instanceof Error?e.message:`آپلود عکس ناموفق بود.`)}finally{r.value=``,n.disabled=!1,n.textContent=o}}))}u(`logo`),u(`favicon`);function d(){let e=s.site_name??{fa:``,en:``};document.getElementById(`settings-site-name-fa`).value=e.fa??``,document.getElementById(`settings-site-name-en`).value=e.en??``,document.getElementById(`settings-language-mode`).value=s.language_mode??`both`;let t=s.branding??{};document.getElementById(`settings-logo-url`).value=t.logoUrl??``,document.getElementById(`settings-favicon-url`).value=t.faviconUrl??``,l(`logo`),l(`favicon`);let n=s.footer??{seoParagraphs:[],copyright:{fa:``,en:``}},r=document.getElementById(`settings-footer-paragraphs`);r.innerHTML=n.seoParagraphs.map((e,t)=>`
        <div class="settings-form-grid" data-footer-paragraph="${t}">
          <div class="form-field" data-i18n="fa"><label>پاراگراف ${t+1} (فارسی)</label><textarea rows="3" data-field="fa">${e.fa}</textarea></div>
          <div class="form-field" data-i18n="en"><label>پاراگراف ${t+1} (انگلیسی)</label><textarea rows="3" dir="ltr" data-field="en">${e.en}</textarea></div>
        </div>`).join(``),Q(r),document.getElementById(`settings-copyright-fa`).value=n.copyright?.fa??``,document.getElementById(`settings-copyright-en`).value=n.copyright?.en??``}document.querySelector(`[data-save-setting="site_name"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{await V(`site_name`,{fa:document.getElementById(`settings-site-name-fa`).value,en:document.getElementById(`settings-site-name-en`).value}),a()}catch(e){o(e)}finally{t.disabled=!1}}),document.querySelector(`[data-save-setting="language_mode"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{await V(`language_mode`,document.getElementById(`settings-language-mode`).value),a()}catch(e){o(e)}finally{t.disabled=!1}}),document.querySelector(`[data-save-setting="branding"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{await V(`branding`,{logoUrl:document.getElementById(`settings-logo-url`).value.trim(),faviconUrl:document.getElementById(`settings-favicon-url`).value.trim()}),a()}catch(e){o(e)}finally{t.disabled=!1}}),document.querySelector(`[data-save-setting="footer"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{await V(`footer`,{seoParagraphs:Array.from(document.querySelectorAll(`[data-footer-paragraph]`)).map(e=>({fa:e.querySelector(`[data-field="fa"]`).value,en:e.querySelector(`[data-field="en"]`).value})),copyright:{fa:document.getElementById(`settings-copyright-fa`).value,en:document.getElementById(`settings-copyright-en`).value}}),a()}catch(e){o(e)}finally{t.disabled=!1}});let f=[],p={enabled:!1,links:[]},m={enabled:!1,badges:[]};function h(){let e=document.getElementById(`social-links-list`);e&&(e.innerHTML=f.map((e,t)=>`
      <div class="settings-form-grid" data-social-link-index="${t}">
        <div class="form-field">
          <label>شبکه</label>
          <select data-field="platform">
            ${Fi.map(t=>`<option value="${t.value}" ${t.value===e.platform?`selected`:``}>${t.label}</option>`).join(``)}
          </select>
        </div>
        <div class="form-field"><label>برچسب</label><input type="text" data-field="label" value="${e.label}" /></div>
        <div class="form-field"><label>لینک</label><input type="text" dir="ltr" data-field="url" value="${e.url}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-social-link="${t}">حذف</button>
      </div>
    `).join(``))}function _(){f=Array.from(document.querySelectorAll(`[data-social-link-index]`)).map((e,t)=>({id:f[t]?.id??`social-${crypto.randomUUID().slice(0,8)}`,platform:e.querySelector(`[data-field="platform"]`).value,label:e.querySelector(`[data-field="label"]`).value,url:e.querySelector(`[data-field="url"]`).value}))}document.getElementById(`social-links-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove-social-link]`);t&&(_(),f.splice(Number(t.dataset.removeSocialLink),1),h())}),document.getElementById(`social-link-add-btn`)?.addEventListener(`click`,()=>{_(),f.push({id:`social-${crypto.randomUUID().slice(0,8)}`,platform:`globe`,label:``,url:``}),h()}),document.getElementById(`social-color-picker`)?.addEventListener(`input`,e=>{document.getElementById(`social-color-hex`).value=e.currentTarget.value});function v(){let e=s.contact??{phoneDisplay:``,phoneTelHref:``,socialLinks:[]};document.getElementById(`settings-phone-display`).value=e.phoneDisplay??``,document.getElementById(`settings-phone-tel`).value=e.phoneTelHref??``,document.getElementById(`social-color-hex`).value=e.socialIconColor??``,e.socialIconColor&&/^#[0-9a-fA-F]{6}$/.test(e.socialIconColor)&&(document.getElementById(`social-color-picker`).value=e.socialIconColor),f=e.socialLinks??[],h();let t=s.theme??{};document.getElementById(`theme-quick-actions-style`).value=t.quickActionsStyle===`fixed`?`fixed`:`floating`}document.querySelector(`[data-save-setting="contact"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{_(),await V(`contact`,{phoneDisplay:document.getElementById(`settings-phone-display`).value,phoneTelHref:document.getElementById(`settings-phone-tel`).value,socialIconColor:document.getElementById(`social-color-hex`).value.trim(),socialLinks:f});let e=document.getElementById(`theme-quick-actions-style`).value,t=s.theme??{};await V(`theme`,{...t,quickActionsStyle:e}),s.theme={...t,quickActionsStyle:e},a()}catch(e){o(e)}finally{t.disabled=!1}});function y(){let e=document.getElementById(`app-links-list`);e&&(e.innerHTML=p.links.map((e,t)=>`
      <div class="settings-form-grid" data-app-link-index="${t}">
        <div class="form-field">
          <label>پلتفرم</label>
          <select data-field="platform">
            ${Ii.map(t=>`<option value="${t.value}" ${t.value===e.platform?`selected`:``}>${t.label}</option>`).join(``)}
          </select>
        </div>
        <div class="form-field"><label>برچسب (اختیاری)</label><input type="text" data-field="label" value="${e.label}" /></div>
        <div class="form-field"><label>لینک دانلود</label><input type="text" dir="ltr" data-field="url" value="${e.url}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-app-link="${t}">حذف</button>
      </div>
    `).join(``))}function b(){let e=Array.from(document.querySelectorAll(`[data-app-link-index]`));p.links=e.map((e,t)=>({id:p.links[t]?.id??`app-${crypto.randomUUID().slice(0,8)}`,platform:e.querySelector(`[data-field="platform"]`).value,label:e.querySelector(`[data-field="label"]`).value,url:e.querySelector(`[data-field="url"]`).value}))}document.getElementById(`app-links-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove-app-link]`);t&&(b(),p.links.splice(Number(t.dataset.removeAppLink),1),y())}),document.getElementById(`app-link-add-btn`)?.addEventListener(`click`,()=>{b(),p.links.push({id:`app-${crypto.randomUUID().slice(0,8)}`,platform:`googlePlay`,label:``,url:``}),y()});function S(){let e=s.app_links??{enabled:!1,links:[]};p={enabled:e.enabled??!1,links:e.links??[]},document.getElementById(`applinks-enabled`).checked=p.enabled,y()}document.querySelector(`[data-save-setting="app_links"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{b(),p.enabled=document.getElementById(`applinks-enabled`).checked,await V(`app_links`,p),a()}catch(e){o(e)}finally{t.disabled=!1}});function C(){let e=document.getElementById(`certifications-list`);e&&(e.innerHTML=m.badges.map((e,t)=>`
      <div class="settings-form-grid" data-certification-index="${t}">
        <div class="form-field"><label>عنوان</label><input type="text" data-field="label" value="${e.label}" /></div>
        <div class="form-field"><label>لینک تصویر نماد</label><input type="text" dir="ltr" data-field="imageUrl" value="${e.imageUrl}" /></div>
        <div class="form-field"><label>لینک صفحه تایید</label><input type="text" dir="ltr" data-field="linkUrl" value="${e.linkUrl}" /></div>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-certification="${t}">حذف</button>
      </div>
    `).join(``))}function w(){let e=Array.from(document.querySelectorAll(`[data-certification-index]`));m.badges=e.map((e,t)=>({id:m.badges[t]?.id??`cert-${crypto.randomUUID().slice(0,8)}`,label:e.querySelector(`[data-field="label"]`).value,imageUrl:e.querySelector(`[data-field="imageUrl"]`).value,linkUrl:e.querySelector(`[data-field="linkUrl"]`).value}))}document.getElementById(`certifications-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove-certification]`);t&&(w(),m.badges.splice(Number(t.dataset.removeCertification),1),C())}),document.getElementById(`certification-add-btn`)?.addEventListener(`click`,()=>{w(),m.badges.push({id:`cert-${crypto.randomUUID().slice(0,8)}`,label:``,imageUrl:``,linkUrl:``}),C()});function T(){let e=s.certifications??{enabled:!1,badges:[]};m={enabled:e.enabled??!1,badges:e.badges??[]},document.getElementById(`certifications-enabled`).checked=m.enabled,C()}document.querySelector(`[data-save-setting="certifications"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{w(),m.enabled=document.getElementById(`certifications-enabled`).checked,await V(`certifications`,m),a()}catch(e){o(e)}finally{t.disabled=!1}});function E(e){let t=document.getElementById(`license-panel-content`);if(!t)return;if(!e){t.innerHTML=`<p class="pipeline-empty">اطلاعات لایسنسی ثبت نشده است.</p>`;return}let n=new Date(e.issuedAt).getTime(),r=new Date(e.expiresAt).getTime(),i=Date.now(),a=Math.max(1,Math.round((r-n)/864e5)),o=Math.max(0,Math.round((r-i)/864e5)),s=Math.min(100,Math.max(0,Math.round((i-n)/(r-n)*100))),c={active:`فعال`,trial:`آزمایشی`,expired:`منقضی‌شده`,invalid:`نامعتبر`,suspended:`معلق‌شده`,revoked:`باطل‌شده`,domain_mismatch:`دامنه مطابقت ندارد`,unreachable:`عدم دسترسی به سرور اعتبارسنجی`}[e.status]??e.status;t.innerHTML=`
      <div class="editor-sidebar-card license-card">
        <div class="plugin-card-head">
          <h3>${e.productName}</h3>
          <span class="article-status-badge article-status-${e.status===`active`?`published`:`draft`}">${c}</span>
        </div>
        <div class="license-grid">
          <div><label>کلید لایسنس</label><p dir="ltr">${e.key}</p></div>
          <div><label>طرح</label><p>${e.plan}</p></div>
          <div><label>متعلق به</label><p>${e.licensedTo}</p></div>
          <div><label>تاریخ صدور</label><p>${e.issuedAt}</p></div>
          <div><label>تاریخ انقضا</label><p>${e.expiresAt}</p></div>
          <div><label>روز باقی‌مانده</label><p class="license-days-left">${o} روز</p></div>
        </div>
        <div class="license-timeline">
          <div class="license-timeline-bar"><div class="license-timeline-fill" style="width:${s}%"></div></div>
          <div class="license-timeline-labels"><span>${a-o} روز گذشته</span><span>${o} روز مانده</span></div>
        </div>
      </div>
    `}function D(){let e=c.googleDrive??{enabled:!1,clientId:``,clientSecret:``,folderId:``};document.getElementById(`backup-drive-enabled`).checked=!!e.enabled,document.getElementById(`backup-drive-client-id`).value=e.clientId??``,document.getElementById(`backup-drive-client-secret`).value=e.clientSecret??``,document.getElementById(`backup-drive-folder`).value=e.folderId??``,O(!!e.refreshToken)}function O(e){let t=document.getElementById(`drive-connection-status`),n=document.getElementById(`backup-drive-disconnect-btn`);t&&(t.innerHTML=e?`<span class="article-status-badge article-status-published">متصل به گوگل درایو</span>`:`<span class="article-status-badge">هنوز متصل نشده</span>`),n&&(n.hidden=!e)}function ee(e,t){let n=document.getElementById(`theme-${e}`),r=document.getElementById(`theme-${e}-picker`);n&&(n.value=t),r&&/^#[0-9a-fA-F]{6}$/.test(t)&&(r.value=t)}function k(){let e=s.theme??{};Li.forEach(t=>ee(t.key,e[t.key]??Ri[t.key]))}document.querySelectorAll(`[data-theme-picker]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=e.dataset.themePicker;ee(t,e.value)})}),document.getElementById(`theme-reset-btn`)?.addEventListener(`click`,()=>{Li.forEach(e=>ee(e.key,Ri[e.key]))}),document.querySelector(`[data-save-setting="theme"]`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;t.disabled=!0;try{let e={};Li.forEach(t=>{let n=document.getElementById(`theme-${t.key}`).value.trim();e[t.key]=/^#[0-9a-fA-F]{6}$/.test(n)?n:Ri[t.key]}),e.quickActionsStyle=(s.theme??{}).quickActionsStyle===`fixed`?`fixed`:`floating`,await V(`theme`,e),s.theme=e,a()}catch(e){o(e)}finally{t.disabled=!1}}),Te().then(e=>{s=e,d(),v(),k(),S(),T()}).catch(o),i&&x(i,`plugins`)&&tt().then(e=>{c=e,D()}).catch(o),i&&x(i,`settings`)&&Me().then(e=>E(e)).catch(o);let A=document.getElementById(`license-key-input`),j=document.getElementById(`license-activate-btn`),te=document.getElementById(`license-activate-error`);j?.addEventListener(`click`,async()=>{if(!A||!te)return;let e=A.value.trim();if(te.hidden=!0,!e){te.hidden=!1,te.textContent=`کد لایسنس را وارد کنید.`;return}j.disabled=!0;try{let t=await Ne(e);A.value=``,E(t)}catch(e){te.hidden=!1,te.textContent=e instanceof Error?e.message:`فعال‌سازی لایسنس ناموفق بود.`}finally{j.disabled=!1}});let M=document.getElementById(`backup-download-btn`),N=document.getElementById(`backup-download-error`);M?.addEventListener(`click`,async()=>{if(N){N.hidden=!0,M.disabled=!0;try{await at()}catch(e){N.hidden=!1,N.textContent=e instanceof Error?e.message:`دریافت فایل پشتیبان ناموفق بود.`}finally{M.disabled=!1}}});let P=document.getElementById(`backup-restore-file`),F=document.getElementById(`backup-restore-btn`),I=document.getElementById(`backup-restore-error`),R=document.getElementById(`backup-restore-success`);P?.addEventListener(`change`,()=>{F&&(F.disabled=!P.files?.length),R&&(R.hidden=!0)}),F?.addEventListener(`click`,async()=>{if(!P||!I||!R)return;let e=P.files?.[0];if(e&&window.confirm(`با ادامه، تمام داده‌های فعلی سایت (درخواست‌ها، کارمندان، تنظیمات، محتوا و ...) با محتوای این فایل جایگزین می‌شود و این عمل غیرقابل‌بازگشت است. مطمئنید؟`)){I.hidden=!0,R.hidden=!0,F.disabled=!0;try{await ot(await e.text()),R.hidden=!1,P.value=``}catch(e){I.hidden=!1,I.textContent=e instanceof Error?e.message:`بازیابی پشتیبان ناموفق بود.`}finally{F.disabled=!P.files?.length}}});let z=document.getElementById(`drive-redirect-uri`);z&&(z.textContent=`${location.origin}/api/admin/backup/drive-oauth/callback`);let B=document.getElementById(`backup-drive-error`);document.getElementById(`backup-drive-save-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;if(B){B.hidden=!0,t.disabled=!0;try{let e=c.googleDrive??{};c={...c,googleDrive:{...e,enabled:document.getElementById(`backup-drive-enabled`).checked,clientId:document.getElementById(`backup-drive-client-id`).value.trim(),clientSecret:document.getElementById(`backup-drive-client-secret`).value.trim(),folderId:document.getElementById(`backup-drive-folder`).value.trim()}},await V(`plugins`,c),a()}catch(e){B.hidden=!1,B.textContent=e instanceof Error?e.message:`ذخیره تنظیمات ناموفق بود.`}finally{t.disabled=!1}}}),document.getElementById(`backup-drive-test-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;if(B){B.hidden=!0,t.disabled=!0,t.textContent=`در حال ارسال...`;try{await st(),a()}catch(e){B.hidden=!1,B.textContent=e instanceof Error?e.message:`ارسال آزمایشی ناموفق بود.`}finally{t.disabled=!1,t.textContent=`ارسال آزمایشی الان`}}}),document.getElementById(`backup-drive-connect-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;if(B){B.hidden=!0,t.disabled=!0;try{let e=await ct();window.location.href=e}catch(e){B.hidden=!1,B.textContent=e instanceof Error?e.message:`آماده‌سازی اتصال ناموفق بود.`,t.disabled=!1}}}),document.getElementById(`backup-drive-disconnect-btn`)?.addEventListener(`click`,async e=>{let t=e.currentTarget;if(B&&window.confirm(`اتصال به گوگل درایو قطع شود؟ ارسال خودکار روزانه متوقف می‌شود.`)){B.hidden=!0,t.disabled=!0;try{await lt(),O(!1);let e=document.getElementById(`backup-drive-enabled`);e&&(e.checked=!1)}catch(e){B.hidden=!1,B.textContent=e instanceof Error?e.message:`قطع اتصال ناموفق بود.`}finally{t.disabled=!1}}}),i&&x(i,`settings`)&&Ti()}var Ui=[{id:`gemini`,label:`Gemini`},{id:`deepseek`,label:`DeepSeek`},{id:`openai`,label:`ChatGPT (OpenAI)`},{id:`openrouter`,label:`OpenRouter`}];function Wi(e){return`
    <div class="editor-sidebar-card" data-ai-provider-card="${e.id}">
      <div class="plugin-card-head">
        <h3>${e.label}</h3>
        <label class="settings-inline-toggle"><input type="checkbox" data-ai-field="enabled" /> فعال</label>
      </div>
      <div class="settings-form-grid">
        <div class="form-field">
          <label>کلید API</label>
          <input type="text" dir="ltr" data-ai-field="apiKey" placeholder="sk-..." />
        </div>
        <div class="form-field">
          <label>مدل (اختیاری)</label>
          <input type="text" dir="ltr" data-ai-field="model" placeholder="پیش‌فرض کافی است" />
        </div>
        <div class="form-field">
          <label>اولویت</label>
          <input type="number" min="1" step="1" data-ai-field="priority" style="max-width: 90px" />
        </div>
      </div>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-secondary btn-sm" data-ai-test-btn>تست اتصال</button>
        <span data-ai-status></span>
      </div>
      <p class="error-text" data-ai-error hidden></p>
    </div>
  `}function Gi(){return`
    <div class="view-header">
      <h1>افزونه‌ها</h1>
    </div>
    <p class="error-text" id="plugins-error" hidden></p>
    <p class="settings-saved-note" id="plugins-saved-note" hidden>ذخیره شد.</p>

    <div class="editor-sidebar-card">
      <div class="plugin-card-head">
        <h3>پیامک (ملی‌پیامک)</h3>
        <label class="settings-inline-toggle"><input type="checkbox" id="settings-sms-enabled" /> فعال</label>
      </div>
      <p class="settings-panel-hint">نام کاربری و رمز عبور همان حساب پنل ملی‌پیامک شماست (نه یک توکن جدا).</p>
      <div class="settings-form-grid">
        <div class="form-field">
          <label for="settings-sms-username">نام کاربری پنل</label>
          <input type="text" id="settings-sms-username" dir="ltr" autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="settings-sms-password">رمز عبور پنل</label>
          <input type="password" id="settings-sms-password" dir="ltr" autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="settings-sms-body-id">شناسه پترن خط خدماتی</label>
          <input type="text" id="settings-sms-body-id" dir="ltr" required />
        </div>
      </div>
      <p class="settings-panel-hint">ارسال همیشه از طریق همین پترن (خط خدماتی اشتراکی) انجام می‌شود — چون پترن خودش خط ارسال را هم مشخص می‌کند، شماره‌ی خط جدا لازم نیست. شناسه‌ی پترن را باید قبلاً در پنل ملی‌پیامک ثبت کرده باشید.</p>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-secondary btn-sm" id="settings-sms-test-btn">تست اتصال</button>
        <span id="settings-sms-status"></span>
      </div>
      <p class="settings-panel-hint">«تست اتصال» فقط نام‌کاربری/رمز را ذخیره می‌کند (برای بررسی اعتبار)؛ شناسه‌ی پترن و بقیه‌ی تنظیمات این کارت را با دکمه‌ی زیر ذخیره کنید.</p>
      <p class="error-text" id="settings-sms-test-error" hidden></p>
      <label class="settings-inline-toggle">
        <input type="checkbox" id="settings-sms-auto-notify" />
        ارسال خودکار پیامک به مشتری در مراحل مهم (هماهنگی زمان، شروع کار، پایان کار، لغو درخواست)
      </label>
      <div class="editor-header-actions" style="margin-top: var(--space-3)">
        <button type="button" class="btn btn-primary btn-sm" id="settings-sms-save-btn">ذخیره پیامک</button>
        <span class="settings-saved-note" id="settings-sms-saved-note" hidden>ذخیره شد.</span>
      </div>
    </div>

    <h2 class="editor-section-title">دستیار هوش مصنوعی</h2>
    <p class="settings-panel-hint">
      هر ارائه‌دهنده مستقل است — می‌توانید فقط یکی را فعال کنید یا چند تا را هم‌زمان. اگر چند تا فعال باشند، طبق
      «اولویت» (عدد کوچک‌تر زودتر) امتحان می‌شوند: به محض جواب‌گرفتن از یکی، بقیه اصلاً صدا زده نمی‌شوند؛ فقط اگر
      ارائه‌دهنده‌ای جواب نداد (مثلاً اعتبارش تمام شده)، خودکار سراغ بعدی می‌رود — یعنی یک نسخه‌ی پشتیبان زنده،
      نه رقابت هم‌زمان چند تا با هم. کلیدها فقط برای حساب شمایند و جایی به‌جز این سرور فرستاده نمی‌شوند.
    </p>
    ${Ui.map(Wi).join(``)}

    <div class="settings-panel-footer">
      <button type="button" class="btn btn-primary" id="plugins-save-btn">ذخیره افزونه‌ها</button>
    </div>
  `}function Ki(e){let t=Date.now()-new Date(e).getTime(),n=Math.round(t/6e4);if(n<1)return`همین الان`;if(n<60)return`${n} دقیقه پیش`;let r=Math.round(n/60);return r<24?`${r} ساعت پیش`:`${Math.round(r/24)} روز پیش`}function qi(e,t){if(!e)return;if(!t){e.innerHTML=`<span class="article-status-badge">هنوز تست نشده</span>`;return}let n=t.ok?`article-status-published`:`article-status-draft`,r=t.ok?`متصل`:`قطع`;e.innerHTML=`<span class="article-status-badge ${n}" title="${t.message.replace(/"/g,`&quot;`)}">${r} · ${Ki(t.at)}</span>`}function Ji(e,t){qi(e.querySelector(`[data-ai-status]`),t)}function Yi(){let e=document.getElementById(`plugins-error`),t=document.getElementById(`plugins-saved-note`),n=document.getElementById(`plugins-save-btn`);if(!e||!t||!n)return;function r(){t.hidden=!1,window.setTimeout(()=>t.hidden=!0,2500)}function i(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}let a={};function o(e,t){return t[e]??{enabled:!1,apiKey:``,model:``,priority:Ui.findIndex(t=>t.id===e)+1}}function s(){let e=a.sms??{enabled:!1,username:``,password:``,bodyId:``,autoNotifyStatusChange:!1};document.getElementById(`settings-sms-enabled`).checked=!!e.enabled,document.getElementById(`settings-sms-username`).value=e.username??``,document.getElementById(`settings-sms-password`).value=e.password??``,document.getElementById(`settings-sms-body-id`).value=e.bodyId??``,document.getElementById(`settings-sms-auto-notify`).checked=!!e.autoNotifyStatusChange,qi(document.getElementById(`settings-sms-status`),e.lastCheck);let t=a.aiProviders;if(!t){let e=a.aiAssistant;t=e?.provider&&e.apiKey?{[e.provider]:{enabled:!0,apiKey:e.apiKey,model:e.model,priority:1}}:{}}Ui.forEach(e=>{let n=document.querySelector(`[data-ai-provider-card="${e.id}"]`);if(!n)return;let r=o(e.id,t);n.querySelector(`[data-ai-field="enabled"]`).checked=!!r.enabled,n.querySelector(`[data-ai-field="apiKey"]`).value=r.apiKey??``,n.querySelector(`[data-ai-field="model"]`).value=r.model??``,n.querySelector(`[data-ai-field="priority"]`).value=String(r.priority??Ui.findIndex(t=>t.id===e.id)+1),Ji(n,r.lastCheck)})}document.querySelectorAll(`[data-ai-provider-card]`).forEach(e=>{let t=e.dataset.aiProviderCard;e.querySelector(`[data-ai-test-btn]`)?.addEventListener(`click`,async n=>{let r=n.currentTarget,i=e.querySelector(`[data-ai-error]`),s=e.querySelector(`[data-ai-field="apiKey"]`).value.trim(),c=e.querySelector(`[data-ai-field="model"]`).value.trim();if(i&&(i.hidden=!0),!s){i&&(i.hidden=!1,i.textContent=`ابتدا کلید API را وارد کنید.`);return}r.disabled=!0,r.textContent=`در حال تست...`;let l={ok:!1,at:new Date().toISOString(),message:``};try{await Ee(t,s,c),l.ok=!0,l.message=`اتصال موفق بود.`}catch(e){l.message=e instanceof Error?e.message:`اتصال ناموفق بود.`,i&&(i.hidden=!1,i.textContent=l.message)}finally{r.disabled=!1,r.textContent=`تست اتصال`}let u=a.aiProviders??={},d=o(t,u);u[t]={...d,apiKey:s,model:c,lastCheck:l},a.aiProviders=u,Ji(e,l)})}),document.getElementById(`settings-sms-test-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`settings-sms-test-btn`),t=document.getElementById(`settings-sms-test-error`),n=document.getElementById(`settings-sms-username`).value.trim(),r=document.getElementById(`settings-sms-password`).value;if(t.hidden=!0,!n||!r){t.hidden=!1,t.textContent=`ابتدا نام کاربری و رمز عبور پنل را وارد کنید.`;return}e.disabled=!0,e.textContent=`در حال تست...`;let i={ok:!1,at:new Date().toISOString(),message:``};try{let e=await De(n,r);i.ok=!0,i.message=e.credit?`اتصال موفق — اعتبار باقی‌مانده: ${e.credit}`:`اتصال موفق بود.`,document.getElementById(`settings-sms-enabled`).checked=!0}catch(e){i.message=e instanceof Error?e.message:`اتصال ناموفق بود.`,t.hidden=!1,t.textContent=i.message}finally{e.disabled=!1,e.textContent=`تست اتصال`}let o=a.sms??{};a.sms={...o,username:n,password:r,lastCheck:i,enabled:i.ok?!0:o.enabled},qi(document.getElementById(`settings-sms-status`),i)}),document.getElementById(`settings-sms-save-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`settings-sms-save-btn`),t=document.getElementById(`settings-sms-saved-note`),n=document.getElementById(`settings-sms-test-error`),r=document.getElementById(`settings-sms-body-id`).value.trim();if(n.hidden=!0,t.hidden=!0,!r){n.hidden=!1,n.textContent=`شناسه‌ی پترن الزامی است.`;return}let i={...a.sms??{},enabled:document.getElementById(`settings-sms-enabled`).checked,username:document.getElementById(`settings-sms-username`).value.trim(),password:document.getElementById(`settings-sms-password`).value,bodyId:r,autoNotifyStatusChange:document.getElementById(`settings-sms-auto-notify`).checked};e.disabled=!0;try{await V(`plugins`,{...a,sms:i}),a.sms=i,t.hidden=!1,window.setTimeout(()=>t.hidden=!0,2500)}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`ذخیره ناموفق بود.`}finally{e.disabled=!1}}),n.addEventListener(`click`,async()=>{n.disabled=!0;try{let e={...a.aiProviders??{}};Ui.forEach(t=>{let n=document.querySelector(`[data-ai-provider-card="${t.id}"]`);if(!n)return;let r=o(t.id,e);e[t.id]={lastCheck:r.lastCheck,enabled:n.querySelector(`[data-ai-field="enabled"]`).checked,apiKey:n.querySelector(`[data-ai-field="apiKey"]`).value.trim(),model:n.querySelector(`[data-ai-field="model"]`).value.trim(),priority:Number(n.querySelector(`[data-ai-field="priority"]`).value)||Ui.findIndex(e=>e.id===t.id)+1}});let t=a.sms??{};a={...a,sms:{lastCheck:t.lastCheck,enabled:document.getElementById(`settings-sms-enabled`).checked,username:document.getElementById(`settings-sms-username`).value.trim(),password:document.getElementById(`settings-sms-password`).value,bodyId:document.getElementById(`settings-sms-body-id`).value.trim(),autoNotifyStatusChange:document.getElementById(`settings-sms-auto-notify`).checked},aiProviders:e},delete a.aiAssistant,await V(`plugins`,a),r()}catch(e){i(e)}finally{n.disabled=!1}}),tt().then(e=>{a=e,s()}).catch(i)}var Xi=[{id:`motorcycle`,label:`موتور`,labelEn:`Motorcycle`,icon:`motorcycle`,basePrice:18e4,perKmRate:6e3,floorCostExempt:!0,active:!0,sortOrder:1},{id:`pickup`,label:`وانت`,labelEn:`Pickup`,icon:`pickup`,basePrice:95e4,perKmRate:26e3,floorCostExempt:!1,active:!0,sortOrder:2},{id:`van`,label:`نیسان`,labelEn:`Van`,icon:`van`,basePrice:13e5,perKmRate:32e3,floorCostExempt:!1,active:!0,sortOrder:3},{id:`light-truck`,label:`خاور`,labelEn:`Light truck`,icon:`lightTruck`,basePrice:21e5,perKmRate:55e3,floorCostExempt:!1,active:!0,sortOrder:4},{id:`truck`,label:`کامیون`,labelEn:`Truck`,icon:`truck`,basePrice:3e6,perKmRate:9e4,floorCostExempt:!1,active:!0,sortOrder:5},{id:`trailer`,label:`تریلی`,labelEn:`Trailer`,icon:`trailer`,basePrice:45e5,perKmRate:14e4,floorCostExempt:!1,active:!0,sortOrder:6}],Zi=8;function Qi(e){let t=e.setup_completed;return typeof t==`boolean`?!t:!e.site_name?.fa}function $i(e){if(!e)return``;let t=e.replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).replace(/[^\d+]/g,``);return t?(t.startsWith(`00`)?t=`+`+t.slice(2):t.startsWith(`0`)?t=`+98`+t.slice(1):t.startsWith(`+`)||(t=t.startsWith(`98`)?`+`+t:`+98`+t),`tel:${t}`):``}function ea(){return`
    <div class="setup-wizard-screen">
      <div class="setup-wizard-card">
        <div class="setup-wizard-progress">
          <div class="setup-wizard-progress-bar"><div class="setup-wizard-progress-fill" id="setup-progress-fill"></div></div>
          <span class="setup-wizard-progress-text" id="setup-progress-text"></span>
        </div>

        <div data-setup-step="0" class="setup-wizard-step setup-wizard-welcome">
          <span class="icon setup-wizard-hero-icon">${u.settings}</span>
          <h2>راه‌اندازی اولیه‌ی سایت</h2>
          <p>بهبار را در چند قدم کوتاه مطابق سلیقه‌ی خودتان شخصی‌سازی کنید. همه‌ی این اطلاعات را بعداً هم از منوی «تنظیمات» می‌توانید تغییر دهید.</p>
        </div>

        <div data-setup-step="1" class="setup-wizard-step" hidden>
          <h2>نام سامانه</h2>
          <div class="form-field">
            <label for="setup-site-name-fa">نام فارسی (نمایش در هدر و متن‌ها)</label>
            <input type="text" id="setup-site-name-fa" placeholder="مثلاً بهبار" />
          </div>
          <div class="form-field">
            <label for="setup-site-name-en">نام انگلیسی (اختیاری)</label>
            <input type="text" id="setup-site-name-en" dir="ltr" placeholder="Behbar" />
          </div>
          <p class="error-text" id="setup-site-name-error" hidden>نام فارسی سایت را وارد کنید.</p>
        </div>

        <div data-setup-step="2" class="setup-wizard-step" hidden>
          <h2>لوگوی سایت</h2>
          <div class="form-field">
            <label for="setup-logo-url">آدرس تصویر لوگو (اختیاری)</label>
            <input type="text" id="setup-logo-url" dir="ltr" placeholder="https://.../logo.png" />
          </div>
          <p class="setup-wizard-hint">این را می‌توانید بعداً از «تنظیمات سایت» با آپلود مستقیم هم تغییر دهید.</p>
        </div>

        <div data-setup-step="3" class="setup-wizard-step" hidden>
          <h2>اطلاعات تماس</h2>
          <div class="form-field">
            <label for="setup-phone-display">شماره تماس</label>
            <input type="text" id="setup-phone-display" dir="ltr" placeholder="021-200200 یا 0912..." />
          </div>
          <p class="setup-wizard-hint">لینک شماره‌گیری مستقیم (جهت تماس با کلیک مشتریان) به‌صورت خودکار از روی همین شماره ساخته می‌شود.</p>
        </div>

        <div data-setup-step="4" class="setup-wizard-step" hidden>
          <h2>شهر مبدأ خدمات</h2>
          <p class="setup-wizard-hint">شهری که کار شما از آن‌جا شروع می‌شود — این شهر در فرم ثبت درخواست مشتریان از پیش انتخاب‌شده نمایش داده می‌شود.</p>
          <div class="settings-form-grid">
            <div class="form-field">
              <label for="setup-origin-province">استان</label>
              <input type="text" id="setup-origin-province" placeholder="مثلاً تهران" />
            </div>
            <div class="form-field">
              <label for="setup-origin-city">شهر</label>
              <input type="text" id="setup-origin-city" placeholder="مثلاً تهران" />
            </div>
          </div>
          <p class="setup-wizard-hint">این مرحله اختیاری است — اگر خالی بگذارید، مشتریان از بین همه‌ی شهرهای ایران انتخاب می‌کنند.</p>
        </div>

        <div data-setup-step="5" class="setup-wizard-step" hidden>
          <h2>قیمت پایه‌ی وسایل نقلیه</h2>
          <p class="setup-wizard-hint">این اعداد فقط یک نقطه‌ی شروع هستند؛ هر زمان از «ناوگان → تعریف وسیله» قابل تغییرند.</p>
          <div id="setup-vehicle-list" class="setup-wizard-vehicle-list"></div>
        </div>

        <div data-setup-step="6" class="setup-wizard-step" hidden>
          <h2>رمز عبور حساب مدیر</h2>
          <p class="setup-wizard-hint">برای امنیت بیشتر، رمز پیش‌فرض را همین حالا عوض کنید (اختیاری).</p>
          <div class="form-field">
            <label for="setup-new-password">رمز عبور جدید</label>
            <input type="password" id="setup-new-password" autocomplete="new-password" />
          </div>
          <div class="form-field">
            <label for="setup-confirm-password">تکرار رمز عبور</label>
            <input type="password" id="setup-confirm-password" autocomplete="new-password" />
          </div>
          <p class="error-text" id="setup-password-error" hidden></p>
        </div>

        <div data-setup-step="7" class="setup-wizard-step setup-wizard-welcome" hidden>
          <span class="icon setup-wizard-hero-icon setup-wizard-done-icon">${u.checkCircle}</span>
          <h2>آماده‌اید!</h2>
          <p>سایت شما تنظیم شد. می‌توانید همین حالا کار را شروع کنید و هر زمان خواستید این اطلاعات را از «تنظیمات سایت» تغییر دهید.</p>
        </div>

        <p class="error-text" id="setup-general-error" hidden></p>

        <div class="setup-wizard-footer">
          <button type="button" class="setup-wizard-skip-link" id="setup-skip-all">بعداً، رفتن به پنل</button>
          <div class="setup-wizard-nav-buttons">
            <button type="button" class="btn btn-secondary" id="setup-back" hidden>قبلی</button>
            <button type="button" class="btn btn-primary" id="setup-next">بعدی</button>
          </div>
        </div>
      </div>
    </div>
  `}function ta(e,t){let n=document.querySelector(`.setup-wizard-card`),r=document.getElementById(`setup-progress-fill`),i=document.getElementById(`setup-progress-text`),a=document.getElementById(`setup-back`),o=document.getElementById(`setup-next`),s=document.getElementById(`setup-skip-all`),c=document.getElementById(`setup-general-error`),l=document.getElementById(`setup-vehicle-list`);if(!n||!r||!i||!a||!o||!s||!c||!l)return;let u=0,d={},f=Xi;function p(){l.innerHTML=f.map((e,t)=>`
        <div class="setup-wizard-vehicle-row">
          <span class="setup-wizard-vehicle-label">${e.label}</span>
          <div class="form-field">
            <label>قیمت پایه (تومان)</label>
            <input type="number" min="0" step="1000" data-vehicle-base-price="${t}" value="${e.basePrice}" />
          </div>
          <div class="form-field">
            <label>هر کیلومتر (تومان)</label>
            <input type="number" min="0" step="1000" data-vehicle-per-km="${t}" value="${e.perKmRate}" />
          </div>
        </div>
      `).join(``)}function m(){document.querySelectorAll(`[data-setup-step]`).forEach(e=>{e.hidden=e.dataset.setupStep!==String(u)}),r.style.width=`${(u+1)/Zi*100}%`,i.textContent=`مرحله ${u+1} از ${Zi}`,a.hidden=u===0,o.textContent=u===7?`شروع کار با پنل`:u===0?`شروع`:`بعدی`,c.hidden=!0}async function h(){c.hidden=!0;try{if(u===1){let e=document.getElementById(`setup-site-name-fa`).value.trim(),t=document.getElementById(`setup-site-name-en`).value.trim(),n=document.getElementById(`setup-site-name-error`);if(!e)return n.hidden=!1,!1;n.hidden=!0,await V(`site_name`,{fa:e,en:t})}else if(u===2){let e=document.getElementById(`setup-logo-url`).value.trim();e&&await V(`branding`,{...d.branding??{},logoUrl:e})}else if(u===3){let e=document.getElementById(`setup-phone-display`).value.trim();if(e){let t=$i(e);await V(`contact`,{...d.contact??{},phoneDisplay:e,phoneTelHref:t})}}else if(u===4){let e=document.getElementById(`setup-origin-province`).value.trim(),t=document.getElementById(`setup-origin-city`).value.trim();t&&e&&await V(`service_cities`,{coverageMode:`all`,destinationCities:[],internationalShippingEnabled:!1,...d.service_cities??{},originCity:{city:t,cityEn:``,province:e,provinceEn:``}})}else if(u===5)await V(`vehicle_types`,f.map((e,t)=>({...e,basePrice:Number(l.querySelector(`[data-vehicle-base-price="${t}"]`)?.value)||e.basePrice,perKmRate:Number(l.querySelector(`[data-vehicle-per-km="${t}"]`)?.value)||e.perKmRate})));else if(u===6){let t=document.getElementById(`setup-new-password`).value,n=document.getElementById(`setup-confirm-password`).value,r=document.getElementById(`setup-password-error`);if(t||n){if(t.length<6)return r.hidden=!1,r.textContent=`رمز عبور باید حداقل ۶ کاراکتر باشد.`,!1;if(t!==n)return r.hidden=!1,r.textContent=`رمز عبور و تکرار آن یکسان نیستند.`,!1;r.hidden=!0,await se(e.id,{password:t})}}else u===7&&await V(`setup_completed`,!0);return!0}catch(e){return c.hidden=!1,c.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`,!1}}o.addEventListener(`click`,async()=>{o.disabled=!0;let e=await h();if(o.disabled=!1,e){if(u===7){t(!1);return}u+=1,m()}}),a.addEventListener(`click`,()=>{u!==0&&(--u,m())}),s.addEventListener(`click`,async()=>{s.disabled=!0;try{await V(`setup_completed`,!0)}catch{}t(!0)}),Te().then(e=>{d=e;let t=d.site_name??{};document.getElementById(`setup-site-name-fa`).value=t.fa??``,document.getElementById(`setup-site-name-en`).value=t.en??``;let n=d.branding??{};document.getElementById(`setup-logo-url`).value=n.logoUrl??``;let r=d.contact??{};document.getElementById(`setup-phone-display`).value=r.phoneDisplay??``;let i=d.service_cities;document.getElementById(`setup-origin-province`).value=i?.originCity?.province??``,document.getElementById(`setup-origin-city`).value=i?.originCity?.city??``;let a=d.vehicle_types;f=a&&a.length?a:Xi,p()}).catch(()=>{p()}),m()}function na(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function ra(e){let t=[];return e.metaTitle||t.push(`عنوان سئو`),e.metaDescription||t.push(`توضیحات سئو`),`
    <div class="testimonial-row" data-audit-edit="${e.id}" role="button" tabindex="0">
      <div class="testimonial-row-avatar"><span class="icon">${u.article}</span></div>
      <div class="testimonial-row-body">
        <div class="testimonial-row-head">
          <strong>${na(e.title)}</strong>
          <span class="article-status-badge article-status-draft">فاقد ${t.join(` و `)}</span>
        </div>
        <div class="job-application-meta"><span dir="ltr">/magazine/${na(e.slug)}</span></div>
      </div>
    </div>
  `}function ia(){return`
    <div class="view-header">
      <h1>مدیریت سئو</h1>
    </div>
    <p class="error-text" id="seo-error" hidden></p>

    <div class="editor-sidebar-card">
      <h3>Google Search Console</h3>
      <div class="settings-form-grid">
        <div class="form-field">
          <label for="seo-search-console">کد تأیید Search Console</label>
          <input type="text" id="seo-search-console" dir="ltr" placeholder="مثلاً abcdEFGH12345..." />
        </div>
      </div>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" id="seo-search-console-save-btn">ذخیره</button>
      </div>
    </div>

    <div class="editor-sidebar-card">
      <h3>Google Analytics</h3>
      <div class="settings-form-grid">
        <div class="form-field">
          <label for="seo-ga-id">شناسه Google Analytics (GA4)</label>
          <input type="text" id="seo-ga-id" dir="ltr" placeholder="G-XXXXXXXXXX" />
        </div>
      </div>
      <div class="settings-panel-footer">
        <button type="button" class="btn btn-primary" id="seo-ga-save-btn">ذخیره</button>
      </div>
    </div>

    <div class="editor-sidebar-card">
      <h3>بازبینی سئوی مقاله‌ها</h3>
      <p class="settings-panel-hint">مقاله‌هایی که عنوان یا توضیحات سئو ندارند، اینجا فهرست می‌شوند — با کلیک روی هرکدام مستقیم به ویرایشگرش می‌روید.</p>
      <div id="seo-audit-list"></div>
    </div>
  `}function aa(e=()=>{}){let t=document.getElementById(`seo-error`),n=document.getElementById(`seo-audit-list`);if(!t||!n)return;let r=``;function i(e){let t=e.textContent;e.classList.add(`btn-success`),e.textContent=`ذخیره شد ✓`,window.setTimeout(()=>{e.classList.remove(`btn-success`),e.textContent=t},1800),zn(`تنظیمات سئو ذخیره شد.`)}function a(e){t.hidden=!1,t.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`,zn(e instanceof Error?e.message:`ذخیره ناموفق بود.`,`error`)}async function o(){let e=(await Te()).seo??{};document.getElementById(`seo-search-console`).value=e.googleSiteVerification??``,document.getElementById(`seo-ga-id`).value=e.googleAnalyticsId??``,r=e.defaultOgImage??``}async function s(){let t=(await de()).filter(e=>!e.metaTitle||!e.metaDescription);n.innerHTML=t.length?t.map(ra).join(``):`<p class="pipeline-empty">همه‌ی مقاله‌ها عنوان و توضیحات سئو دارند.</p>`,n.querySelectorAll(`[data-audit-edit]`).forEach(t=>{t.addEventListener(`click`,()=>e(Number(t.dataset.auditEdit)))})}function c(){return{googleSiteVerification:document.getElementById(`seo-search-console`).value.trim(),googleAnalyticsId:document.getElementById(`seo-ga-id`).value.trim(),defaultOgImage:r}}function l(e){document.getElementById(e)?.addEventListener(`click`,async e=>{let n=e.currentTarget;n.disabled=!0;try{t.hidden=!0,await V(`seo`,c()),i(n)}catch(e){a(e)}finally{n.disabled=!1}})}l(`seo-search-console-save-btn`),l(`seo-ga-save-btn`),Promise.all([o(),s()]).catch(a)}function oa(){return`
    <div class="settings-view">
      <div class="settings-panel">
        <h2>امنیت حساب</h2>
        <p class="settings-panel-hint">ورود دومرحله‌ای، لایه‌ی امنیتی اضافه‌ای است — حتی اگر رمز عبورتان لو برود، ورود بدون کد پیامکی ممکن نیست.</p>

        <div class="editor-sidebar-card" id="account-security-status-card">
          ${g()?.twoFactorEnabled??!1?`
            <p><strong>وضعیت فعلی:</strong> ورود دومرحله‌ای پیامکی فعال است.</p>
            <form id="account-security-disable-form" style="display:flex; flex-direction:column; gap: var(--space-3);">
              <div class="form-field">
                <label for="account-security-disable-password">برای غیرفعال‌سازی، رمز عبور فعلی را وارد کنید</label>
                <input type="password" id="account-security-disable-password" autocomplete="current-password" required />
              </div>
              <p class="error-text" id="account-security-disable-error" hidden></p>
              <button type="submit" class="btn btn-ghost" id="account-security-disable-btn">غیرفعال‌سازی ورود دومرحله‌ای</button>
            </form>
          `:`
            <p><strong>وضعیت فعلی:</strong> ورود دومرحله‌ای فعال نیست.</p>
            <button type="button" class="btn btn-primary" id="account-security-start-sms">فعال‌سازی ورود دومرحله‌ای پیامکی</button>
          `}
        </div>

        <div class="editor-sidebar-card" id="account-security-sms-setup-card" hidden>
          <p>یک کد ۶رقمی به شماره‌ی ثبت‌شده‌ی شما پیامک شد.</p>
          ${kt(`account-security-sms`)}
          <p class="error-text" id="account-security-sms-error" hidden></p>
          <p class="login-2fa-verifying" id="account-security-sms-verifying" hidden>در حال تأیید...</p>
        </div>
      </div>
    </div>
  `}function sa(){let e=document.getElementById(`account-security-status-card`),t=document.getElementById(`account-security-sms-setup-card`),n=document.getElementById(`account-security-sms-error`),r=document.getElementById(`account-security-sms-verifying`);async function i(e,t){n.hidden=!0,r.hidden=!1;try{await k(e),window.location.reload()}catch(e){r.hidden=!0,n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`,t?.reset()}}document.getElementById(`account-security-start-sms`)?.addEventListener(`click`,()=>{(async()=>{try{await ee(),e.hidden=!0,t.hidden=!1;let n=K(`account-security-sms`,{onComplete:e=>void i(e,n),onResend:()=>void ee().catch(e=>window.alert(e instanceof Error?e.message:`ارسال دوباره‌ی کد ناموفق بود.`))})}catch(e){window.alert(e instanceof Error?e.message:`خطایی پیش آمد.`)}})()}),document.getElementById(`account-security-disable-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`account-security-disable-password`),n=document.getElementById(`account-security-disable-error`);(async()=>{n.hidden=!0;try{await A(t.value),window.location.reload()}catch(e){n.hidden=!1,n.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}})()})}function ca(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var la={salary:`حقوق`,bonus:`پاداش`,adjustment:`اصلاحیه`,payout:`تسویه`};function ua(){return`
    <div class="view-header">
      <h1>حقوق و دستمزد</h1>
    </div>
    <p class="settings-panel-hint">
      این بخش یک دفتر حسابداری داخلی است، نه پرداخت خودکار — هیچ مبلغی واقعاً جابه‌جا نمی‌شود. وقتی مبلغی را
      واقعاً (مثلاً با کارت‌به‌کارت) پرداخت کردید، همین‌جا ثبتش کنید تا موجودی به‌روز شود.
    </p>

    <div class="settings-tabs">
      <button type="button" class="settings-tab is-active" data-payroll-tab="balances">موجودی‌ها</button>
      <button type="button" class="settings-tab" data-payroll-tab="payroll">پردازش حقوق ماهانه</button>
      <button type="button" class="settings-tab" data-payroll-tab="payouts">درخواست‌های تسویه</button>
      <button type="button" class="settings-tab" data-payroll-tab="rates">نرخ نقش‌ها</button>
    </div>

    <div data-payroll-panel="balances">
      <p class="error-text" id="balances-error" hidden></p>
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead>
            <tr><th>نام</th><th>نقش</th><th>موجودی</th><th>عملیات</th></tr>
          </thead>
          <tbody id="balances-table-body"></tbody>
        </table>
      </div>
    </div>

    <div data-payroll-panel="payroll" hidden>
      <p class="error-text" id="payroll-error" hidden></p>
      <div class="editor-sidebar-card">
        <div class="form-field" style="max-width: 220px">
          <label for="payroll-month">ماه</label>
          <input type="month" id="payroll-month" />
        </div>
        <button type="button" class="btn btn-secondary" id="payroll-preview-btn">نمایش پیش‌نمایش</button>
      </div>
      <div id="payroll-preview-wrap" hidden>
        <div class="staff-table-wrapper">
          <table class="staff-table">
            <thead><tr><th>نام</th><th>نقش</th><th></th><th>مبلغ</th><th>وضعیت</th></tr></thead>
            <tbody id="payroll-preview-body"></tbody>
          </table>
        </div>
        <div class="editor-header-actions" style="margin-top: var(--space-4)">
          <button type="button" class="btn btn-primary" id="payroll-confirm-btn">تأیید و واریز به کیف پول</button>
        </div>
        <p class="settings-saved-note" id="payroll-result" hidden></p>
      </div>
    </div>

    <div data-payroll-panel="payouts" hidden>
      <p class="error-text" id="payouts-error" hidden></p>
      <div id="payouts-list"></div>
    </div>

    <div data-payroll-panel="rates" hidden>
      <p class="error-text" id="rates-error" hidden></p>
      <p class="settings-saved-note" id="rates-saved-note" hidden>ذخیره شد.</p>
      <div class="staff-table-wrapper">
        <table class="staff-table">
          <thead><tr><th>نقش</th><th>حقوق ماهانه (تومان)</th><th>نوع پاداش</th><th>مقدار پاداش</th><th></th></tr></thead>
          <tbody id="role-rates-body"></tbody>
        </table>
      </div>
    </div>

    <div class="editor-sidebar-card" id="wallet-tx-modal" hidden>
      <div class="plugin-card-head">
        <h3 id="wallet-tx-modal-title">تراکنش‌ها</h3>
        <button type="button" class="btn btn-ghost btn-sm" id="wallet-tx-modal-close">بستن</button>
      </div>
      <div id="wallet-tx-modal-list"></div>
    </div>

    <div class="editor-sidebar-card" id="wallet-adjustment-modal" hidden>
      <div class="plugin-card-head">
        <h3>ثبت اصلاحیه</h3>
        <button type="button" class="btn btn-ghost btn-sm" id="wallet-adjustment-modal-close">بستن</button>
      </div>
      <form id="wallet-adjustment-form" style="display:flex; flex-direction:column; gap: var(--space-3);">
        <div class="settings-form-grid">
          <div class="form-field">
            <label for="adjustment-direction">نوع</label>
            <select id="adjustment-direction">
              <option value="credit">واریز (طلب کارمند)</option>
              <option value="debit">برداشت (کسر از موجودی)</option>
            </select>
          </div>
          <div class="form-field">
            <label for="adjustment-amount">مبلغ (تومان)</label>
            <input type="number" id="adjustment-amount" min="1" dir="ltr" required />
          </div>
        </div>
        <div class="form-field">
          <label for="adjustment-description">توضیح</label>
          <input type="text" id="adjustment-description" maxlength="200" required />
        </div>
        <p class="error-text" id="adjustment-error" hidden></p>
        <button type="submit" class="btn btn-primary" id="adjustment-submit">ثبت</button>
      </form>
    </div>
  `}function da(e){return`
    <tr>
      <td>${ca(e.fullName)}${e.isActive?``:` <span class="settings-panel-hint">(غیرفعال)</span>`}</td>
      <td>${ca(e.roleLabel)}</td>
      <td><strong>${J(e.balance)}</strong></td>
      <td>
        <div class="staff-table-actions">
          <button type="button" class="btn btn-ghost btn-sm" data-wallet-view-tx="${e.staffId}" data-wallet-staff-name="${ca(e.fullName)}">تراکنش‌ها</button>
          <button type="button" class="btn btn-ghost btn-sm" data-wallet-adjust="${e.staffId}">ثبت اصلاحیه</button>
        </div>
      </td>
    </tr>
  `}function fa(e){let t=e.direction===`credit`?`+`:`−`,n=e.direction===`credit`?`var(--success)`:`var(--danger)`;return`
    <div class="activity-log-row">
      <div class="activity-log-main">
        <span class="activity-log-action">${la[e.type]??e.type}</span>
        <span class="activity-log-target">${ca(e.description)}</span>
      </div>
      <div class="activity-log-meta"><span style="color:${n}; font-weight:700;">${t} ${J(e.amount)}</span></div>
    </div>
  `}function pa(e){return`
    <div class="editor-sidebar-card">
      <div class="plugin-card-head">
        <h3>${ca(e.staffName)} — ${J(e.amount)}</h3>
      </div>
      ${e.staffNote?`<p class="settings-panel-hint">${ca(e.staffNote)}</p>`:``}
      <div class="staff-table-actions">
        <button type="button" class="btn btn-primary btn-sm" data-payout-approve="${e.id}">تأیید</button>
        <button type="button" class="btn btn-ghost btn-sm" data-payout-reject="${e.id}">رد</button>
      </div>
    </div>
  `}function ma(e){return`
    <tr data-role-rate-row="${e.id}">
      <td>${ca(e.label)}${e.isSystem?` <span class="settings-panel-hint">(سیستمی)</span>`:``}</td>
      <td><input type="number" min="0" dir="ltr" data-field="salary" value="${e.defaultSalaryAmount}" style="width:100%" /></td>
      <td>
        <select data-field="bonusType">
          <option value="flat" ${e.defaultBonusType===`flat`?`selected`:``}>مبلغ ثابت</option>
          <option value="percent" ${e.defaultBonusType===`percent`?`selected`:``}>درصد برآورد</option>
        </select>
      </td>
      <td><input type="number" min="0" dir="ltr" data-field="bonusAmount" value="${e.defaultBonusAmount}" style="width:100%" /></td>
      <td><button type="button" class="btn btn-primary btn-sm" data-role-rate-save="${e.id}">ذخیره</button></td>
    </tr>
  `}function ha(){document.querySelectorAll(`[data-payroll-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`[data-payroll-tab]`).forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),document.querySelectorAll(`[data-payroll-panel]`).forEach(t=>{t.hidden=t.dataset.payrollPanel!==e.dataset.payrollTab})})});let e=document.getElementById(`balances-error`),t=document.getElementById(`balances-table-body`);async function n(){e.hidden=!0;try{let e=await bt();t.innerHTML=e.length?e.map(da).join(``):`<tr><td colspan="4">کارمندی ثبت نشده.</td></tr>`}catch(t){e.hidden=!1,e.textContent=t instanceof Error?t.message:`خطایی پیش آمد.`}}let r=document.getElementById(`wallet-tx-modal`),i=document.getElementById(`wallet-tx-modal-title`),a=document.getElementById(`wallet-tx-modal-list`);document.getElementById(`wallet-tx-modal-close`)?.addEventListener(`click`,()=>r.hidden=!0),t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-wallet-view-tx]`);if(t){let e=Number(t.dataset.walletViewTx),n=t.dataset.walletStaffName??``;i.textContent=`تراکنش‌های ${n}`,a.innerHTML=`<p class="settings-panel-hint">در حال بارگذاری...</p>`,r.hidden=!1,xt(e,50,0).then(({transactions:e})=>{a.innerHTML=e.length?e.map(fa).join(``):`<p class="settings-panel-hint">تراکنشی ثبت نشده.</p>`});return}let n=e.target.closest(`[data-wallet-adjust]`);n&&(o.dataset.staffId=n.dataset.walletAdjust,o.hidden=!1)});let o=document.getElementById(`wallet-adjustment-modal`);document.getElementById(`wallet-adjustment-modal-close`)?.addEventListener(`click`,()=>o.hidden=!0),document.getElementById(`wallet-adjustment-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=Number(o.dataset.staffId),r=document.getElementById(`adjustment-direction`).value,i=Number(document.getElementById(`adjustment-amount`).value),a=document.getElementById(`adjustment-description`).value.trim(),s=document.getElementById(`adjustment-error`),c=document.getElementById(`adjustment-submit`);if(s.hidden=!0,!Number.isFinite(i)||i<=0||!a){s.hidden=!1,s.textContent=`مبلغ و توضیح را کامل وارد کنید.`;return}c.disabled=!0,St(t,r,i,a).then(()=>(o.hidden=!0,document.getElementById(`wallet-adjustment-form`).reset(),n())).catch(e=>{s.hidden=!1,s.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}).finally(()=>{c.disabled=!1})});let s=document.getElementById(`payroll-error`),c=document.getElementById(`payroll-preview-wrap`),l=document.getElementById(`payroll-preview-body`),u=document.getElementById(`payroll-result`),d=document.getElementById(`payroll-month`);d.value=new Date().toISOString().slice(0,7);function f(e){return`
      <tr data-payroll-entry="${e.staffId}">
        <td>${ca(e.fullName)}</td>
        <td>${ca(e.roleLabel)}</td>
        <td><input type="checkbox" data-field="include" ${e.alreadyProcessed?`disabled`:`checked`} /></td>
        <td><input type="number" min="0" dir="ltr" data-field="amount" value="${e.amount}" ${e.alreadyProcessed?`disabled`:``} style="width:120px" /></td>
        <td>${e.alreadyProcessed?`<span class="article-status-badge article-status-published">قبلاً واریز شده</span>`:``}</td>
      </tr>
    `}document.getElementById(`payroll-preview-btn`)?.addEventListener(`click`,()=>{s.hidden=!0,u.hidden=!0,Dt(d.value).then(e=>{l.innerHTML=e.map(f).join(``),c.hidden=!1}).catch(e=>{s.hidden=!1,s.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`})}),document.getElementById(`payroll-confirm-btn`)?.addEventListener(`click`,()=>{let e=[];document.querySelectorAll(`[data-payroll-entry]`).forEach(t=>{let n=t.querySelector(`[data-field="include"]`),r=t.querySelector(`[data-field="amount"]`);n?.checked&&r&&Number(r.value)>0&&e.push({staffId:Number(t.dataset.payrollEntry),amount:Number(r.value)})}),e.length&&(s.hidden=!0,Ot(d.value,e).then(e=>{u.hidden=!1,u.textContent=`${e.processed} نفر پردازش شد.${e.skipped.length?` (${e.skipped.length} مورد رد شد — قبلاً واریز شده یا نامعتبر بود)`:``}`,n()}).catch(e=>{s.hidden=!1,s.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}))});let p=document.getElementById(`payouts-error`),m=document.getElementById(`payouts-list`);async function h(){p.hidden=!0;try{let e=await wt(`pending`);m.innerHTML=e.length?e.map(pa).join(``):`<p class="settings-panel-hint">درخواست در انتظاری نیست.</p>`}catch(e){p.hidden=!1,p.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}m.addEventListener(`click`,e=>{let t=e.target.closest(`[data-payout-approve]`);if(t){Tt(Number(t.dataset.payoutApprove)).then(()=>Promise.all([h(),n()])).catch(e=>{p.hidden=!1,p.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`});return}let r=e.target.closest(`[data-payout-reject]`);if(r){let e=window.prompt(`دلیل رد (اختیاری):`)??void 0;Et(Number(r.dataset.payoutReject),e).then(()=>h()).catch(e=>{p.hidden=!1,p.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`})}});let g=document.getElementById(`rates-error`),_=document.getElementById(`rates-saved-note`),v=document.getElementById(`role-rates-body`);async function y(){g.hidden=!0;try{let{roles:e}=await re();v.innerHTML=e.map(ma).join(``)}catch(e){g.hidden=!1,g.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`}}v.addEventListener(`click`,e=>{let t=e.target.closest(`[data-role-rate-save]`);if(!t)return;let n=t.closest(`[data-role-rate-row]`),r=Number(n.dataset.roleRateRow),i=Number(n.querySelector(`[data-field="salary"]`).value),a=n.querySelector(`[data-field="bonusType"]`).value,o=Number(n.querySelector(`[data-field="bonusAmount"]`).value);g.hidden=!0,Ct(r,{defaultSalaryAmount:i,defaultBonusType:a,defaultBonusAmount:o}).then(()=>{_.hidden=!1,window.setTimeout(()=>_.hidden=!0,2500)}).catch(e=>{g.hidden=!1,g.textContent=e instanceof Error?e.message:`خطایی پیش آمد.`})}),n(),h(),y()}function ga(e,t,n){return`
    <button type="button" class="home-tile" data-home-tile="${e}">
      <span class="home-tile-icon">${t}</span>
      <span class="home-tile-label">${n}</span>
    </button>
  `}function _a(e){let t=x(e,`content`)||x(e,`stories`)||x(e,`seo`)||x(e,`settings`),n=x(e,`staff`)||x(e,`recruitment`)||x(e,`roles`)||x(e,`wallet`),r=x(e,`settings`)||x(e,`homepage`),i=x(e,`pipeline`)||x(e,`map`),a=[];return i&&a.push(ga(`requests`,u.columns,`درخواست‌ها`)),x(e,`dashboard`)&&a.push(ga(`dashboard`,u.chart,`داشبورد`)),x(e,`chat`)&&a.push(ga(`chat`,u.chat,`چت پشتیبانی`)),t&&a.push(ga(`content`,u.grid,`مدیریت محتوا`)),n&&a.push(ga(`personnel`,u.users,`مدیریت پرسنل`)),x(e,`staff`)&&a.push(ga(`fleet`,u.truck,`مدیریت ناوگان حمل‌ونقل`)),x(e,`plugins`)&&a.push(ga(`plugins`,u.plugin,`افزونه‌ها`)),r&&a.push(ga(`settings`,u.settings,`تنظیمات سایت`)),`<div class="home-grid">${a.join(``)}</div>`}function va(e){let t=[];return x(e,`pipeline`)&&t.push(ga(`pipeline`,u.columns,`مراحل درخواست‌ها`)),x(e,`map`)&&t.push(ga(`map`,u.map,`نقشه درخواست‌ها`)),`<div class="home-grid">${t.join(``)}</div>`}function ya(e){let t=[];return x(e,`content`)&&t.push(ga(`magazine`,u.article,`مجله`)),x(e,`content`)&&t.push(ga(`testimonials`,u.message,`نظرات مشتریان`)),x(e,`stories`)&&t.push(ga(`stories`,u.story,`استوری‌ها`)),x(e,`seo`)&&t.push(ga(`seo`,u.seo,`مدیریت سئو`)),(x(e,`content`)||x(e,`settings`))&&t.push(ga(`media`,u.image,`مدیریت فایل`)),`<div class="home-grid">${t.join(``)}</div>`}function ba(e){let t=[];return x(e,`staff`)&&t.push(ga(`staff`,u.users,`کارمندان`)),x(e,`recruitment`)&&t.push(ga(`jobApplications`,u.briefcase,`فرصت‌های شغلی`)),x(e,`roles`)&&t.push(ga(`roles`,u.lock,`نقش‌ها و اختیارات`)),(x(e,`staff`)||x(e,`roles`))&&t.push(ga(`activityLog`,u.history,`گزارش فعالیت`)),x(e,`wallet`)&&t.push(ga(`payroll`,u.wallet,`حقوق و دستمزد`)),`<div class="home-grid">${t.join(``)}</div>`}function xa(e,t){e.querySelectorAll(`[data-home-tile]`).forEach(e=>{e.addEventListener(`click`,()=>t(e.dataset.homeTile??``))})}async function Sa(){try{let e=(await Te()).site_name?.fa?.trim();if(!e||e===`بهبار`)return;document.querySelectorAll(`#login-brand-text, .admin-logo-title, #staff-portal-brand-text`).forEach(t=>{t.textContent?.includes(`بهبار`)&&(t.textContent=t.textContent.replace(/بهبار/g,e))})}catch{}}function Ca(e){return e===`home`?null:e===`requests`||e===`content`||e===`personnel`||e===`dashboard`?`home`:e===`pipeline`||e===`map`?`requests`:e===`magazine`||e===`testimonials`||e===`stories`||e===`seo`||e===`media`?`content`:e===`staff`||e===`jobApplications`||e===`roles`||e===`activityLog`||e===`payroll`?`personnel`:e===`staffHistory`?`staff`:e===`dashboardOrders`||e===`dashboardVisitors`||e===`dashboardStaff`?`dashboard`:e===`magazine-editor`?`magazine`:e===`page-editor`||e===`pages`?`settings`:`home`}function wa(){let e=document.querySelector(`#app`);if(!e)throw Error(`#app not found`);return e}function Ta(){let e=wa();e.innerHTML=At(),jt(Na),Sa()}var Ea=`home`,Da=null;function $(e,t=null){let n=document.getElementById(`view-container`),r=document.getElementById(`admin-back-btn`),i=g();if(!(!n||!i)){if(Ea=e,r&&(r.hidden=e===`home`),v({screen:e,extra:e===`magazine-editor`||e===`page-editor`?t:e===`staffHistory`?Da:void 0}),document.querySelectorAll(`#admin-topbar-nav .admin-topbar-tab`).forEach(t=>{let n=t.dataset.adminTab,r=n===e||n===`dashboard`&&(e===`dashboardOrders`||e===`dashboardVisitors`||e===`dashboardStaff`)||n===`home`&&![`dashboard`,`dashboardOrders`,`dashboardVisitors`,`dashboardStaff`,`pipeline`,`map`,`fleet`].includes(e);t.classList.toggle(`is-active`,!!r)}),e===`home`)n.innerHTML=_a(i),xa(n,e=>$(e));else if(e===`requests`)n.innerHTML=va(i),xa(n,e=>$(e));else if(e===`content`)n.innerHTML=ya(i),xa(n,e=>$(e));else if(e===`personnel`)n.innerHTML=ba(i),xa(n,e=>$(e));else if(e===`dashboard`)n.innerHTML=vn(),yn(e=>$(e));else if(e===`dashboardOrders`)n.innerHTML=bn();else if(e===`dashboardVisitors`)n.innerHTML=xn();else if(e===`dashboardStaff`)n.innerHTML=Sn();else if(e===`pipeline`)n.innerHTML=dn(),fn();else if(e===`map`)n.innerHTML=Dn(),On();else if(e===`staff`)n.innerHTML=Mn(),Nn(e=>{Da=e,$(`staffHistory`)});else if(e===`staffHistory`){if(!Da){$(`staff`);return}n.innerHTML=Fn(Da),In(Da)}else if(e===`fleet`)n.innerHTML=er(),tr();else if(e===`magazine`)n.innerHTML=_r(),vr(e=>$(`magazine-editor`,e));else if(e===`magazine-editor`)n.innerHTML=Fr(),Ir(t,()=>$(`magazine`));else if(e===`pages`){$(`settings`);return}else e===`page-editor`?(n.innerHTML=Hr(),Ur(t,()=>$(`settings`))):e===`testimonials`?(n.innerHTML=Jr(),Yr()):e===`chat`?(n.innerHTML=ni(),ri()):e===`stories`?(n.innerHTML=si(),ci()):e===`jobApplications`?(n.innerHTML=mi(),hi()):e===`settings`?(n.innerHTML=Vi(),Hi((e,t)=>$(e,t??null))):e===`plugins`?(n.innerHTML=Gi(),Yi()):e===`seo`?(n.innerHTML=ia(),aa(e=>$(`magazine-editor`,e))):e===`media`?(n.innerHTML=Ln(),Rn()):e===`roles`?(n.innerHTML=Bn(),Vn()):e===`activityLog`?(n.innerHTML=vi(),yi()):e===`accountSecurity`?(n.innerHTML=oa(),sa()):e===`myWallet`?(n.innerHTML=or(),lr()):e===`payroll`?(n.innerHTML=ua(),ha()):(n.innerHTML=_a(i),xa(n,e=>$(e)))}}function Oa(e,t=!1){let n=wa();n.innerHTML=Rt(e),document.getElementById(`admin-back-btn`)?.addEventListener(`click`,()=>{let e=Ca(Ea);e&&$(e)}),document.getElementById(`logout-btn`)?.addEventListener(`click`,()=>{j(),_(),Ta()}),document.getElementById(`admin-account-btn`)?.addEventListener(`click`,()=>$(`accountSecurity`)),document.getElementById(`admin-wallet-btn`)?.addEventListener(`click`,()=>$(`myWallet`)),document.querySelectorAll(`#admin-topbar-nav .admin-topbar-tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.adminTab;t&&$(t)})}),document.getElementById(`admin-logo-btn`)?.addEventListener(`click`,()=>{$(x(e,`dashboard`)?`dashboard`:`home`)}),x(e,`settings`)&&Aa(),ka(),Wn(),Sa(),x(e,`ai`)&&Ft();let r=t?y():null;r?.screen===`staffHistory`&&r.extra?(Da=r.extra,$(`staffHistory`)):r?.screen===`magazine-editor`?$(`magazine-editor`,r.extra??null):r?.screen===`page-editor`?$(`page-editor`,r.extra??null):r?.screen?$(r.screen):$(x(e,`dashboard`)?`dashboard`:`home`)}async function ka(){try{let e=(await Te()).branding,t=e?.logoUrl;t&&document.querySelectorAll(`.admin-logo-mark`).forEach(e=>e.src=t);let n=e?.faviconUrl||t;n&&document.querySelectorAll(`link[rel="icon"]`).forEach(e=>e.href=n)}catch{}}async function Aa(){let e=document.getElementById(`admin-sidebar-version`);if(e)try{let t=await gt();e.textContent=t.updateAvailable?`نسخه ${t.current} · نسخه جدید موجود است`:`نسخه ${t.current}`,e.classList.toggle(`has-update`,t.updateAvailable),e.hidden=!1}catch{}}function ja(e){let t=wa();t.innerHTML=pr(e),Sa(),hr(()=>{j(),_(),Ta()})}function Ma(e){let t=wa();t.innerHTML=ea(),Sa(),ta(e,()=>Oa(e))}function Na(e,t=!1){if(!S(e)){ja(e);return}if(!x(e,`settings`)){Oa(e,t);return}Te().then(n=>{Qi(n)?Ma(e):Oa(e,t)}).catch(()=>Oa(e,t))}function Pa(){if(T(Ta),!b()){Ta();return}let e=g();e?Na(e,!0):Ta(),te().then(t=>{let n=h();n&&(m(n,t),(!e||e.role!==t.role)&&Na(t,!0))}).catch(()=>{})}Pa();