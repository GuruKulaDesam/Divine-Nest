/**
 * Platform detection utilities for Divine Nest
 * Determines whether we're running on web/desktop or mobile/Android
 */

import { Capacitor } from '@capacitor/core';

/**
 * Check if we're running on a mobile platform (Android/iOS via Capacitor)
 */
export function isMobilePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Check if we're running on Android specifically
 */
export function isAndroidPlatform(): boolean {
  return Capacitor.getPlatform() === 'android';
}

/**
 * Check if we're running on iOS specifically
 */
export function isIOSPlatform(): boolean {
  return Capacitor.getPlatform() === 'ios';
}

/**
 * Check if we're running in a web browser (desktop)
 */
export function isWebPlatform(): boolean {
  return Capacitor.getPlatform() === 'web';
}

/**
 * Check if we're running on a desktop-sized screen
 * This is a fallback for web platforms to distinguish desktop from mobile web
 */
export function isDesktopScreen(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024; // lg breakpoint in Tailwind
}

/**
 * Get the current platform type
 */
export function getPlatform(): 'web' | 'android' | 'ios' {
  return Capacitor.getPlatform() as 'web' | 'android' | 'ios';
}

/**
 * Determine if we should use mobile layout
 * True for native mobile apps, false for web (regardless of screen size)
 */
export function shouldUseMobileLayout(): boolean {
  return isMobilePlatform();
}

/**
 * Determine if we should use desktop layout
 * True for web platforms, false for native mobile apps
 */
export function shouldUseDesktopLayout(): boolean {
  return isWebPlatform();
}