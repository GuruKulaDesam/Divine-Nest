<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "dashboard";
  let moodEntries = [];
  let showAddMood = false;
  let showSupportModal = false;

  const tabs = [
    { id: "dashboard", label: "Emotional Dashboard", icon: "heroicons:heart" },
    { id: "moods", label: "Mood Tracker", icon: "heroicons:face-smile" },
    { id: "support", label: "Family Support", icon: "heroicons:user-group" },
    { id: "wellness", label: "Emotional Wellness", icon: "heroicons:sparkles" },
    { id: "harmony", label: "Family Harmony", icon: "heroicons:peace" },
  ];

  let newMoodEntry = {
    mood: "neutral",
    intensity: 5,
    triggers: [],
    notes: "",
    gratitude: "",
    goals: [],
  };

  const moods = [
    { id: "joyful", label: "Joyful", emoji: "😊", color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" },
    { id: "content", label: "Content", emoji: "😌", color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/20" },
    { id: "neutral", label: "Neutral", emoji: "😐", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/20" },
    { id: "anxious", label: "Anxious", emoji: "😰", color: "text-orange-500", bgColor: "bg-orange-100 dark:bg-orange-900/20" },
    { id: "sad", label: "Sad", emoji: "😢", color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
    { id: "frustrated", label: "Frustrated", emoji: "😤", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/20" },
    { id: "excited", label: "Excited", emoji: "🤩", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
    { id: "peaceful", label: "Peaceful", emoji: "🧘‍♀️", color: "text-indigo-500", bgColor: "bg-indigo-100 dark:bg-indigo-900/20" },
  ];

  const commonTriggers = ["Work stress", "Family time", "Health concerns", "Achievements", "Relationships", "Financial matters", "Weather", "Sleep quality", "Exercise", "Social events", "Study pressure", "Festival preparations", "Travel plans", "Technology issues"];

  let emotionalWisdom = [
    {
      sanskrit: "क्रोधो हि शत्रुः प्रथमो नराणाम्",
      english: "Anger is indeed the first enemy of humans",
      tamil: "கோபம் மனிதர்களின் முதல் எதிரி",
      context: "Teaching emotional regulation",
      remedy: "Take 10 deep breaths before responding",
    },
    {
      sanskrit: "प्रसन्नमनसः सर्वं सुखं भवति",
      english: "Everything becomes pleasant for a cheerful mind",
      tamil: "மகிழ்ச்சியான மனதிற்கு அனைத்தும் இனிமையாகும்",
      context: "Maintaining positive outlook",
      remedy: "Practice gratitude daily",
    },
    {
      sanskrit: "सुखस्य मूलं धर्मः",
      english: "Righteousness is the root of happiness",
      tamil: "மகிழ்ச்சியின் வேர் தர்மம்",
      context: "Finding true contentment",
      remedy: "Act with compassion and integrity",
    },
  ];

  let familySupportNetwork = [
    {
      name: "Grandmother",
      role: "Wisdom Keeper",
      specialty: "Life advice and traditional remedies",
      availability: "Always available",
      bestFor: ["Anxiety", "Life decisions", "Cultural guidance"],
      approach: "Gentle stories and herbal teas",
      contact: "In-person visits preferred",
    },
    {
      name: "Uncle Raj",
      role: "Mentor",
      specialty: "Career and educational stress",
      availability: "Weekends and evenings",
      bestFor: ["Study pressure", "Career anxiety", "Goal setting"],
      approach: "Practical problem-solving",
      contact: "Phone or video calls",
    },
    {
      name: "Aunt Priya",
      role: "Emotional Support",
      specialty: "Relationship and family harmony",
      availability: "Daily after 6 PM",
      bestFor: ["Family conflicts", "Relationship issues", "Social anxiety"],
      approach: "Active listening and meditation",
      contact: "WhatsApp messages welcomed",
    },
    {
      name: "Cousin Arjun",
      role: "Peer Support",
      specialty: "Modern life challenges",
      availability: "Flexible, usually responsive",
      bestFor: ["Technology stress", "Social pressures", "Generation gap"],
      approach: "Shared experiences and humor",
      contact: "Text or social media",
    },
  ];

  let wellnessActivities = [
    {
      id: 1,
      name: "Morning Gratitude Practice",
      type: "Daily Ritual",
      duration: "10 minutes",
      description: "Start each day by listing three things you're grateful for",
      benefits: ["Positive mindset", "Reduced anxiety", "Better relationships"],
      instructions: ["Sit quietly after waking up", "Think of three specific things you're grateful for", "Write them down or say them aloud", "Feel the emotion of gratitude in your heart"],
      frequency: "Daily",
      bestTime: "Morning, after waking",
    },
    {
      id: 2,
      name: "Family Circle Sharing",
      type: "Group Activity",
      duration: "30 minutes",
      description: "Weekly family gathering to share feelings and experiences",
      benefits: ["Better communication", "Stronger bonds", "Emotional support"],
      instructions: ["Gather family members in a circle", "Each person shares their week's highlights and challenges", "Listen without judgment", "Offer support and encouragement"],
      frequency: "Weekly",
      bestTime: "Sunday evenings",
    },
    {
      id: 3,
      name: "Breathwork & Meditation",
      type: "Individual Practice",
      duration: "15-20 minutes",
      description: "Traditional pranayama and mindfulness meditation",
      benefits: ["Reduced stress", "Emotional balance", "Mental clarity"],
      instructions: ["Find a quiet space and sit comfortably", "Practice Anulom Vilom (alternate nostril breathing)", "Focus on the breath and present moment", "End with a short gratitude meditation"],
      frequency: "Daily",
      bestTime: "Morning or evening",
    },
  ];

  let harmonyTips = [
    {
      situation: "Family Disagreement",
      approach: "Listen first, then speak",
      technique: "Use 'I' statements instead of 'You' accusations",
      example: "'I feel hurt when...' instead of 'You always...'",
    },
    {
      situation: "Generational Differences",
      approach: "Find common ground",
      technique: "Focus on shared values rather than different methods",
      example: "We both want the family to be happy and successful",
    },
    {
      situation: "Stress During Festivals",
      approach: "Delegate and simplify",
      technique: "Assign specific roles and reduce perfectionism",
      example: "Everyone contributes one dish, focus on togetherness",
    },
    {
      situation: "Academic Pressure",
      approach: "Balance expectations",
      technique: "Set realistic goals and celebrate small wins",
      example: "Progress is more important than perfection",
    },
  ];

  async function loadMoodEntries() {
    try {
      moodEntries = (await db.moodEntries?.toArray()) || [];
    } catch (error) {
      console.error("Error loading mood entries:", error);
      moodEntries = [];
    }
  }

  async function addMoodEntry() {
    try {
      const entry = {
        ...newMoodEntry,
        id: Date.now(),
        date: new Date().toISOString(),
        triggers: newMoodEntry.triggers.filter((trigger) => trigger.trim() !== ""),
        goals: newMoodEntry.goals.filter((goal) => goal.trim() !== ""),
      };

      await db.moodEntries?.add(entry);
      moodEntries = [...moodEntries, entry];

      // Reset form
      newMoodEntry = {
        mood: "neutral",
        intensity: 5,
        triggers: [],
        notes: "",
        gratitude: "",
        goals: [],
      };
      showAddMood = false;
    } catch (error) {
      console.error("Error adding mood entry:", error);
    }
  }

  function getMoodData(moodId) {
    return moods.find((mood) => mood.id === moodId) || moods[2]; // Default to neutral
  }

  function calculateMoodStats() {
    const last7Days = moodEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    const moodCounts = {};
    let totalIntensity = 0;

    last7Days.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      totalIntensity += entry.intensity;
    });

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => (moodCounts[a] > moodCounts[b] ? a : b), "neutral");

    const averageIntensity = last7Days.length > 0 ? totalIntensity / last7Days.length : 5;

    return {
      weeklyEntries: last7Days.length,
      mostCommonMood,
      averageIntensity: averageIntensity.toFixed(1),
      moodDistribution: moodCounts,
    };
  }

  let moodStats = {};

  onMount(() => {
    document.title = "Emotions & Feelings - Family App";
    loadMoodEntries();
  });

  // Update stats when mood entries change
  $: if (moodEntries.length >= 0) {
    moodStats = calculateMoodStats();
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-rose-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white">
            <Icon icon="heroicons:heart" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Emotions & Feelings</h1>
            <p class="text-gray-600 dark:text-gray-300">मनः शान्तिर्भवति | Let the mind find peace</p>
          </div>
        </div>
      </div>

      <!-- Emotional Wisdom Quote -->
      <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:sparkles" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">भावना संतुलन | Emotional Balance</h3>
            <p class="text-white/90">"Understanding and honoring our emotions leads to harmony within ourselves and our family."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "உணர்வுகளைப் புரிந்துகொள்வது குடும்பத்தில் நல்லிணக்கம் கொண்டுவரும்"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-pink-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-pink-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-pink-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "dashboard"}
        <!-- Mood Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 rounded-xl p-4 text-center">
            <Icon icon="heroicons:chart-bar" class="w-8 h-8 mx-auto text-pink-600 dark:text-pink-400 mb-2" />
            <p class="text-2xl font-bold text-pink-900 dark:text-pink-100">{moodStats.weeklyEntries || 0}</p>
            <p class="text-sm text-pink-700 dark:text-pink-300">This Week</p>
          </div>
          <div class="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl p-4 text-center">
            <div class="w-8 h-8 mx-auto mb-2 text-2xl">{getMoodData(moodStats.mostCommonMood)?.emoji || "😐"}</div>
            <p class="text-sm font-bold text-green-900 dark:text-green-100">{getMoodData(moodStats.mostCommonMood)?.label || "Neutral"}</p>
            <p class="text-sm text-green-700 dark:text-green-300">Most Common</p>
          </div>
          <div class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-4 text-center">
            <Icon icon="heroicons:signal" class="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
            <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">{moodStats.averageIntensity || "5.0"}</p>
            <p class="text-sm text-blue-700 dark:text-blue-300">Avg Intensity</p>
          </div>
          <div class="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl p-4 text-center">
            <Icon icon="heroicons:heart" class="w-8 h-8 mx-auto text-yellow-600 dark:text-yellow-400 mb-2" />
            <p class="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{Object.keys(moodStats.moodDistribution || {}).length}</p>
            <p class="text-sm text-yellow-700 dark:text-yellow-300">Mood Variety</p>
          </div>
        </div>

        <!-- Quick Mood Check-in -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">💭 How are you feeling today?</h3>
          <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
            {#each moods as mood}
              <button
                class="p-4 rounded-xl border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200 {mood.bgColor}"
                on:click={() => {
                  newMoodEntry.mood = mood.id;
                  showAddMood = true;
                }}
              >
                <div class="text-3xl mb-2">{mood.emoji}</div>
                <p class="text-xs font-medium {mood.color}">{mood.label}</p>
              </button>
            {/each}
          </div>
        </div>

        <!-- Emotional Wisdom Cards -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">🌸 Daily Emotional Wisdom</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {#each emotionalWisdom as wisdom}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
                <blockquote class="font-semibold text-orange-800 dark:text-orange-200 mb-2">"{wisdom.english}"</blockquote>
                <p class="text-sm text-orange-700 dark:text-orange-300 mb-1">{wisdom.sanskrit}</p>
                <p class="text-sm text-orange-600 dark:text-orange-400 mb-2">{wisdom.tamil}</p>
                <div class="mt-3 p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                  <p class="text-xs font-medium text-orange-800 dark:text-orange-200">Remedy: {wisdom.remedy}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Recent Mood Entries -->
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">📊 Recent Mood Entries</h3>
          <div class="space-y-3">
            {#each moodEntries.slice(-5).reverse() as entry}
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-4">
                  <div class="text-2xl">{getMoodData(entry.mood).emoji}</div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{getMoodData(entry.mood).label}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Intensity: {entry.intensity}/10
                      {#if entry.triggers && entry.triggers.length > 0}
                        • Triggers: {entry.triggers.slice(0, 2).join(", ")}
                      {/if}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            {/each}
          </div>

          {#if moodEntries.length === 0}
            <div class="text-center py-8">
              <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-pink-400 mb-4" />
              <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Your Emotional Journey</h3>
              <p class="text-gray-500 dark:text-gray-400">Begin tracking your moods to understand patterns and improve wellbeing</p>
            </div>
          {/if}
        </div>
      {:else if currentTab === "moods"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">😊 Mood Tracker</h3>
          <button class="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors" on:click={() => (showAddMood = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Mood Entry</span>
          </button>
        </div>

        {#if showAddMood}
          <div class="mb-6 p-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
            <h4 class="font-semibold text-pink-800 dark:text-pink-200 mb-4">How are you feeling?</h4>

            <!-- Mood Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Mood</label>
              <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
                {#each moods as mood}
                  <button class="p-3 rounded-lg border-2 transition-all duration-200 {newMoodEntry.mood === mood.id ? 'border-pink-500 bg-pink-100 dark:bg-pink-900' : 'border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-600'}" on:click={() => (newMoodEntry.mood = mood.id)}>
                    <div class="text-2xl mb-1">{mood.emoji}</div>
                    <p class="text-xs font-medium">{mood.label}</p>
                  </button>
                {/each}
              </div>
            </div>

            <!-- Intensity Slider -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intensity: {newMoodEntry.intensity}/10
              </label>
              <input type="range" min="1" max="10" bind:value={newMoodEntry.intensity} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>

            <!-- Triggers -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What triggered this feeling?</label>
              <div class="flex flex-wrap gap-2 mb-2">
                {#each commonTriggers as trigger}
                  <button
                    class="px-3 py-1 text-sm rounded-full border transition-colors {newMoodEntry.triggers.includes(trigger) ? 'bg-pink-500 text-white border-pink-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-pink-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}"
                    on:click={() => {
                      if (newMoodEntry.triggers.includes(trigger)) {
                        newMoodEntry.triggers = newMoodEntry.triggers.filter((t) => t !== trigger);
                      } else {
                        newMoodEntry.triggers = [...newMoodEntry.triggers, trigger];
                      }
                    }}
                  >
                    {trigger}
                  </button>
                {/each}
              </div>
            </div>

            <!-- Notes -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
              <textarea bind:value={newMoodEntry.notes} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe what happened or how you're feeling..."></textarea>
            </div>

            <!-- Gratitude -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gratitude (What are you thankful for today?)</label>
              <input type="text" bind:value={newMoodEntry.gratitude} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="I'm grateful for..." />
            </div>

            <div class="flex space-x-3">
              <button class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors" on:click={addMoodEntry}> Save Entry </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddMood = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Mood History -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each moodEntries.slice().reverse() as entry}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="text-3xl">{getMoodData(entry.mood).emoji}</div>
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{getMoodData(entry.mood).label}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Intensity: {entry.intensity}/10</p>
                  </div>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </div>

              {#if entry.triggers && entry.triggers.length > 0}
                <div class="mb-3">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Triggers:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each entry.triggers as trigger}
                      <span class="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded">
                        {trigger}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}

              {#if entry.notes}
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{entry.notes}</p>
              {/if}

              {#if entry.gratitude}
                <div class="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p class="text-xs text-yellow-800 dark:text-yellow-200">
                    <Icon icon="heroicons:heart" class="w-3 h-3 inline mr-1" />
                    {entry.gratitude}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else if currentTab === "support"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">👨‍👩‍👧‍👦 Family Support Network</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each familySupportNetwork as person}
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div class="flex items-start space-x-4 mb-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 class="font-bold text-blue-900 dark:text-blue-100">{person.name}</h4>
                    <p class="text-blue-700 dark:text-blue-300 text-sm">{person.role}</p>
                    <p class="text-blue-600 dark:text-blue-400 text-xs">{person.availability}</p>
                  </div>
                </div>

                <p class="text-blue-800 dark:text-blue-200 text-sm mb-4">{person.specialty}</p>

                <div class="mb-4">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Best for:</h5>
                  <div class="flex flex-wrap gap-1">
                    {#each person.bestFor as area}
                      <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                        {area}
                      </span>
                    {/each}
                  </div>
                </div>

                <div class="mb-4">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-1">Approach:</h5>
                  <p class="text-sm text-blue-700 dark:text-blue-300">{person.approach}</p>
                </div>

                <div class="flex items-center justify-between">
                  <p class="text-xs text-blue-600 dark:text-blue-400">{person.contact}</p>
                  <button class="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors" on:click={() => (showSupportModal = true)}> Reach Out </button>
                </div>
              </div>
            {/each}
          </div>

          <!-- Emergency Support -->
          <div class="mt-8 p-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl border border-red-200 dark:border-red-700">
            <h4 class="font-bold text-red-800 dark:text-red-200 mb-4 flex items-center">
              <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
              Emergency Emotional Support
            </h4>
            <p class="text-red-700 dark:text-red-300 mb-4">If you're experiencing intense emotional distress or having thoughts of self-harm, please reach out immediately.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h5 class="font-semibold text-red-800 dark:text-red-200">Family Crisis Line</h5>
                <p class="text-sm text-red-600 dark:text-red-400">Call: +91-98765-43210</p>
              </div>
              <div class="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h5 class="font-semibold text-red-800 dark:text-red-200">Mental Health Helpline</h5>
                <p class="text-sm text-red-600 dark:text-red-400">24/7: 1-800-SUPPORT</p>
              </div>
              <div class="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h5 class="font-semibold text-red-800 dark:text-red-200">Local Counselor</h5>
                <p class="text-sm text-red-600 dark:text-red-400">Dr. Priya: 9876543210</p>
              </div>
            </div>
          </div>
        </div>
      {:else if currentTab === "wellness"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">✨ Emotional Wellness Activities</h3>
          <div class="space-y-6">
            {#each wellnessActivities as activity}
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-green-900 dark:text-green-100">{activity.name}</h4>
                    <p class="text-green-700 dark:text-green-300">{activity.type} • {activity.duration}</p>
                    <p class="text-green-600 dark:text-green-400 text-sm">{activity.frequency} • {activity.bestTime}</p>
                  </div>
                </div>

                <p class="text-green-800 dark:text-green-200 mb-4">{activity.description}</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Benefits -->
                  <div>
                    <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">Benefits:</h5>
                    <div class="space-y-1">
                      {#each activity.benefits as benefit}
                        <div class="flex items-center space-x-2">
                          <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span class="text-sm text-green-700 dark:text-green-300">{benefit}</span>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <!-- Instructions -->
                  <div>
                    <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">How to Practice:</h5>
                    <div class="space-y-2">
                      {#each activity.instructions as instruction, index}
                        <div class="flex items-start space-x-2">
                          <span class="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {index + 1}
                          </span>
                          <span class="text-sm text-green-700 dark:text-green-300">{instruction}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex space-x-3">
                  <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"> Start Practice </button>
                  <button class="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-300"> Set Reminder </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "harmony"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">☮️ Family Harmony Guide</h3>
          <div class="space-y-6">
            {#each harmonyTips as tip}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                <h4 class="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">{tip.situation}</h4>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Approach:</h5>
                    <p class="text-sm text-purple-700 dark:text-purple-300">{tip.approach}</p>
                  </div>

                  <div>
                    <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Technique:</h5>
                    <p class="text-sm text-purple-700 dark:text-purple-300">{tip.technique}</p>
                  </div>

                  <div>
                    <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Example:</h5>
                    <p class="text-sm text-purple-700 dark:text-purple-300 italic">"{tip.example}"</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Family Communication Guidelines -->
          <div class="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
              <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
              पारिवारिक संवाद | Family Communication Principles
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Do's:</h5>
                <ul class="space-y-2 text-sm text-indigo-600 dark:text-indigo-400">
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:check" class="w-4 h-4 text-green-500" />
                    <span>Listen with full attention</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:check" class="w-4 h-4 text-green-500" />
                    <span>Express gratitude regularly</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:check" class="w-4 h-4 text-green-500" />
                    <span>Share feelings honestly</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:check" class="w-4 h-4 text-green-500" />
                    <span>Ask for help when needed</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Don'ts:</h5>
                <ul class="space-y-2 text-sm text-indigo-600 dark:text-indigo-400">
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:x-mark" class="w-4 h-4 text-red-500" />
                    <span>Interrupt while others are speaking</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:x-mark" class="w-4 h-4 text-red-500" />
                    <span>Bring up past mistakes</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:x-mark" class="w-4 h-4 text-red-500" />
                    <span>Make assumptions about feelings</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon icon="heroicons:x-mark" class="w-4 h-4 text-red-500" />
                    <span>Dismiss emotions as unimportant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Support Modal -->
{#if showSupportModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
      <div class="text-center">
        <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-pink-500 mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Reach Out for Support</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You're not alone. Your family is here for you.</p>

        <div class="space-y-3">
          <button class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"> Call Family Member </button>
          <button class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"> Send WhatsApp Message </button>
          <button class="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"> Schedule Video Call </button>
        </div>

        <button class="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showSupportModal = false)}> Close </button>
      </div>
    </div>
  </div>
{/if}
