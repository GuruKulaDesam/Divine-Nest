import { theme } from '../stores/theme.js';
import { get } from 'svelte/store';

// Theme-aware text color classes
export function getThemeAwareTextColor(intensity = 'primary') {
  const currentTheme = get(theme);
  
  const colorMappings = {
    light: {
      primary: 'text-slate-800',
      secondary: 'text-slate-600', 
      muted: 'text-slate-500',
      contrast: 'text-white'
    },
    dark: {
      primary: 'text-slate-100',
      secondary: 'text-slate-300',
      muted: 'text-slate-400', 
      contrast: 'text-slate-900'
    },
    minimal: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
      contrast: 'text-white'
    },
    nature: {
      primary: 'text-emerald-900',
      secondary: 'text-emerald-700', 
      muted: 'text-emerald-600',
      contrast: 'text-white'
    }
  };

  return colorMappings[currentTheme]?.[intensity] || colorMappings.light[intensity];
}

// Theme-aware background classes
export function getThemeAwareBgColor(intensity = 'primary') {
  const currentTheme = get(theme);
  
  const backgroundMappings = {
    light: {
      primary: 'bg-white',
      secondary: 'bg-slate-50',
      card: 'bg-white/90 backdrop-blur-sm',
      overlay: 'bg-white/10'
    },
    dark: {
      primary: 'bg-slate-900', 
      secondary: 'bg-slate-800',
      card: 'bg-slate-800/90 backdrop-blur-sm',
      overlay: 'bg-white/10'
    },
    minimal: {
      primary: 'bg-gray-50',
      secondary: 'bg-gray-100', 
      card: 'bg-white/95 backdrop-blur-sm',
      overlay: 'bg-gray-900/10'
    },
    nature: {
      primary: 'bg-emerald-50',
      secondary: 'bg-emerald-100',
      card: 'bg-emerald-50/90 backdrop-blur-sm', 
      overlay: 'bg-emerald-900/10'
    }
  };

  return backgroundMappings[currentTheme]?.[intensity] || backgroundMappings.light[intensity];
}

// Theme-aware border classes
export function getThemeAwareBorderColor() {
  const currentTheme = get(theme);
  
  const borderMappings = {
    light: 'border-slate-200',
    dark: 'border-slate-700',
    minimal: 'border-gray-200', 
    nature: 'border-emerald-200'
  };

  return borderMappings[currentTheme] || borderMappings.light;
}

// Combined theme classes for common UI patterns
export function getThemeCardClasses() {
  return `${getThemeAwareBgColor('card')} ${getThemeAwareBorderColor()} border rounded-xl`;
}

export function getThemeTextClasses(intensity = 'primary') {
  return getThemeAwareTextColor(intensity);
}