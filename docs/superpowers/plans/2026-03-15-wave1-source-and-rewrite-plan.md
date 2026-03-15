# Wave 1 信源调用 & 标题/收尾重写规划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan.

**Goal:** 为 12 篇 Wave 1 deep dives 补充专业信源，重写标题和收尾，消除"Why"单一模式。

---

## 一、信源分级体系

### Tier 1 — 官方数据 & 学术研究（最高可信度）
| 来源 | 类型 | 适用领域 |
|------|------|---------|
| 国家统计局 (stats.gov.cn) | 政府统计 | 城市、人口、经济 |
| CNNIC 中国互联网络信息中心 | 官方报告 | 互联网用户、移动支付 |
| 中国人民银行 (PBOC) | 央行报告 | 支付数据、数字人民币 |
| 教育部 / 高考数据 | 政府数据 | 高考人数、录取率 |
| 腾讯年报 / 财报 | 上市公司披露 | 微信 MAU、小程序数据 |
| 中国电影发行放映协会 / 猫眼 | 行业数据 | 票房 |
| Steam / Valve | 平台数据 | 游戏销量 |

### Tier 2 — 行业研究 & 权威媒体（高可信度）
| 来源 | 类型 | 适用领域 |
|------|------|---------|
| McKinsey China / 麦肯锡中国 | 咨询报告 | 消费、数字化 |
| 艾瑞咨询 (iResearch) | 行业研究 | 移动互联网、外卖、支付 |
| QuestMobile | 移动数据 | App 使用时长、渗透率 |
| 第一财经 / 财新 | 财经媒体 | 经济、科技、政策 |
| Sixth Tone | 英文深度报道 | 社会、文化、日常生活 |
| The Economist / FT | 国际财经 | 中国经济、科技竞争 |
| Reuters / Bloomberg | 通讯社 | 事件报道、市场数据 |
| Rest of World | 国际科技媒体 | 非西方科技生态 |

### Tier 3 — 深度报道 & 专题内容（中高可信度）
| 来源 | 类型 | 适用领域 |
|------|------|---------|
| 知乎 (Zhihu) | 社区问答 | 文化解释、个人经验 |
| 澎湃新闻 (The Paper) | 深度报道 | 社会、教育、城市 |
| 36氪 (36Kr) | 科技媒体 | 创业、AI、出海 |
| 晚点 LatePost | 深度科技 | DeepSeek、AI 行业 |
| New York Times | 国际媒体 | 中国社会文化专题 |
| BBC / The Guardian | 国际媒体 | 文化现象、社会趋势 |
| Wired | 科技文化 | AI、游戏、互联网 |
| Eater / Bon Appétit | 美食媒体 | 中国饮食文化 |

### Tier 4 — 一手平台数据 & 用户声音（补充验证）
| 来源 | 类型 | 适用领域 |
|------|------|---------|
| 微信指数 / 百度指数 | 搜索趋势 | 热词变化、关注度 |
| 小红书 / B站 | 用户平台 | 消费趋势、年轻人文化 |
| 微博热搜 | 社交趋势 | 舆论事件、文化讨论 |

---

## 二、信源使用原则

1. **每篇至少 3-5 个信源**，覆盖至少 2 个 Tier
2. **关键数据必须有出处** — 用户数、金额、百分比等不能无源引用
3. **中外平衡** — 每篇至少 1 个中文信源 + 1 个英文信源
4. **信源多样** — 不能全是知乎，不能全是 NYT
5. **信源格式**：frontmatter `sources` 数组 + 正文内以脚注形式标注关键数据点
6. **正文内引用方式**：在关键数据/论断后用括号标注来源简称，如 `(CNNIC, 2024)` 或 `(腾讯年报, 2024)`

---

## 三、逐篇信源调用规划

### 1. 热水 (why-chinese-love-hot-water)
**新标题：** Hot Water, Warm Body, Careful Life
**需要支撑的论断：**
- TCM 的身体温度理论历史渊源
- 建国后"喝开水"运动的公卫背景
- 保温杯市场规模 / 普及率

| 信源 | 用途 | Tier |
|------|------|------|
| 《中国饮水卫生运动史》相关学术论文 | 爱国卫生运动与喝开水推广 | T1 |
| Sixth Tone: "Why Do Chinese People Drink Hot Water?" | 文化解释的英文视角 | T2 |
| 知乎: 中国人为什么爱喝热水 | 社区讨论、多元视角 | T3 |
| 欧睿/天猫: 保温杯市场数据 | 保温杯消费规模 | T2 |

---

### 2. 早餐 (why-chinese-breakfast-is-hot-fast-savory)
**新标题：** Gone by 9 AM — The Invisible Infrastructure of Chinese Breakfast
**需要支撑的论断：**
- 中国早餐平均消费金额
- 早餐店数量 / 消失速度
- 区域早餐种类差异

