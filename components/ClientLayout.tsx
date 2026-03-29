'use client';



import Link from 'next/link';

import { useState } from 'react';

import { LangProvider, useLang } from '@/lib/LangProvider';

import { LangSwitcher } from '@/components/LangSwitcher';

import { ReactNode } from 'react';



function NavBar() {

  const { t } = useLang();

  const [menuOpen, setMenuOpen] = useState(false);



  const navLinks = [

    { href: '/', label: t('nav.home') },

    { href: '/publications', label: t('nav.publications') },

    { href: '/conferences', label: t('nav.conferences') },

    { href: '/awards', label: t('nav.awards') },

    { href: '/naveta', label: t('nav.naveta') },

    { href: '/ia-aplicada', label: t('nav.ia') },

    { href: '/mentions', label: t('nav.mentions') },

    { href: '/contact', label: t('nav.contact') },

  ];



  return (

    <nav className="nav-main" aria-label="Main navigation">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        <Link href="/" className="font-serif font-bold text-lg text-white no-underline hover:text-gold transition-colors">

          Dr. G. Mercadal-Orfila

        </Link>



        {/* Desktop nav */}

        <div className="hidden md:flex items-center gap-6">

          <ul className="flex gap-5 list-none m-0 p-0">

            {navLinks.map((link) => (

              <li key={link.href}>

                <Link href={link.href} className="nav-link">{link.label}</Link>

              </li>

            ))}

          </ul>

          <LangSwitcher />

        </div>



        {/* Mobile hamburger */}

        <button

          onClick={() => setMenuOpen(!menuOpen)}

          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"

          aria-label="Toggle menu"

        >

          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>

          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>

          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>

        </button>

      </div>



      {/* Mobile menu */}

      {menuOpen && (

        <div className="md:hidden border-t border-white/10 bg-navy-mid px-4 pb-4">

          <ul className="list-none m-0 p-0 space-y-3 pt-3">

            {navLinks.map((link) => (

              <li key={link.href}>

                <Link

                  href={link.href}

                  onClick={() => setMenuOpen(false)}

                  className="block text-base font-medium text-white/80 no-underline py-1 hover:text-gold transition-colors"

                >

                  {link.label}

                </Link>

              </li>

            ))}

          </ul>

          <div className="pt-3 border-t border-white/10 mt-3">

            <LangSwitcher />

          </div>

        </div>

      )}

    </nav>

  );

}



function Footer() {

  const { t } = useLang();

  return (

    <footer className="bg-navy text-white/60 text-center text-sm py-10">

      <div className="max-w-6xl mx-auto px-4">

        <p className="mb-1 text-white/80">&copy; {new Date().getFullYear()} Dr. Gabriel Mercadal-Orfila</p>

        <p className="text-xs">

          {t('footer.dataUpdated')}{' '}

          <a href="https://orcid.org/0000-0001-7304-458X" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold no-underline">ORCID</a>

          {', '}

          <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold no-underline">PubMed</a>

          {' & '}

          <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold no-underline">Crossref</a>

        </p>

      </div>

    </footer>

  );

}



export function ClientLayout({ children }: { children: ReactNode }) {

  return (

    <LangProvider>

      <NavBar />

      <div className="flex-1">

        {children}

      </div>

      <Footer />

    </LangProvider>

  );

}

