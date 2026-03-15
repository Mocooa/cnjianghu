# Wave 1 Launch Slate — 12 Deep Dives Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish 12 Wave 1 "Immediate Curiosity Hooks" articles as deep-dives, filling all 6 pillar pages with 2 articles each.

**Architecture:** Each article is an MDX file in `content/published/deep-dives/` following the established deep-dive schema. Articles use `<ChineseTerm>` for inline glossary links and `<CulturalNote>` for context callouts. All glossary dependencies are already published. Rank #1 (hot water) is already covered by the existing deep dive `why-chinese-love-hot-water.mdx`, so we write 11 new articles + acknowledge #1 as complete.

**Tech Stack:** Astro 6, MDX, TypeScript content collections, ChineseTerm/CulturalNote components

---

## Content Format Reference

### Deep Dive Template

```mdx
---
title: ""
subtitle: ""
pillar: <pillar-enum>
tags: [tag1, tag2, tag3]
date: 2026-03-15
author: cnjianghu
summary: ""
reading_time: <5-8>
related: []
sources:
  - title: ""
    url: ""
    platform: ""
---

import ChineseTerm from '@components/content/ChineseTerm.astro';
import CulturalNote from '@components/content/CulturalNote.astro';

[Opening hook — vivid scene, question, or surprising fact. 2-3 paragraphs.]

## [Section 1 — The misconception or surface-level understanding]

[Correct the common misreading. 2-3 paragraphs.]

## [Section 2 — What's actually going on]

[The real mechanics, context, or cultural logic. Use <ChineseTerm> for key terms. 3-4 paragraphs.]

<CulturalNote>
[Contextual aside that deepens understanding]
</CulturalNote>

## [Section 3 — Why it matters / what it connects to]

[Broader significance, patterns, modern evolution. 2-3 paragraphs.]

## [Closing section — Reframe for the reader]

[Takeaway that changes how the reader sees the topic. 1-2 paragraphs.]

---

*Related content links*
```

### Writing Guidelines

- **Length:** 800-1200 words, reading_time 5-8 minutes
- **Tone:** Accessible, conversational, corrects misconceptions without lecturing
- **Structure:** Hook → Misconception → Reality → Significance → Reframe
- **ChineseTerm usage:** 3-6 per article, link to published glossary via `glossarySlug`
- **CulturalNote usage:** 1-2 per article for context that enriches but isn't essential
- **Opening:** Always start with a concrete scene or moment, never an abstract statement
- **No emoji** in article content

### Frontmatter Rules

- `pillar`: Must match pillarEnum (`digital-china`, `taste-life`, `aesthetic-china`, `mind-china`, `living-china`, `future-china`)
- `date`: Use `2026-03-15` for all (batch publish date)
- `author`: Always `cnjianghu`
- `reading_time`: Estimate 150 words/minute
- `tags`: 3-5 tags, lowercase, hyphenated
- `related`: Slugs of other deep-dives (optional, cross-link where natural)
- `sources`: At least 1 source per article (Zhihu, WeChat articles, news, academic)

---

## Chunk 1: Batch A — taste-life + digital-china (3 articles)

### Task 1: Rank #1 — Acknowledge existing coverage

**Status:** Already published as `why-chinese-love-hot-water.mdx`

The existing deep dive covers the hot water topic comprehensively (TCM body logic, thermos culture, care gestures). The quick bite `hot-water-is-care.mdx` covers the care gesture angle. No new article needed.

- [ ] **Step 1: Verify existing coverage**

Run: `ls content/published/deep-dives/why-chinese-love-hot-water.mdx`
Expected: File exists

- [ ] **Step 2: Confirm — mark rank #1 as complete, proceed to remaining 11**

---

### Task 2: Rank #7 — "Why Breakfast in China Is So Often Hot, Fast, and Savory"

**Files:**
- Create: `content/published/deep-dives/why-chinese-breakfast-is-hot-fast-savory.mdx`

**Glossary dependencies:** zaodian ✅, doujiang ✅

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-breakfast-is-hot-fast-savory
Pillar: taste-life
Tags: [food-culture, breakfast, daily-life, street-food]
Reading time: 6

Content outline:
- HOOK: 6:30 AM at a 早点 (zaodian) stall — the steam, the speed, the queue
- SECTION "Not just convenience — a different breakfast philosophy"
  - Western breakfast: sweet/cold/slow (cereal, toast, yogurt)
  - Chinese breakfast: hot/savory/fast (粥, 豆浆, 包子, 油条)
  - The body-logic reason: warm food "wakes up" the stomach
