<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "dashboard";
  let workoutData = [];
  let showAddWorkout = false;
  let activeTimer = null;
  let timerDuration = 0;
  let timeRemaining = 0;
  let isTimerRunning = false;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "heroicons:chart-bar" },
    { id: "yoga", label: "Yoga Practice", icon: "heroicons:user" },
    { id: "exercise", label: "Exercise", icon: "heroicons:bolt" },
    { id: "meditation", label: "Meditation", icon: "heroicons:sparkles" },
    { id: "tracker", label: "Activity Tracker", icon: "heroicons:clock" },
  ];

  let weeklyStats = {
    yogaSessions: 0,
    exerciseMinutes: 0,
    meditationMinutes: 0,
    caloriesBurned: 0,
  };

  let newWorkout = {
    type: "yoga",
    name: "",
    duration: 30,
    intensity: "medium",
    notes: "",
  };

  const yogaPoses = [
    {
      id: 1,
      name: "Surya Namaskara",
      sanskritName: "सूर्य नमस्कार",
      englishName: "Sun Salutation",
      tamilName: "சூர்ய நமஸ்கார",
      duration: "10-15 minutes",
      difficulty: "Beginner",
      benefits: ["Improves flexibility", "Strengthens muscles", "Boosts energy"],
      description: "A sequence of 12 yoga poses performed in a flowing manner",
      steps: ["Pranamasana (Prayer Pose)", "Hastauttanasana (Raised Arms Pose)", "Uttanasana (Standing Forward Bend)", "Ashwa Sanchalanasana (Equestrian Pose)", "Dandasana (Stick Pose)", "Ashtanga Namaskara (Salute with Eight Parts)", "Bhujangasana (Cobra Pose)", "Adho Mukha Svanasana (Downward Dog)", "Ashwa Sanchalanasana (Equestrian Pose)", "Uttanasana (Standing Forward Bend)", "Hastauttanasana (Raised Arms Pose)", "Tadasana (Mountain Pose)"],
    },
    {
      id: 2,
      name: "Pranayama",
      sanskritName: "प्राणायाम",
      englishName: "Breathing Exercises",
      tamilName: "பிராணாயாம",
      duration: "5-20 minutes",
      difficulty: "All Levels",
      benefits: ["Reduces stress", "Improves focus", "Balances nervous system"],
      description: "Ancient breathing techniques for mind-body wellness",
      steps: ["Anulom Vilom (Alternate Nostril Breathing)", "Bhramari (Bee Breath)", "Ujjayi (Ocean Breath)", "Kapalabhati (Skull Shining Breath)"],
    },
    {
      id: 3,
      name: "Asana Practice",
      sanskritName: "आसन अभ्यास",
      englishName: "Posture Practice",
      tamilName: "ஆசன அப்யாசம்",
      duration: "30-60 minutes",
      difficulty: "Intermediate",
      benefits: ["Increases flexibility", "Builds strength", "Improves balance"],
      description: "Traditional yoga postures for physical and mental well-being",
      steps: ["Vrikshasana (Tree Pose)", "Trikonasana (Triangle Pose)", "Balasana (Child's Pose)", "Sarvangasana (Shoulder Stand)", "Shavasana (Corpse Pose)"],
    },
  ];

  const exercises = [
    {
      id: 1,
      name: "Mallakhamb Training",
      type: "Traditional Strength",
      duration: "45 minutes",
      difficulty: "Advanced",
      equipment: "Mallakhamb Pole",
      benefits: ["Full body strength", "Flexibility", "Balance"],
      description: "Ancient Indian gymnastics practiced by warriors",
    },
    {
      id: 2,
      name: "Kalaripayattu Moves",
      type: "Martial Arts",
      duration: "60 minutes",
      difficulty: "Intermediate",
      equipment: "None",
      benefits: ["Agility", "Coordination", "Self-defense"],
      description: "Traditional Kerala martial art focusing on fluid movements",
    },
    {
      id: 3,
      name: "Bharatanatyam Adavus",
      type: "Dance Fitness",
      duration: "30 minutes",
      difficulty: "Beginner",
      equipment: "None",
      benefits: ["Grace", "Stamina", "Cultural connection"],
      description: "Classical dance movements for fitness and cultural preservation",
    },
  ];

  const meditationTechniques = [
    {
      id: 1,
      name: "Vipassana",
      sanskritName: "विपश्यना",
      duration: "10-45 minutes",
      type: "Mindfulness",
      description: "Insight meditation focusing on awareness of present moment",
      instructions: ["Sit comfortably with spine straight", "Focus on natural breathing", "Observe thoughts without judgment", "Return attention to breath when mind wanders"],
    },
    {
      id: 2,
      name: "Om Chanting",
      sanskritName: "ॐ जप",
      duration: "5-20 minutes",
      type: "Sound Meditation",
      description: "Sacred sound vibration for spiritual harmony",
      instructions: ["Sit in comfortable meditation posture", "Take deep breath and chant 'OM' slowly", "Feel vibrations throughout body", "Repeat with awareness and devotion"],
    },
    {
      id: 3,
      name: "Trataka",
      sanskritName: "त्राटक",
      duration: "5-15 minutes",
      type: "Concentration",
      description: "Candle gazing meditation for focus and clarity",
      instructions: ["Light candle and sit 3 feet away", "Gaze at flame without blinking", "Close eyes and visualize flame", "Gradually increase duration"],
    },
  ];

  async function loadWorkoutData() {
    try {
      workoutData = (await db.workouts?.toArray()) || [];
      calculateWeeklyStats();
    } catch (error) {
      console.error("Error loading workout data:", error);
      workoutData = [];
    }
  }

  function calculateWeeklyStats() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyWorkouts = workoutData.filter((workout) => new Date(workout.date) >= oneWeekAgo);

    weeklyStats = {
      yogaSessions: weeklyWorkouts.filter((w) => w.type === "yoga").length,
      exerciseMinutes: weeklyWorkouts.filter((w) => w.type === "exercise").reduce((sum, w) => sum + w.duration, 0),
      meditationMinutes: weeklyWorkouts.filter((w) => w.type === "meditation").reduce((sum, w) => sum + w.duration, 0),
      caloriesBurned: weeklyWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
    };
  }

  async function addWorkout() {
    if (!newWorkout.name.trim()) return;

    try {
      const workout = {
        ...newWorkout,
        id: Date.now(),
        date: new Date().toISOString(),
        calories: calculateCalories(newWorkout.type, newWorkout.duration, newWorkout.intensity),
      };

      await db.workouts?.add(workout);
      workoutData = [...workoutData, workout];
      calculateWeeklyStats();

      // Reset form
      newWorkout = {
        type: "yoga",
        name: "",
        duration: 30,
        intensity: "medium",
        notes: "",
      };
      showAddWorkout = false;
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  }

  function calculateCalories(type, duration, intensity) {
    const baseCalories = {
      yoga: 3,
      exercise: 8,
      meditation: 1,
    };

    const intensityMultiplier = {
      low: 0.8,
      medium: 1.0,
      high: 1.3,
    };

    return Math.round(baseCalories[type] * duration * intensityMultiplier[intensity]);
  }

  function startTimer(minutes) {
    if (isTimerRunning) {
      stopTimer();
      return;
    }

    timerDuration = minutes * 60;
    timeRemaining = timerDuration;
    isTimerRunning = true;

    activeTimer = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        stopTimer();
        // Play completion sound or notification
        alert("Session completed! 🧘‍♀️");
      }
    }, 1000);
  }

  function stopTimer() {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
    isTimerRunning = false;
    timeRemaining = 0;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function getActivityIcon(type) {
    switch (type) {
      case "yoga":
        return "heroicons:user";
      case "exercise":
        return "heroicons:bolt";
      case "meditation":
        return "heroicons:sparkles";
      default:
        return "heroicons:heart";
    }
  }

  onMount(() => {
    document.title = "Yoga & Exercise - Family App";
    loadWorkoutData();

    return () => {
      if (activeTimer) {
        clearInterval(activeTimer);
      }
    };
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <Icon icon="heroicons:user" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Yoga & Exercise</h1>
            <p class="text-gray-600 dark:text-gray-300">शरीरमाद्यं खलु धर्मसाधनम् | Body is the foundation of dharma</p>
          </div>
        </div>

        {#if isTimerRunning}
          <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg">
            <div class="flex items-center space-x-3">
              <Icon icon="heroicons:clock" class="w-6 h-6" />
              <div>
                <p class="text-lg font-bold">{formatTime(timeRemaining)}</p>
                <p class="text-sm opacity-90">Session in progress</p>
              </div>
              <button class="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors" on:click={stopTimer}>
                <Icon icon="heroicons:stop" class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/if}
      </div>

      <!-- Sanskrit Wisdom -->
      <div class="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:sparkles" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">योगः चित्तवृत्तिनिरोधः | Yoga is the cessation of fluctuations of the mind</h3>
            <p class="text-white/90">"Through yoga, we unite the body, mind, and spirit in perfect harmony."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "யோகம் மனதின் அலைவரிசைகளை நிறுத்துதல்"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "dashboard"}
        <!-- Weekly Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4 text-center">
            <Icon icon="heroicons:user" class="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
            <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">{weeklyStats.yogaSessions}</p>
            <p class="text-sm text-purple-700 dark:text-purple-300">Yoga Sessions</p>
          </div>
          <div class="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-xl p-4 text-center">
            <Icon icon="heroicons:bolt" class="w-8 h-8 mx-auto text-orange-600 dark:text-orange-400 mb-2" />
            <p class="text-2xl font-bold text-orange-900 dark:text-orange-100">{weeklyStats.exerciseMinutes}</p>
            <p class="text-sm text-orange-700 dark:text-orange-300">Exercise Minutes</p>
          </div>
          <div class="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 rounded-xl p-4 text-center">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 mx-auto text-pink-600 dark:text-pink-400 mb-2" />
            <p class="text-2xl font-bold text-pink-900 dark:text-pink-100">{weeklyStats.meditationMinutes}</p>
            <p class="text-sm text-pink-700 dark:text-pink-300">Meditation Minutes</p>
          </div>
          <div class="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl p-4 text-center">
            <Icon icon="heroicons:fire" class="w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-2" />
            <p class="text-2xl font-bold text-green-900 dark:text-green-100">{weeklyStats.caloriesBurned}</p>
            <p class="text-sm text-green-700 dark:text-green-300">Calories Burned</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
            <h3 class="text-xl font-bold mb-4">🧘‍♀️ Start Yoga Session</h3>
            <p class="text-purple-100 mb-4">Begin your daily yoga practice</p>
            <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors" on:click={() => startTimer(30)}> 30 Min Session </button>
          </div>

          <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white">
            <h3 class="text-xl font-bold mb-4">💪 Quick Workout</h3>
            <p class="text-orange-100 mb-4">High-intensity exercise routine</p>
            <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors" on:click={() => startTimer(20)}> 20 Min Workout </button>
          </div>

          <div class="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl p-6 text-white">
            <h3 class="text-xl font-bold mb-4">🧘 Meditation</h3>
            <p class="text-pink-100 mb-4">Mindfulness and breathing</p>
            <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors" on:click={() => startTimer(15)}> 15 Min Meditation </button>
          </div>
        </div>

        <!-- Recent Activities -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Recent Activities</h3>
            <button class="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors" on:click={() => (showAddWorkout = true)}>
              <Icon icon="heroicons:plus" class="w-4 h-4" />
              <span>Log Activity</span>
            </button>
          </div>

          {#if showAddWorkout}
            <div class="mb-6 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-4">Log New Activity</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Type</label>
                  <select bind:value={newWorkout.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="yoga">Yoga</option>
                    <option value="exercise">Exercise</option>
                    <option value="meditation">Meditation</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Name</label>
                  <input type="text" bind:value={newWorkout.name} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What did you practice?" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (minutes)</label>
                  <input type="number" bind:value={newWorkout.duration} min="1" max="180" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Intensity</label>
                  <select bind:value={newWorkout.intensity} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea bind:value={newWorkout.notes} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="How did it feel?"></textarea>
                </div>
              </div>
              <div class="flex space-x-3 mt-4">
                <button class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors" on:click={addWorkout}> Log Activity </button>
                <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddWorkout = false)}> Cancel </button>
              </div>
            </div>
          {/if}

          <div class="space-y-3">
            {#each workoutData.slice(0, 5) as workout}
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-4">
                  <Icon icon={getActivityIcon(workout.type)} class="w-6 h-6 text-purple-500" />
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{workout.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {workout.duration} min • {workout.intensity} intensity
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-purple-600 dark:text-purple-400">{workout.calories} cal</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            {/each}
          </div>

          {#if workoutData.length === 0}
            <div class="text-center py-8">
              <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Your Wellness Journey</h3>
              <p class="text-gray-500 dark:text-gray-400">Log your first activity to begin tracking your progress</p>
            </div>
          {/if}
        </div>
      {:else if currentTab === "yoga"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🧘‍♀️ Traditional Yoga Practices</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each yogaPoses as pose}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                <div class="mb-4">
                  <h4 class="font-bold text-purple-900 dark:text-purple-100 text-lg">{pose.name}</h4>
                  <p class="text-purple-700 dark:text-purple-300 text-sm">{pose.sanskritName}</p>
                  <p class="text-purple-600 dark:text-purple-400 text-sm">{pose.englishName}</p>
                  <p class="text-purple-500 dark:text-purple-500 text-xs">{pose.tamilName}</p>
                </div>

                <div class="flex items-center justify-between mb-4">
                  <span class="px-2 py-1 text-xs font-medium bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full">
                    {pose.difficulty}
                  </span>
                  <span class="text-sm text-purple-600 dark:text-purple-400">{pose.duration}</span>
                </div>

                <p class="text-purple-800 dark:text-purple-200 text-sm mb-4">{pose.description}</p>

                <div class="mb-4">
                  <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Benefits:</h5>
                  <div class="space-y-1">
                    {#each pose.benefits as benefit}
                      <div class="flex items-center space-x-2">
                        <Icon icon="heroicons:check" class="w-3 h-3 text-green-500" />
                        <span class="text-xs text-purple-700 dark:text-purple-300">{benefit}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                <button class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors" on:click={() => startTimer(parseInt(pose.duration.split("-")[0]))}> Start Practice </button>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "exercise"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">💪 Traditional Indian Exercises</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each exercises as exercise}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <div class="mb-4">
                  <h4 class="font-bold text-orange-900 dark:text-orange-100 text-lg">{exercise.name}</h4>
                  <p class="text-orange-700 dark:text-orange-300 text-sm">{exercise.type}</p>
                </div>

                <div class="flex items-center justify-between mb-4">
                  <span class="px-2 py-1 text-xs font-medium bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full">
                    {exercise.difficulty}
                  </span>
                  <span class="text-sm text-orange-600 dark:text-orange-400">{exercise.duration}</span>
                </div>

                <p class="text-orange-800 dark:text-orange-200 text-sm mb-4">{exercise.description}</p>

                <div class="mb-4">
                  <p class="text-sm text-orange-700 dark:text-orange-300">
                    <span class="font-semibold">Equipment:</span>
                    {exercise.equipment}
                  </p>
                </div>

                <div class="mb-4">
                  <h5 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Benefits:</h5>
                  <div class="space-y-1">
                    {#each exercise.benefits as benefit}
                      <div class="flex items-center space-x-2">
                        <Icon icon="heroicons:check" class="w-3 h-3 text-green-500" />
                        <span class="text-xs text-orange-700 dark:text-orange-300">{benefit}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                <button class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors" on:click={() => startTimer(parseInt(exercise.duration.split(" ")[0]))}> Start Training </button>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "meditation"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🧘 Meditation Techniques</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each meditationTechniques as technique}
              <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-700">
                <div class="mb-4">
                  <h4 class="font-bold text-pink-900 dark:text-pink-100 text-lg">{technique.name}</h4>
                  <p class="text-pink-700 dark:text-pink-300 text-sm">{technique.sanskritName}</p>
                  <p class="text-pink-600 dark:text-pink-400 text-sm">{technique.type}</p>
                </div>

                <div class="flex items-center justify-between mb-4">
                  <span class="px-2 py-1 text-xs font-medium bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full">
                    {technique.type}
                  </span>
                  <span class="text-sm text-pink-600 dark:text-pink-400">{technique.duration}</span>
                </div>

                <p class="text-pink-800 dark:text-pink-200 text-sm mb-4">{technique.description}</p>

                <div class="mb-4">
                  <h5 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">Instructions:</h5>
                  <div class="space-y-1">
                    {#each technique.instructions as instruction, index}
                      <div class="flex items-start space-x-2">
                        <span class="text-xs bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span class="text-xs text-pink-700 dark:text-pink-300">{instruction}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                <button class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors" on:click={() => startTimer(parseInt(technique.duration.split("-")[0]))}> Begin Meditation </button>
              </div>
            {/each}
          </div>

          <!-- Meditation Wisdom -->
          <div class="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
              <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-2" />
              ध्यान की महत्ता | Importance of Meditation
            </h4>
            <blockquote class="italic text-indigo-700 dark:text-indigo-300 mb-2">
              "ध्यानात् ज्ञानं प्रसीदति।<br />
              अज्ञानात् संशयो जायते॥"
            </blockquote>
            <p class="text-sm text-indigo-600 dark:text-indigo-400">"From meditation comes wisdom. From ignorance comes doubt."</p>
            <p class="text-xs text-indigo-500 dark:text-indigo-500 mt-2">Tamil: "தியானத்திலிருந்து ஞானம் வரும், அறியாமையிலிருந்து சந்தேகம் வரும்"</p>
          </div>
        </div>
      {:else if currentTab === "tracker"}
        <div class="text-center py-12">
          <Icon icon="heroicons:chart-bar" class="w-16 h-16 mx-auto text-purple-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Activity Tracker</h3>
          <p class="text-gray-500 dark:text-gray-400">Detailed analytics and progress tracking</p>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
              <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Monthly Progress</h4>
              <p class="text-sm text-blue-600 dark:text-blue-300">📈 Consistency improving week by week</p>
              <div class="mt-4 h-20 bg-blue-200 dark:bg-blue-700 rounded-lg flex items-end justify-center">
                <div class="text-sm text-blue-700 dark:text-blue-300">Chart visualization coming soon</div>
              </div>
            </div>
            <div class="p-6 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Wellness Score</h4>
              <p class="text-sm text-green-600 dark:text-green-300">🎯 Based on balance of activities</p>
              <div class="mt-4 flex items-center justify-center">
                <div class="text-3xl font-bold text-green-700 dark:text-green-300">85%</div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
