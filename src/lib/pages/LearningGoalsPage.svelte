<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "goals";
  let goals = [];
  let skills = [];
  let showAddGoal = false;
  let showAddSkill = false;

  const tabs = [
    { id: "goals", label: "Learning Goals", icon: "heroicons:academic-cap" },
    { id: "skills", label: "Skill Tree", icon: "heroicons:puzzle-piece" },
    { id: "knowledge", label: "Family Knowledge", icon: "heroicons:users" },
    { id: "mentors", label: "Mentors & Guides", icon: "heroicons:user-group" },
  ];

  let newGoal = {
    title: "",
    description: "",
    category: "academic",
    priority: "medium",
    deadline: "",
    progress: 0,
    milestones: [],
  };

  let newSkill = {
    name: "",
    category: "technical",
    level: "beginner",
    description: "",
    prerequisites: [],
    resources: [],
  };

  const goalCategories = [
    { id: "academic", label: "Academic", icon: "heroicons:book-open", color: "text-blue-500" },
    { id: "cultural", label: "Cultural", icon: "heroicons:musical-note", color: "text-purple-500" },
    { id: "spiritual", label: "Spiritual", icon: "heroicons:sparkles", color: "text-yellow-500" },
    { id: "practical", label: "Practical", icon: "heroicons:wrench-screwdriver", color: "text-green-500" },
    { id: "artistic", label: "Artistic", icon: "heroicons:paint-brush", color: "text-pink-500" },
    { id: "social", label: "Social", icon: "heroicons:heart", color: "text-red-500" },
  ];

  const skillCategories = [
    { id: "technical", label: "Technical", icon: "heroicons:computer-desktop" },
    { id: "language", label: "Language", icon: "heroicons:language" },
    { id: "art", label: "Arts & Crafts", icon: "heroicons:paint-brush" },
    { id: "music", label: "Music & Dance", icon: "heroicons:musical-note" },
    { id: "cooking", label: "Cooking", icon: "heroicons:cake" },
    { id: "spiritual", label: "Spiritual", icon: "heroicons:sparkles" },
  ];

  let familyKnowledge = [
    {
      id: 1,
      title: "Traditional Recipes",
      description: "Ancient family recipes passed down through generations",
      keeper: "Grandmother",
      category: "Culinary",
      importance: "high",
      documented: true,
      skills: ["Sambar preparation", "Idli batter fermentation", "Pickle making"],
      icon: "heroicons:cake",
    },
    {
      id: 2,
      title: "Vedic Mantras",
      description: "Sacred chants and their proper pronunciation",
      keeper: "Grandfather",
      category: "Spiritual",
      importance: "high",
      documented: false,
      skills: ["Gayatri Mantra", "Maha Mrityunjaya", "Shanti Path"],
      icon: "heroicons:sparkles",
    },
    {
      id: 3,
      title: "Classical Music",
      description: "Carnatic music traditions and ragas",
      keeper: "Uncle",
      category: "Cultural",
      importance: "medium",
      documented: true,
      skills: ["Alapana", "Kalpana Swaram", "Tillana"],
      icon: "heroicons:musical-note",
    },
    {
      id: 4,
      title: "Ayurvedic Remedies",
      description: "Traditional healing and wellness practices",
      keeper: "Aunt",
      category: "Health",
      importance: "high",
      documented: false,
      skills: ["Herbal medicine", "Pulse reading", "Dietary guidelines"],
      icon: "heroicons:heart",
    },
  ];

  let mentors = [
    {
      id: 1,
      name: "Prof. Ramakrishnan",
      expertise: "Mathematics & Physics",
      relationship: "Family Friend",
      contact: "prof.rama@university.edu",
      availability: "Weekends",
      specialties: ["Advanced Calculus", "Quantum Physics", "Problem Solving"],
      mentoringSince: "2023-01-15",
      image: "/api/placeholder/64/64",
    },
    {
      id: 2,
      name: "Smt. Lakshmi Devi",
      expertise: "Classical Dance",
      relationship: "Grandmother's Sister",
      contact: "+91-98765-43210",
      availability: "Evenings",
      specialties: ["Bharatanatyam", "Mudras", "Classical Expressions"],
      mentoringSince: "2022-06-20",
      image: "/api/placeholder/64/64",
    },
    {
      id: 3,
      name: "Chef Venkatesh",
      expertise: "Traditional Cooking",
      relationship: "Family Chef",
      contact: "chef.venkat@gmail.com",
      availability: "Mornings",
      specialties: ["South Indian Cuisine", "Festival Foods", "Spice Blending"],
      mentoringSince: "2023-03-10",
      image: "/api/placeholder/64/64",
    },
  ];

  async function loadGoals() {
    try {
      goals = (await db.learningGoals?.toArray()) || [];
    } catch (error) {
      console.error("Error loading goals:", error);
      goals = [];
    }
  }

  async function loadSkills() {
    try {
      skills = (await db.skills?.toArray()) || [];
    } catch (error) {
      console.error("Error loading skills:", error);
      skills = [];
    }
  }

  async function addGoal() {
    if (!newGoal.title.trim()) return;

    try {
      const goal = {
        ...newGoal,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.learningGoals?.add(goal);
      goals = [...goals, goal];

      // Reset form
      newGoal = {
        title: "",
        description: "",
        category: "academic",
        priority: "medium",
        deadline: "",
        progress: 0,
        milestones: [],
      };
      showAddGoal = false;
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  async function updateGoalProgress(goalId, progress) {
    try {
      await db.learningGoals?.update(goalId, {
        progress,
        updatedAt: new Date().toISOString(),
      });
      goals = goals.map((goal) => (goal.id === goalId ? { ...goal, progress } : goal));
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  }

  async function deleteGoal(goalId) {
    try {
      await db.learningGoals?.delete(goalId);
      goals = goals.filter((goal) => goal.id !== goalId);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  function getCategoryIcon(categoryId) {
    return goalCategories.find((cat) => cat.id === categoryId)?.icon || "heroicons:academic-cap";
  }

  function getCategoryColor(categoryId) {
    return goalCategories.find((cat) => cat.id === categoryId)?.color || "text-gray-500";
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900/20";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  onMount(() => {
    document.title = "Learning Goals - Family App";
    loadGoals();
    loadSkills();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
            <Icon icon="heroicons:academic-cap" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Learning Goals</h1>
            <p class="text-gray-600 dark:text-gray-300">Shape your future with purposeful learning</p>
          </div>
        </div>
      </div>

      <!-- Learning Quote -->
      <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:light-bulb" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">विद्या ददाति विनयम् | Knowledge Gives Humility</h3>
            <p class="text-white/90">"Knowledge brings humility, humility brings worthiness, worthiness brings wealth, wealth brings righteousness, and righteousness brings happiness."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "கல்வி தரும் பணிவு, பணிவு தரும் தகுதி"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-emerald-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "goals"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">My Learning Goals</h3>
          <button class="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors" on:click={() => (showAddGoal = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>

        {#if showAddGoal}
          <div class="mb-6 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <h4 class="font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Add New Learning Goal</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Title</label>
                <input type="text" bind:value={newGoal.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What do you want to learn?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select bind:value={newGoal.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each goalCategories as category}
                    <option value={category.id}>{category.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select bind:value={newGoal.priority} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deadline</label>
                <input type="date" bind:value={newGoal.deadline} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea bind:value={newGoal.description} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe your learning goal in detail..."></textarea>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors" on:click={addGoal}> Add Goal </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddGoal = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Goals Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each goals as goal}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getCategoryIcon(goal.category)} class="w-6 h-6 {getCategoryColor(goal.category)}" />
                  <span class="px-2 py-1 text-xs font-medium rounded-full {getPriorityColor(goal.priority)}">
                    {goal.priority.toUpperCase()}
                  </span>
                </div>
                <button class="text-red-400 hover:text-red-600 transition-colors" on:click={() => deleteGoal(goal.id)}>
                  <Icon icon="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>

              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">{goal.title}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>

              <div class="mb-4">
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-emerald-500 h-2 rounded-full transition-all duration-300" style="width: {goal.progress}%"></div>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <input type="range" min="0" max="100" value={goal.progress} class="flex-1 mr-3" on:input={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))} />
                {#if goal.deadline}
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        {#if goals.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:academic-cap" class="w-16 h-16 mx-auto text-emerald-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Goals Yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Start your learning journey by setting your first goal</p>
            <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors" on:click={() => (showAddGoal = true)}> Set Your First Goal </button>
          </div>
        {/if}
      {:else if currentTab === "skills"}
        <div class="text-center py-12">
          <Icon icon="heroicons:puzzle-piece" class="w-16 h-16 mx-auto text-emerald-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Skill Tree</h3>
          <p class="text-gray-500 dark:text-gray-400">Visualize your skill development journey</p>

          <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {#each skillCategories as category}
              <div class="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-xl">
                <Icon icon={category.icon} class="w-8 h-8 mx-auto text-emerald-600 dark:text-emerald-400 mb-2" />
                <h4 class="font-medium text-sm text-emerald-800 dark:text-emerald-200">{category.label}</h4>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "knowledge"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">👨‍👩‍👧‍👦 Family Knowledge Treasury</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each familyKnowledge as knowledge}
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <Icon icon={knowledge.icon} class="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h4 class="font-bold text-amber-900 dark:text-amber-100">{knowledge.title}</h4>
                      <p class="text-sm text-amber-700 dark:text-amber-300">Keeper: {knowledge.keeper}</p>
                    </div>
                  </div>
                  <span class="px-2 py-1 text-xs font-medium bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full">
                    {knowledge.category}
                  </span>
                </div>

                <p class="text-amber-800 dark:text-amber-200 mb-4">{knowledge.description}</p>

                <div class="mb-4">
                  <h5 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Skills to Learn:</h5>
                  <div class="flex flex-wrap gap-2">
                    {#each knowledge.skills as skill}
                      <span class="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 rounded">
                        {skill}
                      </span>
                    {/each}
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <Icon icon={knowledge.documented ? "heroicons:document-check" : "heroicons:document-plus"} class="w-4 h-4 {knowledge.documented ? 'text-green-500' : 'text-red-500'}" />
                    <span class="text-xs {knowledge.documented ? 'text-green-600' : 'text-red-600'}">
                      {knowledge.documented ? "Documented" : "Needs Documentation"}
                    </span>
                  </div>
                  <span class="text-xs font-medium px-2 py-1 rounded {knowledge.importance === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}">
                    {knowledge.importance.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "mentors"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🧑‍🏫 Mentors & Guides</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each mentors as mentor}
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{mentor.name}</h4>
                    <p class="text-sm text-emerald-600 dark:text-emerald-400">{mentor.expertise}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{mentor.relationship}</p>
                  </div>
                </div>

                <div class="space-y-3">
                  <div>
                    <h5 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Specialties:</h5>
                    <div class="flex flex-wrap gap-1">
                      {#each mentor.specialties as specialty}
                        <span class="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded">
                          {specialty}
                        </span>
                      {/each}
                    </div>
                  </div>

                  <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div class="flex items-center space-x-1">
                      <Icon icon="heroicons:clock" class="w-4 h-4" />
                      <span>{mentor.availability}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <Icon icon="heroicons:calendar" class="w-4 h-4" />
                      <span>Since {new Date(mentor.mentoringSince).getFullYear()}</span>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">{mentor.contact}</span>
                      <button class="text-emerald-500 hover:text-emerald-600 transition-colors">
                        <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div class="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
              <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
              Guru-Shishya Parampara | गुरु-शिष्य परम्परा
            </h4>
            <p class="text-indigo-700 dark:text-indigo-300 mb-2">
              "गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः।<br />
              गुरुर्साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥"
            </p>
            <p class="text-sm text-indigo-600 dark:text-indigo-400">"The Guru is Brahma, Vishnu, and Maheshwara. The Guru is the Supreme Brahman. Salutations to the revered Guru."</p>
            <p class="text-xs text-indigo-500 dark:text-indigo-500 mt-2">Tamil: "குரு பிரம்மா, குரு விஷ்ணு, குரு தேவ மஹேஸ்வர"</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
