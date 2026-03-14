import {
  extractBacktickedGlossaryTerms,
  slugifyGlossaryConcept,
} from './glossary-planner.mjs';

function sortByPinyin(entries) {
  return [...entries].sort((left, right) => left.pinyin.localeCompare(right.pinyin));
}

function sortPlannedConcepts(concepts) {
  return [...concepts].sort((left, right) => {
    if (left.launchFirst !== right.launchFirst) {
      return left.launchFirst ? -1 : 1;
    }

    if (left.titleCount !== right.titleCount) {
      return right.titleCount - left.titleCount;
    }

    return left.term.localeCompare(right.term);
  });
}

function ensureDossierBucket(groups, dossier) {
  if (!groups.has(dossier)) {
    groups.set(dossier, {
      publishedEntries: [],
      plannedConcepts: [],
    });
  }

  return groups.get(dossier);
}

export function splitPublishedGlossaryEntriesByKind(entries = []) {
  const terms = [];
  const conceptNotes = [];

  for (const entry of entries) {
    if (entry.kind === 'concept-note') {
      conceptNotes.push(entry);
      continue;
    }

    terms.push(entry);
  }

  return { terms, conceptNotes };
}

export function getGlossaryEntryPointSummary({
  publishedEntries = [],
  plannedConcepts = [],
} = {}) {
  const { terms, conceptNotes } = splitPublishedGlossaryEntriesByKind(publishedEntries);

  return {
    shouldLead: publishedEntries.length > 0,
    liveCount: publishedEntries.length,
    termCount: terms.length,
    conceptNoteCount: conceptNotes.length,
    plannedCount: plannedConcepts.length,
  };
}

export function buildGlossaryDossierLookup({
  pillarSlug,
  publishedEntries = [],
  plannedItems = [],
  publishedSlugs = new Set(),
} = {}) {
  const groups = new Map();

  for (const entry of publishedEntries) {
    if (pillarSlug && entry.data.pillar !== pillarSlug) {
      continue;
    }

    const group = ensureDossierBucket(groups, entry.data.dossier);
    group.publishedEntries.push({
      slug: entry.id,
      title: entry.data.title,
      chinese: entry.data.chinese,
      pinyin: entry.data.pinyin,
      kind: entry.data.kind,
    });
  }

  const conceptGroups = new Map();

  for (const item of plannedItems) {
    if (pillarSlug && item.pillar !== pillarSlug) {
      continue;
    }

    if (item.format !== 'Glossary-led') {
      continue;
    }

    for (const term of extractBacktickedGlossaryTerms(item.title)) {
      const slug = slugifyGlossaryConcept(term);
      if (!slug || publishedSlugs.has(slug)) {
        continue;
      }

      const key = `${item.dossier}:${slug}`;
      if (!conceptGroups.has(key)) {
        conceptGroups.set(key, {
          dossier: item.dossier,
          term,
          slug,
          launchFirst: false,
          evergreen: false,
          titles: new Set(),
        });
      }

      const concept = conceptGroups.get(key);
      concept.launchFirst ||= item.tags.includes('Launch first');
      concept.evergreen ||= item.tags.includes('Evergreen');
      concept.titles.add(item.title);
    }
  }

  for (const concept of conceptGroups.values()) {
    const group = ensureDossierBucket(groups, concept.dossier);
    group.plannedConcepts.push({
      term: concept.term,
      slug: concept.slug,
      launchFirst: concept.launchFirst,
      evergreen: concept.evergreen,
      titleCount: concept.titles.size,
    });
  }

  return Object.fromEntries(
    Array.from(groups.entries()).map(([dossier, group]) => [
      dossier,
      {
        publishedEntries: sortByPinyin(group.publishedEntries),
        plannedConcepts: sortPlannedConcepts(group.plannedConcepts),
      },
    ]),
  );
}
