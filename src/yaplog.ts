import './style.css';
import { marked } from 'marked';
import { escapeHtml } from './html';
import { formatDay, sortedPosts, type Post } from './posts';

// Wide screens show the post list and the open post side by side. Narrow
// screens show one at a time: the list, or the post picked from it.

const list = sortedPosts();
const index = document.querySelector<HTMLElement>('#yap-list')!;
const reader = document.querySelector<HTMLElement>('#yap-reader')!;
const search = document.querySelector<HTMLInputElement>('#yap-search')!;
const wide = matchMedia('(min-width: 900px)');

function currentSlug(): string {
  return decodeURIComponent(location.hash.slice(1));
}

function renderIndex(): void {
  const query = search.value.trim().toLowerCase();
  const open = currentPost()?.slug;
  const matches = list.filter((p) =>
    [p.title, p.summary, ...p.tags].some((text) => text.toLowerCase().includes(query)),
  );

  if (!matches.length) {
    index.innerHTML = `<p class="yap-empty">No posts match “${escapeHtml(search.value)}”.</p>`;
    return;
  }

  const years = new Map<string, Post[]>();
  for (const post of matches) {
    const year = post.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  }

  index.innerHTML = [...years]
    .map(
      ([year, posts]) => `
      <h2 class="yap-year">${year}</h2>
      <ul class="yap-items">
        ${posts
          .map(
            (p) => `
          <li>
            <a class="yap-item" href="#${p.slug}"${p.slug === open ? ' aria-current="page"' : ''}>
              <span class="yap-item-title">${escapeHtml(p.title)}</span>
              <span class="yap-item-meta"><span class="log-date">${formatDay(p.date)}</span></span>
            </a>
          </li>`,
          )
          .join('')}
      </ul>`,
    )
    .join('');
}

// The open post: the one in the URL, or the newest on wide screens
function currentPost(): Post | undefined {
  const slug = currentSlug();
  if (slug) return list.find((p) => p.slug === slug);
  return wide.matches ? list[0] : undefined;
}

function renderReader(): void {
  const slug = currentSlug();
  const post = currentPost();
  document.body.classList.toggle('reading', Boolean(slug));

  if (!post) {
    document.title = 'Yaplog — Ryan Johnson';
    reader.innerHTML = slug
      ? `<a class="back yap-back" href="#">← All posts</a>
         <h1>Post not found</h1>
         <p class="lede">This link doesn't match any post. Pick one from the list.</p>`
      : '';
    return;
  }

  const at = list.indexOf(post);
  const newer = list[at - 1];
  const older = list[at + 1];

  document.title = `${post.title} — Ryan Johnson`;
  reader.innerHTML = `
    <a class="back yap-back" href="#">← All posts</a>
    <div class="project-head">
      <div class="log-meta">
        <time class="log-date" datetime="${post.date}">${formatDay(post.date)}</time>
        <span class="log-tags">${post.tags.map((t) => `#${escapeHtml(t)}`).join(' ')}</span>
      </div>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="lede">${escapeHtml(post.summary)}</p>
    </div>
    <div class="prose">${marked.parse(post.body, { async: false })}</div>
    <nav class="pager" aria-label="More posts">
      ${newer ? `<a class="prev" href="#${newer.slug}"><small>← Newer</small><span>${escapeHtml(newer.title)}</span></a>` : ''}
      ${older ? `<a class="next" href="#${older.slug}"><small>Older →</small><span>${escapeHtml(older.title)}</span></a>` : ''}
    </nav>`;
}

function render(): void {
  renderReader();
  renderIndex();
}

addEventListener('hashchange', () => {
  render();
  scrollTo({ top: 0 });
});
search.addEventListener('input', renderIndex);
wide.addEventListener('change', render);
render();
