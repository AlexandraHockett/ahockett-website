// src/components/ui/LocaleSwitcher.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { Locale } from "@/utils/currency-utils";

const localeOptions: Array<{ value: Locale; label: string; flag: string }> = [
  { value: "pt-PT", label: "EUR", flag: "🇵🇹" },
  { value: "en-GB", label: "GBP", flag: "🇬🇧" },
  { value: "en-US", label: "USD", flag: "🇺🇸" },
];

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full p-1">
      {localeOptions.map((option) => (
        <motion.button
          key={option.value}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            locale === option.value
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocale(option.value)}
        >
          <span className="mr-1">{option.flag}</span>
          <span>{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
