import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'G. Mercadal-Orfila — Academic Profile',
    template: '%s | G. Mercadal-Orfila',
  },
  description:
    'Hospital pharmacist and researcher. Publications, mentions, and academic profile of G. Mercadal-Orfila.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'G. Mercadal-Orfila',
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
          className="border-b border-border bg-ivory/80 backdrop-blur-sm sticky top-0 z-50"
          aria-label="Main navigation"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif font-bold text-lg text-ink no-underline hover:text-accent transition-colors"
            >
              G. Mercadal-Orfila
            </Link>
            <ul className="flex gap-6 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted no-underline hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Main ──────────────────────────────── */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
          {children}
        </main>

        {/* ── Footer ────────────────────────────── */}
        <footer className="border-t border-border text-center text-sm text-muted py-6">
          <div className="max-w-4xl mx-auto px-4">
            © {new Date().getFullYear()} G. Mercadal-Orfila · Data auto-updated via{' '}
            <a
              href="https://orcid.org/0000-0001-7304-458X"
              target="_blank"
              rel="noopener noreferrer"
            >
              ORCID
            </a>
            ,{' '}
            <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">
              PubMed
            </a>{' '}
            &amp;{' '}
            <a href="https://www.gdeltproject.org/" target="_blank" rel="noopener noreferrer">
              GDELT
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
