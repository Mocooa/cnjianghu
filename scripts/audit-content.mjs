import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  auditContentFile,
  extractFrontmatter,
  getFrontmatterScalar,
} from '../src/data/content-quality.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'content', 'published');
const collections = ['deep-dives', 'quick-bites', 'glossary'];

async function listMdxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return listMdxFiles(target);
    return entry.isFile() && entry.name.endsWith('.mdx') ? [target] : [];
  }));
  return nested.flat();
}

const files = (await Promise.all(
  collections.map((collection) => listMdxFiles(path.join(contentRoot, collection))),
)).flat();

const errors = [];
const warnings = [];
const latestDates = new Map();
const counts = new Map(collections.map((collection) => [collection, 0]));

for (const file of files) {
  const relativePath = path.relative(root, file);
  const collection = relativePath.split(path.sep)[2];
  counts.set(collection, (counts.get(collection) ?? 0) + 1);

  const source = await readFile(file, 'utf8');
  const result = auditContentFile(relativePath, source);
  errors.push(...result.errors);
  warnings.push(...result.warnings);

  const date = getFrontmatterScalar(extractFrontmatter(source), 'date');
  if (date && (!latestDates.has(collection) || date > latestDates.get(collection))) {
    latestDates.set(collection, date);
  }
}

console.log('Content quality audit');
for (const collection of collections) {
  const latest = latestDates.get(collection);
  console.log(`- ${collection}: ${counts.get(collection)} files${latest ? ` · latest ${latest}` : ''}`);
}

if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length})`);
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.error(`\nErrors (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nNo blocking content-quality errors.');
}
