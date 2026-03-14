export function slugifyDossierLabel(label) {
  return label
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getDossierAnchorId(pillarSlug, dossier) {
  return `${pillarSlug}--${slugifyDossierLabel(dossier)}`;
}

export function getExploreDossierHref(pillarSlug, dossier) {
  return `/explore/${pillarSlug}#${getDossierAnchorId(pillarSlug, dossier)}`;
}

export function getArchiveMapDossierHref(pillarSlug, dossier) {
  return `/archive-map#${getDossierAnchorId(pillarSlug, dossier)}`;
}
