
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

// Metadata cannot be exported from a Client Component.
// If static metadata is needed here, it should be placed directly in the <head> below.
// For dynamic metadata, consider moving it to a parent Server Component or using alternative methods.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutPaths = ['/login', '/signup'];
  const showLayout = !noLayoutPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>Surplus Saver</title>
        <meta name="description" content="Reduce food waste. Save money. Support local businesses." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {showLayout && <Header />}
        <main className={`flex-grow container mx-auto px-4 ${showLayout ? 'py-8' : ''}`}>
          {children}
        </main>
        {showLayout && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
