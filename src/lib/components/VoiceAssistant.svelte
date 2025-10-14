<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { voiceCapture } from '$lib/voice/speechCapture';
  import { parseIntent } from '$lib/voice/intentParser';
  import { sqliteService } from '$lib/services/sqliteService';
  import { notificationService } from '$lib/services/notificationService';

  const dispatch = createEventDispatcher();

  export let isVisible = false;
  export let conversation = [];
  export let isListening = false;

  let currentStep = 'welcome'; // welcome, choose_type, get_details, confirm
  let selectedType = null; // 'task' or 'reminder'
  let taskData = { title: '', description: '', priority: 'medium', category: 'general' };
  let reminderData = { title: '', description: '', alertTypes: ['sound'], date: null, time: null };

  // Conversation messages
  const messages = {
    welcome: {
      text: "Hello! I'm Shivo, your voice assistant. Would you like to create a Task or a Reminder?",
      options: ["Task", "Reminder"]
    },
    task_details: {
      text: "Great! Let's create a task. What would you like to call this task?",
      hint: "Say something like 'Buy groceries for dinner' or 'Call mom'"
    },
    reminder_details: {
      text: "Perfect! Let's set up a reminder. What should I remind you about?",
      hint: "Say something like 'Pick up kids from school' or 'Take medicine'"
    },
    task_priority: {
      text: "What's the priority level for this task?",
      options: ["High", "Medium", "Low"]
    },
    reminder_alerts: {
      text: "How would you like to be alerted? You can choose multiple options.",
      options: ["Sound", "SMS", "Phone Call", "Email", "Windows Notification"]
    },
    reminder_time: {
      text: "When should I remind you?",
      hint: "Say something like 'tomorrow at 3pm' or 'in 30 minutes'"
    },
    confirm_task: (data) => ({
      text: `I'll create a task: "${data.title}" with ${data.priority} priority. Is that correct?`,
      options: ["Yes, create it", "No, start over"]
    }),
    confirm_reminder: (data) => ({
      text: `I'll create a reminder: "${data.title}" ${data.time ? `for ${data.time}` : ''} with ${data.alertTypes.join(', ')} alerts. Is that correct?`,
      options: ["Yes, create it", "No, start over"]
    })
  };

  function addMessage(text, isUser = false, options = null) {
    conversation = [...conversation, { text, isUser, options, timestamp: new Date() }];
    // Auto-scroll to bottom
    setTimeout(() => {
      const container = document.querySelector('.conversation-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }

  function startConversation() {
    conversation = [];
    currentStep = 'welcome';
    selectedType = null;
    taskData = { title: '', description: '', priority: 'medium', category: 'general' };
    reminderData = { title: '', description: '', alertTypes: ['sound'], date: null, time: null };

    addMessage(messages.welcome.text, false, messages.welcome.options);
  }

  function handleOptionClick(option) {
    addMessage(option, true);

    switch (currentStep) {
      case 'welcome':
        if (option.toLowerCase() === 'task') {
          selectedType = 'task';
          currentStep = 'task_details';
          addMessage(messages.task_details.text, false);
          addMessage(messages.task_details.hint, false);
          startListening();
        } else if (option.toLowerCase() === 'reminder') {
          selectedType = 'reminder';
          currentStep = 'reminder_details';
          addMessage(messages.reminder_details.text, false);
          addMessage(messages.reminder_details.hint, false);
          startListening();
        }
        break;

      case 'task_priority':
        taskData.priority = option.toLowerCase();
        currentStep = 'confirm';
        const confirmMsg = messages.confirm_task(taskData);
        addMessage(confirmMsg.text, false, confirmMsg.options);
        break;

      case 'reminder_alerts':
        // Handle multiple selections
        const alertType = option.toLowerCase().replace(' ', '');
        if (reminderData.alertTypes.includes(alertType)) {
          reminderData.alertTypes = reminderData.alertTypes.filter(t => t !== alertType);
        } else {
          reminderData.alertTypes.push(alertType);
        }
        // Stay in same step to allow multiple selections
        break;

      case 'confirm':
        if (option.toLowerCase().includes('yes')) {
          createItem();
        } else {
          startConversation();
        }
        break;
    }
  }

  async function startListening() {
    isListening = true;
    try {
      const result = await voiceCapture.startListening();
      if (result) {
        handleVoiceInput(result);
      }
    } catch (error) {
      console.error('Voice capture error:', error);
      addMessage("Sorry, I couldn't hear you clearly. Please try again.", false);
    } finally {
      isListening = false;
    }
  }

  function handleVoiceInput(text) {
    addMessage(text, true);

    const intent = parseIntent(text);

    switch (currentStep) {
      case 'task_details':
        taskData.title = intent.title || text;
        currentStep = 'task_priority';
        addMessage(messages.task_priority.text, false, messages.task_priority.options);
        break;

      case 'reminder_details':
        reminderData.title = intent.title || text;
        currentStep = 'reminder_alerts';
        addMessage(messages.reminder_alerts.text, false, messages.reminder_alerts.options);
        break;

      case 'reminder_time':
        // Parse time from voice input
        reminderData.time = extractTime(text);
        currentStep = 'confirm';
        const confirmMsg = messages.confirm_reminder(reminderData);
        addMessage(confirmMsg.text, false, confirmMsg.options);
        break;
    }
  }

  function extractTime(text) {
    // Simple time extraction - could be enhanced
    const timePatterns = [
      /(\d{1,2}):(\d{2})\s*(am|pm)?/i,
      /in (\d+) (minutes?|hours?)/i,
      /tomorrow at (\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i
    ];

    for (const pattern of timePatterns) {
      const match = text.match(pattern);
      if (match) {
        return text; // Return the matched time string
      }
    }
    return null;
  }

  async function createItem() {
    try {
      if (selectedType === 'task') {
        await sqliteService.saveTodo({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          category: taskData.category,
          completed: false,
          createdAt: new Date().toISOString()
        });
        addMessage(`✅ Task "${taskData.title}" created successfully!`, false);
      } else if (selectedType === 'reminder') {
        await notificationService.createReminder({
          title: reminderData.title,
          description: reminderData.description,
          alertTypes: reminderData.alertTypes,
          scheduledTime: reminderData.time ? new Date(reminderData.time).toISOString() : new Date(Date.now() + 60000).toISOString(), // Default to 1 minute from now
          active: true
        });
        addMessage(`✅ Reminder "${reminderData.title}" created successfully!`, false);
      }

      // Close after successful creation
      setTimeout(() => {
        isVisible = false;
        dispatch('close');
      }, 2000);

    } catch (error) {
      console.error('Error creating item:', error);
      addMessage("Sorry, there was an error creating your item. Please try again.", false);
    }
  }

  function closeAssistant() {
    isVisible = false;
    conversation = [];
    isListening = false;
    dispatch('close');
  }

  // Auto-start conversation when visible
  $: if (isVisible && conversation.length === 0) {
    startConversation();
  }

  onMount(() => {
    // Listen for keyboard shortcuts
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        if (!isVisible) {
          isVisible = true;
          startConversation();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isVisible}
  <!-- Voice Assistant Overlay -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="w-full max-w-md mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-white/10">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">Shivo Assistant</h3>
            <p class="text-sm text-white/70">Voice-powered creation</p>
          </div>
        </div>
        <button
          on:click={closeAssistant}
          class="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Icon icon="heroicons:x-mark" class="w-5 h-5 text-white" />
        </button>
      </div>

      <!-- Conversation Area -->
      <div class="conversation-container max-h-96 overflow-y-auto p-4 space-y-4">
        {#each conversation as message}
          <div class="flex {message.isUser ? 'justify-end' : 'justify-start'}">
            <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl {message.isUser ? 'bg-blue-500 text-white' : 'bg-white/10 text-white border border-white/20'}">
              <p class="text-sm">{message.text}</p>
              {#if message.options}
                <div class="mt-3 space-y-2">
                  {#each message.options as option}
                    <button
                      on:click={() => handleOptionClick(option)}
                      class="block w-full text-left px-3 py-2 text-xs bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      {option}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}

        {#if isListening}
          <div class="flex justify-start">
            <div class="bg-white/10 border border-white/20 px-4 py-2 rounded-2xl">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-sm text-white">Listening...</span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Voice Input Button -->
      <div class="p-4 border-t border-white/10">
        <button
          on:click={startListening}
          disabled={isListening}
          class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
        >
          <Icon icon="heroicons:microphone" class="w-5 h-5 text-white" />
          <span class="text-white font-medium">
            {#if isListening}
              Listening...
            {:else}
              Tap to Speak
            {/if}
          </span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .conversation-container::-webkit-scrollbar {
    width: 4px;
  }

  .conversation-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .conversation-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
</style>