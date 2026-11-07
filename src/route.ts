// Draws the dashed treasure-map route through every timeline marker. The
// journey runs from Start at the bottom up to Now: everything below the
// visitor's reading line is lit in orange, so scrolling up travels forward in
// time and scrolling down retraces the route.

const SVG_NS = 'http://www.w3.org/2000/svg';

export function initRoute(timeline: HTMLElement): void {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.classList.add('route');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <defs><mask id="route-mask" maskUnits="userSpaceOnUse"><path class="route-reveal"/></mask></defs>
    <path class="route-faint"/>
    <path class="route-lit" mask="url(#route-mask)"/>`;
  timeline.prepend(svg);

  const mask = svg.querySelector('mask')!;
  const paths = svg.querySelectorAll<SVGPathElement>('.route-faint, .route-lit, .route-reveal');
  const reveal = svg.querySelector<SVGPathElement>('.route-reveal')!;
  const nodes = [...timeline.querySelectorAll<HTMLElement>('.node')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let length = 0;

  function layout(): void {
    const box = timeline.getBoundingClientRect();
    const width = svg.getBoundingClientRect().width;
    const height = box.height;
    const amp = width * 0.38;

    const points = nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    });

    // Each leg bows out to alternating sides, like a path drawn on a map
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const side = i % 2 === 0 ? 1 : -1;
      const dy = b.y - a.y;
      d += ` C ${a.x + side * amp} ${a.y + dy * 0.3}, ${b.x + side * amp} ${b.y - dy * 0.3}, ${b.x} ${b.y}`;
    }

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    mask.setAttribute('x', String(-width));
    mask.setAttribute('y', '0');
    mask.setAttribute('width', String(width * 3));
    mask.setAttribute('height', String(height));
    paths.forEach((p) => p.setAttribute('d', d));

    length = reveal.getTotalLength();
    reveal.style.strokeDasharray = `${length} ${length}`;
    update();
  }

  function update(): void {
    const box = timeline.getBoundingClientRect();
    const lineY = reducedMotion ? -Infinity : innerHeight * 0.7 - box.top;
    const progress = Math.min(Math.max(lineY / box.height, 0), 1);
    reveal.style.strokeDashoffset = String(-length * progress);

    for (const node of nodes) {
      const r = node.getBoundingClientRect();
      node.classList.toggle('reached', r.top - box.top + r.height / 2 >= lineY);
    }
  }

  let queued = false;
  addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );

  new ResizeObserver(layout).observe(timeline);
  document.fonts?.ready.then(layout);
  layout();
}
