/// <reference types="svelte" />
/// <reference types="vite/client" />

// Google API type declarations
declare global {
  interface Window {
    gapi: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    webkitAudioContext: typeof AudioContext;
  }
}
