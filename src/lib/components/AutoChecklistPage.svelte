<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";

  // Checklist data
  let checklists = [
    {
      id: 1,
      title: "காலை ரூட்டின்",
      description: "காலை நேர செயல்கள்",
      trigger: "morning",
      items: [
        { id: 1, text: "விழித்தெழு", completed: true, autoComplete: true },
        { id: 2, text: "பற்களை துலக்கு", completed: true, autoComplete: false },
        { id: 3, text: "முகம் கழுவு", completed: false, autoComplete: false },
        { id: 4, text: "உணவு சாப்பிடு", completed: false, autoComplete: false },
        { id: 5, text: "பள்ளிக்கு செல்", completed: false, autoComplete: false },
      ],
      progress: 40,
      active: true,
    },
    {
      id: 2,
      title: "மாலை ரூட்டின்",
      description: "மாலை நேர செயல்கள்",
      trigger: "evening",
      items: [
        { id: 1, text: "வீடு திரும்பு", completed: false, autoComplete: true },
        { id: 2, text: "கை கால்களை கழுவு", completed: false, autoComplete: false },
        { id: 3, text: "வீடு பாடம் செய்", completed: false, autoComplete: false },
        { id: 4, text: "இரவு உணவு சாப்பிடு", completed: false, autoComplete: false },
        { id: 5, text: "தூங்க செல்", completed: false, autoComplete: false },
      ],
      progress: 0,
      active: false,
    },
    {
      id: 3,
      title: "சமையல் பொருட்கள்",
      description: "பொங்கல் சமையலுக்கு தேவையான பொருட்கள்",
      trigger: "shopping",
      items: [
        { id: 1, text: "அரிசி வாங்கு", completed: true, autoComplete: false },
        { id: 2, text: "பால் வாங்கு", completed: false, autoComplete: false },
        { id: 3, text: "வெல்லம் வாங்கு", completed: false, autoComplete: false },
        { id: 4, text: "கொட்டை வாங்கு", completed: false, autoComplete: false },
        { id: 5, text: "தேங்காய் வாங்கு", completed: false, autoComplete: false },
      ],
      progress: 20,
      active: true,
    },
  ];

  let filteredChecklists = checklists;
  let searchQuery = "";
  let selectedTrigger = "";
  let showAddChecklist = false;
  let newChecklist = {
    title: "",
    description: "",
    trigger: "custom",
    items: [],
  };

  // Filter checklists
  $: filteredChecklists = checklists.filter((checklist) => {
    const matchesSearch = checklist.title.toLowerCase().includes(searchQuery.toLowerCase()) || checklist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrigger = !selectedTrigger || checklist.trigger === selectedTrigger;
    return matchesSearch && matchesTrigger;
  });

  // Tamil labels
  const taLabels = {
    autoChecklist: "தானியங்கு சரிபார்ப்பு பட்டியல்",
    addChecklist: "பட்டியல் சேர்",
    search: "தேடு",
    filterTrigger: "தூண்டுதல் வடிகட்டி",
    all: "அனைத்தும்",
    morning: "காலை",
    evening: "மாலை",
    shopping: "கடை",
    custom: "தனிப்பயன்",
    title: "தலைப்பு",
    description: "விளக்கம்",
    trigger: "தூண்டுதல்",
    items: "பொருட்கள்",
    save: "சேமி",
    cancel: "ரத்து செய்",
    noChecklists: "பட்டியல்கள் இல்லை",
    markComplete: "முடிந்ததாக குறி",
    progress: "முன்னேற்றம்",
    active: "செயலில்",
    inactive: "செயலற்ற",
  };

  // Trigger colors
  const triggerColors = {
    morning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    evening: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    shopping: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    custom: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  // Toggle item completion
  function toggleItem(checklistId, itemId) {
    checklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item));
        const completedCount = updatedItems.filter((item) => item.completed).length;
        const progress = Math.round((completedCount / updatedItems.length) * 100);
        return { ...checklist, items: updatedItems, progress };
      }
      return checklist;
    });
  }

  // Add new checklist
  function addChecklist() {
    if (newChecklist.title.trim()) {
      const checklist = {
        id: Date.now(),
        ...newChecklist,
        items: newChecklist.items.map((text, index) => ({
          id: index + 1,
          text,
          completed: false,
          autoComplete: false,
        })),
        progress: 0,
        active: true,
      };
      checklists = [...checklists, checklist];
      newChecklist = {
        title: "",
        description: "",
        trigger: "custom",
        items: [],
      };
      showAddChecklist = false;
    }
  }

  // Simulate auto-completion based on context
  function simulateAutoComplete() {
    // Simulate BLE proximity or voice triggers
    const morningChecklist = checklists.find((c) => c.trigger === "morning");
    if (morningChecklist && !morningChecklist.items[0].completed) {
      setTimeout(() => {
        toggleItem(morningChecklist.id, 1);
      }, 2000); // Simulate wake-up detection
    }
  }

  onMount(() => {
    // Load checklists from localStorage or API
    const savedChecklists = localStorage.getItem("checklists");
    if (savedChecklists) {
      checklists = JSON.parse(savedChecklists);
      filteredChecklists = checklists;
    }

    // Start auto-completion simulation
    simulateAutoComplete();
  });

  // Save checklists when they change
  $: if (checklists) {
    localStorage.setItem("checklists", JSON.stringify(checklists));
  }
