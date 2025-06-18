import { writable } from 'svelte/store';
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

// Available languages
export const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'en'
  },
  id: {
    name: 'Indonesia',
    flag: '🇮🇩',
    code: 'id'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    code: 'es'
  },
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    code: 'ko'
  }
};

// Default language
const defaultLanguage = 'en';

// Get initial language from localStorage or browser
function getInitialLanguage() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    if (saved && languages[saved]) {
      return saved;
    }
    
    // Try to detect from browser language
    const browserLang = navigator.language.split('-')[0];
    if (languages[browserLang]) {
      return browserLang;
    }
  }
  return defaultLanguage;
}

// Create language store
export const currentLanguage = writable(getInitialLanguage());

// Subscribe to language changes and save to localStorage
if (typeof window !== 'undefined') {
  currentLanguage.subscribe(lang => {
    localStorage.setItem('language', lang);
    // Sync with svelte-i18n locale store
    locale.set(lang);
  });
}

// Language switching function
export function setLanguage(lang) {
  if (languages[lang]) {
    currentLanguage.set(lang);
  }
}

// Get current language
export function getCurrentLanguage() {
  let lang;
  currentLanguage.subscribe(value => {
    lang = value;
  })();
  return lang;
}

// Register locale loaders
register('en', () => import('./locales/en.json'));
register('id', () => import('./locales/id.json'));
register('es', () => import('./locales/es.json'));
register('ko', () => import('./locales/ko.json'));

// Initialize i18n
init({
  fallbackLocale: 'en',
  initialLocale: getInitialLanguage(),
}); 