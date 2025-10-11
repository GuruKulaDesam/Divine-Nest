import "clsx";
import { h as head, b as attr_class, a as ensure_array_like, s as stringify } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { w as writable } from "../../../../../chunks/index.js";
import { t as todos, r as reminders, n as notes } from "../../../../../chunks/reminders.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
const initialEvents = [
  {
    id: "1",
    title: "School leave on Monday",
    date: "2025-10-14",
    category: "school",
    voiceCreated: true
  },
  {
    id: "2",
    title: "Diwali celebrations",
    date: "2025-10-20",
    category: "festival",
    voiceCreated: false
  },
  {
    id: "3",
    title: "Family gathering",
    date: "2025-10-25",
    category: "family",
    voiceCreated: true
  }
];
const events = writable(initialEvents);
class BaseAgent {
  constructor(name, capabilities = []) {
    this.name = name;
    this.capabilities = capabilities;
    this.memory = /* @__PURE__ */ new Map();
    this.goals = [];
    this.isActive = false;
  }
  async initialize() {
    this.isActive = true;
    console.log(`${this.name} agent initialized`);
  }
  async shutdown() {
    this.isActive = false;
    console.log(`${this.name} agent shutdown`);
  }
  async process(input) {
    if (!this.isActive) return null;
    this.memory.set(Date.now(), input);
    return await this.execute(input);
  }
  async execute(input) {
    return { response: "Base agent response", actions: [] };
  }
  addGoal(goal) {
    this.goals.push(goal);
  }
  getMemory(limit = 10) {
    const entries = Array.from(this.memory.entries());
    return entries.slice(-limit).map(([timestamp, data]) => ({
      timestamp: new Date(timestamp),
      data
    }));
  }
}
class AgentOrchestrator {
  constructor() {
    this.agents = /* @__PURE__ */ new Map();
    this.activeRole = "family";
    this.roles = {
      paati: { name: "Paati", preferences: { tone: "gentle", language: "tamil", pace: "slow" } },
      appa: { name: "Appa", preferences: { tone: "practical", language: "english", pace: "efficient" } },
      amma: { name: "Amma", preferences: { tone: "nurturing", language: "mixed", pace: "organized" } },
      kids: { name: "Kids", preferences: { tone: "playful", language: "english", pace: "fun" } },
      family: { name: "Family", preferences: { tone: "warm", language: "mixed", pace: "balanced" } }
    };
  }
  registerAgent(agent) {
    this.agents.set(agent.name, agent);
  }
  setActiveRole(role) {
    if (this.roles[role]) {
      this.activeRole = role;
      console.log(`Active role changed to: ${this.roles[role].name}`);
    }
  }
  getRolePreferences() {
    return this.roles[this.activeRole].preferences;
  }
  async processWithAgents(input, context = {}) {
    const results = [];
    const rolePrefs = this.getRolePreferences();
    const enhancedInput = {
      ...input,
      role: this.activeRole,
      preferences: rolePrefs,
      context
    };
    for (const [name, agent] of this.agents) {
      try {
        const result = await agent.process(enhancedInput);
        if (result) {
          results.push({ agent: name, result });
        }
      } catch (error) {
        console.error(`Error in ${name} agent:`, error);
      }
    }
    return this.orchestrateResponses(results, enhancedInput);
  }
  orchestrateResponses(agentResults, input) {
    const prioritized = agentResults.sort((a, b) => {
      const priorityOrder = ["memory", "planner", "voice", "ui", "tool", "music"];
      const aIndex = priorityOrder.indexOf(a.agent);
      const bIndex = priorityOrder.indexOf(b.agent);
      return aIndex - bIndex;
    });
    const combined = {
      responses: prioritized.map((r) => r.result.response).filter((r) => r),
      actions: prioritized.flatMap((r) => r.result.actions || []),
      role: input.role,
      preferences: input.preferences
    };
    return combined;
  }
  async initializeAllAgents() {
    for (const agent of this.agents.values()) {
      await agent.initialize();
    }
  }
  async shutdownAllAgents() {
    for (const agent of this.agents.values()) {
      await agent.shutdown();
    }
  }
}
const orchestrator = new AgentOrchestrator();
const agentState = writable({
  activeRole: "family",
  activeAgents: [],
  lastInteraction: null,
  memory: [],
  goals: []
});
class MemoryAgent extends BaseAgent {
  constructor() {
    super("memory", ["store", "recall", "learn", "context"]);
    this.longTermMemory = /* @__PURE__ */ new Map();
    this.shortTermMemory = [];
    this.emotionalContext = /* @__PURE__ */ new Map();
    this.userProfiles = /* @__PURE__ */ new Map();
    this.routines = /* @__PURE__ */ new Map();
  }
  async initialize() {
    await super.initialize();
    this.loadPersistedMemory();
    this.initializeDefaultProfiles();
  }
  initializeDefaultProfiles() {
    this.userProfiles.set("paati", {
      name: "Paati",
      preferences: {
        tone: "gentle",
        language: "tamil",
        pace: "slow",
        interests: ["devotional", "health", "family"],
        routines: ["morning_prayers", "temple_visits", "grandchildren_time"]
      },
      emotional_patterns: ["gratitude", "concern", "peace"],
      facts: ["prefers_soft_reminders", "loves_devotional_music", "needs_help_with_technology"]
    });
    this.userProfiles.set("appa", {
      name: "Appa",
      preferences: {
        tone: "practical",
        language: "english",
        pace: "efficient",
        interests: ["work", "health", "projects"],
        routines: ["morning_walk", "work_tasks", "family_time"]
      },
      emotional_patterns: ["focused", "concerned", "proud"],
      facts: ["early_riser", "loves_voice_to_music", "manages_finances"]
    });
    this.userProfiles.set("amma", {
      name: "Amma",
      preferences: {
        tone: "nurturing",
        language: "mixed",
        pace: "organized",
        interests: ["cooking", "health", "children"],
        routines: ["meal_planning", "shopping", "wellness"]
      },
      emotional_patterns: ["caring", "worried", "joyful"],
      facts: ["meal_planner", "health_conscious", "manages_household"]
    });
    this.userProfiles.set("kids", {
      name: "Kids",
      preferences: {
        tone: "playful",
        language: "english",
        pace: "fun",
        interests: ["games", "learning", "stories"],
        routines: ["school", "playtime", "bedtime_stories"]
      },
      emotional_patterns: ["excited", "curious", "tired"],
      facts: ["love_stories", "learning_oriented", "need_routines"]
    });
  }
  async execute(input) {
    const { type, data, role } = input;
    switch (type) {
      case "store_fact":
        return this.storeFact(data, role);
      case "recall_context":
        return this.recallContext(role, data?.category);
      case "update_emotion":
        return this.updateEmotionalContext(role, data?.emotion);
      case "learn_routine":
        return this.learnRoutine(data, role);
      case "get_profile":
        return this.getUserProfile(role);
      default:
        return this.provideContext(input);
    }
  }
  storeFact(fact, role) {
    const key = `${role}_${Date.now()}`;
    this.longTermMemory.set(key, {
      fact,
      role,
      timestamp: /* @__PURE__ */ new Date(),
      confidence: 1
    });
    return {
      response: `Learned: ${fact}`,
      actions: [{ type: "memory_stored", data: { key, fact, role } }]
    };
  }
  recallContext(role, category = null) {
    const relevantFacts = Array.from(this.longTermMemory.values()).filter((item) => item.role === role).filter((item) => !category || this.categorizeFact(item.fact) === category).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
    const profile = this.userProfiles.get(role);
    const emotionalState = this.emotionalContext.get(role) || "neutral";
    return {
      response: `Context for ${role}: ${relevantFacts.length} relevant facts, emotional state: ${emotionalState}`,
      actions: [],
      context: {
        facts: relevantFacts,
        profile,
        emotionalState,
        routines: this.routines.get(role) || []
      }
    };
  }
  updateEmotionalContext(role, emotion) {
    this.emotionalContext.set(role, emotion);
    const key = `emotion_${role}_${Date.now()}`;
    this.longTermMemory.set(key, {
      fact: `Felt ${emotion}`,
      role,
      timestamp: /* @__PURE__ */ new Date(),
      type: "emotion",
      confidence: 0.8
    });
    return {
      response: `Emotional context updated for ${role}: ${emotion}`,
      actions: [{ type: "emotion_updated", data: { role, emotion } }]
    };
  }
  learnRoutine(routine, role) {
    const existing = this.routines.get(role) || [];
    existing.push({
      ...routine,
      learned: /* @__PURE__ */ new Date(),
      confidence: 0.6
      // Start with moderate confidence
    });
    this.routines.set(role, existing);
    return {
      response: `Learned routine for ${role}: ${routine.name}`,
      actions: [{ type: "routine_learned", data: { role, routine } }]
    };
  }
  getUserProfile(role) {
    const profile = this.userProfiles.get(role);
    if (!profile) {
      return {
        response: `No profile found for ${role}`,
        actions: []
      };
    }
    return {
      response: `Profile loaded for ${profile.name}`,
      actions: [],
      profile
    };
  }
  provideContext(input) {
    const role = input.role || "family";
    const profile = this.userProfiles.get(role);
    const emotionalState = this.emotionalContext.get(role) || "neutral";
    const recentFacts = Array.from(this.longTermMemory.values()).filter((item) => item.role === role).sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);
    return {
      response: `Context provided for ${role}`,
      actions: [],
      context: {
        profile,
        emotionalState,
        recentFacts,
        preferences: profile?.preferences || {}
      }
    };
  }
  categorizeFact(fact) {
    const categories = {
      preference: ["prefers", "likes", "loves", "needs"],
      routine: ["every day", "usually", "always", "schedule"],
      health: ["health", "medicine", "doctor", "pain", "tired"],
      emotion: ["happy", "sad", "worried", "excited", "grateful"],
      family: ["family", "children", "parents", "relatives"]
    };
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => fact.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return "general";
  }
  loadPersistedMemory() {
    try {
      const stored = localStorage.getItem("shivo_memory");
      if (stored) {
        const data = JSON.parse(stored);
        this.longTermMemory = new Map(data.longTermMemory || []);
        this.emotionalContext = new Map(data.emotionalContext || []);
        this.routines = new Map(data.routines || []);
      }
    } catch (error) {
      console.warn("Failed to load persisted memory:", error);
    }
  }
  persistMemory() {
    try {
      const data = {
        longTermMemory: Array.from(this.longTermMemory.entries()),
        emotionalContext: Array.from(this.emotionalContext.entries()),
        routines: Array.from(this.routines.entries())
      };
      localStorage.setItem("shivo_memory", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to persist memory:", error);
    }
  }
  // Auto-persist memory periodically
  startAutoPersist() {
    setInterval(() => this.persistMemory(), 3e4);
  }
}
class PlannerAgent extends BaseAgent {
  constructor() {
    super("planner", ["schedule", "remind", "plan", "coordinate"]);
    this.activePlans = /* @__PURE__ */ new Map();
    this.routines = /* @__PURE__ */ new Map();
    this.timeTriggers = /* @__PURE__ */ new Map();
  }
  async initialize() {
    await super.initialize();
    this.initializeDefaultRoutines();
    this.startTimeMonitoring();
  }
  initializeDefaultRoutines() {
    this.routines.set("paati", [
      { name: "morning_prayers", time: "06:00", action: "remind_prayer" },
      { name: "temple_visit", time: "07:00", days: [1, 3, 5], action: "plan_temple" },
      { name: "grandchildren_time", time: "16:00", action: "remind_family_time" },
      { name: "evening_meditation", time: "19:00", action: "suggest_meditation" }
    ]);
    this.routines.set("appa", [
      { name: "morning_walk", time: "05:30", action: "remind_walk" },
      { name: "work_start", time: "09:00", action: "check_tasks" },
      { name: "lunch_break", time: "13:00", action: "suggest_meal" },
      { name: "family_time", time: "18:00", action: "plan_family_activity" }
    ]);
    this.routines.set("amma", [
      { name: "meal_prep", time: "07:00", action: "plan_meals" },
      { name: "shopping_list", time: "10:00", action: "review_grocery" },
      { name: "kids_pickup", time: "15:30", action: "remind_pickup" },
      { name: "evening_routine", time: "20:00", action: "start_bedtime" }
    ]);
    this.routines.set("kids", [
      { name: "school_prep", time: "07:30", action: "remind_school" },
      { name: "study_time", time: "17:00", action: "start_homework" },
      { name: "playtime", time: "16:00", action: "suggest_activities" },
      { name: "bedtime_story", time: "20:30", action: "tell_story" }
    ]);
  }
  async execute(input) {
    const { type, data, role, preferences } = input;
    switch (type) {
      case "create_plan":
        return this.createPlan(data, role);
      case "schedule_task":
        return this.scheduleTask(data, role);
      case "check_routines":
        return this.checkRoutines(role);
      case "coordinate_activity":
        return this.coordinateActivity(data, role);
      case "time_trigger":
        return this.handleTimeTrigger(data);
      default:
        return this.analyzeAndPlan(input);
    }
  }
  createPlan(planData, role) {
    const planId = `plan_${role}_${Date.now()}`;
    const plan = {
      id: planId,
      ...planData,
      role,
      created: /* @__PURE__ */ new Date(),
      status: "active",
      steps: planData.steps || [],
      deadline: planData.deadline || null
    };
    this.activePlans.set(planId, plan);
    return {
      response: `Created plan: ${planData.title} for ${role}`,
      actions: [
        { type: "plan_created", data: plan },
        { type: "schedule_reminders", data: { planId, steps: plan.steps } }
      ]
    };
  }
  scheduleTask(taskData, role) {
    const task = {
      ...taskData,
      role,
      scheduled: /* @__PURE__ */ new Date(),
      status: "pending"
    };
    if (task.type === "todo") {
      todos.update((t) => [...t, { ...task, id: Date.now(), completed: false }]);
    } else if (task.type === "reminder") {
      reminders.update((r) => [...r, { ...task, id: Date.now(), completed: false }]);
    } else if (task.type === "event") {
      events.update((e) => [...e, { ...task, id: Date.now() }]);
    }
    return {
      response: `Scheduled ${task.type}: ${task.title} for ${role}`,
      actions: [{ type: "task_scheduled", data: task }]
    };
  }
  checkRoutines(role) {
    const now = /* @__PURE__ */ new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDay = now.getDay();
    const roleRoutines = this.routines.get(role) || [];
    const dueRoutines = roleRoutines.filter((routine) => {
      const isTimeMatch = routine.time === currentTime;
      const isDayMatch = !routine.days || routine.days.includes(currentDay);
      return isTimeMatch && isDayMatch;
    });
    if (dueRoutines.length > 0) {
      const actions = dueRoutines.map((routine) => ({
        type: routine.action,
        data: { routine: routine.name, role, time: routine.time }
      }));
      return {
        response: `Time for ${role}'s ${dueRoutines.map((r) => r.name).join(", ")}`,
        actions
      };
    }
    return {
      response: `No routines due for ${role} at this time`,
      actions: []
    };
  }
  coordinateActivity(activityData, role) {
    const coordination = {
      activity: activityData.title,
      participants: activityData.participants || [role],
      time: activityData.time,
      coordination: this.generateCoordinationPlan(activityData, role)
    };
    return {
      response: `Coordinated ${activityData.title} for ${coordination.participants.join(", ")}`,
      actions: [
        { type: "activity_coordinated", data: coordination },
        { type: "send_notifications", data: { activity: coordination } }
      ]
    };
  }
  handleTimeTrigger(triggerData) {
    const { time, action, context } = triggerData;
    switch (action) {
      case "remind_prayer":
        return this.createPrayerReminder(context);
      case "plan_temple":
        return this.planTempleVisit(context);
      case "remind_walk":
        return this.createWalkReminder(context);
      case "check_tasks":
        return this.checkPendingTasks(context);
      case "suggest_meal":
        return this.suggestMealBreak(context);
      case "plan_meals":
        return this.planMeals(context);
      case "remind_pickup":
        return this.createPickupReminder(context);
      case "start_bedtime":
        return this.startBedtimeRoutine(context);
      default:
        return { response: `Unknown time trigger: ${action}`, actions: [] };
    }
  }
  analyzeAndPlan(input) {
    const { text, role, preferences } = input;
    if (text.includes("tired") || text.includes("rest")) {
      return this.createRestPlan(role);
    }
    if (text.includes("hungry") || text.includes("eat")) {
      return this.createMealPlan(role);
    }
    if (text.includes("busy") || text.includes("work")) {
      return this.createFocusPlan(role);
    }
    return {
      response: `Analyzed input for ${role}, no specific plan needed`,
      actions: []
    };
  }
  // Specific planning methods
  createPrayerReminder(context) {
    return {
      response: "Time for morning prayers",
      actions: [{
        type: "create_reminder",
        data: {
          title: "Morning Prayers",
          message: "Time for your daily prayers and meditation",
          time: new Date(Date.now() + 5 * 60 * 1e3).toISOString(),
          // 5 minutes from now
          role: context.role
        }
      }]
    };
  }
  planTempleVisit(context) {
    const today = /* @__PURE__ */ new Date();
    const templeTime = new Date(today);
    templeTime.setHours(7, 0, 0, 0);
    return {
      response: "Planning temple visit for today",
      actions: [{
        type: "create_event",
        data: {
          title: "Temple Visit",
          date: today.toISOString().split("T")[0],
          time: "07:00",
          category: "spiritual",
          role: context.role
        }
      }]
    };
  }
  createWalkReminder(context) {
    return {
      response: "Time for your morning walk",
      actions: [{
        type: "create_reminder",
        data: {
          title: "Morning Walk",
          message: "Time for your daily walk - stay healthy!",
          time: new Date(Date.now() + 10 * 60 * 1e3).toISOString(),
          role: context.role
        }
      }]
    };
  }
  checkPendingTasks(context) {
    return {
      response: "Checking your pending tasks for today",
      actions: [{ type: "review_tasks", data: { role: context.role } }]
    };
  }
  suggestMealBreak(context) {
    return {
      response: "Time for lunch break",
      actions: [{
        type: "create_reminder",
        data: {
          title: "Lunch Break",
          message: "Take a break and have your meal",
          time: new Date(Date.now() + 5 * 60 * 1e3).toISOString(),
          role: context.role
        }
      }]
    };
  }
  planMeals(context) {
    return {
      response: "Planning meals for the day",
      actions: [{ type: "plan_meals", data: { role: context.role } }]
    };
  }
  createPickupReminder(context) {
    return {
      response: "Time to pick up the children",
      actions: [{
        type: "create_reminder",
        data: {
          title: "School Pickup",
          message: "Time to pick up the children from school",
          time: new Date(Date.now() + 5 * 60 * 1e3).toISOString(),
          role: context.role
        }
      }]
    };
  }
  startBedtimeRoutine(context) {
    return {
      response: "Starting bedtime routine for the children",
      actions: [
        { type: "create_reminder", data: { title: "Bedtime Story", role: "kids" } },
        { type: "dim_lights", data: {} },
        { type: "play_soft_music", data: {} }
      ]
    };
  }
  createRestPlan(role) {
    return {
      response: `Creating a rest plan for ${role}`,
      actions: [{
        type: "create_plan",
        data: {
          title: "Rest and Recovery",
          steps: [
            "Take a short break",
            "Drink water",
            "Do deep breathing",
            "Rest for 15 minutes"
          ],
          role
        }
      }]
    };
  }
  createMealPlan(role) {
    return {
      response: `Planning a meal for ${role}`,
      actions: [{
        type: "suggest_meal",
        data: { role, time: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5) }
      }]
    };
  }
  createFocusPlan(role) {
    return {
      response: `Creating focus plan for ${role}`,
      actions: [{
        type: "create_plan",
        data: {
          title: "Focus Session",
          steps: [
            "Clear workspace",
            "Set timer for 25 minutes",
            "Work without distractions",
            "Take a 5-minute break"
          ],
          role
        }
      }]
    };
  }
  generateCoordinationPlan(activity, role) {
    return [
      `Notify all participants about ${activity.title}`,
      `Check availability for ${activity.time}`,
      `Prepare necessary items`,
      `Confirm participation`,
      `Execute activity`
    ];
  }
  startTimeMonitoring() {
    setInterval(() => {
      this.checkAllRoutines();
    }, 6e4);
  }
  checkAllRoutines() {
    const roles = ["paati", "appa", "amma", "kids"];
    roles.forEach((role) => {
      const result = this.checkRoutines(role);
      if (result.actions.length > 0) {
        result.actions.forEach((action) => {
          this.handleTimeTrigger({
            time: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5),
            action: action.type,
            context: { role }
          });
        });
      }
    });
  }
}
class VoiceAgent extends BaseAgent {
  constructor() {
    super("voice", ["listen", "speak", "analyze", "transcribe"]);
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
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-IN";
      this.recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        if (finalTranscript) {
          this.processTranscript(finalTranscript);
        }
      };
      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    }
  }
  initializeSpeechSynthesis() {
    if ("speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis;
      this.voicePreferences = {
        paati: { lang: "ta-IN", rate: 0.8, pitch: 1.1 },
        appa: { lang: "en-IN", rate: 1, pitch: 1 },
        amma: { lang: "en-IN", rate: 0.9, pitch: 1 },
        kids: { lang: "en-IN", rate: 1.1, pitch: 1.2 },
        family: { lang: "en-IN", rate: 0.95, pitch: 1 }
      };
    }
  }
  async execute(input) {
    const { type, data, role, preferences } = input;
    switch (type) {
      case "start_listening":
        return this.startListening(role);
      case "stop_listening":
        return this.stopListening();
      case "speak_response":
        return this.speakResponse(data.text, role);
      case "analyze_emotion":
        return this.analyzeEmotion(data.audio || data.text);
      case "process_command":
        return this.processCommand(data.text, role);
      default:
        return this.handleVoiceInput(input);
    }
  }
  startListening(role) {
    if (this.recognition && !this.isListening) {
      const langPrefs = this.voicePreferences[role] || this.voicePreferences.family;
      this.recognition.lang = langPrefs.lang;
      this.recognition.start();
      this.isListening = true;
      return {
        response: `Started listening for ${role}`,
        actions: [{ type: "listening_started", data: { role } }]
      };
    }
    return {
      response: "Speech recognition not available or already listening",
      actions: []
    };
  }
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return {
        response: "Stopped listening",
        actions: [{ type: "listening_stopped" }]
      };
    }
    return {
      response: "Not currently listening",
      actions: []
    };
  }
  async speakResponse(text, role) {
    if (!this.synthesis) {
      return {
        response: "Speech synthesis not available",
        actions: []
      };
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const prefs = this.voicePreferences[role] || this.voicePreferences.family;
    utterance.lang = prefs.lang;
    utterance.rate = prefs.rate;
    utterance.pitch = prefs.pitch;
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.lang.startsWith(prefs.lang.split("-")[0])
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    this.synthesis.speak(utterance);
    return {
      response: `Speaking response for ${role}`,
      actions: [{ type: "speech_started", data: { text, role } }]
    };
  }
  async analyzeEmotion(input) {
    const emotion = await this.emotionAnalyzer.analyze(input);
    return {
      response: `Detected emotion: ${emotion.primary}`,
      actions: [
        { type: "emotion_detected", data: emotion },
        { type: "update_memory", data: { type: "emotion", emotion: emotion.primary } }
      ],
      emotion
    };
  }
  async processCommand(text, role) {
    const language = this.languageDetector.detect(text);
    const intent = await this.intentParser.parse(text, role, language);
    const emotion = await this.emotionAnalyzer.analyze(text);
    return {
      response: `Processed command for ${role}`,
      actions: [
        { type: "intent_parsed", data: intent },
        { type: "emotion_analyzed", data: emotion },
        { type: "execute_intent", data: { intent, role, language, emotion } }
      ],
      intent,
      emotion,
      language
    };
  }
  async processTranscript(transcript) {
    console.log("Processing transcript:", transcript);
    const wakeWords = ["shivo", "சிவோ", "nanbaa", "நண்பா", "ai", "assistant"];
    const isWakeWord = wakeWords.some(
      (word) => transcript.toLowerCase().includes(word.toLowerCase())
    );
    if (isWakeWord) {
      const result = await this.processCommand(transcript, "family");
      return {
        ...result,
        wakeWord: true
      };
    }
    return await this.processCommand(transcript, "family");
  }
  handleVoiceInput(input) {
    const { audio, text, role } = input;
    if (audio) {
      return this.processAudio(audio, role);
    } else if (text) {
      return this.processCommand(text, role);
    }
    return {
      response: "No audio or text input provided",
      actions: []
    };
  }
  async processAudio(audioBlob, role) {
    const transcript = await this.transcribeAudio(audioBlob);
    const emotion = await this.emotionAnalyzer.analyzeAudio(audioBlob);
    const result = await this.processCommand(transcript, role);
    return {
      ...result,
      transcript,
      emotion
    };
  }
  async transcribeAudio(audioBlob) {
    return "Transcribed text from audio";
  }
}
class EmotionAnalyzer {
  async analyze(input) {
    const emotionKeywords = {
      joy: ["happy", "excited", "wonderful", "great", "love", "மகிழ்ச்சி", "சந்தோஷம்"],
      stress: ["worried", "stressed", "anxious", "tired", "பதற்றம்", "கவலை"],
      gratitude: ["thank you", "grateful", "blessed", "நன்றி", "நன்றாக"],
      neutral: ["okay", "fine", "alright", "சரி", "நல்லது"]
    };
    const text = typeof input === "string" ? input.toLowerCase() : "";
    const scores = {};
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      scores[emotion] = keywords.reduce((score, keyword) => {
        return score + (text.includes(keyword) ? 1 : 0);
      }, 0);
    }
    const primary = Object.entries(scores).reduce(
      (a, b) => scores[a[0]] > scores[b[0]] ? a : b
    )[0];
    return {
      primary,
      scores,
      confidence: Math.max(...Object.values(scores)) / Math.max(1, text.split(" ").length)
    };
  }
  async analyzeAudio(audioBlob) {
    return { primary: "neutral", scores: { neutral: 1 }, confidence: 0.5 };
  }
}
class IntentParser {
  async parse(text, role, language) {
    const lowerText = text.toLowerCase();
    const patterns = {
      createTodo: ["add todo", "பட்டியல் சேர்", "create task"],
      setReminder: ["remind", "நினைவூட்டு", "reminder"],
      createNote: ["note", "குறிப்பு", "write down"],
      setEvent: ["event", "நிகழ்வு", "schedule"],
      startRecording: ["record", "பதிவு செய்", "start recording"],
      playMusic: ["play music", "இசை", "music"],
      getWeather: ["weather", "வானிலை"],
      checkHealth: ["health", "உடல் நலம்", "how are you"]
    };
    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
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
      type: "unknown",
      text,
      role,
      language,
      confidence: 0
    };
  }
  extractEntities(text, intent) {
    const entities = {};
    switch (intent) {
      case "createTodo":
      case "setReminder":
      case "createNote":
        entities.content = text.replace(/^(add todo|பட்டியல் சேர்|remind|நினைவூட்டு|note|குறிப்பு)/i, "").trim();
        break;
      case "setEvent":
        entities.title = text.replace(/^(event|நிகழ்வு)/i, "").trim();
        break;
    }
    return entities;
  }
}
class LanguageDetector {
  detect(text) {
    const tamilChars = /[\u0B80-\u0BFF]/;
    const hasTamil = tamilChars.test(text);
    if (hasTamil) {
      return "ta";
    }
    return "en";
  }
}
class UIAgent extends BaseAgent {
  constructor() {
    super("ui", ["adapt", "personalize", "optimize", "guide"]);
    this.currentTheme = "default";
    this.roleThemes = /* @__PURE__ */ new Map();
    this.emotionThemes = /* @__PURE__ */ new Map();
    this.contextualElements = /* @__PURE__ */ new Map();
  }
  async initialize() {
    await super.initialize();
    this.initializeThemes();
    this.initializeContextualElements();
  }
  initializeThemes() {
    this.roleThemes.set("paati", {
      colors: {
        primary: "emerald",
        background: "warm",
        text: "gentle"
      },
      layout: {
        fontSize: "large",
        spacing: "comfortable",
        navigation: "simple"
      },
      content: {
        language: "tamil",
        tone: "respectful",
        icons: "traditional"
      },
      interactions: {
        pace: "slow",
        feedback: "verbal",
        gestures: "minimal"
      }
    });
    this.roleThemes.set("appa", {
      colors: {
        primary: "blue",
        background: "professional",
        text: "clear"
      },
      layout: {
        fontSize: "medium",
        spacing: "efficient",
        navigation: "structured"
      },
      content: {
        language: "english",
        tone: "practical",
        icons: "modern"
      },
      interactions: {
        pace: "fast",
        feedback: "minimal",
        gestures: "precise"
      }
    });
    this.roleThemes.set("amma", {
      colors: {
        primary: "purple",
        background: "warm",
        text: "nurturing"
      },
      layout: {
        fontSize: "medium",
        spacing: "organized",
        navigation: "categorized"
      },
      content: {
        language: "mixed",
        tone: "caring",
        icons: "friendly"
      },
      interactions: {
        pace: "balanced",
        feedback: "encouraging",
        gestures: "supportive"
      }
    });
    this.roleThemes.set("kids", {
      colors: {
        primary: "orange",
        background: "playful",
        text: "fun"
      },
      layout: {
        fontSize: "large",
        spacing: "spacious",
        navigation: "visual"
      },
      content: {
        language: "english",
        tone: "exciting",
        icons: "animated"
      },
      interactions: {
        pace: "engaging",
        feedback: "celebratory",
        gestures: "expressive"
      }
    });
    this.emotionThemes.set("joy", {
      colors: { brightness: 1.2, saturation: 1.1 },
      animations: "celebratory",
      content: "positive"
    });
    this.emotionThemes.set("stress", {
      colors: { brightness: 0.9, saturation: 0.8 },
      layout: "calming",
      content: "soothing"
    });
    this.emotionThemes.set("gratitude", {
      colors: { warmth: 1.2 },
      content: "appreciative",
      interactions: "grateful"
    });
  }
  initializeContextualElements() {
    this.contextualElements.set("prayer_time", {
      show: ["paati"],
      elements: ["devotional_music", "temple_reminder", "peaceful_background"]
    });
    this.contextualElements.set("meal_time", {
      show: ["amma", "family"],
      elements: ["recipe_suggestions", "grocery_reminder", "cooking_timer"]
    });
    this.contextualElements.set("study_time", {
      show: ["kids"],
      elements: ["study_timer", "break_reminder", "achievement_badges"]
    });
    this.contextualElements.set("work_time", {
      show: ["appa"],
      elements: ["focus_timer", "task_priorities", "meeting_reminder"]
    });
  }
  async execute(input) {
    const { type, data, role, preferences, emotion } = input;
    switch (type) {
      case "adapt_interface":
        return this.adaptInterface(role, emotion, data?.context);
      case "personalize_content":
        return this.personalizeContent(data?.content, role, preferences);
      case "optimize_layout":
        return this.optimizeLayout(data?.screen, role);
      case "guide_interaction":
        return this.guideInteraction(data?.action, role);
      default:
        return this.provideUIAdaptation(input);
    }
  }
  adaptInterface(role, emotion, context) {
    const roleTheme = this.roleThemes.get(role) || this.roleThemes.get("family");
    const emotionTheme = this.emotionThemes.get(emotion);
    const adaptedTheme = this.combineThemes(roleTheme, emotionTheme);
    const contextualElements = this.getContextualElements(context, role);
    return {
      response: `Adapted interface for ${role} with ${emotion} emotion`,
      actions: [
        { type: "apply_theme", data: adaptedTheme },
        { type: "show_elements", data: contextualElements },
        { type: "update_navigation", data: { role, theme: adaptedTheme } }
      ],
      theme: adaptedTheme,
      elements: contextualElements
    };
  }
  personalizeContent(content, role, preferences) {
    const roleTheme = this.roleThemes.get(role);
    const personalized = {
      ...content,
      language: preferences?.language || roleTheme?.content?.language || "english",
      tone: roleTheme?.content?.tone || "neutral",
      style: this.adaptContentStyle(content, roleTheme)
    };
    return {
      response: `Personalized content for ${role}`,
      actions: [{ type: "render_content", data: personalized }],
      content: personalized
    };
  }
  optimizeLayout(screenData, role) {
    const roleTheme = this.roleThemes.get(role);
    const { width, height, device } = screenData || {};
    const layout = {
      fontSize: this.calculateFontSize(width, roleTheme?.layout?.fontSize),
      spacing: roleTheme?.layout?.spacing || "normal",
      columns: this.calculateColumns(width, device),
      navigation: this.optimizeNavigation(width, roleTheme?.layout?.navigation)
    };
    return {
      response: `Optimized layout for ${role} on ${device}`,
      actions: [{ type: "apply_layout", data: layout }],
      layout
    };
  }
  guideInteraction(action, role) {
    const roleTheme = this.roleThemes.get(role);
    const guidance = {
      action,
      role,
      style: roleTheme?.interactions?.pace || "normal",
      feedback: this.generateFeedback(action, roleTheme),
      gestures: roleTheme?.interactions?.gestures || "standard"
    };
    return {
      response: `Guiding interaction for ${role}`,
      actions: [{ type: "show_guidance", data: guidance }],
      guidance
    };
  }
  provideUIAdaptation(input) {
    const { role, preferences, emotion } = input;
    const adaptation = {
      theme: this.getAdaptedTheme(role, emotion),
      layout: this.getOptimizedLayout(role, preferences),
      content: this.getPersonalizedContent(role, preferences),
      interactions: this.getInteractionGuide(role)
    };
    return {
      response: `Provided UI adaptation for ${role}`,
      actions: [{ type: "apply_adaptation", data: adaptation }],
      adaptation
    };
  }
  combineThemes(roleTheme, emotionTheme) {
    if (!emotionTheme) return roleTheme;
    return {
      ...roleTheme,
      colors: {
        ...roleTheme.colors,
        ...emotionTheme.colors
      },
      animations: emotionTheme.animations || roleTheme.animations,
      content: {
        ...roleTheme.content,
        ...emotionTheme.content
      }
    };
  }
  getContextualElements(context, role) {
    const elements = [];
    for (const [contextKey, config] of this.contextualElements) {
      if (context === contextKey && config.show.includes(role)) {
        elements.push(...config.elements);
      }
    }
    return elements;
  }
  adaptContentStyle(content, roleTheme) {
    return {
      ...content.style,
      tone: roleTheme?.content?.tone || content.style?.tone,
      language: roleTheme?.content?.language || content.style?.language,
      visual: roleTheme?.content?.icons || content.style?.visual
    };
  }
  calculateFontSize(screenWidth, preferredSize) {
    const baseSizes = {
      small: 14,
      medium: 16,
      large: 18,
      xlarge: 20
    };
    let size = baseSizes[preferredSize] || baseSizes.medium;
    if (screenWidth < 768) {
      size = Math.max(size - 2, 12);
    } else if (screenWidth > 1200) {
      size = Math.min(size + 2, 22);
    }
    return size;
  }
  calculateColumns(screenWidth, device) {
    if (device === "mobile" || screenWidth < 768) {
      return 1;
    } else if (screenWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }
  optimizeNavigation(screenWidth, navType) {
    if (screenWidth < 768) {
      return "bottom_tabs";
    } else if (navType === "simple") {
      return "sidebar_simple";
    } else {
      return "sidebar_full";
    }
  }
  generateFeedback(action, roleTheme) {
    const feedbackStyle = roleTheme?.interactions?.feedback || "standard";
    const feedbackMap = {
      standard: "Action completed successfully",
      encouraging: "Great job! That was perfect",
      celebratory: "🎉 Excellent work!",
      verbal: "I have completed that task for you",
      minimal: "✓ Done"
    };
    return feedbackMap[feedbackStyle] || feedbackMap.standard;
  }
  getAdaptedTheme(role, emotion) {
    const roleTheme = this.roleThemes.get(role);
    const emotionTheme = this.emotionThemes.get(emotion);
    return this.combineThemes(roleTheme, emotionTheme);
  }
  getOptimizedLayout(role, preferences) {
    const roleTheme = this.roleThemes.get(role);
    return {
      fontSize: roleTheme?.layout?.fontSize || "medium",
      spacing: roleTheme?.layout?.spacing || "normal",
      navigation: roleTheme?.layout?.navigation || "standard"
    };
  }
  getPersonalizedContent(role, preferences) {
    const roleTheme = this.roleThemes.get(role);
    return {
      language: preferences?.language || roleTheme?.content?.language || "english",
      tone: roleTheme?.content?.tone || "neutral",
      style: roleTheme?.content?.icons || "modern"
    };
  }
  getInteractionGuide(role) {
    const roleTheme = this.roleThemes.get(role);
    return {
      pace: roleTheme?.interactions?.pace || "normal",
      feedback: roleTheme?.interactions?.feedback || "standard",
      gestures: roleTheme?.interactions?.gestures || "standard"
    };
  }
  // Dynamic theme application
  applyTheme(theme) {
    const root = document.documentElement;
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });
    }
    document.body.className = `theme-${theme.name || "default"}`;
  }
  // Element visibility management
  showElements(elements) {
    document.querySelectorAll("[data-contextual]").forEach((el) => {
      el.style.display = "none";
    });
    elements.forEach((elementId) => {
      const element = document.querySelector(`[data-contextual="${elementId}"]`);
      if (element) {
        element.style.display = "block";
      }
    });
  }
}
class ToolAgent extends BaseAgent {
  constructor() {
    super("tool", ["execute", "integrate", "automate", "control"]);
    this.availableTools = /* @__PURE__ */ new Map();
    this.activeIntegrations = /* @__PURE__ */ new Set();
    this.toolHistory = [];
  }
  async initialize() {
    await super.initialize();
    this.registerTools();
    this.initializeIntegrations();
  }
  registerTools() {
    this.availableTools.set("calendar", new CalendarTool());
    this.availableTools.set("notes", new NotesTool());
    this.availableTools.set("music", new MusicTool());
    this.availableTools.set("reminders", new ReminderTool());
    this.availableTools.set("home_automation", new HomeAutomationTool());
    this.availableTools.set("weather", new WeatherTool());
    this.availableTools.set("health", new HealthTool());
    this.availableTools.set("shopping", new ShoppingTool());
    this.availableTools.set("communication", new CommunicationTool());
  }
  initializeIntegrations() {
    this.activeIntegrations.add("local_calendar");
    this.activeIntegrations.add("local_notes");
    this.activeIntegrations.add("local_music");
  }
  async execute(input) {
    const { type, data, role, preferences } = input;
    switch (type) {
      case "execute_action":
        return this.executeAction(data.action, data.params, role);
      case "integrate_service":
        return this.integrateService(data.service, data.config);
      case "automate_routine":
        return this.automateRoutine(data.routine, role);
      case "control_device":
        return this.controlDevice(data.device, data.command);
      default:
        return this.handleToolRequest(input);
    }
  }
  async executeAction(action, params, role) {
    const tool = this.findToolForAction(action);
    if (!tool) {
      return {
        response: `No tool available for action: ${action}`,
        actions: []
      };
    }
    try {
      const result = await tool.execute(action, params, role);
      this.toolHistory.push({
        timestamp: /* @__PURE__ */ new Date(),
        action,
        params,
        result,
        role
      });
      return {
        response: `Executed ${action} successfully`,
        actions: [{ type: "action_completed", data: { action, result, role } }],
        result
      };
    } catch (error) {
      console.error(`Tool execution failed:`, error);
      return {
        response: `Failed to execute ${action}: ${error.message}`,
        actions: [{ type: "action_failed", data: { action, error, role } }]
      };
    }
  }
  findToolForAction(action) {
    const actionToolMap = {
      // Calendar actions
      "create_event": "calendar",
      "update_event": "calendar",
      "delete_event": "calendar",
      "get_events": "calendar",
      // Notes actions
      "create_note": "notes",
      "update_note": "notes",
      "delete_note": "notes",
      "search_notes": "notes",
      // Music actions
      "play_music": "music",
      "stop_music": "music",
      "generate_music": "music",
      "set_volume": "music",
      // Reminder actions
      "create_reminder": "reminders",
      "update_reminder": "reminders",
      "delete_reminder": "reminders",
      // Home automation
      "turn_on_light": "home_automation",
      "turn_off_light": "home_automation",
      "adjust_temperature": "home_automation",
      "lock_door": "home_automation",
      // Weather
      "get_weather": "weather",
      "get_forecast": "weather",
      // Health
      "log_weight": "health",
      "log_blood_pressure": "health",
      "schedule_checkup": "health",
      // Shopping
      "add_to_cart": "shopping",
      "create_list": "shopping",
      "check_price": "shopping",
      // Communication
      "send_message": "communication",
      "make_call": "communication",
      "send_email": "communication"
    };
    const toolName = actionToolMap[action];
    return toolName ? this.availableTools.get(toolName) : null;
  }
  async integrateService(service, config) {
    try {
      const integration = await this.initializeServiceIntegration(service, config);
      this.activeIntegrations.add(service);
      return {
        response: `Integrated ${service} successfully`,
        actions: [{ type: "service_integrated", data: { service, config } }],
        integration
      };
    } catch (error) {
      return {
        response: `Failed to integrate ${service}: ${error.message}`,
        actions: []
      };
    }
  }
  async automateRoutine(routine, role) {
    const automation = {
      id: `automation_${Date.now()}`,
      routine,
      role,
      triggers: routine.triggers || [],
      actions: routine.actions || [],
      active: true
    };
    this.automations = this.automations || /* @__PURE__ */ new Map();
    this.automations.set(automation.id, automation);
    return {
      response: `Automated routine for ${role}: ${routine.name}`,
      actions: [{ type: "routine_automated", data: automation }]
    };
  }
  async controlDevice(device, command) {
    const homeTool = this.availableTools.get("home_automation");
    if (!homeTool) {
      return {
        response: "Home automation not available",
        actions: []
      };
    }
    return await homeTool.controlDevice(device, command);
  }
  handleToolRequest(input) {
    const { intent, role } = input;
    if (!intent) {
      return {
        response: "No intent provided for tool execution",
        actions: []
      };
    }
    return this.executeAction(intent.type, intent.extracted, role);
  }
  async initializeServiceIntegration(service, config) {
    switch (service) {
      case "google_calendar":
        return { status: "connected", api: "google" };
      case "spotify":
        return { status: "connected", api: "spotify" };
      case "alexa":
        return { status: "connected", api: "alexa" };
      default:
        return { status: "connected", api: "local" };
    }
  }
  getToolHistory(limit = 10) {
    return this.toolHistory.slice(-limit);
  }
  getAvailableTools() {
    return Array.from(this.availableTools.keys());
  }
  getActiveIntegrations() {
    return Array.from(this.activeIntegrations);
  }
}
class CalendarTool {
  async execute(action, params, role) {
    switch (action) {
      case "create_event":
        events.update((e) => [...e, {
          id: Date.now(),
          title: params.title,
          date: params.date,
          time: params.time,
          category: params.category || "custom",
          voiceCreated: true
        }]);
        return { success: true, event: params };
      case "get_events":
        return { success: true, events: [] };
      default:
        throw new Error(`Unknown calendar action: ${action}`);
    }
  }
}
class NotesTool {
  async execute(action, params, role) {
    switch (action) {
      case "create_note":
        notes.update((n) => [...n, {
          id: Date.now(),
          content: params.content,
          emotionTag: params.emotion || "neutral",
          voiceCreated: true,
          timestamp: /* @__PURE__ */ new Date()
        }]);
        return { success: true, note: params };
      case "search_notes":
        return { success: true, results: [] };
      default:
        throw new Error(`Unknown notes action: ${action}`);
    }
  }
}
class MusicTool {
  async execute(action, params, role) {
    switch (action) {
      case "play_music":
        return { success: true, track: params.track };
      case "generate_music":
        return { success: true, prompt: params.prompt };
      case "set_volume":
        return { success: true, volume: params.volume };
      default:
        throw new Error(`Unknown music action: ${action}`);
    }
  }
}
class ReminderTool {
  async execute(action, params, role) {
    switch (action) {
      case "create_reminder":
        reminders.update((r) => [...r, {
          id: Date.now(),
          message: params.message,
          time: params.time,
          repeat: params.repeat || "none",
          completed: false,
          voiceCreated: true
        }]);
        return { success: true, reminder: params };
      default:
        throw new Error(`Unknown reminder action: ${action}`);
    }
  }
}
class HomeAutomationTool {
  async execute(action, params, role) {
    switch (action) {
      case "turn_on_light":
      case "turn_off_light":
        return { success: true, device: params.device, state: action.includes("on") ? "on" : "off" };
      case "adjust_temperature":
        return { success: true, temperature: params.temperature };
      default:
        throw new Error(`Unknown home automation action: ${action}`);
    }
  }
  async controlDevice(device, command) {
    return this.execute(command, { device }, "family");
  }
}
class WeatherTool {
  async execute(action, params, role) {
    switch (action) {
      case "get_weather":
        return {
          success: true,
          weather: {
            temperature: 28,
            condition: "sunny",
            location: "Coimbatore"
          }
        };
      case "get_forecast":
        return { success: true, forecast: [] };
      default:
        throw new Error(`Unknown weather action: ${action}`);
    }
  }
}
class HealthTool {
  async execute(action, params, role) {
    switch (action) {
      case "log_weight":
        return { success: true, weight: params.weight, date: /* @__PURE__ */ new Date() };
      case "log_blood_pressure":
        return { success: true, systolic: params.systolic, diastolic: params.diastolic };
      default:
        throw new Error(`Unknown health action: ${action}`);
    }
  }
}
class ShoppingTool {
  async execute(action, params, role) {
    switch (action) {
      case "add_to_cart":
        return { success: true, item: params.item, quantity: params.quantity };
      case "create_list":
        return { success: true, list: params.items };
      default:
        throw new Error(`Unknown shopping action: ${action}`);
    }
  }
}
class CommunicationTool {
  async execute(action, params, role) {
    switch (action) {
      case "send_message":
        return { success: true, recipient: params.recipient, message: params.message };
      case "make_call":
        return { success: true, number: params.number };
      case "send_email":
        return { success: true, to: params.to, subject: params.subject };
      default:
        throw new Error(`Unknown communication action: ${action}`);
    }
  }
}
class MusicAgent extends BaseAgent {
  constructor() {
    super("music", ["generate", "play", "compose", "analyze"]);
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 0.8;
    this.musicHistory = [];
    this.emotionalThemes = /* @__PURE__ */ new Map();
  }
  async initialize() {
    await super.initialize();
    this.initializeEmotionalThemes();
    this.initializeAudioContext();
  }
  initializeEmotionalThemes() {
    this.emotionalThemes.set("joy", {
      genres: ["upbeat", "folk", "electronic"],
      tempo: "fast",
      instruments: ["flute", "percussion", "strings"],
      mood: "celebratory"
    });
    this.emotionalThemes.set("stress", {
      genres: ["ambient", "meditative", "classical"],
      tempo: "slow",
      instruments: ["piano", "harp", "nature_sounds"],
      mood: "calming"
    });
    this.emotionalThemes.set("gratitude", {
      genres: ["devotional", "spiritual", "acoustic"],
      tempo: "moderate",
      instruments: ["veena", "sitar", "vocal"],
      mood: "peaceful"
    });
    this.emotionalThemes.set("neutral", {
      genres: ["ambient", "folk", "instrumental"],
      tempo: "moderate",
      instruments: ["flute", "guitar", "percussion"],
      mood: "balanced"
    });
  }
  initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
    }
  }
  async execute(input) {
    const { type, data, role, preferences, emotion } = input;
    switch (type) {
      case "generate_music":
        return this.generateMusic(data.prompt, emotion, role);
      case "play_music":
        return this.playMusic(data.track);
      case "stop_music":
        return this.stopMusic();
      case "compose_from_humming":
        return this.composeFromHumming(data.audio, role);
      case "adjust_mood":
        return this.adjustMoodMusic(emotion);
      case "create_playlist":
        return this.createPlaylist(data.theme, role);
      default:
        return this.handleMusicRequest(input);
    }
  }
  async generateMusic(prompt, emotion, role) {
    try {
      const enhancedPrompt = this.enhancePrompt(prompt, emotion, role);
      const audioBuffer = await this.generateMusicFromPrompt(enhancedPrompt);
      const track = {
        id: `track_${Date.now()}`,
        prompt: enhancedPrompt,
        emotion,
        role,
        buffer: audioBuffer,
        duration: audioBuffer.duration,
        created: /* @__PURE__ */ new Date()
      };
      this.musicHistory.push(track);
      return {
        response: `Generated music for ${role} with ${emotion} emotion`,
        actions: [
          { type: "music_generated", data: track },
          { type: "auto_play", data: { track } }
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
        response: "No track to play",
        actions: []
      };
    }
    try {
      await this.playAudioBuffer(track.buffer);
      this.currentTrack = track;
      this.isPlaying = true;
      return {
        response: `Playing music: ${track.prompt}`,
        actions: [{ type: "music_playing", data: { track, volume: this.volume } }]
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
        response: "Music stopped",
        actions: [{ type: "music_stopped", data: { track: this.currentTrack } }]
      };
    }
    return {
      response: "No music playing",
      actions: []
    };
  }
  async composeFromHumming(audioBlob, role) {
    try {
      const melodyAnalysis = await this.analyzeMelody(audioBlob);
      const prompt = this.createPromptFromMelody(melodyAnalysis, role);
      return await this.generateMusic(prompt, "joy", role);
    } catch (error) {
      return {
        response: `Failed to compose from humming: ${error.message}`,
        actions: []
      };
    }
  }
  async adjustMoodMusic(emotion) {
    const theme = this.emotionalThemes.get(emotion) || this.emotionalThemes.get("neutral");
    const prompt = this.createMoodPrompt(theme);
    return await this.generateMusic(prompt, emotion, "family");
  }
  async createPlaylist(theme, role) {
    const tracks = [];
    for (let i = 0; i < 3; i++) {
      const prompt = `${theme} music variation ${i + 1} for ${role}`;
      const result = await this.generateMusic(prompt, "neutral", role);
      if (result.track) {
        tracks.push(result.track);
      }
    }
    const playlist = {
      id: `playlist_${Date.now()}`,
      theme,
      role,
      tracks,
      created: /* @__PURE__ */ new Date()
    };
    return {
      response: `Created playlist with ${tracks.length} tracks`,
      actions: [{ type: "playlist_created", data: playlist }],
      playlist
    };
  }
  handleMusicRequest(input) {
    const { text, role, emotion } = input;
    if (text.includes("play") || text.includes("music")) {
      const prompt = this.extractMusicPrompt(text);
      return this.generateMusic(prompt, emotion, role);
    }
    if (text.includes("stop") || text.includes("quiet")) {
      return this.stopMusic();
    }
    if (text.includes("mood") || text.includes("feeling")) {
      return this.adjustMoodMusic(emotion);
    }
    return {
      response: "Music request not recognized",
      actions: []
    };
  }
  enhancePrompt(basePrompt, emotion, role) {
    const theme = this.emotionalThemes.get(emotion);
    const rolePreferences = this.getRoleMusicPreferences(role);
    let enhanced = basePrompt;
    if (theme) {
      enhanced += `, ${theme.mood} mood, ${theme.tempo} tempo`;
      if (theme.instruments.length > 0) {
        enhanced += `, featuring ${theme.instruments.slice(0, 2).join(" and ")}`;
      }
    }
    if (rolePreferences) {
      enhanced += `, ${rolePreferences.style}`;
    }
    return enhanced;
  }
  async generateMusicFromPrompt(prompt) {
    try {
      const { generateMusic, buildMusicPrompt } = await import("../../../../../chunks/musicgen.js");
      return await generateMusic(buildMusicPrompt(prompt));
    } catch (error) {
      console.warn("Music generation not available, using fallback");
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
    return {
      key: "C",
      tempo: 120,
      duration: 5,
      notes: ["C4", "D4", "E4", "C4"]
    };
  }
  createPromptFromMelody(analysis, role) {
    const { key, tempo, notes: notes2 } = analysis;
    const rolePrefs = this.getRoleMusicPreferences(role);
    return `Music in ${key} key, ${tempo} BPM, based on melody ${notes2.join(" ")}, ${rolePrefs?.style || "instrumental"}`;
  }
  createMoodPrompt(theme) {
    return `${theme.genres[0]} ${theme.mood} music with ${theme.instruments[0]}, ${theme.tempo} tempo`;
  }
  extractMusicPrompt(text) {
    const musicKeywords = ["play", "music", "song", "melody", "tune"];
    const genres = ["classical", "folk", "devotional", "ambient", "electronic"];
    let prompt = text;
    musicKeywords.forEach((keyword) => {
      prompt = prompt.replace(new RegExp(keyword, "gi"), "");
    });
    prompt = prompt.trim();
    if (prompt.length < 3) {
      const detectedGenre = genres.find((genre) => text.includes(genre));
      prompt = detectedGenre || "ambient instrumental";
    }
    return prompt;
  }
  getRoleMusicPreferences(role) {
    const preferences = {
      paati: { style: "devotional with traditional instruments like veena and flute" },
      appa: { style: "instrumental with focus on melody and rhythm" },
      amma: { style: "soothing and peaceful with gentle instrumentation" },
      kids: { style: "upbeat and playful with fun melodies" },
      family: { style: "warm and harmonious with family-friendly instrumentation" }
    };
    return preferences[role] || preferences.family;
  }
  createFallbackAudioBuffer() {
    if (!this.audioContext) return null;
    const duration = 3;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < numSamples; i++) {
      channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1;
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
const memoryAgent = new MemoryAgent();
const plannerAgent = new PlannerAgent();
const voiceAgent = new VoiceAgent();
const uiAgent = new UIAgent();
const toolAgent = new ToolAgent();
const musicAgent = new MusicAgent();
orchestrator.registerAgent(memoryAgent);
orchestrator.registerAgent(plannerAgent);
orchestrator.registerAgent(voiceAgent);
orchestrator.registerAgent(uiAgent);
orchestrator.registerAgent(toolAgent);
orchestrator.registerAgent(musicAgent);
class ShivoAISystem {
  constructor() {
    this.isInitialized = false;
    this.currentRole = "family";
    this.systemStatus = "asleep";
  }
  async initialize() {
    if (this.isInitialized) return;
    try {
      console.log("Initializing Shivo Agentic AI System...");
      await orchestrator.initializeAllAgents();
      this.setupRoleDetection();
      this.setupAutonomousRoutines();
      this.isInitialized = true;
      this.systemStatus = "active";
      console.log("Shivo AI System initialized successfully");
      agentState.update((state) => ({
        ...state,
        activeAgents: orchestrator.agents.keys(),
        activeRole: this.currentRole
      }));
    } catch (error) {
      console.error("Failed to initialize Shivo AI System:", error);
      this.systemStatus = "error";
    }
  }
  async shutdown() {
    await orchestrator.shutdownAllAgents();
    this.systemStatus = "shutdown";
  }
  // Main interaction method
  async processInteraction(input) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    try {
      const detectedRole = this.detectRole(input);
      if (detectedRole !== this.currentRole) {
        await this.switchRole(detectedRole);
      }
      const rolePrefs = orchestrator.getRolePreferences();
      const enrichedInput = {
        ...input,
        role: this.currentRole,
        preferences: rolePrefs,
        context: await this.getContext()
      };
      const result = await orchestrator.processWithAgents(enrichedInput);
      this.updateSystemState(result);
      return result;
    } catch (error) {
      console.error("Error processing interaction:", error);
      return {
        responses: ["I apologize, but I encountered an error processing your request."],
        actions: [],
        error: error.message
      };
    }
  }
  // Voice interaction methods
  async startVoiceListening() {
    return await voiceAgent.process({
      type: "start_listening",
      role: this.currentRole
    });
  }
  async stopVoiceListening() {
    return await voiceAgent.process({
      type: "stop_listening"
    });
  }
  async processVoiceCommand(text) {
    return await this.processInteraction({
      type: "voice_command",
      text,
      source: "voice"
    });
  }
  // Role management
  async switchRole(role) {
    if (!orchestrator.roles[role]) {
      throw new Error(`Unknown role: ${role}`);
    }
    this.currentRole = role;
    orchestrator.setActiveRole(role);
    await uiAgent.process({
      type: "adapt_interface",
      role,
      context: "role_switch"
    });
    agentState.update((state) => ({
      ...state,
      activeRole: role
    }));
    console.log(`Switched to role: ${role}`);
  }
  detectRole(input) {
    const { text, context } = input;
    if (!text) return this.currentRole;
    const lowerText = text.toLowerCase();
    const roleKeywords = {
      paati: ["paati", "grandma", "grandmother", "அம்மா", "பாட்டி"],
      appa: ["appa", "dad", "father", "அப்பா"],
      amma: ["amma", "mom", "mother", "அம்மா"],
      kids: ["kids", "children", "பிள்ளைகள்", "குழந்தைகள்"]
    };
    for (const [role, keywords] of Object.entries(roleKeywords)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        return role;
      }
    }
    return this.detectRoleByTime();
  }
  detectRoleByTime() {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour >= 5 && hour < 9) return "paati";
    if (hour >= 9 && hour < 17) return "appa";
    if (hour >= 17 && hour < 21) return "amma";
    if (hour >= 21 || hour < 5) return "kids";
    return "family";
  }
  // Context gathering
  async getContext() {
    const memoryContext = await memoryAgent.process({
      type: "recall_context",
      role: this.currentRole
    });
    return {
      role: this.currentRole,
      time: /* @__PURE__ */ new Date(),
      recentActivities: memoryContext.context?.recentFacts || [],
      emotionalState: memoryContext.context?.emotionalState || "neutral",
      preferences: orchestrator.getRolePreferences()
    };
  }
  // Autonomous routines setup
  setupAutonomousRoutines() {
    setInterval(async () => {
      try {
        const routineCheck = await plannerAgent.process({
          type: "check_routines",
          role: this.currentRole
        });
        if (routineCheck.actions.length > 0) {
          for (const action of routineCheck.actions) {
            await this.executeAutonomousAction(action);
          }
        }
      } catch (error) {
        console.warn("Autonomous routine check failed:", error);
      }
    }, 6e4);
  }
  async executeAutonomousAction(action) {
    try {
      switch (action.type) {
        case "remind_prayer":
          await this.processInteraction({
            type: "autonomous",
            text: "Time for morning prayers",
            context: "routine"
          });
          break;
        case "plan_temple":
          await this.processInteraction({
            type: "autonomous",
            text: "Plan temple visit for today",
            context: "routine"
          });
          break;
        case "remind_walk":
          await this.processInteraction({
            type: "autonomous",
            text: "Time for morning walk",
            context: "routine"
          });
          break;
        default:
          console.log("Unknown autonomous action:", action.type);
      }
    } catch (error) {
      console.warn("Autonomous action execution failed:", error);
    }
  }
  // System state management
  updateSystemState(result) {
    agentState.update((state) => ({
      ...state,
      lastInteraction: {
        timestamp: /* @__PURE__ */ new Date(),
        role: this.currentRole,
        result
      },
      memory: result.context?.recentFacts || state.memory
    }));
  }
  // Goal-oriented actions
  async pursueGoal(goal) {
    const planResult = await plannerAgent.process({
      type: "create_plan",
      data: goal,
      role: this.currentRole
    });
    if (planResult.actions) {
      for (const action of planResult.actions) {
        await toolAgent.process({
          type: "execute_action",
          data: { action: action.type, params: action.data },
          role: this.currentRole
        });
      }
    }
    return planResult;
  }
  // Get system status
  getStatus() {
    return {
      initialized: this.isInitialized,
      status: this.systemStatus,
      currentRole: this.currentRole,
      activeAgents: Array.from(orchestrator.agents.keys()),
      rolePreferences: orchestrator.getRolePreferences()
    };
  }
  // Emergency handling
  async handleEmergency(situation) {
    await this.switchRole("family");
    const emergencyContext = {
      type: "emergency",
      situation,
      priority: "high"
    };
    return await this.processInteraction({
      type: "emergency",
      text: `Emergency: ${situation}`,
      context: emergencyContext
    });
  }
}
const shivoAI = new ShivoAISystem();
async function initializeShivoAI() {
  await shivoAI.initialize();
}
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await initializeShivoAI();
      console.log("Shivo AI auto-initialized");
    } catch (error) {
      console.warn("Shivo AI auto-initialization failed:", error);
    }
  });
}
function ShivoAgenticPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentRole = "family";
    let conversation = [];
    let systemStatus = "initializing";
    let agentStats = { activeAgents: 0, memoryItems: 0, plansCreated: 0 };
    const roles = {
      paati: {
        name: "Paati",
        icon: "heroicons:sparkles",
        color: "emerald",
        description: "Gentle care and spiritual guidance",
        avatar: "👵"
      },
      appa: {
        name: "Appa",
        icon: "heroicons:user",
        color: "blue",
        description: "Practical planning and task management",
        avatar: "👨"
      },
      amma: {
        name: "Amma",
        icon: "heroicons:heart",
        color: "purple",
        description: "Nurturing care and family coordination",
        avatar: "👩"
      },
      kids: {
        name: "Kids",
        icon: "heroicons:star",
        color: "orange",
        description: "Fun learning and playful interactions",
        avatar: "👶"
      },
      family: {
        name: "Family",
        icon: "heroicons:users",
        color: "green",
        description: "Unified family assistance",
        avatar: "👨‍👩‍👧‍👦"
      }
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Shivo Agentic AI - Smart Family Assistant</title>`);
      });
    });
    $$renderer2.push(`<!---->/** * Shivo Agentic AI Page - Main interface for the agentic AI system * Provides role-aware interactions and autonomous agent coordination */ <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50"><div class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-6 py-4"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-2xl font-bold text-gray-800">Shivo Agentic AI</h1> <p class="text-sm text-gray-600">Your intelligent family assistant</p></div></div> <div class="flex items-center gap-4"><div class="flex items-center gap-2 text-sm"><div${attr_class(`w-2 h-2 rounded-full ${stringify("bg-yellow-500")}`)}></div> <span class="text-gray-600 capitalize">${escape_html(systemStatus)}</span></div> <div class="text-xs text-gray-500">${escape_html(agentStats.activeAgents)} agents • ${escape_html(agentStats.memoryItems)} memories</div></div></div></div></div> <div class="max-w-6xl mx-auto p-6"><div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"><h3 class="text-lg font-semibold text-gray-800 mb-4">Family Roles</h3> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(roles));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [roleKey, role] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${stringify(currentRole === roleKey ? `border-${role.color}-500 bg-${role.color}-50` : "border-gray-200 hover:border-gray-300")}`)}><div class="flex items-center gap-3"><div class="text-2xl">${escape_html(role.avatar)}</div> <div><div class="font-medium text-gray-800">${escape_html(role.name)}</div> <div class="text-xs text-gray-600">${escape_html(role.description)}</div></div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-medium text-gray-700 mb-3">Agent Activity</h4> <div class="space-y-2 text-xs text-gray-600"><div class="flex justify-between"><span>Active Agents:</span> <span class="font-medium">${escape_html(agentStats.activeAgents)}</span></div> <div class="flex justify-between"><span>Memory Items:</span> <span class="font-medium">${escape_html(agentStats.memoryItems)}</span></div> <div class="flex justify-between"><span>Plans Created:</span> <span class="font-medium">${escape_html(agentStats.plansCreated)}</span></div></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"><div class="p-6 border-b border-gray-200"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="text-2xl">${escape_html(roles[currentRole]?.avatar)}</div> <div><h2 class="text-xl font-semibold text-gray-800">${escape_html(roles[currentRole]?.name)} Mode</h2> <p class="text-sm text-gray-600">${escape_html(roles[currentRole]?.description)}</p></div></div> <div class="flex gap-2"><button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:information-circle", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Capabilities</button> <button class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:play", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Demo Autonomy</button></div></div></div> <div class="h-96 overflow-y-auto p-6 space-y-4 svelte-103w443" id="conversation"><!--[-->`);
    const each_array_1 = ensure_array_like(conversation);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let message = each_array_1[$$index_1];
      $$renderer2.push(`<div${attr_class(`flex ${stringify(message.speaker === "user" ? "justify-end" : "justify-start")}`)}><div${attr_class(`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${stringify(message.speaker === "user" ? "bg-blue-500 text-white" : message.type === "error" ? "bg-red-100 text-red-800" : message.type === "system" ? "bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-800")}`)}>`);
      if (message.type === "emotion") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2"><span class="text-lg">😊</span> <span>${escape_html(message.message)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (message.type === "action") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4" });
          $$renderer2.push(`<!----> <span>${escape_html(message.message)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="whitespace-pre-wrap">${escape_html(message.message)}</div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <div class="text-xs opacity-70 mt-1">${escape_html(message.timestamp.toLocaleTimeString())}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="p-6 border-t border-gray-200"><div class="flex gap-3"><input id="text-input" type="text" placeholder="Type your message or say 'Shivo' to wake me..." class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/> <button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:paper-airplane", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button${attr_class(`px-6 py-3 ${stringify("bg-green-500 hover:bg-green-600")} text-white rounded-xl transition-colors duration-200 flex items-center gap-2`)}>`);
    {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5" });
      $$renderer2.push(`<!----> Voice`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, { icon: "heroicons:brain", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Memory Agent</h3></div> <p class="text-sm text-gray-600">Learns preferences, routines, and emotional patterns</p></div> <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Planner Agent</h3></div> <p class="text-sm text-gray-600">Creates plans, schedules tasks, and manages routines</p></div> <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, {
      icon: "heroicons:musical-note",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Music Agent</h3></div> <p class="text-sm text-gray-600">Generates personalized music and audio experiences</p></div></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  ShivoAgenticPage($$renderer);
}
export {
  _page as default
};
