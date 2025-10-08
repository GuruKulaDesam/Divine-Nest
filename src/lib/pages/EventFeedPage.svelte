<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";

  // Event data
  let events = [
    {
      id: 1,
      type: "voice_command",
      title: "குரல் கட்டளை: பட்டியல் சேர்",
      description: "புதிய பணி பட்டியலில் சேர்க்கப்பட்டது",
      timestamp: "2025-10-08 10:45 AM",
      source: "Child",
      emotion: "😊",
      category: "task",
    },
    {
      id: 2,
      type: "proximity_trigger",
      title: "அருகாமை தூண்டுதல்: வீடு வருகை",
      description: "குழந்தை வீட்டிற்கு வந்தார் - வணக்கம் செய்யப்பட்டது",
      timestamp: "2025-10-08 10:30 AM",
      source: "BLE_Device",
      emotion: "😊",
      category: "automation",
    },
    {
      id: 3,
      type: "task_completed",
      title: "பணி முடிந்தது: வீடு சுத்தம்",
      description: "வீடு சுத்தம் செய்யும் பணி முடிந்தது",
      timestamp: "2025-10-08 09:15 AM",
      source: "Amma",
      emotion: "😊",
      category: "task",
    },
    {
      id: 4,
      type: "reminder",
      title: "நினைவூட்டல்: தமிழ் பாடம்",
      description: "தமிழ் எழுத்துப்பயிற்சி நேரம்",
      timestamp: "2025-10-08 08:00 AM",
      source: "System",
      emotion: "😐",
      category: "reminder",
    },
    {
      id: 5,
      type: "voice_command",
      title: "குரல் கட்டளை: இசை இயக்கு",
      description: "தேவார இசை இயக்கப்பட்டது",
      timestamp: "2025-10-08 07:30 AM",
      source: "Paati",
      emotion: "😊",
      category: "entertainment",
    },
  ];

  let filteredEvents = events;
  let searchQuery = "";
  let selectedType = "";
  let selectedCategory = "";
  let selectedSource = "";

  // Filter events
  $: filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || event.type === selectedType;
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    const matchesSource = !selectedSource || event.source === selectedSource;
    return matchesSearch && matchesType && matchesCategory && matchesSource;
  });

  // Tamil labels
  const taLabels = {
    eventFeed: "நிகழ்வு ஊட்டம்",
    search: "தேடு",
    filterType: "வகை வடிகட்டி",
    filterCategory: "வகுப்பு வடிகட்டி",
    filterSource: "மூலம் வடிகட்டி",
    all: "அனைத்தும்",
    voiceCommand: "குரல் கட்டளை",
    proximityTrigger: "அருகாமை தூண்டுதல்",
    taskCompleted: "பணி முடிந்தது",
    reminder: "நினைவூட்டல்",
    task: "பணி",
    automation: "தானியங்கு",
    entertainment: "பொழுதுபோக்கு",
    child: "குழந்தை",
    amma: "அம்மா",
    appa: "அப்பா",
    paati: "பாட்டி",
    system: "சிஸ்டம்",
    bleDevice: "புளூடூத் சாதனம்",
    noEvents: "நிகழ்வுகள் இல்லை",
    export: "ஏற்றுமதி",
    realTime: "நேரடி நேரம்",
  };

  // Event type icons
  const eventIcons = {
    voice_command: "heroicons:microphone",
    proximity_trigger: "heroicons:wifi",
    task_completed: "heroicons:check-circle",
    reminder: "heroicons:bell",
  };

  // Category colors
  const categoryColors = {
    task: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    automation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    reminder: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };

  // Export functionality
  function exportEvents() {
    const dataStr = JSON.stringify(filteredEvents, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `event-feed-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  // Real-time updates simulation
  let currentTime = new Date().toLocaleTimeString();
  setInterval(() => {
    currentTime = new Date().toLocaleTimeString();
  }, 1000);

  onMount(() => {
    // Load events from localStorage or API
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      events = JSON.parse(savedEvents);
      filteredEvents = events;
    }
  });

  // Save events when they change
  $: if (events) {
    localStorage.setItem("events", JSON.stringify(events));
  }
</script>

<svelte:head>
  <title>📡 Event Feed - Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:rss" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {taLabels.eventFeed}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Real-time activity & event logging</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {taLabels.realTime}: {currentTime}
          </div>
          <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors shadow-lg" on:click={exportEvents} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
            <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4 mr-2 inline" />
            {taLabels.export}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.search}</span>
          </label>
          <input type="text" bind:value={searchQuery} placeholder="நிகழ்வுகளை தேடு..." class="input input-bordered w-full" />
        </div>

        <!-- Type Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterType}</span>
          </label>
          <select bind:value={selectedType} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="voice_command">{taLabels.voiceCommand}</option>
            <option value="proximity_trigger">{taLabels.proximityTrigger}</option>
            <option value="task_completed">{taLabels.taskCompleted}</option>
            <option value="reminder">{taLabels.reminder}</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterCategory}</span>
          </label>
          <select bind:value={selectedCategory} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="task">{taLabels.task}</option>
            <option value="automation">{taLabels.automation}</option>
            <option value="entertainment">{taLabels.entertainment}</option>
            <option value="reminder">{taLabels.reminder}</option>
          </select>
        </div>

        <!-- Source Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterSource}</span>
          </label>
          <select bind:value={selectedSource} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="Child">{taLabels.child}</option>
            <option value="Amma">{taLabels.amma}</option>
            <option value="Appa">{taLabels.appa}</option>
            <option value="Paati">{taLabels.paati}</option>
            <option value="System">{taLabels.system}</option>
            <option value="BLE_Device">{taLabels.bleDevice}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Events Timeline -->
    <div class="space-y-4">
      {#each filteredEvents as event, index}
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300" use:motionInView={{ animation: "fadeInLeft", delay: index * 0.1 }}>
          <div class="flex items-start space-x-4">
            <!-- Event Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon icon={eventIcons[event.type]} class="w-6 h-6 text-white" />
              </div>
            </div>

            <!-- Timeline Line -->
            <div class="flex-shrink-0 w-px bg-gradient-to-b from-purple-500 to-pink-500 h-full opacity-50"></div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-2">
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                  {event.category === "task" ? taLabels.task : event.category === "automation" ? taLabels.automation : event.category === "entertainment" ? taLabels.entertainment : taLabels.reminder}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {event.source === "Child" ? taLabels.child : event.source === "Amma" ? taLabels.amma : event.source === "Appa" ? taLabels.appa : event.source === "Paati" ? taLabels.paati : event.source === "System" ? taLabels.system : taLabels.bleDevice}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {event.timestamp}
                </span>
              </div>

              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>

              <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {event.description}
              </p>

              <!-- Emotion Indicator -->
              {#if event.emotion}
                <div class="flex items-center space-x-2">
                  <span class="text-2xl">{event.emotion}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">Emotion detected</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}

      {#if filteredEvents.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:rss" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{taLabels.noEvents}</h3>
          <p class="text-gray-500 dark:text-gray-400">Events will appear here as they happen!</p>
        </div>
      {/if}
    </div>
  </div>
</div>
