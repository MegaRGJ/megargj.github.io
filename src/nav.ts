// Turns the top bar link orange for the home page section being read

const LINKS: [sectionId: string, href: string][] = [
  ['projects', '#projects'],
  ['yaplog', 'yaplog.html'],
  ['contact', '#contact'],
];

export function initNavHighlight(): void {
  const entries = LINKS.map(([id, href]) => ({
    section: document.getElementById(id)!,
    link: document.querySelector<HTMLAnchorElement>(`.nav a[href="${href}"]`)!,
  }));

  function update(): void {
    const readingLine = innerHeight * 0.35;
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    // The last section can be too short to reach the reading line
    const current = atBottom
      ? entries[entries.length - 1]
      : entries.filter((e) => e.section.getBoundingClientRect().top <= readingLine).pop();

    for (const entry of entries) {
      if (entry === current) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
  }

  let queued = false;
  function queueUpdate(): void {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }

  addEventListener('scroll', queueUpdate, { passive: true });
  addEventListener('resize', queueUpdate);
  update();
}
