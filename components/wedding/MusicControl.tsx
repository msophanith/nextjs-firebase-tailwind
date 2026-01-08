"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefObject } from "react";
import { useLanguage } from "./LanguageContext";

interface MusicControlProps {
  audioPlaying: boolean;
  toggleAudio: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  audioError: boolean;
  setAudioError: (error: boolean) => void;
  setAudioPlaying: (playing: boolean) => void;
}

export default function MusicControl({
  audioPlaying,
  toggleAudio,
  audioRef,
  audioError,
  setAudioError,
  setAudioPlaying,
}: MusicControlProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        {audioError && (
          <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2">
            {t.music.unavailable}
          </div>
        )}
        <Button
          size="icon"
          className={cn(
            "rounded-full shadow-2xl transition-all duration-500 w-14 h-14 border-2 border-[#D4AF37]",
            audioPlaying
              ? "bg-[#D4AF37] animate-spin-slow"
              : "bg-white text-slate-400 hover:bg-slate-50"
          )}
          onClick={toggleAudio}
        >
          {audioPlaying ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : (
            <VolumeX className="w-6 h-6 text-[#D4AF37]" />
          )}
        </Button>
      </div>

      <audio
        ref={audioRef as RefObject<HTMLAudioElement>}
        id="wedding-audio"
        loop
        onError={(e) => {
          console.error("Audio Error:", e.currentTarget.error);
          setAudioError(true);
          setAudioPlaying(false);
        }}
      >
        {/* Priority 1: Local file (User needs to add this) */}
        <source src="/audio/sample.mp3" type="audio/mpeg" />
        {/* Priority 2: External fallback */}
        {/* <source
          src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Gongs_of_Cambodia.ogg"
          type="audio/ogg"
        /> */}
      </audio>
    </>
  );
}
