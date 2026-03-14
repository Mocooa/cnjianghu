export type AnalyticsPropValue = string | number | boolean | null | undefined;
export type AnalyticsProps = Record<string, AnalyticsPropValue>;

type PlausibleOptions = {
  callback?: (result?: { status?: number; error?: unknown }) => void;
  interactive?: boolean;
  props?: Record<string, string | number | boolean>;
};

const analyticsEnabled = Boolean(import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN);

function normalizePropValue(value: AnalyticsPropValue): string | number | boolean | null {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value.trim().slice(0, 120);
  }

  return value;
}

function encodeTrackingToken(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, '+')
    .replace(/[^A-Za-z0-9+_-]/g, '-');
}

export function isAnalyticsEnabled(): boolean {
  return analyticsEnabled;
}

export function buildPlausibleClasses(eventName: string, props: AnalyticsProps = {}): string {
  if (!analyticsEnabled) {
    return '';
  }

  const classNames = [`plausible-event-name=${encodeTrackingToken(eventName)}`];

  Object.entries(props).forEach(([key, value]) => {
    const normalizedValue = normalizePropValue(value);
    if (normalizedValue === null || normalizedValue === '') {
      return;
    }

    classNames.push(`plausible-event-${encodeTrackingToken(key)}=${encodeTrackingToken(String(normalizedValue))}`);
  });

  return classNames.join(' ');
}

export function trackEvent(
  eventName: string,
  options: {
    interactive?: boolean;
    props?: AnalyticsProps;
  } = {},
): void {
  if (!analyticsEnabled || typeof window === 'undefined' || typeof window.plausible !== 'function') {
    return;
  }

  const props = Object.fromEntries(
    Object.entries(options.props ?? {})
      .map(([key, value]) => [key, normalizePropValue(value)])
      .filter(([, value]) => value !== null && value !== ''),
  ) as Record<string, string | number | boolean>;

  const payload: PlausibleOptions = {};

  if (Object.keys(props).length > 0) {
    payload.props = props;
  }

  if (typeof options.interactive === 'boolean') {
    payload.interactive = options.interactive;
  }

  window.plausible(eventName, payload);
}
