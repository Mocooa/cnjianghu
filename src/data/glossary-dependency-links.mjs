function normalizeDependencyLabel(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['".()]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildGlossaryDependencyLookup(entries = []) {
  const lookup = new Map();

  for (const entry of entries) {
    const target = {
      slug: entry.id,
      title: entry.data.title,
      chinese: entry.data.chinese,
      kind: entry.data.kind,
    };

    const keys = new Set([
      normalizeDependencyLabel(entry.id),
      normalizeDependencyLabel(entry.data.title),
      normalizeDependencyLabel(entry.data.chinese),
    ]);

    for (const key of keys) {
      if (!key || lookup.has(key)) {
        continue;
      }

      lookup.set(key, target);
    }
  }

  return lookup;
}

export function resolveGlossaryDependency(label, lookup) {
  const match = lookup.get(normalizeDependencyLabel(label));

  if (!match) {
    return {
      label,
      isLinked: false,
      href: null,
      title: null,
      chinese: null,
      kind: null,
    };
  }

  return {
    label,
    isLinked: true,
    href: `/glossary/${match.slug}`,
    title: match.title,
    chinese: match.chinese,
    kind: match.kind,
  };
}

export function groupGlossaryDependencies(labels = [], lookup = new Map()) {
  const grouped = {
    liveTerms: [],
    liveConceptNotes: [],
    planned: [],
  };

  for (const label of labels) {
    const dependency = resolveGlossaryDependency(label, lookup);

    if (!dependency.isLinked) {
      grouped.planned.push(dependency);
      continue;
    }

    if (dependency.kind === 'concept-note') {
      grouped.liveConceptNotes.push(dependency);
      continue;
    }

    grouped.liveTerms.push(dependency);
  }

  return grouped;
}

export function buildGlossarySupportSections(labels = [], lookup = new Map()) {
  const grouped = groupGlossaryDependencies(labels, lookup);

  return [
    {
      key: 'liveTerms',
      label: 'Live terms',
      items: grouped.liveTerms,
    },
    {
      key: 'liveConceptNotes',
      label: 'Live concept notes',
      items: grouped.liveConceptNotes,
    },
    {
      key: 'planned',
      label: 'Planned support',
      items: grouped.planned,
    },
  ].filter((section) => section.items.length > 0);
}
