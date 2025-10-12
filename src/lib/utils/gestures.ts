/**
 * Mobile gesture utilities for Home Management Suite
 * Provides touch gesture support for swipe, long-press, and tap interactions
 */

export interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onTap?: () => void;
  swipeThreshold?: number;
  longPressDelay?: number;
}

export interface TouchPosition {
  x: number;
  y: number;
}

export class MobileGestures {
  private element: HTMLElement;
  private options: GestureOptions;
  private touchStart: TouchPosition | null = null;
  private touchEnd: TouchPosition | null = null;
  private longPressTimer: number | null = null;
  private isLongPress = false;

  constructor(element: HTMLElement, options: GestureOptions = {}) {
    this.element = element;
    this.options = {
      swipeThreshold: 50,
      longPressDelay: 500,
      ...options
    };

    this.bindEvents();
  }

  private bindEvents(): void {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
  }

  private handleTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.touchStart = { x: touch.clientX, y: touch.clientY };
    this.isLongPress = false;

    // Start long press timer
    if (this.options.onLongPress) {
      this.longPressTimer = window.setTimeout(() => {
        this.isLongPress = true;
        this.options.onLongPress?.();
      }, this.options.longPressDelay);
    }
  }

  private handleTouchMove(event: TouchEvent): void {
    if (!this.touchStart) return;

    const touch = event.touches[0];
    this.touchEnd = { x: touch.clientX, y: touch.clientY };

    // Cancel long press if finger moves
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (!this.touchStart || !this.touchEnd) return;

    // Clear long press timer
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    // Don't trigger tap if it was a long press
    if (this.isLongPress) return;

    const deltaX = this.touchEnd.x - this.touchStart.x;
    const deltaY = this.touchEnd.y - this.touchStart.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a swipe or tap
    if (absDeltaX > this.options.swipeThreshold! || absDeltaY > this.options.swipeThreshold!) {
      // It's a swipe
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.options.onSwipeRight?.();
        } else {
          this.options.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.options.onSwipeDown?.();
        } else {
          this.options.onSwipeUp?.();
        }
      }
    } else {
      // It's a tap
      this.options.onTap?.();
    }

    // Reset touch positions
    this.touchStart = null;
    this.touchEnd = null;
  }

  public destroy(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }

    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}

/**
 * Svelte action for adding mobile gestures to elements
 */
export function mobileGestures(node: HTMLElement, options: GestureOptions = {}) {
  const gestures = new MobileGestures(node, options);

  return {
    destroy() {
      gestures.destroy();
    }
  };
}