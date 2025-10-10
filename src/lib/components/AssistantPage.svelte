<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";

  let activeSection = "overview";
  let isListening = false;
  let currentTranscript = "";
  let voiceLogs = [];
  let isAwake = false;
  let currentRole = "family";
  let conversation = [];
  let isGeneratingMusic = false;
  let status = "Ready to assist";

  // Calculate current section info
  $: currentSection = AssistantSections.find((s) => s.id === activeSection);

  // Assistant Sections for navigation
  const AssistantSections = [
    {
      id: "overview",
      name: "Assistant Overview",
      tamil: "உதவியாளர் கண்ணோட்டம்",
      icon: "heroicons:sparkles",
      color: "purple"
    },
    {
      id: "voice",
      name: "Voice Assistant",
      tamil: "குரல் உதவியாளர்",
      icon: "heroicons:microphone",
      color: "blue"
    },
    {
      id: "ai",
      name: "AI Chat",
      tamil: "AI உரையாடல்",
      icon: "heroicons:chat-bubble-left-right",
      color: "green"
    },
    {
      id: "music",
      name: "Music Generation",
      tamil: "இசை உருவாக்கம்",
      icon: "heroicons:musical-note",
      color: "orange"
    },
    {
      id: "agentic",
      name: "Smart Agents",
      tamil: "புத்திசாலி முகவர்கள்",
      icon: "heroicons:cpu-chip",
      color: "red"
    }
  ];

  // Role configurations
  const roles = {
    paati: {
      name: "Paati",
      icon: "heroicons:sparkles",
      color: "emerald",
      description: "Gentle care and spiritual guidance",
      avatar: "���",
    },
    appa: {
      name: "Appa",
      icon: "heroicons:user",
      color: "blue",
      description: "Practical planning and task management",
      avatar: "���",
    },
    amma: {
      name: "Amma",
      icon: "heroicons:heart",
      color: "purple",
      description: "Nurturing care and family coordination",
      avatar: "���",
    },
    kids: {
      name: "Kids",
      icon: "heroicons:star",
      color: "orange",
      description: "Fun learning and playful interactions",
      avatar: "���",
    },
    family: {
      name: "Family",
      icon: "heroicons:users",
      color: "indigo",
      description: "Complete family AI assistant",
      avatar: "���‍���‍���‍���",
    },
  };

  onMount(() => {
    // Initialize with some sample data
    voiceLogs = [
      { text: "வணக்கம் சிவோ", timestamp: "2024-01-15 09:00", emotion: "neutral", language: "ta" },
      { text: "Add milk to shopping list", timestamp: "2024-01-15 10:30", emotion: "neutral", language: "en" },
      { text: "Play devotional music", timestamp: "2024-01-15 18:00", emotion: "calm", language: "en" }
    ];

    conversation = [
      { role: "user", content: "Hello Shivo", timestamp: "2024-01-15 09:00" },
      { role: "assistant", content: "வணக்கம்! நான் உங்கள் குடும்ப உதவியாளர். என்ன உதவி வேண்டும்?", timestamp: "2024-01-15 09:00" }
    ];
  });

  onDestroy(() => {
    // Cleanup
  });

  function switchSection(sectionId) {
    activeSection = sectionId;
  }

  function switchRole(roleId) {
    currentRole = roleId;
  }

  function startVoiceRecognition() {
    isListening = true;
    currentTranscript = "கேட்கிறது...";
    // Simulate voice recognition
    setTimeout(() => {
      isListening = false;
      currentTranscript = "குரல் கட்டளை பெறப்பட்டது";
      voiceLogs = [{ text: currentTranscript, timestamp: new Date().toLocaleString(), emotion: "neutral", language: "ta" }, ...voiceLogs];
    }, 2000);
  }

  function stopVoiceRecognition() {
    isListening = false;
    currentTranscript = "";
  }

  function wakeAI() {
    isAwake = true;
    status = "AI Assistant is awake and ready";
  }

  function generateMusic() {
    isGeneratingMusic = true;
    status = "Generating music...";
    setTimeout(() => {
      isGeneratingMusic = false;
      status = "Music generated successfully";
    }, 3000);
  }

  // Calculate stats
  $: {
    const totalVoiceLogs = voiceLogs.length;
    const aiConversations = conversation.length;
    const activeRole = roles[currentRole];
  }
</script>

