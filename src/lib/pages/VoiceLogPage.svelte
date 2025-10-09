<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";
  import { browser } from "$app/environment";

  // Voice logs data
  let voiceLogs = [
    {
      text: "பட்டியல்: தமிழ் எழுத்துப்பயிற்சி செய்ய வேண்டும்",
      timestamp: "2025-10-08 10:30 AM",
      emotion: "😊",
      source: "Child",
      language: "ta",
    },
    {
      text: "குறிப்பு: பொங்கல் சமையல் பொருட்கள் வாங்க வேண்டும்",
      timestamp: "2025-10-08 09:15 AM",
      emotion: "😐",
      source: "Amma",
      language: "ta",
    },
    {
      text: "பாடல்: தேவாரம் கேட்க வேண்டும்",
      timestamp: "2025-10-08 08:45 AM",
      emotion: "😊",
      source: "Paati",
      language: "ta",
    },
    {
      text: "முடிந்தது: வீடு சுத்தம் செய்தேன்",
      timestamp: "2025-10-08 08:00 AM",
      emotion: "😊",
      source: "Amma",
      language: "ta",
    },
  ];

  let filteredLogs = voiceLogs;
  let searchQuery = "";
  let selectedEmotion = "";
  let selectedSource = "";

  // Filter logs
  $: filteredLogs = voiceLogs.filter((log) => {
    const matchesSearch = log.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmotion = !selectedEmotion || log.emotion === selectedEmotion;
    const matchesSource = !selectedSource || log.source === selectedSource;
    return matchesSearch && matchesEmotion && matchesSource;
  });

  // Tamil labels
  const taLabels = {
    voiceLog: "குரல் பதிவு",
    search: "தேடு",
    filterEmotion: "உணர்வு வடிகட்டி",
    filterSource: "மூலம் வடிகட்டி",
    all: "அனைத்தும்",
    happy: "மகிழ்ச்சி",
    neutral: "சாதாரணம்",
    stressed: "அழுத்தம்",
    child: "குழந்தை",
    amma: "அம்மா",
    appa: "அப்பா",
    paati: "பாட்டி",
    noLogs: "குரல் பதிவுகள் இல்லை",
  };

  // Export functionality
  function exportLogs() {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `voice-logs-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  onMount(() => {
    // Load logs from localStorage or API
    if (browser) {
      const savedLogs = localStorage.getItem("voiceLogs");
      if (savedLogs) {
        voiceLogs = JSON.parse(savedLogs);
        filteredLogs = voiceLogs;
      }
    }
  });

  // Save logs when they change
  $: if (browser && voiceLogs) {
    localStorage.setItem("voiceLogs", JSON.stringify(voiceLogs));
  }
</script>

<svelte:head>
  <title>🎙️ Voice Log - Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:chat-bubble-left-right" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {taLabels.voiceLog}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Voice interactions & emotional logs</p>
          </div>
        </div>

        <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg" on:click={exportLogs} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
          <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4 mr-2 inline" />
          Export
        </button>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.search}</span>
          </label>
          <input type="text" bind:value={searchQuery} placeholder="குரல் பதிவுகளை தேடு..." class="input input-bordered w-full" />
        </div>

        <!-- Emotion Filter -->
        <div class="form-control">
          <label for="emotion-filter" class="label">
            <span class="label-text">{taLabels.filterEmotion}</span>
          </label>
          <select id="emotion-filter" bind:value={selectedEmotion} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="😊">{taLabels.happy}</option>
            <option value="😐">{taLabels.neutral}</option>
            <option value="😟">{taLabels.stressed}</option>
          </select>
        </div>

        <!-- Source Filter -->
        <div class="form-control">
          <label for="source-filter" class="label">
            <span class="label-text">{taLabels.filterSource}</span>
          </label>
          <select id="source-filter" bind:value={selectedSource} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="Child">{taLabels.child}</option>
            <option value="Amma">{taLabels.amma}</option>
            <option value="Appa">{taLabels.appa}</option>
            <option value="Paati">{taLabels.paati}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Voice Logs List -->
    <div class="space-y-4">
      {#each filteredLogs as log, index}
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300" use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <div class="flex items-start space-x-4">
            <!-- Emotion Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {log.emotion}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {log.source}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {log.language === "ta" ? "தமிழ்" : "English"}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {log.timestamp}
                </span>
              </div>

              <p class="text-gray-900 dark:text-white text-lg leading-relaxed">
                {log.text}
              </p>

              <!-- Actions -->
              <div class="flex items-center space-x-4 mt-4">
                <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium">
                  <Icon icon="heroicons:arrow-path-rounded-square" class="w-4 h-4 mr-1 inline" />
                  Replay
                </button>
                <button class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 text-sm font-medium">
                  <Icon icon="heroicons:document-duplicate" class="w-4 h-4 mr-1 inline" />
                  Copy
                </button>
                <button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-sm font-medium">
                  <Icon icon="heroicons:trash" class="w-4 h-4 mr-1 inline" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}

      {#if filteredLogs.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:chat-bubble-left-right" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{taLabels.noLogs}</h3>
          <p class="text-gray-500 dark:text-gray-400">Start using voice commands to create logs!</p>
        </div>
      {/if}
    </div>
  </div>
</div>
