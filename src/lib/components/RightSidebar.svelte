<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";
  function extractAfterKeywords(command, keywords) {
    const lowerCommand = command.toLowerCase();
    for (let kw of keywords) {
      const index = lowerCommand.indexOf(kw.toLowerCase());
      if (index > -1) {
        return command.substring(index + kw.length).trim();
      }
    }
    return command.trim();
  }

  export let isOpen = true; // Assistant sidebar is always visible on desktop

  // Voice recognition variables
  let isListening = false;
  let isContinuous = false; // Start with wake word required
  let transcript = "";
  let confidence = 0;
  let emotion = "😐";
  let currentLanguage = "ta-IN";
  let assistantName = "Shivo";
  let wakeWords = ["nanbaa", "நண்பா", "thozhi", "தோழி", "shivo", "சிவோ", "ஷக்தி", "shakthi", "bro", "ப்ரோ"];
  let recognition = null;
  let wakeWordTimeout = null;

  // Tamil voice commands
  const tamilCommands = {
    பட்டியல்: "list",
    சேர்: "add",
    நீக்கு: "delete",
    முடிந்தது: "complete",
    உதவி: "help",
    நிறுத்து: "stop",
    தொடங்கு: "start",
  };

  // Quick actions
  const quickActions = [
    { icon: "heroicons:microphone", label: "Voice Command", action: "voice" },
    { icon: "heroicons:clipboard-document-list", label: "Add Task", action: "task" },
    { icon: "heroicons:bell", label: "Set Reminder", action: "reminder" },
    { icon: "heroicons:calendar", label: "Schedule", action: "schedule" },
  ];

  // Recent activities
  let recentActivities = [
    { time: "2 min ago", action: "Voice command processed", type: "voice" },
    { time: "5 min ago", action: "Task added to board", type: "task" },
    { time: "10 min ago", action: "Reminder set", type: "reminder" },
  ];

  // Speech synthesis function
  function speak(text, lang = currentLanguage) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }

  // Start wake word detection (short listening periods)
  function startWakeWordDetection() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      console.log("Voice recognition not supported");
      return;
    }

    if (isListening) return; // Already listening

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = currentLanguage;
    recognition.continuous = false; // Single utterance for wake word detection
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      transcript = "காத்திருக்கிறது..."; // "Waiting..." in Tamil
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0];
      const command = result.transcript.toLowerCase();
      transcript = result.transcript;
      confidence = Math.round(result.confidence * 100);

      console.log("Wake word detection - Heard:", command, "Confidence:", confidence, "Wake words:", wakeWords);

      // Check for wake word
      let hasWakeWord = false;
      let detectedWakeWord = "";
      for (let wake of wakeWords) {
        if (command.includes(wake.toLowerCase())) {
          hasWakeWord = true;
          detectedWakeWord = wake;
          break;
        }
      }

      if (hasWakeWord && confidence > 70) {
        // Require good confidence for wake word
        console.log("✅ Wake word detected:", detectedWakeWord, "in command:", command);
        isContinuous = true;
        speak("கேட்கிறேன்", "ta-IN"); // "I'm listening" in Tamil
        // Start continuous listening for commands
        setTimeout(() => {
          startVoiceRecognition();
        }, 500);
      } else {
        console.log("❌ No wake word detected in:", command, "Confidence:", confidence);
        // No wake word detected, try again in a few seconds
        wakeWordTimeout = setTimeout(() => {
          startWakeWordDetection();
        }, 3000); // Wait 3 seconds before trying again
      }
    };

    recognition.onerror = (event) => {
      console.error("Wake word detection error:", event.error);
      transcript = "பிழை: " + event.error;
      isListening = false;
      // Try again after error
      wakeWordTimeout = setTimeout(() => {
        startWakeWordDetection();
      }, 2000);
    };

    recognition.onend = () => {
      isListening = false;
      transcript = "காத்திருக்கிறது...";
      // If not in continuous mode, restart wake word detection
      if (!isContinuous) {
        wakeWordTimeout = setTimeout(() => {
          startWakeWordDetection();
        }, 1000);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting wake word detection:", error);
      wakeWordTimeout = setTimeout(() => {
        startWakeWordDetection();
      }, 2000);
    }
  }

  // Start continuous voice recognition (for commands after wake word)
  function startVoiceRecognition() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      speak("Voice recognition is not supported in this browser.", "en-US");
      return;
    }

    if (recognition) {
      recognition.stop(); // Stop any existing recognition
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = currentLanguage;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      transcript = "கேட்கிறது...";
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0];
      const command = result.transcript.toLowerCase();
      transcript = result.transcript;
      confidence = Math.round(result.confidence * 100);

      console.log("Command heard:", command, "Confidence:", confidence);

      // Simple emotion detection based on keywords
      if (command.includes("மகிழ்ச்சி") || command.includes("நன்று") || command.includes("happy") || command.includes("good")) {
        emotion = "😊";
      } else if (command.includes("அழுத்தம்") || command.includes("சிரமம்") || command.includes("stress") || command.includes("problem")) {
        emotion = "😟";
      } else {
        emotion = "😐";
      }

      // Process the command
      const actionTaken = processTamilCommand(command);
      console.log("Command processed, action taken:", actionTaken);

      // Add to recent activities
      recentActivities = [{ time: "Just now", action: `Voice: "${result.transcript}"`, type: "voice" }, ...recentActivities.slice(0, 4)];
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      transcript = "பிழை: " + event.error;
      isListening = false;
      // Return to wake word detection
      isContinuous = false;
      wakeWordTimeout = setTimeout(() => {
        startWakeWordDetection();
      }, 2000);
    };

    recognition.onend = () => {
      isListening = false;
      transcript = "காத்திருக்கிறது...";
      // Return to wake word detection if not stopped intentionally
      if (isContinuous) {
        isContinuous = false;
        wakeWordTimeout = setTimeout(() => {
          startWakeWordDetection();
        }, 1000);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      isContinuous = false;
      wakeWordTimeout = setTimeout(() => {
        startWakeWordDetection();
      }, 2000);
    }
  }

  // Process Tamil voice commands
  function processTamilCommand(command) {
    let processedCommand = command.toLowerCase();
    let actionTaken = false;

    console.log("Processing command:", processedCommand, "isContinuous:", isContinuous);

    // Stop commands - check first
    if (processedCommand.includes("நிறுத்து") || processedCommand.includes("stop") || processedCommand.includes("போதும்")) {
      console.log("Stop command detected");
      speak("நிறுத்தினேன்", "ta-IN"); // "Stopped" in Tamil
      isListening = false;
      isContinuous = false;
      if (recognition) {
        recognition.stop();
      }
      if (wakeWordTimeout) {
        clearTimeout(wakeWordTimeout);
      }
      // Return to wake word detection after a delay
      setTimeout(() => {
        startWakeWordDetection();
      }, 2000);
      actionTaken = true;
      return actionTaken;
    }

    // If not in continuous mode, ignore commands (except wake words which are handled separately)
    if (!isContinuous) {
      console.log("Not in continuous mode, ignoring command");
      return false;
    }

    // Stop commands
    if (processedCommand.includes("நிறுத்து") || processedCommand.includes("stop") || processedCommand.includes("போதும்")) {
      speak("நிறுத்தினேன்", "ta-IN"); // "Stopped" in Tamil
      isListening = false;
      isContinuous = false;
      actionTaken = true;
      return actionTaken;
    }

    // Emotion inference
    updateEmotion(processedCommand);

    // Assistant navigation commands - Tamil responses
    if (processedCommand.includes("பட்டியல்") || processedCommand.includes("list") || processedCommand.includes("tasks")) {
      navigateTo("assistant/task-board");
      speak("பணிகள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("குரல் பதிவு") || processedCommand.includes("voice log")) {
      navigateTo("assistant/voice-log");
      speak("குரல் பதிவு பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("நிகழ்வு") || processedCommand.includes("event") || processedCommand.includes("events")) {
      navigateTo("assistant/event-feed");
      speak("நிகழ்வுகள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("உதவி") || processedCommand.includes("help")) {
      navigateTo("assistant");
      speak("எப்படி உதவ?", "ta-IN");
      actionTaken = true;
    }

    // Control commands - Tamil responses
    if (processedCommand.includes("நிறுத்து") || processedCommand.includes("stop") || processedCommand.includes("போதும்")) {
      speak("நிறுத்தினேன்", "ta-IN");
      isListening = false;
      isContinuous = false;
      actionTaken = true;
    } else if (processedCommand.includes("தொடங்கு") || processedCommand.includes("start") || processedCommand.includes("listen")) {
      if (!isListening) {
        speak("கேட்கிறேன்", "ta-IN");
        isContinuous = true;
        startVoiceRecognition();
      }
      actionTaken = true;
    }

    // App navigation commands - Tamil responses
    else if (processedCommand.includes("முகப்பு") || processedCommand.includes("home") || processedCommand.includes("முதல் பக்கம்")) {
      navigateTo("home");
      speak("முகப்பு பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("பயனர்கள்") || processedCommand.includes("users")) {
      navigateTo("users");
      speak("பயனர்கள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("தயாரிப்புகள்") || processedCommand.includes("products")) {
      navigateTo("products");
      speak("தயாரிப்புகள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("பகுப்பாய்வு") || processedCommand.includes("analytics")) {
      navigateTo("analytics");
      speak("பகுப்பாய்வு பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("வரைபடங்கள்") || processedCommand.includes("charts")) {
      navigateTo("charts");
      speak("வரைபடங்கள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("காண்ட்") || processedCommand.includes("gantt")) {
      navigateTo("gantt");
      speak("காண்ட் வரைபட பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("வரைபடம்") || processedCommand.includes("map")) {
      navigateTo("maps");
      speak("வரைபட பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("திட்ட மேலாண்மை") || processedCommand.includes("project")) {
      navigateTo("project-management");
      speak("திட்ட மேலாண்மை பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("அமைப்புகள்") || processedCommand.includes("settings")) {
      navigateTo("settings");
      speak("அமைப்புகள் பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("சுயவிவரம்") || processedCommand.includes("profile")) {
      navigateTo("profile");
      speak("சுயவிவர பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("அவசர") || processedCommand.includes("emergency")) {
      navigateTo("emergency");
      speak("அவசர பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    } else if (processedCommand.includes("அட்டவணை") || processedCommand.includes("schedule")) {
      navigateTo("schedule");
      speak("அட்டவணை பக்கத்திற்கு செல்கிறேன்", "ta-IN");
      actionTaken = true;
    }

    // Creation commands - more flexible matching
    if (processedCommand.includes("பணி") || (processedCommand.includes("create") && processedCommand.includes("task")) || (processedCommand.includes("add") && processedCommand.includes("task"))) {
      const taskText = extractAfterKeywords(command, ["பணி", "task"]);
      if (taskText) {
        createTask(taskText);
        speak(`பணி: ${taskText}`, "ta-IN");
        actionTaken = true;
      }
    } else if (processedCommand.includes("நினைவூட்ட") || processedCommand.includes("reminder") || (processedCommand.includes("set") && processedCommand.includes("reminder"))) {
      const reminderText = extractAfterKeywords(command, ["நினைவூட்டல்", "நினைவூட்டு", "reminder"]);
      if (reminderText) {
        createReminder(reminderText);
        speak(`நினைவூட்டல்: ${reminderText}`, "ta-IN");
        actionTaken = true;
      }
    } else if (processedCommand.includes("நிகழ்வு") || (processedCommand.includes("create") && processedCommand.includes("event")) || (processedCommand.includes("add") && processedCommand.includes("event"))) {
      const eventText = extractAfterKeywords(command, ["நிகழ்வு", "event"]);
      if (eventText) {
        createEvent(eventText);
        speak(`நிகழ்வு: ${eventText}`, "ta-IN");
        actionTaken = true;
      }
    } else if (processedCommand.includes("குறிப்பு") || processedCommand.includes("note") || (processedCommand.includes("write") && processedCommand.includes("note"))) {
      const noteText = extractAfterKeywords(command, ["குறிப்பு", "note"]);
      if (noteText) {
        createNote(noteText);
        speak(`குறிப்பு: ${noteText}`, "ta-IN");
        actionTaken = true;
      }
    } else if (processedCommand.includes("சரிபார்ப்பு") || processedCommand.includes("checklist") || (processedCommand.includes("create") && processedCommand.includes("checklist"))) {
      const checklistText = extractAfterKeywords(command, ["சரிபார்ப்பு பட்டியல்", "checklist"]);
      if (checklistText) {
        createChecklist(checklistText);
        speak(`பட்டியல்: ${checklistText}`, "ta-IN");
        actionTaken = true;
      }
    } else if (processedCommand.includes("செய்ய வேண்டிய") || processedCommand.includes("to-do") || processedCommand.includes("todo") || (processedCommand.includes("add") && processedCommand.includes("to-do"))) {
      const todoText = extractAfterKeywords(command, ["செய்ய வேண்டியவை", "to-do", "todo"]);
      if (todoText) {
        createTodo(todoText);
        speak(`செய்ய வேண்டியது: ${todoText}`, "ta-IN");
        actionTaken = true;
      }
    }

    return actionTaken;
  }

  // Update emotion based on command content
  function updateEmotion(command) {
    if (command.includes("மகிழ்ச்சி") || command.includes("நன்று") || command.includes("happy") || command.includes("good") || command.includes("great")) {
      emotion = "😊";
    } else if (command.includes("அழுத்தம்") || command.includes("சிரமம்") || command.includes("stress") || command.includes("problem") || command.includes("tired")) {
      emotion = "😟";
    } else if (command.includes("கோபம்") || command.includes("angry") || command.includes("frustrated")) {
      emotion = "😠";
    } else if (command.includes("அமைதி") || command.includes("calm") || command.includes("relax")) {
      emotion = "😌";
    } else {
      emotion = "😐";
    }
  }

  // Extract item text after keywords
  function extractItemText(command, keywords) {
    for (let kw of keywords) {
      if (command.toLowerCase().includes(kw.toLowerCase())) {
        return command.replace(new RegExp(kw, "i"), "").trim();
      }
    }
    return command.trim();
  }

  // Create functions
  function createTask(text) {
    const tasks = JSON.parse(localStorage.getItem("assistant_tasks") || "[]");
    const newTask = { id: Date.now(), text, completed: false, created: new Date().toISOString() };
    tasks.push(newTask);
    localStorage.setItem("assistant_tasks", JSON.stringify(tasks));
    recentActivities = [{ time: "Just now", action: `Task created: "${text}"`, type: "task" }, ...recentActivities.slice(0, 4)];
    // Dispatch event for other components to update
    window.dispatchEvent(new CustomEvent("task-created", { detail: newTask }));
  }

  function createReminder(text) {
    const reminders = JSON.parse(localStorage.getItem("assistant_reminders") || "[]");
    const newReminder = { id: Date.now(), text, completed: false, created: new Date().toISOString() };
    reminders.push(newReminder);
    localStorage.setItem("assistant_reminders", JSON.stringify(reminders));
    recentActivities = [{ time: "Just now", action: `Reminder set: "${text}"`, type: "reminder" }, ...recentActivities.slice(0, 4)];
    window.dispatchEvent(new CustomEvent("reminder-created", { detail: newReminder }));
  }

  function createEvent(text) {
    const events = JSON.parse(localStorage.getItem("assistant_events") || "[]");
    const newEvent = { id: Date.now(), text, created: new Date().toISOString() };
    events.push(newEvent);
    localStorage.setItem("assistant_events", JSON.stringify(events));
    recentActivities = [{ time: "Just now", action: `Event created: "${text}"`, type: "event" }, ...recentActivities.slice(0, 4)];
    window.dispatchEvent(new CustomEvent("event-created", { detail: newEvent }));
  }

  function createNote(text) {
    const notes = JSON.parse(localStorage.getItem("assistant_notes") || "[]");
    const newNote = { id: Date.now(), text, created: new Date().toISOString() };
    notes.push(newNote);
    localStorage.setItem("assistant_notes", JSON.stringify(notes));
    recentActivities = [{ time: "Just now", action: `Note created: "${text}"`, type: "note" }, ...recentActivities.slice(0, 4)];
    window.dispatchEvent(new CustomEvent("note-created", { detail: newNote }));
  }

  function createChecklist(text) {
    const checklists = JSON.parse(localStorage.getItem("assistant_checklists") || "[]");
    const newChecklist = { id: Date.now(), title: text, items: [], created: new Date().toISOString() };
    checklists.push(newChecklist);
    localStorage.setItem("assistant_checklists", JSON.stringify(checklists));
    recentActivities = [{ time: "Just now", action: `Checklist created: "${text}"`, type: "checklist" }, ...recentActivities.slice(0, 4)];
    window.dispatchEvent(new CustomEvent("checklist-created", { detail: newChecklist }));
  }

  function createTodo(text) {
    const todos = JSON.parse(localStorage.getItem("assistant_todos") || "[]");
    const newTodo = { id: Date.now(), text, completed: false, created: new Date().toISOString() };
    todos.push(newTodo);
    localStorage.setItem("assistant_todos", JSON.stringify(todos));
    recentActivities = [{ time: "Just now", action: `To-do created: "${text}"`, type: "todo" }, ...recentActivities.slice(0, 4)];
    window.dispatchEvent(new CustomEvent("todo-created", { detail: newTodo }));
  }

  // Handle quick action
  function handleQuickAction(action) {
    switch (action) {
      case "voice":
        startVoiceRecognition();
        break;
      case "task":
        window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/task-board" } }));
        break;
      case "reminder":
        window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/reminders" } }));
        break;
      case "schedule":
        window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/schedule" } }));
        break;
    }
  }

  onMount(() => {
    // Start wake word detection
    setTimeout(() => {
      startWakeWordDetection();
    }, 1000); // Small delay to ensure component is fully mounted
  });

  onDestroy(() => {
    // Clean up voice recognition and timeouts
    if (recognition) {
      recognition.stop();
    }
    if (wakeWordTimeout) {
      clearTimeout(wakeWordTimeout);
    }
  });
</script>

<!-- Right Sidebar for Assistant -->
<div class="block fixed right-0 top-16 h-[calc(100vh-4rem)] w-full lg:top-0 lg:h-full lg:w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 lg:border-t-0 lg:border-l shadow-2xl z-30 transform transition-transform duration-300 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
  <!-- Header -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
          <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{assistantName}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Your Voice Companion</p>
        </div>
      </div>

      <!-- Voice status indicator -->
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full {isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}"></div>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {isListening ? "கேட்கிறது" : "காத்திருக்கிறது"}
        </span>
      </div>
    </div>
  </div>

  <!-- Voice Input Section -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
      <!-- Voice Button -->
      <div class="flex justify-center mb-4">
        <button class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 {isListening ? 'animate-pulse scale-110' : 'hover:scale-105'}" on:click={startVoiceRecognition} disabled={isListening}>
          <Icon icon="heroicons:microphone" class="w-8 h-8 text-white" />
        </button>
      </div>

      <!-- Transcript Display -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {transcript || "குரல் கட்டளையை சொல்லுங்கள்..."}
        </p>
        {#if confidence > 0}
          <div class="flex items-center justify-center space-x-2">
            <span class="text-2xl">{emotion}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              நம்பகத்தன்மை: {confidence}%
            </span>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">விரைவு செயல்கள்</h3>
    <div class="grid grid-cols-2 gap-3">
      {#each quickActions as action, index}
        <button class="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 hover:scale-105" on:click={() => handleQuickAction(action.action)} use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <Icon icon={action.icon} class="w-5 h-5 text-gray-600 dark:text-gray-300 mb-2 mx-auto" />
          <span class="text-xs text-gray-700 dark:text-gray-200 text-center block">
            {action.label}
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Recent Activities -->
  <div class="flex-1 p-4 overflow-y-auto">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">சமீபத்திய செயல்கள்</h3>
    <div class="space-y-3">
      {#each recentActivities as activity, index}
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg" use:motionInView={{ animation: "fadeInLeft", delay: index * 0.05 }}>
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              {#if activity.type === "voice"}
                <Icon icon="heroicons:microphone" class="w-4 h-4 text-white" />
              {:else if activity.type === "task"}
                <Icon icon="heroicons:clipboard-document-list" class="w-4 h-4 text-white" />
              {:else}
                <Icon icon="heroicons:bell" class="w-4 h-4 text-white" />
              {/if}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900 dark:text-white truncate">
              {activity.action}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {activity.time}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Footer with navigation links -->
  <div class="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
    <div class="grid grid-cols-2 gap-2">
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant" } }))}> முதன்மை </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/voice-log" } }))}> பதிவு </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/task-board" } }))}> பணிகள் </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/event-feed" } }))}> நிகழ்வுகள் </button>
    </div>
  </div>
</div>
