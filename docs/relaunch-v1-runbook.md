# cnjianghu Online Relaunch v1

Last updated: 2026-07-29

This runbook is for the Codex-built public site at `https://cnjianghu.vercel.app/`.
It does not apply to the separate Payload CMS project used on localhost.

## Relaunch position

cnjianghu is an independent editorial project for making contemporary Chinese
culture legible without flattening it. The relaunch prioritizes trust,
freshness, and measurable reader response over adding more site architecture.

## What ships in v1

- A rewritten About page that describes the project accurately.
- Public editorial standards covering sourcing, interpretation, AI assistance,
  review dates, and corrections.
- Publication and review metadata on content pages.
- Source lists on newly published Quick Bites.
- An automated content-quality audit.
- Honest Quick Bites language: cards rotate daily, but publication is not
  described as daily.
- One new seasonal Deep Dive and four supporting Quick Bites.

## Pre-deploy checks

Run from the repository root:

```bash
pnpm test
pnpm audit:content
pnpm build
```

Expected relaunch baseline:

- 95 tests pass.
- Content audit reports no blocking errors.
- 43 Deep Dives, 29 Quick Bites, and 125 glossary entries.
- 217 static pages build.
- Pagefind indexes 198 pages.

## Deployment sequence

1. Review the branch `codex/online-relaunch-v1`.
2. Merge it into `main` only after approval.
3. Let the linked Vercel project deploy `main`.
4. Open `/`, `/about`, `/editorial-standards`, `/today`, and
   `/read/when-the-heat-changes-the-clock` on the production URL.
5. Confirm the production console has no errors and the new article appears in
   RSS, sitemap, search, and Open Graph output.

## Search and analytics

The site already contains the implementation hooks for:

- `PUBLIC_PLAUSIBLE_DOMAIN`
- `PUBLIC_PLAUSIBLE_API_HOST` (optional)
- `PUBLIC_GOOGLE_SITE_VERIFICATION`

After the production deployment:

1. Confirm Plausible receives a visit on the production domain.
2. Verify the Search Console property.
3. Submit `https://cnjianghu.vercel.app/sitemap.xml`.
4. Request indexing for the homepage and the new Deep Dive.
5. Record the date these steps were completed.

The internal `/launch` page is the operational surface for readiness status,
tagged share URLs, and first-post copy.

## Domain decision

A custom domain is useful for long-term brand ownership, but it should not block
this relaunch. Keep the Vercel URL through the first validation cycle. Revisit a
custom domain after four weeks of consistent publishing and measurable reader
response.

## Four-week validation cycle

Publish one Deep Dive and two to four Quick Bites each week. For every release,
record:

- Unique visitors and engaged reading time.
- Search impressions and indexed-page status.
- Which article entry point brought the visit.
- Shares, replies, saves, or direct reader feedback.
- Whether readers continued to a second page.

At the end of week four, decide using evidence:

- Continue the current editorial angle.
- Narrow toward the two themes with the strongest reader response.
- Change distribution channels.
- Pause formats that consume time without producing reading or feedback.

The target is not a large archive. It is a repeatable loop:

`publish → distribute → observe → learn → publish again`

## Editorial maintenance

- Do not add a review date unless a human has checked the claims and source
  links in that specific entry.
- Treat AI output as working material, never as a source.
- Correct material errors in the article and record the change when reader
  interpretation could be affected.
- Run the automated content audit before every production deployment.
