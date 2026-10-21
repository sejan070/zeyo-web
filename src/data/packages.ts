export interface EventPackage {
  id: string;
  name: string;
  nameBn: string;
  price: string;
  priceBn: string;
  rawPrice: number;
  tagline: string;
  taglineBn: string;
  badge?: string;
  badgeBn?: string;
  highlight?: boolean;
  tier: "intimate" | "celebration" | "grand" | "royal";
  inclusions: string[];
  inclusionsBn: string[];
}

export const eventPackages: EventPackage[] = [
  {
    id: "basic",
    name: "Basic",
    nameBn: "বেসিক",
    price: "৳ 5,000+",
    priceBn: "৳ ৫,০০০+",
    rawPrice: 5000,
    tagline: "Simple. Elegant. Memorable.",
    taglineBn: "সহজ। মার্জিত। স্মরণীয়।",
    tier: "intimate",
    inclusions: [
      "Event planning & coordination",
      "Basic decoration (setup)",
      "Sound system (without DJ)",
      "Lighting",
      "Photography (3 hour)",
      "On-ground support"
    ],
    inclusionsBn: [
      "ইভেন্ট প্ল্যানিং ও সমন্বয়",
      "বেসিক ডেকোরেশন (সেটআপ)",
      "সাউন্ড সিস্টেম (ডিজে ছাড়া)",
      "লাইটিং ব্যবস্থা",
      "ফটোগ্রাফি (৩ ঘণ্টা)",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  },
  {
    id: "medium",
    name: "Medium",
    nameBn: "মিডিয়াম",
    price: "৳ 20,000+",
    priceBn: "৳ ২০,০০০+",
    rawPrice: 20000,
    tagline: "More magic. More details.",
    taglineBn: "আরও জাদু। আরও সৌন্দর্য।",
    tier: "intimate",
    inclusions: [
      "Event planning & coordination",
      "Theme decoration",
      "Sound system (with DJ)",
      "Lighting",
      "Photography (3 hour)",
      "Basic stage setup",
      "On-ground support"
    ],
    inclusionsBn: [
      "ইভেন্ট প্ল্যানিং ও সমন্বয়",
      "থিম ডেকোরেশন",
      "সাউন্ড সিস্টেম (ডিজে সহ)",
      "লাইটিং ব্যবস্থা",
      "ফটোগ্রাফি (৩ ঘণ্টা)",
      "বেসিক স্টেজ সেটআপ",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    nameBn: "প্রিমিয়াম",
    price: "৳ 50,000+",
    priceBn: "৳ ৫০,০০০+",
    rawPrice: 50000,
    tagline: "A complete experience. Worry free.",
    taglineBn: "একটি সম্পূর্ণ অভিজ্ঞতা। নির্ভার উদযাপন।",
    badge: "Popular Choice",
    badgeBn: "জনপ্রিয় পছন্দ",
    highlight: true,
    tier: "celebration",
    inclusions: [
      "Full event planning & coordination",
      "Theme decoration (with custom design)",
      "Sound system (with DJ)",
      "Lighting & stage setup",
      "Photography",
      "Videography",
      "On-ground support"
    ],
    inclusionsBn: [
      "সম্পূর্ণ ইভেন্ট প্ল্যানিং ও সমন্বয়",
      "থিম ডেকোরেশন (কাস্টম ডিজাইন সহ)",
      "সাউন্ড সিস্টেম (ডিজে সহ)",
      "লাইটিং ও স্টেজ সেটআপ",
      "ফটোগ্রাফি",
      "ভিডিওগ্রাফি",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  },
  {
    id: "silver",
    name: "Silver",
    nameBn: "সিলভার",
    price: "৳ 1,00,000+",
    priceBn: "৳ ১,০০,০০০+",
    rawPrice: 100000,
    tagline: "Bigger setup. Greater impact.",
    taglineBn: "বড় সেটআপ। অনন্য আভিজাত্য।",
    tier: "celebration",
    inclusions: [
      "Full event planning & coordination",
      "Premium decoration & theme setup",
      "Sound system (with professional DJ)",
      "Lighting & stage setup",
      "Photography",
      "Videography",
      "LED screen / projection",
      "On-ground support"
    ],
    inclusionsBn: [
      "সম্পূর্ণ ইভেন্ট প্ল্যানিং ও সমন্বয়",
      "প্রিমিয়াম ডেকোরেশন ও থিম সেটআপ",
      "সাউন্ড সিস্টেম (প্রফেশনাল ডিজে সহ)",
      "লাইটিং ও স্টেজ সেটআপ",
      "ফটোগ্রাফি",
      "ভিডিওগ্রাফি",
      "এলইডি স্ক্রিন / প্রজেকশন",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    nameBn: "গোল্ড",
    price: "৳ 2,00,000+",
    priceBn: "৳ ২,০০,০০০+",
    rawPrice: 200000,
    tagline: "Luxury in every detail.",
    taglineBn: "প্রতিটি নিখুঁত অংশে আভিজাত্য।",
    badge: "Signature Luxury",
    badgeBn: "সিগনেচার লাক্সারি",
    highlight: true,
    tier: "grand",
    inclusions: [
      "Full event planning & coordination",
      "Luxury decoration & theme setup",
      "Sound system (with professional DJ)",
      "Lighting & stage setup",
      "Photography",
      "Videography",
      "LED screen / projection",
      "Special entry setup",
      "On-ground support"
    ],
    inclusionsBn: [
      "সম্পূর্ণ ইভেন্ট প্ল্যানিং ও সমন্বয়",
      "লাক্সারি ডেকোরেশন ও থিম সেটআপ",
      "সাউন্ড সিস্টেম (প্রফেশনাল ডিজে সহ)",
      "লাইটিং ও স্টেজ সেটআপ",
      "ফটোগ্রাফি",
      "ভিডিওগ্রাফি",
      "এলইডি স্ক্রিন / প্রজেকশন",
      "স্পেশাল এন্ট্রি সেটআপ",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  },
  {
    id: "platinum",
    name: "Platinum",
    nameBn: "প্লাটিনাম",
    price: "৳ 5,00,000+",
    priceBn: "৳ ৫,০০,০০০+",
    rawPrice: 500000,
    tagline: "A grand celebration. Beyond expectations.",
    taglineBn: "এক রাজকীয় মহোৎসব। প্রত্যাশার চেয়েও অনন্য।",
    badge: "Royal Grandeur",
    badgeBn: "রাজকীয় জমকালো",
    tier: "royal",
    inclusions: [
      "Complete event planning & execution",
      "Premium luxury decoration & theme",
      "Professional DJ & Live music option",
      "Advanced lighting & stage production",
      "Photography",
      "Cinematography",
      "LED screen / projection",
      "Guest experience setup (e.g. photo booth, etc.)",
      "On-ground support"
    ],
    inclusionsBn: [
      "সম্পূর্ণ ইভেন্ট প্ল্যানিং ও নিখুঁত এক্সিকিউশন",
      "প্রিমিয়াম লাক্সারি ডেকোরেশন ও থিম",
      "প্রফেশনাল ডিজে ও লাইভ মিউজিক অপশন",
      "উন্নত লাইটিং ও গ্র্যান্ড স্টেজ প্রোডাকশন",
      "ফটোগ্রাফি",
      "সিনেমাটোগ্রাফি",
      "এলইডি স্ক্রিন / প্রজেকশন",
      "গেস্ট এক্সপেরিয়েন্স সেটআপ (যেমন ফটোবুথ ইত্যাদি)",
      "অন-গ্রাউন্ড সাপোর্ট"
    ]
  }
];
