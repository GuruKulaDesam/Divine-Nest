import { get } from 'svelte/store';
import { currentLanguage } from './index.js';
import { translations } from './translations.js';

// Translation function
export function t(key, params = {}) {
  const lang = get(currentLanguage);
  const translation = translations[lang]?.[key] || translations.en[key] || key;
  
  // Replace parameters in translation
  return translation.replace(/\{(\w+)\}/g, (match, param) => {
    return params[param] || match;
  });
}

// Reactive translation function for Svelte components
export function createTranslator() {
  return {
    t: (key, params = {}) => {
      const lang = get(currentLanguage);
      const translation = translations[lang]?.[key] || translations.en[key] || key;
      
      // Replace parameters in translation
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }
  };
}

// Get current language name
export function getCurrentLanguageName() {
  const lang = get(currentLanguage);
  const languages = {
    en: 'English',
    id: 'Indonesia',
    ko: '한국어'
  };
  return languages[lang] || 'English';
} 