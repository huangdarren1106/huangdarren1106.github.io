const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const main = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'spotify-wrapped', 'main.html'), 'utf8');

test('spotify-wrapped answers the 2026 date in the first sentence under the byline', () => {
  const afterByline = main.slice(main.indexOf('</p>', main.indexOf('Updated:')) + 4);
  const first = afterByline.trim().slice(0, 400);
  assert.match(first, /will most likely come out on <time datetime="2026-12-02">Wednesday 2 December 2026<\/time>/);
});

test('spotify-wrapped has a release date section with the 2019 to 2025 dates', () => {
  assert.match(main, /<h2>\s*Spotify Wrapped 2026 release date\s*<\/h2>/);
  for (const year of ['2019', '2020', '2021', '2022', '2023', '2024', '2025']) {
    assert.match(main, new RegExp(`<tr><td>${year}</td>`), `table row for ${year}`);
  }
});

test('spotify-wrapped has one date line each in German, Swedish and Indonesian', () => {
  for (const lang of ['de', 'sv', 'id']) {
    assert.match(main, new RegExp(`<li lang="${lang}">.*2026`), `${lang} line`);
  }
});
