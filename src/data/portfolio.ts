export interface PortfolioItem {
  id: string;
  title: string;
  titleBn: string;
  category: "wedding" | "birthday" | "stage" | "murals";
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
    title: "Royal White & Gold Floral Wedding Stage",
    titleBn: "রয়্যাল হোয়াইট ও গোল্ড ফ্লোরাল ওয়েডিং স্টেজ",
    category: "wedding",
    categoryLabel: "Wedding Stage",
    categoryLabelBn: "ওয়েডিং স্টেজ",
    venue: "Rajshahi Club",
    venueBn: "রাজশাহী ক্লাব",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape"
  },
  {
    id: "p2",
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
    id: "p5",
    title: "Architectural Beam Lighting & DJ Production",
    titleBn: "আর্কিটেকচারাল বিম লাইটিং ও ডিজে প্রোডাকশন",
    category: "stage",
    categoryLabel: "Lighting & Sound",
    categoryLabelBn: "লাইটিং ও সাউন্ড",
    venue: "Grand Riverview Convention Hall",
    venueBn: "গ্র্যান্ড রিভারভিউ কনভেনশন হল",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape"
  },
  {
    id: "p6",
    title: "Custom Artistic Wall Mural & Hand-Painting",
    titleBn: "কাস্টম হ্যান্ডপেইন্টেড ওয়াল মিউরাল",
    category: "murals",
    categoryLabel: "Decor Studio",
    categoryLabelBn: "ডেকোর স্টুডিও",
    venue: "Zeyo Studio Showcase",
    venueBn: "জেয়ো স্টুডিও প্রদর্শনী",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    aspect: "portrait"
  },
  {
    id: "p7",
    title: "Imperial Banquet Reception Styling",
    titleBn: "ইম্পেরিয়াল ব্যাঙ্কোয়েট রিসেপশন স্টাইলিং",
    category: "wedding",
    categoryLabel: "Reception Gala",
    categoryLabelBn: "রিসেপশন গালা",
    venue: "Rajshahi Convention Center",
    venueBn: "রাজশাহী কনভেনশন সেন্টার",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape"
  },
  {
    id: "p8",
    title: "Classic Navy & White Milestone Balloon Arch",
    titleBn: "ক্লাসিক নেভি ও হোয়াইট বেলুন আর্চ বার্থডে",
    category: "birthday",
    categoryLabel: "Birthday Decor",
    categoryLabelBn: "বার্থডে ডেকোর",
    venue: "Padma Riverside Terrace",
    venueBn: "পদ্মা রিভারসাইড টেরেস",
    image: "/client-media/user-refs/birthday-navy-white.jpg",
    aspect: "landscape"
  }
];
