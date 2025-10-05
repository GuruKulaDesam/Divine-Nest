<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import { getExams, addExam, updateExam, deleteExam, markExamPrepComplete } from "../data/education.js";

  const dispatch = createEventDispatcher();

  let exams = [];
  let showAddForm = false;
  let editingExam = null;
  let formData = {
    subject: "",
    date: "",
    syllabus: "",
    prepChecklist: "",
  };

  // Load exams on mount
  async function loadExams() {
    try {
      exams = await getExams();
    } catch (error) {
      console.error("Error loading exams:", error);
    }
  }

  // Initialize
  loadExams();

  function resetForm() {
    formData = {
      subject: "",
      date: "",
      syllabus: "",
      prepChecklist: "",
    };
    editingExam = null;
    showAddForm = false;
  }

  function startEdit(exam) {
    editingExam = exam;
    formData = {
      subject: exam.subject,
      date: exam.date.toISOString().split("T")[0],
      syllabus: exam.syllabus.join(", "),
      prepChecklist: exam.prepChecklist.join(", "),
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const syllabus = formData.syllabus
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const prepChecklist = formData.prepChecklist
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);

      const examData = {
        subject: formData.subject,
        date: new Date(formData.date),
        syllabus,
        prepChecklist,
        completedPrep: [],
      };

      if (editingExam) {
        await updateExam(editingExam.id, examData);
      } else {
        await addExam(examData);
      }

      resetForm();
      await loadExams();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  }

  async function handleDelete(examId) {
    if (confirm("Are you sure you want to delete this exam?")) {
      try {
        await deleteExam(examId);
        await loadExams();
        dispatch("dataChanged");
      } catch (error) {
        console.error("Error deleting exam:", error);
      }
    }
  }

  async function togglePrepItem(examId, item) {
    try {
      const exam = exams.find((e) => e.id === examId);
      if (!exam) return;

      const isCompleted = exam.completedPrep.includes(item);
      if (isCompleted) {
        // Remove from completed
        const updatedPrep = exam.completedPrep.filter((p) => p !== item);
        await updateExam(examId, { completedPrep: updatedPrep });
      } else {
        // Add to completed
        await markExamPrepComplete(examId, item);
      }

      await loadExams();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error updating prep item:", error);
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
    const examDate = new Date(date);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function getUrgencyColor(date) {
    const days = getDaysUntil(date);
    if (days < 0) return "text-red-600 bg-red-50 border-red-200";
    if (days <= 3) return "text-red-700 bg-red-50 border-red-300";
    if (days <= 7) return "text-orange-600 bg-orange-50 border-orange-200";
    if (days <= 14) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  }

  function getUrgencyLabel(date) {
    const days = getDaysUntil(date);
    if (days < 0) return "Overdue";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days <= 7) return `${days} days`;
    if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
      <Icon icon="heroicons:document-check" class="text-orange-500" />
      Exam Tracker & Preparation
    </h2>
    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <Icon icon="heroicons:plus" class="text-lg" />
      {showAddForm ? "Cancel" : "Add Exam"}
    </button>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="mb-6 p-6 bg-orange-50 rounded-xl border border-orange-200" in:fade>
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {editingExam ? "Edit Exam" : "Schedule New Exam"}
      </h3>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input type="text" bind:value={formData.subject} placeholder="e.g., Mathematics, Science" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
            <input type="date" bind:value={formData.date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Syllabus Topics (comma-separated) </label>
          <textarea bind:value={formData.syllabus} placeholder="e.g., Algebra, Geometry, Trigonometry, Statistics" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Preparation Checklist (comma-separated) </label>
          <textarea bind:value={formData.prepChecklist} placeholder="e.g., Review formulas, Practice problems, Mock test, Clear doubts" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required></textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            {editingExam ? "Update Exam" : "Schedule Exam"}
          </button>
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={resetForm}> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Exams List -->
  <div class="space-y-4">
    {#each exams as exam}
      <div class="border rounded-xl p-6 transition-all duration-200 {getUrgencyColor(exam.date)}">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-xl font-semibold text-gray-800">{exam.subject}</h3>
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-white bg-opacity-50">
                {getUrgencyLabel(exam.date)}
              </span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:calendar" class="text-gray-400" />
                {formatDate(exam.date)}
              </span>
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:document-text" class="text-gray-400" />
                {exam.syllabus.length} topics
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200" on:click={() => startEdit(exam)}>
              <Icon icon="heroicons:pencil" class="text-lg" />
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" on:click={() => handleDelete(exam.id)}>
              <Icon icon="heroicons:trash" class="text-lg" />
            </button>
          </div>
        </div>

        <!-- Progress -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-700">Preparation Progress</span>
            <span class="font-medium">{exam.completedPrep.length}/{exam.prepChecklist.length} items</span>
          </div>
          <div class="w-full bg-white bg-opacity-50 rounded-full h-3">
            <div class="bg-current h-3 rounded-full transition-all duration-300" style="width: {(exam.completedPrep.length / exam.prepChecklist.length) * 100}%"></div>
          </div>
        </div>

        <!-- Syllabus -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Syllabus Topics:</h4>
          <div class="flex flex-wrap gap-2">
            {#each exam.syllabus as topic}
              <span class="px-3 py-1 bg-white bg-opacity-50 rounded-full text-sm text-gray-700">
                {topic}
              </span>
            {/each}
          </div>
        </div>

        <!-- Preparation Checklist -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Preparation Checklist:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            {#each exam.prepChecklist as item}
              <button class="flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 {exam.completedPrep.includes(item) ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white bg-opacity-50 border-gray-300 text-gray-700 hover:bg-white'}" on:click={() => togglePrepItem(exam.id, item)}>
                <Icon icon={exam.completedPrep.includes(item) ? "heroicons:check-circle" : "heroicons:circle"} class="text-lg {exam.completedPrep.includes(item) ? 'text-green-600' : 'text-gray-400'}" />
                <span class="text-sm">{item}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Score (if available) -->
        {#if exam.score}
          <div class="mt-4 p-3 bg-white bg-opacity-50 rounded-lg">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Exam Score:</span>
              <span class="text-lg font-bold text-gray-800">{exam.score}%</span>
            </div>
          </div>
        {/if}
      </div>
    {/each}

    {#if exams.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:document-check" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-600 mb-2">No Exams Scheduled</h3>
        <p class="text-gray-500 mb-4">Schedule your first exam to start tracking preparation</p>
        <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={() => (showAddForm = true)}> Schedule Exam </button>
      </div>
    {/if}
  </div>
</div>
