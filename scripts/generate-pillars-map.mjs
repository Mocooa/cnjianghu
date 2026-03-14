import fs from 'node:fs/promises';
import path from 'node:path';

const outputSvg = path.resolve('/Users/puyuewang/cnjianghu/2026-03-12-pillars-map-bilingual.svg');

const width = 3600;
const height = 3000;
const margin = 90;
const gapX = 54;
const gapY = 54;
const cols = 3;
const cardWidth = Math.floor((width - margin * 2 - gapX * (cols - 1)) / cols);
const cardHeight = 1180;
const titleHeight = 210;
const contentTop = titleHeight + 30;

const pillars = [
  {
    title: 'Digital China',
    zh: '数字中国',
    role: 'Online behavior, apps, and social codes',
    color: '#6aa9ff',
    bg: '#132642',
    items: [
      ['Super-App Life', '超级应用生活'],
      ['Platform Ecologies', '平台生态'],
      ['Xiaohongshu Internet', '小红书互联网'],
      ['Douyin Short Video', '抖音短视频'],
      ['Bilibili Worlds', 'B站文化世界'],
      ['WeChat Infrastructure', '微信基础设施'],
      ['Meme Universes', '梗与表情包宇宙'],
      ['Reaction Image Culture', '反应图文化'],
      ['Internet Slang', '网络流行语'],
      ['Bullet Comments', '弹幕文化'],
      ['Livestream Worlds', '直播世界'],
      ['Shopping Entertainment', '购物娱乐化'],
      ['Fandom Labor', '饭圈劳动'],
      ['Group Chat Intimacy', '群聊亲密关系'],
      ['Creator Culture', '创作者文化'],
      ['Online Reputation', '线上名声与面子'],
      ['Viral Rituals', '病毒式网络仪式'],
      ['Digital Nostalgia', '数字怀旧'],
      ['Cross-Border Apps', '跨境平台相遇'],
      ['Coded Expression', '编码表达'],
      ['Comment-Section Emotion', '评论区公共情绪'],
      ['Algorithmic Life', '算法生活'],
      ['Mini-Program Life', '小程序生活'],
      ['Internet Justice', '互联网正义'],
      ['Humor and Self-Mockery', '网络幽默与自嘲'],
    ],
  },
  {
    title: 'Taste & Life',
    zh: '饮食与生活',
    role: 'Body logic, rituals, food, and domestic comfort',
    color: '#7fdc9a',
    bg: '#162c23',
    items: [
      ['Hot Water Logic', '热水与温度逻辑'],
      ['TCM Wellness', '中式日常养生'],
      ['Food as Medicine', '药食同源'],
      ['Tea Worlds', '茶世界'],
      ['Breakfast China', '中国早餐'],
      ['Congee and Soup', '粥与汤体系'],
      ['Street Food Ecology', '街头小吃生态'],
      ['Banquet Codes', '饭局规则'],
      ['Hosting and Hospitality', '待客与款待'],
      ['Home Cooking Memory', '家常味觉记忆'],
      ['Regional Taste Systems', '地域口味体系'],
      ['Festival Foods', '节庆食物'],
      ['Snack Culture', '零食文化'],
      ['Kitchen Objects', '厨房器物'],
      ['Thermos and Lunchbox', '保温杯与饭盒'],
      ['Delivery Life', '外卖生活'],
      ['Late-Night Eating', '夜宵文化'],
      ['Drinking Rituals', '饮酒仪式'],
      ['Fruit and Desserts', '水果与甜品'],
      ['Seasonal Nourishment', '顺时滋养'],
      ['Sleep and Rest Habits', '睡眠与休息习惯'],
      ['Indoor Comfort Culture', '室内舒适文化'],
      ['Qigong and Gentle Movement', '气功与温和运动'],
      ['Domestic Order', '家居秩序'],
      ['Practical Thrift', '实用与节俭'],
    ],
  },
  {
    title: 'Aesthetic China',
    zh: '审美中国',
    role: 'Myth, style, craft, and the visual logic of beauty',
    color: '#f3bf6b',
    bg: '#342618',
    items: [
      ['Mythology Reborn', '神话重生'],
      ['Journey to the West', '西游再生'],
      ['Ne Zha Worlds', '哪吒宇宙'],
      ['Gods and Demons', '神妖仙想象'],
      ['Chinese Fantasy Visuals', '中式奇幻视觉'],
      ['Guochao', '国潮'],
      ['Hanfu Dress Worlds', '汉服世界'],
      ['Tradition in Daily Wear', '传统服饰回归'],
      ['Pop Mart Worlds', '泡泡玛特世界'],
      ['Cute Economies', '可爱经济'],
      ['Game Aesthetics', '游戏审美'],
      ['Donghua Visual Culture', '国漫视觉文化'],
      ['Architecture Philosophy', '建筑空间哲学'],
      ['Gardens and Worldmaking', '园林与造境'],
      ['Brush and Ink Thinking', '笔墨思维'],
      ['Chinese Color Systems', '中国色彩体系'],
      ['Craft and Material Beauty', '工艺与材料美学'],
      ['Ceramic, Lacquer, Jade', '瓷漆玉器'],
      ['Opera and Costume', '戏曲与戏服'],
      ['Urban Chinese Mood', '城市摄影气质'],
      ['Minimal vs Ornate', '极简与繁饰'],
      ['Festival Visuality', '节庆视觉'],
      ['Gift and Packaging Beauty', '包装送礼美学'],
      ['Beauty Standards', '审美标准'],
      ['Soft Luxury Taste', '轻奢与质感'],
    ],
  },
  {
    title: 'Mind China',
    zh: '中国思维',
    role: 'Values, worldview, social reasoning, and life scripts',
    color: '#b291ff',
    bg: '#261c3d',
    items: [
      ['Confucian Residues', '儒家残留'],
      ['Daoist Sensibilities', '道家感受力'],
      ['Buddhist Daily Language', '佛教日常语言'],
      ['Balance Thinking', '平衡思维'],
      ['Fate and Timing', '命运与时机'],
      ['Face and Favor', '面子与人情'],
      ['Reciprocity and Duty', '回报与责任'],
      ['Shame and Dignity', '羞耻与体面'],
      ['Family Duty', '家庭责任'],
      ['Parenting Logic', '育儿逻辑'],
      ['Exams and Merit', '考试与 merit'],
      ['Neijuan / Tangping / Bailan', '内卷躺平摆烂'],
      ['Effort and Endurance', '努力与忍耐'],
      ['Strategic Pragmatism', '策略性实用主义'],
      ['Conflict Avoidance', '避免冲突'],
      ['Belonging and Self-Presentation', '归属与自我呈现'],
      ['TCM as Worldview', '中医作为观看方式'],
      ['Body-Mind Holism', '身心整体观'],
      ['Gender in Chinese Terms', '中国语境下的性别气质'],
      ['Romance and Restraint', '爱情与克制'],
      ['Virtue and Being Decent', '德性与做人'],
      ['Success and Security', '成功与安全感'],
      ['Generational Drift', '代际价值漂移'],
      ['Long-Game Thinking', '长期主义'],
      ['Practical Belief', '实用信念与迷信'],
    ],
  },
  {
    title: 'Living China',
    zh: '真实中国',
    role: 'Cities, ordinary rhythms, and how contemporary life is lived',
    color: '#f08d83',
    bg: '#351f24',
    items: [
      ['City Personalities', '城市性格'],
      ['Tier-System Lives', '层级城市生活'],
      ['Citywalk and Strolling', 'Citywalk 与散步'],
      ['Neighborhood Rhythms', '街区节律'],
      ['Apartment Interiors', '居住空间与公寓生活'],
      ['Public Leisure Rituals', '公共休闲仪式'],
      ['Park Life and Square Dancing', '公园与广场舞'],
      ['Night Markets', '夜市与夜间经济'],
      ['Convenience Infrastructure', '便利型城市设施'],
      ['Rail and Commuting Life', '铁路与通勤生活'],
      ['Youth Life Scripts', '青年人生脚本'],
      ['Dating and Marriage Pressure', '恋爱婚姻压力'],
      ['Companions and Dazi', '搭子与同伴关系'],
      ['Office Life', '办公室生活'],
      ['Migration and Aspiration', '流动与向上愿望'],
      ['County-Town Aspiration', '县城抱负'],
      ['Rural Change', '乡村变化'],
      ['Return-Home Culture', '返乡文化'],
      ['Aging and Care', '老龄化与照护'],
      ['Childrearing Households', '代际育儿共居'],
      ['Pets and Plants', '宠物与植物'],
      ['Weather and Urban Mood', '天气与城市情绪'],
      ['Public Etiquette', '公共礼仪'],
      ['Markets and Malls', '市场与商场'],
      ['Order as Lived Experience', '秩序作为生活体验'],
    ],
  },
  {
    title: 'Future China',
    zh: '未来中国',
    role: 'Tech, infrastructure, and everyday future-facing systems',
    color: '#5fd6d3',
    bg: '#162d31',
    items: [
      ['China AI Ecosystem', '中国 AI 生态'],
      ['AI Agents in Daily Life', '日常 AI Agent'],
      ['Cashless Life', '无现金生活'],
      ['Platform Commerce', '平台商业'],
      ['Logistics and Instant Delivery', '物流与即时配送'],
      ['EV Life', '新能源汽车生活'],
      ['Battery Supply Chains', '电池与供应链'],
      ['Manufacturing as Culture', '制造业作为文化'],
      ['Factory Intelligence', '工厂智能化'],
      ['Robotics Imagination', '机器人想象'],
      ['Hardware Ecosystems', '硬件生态'],
      ['Smart City Habits', '智慧城市习惯'],
      ['Surveillance and Trust', '监控与数字信任'],
      ['Green Transition', '绿色转型'],
      ['Solar and Energy Systems', '光伏与能源体系'],
      ['Space and Science Ambition', '航天与科学雄心'],
      ['Rail and Infrastructure Modernity', '高铁与基础设施现代性'],
      ['Tech Brands Abroad', '科技品牌出海'],
      ['Cross-Border E-commerce', '跨境电商'],
      ['Biotech and Future Medicine', '生物科技与未来医疗'],
      ['EdTech Futures', '教育科技未来'],
      ['Urban Automation', '城市自动化'],
      ['Future of Work', '未来工作'],
      ['National Progress Narrative', '国家进步叙事'],
      ['Tech Confidence and Anxiety', '技术自信与焦虑'],
    ],
  },
];

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function renderTextBlock(lines, x, y, lineHeight, className) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`)
    .join('\n');
}

function renderItem(item, x, y) {
  const [en, zh] = item;
  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="8" cy="10" r="4" fill="currentColor" opacity="0.85" />
      <text x="22" y="12" class="item-en">${escapeXml(en)}</text>
      <text x="22" y="36" class="item-zh">${escapeXml(zh)}</text>
    </g>
  `;
}

