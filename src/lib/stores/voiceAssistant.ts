import { writable, type Writable } from 'svelte/store';

// Stores for different data types
export const reminders: Writable<any[]> = writable([]);
export const todos: Writable<any[]> = writable([]);
export const events: Writable<any[]> = writable([]);
export const notes: Writable<any[]> = writable([]);
export const recordings: Writable<any[]> = writable([]);

// Voice assistant state
export const isListening: Writable<boolean> = writable(false);
export const transcript: Writable<string> = writable('');
export const emotion: Writable<string> = writable('neutral');

// OpenAI API key (should be set in environment variables)
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Function to parse intent using OpenAI
export async function parseIntent(transcript: string): Promise<any> {
  const prompt = `You are a helpful assistant for a South Indian family. Based on this voice command, extract the intent and generate a JSON object with one of: createTodo, setReminder, createNote, setEventReminder, startRecording, or stopRecording. Include relevant fields like title, message, time, date, content, etc.\n\nCommand: "${transcript}"\n\nReturn only valid JSON.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const parsedIntent = JSON.parse(data.choices[0].message.content);
    return parsedIntent;
  } catch (error) {
    console.error('Error parsing intent:', error);
    return null;
  }
}

// Function to execute action based on intent
export function executeAction(intent: any): void {
  switch (intent.type) {
    case 'createTodo':
      todos.update(t => [...t, {
        id: Date.now().toString(),
        title: intent.title,
        category: "custom",
        createdAt: new Date().toISOString(),
        completed: false,
        voiceCreated: true
      }]);
      break;
    case 'setReminder':
      reminders.update(r => [...r, {
        id: Date.now().toString(),
        message: intent.message,
        time: intent.time,
        repeat: "none",
        completed: false,
        voiceCreated: true
      }]);
      break;
    case 'createNote':
      notes.update(n => [...n, {
        id: Date.now().toString(),
        content: intent.content,
        emotionTag: "neutral",
        timestamp: new Date().toISOString(),
        voiceCreated: true
      }]);
      break;
    case 'setEventReminder':
      events.update(e => [...e, {
        id: Date.now().toString(),
        title: intent.title,
        date: intent.date,
        category: "custom",
        voiceCreated: true
      }]);
      break;
    case 'startRecording':
      // This would be handled by the recording component
      break;
    case 'stopRecording':
      // This would be handled by the recording component
      break;
  }
}

// Voice recognition setup
let recognition: any;

export function startVoiceRecognition(): void {
  if (!(window as any).webkitSpeechRecognition) {
    alert('Speech recognition not supported in this browser');
    return;
  }

  recognition = new (window as any).webkitSpeechRecognition();
  recognition.lang = 'en-IN'; // Can be changed to 'ta-IN' for Tamil
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening.set(true);
  };

  recognition.onresult = async (event: any) => {
    const transcriptText = event.results[0][0].transcript;
    transcript.set(transcriptText);

    const intent = await parseIntent(transcriptText);
    if (intent) {
      executeAction(intent);
      speakResponse(`I've ${intent.type === 'createTodo' ? 'created a task' : intent.type === 'setReminder' ? 'set a reminder' : intent.type === 'createNote' ? 'created a note' : intent.type === 'setEventReminder' ? 'scheduled an event' : 'processed your request'} for you.`);
    }
  };

  recognition.onend = () => {
    isListening.set(false);
  };

  recognition.start();
}

export function stopVoiceRecognition(): void {
  if (recognition) {
    recognition.stop();
  }
}

// Text-to-speech function
export function speakResponse(text: string): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  speechSynthesis.speak(utterance);
}
