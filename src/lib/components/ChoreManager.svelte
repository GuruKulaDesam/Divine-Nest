<script>
  import { onMount } from "svelte";
  import { db } from "$lib/data/database.js";

  let chores = [];
  let showAddForm = false;
  let filterAssignedTo = "all";
  let filterCompleted = "all";

  // Form data
  let newChore = {
    title: "",
    assignedTo: "amma",
    frequency: "daily",
  };

  const familyMembers = [
    { value: "amma", label: "Amma", icon: "👩" },
    { value: "appa", label: "Appa", icon: "👨" },
    { value: "paati", label: "Paati", icon: "👵" },
    { value: "thatta", label: "Thatta", icon: "👴" },
    { value: "children", label: "Children", icon: "👶" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  ];

  const frequencies = [
    { value: "daily", label: "Daily", color: "bg-blue-100 text-blue-800" },
    { value: "weekly", label: "Weekly", color: "bg-green-100 text-green-800" },
    { value: "monthly", label: "Monthly", color: "bg-purple-100 text-purple-800" },
  ];

  onMount(async () => {
    await loadChores();
  });

  async function loadChores() {
    chores = await db.chores.toArray();
  }

  async function handleAddChore() {
    if (!newChore.title.trim()) return;

    const chore = {
      ...newChore,
      id: Date.now().toString(),
      completed: false,
      streakCount: 0,
      lastCompleted: null,
      dueDate: new Date(),
    };

    await db.chores.add(chore);
    await loadChores();

    // Reset form
    newChore = { title: "", assignedTo: "amma", frequency: "daily" };
    showAddForm = false;
  }

  async function toggleChoreCompletion(chore) {
    const now = new Date();
    const completed = !chore.completed;

    let streakCount = chore.streakCount;
    if (completed) {
      streakCount += 1;
    } else {
      streakCount = Math.max(0, streakCount - 1);
    }

    await db.chores.update(chore.id, {
      completed,
      lastCompleted: completed ? now : chore.lastCompleted,
      streakCount,
    });

    await loadChores();
  }

  async function removeChore(chore) {
    if (confirm(`Remove "${chore.title}" chore?`)) {
      await db.chores.delete(chore.id);
      await loadChores();
    }
  }

  $: filteredChores = chores.filter((chore) => {
    const matchesAssignee = filterAssignedTo === "all" || chore.assignedTo === filterAssignedTo;
    const matchesCompletion = filterCompleted === "all" || (filterCompleted === "completed" && chore.completed) || (filterCompleted === "pending" && !chore.completed);
    return matchesAssignee && matchesCompletion;
  });

  $: todaysChores = filteredChores.filter((chore) => {
    if (chore.frequency === "daily") return true;
    if (chore.frequency === "weekly") return new Date().getDay() === chore.dueDate.getDay();
    if (chore.frequency === "monthly") return new Date().getDate() === chore.dueDate.getDate();
    return true;
  });

  $: completedCount = todaysChores.filter((chore) => chore.completed).length;
  $: totalCount = todaysChores.length;
</script>

<div class="space-y-6">
  <!-- Header with Stats -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">🧹 Chores & Family Flow</h2>
      <p class="text-gray-600">Track daily tasks and maintain family harmony</p>
    </div>

    <div class="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
      <div class="text-sm text-green-800">
        Today's Progress: <span class="font-bold">{completedCount}/{totalCount}</span> chores completed
      </div>
    </div>
  </div>

  <!-- Filters and Add Button -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex gap-2">
      <select bind:value={filterAssignedTo} class="px-3 py-2 border border-gray-300 rounded-lg">
        <option value="all">All Family Members</option>
        {#each familyMembers as member}
          <option value={member.value}>{member.icon} {member.label}</option>
        {/each}
      </select>

      <select bind:value={filterCompleted} class="px-3 py-2 border border-gray-300 rounded-lg">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <span>+</span>
      Add Chore
    </button>
  </div>

  <!-- Add Chore Form -->
  {#if showAddForm}
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h3 class="font-semibold text-orange-800 mb-3">Add New Family Chore</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Chore title" bind:value={newChore.title} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <select bind:value={newChore.assignedTo} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each familyMembers as member}
            <option value={member.value}>{member.icon} {member.label}</option>
          {/each}
        </select>

        <select bind:value={newChore.frequency} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each frequencies as freq}
            <option value={freq.value}>{freq.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={handleAddChore}> Add Chore </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={() => (showAddForm = false)}> Cancel </button>
      </div>
    </div>
  {/if}

  <!-- Today's Chores -->
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h3 class="font-semibold text-blue-800 mb-4 flex items-center gap-2">
      <span>📅</span>
      Today's Chores
    </h3>

    {#if todaysChores.length === 0}
      <p class="text-blue-600">No chores scheduled for today. Add some family tasks!</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each todaysChores as chore}
          <div class="bg-white border border-blue-200 rounded-lg p-4 {chore.completed ? 'opacity-75' : ''}">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <input type="checkbox" checked={chore.completed} on:change={() => toggleChoreCompletion(chore)} class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />

                <div>
                  <h4 class="font-semibold text-gray-800 {chore.completed ? 'line-through text-gray-500' : ''}">
                    {chore.title}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-sm text-gray-600">
                      {familyMembers.find((m) => m.value === chore.assignedTo)?.icon}
                      {familyMembers.find((m) => m.value === chore.assignedTo)?.label}
                    </span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium {frequencies.find((f) => f.value === chore.frequency)?.color}">
                      {frequencies.find((f) => f.value === chore.frequency)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <button class="text-red-500 hover:text-red-700 p-1" on:click={() => removeChore(chore)}> 🗑️ </button>
            </div>

            {#if chore.streakCount > 0}
              <div class="flex items-center gap-1 text-sm text-orange-600">
                <span>🔥</span>
                <span>{chore.streakCount} day streak</span>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- All Chores List -->
  <div>
    <h3 class="font-semibold text-gray-800 mb-4">All Family Chores</h3>

    {#if filteredChores.length === 0}
      <div class="text-center py-12 text-gray-500">
        <div class="text-4xl mb-4">🧹</div>
        <p class="text-lg">No chores found</p>
        <p class="text-sm">Add your first family chore to get started!</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredChores as chore}
          <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-semibold text-gray-800">{chore.title}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm text-gray-600">
                    {familyMembers.find((m) => m.value === chore.assignedTo)?.icon}
                    {familyMembers.find((m) => m.value === chore.assignedTo)?.label}
                  </span>
                </div>
              </div>

              <div class="flex gap-1">
                <button class="text-green-500 hover:text-green-700 p-1" on:click={() => toggleChoreCompletion(chore)} title={chore.completed ? "Mark as pending" : "Mark as completed"}>
                  {chore.completed ? "✅" : "⭕"}
                </button>
                <button class="text-red-500 hover:text-red-700 p-1" on:click={() => removeChore(chore)}> 🗑️ </button>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Frequency:</span>
                <span class="px-2 py-1 rounded-full text-xs font-medium {frequencies.find((f) => f.value === chore.frequency)?.color}">
                  {frequencies.find((f) => f.value === chore.frequency)?.label}
                </span>
              </div>

              {#if chore.streakCount > 0}
                <div class="flex items-center gap-1 text-sm text-orange-600">
                  <span>🔥</span>
                  <span>{chore.streakCount} day streak</span>
                </div>
              {/if}

              {#if chore.lastCompleted}
                <div class="text-xs text-gray-500">
                  Last completed: {chore.lastCompleted.toLocaleDateString()}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
