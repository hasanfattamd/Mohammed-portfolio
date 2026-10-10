# Mohammed Portfolio

A one-page portfolio based on Mohammed’s approved white-background design. The production site is in `dist/`; editable source is in `src/`.

## Included

- Upright professional portrait and approved blue/coral accents.
- WordPress, React frontend, Figma-to-WordPress, and builder services.
- White label agency partnership section.
- Separate WordPress, ReactJS, and frontend skills; GenAI presented as ongoing learning.
- Agency experience, five project cards with desktop/mobile device mockups, and five process phases.
- Dayna’s exact testimonial, without its LinkedIn label or date.
- Email and LinkedIn contact links.
- Local font and images, static icons, metadata, keyboard focus states, skip link, reduced-motion support, and responsive layouts.

## Commands (handled by Codex)

- `npm run build`: generate production files in `dist/`.
- `npm run check`: validate local assets, anchors, and required content.
- `npm run dev`: rebuild and preview at http://127.0.0.1:4173.

No package installation is needed to build or preview. Node 22 or newer is recommended. This site uses static HTML/CSS and a small script for the copyright year, so its main content and navigation work without JavaScript.

## Deploy to Vercel

`vercel.json` sets the build command and output folder. Use the **Other** framework preset if the dashboard asks. No environment variables, database, or paid integrations are required.

Build command: `npm run build`
Output directory: `dist`

Codex will handle deployment commands after you authenticate with Vercel. The project is not published until a successful deployment returns a live URL. See `DEPLOYMENT.md` for the guided sequence.

When Vercel provides `VERCEL_PROJECT_PRODUCTION_URL`, the build generates canonical metadata and a sitemap automatically. For a custom domain, set `SITE_URL` to the final HTTPS origin and redeploy.

## Updating

- Page content: `src/index.html`
- Design and responsive styling: `src/styles.css`
- Images: `src/assets/images/`
- Contact details: links in `src/index.html`
- Build / icon generation: `scripts/build.mjs`

Project previews capture the current public client websites; they do not assert the current sites are unchanged since Mohammed worked on them. The five external project links open in a new tab. Email opens the visitor’s mail application; no contact form backend is required.

## Third-party assets

Manrope and Lucide are stored locally. Their licenses are in `vendor/`. The portrait and project images are supplied or captured for this portfolio. No tracking or analytics is installed.
