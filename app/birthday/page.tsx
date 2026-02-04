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
import { birthdayData } from "./data";

export default function BirthdayPage() {
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
        greeting={birthdayData.hero.greeting}
        subtitle={birthdayData.hero.subtitle}
        onScrollClick={scrollToMemories}
      />

      {/* Memories Section */}
      <div ref={memoriesRef}>
        <MemoriesSection memories={birthdayData.memories} />
      </div>

      {/* Interactive Reveal Section */}
      <InteractiveReveal messages={birthdayData.hiddenMessages} />

      {/* Why I Love You Section */}
      <WhyILoveYou reasons={birthdayData.whyILoveYou} />

      {/* Love Letter Section */}
      <LoveLetterSection
        title={birthdayData.loveLetter.title}
        paragraphs={birthdayData.loveLetter.paragraphs}
      />

      {/* Final Birthday Moment */}
      <FinalBirthdayMoment
        title={birthdayData.finalMessage.title}
        subtitle={birthdayData.finalMessage.subtitle}
        easterEgg={birthdayData.finalMessage.easterEgg}
        musicUrl={birthdayData.music.url}
      />
    </div>
  );

  return (
    <DateLock
      targetDate={birthdayData.birthday}
      onUnlock={() => setIsUnlocked(true)}
    >
      {content}
    </DateLock>
  );
}