<!-- AI Assistant & Voice Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-purple-100 p-3 rounded-lg">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">��� AI Assistant & Voice</h1>
            <p class="text-lg text-gray-600">AI உதவியாளர் & குரல்</p>
            <p class="text-sm text-gray-500">Intelligent voice assistant and AI companions for your family</p>
          </div>
        </div>

        <!-- Role Selector -->
        <div class="flex space-x-2">
          {#each Object.entries(roles) as [roleId, role]}
            <button on:click={() => switchRole(roleId)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {currentRole === roleId ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
              <span class="text-lg">{role.avatar}</span>
              <span class="font-medium">{role.name}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Voice Commands</p>
              <p class="text-2xl font-bold">{voiceLogs.length}</p>
              <p class="text-xs opacity-75">குரல் கட்டளைகள்</p>
            </div>
            <Icon icon="heroicons:microphone" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">AI Conversations</p>
              <p class="text-2xl font-bold">{conversation.length}</p>
              <p class="text-xs opacity-75">AI உரையாடல்கள்</p>
            </div>
            <Icon icon="heroicons:chat-bubble-left-right" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Active Role</p>
              <p class="text-2xl font-bold">{roles[currentRole]?.avatar}</p>
              <p class="text-xs opacity-75">{roles[currentRole]?.name}</p>
            </div>
            <Icon icon="heroicons:cpu-chip" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Status</p>
              <p class="text-2xl font-bold">{isAwake ? "���" : "���"}</p>
              <p class="text-xs opacity-75">{isAwake ? "Active" : "Sleeping"}</p>
            </div>
            <Icon icon="heroicons:bolt" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Assistant Sections
            <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each AssistantSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : 'text-gray-600 hover:bg-gray-50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Quick Actions Sidebar -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <button on:click={startVoiceRecognition} class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                <Icon icon="heroicons:microphone" class="w-4 h-4" />
                <span>Voice Command</span>
              </button>
              <button on:click={wakeAI} class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                <Icon icon="heroicons:bolt" class="w-4 h-4" />
                <span>Wake AI</span>
              </button>
              <button on:click={generateMusic} class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">
                <Icon icon="heroicons:musical-note" class="w-4 h-4" />
                <span>Generate Music</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl shadow-lg p-6">
          {#if activeSection === "overview"}
            <!-- Overview Dashboard -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900">Assistant Overview</h2>
                <span class="text-sm text-gray-500">உதவியாளர் கண்ணோட்டம்</span>
              </div>

              <!-- Current Role Display -->
              <div class="bg-purple-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-purple-900 mb-3">Current AI Role</h3>
                <div class="flex items-center space-x-4">
                  <span class="text-4xl">{roles[currentRole]?.avatar}</span>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900">{roles[currentRole]?.name}</h4>
                    <p class="text-gray-600">{roles[currentRole]?.description}</p>
                  </div>
                </div>
              </div>

              <!-- Recent Voice Commands -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-blue-900 mb-3">Recent Voice Commands</h3>
                <div class="space-y-3">
                  {#each voiceLogs.slice(0, 5) as log}
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-gray-500">{log.timestamp}</span>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{log.language === 'ta' ? 'தமிழ்' : 'English'}</span>
                      </div>
                      <p class="text-gray-900">{log.text}</p>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- AI Conversation Preview -->
              <div class="bg-green-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-green-900 mb-3">Recent AI Conversations</h3>
                <div class="space-y-3">
                  {#each conversation.slice(-3) as msg}
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0">
                        {#if msg.role === 'user'}
                          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Icon icon="heroicons:user" class="w-4 h-4 text-white" />
                          </div>
                        {:else}
                          <span class="text-2xl">{roles[currentRole]?.avatar}</span>
                        {/if}
                      </div>
                      <div class="flex-1">
                        <p class="text-sm text-gray-500">{msg.timestamp}</p>
                        <p class="text-gray-900">{msg.content}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

          {:else if activeSection === "voice"}
            <!-- Voice Assistant -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Voice Assistant</h2>

              <!-- Voice Control Panel -->
              <div class="bg-blue-50 rounded-lg p-6">
                <div class="text-center mb-6">
                  <button on:click={isListening ? stopVoiceRecognition : startVoiceRecognition} class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full transition-all {isListening ? 'animate-pulse bg-red-500' : ''}">
                    <Icon icon={isListening ? "heroicons:stop" : "heroicons:microphone"} class="w-12 h-12" />
                  </button>
                  <p class="mt-4 text-lg font-semibold">{isListening ? "Listening..." : "Click to Start Voice Command"}</p>
                  {#if currentTranscript}
                    <p class="mt-2 text-gray-600">"{currentTranscript}"</p>
                  {/if}
                </div>

                <!-- Voice Commands Help -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">தமிழ் கட்டளைகள்</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• "பட்டியல் சேர்" - Add to todo list</li>
                      <li>• "குறிப்பு எழுது" - Create note</li>
                      <li>• "பாடல் இயக்கு" - Play music</li>
                      <li>• "நிகழ்வு சேர்" - Add event</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">English Commands</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• "Add todo [task]" - Add task</li>
                      <li>• "Create note [text]" - Make note</li>
                      <li>• "Play [song]" - Play music</li>
                      <li>• "Schedule [event]" - Add event</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Voice Logs -->
              <div class="bg-white border rounded-lg p-4">
                <h3 class="text-lg font-semibold mb-4">Voice Command History</h3>
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  {#each voiceLogs as log}
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div class="flex-1">
                        <p class="font-medium">{log.text}</p>
                        <p class="text-sm text-gray-500">{log.timestamp}</p>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{log.language === 'ta' ? 'தமிழ்' : 'EN'}</span>
                        <Icon icon="heroicons:check-circle" class="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

          {:else if activeSection === "ai"}
            <!-- AI Chat -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">AI Chat Assistant</h2>

              <!-- AI Status -->
              <div class="bg-green-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon icon="heroicons:bolt" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-green-900">AI Status: {isAwake ? "Active" : "Sleeping"}</h3>
                      <p class="text-sm text-green-700">Current role: {roles[currentRole]?.name}</p>
                    </div>
                  </div>
                  <button on:click={wakeAI} class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    {isAwake ? "Sleep" : "Wake Up"}
                  </button>
                </div>
              </div>

              <!-- Chat Interface -->
              <div class="bg-white border rounded-lg h-96 flex flex-col">
                <div class="flex-1 p-4 overflow-y-auto space-y-4">
                  {#each conversation as msg}
                    <div class="flex items-start space-x-3 {msg.role === 'user' ? 'justify-end' : ''}">
                      {#if msg.role === 'assistant'}
                        <span class="text-2xl flex-shrink-0">{roles[currentRole]?.avatar}</span>
                      {/if}
                      <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg {msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}">
                        <p>{msg.content}</p>
                        <p class="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                      </div>
                      {#if msg.role === 'user'}
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon icon="heroicons:user" class="w-4 h-4 text-white" />
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
                <div class="border-t p-4">
                  <div class="flex space-x-2">
                    <input type="text" placeholder="Type your message..." class="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                      <Icon icon="heroicons:paper-airplane" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          {:else if activeSection === "music"}
            <!-- Music Generation -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">AI Music Generation</h2>

              <!-- Music Control Panel -->
              <div class="bg-orange-50 rounded-lg p-6">
                <div class="text-center mb-6">
                  <button on:click={generateMusic} disabled={isGeneratingMusic} class="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg transition-all flex items-center space-x-2 mx-auto">
                    <Icon icon={isGeneratingMusic ? "heroicons:arrow-path" : "heroicons:musical-note"} class="w-6 h-6 {isGeneratingMusic ? 'animate-spin' : ''}" />
                    <span>{isGeneratingMusic ? "Generating..." : "Generate Music"}</span>
                  </button>
                  <p class="mt-4 text-lg font-semibold">{status}</p>
                </div>

                <!-- Music Styles -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button class="bg-white p-4 rounded-lg hover:bg-orange-100 transition-all border-2 border-transparent hover:border-orange-300">
                    <Icon icon="heroicons:musical-note" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p class="font-semibold">Classical</p>
                    <p class="text-sm text-gray-600">மரபு</p>
                  </button>
                  <button class="bg-white p-4 rounded-lg hover:bg-orange-100 transition-all border-2 border-transparent hover:border-orange-300">
                    <Icon icon="heroicons:sparkles" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p class="font-semibold">Devotional</p>
                    <p class="text-sm text-gray-600">பக்தி</p>
                  </button>
                  <button class="bg-white p-4 rounded-lg hover:bg-orange-100 transition-all border-2 border-transparent hover:border-orange-300">
                    <Icon icon="heroicons:heart" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p class="font-semibold">Romantic</p>
                    <p class="text-sm text-gray-600">காதல்</p>
                  </button>
                  <button class="bg-white p-4 rounded-lg hover:bg-orange-100 transition-all border-2 border-transparent hover:border-orange-300">
                    <Icon icon="heroicons:star" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p class="font-semibold">Kids</p>
                    <p class="text-sm text-gray-600">குழந்தைகள்</p>
                  </button>
                </div>
              </div>

              <!-- Voice to Music -->
              <div class="bg-white border rounded-lg p-4">
                <h3 class="text-lg font-semibold mb-4">Voice-to-Music</h3>
                <p class="text-gray-600 mb-4">Hum a melody or describe the music you want to create</p>
                <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center space-x-2">
                  <Icon icon="heroicons:microphone" class="w-5 h-5" />
                  <span>Start Humming</span>
                </button>
              </div>
            </div>

          {:else if activeSection === "agentic"}
            <!-- Smart Agents -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Smart AI Agents</h2>

              <!-- Agent Roles -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each Object.entries(roles) as [roleId, role]}
                  <div class="bg-white border rounded-lg p-4 hover:shadow-lg transition-all {currentRole === roleId ? 'ring-2 ring-red-500' : ''}">
                    <div class="text-center mb-4">
                      <span class="text-4xl block mb-2">{role.avatar}</span>
                      <h3 class="text-lg font-semibold">{role.name}</h3>
                      <p class="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <button on:click={() => switchRole(roleId)} class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all">
                      {currentRole === roleId ? "Active" : "Switch to Role"}
                    </button>
                  </div>
                {/each}
              </div>

              <!-- Agent Capabilities -->
              <div class="bg-red-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-red-900 mb-3">Agent Capabilities</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">Task Management</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Create and manage todos</li>
                      <li>• Schedule appointments</li>
                      <li>• Set reminders</li>
                      <li>• Track progress</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">Family Coordination</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Meal planning</li>
                      <li>• Grocery lists</li>
                      <li>• Event coordination</li>
                      <li>• Communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          {:else}
            <div class="text-center py-12">
              <Icon icon="heroicons:sparkles" class="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p class="text-gray-600">This assistant section is under development.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
