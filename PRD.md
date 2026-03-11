# cnjianghu — Product Requirements Document

> **江湖 (jiāng hú)** — A world beneath the surface. Not the China you see on news, but the one you *feel* when you're in it.

**Version:** 1.0
**Date:** 2026-03-10
**Author:** Puyue Wang
**Status:** Draft

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Target Users](#2-target-users)
3. [Core Value Proposition](#3-core-value-proposition)
4. [Content Architecture](#4-content-architecture)
5. [Information Architecture](#5-information-architecture)
6. [Feature Specifications](#6-feature-specifications)
7. [Content Pipeline](#7-content-pipeline)
8. [Technical Architecture](#8-technical-architecture)
9. [Design Direction](#9-design-direction)
10. [SEO & Growth Strategy](#10-seo--growth-strategy)
11. [MVP Scope & Roadmap](#11-mvp-scope--roadmap)
12. [Success Metrics](#12-success-metrics)
13. [Risks & Mitigations](#13-risks--mitigations)

---

## 1. Product Vision

### 1.1 One-liner

**cnjianghu** is a curated cultural discovery platform that helps the global Chinamaxing community go deeper into Chinese culture — beyond surface-level stereotypes, into the living, breathing jianghu.

### 1.2 Background

"Chinamaxing" 是一个正在全球蔓延的文化浪潮。越来越多的海外年轻人（尤其是 Gen Z）通过 TikTok/Douyin、黑神话悟空、中国时尚品牌、中国美食等渠道，对中国文化产生了浓厚兴趣。

**但他们面临三个核心障碍：**

1. **语言墙** — 最好的中国文化内容（B站、知乎、小红书）全是中文
2. **碎片化** — 信息散落在无数平台，没有结构化的学习路径
3. **深度缺失** — 英文世界的中国内容要么太浅（"Top 10 Chinese Foods"），要么太学术（学术论文），缺少有温度、有深度、有趣的中间地带

### 1.3 Mission

成为全球 Chinamaxing 社群最信赖的中国文化深度内容平台 —— 一个有灵魂的文化江湖。

### 1.4 Principles

| 原则 | 含义 |
|------|------|
| **Authentic over polished** | 真实优先于光鲜。展现真实的中国，不粉饰也不猎奇 |
| **Deep over wide** | 宁可把一个话题讲透，也不蜻蜓点水覆盖百个 |
| **Story over fact** | 用故事带出知识，不做百科全书 |
| **Curiosity over pedagogy** | 激发好奇心，而非灌输教育 |
| **Insider perspective** | 用"带你走进"的视角，而非"向你介绍"的姿态 |

---

## 2. Target Users

### 2.1 Primary Persona: The Chinamaxing Explorer

- **年龄:** 18-35 岁
- **地区:** 北美、欧洲、东南亚、日韩、拉美
- **语言:** 英语为主（后续扩展多语言）
- **特征:**
  - 已经对中国文化有基础兴趣（不是从零开始）
  - 可能学过一些中文，或正在学
  - 在 TikTok/YouTube 上看过中国相关内容
  - 可能玩过原神/黑神话悟空、看过中国动画
  - 想要 go deeper，但找不到好的英文资源
  - 活跃在 Reddit r/China, r/ChineseLanguage, r/Chinamaxing 等社区

### 2.2 Secondary Persona: The Cultural Bridge-builder

- 海外华人 / 留学生
- 想向外国朋友解释中国文化，但自己也说不清
- 会把 cnjianghu 的文章分享给外国朋友

### 2.3 Anti-Persona（不是我们的目标用户）

- 纯粹想学中文语法的语言学习者（有 Duolingo、HelloChinese）
- 寻找旅游攻略的游客（有 Trip.com、Lonely Planet）
- 对中国持有强烈政治立场（无论正负）的人

---

## 3. Core Value Proposition

### 3.1 Value Matrix

| 用户需求 | 现有方案的问题 | cnjianghu 的解决方式 |
|---------|---------------|-------------------|
| 理解中国网络文化 | 全是中文，无英文解读 | AI辅助翻译 + 人工文化注释 |
| 深入了解某个文化主题 | 英文内容太浅或太学术 | 深度长文，有故事、有语境、有温度 |
| 发现新的文化内容 | 不知道去哪里找 | 策展式推荐，每日更新 |
| 理解文化现象的"为什么" | 大多数内容只说"是什么" | 提供历史脉络、社会语境、文化逻辑 |
| 获得 insider 视角 | 外国媒体的外部视角 | 来自中国人的内部视角，用西方能理解的方式表达 |

### 3.2 Tagline Options

- "The insider's guide to Chinese culture"
- "Go deeper into China"
- "Welcome to the jianghu"
- "China, from the inside"

---

## 4. Content Architecture

### 4.1 Content Pillars（内容支柱）

#### Pillar 1: 🌐 Digital China — 中国互联网文化

**定位：** 海外信息差最大、好奇心最强的领域。

| 子分类 | 内容示例 |
|--------|---------|
| **Internet Slang Decoded** | "内卷" 不只是 involution —— 一代人的精神困境 |
| **App Culture** | 为什么中国人用一个 APP 做所有事？微信生态解析 |
| **Meme Museum** | 每周精选中国网络 meme，配文化语境解读 |
| **Platform Deep Dives** | B站是什么？不只是"中国YouTube" —— 一个亚文化宇宙 |
| **Trending Explained** | 本周中国互联网在聊什么？快速解读 |
| **Creator Spotlights** | 值得关注的中国内容创作者推荐（附翻译/字幕资源） |

#### Pillar 2: 🍜 Taste & Life — 饮食与生活

**定位：** 永恒的流量入口，但做深度而非菜谱。

| 子分类 | 内容示例 |
|--------|---------|
| **Food Philosophy** | 为什么中国人执着于"热水"和"趁热吃"？ |
| **Regional Food Maps** | 不是八大菜系概览，而是一座城市的食物灵魂 |
| **Tea Culture** | 茶不是饮料，是一种思维方式 |
| **Street Food Stories** | 一个烧烤摊背后的江湖 |
| **Festival Foods** | 不只是"过年吃饺子"，而是每个食物背后的家庭记忆 |
| **Drinking Culture** | 白酒局的潜规则：一场关于面子和关系的社交博弈 |

#### Pillar 3: 🎨 Aesthetic China — 审美与创造

**定位：** 视觉驱动，展现中国美学的深层逻辑。

| 子分类 | 内容示例 |
|--------|---------|
| **New Chinese Aesthetic** | 国潮不是复古，是传统元素的当代重生 |
| **Design Thinking** | 中国设计的底层逻辑：留白、对称、意境 |
| **Architecture Stories** | 从苏州园林到 MAD 建筑：空间中的哲学 |
| **Gaming & Anime** | 黑神话悟空的每一帧里藏了多少文化密码？ |
| **Hanfu Movement** | 汉服运动：不是 cosplay，是一场文化身份重建 |
| **Calligraphy & Art** | 一笔一划里的宇宙观 |

#### Pillar 4: 🧠 Mind China — 思维与智慧

**定位：** 面向 intellectually curious 的读者，讲中国人的思维方式。

| 子分类 | 内容示例 |
|--------|---------|
| **Philosophy Unpacked** | 道可道，非常道 —— 用大白话解释中国哲学核心概念 |
| **The Art of War, Today** | 孙子兵法在硅谷：为什么 tech bros 在读这本2500年前的书 |
| **TCM Thinking** | 中医不一定能治你的病，但它的思维方式可能改变你看世界的方式 |
| **Guanxi Explained** | "关系"不是 corruption，是一种社会操作系统 |
| **Chinese Parenting** | 虎妈之外：理解中国式家庭的深层逻辑 |
| **Business Chinese-style** | 为什么中国企业这么"卷"？理解竞争哲学 |

#### Pillar 5: 🏙 Living China — 真实中国

**定位：** 打破刻板印象，展示多面的当代中国。

| 子分类 | 内容示例 |
|--------|---------|
| **City Portraits** | 一座城市的性格：成都为什么这么"安逸"？ |
| **Youth Culture** | 搭子文化、考公热、数字游民 —— 中国年轻人在想什么 |
| **Rural China** | 不是落后的代名词：乡村振兴中的新可能 |
| **Transport & Infra** | 高铁改变了什么？不只是速度，是时空观 |
| **Night Life** | 从夜市到 livehouse：中国的夜晚经济 |
| **Everyday Rituals** | 广场舞、遛弯、搓麻将 —— 日常生活中的文化密码 |

#### Pillar 6: 🚀 Future China — 科技与创新

**定位：** 展示中国的技术生态和创新逻辑。

| 子分类 | 内容示例 |
|--------|---------|
| **Tech Ecosystem** | 中国互联网和西方互联网为什么长成了两个物种？ |
| **Payment Revolution** | 从现金到无现金：移动支付如何重塑社会 |
| **EV & Green Tech** | 中国新能源车为什么这么便宜？供应链的秘密 |
| **Space & Science** | 嫦娥、天问、空间站 —— 中国航天的浪漫主义 |
| **Manufacturing** | "世界工厂"背后的隐形冠军 |
| **AI in China** | 中国的 AI 生态：不一样的打法 |

### 4.2 Content Formats

#### Format 1: Quick Bite（快知识）

- **频率:** 每日 1-2 篇
- **字数:** 200-500 words（英文）
- **制作成本:** 低（AI 辅助为主，人工审核）
- **类型:**
  - 🔤 **Word of the Day** — 一个有文化深度的中文词/成语/网络用语
  - 📸 **Visual China** — 一张图 + 文化解读
  - 🔥 **Trending Now** — 今天中国互联网在聊什么
  - 💬 **Did You Know** — 一个反直觉的文化冷知识

**Frontmatter Schema:**
```yaml
---
title: "躺平 (tǎng píng) — The Art of Lying Flat"
format: quick-bite
type: word-of-the-day  # word-of-the-day | visual | trending | did-you-know
pillar: digital-china
tags: [internet-slang, youth-culture, work-life]
date: 2026-03-10
chinese_term: 躺平
pinyin: tǎng píng
cover_image: ./images/tang-ping.jpg
summary: "Why millions of Chinese youth decided to opt out of the rat race"
reading_time: 2
---
```

#### Format 2: Deep Dive（深度解读）

- **频率:** 每周 2-3 篇
- **字数:** 1500-3000 words（英文）
- **制作成本:** 中（AI 翻译 + 人工深度编辑）
- **特点:**
  - 有明确的叙事弧线（hook → context → insight → takeaway）
  - 包含文化背景注释（cultural footnotes）
  - 引用原始中文内容并提供翻译
  - 适度的视觉辅助（插图、对比图、timeline）

**Frontmatter Schema:**
```yaml
---
title: "Why Chinese People Are Obsessed With Hot Water"
format: deep-dive
pillar: taste-life
tags: [food-culture, health, daily-life, tcm]
date: 2026-03-10
author: cnjianghu
sources:
  - title: "知乎：为什么中国人爱喝热水"
    url: "https://..."
    platform: zhihu
  - title: "B站：热水文化考"
    url: "https://..."
    platform: bilibili
cover_image: ./images/hot-water.jpg
summary: "It's not just tradition — it's a 2000-year philosophical stance on the relationship between body and nature"
reading_time: 10
related:
  - tcm-thinking-101
  - chinese-food-philosophy
series: null
---
```

#### Format 3: Series（系列专题）

- **频率:** 每月 1 个系列（5-8 篇）
- **字数:** 每篇 2000-4000 words
- **制作成本:** 高（深度研究 + 精心编排）
- **特点:**
  - 有系列总纲页（series landing page）
  - 各篇之间有叙事递进关系
  - 可以作为 "课程" 式的学习路径
  - 系列完结后可打包为电子书/PDF

**Frontmatter Schema:**
```yaml
---
title: "The Hidden Logic of Chinese Cities — Part 3: Chengdu"
format: series
pillar: living-china
series:
  name: "The Hidden Logic of Chinese Cities"
  slug: hidden-logic-chinese-cities
  part: 3
  total: 6
tags: [cities, chengdu, urban-culture, lifestyle]
date: 2026-03-10
cover_image: ./images/chengdu.jpg
summary: "Why Chengdu feels different from every other Chinese city — and what that teaches us about China's regional diversity"
reading_time: 15
---
```

#### Format 4: Glossary Entry（文化词典）

- **频率:** 持续积累
- **字数:** 300-800 words
- **制作成本:** 低
- **特点:**
  - 构建一个 living cultural glossary
  - 每个词条不只是翻译，而是文化解读
  - 可被其他文章引用（hover preview）
  - 按主题分类，可独立浏览

**Frontmatter Schema:**
```yaml
---
title: "江湖 (jiāng hú)"
format: glossary
category: philosophy  # philosophy | social | food | internet | arts | daily-life
chinese: 江湖
pinyin: jiāng hú
literal: "rivers and lakes"
short_definition: "The informal social world that operates outside official systems"
tags: [wuxia, social-dynamics, philosophy]
related_terms: [guanxi, mianzi, renqing]
appears_in: [wuxia-culture-explained, chinese-social-dynamics]
---
```

### 4.3 Content Taxonomy

#### Tags System（标签体系）

**Theme Tags（主题标签）:**
```
food-culture, tea, street-food, regional-cuisine,
internet-culture, memes, apps, social-media,
philosophy, taoism, confucianism, buddhism,
fashion, hanfu, guochao, design,
history, dynasties, mythology,
language, slang, idioms, calligraphy,
technology, innovation, manufacturing,
cities, travel, architecture,
youth-culture, education, family,
martial-arts, tcm, wellness,
gaming, anime, film, music, literature
```

**Era Tags（时代标签）:**
```
ancient (pre-221 BC), imperial (221 BC - 1912),
modern (1912-1949), contemporary (1949-present),
digital-age (2000-present)
```

**Difficulty Tags（深度标签）:**
```
beginner — 无需中国文化背景知识
intermediate — 需要一些基础了解
advanced — 适合已有深入兴趣的读者
```

---

## 5. Information Architecture

### 5.1 Sitemap

```
cnjianghu.com/
│
├── /                          # Homepage — 策展式首页
│
├── /explore/                  # Explore — 全部内容浏览
│   ├── /explore/digital-china/
│   ├── /explore/taste-life/
│   ├── /explore/aesthetic-china/
│   ├── /explore/mind-china/
│   ├── /explore/living-china/
│   └── /explore/future-china/
│
├── /read/[slug]/              # Article — 单篇文章阅读页
│
├── /series/                   # Series — 系列专题列表
│   └── /series/[series-slug]/ # Series Landing — 系列总纲页
│
├── /glossary/                 # Glossary — 文化词典
│   └── /glossary/[term]/      # Glossary Entry — 词条详情
│
├── /today/                    # Today — 每日快知识
│
├── /search/                   # Search — 全站搜索
│
├── /about/                    # About — 关于 cnjianghu
│
├── /rss.xml                   # RSS Feed
└── /sitemap.xml               # Sitemap for SEO
```

### 5.2 Homepage Structure

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo | Explore | Series | Glossary | Search     │
├─────────────────────────────────────────────────┤
│                                                  │
│  Hero Section                                    │
│  "Welcome to the Jianghu"                        │
│  动态展示当前 featured story                       │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Today's Quick Bites                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │Word │ │Trend│ │Meme │ │ DYK │               │
│  │of   │ │ ing │ │ of  │ │     │               │
│  │Day  │ │     │ │Week │ │     │               │
│  └─────┘ └─────┘ └─────┘ └─────┘               │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Latest Deep Dives                               │
│  ┌──────────────────┐  ┌──────────────────┐      │
│  │                  │  │                  │      │
│  │  Featured        │  │  Recent #1       │      │
│  │  Article         │  │                  │      │
│  │  (Large Card)    │  ├──────────────────┤      │
│  │                  │  │  Recent #2       │      │
│  │                  │  │                  │      │
│  └──────────────────┘  └──────────────────┘      │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Explore by Pillar                               │
│  六个 Pillar 的入口卡片，各展示最新一篇             │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Current Series                                  │
│  当前正在连载的系列专题 banner                      │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  From the Glossary                               │
│  随机展示 3-5 个有趣的文化词条                      │
│                                                  │
├─────────────────────────────────────────────────┤
│  Footer                                          │
│  About | RSS | Twitter | Discord | GitHub        │
└─────────────────────────────────────────────────┘
```

### 5.3 Article Page Structure

```
┌─────────────────────────────────────────────────┐
│  Breadcrumb: Home > Explore > Digital China      │
├─────────────────────────────────────────────────┤
│                                                  │
│  Cover Image (full-width)                        │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Title                                           │
│  Subtitle / Summary                              │
│  Meta: Date · Reading Time · Pillar · Tags       │
│                                                  │
├────────────────────┬────────────────────────────┤
│                    │                             │
│  Article Content   │  Sidebar (desktop only)     │
│                    │  ┌───────────────────┐      │
│  With inline:      │  │ Table of Contents │      │
│  - Cultural notes  │  │ (sticky scroll)   │      │
│  - Chinese terms   │  └───────────────────┘      │
│    with pinyin     │  ┌───────────────────┐      │
│  - Pull quotes     │  │ Related Articles  │      │
│  - Image galleries │  └───────────────────┘      │
│  - Glossary links  │  ┌───────────────────┐      │
│    (hover preview) │  │ Glossary Terms    │      │
│                    │  │ mentioned in this  │      │
│                    │  │ article            │      │
│                    │  └───────────────────┘      │
│                    │                             │
├────────────────────┴────────────────────────────┤
│                                                  │
│  Article Footer                                  │
│  Sources / References                            │
│  Share buttons                                   │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Related Reading                                 │
│  3-4 related articles cards                      │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Series Navigation (if part of series)           │
│  ← Previous | Series Overview | Next →           │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 6. Feature Specifications

### 6.1 Core Features（MVP）

#### F1: Content Reading Experience

**Priority:** P0 (Must Have)

- 高质量的长文阅读体验
- 响应式排版，移动端友好
- 中文术语内嵌显示：`关系 (guānxi)`格式
- 暗色/亮色模式切换
- 预计阅读时间显示
- 文章目录导航（TOC，桌面端 sticky sidebar）
- 文内 glossary 术语自动链接，hover 预览释义

#### F2: Content Discovery

**Priority:** P0 (Must Have)

- 按 Pillar 浏览
- 按 Tag 浏览
- 按 Format 筛选（Quick Bite / Deep Dive / Series）
- 全站搜索（支持英文 + 拼音 + 中文）
- 相关文章推荐（基于 tags 交集）

#### F3: Quick Bites Daily Feed

**Priority:** P0 (Must Have)

- `/today` 页面展示当日 Quick Bites
- 历史 Quick Bites 归档浏览
- 按类型筛选（Word / Visual / Trending / DYK）

#### F4: Cultural Glossary

**Priority:** P1 (Should Have)

- 独立的 glossary 浏览页
- 按分类浏览（philosophy / social / food / internet...）
- 字母排序 + 拼音排序
- 搜索功能
- 每个词条包含：中文、拼音、字面翻译、文化释义、使用场景、相关词条
- 被文章引用时可 hover preview

#### F5: Series Experience

**Priority:** P1 (Should Have)

- 系列 landing page，展示系列介绍 + 全部文章列表
- 阅读进度提示
- 上/下篇导航
- 系列完结标记

#### F6: RSS Feed

**Priority:** P1 (Should Have)

- 全站 RSS feed
- 按 Pillar 的分类 RSS feed
- 包含完整文章内容（非摘要）

#### F7: SEO Optimization

**Priority:** P0 (Must Have)

- 自动生成 OG images（含标题 + 中文元素）
- Structured data (JSON-LD) for articles
- 自动 sitemap
- Canonical URLs
- Meta description 自动生成

### 6.2 Enhanced Features（Post-MVP）

#### F8: Interactive Elements

**Priority:** P2 (Nice to Have)

- 汉字笔画动画（Word of the Day 配合使用）
- 中国地图交互（按城市/省份发现内容）
- Timeline 可视化（历史类内容）
- 食物味觉图谱（辣度/咸度/鲜度可视化）

#### F9: Newsletter

**Priority:** P2 (Nice to Have)

- 每周精选邮件 "This Week in the Jianghu"
- Buttondown 或 Resend 集成
- 订阅入口嵌入首页和文章页

#### F10: i18n — 多语言支持

**Priority:** P3 (Future)

- Phase 1: English only
- Phase 2: + 日语、韩语
- Phase 3: + 西班牙语、法语、阿拉伯语
- AI 翻译管线支持多语言输出

#### F11: Community（外部集成）

**Priority:** P3 (Future)

- Discord 社群（非自建，降低运维成本）
- 文章评论集成（Giscus — 基于 GitHub Discussions）
- 读者投稿通道

---

## 7. Content Pipeline

### 7.1 Pipeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT PIPELINE                          │
│                                                              │
│  ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌──────────┐  │
│  │  SCOUT  │──▶│ PROCESS  │──▶│ REVIEW  │──▶│ PUBLISH  │  │
│  │         │   │          │   │         │   │          │  │
│  │ Discover│   │ Translate│   │ Human   │   │ Deploy   │  │
│  │ & Curate│   │ & Format │   │ QA      │   │ & Share  │  │
│  └─────────┘   └──────────┘   └─────────┘   └──────────┘  │
│     AI+Human       AI            Human          Auto        │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Scout Phase（发现与采集）

**输入来源:**

| 来源 | 方式 | 频率 |
|------|------|------|
| Bilibili | API / 字幕抓取 / 热门话题监控 | Daily |
| 知乎 | 高赞回答 / 专栏文章 | Daily |
| 小红书 | 热门文化话题 | Daily |
| 微信公众号 | 订阅优质文化号 | Daily |
| 豆瓣 | 书评、影评、讨论 | Weekly |
| Twitter/X | #Chinamaxing 相关讨论 | Daily |
| Reddit | r/China, r/ChineseLanguage 等 | Daily |
| 个人收藏 | 你日常刷到的好内容 | Ongoing |

**Scout Agent 职责:**

1. 每日扫描以上来源
2. 按照内容质量评分（原创性、深度、趣味性、文化价值）
3. 输出候选内容列表（标题 + 链接 + 评分 + 推荐理由）
4. 保存到 `content/inbox/` 待审

### 7.3 Process Phase（加工处理）

**Translator Agent 职责:**

1. 将中文原内容翻译为英文
2. **不是直译**，是文化语境适配翻译：
   - 保留中文关键术语（附拼音和释义）
   - 必要时补充西方读者可能缺失的背景知识
   - 调整叙事结构使其符合英文阅读习惯
   - 将中国特有概念映射到西方读者可理解的类比
3. 标注需要人工确认的文化敏感点

**Editor Agent 职责:**

1. 将翻译内容格式化为 MDX
2. 自动生成 frontmatter metadata
3. 自动添加 glossary 术语链接
4. 生成 summary 和 SEO description
5. 推荐相关文章和标签
6. 输出到 `content/drafts/`

### 7.4 Review Phase（人工审核）

**你的职责（唯一的人工环节）:**

1. 在 VS Code / Obsidian 中审阅 drafts
2. 检查翻译质量和文化准确性
3. 调整措辞、补充个人见解
4. 确认分类和标签
5. 移动到 `content/published/` 并 git commit

**审核 Checklist:**
```markdown
- [ ] 翻译准确，无文化误读
- [ ] 中文术语拼音正确
- [ ] 叙事有趣，不像百科全书
- [ ] 不涉及政治敏感内容
- [ ] 图片版权合规
- [ ] Tags 和分类正确
- [ ] 相关文章链接有效
```

### 7.5 Publish Phase（自动发布）

```
git push → Vercel auto-deploy
                ├── Build Astro site
                ├── Generate OG images (Satori)
                ├── Generate sitemap
                └── Trigger post-deploy hooks:
                    ├── Ping search engines
                    ├── Post to Twitter/X
                    └── Update RSS feed
```

### 7.6 Content Directory Structure

```
content/
├── inbox/                      # Scout Agent 产出，待筛选
│   └── 2026-03-10-hot-water.md
├── drafts/                     # Editor Agent 产出，待审核
│   └── 2026-03-10-hot-water.mdx
├── published/                  # 已审核，准备发布
│   ├── quick-bites/
│   │   ├── word-of-the-day/
│   │   ├── visual-china/
│   │   ├── trending/
│   │   └── did-you-know/
│   ├── deep-dives/
│   ├── series/
│   │   └── hidden-logic-chinese-cities/
│   │       ├── _series.yaml    # 系列 metadata
│   │       ├── 01-beijing.mdx
│   │       ├── 02-shanghai.mdx
│   │       └── 03-chengdu.mdx
│   └── glossary/
│       ├── jianghu.mdx
│       ├── guanxi.mdx
│       └── neijuan.mdx
├── images/                     # 图片资源
└── data/
    ├── authors.yaml
    ├── pillars.yaml
    └── tags.yaml
```

---

## 8. Technical Architecture

### 8.1 Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Astro 5 | Content-first, zero JS by default, MDX native, Islands for interactivity |
| **Styling** | Tailwind CSS 4 | Utility-first, easy theming, responsive |
| **Interactive Islands** | React 19 | For glossary hover, search, interactive components |
| **Content** | MDX + Content Collections | Type-safe, git-based, no database needed |
| **Search** | Pagefind | Static site search, zero-config, multilingual |
| **OG Images** | @vercel/og (Satori) | Auto-generate social cards |
| **Deployment** | Vercel | Free tier, global CDN, auto-deploy from git |
| **Domain** | cnjianghu.com | Primary domain |
| **Analytics** | Plausible / Umami | Privacy-friendly, lightweight |
| **AI Pipeline** | Claude API (Opus/Sonnet) | Translation, curation, content processing |
| **Version Control** | GitHub | Public repo (open source 项目) |
| **Comments** | Giscus | Free, GitHub-based, markdown support |
| **Newsletter** | Buttondown (free tier) | Simple, markdown-native, RSS-to-email |

### 8.2 Project Structure

```
cnjianghu/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.mjs
│
├── public/
│   ├── fonts/                  # 中英文混排字体
│   ├── favicon.svg
│   └── og-default.png
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── ThemeToggle.tsx  # React Island
│   │   ├── content/
│   │   │   ├── ArticleCard.astro
│   │   │   ├── QuickBiteCard.astro
│   │   │   ├── SeriesCard.astro
│   │   │   ├── GlossaryPopover.tsx  # React Island
│   │   │   ├── ChineseTerm.astro
│   │   │   ├── CulturalNote.astro
│   │   │   ├── TableOfContents.tsx  # React Island
│   │   │   └── ReadingProgress.astro
│   │   ├── home/
│   │   │   ├── HeroSection.astro
│   │   │   ├── TodayBites.astro
│   │   │   ├── LatestDives.astro
│   │   │   ├── PillarGrid.astro
│   │   │   └── GlossaryPreview.astro
│   │   ├── search/
│   │   │   └── SearchWidget.tsx     # React Island
│   │   └── ui/
│   │       ├── Tag.astro
│   │       ├── Breadcrumb.astro
│   │       ├── ShareButtons.astro
│   │       └── PillarIcon.astro
│   │
│   ├── content/                 # Astro Content Collections
│   │   ├── config.ts            # Collection schemas (Zod)
│   │   ├── quick-bites/
│   │   ├── deep-dives/
│   │   ├── series/
│   │   └── glossary/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   └── GlossaryLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── explore/
│   │   │   ├── index.astro
│   │   │   └── [pillar].astro
│   │   ├── read/
│   │   │   └── [slug].astro
│   │   ├── series/
│   │   │   ├── index.astro
│   │   │   └── [series].astro
│   │   ├── glossary/
│   │   │   ├── index.astro
│   │   │   └── [term].astro
│   │   ├── today/
│   │   │   └── index.astro
│   │   ├── search.astro
│   │   ├── about.astro
│   │   ├── rss.xml.ts
│   │   ├── sitemap.xml.ts
│   │   └── og/[...slug].png.ts  # OG image generation
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── typography.css       # 中英文混排排版
│   │   └── prose.css            # 文章内容样式
│   │
│   └── utils/
│       ├── content.ts           # Content helper functions
│       ├── glossary.ts          # Glossary linking logic
│       └── reading-time.ts
│
├── scripts/                     # AI Pipeline Scripts
│   ├── scout/
│   │   ├── bilibili-scanner.ts
│   │   ├── zhihu-scanner.ts
│   │   └── trend-monitor.ts
│   ├── process/
│   │   ├── translator.ts       # Claude API translation
│   │   ├── formatter.ts        # MDX formatting
│   │   └── metadata-gen.ts     # Auto-generate frontmatter
│   └── publish/
│       ├── og-generator.ts
│       └── social-poster.ts
│
└── content/                     # 实际内容文件（可独立 repo）
    ├── inbox/
    ├── drafts/
    └── published/
```

### 8.3 Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| LCP | < 1.5s | Content site must load fast |
| FCP | < 0.8s | Static HTML first paint |
| CLS | < 0.05 | Stable layout, fonts preloaded |
| JS Bundle | < 50KB | Astro Islands, only interactive parts |
| Total Page | < 500KB | Excluding images |
| Lighthouse | > 95 | All categories |

### 8.4 Font Strategy

中英文混排需要精心选择字体：

```css
/* English: editorial feel */
--font-heading: 'Playfair Display', serif;
--font-body: 'Source Serif 4', 'Noto Serif SC', serif;

/* Chinese terms: clean display */
--font-chinese: 'Noto Serif SC', 'Source Han Serif CN', serif;

/* UI elements */
--font-ui: 'Inter', 'Noto Sans SC', sans-serif;

/* Code / pinyin */
--font-mono: 'JetBrains Mono', monospace;
```

---

## 9. Design Direction

### 9.1 Design Philosophy

**"东方意境，西方易读"**

不是做一个"中国风"网站（红色+龙+灯笼），而是用现代设计语言传达中国美学的底层精神：
- **留白** — generous whitespace，让内容呼吸
- **层次** — 清晰的信息层级，引导阅读节奏
- **含蓄** — 不用力过猛，让美感自然流淌
- **温度** — 不冷冰冰的极简，有人文的温暖

### 9.2 Visual References

| 参考对象 | 借鉴什么 |
|---------|---------|
| **Atlas Obscura** | 探索式的内容发现体验 |
| **The Pudding** | 数据可视化叙事 |
| **Monocle** | 编辑质感、排版品质 |
| **Wikipedia Cultural Pages** | 结构化知识组织 |
| **Apple Newsroom** | 干净、大气的内容展示 |
| **书格 (Shuge.org)** | 中国古籍美学的现代化表达 |

### 9.3 Color System

```
Primary Palette — 水墨灰
━━━━━━━━━━━━━━━━━━━━━━━━
ink-900:    #1a1a2e    主文字
ink-700:    #3d3d56    次要文字
ink-500:    #6b6b80    辅助文字
ink-300:    #b8b8c8    边框/分割线
ink-100:    #f0f0f5    背景
ink-50:     #fafafe    卡片背景

Accent — 朱砂红（克制使用）
━━━━━━━━━━━━━━━━━━━━━━━━
vermilion:  #c73e1d    主强调色（链接、CTA）
vermilion-light: #e8d5cf  淡色背景

Secondary Accents — 五色
━━━━━━━━━━━━━━━━━━━━━━━━
jade:       #2d6a4f    Pillar: Taste & Life
indigo:     #3d405b    Pillar: Mind China
gold:       #c9a227    Pillar: Aesthetic China
teal:       #1d7874    Pillar: Future China
sienna:     #8b5e3c    Pillar: Living China
azure:      #3a86c8    Pillar: Digital China

Dark Mode
━━━━━━━━━━━━━━━━━━━━━━━━
bg:         #0f0f17
surface:    #1a1a28
text:       #e8e8f0
```

### 9.4 Typography Scale

```
Display:    48px / 56px line-height  (Homepage hero)
H1:         36px / 44px              (Article title)
H2:         28px / 36px              (Section heading)
H3:         22px / 30px              (Subsection)
Body:       18px / 28px              (Article body — intentionally large for readability)
Small:      14px / 20px              (Meta info, tags)
Caption:    12px / 16px              (Image captions)

Chinese terms inline: same size as body, slightly heavier weight
Pinyin: 14px, above Chinese characters when annotated
```

### 9.5 Key UI Components

**Chinese Term Inline Component:**
```
In Chinese culture, 关系 (guānxi) is not simply "relationships"
                     ^^^^^^^^^^^^^^
                     hover 显示完整释义
                     中文粗体 + 拼音斜体
```

**Cultural Note Block:**
```
┌─ 📎 Cultural Context ──────────────────────────┐
│                                                 │
│  In Western culture, directness is valued.      │
│  In Chinese communication, what's NOT said      │
│  often matters more than what is.               │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Pillar Card:**
```
┌─────────────────────────────────┐
│  🌐                             │
│  Digital China                  │
│  中国互联网文化                   │
│                                 │
│  Decode the world's most        │
│  vibrant internet culture       │
│                                 │
│  42 articles →                  │
└─────────────────────────────────┘
```

---

## 10. SEO & Growth Strategy

### 10.1 SEO Strategy

**核心关键词集群:**

| Cluster | Target Keywords |
|---------|----------------|
| Chinese Culture | chinese culture explained, understanding china, china culture guide |
| Chinamaxing | chinamaxing, chinamaxxing, china trend |
| Chinese Food | chinese food culture, why chinese drink hot water, chinese tea culture |
| Chinese Internet | chinese internet culture, chinese memes explained, chinese social media |
| Chinese Philosophy | chinese philosophy basics, taoism explained, confucianism modern |
| Chinese Slang | chinese slang, chinese internet slang, chinese words meaning |
| Chinese Aesthetics | chinese aesthetic, new chinese style, guochao explained |

**Long-tail SEO（长尾内容策略）:**

每篇 Deep Dive 瞄准一个长尾搜索意图：
- "why do chinese people [行为]"
- "what does [中文词] mean in chinese culture"
- "[文化现象] explained"
- "chinese [topic] vs western [topic]"

**Technical SEO:**
- Static HTML = fast indexing
- JSON-LD structured data for every article
- Auto-generated OG images with bilingual text
- Internal linking strategy through glossary cross-references

### 10.2 Distribution Channels

| Channel | Strategy | Content Type |
|---------|----------|-------------|
| **Twitter/X** | Daily cultural bites, thread深度解读 | Quick Bites + 长线程 |
| **Reddit** | r/China, r/ChineseLanguage, r/Chinamaxing, r/InternetIsBeautiful | Deep Dives |
| **YouTube** (future) | 视频版 Deep Dives | Series |
| **Discord** | 社群讨论，读者反馈 | Community |
| **Newsletter** | 每周精选 "This Week in the Jianghu" | Curated digest |
| **Hacker News** | 技术/创新相关文章 | Future China 类 |
| **RSS** | 订阅用户 | All content |

### 10.3 Growth Flywheel

```
高质量内容
    │
    ▼
Google 长尾搜索流量 ──▶ 读者发现 cnjianghu
    │                        │
    ▼                        ▼
社交媒体分享 ◀───────── 觉得有价值，分享给朋友
    │
    ▼
更多反向链接 & 品牌认知
    │
    ▼
SEO 排名提升 ──▶ 更多搜索流量（回到起点）
```

---

## 11. MVP Scope & Roadmap

### 11.1 MVP Definition（6 周目标）

**MVP 的核心假设：**
> 如果我们提供高质量、有深度、有文化语境的英文中国文化内容，Chinamaxing 群体会主动发现、阅读并分享。

**MVP 包含：**

| Feature | Details |
|---------|---------|
| ✅ 首页 | Hero + Quick Bites + Latest Deep Dives + Pillar Grid |
| ✅ 文章阅读页 | Full reading experience with Chinese term annotations |
| ✅ Explore 页 | 按 Pillar 浏览 |
| ✅ Quick Bites | Word of the Day + Trending Now |
| ✅ 3 个 Pillar | Digital China + Taste & Life + Aesthetic China |
| ✅ 15-20 篇内容 | 10 Quick Bites + 8 Deep Dives + 2 Glossary entries |
| ✅ 基础 SEO | OG images, sitemap, structured data |
| ✅ RSS Feed | Full content feed |
| ✅ Dark/Light mode | Theme toggle |
| ✅ 响应式 | Mobile-first responsive design |
| ✅ Pagefind Search | Static search |
| ❌ Series | Post-MVP |
| ❌ Newsletter | Post-MVP |
| ❌ Comments (Giscus) | Post-MVP |
| ❌ Glossary standalone page | Post-MVP（但 glossary 数据和 hover 功能在 MVP 中） |
| ❌ Interactive maps/viz | Post-MVP |

### 11.2 Roadmap

```
Phase 1: Foundation (Week 1-2)
══════════════════════════════
├── Day 1-2: Project setup
│   ├── Astro + Tailwind + MDX init
│   ├── Content collection schemas
│   ├── Base layout + typography
│   └── Deploy empty shell to Vercel
│
├── Day 3-5: Core pages
│   ├── Homepage layout
│   ├── Article page layout
│   ├── Explore page
│   ├── Chinese term component
│   └── Cultural note component
│
├── Day 6-8: Polish
│   ├── Dark/light mode
│   ├── Responsive testing
│   ├── Navigation & breadcrumbs
│   └── OG image generation
│
└── Day 9-10: Content pipeline
    ├── Claude API translation script
    ├── MDX formatter script
    └── Frontmatter generator

Phase 2: Content (Week 3-4)
══════════════════════════════
├── Write/curate 10 Quick Bites
├── Write/curate 5-8 Deep Dives
├── Create 5-10 Glossary entries
├── Review and polish all content
├── Internal linking pass
└── SEO optimization pass

Phase 3: Launch (Week 5-6)
══════════════════════════════
├── Pagefind search integration
├── RSS feed setup
├── Final design polish
├── Performance audit (Lighthouse > 95)
├── Domain setup (cnjianghu.com)
├── Soft launch: share on Reddit & Twitter
├── Collect initial feedback
└── Iterate based on feedback
```

### 11.3 Post-MVP Roadmap

```
Phase 4: Growth (Month 2-3)
├── Series feature
├── Newsletter (Buttondown)
├── Giscus comments
├── Glossary standalone page
├── Social media automation
├── 扩展到 6 个 Pillar
└── Content volume: 50+ articles

Phase 5: Experience (Month 4-6)
├── Interactive China map
├── 汉字笔画动画
├── Timeline visualizations
├── Reading progress & bookmarks
├── i18n: Japanese support
└── Content volume: 100+ articles

Phase 6: Community (Month 6+)
├── Discord community
├── Guest contributors
├── User-submitted questions → articles
├── Monthly "Jianghu Digest"
├── Potential podcast/video
└── Content volume: 200+ articles
```

---

## 12. Success Metrics

### 12.1 MVP Success Criteria（6 周后评估）

| Metric | Target | Measurement |
|--------|--------|-------------|
| Content Published | ≥ 15 articles | Count |
| Lighthouse Score | ≥ 95 all categories | Lighthouse |
| Organic Search Impressions | ≥ 1,000/month | Google Search Console |
| Unique Visitors | ≥ 500/month | Plausible/Umami |
| Avg. Reading Time | ≥ 3 minutes | Analytics |
| Reddit/Twitter Shares | ≥ 10 organic mentions | Manual tracking |

### 12.2 6-Month Goals

| Metric | Target |
|--------|--------|
| Content Volume | 100+ articles |
| Monthly Visitors | 10,000+ |
| Newsletter Subscribers | 500+ |
| Discord Members | 200+ |
| Google Top 10 Keywords | 20+ |
| Avg. Session Duration | 5+ minutes |
| Returning Visitor Rate | 30%+ |

### 12.3 North Star Metric

**"Articles shared"** — 文章被读者主动分享的次数。

这个指标综合反映了内容质量、用户价值和增长潜力。如果读者愿意把一篇文章分享给朋友，说明我们做到了。

---

## 13. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| **内容质量不够** — AI 翻译生硬，缺乏人文温度 | High | Medium | 每篇人工审核，建立翻译风格指南，逐步积累范例库 |
| **文化敏感性** — 无意触碰政治/争议话题 | High | Medium | 制定内容红线清单，避免时政内容，专注文化/生活 |
| **版权问题** — 引用中国平台内容的版权 | Medium | Medium | 标注来源，做转述而非搬运，原创占比 > 60% |
| **一个人精力有限** — 内容产出不够稳定 | High | High | AI 管线最大化自动化，先保证 Quick Bites 日更，Deep Dive 可降频 |
| **SEO 见效慢** — 新站 Google 排名需要时间 | Medium | High | 同步在 Reddit/Twitter 分发，不依赖单一渠道 |
| **Chinamaxing 热度下降** | Medium | Low | 平台定位不绑死"Chinamaxing"标签，而是做永续的文化内容 |
| **技术债积累** | Low | Medium | Astro 静态架构本身就简单，保持 tech stack 精简 |

### 13.1 Content Red Lines（内容红线）

**绝对不做的内容：**
- 时政评论 / 政治立场表达
- 中外对比中贬低任何一方
- 猎奇化/异国化中国文化（"Weird Chinese things"）
- 未经验证的历史/文化声称
- 侵犯个人隐私的内容

**始终坚持的原则：**
- 尊重事实，不美化也不丑化
- 承认文化多样性（中国不是铁板一块）
- 提供语境而非判断
- 引用来源，标注出处

---

## Appendix A: Content Style Guide（简版）

### Voice & Tone

- **Like a knowledgeable friend**, not a textbook or a propaganda pamphlet
- **Conversational but informed** — 用轻松的语气讲有深度的内容
- **Curious and respectful** — 永远带着好奇心而非评判
- **Use "you" and "we"** — 拉近距离

### Writing Conventions

- Chinese terms always in format: `中文 (pīnyīn)` on first mention
- Subsequent mentions can use either English or Chinese
- Cultural context boxes for concepts that need background
- Pull quotes for impactful Chinese sayings/proverbs
- Source attribution at article end
- Reading time always displayed

### Example Opening (Good vs. Bad)

**Bad:**
> "China is a country with a 5,000-year history and rich cultural traditions. In this article, we will explore the concept of guanxi."

**Good:**
> "You're at a business dinner in Shanghai. Your host pours your tea before his own, angles the teapot spout away from you, and taps the table twice when you pour his. None of this is random. Welcome to the invisible architecture of 关系 (guānxi)."

---

## Appendix B: Glossary MVP Seed List

优先创建以下 glossary 词条（高频 + 高搜索量）:

| Term | Category | Priority |
|------|----------|----------|
| 江湖 jiānghú | Philosophy | P0 |
| 关系 guānxi | Social | P0 |
| 面子 miànzi | Social | P0 |
| 内卷 nèijuǎn | Internet | P0 |
| 躺平 tǎng píng | Internet | P0 |
| 国潮 guócháo | Aesthetics | P0 |
| 气 qì | Philosophy | P1 |
| 道 dào | Philosophy | P1 |
| 缘分 yuánfèn | Philosophy | P1 |
| 干杯 gānbēi | Daily Life | P1 |
| 996 | Internet | P1 |
| 佛系 fóxì | Internet | P1 |
| 打工人 dǎgōngrén | Internet | P1 |
| 人情 rénqíng | Social | P1 |
| 功夫 gōngfu | Culture | P1 |
| 风水 fēngshuǐ | Philosophy | P2 |
| 阴阳 yīnyáng | Philosophy | P2 |
| 孝 xiào | Social | P2 |
| 意境 yìjìng | Aesthetics | P2 |
| 留白 liúbái | Aesthetics | P2 |

---

## Appendix C: First 10 Article Ideas

| # | Title | Format | Pillar | Est. Search Volume |
|---|-------|--------|--------|-------------------|
| 1 | "Why Chinese People Are Obsessed With Hot Water" | Deep Dive | Taste & Life | High |
| 2 | "内卷 (nèijuǎn): The Word That Defined a Generation" | Deep Dive | Digital China | High |
| 3 | "Chinese Internet Is a Parallel Universe — Here's Your Map" | Deep Dive | Digital China | Medium |
| 4 | "What 关系 (Guānxi) Really Means (It's Not Corruption)" | Deep Dive | Mind China | High |
| 5 | "The Hidden Rules of a Chinese Dinner Table" | Deep Dive | Taste & Life | Medium |
| 6 | "Black Myth Wukong: A Cultural Decoder Ring" | Deep Dive | Aesthetic China | High |
| 7 | "Why Every Chinese App Is a Super App" | Deep Dive | Digital China | Medium |
| 8 | "The Hanfu Movement: Not Cosplay, But Cultural Reclamation" | Deep Dive | Aesthetic China | Medium |
| 9 | "Chengdu: The City That Refuses to Hustle" | Deep Dive | Living China | Medium |
| 10 | "What Your Chinese Friend Means When They Say 'Have You Eaten?'" | Quick Bite → Deep Dive | Living China | High |

---

*Last updated: 2026-03-10*
*Document owner: Puyue Wang*
*Status: Draft — Ready for review*
