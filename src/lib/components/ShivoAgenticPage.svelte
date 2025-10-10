<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { shivoAI, processShivoInteraction, switchShivoRole, getShivoStatus } from "$lib/ai/agents/shivo.js";
  import { agentState } from "$lib/ai/agents/core.js";

  let currentRole = "family";
  let isListening = false;
  let currentTranscript = "";
  let conversation = [];
  let systemStatus = "initializing";
  let agentStats = {
    activeAgents: 0,
    memoryItems: 0,
    plansCreated: 0,
  };

  // Role configurations
  const roles = {
    paati: {
      name: "Paati",
      icon: "heroicons:sparkles",
      color: "emerald",
      description: "Gentle care and spiritual guidance",
      avatar: "👵",
    },
    appa: {
      name: "Appa",
      icon: "heroicons:user",
      color: "blue",
      description: "Practical planning and task management",
      avatar: "👨",
    },
    amma: {
      name: "Amma",
      icon: "heroicons:heart",
      color: "purple",
      description: "Nurturing care and family coordination",
      avatar: "👩",
    },
    kids: {
      name: "Kids",
      icon: "heroicons:star",
      color: "orange",
      description: "Fun learning and playful interactions",
      avatar: "👶",
    },
    family: {
      name: "Family",
      icon: "heroicons:users",
      color: "green",
      description: "Unified family assistance",
      avatar: "👨‍👩‍👧‍👦",
    },
  };

  onMount(async () => {
    try {
      await shivoAI.initialize();
      systemStatus = "active";

      // Subscribe to agent state changes
      const unsubscribe = agentState.subscribe((state) => {
        currentRole = state.activeRole;
        agentStats = {
          activeAgents: state.activeAgents?.length || 0,
          memoryItems: state.memory?.length || 0,
          plansCreated: state.goals?.length || 0,
        };
      });

      // Add welcome message
      addToConversation("assistant", "வணக்கம்! நான் உங்கள் குடும்ப உதவியாளர் சிவோ. என்ன உதவி வேண்டும்?", "greeting");

      return unsubscribe;
    } catch (error) {
      console.error("Failed to initialize Shivo AI:", error);
      systemStatus = "error";
    }
  });

  function addToConversation(speaker, message, type = "message") {
    conversation = [
      ...conversation,
      {
        id: Date.now(),
        speaker,
        message,
        type,
        timestamp: new Date(),
        role: currentRole,
      },
    ];
  }

  async function handleRoleSwitch(role) {
    try {
      await switchShivoRole(role);
      addToConversation("system", `Switched to ${roles[role].name} mode`, "system");
    } catch (error) {
      addToConversation("error", `Failed to switch role: ${error.message}`, "error");
    }
  }

  async function startVoiceInteraction() {
    try {
      isListening = true;
      currentTranscript = "";

      const result = await shivoAI.startVoiceListening();

      if (result.actions) {
        result.actions.forEach((action) => {
          if (action.type === "listening_started") {
            addToConversation("system", "Listening for your voice...", "system");
          }
        });
      }
    } catch (error) {
      addToConversation("error", `Voice interaction failed: ${error.message}`, "error");
      isListening = false;
    }
  }

  async function stopVoiceInteraction() {
    try {
      isListening = false;
      const result = await shivoAI.stopVoiceListening();

      if (currentTranscript) {
        addToConversation("user", currentTranscript, "voice");
        await processVoiceCommand(currentTranscript);
      }
    } catch (error) {
      addToConversation("error", `Failed to stop voice interaction: ${error.message}`, "error");
    }
  }

  async function processVoiceCommand(text) {
    try {
      const result = await processShivoInteraction({
        type: "voice_command",
        text,
        source: "voice",
      });

      // Add assistant response
      if (result.responses && result.responses.length > 0) {
        addToConversation("assistant", result.responses[0], "response");
      }

      // Handle actions
      if (result.actions) {
        result.actions.forEach((action) => {
          handleAgentAction(action);
        });
      }
    } catch (error) {
      addToConversation("error", `Failed to process command: ${error.message}`, "error");
    }
  }

  async function sendTextMessage() {
    const input = document.getElementById("text-input");
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    input.value = "";

    addToConversation("user", message, "text");

    try {
      const result = await processShivoInteraction({
        type: "text_message",
        text: message,
        source: "text",
      });

      if (result.responses && result.responses.length > 0) {
        addToConversation("assistant", result.responses[0], "response");
      }

      if (result.actions) {
        result.actions.forEach((action) => {
          handleAgentAction(action);
        });
      }
    } catch (error) {
      addToConversation("error", `Failed to send message: ${error.message}`, "error");
    }
  }

  function handleAgentAction(action) {
    switch (action.type) {
      case "music_generated":
        addToConversation("system", `🎵 Generated music: ${action.data.prompt}`, "action");
        break;
      case "plan_created":
        addToConversation("system", `📋 Created plan: ${action.data.title}`, "action");
        break;
      case "task_scheduled":
        addToConversation("system", `✅ Scheduled task: ${action.data.title}`, "action");
        break;
      case "emotion_detected":
        addToConversation("system", `😊 Detected emotion: ${action.data.primary}`, "emotion");
        break;
      default:
        console.log("Agent action:", action);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendTextMessage();
    }
  }

  // Autonomous demo functions
  async function demonstrateAutonomy() {
    addToConversation("system", "🤖 Demonstrating autonomous behavior...", "demo");

    // Simulate routine check
    setTimeout(async () => {
      try {
        const result = await processShivoInteraction({
          type: "check_routines",
          context: "demo",
        });

        if (result.responses && result.responses.length > 0) {
          addToConversation("assistant", result.responses[0], "autonomous");
        }
      } catch (error) {
        addToConversation("error", `Autonomy demo failed: ${error.message}`, "error");
      }
    }, 2000);
  }

  async function showAgentCapabilities() {
    const status = getShivoStatus();
    const capabilities = ["🎯 Goal-oriented task planning", "🧠 Contextual memory and learning", "🎙️ Voice command processing", "🎼 AI music generation", "🎨 Role-aware UI adaptation", "🔧 Tool integration and automation", "⏰ Autonomous routine execution"];

    addToConversation("assistant", `Here are my agentic capabilities:\n\n${capabilities.map((cap) => `• ${cap}`).join("\n")}`, "info");
  }
