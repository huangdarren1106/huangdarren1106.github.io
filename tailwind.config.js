// Build-time Tailwind (replaces the Play CDN). Pages: views/*.njk, src/raw/404.html, src/raw/feed.html.
// Tailwind only sees class names that appear whole in the source. Classes that Alpine toggles from
// JS conditions (:class="{ 'text-green-600': ... }") are listed in safelist; tests/tailwind-build.test.js
// checks every safelisted class is in the built CSS and every class in :class literals is covered.
module.exports = {
  content: ['./views/**/*.njk', './src/raw/404.html', './src/raw/feed.html'],
  safelist: [
    'text-green-600',
    'text-red-600',
    'text-gray-600',
    'bg-green-500',
    'text-white',
    'bg-white',
    'text-green-700',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
