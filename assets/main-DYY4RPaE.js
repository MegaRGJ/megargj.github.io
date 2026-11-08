import{t as e}from"./html-DEKDZmuS.js";import{a as t,i as n,n as r,r as i,t as a}from"./projects-aiqcOh5O.js";import{n as o}from"./posts-Co7U63EY.js";var s=[[`projects`,`#projects`],[`yaplog`,`yaplog.html`],[`contact`,`#contact`]];function c(){let e=s.map(([e,t])=>({section:document.getElementById(e),link:document.querySelector(`.nav a[href="${t}"]`)}));function t(){let t=innerHeight*.35,n=innerHeight+scrollY>=document.documentElement.scrollHeight-2?e[e.length-1]:e.filter(e=>e.section.getBoundingClientRect().top<=t).pop();for(let t of e)t===n?t.link.setAttribute(`aria-current`,`location`):t.link.removeAttribute(`aria-current`)}let n=!1;function r(){n||(n=!0,requestAnimationFrame(()=>{n=!1,t()}))}addEventListener(`scroll`,r,{passive:!0}),addEventListener(`resize`,r),t()}var l=`http://www.w3.org/2000/svg`;function u(e){let t=document.createElementNS(l,`svg`);t.classList.add(`route`),t.setAttribute(`aria-hidden`,`true`),t.innerHTML=`
    <defs><mask id="route-mask" maskUnits="userSpaceOnUse"><path class="route-reveal"/></mask></defs>
    <path class="route-faint"/>
    <path class="route-lit" mask="url(#route-mask)"/>`,e.prepend(t);let n=t.querySelector(`mask`),r=t.querySelectorAll(`.route-faint, .route-lit, .route-reveal`),i=t.querySelector(`.route-reveal`),a=[...e.querySelectorAll(`.node`)],o=matchMedia(`(prefers-reduced-motion: reduce)`).matches,s=0;function c(){let o=e.getBoundingClientRect(),c=t.getBoundingClientRect().width,l=o.height,d=c*.38,f=a.map(e=>{let t=e.getBoundingClientRect();return{x:t.left-o.left+t.width/2,y:t.top-o.top+t.height/2}}),p=`M ${f[0].x} ${f[0].y}`;for(let e=1;e<f.length;e++){let t=f[e-1],n=f[e],r=e%2==0?1:-1,i=n.y-t.y;p+=` C ${t.x+r*d} ${t.y+i*.3}, ${n.x+r*d} ${n.y-i*.3}, ${n.x} ${n.y}`}t.setAttribute(`viewBox`,`0 0 ${c} ${l}`),n.setAttribute(`x`,String(-c)),n.setAttribute(`y`,`0`),n.setAttribute(`width`,String(c*3)),n.setAttribute(`height`,String(l)),r.forEach(e=>e.setAttribute(`d`,p)),s=i.getTotalLength(),i.style.strokeDasharray=`${s} ${s}`,u()}function u(){let t=e.getBoundingClientRect(),n=o?-1/0:innerHeight*.7-t.top,r=Math.min(Math.max(n/t.height,0),1);i.style.strokeDashoffset=String(-s*r);for(let e of a){let r=e.getBoundingClientRect();e.classList.toggle(`reached`,r.top-t.top+r.height/2>=n)}}let d=!1;addEventListener(`scroll`,()=>{d||(d=!0,requestAnimationFrame(()=>{d=!1,u()}))},{passive:!0}),new ResizeObserver(c).observe(e),document.fonts?.ready.then(c),c()}var d=`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`;function f(e){if(r(e))return{href:`project.html#${e.slug}`,label:`View more →`};let t=e.links?.[0];return t&&{href:t.url,label:`${t.label} ↗`}}function p(t){let r=e(t.title),o=f(t);return`
    <article class="entry">
      <div class="node${t.featured?` featured`:``}" aria-hidden="true">${d}</div>
      <div class="card${o?``:` card-static`}">
        <div class="card-media">${i(t)}</div>
        <div class="card-body">
          <div class="card-meta">
            <time datetime="${t.date}">${t.dateLabel??a(t.date)}</time>
            ${n(t)}
            ${t.featured?`<span class="pill pill-featured">Featured</span>`:``}
          </div>
          <h3>${o?`<a href="${e(o.href)}">${r}</a>`:r}</h3>
          ${t.role?`<p class="card-role">${e(t.role)}</p>`:``}
          ${t.summary?`<p class="card-summary">${e(t.summary)}</p>`:``}
          ${t.tech.length?`<ul class="tags">${t.tech.map(t=>`<li>${e(t)}</li>`).join(``)}</ul>`:``}
          ${o?`<div class="card-foot"><span class="view-more" aria-hidden="true">${e(o.label)}</span></div>`:``}
        </div>
      </div>
    </article>`}var m=document.querySelector(`#timeline`);m.innerHTML=`
  ${t().map(p).join(``)}
  <div class="cap"><div class="node"></div><span class="cap-label">Start</span></div>`,u(m),c(),o(document.querySelector(`#latest-yaps`),3);