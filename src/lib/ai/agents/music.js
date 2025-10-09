/**
 * Music Agent - Handles music generation, playback, and composition
 * Creates music from prompts, humming, and emotional context
 */

import { BaseAgent } from './core.js';

export class MusicAgent extends BaseAgent {
  constructor() {
    super('music', ['generate', 'play', 'compose', 'analyze']);
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 0.8;
    this.musicHistory = [];
    this.emotionalThemes = new Map();
  }

  async initialize() {
    await super.initialize();
    this.initializeEmotionalThemes();
    this.initializeAudioContext();
  }

  initializeEmotionalThemes() {
    // Music themes for different emotions and contexts
    this.emotionalThemes.set('joy', {
      genres: ['upbeat', 'folk', 'electronic'],
      tempo: 'fast',
      instruments: ['flute', 'percussion', 'strings'],
      mood: 'celebratory'
    });

    this.emotionalThemes.set('stress', {
      genres: ['ambient', 'meditative', 'classical'],
      tempo: 'slow',
      instruments: ['piano', 'harp', 'nature_sounds'],
      mood: 'calming'
    });

    this.emotionalThemes.set('gratitude', {
      genres: ['devotional', 'spiritual', 'acoustic'],
      tempo: 'moderate',
      instruments: ['veena', 'sitar', 'vocal'],
      mood: 'peaceful'
    });

    this.emotionalThemes.set('neutral', {
      genres: ['ambient', 'folk', 'instrumental'],
      tempo: 'moderate',
      instruments: ['flute', 'guitar', 'percussion'],
      mood: 'balanced'
    });
  }

  initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  async execute(input) {
    const { type, data, role, preferences, emotion } = input;

    switch (type) {
      case 'generate_music':
        return this.generateMusic(data.prompt, emotion, role);
      case 'play_music':
        return this.playMusic(data.track);
      case 'stop_music':
        return this.stopMusic();
      case 'compose_from_humming':
        return this.composeFromHumming(data.audio, role);
      case 'adjust_mood':
        return this.adjustMoodMusic(emotion);
      case 'create_playlist':
        return this.createPlaylist(data.theme, role);
      default:
        return this.handleMusicRequest(input);
    }
  }

  async generateMusic(prompt, emotion, role) {
    try {
      // Enhance prompt based on emotion and role
      const enhancedPrompt = this.enhancePrompt(prompt, emotion, role);

      // Generate music using available service
      const audioBuffer = await this.generateMusicFromPrompt(enhancedPrompt);

      const track = {
        id: `track_${Date.now()}`,
        prompt: enhancedPrompt,
        emotion,
        role,
        buffer: audioBuffer,
        duration: audioBuffer.duration,
        created: new Date()
      };

      this.musicHistory.push(track);

      return {
        response: `Generated music for ${role} with ${emotion} emotion`,
        actions: [
          { type: 'music_generated', data: track },
          { type: 'auto_play', data: { track } }
        ],
        track
      };
    } catch (error) {
      return {
        response: `Failed to generate music: ${error.message}`,
        actions: []
      };
    }
  }

  async playMusic(track) {
    if (!track || !track.buffer) {
      return {
        response: 'No track to play',
        actions: []
      };
    }

    try {
      await this.playAudioBuffer(track.buffer);

      this.currentTrack = track;
      this.isPlaying = true;

      return {
        response: `Playing music: ${track.prompt}`,
        actions: [{ type: 'music_playing', data: { track, volume: this.volume } }]
      };
    } catch (error) {
      return {
        response: `Failed to play music: ${error.message}`,
        actions: []
      };
    }
  }

  async stopMusic() {
    if (this.currentTrack && this.isPlaying) {
      this.stopAudioPlayback();
      this.isPlaying = false;

      return {
        response: 'Music stopped',
        actions: [{ type: 'music_stopped', data: { track: this.currentTrack } }]
      };
    }

    return {
      response: 'No music playing',
      actions: []
    };
  }

  async composeFromHumming(audioBlob, role) {
    try {
      // Analyze humming audio
      const melodyAnalysis = await this.analyzeMelody(audioBlob);

      // Generate prompt based on analysis
      const prompt = this.createPromptFromMelody(melodyAnalysis, role);

      // Generate music
      return await this.generateMusic(prompt, 'joy', role);
    } catch (error) {
      return {
        response: `Failed to compose from humming: ${error.message}`,
        actions: []
      };
    }
  }

  async adjustMoodMusic(emotion) {
    const theme = this.emotionalThemes.get(emotion) || this.emotionalThemes.get('neutral');

    // Generate mood-appropriate music
    const prompt = this.createMoodPrompt(theme);

    return await this.generateMusic(prompt, emotion, 'family');
  }

