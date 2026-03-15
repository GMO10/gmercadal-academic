import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'Dr. Gabriel Mercadal-Orfila \u2014 Clinical Pharmacist, Researcher & Educator',
    template: '%s | Dr. G. Mercadal-Orfila',
  },
  description:
    'Clinical pharmacist, researcher and educator at Hospital Mateu Orfila (Menorca). Publications, media, and academic profile. PROMs/PREMs, telepharmacy, value-based healthcare.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Dr. Gabriel Mercadal-Orfila',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
