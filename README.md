# huangdarren1106.github.io (Spotify Pie)

The live Spotify Pie site: https://huangdarren1106.github.io/

It is a small static site with Spotify tools and guides for music fans (pie
chart, stats, receipt, Wrapped, top artists and top songs). Visitors are
mostly search traffic. It earns from ads.

## Stack

- Plain Node.js build script (`build.js`), Nunjucks templates, no framework.
- Output is plain HTML in `docs/`. The `docs/` folder is committed and is what
  GitHub Pages serves.
- Node 20 in CI. `npm` is the package manager.

## Run it locally

```sh
npm install
npm run build      # writes docs/*.html
npm run serve      # serves docs/ (needs the `serve` tool)
npm run dev        # nodemon + express preview, see server.js
npm run check-links
```

`npm run build` also rewrites `docs/sitemap.xml`, `docs/top-spotify-artists.html`
and `docs/spotify-top-songs-right-now.html` (dates and live data change on every
run). That is normal.

## Where things live

- `src/pages/<slug>/`: one folder per page (`page.json`, `head.html`,
  `main.html`, `scripts.html`).
- `src/partials/`: shared header, footer and head chunks.
- `src/raw/`: pages published as they are.
- `src/redirects.json`: old URLs published as redirect pages.
- `top-artists.js`, `top-songs.js` + `views/*.njk`: the two generated pages.
  They download JSON from `mytopspotify.io` at build time.
- `docs/`: build output, committed. Do not hand-edit generated pages.
- `project-docs/`: architecture, tech changelog and proposals. This is not
  `docs/` because `docs/` is published to the web.

## How it deploys

Workflow: `.github/workflows/deploy.yml` ("Deploy static content to Pages").

- Runs on every push to the `deploy` branch (the default branch), by hand, and
  every day at 01:05 UTC (to refresh the top artists and songs pages).
- It runs `npm install` and `npm run build`, then uploads `docs/` with the
  official GitHub Pages actions.
- Pages is set to "GitHub Actions" mode. (The Pages API still shows an old
  `gh-pages` branch as the source; it is not used.)

Merging to `deploy` publishes the site. The build in CI rebuilds the generated
pages, so the committed copies of those only matter for review.

## Where it runs

GitHub Pages only. No server, no container. Nothing at Cloudflare.

## Services it connects to

- Plausible: `data-domain="huangdarren1106.github.io"`.
- Google AdSense publisher `ca-pub-3723218062742398` and `docs/ads.txt`.
- `mytopspotify.io` (build-time JSON for top artists and top songs).
- my-seo: Search Console property for this site. Content and SEO changes are
  recorded as my-seo annotations, not in this repo.
- Spotify login links (`callback.html`) used by the stats tools.
- The old Laravel generator in `senty-au/spotify-pie` is no longer part of the
  pipeline (see `project-docs/CHANGELOG-TECH.md`).

## Backups

There is no database or upload store. The git repo is the backup: all content
is in `src/` and the built pages are in `docs/`. GitHub holds the only remote
copy, plus local clones.

## Owners and notes

Owner: Rus (senty-au). Project slug `spotify-pie` (todo prefix SP).
See `project-docs/PROPOSALS.md` for open upgrade ideas.
