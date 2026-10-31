# megargj.github.io

Games programming portfolio, built with [Vite](https://vite.dev) + TypeScript.

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch served by GitHub Pages.
