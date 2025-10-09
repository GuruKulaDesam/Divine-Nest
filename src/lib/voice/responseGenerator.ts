// Natural response generator for Shivo
// Provides contextual Tamil-English responses

export function generateResponse(intent: any): string {
  switch (intent.type) {
    case 'createTodo':
      const todoResponses = [
        `சரி, '${intent.title}' பட்டியலில் சேர்க்கப்பட்டது.`,
        `Okay, added '${intent.title}' to your list.`,
        `நினைவில் வைத்தேன். '${intent.title}' பட்டியலில் சேர்த்துவிட்டேன்.`,
        `Got it! '${intent.title}' has been added to your shopping list.`
      ]
      return todoResponses[Math.floor(Math.random() * todoResponses.length)]

    case 'setReminder':
      const reminderResponses = [
        `நினைவூட்டல் ${intent.time} மணிக்கு அமைக்கப்பட்டது.`,
        `Reminder set for ${intent.time}.`,
        `சரி, ${intent.time} மணிக்கு நினைவூட்டல் அமைத்துவிட்டேன்.`,
        `I'll remind you at ${intent.time}.`
      ]
      return reminderResponses[Math.floor(Math.random() * reminderResponses.length)]

    case 'createNote':
      const noteResponses = [
        `குறிப்பு பதிவு செய்யப்பட்டது. நினைவில் வைத்தேன்.`,
        `Note saved. I'll remember that.`,
        `சரி, குறிப்பு எடுத்துக்கொண்டேன்.`,
        `Got it! Your note has been saved.`
      ]
      return noteResponses[Math.floor(Math.random() * noteResponses.length)]

    case 'setEventReminder':
      const eventResponses = [
        `${intent.title} நிகழ்வு ${intent.date} அன்று சேர்க்கப்பட்டது.`,
        `Event '${intent.title}' added for ${intent.date}.`,
        `நிகழ்வு பதிவு செய்யப்பட்டது. நினைவில் வைத்தேன்.`,
        `Okay, I've added '${intent.title}' to your calendar for ${intent.date}.`
      ]
      return eventResponses[Math.floor(Math.random() * eventResponses.length)]

    case 'startRecording':
      const recordingStartResponses = [
        `பதிவு தொடங்கப்பட்டது. நீங்கள் முடிக்கும்போது சொல்லுங்கள்.`,
        `Recording started. Let me know when you're done.`,
        `குரல் பதிவு தொடங்கியது.`,
        `I'm recording now. Say 'stop recording' when finished.`
      ]
      return recordingStartResponses[Math.floor(Math.random() * recordingStartResponses.length)]

    case 'stopRecording':
      const recordingStopResponses = [
        `பதிவு நிறுத்தப்பட்டது.`,
        `Recording stopped.`,
        `குரல் பதிவு முடிந்தது.`,
        `Recording saved.`
      ]
      return recordingStopResponses[Math.floor(Math.random() * recordingStopResponses.length)]

    default:
      const defaultResponses = [
        `நான் உங்களுடன் இருக்கிறேன். மேலும் என்ன செய்ய வேண்டும்?`,
        `I'm here with you. What else can I help with?`,
        `சொல்லுங்கள், உதவ வேண்டுமா?`,
        `How can I assist you further?`
      ]
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
}

// Text-to-speech function (simplified)
export function speak(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)

    // Try to use a female voice if available
    const voices = speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice =>
      voice.name.includes('Female') ||
      voice.name.includes('Zira') ||
      voice.name.includes('Google') ||
      voice.lang.startsWith('en-IN') ||
      voice.lang.startsWith('ta')
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.lang = 'en-IN' // Primary language
    utterance.rate = 0.9 // Slightly slower for clarity
    utterance.pitch = 1.1 // Slightly higher pitch for friendly tone

    speechSynthesis.speak(utterance)
  } else {
    console.warn('Speech synthesis not supported')
  }
}