- SECTION "The breakfast ecosystem"
  - Street stall networks that appear at 5 AM and vanish by 9 AM
  - Regional variation: 豆浆油条 (north), 肠粉 (south), 热干面 (Wuhan), 煎饼 (Beijing)
  - <ChineseTerm> links: zaodian, doujiang
- SECTION "Why it's disappearing and surviving"
  - Urban pressure: young workers skip or grab 便利店 items
  - But zaodian culture persists — it's too embedded, too cheap, too good
  - <CulturalNote>: The emotional weight of 早餐 in Chinese family memory
- CLOSE: Breakfast is the meal that tells you what a city actually eats
```

- [ ] **Step 2: Validate frontmatter against schema**

Run: `pnpm build 2>&1 | grep -E "error|Error"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add content/published/deep-dives/why-chinese-breakfast-is-hot-fast-savory.mdx
git commit -m "content: add deep dive — why Chinese breakfast is hot, fast, savory"
```

---

### Task 3: Rank #2 — "Why WeChat Feels Bigger Than Any Messaging App Foreigners Expect"

**Files:**
- Create: `content/published/deep-dives/why-wechat-feels-bigger-than-messaging.mdx`

**Glossary dependencies:** mini-program ✅

- [ ] **Step 1: Write the article**

```
Slug: why-wechat-feels-bigger-than-messaging
Pillar: digital-china
Tags: [wechat, super-app, digital-life, mobile]
Reading time: 7

Content outline:
- HOOK: A foreigner's first week with WeChat — pay bills, book doctor, order food, hail taxi, all in one app
- SECTION "It's not a messaging app — it's an operating system"
  - WeChat vs WhatsApp framing is misleading
  - 小程序 (mini programs): apps inside the app
  - <ChineseTerm> links: mini-program
  - WeChat Pay as infrastructure, not feature
- SECTION "How it became everything"
  - Timeline: chat app → payments → mini programs → government services
  - Network effect: once everyone is on WeChat, everything moves there
  - The "super-app" concept China invented and the world is now copying
- SECTION "What daily life looks like inside WeChat"
  - Morning: check Moments, pay for breakfast
  - Work: WeChat groups replace email, WeCom for corporate
  - Evening: order food, split bills, send red packets
  - <CulturalNote>: WeChat groups as social infrastructure (family, class parent, building neighbors)
- CLOSE: WeChat isn't an app you use — it's the digital air you breathe in China
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 4: Rank #8 — "Why Chinese Chats Use So Many Stickers and Meme Images"

**Files:**
- Create: `content/published/deep-dives/why-chinese-chats-use-so-many-stickers.mdx`

**Glossary dependencies:** zhenghuo ✅, pofang ✅

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-chats-use-so-many-stickers
Pillar: digital-china
Tags: [internet-culture, wechat, communication, humor]
Reading time: 6

Content outline:
- HOOK: Open any Chinese group chat — half the messages are images, not words
- SECTION "表情包 (biaoqingbao) — more than emoji"
  - Custom sticker packs vs generic emoji
  - DIY culture: people make stickers from friends' photos, TV screenshots, pets
  - <ChineseTerm> links: zhenghuo, pofang
- SECTION "Why stickers work where words don't"
  - Chinese communication often avoids direct confrontation
  - Stickers provide emotional range without commitment
  - Humor as social lubricant — 破防 (pofang) moments delivered via meme
  - Generational divide: older users send 早安 sunrise stickers, younger users send ironic memes
- SECTION "The sticker economy"
  - WeChat sticker store, fan-made packs, branded marketing stickers
  - Some sticker artists make a living from their designs
  - <CulturalNote>: The "sticker battle" — when group chats become competitive sticker exchanges
- CLOSE: In Chinese digital life, the sticker is not decoration — it's a second language
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

**Batch A checkpoint:**

- [ ] **Batch validation: full build**

Run: `pnpm build 2>&1 | tail -5`
Expected: `Complete!` with page count increased by 3 (136 pages)

- [ ] **Batch commit (if not committed individually)**

---

## Chunk 2: Batch B — living-china + aesthetic-china (4 articles)

### Task 5: Rank #3 — "Why Chinese Cities Feel More Distinct Than Many Foreigners Expect"