| 信源 | 用途 | Tier |
|------|------|------|
| 美团/饿了么: 早餐消费报告 | 早餐客单价、品类数据 | T2 |
| 澎湃新闻: 城市早餐文化专题 | 区域差异、消失与留存 | T3 |
| Eater / Serious Eats: Chinese breakfast guide | 英文美食媒体的视角 | T3 |
| 知乎: 各地早餐特色对比 | 区域多样性、个人体验 | T3 |

---

### 3. 微信 (why-wechat-feels-bigger-than-messaging)
**新标题：** One App to Run a Life
**需要支撑的论断：**
- 微信 MAU（月活用户数）
- 小程序数量和日活
- 微信支付市场份额
- 超级应用概念的起源

| 信源 | 用途 | Tier |
|------|------|------|
| 腾讯 2024 年报 | MAU、小程序 DAU、支付数据 | T1 |
| CNNIC 第53次中国互联网发展统计报告 | 移动互联网用户、即时通信渗透率 | T1 |
| The Economist: "WeChat — China's super-app" | 超级应用概念的国际解读 | T2 |
| Rest of World: WeChat coverage | 非西方视角的科技报道 | T2 |
| QuestMobile 年度报告 | App 使用时长数据 | T2 |

---

### 4. 贴纸 (why-chinese-chats-use-so-many-stickers)
**新标题：** Half the Messages Are Pictures — Inside China's Sticker Language
**需要支撑的论断：**
- 微信表情包每日发送量
- 表情包产业规模
- 代际差异的数据支撑

| 信源 | 用途 | Tier |
|------|------|------|
| 微信年度数据报告 | 表情包发送量、最热门表情 | T1 |
| 艾瑞咨询: 中国表情包行业报告 | 产业规模、用户画像 | T2 |
| 知乎: 为什么中国人聊天离不开表情包 | 文化解释、个人观察 | T3 |
| BBC: "The art of Chinese chat stickers" | 英文文化报道 | T3 |

---

### 5. 城市 (why-chinese-cities-feel-so-distinct)
**新标题：** A Continent of City-States Sharing One App
**需要支撑的论断：**
- 城市层级分类标准
- 各城市 GDP、人口差异
- 区域文化差异的学术研究

| 信源 | 用途 | Tier |
|------|------|------|
| 国家统计局: 城市统计年鉴 | GDP、人口、消费数据 | T1 |
| 第一财经·新一线城市研究所 | 城市商业魅力排行、层级定义 | T2 |
| 澎湃新闻: 城市性格系列 | 区域文化差异报道 | T3 |
| The Guardian: "China's mega-cities" | 国际视角下的城市多样性 | T3 |

---

### 6. 公共休闲 (why-public-leisure-in-china-is-so-visible)
**新标题：** After 7 PM, the City Belongs to Everyone
**需要支撑的论断：**
- 广场舞参与人数
- 中国城市公园面积 / 人均绿地
- 老年人社交行为数据

| 信源 | 用途 | Tier |
|------|------|------|
| 国家体育总局: 全民健身调查 | 广场舞参与人数（估计 1 亿+） | T1 |
| 住建部: 城市绿地统计 | 人均公园面积 | T1 |
| Sixth Tone: "The Battle Over China's Public Squares" | 广场舞噪音争议的深度报道 | T2 |
| 知乎: 中国公园文化 | 公园使用场景描述 | T3 |

---

### 7. 神话 (why-chinese-mythology-feels-everywhere-again)
**新标题：** Ne Zha, Wukong, and the Debut That Took 3,000 Years
**需要支撑的论断：**
- 哪吒2 票房数据
- 黑神话悟空销量
- 原神营收
- 国潮市场规模

| 信源 | 用途 | Tier |
|------|------|------|
| 猫眼电影 / Box Office Mojo | 哪吒2 全球票房 | T1 |
| Steam / VGChartz | 黑神话悟空销量数据 | T1 |
| Sensor Tower | 原神全球营收 | T2 |
| 36氪: 国潮消费趋势 | 国潮品牌与神话 IP | T3 |
| Wired: "How Chinese mythology conquered gaming" | 英文科技文化报道 | T3 |

---

### 8. 幻想 (why-chinese-fantasy-looks-different)
**新标题：** Flowing Robes, Cloud Palaces — A Fantasy Tradition You Haven't Seen
**需要支撑的论断：**
- 仙侠网文市场规模
- 中国仙侠剧海外播放数据
- 原神 Liyue 地区的设计引用

| 信源 | 用途 | Tier |
|------|------|------|
| 阅文集团年报 | 网文用户数、仙侠品类占比 | T1 |
| Netflix / Viki 播放数据 | 仙侠剧海外热度 | T2 |
| Polygon / IGN: Genshin Liyue analysis | 游戏中的中国美学分析 | T3 |
| 知乎: 仙侠和西方奇幻的本质区别 | 体裁对比讨论 | T3 |

