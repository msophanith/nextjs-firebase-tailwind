import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { MyFirebaseProvider } from '@/components/firebase-providers';
import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';

const font = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Police Alert Map',
  description: 'Discover and explore police alerts pinned across Cambodia.',
  keywords: 'police, alerts, map, nextjs, firebase',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={cn(font.className)}>
        <MyFirebaseProvider>
          {children}
          <Toaster />
        </MyFirebaseProvider>
      </body>
    </html>
  );
}
