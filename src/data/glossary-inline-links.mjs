import { resolveGlossaryDependency } from './glossary-dependency-links.mjs';

const BACKTICKED_TERM_PATTERN = /`([^`]+)`/g;

export function tokenizeGlossaryLinkedTitle(title, lookup = new Map()) {
  if (!title.includes('`')) {
    return [{ type: 'text', value: title }];
  }

  const tokens = [];
  let lastIndex = 0;

  for (const match of title.matchAll(BACKTICKED_TERM_PATTERN)) {
    const [fullMatch, rawTerm] = match;
    const startIndex = match.index ?? 0;

    if (startIndex > lastIndex) {
      tokens.push({
        type: 'text',
        value: title.slice(lastIndex, startIndex),
      });
    }

    const dependency = resolveGlossaryDependency(rawTerm, lookup);

    if (dependency.isLinked) {
      tokens.push({
        type: 'link',
        value: rawTerm,
        href: dependency.href,
        kind: dependency.kind,
      });
    } else {
      tokens.push({
        type: 'code',
        value: rawTerm,
      });
    }

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < title.length) {
    tokens.push({
      type: 'text',
      value: title.slice(lastIndex),
    });
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', value: title }];
}