---

### 9. 面子 (why-saving-face-explains-more-than-politeness)
**新标题：** The Invisible Debt at Every Chinese Dinner Table
**需要支撑的论断：**
- 面子 / 人情的社会学研究
- 中国商务沟通中的间接性数据
- 请客买单行为的经济学分析

| 信源 | 用途 | Tier |
|------|------|------|
| Hu Hsien-chin (1944): "The Chinese Concept of Face" | 面子研究的经典文献 | T1 |
| Hwang Kwang-kuo: "Face and Favor" (学术论文) | 面子与人情的理论框架 | T1 |
| Harvard Business Review: "Doing business in China" | 面子在商业中的应用 | T2 |
| Sixth Tone: 面子相关社会报道 | 当代中国的面子实践 | T2 |

---

### 10. 教育 (why-chinese-parenting-feels-intense)
**新标题：** The Mother at 11 PM — Love, Fear, and One Exam
**需要支撑的论断：**
- 高考报名人数（2024: ~1340万）
- 学区房价格溢价
- 双减政策影响
- 课外辅导产业规模

| 信源 | 用途 | Tier |
|------|------|------|
| 教育部: 高考数据公报 | 报名人数、录取率 | T1 |
| 新华社/中新网: 双减政策报道 | 政策背景和影响 | T1 |
| Financial Times: "China's education crackdown" | 双减的国际解读 | T2 |
| 澎湃新闻: 学区房专题 | 学区房价格数据 | T3 |
| NYT: "Inside China's Cutthroat School System" | 教育压力的深度报道 | T3 |

---

### 11. AI (why-china-ai-story-feels-different)
**新标题：** What Happens When You Build AI Without Enough GPUs
**需要支撑的论断：**
- DeepSeek-R1 性能基准对比
- Nvidia 市值单日跌幅
- 中国 AI 开源模型数量
- 美国芯片出口管制时间线

| 信源 | 用途 | Tier |
|------|------|------|
| DeepSeek 技术报告 (arXiv) | 模型架构和性能数据 | T1 |
| Bloomberg: Nvidia 市值报道 | 市值变动数据 | T1 |
| 晚点 LatePost: DeepSeek 深度报道 | DeepSeek 创始人背景和策略 | T2 |
| The Information: China AI landscape | 中国 AI 生态全景 | T2 |
| Reuters: US chip export controls | 芯片出口管制政策 | T2 |

---

### 12. 支付 (why-paying-in-china-feels-frictionless)
**新标题：** Three Seconds, One QR Code — How China Skipped Credit Cards
**需要支撑的论断：**
- 移动支付渗透率
- 微信支付/支付宝市场份额
- 数字人民币试点规模
- 年轻人无现金使用率

| 信源 | 用途 | Tier |
|------|------|------|
| PBOC: 支付体系运行报告 | 移动支付交易规模 | T1 |
| CNNIC: 互联网发展报告 | 移动支付用户数 | T1 |
| McKinsey: China digital payments | 支付生态分析 | T2 |
| FT: "China's cashless revolution" | 国际视角的支付变革 | T2 |
| 知乎: 年轻人用过现金吗 | 用户体验和代际差异 | T3 |

---

## 四、信源整合进正文的格式规范

### frontmatter sources 格式
```yaml
sources:
  - title: "腾讯2024年度报告"
    url: "https://www.tencent.com/zh-cn/investors.html"
    platform: 腾讯投资者关系
  - title: "The WeChat Economy"
    url: "https://www.economist.com/..."
    platform: The Economist
```

### 正文内引用
在关键数据点后用行内标注：
```
微信月活用户超过 13 亿（腾讯年报, 2024），小程序日活超过 5 亿。
```

### 文末尾注区
在 `---` 分割线和 Related 链接之后，添加：
```markdown
---

*Related: [术语1](/glossary/slug1) · [术语2](/glossary/slug2)*

**Sources:**
1. 腾讯2024年度报告 — [tencent.com](url)
2. CNNIC 第53次中国互联网发展统计报告 — [cnnic.net.cn](url)
3. "The WeChat Economy" — The Economist, 2024
```

---

## 五、执行计划

| 步骤 | 内容 | 产出 |
|------|------|------|
| 1 | 用 agent-reach skill 检索/验证每篇信源的真实 URL | 信源 URL 清单 |
| 2 | 批量重写 12 篇标题 + subtitle | frontmatter 更新 |
| 3 | 批量重写 12 篇收尾段落 | 收尾多样化 |
| 4 | 逐篇补充正文内数据引用 + sources 数组 | 信源整合 |
| 5 | Build 验证 + Git commit + Deploy | 上线 |
