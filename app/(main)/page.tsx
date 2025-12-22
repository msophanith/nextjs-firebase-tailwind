'use client';

import dynamic from 'next/dynamic';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query, orderBy } from 'firebase/firestore';
import { Map, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MapView = dynamic(() => import('@/components/leaflet/map-view'), {
  ssr: false,
});

export default function Home() {
  const firestore = useFirestore();

  const postsQuery = query(
    collection(firestore, 'posts'),
    orderBy('createdAt', 'desc')
  );

  const { status, data: posts } = useFirestoreCollectionData(postsQuery, {
    idField: 'id',
  });

  if (status === 'loading')
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-muted-foreground animate-pulse'>Loading map...</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-8 py-8 px-4 max-w-screen-2xl mx-auto w-full'>
      <header className='flex flex-col items-center text-center gap-4'>
        <div className='flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shadow-inner'>
          <Map size={32} />
        </div>
        <div className='space-y-2'>
          <h1 className='text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent'>
            Police Alert Map
          </h1>
          <p className='text-muted-foreground text-lg max-w-md mx-auto'>
            Discover and explore alerts pinned across Cambodia.
          </p>
        </div>
        <div className='w-24 h-1 bg-primary rounded-full' />

        <div className='pt-4'>
          <Link href='/upload'>
            <Button
              size='lg'
              className='gap-2 rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all'
            >
              <Plus size={20} />
              Pin New Image
            </Button>
          </Link>
        </div>
      </header>

      <main className='w-full'>
        <MapView posts={posts as any} />
      </main>
    </div>
  );
}
