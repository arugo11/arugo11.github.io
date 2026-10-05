const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { createHash } = require("node:crypto");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");
const axe = require("axe-core");
const baseline = require("./content-baseline.json");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "_site");
const palettes = ["latte", "mocha", "espresso"];
const paletteBackgrounds = { latte: "rgb(255, 250, 244)", mocha: "rgb(241, 227, 213)", espresso: "rgb(36, 27, 24)" };
let browser, server, base;
let legacyCacheCase = false;
const cacheCaseRequests = [];
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

before(async () => {
  assert.ok(existsSync(path.join(site, "index.html")), "Build Jekyll before running the browser tests");
  server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let file = path.resolve(site, "." + decodeURIComponent(url.pathname));
      assert.ok(file.startsWith(site + path.sep) || file === site);
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
      res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
      if (legacyCacheCase) {
        // Keep a real HTTP cache enabled (Playwright routing disables it).
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"
        );
        if (["/assets/css/main.css", "/assets/js/theme.js"].includes(url.pathname)) {
          cacheCaseRequests.push(req.url);
          res.setHeader("Cache-Control", "public, max-age=14400");
          if (!url.search) {
            return res.end(
              url.pathname.endsWith(".css") ? "body { background: white; } .portfolio-grid { display: block; }" : "window.legacyThemeLoaded = true;"
            );
          }
        }
        if (url.searchParams.has("legacy-assets")) {
          const html = (await fs.readFile(file, "utf8")).replace(/(\/assets\/(?:css\/main\.css|js\/theme\.js))\?[^"']*/g, "$1");
          return res.end(html);
        }
      }
      res.end(await fs.readFile(file));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  const executablePath = process.env.CHROMIUM_EXECUTABLE_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
  browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
});

after(async () => {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
});

async function visit(url = "/", options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: "ja-JP", ...options });
  // Core navigation, palettes and search must work when third-party services are unavailable.
  await context.route("**/*", (route) => (route.request().url().startsWith(base) ? route.continue() : route.abort()));
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base + url, { waitUntil: "load" });
  return { context, page, errors };
}

test("All existing HTML routes, article bodies and the avatar are preserved", async () => {
  for (const file of baseline.html_paths) assert.ok(existsSync(path.join(site, file)), file);
  for (const [file, checksum] of Object.entries(baseline.markdown_bodies_sha256)) {
    const body = (await fs.readFile(path.join(root, file), "utf8")).split("---").slice(2).join("---");
    assert.equal(sha256(body), checksum, file);
  }
  assert.equal(sha256(await fs.readFile(path.join(root, "assets/img/icon.jpg"))), baseline.avatar_sha256);
});

