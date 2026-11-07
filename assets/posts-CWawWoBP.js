import{t as e}from"./html-NXNjT_QK.js";var t=Object.assign({"../posts/test.md":`---
title: Test
date: 2026-11-07
summary: test test
tags: []
---

test test
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