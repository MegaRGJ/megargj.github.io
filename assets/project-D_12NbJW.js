import{t as e}from"./html-NXNjT_QK.js";import{a as t,i as n,n as r,r as i,t as a}from"./projects-aiqcOh5O.js";var o=document.querySelector(`#project`);function s(){let s=t().filter(r),c=decodeURIComponent(location.hash.slice(1)),l=s.findIndex(e=>e.slug===c);if(l===-1){document.title=`Project not found — MegaRGJ`,o.innerHTML=`
      <a class="back" href="index.html#projects">← All projects</a>
      <div class="project-head">
        <h1>Project not found</h1>
        <p class="lede">This link doesn't match any project. Go back to the project list to pick one.</p>
      </div>`;return}let u=s[l],d=s[l-1],f=s[l+1],p=[[`Role`,u.role],[`Date`,u.dateLabel??a(u.date)],[`Team`,u.facts.team],[`Duration`,u.facts.duration],[`Engine`,u.facts.engine],[`Platforms`,u.facts.platform]];document.title=`${u.title} — MegaRGJ`,o.innerHTML=`
    <a class="back" href="index.html#projects">← All projects</a>
    <div class="project-head">
      <div class="card-meta">
        ${n(u)}
        ${u.featured?`<span class="pill pill-featured">Featured</span>`:``}
      </div>
      <h1>${e(u.title)}</h1>
      ${u.summary?`<p class="lede">${e(u.summary)}</p>`:``}
    </div>
    ${u.video?`<div class="project-video">
            <div class="project-media">
              <iframe
                src="https://www.youtube-nocookie.com/embed/${e(u.video)}"
                title="${e(u.title)} video"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <a class="video-link" href="https://www.youtube.com/watch?v=${e(u.video)}">Watch on YouTube ↗</a>
          </div>`:`<div class="project-media">${i(u,!1)}</div>`}
    ${u.gallery?.length?`<div class="gallery">${u.gallery.map((t,n)=>`<a href="${e(t)}"><img src="${e(t)}" alt="${e(u.title)} screenshot ${n+1}" loading="lazy" /></a>`).join(``)}</div>`:``}
    <dl class="facts">
      ${p.filter(([,e])=>e).map(([t,n])=>`<div><dt>${t}</dt><dd>${e(n)}</dd></div>`).join(``)}
    </dl>
    <ul class="tags">${u.tech.map(t=>`<li>${e(t)}</li>`).join(``)}</ul>
    ${u.sections.map(t=>`<section class="project-section"><h2>${e(t.heading)}</h2>${t.body.split(/\n\s*\n/).map(t=>`<p>${e(t)}</p>`).join(``)}</section>`).join(``)}
    ${u.links?.length?`<p class="project-links">${u.links.map(t=>`<a class="btn" href="${e(t.url)}">${e(t.label)} ↗</a>`).join(``)}</p>`:``}
    <nav class="pager" aria-label="More projects">
      ${d?`<a class="prev" href="#${d.slug}"><small>← Newer</small><span>${e(d.title)}</span></a>`:``}
      ${f?`<a class="next" href="#${f.slug}"><small>Older →</small><span>${e(f.title)}</span></a>`:``}
    </nav>`}var c=document.createElement(`dialog`);c.className=`viewer`,c.setAttribute(`aria-label`,`Screenshot`),c.innerHTML=`
  <img alt="" />
  <button class="viewer-btn viewer-close" type="button" aria-label="Close">✕</button>
  <button class="viewer-btn viewer-prev" type="button" aria-label="Previous screenshot">←</button>
  <button class="viewer-btn viewer-next" type="button" aria-label="Next screenshot">→</button>`,document.body.append(c);var l=c.querySelector(`img`),u=[],d=0;function f(e){d=(e+u.length)%u.length;let t=u[d].querySelector(`img`);l.src=u[d].getAttribute(`href`),l.alt=t.alt}o.addEventListener(`click`,e=>{let t=e.target.closest(`.gallery a`);t&&(e.preventDefault(),u=[...o.querySelectorAll(`.gallery a`)],c.classList.toggle(`single`,u.length===1),f(u.indexOf(t)),c.showModal())}),c.addEventListener(`click`,e=>{let t=e.target;t.closest(`.viewer-prev`)?f(d-1):t.closest(`.viewer-next`)?f(d+1):t!==l&&c.close()}),c.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&f(d-1),e.key===`ArrowRight`&&f(d+1)}),addEventListener(`hashchange`,()=>{c.open&&c.close(),s(),scrollTo({top:0})}),s();