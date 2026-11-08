// Yaplog posts live as Markdown files in posts/. The file name becomes the URL
// (posts/my-post.md opens at yaplog.html#my-post). The home page shows the
// latest few, and yaplog.html lists them all and opens each one.

import { escapeHtml } from './html';

export interface Post {
  slug: string;
  date: string; // YYYY-MM-DD, used for ordering (newest first)
  title: string;
  summary: string; // one line shown under the title
  tags: string[];
  body: string; // Markdown
}

const files = import.meta.glob<string>('../posts/*.md', { query: '?raw', import: 'default', eager: true });

// Reads the title, date, summary and tags from the block at the top of a post
function parsePost(path: string, source: string): Post | undefined {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const fields: Record<string, string> = {};

  for (const line of match?.[1].split(/\r?\n/) ?? []) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^(["'])(.*)\1$/, '$2');
  }

  if (!fields.title || !/^\d{4}-\d{2}-\d{2}$/.test(fields.date ?? '')) {
    console.warn(`Skipping ${path}: it needs a title and a date like 2026-10-12 at the top.`);
    return undefined;
  }

  return {
    slug,
    date: fields.date,
    title: fields.title,
    summary: fields.summary ?? '',
    tags: (fields.tags ?? '')
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    body: match![2],
  };
}

export const posts: Post[] = Object.entries(files).flatMap(([path, source]) => parsePost(path, source) ?? []);

export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDay(date: string): string {
  const [year, month, day] = date.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

// The "latest posts" list on the home page
export function renderLatest(list: HTMLElement, count: number): void {
  list.innerHTML = sortedPosts()
    .slice(0, count)
    .map(
      (post) => `
      <li>
        <a href="yaplog.html#${post.slug}">
          <span class="latest-text">
            <span class="latest-title">${escapeHtml(post.title)}</span>
            <span class="latest-meta"><span class="log-date">${formatDay(post.date)}</span></span>
          </span>
          <span class="latest-arrow" aria-hidden="true">→</span>
        </a>
      </li>`,
    )
    .join('');
}
