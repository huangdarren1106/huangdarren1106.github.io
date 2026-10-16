# Architecture

## Components

- `build.js`: reads `src/` and writes `docs/*.html`. Wraps each page in
  `src/partials` (head, header, footer), adds absolute canonical URLs, writes
  `docs/sitemap.xml` and redirect pages from `src/redirects.json`.
- `top-artists.js`, `top-songs.js`: download JSON from `mytopspotify.io`, render
  `views/*.njk` with Nunjucks, and write `top-spotify-artists.html` and
  `spotify-top-songs-right-now.html`. `npm run build` moves them into `docs/`.
- `server.js` + `linkcheck.js`: local preview and a link checker. Not used in CI.
- `.github/workflows/deploy.yml`: build and publish to GitHub Pages.

## Data flow

1. Push to `deploy`, a manual run, or the daily 01:05 UTC schedule.
2. CI builds the site (the generated pages fetch fresh JSON from
   `mytopspotify.io`).
3. CI uploads `docs/` as a Pages artifact and deploys it.
4. Visitors load static HTML from GitHub Pages. Scripts in the pages call
   Spotify and Plausible from the browser.

## External services

- GitHub Pages (hosting), GitHub Actions (build).
- `mytopspotify.io`: JSON source at build time.
- Plausible (analytics), Google AdSense (ads).
- Search Console (my-seo) for search data.

## Environment variables

None. The build needs no secrets. The deploy uses the built-in `GITHUB_TOKEN`
through the Pages actions.
