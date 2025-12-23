"use client";

import dynamic from "next/dynamic";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy, where } from "firebase/firestore";
import { Map, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MapView = dynamic(() => import("@/components/leaflet/map-view"), {
  ssr: false,
});

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState, useEffect } from "react";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const firestore = useFirestore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Get start of today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const postsQuery = query(
    collection(firestore, "posts"),
    where("createdAt", ">=", today),
    orderBy("createdAt", "desc")
  );

  const { status, data: posts } = useFirestoreCollectionData(postsQuery, {
    idField: "id",
  });

  if (!hasMounted || status === "loading")
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground animate-pulse">Loading map...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 py-8 px-4 max-w-screen-2xl mx-auto w-full">
      <header className="flex flex-col items-center text-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shadow-inner cursor-help">
                <Map size={32} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Privacy: We do not collect or store personal user data.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Police Alert Map
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Discover and explore alerts pinned across Cambodia.
          </p>
        </div>
        <div className="w-24 h-1 bg-primary rounded-full" />

        <div className="pt-4">
          <Link href="/upload">
            <Button
              size="lg"
              className="gap-2 rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <Plus size={20} />
              Pin New Image
            </Button>
          </Link>
        </div>
      </header>

      <main className="w-full">
        <MapView posts={posts as any} />
      </main>
    </div>
  );
}
