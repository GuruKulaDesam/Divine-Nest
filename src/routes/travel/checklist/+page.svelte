<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Trip Checklist";
  const pageDescription = "Comprehensive checklists for one-way and two-way trips with family planning";

  // Trip checklist templates
  const tripTemplates = {
    oneWay: {
      name: "One-Way Trip",
      description: "Checklist for trips where you're not returning the same way",
      icon: "heroicons:arrow-right",
      color: "from-blue-500 to-blue-600",
      categories: [
        {
          name: "Documents & IDs",
          items: [
            { id: "aadhar", text: "Aadhar Card / ID Proof", required: true },
            { id: "tickets", text: "Bus/Train/Plane Tickets", required: true },
            { id: "hotel", text: "Hotel Booking Confirmation", required: false },
            { id: "cash", text: "Cash & Cards", required: true },
            { id: "insurance", text: "Travel Insurance", required: false },
          ],
        },
        {
          name: "Clothing & Personal",
          items: [
            { id: "clothes", text: "Clothes for destination weather", required: true },
            { id: "toiletries", text: "Toiletries & Medicines", required: true },
            { id: "jewelry", text: "Valuable jewelry (if needed)", required: false },
            { id: "electronics", text: "Phone, Charger, Power Bank", required: true },
          ],
        },
        {
          name: "Food & Supplies",
          items: [
            { id: "water", text: "Water bottles", required: true },
            { id: "snacks", text: "Snacks for journey", required: true },
            { id: "tiffin", text: "Home-cooked food", required: false },
            { id: "utensils", text: "Reusable utensils", required: false },
          ],
        },
        {
          name: "Temple & Religious",
          items: [
            { id: "pooja", text: "Pooja items for temple visit", required: false },
            { id: "prasad", text: "Prasad containers", required: false },
            { id: "clothes", text: "Traditional clothing", required: false },
          ],
        },
      ],
    },
    twoWay: {
      name: "Two-Way Trip",
      description: "Checklist for round trips with return journey planning",
      icon: "heroicons:arrow-path",
      color: "from-green-500 to-green-600",
      categories: [
        {
          name: "Outbound Journey",
          items: [
            { id: "outward_tickets", text: "Outbound tickets confirmed", required: true },
            { id: "outward_documents", text: "Outbound documents ready", required: true },
            { id: "outward_contact", text: "Emergency contact for outward journey", required: true },
          ],
        },
        {
          name: "Return Journey",
          items: [
            { id: "return_tickets", text: "Return tickets confirmed", required: true },
            { id: "return_documents", text: "Return documents ready", required: true },
            { id: "return_contact", text: "Emergency contact for return journey", required: true },
          ],
        },
        {
          name: "Stay Arrangements",
          items: [
            { id: "accommodation", text: "Hotel/stay booking confirmed", required: false },
            { id: "checkin_details", text: "Check-in/check-out details noted", required: false },
            { id: "local_transport", text: "Local transport arranged", required: false },
          ],
        },
        {
          name: "Family Coordination",
          items: [
            { id: "family_schedule", text: "Family members' schedules aligned", required: true },
            { id: "pickup_drop", text: "Pickup/drop arrangements made", required: true },
            { id: "communication", text: "Communication plan during trip", required: true },
          ],
        },
        {
          name: "Health & Safety",
          items: [
            { id: "medicines", text: "Medicines for all family members", required: true },
            { id: "first_aid", text: "First aid kit", required: true },
            { id: "emergency_numbers", text: "Local emergency numbers saved", required: true },
          ],
        },
      ],
    },
  };

  // State
  let selectedTemplate: "oneWay" | "twoWay" = "oneWay";
  let checklists: Record<string, Record<string, boolean>> = {};
  let customItems: Record<string, string[]> = {};
  let tripNotes = "";

  // Initialize checklists
  function initializeChecklist(template: "oneWay" | "twoWay") {
    const templateData = tripTemplates[template];
    checklists[template] = {};

    templateData.categories.forEach((category) => {
      category.items.forEach((item) => {
        checklists[template][item.id] = false;
      });
    });

    if (!customItems[template]) {
      customItems[template] = [];
    }
  }

  // Toggle checklist item
  function toggleItem(template: string, itemId: string) {
    checklists[template][itemId] = !checklists[template][itemId];
    checklists = { ...checklists }; // Trigger reactivity
  }

  // Add custom item
  function addCustomItem(template: string) {
    if (!customItems[template]) {
      customItems[template] = [];
    }
    customItems[template] = [...customItems[template], ""];
    customItems = { ...customItems };
  }

  // Update custom item
  function updateCustomItem(template: string, index: number, value: string) {
    customItems[template][index] = value;
    customItems = { ...customItems };
  }

  // Remove custom item
  function removeCustomItem(template: string, index: number) {
    customItems[template].splice(index, 1);
    customItems = { ...customItems };
  }

  // Calculate completion percentage
  $: completionPercentage = (template) => {
    const templateData = tripTemplates[template];
    const checklist = checklists[template] || {};
    const totalItems = templateData.categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = Object.values(checklist).filter(Boolean).length;
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Get required items completion
  $: requiredCompletion = (template) => {
    const templateData = tripTemplates[template];
    const checklist = checklists[template] || {};
    const requiredItems = templateData.categories.flatMap((cat) => cat.items.filter((item) => item.required));
    const completedRequired = requiredItems.filter((item) => checklist[item.id]).length;
    return `${completedRequired}/${requiredItems.length}`;
  };

  // Initialize on mount
  onMount(() => {
    initializeChecklist("oneWay");
    initializeChecklist("twoWay");
  });

  // Handle template change
  function changeTemplate(template: "oneWay" | "twoWay") {
    selectedTemplate = template;
    if (!checklists[template]) {
      initializeChecklist(template);
    }
  }
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-cyan-900 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
          <Icon icon="heroicons:clipboard-document-check" class="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Template Selector -->
      <div class="flex gap-4 mb-6">
        {#each Object.entries(tripTemplates) as [key, template]}
          <button on:click={() => changeTemplate(key as "oneWay" | "twoWay")} class="flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all {selectedTemplate === key ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' : 'border-gray-200 dark:border-slate-600 hover:border-cyan-300'}">
            <div class="p-2 rounded-lg" style="background: linear-gradient({template.color})">
              <Icon icon={template.icon} class="w-5 h-5 text-white" />
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
            </div>
          </button>
        {/each}
      </div>

      <!-- Progress Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Completion</p>
              <p class="text-2xl font-bold text-blue-600">{completionPercentage(selectedTemplate)}%</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-orange-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Required Items</p>
              <p class="text-2xl font-bold text-orange-600">{requiredCompletion(selectedTemplate)}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p class="text-lg font-bold text-green-600">
                {completionPercentage(selectedTemplate) === 100 ? "Ready" : "In Progress"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Checklist Content -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6" use:motionInView>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {tripTemplates[selectedTemplate].name} Checklist
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {tripTemplates[selectedTemplate].description}
        </p>
      </div>

      <!-- Checklist Categories -->
      <div class="space-y-6">
        {#each tripTemplates[selectedTemplate].categories as category}
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon icon="heroicons:folder" class="w-5 h-5 text-cyan-600" />
              {category.name}
            </h3>

            <div class="space-y-3">
              {#each category.items as item}
                <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                  <input type="checkbox" bind:checked={checklists[selectedTemplate][item.id]} on:change={() => toggleItem(selectedTemplate, item.id)} class="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <span class="text-gray-900 dark:text-white {item.required ? 'font-medium' : ''}">
                    {item.text}
                    {#if item.required}
                      <span class="text-red-500 ml-1">*</span>
                    {/if}
                  </span>
                </label>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Custom Items Section -->
      <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Custom Items</h3>
          <button on:click={() => addCustomItem(selectedTemplate)} class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div class="space-y-3">
          {#each customItems[selectedTemplate] || [] as item, index}
            <div class="flex items-center gap-3">
              <input type="text" bind:value={item} on:input={(e) => updateCustomItem(selectedTemplate, index, (e.target as HTMLInputElement).value)} placeholder="Enter custom item..." class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
              <button on:click={() => removeCustomItem(selectedTemplate, index)} class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                <Icon icon="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Trip Notes -->
      <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trip Notes</h3>
        <textarea bind:value={tripNotes} placeholder="Add any special notes, reminders, or important information for this trip..." rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"></textarea>
      </div>

      <!-- Completion Message -->
      {#if completionPercentage(selectedTemplate) === 100}
        <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
            <div>
              <h4 class="font-semibold text-green-800 dark:text-green-200">Trip Ready!</h4>
              <p class="text-green-700 dark:text-green-300">All checklist items are completed. Safe travels!</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
