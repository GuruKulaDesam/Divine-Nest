/**
 * Voice Agent - Handles speech recognition, emotion detection, and voice interactions
 * Processes natural language, detects emotions, and manages voice-based interactions
 */

import { BaseAgent } from './core.js';

export class VoiceAgent extends BaseAgent {
  constructor() {
    super('voice', ['listen', 'speak', 'analyze', 'transcribe']);
    this.isListening = false;
    this.recognition = null;
    this.synthesis = null;
    this.emotionAnalyzer = new EmotionAnalyzer();
    this.intentParser = new IntentParser();
    this.languageDetector = new LanguageDetector();
  }

  async initialize() {
    await super.initialize();
    this.initializeSpeechRecognition();
    this.initializeSpeechSynthesis();
  }

  initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN'; // Default to Indian English

      this.recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          this.processTranscript(finalTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }

  initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;

      // Configure voice preferences
      this.voicePreferences = {
        paati: { lang: 'ta-IN', rate: 0.8, pitch: 1.1 },
        appa: { lang: 'en-IN', rate: 1.0, pitch: 1.0 },
        amma: { lang: 'en-IN', rate: 0.9, pitch: 1.0 },
        kids: { lang: 'en-IN', rate: 1.1, pitch: 1.2 },
        family: { lang: 'en-IN', rate: 0.95, pitch: 1.0 }
      };
    }
  }

  async execute(input) {
    const { type, data, role, preferences } = input;

    switch (type) {
      case 'start_listening':
        return this.startListening(role);
      case 'stop_listening':
        return this.stopListening();
      case 'speak_response':
        return this.speakResponse(data.text, role);
      case 'analyze_emotion':
        return this.analyzeEmotion(data.audio || data.text);
      case 'process_command':
        return this.processCommand(data.text, role);
      default:
        return this.handleVoiceInput(input);
    }
  }

  startListening(role) {
    if (this.recognition && !this.isListening) {
      // Set language based on role preferences
      const langPrefs = this.voicePreferences[role] || this.voicePreferences.family;
      this.recognition.lang = langPrefs.lang;

      this.recognition.start();
      this.isListening = true;

      return {
        response: `Started listening for ${role}`,
        actions: [{ type: 'listening_started', data: { role } }]
      };
    }

    return {
      response: 'Speech recognition not available or already listening',
      actions: []
    };
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;

      return {
        response: 'Stopped listening',
        actions: [{ type: 'listening_stopped' }]
      };
    }

    return {
      response: 'Not currently listening',
      actions: []
    };
  }

  async speakResponse(text, role) {
    if (!this.synthesis) {
      return {
        response: 'Speech synthesis not available',
        actions: []
      };
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice based on role
    const prefs = this.voicePreferences[role] || this.voicePreferences.family;
    utterance.lang = prefs.lang;
    utterance.rate = prefs.rate;
    utterance.pitch = prefs.pitch;

    // Select appropriate voice
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      voice.lang.startsWith(prefs.lang.split('-')[0])
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synthesis.speak(utterance);

    return {
      response: `Speaking response for ${role}`,
      actions: [{ type: 'speech_started', data: { text, role } }]
    };
  }

  async analyzeEmotion(input) {
    const emotion = await this.emotionAnalyzer.analyze(input);

    return {
      response: `Detected emotion: ${emotion.primary}`,
      actions: [
        { type: 'emotion_detected', data: emotion },
        { type: 'update_memory', data: { type: 'emotion', emotion: emotion.primary } }
      ],
      emotion
    };
  }

  async processCommand(text, role) {
    // Detect language
    const language = this.languageDetector.detect(text);

    // Parse intent
    const intent = await this.intentParser.parse(text, role, language);

    // Analyze emotion
    const emotion = await this.emotionAnalyzer.analyze(text);

    return {
      response: `Processed command for ${role}`,
      actions: [
        { type: 'intent_parsed', data: intent },
        { type: 'emotion_analyzed', data: emotion },
        { type: 'execute_intent', data: { intent, role, language, emotion } }
      ],
      intent,
      emotion,
      language
    };
  }

  async processTranscript(transcript) {
    console.log('Processing transcript:', transcript);

    // Check for wake words
    const wakeWords = ['shivo', 'சிவோ', 'nanbaa', 'நண்பா', 'ai', 'assistant'];
    const isWakeWord = wakeWords.some(word =>
      transcript.toLowerCase().includes(word.toLowerCase())
    );

    if (isWakeWord) {
      // Wake up and process command
      const result = await this.processCommand(transcript, 'family');
      return {
        ...result,
        wakeWord: true
      };
    }

    // If already awake, process as command
    return await this.processCommand(transcript, 'family');
  }

  handleVoiceInput(input) {
    const { audio, text, role } = input;

    if (audio) {
      // Process audio input
      return this.processAudio(audio, role);
    } else if (text) {
      // Process text input
      return this.processCommand(text, role);
    }

    return {
      response: 'No audio or text input provided',
      actions: []
    };
  }

  async processAudio(audioBlob, role) {
    // Convert audio to text
    const transcript = await this.transcribeAudio(audioBlob);

    // Analyze emotion from audio
    const emotion = await this.emotionAnalyzer.analyzeAudio(audioBlob);

    // Process as command
    const result = await this.processCommand(transcript, role);

    return {
      ...result,
      transcript,
      emotion
    };
  }

  async transcribeAudio(audioBlob) {
    // Placeholder for audio transcription
    // In a real implementation, this would use a speech-to-text service
    return "Transcribed text from audio";
  }
}