test("Home shows three real project images and canonical URLs use argo11.dev", async () => {
  const { context, page, errors } = await visit();
  assert.equal(await page.locator(".project-card").count(), 3);
  assert.equal(await page.locator(".portfolio-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length), 3);
  assert.deepEqual(await page.locator(".project-card img").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("src"))), [
    "/assets/img/projects/school-admin.png",
    "/assets/img/projects/sit-copilot.png",
    "/assets/img/nlp2026-ftllm-award.jpg",
  ]);
  assert.ok(
    await page
      .locator(".project-card img")
      .evaluateAll((nodes) => nodes.every((node) => node.complete && node.naturalWidth > 0 && node.alt.length > 0))
  );
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://argo11.dev/");
  assert.equal(await page.locator(".project-card a a").count(), 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test("Every themed HTML route references matching versioned CSS and theme JS", async () => {
  // Standalone embed assets and saved Lighthouse reports do not use the site head.
  for (const file of baseline.html_paths.filter((file) => !file.startsWith("assets/") && !file.startsWith("lighthouse_results/"))) {
    const html = await fs.readFile(path.join(site, file), "utf8");
    const cssVersion = html.match(/\/assets\/css\/main\.css\?v=(\d{14})"/);
    const jsVersion = html.match(/\/assets\/js\/theme\.js\?v=(\d{14})"/);
    assert.ok(cssVersion, `${file}: versioned CSS`);
    assert.ok(jsVersion, `${file}: versioned theme JS`);
    assert.equal(cssVersion[1], jsVersion[1], file);
  }
});

test("Revisits and ordinary reloads work with four-hour legacy CSS and JS in the browser cache", async () => {
  legacyCacheCase = true;
  cacheCaseRequests.length = 0;
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  try {
    const page = await context.newPage();
    await page.goto(base + "/?legacy-assets=1", { waitUntil: "load" });
    assert.equal(await page.evaluate(() => window.legacyThemeLoaded), true);
    assert.equal(await page.locator(".portfolio-grid").evaluate((node) => getComputedStyle(node).display), "block");
    // Prove that a second navigation uses the old HTTP cache rather than fetching it again.
    const legacyRequests = cacheCaseRequests.length;
    await page.goto(base + "/?legacy-assets=2", { waitUntil: "load" });
    assert.equal(cacheCaseRequests.length, legacyRequests);
    assert.equal(await page.evaluate(() => window.legacyThemeLoaded), true);
    await page.goto(base, { waitUntil: "load" });
    assert.equal(await page.evaluate(() => window.legacyThemeLoaded), undefined);
    assert.equal(await page.locator(".site-nav").evaluate((node) => getComputedStyle(node).display), "flex");
    assert.equal(await page.locator(".portfolio-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length), 3);
    assert.equal(await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor), paletteBackgrounds.latte);
    await page.locator('.palette-switch label:has(input[value="espresso"])').click();
    await page.reload({ waitUntil: "load" });
    assert.equal(await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor), paletteBackgrounds.espresso);
    await page.goto(base + "/projects/", { waitUntil: "load" });
    assert.equal(await page.locator('input[value="espresso"]').isChecked(), true);
    await page.locator('.palette-switch label:has(input[value="mocha"])').click();
    assert.equal(await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor), paletteBackgrounds.mocha);
    assert.ok(cacheCaseRequests.some((url) => /^\/assets\/css\/main.css\?v=\d{14}$/.test(url)));
    assert.ok(cacheCaseRequests.some((url) => /^\/assets\/js\/theme.js\?v=\d{14}$/.test(url)));
  } finally {
    await context.close();
    legacyCacheCase = false;
  }
});

test("Palette radios work with arrow keys and remember the selection across routes, reloads and tabs", async () => {
  const { context, page, errors } = await visit();
  await page.locator('input[value="latte"]').focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("html").getAttribute("data-palette"), "mocha");
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("html").getAttribute("data-palette"), "espresso");
  assert.equal(await page.evaluate(() => localStorage.getItem("argo-palette")), "espresso");
  await page.goto(base + "/projects/", { waitUntil: "load" });
  assert.equal(await page.locator("html").getAttribute("data-palette"), "espresso");
  await page.reload({ waitUntil: "load" });
  assert.equal(await page.locator('input[value="espresso"]').isChecked(), true);
  const other = await context.newPage();
  await other.goto(base, { waitUntil: "load" });
  await page.locator('.palette-switch label:has(input[value="mocha"])').click();
  await other.waitForFunction(() => document.documentElement.dataset.palette === "mocha");
  assert.deepEqual(errors, []);
  await context.close();
});

test("Unavailable or invalid storage still allows palette switching", async () => {
  const { context, page, errors } = await visit();
  await page.evaluate(() => localStorage.setItem("argo-palette", "invalid"));
  await page.reload({ waitUntil: "load" });
  assert.equal(await page.locator("html").getAttribute("data-palette"), "latte");
  await context.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    })
  );
  await page.reload({ waitUntil: "load" });
  await page.locator('.palette-switch label:has(input[value="espresso"])').click();
  assert.equal(await page.locator("html").getAttribute("data-palette"), "espresso");
  assert.deepEqual(errors, []);
  await context.close();
});

test("Skip link, mobile menu, search and focus indicators work with the keyboard", async () => {
  const { context, page, errors } = await visit("/", { viewport: { width: 390, height: 844 } });
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(".skip-link").evaluate((node) => node === document.activeElement), true);
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main-content");
  await page.locator(".menu-toggle").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "Home");
  assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), "solid");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
  assert.equal(await page.evaluate(() => document.activeElement.className), "menu-toggle");
  await page.keyboard.press("Control+k");
  await page.waitForFunction(() => document.querySelector("ninja-keys").visible);
  assert.ok(await page.locator("ninja-keys input").evaluate((node) => node === node.getRootNode().activeElement));
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("ninja-keys").visible);
  assert.equal(await page.evaluate(() => document.activeElement.className), "menu-toggle");
  await page.addScriptTag({ content: axe.source });
  for (const palette of palettes) {
    await page.locator(`.palette-switch label:has(input[value="${palette}"])`).click();
    await page.keyboard.press("Control+k");
    await page.waitForFunction(() => document.querySelector("ninja-keys").visible);
    const violations = await page.evaluate(async () =>
      (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] } })).violations.map((entry) => ({
        id: entry.id,
        targets: entry.nodes.map((node) => node.target),
      }))
    );
    assert.deepEqual(violations, [], `Search modal: ${palette}`);
    await page.keyboard.press("Escape");
  }
  assert.deepEqual(errors, []);
  await context.close();
});

