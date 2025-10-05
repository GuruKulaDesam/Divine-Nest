<script>
  import { onMount } from "svelte";
  import { getMantras, getMantrasByCategory, getFavoriteMantras, addMantra, updateMantra, deleteMantra, practiceMantra, toggleFavoriteMantra } from "../data/wellness.js";

  let mantras = [];
  let filteredMantras = [];
  let showAddForm = false;
  let editingMantra = null;
  let selectedCategory = "all";
  let searchQuery = "";
  let formData = {
    name: "",
    sanskrit: "",
    english: "",
    tamil: "",
    category: "protection",
    deity: "",
    purpose: "",
    pronunciation: "",
    benefits: [],
  };

  onMount(async () => {
    await loadMantras();
  });

  async function loadMantras() {
    mantras = await getMantras();
    filterMantras();
  }

  function filterMantras() {
    let filtered = mantras;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((mantra) => mantra.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((mantra) => mantra.name.toLowerCase().includes(query) || mantra.sanskrit.toLowerCase().includes(query) || mantra.english.toLowerCase().includes(query) || mantra.deity.toLowerCase().includes(query));
    }

    filteredMantras = filtered;
  }

  $: selectedCategory, searchQuery, mantras, filterMantras();

  function resetForm() {
    formData = {
      name: "",
      sanskrit: "",
      english: "",
      tamil: "",
      category: "protection",
      deity: "",
      purpose: "",
      pronunciation: "",
      benefits: [],
    };
    editingMantra = null;
    showAddForm = false;
  }

  function editMantra(mantra) {
    editingMantra = mantra;
    formData = {
      name: mantra.name,
      sanskrit: mantra.sanskrit,
      english: mantra.english,
      tamil: mantra.tamil || "",
      category: mantra.category,
      deity: mantra.deity,
      purpose: mantra.purpose,
      pronunciation: mantra.pronunciation,
      benefits: [...mantra.benefits],
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const mantraData = {
        name: formData.name,
        sanskrit: formData.sanskrit,
        english: formData.english,
        tamil: formData.tamil,
        category: formData.category,
        deity: formData.deity,
        purpose: formData.purpose,
        pronunciation: formData.pronunciation,
        benefits: formData.benefits.filter((b) => b.trim()),
        favorite: false,
      };

      if (editingMantra) {
        await updateMantra(editingMantra.id, mantraData);
      } else {
        await addMantra(mantraData);
      }

      await loadMantras();
      resetForm();
      dispatch("update");
    } catch (error) {
      console.error("Error saving mantra:", error);
    }
  }

  async function handleDelete(mantra) {
    if (confirm(`Are you sure you want to delete "${mantra.name}"?`)) {
      await deleteMantra(mantra.id);
      await loadMantras();
      dispatch("update");
    }
  }

  async function handlePractice(mantra) {
    await practiceMantra(mantra.id);
    await loadMantras();
    dispatch("update");
  }

  async function handleToggleFavorite(mantra) {
    await toggleFavoriteMantra(mantra.id);
    await loadMantras();
    dispatch("update");
  }

  function addBenefit() {
    formData.benefits = [...formData.benefits, ""];
  }

  function updateBenefit(index, value) {
    formData.benefits[index] = value;
  }

  function removeBenefit(index) {
    formData.benefits = formData.benefits.filter((_, i) => i !== index);
  }

  function dispatch(event) {
    // Custom event dispatcher for parent component updates
  }

  function getCategoryColor(category) {
    const colors = {
      protection: "bg-red-100 text-red-800",
      health: "bg-green-100 text-green-800",
      prosperity: "bg-yellow-100 text-yellow-800",
      peace: "bg-blue-100 text-blue-800",
      wisdom: "bg-purple-100 text-purple-800",
      devotional: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  }
</script>

<div class="space-y-6">
  <!-- Header with Add Button and Filters -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sacred Mantras</h2>
    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      {#if showAddForm}
        ✕ Cancel
      {:else}
        ➕ Add Mantra
      {/if}
    </button>
  </div>

  <!-- Filters -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Search Mantras </label>
        <input type="text" bind:value={searchQuery} placeholder="Search by name, deity, or text..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Category </label>
        <select bind:value={selectedCategory} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
          <option value="all">All Categories</option>
          <option value="protection">Protection</option>
          <option value="health">Health</option>
          <option value="prosperity">Prosperity</option>
          <option value="peace">Peace</option>
          <option value="wisdom">Wisdom</option>
          <option value="devotional">Devotional</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingMantra ? "Edit Mantra" : "Add New Mantra"}
      </h3>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Mantra Name * </label>
            <input type="text" bind:value={formData.name} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Gayatri Mantra" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Category * </label>
            <select bind:value={formData.category} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="protection">Protection</option>
              <option value="health">Health</option>
              <option value="prosperity">Prosperity</option>
              <option value="peace">Peace</option>
              <option value="wisdom">Wisdom</option>
              <option value="devotional">Devotional</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Deity </label>
            <input type="text" bind:value={formData.deity} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Lord Shiva" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Purpose </label>
            <input type="text" bind:value={formData.purpose} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Spiritual enlightenment" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Sanskrit Text * </label>
          <textarea bind:value={formData.sanskrit} required rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono" placeholder="ॐ भूर्भुवः स्वः..."></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> English Translation * </label>
          <textarea bind:value={formData.english} required rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Om. We meditate on the glory..."></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Tamil Translation </label>
          <textarea bind:value={formData.tamil} rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="ஓம் பூர்புவஸ்வ..."></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Pronunciation Guide * </label>
          <input type="text" bind:value={formData.pronunciation} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Om Bhur Bhuva Svaha..." />
        </div>

        <!-- Benefits -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Benefits </label>
          {#each formData.benefits as benefit, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={benefit} on:input={(e) => updateBenefit(index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Enhances concentration" />
              <button type="button" on:click={() => removeBenefit(index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={addBenefit} class="text-green-600 hover:text-green-700 text-sm font-medium"> + Add Benefit </button>
        </div>

        <div class="flex gap-4">
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            {editingMantra ? "Update Mantra" : "Add Mantra"}
          </button>
          <button type="button" on:click={resetForm} class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Mantras Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each filteredMantras as mantra}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {mantra.name}
              </h3>
              <span class="px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(mantra.category)}">
                {mantra.category}
              </span>
              {#if mantra.favorite}
                <span class="text-yellow-500">⭐</span>
              {/if}
            </div>
            {#if mantra.deity}
              <p class="text-sm text-green-600 dark:text-green-400 mb-1">
                🙏 {mantra.deity}
              </p>
            {/if}
            {#if mantra.purpose}
              <p class="text-sm text-gray-600 dark:text-gray-400 italic">
                "{mantra.purpose}"
              </p>
            {/if}
          </div>
          <div class="flex gap-2">
            <button on:click={() => handleToggleFavorite(mantra)} class="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900 p-2 rounded-lg" title={mantra.favorite ? "Remove from favorites" : "Add to favorites"}>
              {mantra.favorite ? "⭐" : "☆"}
            </button>
            <button on:click={() => editMantra(mantra)} class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit"> ✏️ </button>
            <button on:click={() => handleDelete(mantra)} class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete"> 🗑️ </button>
          </div>
        </div>

        <!-- Sanskrit Text -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sanskrit</h4>
          <p class="text-orange-800 dark:text-orange-200 font-mono text-sm leading-relaxed">
            {mantra.sanskrit}
          </p>
        </div>

        <!-- English Translation -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English</h4>
          <p class="text-gray-700 dark:text-gray-300 text-sm italic">
            {mantra.english}
          </p>
        </div>

        {#if mantra.tamil}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">தமிழ் (Tamil)</h4>
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              {mantra.tamil}
            </p>
          </div>
        {/if}

        <!-- Pronunciation -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pronunciation</h4>
          <p class="text-purple-800 dark:text-purple-200 text-sm font-medium">
            {mantra.pronunciation}
          </p>
        </div>

        <!-- Benefits -->
        {#if mantra.benefits && mantra.benefits.length > 0}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Benefits</h4>
            <ul class="space-y-1">
              {#each mantra.benefits.slice(0, 3) as benefit}
                <li class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span class="mr-2 text-green-500">✓</span>
                  <span>{benefit}</span>
                </li>
              {/each}
              {#if mantra.benefits.length > 3}
                <li class="text-sm text-gray-500 dark:text-gray-500">
                  +{mantra.benefits.length - 3} more benefits
                </li>
              {/if}
            </ul>
          </div>
        {/if}

        <!-- Stats and Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Practiced {mantra.usageCount} times
            {#if mantra.lastPracticed}
              <br />Last: {new Date(mantra.lastPracticed).toLocaleDateString()}
            {/if}
          </div>
          <button on:click={() => handlePractice(mantra)} class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"> Practice Now 🙏 </button>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredMantras.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🕉️</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {searchQuery || selectedCategory !== "all" ? "No Mantras Found" : "No Mantras Yet"}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {#if searchQuery || selectedCategory !== "all"}
          Try adjusting your search or filter criteria.
        {:else}
          Start building your sacred mantra collection to enhance spiritual practice.
        {/if}
      </p>
      {#if !searchQuery && selectedCategory === "all"}
        <button on:click={() => (showAddForm = true)} class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"> Add Your First Mantra </button>
      {/if}
    </div>
  {/if}
</div>
