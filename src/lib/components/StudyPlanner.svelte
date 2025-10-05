<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import { getStudyPlans, addStudyPlan, updateStudyPlan, deleteStudyPlan, markChapterComplete } from "../data/education.js";

  const dispatch = createEventDispatcher();

  let plans = [];
  let showAddForm = false;
  let editingPlan = null;
  let formData = {
    subject: "",
    chapters: "",
    dueDate: "",
  };

  // Load plans on mount
  async function loadPlans() {
    try {
      plans = await getStudyPlans();
    } catch (error) {
      console.error("Error loading study plans:", error);
    }
  }

  // Initialize
  loadPlans();

  function resetForm() {
    formData = {
      subject: "",
      chapters: "",
      dueDate: "",
    };
    editingPlan = null;
    showAddForm = false;
  }

  function startEdit(plan) {
    editingPlan = plan;
    formData = {
      subject: plan.subject,
      chapters: plan.chapters.join(", "),
      dueDate: plan.dueDate.toISOString().split("T")[0],
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const chapters = formData.chapters
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);
      const planData = {
        subject: formData.subject,
        chapters,
        dueDate: new Date(formData.dueDate),
      };

      if (editingPlan) {
        await updateStudyPlan(editingPlan.id, planData);
      } else {
        await addStudyPlan(planData);
      }

      resetForm();
      await loadPlans();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error saving study plan:", error);
    }
  }

  async function handleDelete(planId) {
    if (confirm("Are you sure you want to delete this study plan?")) {
      try {
        await deleteStudyPlan(planId);
        await loadPlans();
        dispatch("dataChanged");
      } catch (error) {
        console.error("Error deleting study plan:", error);
      }
    }
  }

  async function toggleChapter(planId, chapter) {
    try {
      const plan = plans.find((p) => p.id === planId);
      if (!plan) return;

      const isCompleted = plan.completedChapters.includes(chapter);
      if (isCompleted) {
        // Remove from completed
        const updatedChapters = plan.completedChapters.filter((c) => c !== chapter);
        await updateStudyPlan(planId, { completedChapters: updatedChapters });
      } else {
        // Add to completed
        await markChapterComplete(planId, chapter);
      }

      await loadPlans();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error updating chapter status:", error);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getDaysUntil(date) {
    const today = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function getDueDateColor(date) {
    const days = getDaysUntil(date);
    if (days < 0) return "text-red-600";
    if (days <= 7) return "text-orange-600";
    return "text-green-600";
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
      <Icon icon="heroicons:clipboard-document-list" class="text-blue-500" />
      Study Plans & Progress Tracking
    </h2>
    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <Icon icon="heroicons:plus" class="text-lg" />
      {showAddForm ? "Cancel" : "Add Plan"}
    </button>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200" in:fade>
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {editingPlan ? "Edit Study Plan" : "Create New Study Plan"}
      </h3>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input type="text" bind:value={formData.subject} placeholder="e.g., Mathematics, Science" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input type="date" bind:value={formData.dueDate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Chapters (comma-separated) </label>
          <textarea bind:value={formData.chapters} placeholder="e.g., Algebra, Geometry, Trigonometry" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            {editingPlan ? "Update Plan" : "Create Plan"}
          </button>
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={resetForm}> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Study Plans List -->
  <div class="space-y-4">
    {#each plans as plan}
      <div class="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{plan.subject}</h3>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:calendar" class="text-gray-400" />
                Due: <span class={getDueDateColor(plan.dueDate)}>{formatDate(plan.dueDate)}</span>
              </span>
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:clock" class="text-gray-400" />
                {getDaysUntil(plan.dueDate) > 0 ? `${getDaysUntil(plan.dueDate)} days left` : "Overdue"}
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200" on:click={() => startEdit(plan)}>
              <Icon icon="heroicons:pencil" class="text-lg" />
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" on:click={() => handleDelete(plan.id)}>
              <Icon icon="heroicons:trash" class="text-lg" />
            </button>
          </div>
        </div>

        <!-- Progress -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-600">Progress</span>
            <span class="font-medium">{plan.completedChapters.length}/{plan.chapters.length} chapters</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div class="bg-blue-500 h-3 rounded-full transition-all duration-300" style="width: {(plan.completedChapters.length / plan.chapters.length) * 100}%"></div>
          </div>
        </div>

        <!-- Chapters -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Chapters:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {#each plan.chapters as chapter}
              <button class="flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 {plan.completedChapters.includes(chapter) ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}" on:click={() => toggleChapter(plan.id, chapter)}>
                <Icon icon={plan.completedChapters.includes(chapter) ? "heroicons:check-circle" : "heroicons:circle"} class="text-lg {plan.completedChapters.includes(chapter) ? 'text-green-500' : 'text-gray-400'}" />
                <span class="text-sm">{chapter}</span>
              </button>
            {/each}
          </div>
        </div>
      </div>
    {/each}

    {#if plans.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:clipboard-document-list" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-600 mb-2">No Study Plans Yet</h3>
        <p class="text-gray-500 mb-4">Create your first study plan to start tracking progress</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={() => (showAddForm = true)}> Create Study Plan </button>
      </div>
    {/if}
  </div>
</div>
