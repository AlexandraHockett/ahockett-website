"use client";
// src/contexts/LocaleContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, detectLocale } from "@/utils/currency-utils";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "pt-PT",
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>("pt-PT");

  // Detect and set the user's locale on client side only
  useEffect(() => {
    const detectedLocale = detectLocale();
    setLocale(detectedLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
