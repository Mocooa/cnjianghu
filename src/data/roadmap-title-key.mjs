export function normalizeRoadmapTitleKey(value = '') {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
