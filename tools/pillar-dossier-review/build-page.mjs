import fs from 'node:fs/promises';
import path from 'node:path';

import { pillars } from './review-data.mjs';
import { buildReviewPageHtml } from './page-template.mjs';

const outputPath = path.resolve('/Users/puyuewang/cnjianghu/tools/pillar-dossier-review/index.html');
const html = buildReviewPageHtml(pillars);

await fs.writeFile(outputPath, html, 'utf8');
console.log(outputPath);
