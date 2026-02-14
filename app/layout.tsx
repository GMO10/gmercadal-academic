import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dr. Gabriel Mercadal-Orfila — Academic Profile',
    template: '%s | Dr. G. Mercadal-Orfila',
  },
  description:
    'Clinical pharmacist, researcher and educator. Publications, mentions, and academic profile of Dr. Gabriel Mercadal-Orfila.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Dr. G. Mercadal-Orfila',
  },
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/publications', label: 'Publications' },
  { href: '/mentions', label: 'Mentions' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* ── Navigation ────────────────────────── */}
        <nav
          className="border-b border-border bg-cream/90 backdrop-blur-md sticky top-0 z-50"
          aria-label="Main navigation"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif font-bold text-xl text-navy no-underline hover:text-gold transition-colors"
            >
              Dr. G. Mercadal-Orfila
            </Link>
            <ul className="flex gap-8 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate no-underline hover:text-navy transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Main ──────────────────────────────── */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12">
          {children}
        </main>

        {/* ── Footer ────────────────────────────── */}
        <footer className="border-t border-border bg-navy/[0.02] text-center text-sm text-slate py-8">
          <div className="max-w-5xl mx-auto px-4">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Dr. Gabriel Mercadal-Orfila
            </p>
            <p className="text-xs text-slate/60">
              Data auto-updated via{' '}
              <a href="https://orcid.org/0000-0001-7304-458X" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">ORCID</a>
              {', '}
              <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">PubMed</a>
              {' & '}
              <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer" className="text-slate/60 hover:text-gold">Crossref</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
