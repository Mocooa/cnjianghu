# Wave 4 Deep Dives Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce 12 new Deep Dive articles across all 6 pillars, each from a previously untouched dossier, with supporting glossary entries.

**Architecture:** Each article is an MDX file in `content/published/deep-dives/` following the established frontmatter schema (title, subtitle, pillar, tags, date, sources, summary, reading_time, related). Articles use `<ChineseTerm>` and `<CulturalNote>` components inline. New glossary entries are created in `content/published/glossary/` before the articles that reference them.

**Tech Stack:** Astro 6, MDX, Zod content collections

**Spec:** `docs/superpowers/specs/2026-03-16-wave-4-deep-dives-design.md`

---

## File Structure

### New files to create

**New glossary entries (9 files):**
- `content/published/glossary/zongzi.mdx`
- `content/published/glossary/tuanyuan.mdx`
- `content/published/glossary/fanxiang.mdx`
- `content/published/glossary/rensheng-guihua.mdx`
- `content/published/glossary/yijing.mdx`
- `content/published/glossary/wuse.mdx`
- `content/published/glossary/jihui.mdx`
- `content/published/glossary/hanliang.mdx`
- `content/published/glossary/jixiang.mdx`

**Existing glossary entries to reference (no creation needed):**
- `qingdan.mdx`, `kongjiang.mdx`, `tiktok-refugee.mdx`, `city-tier.mdx` — already exist
- `dampness.mdx` — use instead of creating `shiqi` (same term: 湿气)
- `borrowed-scenery.mdx` — use instead of creating `jiejing` (same term: 借景)
- `industrial-upgrading.mdx` — use instead of creating `gongye-shengji` (same territory)
- `auspicious-red.mdx`, `yuanfen.mdx`, `danmu.mdx`, `shanghuo.mdx`, `yangsheng.mdx` — already exist

