<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";

  // Ambient log data
  let ambientLogs = [
    {
      id: 1,
      timestamp: "2025-10-08 10:45 AM",
      duration: "2:30",
      transcript: "குழந்தை: அம்மா, எனக்கு பசி... பால் கொடு...",
      emotion: "😊",
      confidence: 0.85,
      source: "kitchen",
      keywords: ["பசி", "பால்", "அம்மா"],
    },
    {
      id: 2,
      timestamp: "2025-10-08 10:30 AM",
      duration: "1:45",
      transcript: "பாட்டி: தேவாரம் கேட்க வேண்டும்... இன்று காலை பூஜை...",
      emotion: "😐",
      confidence: 0.78,
      source: "living_room",
      keywords: ["தேவாரம்", "பூஜை", "காலை"],
    },
    {
      id: 3,
      timestamp: "2025-10-08 09:15 AM",
      duration: "3:20",
      transcript: "அம்மா: வீடு சுத்தம் செய்ய வேண்டும்... தரை துடைக்க வேண்டும்...",
      emotion: "😟",
      confidence: 0.92,
      source: "kitchen",
      keywords: ["சுத்தம்", "தரை", "துடைக்க"],
    },
    {
      id: 4,
      timestamp: "2025-10-08 08:00 AM",
      duration: "1:10",
      transcript: "அப்பா: கடைக்கு செல்ல வேண்டும்... பொங்கல் பொருட்கள் வாங்க...",
      emotion: "😐",
      confidence: 0.88,
      source: "bedroom",
      keywords: ["கடை", "பொங்கல்", "பொருட்கள்"],
    },
  ];

  let filteredLogs = ambientLogs;
  let searchQuery = "";
  let selectedSource = "";
  let selectedEmotion = "";
  let isRecording = false;
  let currentTranscript = "";
  let recordingDuration = 0;
  let recordingInterval;

  // Filter logs
  $: filteredLogs = ambientLogs.filter((log) => {
    const matchesSearch = log.transcript.toLowerCase().includes(searchQuery.toLowerCase()) || log.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSource = !selectedSource || log.source === selectedSource;
    const matchesEmotion = !selectedEmotion || log.emotion === selectedEmotion;
    return matchesSearch && matchesSource && matchesEmotion;
  });

  // Tamil labels
  const taLabels = {
    ambientLog: "சுற்றுப்புற குரல் பதிவு",
    search: "தேடு",
    filterSource: "மூலம் வடிகட்டி",
    filterEmotion: "உணர்வு வடிகட்டி",
    all: "அனைத்தும்",
    kitchen: "சமையலறை",
    livingRoom: "வாழ்க்கை அறை",
    bedroom: "படுக்கை அறை",
    happy: "மகிழ்ச்சி",
    neutral: "சாதாரணம்",
    stressed: "அழுத்தம்",
    startRecording: "பதிவை தொடங்கு",
    stopRecording: "பதிவை நிறுத்து",
    recording: "பதிவு செய்கிறது...",
    duration: "கால அளவு",
    confidence: "நம்பகத்தன்மை",
    keywords: "முக்கிய சொற்கள்",
    noLogs: "சுற்றுப்புற பதிவுகள் இல்லை",
    export: "ஏற்றுமதி",
    realTime: "நேரடி நேரம்",
    liveTranscript: "நேரடி எழுத்துப்படி",
  };

  // Source colors
  const sourceColors = {
    kitchen: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    living_room: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    bedroom: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  // Start ambient recording
  function startRecording() {
    isRecording = true;
    currentTranscript = "";
    recordingDuration = 0;

    // Simulate recording with interval updates
    recordingInterval = setInterval(() => {
      recordingDuration += 1;
      // Simulate random transcript updates
      const sampleTranscripts = ["குழந்தை சிரிக்கிறார்...", "யாரோ பேசுகிறார்கள்...", "இசை ஒலிக்கிறது...", "கதவு திறக்கும் ஒலி..."];
      if (Math.random() > 0.7) {
        currentTranscript = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
      }
    }, 1000);
  }

  // Stop ambient recording
  function stopRecording() {
    isRecording = false;
    clearInterval(recordingInterval);

    if (currentTranscript) {
      // Add to logs
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        duration: `${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, "0")}`,
        transcript: currentTranscript,
        emotion: "😐",
        confidence: 0.75 + Math.random() * 0.2,
        source: "living_room",
        keywords: currentTranscript.split(" ").slice(0, 3),
      };
      ambientLogs = [newLog, ...ambientLogs];
      currentTranscript = "";
      recordingDuration = 0;
    }
  }

  // Export functionality
  function exportLogs() {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `ambient-logs-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  // Real-time updates
  let currentTime = new Date().toLocaleTimeString();
  setInterval(() => {
    currentTime = new Date().toLocaleTimeString();
  }, 1000);

  onMount(() => {
    // Load logs from localStorage or API
    const savedLogs = localStorage.getItem("ambientLogs");
    if (savedLogs) {
      ambientLogs = JSON.parse(savedLogs);
      filteredLogs = ambientLogs;
    }
  });

  // Save logs when they change
  $: if (ambientLogs) {
    localStorage.setItem("ambientLogs", JSON.stringify(ambientLogs));
  }
</script>

<svelte:head>
  <title>🎙️ Ambient Log - Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:radio" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {taLabels.ambientLog}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Continuous ambient voice monitoring</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {taLabels.realTime}: {currentTime}
          </div>
          <button class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-colors shadow-lg" on:click={exportLogs} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
            <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4 mr-2 inline" />
            {taLabels.export}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Live Recording Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class={`w-4 h-4 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {isRecording ? taLabels.recording : taLabels.liveTranscript}
          </h3>
          {#if isRecording}
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, "0")}
            </span>
          {/if}
        </div>

        <button class={`px-4 py-2 rounded-lg transition-colors shadow-lg ${isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`} on:click={isRecording ? stopRecording : startRecording}>
          <Icon icon={isRecording ? "heroicons:stop" : "heroicons:play"} class="w-4 h-4 mr-2 inline" />
          {isRecording ? taLabels.stopRecording : taLabels.startRecording}
        </button>
      </div>

      {#if currentTranscript}
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <p class="text-blue-800 dark:text-blue-200 font-medium">
            {currentTranscript}
          </p>
        </div>
      {/if}
    </div>

    <!-- Filters -->
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.search}</span>
          </label>
          <input type="text" bind:value={searchQuery} placeholder="பதிவுகளை தேடு..." class="input input-bordered w-full" />
        </div>

        <!-- Source Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterSource}</span>
          </label>
          <select bind:value={selectedSource} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="kitchen">{taLabels.kitchen}</option>
            <option value="living_room">{taLabels.livingRoom}</option>
            <option value="bedroom">{taLabels.bedroom}</option>
          </select>
        </div>

        <!-- Emotion Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterEmotion}</span>
          </label>
          <select bind:value={selectedEmotion} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="😊">{taLabels.happy}</option>
            <option value="😐">{taLabels.neutral}</option>
            <option value="😟">{taLabels.stressed}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Ambient Logs List -->
    <div class="space-y-4">
      {#each filteredLogs as log, index}
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300" use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <div class="flex items-start space-x-4">
            <!-- Emotion Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {log.emotion}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-2">
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sourceColors[log.source]}`}>
                  {log.source === "kitchen" ? taLabels.kitchen : log.source === "living_room" ? taLabels.livingRoom : taLabels.bedroom}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {(log.confidence * 100).toFixed(0)}% {taLabels.confidence}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {log.timestamp} • {taLabels.duration}: {log.duration}
                </span>
              </div>

              <p class="text-gray-900 dark:text-white text-lg leading-relaxed mb-3">
                {log.transcript}
              </p>

              <!-- Keywords -->
              <div class="flex items-center space-x-2 mb-3">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{taLabels.keywords}:</span>
                <div class="flex flex-wrap gap-2">
                  {#each log.keywords as keyword}
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                      {keyword}
                    </span>
                  {/each}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-4">
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
          <Icon icon="heroicons:radio" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{taLabels.noLogs}</h3>
          <p class="text-gray-500 dark:text-gray-400">Start ambient recording to capture voice logs!</p>
        </div>
      {/if}
    </div>
  </div>
</div>
