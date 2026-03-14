export const roadmapFormatOrder = [
  'Quick Bites',
  'Misread / Actually',
  'Scene Decoder',
  'Deep Dives',
  'Glossary-led',
];

export function groupDossierItemsByFormat(items) {
  const groups = new Map();

  for (const format of roadmapFormatOrder) {
    groups.set(format, []);
  }

  for (const item of items) {
    if (!groups.has(item.format)) {
      groups.set(item.format, []);
    }

    groups.get(item.format).push(item);
  }

  return Array.from(groups.entries())
    .filter(([, groupedItems]) => groupedItems.length > 0)
    .map(([format, groupedItems]) => ({
      format,
      items: groupedItems,
    }));
}

export function buildReviewFormatGroups(items, previewCount = 2) {
  return groupDossierItemsByFormat(items).map((group) => ({
    ...group,
    previewItems: group.items.slice(0, previewCount),
    hiddenCount: Math.max(0, group.items.length - previewCount),
    defaultOpen: group.items.length <= previewCount,
  }));
}
