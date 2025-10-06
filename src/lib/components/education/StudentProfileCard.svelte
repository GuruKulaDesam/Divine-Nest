<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { StudentProfiles, CurrentAcademicData, FamilyMentors } from "../../data/educationData.js";

  export let selectedStudent = "thambi";

  let student = {};
  let recentActivity = [];
  let motivationalMessage = "";

  $: {
    student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
    loadStudentData();
  }

  function loadStudentData() {
    // Generate recent activity based on student data
    recentActivity = [
      {
        type: "study",
        icon: "heroicons:book-open",
        color: "blue",
        title: `Completed ${student.grade} Mathematics Chapter`,
        subtitle: "Playing with Numbers - சிக்கலான எண்கள்",
        time: "2 hours ago",
        stars: 3,
      },
      {
        type: "achievement",
        icon: "heroicons:trophy",
        color: "yellow",
        title: "Earned New Badge",
        subtitle: "Consistent Learner - தொடர்ச்சியான கற்றுக்கொள்பவர்",
        time: "Yesterday",
        stars: 5,
      },
      {
        type: "quiz",
        icon: "heroicons:puzzle-piece",
        color: "pink",
        title: "Science Quiz Completed",
        subtitle: "Score: 85% - Living Organisms",
        time: "2 days ago",
        stars: 4,
      },
      {
        type: "mentor",
        icon: "heroicons:chat-bubble-left-right",
        color: "green",
        title: "Guidance from Appa",
        subtitle: "Math problem-solving techniques",
        time: "3 days ago",
        stars: 0,
      },
    ];

    // Get motivational message
    const messages = student.id === "akka" ? ["You're building towards JEE success, one concept at a time", "Akka, your dedication to learning inspires the whole family"] : ["Thambi, every question you ask makes you smarter", "Keep exploring, young scientist!"];
    motivationalMessage = messages[Math.floor(Math.random() * messages.length)];
  }

  function getSubjectIcon(subject) {
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
    return iconMap[subject] || "heroicons:book-open";
  }

  function getProgressColor(percentage) {
    if (percentage >= 80) return "green";
    if (percentage >= 60) return "blue";
    if (percentage >= 40) return "yellow";
    return "red";
  }

  // Calculate subject-wise progress
  function calculateSubjectProgress(studentId) {
    const curriculum = studentId === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
    const progress = {};

    Object.entries(curriculum).forEach(([subjectKey, subject]) => {
      const totalChapters = subject.chapters.length;
      const completedChapters = subject.chapters.filter((ch) => ch.status === "completed").length;
      const inProgressChapters = subject.chapters.filter((ch) => ch.status === "in-progress").length;

      progress[subject.name] = {
        total: totalChapters,
        completed: completedChapters,
        inProgress: inProgressChapters,
        percentage: Math.round((completedChapters / totalChapters) * 100),
      };
    });

    return progress;
  }

  onMount(() => {
    loadStudentData();
  });
</script>

