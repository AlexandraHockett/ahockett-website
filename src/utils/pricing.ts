// src/utils/pricing.ts
import { Locale, formatCurrency, convertCurrency } from "./currency-utils";

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Base prices in EUR (Portuguese)
export const websiteTiers: PricingTier[] = [
  {
    name: "Basic",
    price: 2000, // EUR
    features: [
      "5-page responsive website",
      "Mobile-friendly design",
      "Contact form",
      "Social media integration",
      "Basic SEO setup",
    ],
  },
  {
    name: "Premium",
    price: 5000, // EUR
    features: [
      "8-10 page responsive website",
      "Custom animations (GSAP/Framer Motion)",
      "Interactive UI elements",
      "Advanced contact forms",
      "SEO optimization",
      "Basic content management",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: 8000, // EUR
    features: [
      "Custom website architecture",
      "Advanced animations & interactions",
      "Full-featured CMS",
      "E-commerce capabilities",
      "API integrations",
      "Performance optimization",
      "Comprehensive SEO strategy",
    ],
  },
];

export const addonOptions: AddonOption[] = [
  {
    id: "maintenance",
    name: "Website Maintenance",
    price: 150, // EUR per month
    description: "Monthly updates, security, and technical support",
  },
  {
    id: "seo",
    name: "Advanced SEO Package",
    price: 1200, // EUR
    description: "Keyword research, optimization, and monitoring",
  },
  {
    id: "content",
    name: "Content Creation",
    price: 800, // EUR
    description: "Professional copywriting and media creation",
  },
  {
    id: "hosting",
    name: "Premium Hosting",
    price: 250, // EUR per year
    description: "High-performance, secure hosting for 1 year",
  },
];

// Get pricing in the user's locale
export const getPricingInLocale = (
  locale: Locale = "pt-PT"
): { tiers: PricingTier[]; addons: AddonOption[] } => {
  // If it's already EUR, no conversion needed
  if (locale === "pt-PT") {
    return { tiers: websiteTiers, addons: addonOptions };
  }

  // Convert prices to the target locale
  const convertedTiers = websiteTiers.map((tier) => ({
    ...tier,
    price: convertCurrency(tier.price, "pt-PT", locale),
  }));

  const convertedAddons = addonOptions.map((addon) => ({
    ...addon,
    price: convertCurrency(addon.price, "pt-PT", locale),
  }));

  return { tiers: convertedTiers, addons: convertedAddons };
};

// Calculate total based on selections
export const calculateQuote = (
  tier: PricingTier,
  addons: AddonOption[]
): number => {
  const basePrice = tier.price;
  const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  return basePrice + addonTotal;
};

// Format price with currency for display
export const formatPrice = (
  price: number,
  locale: Locale = "pt-PT"
): string => {
  return formatCurrency(price, locale);
};

// Estimates based on features
export const estimateByFeatures = (
  pageCount: number,
  hasAnimations: boolean,
  hasEcommerce: boolean,
  hasCms: boolean,
  locale: Locale = "pt-PT"
): string => {
  let estimate = 1000; // Base price in EUR

  // Add based on page count
  if (pageCount <= 5) {
    estimate += 1000;
  } else if (pageCount <= 10) {
    estimate += 2000;
  } else {
    estimate += 3000;
  }

  // Add for features
  if (hasAnimations) estimate += 1500;
  if (hasEcommerce) estimate += 2000;
  if (hasCms) estimate += 1000;

  // Convert if needed and format
  if (locale !== "pt-PT") {
    estimate = convertCurrency(estimate, "pt-PT", locale);
  }

  return formatCurrency(estimate, locale);
};
