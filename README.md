# cnjianghu

Content-first Astro site for deep dives into Chinese culture, glossary entries, daily quick bites, and launch-ready distribution tooling.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`          | Installs dependencies                            |
| `pnpm dev`              | Starts local dev server at `localhost:4321`      |
| `pnpm build`            | Builds the production site to `./dist/` and runs Pagefind |
| `pnpm preview`          | Previews the build locally                       |
| `vercel build --prod`   | Builds Vercel output locally                     |
| `vercel deploy --prod`  | Deploys production directly                      |

## Analytics

Lightweight analytics is wired for Plausible and is disabled by default.

1. Copy `.env.example` to `.env`
2. Set `PUBLIC_PLAUSIBLE_DOMAIN` to the site domain you registered in Plausible
3. Optionally override `PUBLIC_PLAUSIBLE_API_HOST` if you self-host Plausible

Tracked behaviors:
- `Search`
- `Search Suggestion Click`
- `Share Click`
- `Copy Link`
- `Launch Share Click`
- `Launch Copy`

## Search Console

Google Search Console can be enabled with the HTML tag verification flow.

1. Add your site property in Search Console
2. Choose the HTML tag verification method
3. Copy the `content` token from the provided `<meta name="google-site-verification" ... />`
4. Set `PUBLIC_GOOGLE_SITE_VERIFICATION` in `.env`
5. Redeploy the site
6. Verify the property in Search Console

After verification, submit:
- `https://cnjianghu.vercel.app/sitemap.xml`
- `https://cnjianghu.vercel.app/rss.xml`

The `/launch` page includes a readiness checklist for analytics, Search Console, sitemap, and RSS.

## Go Live

Use `/launch` as the operator page for the first launch.

1. Create the Plausible site for your production domain
2. Set `PUBLIC_PLAUSIBLE_DOMAIN` and `PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel
3. Redeploy production
4. Verify the property in Search Console
5. Submit `https://cnjianghu.vercel.app/sitemap.xml`
6. Request indexing for the homepage and strongest article
7. Use the tagged X / Reddit share links from `/launch`

## Launch Tooling

The project includes a noindex launch helper at `/launch`:

- Generates UTM-tagged URLs for the homepage and latest deep dive
- Opens prefilled X and Reddit share flows
- Provides one-click copy for launch copy blocks
- Pairs share actions with Plausible custom events when analytics is enabled
- Shows whether Plausible and Google Search Console verification are configured
- Includes a launch/readiness checklist with the live sitemap and RSS endpoints
- Includes a step-by-step `Go Live Checklist` with direct links to the key dashboards and URLs
