"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "@/data/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en;
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string | null) => void;
  portfolioFilter: string;
  setPortfolioFilter: (filter: string) => void;
  packageFilter: string;
  setPackageFilter: (filter: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState<string>("all");
  const [packageFilter, setPackageFilter] = useState<string>("all");

  useEffect(() => {
    const saved = localStorage.getItem("zeyo_locale") as Locale | null;
    if (saved === "en" || saved === "bn") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("zeyo_locale", newLocale);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        selectedPackage,
        setSelectedPackage,
        portfolioFilter,
        setPortfolioFilter,
        packageFilter,
        setPackageFilter
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
