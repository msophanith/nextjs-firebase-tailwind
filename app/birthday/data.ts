export interface Memory {
  id: number;
  image: string;
  caption: string;
  date?: string;
}

export interface HiddenMessage {
  id: number;
  message: string;
  revealed: boolean;
}

export const birthdayData = {
  // Her name and birthday
  name: "My Love",
  birthday: "2026-02-14", // Change this to her actual birthday (YYYY-MM-DD)

  // Hero section
  hero: {
    greeting: "Hey love… I made something for you 💕",
    subtitle: "A little journey through our moments together",
  },

  // Memories
  memories: [
    {
      id: 1,
      image: "/birthday/memory1.jpg",
      caption: "The day we first met... I knew you were special ✨",
      date: "Our Beginning",
    },
    {
      id: 2,
      image: "/birthday/memory2.jpg",
      caption: "Every laugh with you feels like magic 🌟",
      date: "Pure Joy",
    },
    {
      id: 3,
      image: "/birthday/memory3.jpg",
      caption: "Adventures are better with you by my side 🗺️",
      date: "Together",
    },
    {
      id: 4,
      image: "/birthday/memory4.jpg",
      caption: "You make ordinary moments extraordinary 💫",
      date: "Every Day",
    },
    {
      id: 5,
      image: "/birthday/memory5.jpg",
      caption: "Dancing through life with you is my favorite thing 💃",
      date: "Our Dance",
    },
    {
      id: 6,
      image: "/birthday/memory6.jpg",
      caption: "Thank you for being my person 💝",
      date: "Forever Grateful",
    },
  ] as Memory[],

  // Hidden messages to reveal
  hiddenMessages: [
    {
      id: 1,
      message: "You light up my world like nobody else ✨",
      revealed: false,
    },
    { id: 2, message: "Your smile is my favorite view 😊", revealed: false },
    {
      id: 3,
      message: "Every moment with you is a treasure 💎",
      revealed: false,
    },
    { id: 4, message: "You make my heart skip a beat 💓", revealed: false },
    {
      id: 5,
      message: "I'm so lucky to have you in my life 🍀",
      revealed: false,
    },
    {
      id: 6,
      message: "You're my favorite person in the whole world 🌍",
      revealed: false,
    },
    { id: 7, message: "Thank you for being you 💕", revealed: false },
    {
      id: 8,
      message: "Here's to many more adventures together 🎉",
      revealed: false,
    },
  ] as HiddenMessage[],

  // Love letter
  loveLetter: {
    title: "A Letter Just For You",
    paragraphs: [
      "My dearest love,",
      "As I sit here thinking about all the moments we've shared, I can't help but smile. You've brought so much joy, laughter, and light into my life.",
      "Every day with you is a gift. Your kindness, your warmth, your beautiful soul - they inspire me to be better. You see the world in such a magical way, and being with you makes me see it that way too.",
      "On this special day, I want you to know how deeply you're loved. Not just today, but every single day. You deserve all the happiness in the world, and I promise to do everything I can to make you smile.",
      "Happy Birthday, my love. Here's to another year of adventures, laughter, late-night talks, and making beautiful memories together.",
      "Forever yours,",
      "Your biggest fan 💕",
    ],
  },

  // Final message
  finalMessage: {
    title: "Happy Birthday My Love ❤️",
    subtitle: "Wishing you the most magical day filled with love and joy",
    easterEgg: "You found the secret! 🎁 I love you more than words can say ✨",
  },

  // Why I love you reasons
  whyILoveYou: [
    { id: 1, reason: "Your smile brightens even my darkest days", icon: "😊" },
    { id: 2, reason: "The way you care for everyone around you", icon: "🤗" },
    {
      id: 3,
      reason: "Your infectious laughter that fills the room",
      icon: "😄",
    },
    {
      id: 4,
      reason: "How you make me feel like the luckiest person alive",
      icon: "🍀",
    },
    { id: 5, reason: "Your kindness and beautiful heart", icon: "💝" },
    { id: 6, reason: "The way you understand me without words", icon: "🫶" },
    { id: 7, reason: "Your strength and courage inspire me daily", icon: "💪" },
    { id: 8, reason: "How you make ordinary moments magical", icon: "✨" },
  ],

  // Music
  music: {
    url: "/birthday/birthday-song.mp3", // Add your music file here
    title: "Our Song",
  },
};
