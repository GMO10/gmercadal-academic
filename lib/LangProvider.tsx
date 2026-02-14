'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, t as translate } from './i18n';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage?.getItem('lang')) as Lang | null;
    if (saved && ['en', 'es', 'ca'].includes(saved)) {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem('lang', newLang); } catch {}
    }
  };

  const t = (key: string) => translate(lang, key);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
