export const pillars = [
  {
    slug: 'digital-china',
    title: 'Digital China',
    zh: '数字中国',
    role: 'Online behavior, apps, and social codes',
    dossiers: [
      ['super-app-life', 'Super-App Life', '超级应用生活'],
      ['platform-ecologies', 'Platform Ecologies', '平台生态'],
      ['xiaohongshu-internet', 'Xiaohongshu Internet', '小红书互联网'],
      ['douyin-short-video', 'Douyin Short Video', '抖音短视频'],
      ['bilibili-worlds', 'Bilibili Worlds', 'B站文化世界'],
      ['wechat-infrastructure', 'WeChat Infrastructure', '微信基础设施'],
      ['meme-universes', 'Meme Universes', '梗与表情包宇宙'],
      ['reaction-image-culture', 'Reaction Image Culture', '反应图文化'],
      ['internet-slang', 'Internet Slang', '网络流行语'],
      ['bullet-comments', 'Bullet Comments', '弹幕文化'],
      ['livestream-worlds', 'Livestream Worlds', '直播世界'],
      ['shopping-entertainment', 'Shopping Entertainment', '购物娱乐化'],
      ['fandom-labor', 'Fandom Labor', '饭圈劳动'],
      ['group-chat-intimacy', 'Group Chat Intimacy', '群聊亲密关系'],
      ['creator-culture', 'Creator Culture', '创作者文化'],
      ['online-reputation', 'Online Reputation', '线上名声与面子'],
      ['viral-rituals', 'Viral Rituals', '病毒式网络仪式'],
      ['digital-nostalgia', 'Digital Nostalgia', '数字怀旧'],
      ['cross-border-apps', 'Cross-Border Apps', '跨境平台相遇'],
      ['coded-expression', 'Coded Expression', '编码表达'],
      ['comment-section-emotion', 'Comment-Section Emotion', '评论区公共情绪'],
      ['algorithmic-life', 'Algorithmic Life', '算法生活'],
      ['mini-program-life', 'Mini-Program Life', '小程序生活'],
      ['internet-justice', 'Internet Justice', '互联网正义'],
      ['humor-and-self-mockery', 'Humor and Self-Mockery', '网络幽默与自嘲'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
  {
    slug: 'taste-life',
    title: 'Taste & Life',
    zh: '饮食与生活',
    role: 'Body logic, rituals, food, and domestic comfort',
    dossiers: [
      ['hot-water-logic', 'Hot Water Logic', '热水与温度逻辑'],
      ['tcm-wellness', 'TCM Wellness', '中式日常养生'],
      ['food-as-medicine', 'Food as Medicine', '药食同源'],
      ['tea-worlds', 'Tea Worlds', '茶世界'],
      ['breakfast-china', 'Breakfast China', '中国早餐'],
      ['congee-and-soup', 'Congee and Soup', '粥与汤体系'],
      ['street-food-ecology', 'Street Food Ecology', '街头小吃生态'],
      ['banquet-codes', 'Banquet Codes', '饭局规则'],
      ['hosting-and-hospitality', 'Hosting and Hospitality', '待客与款待'],
      ['home-cooking-memory', 'Home Cooking Memory', '家常味觉记忆'],
      ['regional-taste-systems', 'Regional Taste Systems', '地域口味体系'],
      ['festival-foods', 'Festival Foods', '节庆食物'],
      ['snack-culture', 'Snack Culture', '零食文化'],
      ['kitchen-objects', 'Kitchen Objects', '厨房器物'],
      ['thermos-and-lunchbox', 'Thermos and Lunchbox', '保温杯与饭盒'],
      ['delivery-life', 'Delivery Life', '外卖生活'],
      ['late-night-eating', 'Late-Night Eating', '夜宵文化'],
      ['drinking-rituals', 'Drinking Rituals', '饮酒仪式'],
      ['fruit-and-desserts', 'Fruit and Desserts', '水果与甜品'],
      ['seasonal-nourishment', 'Seasonal Nourishment', '顺时滋养'],
      ['sleep-and-rest-habits', 'Sleep and Rest Habits', '睡眠与休息习惯'],
      ['indoor-comfort-culture', 'Indoor Comfort Culture', '室内舒适文化'],
      ['qigong-and-gentle-movement', 'Qigong and Gentle Movement', '气功与温和运动'],
      ['domestic-order', 'Domestic Order', '家居秩序'],
      ['practical-thrift', 'Practical Thrift', '实用与节俭'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
  {
    slug: 'aesthetic-china',
    title: 'Aesthetic China',
    zh: '审美中国',
    role: 'Myth, style, craft, and the visual logic of beauty',
    dossiers: [
      ['mythology-reborn', 'Mythology Reborn', '神话重生'],
      ['journey-to-the-west', 'Journey to the West', '西游再生'],
      ['ne-zha-worlds', 'Ne Zha Worlds', '哪吒宇宙'],
      ['gods-and-demons', 'Gods and Demons', '神妖仙想象'],
      ['chinese-fantasy-visuals', 'Chinese Fantasy Visuals', '中式奇幻视觉'],
      ['guochao', 'Guochao', '国潮'],
      ['hanfu-dress-worlds', 'Hanfu Dress Worlds', '汉服世界'],
      ['tradition-in-daily-wear', 'Tradition in Daily Wear', '传统服饰回归'],
      ['pop-mart-worlds', 'Pop Mart Worlds', '泡泡玛特世界'],
      ['cute-economies', 'Cute Economies', '可爱经济'],
      ['game-aesthetics', 'Game Aesthetics', '游戏审美'],
      ['donghua-visual-culture', 'Donghua Visual Culture', '国漫视觉文化'],
      ['architecture-philosophy', 'Architecture Philosophy', '建筑空间哲学'],
      ['gardens-and-worldmaking', 'Gardens and Worldmaking', '园林与造境'],
      ['brush-and-ink-thinking', 'Brush and Ink Thinking', '笔墨思维'],
      ['chinese-color-systems', 'Chinese Color Systems', '中国色彩体系'],
      ['craft-and-material-beauty', 'Craft and Material Beauty', '工艺与材料美学'],
      ['ceramic-lacquer-jade', 'Ceramic, Lacquer, Jade', '瓷漆玉器'],
      ['opera-and-costume', 'Opera and Costume', '戏曲与戏服'],
      ['urban-chinese-mood', 'Urban Chinese Mood', '城市摄影气质'],
      ['minimal-vs-ornate', 'Minimal vs Ornate', '极简与繁饰'],
      ['festival-visuality', 'Festival Visuality', '节庆视觉'],
      ['gift-and-packaging-beauty', 'Gift and Packaging Beauty', '包装送礼美学'],
      ['beauty-standards', 'Beauty Standards', '审美标准'],
      ['soft-luxury-taste', 'Soft Luxury Taste', '轻奢与质感'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
  {
    slug: 'mind-china',
    title: 'Mind China',
    zh: '中国思维',
    role: 'Values, worldview, social reasoning, and life scripts',
    dossiers: [
      ['confucian-residues', 'Confucian Residues', '儒家残留'],
      ['daoist-sensibilities', 'Daoist Sensibilities', '道家感受力'],
      ['buddhist-daily-language', 'Buddhist Daily Language', '佛教日常语言'],
      ['balance-thinking', 'Balance Thinking', '平衡思维'],
      ['fate-and-timing', 'Fate and Timing', '命运与时机'],
      ['face-and-favor', 'Face and Favor', '面子与人情'],
      ['reciprocity-and-duty', 'Reciprocity and Duty', '回报与责任'],
      ['shame-and-dignity', 'Shame and Dignity', '羞耻与体面'],
      ['family-duty', 'Family Duty', '家庭责任'],
      ['parenting-logic', 'Parenting Logic', '育儿逻辑'],
      ['exams-and-merit', 'Exams and Merit', '考试与 merit'],
      ['neijuan-tangping-bailan', 'Neijuan / Tangping / Bailan', '内卷躺平摆烂'],
      ['effort-and-endurance', 'Effort and Endurance', '努力与忍耐'],
      ['strategic-pragmatism', 'Strategic Pragmatism', '策略性实用主义'],
      ['conflict-avoidance', 'Conflict Avoidance', '避免冲突'],
      ['belonging-and-self-presentation', 'Belonging and Self-Presentation', '归属与自我呈现'],
      ['tcm-as-worldview', 'TCM as Worldview', '中医作为观看方式'],
      ['body-mind-holism', 'Body-Mind Holism', '身心整体观'],
      ['gender-in-chinese-terms', 'Gender in Chinese Terms', '中国语境下的性别气质'],
      ['romance-and-restraint', 'Romance and Restraint', '爱情与克制'],
      ['virtue-and-being-decent', 'Virtue and Being Decent', '德性与做人'],
      ['success-and-security', 'Success and Security', '成功与安全感'],
      ['generational-drift', 'Generational Drift', '代际价值漂移'],
      ['long-game-thinking', 'Long-Game Thinking', '长期主义'],
      ['practical-belief', 'Practical Belief', '实用信念与迷信'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
  {
    slug: 'living-china',
    title: 'Living China',
    zh: '真实中国',
    role: 'Cities, ordinary rhythms, and how contemporary life is lived',
    dossiers: [
      ['city-personalities', 'City Personalities', '城市性格'],
      ['tier-system-lives', 'Tier-System Lives', '层级城市生活'],
      ['citywalk-and-strolling', 'Citywalk and Strolling', 'Citywalk 与散步'],
      ['neighborhood-rhythms', 'Neighborhood Rhythms', '街区节律'],
      ['apartment-interiors', 'Apartment Interiors', '居住空间与公寓生活'],
      ['public-leisure-rituals', 'Public Leisure Rituals', '公共休闲仪式'],
      ['park-life-and-square-dancing', 'Park Life and Square Dancing', '公园与广场舞'],
      ['night-markets', 'Night Markets', '夜市与夜间经济'],
      ['convenience-infrastructure', 'Convenience Infrastructure', '便利型城市设施'],
      ['rail-and-commuting-life', 'Rail and Commuting Life', '铁路与通勤生活'],
      ['youth-life-scripts', 'Youth Life Scripts', '青年人生脚本'],
      ['dating-and-marriage-pressure', 'Dating and Marriage Pressure', '恋爱婚姻压力'],
      ['companions-and-dazi', 'Companions and Dazi', '搭子与同伴关系'],
      ['office-life', 'Office Life', '办公室生活'],
      ['migration-and-aspiration', 'Migration and Aspiration', '流动与向上愿望'],
      ['county-town-aspiration', 'County-Town Aspiration', '县城抱负'],
      ['rural-change', 'Rural Change', '乡村变化'],
      ['return-home-culture', 'Return-Home Culture', '返乡文化'],
      ['aging-and-care', 'Aging and Care', '老龄化与照护'],
      ['childrearing-households', 'Childrearing Households', '代际育儿共居'],
      ['pets-and-plants', 'Pets and Plants', '宠物与植物'],
      ['weather-and-urban-mood', 'Weather and Urban Mood', '天气与城市情绪'],
      ['public-etiquette', 'Public Etiquette', '公共礼仪'],
      ['markets-and-malls', 'Markets and Malls', '市场与商场'],
      ['order-as-lived-experience', 'Order as Lived Experience', '秩序作为生活体验'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
  {
    slug: 'future-china',
    title: 'Future China',
    zh: '未来中国',
    role: 'Tech, infrastructure, and everyday future-facing systems',
    dossiers: [
      ['china-ai-ecosystem', 'China AI Ecosystem', '中国 AI 生态'],
      ['ai-agents-in-daily-life', 'AI Agents in Daily Life', '日常 AI Agent'],
      ['cashless-life', 'Cashless Life', '无现金生活'],
      ['platform-commerce', 'Platform Commerce', '平台商业'],
      ['logistics-and-instant-delivery', 'Logistics and Instant Delivery', '物流与即时配送'],
      ['ev-life', 'EV Life', '新能源汽车生活'],
      ['battery-supply-chains', 'Battery Supply Chains', '电池与供应链'],
      ['manufacturing-as-culture', 'Manufacturing as Culture', '制造业作为文化'],
      ['factory-intelligence', 'Factory Intelligence', '工厂智能化'],
      ['robotics-imagination', 'Robotics Imagination', '机器人想象'],
      ['hardware-ecosystems', 'Hardware Ecosystems', '硬件生态'],
      ['smart-city-habits', 'Smart City Habits', '智慧城市习惯'],
      ['surveillance-and-trust', 'Surveillance and Trust', '监控与数字信任'],
      ['green-transition', 'Green Transition', '绿色转型'],
      ['solar-and-energy-systems', 'Solar and Energy Systems', '光伏与能源体系'],
      ['space-and-science-ambition', 'Space and Science Ambition', '航天与科学雄心'],
      ['rail-and-infrastructure-modernity', 'Rail and Infrastructure Modernity', '高铁与基础设施现代性'],
      ['tech-brands-abroad', 'Tech Brands Abroad', '科技品牌出海'],
      ['cross-border-e-commerce', 'Cross-Border E-commerce', '跨境电商'],
      ['biotech-and-future-medicine', 'Biotech and Future Medicine', '生物科技与未来医疗'],
      ['edtech-futures', 'EdTech Futures', '教育科技未来'],
      ['urban-automation', 'Urban Automation', '城市自动化'],
      ['future-of-work', 'Future of Work', '未来工作'],
      ['national-progress-narrative', 'National Progress Narrative', '国家进步叙事'],
      ['tech-confidence-and-anxiety', 'Tech Confidence and Anxiety', '技术自信与焦虑'],
    ].map(([slug, title, zh]) => ({ slug, title, zh })),
  },
];

export function createInitialReviews(sourcePillars = pillars) {
  const entries = {};

  for (const pillar of sourcePillars) {
    for (const dossier of pillar.dossiers) {
      entries[reviewKey(pillar.slug, dossier.slug)] = {
        decision: '',
        note: '',
        suggestion: '',
      };
    }
  }

  return entries;
}

export function summarizeReviews(sourcePillars = pillars, reviews = {}) {
  let total = 0;
  let keep = 0;
  let remove = 0;

  for (const pillar of sourcePillars) {
    for (const dossier of pillar.dossiers) {
      total += 1;
      const record = reviews[reviewKey(pillar.slug, dossier.slug)];
      if (record?.decision === 'keep') {
        keep += 1;
      } else if (record?.decision === 'delete') {
        remove += 1;
      }
    }
  }

  return {
    total,
    keep,
    delete: remove,
    pending: total - keep - remove,
  };
}

export function buildMarkdownExport(sourcePillars = pillars, reviews = {}) {
  const lines = ['# Pillar Dossier Review', ''];

  for (const pillar of sourcePillars) {
    lines.push(`## ${pillar.title} | ${pillar.zh}`);
    lines.push('');

    for (const dossier of pillar.dossiers) {
      const record = reviews[reviewKey(pillar.slug, dossier.slug)];
      if (!record?.decision) {
        continue;
      }

      lines.push(`- ${dossier.title} | ${dossier.zh} — ${record.decision}`);
      if (record.note) {
        lines.push(`  Note: ${record.note}`);
      }
      if (record.suggestion) {
        lines.push(`  Suggestion: ${record.suggestion}`);
      }
    }

    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

export function reviewKey(pillarSlug, dossierSlug) {
  return `${pillarSlug}:${dossierSlug}`;
}
