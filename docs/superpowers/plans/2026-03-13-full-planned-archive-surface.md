# Full Planned Archive Surface Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-curated `Top 30`-only roadmap surface with a full planned-content surface sourced from the six title-bank spec files.

**Architecture:** Keep the current launch-slate data for wave summaries, but add a build-time parser over the six `*-title-bank-v1.md` files. Use the parsed result as the source of truth for full planned content on `/archive-map` and the pillar explore pages, while keeping all planned items outside Astro content collections and Pagefind indexing.

**Tech Stack:** Astro, TypeScript/ES modules, Node built-ins (`fs`, `path`, `url`), Node test runner, Tailwind utility classes

---

## File Structure

- Create: `src/data/title-bank-parser.mjs`
  - Pure parser utilities for the title-bank markdown files
- Create: `tests/title-bank-parser.test.mjs`
  - Node tests for parser behavior and fixture-like integration checks against the real spec files
- Modify: `src/data/roadmap.ts`
  - Keep launch-wave metadata, enrich and export the full parsed planned-content dataset
- Modify: `src/components/roadmap/PlannedTitleList.astro`
  - Generalize badges and metadata so the component can render both full planned items and launch-slate items
- Modify: `src/components/roadmap/ArchiveMapPillarSection.astro`
  - Add summary counts and full-planned grouping for each pillar
- Modify: `src/pages/archive-map.astro`
  - Replace the `Top 30`-only pillar view with full title-bank coverage while preserving the wave summaries
- Modify: `src/pages/explore/[pillar].astro`
  - Replace the current `Top 30` excerpt with the full pillar-specific planned archive area
- Modify: `src/pages/explore/index.astro`
  - Update copy and counts to reflect the full planned archive surface
- Modify: `task_plan.md`
  - Track the new phase
- Modify: `progress.md`
  - Record implementation and verification
- Modify: `findings.md`
  - Record parser/data-source decisions and any issues

## Chunk 1: Parse the Title Banks

### Task 1: Write failing parser tests

**Files:**
- Create: `tests/title-bank-parser.test.mjs`
- Test: `tests/title-bank-parser.test.mjs`

- [ ] **Step 1: Write failing tests for markdown parsing**

Test cases:
- parse one dossier with one format and tagged titles
- preserve backticked glossary terms inside the title text
- load the real six title-bank files and expose known pillar/title pairs

- [ ] **Step 2: Run the tests to verify failure**

Run:
```bash
node --test tests/title-bank-parser.test.mjs
```

Expected:
- FAIL because `src/data/title-bank-parser.mjs` does not exist yet

### Task 2: Implement the parser

**Files:**
- Create: `src/data/title-bank-parser.mjs`
- Test: `tests/title-bank-parser.test.mjs`

- [ ] **Step 1: Implement minimal parser utilities**

Implement:
- known tag extraction from trailing backtick tags
- dossier heading detection from `##`
- format heading detection from `###`
- title-line parsing for `- ...`
- file discovery for `docs/superpowers/specs/*-title-bank-v1.md`

- [ ] **Step 2: Re-run parser tests**

Run:
```bash
node --test tests/title-bank-parser.test.mjs
```

Expected:
- PASS

## Chunk 2: Expose Full Planned Data

### Task 3: Enrich roadmap data with parsed title-bank items

**Files:**
- Modify: `src/data/roadmap.ts`
- Reference: `src/data/title-bank-parser.mjs`

- [ ] **Step 1: Add a shared planned-title item shape**

Include:
- `pillar`
- `dossier`
- `format`
- `title`
- `tags`
- optional launch-slate metadata such as `launchRank`, `launchWave`, and `dependencies`

- [ ] **Step 2: Merge parsed title-bank items with existing launch-slate metadata**

Use title matching to attach launch-wave metadata where available.

- [ ] **Step 3: Add helpers for**

- full planned stats
- pillar-scoped planned items
- dossier grouping
- tag summaries per pillar

## Chunk 3: Update the UI

### Task 4: Generalize planned-title rendering

**Files:**
- Modify: `src/components/roadmap/PlannedTitleList.astro`

- [ ] **Step 1: Support optional launch-wave display**

Only show wave badges when launch metadata exists.

- [ ] **Step 2: Support richer tag visibility**

Show `Launch first`, `High shareability`, and `Needs glossary support` where helpful without overwhelming the card.

### Task 5: Upgrade archive-map and pillar pages

**Files:**
- Modify: `src/components/roadmap/ArchiveMapPillarSection.astro`
- Modify: `src/pages/archive-map.astro`
- Modify: `src/pages/explore/[pillar].astro`
- Modify: `src/pages/explore/index.astro`

- [ ] **Step 1: Add full planned counts and summary chips**

Each pillar section should expose:
- total planned titles
- dossier count
- launch-first count
- glossary-supported count

- [ ] **Step 2: Replace `Top 30`-only planned excerpts with full grouped lists**

Keep grouping by dossier and keep the published/planned distinction explicit.

- [ ] **Step 3: Preserve the launch-wave summary cards on `/archive-map`**

Those remain useful as the front-door slate while the full title-bank sections sit below.

## Chunk 4: Verify and Record

### Task 6: Verify the parser and the built site

**Files:**
- Modify: `progress.md`
- Modify: `findings.md`

- [ ] **Step 1: Run parser tests**

Run:
```bash
node --test tests/title-bank-parser.test.mjs
```

Expected:
- PASS

- [ ] **Step 2: Run the production build**

Run:
```bash
pnpm build
```

Expected:
- PASS
- `/archive-map/index.html` generated
- `/explore/<pillar>/index.html` generated for all six pillars

- [ ] **Step 3: Spot-check built output**

Run:
```bash
rg -n "Launch first|Needs glossary support|Archive Map|Coming into focus" dist/archive-map/index.html dist/explore/*/index.html
```

Expected:
- planned surfaces appear in the right routes

- [ ] **Step 4: Record results in project logs**

Update:
- `progress.md`
- `findings.md`
- `task_plan.md`

Plan complete and saved to `docs/superpowers/plans/2026-03-13-full-planned-archive-surface.md`. Ready to execute.