**Glossary entries from spec explicitly NOT created:**
- `biaozhun-renxing` (#6) — too niche; article can explain inline without dedicated entry
- `shebei-renshi` (#12) — English term "facial recognition" suffices for target audience
- `bianmin` (#12) — too generic ("convenience"); better as inline explanation

**Deep Dive articles (12 files):**
- `content/published/deep-dives/sweet-or-savory-china-food-wars.mdx`
- `content/published/deep-dives/two-billion-dumplings-in-48-hours.mdx`
- `content/published/deep-dives/words-floating-across-screen-not-subtitles.mdx`
- `content/published/deep-dives/the-night-xiaohongshu-became-american.mdx`
- `content/published/deep-dives/25k-a-month-in-shanghai-and-she-still-left.mdx`
- `content/published/deep-dives/graduate-by-22-marry-by-28.mdx`
- `content/published/deep-dives/why-chinese-garden-looks-different-every-ten-steps.mdx`
- `content/published/deep-dives/why-white-walls-make-grandmothers-nervous.mdx`
- `content/published/deep-dives/my-doctor-said-im-damp.mdx`
- `content/published/deep-dives/why-no-fourth-floor-in-this-building.mdx`
- `content/published/deep-dives/why-50-million-watch-chocolate-being-made.mdx`
- `content/published/deep-dives/your-face-opens-the-front-door.mdx`

### Existing files to modify (Task 19 — cross-links)

- `content/published/deep-dives/why-chinese-love-hot-water.mdx` — add `related` entry
- `content/published/deep-dives/how-chinese-banquets-actually-work.mdx` — add `related` entries
- `content/published/deep-dives/three-words-that-explain-a-generations-mood.mdx` — add `related` entries
- `content/published/deep-dives/why-chinese-fantasy-looks-different.mdx` — add `related` entry
- `content/published/deep-dives/why-paying-in-china-feels-frictionless.mdx` — add `related` entry
- `content/published/deep-dives/how-douyin-rewired-a-billion-evenings.mdx` — add `related` entry
- `content/published/deep-dives/why-chinese-chats-use-so-many-stickers.mdx` — add `related` entry

---

## Reference: Patterns to Follow

### Deep Dive frontmatter template

```yaml
---
title: ""
subtitle: ""
pillar: taste-life # one of: digital-china, taste-life, aesthetic-china, mind-china, living-china, future-china
tags: [tag-1, tag-2, tag-3, tag-4]
date: 2026-03-17
author: cnjianghu
summary: ""
reading_time: 6 # word count / 250, rounded
related:
  - slug-of-related-article
sources:
  - title: ""
    url: ""
    platform: ""
---
```

### Required component imports (every article)

```mdx
import ChineseTerm from '@components/content/ChineseTerm.astro';
import CulturalNote from '@components/content/CulturalNote.astro';
```

### ChineseTerm usage

```mdx
<ChineseTerm chinese="弹幕" pinyin="dàn mù" definition="Bullet comments — real-time comments overlaid on video, scrolling across the screen" glossarySlug="danmu" />
```

- 3-6 per article
- Always include `glossarySlug` when a matching glossary entry exists
- `definition` is the hover tooltip — keep it under 30 words

### CulturalNote usage

```mdx
<CulturalNote label="Why this matters">
Content here. Can contain nested <ChineseTerm /> components.
</CulturalNote>
```

- 1-2 per article
- Default label is "Cultural Context" if `label` prop is omitted

### Glossary entry frontmatter template

```yaml
---
title: "Term Name"
kind: term # or concept-note
pillar: mind-china
dossier: "Dossier Name"
evidence_type: language-led # or worldview-led, platform-led, data-led
category: social # one of: philosophy, social, food, internet, arts, daily-life, business, history
chinese: 中文
pinyin: pīn yīn
literal: "literal translation"
short_definition: "One sentence definition"
tags: [tag-1, tag-2]
related_terms: [slug-1, slug-2]
---
```

### Article body structure

Follow: **Hook → Misconception/Reality → Significance → Reframe**

- **Hook** (2-3 paragraphs): Concrete detail, number, or moment. NOT abstract statements.
- **Section 1** (2-3 paragraphs): Surface-level understanding or misconception.
- **Section 2** (3-4 paragraphs): What's actually going on — the cultural mechanics.
- **Section 3** (2-3 paragraphs): Why it matters / what it connects to.
- **Closing** (1-2 paragraphs): Reframe that shifts the reader's perspective.
- **Footer**: Related glossary links + numbered source list.

Target: 1200-1800 words. Calculate `reading_time` at 250 wpm.

### Source requirements

- 3-5 sources per article, covering at least 2 tier levels
- At least 1 Chinese-language source + 1 English-language source
- Tier system: T1 (official/academic) → T2 (industry/authority media) → T3 (deep reporting) → T4 (platform data)
- ALL URLs must be real and verifiable. Never fabricate URLs.
- Inline citations: `(Source Name, Year)` for key data points

### Editorial standards

- No emoji in article content
- Opening diversity: do NOT open all 12 with scene-setting vignettes. Use varied hooks matching each article's narrative strategy.
- Closing diversity: no uniform "What this tells you" — vary the reframe approach.
- Title as-specified in spec — do not modify titles.

---

## Chunk 1: Glossary Entries

Create all new glossary entries before the articles that reference them. This ensures `glossarySlug` links resolve correctly at build time.

### Task 1: Create glossary entries for taste-life articles

**Files:**
- Create: `content/published/glossary/zongzi.mdx`
- Create: `content/published/glossary/tuanyuan.mdx`
- Existing (no creation): `qingdan.mdx` — already exists, use slug `qingdan` in articles

- [ ] **Step 1: Create zongzi.mdx**

```yaml
---
title: "Zongzi"
kind: term
pillar: taste-life
dossier: "Regional Taste Systems"
evidence_type: language-led
category: food
chinese: 粽子
pinyin: zòng zi
literal: "glutinous rice dumpling wrapped in bamboo leaves"
short_definition: "A traditional rice dumpling eaten during the Dragon Boat Festival, whose sweet-vs-savory filling divides China along regional lines and sparks annual online debates."
tags: [festival-food, regional-identity, dragon-boat]
related_terms: []
---
```

Body: 3-5 paragraphs explaining the term, its cultural significance, and the sweet/savory divide. Reference Dragon Boat Festival context.

- [ ] **Step 2: Create tuanyuan.mdx**

```yaml
---
title: "Tuanyuan"
kind: concept-note
pillar: taste-life
dossier: "Festival Foods"
evidence_type: worldview-led
category: social
chinese: 团圆
pinyin: tuán yuán
literal: "round reunion"
short_definition: "The ideal of family reunion — particularly during festivals — that shapes travel patterns, food rituals, and the emotional weight of being together at a shared table."
tags: [family, festivals, spring-festival, social-logic]
related_terms: [reunion-dinner]
---
```

Body: 3-5 paragraphs.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. New entries at `/glossary/zongzi`, `/glossary/tuanyuan`.

- [ ] **Step 4: Commit**

```bash
git add content/published/glossary/zongzi.mdx content/published/glossary/tuanyuan.mdx
git commit -m "content: add glossary entries for taste-life Wave 4 articles"
```

### Task 2: Verify existing glossary entries for digital-china articles

Both `kongjiang.mdx` and `tiktok-refugee.mdx` already exist. No creation needed. Use slugs `kongjiang` and `tiktok-refugee` directly in articles #3 and #4.

- [ ] **Step 1: Verify existing entries have adequate content**

Read `content/published/glossary/kongjiang.mdx` and `content/published/glossary/tiktok-refugee.mdx`. Confirm they cover the concepts needed for the new articles. Update `related_terms` if needed to include new article slugs.

### Task 3: Create glossary entries for living-china articles

**Files:**
- Create: `content/published/glossary/fanxiang.mdx`
- Create: `content/published/glossary/rensheng-guihua.mdx`
- Existing (no creation): `city-tier.mdx` — already exists, use slug `city-tier` in articles

- [ ] **Step 1: Create fanxiang.mdx**

```yaml
---
title: "Fanxiang"
kind: term
pillar: living-china
dossier: "Tier-System Lives"
evidence_type: language-led
category: social
chinese: 返乡
pinyin: fǎn xiāng
literal: "return to hometown"
short_definition: "The act of returning to one's hometown or a lower-tier city — increasingly a deliberate lifestyle choice by young professionals leaving tier-1 pressure, not just a Spring Festival ritual."
tags: [reverse-migration, city-tier, youth-culture]
related_terms: [city-tier, tangping]
---
```

- [ ] **Step 2: Create rensheng-guihua.mdx**

```yaml
---
title: "Rensheng Guihua"
kind: concept-note
pillar: living-china
dossier: "Youth Culture and Life Scripts"
evidence_type: worldview-led
category: social
chinese: 人生规划
pinyin: rén shēng guī huà
literal: "life planning"
short_definition: "The culturally expected sequence of life milestones — education, career, marriage, homeownership, children — that functions as an unwritten social script most Chinese young adults navigate or negotiate."
tags: [life-script, family-pressure, youth-culture]
related_terms: [gaokao, neijuan]
---
```

- [ ] **Step 3: Verify build and commit**

```bash
npm run build
git add content/published/glossary/fanxiang.mdx content/published/glossary/rensheng-guihua.mdx
git commit -m "content: add glossary entries for living-china Wave 4 articles"
```

### Task 4: Create glossary entries for aesthetic-china articles

**Files:**
- Create: `content/published/glossary/yijing.mdx`
- Create: `content/published/glossary/wuse.mdx`
- Create: `content/published/glossary/jihui.mdx`
- Existing (no creation): `borrowed-scenery.mdx` — already exists, use slug `borrowed-scenery` in articles (same concept as 借景/jiejing)

- [ ] **Step 1: Create yijing.mdx**

```yaml
---
title: "Yijing"
kind: concept-note
pillar: aesthetic-china
dossier: "Architecture and Spatial Philosophy"
evidence_type: worldview-led
category: arts
chinese: 意境
pinyin: yì jìng
literal: "idea-scape / mood-realm"
short_definition: "The atmospheric quality of a space, artwork, or poem that evokes feeling beyond what is literally shown — the Chinese aesthetic ideal of suggesting more than is visible."
tags: [aesthetics, spatial-philosophy, poetry]
related_terms: [shanshui, borrowed-scenery]
---
```

- [ ] **Step 2: Create wuse.mdx**

```yaml
---
title: "Wuse"
kind: concept-note
pillar: aesthetic-china
dossier: "Chinese Color Systems"
evidence_type: worldview-led
category: arts
chinese: 五色
pinyin: wǔ sè
literal: "five colors"
short_definition: "The traditional Chinese five-color system (blue-green, red, yellow, white, black) rooted in wuxing philosophy, which maps colors to directions, seasons, elements, and social meanings far beyond decoration."
tags: [color-theory, wuxing, aesthetics, symbolism]
related_terms: [jihui]
---
```

- [ ] **Step 3: Create jihui.mdx**

```yaml
---
title: "Jihui"
kind: term
pillar: aesthetic-china
dossier: "Chinese Color Systems"
evidence_type: worldview-led
category: social
chinese: 忌讳
pinyin: jì huì
literal: "taboo / avoidance"
short_definition: "Cultural taboos — particularly around colors, numbers, and words — that shape everyday choices in China, from gift-wrapping colors to floor numbering to wedding dates."
tags: [taboo, color-code, social-logic, auspicious]
related_terms: [jixiang, wuse]
---
```

- [ ] **Step 4: Verify build and commit**

```bash
npm run build
git add content/published/glossary/yijing.mdx content/published/glossary/wuse.mdx content/published/glossary/jihui.mdx
git commit -m "content: add glossary entries for aesthetic-china Wave 4 articles"
```

### Task 5: Create glossary entries for mind-china articles

**Files:**
- Create: `content/published/glossary/hanliang.mdx`
- Create: `content/published/glossary/jixiang.mdx`
- Existing (no creation): `dampness.mdx` — already exists, use slug `dampness` in articles (same concept as 湿气/shiqi)

- [ ] **Step 1: Create hanliang.mdx**

```yaml
---
title: "Hanliang"
kind: term
pillar: mind-china
dossier: "TCM as a Way of Seeing"
evidence_type: language-led
category: daily-life
chinese: 寒凉
pinyin: hán liáng
literal: "cold-cool"
short_definition: "Foods and conditions classified as cold or cooling in TCM body logic — the reason many Chinese people avoid iced drinks, raw salads, and cold water, especially during illness or menstruation."
tags: [tcm, body-logic, food-as-medicine, temperature]
related_terms: [shanghuo, dampness]
---
```

- [ ] **Step 2: Create jixiang.mdx**

```yaml
---
title: "Jixiang"
kind: concept-note
pillar: mind-china
dossier: "Fate, Luck, and Timing"
evidence_type: worldview-led
category: philosophy
chinese: 吉祥
pinyin: jí xiáng
literal: "auspicious / lucky"
short_definition: "The quality of being favorable or blessed — a concept that organizes Chinese choices around numbers (8 = prosperity, 4 = death), dates, colors, and spatial arrangement far beyond mere superstition."
tags: [auspicious, numbers, luck, social-grammar]
related_terms: [yuanfen, jihui]
---
```

- [ ] **Step 3: Verify build and commit**

```bash
npm run build
git add content/published/glossary/hanliang.mdx content/published/glossary/jixiang.mdx
git commit -m "content: add glossary entries for mind-china Wave 4 articles"
```

### Task 6: Verify existing glossary entry for future-china articles

`industrial-upgrading.mdx` already exists and covers the same territory as 工业升级/gongye-shengji. No creation needed. Use slug `industrial-upgrading` in article #11.

- [ ] **Step 1: Verify existing entry has adequate content**

Read `content/published/glossary/industrial-upgrading.mdx`. Confirm it covers manufacturing-to-high-value-shift concept. Update `related_terms` if needed.

---

## Chunk 2: Batch 1 — High-Shareability Articles

Production order: #4 (Xiaohongshu), #9 (TCM Damp), #3 (Danmu)

### Task 7: Article #4 — The Night Xiaohongshu Became American

**Files:**
- Create: `content/published/deep-dives/the-night-xiaohongshu-became-american.mdx`

**Article spec (from design doc):**
- Pillar: `digital-china`
- Narrative strategy: Timeline/evolution — chronological account of January 2025 event
- 1200-1800 words, 3-5 verified sources (must include both Chinese and English sources)
- ChineseTerm components: link to `tiktok-refugee` and other relevant glossary slugs (use `<ChineseTerm>` for 小红书 inline without glossarySlug — no dedicated entry exists)
- CulturalNote: 1-2 contextual asides
- Adjacency: expands Quick Bite `rednote-moment`. Add to `related` field.

- [ ] **Step 1: Create MDX file with frontmatter**

```yaml
---
title: "The Night Xiaohongshu Became American"
subtitle: "" # Write a subtitle that frames the cultural significance, not just the event
pillar: digital-china
tags: [xiaohongshu, tiktok, platform-culture, cross-border, internet-culture]
date: 2026-03-17
author: cnjianghu
summary: "" # 1-2 punchy sentences
reading_time: 0 # Calculate after writing: word count / 250
related:
  - rednote-moment
sources:
  - title: ""
    url: "" # MUST be real, verified URL
    platform: ""
---
```

- [ ] **Step 2: Write article body**

Follow Hook → Misconception/Reality → Significance → Reframe structure. Use timeline approach for this article. Include:
- 2 `import` statements (ChineseTerm, CulturalNote)
- 3-6 `<ChineseTerm>` instances with glossarySlug where available
- 1-2 `<CulturalNote>` asides
- Footer with related glossary links and numbered source list
- Inline citations for key data points: `(Source, Year)`

- [ ] **Step 3: Calculate reading_time**

Count words in body (excluding frontmatter and component markup). Divide by 250, round to nearest integer. Update `reading_time` field.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. Article accessible at `/read/the-night-xiaohongshu-became-american`.

- [ ] **Step 5: Commit**

```bash
git add content/published/deep-dives/the-night-xiaohongshu-became-american.mdx
git commit -m "content: add deep dive — The Night Xiaohongshu Became American"
```

### Task 8: Article #9 — My Doctor Said I'm Damp

**Files:**
- Create: `content/published/deep-dives/my-doctor-said-im-damp.mdx`

**Article spec:**
- Pillar: `mind-china`
- Narrative strategy: Character-driven + misconception correction
- Link to glossary: `shanghuo`, `yangsheng`, `dampness`, `hanliang`
- Boundary: avoid hot-water article territory (temperature theory). Focus on dual-system coexistence.
- Related: `why-chinese-love-hot-water`

- [ ] **Step 1: Create MDX file with frontmatter**

Use template. Set `pillar: mind-china`, `related: [why-chinese-love-hot-water]`. Include 3-5 verified sources — at least one academic/T1 source on TCM attitudes among young Chinese.

- [ ] **Step 2: Write article body**

Follow spec brief. Key content points:
- TCM clinic visit as entry (25-year-old tech worker, "湿气重" diagnosis)
- How TCM language permeates daily speech (shanghuo, dampness, cold/hot foods)
- The dual-system phenomenon: same person uses TCM vocabulary AND goes to hospitals
- Why this isn't contradiction — it's two operating systems for different domains

- [ ] **Step 3: Calculate reading_time, verify build, commit**

Same pattern as Task 7.

```bash
git add content/published/deep-dives/my-doctor-said-im-damp.mdx
git commit -m "content: add deep dive — My Doctor Said I'm Damp"
```

### Task 9: Article #3 — The Words Floating Across Your Screen Are Not Subtitles

**Files:**
- Create: `content/published/deep-dives/words-floating-across-screen-not-subtitles.mdx`

**Article spec:**
- Pillar: `digital-china`
- Narrative strategy: Misconception correction
- Link to glossary: `danmu`, `kongjiang`
- Related: consider linking to sticker/meme article (`why-chinese-chats-use-so-many-stickers`)

- [ ] **Step 1: Create MDX file with frontmatter**

Use template. Set `pillar: digital-china`. Include sources about Bilibili, danmu culture, and collective spectatorship.

- [ ] **Step 2: Write article body**

Key content points:
- What danmu looks like to a foreigner (noise, broken subtitles, spam?)
- What it actually does: collective ritual, shared emotional checkpoint
- The technology: time-synced comments, kongjiang navigation
- The paradox: alone on your phone, but emotionally present with thousands
- Why this matters: danmu reveals Chinese internet's preference for togetherness

- [ ] **Step 3: Calculate reading_time, verify build, commit**

```bash
git add content/published/deep-dives/words-floating-across-screen-not-subtitles.mdx
git commit -m "content: add deep dive — The Words Floating Across Your Screen Are Not Subtitles"
```

---

## Chunk 3: Batch 2 — Visual/Contrast Hook Articles

Production order: #2 (Dumplings), #8 (White Walls), #11 (Factory Videos)

### Task 10: Article #2 — Two Billion Dumplings in Forty-Eight Hours

**Files:**
- Create: `content/published/deep-dives/two-billion-dumplings-in-48-hours.mdx`

**Article spec:**
- Pillar: `taste-life`
- Narrative strategy: Data/contrast + character-driven
- Link to glossary: `reunion-dinner`, `tuanyuan`
- Related: consider `how-chinese-banquets-actually-work`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Follow same pattern. Key: the hook is the SCALE (billions of dumplings, 48-hour window, 300 million families). Then zoom into kitchen dynamics — hierarchy, generational negotiation, Douyin filming.

```bash
git add content/published/deep-dives/two-billion-dumplings-in-48-hours.mdx
git commit -m "content: add deep dive — Two Billion Dumplings in Forty-Eight Hours"
```

### Task 11: Article #8 — Why White Walls Make Some Chinese Grandmothers Nervous

**Files:**
- Create: `content/published/deep-dives/why-white-walls-make-grandmothers-nervous.mdx`

**Article spec:**
- Pillar: `aesthetic-china`
- Narrative strategy: Misconception correction + data/contrast
- Link to glossary: `wuse`, `jihui`
- No adjacency with existing articles

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: foreigners see red = lucky. Reality = complete color grammar. White = mourning AND Muji minimalism. Red operates differently at wedding vs. funeral vs. logo. Yellow = imperial. Green = infidelity context. Gift-wrapping collisions.

```bash
git add content/published/deep-dives/why-white-walls-make-grandmothers-nervous.mdx
git commit -m "content: add deep dive — Why White Walls Make Some Chinese Grandmothers Nervous"
```

### Task 12: Article #11 — Why 50 Million People Watch Chocolate Being Made

**Files:**
- Create: `content/published/deep-dives/why-50-million-watch-chocolate-being-made.mdx`

**Article spec:**
- Pillar: `future-china`
- Narrative strategy: Data/contrast hook
- Link to glossary: `industrial-upgrading`
- Related: consider `how-douyin-rewired-a-billion-evenings`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: the number is the hook. Then explore WHY: ASMR pleasure, production pride, supply-chain curiosity. Comment sections as evidence. The cultural confidence angle — "this is what we can do."

```bash
git add content/published/deep-dives/why-50-million-watch-chocolate-being-made.mdx
git commit -m "content: add deep dive — Why 50 Million People Watch Chocolate Being Made"
```

---

## Chunk 4: Batch 3 — Foundational Stories

Production order: #1, #5, #6, #7, #10, #12

### Task 13: Article #1 — Sweet or Savory? In China, This Question Starts Wars

**Files:**
- Create: `content/published/deep-dives/sweet-or-savory-china-food-wars.mdx`

**Article spec:**
- Pillar: `taste-life`
- Link to glossary: `mala`, `zongzi`, `qingdan`
- Related: consider `the-meal-that-no-restaurant-can-replicate`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: food arguments = identity arguments. Zongzi sweet/savory divide. Hotpot origin wars. Migrant nostalgia. Online flame wars as proxy for regional belonging.

```bash
git add content/published/deep-dives/sweet-or-savory-china-food-wars.mdx
git commit -m "content: add deep dive — Sweet or Savory? In China, This Question Starts Wars"
```

### Task 14: Article #5 — ¥25K a Month in Shanghai, and She Still Left

**Files:**
- Create: `content/published/deep-dives/25k-a-month-in-shanghai-and-she-still-left.mdx`

**Article spec:**
- Pillar: `living-china`
- Link to glossary: `neijuan`, `tangping`, `city-tier`, `fanxiang`
- Related: consider `three-words-that-explain-a-generations-mood`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: character-driven. Follow one composite person's decision arc. Reverse migration not as failure but recalibration. What "a good life" means when you step off the treadmill.

```bash
git add content/published/deep-dives/25k-a-month-in-shanghai-and-she-still-left.mdx
git commit -m "content: add deep dive — 25K a Month in Shanghai, and She Still Left"
```

### Task 15: Article #6 — Graduate by 22, Marry by 28, Don't Ask Why

**Files:**
- Create: `content/published/deep-dives/graduate-by-22-marry-by-28.mdx`

**Article spec:**
- Pillar: `living-china`
- Link to glossary: `gaokao`, `neijuan`, `rensheng-guihua`
- Boundary: avoid marriage economics (covered by wedding article). Focus on FULL life script — gaokao, career, housing, with marriage as ONE milestone.

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

```bash
git add content/published/deep-dives/graduate-by-22-marry-by-28.mdx
git commit -m "content: add deep dive — Graduate by 22, Marry by 28, Don't Ask Why"
```

### Task 16: Article #7 — Why a Chinese Garden Looks Different Every Ten Steps

**Files:**
- Create: `content/published/deep-dives/why-chinese-garden-looks-different-every-ten-steps.mdx`

**Article spec:**
- Pillar: `aesthetic-china`
- Link to glossary: `shanshui`, `borrowed-scenery`, `yijing`
- Related: consider `why-chinese-fantasy-looks-different`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: the observable fact is the hook. Design principles: framing, concealment, sequential revelation, borrowed scenery. Connect to contemporary Chinese spatial design.

```bash
git add content/published/deep-dives/why-chinese-garden-looks-different-every-ten-steps.mdx
git commit -m "content: add deep dive — Why a Chinese Garden Looks Different Every Ten Steps"
```

### Task 17: Article #10 — Why There Is No Fourth Floor in This Building

**Files:**
- Create: `content/published/deep-dives/why-no-fourth-floor-in-this-building.mdx`

**Article spec:**
- Pillar: `mind-china`
- Link to glossary: `jixiang`, `yuanfen`
- Related: consider `why-saving-face-explains-more-than-politeness`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: elevator buttons (1, 2, 3, 5...) as hook. 4 = death homophone. 8 = prosperity. Wedding dates, phone number auctions, floor renumbering. Auspicious timing as social grammar, not superstition.

```bash
git add content/published/deep-dives/why-no-fourth-floor-in-this-building.mdx
git commit -m "content: add deep dive — Why There Is No Fourth Floor in This Building"
```

### Task 18: Article #12 — Your Face Opens the Front Door. Nobody Thinks That's Strange.

**Files:**
- Create: `content/published/deep-dives/your-face-opens-the-front-door.mdx`

**Article spec:**
- Pillar: `future-china`
- Narrative strategy: Character-driven + misconception correction
- Sourcing note: T3-T4 primary (Sixth Tone, ethnographies), ground with T1 (Pew Research, academic surveys). Highest-difficulty sourcing.
- Related: consider `why-paying-in-china-feels-frictionless`

- [ ] **Step 1-3: Create, write, calculate, verify, commit**

Key: follow one resident through a day's digital checkpoints. Gap between Western "surveillance dystopia" framing and lived "convenience" experience. Neither naive nor dystopian.

```bash
git add content/published/deep-dives/your-face-opens-the-front-door.mdx
git commit -m "content: add deep dive — Your Face Opens the Front Door"
```

---

## Chunk 5: Cross-Links, Verification, Deploy

### Task 19: Add cross-links to existing articles

After all 12 articles are published, add `related` entries pointing TO the new articles from relevant existing ones.

**Files to modify:**
- `content/published/deep-dives/why-chinese-love-hot-water.mdx` — add `my-doctor-said-im-damp` to `related`
- `content/published/deep-dives/how-chinese-banquets-actually-work.mdx` — add `two-billion-dumplings-in-48-hours` and `sweet-or-savory-china-food-wars` to `related`
- `content/published/deep-dives/three-words-that-explain-a-generations-mood.mdx` — add `25k-a-month-in-shanghai-and-she-still-left` and `graduate-by-22-marry-by-28` to `related`
- `content/published/deep-dives/why-chinese-fantasy-looks-different.mdx` — add `why-chinese-garden-looks-different-every-ten-steps` to `related`
- `content/published/deep-dives/why-paying-in-china-feels-frictionless.mdx` — add `your-face-opens-the-front-door` to `related`
- `content/published/deep-dives/how-douyin-rewired-a-billion-evenings.mdx` — add `why-50-million-watch-chocolate-being-made` to `related`
- `content/published/deep-dives/why-chinese-chats-use-so-many-stickers.mdx` — add `words-floating-across-screen-not-subtitles` to `related`

- [ ] **Step 1: Add related slugs to each file's frontmatter**

For each file listed above, add the new slug(s) to the `related` array. If `related` field doesn't exist, add it.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with all 42 deep dives (30 existing + 12 new).

- [ ] **Step 3: Commit**

```bash
git add content/published/deep-dives/why-chinese-love-hot-water.mdx content/published/deep-dives/how-chinese-banquets-actually-work.mdx content/published/deep-dives/three-words-that-explain-a-generations-mood.mdx content/published/deep-dives/why-chinese-fantasy-looks-different.mdx content/published/deep-dives/why-paying-in-china-feels-frictionless.mdx content/published/deep-dives/how-douyin-rewired-a-billion-evenings.mdx content/published/deep-dives/why-chinese-chats-use-so-many-stickers.mdx
git commit -m "content: add cross-links between Wave 4 and existing articles"
```

### Task 20: Final verification and deploy

- [ ] **Step 1: Full build verification**

```bash
npm run build
```

Expected: Build succeeds. Total deep dives: 42. Total glossary entries: ~126 (117 + 9 new). No broken links.

- [ ] **Step 2: Spot-check 3 articles in dev server**

```bash
npm run dev
```

Check in browser:
- `/read/the-night-xiaohongshu-became-american` — verify layout, ChineseTerm links, source list
- `/read/my-doctor-said-im-damp` — verify glossary links resolve
- `/read/why-white-walls-make-grandmothers-nervous` — verify CulturalNote rendering

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod
```

Expected: Deploy succeeds. All new articles accessible on cnjianghu.vercel.app.

- [ ] **Step 4: Final commit for any deploy-related fixes**

```bash
git add -A
git commit -m "chore: Wave 4 deploy verification"
```
