# 🧠 Shivo AI Assistant

A voice-controlled AI assistant designed for South Indian families, bringing intelligent automation to daily tasks through natural language processing and emotion-aware interactions.

## ✨ Features

- **Voice-First Interface**: Tamil and English voice commands for hands-free operation
- **Task Automation**: Auto-create todos, notes, reminders, and events from voice
- **Emotion Awareness**: Detects and responds to user emotions (joy, stress, gratitude)
- **Multi-Modal Input**: Voice commands, text input, and gesture-based interactions
- **Family-Centric**: Designed specifically for South Indian family management needs
- **Real-time HUD**: Live assistant overlay showing current status and transcript

## 🎙️ Voice Commands

### Task Management

- **Todos**: "பட்டியல் சேர் வீடு சுத்தம் செய்" / "add todo buy groceries"
- **Notes**: "குறிப்பு இன்று மழை வரும்" / "note meeting at 3pm"
- **Reminders**: "நினைவூட்டு மருந்து குடி" / "remind doctor appointment"
- **Events**: "நிகழ்வு குடும்ப சந்திப்பு" / "event family gathering"

### Voice Recording

- "பதிவு செய்" / "start recording" - Begin voice recording
- "நிறுத்து" / "stop recording" - End recording session

### Emotional Support

- "நான் மகிழ்ச்சியாக இருக்கிறேன்" / "I'm happy" - Sets mood to joy
- "மன அழுத்தம்" / "I'm stressed" - Sets mood to stress
- "நன்றி" / "thank you" - Expresses gratitude

### Navigation

- "முகப்பு" / "go home" - Navigate to dashboard
- "பட்டியல்" / "show todos" - Switch to todo tab
- "குறிப்புகள்" / "show notes" - Switch to notes tab

## 🏗️ Architecture

### Core Components

#### 1. **ShivoAIPage.svelte** - Main Interface

- Tab-based navigation (Overview, Todos, Notes, Reminders, Events, Recordings)
- Voice command processing with Tamil/English support
- Real-time emotion detection and response
- Integrated HUD overlay for live feedback

#### 2. **Simple Component Library**

- `TodoList.svelte` - Family task management with Tamil labels
- `NoteCardSimple.svelte` - Emotion-tagged notes with timestamps
- `ReminderListSimple.svelte` - Time-based notifications
- `EventCalendarSimple.svelte` - Family event tracking
- `RecordingPanelSimple.svelte` - Voice recording management
- `ShivoHUDSimple.svelte` - Live assistant status overlay

#### 3. **Voice Processing Pipeline**

- **Speech Capture**: Web Speech API with Tamil language support
- **Intent Parser**: Natural language understanding for commands
- **Response Generator**: Context-aware Tamil/English responses
- **Wake Word Detection**: Always-listening for "Shivo", "Nanbaa", "சிவோ"

#### 4. **Data Stores**

- **Todos Store**: Task management with categories and completion tracking
- **Notes Store**: Emotion-tagged notes with timestamps
- **Reminders Store**: Time-based notifications with repeat options
- **Events Store**: Family calendar events
- **Recordings Store**: Voice recording sessions with transcription

## 🚀 Getting Started

### 1. Access the Assistant

Navigate to **🧠 Shivo AI** in the sidebar or visit `/shivo-ai`

### 2. Voice Setup

- **Browser Support**: Chrome/Edge (full support), Safari (good), Firefox (limited)
- **Permissions**: Grant microphone access when prompted
- **Languages**: Tamil (ta-IN) and English (en-IN) supported

### 3. First Interaction

The assistant automatically greets you in Tamil and starts listening for wake words.

## 🎯 Use Cases

### Daily Family Management

- **Morning Routine**: "பட்டியல் சேர் குழந்தைகளை பள்ளிக்கு அனுப்பு"
- **Grocery Planning**: "பட்டியல் சேர் பால், ரொட்டி, காய்கறிகள் வாங்கு"
- **Appointment Tracking**: "நினைவூட்டு மருத்துவர் சந்திப்பு நாளை காலை 10 மணி"

### Emotional Support

- **Mood Tracking**: Assistant detects stress and offers calming suggestions
- **Gratitude Practice**: "நன்றி" commands trigger positive reinforcement
- **Family Bonding**: Tamil phrases strengthen cultural connection

### Voice-First Productivity

- **Hands-Free Operation**: Perfect for cooking, driving, or multitasking
- **Accessibility**: Voice commands for users with mobility challenges
- **Multilingual**: Seamless switching between Tamil and English

## 🔧 Technical Implementation

### Voice Processing Flow

```
User Speech → Speech Capture → Intent Parser → Action Execution → Response Generation → TTS Output
```

### Data Flow