</script>

<svelte:head>
  <title>✅ Auto Checklist - Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:clipboard-document-check" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {taLabels.autoChecklist}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Context-aware automated checklists</p>
          </div>
        </div>

        <button class="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-colors shadow-lg" on:click={() => (showAddChecklist = true)} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2 inline" />
          {taLabels.addChecklist}
        </button>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.search}</span>
          </label>
          <input type="text" bind:value={searchQuery} placeholder="பட்டியல்களை தேடு..." class="input input-bordered w-full" />
        </div>

        <!-- Trigger Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterTrigger}</span>
          </label>
          <select bind:value={selectedTrigger} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="morning">{taLabels.morning}</option>
            <option value="evening">{taLabels.evening}</option>
            <option value="shopping">{taLabels.shopping}</option>
            <option value="custom">{taLabels.custom}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Checklists Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each filteredChecklists as checklist, index}
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300" use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <!-- Checklist Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {checklist.title}
                </h3>
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${triggerColors[checklist.trigger]}`}>
                  {checklist.trigger === "morning" ? taLabels.morning : checklist.trigger === "evening" ? taLabels.evening : checklist.trigger === "shopping" ? taLabels.shopping : taLabels.custom}
                </span>
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${checklist.active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
                  {checklist.active ? taLabels.active : taLabels.inactive}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {checklist.description}
              </p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{taLabels.progress}</span>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{checklist.progress}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" style="width: {checklist.progress}%"></div>
            </div>
          </div>

          <!-- Checklist Items -->
          <div class="space-y-3">
            {#each checklist.items as item}
              <div class="flex items-center space-x-3">
                <input type="checkbox" bind:checked={item.completed} on:change={() => toggleItem(checklist.id, item.id)} class="checkbox checkbox-primary" disabled={item.autoComplete} />
                <span class={`flex-1 text-sm ${item.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}>
                  {item.text}
                  {#if item.autoComplete}
                    <Icon icon="heroicons:bolt" class="w-4 h-4 inline ml-2 text-yellow-500" title="Auto-completed" />
                  {/if}
                </span>
              </div>
            {/each}
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {checklist.items.filter((i) => i.completed).length} / {checklist.items.length} completed
            </div>
            <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"> Edit </button>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredChecklists.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:clipboard-document-check" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{taLabels.noChecklists}</h3>
        <p class="text-gray-500 dark:text-gray-400">Create automated checklists for daily routines!</p>
      </div>
    {/if}
  </div>

  <!-- Add Checklist Modal -->
  {#if showAddChecklist}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{taLabels.addChecklist}</h3>

        <div class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.title}</span>
            </label>
            <input type="text" bind:value={newChecklist.title} placeholder="பட்டியலின் தலைப்பு..." class="input input-bordered w-full" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.description}</span>
            </label>
            <textarea bind:value={newChecklist.description} placeholder="பட்டியலின் விளக்கம்..." class="textarea textarea-bordered w-full" rows="2"></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.trigger}</span>
            </label>
            <select bind:value={newChecklist.trigger} class="select select-bordered w-full">
              <option value="morning">{taLabels.morning}</option>
              <option value="evening">{taLabels.evening}</option>
              <option value="shopping">{taLabels.shopping}</option>
              <option value="custom">{taLabels.custom}</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.items} (one per line)</span>
            </label>
            <textarea bind:value={newChecklist.itemsText} placeholder="பொருள் 1&#10;பொருள் 2&#10;பொருள் 3" class="textarea textarea-bordered w-full" rows="4" on:input={(e) => (newChecklist.items = e.target.value.split("\n").filter((item) => item.trim()))}></textarea>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button class="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-colors" on:click={addChecklist}>
            {taLabels.save}
          </button>
          <button class="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors" on:click={() => (showAddChecklist = false)}>
            {taLabels.cancel}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
