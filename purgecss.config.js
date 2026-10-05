module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // These attributes change at runtime; retain every palette after CSS optimization.
  safelist: {
    greedy: [/data-palette/, /data-theme/],
  },
};