// Emotion Analyzer
class EmotionAnalyzer {
  async analyze(input) {
    // Simple emotion detection based on keywords
    const emotionKeywords = {
      joy: ['happy', 'excited', 'wonderful', 'great', 'love', 'மகிழ்ச்சி', 'சந்தோஷம்'],
      stress: ['worried', 'stressed', 'anxious', 'tired', 'பதற்றம்', 'கவலை'],
      gratitude: ['thank you', 'grateful', 'blessed', 'நன்றி', 'நன்றாக'],
      neutral: ['okay', 'fine', 'alright', 'சரி', 'நல்லது']
    };

    const text = typeof input === 'string' ? input.toLowerCase() : '';
    const scores = {};

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      scores[emotion] = keywords.reduce((score, keyword) => {
        return score + (text.includes(keyword) ? 1 : 0);
      }, 0);
    }

    const primary = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    return {
      primary,
      scores,
      confidence: Math.max(...Object.values(scores)) / Math.max(1, text.split(' ').length)
    };
  }

  async analyzeAudio(audioBlob) {
    // Placeholder for audio emotion analysis
    // In a real implementation, this would analyze tone, pace, etc.
    return { primary: 'neutral', scores: { neutral: 1 }, confidence: 0.5 };
  }
}

// Intent Parser
class IntentParser {
  async parse(text, role, language) {
    const lowerText = text.toLowerCase();

    // Define intent patterns
    const patterns = {
      createTodo: ['add todo', 'பட்டியல் சேர்', 'create task'],
      setReminder: ['remind', 'நினைவூட்டு', 'reminder'],
      createNote: ['note', 'குறிப்பு', 'write down'],
      setEvent: ['event', 'நிகழ்வு', 'schedule'],
      startRecording: ['record', 'பதிவு செய்', 'start recording'],
      playMusic: ['play music', 'இசை', 'music'],
      getWeather: ['weather', 'வானிலை'],
      checkHealth: ['health', 'உடல் நலம்', 'how are you']
    };

    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return {
          type: intent,
          text,
          role,
          language,
          confidence: 0.8,
          extracted: this.extractEntities(text, intent)
        };
      }
    }

    return {
      type: 'unknown',
      text,
      role,
      language,
      confidence: 0.0
    };
  }

  extractEntities(text, intent) {
    // Simple entity extraction
    const entities = {};

    switch (intent) {
      case 'createTodo':
      case 'setReminder':
      case 'createNote':
        entities.content = text.replace(/^(add todo|பட்டியல் சேர்|remind|நினைவூட்டு|note|குறிப்பு)/i, '').trim();
        break;
      case 'setEvent':
        entities.title = text.replace(/^(event|நிகழ்வு)/i, '').trim();
        break;
    }

    return entities;
  }
}

// Language Detector
class LanguageDetector {
  detect(text) {
    // Simple language detection based on character sets
    const tamilChars = /[\u0B80-\u0BFF]/;
    const hasTamil = tamilChars.test(text);

    if (hasTamil) {
      return 'ta'; // Tamil
    }

    // Check for other Indian languages or default to English
    return 'en'; // English
  }
}