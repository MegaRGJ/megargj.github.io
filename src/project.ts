import './style.css';
import { escapeHtml } from './html';
import { formatDate, hasPage, mediaFor, pillsFor, sortedProjects } from './projects';

const root = document.querySelector<HTMLElement>('#project')!;

function render(): void {
  const list = sortedProjects().filter(hasPage);
  const slug = decodeURIComponent(location.hash.slice(1));
  const index = list.findIndex((p) => p.slug === slug);

  if (index === -1) {
    document.title = 'Project not found — Ryan Johnson';
    root.innerHTML = `
      <a class="back" href="index.html#projects">← All projects</a>
      <div class="project-head">
        <h1>Project not found</h1>
        <p class="lede">This link doesn't match any project. Go back to the project list to pick one.</p>
      </div>`;
    return;
  }

  const project = list[index];
  const newer = list[index - 1];
  const older = list[index + 1];
  const facts: [string, string | undefined][] = [
    ['Role', project.role],
    ['Date', project.dateLabel ?? formatDate(project.date)],
    ['Team', project.facts.team],
    ['Duration', project.facts.duration],
    ['Engine', project.facts.engine],
    ['Platforms', project.facts.platform],
  ];

  document.title = `${project.title} — Ryan Johnson`;
  root.innerHTML = `
    <a class="back" href="index.html#projects">← All projects</a>
    <div class="project-head">
      <div class="card-meta">
        ${pillsFor(project)}
        ${project.featured ? '<span class="pill pill-featured">Featured</span>' : ''}
      </div>
      <h1>${escapeHtml(project.title)}</h1>
      ${project.summary ? `<p class="lede">${escapeHtml(project.summary)}</p>` : ''}
    </div>
    ${
      project.video
        ? `<div class="project-video">
            <div class="project-media">
              <iframe
                src="https://www.youtube-nocookie.com/embed/${escapeHtml(project.video)}"
                title="${escapeHtml(project.title)} video"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <a class="video-link" href="https://www.youtube.com/watch?v=${escapeHtml(project.video)}">Watch on YouTube ↗</a>
          </div>`
        : `<div class="project-media">${mediaFor(project, false)}</div>`
    }
    ${
      project.gallery?.length
        ? `<div class="gallery">${project.gallery
            .map(
              (src, i) =>
                `<a href="${escapeHtml(src)}"><img src="${escapeHtml(src)}" alt="${escapeHtml(project.title)} screenshot ${i + 1}" loading="lazy" /></a>`,
            )
            .join('')}</div>`
        : ''
    }
    <dl class="facts">
      ${facts
        .filter(([, value]) => value)
        .map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value!)}</dd></div>`)
        .join('')}
    </dl>
    <ul class="tags">${project.tech.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
    ${project.sections
      .map((s) => `<section class="project-section"><h2>${escapeHtml(s.heading)}</h2>${s.body
        .split(/\n\s*\n/)
        .map((text) => `<p>${escapeHtml(text)}</p>`)
        .join('')}</section>`)
      .join('')}
    ${
      project.links?.length
        ? `<p class="project-links">${project.links
            .map((l) => `<a class="btn" href="${escapeHtml(l.url)}">${escapeHtml(l.label)} ↗</a>`)
            .join('')}</p>`
        : ''
    }
    <nav class="pager" aria-label="More projects">
      ${newer ? `<a class="prev" href="#${newer.slug}"><small>← Newer</small><span>${escapeHtml(newer.title)}</span></a>` : ''}
      ${older ? `<a class="next" href="#${older.slug}"><small>Older →</small><span>${escapeHtml(older.title)}</span></a>` : ''}
    </nav>`;
}

// Screenshot viewer: opens over the page, closes with the button, a tap
// outside the image, or Esc
const viewer = document.createElement('dialog');
viewer.className = 'viewer';
viewer.setAttribute('aria-label', 'Screenshot');
viewer.innerHTML = `
  <img alt="" />
  <button class="viewer-btn viewer-close" type="button" aria-label="Close">✕</button>
  <button class="viewer-btn viewer-prev" type="button" aria-label="Previous screenshot">←</button>
  <button class="viewer-btn viewer-next" type="button" aria-label="Next screenshot">→</button>`;
document.body.append(viewer);

const viewerImage = viewer.querySelector('img')!;
let shots: HTMLAnchorElement[] = [];
let shotIndex = 0;

function showShot(index: number): void {
  shotIndex = (index + shots.length) % shots.length;
  const thumb = shots[shotIndex].querySelector('img')!;
  viewerImage.src = shots[shotIndex].getAttribute('href')!;
  viewerImage.alt = thumb.alt;
}

root.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('.gallery a');
  if (!link) return;
  event.preventDefault();
  shots = [...root.querySelectorAll<HTMLAnchorElement>('.gallery a')];
  viewer.classList.toggle('single', shots.length === 1);
  showShot(shots.indexOf(link));
  viewer.showModal();
});

viewer.addEventListener('click', (event) => {
  const target = event.target as Element;
  if (target.closest('.viewer-prev')) showShot(shotIndex - 1);
  else if (target.closest('.viewer-next')) showShot(shotIndex + 1);
  else if (target !== viewerImage) viewer.close();
});

viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showShot(shotIndex - 1);
  if (event.key === 'ArrowRight') showShot(shotIndex + 1);
});

addEventListener('hashchange', () => {
  if (viewer.open) viewer.close();
  render();
  scrollTo({ top: 0 });
});
render();
