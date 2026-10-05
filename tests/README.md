# Site validation

Run a production build before the browser checks. The tests serve `_site` on a temporary local port and close their own server and browser afterwards.

```bash
npm ci --ignore-scripts
JEKYLL_ENV=production PAGES_REPO_NWO=arugo11/arugo11.github.io bundle exec jekyll build
npm run test:site
npx prettier . --check
```

Use `CHROMIUM_EXECUTABLE_PATH` for an installed Chromium, or install Playwright Chromium with `npx playwright install chromium`. `/usr/bin/chromium` is detected automatically. In the configured Codex cloud environment, source `/workspace/.cloud-setup-arugo11/activate.sh` before Ruby commands.

The 22 checks cover preserved routes and Markdown bodies, real project images, palette selection and storage failures, keyboard navigation and search focus, hidden weekly content, responsive layouts at 320/390/768/1280px, reduced motion, and axe WCAG A/AA checks on four pages in all three palettes. Browser checks deliberately block external services so the core interface must work with local assets. Two cache regression checks also verify matching build versions on preserved routes and a real four-hour browser cache containing obsolete unversioned CSS/JS. The revisit check keeps HTTP caching enabled, proves that legacy assets are served from cache, and then checks new HTML, ordinary reloads, palette switching and route persistence.

`content-baseline.json` records the original routes, 12 Markdown body hashes, and avatar hash from commit `d86e5c25a80abf7d6e70f6bb3804f9713bdfb901`. Only the FT-LLM project's body checksum was updated for the approved replacement of the broken competition link and its label with the university's official award report. The original weekly URL remains available with `noindex`; discovery surfaces omit it.

External-link CI retains historical weekly URLs and runs at concurrency two. Because Lychee 0.14 does not retry the shop's HTTP 429 errors itself, a final step explicitly waits 10, 20 and 40 seconds before rechecking when those errors remain. It reads the initial status from the legacy action's exported `lychee_exit_code`, with an output fallback. The final exit code still fails the job for persistent 429s, 404s or other errors; no status is accepted or excluded to hide these failures.

## Project image sources

These assets are copied from actual project materials without image generation or editing:

| Local asset                            | Original source                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/img/projects/school-admin.png` | [`school-admin/docs/evals/evidence/final/live-rerun-dashboard.png`](https://github.com/arugo11/school-admin/blob/938120a95c0c990c1047367ca368565a08f06db6/docs/evals/evidence/final/live-rerun-dashboard.png) — demo dashboard with sample data |
| `assets/img/projects/sit-copilot.png`  | [`sit-copilot/poster-gen/assets/images/live-screen.png`](https://github.com/arugo11/sit-copilot/blob/0d4e2eb9196430cbeca4c2e0751d223f5951910c/poster-gen/assets/images/live-screen.png) — lecture subtitle UI                                   |
| `assets/img/nlp2026-ftllm-award.jpg`   | Existing repository photograph of the NLP2026 award results                                                                                                                                                                                     |

jQuery 3.6.0 and medium-zoom 1.1.0 are vendored from their pinned official jsDelivr distributions. Their SHA-256 values match the existing `_config.yml` integrity entries, and the original license headers are retained.
