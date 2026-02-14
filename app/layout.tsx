import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
