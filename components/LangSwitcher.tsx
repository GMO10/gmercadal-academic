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
    <div className="flex items-center gap-1 border border-white/20 rounded-full px-1 py-0.5">
      {(Object.keys(flags) as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer border-0 ${
            lang === l
              ? 'bg-gold text-navy'
              : 'bg-transparent text-white/60 hover:text-white'
          }`}
          aria-label={`Switch to ${l}`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
