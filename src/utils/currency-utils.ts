// src/utils/currency-utils.ts
export type Locale = 'pt-PT' | 'en-GB' | 'en-US';
export type CurrencyCode = 'EUR' | 'GBP' | 'USD';

interface CurrencyConfig {
  symbol: string;
  code: CurrencyCode;
  position: 'prefix' | 'suffix';
}

const currencyMap: Record<Locale, CurrencyConfig> = {
  'pt-PT': { symbol: '€', code: 'EUR', position: 'suffix' },
  'en-GB': { symbol: '£', code: 'GBP', position: 'prefix' },
  'en-US': { symbol: '$', code: 'USD', position: 'prefix' }
};

export const formatCurrency = (amount: number, locale: Locale = 'pt-PT'): string => {
  const config = currencyMap[locale];
  
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
  
  return formattedAmount;
};

// Detect user's locale and map to our supported locales
export const detectLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'pt-PT'; // Default for SSR
  
  const browserLocale = navigator.language;
  
  if (browserLocale.startsWith('pt')) return 'pt-PT';
  if (browserLocale.startsWith('en-GB')) return 'en-GB';
  return 'en-US'; // Default to US English for other English variants or unknown locales
};

// Convert prices between currencies (simplified conversion for demo)
export const convertCurrency = (
  amount: number, 
  fromLocale: Locale, 
  toLocale: Locale
): number => {
  // Example conversion rates (in real app, you'd fetch these from an API)
  const rates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
    'EUR': { 'EUR': 1, 'GBP': 0.85, 'USD': 1.1 },
    'GBP': { 'EUR': 1.18, 'GBP': 1, 'USD': 1.3 },
    'USD': { 'EUR': 0.91, 'GBP': 0.77, 'USD': 1 }
  };
  
  const fromCurrency = currencyMap[fromLocale].code;
  const toCurrency = currencyMap[toLocale].code;
  
  return Math.round(amount * rates[fromCurrency][toCurrency]);
};