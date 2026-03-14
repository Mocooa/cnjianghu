import { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react';
import { trackEvent } from '../../utils/analytics';

type SearchState = 'booting' | 'idle' | 'searching' | 'ready' | 'unavailable' | 'error';

type PagefindModule = {
  init?: () => Promise<void>;
  options?: (options: { bundlePath?: string; excerptLength?: number }) => Promise<void> | void;
  search: (term: string) => Promise<PagefindSearchResponse>;
};

type PagefindSearchResponse = {
  results: Array<{
    data: () => Promise<PagefindLoadedResult>;
  }>;
};

type PagefindLoadedResult = {
  url: string;
  excerpt: string;
  meta: Record<string, string | undefined>;
  sub_results?: Array<{
    title: string;
    url: string;
    excerpt: string;
  }>;
};

type SearchResult = {
  title: string;
  url: string;
  excerpt: string;
  kind: string;
  parentTitle?: string;
};

const MIN_QUERY_LENGTH = 2;
const PAGE_RESULT_LIMIT = 8;
const DISPLAY_RESULT_LIMIT = 10;

function inferKind(url: string): string {
  if (url.startsWith('/read/')) {
    return 'Deep Dive';
  }

  if (url.startsWith('/glossary/')) {
    return 'Glossary';
  }

  if (url.startsWith('/today')) {
    return 'Quick Bite';
  }

  return 'Page';
}

function stripSearchUrl(url: string): string {
  return url.replace(/\/$/, '') || '/';
}

function normalizeResult(result: PagefindLoadedResult): SearchResult[] {
  const pageTitle = result.meta.title ?? stripSearchUrl(result.url);

  if (result.url.startsWith('/today') && result.sub_results?.length) {
    const quickBites = result.sub_results
      .filter((subResult) => subResult.url !== result.url)
      .map((subResult) => ({
        title: subResult.title,
        url: stripSearchUrl(subResult.url),
        excerpt: subResult.excerpt || result.excerpt,
        kind: 'Quick Bite',
        parentTitle: pageTitle,
      }));

    if (quickBites.length > 0) {
      return quickBites;
    }
  }

  return [
    {
      title: pageTitle,
      url: stripSearchUrl(result.url),
      excerpt: result.excerpt,
      kind: inferKind(result.url),
    },
  ];
}

export default function SearchWidget() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim());
  const [status, setStatus] = useState<SearchState>('booting');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pagefind, setPagefind] = useState<PagefindModule | null>(null);
  const lastTrackedQuery = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const initialQuery = new URLSearchParams(window.location.search).get('q')?.trim();
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextUrl = new URL(window.location.href);
    if (query.trim()) {
      nextUrl.searchParams.set('q', query.trim());
    } else {
      nextUrl.searchParams.delete('q');
    }

    window.history.replaceState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    async function loadPagefind() {
      try {
        const moduleUrl = new URL('/pagefind/pagefind.js', window.location.origin).toString();
        const loadedModule = (await import(/* @vite-ignore */ moduleUrl)) as PagefindModule;
        await loadedModule.options?.({
          bundlePath: '/pagefind/',
          excerptLength: 18,
        });
        await loadedModule.init?.();

        if (cancelled) {
          return;
        }

        setPagefind(loadedModule);
        setStatus('idle');
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error('Failed to load Pagefind', error);
        setStatus('unavailable');
      }
    }

    loadPagefind();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pagefind) {
      return;
    }

    if (deferredQuery.length < MIN_QUERY_LENGTH) {
      setErrorMessage(null);
      setStatus('idle');
      startTransition(() => {
        setResults([]);
      });
      return;
    }

    let cancelled = false;
    setErrorMessage(null);
    setStatus('searching');

    async function runSearch() {
      try {
        const search = await pagefind.search(deferredQuery);
        const loadedResults = await Promise.all(
          search.results.slice(0, PAGE_RESULT_LIMIT).map((result) => result.data()),
        );
        const normalizedResults = loadedResults
          .flatMap(normalizeResult)
          .slice(0, DISPLAY_RESULT_LIMIT);

        if (cancelled) {
          return;
        }

        startTransition(() => {
          setResults(normalizedResults);
          setStatus('ready');
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error('Pagefind search failed', error);
        setErrorMessage('Search is temporarily unavailable.');
        setStatus('error');
      }
    }

    runSearch();

    return () => {
      cancelled = true;
    };
  }, [deferredQuery, pagefind]);

  useEffect(() => {
    if (status !== 'ready' || deferredQuery.length < MIN_QUERY_LENGTH) {
      return;
    }

    if (lastTrackedQuery.current === deferredQuery) {
      return;
    }

    lastTrackedQuery.current = deferredQuery;
    trackEvent('Search', {
      props: {
        surface: 'search-page',
        query_length: deferredQuery.length,
        result_count: results.length,
      },
    });
  }, [deferredQuery, results.length, status]);

  return (
    <section className="rounded-[2rem] border border-ink-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm dark:border-ink-800 dark:bg-ink-900/80 md:p-8">
      <label className="block">
        <span className="sr-only">Search the archive</span>
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles, glossary terms, and quick bites..."
          className="w-full rounded-2xl border border-ink-300 bg-ink-50 px-5 py-4 font-ui text-base text-ink-900 outline-none transition focus:border-vermilion dark:border-ink-700 dark:bg-ink-950 dark:text-ink-50"
        />
      </label>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-ui text-ink-500 dark:text-ink-400">
        <span>Search works across deep dives, glossary entries, and Today posts.</span>
        {status === 'searching' && <span className="text-vermilion">Searching…</span>}
      </div>

      {status === 'unavailable' && (
        <div className="mt-6 rounded-2xl border border-gold/25 bg-ink-50 p-4 text-sm text-ink-600 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300">
          Search assets are not available in the current environment yet. This is expected in plain `astro dev`; use
          `pnpm build` or the production site to query the Pagefind index.
        </div>
      )}

      {status !== 'unavailable' && deferredQuery.length < MIN_QUERY_LENGTH && (
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {['guanxi', 'hot water', 'tang ping'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                trackEvent('Search Suggestion Click', {
                  props: {
                    suggestion,
                    surface: 'search-page',
                  },
                });
                setQuery(suggestion);
              }}
              className="rounded-2xl border border-ink-200 px-4 py-3 text-left font-ui text-sm text-ink-600 transition hover:border-vermilion hover:text-vermilion dark:border-ink-800 dark:text-ink-300"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {status === 'ready' && deferredQuery.length >= MIN_QUERY_LENGTH && results.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-ink-300 p-6 text-center dark:border-ink-700">
          <p className="font-heading text-2xl text-ink-900 dark:text-ink-50">No matches found.</p>
          <p className="mt-2 font-ui text-sm text-ink-500 dark:text-ink-400">
            Try a broader term, a pinyin spelling, or a Chinese phrase.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 rounded-2xl border border-vermilion/25 bg-vermilion-light/40 p-4 text-sm font-ui text-vermilion-dark dark:border-vermilion/40 dark:bg-vermilion/10 dark:text-vermilion-light">
          {errorMessage}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 space-y-4" aria-live="polite">
          {results.map((result) => (
            <a
              key={result.url}
              href={result.url}
              className="block rounded-2xl border border-ink-200 bg-ink-50/60 p-5 transition hover:border-vermilion hover:bg-white dark:border-ink-800 dark:bg-ink-950/80 dark:hover:bg-ink-950"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-vermilion-light px-2.5 py-1 text-[0.68rem] font-ui font-semibold uppercase tracking-[0.18em] text-vermilion-dark">
                  {result.kind}
                </span>
                <span className="font-ui text-xs text-ink-400 dark:text-ink-500">{result.url}</span>
              </div>
              <h2 className="mt-3 text-2xl font-heading font-semibold text-ink-900 dark:text-ink-50">
                {result.title}
              </h2>
              {result.parentTitle && (
                <p className="mt-1 font-ui text-sm text-ink-500 dark:text-ink-400">From {result.parentTitle}</p>
              )}
              <p
                className="search-result-excerpt mt-3 text-base leading-7 text-ink-600 dark:text-ink-300"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
