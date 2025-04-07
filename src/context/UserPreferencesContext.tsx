
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AUD';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Hindi' | 'Japanese';

interface UserPreferences {
  currency: Currency;
  language: Language;
  userName: string;
  userAvatar: string;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  setUserName: (name: string) => void;
  setUserAvatar: (avatar: string) => void;
  formatPrice: (amount: number) => string;
}

const UserPreferencesContext = createContext<UserPreferences | undefined>(undefined);

export const currencySymbols: Record<Currency, string> = {
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

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('user-name') || 'Voyager';
  });

  const [userAvatar, setUserAvatarState] = useState<string>(() => {
    return localStorage.getItem('user-avatar') || 'https://github.com/shadcn.png';
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('user-currency', currency);
    document.documentElement.setAttribute('data-currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('user-language', language);
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('user-name', userName);
    }
  }, [userName]);

  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem('user-avatar', userAvatar);
    }
  }, [userAvatar]);

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

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const setUserAvatar = (avatar: string) => {
    setUserAvatarState(avatar);
  };

  return (
    <UserPreferencesContext.Provider 
      value={{ 
        currency, 
        language, 
        userName,
        userAvatar,
        setCurrency, 
        setLanguage,
        setUserName,
        setUserAvatar,
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
