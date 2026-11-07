import{t as e}from"./html-NXNjT_QK.js";var t=Object.assign({"../posts/enemy-ai-perception.md":`---
title: Making enemy perception readable
date: 2026-08-03
summary: Tuning sight cones and alert states so players can tell why they were spotted.
tags: [gameplay, ai, unreal]
---

A short intro to the problem.

## The fix

What you changed and how you tested it with players.
`,"../posts/first-jam.md":`---
title: What I learned from my first game jam
date: 2025-04-20
summary: Scope down, ship something playable on day one, and sleep.
tags: [jam, unity]
---

Posts can be short. A few paragraphs is plenty.
`,"../posts/job-system-rewrite.md":`---
title: Rewriting the engine job system
date: 2026-10-12
summary: Moving from one thread per system to a work-stealing job queue, and what broke along the way.
tags: [engine, c++, threading]
---

Open with what you set out to do and why. One short paragraph is enough.

## What I tried

The approach, with a code snippet or diagram if it helps:

\`\`\`cpp
void JobQueue::Push(Job* job) {
    const uint32_t b = m_bottom.load(std::memory_order_relaxed);
    m_jobs[b & kMask] = job;
    m_bottom.store(b + 1, std::memory_order_release);
}
\`\`\`

## What I learned

- Results and numbers
- What surprised you
- What you would do next

You can also link to things, like [the project's source](https://github.com/MegaRGJ).
`,"../posts/portfolio-site.md":`---
title: Building this site
date: 2026-11-01
summary: Why this portfolio uses Vite and TypeScript, and how the treasure-map timeline is drawn.
tags: [web, typescript]
---

A first post can be about the site itself.

## The route

The dashed path is an SVG curve drawn through each project marker and revealed as you scroll.
`});function n(e,t){let n=e.split(`/`).pop().replace(/\.md$/,``),r=t.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/),i={};for(let e of r?.[1].split(/\r?\n/)??[]){let t=e.indexOf(`:`);t!==-1&&(i[e.slice(0,t).trim()]=e.slice(t+1).trim().replace(/^(["'])(.*)\1$/,`$2`))}if(!i.title||!/^\d{4}-\d{2}-\d{2}$/.test(i.date??``))console.warn(`Skipping ${e}: it needs a title and a date like 2026-10-12 at the top.`);else return{slug:n,date:i.date,title:i.title,summary:i.summary??``,tags:(i.tags??``).replace(/^\[|\]$/g,``).split(`,`).map(e=>e.trim()).filter(Boolean),body:r[2]}}var r=Object.entries(t).flatMap(([e,t])=>n(e,t)??[]);function i(){return[...r].sort((e,t)=>t.date.localeCompare(e.date))}var a=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function o(e){let[t,n,r]=e.split(`-`);return`${Number(r)} ${a[Number(n)-1]} ${t}`}function s(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619)>>>0;return t.toString(16).padStart(8,`0`).slice(0,7)}function c(t,n){t.innerHTML=i().slice(0,n).map(t=>`
      <li>
        <a href="yaplog.html#${t.slug}">
          <span class="latest-text">
            <span class="latest-title">${e(t.title)}</span>
            <span class="latest-meta"><span class="log-hash">${s(t.slug)}</span> ${o(t.date)}</span>
          </span>
          <span class="latest-arrow" aria-hidden="true">→</span>
        </a>
      </li>`).join(``)}export{i,c as n,s as r,o as t};