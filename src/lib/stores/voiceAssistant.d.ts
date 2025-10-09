import { Writable } from 'svelte/store';

export declare const reminders: Writable<any[]>;
export declare const todos: Writable<any[]>;
export declare const events: Writable<any[]>;
export declare const notes: Writable<any[]>;
export declare const recordings: Writable<any[]>;

export declare const isListening: Writable<boolean>;
export declare const transcript: Writable<string>;
export declare const emotion: Writable<string>;

export declare function parseIntent(transcript: string): Promise<any>;
export declare function executeAction(intent: any): void;
export declare function startVoiceRecognition(): void;
export declare function stopVoiceRecognition(): void;
export declare function speakResponse(text: string): void;