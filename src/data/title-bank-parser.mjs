import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const specsDir = path.resolve(process.cwd(), 'docs/superpowers/specs');

const titleBankFilePattern = /^\d{4}-\d{2}-\d{2}-(.+)-title-bank-v1\.md$/;
const knownTags = new Set([
  'Launch first',
  'Evergreen',
  'High shareability',
  'Needs glossary support',
]);
const knownFormats = new Set([
  'Quick Bites',
  'Misread / Actually',
  'Scene Decoder',
  'Deep Dives',
  'Glossary-led',
]);

export function parseTitleBankMarkdown(markdown, { pillar, sourceFile }) {
  const items = [];
  const lines = markdown.split(/\r?\n/);
  let currentDossier = null;
  let currentFormat = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const dossierMatch = line.match(/^##\s+\d+\.\s+(.+)$/);
    if (dossierMatch) {
      currentDossier = dossierMatch[1].trim();
      currentFormat = null;
      continue;
    }

    if (line.startsWith('## ')) {
      currentDossier = null;
      currentFormat = null;
      continue;
    }

    const formatMatch = line.match(/^###\s+(.+)$/);
    if (formatMatch) {
      const nextFormat = formatMatch[1].trim();
      currentFormat = knownFormats.has(nextFormat) ? nextFormat : null;
      continue;
    }

    if (!line.startsWith('- ') || !currentDossier || !currentFormat) {
      continue;
    }

    const { title, tags } = splitTitleAndTags(line.slice(2).trim());

    items.push({
      pillar,
      dossier: currentDossier,
      format: currentFormat,
      title,
      tags,
      sourceFile,
    });
  }

  return items;
}

export function loadTitleBankItems() {
  const files = readdirSync(specsDir)
    .filter(file => titleBankFilePattern.test(file))
    .sort();

  const items = [];

  for (const file of files) {
    const match = file.match(titleBankFilePattern);
    if (!match) {
      continue;
    }

    const pillar = match[1];
    const filePath = path.join(specsDir, file);
    const markdown = readFileSync(filePath, 'utf8');

    items.push(
      ...parseTitleBankMarkdown(markdown, {
        pillar,
        sourceFile: file,
      }),
    );
  }

  return items;
}

function splitTitleAndTags(value) {
  let remainder = value;
  const tags = [];

  while (true) {
    const match = remainder.match(/\s+`([^`]+)`$/);
    if (!match || !knownTags.has(match[1])) {
      break;
    }

    tags.unshift(match[1]);
    remainder = remainder.slice(0, -match[0].length);
  }

  return {
    title: remainder.trim(),
    tags,
  };
}