</script>

/** * Shivo Agentic AI Page - Main interface for the agentic AI system * Provides role-aware interactions and autonomous agent coordination */

<svelte:head>
  <title>Shivo Agentic AI - Smart Family Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
  <!-- Header -->
  <div class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Shivo Agentic AI</h1>
            <p class="text-sm text-gray-600">Your intelligent family assistant</p>
          </div>
        </div>

        <!-- System Status -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <div class="w-2 h-2 rounded-full {systemStatus === 'active' ? 'bg-green-500' : systemStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'}"></div>
            <span class="text-gray-600 capitalize">{systemStatus}</span>
          </div>

          <div class="text-xs text-gray-500">
            {agentStats.activeAgents} agents • {agentStats.memoryItems} memories
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Role Selection Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Family Roles</h3>

          <div class="space-y-3">
            {#each Object.entries(roles) as [roleKey, role]}
              <button class="w-full p-4 rounded-xl border-2 transition-all duration-200 text-left {currentRole === roleKey ? `border-${role.color}-500 bg-${role.color}-50` : 'border-gray-200 hover:border-gray-300'}" on:click={() => handleRoleSwitch(roleKey)}>
                <div class="flex items-center gap-3">
                  <div class="text-2xl">{role.avatar}</div>
                  <div>
                    <div class="font-medium text-gray-800">{role.name}</div>
                    <div class="text-xs text-gray-600">{role.description}</div>
                  </div>
                </div>
              </button>
            {/each}
          </div>

          <!-- Agent Stats -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Agent Activity</h4>
            <div class="space-y-2 text-xs text-gray-600">
              <div class="flex justify-between">
                <span>Active Agents:</span>
                <span class="font-medium">{agentStats.activeAgents}</span>
              </div>
              <div class="flex justify-between">
                <span>Memory Items:</span>
                <span class="font-medium">{agentStats.memoryItems}</span>
              </div>
              <div class="flex justify-between">
                <span>Plans Created:</span>
                <span class="font-medium">{agentStats.plansCreated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Conversation Area -->
      <div class="lg:col-span-3">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <!-- Conversation Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="text-2xl">{roles[currentRole]?.avatar || "🤖"}</div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">
                    {roles[currentRole]?.name || "Shivo"} Mode
                  </h2>
                  <p class="text-sm text-gray-600">
                    {roles[currentRole]?.description || "Intelligent assistance"}
                  </p>
                </div>
              </div>

              <div class="flex gap-2">
                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={showAgentCapabilities}>
                  <Icon icon="heroicons:information-circle" class="w-4 h-4" />
                  Capabilities
                </button>

                <button class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={demonstrateAutonomy}>
                  <Icon icon="heroicons:play" class="w-4 h-4" />
                  Demo Autonomy
                </button>
              </div>
            </div>
          </div>

          <!-- Conversation Messages -->
          <div class="h-96 overflow-y-auto p-6 space-y-4" id="conversation">
            {#each conversation as message}
              <div class="flex {message.speaker === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl {message.speaker === 'user' ? 'bg-blue-500 text-white' : message.type === 'error' ? 'bg-red-100 text-red-800' : message.type === 'system' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-800'}">
                  {#if message.type === "emotion"}
                    <div class="flex items-center gap-2">
                      <span class="text-lg">😊</span>
                      <span>{message.message}</span>
                    </div>
                  {:else if message.type === "action"}
                    <div class="flex items-center gap-2">
                      <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                      <span>{message.message}</span>
                    </div>
                  {:else}
                    <div class="whitespace-pre-wrap">{message.message}</div>
                  {/if}
                  <div class="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Input Area -->
          <div class="p-6 border-t border-gray-200">
            <div class="flex gap-3">
              <input id="text-input" type="text" placeholder="Type your message or say 'Shivo' to wake me..." class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" on:keydown={handleKeyPress} />

              <button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 flex items-center gap-2" on:click={sendTextMessage}>
                <Icon icon="heroicons:paper-airplane" class="w-5 h-5" />
              </button>

              <button class="px-6 py-3 {isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-xl transition-colors duration-200 flex items-center gap-2" on:click={isListening ? stopVoiceInteraction : startVoiceInteraction}>
                {#if isListening}
                  <Icon icon="heroicons:microphone" class="w-5 h-5 animate-pulse" />
                  Listening...
                {:else}
                  <Icon icon="heroicons:microphone" class="w-5 h-5" />
                  Voice
                {/if}
              </button>
            </div>

            {#if currentTranscript}
              <div class="mt-3 p-3 bg-blue-50 rounded-lg">
                <div class="text-sm text-blue-800">
                  <strong>Transcript:</strong>
                  {currentTranscript}
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Agentic Features Showcase -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div class="flex items-center gap-3 mb-3">
              <Icon icon="heroicons:brain" class="w-6 h-6 text-purple-600" />
              <h3 class="font-semibold text-gray-800">Memory Agent</h3>
            </div>
            <p class="text-sm text-gray-600">Learns preferences, routines, and emotional patterns</p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div class="flex items-center gap-3 mb-3">
              <Icon icon="heroicons:calendar" class="w-6 h-6 text-blue-600" />
              <h3 class="font-semibold text-gray-800">Planner Agent</h3>
            </div>
            <p class="text-sm text-gray-600">Creates plans, schedules tasks, and manages routines</p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div class="flex items-center gap-3 mb-3">
              <Icon icon="heroicons:musical-note" class="w-6 h-6 text-green-600" />
              <h3 class="font-semibold text-gray-800">Music Agent</h3>
            </div>
            <p class="text-sm text-gray-600">Generates personalized music and audio experiences</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  #conversation {
    scroll-behavior: smooth;
  }

  #conversation::-webkit-scrollbar {
    width: 4px;
  }

  #conversation::-webkit-scrollbar-track {
    background: transparent;
  }

  #conversation::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  #conversation::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
