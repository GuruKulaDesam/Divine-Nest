# 🎼 Shivo Music Companion

A voice-controlled AI music generation system integrated into the South Indian Family Management App.

## ✨ Features

- **Voice Commands**: Control music generation with natural speech
- **AI Music Generation**: Create original music using Meta's MusicGen via Hugging Face
- **Humming Recognition**: Record melodies and build tracks around them
- **Multiple Genres**: Devotional, folk, ambient, classical, electronic, and world music
- **Real-time Playback**: Instant audio playback with volume controls
- **Template Library**: Quick-start music generation with predefined styles

## 🚀 Setup

### 1. Get Hugging Face API Token

1. Visit [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token

### 2. Configure Environment

Add your Hugging Face token to `.env`:

```bash
VITE_HUGGINGFACE_TOKEN=your_huggingface_token_here
```

### 3. Access the Feature

Navigate to **🎼 Shivo Music** in the sidebar or visit `/shivo-music`

## 🎙️ Voice Commands

### Music Generation

- "Create a Tamil folk melody"
- "Make devotional music with flute"
- "Generate ambient background music"
- "Play classical orchestral piece"
- "Shivo, make a chill beat with soft percussion"

### Controls

- "Start humming" - Records a 5-second melody
- "Stop" or "Pause" - Stops playback
- "Play" or "Resume" - Resumes playback
- "Volume up/down" - Adjusts volume
- "Louder" or "Quieter" - Alternative volume commands

## 🎵 Music Templates

Quick-generate music with these predefined styles:

- **Devotional**: Spiritual music with traditional instruments
- **Folk**: Acoustic, warm, and inviting folk music
- **Ambient**: Atmospheric background music
- **Classical**: Orchestral, elegant compositions
- **Electronic**: Modern, synthesized music
- **World Music**: Ethnic instruments and cultural fusion

## 🛠️ Technical Architecture

### Components

- **MusicGen API**: Hugging Face inference for AI music generation
- **Web Audio API**: Browser-based audio playback and processing
- **Speech Recognition**: Web Speech API for voice commands
- **Microphone Recording**: MediaRecorder API for melody capture

### File Structure

```
src/
├── lib/
│   ├── ai/
│   │   └── musicgen.ts          # MusicGen API integration
│   ├── audio/
│   │   └── audioPlayer.ts       # Audio playback utilities
│   ├── voice/
│   │   └── speechCapture.ts     # Voice command processing
│   └── pages/
│       └── ShivoMusicPage.svelte # Main music interface
└── routes/
    └── shivo-music/
        └── +page.svelte         # Route definition
```

## 🔧 API Usage

The system uses Hugging Face's MusicGen models:

- **Model**: `facebook/musicgen-small` (fast, good quality)
- **Duration**: Up to 30 seconds per generation
- **Formats**: WAV audio output
- **Rate Limits**: Free tier has usage limits

## 🎼 Sample Prompts

Try these prompts for different musical styles:

- "Tamil devotional song with veena and mridangam"
- "Peaceful ambient music with nature sounds"
- "Upbeat folk melody with flute and tabla"
- "Classical raga with sitar and tanpura"
- "Electronic chillout with soft synthesizers"
- "World fusion with African drums and Indian flute"

## 🐛 Troubleshooting

### Common Issues

1. **"Hugging Face token required"**

   - Ensure `VITE_HUGGINGFACE_TOKEN` is set in `.env`
   - Restart the development server after adding the token

2. **"Speech recognition not supported"**

   - Use a modern browser (Chrome, Edge, Safari)
   - Enable microphone permissions
   - Check browser compatibility

3. **"Microphone access denied"**

   - Grant microphone permissions in browser
   - Ensure HTTPS in production (required for microphone access)

4. **Music generation fails**
   - Check internet connection
   - Verify Hugging Face token validity
   - Check Hugging Face API status

### Browser Compatibility

- **Chrome/Edge**: Full support ✅
- **Firefox**: Limited speech recognition
- **Safari**: Good support ✅
- **Mobile**: iOS Safari, Android Chrome ✅

## 🔒 Privacy & Security

- Audio data is processed locally when possible
- Voice commands are not stored or transmitted
- Hugging Face API calls include your token (keep it secure)
- Microphone data is only used for the current session

## 🚀 Future Enhancements

- [ ] Local MusicGen model for offline generation
- [ ] Music library and playlist management
- [ ] Collaborative music creation
- [ ] Integration with Capacitor for mobile playback
- [ ] Advanced audio effects and mixing
- [ ] Tamil language voice commands
- [ ] Music sharing and social features

## 📚 Resources

- [MusicGen Paper](https://arxiv.org/abs/2306.05284)
- [Hugging Face MusicGen](https://huggingface.co/facebook/musicgen-small)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
