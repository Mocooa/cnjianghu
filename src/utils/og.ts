import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { getPillar } from './pillars';

const WIDTH = 1200;
const HEIGHT = 630;

const PLAYFAIR_FONT = fileURLToPath(new URL('../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2', import.meta.url));
const SOURCE_SERIF_FONT = fileURLToPath(new URL('../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-standard-normal.woff2', import.meta.url));

type ArticleOgOptions = {
  title: string;
  summary: string;
  pillar: string;
  subtitle?: string;
  date?: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(word.slice(0, maxChars));
      current = word.slice(maxChars);
    }

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  const consumed = lines.join(' ').trim();
  const remaining = consumed ? text.slice(consumed.length).trimStart() : text;
  const finalLine = current || remaining;

  if (finalLine && lines.length < maxLines) {
    lines.push(finalLine);
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines);
  }

  const originalWords = text.trim().split(/\s+/).filter(Boolean).join(' ');
  const joined = lines.join(' ').replace(/\s+/g, ' ').trim();

  if (joined.length < originalWords.length && lines.length > 0) {
    const lastIndex = lines.length - 1;
    const safeLast = lines[lastIndex].slice(0, Math.max(0, maxChars - 1)).trimEnd();
    lines[lastIndex] = `${safeLast}…`;
  }

  return lines;
}

function formatOgDate(date?: string): string {
  if (!date) return 'Deep Dive';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function renderTitleLines(lines: string[], startY: number): string {
  return lines
    .map((line, index) => {
      const y = startY + index * 86;
      return `<text x="86" y="${y}" font-family="'Playfair Display Variable'" font-size="64" font-weight="700" fill="#1a1a2e">${escapeXml(line)}</text>`;
    })
    .join('');
}

function renderBodyLines(lines: string[], startY: number): string {
  return lines
    .map((line, index) => {
      const y = startY + index * 36;
      return `<text x="86" y="${y}" font-family="'Source Serif 4 Variable'" font-size="28" fill="#52526b">${escapeXml(line)}</text>`;
    })
    .join('');
}

function baseSvg(content: string): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fafafe" />
          <stop offset="55%" stop-color="#f3efe9" />
          <stop offset="100%" stop-color="#efe4dd" />
        </linearGradient>
        <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.94)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.72)" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
      <circle cx="1060" cy="110" r="160" fill="rgba(199,62,29,0.10)" />
      <circle cx="990" cy="530" r="220" fill="rgba(61,64,91,0.08)" />
      <circle cx="180" cy="540" r="180" fill="rgba(45,106,79,0.10)" />
      <rect x="38" y="38" width="${WIDTH - 76}" height="${HEIGHT - 76}" rx="28" fill="url(#panel)" stroke="rgba(26,26,46,0.10)" />
      <rect x="62" y="62" width="170" height="38" rx="19" fill="#1a1a2e" />
      <text x="88" y="88" font-family="'Source Serif 4 Variable'" font-size="18" fill="#fafafe">cnjianghu</text>
      ${content}
    </svg>
  `;
}

function getPillarAccent(slug: string): { name: string; chinese: string; color: string; icon: string } {
  const pillar = getPillar(slug);
  return {
    name: pillar?.name ?? 'Deep Dive',
    chinese: pillar?.chinese ?? '江湖',
    color: pillar?.color
      ? ({
          azure: '#3a86c8',
          jade: '#2d6a4f',
          gold: '#c9a227',
          indigo: '#3d405b',
          sienna: '#8b5e3c',
          teal: '#1d7874',
        }[pillar.color] ?? '#c73e1d')
      : '#c73e1d',
    icon: pillar?.icon ?? '✦',
  };
}

export function renderSiteOgImage(): Buffer {
  const titleLines = ['Welcome to the Jianghu'];
  const bodyLines = [
    'Curated stories, decoded internet culture, and insider perspectives',
    'for readers going deeper into Chinese culture.',
  ];

  const svg = baseSvg(`
    <text x="86" y="168" font-family="'Source Serif 4 Variable'" font-size="24" fill="#c73e1d">The insider&apos;s guide to Chinese culture</text>
    ${renderTitleLines(titleLines, 276)}
    ${renderBodyLines(bodyLines, 390)}
    <g transform="translate(86 470)">
      <rect width="176" height="42" rx="21" fill="rgba(199,62,29,0.14)" />
      <text x="22" y="27" font-family="'Source Serif 4 Variable'" font-size="18" fill="#9e3216">Digital China</text>
      <rect x="194" width="166" height="42" rx="21" fill="rgba(45,106,79,0.14)" />
      <text x="216" y="27" font-family="'Source Serif 4 Variable'" font-size="18" fill="#2d6a4f">Taste &amp; Life</text>
      <rect x="378" width="188" height="42" rx="21" fill="rgba(61,64,91,0.14)" />
      <text x="400" y="27" font-family="'Source Serif 4 Variable'" font-size="18" fill="#3d405b">Mind China</text>
    </g>
    <text x="86" y="564" font-family="serif" font-size="66" fill="rgba(26,26,46,0.13)">江湖</text>
    <text x="930" y="556" font-family="'Source Serif 4 Variable'" font-size="22" fill="#6b6b80">cnjianghu.vercel.app</text>
  `);

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    font: {
      loadSystemFonts: true,
      fontFiles: [PLAYFAIR_FONT, SOURCE_SERIF_FONT],
      serifFamily: 'Source Serif 4 Variable',
      sansSerifFamily: 'Source Serif 4 Variable',
      defaultFontFamily: 'Source Serif 4 Variable',
    },
  });

  return resvg.render().asPng();
}

export function renderArticleOgImage(options: ArticleOgOptions): Buffer {
  const pillar = getPillarAccent(options.pillar);
  const titleLines = wrapText(options.title, 28, 3);
  const summarySource = options.subtitle ?? options.summary;
  const bodyLines = wrapText(summarySource, 58, 3);
  const dateLabel = formatOgDate(options.date);

  const svg = baseSvg(`
    <rect x="918" y="64" width="218" height="42" rx="21" fill="${pillar.color}" fill-opacity="0.14" />
    <text x="944" y="90" font-family="'Source Serif 4 Variable'" font-size="18" fill="${pillar.color}">${escapeXml(pillar.name)}</text>
    <text x="86" y="168" font-family="'Source Serif 4 Variable'" font-size="24" fill="#c73e1d">Deep Dive</text>
    ${renderTitleLines(titleLines, 252)}
    ${renderBodyLines(bodyLines, 462)}
    <line x1="86" y1="536" x2="1114" y2="536" stroke="rgba(26,26,46,0.12)" />
    <text x="86" y="576" font-family="'Source Serif 4 Variable'" font-size="22" fill="#6b6b80">${escapeXml(dateLabel)}</text>
    <text x="230" y="576" font-family="'Source Serif 4 Variable'" font-size="22" fill="#6b6b80">cnjianghu.vercel.app</text>
    <text x="976" y="578" font-family="serif" font-size="38" fill="rgba(26,26,46,0.20)">${escapeXml(pillar.chinese)}</text>
  `);

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    font: {
      loadSystemFonts: true,
      fontFiles: [PLAYFAIR_FONT, SOURCE_SERIF_FONT],
      serifFamily: 'Source Serif 4 Variable',
      sansSerifFamily: 'Source Serif 4 Variable',
      defaultFontFamily: 'Source Serif 4 Variable',
    },
  });

  return resvg.render().asPng();
}
