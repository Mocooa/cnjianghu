type PlausibleOptions = {
  callback?: (result?: { status?: number; error?: unknown }) => void;
  interactive?: boolean;
  props?: Record<string, string | number | boolean>;
};

interface ImportMetaEnv {
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_PLAUSIBLE_API_HOST?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
  }
}

export {};
