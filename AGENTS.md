# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a personal website/blog built with Jekyll using the [al-folio](https://github.com/alshedivat/al-folio) theme, hosted on GitHub Pages. The site content is primarily in Japanese.

**Site URL:** https://arugo11.github.io

## Development Commands

### Local Development

```bash
# Install dependencies (first time only)
bundle install

# Build the site
bundle exec jekyll build

# Start local development server (serves at http://localhost:4000)
bundle exec jekyll serve
```

Note: There is no `bin/serve` script - use `bundle exec jekyll serve` directly.

### Building and Deployment

```bash
# Production build
bin/cibuild           # Equivalent to: bundle exec jekyll build

# Deploy to GitHub Pages (manual deployment)
bin/deploy            # Deploys from main branch to gh-pages branch
```

**Note:** Automatic deployment is handled via GitHub Actions (`.github/workflows/deploy.yml`). Changes pushed to the main branch automatically trigger deployment.

### Code Formatting

The project uses Prettier for code formatting. The GitHub workflow (`.github/workflows/prettier.yml`) runs automatically on commits.

```bash
# Format code manually
npm install
npx prettier . --write
```

## Content Structure

### Blog Posts (`_posts/`)

- Blog posts use the naming format: `YYYY-MM-DD-title.md`
- Front matter required: `title`, `date`, `layout: post`, `categories`, `tags`, `description`, `image`
- Use `_templates/post-template.md` as a starting point for new posts
- Permalink format: `/blog/:year/:title/`

### News (`_news/`)

- News/announcements are stored in `_news/` directory
- Uses the same markdown format as blog posts
- Permalink format: `/news/:path/`

### Projects (`_projects/`)

- Project showcase entries in `_projects/` directory
- Categories defined in `_config.yml` under `project_categories`

### Pages (`_pages/`)

- Static pages like about, blog index, projects, etc.
- Each page has a corresponding `.md` file in `_pages/`

## Site Configuration

Main configuration is in `_config.yml`:

- **Language:** Japanese (`lang: ja`)
- **Blog name:** "Logbook"
- **Navigation:** Defined in `navbar_pages` section
- **Collections:** `news` and `projects` are custom collections
- **Plugins:** jekyll-archives, jekyll-feed, jekyll-scholar, jekyll-toc, jemoji, etc.

### Key Configuration Sections

- `blog_name`: Blog section title
- `latest_posts.limit`: Number of posts shown on homepage (default: 5)
- `display_tags`: Tags shown in the blog sidebar
- `giscus`: GitHub Discussions-based commenting system (enabled for Japanese)

## Theme Customization

- **Color theme:** Custom cream color `#F6ECD4` defined in `colors.cream`
- **Styles:** Located in `_sass/` directory
- **Layouts:** Liquid templates in `_layouts/` (default, post, page, about, etc.)
- **Includes:** Reusable components in `_includes/` (header, footer, social, etc.)
- **Assets:** Static assets in `assets/` (images, CSS, JS, fonts)

### Layout Types

- `default.liquid`: Base layout
- `post.liquid`: Blog post layout with TOC support
- `page.liquid`: Static page layout
- `about.liquid`: About/profile page layout
- `distill.liquid`: Distill publication format

## Special Features

- **TOC (Table of Contents):** Enabled via `jekyll-toc` plugin
- **MathJax:** Enabled (`enable_math: true`)
- **Dark Mode:** Enabled (`enable_darkmode: true`)
- **Comments:** Giscus (GitHub Discussions) integration
- **Search:** Built-in search functionality enabled
- **Image lazy loading:** Enabled

## Deployment Workflow

1. Push changes to `main` branch
2. GitHub Actions workflow `.github/workflows/deploy.yml` triggers automatically
3. Site is built and deployed to GitHub Pages
4. Deployed from `gh-pages` branch

### Cloudflare Pages Notes

- This repository may also be built by Cloudflare Pages, which runs `npm clean-install` before `bundle install`.
- Keep `node_modules/` in `_config.yml`'s `exclude` list. If it is not excluded, Jekyll can try to render package README files as site content and fail on Liquid-like syntax inside dependencies.
- Cloudflare Pages has been sensitive to SCSS encoding issues from the upstream `jekyll-theme-primer` gem. The repository now vendors Primer SCSS under `_sass/primer-*`, plus `_sass/jekyll-theme-primer.scss` and `assets/css/style.scss`, specifically to avoid that build failure.
- When adjusting theme styles, prefer editing the repo-owned SCSS files rather than assuming the gem-provided Primer assets will build correctly in Cloudflare.
- If a Cloudflare deployment fails, inspect the build log before changing app code. Recent failures in this repo have been caused by build-environment differences rather than by page content changes.

## Files to Exclude

The following are excluded from the build (defined in `_config.yml`):

- `_site/` (build output directory)
- `bin/`, `vendor/`, `node_modules/` (development dependencies)
- Documentation files (README.md, CONTRIBUTING.md, CUSTOMIZE.md, etc.)
- Docker files

## Custom Data Files

- `_data/schedule.yml`: Stores schedule/calendar events data. Events are structured as YAML objects consumed by the schedule page.

## Custom Styles

The `_sass/_custom.scss` file defines site-specific styles:

- **Theme colors**: Cream color `#F6ECD4` for light mode, dark mode colors
- **Custom components**: `.post-card`, `.weekly-log`, `.trpg-session`, `.ml-article`
- **Calendar styles**: FullCalendar customization via `.fc` classes
- **Project cards**: 16:9 aspect ratio for `.card-img-top`
