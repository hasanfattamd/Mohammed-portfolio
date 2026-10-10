# Vercel deployment

The portfolio is live at **https://mohammed-portfolio-zeta.vercel.app/**.

It was deployed on 10 October 2026 to Mohammed's personal Vercel Hobby workspace as the **mohammed-portfolio** project. Codex uploaded the static production files through Vercel Drop and checked the public page, portrait, project cards, navigation, email, and LinkedIn links.

Project dashboard: https://vercel.com/mohammed-hasanfatta/mohammed-portfolio

## Making changes

The editable files are in `src/`. Run `npm run build` to refresh `dist/`, then deploy the refreshed files to the existing Vercel project. This initial Vercel Drop upload is not connected to Git, so editing local files alone will not update the public site. Codex can handle the next deployment when requested.

`vercel.json` in the project root configures the source build (`npm run build`, output `dist`) for a future CLI or Git-connected deployment. `portfolio-static.zip` contains the files used for the first Drop deployment. Its contents should be rebuilt before uploading any future changes.

No environment variables are required. If a custom domain is added later, set `SITE_URL` to its final HTTPS address and redeploy so canonical metadata and the sitemap use that domain.