```
Voice Command → Store Update → UI Re-render → HUD Update → Audio Feedback
```

### Emotion Detection

- **Keyword Analysis**: Detects emotion words in Tamil/English
- **Context Awareness**: Considers time of day and recent interactions
- **Response Adaptation**: Tailors responses based on detected mood

## 🌟 Advanced Features

### Wake Word Detection

- Responds to multiple wake words: "Shivo", "Nanbaa", "Shakthi", "சிவோ", "நண்பா"
- Continuous listening with low power consumption
- Smart filtering to avoid false activations

### Multi-Modal Integration

- **Voice + Touch**: Voice commands with manual overrides
- **Context Preservation**: Maintains conversation context across sessions
- **Progressive Enhancement**: Works with or without voice capabilities

### Cultural Adaptation

- **Tamil Microcopy**: All UI elements include Tamil translations
- **Festival Awareness**: Recognizes South Indian festivals and customs
- **Family Values**: Emphasizes respect, gratitude, and community

## 📊 Analytics & Insights

### Usage Tracking

- Command frequency analysis
- Success rate monitoring
- Popular feature identification

### Performance Metrics

- Response time measurement
- Accuracy rate tracking
- User satisfaction scoring

## 🔒 Privacy & Security

### Data Handling

- **Local Processing**: Voice data processed locally when possible
- **No Cloud Storage**: Commands not stored or transmitted
- **Session-Based**: All data cleared between sessions

### Permissions

- **Microphone Access**: Only when actively using voice features
- **Speech Synthesis**: Used for assistant responses only
- **Data Isolation**: No sharing between family members

## 🎨 UI/UX Design

### Emotion-Aware Colors

- **Joy**: Yellow/gold tones for positive interactions
- **Stress**: Blue/calming colors for support
- **Neutral**: Warm orange for everyday use
- **Gratitude**: Pink/purple for appreciation

### Tamil Typography

- **Noto Sans Tamil**: Primary font for Tamil text
- **Inter**: Secondary font for English text
- **Responsive Scaling**: Adapts to different screen sizes

## 🚀 Future Enhancements

### AI Integration

- **GPT Integration**: Advanced natural language understanding
- **Personalization**: Learns user preferences and habits
- **Predictive Actions**: Anticipates needs based on patterns

### Extended Features

- **Multi-User Support**: Individual profiles for family members
- **Smart Home Integration**: Control IoT devices with voice
- **Health Monitoring**: Integration with wellness features

### Advanced Voice

- **Offline Processing**: Local speech recognition
- **Accent Adaptation**: Learns regional Tamil variations
- **Context Awareness**: Understands family relationships and roles

## 🐛 Troubleshooting

### Voice Recognition Issues

- **Check Permissions**: Ensure microphone access is granted
- **Browser Compatibility**: Use Chrome or Edge for best results
- **Network Connection**: Stable internet for cloud processing

### Performance Problems

- **Clear Cache**: Browser cache may affect speech recognition
- **Restart Browser**: Fresh start often resolves issues
- **Check Updates**: Ensure browser is up to date

### Tamil Language Support

- **Font Installation**: Ensure Noto Sans Tamil is installed
- **Browser Settings**: Set language preferences correctly
- **Fallback Support**: English commands always available

## 📚 API Reference

### Voice Commands API

```typescript
interface VoiceCommand {
  text: string;
  language: "ta" | "en";
  confidence: number;
  timestamp: Date;
  emotion?: "joy" | "stress" | "gratitude" | "neutral";
}
```

### Store Actions

```typescript
// Todo Actions
todoActions.add({ title: string, category: string, voiceCreated: boolean })
todoActions.toggle(id: string)
todoActions.remove(id: string)

// Note Actions
noteActions.add({ content: string, emotionTag: string, voiceCreated: boolean })

// Reminder Actions
reminderActions.add({ message: string, time: string, repeat: string })

// Event Actions
eventActions.add({ title: string, date: string, description: string })

// Recording Actions
recordingActions.start({ filePath: string, startedAt: string })
recordingActions.stop()
```

## 🤝 Contributing

### Component Development

1. Follow the simple scaffold pattern for new components
2. Include Tamil microcopy in all user-facing text
3. Implement voice-first interactions
4. Add emotion awareness where appropriate

### Voice Command Addition

1. Define command patterns in Tamil and English
2. Implement intent parsing logic
3. Add appropriate store actions
4. Test with various accents and speech patterns

### Testing

- **Unit Tests**: Component functionality
- **Integration Tests**: Voice command processing
- **User Testing**: Real-world family scenarios
- **Accessibility Testing**: Screen reader compatibility

---

_Shivo AI Assistant - Bringing intelligence and warmth to South Indian family life through voice-first automation._ 🧠✨
