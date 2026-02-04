"use client";

import { useState, useRef } from "react";
import { HeroSection } from "@/components/birthday/HeroSection";
import { MemoriesSection } from "@/components/birthday/MemoriesSection";
import { InteractiveReveal } from "@/components/birthday/InteractiveReveal";
import { WhyILoveYou } from "@/components/birthday/WhyILoveYou";
import { LoveLetterSection } from "@/components/birthday/LoveLetterSection";
import { FinalBirthdayMoment } from "@/components/birthday/FinalBirthdayMoment";
import { ScrollProgress } from "@/components/birthday/ScrollProgress";
import { RosePetals } from "@/components/birthday/RosePetals";
import { DateLock } from "@/components/birthday/DateLock";
import { valentineData } from "./data";

export default function ValentinePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const memoriesRef = useRef<HTMLDivElement>(null);

  const scrollToMemories = () => {
    memoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const content = (
    <div className="relative">
      <ScrollProgress />
      <RosePetals />

      {/* Hero Section */}
      <HeroSection
        greeting={valentineData.hero.greeting}
        subtitle={valentineData.hero.subtitle}
        onScrollClick={scrollToMemories}
      />

      {/* Memories Section */}
      <div ref={memoriesRef}>
        <MemoriesSection memories={valentineData.memories} />
      </div>

      {/* Interactive Love Notes */}
      <InteractiveReveal messages={valentineData.loveNotes} />

      {/* Reasons I Love You */}
      <WhyILoveYou reasons={valentineData.reasonsILoveYou} />

      {/* Love Letter Section */}
      <LoveLetterSection
        title={valentineData.loveLetter.title}
        paragraphs={valentineData.loveLetter.paragraphs}
      />

      {/* Final Valentine Moment */}
      <FinalBirthdayMoment
        title={valentineData.finalMessage.title}
        subtitle={valentineData.finalMessage.subtitle}
        easterEgg={valentineData.finalMessage.easterEgg}
        musicUrl={valentineData.music.url}
      />
    </div>
  );

  return (
    <DateLock
      targetDate={valentineData.valentineDate}
      onUnlock={() => setIsUnlocked(true)}
    >
      {content}
    </DateLock>
  );
}
