import { writable } from 'svelte/store';
import { register, init, getLocaleFromNavigator, locale, isLoading, waitLocale } from 'svelte-i18n';
import { secureStorage, StorageKeys } from '../utils/secureStorage.js';

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

// Get initial language from secure storage or browser
function getInitialLanguage() {
  if (typeof window !== 'undefined') {
    const saved = secureStorage.getItem(StorageKeys.LANGUAGE, false);
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

// Subscribe to language changes and save to secure storage
if (typeof window !== 'undefined') {
  currentLanguage.subscribe(lang => {
    secureStorage.setItem(StorageKeys.LANGUAGE, lang, false);
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

// Create a promise that resolves when i18n is ready
let i18nReady = false;
const i18nReadyPromise = new Promise(async (resolve) => {
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('i18n initialization timeout')), 5000);
    });

    await Promise.race([
      (async () => {
        await init({
          fallbackLocale: 'en',
          initialLocale: getInitialLanguage(),
        });

        // Wait for the initial locale to load
        await waitLocale();
      })(),
      timeoutPromise
    ]);

    i18nReady = true;
    resolve(true);
  } catch (error) {
    console.warn('i18n initialization failed or timed out:', error);
    i18nReady = true; // Consider it ready even if failed
    resolve(true);
  }
});

// Export the loading state and ready promise
export { isLoading, i18nReadyPromise };

// Helper function to check if i18n is ready
export function isI18nReady() {
  return i18nReady;
} 