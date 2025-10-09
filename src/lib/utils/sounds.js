// Sound utilities for iOS-like navigation sounds
class IOSSounds {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  // Initialize audio context (must be called after user interaction)
  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Generate iOS-like click sound
  async playClick() {
    if (!this.enabled) return;

    try {
      const ctx = await this.init();

      // Create oscillator for the main tone
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // iOS-like click sound: short, clean, pleasant
      oscillator.frequency.setValueAtTime(800, ctx.currentTime); // Higher frequency for click
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      // Quick attack and decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08); // Fast decay

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);

    } catch (error) {
      console.warn('Could not play click sound:', error);
    }
  }

  // Generate iOS-like tap sound (softer)
  async playTap() {
    if (!this.enabled) return;

    try {
      const ctx = await this.init();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Softer tap sound
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      // Even softer than click
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.06);

    } catch (error) {
      console.warn('Could not play tap sound:', error);
    }
  }

  // Generate iOS-like pop sound for sub-menu items
  async playPop() {
    if (!this.enabled) return;

    try {
      const ctx = await this.init();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Pop sound: quick rise and fall
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.02);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);

      // Medium volume pop
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);

    } catch (error) {
      console.warn('Could not play pop sound:', error);
    }
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Check if sounds are enabled
  isEnabled() {
    return this.enabled;
  }
}

// Create global instance
export const iosSounds = new IOSSounds();