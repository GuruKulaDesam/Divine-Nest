import "clsx";
import { a as ensure_array_like, d as attr } from "../../../chunks/index2.js";
import { o as onDestroy, I as Icon } from "../../../chunks/Icon.js";
import { e as escape_html } from "../../../chunks/context.js";
class AudioPlayer {
  audioContext = null;
  currentSource = null;
  gainNode = null;
  isPlaying = false;
  currentBuffer = null;
  constructor() {
    this.initializeAudioContext();
  }
  async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
      throw error;
    }
  }
  async playAudio(buffer, options = {}) {
    if (!this.audioContext || !this.gainNode) {
      await this.initializeAudioContext();
    }
    if (!this.audioContext || !this.gainNode) {
      throw new Error("Audio context not available");
    }
    try {
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }
      this.stopAudio();
      this.currentSource = this.audioContext.createBufferSource();
      this.currentSource.buffer = buffer;
      this.currentBuffer = buffer;
      const volume = Math.max(0, Math.min(options.volume ?? 1, 1));
      this.gainNode.gain.value = volume;
      this.currentSource.connect(this.gainNode);
      this.currentSource.onended = () => {
        this.isPlaying = false;
        options.onEnded?.();
      };
      if (options.loop) {
        this.currentSource.loop = true;
      }
      this.currentSource.start();
      this.isPlaying = true;
    } catch (error) {
      console.error("Audio playback failed:", error);
      this.isPlaying = false;
      options.onError?.(error);
      throw error;
    }
  }
  stopAudio() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (error) {
      }
      this.currentSource = null;
    }
    this.isPlaying = false;
  }
  pauseAudio() {
    if (this.audioContext && this.isPlaying) {
      this.audioContext.suspend();
      this.isPlaying = false;
    }
  }
  resumeAudio() {
    if (this.audioContext && !this.isPlaying) {
      this.audioContext.resume();
      this.isPlaying = true;
    }
  }
  setVolume(volume) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(volume, 1));
    }
  }
  get isCurrentlyPlaying() {
    return this.isPlaying;
  }
  get currentAudioBuffer() {
    return this.currentBuffer;
  }
  // Get audio duration in seconds
  getDuration() {
    return this.currentBuffer?.duration ?? 0;
  }
  // Get current playback time (approximate)
  getCurrentTime() {
    if (!this.audioContext || !this.currentSource) return 0;
    return this.audioContext.currentTime;
  }
}
let audioPlayerInstance = null;
function getAudioPlayer() {
  if (typeof window === "undefined") {
    throw new Error("AudioPlayer can only be used in browser environment");
  }
  if (!audioPlayerInstance) {
    audioPlayerInstance = new AudioPlayer();
  }
  return audioPlayerInstance;
}
function stopAudio() {
  if (typeof window === "undefined") return;
  const player = getAudioPlayer();
  player.stopAudio();
}
function ShivoMusicPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let status = "🎙️ Shivo is listening...";
    let isListening = false;
    let isGenerating = false;
    let volume = 0.8;
    let currentPrompt = "";
    function stopVoiceListening() {
      isListening = false;
      status = "🎙️ Voice listening stopped";
    }
    const musicTemplates = [
      {
        key: "devotional",
        label: "Devotional",
        icon: "heroicons:sparkles"
      },
      { key: "folk", label: "Folk", icon: "heroicons:musical-note" },
      { key: "ambient", label: "Ambient", icon: "heroicons:cloud" },
      {
        key: "classical",
        label: "Classical",
        icon: "heroicons:building-library"
      },
      {
        key: "electronic",
        label: "Electronic",
        icon: "heroicons:bolt"
      },
      {
        key: "world",
        label: "World Music",
        icon: "heroicons:globe-asia-australia"
      }
    ];
    onDestroy(() => {
      stopVoiceListening();
      stopAudio();
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">🎼 Shivo Music Companion</h1> <p class="text-base-content/70 mt-2">Voice-controlled music generation with AI</p></div> <div class="flex gap-3">`);
    if (isListening) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="btn btn-error">`);
      Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> Stop Listening</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="btn btn-primary">`);
      Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> Start Listening</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center gap-4"><div class="flex-1"><h3 class="font-semibold text-lg mb-2">Status</h3> <p class="text-base-content/80">${escape_html(status)}</p> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        Icon($$renderer2, {
          icon: "heroicons:speaker-x-mark",
          class: "w-8 h-8 text-base-content/50"
        });
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="font-semibold text-lg mb-4">🎙️ Voice Commands</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-base-200 rounded-lg"><h4 class="font-medium mb-2">Music Generation</h4> <ul class="text-sm text-base-content/70 space-y-1"><li>• "Create a Tamil folk melody"</li> <li>• "Make devotional music with flute"</li> <li>• "Generate ambient background music"</li> <li>• "Play classical orchestral piece"</li></ul></div> <div class="p-4 bg-base-200 rounded-lg"><h4 class="font-medium mb-2">Controls</h4> <ul class="text-sm text-base-content/70 space-y-1"><li>• "Start humming" (records melody)</li> <li>• "Stop" or "Pause"</li> <li>• "Play" or "Resume"</li> <li>• "Volume up/down"</li></ul></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="font-semibold text-lg mb-4">🎵 Quick Templates</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
    const each_array = ensure_array_like(musicTemplates);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let template = each_array[$$index];
      $$renderer2.push(`<button class="btn btn-outline btn-block h-auto py-4"${attr("disabled", isGenerating, true)}>`);
      Icon($$renderer2, { icon: template.icon, class: "w-6 h-6 mb-2" });
      $$renderer2.push(`<!----> ${escape_html(template.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="font-semibold text-lg mb-4">🎛️ Manual Controls</h3> <div class="flex flex-wrap gap-4 items-center"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:speaker-wave", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <input type="range" min="0" max="1" step="0.1"${attr("value", volume)} class="range range-primary"/> <span class="text-sm font-medium w-12">${escape_html(Math.round(volume * 100))}%</span></div> <div class="flex gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="btn btn-outline">`);
      Icon($$renderer2, { icon: "heroicons:play", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="btn btn-secondary"${attr("disabled", isGenerating, true)}>`);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Record Melody</button></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="font-semibold text-lg mb-4">✏️ Custom Prompt</h3> <div class="flex gap-3"><input type="text"${attr("value", currentPrompt)} placeholder="Describe the music you want to generate..." class="input input-bordered flex-1"/> <button class="btn btn-primary"${attr("disabled", !currentPrompt.trim(), true)}>`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Generate</button></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="font-semibold text-lg mb-4">💡 Sample Prompts</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
    const each_array_1 = ensure_array_like([
      "Shivo, make a Tamil folk melody with ambient pads",
      "Create a devotional tune with flute and tanpura",
      "Generate a chill beat with soft percussion and strings",
      "Classical orchestral piece with piano and strings",
      "Electronic ambient music with synthesizers",
      "World music fusion with traditional instruments"
    ]);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let prompt = each_array_1[$$index_1];
      $$renderer2.push(`<button class="btn btn-ghost btn-block justify-start text-left h-auto py-3"${attr("disabled", isGenerating, true)}>`);
      Icon($$renderer2, {
        icon: "heroicons:chat-bubble-left",
        class: "w-4 h-4 mr-3 flex-shrink-0"
      });
      $$renderer2.push(`<!----> <span class="text-sm">${escape_html(prompt)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}
function _page($$renderer) {
  ShivoMusicPage($$renderer);
}
export {
  _page as default
};
