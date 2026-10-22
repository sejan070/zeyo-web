export interface PortfolioItem {
  id: string;
  title: string;
  titleBn: string;
  category: "wedding" | "birthday" | "corporate" | "stage" | "murals";
  categoryLabel: string;
  categoryLabelBn: string;
  venue: string;
  venueBn: string;
  image: string;
  aspect: "landscape" | "portrait";
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Traditional Haldi Umbrella Canopy & Floral Seat",
    titleBn: "ট্র্যাডিশনাল হলুদ আমব্রেলা ক্যানোপি ও সিটিং",
    category: "wedding",
    categoryLabel: "Holud / Haldi",
    categoryLabelBn: "হলুদ ও মেহেন্দি",
    venue: "Hotel Nice International, Rajshahi",
    venueBn: "হোটেল নাইস ইন্টারন্যাশনাল, রাজশাহী",
    image: "/client-media/user-refs/haldi-umbrella-canopy.jpg",
    aspect: "portrait"
  },
  {
    id: "p2",
    title: "Traditional Gaye Holud Stage & Floral Backdrop",
    titleBn: "ঐতিহ্যবাহী গায়ে হলুদ স্টেজ ও ফ্লোরাল ব্যাকড্রপ",
    category: "wedding",
    categoryLabel: "Gaye Holud",
    categoryLabelBn: "গায়ে হলুদ",
    venue: "Parjatan Motel, Rajshahi",
    venueBn: "পর্যটন মোটেল, রাজশাহী",
    image: "/client-media/user-refs/holud-traditional-stage.jpg",
    aspect: "portrait"
  },
  {
    id: "p3",
    title: "Luxury Neon & Gold Birthday Artistry",
    titleBn: "লাক্সারি নিয়ন ও গোল্ড বার্থডে আর্ট",
    category: "birthday",
    categoryLabel: "Milestone Birthday",
    categoryLabelBn: "বার্থডে সেলিব্রেশন",
    venue: "Private Residence, Padma R/A",
    venueBn: "পদ্মা আ/এ, রাজশাহী",
    image: "/client-media/user-refs/birthday-neon-gold.jpg",
    aspect: "portrait"
  },
  {
    id: "p4",
    title: "Grand Corporate Gala & Conference Stage",
    titleBn: "গ্র্যান্ড কর্পোরেট গালা ও এক্সক্লুসিভ স্টেজ প্রোডাকশন",
    category: "corporate",
    categoryLabel: "Corporate Gala",
    categoryLabelBn: "কর্পোরেট গালা",
    venue: "Rajshahi Ballroom & Convention Hall",
    venueBn: "রাজশাহী বলরুম ও কনভেনশন হল",
    image: "/client-media/corporate-gala.jpg",
    aspect: "landscape"
  },
  {
    id: "p5",
    title: "Royal White & Gold Floral Wedding Stage",
    titleBn: "রয়্যাল হোয়াইট ও গোল্ড ফ্লোরাল ওয়েডিং স্টেজ",
    category: "wedding",
    categoryLabel: "Wedding Stage",
    categoryLabelBn: "ওয়েডিং স্টেজ",
    venue: "Rajshahi Club Main Lawn",
    venueBn: "রাজশাহী ক্লাব মেইন লন",
    image: "/client-media/upscaled/wedding-decor.jpg",
    aspect: "landscape"
  },
  {
    id: "p6",
    title: "Classic Navy & White Milestone Balloon Arch",
    titleBn: "ক্লাসিক নেভি ও হোয়াইট বেলুন আর্চ বার্থডে",
    category: "birthday",
    categoryLabel: "Birthday Decor",
    categoryLabelBn: "বার্থডে ডেকোর",
    venue: "Padma Riverside Terrace",
    venueBn: "পদ্মা রিভারসাইড টেরেস",
    image: "/client-media/user-refs/birthday-navy-white.jpg",
    aspect: "landscape"
  },
  {
    id: "p7",
    title: "Thematic Birthday Stage & Pastel Backdrops",
    titleBn: "থিম্যাটিক বার্থডে স্টেজ ও পেস্টেল ব্যাকড্রপ",
    category: "birthday",
    categoryLabel: "Kids Birthday",
    categoryLabelBn: "কিডস বার্থডে",
    venue: "Hotel Warisan, Rajshahi",
    venueBn: "হোটেল ওয়ারিসান, রাজশাহী",
    image: "/client-media/upscaled/birthday-decor.jpg",
    aspect: "portrait"
  },
  {
    id: "p8",
    title: "Bespoke Interior Floral Styling & Centerpieces",
    titleBn: "কাস্টম ইন্টেরিয়র ফ্লোরাল স্টাইলিং ও টেবিলস্কেপ",
    category: "wedding",
    categoryLabel: "Decor Studio",
    categoryLabelBn: "ডেকোর স্টুডিও",
    venue: "Private Banquet Lounge, Rajshahi",
    venueBn: "প্রাইভেট ব্যাঙ্কোয়েট লাউঞ্জ, রাজশাহী",
    image: "/client-media/upscaled/decor.jpg",
    aspect: "portrait"
  },
  {
    id: "p9",
    title: "Traditional Marigold Canopy & Authentic Urns",
    titleBn: "ঐতিহ্যবাহী গাঁদা ফুলের ক্যানোপি ও ব্রাস আর্ট",
    category: "wedding",
    categoryLabel: "Gaye Holud",
    categoryLabelBn: "গায়ে হলুদ",
    venue: "Rajshahi Club Lawn",
    venueBn: "রাজশাহী ক্লাব লন",
    image: "/client-media/upscaled/imgi_21_795629294_122114776257437849_7729690257411184586_n.jpg",
    aspect: "portrait"
  },
  {
    id: "p10",
    title: "Bespoke Entry Tunnel & Warm Fairy Lighting",
    titleBn: "এক্সক্লুসিভ এন্ট্রি টানেল ও ওয়ার্ম ফেয়ারি লাইটিং",
    category: "stage",
    categoryLabel: "Lighting & Tunnel",
    categoryLabelBn: "লাইটিং ও টানেল",
    venue: "Grand Riverview Convention Hall",
    venueBn: "গ্র্যান্ড রিভারভিউ কনভেনশন হল",
    image: "/client-media/upscaled/imgi_14_825336764_122116745127437849_6472344480761876682_n.jpg",
    aspect: "portrait"
  },
  {
    id: "p11",
    title: "Velvet Diwan & Royal Chandelier Ambience",
    titleBn: "ভেলভেট দেওয়ান ও রয়্যাল শ্যান্ডেলিয়ার অ্যাম্বিয়েন্স",
    category: "wedding",
    categoryLabel: "Wedding Stage",
    categoryLabelBn: "ওয়েডিং স্টেজ",
    venue: "Hotel Nice International",
    venueBn: "হোটেল নাইস ইন্টারন্যাশনাল",
    image: "/client-media/upscaled/imgi_15_825336533_122116745079437849_4201748825814759467_n.jpg",
    aspect: "portrait"
  },
  {
    id: "p12",
    title: "Custom Artistic Wall Mural & Hand-Painting",
    titleBn: "কাস্টম হ্যান্ডপেইন্টেড ওয়াল মিউরাল",
    category: "murals",
    categoryLabel: "Wall Murals",
    categoryLabelBn: "ওয়াল মিউরাল",
    venue: "Zeyo Studio Showcase",
    venueBn: "জেয়ো স্টুডিও প্রদর্শনী",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    aspect: "portrait"
  },
  {
    id: "p13",
    title: "Architectural Beam Lighting & Concert Truss",
    titleBn: "আর্কিটেকচারাল বিম লাইটিং ও কনসার্ট ট্রাস",
    category: "stage",
    categoryLabel: "Lighting & Sound",
    categoryLabelBn: "লাইটিং ও সাউন্ড",
    venue: "Rajshahi University Open Stage",
    venueBn: "রাজশাহী বিশ্ববিদ্যালয় মুক্তমঞ্চ",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape"
  },
  {
    id: "p14",
    title: "Intimate Home Mehendi & Bohemian Lounge",
    titleBn: "হোম মেহেন্দি ও বোহেমিয়ান ড্র্যাপারি লাউঞ্জ",
    category: "wedding",
    categoryLabel: "Home Decor",
    categoryLabelBn: "হোম ডেকোর",
    venue: "Upashahar Private Residence, Rajshahi",
    venueBn: "উপশহর প্রাইভেট রেসিডেন্স, রাজশাহী",
    image: "/client-media/upscaled/home-decor.jpg",
    aspect: "portrait"
  },
  {
    id: "p15",
    title: "Thematic Ceiling Drapery & Crystal Illumination",
    titleBn: "সিলিং ড্র্যাপারি ও ক্রিস্টাল ড্রপ লাইটিং",
    category: "stage",
    categoryLabel: "Stage Craft",
    categoryLabelBn: "স্টেজ ক্রাফট",
    venue: "Grand Ballroom, Rajshahi",
    venueBn: "গ্র্যান্ড বলরুম, রাজশাহী",
    image: "/client-media/upscaled/imgi_24_797745178_122114776161437849_4595084754861147687_n.jpg",
    aspect: "portrait"
  },
  {
    id: "p16",
    title: "Royal Floral Cascade & Golden Archway",
    titleBn: "রয়্যাল ফ্লোরাল ক্যাসকেড ও গোল্ডেন আর্চ",
    category: "wedding",
    categoryLabel: "Wedding Stage",
    categoryLabelBn: "ওয়েডিং স্টেজ",
    venue: "Rajshahi Club Lawn",
    venueBn: "রাজশাহী ক্লাব লন",
    image: "/client-media/upscaled/imgi_12_825267851_122116745229437849_3075798966330282325_n.jpg",
    aspect: "portrait"
  }
];
