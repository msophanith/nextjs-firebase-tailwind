"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";

// Import Components
import WelcomeOverlay from "@/components/wedding/WelcomeOverlay";
import NavBar from "@/components/wedding/NavBar";
import HeroSection from "@/components/wedding/HeroSection";
import CountdownTimer from "@/components/wedding/CountdownTimer";
import IntroductionSection from "@/components/wedding/IntroductionSection";
import LoveStorySection from "@/components/wedding/LoveStorySection";
import PreWeddingGallery from "@/components/wedding/PreWeddingGallery";
import EventsSection from "@/components/wedding/EventsSection";
import WeddingPartySection from "@/components/wedding/WeddingPartySection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import LocationSection from "@/components/wedding/LocationSection";
import GiftSection from "@/components/wedding/GiftSection";
import Footer from "@/components/wedding/Footer";
import MusicControl from "@/components/wedding/MusicControl";
import {
  LanguageProvider,
  useLanguage,
} from "@/components/wedding/LanguageContext";

export default function WeddingInvitationPage() {
  return (
    <LanguageProvider>
      <WeddingInvitationContent />
    </LanguageProvider>
  );
}

function WeddingInvitationContent() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Guest Personalization State
  const [guestName, setGuestName] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOverlay]);

  useEffect(() => {
    // Check for "to" parameter in URL
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(decodeURIComponent(to));
      setShowOverlay(true);
    }

    // Simulate a brief loading to ensure fonts/styles are ready and prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (audioPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Audio play failed:", error);
            setAudioPlaying(false);
            setAudioError(true);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioPlaying]);

  const toggleAudio = () => {
    setAudioError(false);
    setAudioPlaying((prev) => !prev);
  };

  const handleOpenInvitation = () => {
    setShowOverlay(false);
    // Auto-play audio on interaction
    setAudioPlaying(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Heart className="w-12 h-12 text-[#8B0000]" />
          <p className="text-[#D4AF37] font-serif tracking-widest uppercase text-sm">
            {t.common.loading}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-serif selection:bg-[#D4AF37]/30 overflow-x-hidden">
      <WelcomeOverlay
        guestName={guestName}
        showOverlay={showOverlay}
        onOpen={handleOpenInvitation}
      />

      <NavBar scrolled={scrolled} />

      <HeroSection />

      <CountdownTimer />

      <IntroductionSection />

      <LoveStorySection />

      <PreWeddingGallery />

      <EventsSection />

      <WeddingPartySection />

      <DressCodeSection />

      <LocationSection />

      <GiftSection />

      <Footer />

      <MusicControl
        audioPlaying={audioPlaying}
        toggleAudio={toggleAudio}
        audioRef={audioRef}
        audioError={audioError}
        setAudioError={setAudioError}
        setAudioPlaying={setAudioPlaying}
      />

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap");

        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
