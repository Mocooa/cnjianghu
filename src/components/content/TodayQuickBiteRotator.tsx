import { startTransition, useEffect, useState } from 'react';

import {
  quickBiteTypeColors,
  quickBiteTypeLabels,
  selectDailyQuickBites,
} from '../../data/quick-bite-rotation.mjs';

type QuickBiteItem = {
  id: string;
  title: string;
  summary: string;
  type: string;
  date: string;
  chineseTerm?: string | null;
  pinyin?: string | null;
};

type Props = {
  items: QuickBiteItem[];
  initialItems: QuickBiteItem[];
  variant: 'home' | 'today';
  maxItems?: number;
};

const quickBiteDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

function HomeCard({ bite }: { bite: QuickBiteItem }) {
  return (
    <a
      href={`/today#${bite.id}`}
      className="group block rounded-xl border border-ink-200 bg-white p-4 transition-all hover:border-vermilion/40 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-ui font-semibold uppercase tracking-wider text-vermilion-dark dark:text-vermilion-light">
          {quickBiteTypeLabels[bite.type] ?? bite.type}
        </span>
        <span className="text-xs font-ui text-ink-500 dark:text-ink-400">
          {quickBiteDateFormatter.format(new Date(bite.date))}
        </span>
      </div>
      <h3 className="mt-2 text-base font-heading font-semibold leading-snug text-ink-900 transition-colors group-hover:text-vermilion dark:text-ink-50">
        {bite.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
        {bite.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-ui text-ink-600 transition-colors group-hover:text-vermilion dark:text-ink-300">
        Open bite
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

function TodayCard({ bite }: { bite: QuickBiteItem }) {
  return (
    <article className="rounded-xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="text-xs font-ui font-semibold uppercase tracking-wider"
          style={{ color: `var(--color-${quickBiteTypeColors[bite.type] ?? 'vermilion'})` }}
        >
          {quickBiteTypeLabels[bite.type] ?? bite.type}
        </span>
        <span className="text-xs text-ink-400 dark:text-ink-500">
          {quickBiteDateFormatter.format(new Date(bite.date))}
        </span>
      </div>

      {bite.chineseTerm ? (
        <div className="mb-2">
          <span className="font-chinese text-2xl font-semibold text-ink-900 dark:text-ink-50">
            {bite.chineseTerm}
          </span>
          {bite.pinyin ? (
            <span className="ml-2 text-sm italic text-ink-400">{bite.pinyin}</span>
          ) : null}
        </div>
      ) : null}

      <h2 id={bite.id} className="scroll-mt-24 mb-2 text-xl font-heading font-semibold text-ink-900 dark:text-ink-50">
        {bite.title}
      </h2>

      <p className="leading-relaxed text-ink-600 dark:text-ink-400">
        {bite.summary}
      </p>
    </article>
  );
}

export default function TodayQuickBiteRotator({
  items,
  initialItems,
  variant,
  maxItems = 4,
}: Props) {
  const [selectedItems, setSelectedItems] = useState(initialItems);

  useEffect(() => {
    startTransition(() => {
      setSelectedItems(
        selectDailyQuickBites(items, {
          now: new Date(),
          timeZone: 'Asia/Shanghai',
          maxItems,
        }),
      );
    });
  }, [items, maxItems]);

  if (selectedItems.length === 0) {
    return null;
  }

  if (variant === 'home') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selectedItems.map((bite) => (
          <HomeCard key={bite.id} bite={bite} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedItems.map((bite) => (
        <TodayCard key={bite.id} bite={bite} />
      ))}
    </div>
  );
}