  async createPlaylist(theme, role) {
    const tracks = [];

    // Generate multiple tracks for a playlist
    for (let i = 0; i < 3; i++) {
      const prompt = `${theme} music variation ${i + 1} for ${role}`;
      const result = await this.generateMusic(prompt, 'neutral', role);
      if (result.track) {
        tracks.push(result.track);
      }
    }

    const playlist = {
      id: `playlist_${Date.now()}`,
      theme,
      role,
      tracks,
      created: new Date()
    };

    return {
      response: `Created playlist with ${tracks.length} tracks`,
      actions: [{ type: 'playlist_created', data: playlist }],
      playlist
    };
  }

  handleMusicRequest(input) {
    const { text, role, emotion } = input;

    // Parse music-related requests from text
    if (text.includes('play') || text.includes('music')) {
      const prompt = this.extractMusicPrompt(text);
      return this.generateMusic(prompt, emotion, role);
    }

    if (text.includes('stop') || text.includes('quiet')) {
      return this.stopMusic();
    }

    if (text.includes('mood') || text.includes('feeling')) {
      return this.adjustMoodMusic(emotion);
    }

    return {
      response: 'Music request not recognized',
      actions: []
    };
  }

  enhancePrompt(basePrompt, emotion, role) {
    const theme = this.emotionalThemes.get(emotion);
    const rolePreferences = this.getRoleMusicPreferences(role);

    let enhanced = basePrompt;

    // Add emotional elements
    if (theme) {
      enhanced += `, ${theme.mood} mood, ${theme.tempo} tempo`;
      if (theme.instruments.length > 0) {
        enhanced += `, featuring ${theme.instruments.slice(0, 2).join(' and ')}`;
      }
    }

    // Add role-specific elements
    if (rolePreferences) {
      enhanced += `, ${rolePreferences.style}`;
    }

    return enhanced;
  }

  async generateMusicFromPrompt(prompt) {
    // Use the existing music generation from musicgen.ts
    try {
      const { generateMusic, buildMusicPrompt } = await import('../musicgen.js');
      return await generateMusic(buildMusicPrompt(prompt));
    } catch (error) {
      // Fallback: create a simple tone or return empty buffer
      console.warn('Music generation not available, using fallback');
      return this.createFallbackAudioBuffer();
    }
  }

  async playAudioBuffer(buffer) {
    if (!this.audioContext) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start();

    this.currentSource = source;
  }

  stopAudioPlayback() {
    if (this.currentSource) {
      this.currentSource.stop();
      this.currentSource = null;
    }
  }

  async analyzeMelody(audioBlob) {
    // Placeholder for melody analysis
    // In a real implementation, this would analyze pitch, rhythm, etc.
    return {
      key: 'C',
      tempo: 120,
      duration: 5,
      notes: ['C4', 'D4', 'E4', 'C4']
    };
  }

  createPromptFromMelody(analysis, role) {
    const { key, tempo, notes } = analysis;
    const rolePrefs = this.getRoleMusicPreferences(role);

    return `Music in ${key} key, ${tempo} BPM, based on melody ${notes.join(' ')}, ${rolePrefs?.style || 'instrumental'}`;
  }

  createMoodPrompt(theme) {
    return `${theme.genres[0]} ${theme.mood} music with ${theme.instruments[0]}, ${theme.tempo} tempo`;
  }

  extractMusicPrompt(text) {
    // Extract music description from text
    const musicKeywords = ['play', 'music', 'song', 'melody', 'tune'];
    const genres = ['classical', 'folk', 'devotional', 'ambient', 'electronic'];

    let prompt = text;

    // Remove command words
    musicKeywords.forEach(keyword => {
      prompt = prompt.replace(new RegExp(keyword, 'gi'), '');
    });

    // Clean up
    prompt = prompt.trim();

    // If no specific prompt, use genre detection
    if (prompt.length < 3) {
      const detectedGenre = genres.find(genre => text.includes(genre));
      prompt = detectedGenre || 'ambient instrumental';
    }

    return prompt;
  }

  getRoleMusicPreferences(role) {
    const preferences = {
      paati: { style: 'devotional with traditional instruments like veena and flute' },
      appa: { style: 'instrumental with focus on melody and rhythm' },
      amma: { style: 'soothing and peaceful with gentle instrumentation' },
      kids: { style: 'upbeat and playful with fun melodies' },
      family: { style: 'warm and harmonious with family-friendly instrumentation' }
    };

    return preferences[role] || preferences.family;
  }

  createFallbackAudioBuffer() {
    // Create a simple sine wave as fallback
    if (!this.audioContext) return null;

    const duration = 3; // 3 seconds
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Generate a simple sine wave
    for (let i = 0; i < numSamples; i++) {
      channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1; // 440Hz sine wave
    }

    return buffer;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentSource && this.currentSource.gainNode) {
      this.currentSource.gainNode.gain.value = this.volume;
    }
  }

  getMusicHistory(limit = 10) {
    return this.musicHistory.slice(-limit);
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  isMusicPlaying() {
    return this.isPlaying;
  }
}