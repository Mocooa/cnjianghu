# Glossary Seed Rollout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an initial batch of lightweight glossary entries and surface the remaining glossary backlog on `/glossary`.

**Architecture:** Reuse the existing `glossary` Astro content collection for real entries, then derive planned glossary concepts from the existing title-bank markdown at build time. Keep published entries and planned concepts visually separate on the glossary index so the site does not blur complete content with editorial backlog.

**Tech Stack:** Astro content collections, build-time Node data helpers, MDX glossary entries, Node test runner

---

## Chunk 1: Planned glossary data

### Task 1: Add glossary-planning tests

**Files:**
- Create: `tests/glossary-planner.test.mjs`
- Create: `src/data/glossary-planner.mjs`

- [ ] Write failing tests for glossary-term extraction, slug normalization, and planned-concept grouping.
- [ ] Run `node --test tests/glossary-planner.test.mjs` and confirm the new tests fail for the expected missing-module behavior.
- [ ] Implement the minimal glossary-planning helper.
- [ ] Re-run `node --test tests/glossary-planner.test.mjs` and confirm it passes.

### Task 2: Wire planned glossary concepts into the glossary index

**Files:**
- Modify: `src/pages/glossary/index.astro`

- [ ] Update the page to load published glossary entries plus planned glossary concepts.
- [ ] Keep published entries as the primary section and add a clearly separate planned section below it.
- [ ] Re-run the glossary-planner tests if the data contract changes.

## Chunk 2: Seed published glossary entries

### Task 3: Add the first batch of lightweight glossary entries

**Files:**
- Create: `content/published/glossary/*.mdx`

- [ ] Add the first batch of lightweight glossary entries using the existing content schema.
- [ ] Keep each entry readable but short: literal, actual meaning, usage context, outsider misread, related terms.
- [ ] Cross-link terms through `related_terms` only when the target slug exists in the same batch.

## Chunk 3: Verification and logs

### Task 4: Verify and document

**Files:**
- Modify: `task_plan.md`
- Modify: `progress.md`
- Modify: `findings.md`

- [ ] Run `node --test tests/glossary-planner.test.mjs tests/title-bank-parser.test.mjs tests/roadmap-grouping.test.mjs`.
- [ ] Run `pnpm build`.
- [ ] Update project logs with the glossary rollout details and verification results.
