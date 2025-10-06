<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { StudentProfiles, CurrentAcademicData } from "../../data/educationData.js";

  export let selectedStudent = "thambi";

  let student = {};
  let curriculum = {};
  let selectedSubject = "";
  let subjects = [];

  $: {
    student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
    curriculum = selectedStudent === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
    subjects = Object.keys(curriculum);
    if (subjects.length > 0 && !selectedSubject) {
      selectedSubject = subjects[0];
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "gray";
      default:
        return "gray";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "completed":
        return "heroicons:check-circle";
      case "in-progress":
        return "heroicons:clock";
      case "pending":
        return "heroicons:minus-circle";
      default:
        return "heroicons:minus-circle";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "completed":
        return "Completed • முடிந்தது";
      case "in-progress":
        return "In Progress • நடந்து வருகிறது";
      case "pending":
        return "Pending • செய்ய வேண்டும்";
      default:
        return "Unknown";
    }
  }

  function calculateOverallProgress() {
    let totalChapters = 0;
    let completedChapters = 0;

    Object.values(curriculum).forEach((subject) => {
      totalChapters += subject.chapters.length;
      completedChapters += subject.chapters.filter((ch) => ch.status === "completed").length;
    });

    return {
      total: totalChapters,
      completed: completedChapters,
      percentage: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0,
    };
  }

  $: overallProgress = calculateOverallProgress();

  function calculateSubjectProgress(subject) {
    const totalChapters = subject.chapters.length;
    const completedChapters = subject.chapters.filter((ch) => ch.status === "completed").length;
    const inProgressChapters = subject.chapters.filter((ch) => ch.status === "in-progress").length;

    return {
      total: totalChapters,
      completed: completedChapters,
      inProgress: inProgressChapters,
      pending: totalChapters - completedChapters - inProgressChapters,
      percentage: Math.round((completedChapters / totalChapters) * 100),
    };
  }

  function markChapterComplete(subjectKey, chapterIndex) {
    if (curriculum[subjectKey].chapters[chapterIndex].status !== "completed") {
      curriculum[subjectKey].chapters[chapterIndex].status = "completed";
      // Trigger reactivity
      curriculum = { ...curriculum };

      // Show success message (you could add a toast notification here)
      console.log(`Chapter ${chapterIndex + 1} marked as completed!`);
    }
  }

  function startChapter(subjectKey, chapterIndex) {
    if (curriculum[subjectKey].chapters[chapterIndex].status === "pending") {
      curriculum[subjectKey].chapters[chapterIndex].status = "in-progress";
      // Trigger reactivity
      curriculum = { ...curriculum };
    }
  }

  function getSubjectIcon(subjectName) {
    const iconMap = {
      Mathematics: "heroicons:calculator",
      Science: "heroicons:beaker",
      Physics: "heroicons:bolt",
      Chemistry: "heroicons:test-tube",
      English: "heroicons:language",
      Tamil: "heroicons:book-open",
      "Social Science": "heroicons:globe-alt",
      Hindi: "heroicons:chat-bubble-left-right",
    };
    return iconMap[subjectName] || "heroicons:book-open";
  }

  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Curriculum Tracker</h1>
        <p class="text-lg text-gray-600">பாடத்திட்ட கண்காணிப்பு</p>
        <p class="text-sm text-gray-500">{student.name} ({student.tamil}) • {student.grade}</p>
      </div>

      <!-- Overall Progress Ring -->
      <div class="text-center">
        <div class="relative w-20 h-20 mx-auto">
          <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="{overallProgress.percentage}, 100" stroke-linecap="round" />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-lg font-bold text-gray-900">{overallProgress.percentage}%</span>
          </div>
        </div>
        <p class="text-sm text-gray-600 mt-2">{overallProgress.completed}/{overallProgress.total} Chapters</p>
        <p class="text-xs text-gray-500">அத்தியாயங்கள்</p>
      </div>
    </div>

    <!-- Subject Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each Object.entries(curriculum) as [subjectKey, subject]}
        {@const progress = calculateSubjectProgress(subject)}
        {@const isSelected = selectedSubject === subjectKey}
        <button on:click={() => (selectedSubject = subjectKey)} class="p-4 rounded-lg border-2 transition-all text-left {isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <Icon icon={getSubjectIcon(subject.name)} class="w-6 h-6 text-blue-600" />
              <h3 class="font-semibold text-gray-900">{subject.name}</h3>
            </div>
            <span class="text-sm font-bold text-blue-600">{progress.percentage}%</span>
          </div>

          <p class="text-sm text-gray-600 mb-2">{subject.tamil}</p>

          <!-- Mini Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div class="bg-blue-500 h-2 rounded-full transition-all" style="width: {progress.percentage}%"></div>
          </div>

          <div class="flex justify-between text-xs text-gray-500">
            <span>{progress.completed} completed</span>
            <span>{progress.total} total</span>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Detailed Subject View -->
  {#if selectedSubject && curriculum[selectedSubject]}
    {@const subject = curriculum[selectedSubject]}
    {@const progress = calculateSubjectProgress(subject)}

    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 flex items-center">
            <Icon icon={getSubjectIcon(subject.name)} class="w-6 h-6 mr-2 text-blue-600" />
            {subject.name}
          </h2>
          <p class="text-lg text-gray-600">{subject.tamil}</p>
          <p class="text-sm text-gray-500">{progress.completed} of {progress.total} chapters completed</p>
        </div>

        <!-- Subject Stats -->
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-green-50 p-3 rounded-lg">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 mx-auto mb-1 text-green-600" />
            <p class="text-lg font-bold text-green-800">{progress.completed}</p>
            <p class="text-xs text-green-600">Completed</p>
          </div>
          <div class="bg-blue-50 p-3 rounded-lg">
            <Icon icon="heroicons:clock" class="w-6 h-6 mx-auto mb-1 text-blue-600" />
            <p class="text-lg font-bold text-blue-800">{progress.inProgress}</p>
            <p class="text-xs text-blue-600">In Progress</p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <Icon icon="heroicons:minus-circle" class="w-6 h-6 mx-auto mb-1 text-gray-600" />
            <p class="text-lg font-bold text-gray-800">{progress.pending}</p>
            <p class="text-xs text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      <!-- Chapter List -->
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Chapters • அத்தியாயங்கள்</h3>

        {#each subject.chapters as chapter, index}
          {@const statusColor = getStatusColor(chapter.status)}
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-{statusColor}-100 rounded-full flex items-center justify-center">
                  <Icon icon={getStatusIcon(chapter.status)} class="w-5 h-5 text-{statusColor}-600" />
                </div>
              </div>

              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-sm font-medium text-gray-600">Chapter {chapter.id}</span>
                  <span class="px-2 py-1 bg-{statusColor}-100 text-{statusColor}-800 text-xs rounded-full">
                    {getStatusText(chapter.status)}
                  </span>
                </div>
                <h4 class="font-medium text-gray-900">{chapter.title}</h4>
                <p class="text-sm text-gray-600">{chapter.tamil || chapter.english || ""}</p>
                {#if selectedStudent === "akka" && chapter.jeeLevel}
                  <div class="mt-1">
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      JEE Level: {chapter.jeeLevel}
                    </span>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              {#if chapter.status === "pending"}
                <button on:click={() => startChapter(selectedSubject, index)} class="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"> Start </button>
              {:else if chapter.status === "in-progress"}
                <button on:click={() => markChapterComplete(selectedSubject, index)} class="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"> Complete </button>
              {:else}
                <button class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-lg cursor-not-allowed" disabled> Completed </button>
              {/if}

              <button class="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-lg hover:bg-purple-200 transition-colors"> Study </button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Study Recommendations -->
      <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2 flex items-center">
          <Icon icon="heroicons:lightbulb" class="w-5 h-5 mr-2 text-yellow-500" />
          Study Recommendations • பரிந்துரைகள்
        </h4>
        <div class="text-sm text-gray-700 space-y-1">
          {#if progress.inProgress > 0}
            <p>• Focus on completing {progress.inProgress} chapters in progress</p>
          {/if}
          {#if progress.pending > 0}
            <p>• Plan to start {Math.min(2, progress.pending)} new chapters this week</p>
          {/if}
          {#if selectedStudent === "akka"}
            <p>• Review completed chapters for JEE preparation</p>
            <p>• Practice numerical problems for Physics and Chemistry</p>
          {:else}
            <p>• Create mind maps for Science chapters</p>
            <p>• Practice word problems for Mathematics</p>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Academic Calendar Integration -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <Icon icon="heroicons:calendar-days" class="w-6 h-6 mr-2 text-green-600" />
      Upcoming Academic Events
      <span class="ml-2 text-sm text-gray-500">கல்வி நிகழ்வுகள்</span>
    </h2>

    <div class="space-y-3">
      {#if selectedStudent === "akka"}
        <div class="flex items-center space-x-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600" />
          <div>
            <p class="font-medium text-red-900">JEE Main 2026</p>
            <p class="text-sm text-red-700">January 2026 • High Priority</p>
          </div>
        </div>
        <div class="flex items-center space-x-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <Icon icon="heroicons:academic-cap" class="w-5 h-5 text-orange-600" />
          <div>
            <p class="font-medium text-orange-900">CBSE Board Exams</p>
            <p class="text-sm text-orange-700">March 2026 • Class 11 Final</p>
          </div>
        </div>
      {:else}
        <div class="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Icon icon="heroicons:document-text" class="w-5 h-5 text-blue-600" />
          <div>
            <p class="font-medium text-blue-900">Quarterly Exams</p>
            <p class="text-sm text-blue-700">December 2025 • Class 6</p>
          </div>
        </div>
        <div class="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Icon icon="heroicons:trophy" class="w-5 h-5 text-green-600" />
          <div>
            <p class="font-medium text-green-900">Math Olympiad</p>
            <p class="text-sm text-green-700">January 2026 • Registration Open</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
