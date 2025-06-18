/**
 * Avatar utility using DiceBear API
 * https://www.dicebear.com/
 */

const DICEBEAR_BASE_URL = 'https://api.dicebear.com/7.x';

/**
 * Generate avatar URL using DiceBear API
 * @param {string} seed - Seed for consistent avatar generation
 * @param {string} style - Avatar style (default: 'avataaars')
 * @param {Object} options - Additional options for the avatar
 * @returns {string} Avatar URL
 */
export function generateAvatar(seed, style = 'avataaars', options = {}) {
  const defaultOptions = {
    backgroundColor: 'b6e3f4',
    radius: 50,
    size: 128,
    ...options
  };

  const params = new URLSearchParams();
  
  // Add seed
  params.append('seed', seed);
  
  // Add options
  Object.entries(defaultOptions).forEach(([key, value]) => {
    params.append(key, value);
  });

  return `${DICEBEAR_BASE_URL}/${style}/svg?${params.toString()}`;
}

/**
 * Generate avatar URL with common presets
 * @param {string} seed - Seed for consistent avatar generation
 * @param {string} preset - Preset configuration
 * @returns {string} Avatar URL
 */
export function generateAvatarPreset(seed, preset = 'default') {
  const presets = {
    default: {
      style: 'avataaars',
      options: {
        backgroundColor: 'b6e3f4',
        radius: 50,
        size: 128
      }
    },
    professional: {
      style: 'personas',
      options: {
        backgroundColor: 'f0f0f0',
        radius: 50,
        size: 128
      }
    },
    fun: {
      style: 'fun-emoji',
      options: {
        backgroundColor: 'ffdfbf',
        radius: 50,
        size: 128
      }
    },
    minimal: {
      style: 'bottts',
      options: {
        backgroundColor: 'e0e0e0',
        radius: 50,
        size: 128
      }
    },
    colorful: {
      style: 'adventurer',
      options: {
        backgroundColor: 'ffdfbf',
        radius: 50,
        size: 128
      }
    }
  };

  const config = presets[preset] || presets.default;
  return generateAvatar(seed, config.style, config.options);
}

/**
 * Generate user avatar using DiceBear API
 * @param {Object} user - User object
 * @param {string} style - Avatar style (not used in current implementation)
 * @returns {string} Avatar URL
 */
export function generateUserAvatar(user, style = 'avataaars') {
  const name = user.name || user.email || 'User';
  
  // Generate a random seed for more varied avatars
  const randomSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Use DiceBear API for avatars (PNG format to avoid CORB issues)
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(randomSeed)}&backgroundColor=b6e3f4&size=128`;
}

/**
 * Generate a fallback avatar using data URL (no external requests)
 * @param {Object} user - User object
 * @returns {string} Data URL for fallback avatar
 */
export function generateFallbackAvatar(user) {
  const name = user.name || user.email || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  // Create a simple SVG avatar as data URL
  const svg = `
    <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" fill="#6366f1" rx="64"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Available avatar styles from DiceBear
 */
export const AVATAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'rings',
  'shapes',
  'thumbs'
]; 