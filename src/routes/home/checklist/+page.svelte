<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Monthly Family Checklist";
  const pageDescription = "Role-based monthly planning and checklist for family coordination";

  // Family roles and their monthly responsibilities
  const familyRoles = {
    father: {
      name: "Father",
      icon: "heroicons:user",
      color: "from-blue-500 to-blue-600",
      responsibilities: [
        {
          category: "Financial Planning",
          items: [
            { id: "budget_review", text: "Review monthly budget and expenses", required: true },
            { id: "savings_check", text: "Check savings and investment status", required: true },
            { id: "bills_payment", text: "Ensure all bills are paid on time", required: true },
            { id: "insurance_premium", text: "Pay insurance premiums", required: false },
          ],
        },
        {
          category: "Home Maintenance",
          items: [
            { id: "home_repairs", text: "Schedule any needed home repairs", required: false },
            { id: "vehicle_service", text: "Schedule vehicle maintenance/service", required: false },
            { id: "pest_control", text: "Arrange pest control if needed", required: false },
          ],
        },
        {
          category: "Family Coordination",
          items: [
            { id: "family_meeting", text: "Conduct monthly family meeting", required: true },
            { id: "school_fees", text: "Pay children's school fees", required: true },
            { id: "medical_checkup", text: "Schedule family medical checkups", required: false },
          ],
        },
      ],
    },
    mother: {
      name: "Mother",
      icon: "heroicons:user",
      color: "from-pink-500 to-pink-600",
      responsibilities: [
        {
          category: "Kitchen & Grocery",
          items: [
            { id: "monthly_grocery", text: "Plan and purchase monthly groceries", required: true },
            { id: "pantry_inventory", text: "Take pantry inventory", required: true },
            { id: "meal_planning", text: "Plan monthly meal schedule", required: true },
            { id: "cooking_fuel", text: "Check cooking fuel levels", required: true },
          ],
        },
        {
          category: "Health & Wellness",
          items: [
            { id: "medicine_stock", text: "Check medicine stock and expiry", required: true },
            { id: "health_appointments", text: "Schedule health appointments", required: false },
            { id: "wellness_routine", text: "Plan family wellness activities", required: false },
          ],
        },
        {
          category: "Children Care",
          items: [
            { id: "school_supplies", text: "Check children's school supplies", required: true },
            { id: "study_schedule", text: "Review children's study schedules", required: true },
            { id: "extracurricular", text: "Plan extracurricular activities", required: false },
          ],
        },
      ],
    },
    children: {
      name: "Children",
      icon: "heroicons:users",
      color: "from-green-500 to-green-600",
      responsibilities: [
        {
          category: "Personal Responsibility",
          items: [
            { id: "room_clean", text: "Keep room clean and organized", required: true },
            { id: "study_time", text: "Maintain regular study schedule", required: true },
            { id: "homework_complete", text: "Complete all homework on time", required: true },
          ],
        },
        {
          category: "Family Contribution",
          items: [
            { id: "help_kitchen", text: "Help in kitchen activities", required: false },
            { id: "respect_elders", text: "Show respect to elders", required: true },
            { id: "family_activities", text: "Participate in family activities", required: true },
          ],
        },
        {
          category: "Personal Growth",
          items: [
            { id: "read_books", text: "Read books regularly", required: false },
            { id: "learn_skill", text: "Learn new skill or hobby", required: false },
            { id: "exercise", text: "Maintain physical exercise routine", required: false },
          ],
        },
      ],
    },
    grandparents: {
      name: "Grandparents",
      icon: "heroicons:user-group",
      color: "from-purple-500 to-purple-600",
      responsibilities: [
        {
          category: "Spiritual Guidance",
          items: [
            { id: "morning_prayer", text: "Lead morning prayers and pooja", required: false },
            { id: "temple_visit", text: "Plan temple visits", required: false },
            { id: "religious_teachings", text: "Share religious teachings", required: false },
          ],
        },
        {
          category: "Family Wisdom",
          items: [
            { id: "story_telling", text: "Share family stories and traditions", required: false },
            { id: "advice_sharing", text: "Provide guidance and advice", required: false },
            { id: "cultural_teaching", text: "Teach cultural values and practices", required: false },
          ],
        },
        {
          category: "Health Monitoring",
          items: [
            { id: "health_check", text: "Monitor family health", required: false },
            { id: "traditional_remedies", text: "Share traditional remedies", required: false },
          ],
        },
      ],
    },
  };

  // State
  let selectedRole: keyof typeof familyRoles = "father";
  let checklists: Record<string, Record<string, boolean>> = {};
  let customItems: Record<string, Record<string, string[]>> = {};
  let monthlyNotes = "";
  let currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  // Initialize checklists for all roles
  function initializeChecklists() {
    Object.keys(familyRoles).forEach((role) => {
      checklists[role] = {};
      customItems[role] = {};

      familyRoles[role as keyof typeof familyRoles].responsibilities.forEach((category) => {
        customItems[role][category.category] = [];
        category.items.forEach((item) => {
          checklists[role][item.id] = false;
        });
      });
    });
  }

  // Toggle checklist item
  function toggleItem(role: string, itemId: string) {
    checklists[role][itemId] = !checklists[role][itemId];
    checklists = { ...checklists };
  }

  // Add custom item
  function addCustomItem(role: string, category: string) {
    if (!customItems[role][category]) {
      customItems[role][category] = [];
    }
    customItems[role][category] = [...customItems[role][category], ""];
    customItems = { ...customItems };
  }

  // Update custom item
  function updateCustomItem(role: string, category: string, index: number, value: string) {
    customItems[role][category][index] = value;
    customItems = { ...customItems };
  }

  // Remove custom item
  function removeCustomItem(role: string, category: string, index: number) {
    customItems[role][category].splice(index, 1);
    customItems = { ...customItems };
  }

  // Calculate completion percentage for role
  $: completionPercentage = (role: string) => {
    const roleData = familyRoles[role as keyof typeof familyRoles];
    const checklist = checklists[role] || {};
    const totalItems = roleData.responsibilities.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = Object.values(checklist).filter(Boolean).length;
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Get required items completion for role
  $: requiredCompletion = (role: string) => {
    const roleData = familyRoles[role as keyof typeof familyRoles];
    const checklist = checklists[role] || {};
    const requiredItems = roleData.responsibilities.flatMap((cat) => cat.items.filter((item) => item.required));
    const completedRequired = requiredItems.filter((item) => checklist[item.id]).length;
    return `${completedRequired}/${requiredItems.length}`;
  };

  // Overall family completion
  $: overallCompletion = () => {
    const roles = Object.keys(familyRoles);
    const totalPercentage = roles.reduce((sum, role) => sum + completionPercentage(role), 0);
    return Math.round(totalPercentage / roles.length);
  };

  // Initialize on mount
  onMount(() => {
    initializeChecklists();
  });
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Planning for: <span class="font-semibold">{currentMonth}</span></p>
        </div>
      </div>

      <!-- Overall Progress -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Family Progress</h3>
            <p class="text-gray-600 dark:text-gray-300">Overall completion across all family roles</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-blue-600">{overallCompletion()}%</div>
            <div class="w-32 bg-gray-200 dark:bg-slate-600 rounded-full h-2 mt-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {overallCompletion()}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Role Selector -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {#each Object.entries(familyRoles) as [key, role]}
          <button on:click={() => (selectedRole = key as keyof typeof familyRoles)} class="p-4 rounded-xl border-2 transition-all {selectedRole === key ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-slate-600 hover:border-blue-300'}">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg" style="background: linear-gradient({role.color})">
                <Icon icon={role.icon} class="w-5 h-5 text-white" />
              </div>
              <div class="text-left">
                <h4 class="font-semibold text-gray-900 dark:text-white">{role.name}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">{completionPercentage(key)}% complete</p>
                <p class="text-xs text-orange-600 dark:text-orange-400">Required: {requiredCompletion(key)}</p>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Role Checklist Content -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6" use:motionInView>
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-2 rounded-lg" style="background: linear-gradient({familyRoles[selectedRole].color})">
            <Icon icon={familyRoles[selectedRole].icon} class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {familyRoles[selectedRole].name} Responsibilities
          </h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          Monthly checklist for {familyRoles[selectedRole].name.toLowerCase()} role in family planning
        </p>
      </div>

      <!-- Checklist Categories -->
      <div class="space-y-6">
        {#each familyRoles[selectedRole].responsibilities as category}
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Icon icon="heroicons:folder" class="w-5 h-5 text-blue-600" />
              {category.category}
            </h3>

            <div class="space-y-3">
              {#each category.items as item}
                <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                  <input type="checkbox" bind:checked={checklists[selectedRole][item.id]} on:change={() => toggleItem(selectedRole, item.id)} class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <span class="text-gray-900 dark:text-white {item.required ? 'font-medium' : ''}">
                    {item.text}
                    {#if item.required}
                      <span class="text-red-500 ml-1">*</span>
                    {/if}
                  </span>
                </label>
              {/each}
            </div>

            <!-- Custom Items for Category -->
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Items</h4>
                <button on:click={() => addCustomItem(selectedRole, category.category)} class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"> Add Item </button>
              </div>

              <div class="space-y-2">
                {#each customItems[selectedRole][category.category] || [] as item, index}
                  <div class="flex items-center gap-2">
                    <input type="text" bind:value={item} on:input={(e) => updateCustomItem(selectedRole, category.category, index, (e.target as HTMLInputElement).value)} placeholder="Enter additional item..." class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                    <button on:click={() => removeCustomItem(selectedRole, category.category, index)} class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Monthly Notes -->
      <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Notes & Goals</h3>
        <textarea bind:value={monthlyNotes} placeholder="Add notes, goals, or important reminders for this month..." rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"></textarea>
      </div>

      <!-- Completion Status -->
      {#if completionPercentage(selectedRole) === 100}
        <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
            <div>
              <h4 class="font-semibold text-green-800 dark:text-green-200">Role Complete!</h4>
              <p class="text-green-700 dark:text-green-300">All {familyRoles[selectedRole].name.toLowerCase()} responsibilities are completed for this month.</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
