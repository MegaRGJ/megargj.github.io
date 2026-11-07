import './style.css';
import { escapeHtml } from './html';
import { formatDate, hasPage, mediaFor, pillsFor, sortedProjects, type Project } from './projects';
import { renderLatest } from './posts';
import { initRoute } from './route';

const CROSS = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

// Where a card leads: its own page, or failing that its first link (a store
// page, say). A card with neither isn't clickable.
function cardTarget(project: Project): { href: string; label: string } | undefined {
  if (hasPage(project)) return { href: `project.html#${project.slug}`, label: 'View more →' };
  const link = project.links?.[0];
  return link && { href: link.url, label: `${link.label} ↗` };
}

function renderEntry(project: Project): string {
  const title = escapeHtml(project.title);
  const target = cardTarget(project);
  return `
    <article class="entry">
      <div class="node${project.featured ? ' featured' : ''}" aria-hidden="true">${CROSS}</div>
      <div class="card${target ? '' : ' card-static'}">
        <div class="card-media">${mediaFor(project)}</div>
        <div class="card-body">
          <div class="card-meta">
            <time datetime="${project.date}">${project.dateLabel ?? formatDate(project.date)}</time>
            ${pillsFor(project)}
            ${project.featured ? '<span class="pill pill-featured">Featured</span>' : ''}
          </div>
          <h3>${target ? `<a href="${escapeHtml(target.href)}">${title}</a>` : title}</h3>
          ${project.role ? `<p class="card-role">${escapeHtml(project.role)}</p>` : ''}
          ${project.summary ? `<p class="card-summary">${escapeHtml(project.summary)}</p>` : ''}
          ${project.tech.length ? `<ul class="tags">${project.tech.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : ''}
          ${target ? `<div class="card-foot"><span class="view-more" aria-hidden="true">${escapeHtml(target.label)}</span></div>` : ''}
        </div>
      </div>
    </article>`;
}

const timeline = document.querySelector<HTMLElement>('#timeline')!;
timeline.innerHTML = `
  ${sortedProjects().map(renderEntry).join('')}
  <div class="cap"><div class="node"></div><span class="cap-label">Start</span></div>`;

initRoute(timeline);
renderLatest(document.querySelector<HTMLElement>('#latest-yaps')!, 3);
