<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";
  import { offlineSync } from "$lib/utils/offlineSync.js";

  let currentRole;
  let isListening = false;
  let isProcessing = false;
  let transcript = "";
  let response = "";
  let recognition = null;
  let synth = null;
  let isSupported = false;

  // Voice commands database
  const voiceCommands = {
    // Common commands
    "hello": { action: "greet", response: "Hello! How can I help you today?" },
    "hi": { action: "greet", response: "Hi there! What can I do for you?" },
    "namaste": { action: "greet", response: "Namaste! How may I assist you?" },
    "vanakkam": { action: "greet", response: "Vanakkam! How can I help you?" },

    // Task management
    "add task": { action: "add_task", response: "What task would you like to add?" },
    "mark task done": { action: "complete_task", response: "Which task have you completed?" },
    "show tasks": { action: "list_tasks", response: "Here are your current tasks:" },
    "what are my tasks": { action: "list_tasks", response: "Let me show you your tasks:" },

    // Reminders
    "remind me": { action: "set_reminder", response: "What would you like me to remind you about?" },
    "set reminder": { action: "set_reminder", response: "Sure, what reminder should I set?" },

    // Festival/Ritual queries
    "what festival today": { action: "festival_today", response: "Let me check today's festivals:" },
    "upcoming festivals": { action: "upcoming_festivals", response: "Here are the upcoming festivals:" },
    "temple schedule": { action: "temple_schedule", response: "Here's the temple schedule:" },

    // Household queries
    "what's for dinner": { action: "dinner_plan", response: "Let me check the dinner plans:" },
    "grocery list": { action: "grocery_list", response: "Here's your grocery list:" },
    "medicine reminder": { action: "medicine_reminder", response: "I'll remind you about your medicine." },

    // Role-specific commands
    "log my medicine": { action: "log_medicine", response: "Medicine logged successfully." },
    "start cooking": { action: "start_cooking", response: "Cooking session started. What are you preparing?" },
    "school pickup": { action: "school_pickup", response: "School pickup reminder set." },
    "mark chores done": { action: "complete_chores", response: "Great job! Chores marked as completed." }
  };

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
  });

  onMount(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getLanguageCode();

      recognition.onstart = () => {
        isListening = true;
        isProcessing = false;
      };

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase();
        transcript = result;
        processVoiceCommand(result);
      };

      recognition.onend = () => {
        isListening = false;
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        response = "Sorry, I didn't catch that. Could you try again?";
        speakResponse(response);
      };

      isSupported = true;
    }

    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      synth = window.speechSynthesis;
    }
  });

  onDestroy(() => {
    if (recognition) {
      recognition.stop();
    }
    if (synth) {
      synth.cancel();
    }
  });

  function getLanguageCode() {
    // Map to speech recognition language codes
    const langMap = {
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'bn': 'bn-IN',
      'gu': 'gu-IN',
      'mr': 'mr-IN',
      'pa': 'pa-IN',
      'or': 'or-IN',
      'as': 'as-IN',
      'en': 'en-IN'
    };
    return langMap[currentRole?.preferredLanguage || 'en'] || 'en-IN';
  }

  function startListening() {
    if (recognition && !isListening) {
      recognition.lang = getLanguageCode();
      recognition.start();
    }
  }

  function stopListening() {
    if (recognition && isListening) {
      recognition.stop();
    }
  }

  function processVoiceCommand(command) {
    isProcessing = true;

    // Save voice command to offline storage for analytics
    offlineSync.saveVoiceCommand(command, transcript, true).catch(error => {
      console.warn('Failed to save voice command:', error);
    });

    // Find matching command
    let matchedCommand = null;
    let bestMatch = "";

    for (const [key, cmd] of Object.entries(voiceCommands)) {
      if (command.includes(key)) {
        matchedCommand = cmd;
        bestMatch = key;
        break;
      }
    }

    if (matchedCommand) {
      response = matchedCommand.response;
      executeAction(matchedCommand.action, command);
    } else {
      response = "I'm not sure what you mean. Try saying 'show tasks', 'add task', or 'set reminder'.";
      // Save failed command attempt
      offlineSync.saveVoiceCommand(command, transcript, false).catch(error => {
        console.warn('Failed to save failed voice command:', error);
      });
    }

    speakResponse(response);
    isProcessing = false;
  }

  function executeAction(action, fullCommand) {
    switch (action) {
      case 'greet':
        // Just greeting, no additional action needed
        break;
      case 'add_task':
        // Extract task from command
        const taskText = fullCommand.replace(/add task/i, '').trim();
        if (taskText) {
          addTask(taskText);
        }
        break;
      case 'complete_task':
        // Mark last task as complete (simplified)
        completeLastTask();
        break;
      case 'list_tasks':
        listTasks();
        break;
      case 'set_reminder':
        // Extract reminder from command
        const reminderText = fullCommand.replace(/remind me|set reminder/i, '').trim();
        if (reminderText) {
          setReminder(reminderText);
        }
        break;
      case 'festival_today':
        checkTodaysFestivals();
        break;
      case 'log_medicine':
        logMedicine();
        break;
      default:
        console.log('Action:', action);
    }
  }

  function speakResponse(text) {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode();
      utterance.rate = 0.9;
      utterance.pitch = 1;

      synth.speak(utterance);
    }
  }

  // Action implementations with offline storage
  async function addTask(taskText) {
    try {
      const task = {
        id: Date.now().toString(),
        title: taskText,
        description: taskText,
        status: 'pending',
        user_id: currentRole?.id || 'default',
        created_at: new Date().toISOString(),
        priority: 'medium'
      };

      await offlineSync.saveData('tasks', task);
      response = `Task "${taskText}" has been added to your list.`;
      speakResponse(response);
    } catch (error) {
      console.error('Failed to add task:', error);
      response = "Sorry, I couldn't add that task. Please try again.";
      speakResponse(response);
    }
  }

  async function completeLastTask() {
    try {
      const tasks = await offlineSync.getAllData('tasks', 'user_id', currentRole?.id || 'default');
      const pendingTasks = tasks.filter(task => task.status === 'pending');

      if (pendingTasks.length > 0) {
        const lastTask = pendingTasks[pendingTasks.length - 1];
        lastTask.status = 'completed';
        lastTask.completed_at = new Date().toISOString();

        await offlineSync.saveData('tasks', lastTask);
        response = `Great job! "${lastTask.title}" has been marked as completed.`;
        speakResponse(response);
      } else {
        response = "You don't have any pending tasks to complete.";
        speakResponse(response);
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
      response = "Sorry, I couldn't complete the task. Please try again.";
      speakResponse(response);
    }
  }

  async function listTasks() {
    try {
      const tasks = await offlineSync.getAllData('tasks', 'user_id', currentRole?.id || 'default');
      const pendingTasks = tasks.filter(task => task.status === 'pending');

      if (pendingTasks.length > 0) {
        const taskList = pendingTasks.map(task => task.title).join(', ');
        response = `You have ${pendingTasks.length} pending tasks: ${taskList}`;
      } else {
        response = "You have no pending tasks. Great job staying on top of things!";
      }
      speakResponse(response);
    } catch (error) {
      console.error('Failed to list tasks:', error);
      response = "Sorry, I couldn't retrieve your tasks right now.";
      speakResponse(response);
    }
  }

  async function setReminder(reminderText) {
    try {
      // Parse time from reminder text (simplified)
      const reminder = {
        id: Date.now().toString(),
        title: reminderText,
        description: reminderText,
        scheduled_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
        user_id: currentRole?.id || 'default',
        created_at: new Date().toISOString(),
        status: 'active'
      };

      await offlineSync.saveData('reminders', reminder);
      response = `Reminder set for "${reminderText}" in one hour.`;
      speakResponse(response);
    } catch (error) {
      console.error('Failed to set reminder:', error);
      response = "Sorry, I couldn't set that reminder. Please try again.";
      speakResponse(response);
    }
  }

  function checkTodaysFestivals() {
    console.log('Checking today\'s festivals');
    // In real implementation, this would check festival calendar
  }

  function logMedicine() {
    console.log('Logging medicine');
    // In real implementation, this would log medicine intake
  }

  // Quick voice commands for common actions
  const quickCommands = [
    { text: "Add Task", icon: "mdi:plus", command: "add task" },
    { text: "Show Tasks", icon: "mdi:clipboard-list", command: "show tasks" },
    { text: "Set Reminder", icon: "mdi:bell", command: "set reminder" },
    { text: "Festival Info", icon: "mdi:calendar-star", command: "upcoming festivals" }
  ];
</script>

<div class="voice-assistant bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-3">
      <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <Icon icon="mdi:microphone" class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-800">Voice Assistant</h2>
        <p class="text-sm text-gray-600">Speak naturally in your language</p>
      </div>
    </div>
    <div class="text-right">
      <div class="text-xs text-gray-500">Status</div>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full {isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}"></div>
        <span class="text-sm font-medium">
          {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready'}
        </span>
      </div>
    </div>
  </div>

  <!-- Voice Input Area -->
  <div class="bg-white rounded-lg p-6 mb-6 border border-gray-200">
    {#if !isSupported}
      <div class="text-center py-8">
        <Icon icon="mdi:microphone-off" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-800 mb-2">Voice Not Supported</h3>
        <p class="text-gray-600">Your browser doesn't support voice input. Try using Chrome or Edge.</p>
      </div>
    {:else}
      <div class="text-center">
        <button
          class="w-20 h-20 rounded-full {isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'} transition-all duration-200 flex items-center justify-center mx-auto mb-4"
          on:click={isListening ? stopListening : startListening}
        >
          <Icon
            icon={isListening ? "mdi:microphone-off" : "mdi:microphone"}
            class="w-8 h-8 text-white"
          />
        </button>

        <div class="min-h-[60px]">
          {#if transcript}
            <p class="text-lg text-gray-800 mb-2">"{transcript}"</p>
          {/if}
          {#if response}
            <p class="text-sm text-blue-600 italic">{response}</p>
          {/if}
        </div>

        {#if !transcript && !response}
          <p class="text-gray-500">Tap the microphone and speak naturally</p>
          <p class="text-xs text-gray-400 mt-2">Try: "Show my tasks" or "Add grocery item"</p>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Quick Commands -->
  <div class="bg-white rounded-lg p-4 border border-gray-200">
    <h3 class="text-sm font-medium text-gray-700 mb-3">Quick Commands</h3>
    <div class="grid grid-cols-2 gap-3">
      {#each quickCommands as cmd}
        <button
          class="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          on:click={() => processVoiceCommand(cmd.command)}
        >
          <Icon icon={cmd.icon} class="w-5 h-5 text-blue-500" />
          <span class="text-sm font-medium text-gray-700">{cmd.text}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Voice Tips -->
  <div class="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
    <div class="flex items-start space-x-3">
      <Icon icon="mdi:lightbulb" class="w-5 h-5 text-blue-500 mt-0.5" />
      <div>
        <h4 class="text-sm font-medium text-blue-800 mb-1">Voice Tips</h4>
        <ul class="text-xs text-blue-700 space-y-1">
          <li>• Speak naturally in your preferred language</li>
          <li>• Say "Nest" first to wake the assistant</li>
          <li>• Try commands like "add task", "show reminders", "festival info"</li>
          <li>• Works offline for basic commands</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>