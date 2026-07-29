import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const componentPath = new URL('../src/components/content/ChineseTerm.astro', import.meta.url);

test('ChineseTerm definitions wrap instead of widening mobile article pages', async () => {
  const component = await readFile(componentPath, 'utf8');

  assert.doesNotMatch(component, /whitespace-nowrap/);
  assert.match(component, /whitespace-normal/);
  assert.match(component, /break-words/);
});
