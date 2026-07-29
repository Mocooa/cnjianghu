const FRONTMATTER_BOUNDARY = '---';

export function extractFrontmatter(source) {
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith(`${FRONTMATTER_BOUNDARY}\n`)) {
    return '';
  }

  const end = normalized.indexOf(`\n${FRONTMATTER_BOUNDARY}\n`, FRONTMATTER_BOUNDARY.length + 1);
  return end === -1 ? '' : normalized.slice(FRONTMATTER_BOUNDARY.length + 1, end);
}

export function getFrontmatterScalar(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm'));
  if (!match) return null;
  return match[1].replace(/^['"]|['"]$/g, '').trim();
}

export function countSourceRecords(frontmatter) {
  const lines = frontmatter.split('\n');
  const sourceIndex = lines.findIndex((line) => line === 'sources:');
  if (sourceIndex === -1) return 0;

  let count = 0;
  for (const line of lines.slice(sourceIndex + 1)) {
    if (/^[A-Za-z_][A-Za-z0-9_]*:/.test(line)) break;
    if (/^\s{2}- title:/.test(line)) count += 1;
  }
  return count;
}

export function auditContentFile(relativePath, source, options = {}) {
  const frontmatter = extractFrontmatter(source);
  const errors = [];
  const warnings = [];

  if (!frontmatter) {
    return {
      errors: [`${relativePath}: missing YAML frontmatter`],
      warnings,
    };
  }

  const sourceCount = countSourceRecords(frontmatter);

  if (relativePath.startsWith('content/published/deep-dives/')) {
    if (sourceCount < 3) {
      errors.push(`${relativePath}: deep dives require at least 3 source records (found ${sourceCount})`);
    }
    if (!getFrontmatterScalar(frontmatter, 'author')) {
      errors.push(`${relativePath}: deep dives require an explicit author`);
    }
  }

  if (relativePath.startsWith('content/published/quick-bites/')) {
    const date = getFrontmatterScalar(frontmatter, 'date');
    const type = getFrontmatterScalar(frontmatter, 'type');
    const relaunchCutoff = options.relaunchCutoff ?? '2026-07-01';
    const minimumSources = type === 'trending' ? 2 : 1;

    if (date && date >= relaunchCutoff) {
      if (sourceCount < minimumSources) {
        errors.push(
          `${relativePath}: relaunch quick bites of type "${type}" require at least ${minimumSources} source record(s) (found ${sourceCount})`,
        );
      }
      if (!getFrontmatterScalar(frontmatter, 'last_reviewed')) {
        errors.push(`${relativePath}: relaunch quick bites require last_reviewed`);
      }
    }
  }

  if (relativePath.startsWith('content/published/glossary/')) {
    const evidenceType = getFrontmatterScalar(frontmatter, 'evidence_type');
    if (evidenceType === 'data-led' && sourceCount === 0) {
      errors.push(`${relativePath}: data-led glossary entries require sources`);
    }
  }

  const publishedDate = getFrontmatterScalar(frontmatter, 'date');
  const today = options.today ?? new Date().toISOString().slice(0, 10);
  if (publishedDate && publishedDate > today) {
    warnings.push(`${relativePath}: publication date ${publishedDate} is in the future`);
  }

  return { errors, warnings };
}
