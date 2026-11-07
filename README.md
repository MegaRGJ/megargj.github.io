# megargj.github.io

Games programming portfolio, built with [Vite](https://vite.dev) + TypeScript.

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
```

## Writing a yaplog post

Add a Markdown file to `posts/`. The file name becomes the link, so `posts/my-post.md` opens at `yaplog.html#my-post`. Start it with this block:

```markdown
---
title: My post title
date: 2026-10-12
summary: One line shown under the title.
tags: [engine, c++]
---

The post goes here, in Markdown.
```

Put images in `public/images/` and use them with `![What it shows](images/my-image.png)`. A post with a missing title or date is left out, and the browser console says why.

## Editing other content

Projects are in `src/projects.ts`. The photo, bio and contact details are in `index.html`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch served by GitHub Pages.