**Files:**
- Create: `content/published/deep-dives/why-chinese-cities-feel-so-distinct.mdx`

**Glossary dependencies:** none

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-cities-feel-so-distinct
Pillar: living-china
Tags: [urbanization, city-life, regional-culture, travel]
Reading time: 7

Content outline:
- HOOK: "China is all the same" — said by someone who has never compared Chengdu's teahouses to Shenzhen's tech parks
- SECTION "The sameness myth"
  - From the outside: identical towers, same chains, WeChat everywhere
  - From the inside: wildly different food, dialect, pace, personality
  - Why foreigners see uniformity: they compare China to "variety" between countries, not within
- SECTION "What makes each city its own world"
  - Chengdu: slow, spicy, teahouse culture, 巴适 (bashi)
  - Shanghai: cosmopolitan, sharp, commercial, 精致 (jingzhi)
  - Xi'an: historical weight, carb-heavy food, unapologetically ancient
  - Shenzhen: young, fast, migrant-built, no native dialect
  - Each city has its own food universe, slang, and social rhythm
- SECTION "Why city identity matters"
  - Regional pride runs deep — people identify by city, not just "Chinese"
  - City-tier system (一线/新一线/二线) shapes identity and aspiration
  - <CulturalNote>: Inter-city rivalry and affection — Chengdu vs Chongqing, Beijing vs Shanghai
- CLOSE: China is not one place with one rhythm — it's a continent of city-states sharing a language and an app
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 6: Rank #9 — "Why Public Leisure in China Is So Visible"

**Files:**
- Create: `content/published/deep-dives/why-public-leisure-in-china-is-so-visible.mdx`

**Glossary dependencies:** public-square ✅

- [ ] **Step 1: Write the article**

