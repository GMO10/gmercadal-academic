'use client';

import { useLang } from '@/lib/LangProvider';
import { Lang } from '@/lib/i18n';

const flags: Record<Lang, string> = {
  en: 'EN',
  es: 'ES',
  ca: 'CA',
};

export function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 border border-border rounded-full px-1 py-0.5">
      {(Object.keys(flags) as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer border-0 ${
            lang === l
              ? 'bg-navy text-cream'
              : 'bg-transparent text-slate hover:text-navy'
          }`}
          aria-label={`Switch to ${l}`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
