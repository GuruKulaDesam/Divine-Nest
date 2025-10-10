// Sound utilities for organic, home-like navigation sounds
class HomeSounds {
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

  // Generate organic click sound - like a gentle bell or wooden click
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

      // Organic click: warm, wooden sound
      oscillator.frequency.setValueAtTime(600, ctx.currentTime); // Warm mid frequency
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

      // Gentle attack and decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02); // Soft attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15); // Gentle decay

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);

    } catch (error) {
      console.warn('Could not play click sound:', error);
    }
  }

  // Generate soft tap sound - like a gentle touch on fabric
  async playTap() {
    if (!this.enabled) return;

    try {
      const ctx = await this.init();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Soft fabric-like tap sound
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

      // Very gentle, like touching soft fabric
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);

    } catch (error) {
      console.warn('Could not play tap sound:', error);
    }
  }

  // Generate gentle hover sound - like a soft breeze or leaf rustle
  async playPop() {
    if (!this.enabled) return;

    try {
      const ctx = await this.init();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Gentle rustle sound: soft rise and fall
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
      oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      // Very soft, natural volume
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);

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
export const homeSounds = new HomeSounds();