```
Slug: why-public-leisure-in-china-is-so-visible
Pillar: living-china
Tags: [public-life, urban-culture, community, parks]
Reading time: 6

Content outline:
- HOOK: Walk through any Chinese city after 7 PM — the streets are alive with people doing things
- SECTION "The outdoor living room"
  - Parks as gym, studio, social club simultaneously
  - 广场舞, tai chi, badminton, kite-flying, calligraphy on pavement
  - <ChineseTerm> links: public-square, guangchangwu
  - Why Western cities feel empty by comparison
- SECTION "Why it happens outdoors"
  - Apartment living: small homes push social life outside
  - Public space design: Chinese cities have plazas, courtyards, park networks
  - Climate and habit: evening is cooler, and the tradition is centuries old
  - Free infrastructure: no membership, no reservation, no admission
- SECTION "What it creates"
  - Intergenerational mixing (rare in Western leisure)
  - Neighborhood bonds that survive urbanization
  - <CulturalNote>: The unwritten rules of park space — who gets the flat ground, who gets the path
- CLOSE: Public leisure in China isn't a charming quirk — it's how cities stay human
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 7: Rank #4 — "Why Chinese Mythology Feels Suddenly Everywhere Again"

**Files:**
- Create: `content/published/deep-dives/why-chinese-mythology-feels-everywhere-again.mdx`

**Glossary dependencies:** immortal ✅, auspicious-beast ✅

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-mythology-feels-everywhere-again
Pillar: aesthetic-china
Tags: [mythology, cultural-revival, film, gaming, animation]
Reading time: 7

Content outline:
- HOOK: Ne Zha 2 breaks $2B. Black Myth: Wukong sells 25M copies. Genshin Impact earns billions. What happened?
- SECTION "Mythology never left — but it used to be invisible"
  - Chinese mythology was always in daily life: temple fairs, opera, idioms, Spring Festival
  - But for global audiences, it was invisible — no Disney, no Marvel, no Hollywood pipeline
  - The difference now: Chinese studios are building that pipeline themselves
- SECTION "The three engines"
  - Gaming: Black Myth Wukong, Genshin Impact made Chinese mythology playable worldwide
  - Animation: Ne Zha, White Snake, Jiang Ziya — mythological cinematic universe forming
  - Fashion: 国潮 brands use mythological motifs — not nostalgia, but identity
  - <ChineseTerm> links: immortal, auspicious-beast, xianxia
- SECTION "Why now?"
  - Generational confidence: 90后/00后 grew up proud, not defensive
  - Technical capability: Chinese animation/gaming now rivals global quality
  - <CulturalNote>: 孙悟空 (Sun Wukong) as the ultimate Chinese archetype — rebellious, powerful, redeemable
- CLOSE: Chinese mythology isn't having a comeback. It's having a debut — on the world stage, on Chinese terms
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 8: Rank #10 — "Why Chinese Fantasy Looks Different from Medieval European Fantasy"

**Files:**
- Create: `content/published/deep-dives/why-chinese-fantasy-looks-different.mdx`

**Glossary dependencies:** xianxia ✅, shanshui ✅

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-fantasy-looks-different
Pillar: aesthetic-china
Tags: [fantasy, xianxia, visual-culture, gaming, mythology]
Reading time: 7

Content outline:
- HOOK: A Western fantasy hero wears plate armor and swings a sword. A Chinese fantasy hero wears flowing robes and rides a cloud. Why?
- SECTION "Two fantasy traditions, two worldviews"
  - Western fantasy roots: medieval Europe, Tolkien, D&D — castles, dragons, swords, chosen ones
  - Chinese fantasy roots: Daoist cultivation, 山水 landscapes, immortal beings, inner transformation
  - <ChineseTerm> links: xianxia, shanshui
  - The hero arc differs: Western = defeat the villain, Chinese = transcend mortality
- SECTION "What xianxia looks like"
  - Visuals: mist-covered mountains, flowing sleeves, jade ornaments, calligraphy-as-magic
  - Power system: cultivation (修炼) — train your body and spirit over centuries
  - Settings: not castles but 仙境 (immortal realms), cloud palaces, underwater dragon courts
  - <CulturalNote>: 修仙 (xiuxian) — the fantasy of becoming an immortal through discipline, not destiny
- SECTION "Why it's reaching global audiences now"
  - Games (Genshin, Wuthering Waves), dramas (陈情令, 苍兰诀), novels (translated web fiction)
  - Global audiences discovering a fantasy tradition that feels genuinely new
  - Not replacing Western fantasy — expanding what fantasy can be
- CLOSE: Chinese fantasy isn't "Eastern Lord of the Rings." It's an entirely different imagination of what power, beauty, and transcendence look like
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

**Batch B checkpoint:**

- [ ] **Batch validation: full build**

Run: `pnpm build 2>&1 | tail -5`
Expected: `Complete!` with page count increased by 4 (140 pages)

---

## Chunk 3: Batch C — mind-china + future-china (4 articles)

### Task 9: Rank #5 — "Why 'Saving Face' Explains More Than Politeness in China"

**Files:**
- Create: `content/published/deep-dives/why-saving-face-explains-more-than-politeness.mdx`

**Glossary dependencies:** mianzi ✅, renqing ✅

- [ ] **Step 1: Write the article**

```
Slug: why-saving-face-explains-more-than-politeness
Pillar: mind-china
Tags: [social-dynamics, face-culture, communication, relationships]
Reading time: 7

Content outline:
- HOOK: You're at a dinner. Your Chinese colleague disagrees with the boss. But they don't say "I disagree." Watch what they do instead.
- SECTION "Face is not ego — it's social architecture"
  - Western reading: "face" = pride/vanity (dismissive)
  - Chinese reality: 面子 is a shared resource — everyone at the table holds everyone else's face
  - <ChineseTerm> links: mianzi, renqing, giving-face
  - Giving face, losing face, saving face — three different social operations
- SECTION "How face actually works in daily life"
  - Business: why Chinese meetings rarely produce disagreement in the room
  - Family: why parents and children argue differently than in Western families
  - Social: why insisting on paying the restaurant bill is a face operation, not generosity
  - <CulturalNote>: 人情 (renqing) — the human-feeling economy that runs alongside money
- SECTION "Face and indirectness"
  - Direct communication can damage face — both yours and theirs
  - Chinese communication often works through hints, intermediaries, and context
  - This is not dishonesty — it's a different optimization (relationship preservation vs information transfer)
- CLOSE: Understanding face doesn't just explain Chinese politeness. It explains Chinese negotiation, Chinese anger, and Chinese love.
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 10: Rank #11 — "Why Chinese Parenting Can Feel Intense Even When It Is Loving"

**Files:**
- Create: `content/published/deep-dives/why-chinese-parenting-feels-intense.mdx`

**Glossary dependencies:** gaokao ✅

- [ ] **Step 1: Write the article**

