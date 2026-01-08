"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "kh";

interface Translations {
  welcome: {
    invite: string;
    celebration: string;
    open: string;
    date: string;
  };
  hero: {
    gettingMarried: string;
    date: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    date: string;
  };
  intro: {
    title: string;
    quote: string;
    together: string;
    groomParents: string;
    brideParents: string;
    request: string;
    groom: string;
    bride: string;
  };
  loveStory: {
    title: string;
    subtitle: string;
    firstMet: {
      title: string;
      date: string;
      description: string;
    };
    firstDate: {
      title: string;
      date: string;
      description: string;
    };
    proposal: {
      title: string;
      date: string;
      description: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  events: {
    title: string;
    morning: {
      title: string;
      subtitle: string;
      item1: { time: string; title: string; desc: string };
      item2: { time: string; title: string; desc: string };
      item3: { time: string; title: string; desc: string };
      item4: { time: string; title: string; desc: string };
      item5: { time: string; title: string; desc: string };
    };
    evening: {
      title: string;
      subtitle: string;
      item1: { time: string; desc: string };
      item2: { time: string; desc: string };
      location: { title: string; name: string; detail: string };
      quote: string;
    };
  };
  party: {
    title: string;
    subtitle: string;
    groomsmen: string;
    bestMan: string;
    groomsman: string;
    bridesmaids: string;
    maidOfHonor: string;
    bridesmaid: string;
  };
  dressCode: {
    title: string;
    morning: {
      title: string;
      subtitle: string;
      colors: { gold: string; cream: string; rose: string };
      desc: string;
    };
    evening: {
      title: string;
      subtitle: string;
      colors: { burgundy: string; black: string; silver: string };
      desc: string;
    };
  };
  location: {
    title: string;
    button: string;
  };
  gift: {
    title: string;
    desc: string;
    thanks: string;
    thanksSubtitle: string;
    bank: string;
    accountName: string;
    shareButton: string;
    shareToast: string;
  };
  footer: {
    thanks: string;
  };
  music: {
    unavailable: string;
  };
  common: {
    loading: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    welcome: {
      invite: "We are pleased to invite",
      celebration: "To our wedding celebration",
      open: "Open Invitation",
      date: "November 12, 2026",
    },
    hero: {
      gettingMarried: "We Are Getting Married",
      date: "NOVEMBER 12, 2026",
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      date: "November 12, 2026",
    },
    intro: {
      title: "Celebrate Our Love",
      quote:
        '"Love is not just looking at each other, it\'s looking in the same direction."',
      together: "Together with our families",
      groomParents: "Groom's Parents",
      brideParents: "Bride's Parents",
      request:
        "Joyfully request the honor of your presence at the marriage of their children",
      groom: "The Groom",
      bride: "The Bride",
    },
    loveStory: {
      title: "Our Love Story",
      subtitle: "How we got here",
      firstMet: {
        title: "First Met",
        date: "December 2020",
        description:
          'We met at a coffee shop in Phnom Penh. It started with a simple "Hello" and turned into hours of conversation.',
      },
      firstDate: {
        title: "First Date",
        date: "February 2021",
        description:
          "Our first official date was a dinner cruise on the Mekong. The sunset was beautiful, but not as beautiful as the connection we felt.",
      },
      proposal: {
        title: "The Proposal",
        date: "November 2025",
        description:
          'Under the stars in Siem Reap, Sokha got down on one knee. It was the easiest "Yes" of Devi\'s life.',
      },
    },
    gallery: {
      title: "Our Sweet Moments",
      subtitle: "Capturing our journey of love",
    },
    events: {
      title: "Wedding Timeline",
      morning: {
        title: "Morning Ceremony",
        subtitle: "Pithi Hae Chamnan",
        item1: {
          time: "07:00 AM",
          title: "Groom's Procession (Hae Chamnan)",
          desc: "The groom and his family parade to the bride's house bearing gifts.",
        },
        item2: {
          time: "08:00 AM",
          title: "Ring Exchange & Sien Doan Taa",
          desc: "Paying respect to ancestors and exchanging rings.",
        },
        item3: {
          time: "09:00 AM",
          title: "Hair Cutting Ceremony (Gaat Sah)",
          desc: "Symbolizing a fresh start for the couple.",
        },
        item4: {
          time: "10:00 AM",
          title: "Monk Blessing (Soat Mun)",
          desc: "Receiving blessings from the monks.",
        },
        item5: {
          time: "11:00 AM",
          title: "Knot Tying Ceremony (Jong Dai)",
          desc: "Family and friends tie red strings around the couple's wrists.",
        },
      },
      evening: {
        title: "Evening Reception",
        subtitle: "Wedding Banquet",
        item1: { time: "05:00 PM", desc: "Guest Arrival & Welcome Photos" },
        item2: { time: "06:30 PM", desc: "Dinner & Live Music" },
        location: {
          title: "Location",
          name: "The Premier Center Sen Sok",
          detail: "Building A, Grand Ballroom",
        },
        quote: '"Please join us for a night of celebration"',
      },
    },
    party: {
      title: "The Wedding Party",
      subtitle: "The people who stand beside us",
      groomsmen: "Groomsmen",
      bestMan: "Best Man",
      groomsman: "Groomsman",
      bridesmaids: "Bridesmaids",
      maidOfHonor: "Maid of Honor",
      bridesmaid: "Bridesmaid",
    },
    dressCode: {
      title: "Attire & Theme",
      morning: {
        title: "Morning Ceremony",
        subtitle: "Traditional Khmer",
        colors: { gold: "Gold", cream: "Cream", rose: "Rose" },
        desc: "Ladies are encouraged to wear traditional Khmer silk (Hol/Pamoung). Gentlemen may wear a traditional shirt or formal suit.",
      },
      evening: {
        title: "Evening Reception",
        subtitle: "Formal / Black Tie",
        colors: { burgundy: "Burgundy", black: "Black", silver: "Silver" },
        desc: "Evening gowns for ladies and suits or tuxedos for gentlemen. Let's celebrate in style!",
      },
    },
    location: {
      title: "Location",
      button: "Open in Google Maps",
    },
    gift: {
      title: "Gift of Love",
      desc: '"Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a monetary contribution to help us start our new life together would be greatly appreciated."',
      thanks: "Thank You",
      thanksSubtitle: "For your kindness and generosity",
      bank: "ABA Bank",
      accountName: "Account Name: Chan Sokha",
      shareButton: "Share Payment Details",
      shareToast: "Bank details copied to clipboard!",
    },
    footer: {
      thanks: "Thank you for being part of our journey",
    },
    music: {
      unavailable: "Audio unavailable",
    },
    common: {
      loading: "Loading Invitation...",
    },
  },
  kh: {
    welcome: {
      invite: "យើងខ្ញុំមានកិត្តិយសសូមអញ្ជើញ",
      celebration: "ចូលរួមក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ",
      open: "បើកសំបុត្រអញ្ជើញ",
      date: "ថ្ងៃទី ១២ ខែ វិច្ឆិកា ឆ្នាំ ២០២៦",
    },
    hero: {
      gettingMarried: "ពិធីមង្គលការ",
      date: "១២ វិច្ឆិកា ២០២៦",
    },
    countdown: {
      days: "ថ្ងៃ",
      hours: "ម៉ោង",
      minutes: "នាទី",
      seconds: "វិនាទី",
      date: "ថ្ងៃទី ១២ ខែ វិច្ឆិកា ឆ្នាំ ២០២៦",
    },
    intro: {
      title: "អបអរសាទរសេចក្តីស្រឡាញ់របស់យើង",
      quote:
        '"សេចក្តីស្រឡាញ់មិនមែនគ្រាន់តែជាការសម្លឹងមើលគ្នាទៅវិញទៅមកនោះទេ ប៉ុន្តែវាគឺជាការសម្លឹងមើលទៅក្នុងទិសដៅតែមួយ។"',
      together: "រួមជាមួយក្រុមគ្រួសាររបស់យើងទាំងសងខាង",
      groomParents: "មាតាបិតាខាងកូនប្រុស",
      brideParents: "មាតាបិតាខាងកូនស្រី",
      request:
        "សូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី ដើម្បីចូលរួមជាអធិបតី និងជាសាក្សីក្នុងពិធីមង្គលការនៃបុត្រាបុត្រីរបស់យើងខ្ញុំ",
      groom: "កូនប្រុស",
      bride: "កូនស្រី",
    },
    loveStory: {
      title: "រឿងរ៉ាវស្នេហារបស់យើង",
      subtitle: "ដំណើរដើមទងរបស់យើង",
      firstMet: {
        title: "ជួបគ្នាដំបូង",
        date: "ធ្នូ ២០២០",
        description:
          'យើងបានជួបគ្នានៅហាងកាហ្វេមួយក្នុងទីក្រុងភ្នំពេញ។ វាបានចាប់ផ្តើមដោយពាក្យ "សួស្តី" យ៉ាងសាមញ្ញ ហើយបានក្លាយជាការសន្ទនារាប់ម៉ោង។',
      },
      firstDate: {
        title: "ការណាត់ជួបដំបូង",
        date: "កុម្ភៈ ២០២១",
        description:
          "ការណាត់ជួបជាផ្លូវការលើកដំបូងរបស់យើងគឺការទទួលទានអាហារពេលល្ងាចនៅលើនាវាទេសចរណ៍តាមដងទន្លេមេគង្គ។ ថ្ងៃលិចពិតជាស្រស់ស្អាត ប៉ុន្តែមិនស្អាតដូចអារម្មណ៍ដែលយើងមានចំពោះគ្នានោះទេ។",
      },
      proposal: {
        title: "ការសុំរៀបការ",
        date: "វិច្ឆិកា ២០២៥",
        description:
          'នៅក្រោមពន្លឺផ្កាយក្នុងខេត្តសៀមរាប សុខា បានលុតជង្គង់សុំរៀបការ។ វាគឺជាពាក្យ "យល់ព្រម" ដែលងាយស្រួលបំផុតក្នុងជីវិតរបស់ ទេវី។',
      },
    },
    gallery: {
      title: "រូបភាពផ្អែមល្ហែមរបស់យើង",
      subtitle: "ការចងចាំនៃដំណើរជីវិតស្នេហារបស់យើង",
    },
    events: {
      title: "តារាងកម្មវិធី",
      morning: {
        title: "កម្មវិធីពេលព្រឹក",
        subtitle: "ពិធីហែជំនូន",
        item1: {
          time: "០៧:០០ ព្រឹក",
          title: "ពិធីហែជំនូន",
          desc: "កូនប្រុស និងក្រុមគ្រួសារហែជំនូនទៅកាន់ផ្ទះកូនស្រី។",
        },
        item2: {
          time: "០៨:០០ ព្រឹក",
          title: "ពិធីបំពាក់ចិញ្ចៀន និងសែនដូនតា",
          desc: "ការគោរពដឹងគុណដល់បុព្វការីជន និងការបំពាក់ចិញ្ចៀនអាពាហ៍ពិពាហ៍។",
        },
        item3: {
          time: "០៩:០០ ព្រឹក",
          title: "ពិធីកាត់សក់",
          desc: "ជានិមិត្តរូបនៃការចាប់ផ្តើមជីវិតថ្មីសម្រាប់គូស្វាមីភរិយា។",
        },
        item4: {
          time: "១០:០០ ព្រឹក",
          title: "ពិធីសូត្រមន្ត",
          desc: "ការទទួលពរជ័យពីព្រះសង្ឃ។",
        },
        item5: {
          time: "១១:០០ ព្រឹក",
          title: "ពិធីចងដៃ",
          desc: "សាច់ញាតិ និងមិត្តភក្តិចងអំបោះក្រហមលើកដៃគូស្វាមីភរិយាថ្មី។",
        },
      },
      evening: {
        title: "កម្មវិធីពិធីជប់លៀងពេលល្ងាច",
        subtitle: "អាហារសាមគ្គី",
        item1: {
          time: "០៥:០០ ល្ងាច",
          desc: "ការទទួលភ្ញៀវ និងថតរូបទុកជាអនុស្សាវរីយ៍",
        },
        item2: { time: "០៦:៣០ ល្ងាច", desc: "ពិធីជប់លៀង និងតន្ត្រីសម័យ" },
        location: {
          title: "ទីតាំង",
          name: "មជ្ឈមណ្ឌល ឌឹ ព្រីមៀ សែនសុខ",
          detail: "អាគារ A, សាលមហោស្រព",
        },
        quote: '"សូមអញ្ជើញចូលរួមអបអរសាទរក្នុងរាត្រីដ៏វិសេសវិសាលនេះ"',
      },
    },
    party: {
      title: "អ្នកកំដរ",
      subtitle: "អ្នកដែលនៅក្បែរយើងក្នុងថ្ងៃដ៏ពិសេស",
      groomsmen: "អ្នកកំដរខាងប្រុស",
      bestMan: "អ្នកកំដរឯក",
      groomsman: "អ្នកកំដរ",
      bridesmaids: "អ្នកកំដរខាងស្រី",
      maidOfHonor: "អ្នកកំដរឯក",
      bridesmaid: "អ្នកកំដរ",
    },
    dressCode: {
      title: "សម្លៀកបំពាក់ និងពណ៌",
      morning: {
        title: "កម្មវិធីពេលព្រឹក",
        subtitle: "សម្លៀកបំពាក់ប្រពៃណីខ្មែរ",
        colors: { gold: "ពណ៌មាស", cream: "ពណ៌គ្រីម", rose: "ពណ៌ផ្កាឈូក" },
        desc: "ភ្ញៀវកិត្តិយសខាងស្រីត្រូវបានលើកទឹកចិត្តឱ្យស្លៀកសម្លៀកបំពាក់ប្រពៃណីខ្មែរ (ហូល/ផាមួង)។ ភ្ញៀវកិត្តិយសខាងប្រុសអាចស្លៀកអាវប្រពៃណី ឬឈុតធំ។",
      },
      evening: {
        title: "កម្មវិធីពិធីជប់លៀងពេលល្ងាច",
        subtitle: "សម្លៀកបំពាក់សម័យ",
        colors: {
          burgundy: "ពណ៌ឈាមជ្រូក",
          black: "ពណ៌ខ្មៅ",
          silver: "ពណ៌ប្រាក់",
        },
        desc: "រ៉ូបវែងសម្រាប់ភ្ញៀវខាងស្រី និងឈុតធំសម្រាប់ភ្ញៀវខាងប្រុស។ សូមចូលរួមអបអរសាទរតាមស្ទីលរៀងៗខ្លួន!",
      },
    },
    location: {
      title: "ទីតាំង",
      button: "បើកក្នុង Google Maps",
    },
    gift: {
      title: "ចំណងដៃអាពាហ៍ពិពាហ៍",
      desc: '"វត្តមានរបស់លោកអ្នកក្នុងពិធីមង្គលការរបស់យើងគឺជាកាដូដ៏ធំបំផុត។ ទោះជាយ៉ាងណាក៏ដោយ ប្រសិនបើលោកអ្នកចង់ផ្តល់ជាចំណងដៃ ការរួមចំណែកជាថវិកាដើម្បីជួយយើងចាប់ផ្តើមជីវិតថ្មីជាមួយគ្នា នឹងត្រូវបានទទួលដោយការដឹងគុណយ៉ាងជ្រាលជ្រៅ។"',
      thanks: "សូមអរគុណ",
      thanksSubtitle: "ចំពោះទឹកចិត្ត និងសប្បុរសធម៌របស់អ្នក",
      bank: "ធនាគារ ABA",
      accountName: "ឈ្មោះគណនី: ចាន់ សុខា",
      shareButton: "ចែករំលែកព័ត៌មានបង់ប្រាក់",
      shareToast: "ព័ត៌មានធនាគារត្រូវបានចម្លង!",
    },
    footer: {
      thanks: "សូមអរគុណដែលបានក្លាយជាផ្នែកមួយនៃដំណើរជីវិតរបស់យើង",
    },
    music: {
      unavailable: "មិនអាចចាក់តន្ត្រីបាន",
    },
    common: {
      loading: "កំពុងផ្ទុកសំបុត្រអញ្ជើញ...",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("kh");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
