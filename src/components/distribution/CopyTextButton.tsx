import { useState } from 'react';
import { trackEvent, type AnalyticsProps } from '../../utils/analytics';

type Props = {
  value: string;
  label: string;
  successLabel?: string;
  className?: string;
  eventName?: string;
  eventProps?: AnalyticsProps;
};

export default function CopyTextButton({
  value,
  label,
  successLabel = 'Copied',
  className = '',
  eventName = 'Copy Link',
  eventProps,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      trackEvent(eventName, { props: eventProps });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? successLabel : label}
    </button>
  );
}