```
Slug: why-chinese-parenting-feels-intense
Pillar: mind-china
Tags: [parenting, education, family, gaokao, life-scripts]
Reading time: 7

Content outline:
- HOOK: A Chinese mother checks her 12-year-old's homework at 11 PM. She is not a "tiger mom." She is terrified.
- SECTION "The Western misread: control vs fear"
  - "Tiger parenting" framing: Chinese parents as strict for its own sake
  - Reality: most Chinese parents are driven by structural fear — the system is unforgiving
  - One exam (高考) determines your university, which determines your career, which determines your life
  - <ChineseTerm> links: gaokao
- SECTION "The system that shapes the parenting"
  - 学区房 (school district housing): parents buy apartments to get children into better schools
  - 补习班 (tutoring): not enrichment but survival — everyone does it, so not doing it = falling behind
  - The pressure cascade: society → parents → children → performance
  - <CulturalNote>: 鸡娃 (jīwá) — "chicken baby" — slang for parents who push children relentlessly
- SECTION "Love expressed as sacrifice"
  - Chinese parental love often flows through sacrifice, not affirmation
  - "I gave up everything for you" is love language, not guilt trip
  - 孝 (filial piety) creates a mutual debt system: parents sacrifice, children repay
  - <ChineseTerm> links: xiao
- CLOSE: Chinese parenting is not cold. It's hot — burning with a love that expresses itself as worry, sacrifice, and relentless effort on your behalf
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 11: Rank #6 — "Why China's AI Story Feels Different from Silicon Valley's Story"

**Files:**
- Create: `content/published/deep-dives/why-china-ai-story-feels-different.mdx`

**Glossary dependencies:** large-model ✅, open-source-model ✅

- [ ] **Step 1: Write the article**

```
Slug: why-china-ai-story-feels-different
Pillar: future-china
Tags: [AI, tech, innovation, deepseek, open-source]
Reading time: 7

Content outline:
- HOOK: January 2025 — DeepSeek drops a model that matches GPT-4. Nvidia loses $600B in a day. What just happened?
- SECTION "Two AI stories, two logics"
  - Silicon Valley AI: massive compute, private models, winner-take-all, VC-funded
  - China AI: constrained compute, open-source models, ecosystem-building, diverse funding
  - <ChineseTerm> links: large-model, open-source-model
  - Not a copy of Silicon Valley — a parallel evolution under different constraints
- SECTION "Why constraints drove innovation"
  - US chip export restrictions forced Chinese labs to optimize, not just scale
  - DeepSeek's breakthrough: reasoning performance at a fraction of the compute cost
  - Open-source as strategy: Chinese AI labs publish weights, Silicon Valley locks them down
  - The result: more innovation per GPU, not just more GPUs
- SECTION "What the ecosystem looks like"
  - Not one dominant player but dozens: DeepSeek, Qwen (Alibaba), Yi, Baichuan, Moonshot
  - Integration into daily apps: AI in WeChat, Baidu, Douyin, education, healthcare
  - <CulturalNote>: AI in China is infrastructure talk, not sci-fi talk — more "how do we deploy this" than "will it be sentient"
- CLOSE: China's AI story isn't about catching up. It's about building differently — and that difference matters more than the benchmarks
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

### Task 12: Rank #12 — "Why Paying in China Can Feel Frictionless to First-Time Visitors"

**Files:**
- Create: `content/published/deep-dives/why-paying-in-china-feels-frictionless.mdx`

**Glossary dependencies:** scan-to-pay ✅, qr-economy ✅

- [ ] **Step 1: Write the article**

```
Slug: why-paying-in-china-feels-frictionless
Pillar: future-china
Tags: [mobile-payment, fintech, daily-life, infrastructure]
Reading time: 6

Content outline:
- HOOK: You're at a street market. The grilled-corn vendor has no cash register. Just a laminated QR code taped to a stick.
- SECTION "The leap that skipped plastic"
  - Western payment evolution: cash → checks → cards → contactless → sometimes mobile
  - Chinese payment evolution: cash → mobile (skipped cards entirely)
  - Why: banking infrastructure was less entrenched, smartphones arrived at the right moment
  - <ChineseTerm> links: scan-to-pay, qr-economy
- SECTION "What frictionless actually looks like"
  - Split dinner bills in 3 seconds
  - Pay rent via WeChat transfer
  - Street food, temple donations, parking, vending machines — all QR
  - Some people under 25 have literally never used cash as adults
- SECTION "The invisible cost of frictionless"
  - Privacy: every transaction is tracked by platforms
  - Exclusion: elderly and rural residents who struggle with smartphones
  - Government digital yuan push: adding a state layer to the payment stack
  - <CulturalNote>: 红包 (hongbao) went digital — WeChat red packets transformed gift-giving culture
- CLOSE: Cashless China isn't about being high-tech. It's about what happens when an entire society decides that convenience beats everything else — and then lives with the consequences
```