<div class="space-y-6">
  <!-- Student Profile Header -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center space-x-6">
        <!-- Avatar -->
        <div class="relative">
          <div class="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <Icon icon="heroicons:user" class="w-10 h-10 text-white" />
          </div>
          <!-- Online indicator -->
          <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <Icon icon="heroicons:academic-cap" class="w-3 h-3 text-white" />
          </div>
        </div>

        <!-- Student Info -->
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p class="text-xl text-gray-600">{student.tamil}</p>
          <p class="text-lg text-blue-600 font-medium">{student.grade}</p>
          <p class="text-sm text-gray-500">Age {student.age} • Academic Year 2025-26</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg text-white text-center">
          <Icon icon="heroicons:fire" class="w-6 h-6 mx-auto mb-1" />
          <p class="text-2xl font-bold">{student.currentStreak}</p>
          <p class="text-xs opacity-90">Day Streak</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-white text-center">
          <Icon icon="heroicons:star" class="w-6 h-6 mx-auto mb-1" />
          <p class="text-2xl font-bold">{student.totalStars}</p>
          <p class="text-xs opacity-90">Total Stars</p>
        </div>
      </div>
    </div>

    <!-- Motivational Message -->
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div class="flex items-center space-x-3">
        <Icon icon="heroicons:heart" class="w-6 h-6 text-pink-500" />
        <div>
          <p class="font-medium text-gray-900">Daily Encouragement</p>
          <p class="text-sm text-gray-700">{motivationalMessage}</p>
          <p class="text-xs text-gray-500 mt-1">With love from your family • குடும்ப அன்புடன்</p>
        </div>
      </div>
    </div>

    <!-- Goals and Achievements -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Current Goals -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Icon icon="heroicons:target" class="w-5 h-5 mr-2 text-blue-500" />
          Current Goals
          <span class="ml-2 text-sm text-gray-500">நோக்கங்கள்</span>
        </h3>
        <div class="space-y-2">
          {#each student.goals?.slice(0, 4) || [] as goal}
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Icon icon="heroicons:check-circle" class="w-5 h-5 text-green-500" />
              <span class="text-sm text-gray-700">{goal}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Recent Achievements -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Icon icon="heroicons:trophy" class="w-5 h-5 mr-2 text-yellow-500" />
          Recent Achievements
          <span class="ml-2 text-sm text-gray-500">சாதனைகள்</span>
        </h3>
        <div class="space-y-2">
          {#each student.achievements?.slice(0, 3) || [] as achievement}
            <div class="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Icon icon="heroicons:trophy" class="w-5 h-5 text-yellow-600" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{achievement.title}</p>
                <p class="text-xs text-gray-600">{achievement.position} • {new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Subject Progress Overview -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Icon icon="heroicons:chart-bar" class="w-6 h-6 mr-2 text-purple-500" />
      Subject Progress Overview
      <span class="ml-2 text-sm text-gray-500">பாடவிவரம்</span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each Object.entries(calculateSubjectProgress(student.id)) as [subjectName, progress]}
        {@const color = getProgressColor(progress.percentage)}
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <Icon icon={getSubjectIcon(subjectName)} class="w-5 h-5 text-{color}-500" />
              <h3 class="font-medium text-gray-900">{subjectName}</h3>
            </div>
            <span class="text-sm font-bold text-{color}-600">{progress.percentage}%</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div class="bg-{color}-500 h-2 rounded-full transition-all" style="width: {progress.percentage}%"></div>
          </div>

          <div class="text-xs text-gray-600">
            <p>{progress.completed} completed • {progress.inProgress} in progress</p>
            <p>Total: {progress.total} chapters</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Strengths and Challenges -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Strengths -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Icon icon="heroicons:hand-thumb-up" class="w-5 h-5 mr-2 text-green-500" />
        Strengths
        <span class="ml-2 text-sm text-gray-500">பலம்</span>
      </h3>
      <div class="space-y-2">
        {#each student.strengths || [] as strength}
          <div class="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
            <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-500" />
            <span class="text-sm text-gray-700">{strength}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Challenges -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2 text-orange-500" />
        Areas to Improve
        <span class="ml-2 text-sm text-gray-500">மேம்படுத்த வேண்டிய பகுதிகள்</span>
      </h3>
      <div class="space-y-2">
        {#each student.challenges || [] as challenge}
          <div class="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
            <Icon icon="heroicons:arrow-trending-up" class="w-4 h-4 text-orange-500" />
            <span class="text-sm text-gray-700">{challenge}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Recent Activity Feed -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Icon icon="heroicons:clock" class="w-6 h-6 mr-2 text-blue-500" />
      Recent Activity
      <span class="ml-2 text-sm text-gray-500">சமீபத்திய செயல்பாடுகள்</span>
    </h2>

    <div class="space-y-4">
      {#each recentActivity as activity}
        <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <div class="bg-{activity.color}-100 p-2 rounded-lg">
            <Icon icon={activity.icon} class="w-5 h-5 text-{activity.color}-600" />
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{activity.title}</h4>
            <p class="text-sm text-gray-600">{activity.subtitle}</p>
            <p class="text-xs text-gray-500 mt-1">{activity.time}</p>
          </div>
          {#if activity.stars > 0}
            <div class="flex items-center space-x-1">
              {#each Array(activity.stars) as _, i}
                <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Badges Collection -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Icon icon="heroicons:shield-check" class="w-6 h-6 mr-2 text-purple-500" />
      Badges Collection
      <span class="ml-2 text-sm text-gray-500">பேட்ஜ் சேகரிப்பு</span>
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each student.badges || [] as badge}
        <div class="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg text-center">
          <Icon icon="heroicons:shield-check" class="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <p class="text-sm font-medium text-gray-900">{badge}</p>
        </div>
      {/each}

      <!-- Add placeholder for locked badges -->
      {#each Array(Math.max(0, 6 - (student.badges?.length || 0))) as _, i}
        <div class="bg-gray-100 p-4 rounded-lg text-center opacity-50">
          <Icon icon="heroicons:lock-closed" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p class="text-sm text-gray-500">Locked</p>
        </div>
      {/each}
    </div>
  </div>
</div>