function renderPillar(pillar, index) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = margin + col * (cardWidth + gapX);
  const y = contentTop + row * (cardHeight + gapY);
  const roleLines = wrapText(pillar.role, 40);
  const listTop = 260;
  const col1 = pillar.items.slice(0, Math.ceil(pillar.items.length / 2));
  const col2 = pillar.items.slice(Math.ceil(pillar.items.length / 2));
  const itemGap = 78;
  const colWidth = Math.floor((cardWidth - 120) / 2);

  const itemsSvg = [
    ...col1.map((item, itemIndex) => renderItem(item, 44, listTop + itemIndex * itemGap)),
    ...col2.map((item, itemIndex) => renderItem(item, 44 + colWidth, listTop + itemIndex * itemGap)),
  ].join('\n');

  return `
    <g transform="translate(${x}, ${y})" style="color:${pillar.color}">
      <rect x="0" y="0" width="${cardWidth}" height="${cardHeight}" rx="34" fill="${pillar.bg}" stroke="${pillar.color}" stroke-width="2" />
      <rect x="0" y="0" width="${cardWidth}" height="12" rx="34" fill="${pillar.color}" opacity="0.95" />
      <text x="40" y="72" class="pillar-title">${escapeXml(pillar.title)}</text>
      <text x="40" y="118" class="pillar-zh">${escapeXml(pillar.zh)}</text>
      ${renderTextBlock(roleLines, 40, 168, 26, 'pillar-role')}
      <line x1="40" y1="208" x2="${cardWidth - 40}" y2="208" stroke="${pillar.color}" stroke-width="1.5" opacity="0.55" />
      <text x="40" y="242" class="section-label">Dossier Worlds / 母题世界</text>
      ${itemsSvg}
    </g>
  `;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0b1220" />
      <stop offset="1" stop-color="#111827" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#020617" flood-opacity="0.28" />
    </filter>
    <style>
      .title { font: 700 60px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #f8fafc; letter-spacing: 0.5px; }
      .subtitle { font: 400 28px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #cbd5e1; }
      .kicker { font: 600 18px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #94a3b8; letter-spacing: 2.5px; }
      .pillar-title { font: 700 34px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #f8fafc; }
      .pillar-zh { font: 500 28px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #dbeafe; opacity: 0.94; }
      .pillar-role { font: 400 18px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #d1d5db; }
      .section-label { font: 600 16px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #e5e7eb; letter-spacing: 1.4px; }
      .item-en { font: 600 17px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #f8fafc; }
      .item-zh { font: 400 15px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #cbd5e1; }
      .footer { font: 400 18px 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; fill: #94a3b8; }
    </style>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect x="42" y="42" width="${width - 84}" height="${height - 84}" rx="42" stroke="#334155" stroke-width="1.5" opacity="0.65" />

  <g transform="translate(${margin}, 88)">
    <text x="0" y="0" class="kicker">ARCHIVE INDEX · 双语内容架构图</text>
    <text x="0" y="80" class="title">cnjianghu Pillars and Dossier Worlds</text>
    <text x="0" y="136" class="subtitle">cnjianghu 六大内容支柱与母题世界</text>
    <text x="0" y="182" class="subtitle">First-layer map only: pillar to dossier. Built for long-term editorial growth, with English-internet curiosity as the audience lens.</text>
  </g>

  <g filter="url(#shadow)">
    ${pillars.map(renderPillar).join('\n')}
  </g>

  <g transform="translate(${margin}, ${height - 64})">
    <text x="0" y="0" class="footer">Scope: first-layer architecture only · 第一层架构总览</text>
    <text x="${width - margin * 2 - 620}" y="0" class="footer">Generated from the current pillar tree in /Users/puyuewang/cnjianghu</text>
  </g>
</svg>
`;

await fs.writeFile(outputSvg, svg, 'utf8');
console.log(outputSvg);
