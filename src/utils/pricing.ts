// src/utils/pricing.ts
import { Locale, formatCurrency, convertCurrency } from "./currency-utils";

// Purchasing Power Parity (PPP) adjustment factors
// These are rough estimates and should be periodically updated
const PPP_FACTORS: Record<Locale, number> = {
  "pt-PT": 1.0, // Base reference (Portugal)
  "en-GB": 1.2, // UK typically has higher living costs
  "en-US": 1.4, // US often has higher service prices
};

export interface PricingTier {
  name: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

export interface AddonOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

// Base prices always in EUR (Portuguese reference point)
export const websiteTiers: PricingTier[] = [
  {
    name: "Basic",
    basePrice: 2000, // EUR base price
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
    basePrice: 5000, // EUR base price
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
    basePrice: 8000, // EUR base price
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
    basePrice: 150, // EUR per month
    description: "Monthly updates, security, and technical support",
  },
  {
    id: "seo",
    name: "Advanced SEO Package",
    basePrice: 1200, // EUR
    description: "Keyword research, optimization, and monitoring",
  },
  {
    id: "content",
    name: "Content Creation",
    basePrice: 800, // EUR
    description: "Professional copywriting and media creation",
  },
  {
    id: "hosting",
    name: "Premium Hosting",
    basePrice: 250, // EUR per year
    description: "High-performance, secure hosting for 1 year",
  },
];

// Adjust price based on locale's purchasing power
export const adjustPriceForLocale = (
  basePrice: number,
  locale: Locale = "pt-PT"
): number => {
  // Get the PPP factor for the locale (default to Portuguese if not found)
  const pppFactor = PPP_FACTORS[locale] || 1.0;

  // Adjust the base price
  return Math.round(basePrice * pppFactor);
};

// Get pricing in the user's locale with PPP adjustment
export const getPricingInLocale = (
  locale: Locale = "pt-PT"
): { tiers: PricingTier[]; addons: AddonOption[] } => {
  // Adjust prices for the specific locale
  const adjustedTiers = websiteTiers.map((tier) => ({
    ...tier,
    basePrice: adjustPriceForLocale(tier.basePrice, locale),
  }));

  const adjustedAddons = addonOptions.map((addon) => ({
    ...addon,
    basePrice: adjustPriceForLocale(addon.basePrice, locale),
  }));

  return { tiers: adjustedTiers, addons: adjustedAddons };
};

// Calculate total based on selections
export const calculateQuote = (
  tier: PricingTier,
  addons: AddonOption[]
): number => {
  const basePrice = tier.basePrice;
  const addonTotal = addons.reduce((sum, addon) => sum + addon.basePrice, 0);
  return basePrice + addonTotal;
};

// Format price with currency for display
export const formatPrice = (
  price: number,
  locale: Locale = "pt-PT"
): string => {
  // First adjust price for locale, then format
  const adjustedPrice = adjustPriceForLocale(price, locale);
  return formatCurrency(adjustedPrice, locale);
};

// Estimates based on features
export const estimateByFeatures = (
  pageCount: number,
  hasAnimations: boolean,
  hasEcommerce: boolean,
  hasCms: boolean,
  locale: Locale = "pt-PT"
): string => {
  let estimate = 1000; // Base price

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

  // Adjust for locale's purchasing power
  estimate = adjustPriceForLocale(estimate, locale);

  return formatCurrency(estimate, locale);
};
