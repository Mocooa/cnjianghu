const pillarMeta = {
  'digital-china': { slug: 'digital-china', name: 'Digital China', chinese: '数字中国' },
  'taste-life': { slug: 'taste-life', name: 'Taste & Life', chinese: '饮食生活' },
  'aesthetic-china': { slug: 'aesthetic-china', name: 'Aesthetic China', chinese: '审美创造' },
  'mind-china': { slug: 'mind-china', name: 'Mind China', chinese: '思维智慧' },
  'living-china': { slug: 'living-china', name: 'Living China', chinese: '真实中国' },
  'future-china': { slug: 'future-china', name: 'Future China', chinese: '科技未来' },
};

const evidenceLabels = {
  'language-led': 'Language-led',
  'worldview-led': 'Worldview-led',
  'platform-led': 'Platform-led',
  'data-led': 'Data-led',
};

function sortByPinyin(entries) {
  return [...entries].sort((a, b) => a.data.pinyin.localeCompare(b.data.pinyin));
}

function isConceptNote(entry) {
  return entry.data.kind === 'concept-note';
}

export function groupPublishedGlossaryEntries(entries) {
  const terms = [];
  const conceptNotes = [];

  for (const entry of entries) {
    if (isConceptNote(entry)) {
      conceptNotes.push(entry);
      continue;
    }

    terms.push(entry);
  }

  return {
    terms: sortByPinyin(terms),
    conceptNotes: sortByPinyin(conceptNotes),
  };
}

export function entryIsConceptNote(entry) {
  return isConceptNote(entry);
}

export function getGlossaryContext(entry) {
  return {
    pillar: pillarMeta[entry.data.pillar],
    dossier: entry.data.dossier,
  };
}

export function formatEvidenceType(evidenceType) {
  return evidenceLabels[evidenceType] ?? evidenceType;
}
