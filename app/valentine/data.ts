export interface ValentineMemory {
  id: number;
  image: string;
  caption: string;
  date?: string;
}

export interface LoveNote {
  id: number;
  message: string;
  revealed: boolean;
}

export const valentineData = {
  // Valentine's info
  name: "My Valentine",
  valentineDate: "2026-02-14", // Valentine's Day!

  // Hero section
  hero: {
    greeting: "Happy Valentine's Day, My Love 💕",
    subtitle: "You are my forever Valentine",
  },

  // Our love story moments
  memories: [
    {
      id: 1,
      image: "/valentine/moment1.jpg",
      caption: "From the moment I met you, I knew you were special ✨",
      date: "First Glance",
    },
    {
      id: 2,
      image: "/valentine/moment2.jpg",
      caption: "Every day with you feels like Valentine's Day 💝",
      date: "Every Day",
    },
    {
      id: 3,
      image: "/valentine/moment3.jpg",
      caption: "You make my heart skip a beat 💓",
      date: "Heartbeat",
    },
    {
      id: 4,
      image: "/valentine/moment4.jpg",
      caption: "Together is my favorite place to be 🏡",
      date: "Home",
    },
    {
      id: 5,
      image: "/valentine/moment5.jpg",
      caption: "You're the reason I believe in love 💫",
      date: "Believe",
    },
    {
      id: 6,
      image: "/valentine/moment6.jpg",
      caption: "Forever grateful for your love 🙏",
      date: "Grateful",
    },
  ] as ValentineMemory[],

  // Love notes to reveal
  loveNotes: [
    {
      id: 1,
      message: "You are my sunshine on cloudy days ☀️",
      revealed: false,
    },
    {
      id: 2,
      message: "Your love makes me a better person 💝",
      revealed: false,
    },
    {
      id: 3,
      message: "I fall in love with you more each day 💕",
      revealed: false,
    },
    { id: 4, message: "You complete me in every way 🧩", revealed: false },
    { id: 5, message: "My heart belongs to you forever ❤️", revealed: false },
    { id: 6, message: "You're my dream come true ✨", revealed: false },
    { id: 7, message: "Thank you for choosing me 💖", revealed: false },
    {
      id: 8,
      message: "I love you more than words can express 💌",
      revealed: false,
    },
  ] as LoveNote[],

  // Reasons I love you
  reasonsILoveYou: [
    { id: 1, reason: "Your beautiful soul that shines so bright", icon: "✨" },
    { id: 2, reason: "The way you make me laugh every single day", icon: "😄" },
    { id: 3, reason: "Your kindness and compassion for others", icon: "💝" },
    { id: 4, reason: "How you understand me without words", icon: "🫶" },
    { id: 5, reason: "Your strength and courage inspire me", icon: "💪" },
    { id: 6, reason: "The way you make ordinary moments magical", icon: "🌟" },
    { id: 7, reason: "Your love that makes me feel complete", icon: "❤️" },
    { id: 8, reason: "Everything about you, from head to toe", icon: "💕" },
  ],

  // Love letter
  loveLetter: {
    title: "A Love Letter For You",
    paragraphs: [
      "My Dearest Valentine,",
      "Words cannot fully express how much you mean to me. You are the love of my life, my best friend, my everything. Every moment with you is a precious gift that I treasure deeply.",
      "Your love has transformed my world in the most beautiful ways. You've shown me what it means to truly love and be loved. With you, I've discovered a happiness I never knew existed.",
      "On this Valentine's Day, I want you to know that my love for you grows stronger with each passing day. You are my today and all of my tomorrows. You are my forever.",
      "Thank you for being you, for loving me, for choosing me. You make every day feel like Valentine's Day, and I am so incredibly grateful to have you in my life.",
      "I love you more than all the stars in the sky, more than all the grains of sand on the beach, more than words could ever say.",
      "Forever and always,",
      "Your Valentine 💕",
    ],
  },

  // Final message
  finalMessage: {
    title: "Be My Valentine? 💝",
    subtitle: "Today, tomorrow, and forever",
    easterEgg: "You found it! 🎁 You're my forever Valentine ❤️",
  },

  // Music
  music: {
    url: "/valentine/love-song.mp3",
    title: "Our Love Song",
  },
};
