# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Mohammed's one-page developer portfolio: hand-written HTML, one stylesheet and a small script. There is no framework, no bundler and no installed dependencies (`node_modules` does not exist; the scripts use only Node built-ins plus the vendored `vendor/lucide.cjs`).

## Commands

```bash
npm run build   # copy src/ to dist/ and render icons, favicon, robots.txt
npm run check   # assert structure and content of dist/index.html (run build first)
npm run dev     # build once, then serve dist/ at http://127.0.0.1:4173 (PORT overrides)
```

- `npm run check` is the only automated gate; there are no unit tests or linters. It reads `dist/`, so a stale build gives stale results.
- The dev server does not watch files. After editing `src/`, run `npm run build` again and refresh; responses are sent `no-store`, so a running server picks up the new `dist/` without a restart.

## Build pipeline

`scripts/build.mjs` deletes `dist/`, copies **all of `src/`** into it, then rewrites `index.html`:

- Every `<i data-lucide="name"></i>` is replaced with a static inline SVG from `vendor/lucide.cjs`. An unknown icon name fails the build. There is no icon runtime, so icons added any other way will not render. This substitution only runs on `index.html`.
- When `SITE_URL` or Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is set, it adds canonical and `og:url` tags, makes the `og:image` URL absolute and writes `sitemap.xml`.

Because the copy is wholesale, any scratch file left in `src/` is published.

## Constraints that are easy to break

- **Content Security Policy** (`vercel.json`): scripts, styles, images and fonts are `'self'` only. No inline `style=""` attributes, no inline `<script>`, no CDN assets, no `data:` URIs. Logos must be local files in `src/assets/brands/`; only the marks already there are available.
- **`scripts/check.mjs` hard-codes the page's shape**: seven `class="work-item work-row"` projects each with a `shot-desktop` and `shot-mobile`, five `class="phase"` steps, 34 `<li>` across the `<ul data-skill-group="…">` lists (the `<ul>` must carry only that attribute), every `<img>` with `alt`, `width` and `height`, the contact links, and a few strings that must never return. Changing markup or counts means updating the check in the same change.
- **No-JavaScript baseline**: `src/main.js` only enhances. The process phases and the work index must stay readable and navigable without it.
- **Content rules** (`CONTENT.md` is the record): do not invent career dates, statistics, or per-project technology claims. Project names and category lines are confirmed by Mohammed. The testimonial stays word-for-word, with no source label or date.

## Page and stylesheet structure

`src/index.html` is a sequence of sections addressed by id (`partner-home`, `-services`, `-agency`, `-about`, `-tools`, `-process`, `-work`, `-contact`) inside `#portfolio-white > .inner`. It is kept in Prettier's HTML style (4 spaces, wrapped attributes) and the owner's editor reformats it on save, so locate edits by content rather than line number.

`src/styles.css` conventions:

- Every rule is scoped under `#portfolio-white`, written one rule per line. Colors are derived from the tokens on `#portfolio-white` (`--pw-bg`, `--pw-ink`, `--pw-blue`, `--pw-coral`, `--pw-muted`, `--pw-line`, `--pw-soft`) with `color-mix()`; avoid new literal colors.
- The first ~50 lines are older base rules packed into long lines, including the shared breakpoints (590px, 800px, 1101px) and the `.inner` gutters. Below that, each section has its own block introduced by a comment, with its media queries at the end of the block. Add or change section styles in that section's block instead of appending overrides elsewhere.
- Hover effects go inside `@media(hover:hover) and (pointer:fine)`; each block ends with its `prefers-reduced-motion` overrides.
- `data-tint="blue|coral|ink"` sets `--work-tint`, the soft panel background reused by the work previews, service cards, About stage and agencies panel.

Pieces shared across sections: `.shot` (a CSS-drawn browser window plus phone around two screenshots, sized with container-query units), `.action` (the pill button), `.code-line` (numbered code rows used by the About card and the React demo), and the circular arrow (`.work-go`, `.cta-go`, `.skill-toggle`).

The work section has two modes from the same markup. With a fine pointer at 960px and wider it is a list on the left driving one sticky preview on the right (`data-active`, kept in sync by `main.js`). Otherwise each project is a tile showing its own preview.

## Project screenshots

Each project needs `src/assets/images/<id>.jpg` (1265×712) and `<id>-mobile.jpg` (387×841). Both include a 15px classic scrollbar strip on the right that the CSS crops off, so new captures must keep it or the crop will cut real content. The existing ones were taken with Playwright Chromium at those viewport sizes with `ignore_default_args=['--hide-scrollbars']`, at device scale factor 2 and downsampled.

## Deployment

The live site (https://mohammed-portfolio-zeta.vercel.app/) was uploaded through Vercel Drop and is not connected to git, so nothing local publishes on its own. `DEPLOYMENT.md` holds the record and steps. `vercel.json` describes the build for a future CLI or git-connected deploy.

## Keeping the docs true

`README.md` (the "Included" list and third-party asset notes) and `CONTENT.md` (design decisions plus a plain-text transcript of the page copy) describe the current page. Update them when a section's structure, copy or assets change.
