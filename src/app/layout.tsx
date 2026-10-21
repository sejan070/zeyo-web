import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import BrandIntro from "@/components/layout/BrandIntro";

export const viewport: Viewport = {
  themeColor: "#071426",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Zeyo | Dream. Create. Celebrate — Event Management & Luxury Decoration in Rajshahi",
  description:
    "Zeyo is Rajshahi's premier event management and luxury stage decoration company. Specializing in bespoke wedding stages, holud ceremonies, thematic birthday setups, neon decor, and corporate productions. Based in Alokar Mor, Rajshahi.",
  keywords: [
    "event management Rajshahi",
    "wedding decoration Rajshahi",
    "birthday decoration Rajshahi",
    "stage decoration Rajshahi",
    "event planner Rajshahi",
    "corporate event management Rajshahi",
    "রাজশাহী ইভেন্ট ম্যানেজমেন্ট",
    "রাজশাহী বিয়ের ডেকোরেশন",
    "রাজশাহী বার্থডে ডেকোরেশন"
  ],
  authors: [{ name: "Zeyo Event Management" }],
  creator: "Zeyo",
  publisher: "Zeyo",
  metadataBase: new URL("https://zeyo.com.bd"),
  openGraph: {
    title: "Zeyo — Dream. Create. Celebrate | Luxury Event Management Rajshahi",
    description:
      "Transforming weddings, birthdays, and corporate celebrations into extraordinary experiences in Rajshahi and across North Bengal.",
    url: "https://zeyo.com.bd",
    siteName: "Zeyo Event Management",
    locale: "en_BD",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeyo | Luxury Event Management Rajshahi",
    description: "Dream. Create. Celebrate. Weddings, birthdays, and corporate events in Rajshahi."
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans-luxury bg-[#FAF6F0] text-[#1A1A1A] antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventVenue",
              name: "Zeyo Event Management",
              image: "https://zeyo.com.bd/og-image.jpg",
              "@id": "https://zeyo.com.bd",
              url: "https://zeyo.com.bd",
              telephone: "+8801743543346",
              priceRange: "৳৳৳",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Lift 04, NRB bank office, New Market Road, Alokar Mor",
                addressLocality: "Rajshahi",
                postalCode: "6000",
                addressCountry: "BD"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 24.3636,
                longitude: 88.6241
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                opens: "10:00",
                closes: "20:00"
              },
              sameAs: [
                "https://facebook.com/zeyo.com.bd",
                "https://instagram.com/zeyo_099"
              ]
            })
          }}
        />
        <LanguageProvider>
          <BrandIntro />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
