# Proposals

## Express 5 and chokidar 5 (dev tools only)
- Gain: clears the last `npm audit` warnings (`braces` through `chokidar`).
- Effort: small. They only power `server.js` for local preview.
- Risk: low. The production site is static HTML and does not run them. Another
  option is to delete `server.js` and use `npm run serve`.

## Pin the Node version
- CI uses the runner's default Node. Add `actions/setup-node` with Node 20/22.
- Effort: 5 minutes. Risk: low.

## Stack and speed
No change needed. The site is static HTML on GitHub Pages: no server cost, no
memory use, no runtime errors. Build takes about 30 seconds in CI.