test("Blog fallback shows both articles; weekly content is absent from discovery and remains at its old URL", async () => {
  const { context, page, errors } = await visit("/blog/");
  assert.deepEqual(await page.locator(".post-title").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href"))), [
    "/blog/2025/c107/",
    "/blog/2025/techbook/",
  ]);
  const discoverable = ["index.html", "blog/index.html", "news/index.html", "feed.xml", "sitemap.xml"];
  for (const file of discoverable) assert.ok(!(await fs.readFile(path.join(site, file), "utf8")).includes("week-14"), file);
  assert.equal(
    await page.evaluate(() =>
      document.querySelector("ninja-keys").data.some((entry) => /week-14|週記|2026年4月第1週/.test(entry.title + entry.description))
    ),
    false
  );
  const response = await page.goto(base + "/blog/2026/week-14/", { waitUntil: "load" });
  assert.equal(response.status(), 200);
  assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow");
  assert.ok((await page.locator("article").textContent()).includes("週記"));
  assert.deepEqual(errors, []);
  await context.close();
});

test("Mobile layouts have no horizontal overflow and use one or two columns", async () => {
  const { context, page, errors } = await visit();
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const url of ["/", "/projects/", "/blog/", "/blog/2025/techbook/"]) {
      await page.goto(base + url, { waitUntil: "load" });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(scrollWidth <= width, `${url} at ${width}px: ${scrollWidth}px`);
      if (url === "/")
        assert.equal(
          await page.locator(".portfolio-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length),
          width < 580 ? 1 : width < 850 ? 2 : 3
        );
    }
  }
  assert.deepEqual(errors, []);
  await context.close();
});

test("Reduced motion disables animated transitions and the back-to-top button restores focus", async () => {
  const { context, page, errors } = await visit("/", { reducedMotion: "reduce" });
  await page.locator('.palette-switch label:has(input[value="espresso"])').click();
  assert.ok(
    await page.locator("html").evaluate((node) => getComputedStyle(node).scrollBehavior === "auto" && !node.classList.contains("transition"))
  );
  assert.ok(
    await page
      .locator(".project-card")
      .evaluateAll((nodes) => nodes.every((node) => parseFloat(getComputedStyle(node).transitionDuration) <= 0.00001))
  );
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForFunction(() => !document.querySelector("#back-to-top").hidden);
  await page.locator("#back-to-top").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => window.scrollY), 0);
  assert.equal(await page.evaluate(() => document.activeElement.id), "main-content");
  await page.keyboard.press("Control+k");
  await page.waitForFunction(() => document.querySelector("ninja-keys").visible);
  assert.equal(
    await page.locator("ninja-keys").evaluate((node) => getComputedStyle(node.shadowRoot.querySelector(".modal-content")).animationName),
    "none"
  );
  assert.deepEqual(errors, []);
  await context.close();
});

for (const palette of palettes) {
  for (const url of ["/", "/projects/", "/blog/", "/blog/2025/techbook/"]) {
    test(`WCAG A/AA and accessibility checks: ${palette} ${url}`, async () => {
      const { context, page, errors } = await visit(url);
      await page.locator(`.palette-switch label:has(input[value="${palette}"])`).click();
      assert.equal(
        await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor),
        paletteBackgrounds[palette],
        "The selected palette must survive production CSS optimization"
      );
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () =>
        (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] } })).violations.map(
          (entry) => ({ id: entry.id, nodes: entry.nodes.map((node) => ({ target: node.target, message: node.failureSummary })) })
        )
      );
      assert.deepEqual(violations, []);
      assert.deepEqual(errors, []);
      await context.close();
    });
  }
}
