
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
  translate: (key: string) => string;
  initializeTranslations: () => void;
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

// Translation data for the supported languages
export const translations: Record<Language, Record<string, string>> = {
  English: {
    welcome: 'Welcome to Voyage Vista',
    search: 'Search destinations, hotels, experiences...',
    searching: 'Searching',
    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    visitor: 'Visitor',
    refunded: 'Refunded',
    today: 'today',
    mySchedule: 'My Schedule',
    popularRooms: 'Popular Rooms',
    settings: 'Settings',
    profile: 'Profile',
    preferences: 'Preferences',
    notifications: 'Notifications',
    security: 'Security',
    language: 'Language',
    currency: 'Currency',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    saveChanges: 'Save Changes'
  },
  Spanish: {
    welcome: 'Bienvenido a Voyage Vista',
    search: 'Buscar destinos, hoteles, experiencias...',
    searching: 'Buscando',
    totalSales: 'Ventas Totales',
    totalOrders: 'Pedidos Totales',
    visitor: 'Visitante',
    refunded: 'Reembolsado',
    today: 'hoy',
    mySchedule: 'Mi Horario',
    popularRooms: 'Habitaciones Populares',
    settings: 'Configuración',
    profile: 'Perfil',
    preferences: 'Preferencias',
    notifications: 'Notificaciones',
    security: 'Seguridad',
    language: 'Idioma',
    currency: 'Moneda',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    saveChanges: 'Guardar Cambios'
  },
  French: {
    welcome: 'Bienvenue sur Voyage Vista',
    search: 'Rechercher des destinations, hôtels, expériences...',
    searching: 'Recherche en cours',
    totalSales: 'Ventes Totales',
    totalOrders: 'Commandes Totales',
    visitor: 'Visiteur',
    refunded: 'Remboursé',
    today: 'aujourd\'hui',
    mySchedule: 'Mon Horaire',
    popularRooms: 'Chambres Populaires',
    settings: 'Paramètres',
    profile: 'Profil',
    preferences: 'Préférences',
    notifications: 'Notifications',
    security: 'Sécurité',
    language: 'Langue',
    currency: 'Devise',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    saveChanges: 'Enregistrer les Modifications'
  },
  German: {
    welcome: 'Willkommen bei Voyage Vista',
    search: 'Suche nach Reisezielen, Hotels, Erlebnissen...',
    searching: 'Suche',
    totalSales: 'Gesamtumsatz',
    totalOrders: 'Gesamtbestellungen',
    visitor: 'Besucher',
    refunded: 'Erstattet',
    today: 'heute',
    mySchedule: 'Mein Zeitplan',
    popularRooms: 'Beliebte Zimmer',
    settings: 'Einstellungen',
    profile: 'Profil',
    preferences: 'Präferenzen',
    notifications: 'Benachrichtigungen',
    security: 'Sicherheit',
    language: 'Sprache',
    currency: 'Währung',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    saveChanges: 'Änderungen speichern'
  },
  Hindi: {
    welcome: 'वॉयेज विस्टा में आपका स्वागत है',
    search: 'गंतव्य, होटल, अनुभव खोजें...',
    searching: 'खोज रहा है',
    totalSales: 'कुल बिक्री',
    totalOrders: 'कुल आदेश',
    visitor: 'आगंतुक',
    refunded: 'वापसी की गई',
    today: 'आज',
    mySchedule: 'मेरा कार्यक्रम',
    popularRooms: 'लोकप्रिय कमरे',
    settings: 'सेटिंग्स',
    profile: 'प्रोफाइल',
    preferences: 'वरीयताएँ',
    notifications: 'सूचनाएं',
    security: 'सुरक्षा',
    language: 'भाषा',
    currency: 'मुद्रा',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    saveChanges: 'परिवर्तन सहेजें'
  },
  Japanese: {
    welcome: 'ボヤージュビスタへようこそ',
    search: '目的地、ホテル、体験を検索...',
    searching: '検索中',
    totalSales: '総売上高',
    totalOrders: '総注文数',
    visitor: '訪問者',
    refunded: '払い戻し',
    today: '今日',
    mySchedule: 'スケジュール',
    popularRooms: '人気の部屋',
    settings: '設定',
    profile: 'プロフィール',
    preferences: '環境設定',
    notifications: '通知',
    security: 'セキュリティ',
    language: '言語',
    currency: '通貨',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    saveChanges: '変更を保存'
  }
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
    return localStorage.getItem('user-name') || '';
  });

  const [userAvatar, setUserAvatarState] = useState<string>(() => {
    return localStorage.getItem('user-avatar') || 'https://github.com/shadcn.png';
  });

  // Track if translations have been initialized
  const [translationsInitialized, setTranslationsInitialized] = useState(false);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('user-currency', currency);
    document.documentElement.setAttribute('data-currency', currency);
    
    // Force a re-render of price elements
    const event = new CustomEvent('currencychange', { detail: currency });
    window.dispatchEvent(event);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('user-language', language);
    document.documentElement.setAttribute('data-language', language);
    document.documentElement.lang = language.toLowerCase();
    
    // Force a re-render of language-dependent elements
    const event = new CustomEvent('languagechange', { detail: language });
    window.dispatchEvent(event);
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

  // Function to initialize translations
  const initializeTranslations = () => {
    if (!translationsInitialized) {
      const transElements = document.querySelectorAll('[data-i18n-key]');
      transElements.forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        if (key && translations[language][key]) {
          el.textContent = translations[language][key];
        }
      });
      setTranslationsInitialized(true);
    }
  };

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

  // Translation function
  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    toast.success(`Currency changed to ${newCurrency}`);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
    
    // Re-initialize translations when language changes
    setTranslationsInitialized(false);
    setTimeout(() => initializeTranslations(), 0);
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
        formatPrice,
        translate,
        initializeTranslations
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
