
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AUD';
type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Hindi' | 'Japanese';

interface UserPreferences {
  currency: Currency;
  language: Language;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  formatPrice: (amount: number) => string;
}

const UserPreferencesContext = createContext<UserPreferences | undefined>(undefined);

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
};

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  // Try to load from localStorage or use defaults
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('user-currency');
    return (saved as Currency) || 'USD';
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('user-language');
    return (saved as Language) || 'English';
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('user-currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('user-language', language);
  }, [language]);

  // Format price based on selected currency
  const formatPrice = (amount: number): string => {
    const exchangeRates: Record<Currency, number> = {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      INR: 83.17,
      JPY: 151.76,
      AUD: 1.50,
    };
    
    const convertedAmount = amount * exchangeRates[currency];
    
    // Format the number based on the currency
    // For JPY, no decimal places
    if (currency === 'JPY') {
      return `${currencySymbols[currency]}${Math.round(convertedAmount).toLocaleString()}`;
    }
    
    // For INR, use Indian number formatting
    if (currency === 'INR') {
      return `${currencySymbols[currency]}${convertedAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
    
    // For other currencies, standard formatting with 2 decimal places
    return `${currencySymbols[currency]}${convertedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    toast.success(`Currency changed to ${newCurrency}`);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
  };

  return (
    <UserPreferencesContext.Provider 
      value={{ 
        currency, 
        language, 
        setCurrency, 
        setLanguage,
        formatPrice
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
