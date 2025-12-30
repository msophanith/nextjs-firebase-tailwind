"use client";

import dynamic from "next/dynamic";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy, where } from "firebase/firestore";
import { Map as MapIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MapView = dynamic(() => import("@/components/leaflet/map-view"), {
  ssr: false,
});

export default function MapPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
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
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-blue-200/50 animate-pulse font-medium">
            Loading Alert Map...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex flex-col">
      <header className="relative z-10 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/70 border-b border-blue-100 sticky top-0">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-blue-50 text-blue-600"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-black text-blue-900 tracking-tight">
            Alert Map
          </h1>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Live Updates
            </span>
          </div>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 relative flex items-center justify-center">
        <MapView posts={posts as any} />
      </main>
    </div>
  );
}
