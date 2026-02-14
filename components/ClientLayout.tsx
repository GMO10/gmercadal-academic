'use client';

import Link from 'next/link';
import { LangProvider, useLang } from '@/lib/LangProvider';
import { LangSwitcher } from '@/components/LangSwitcher';
import { ReactNode } from 'react';

function NavBar() {
  const { t } = useLang();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/publications', label: t('nav.publications') },
    { href: '/mentions', label: t('nav.mentions') },
    { href: '/naveta', label: t('nav.naveta') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="border-b border-border bg-cream/90 backdrop-blur-md sticky top-0 z-50" aria-label="Main navigation">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif font-bold text-xl text-navy no-underline hover:text-gold transition-colors">
          Dr. G. Mercadal-Orfila
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className="text-sm font-medium text-slate no-underline hover:text-navy transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all hover:after:w-full">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-navy/[0.02] text-center text-sm text-slate py-8">
      <div className="max-w-5xl mx-auto px-4">
        <p className="mb-1">&copy; {new Date().getFullYear()} Dr. Gabriel Mercadal-Orfila</p>
        <p className="text-xs text-slate/60">
          {t('footer.dataUpdated')}{' '}
          <a href="https://orcid.org/0000-0001-7304-458X" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">ORCID</a>
          {', '}
          <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">PubMed</a>
          {' & '}
          <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">Crossref</a>
        </p>
      </div>
    </footer>
  );
}

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <NavBar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12">
        {children}
      </main>
      <Footer />
    </LangProvider>
  );
}
