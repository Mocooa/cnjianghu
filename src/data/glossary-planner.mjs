import { loadTitleBankItems } from './title-bank-parser.mjs';

const glossaryFormat = 'Glossary-led';
const backtickPattern = /`([^`]+)`/g;
const pillarMeta = [
  { slug: 'digital-china', name: 'Digital China', chinese: '数字中国' },
  { slug: 'taste-life', name: 'Taste & Life', chinese: '饮食生活' },
  { slug: 'aesthetic-china', name: 'Aesthetic China', chinese: '审美创造' },
  { slug: 'mind-china', name: 'Mind China', chinese: '思维智慧' },
  { slug: 'living-china', name: 'Living China', chinese: '真实中国' },
  { slug: 'future-china', name: 'Future China', chinese: '科技未来' },
];

export function extractBacktickedGlossaryTerms(title) {
  const seen = new Set();
  const terms = [];

  for (const match of title.matchAll(backtickPattern)) {
    const term = match[1].trim();
    if (!term || seen.has(term)) {
      continue;
    }

    seen.add(term);
    terms.push(term);
  }

  return terms;
}

export function slugifyGlossaryConcept(term) {
  return term
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildPlannedGlossaryPillarSections(items, { publishedSlugs = new Set() } = {}) {
  const conceptMap = new Map();

  for (const item of items) {
    if (item.format !== glossaryFormat) {
      continue;
    }

    const terms = extractBacktickedGlossaryTerms(item.title);
    for (const term of terms) {
      const slug = slugifyGlossaryConcept(term);
      if (!slug || publishedSlugs.has(slug)) {
        continue;
      }

      const key = `${item.pillar}:${slug}`;
      if (!conceptMap.has(key)) {
        conceptMap.set(key, {
          term,
          slug,
          pillar: item.pillar,
          launchFirst: false,
          evergreen: false,
          dossiers: new Set(),
          titles: new Set(),
        });
      }

      const concept = conceptMap.get(key);
      concept.launchFirst ||= item.tags.includes('Launch first');
      concept.evergreen ||= item.tags.includes('Evergreen');
      concept.dossiers.add(item.dossier);
      concept.titles.add(item.title);
    }
  }

  return pillarMeta
    .map((pillar) => {
      const concepts = [...conceptMap.values()]
        .filter((concept) => concept.pillar === pillar.slug)
        .map((concept) => ({
          term: concept.term,
          slug: concept.slug,
          pillar: concept.pillar,
          launchFirst: concept.launchFirst,
          evergreen: concept.evergreen,
          dossierCount: concept.dossiers.size,
          titleCount: concept.titles.size,
        }))
        .sort((a, b) => {
          if (a.launchFirst !== b.launchFirst) {
            return a.launchFirst ? -1 : 1;
          }

          if (a.titleCount !== b.titleCount) {
            return b.titleCount - a.titleCount;
          }

          return a.term.localeCompare(b.term);
        });

      return {
        pillar,
        concepts,
      };
    })
    .filter((section) => section.concepts.length > 0);
}

export function getPlannedGlossaryPillarSections({ publishedSlugs = new Set() } = {}) {
  return buildPlannedGlossaryPillarSections(loadTitleBankItems(), { publishedSlugs });
}
