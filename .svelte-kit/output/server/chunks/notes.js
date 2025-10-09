import { w as writable } from "./index.js";
const initialTodos = [
  {
    id: "1",
    title: "Buy onions and tomatoes",
    category: "grocery",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    completed: false,
    voiceCreated: true
  },
  {
    id: "2",
    title: "Call Appa at 5 PM",
    category: "family",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    completed: false,
    voiceCreated: true
  }
];
const todos = writable(initialTodos);
const initialReminders = [
  {
    id: "1",
    message: "Call Appa at 5 PM",
    time: "17:00",
    repeat: "none",
    completed: false,
    voiceCreated: true
  },
  {
    id: "2",
    message: "Pay water tax (due Oct 15)",
    time: "09:00",
    repeat: "none",
    completed: false,
    voiceCreated: true
  },
  {
    id: "3",
    message: "Daily meditation",
    time: "06:00",
    repeat: "daily",
    completed: false,
    voiceCreated: false
  }
];
const reminders = writable(initialReminders);
const initialNotes = [
  {
    id: "1",
    content: "Amma made sweet pongal today - it was delicious!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    emotionTag: "joy",
    voiceCreated: true
  },
  {
    id: "2",
    content: "Need to organize the pooja room before Diwali",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    emotionTag: "gratitude",
    voiceCreated: true
  }
];
const notes = writable(initialNotes);
export {
  notes as n,
  reminders as r,
  todos as t
};
