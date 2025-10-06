<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentView = "dashboard";
  let showActivityModal = false;
  let showHobbyModal = false;
  let showSessionModal = false;
  let selectedMember = "all";
  let selectedHobby = null;
  let selectedActivity = null;

  const views = [
    { id: "dashboard", label: "Dashboard", icon: "heroicons:home" },
    { id: "hobbies", label: "Hobbies & Interests", icon: "heroicons:puzzle-piece" },
    { id: "activities", label: "Family Activities", icon: "heroicons:user-group" },
    { id: "sessions", label: "Activity Sessions", icon: "heroicons:clock" },
    { id: "achievements", label: "Achievements", icon: "heroicons:trophy" },
  ];

  const familyMembers = [
    { id: "all", name: "All Family", tamil: "முழு குடும்பம்" },
    { id: "father", name: "அப்பா (Father)", age: 45, avatar: "👨" },
    { id: "mother", name: "அம்மா (Mother)", age: 40, avatar: "👩" },
    { id: "grandfather", name: "தாத்தா (Grandfather)", age: 70, avatar: "👴" },
    { id: "grandmother", name: "பாட்டி (Grandmother)", age: 65, avatar: "👵" },
    { id: "son", name: "மகன் (Son)", age: 16, avatar: "👦" },
    { id: "daughter", name: "மகள் (Daughter)", age: 12, avatar: "👧" },
  ];

  const hobbyCategories = [
    { id: "creative", name: "Creative Arts", tamil: "கலை ஆக்கம்", icon: "heroicons:paint-brush", color: "bg-purple-500" },
    { id: "music", name: "Music & Dance", tamil: "இசை மற்றும் நடனம்", icon: "heroicons:musical-note", color: "bg-pink-500" },
    { id: "sports", name: "Sports & Fitness", tamil: "விளையாட்டு", icon: "heroicons:trophy", color: "bg-green-500" },
    { id: "learning", name: "Learning & Skills", tamil: "கற்றல்", icon: "heroicons:academic-cap", color: "bg-blue-500" },
    { id: "crafts", name: "Crafts & DIY", tamil: "கைவினை", icon: "heroicons:wrench-screwdriver", color: "bg-orange-500" },
    { id: "spiritual", name: "Spiritual & Wellness", tamil: "ஆன்மீகம்", icon: "heroicons:sparkles", color: "bg-indigo-500" },
    { id: "outdoor", name: "Outdoor Activities", tamil: "வெளியிட நிகழ்வுகள்", icon: "heroicons:sun", color: "bg-yellow-500" },
    { id: "games", name: "Games & Puzzles", tamil: "விளையாட்டுகள்", icon: "heroicons:puzzle-piece", color: "bg-red-500" },
  ];

  const individualHobbies = [
    // Creative Arts
    { id: 1, name: "Painting", tamil: "ஓவியம்", category: "creative", members: ["mother", "daughter"], skill: "intermediate", frequency: "weekly", materials: ["Canvas", "Brushes", "Colors"], progress: 65 },
    { id: 2, name: "Photography", tamil: "புகைப்படம்", category: "creative", members: ["father", "son"], skill: "advanced", frequency: "daily", materials: ["Camera", "Tripod"], progress: 80 },
    { id: 3, name: "Sketching", tamil: "ஓவிய வரைதல்", category: "creative", members: ["daughter", "grandmother"], skill: "beginner", frequency: "weekly", materials: ["Pencils", "Paper"], progress: 45 },

    // Music & Dance
    { id: 4, name: "Carnatic Music", tamil: "கர்நாடக இசை", category: "music", members: ["mother", "daughter"], skill: "intermediate", frequency: "daily", materials: ["Harmonium", "Tanpura"], progress: 70 },
    { id: 5, name: "Bharatanatyam", tamil: "பரதநாட்டியம்", category: "music", members: ["daughter"], skill: "intermediate", frequency: "3x week", materials: ["Costume", "Ghungroo"], progress: 60 },
    { id: 6, name: "Guitar Playing", tamil: "கிட்டார்", category: "music", members: ["son", "father"], skill: "beginner", frequency: "weekly", materials: ["Guitar", "Pick"], progress: 35 },

    // Sports & Fitness
    { id: 7, name: "Morning Walk", tamil: "காலை நடைப்பயிற்சி", category: "sports", members: ["grandfather", "grandmother"], skill: "beginner", frequency: "daily", materials: ["Walking Shoes"], progress: 90 },
    { id: 8, name: "Yoga", tamil: "யோகா", category: "sports", members: ["mother", "grandmother"], skill: "intermediate", frequency: "daily", materials: ["Yoga Mat"], progress: 75 },
    { id: 9, name: "Cricket", tamil: "கிரிக்கெட்", category: "sports", members: ["father", "son"], skill: "intermediate", frequency: "weekend", materials: ["Bat", "Ball"], progress: 70 },

    // Learning & Skills
    { id: 10, name: "Tamil Literature", tamil: "தமிழ் இலக்கியம்", category: "learning", members: ["grandfather", "mother"], skill: "advanced", frequency: "daily", materials: ["Books"], progress: 85 },
    { id: 11, name: "Cooking", tamil: "சமையல்", category: "learning", members: ["mother", "daughter"], skill: "advanced", frequency: "daily", materials: ["Recipe Books"], progress: 90 },
    { id: 12, name: "Computer Programming", tamil: "கணினி நிரலாக்கம்", category: "learning", members: ["son"], skill: "intermediate", frequency: "daily", materials: ["Laptop"], progress: 60 },

    // Crafts & DIY
    { id: 13, name: "Knitting", tamil: "பின்னல்", category: "crafts", members: ["grandmother", "mother"], skill: "advanced", frequency: "evening", materials: ["Yarn", "Needles"], progress: 95 },
    { id: 14, name: "Woodworking", tamil: "மரவேலை", category: "crafts", members: ["grandfather", "father"], skill: "intermediate", frequency: "weekend", materials: ["Tools", "Wood"], progress: 55 },

    // Spiritual & Wellness
    { id: 15, name: "Meditation", tamil: "தியானம்", category: "spiritual", members: ["grandfather", "mother"], skill: "intermediate", frequency: "daily", materials: ["Meditation Mat"], progress: 70 },
    { id: 16, name: "Devotional Reading", tamil: "பக்தி நூல் வாசிப்பு", category: "spiritual", members: ["grandmother", "grandfather"], skill: "advanced", frequency: "daily", materials: ["Religious Books"], progress: 85 },

    // Games & Puzzles
    { id: 17, name: "Chess", tamil: "சதுரங்கம்", category: "games", members: ["father", "son", "grandfather"], skill: "intermediate", frequency: "evening", materials: ["Chess Board"], progress: 65 },
    { id: 18, name: "Crossword Puzzles", tamil: "வார்த்தை புதிர்", category: "games", members: ["grandmother", "mother"], skill: "advanced", frequency: "daily", materials: ["Puzzle Books"], progress: 80 },
  ];

  const familyActivities = [
    { id: 1, name: "Family Movie Night", tamil: "குடும்ப திரைப்பட இரவு", frequency: "weekly", participants: "all", lastDone: "2025-10-05", rating: 9, duration: "3 hours" },
    { id: 2, name: "Temple Visit", tamil: "கோவில் வழிபாடு", frequency: "weekly", participants: "all", lastDone: "2025-10-06", rating: 10, duration: "2 hours" },
    { id: 3, name: "Cooking Together", tamil: "சேர்ந்து சமையல்", frequency: "weekend", participants: "women", lastDone: "2025-10-04", rating: 8, duration: "2 hours" },
    { id: 4, name: "Evening Walk", tamil: "மாலை நடைப்பயிற்சி", frequency: "daily", participants: "elders", lastDone: "2025-10-06", rating: 9, duration: "1 hour" },
    { id: 5, name: "Board Games", tamil: "பலகை விளையாட்டுகள்", frequency: "weekend", participants: "all", lastDone: "2025-10-03", rating: 8, duration: "2 hours" },
    { id: 6, name: "Garden Maintenance", tamil: "தோட்ட பராமரிப்பு", frequency: "weekly", participants: "adults", lastDone: "2025-10-05", rating: 7, duration: "1.5 hours" },
    { id: 7, name: "Story Telling", tamil: "கதை சொல்லல்", frequency: "bedtime", participants: "kids+elders", lastDone: "2025-10-06", rating: 10, duration: "30 mins" },
    { id: 8, name: "Festival Preparation", tamil: "பண்டிகை ஏற்பாடு", frequency: "seasonal", participants: "all", lastDone: "2025-09-28", rating: 9, duration: "Full day" },
  ];

  const activitySessions = [
    { id: 1, activity: "Morning Walk", member: "grandfather", date: "2025-10-06", duration: "45 mins", enjoyment: 9, notes: "சூரிய உதயத்தைப் பார்த்தேன். மிகவும் அழகாக இருந்தது." },
    { id: 2, activity: "Bharatanatyam", member: "daughter", date: "2025-10-06", duration: "1 hour", enjoyment: 8, notes: "புதிய அடவுகளைக் கற்றுக் கொண்டேன்." },
    { id: 3, activity: "Tamil Literature", member: "grandfather", date: "2025-10-06", duration: "2 hours", enjoyment: 10, notes: "திருக்குறள் பதிப்பைப் படித்தேன். மிகவும் ஆழமான கருத்துகள்." },
    { id: 4, activity: "Cooking", member: "mother", date: "2025-10-06", duration: "1.5 hours", enjoyment: 9, notes: "மகளுக்கு சாம்பார் செய்யக் கற்றுக் கொடுத்தேன்." },
    { id: 5, activity: "Chess", member: "son", date: "2025-10-05", duration: "45 mins", enjoyment: 8, notes: "அப்பாவுடன் விளையாடி வென்றேன்!" },
  ];

  const achievements = [
    { id: 1, member: "daughter", hobby: "Bharatanatyam", title: "First Arangetram", tamil: "முதல் அரங்கேற்றம்", date: "2025-09-15", description: "Successfully completed her debut performance", type: "milestone" },
    { id: 2, member: "mother", hobby: "Carnatic Music", title: "100 Day Streak", tamil: "100 நாள் தொடர்ச்சி", date: "2025-10-01", description: "Practiced daily for 100 consecutive days", type: "streak" },
    { id: 3, member: "grandfather", hobby: "Tamil Literature", title: "Read 50 Books", tamil: "50 புத்தகங்கள் வாசித்தல்", date: "2025-08-20", description: "Completed reading 50 Tamil literary works this year", type: "milestone" },
    { id: 4, member: "son", hobby: "Computer Programming", title: "First App Built", tamil: "முதல் செயலி உருவாக்கம்", date: "2025-09-30", description: "Created his first mobile application", type: "project" },
    { id: 5, member: "grandmother", hobby: "Knitting", title: "Master Knitter", tamil: "திறமையான பின்னல்காரி", date: "2025-07-10", description: "Completed 20 complex knitting projects", type: "skill" },
  ];

  // Modal states
  let newActivity = {
    name: "",
    tamilName: "",
    frequency: "weekly",
    participants: [],
    duration: "",
    notes: "",
  };

  let newHobby = {
    name: "",
    tamilName: "",
    category: "creative",
    members: [],
    skill: "beginner",
    frequency: "weekly",
    materials: [],
    notes: "",
  };

  let newSession = {
    activity: "",
    member: "",
    duration: "",
    enjoyment: 5,
    notes: "",
  };

  onMount(() => {
    document.title = "Hobbies & Activities - Health";
  });

  function getSkillColor(skill) {
    switch (skill) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getFrequencyColor(frequency) {
    switch (frequency) {
      case "daily":
        return "bg-green-500";
      case "3x week":
        return "bg-blue-500";
      case "weekly":
        return "bg-yellow-500";
      case "weekend":
        return "bg-orange-500";
      case "evening":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  }

  function getMemberName(memberId) {
    const member = familyMembers.find((m) => m.id === memberId);
    return member ? member.name : memberId;
  }

  function getCategoryIcon(categoryId) {
    const category = hobbyCategories.find((c) => c.id === categoryId);
    return category ? category.icon : "heroicons:star";
  }

  function getCategoryColor(categoryId) {
    const category = hobbyCategories.find((c) => c.id === categoryId);
    return category ? category.color : "bg-gray-500";
  }

  function addActivity() {
    // Add activity logic
    showActivityModal = false;
    newActivity = { name: "", tamilName: "", frequency: "weekly", participants: [], duration: "", notes: "" };
  }

  function addHobby() {
    // Add hobby logic
    showHobbyModal = false;
    newHobby = { name: "", tamilName: "", category: "creative", members: [], skill: "beginner", frequency: "weekly", materials: [], notes: "" };
  }

  function addSession() {
    // Add session logic
    showSessionModal = false;
    newSession = { activity: "", member: "", duration: "", enjoyment: 5, notes: "" };
  }

  $: filteredHobbies = selectedMember === "all" ? individualHobbies : individualHobbies.filter((h) => h.members.includes(selectedMember));
  $: filteredSessions = selectedMember === "all" ? activitySessions : activitySessions.filter((s) => s.member === selectedMember);
  $: filteredAchievements = selectedMember === "all" ? achievements : achievements.filter((a) => a.member === selectedMember);

  // Calculate summary stats
  $: totalHobbies = filteredHobbies.length;
  $: activeToday = filteredHobbies.filter((h) => h.frequency === "daily").length;
  $: avgProgress = filteredHobbies.reduce((acc, h) => acc + h.progress, 0) / filteredHobbies.length || 0;
  $: totalSessions = filteredSessions.length;
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:puzzle-piece" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">பொழுதுபோக்கு மற்றும் செயல்பாடுகள்</h1>
        <p class="text-gray-600 dark:text-gray-300">Hobbies, Interests & Family Activities Tracker</p>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <select bind:value={selectedMember} class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
        {#each familyMembers as member}
          <option value={member.id}>{member.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- View Tabs -->
  <div class="flex space-x-2">
    {#each views as view}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20'}" on:click={() => (currentView = view.id)}>
        <Icon icon={view.icon} class="w-4 h-4" />
        <span class="font-medium">{view.label}</span>
      </button>
    {/each}
  </div>

  <!-- Dashboard View -->
  {#if currentView === "dashboard"}
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Summary Stats -->
      <div class="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Hobbies</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{totalHobbies}</p>
            </div>
            <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Icon icon="heroicons:puzzle-piece" class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Active Today</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{activeToday}</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Icon icon="heroicons:clock" class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(avgProgress)}%</p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Recent Sessions</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{totalSessions}</p>
            </div>
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">இன்றைய செயல்பாடுகள்</h3>
        <div class="space-y-3">
          {#each filteredSessions.slice(0, 5) as session}
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{session.activity}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{getMemberName(session.member)} • {session.duration}</p>
                </div>
              </div>
              <div class="flex items-center space-x-1">
                {#each Array(session.enjoyment) as _}
                  <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-400" />
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Categories Overview -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">பொழுதுபோக்கு வகைகள்</h3>
        <div class="grid grid-cols-2 gap-3">
          {#each hobbyCategories as category}
            {@const count = filteredHobbies.filter((h) => h.category === category.id).length}
            <div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="p-2 {category.color} rounded-lg">
                <Icon icon={category.icon} class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{category.tamil}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{count} hobbies</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button on:click={() => (showHobbyModal = true)} class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
          <Icon icon="heroicons:plus" class="w-8 h-8 mx-auto mb-2" />
          <p class="font-semibold">Add New Hobby</p>
          <p class="text-sm opacity-90">புதிய பொழுதுபோக்கு</p>
        </button>

        <button on:click={() => (showActivityModal = true)} class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
          <Icon icon="heroicons:user-group" class="w-8 h-8 mx-auto mb-2" />
          <p class="font-semibold">Plan Family Activity</p>
          <p class="text-sm opacity-90">குடும்ப செயல்பாடு</p>
        </button>

        <button on:click={() => (showSessionModal = true)} class="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
          <Icon icon="heroicons:clock" class="w-8 h-8 mx-auto mb-2" />
          <p class="font-semibold">Log Session</p>
          <p class="text-sm opacity-90">அமர்வு பதிவு</p>
        </button>
      </div>
    </div>

    <!-- Hobbies View -->
  {:else if currentView === "hobbies"}
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">தனிநபர் பொழுதுபோக்குகள்</h2>
        <button on:click={() => (showHobbyModal = true)} class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
          <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-2" />
          Add Hobby
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredHobbies as hobby}
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 {getCategoryColor(hobby.category)} rounded-lg">
                  <Icon icon={getCategoryIcon(hobby.category)} class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white">{hobby.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{hobby.tamil}</p>
                </div>
              </div>
              <span class="px-2 py-1 text-xs font-medium rounded-full border {getSkillColor(hobby.skill)}">
                {hobby.skill}
              </span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{hobby.progress}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: {hobby.progress}%"></div>
              </div>

              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 {getFrequencyColor(hobby.frequency)} rounded-full"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{hobby.frequency}</span>
              </div>

              <div class="flex flex-wrap gap-1">
                {#each hobby.members as memberId}
                  <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                    {getMemberName(memberId)}
                  </span>
                {/each}
              </div>

              <div class="flex flex-wrap gap-1">
                {#each hobby.materials.slice(0, 3) as material}
                  <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                    {material}
                  </span>
                {/each}
                {#if hobby.materials.length > 3}
                  <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                    +{hobby.materials.length - 3} more
                  </span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Family Activities View -->
  {:else if currentView === "activities"}
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">குடும்ப செயல்பாடுகள்</h2>
        <button on:click={() => (showActivityModal = true)} class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-2" />
          Plan Activity
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each familyActivities as activity}
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{activity.name}</h3>
                <p class="text-gray-600 dark:text-gray-400">{activity.tamil}</p>
              </div>
              <div class="flex items-center space-x-1">
                {#each Array(Math.floor(activity.rating)) as _}
                  <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-400" />
                {/each}
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Frequency:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{activity.frequency}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{activity.duration}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Participants:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{activity.participants}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Last Done:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{activity.lastDone}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"> Schedule Next Session </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Sessions View -->
  {:else if currentView === "sessions"}
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">செயல்பாட்டு அமர்வுகள்</h2>
        <button on:click={() => (showSessionModal = true)} class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-2" />
          Log Session
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Enjoyment</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {#each filteredSessions as session}
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900 dark:text-white">{session.activity}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-400">{getMemberName(session.member)}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-400">{session.date}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 dark:text-gray-400">{session.duration}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-1">
                      {#each Array(session.enjoyment) as _}
                        <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-400" />
                      {/each}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{session.notes}</div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Achievements View -->
  {:else if currentView === "achievements"}
    <div class="space-y-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">சாதனைகள் மற்றும் மைல்கற்கள்</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredAchievements as achievement}
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Icon icon="heroicons:trophy" class="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{achievement.tamil}</p>
                </div>
              </div>
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                {achievement.type}
              </span>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Member:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{getMemberName(achievement.member)}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Hobby:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{achievement.hobby}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Date:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{achievement.date}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<!-- Add Hobby Modal -->
{#if showHobbyModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">புதிய பொழுதுபோக்கு சேர்க்கவும்</h3>
        <button on:click={() => (showHobbyModal = false)} class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Icon icon="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <form on:submit|preventDefault={addHobby} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hobby Name</label>
            <input type="text" bind:value={newHobby.name} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Painting" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tamil Name</label>
            <input type="text" bind:value={newHobby.tamilName} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., ஓவியம்" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select bind:value={newHobby.category} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
              {#each hobbyCategories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Level</label>
            <select bind:value={newHobby.skill} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
            <select bind:value={newHobby.frequency} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
              <option value="daily">Daily</option>
              <option value="3x week">3x Week</option>
              <option value="weekly">Weekly</option>
              <option value="weekend">Weekend</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
          <textarea bind:value={newHobby.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Additional notes about this hobby..."></textarea>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" on:click={() => (showHobbyModal = false)} class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"> Cancel </button>
          <button type="submit" class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"> Add Hobby </button>
        </div>
      </form>
    </div>
  </div>
{/if}