- [ ] **Step 2: Validate build**
- [ ] **Step 3: Commit**

---

**Batch C checkpoint:**

- [ ] **Batch validation: full build**

Run: `pnpm build 2>&1 | tail -5`
Expected: `Complete!` with page count increased by 4 (144 pages)

---

## Chunk 4: Final Validation & Deployment

### Task 13: Full validation

- [ ] **Step 1: Verify all 12 deep dives exist**

Run: `ls content/published/deep-dives/*.mdx | wc -l`
Expected: 12 files (1 existing + 11 new)

- [ ] **Step 2: Full build**

Run: `pnpm build 2>&1 | grep "page(s) built"`
Expected: 144+ pages built

- [ ] **Step 3: Verify pillar coverage**

Each pillar should have at least 2 deep dives:
- taste-life: why-chinese-love-hot-water (existing) + breakfast
- digital-china: wechat + stickers
- living-china: cities + public-leisure
- aesthetic-china: mythology + fantasy
- mind-china: face + parenting
- future-china: ai + payments

- [ ] **Step 4: Check home page article grid**

The home page shows up to 4 latest articles. With 12 deep dives, this grid should be full.

### Task 14: Git commit & deploy

- [ ] **Step 1: Stage all new deep dives**

```bash
git add content/published/deep-dives/
```

- [ ] **Step 2: Commit**

```bash
git commit -m "content: add 11 Wave 1 Launch Slate deep dives across all 6 pillars

Immediate Curiosity Hooks covering breakfast, WeChat, city identity,
public leisure, mythology, fantasy, face culture, parenting, AI,
mobile payments, and chat stickers. Each pillar now has 2+ articles."
```

- [ ] **Step 3: Push and deploy**

```bash
git push origin main
vercel --prod
```

- [ ] **Step 4: Verify live site**

Check that `/explore` shows 12 articles and each `/explore/<pillar>` has content.

---

## Execution Order Summary

| Batch | Articles | Pillars | Tasks |
|-------|----------|---------|-------|
| A | #1 (skip), #7 breakfast, #2 WeChat, #8 stickers | taste-life, digital-china | 1-4 |
| B | #3 cities, #9 public leisure, #4 mythology, #10 fantasy | living-china, aesthetic-china | 5-8 |
| C | #5 face, #11 parenting, #6 AI, #12 payments | mind-china, future-china | 9-12 |
| Deploy | validation + git + vercel | — | 13-14 |

## Article Quick Reference

| Rank | Slug | Pillar | Glossary Links | Words |
|------|------|--------|----------------|-------|
| 1 | ~~why-chinese-love-hot-water~~ | taste-life | ✅ existing | — |
| 7 | why-chinese-breakfast-is-hot-fast-savory | taste-life | zaodian, doujiang | ~900 |
| 2 | why-wechat-feels-bigger-than-messaging | digital-china | mini-program | ~1000 |
| 8 | why-chinese-chats-use-so-many-stickers | digital-china | zhenghuo, pofang | ~900 |
| 3 | why-chinese-cities-feel-so-distinct | living-china | (none) | ~1000 |
| 9 | why-public-leisure-in-china-is-so-visible | living-china | public-square, guangchangwu | ~900 |
| 4 | why-chinese-mythology-feels-everywhere-again | aesthetic-china | immortal, auspicious-beast, xianxia | ~1000 |
| 10 | why-chinese-fantasy-looks-different | aesthetic-china | xianxia, shanshui | ~1000 |
| 5 | why-saving-face-explains-more-than-politeness | mind-china | mianzi, renqing, giving-face | ~1000 |
| 11 | why-chinese-parenting-feels-intense | mind-china | gaokao, xiao | ~1000 |
| 6 | why-china-ai-story-feels-different | future-china | large-model, open-source-model | ~1000 |
| 12 | why-paying-in-china-feels-frictionless | future-china | scan-to-pay, qr-economy | ~900 |
