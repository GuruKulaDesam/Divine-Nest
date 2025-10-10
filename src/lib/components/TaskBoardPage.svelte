<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";

  // Task data
  let tasks = [
    {
      id: 1,
      title: "தமிழ் எழுத்துப்பயிற்சி செய்ய வேண்டும்",
      description: "குழந்தைக்கு தமிழ் எழுத்துகள் கற்றுக்கொடுக்க வேண்டும்",
      status: "pending",
      priority: "high",
      assignee: "Amma",
      dueDate: "2025-10-10",
      voiceTrigger: "எழுத்துப்பயிற்சி",
      createdAt: "2025-10-08 09:00 AM",
    },
    {
      id: 2,
      title: "பொங்கல் சமையல் பொருட்கள் வாங்கு",
      description: "பொங்கல் சமையலுக்கு தேவையான பொருட்கள் வாங்க வேண்டும்",
      status: "in-progress",
      priority: "medium",
      assignee: "Appa",
      dueDate: "2025-10-09",
      voiceTrigger: "சமையல் பொருட்கள்",
      createdAt: "2025-10-08 08:30 AM",
    },
    {
      id: 3,
      title: "வீடு சுத்தம் செய்ய வேண்டும்",
      description: "முழு வீடும் சுத்தம் செய்ய வேண்டும்",
      status: "completed",
      priority: "low",
      assignee: "Amma",
      dueDate: "2025-10-08",
      voiceTrigger: "வீடு சுத்தம்",
      createdAt: "2025-10-08 07:00 AM",
    },
  ];

  let filteredTasks = tasks;
  let searchQuery = "";
  let selectedStatus = "";
  let selectedPriority = "";
  let selectedAssignee = "";
  let showAddTask = false;
  let newTask = {
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    voiceTrigger: "",
  };

  // Filter tasks
  $: filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    const matchesPriority = !selectedPriority || task.priority === selectedPriority;
    const matchesAssignee = !selectedAssignee || task.assignee === selectedAssignee;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // Tamil labels
  const taLabels = {
    taskBoard: "பணி பலகை",
    addTask: "பணி சேர்",
    search: "தேடு",
    filterStatus: "நிலை வடிகட்டி",
    filterPriority: "முன்னுரிமை வடிகட்டி",
    filterAssignee: "ஒதுக்கப்பட்டவர் வடிகட்டி",
    all: "அனைத்தும்",
    pending: "நிலுவையில்",
    inProgress: "நடைபெறுகிறது",
    completed: "முடிந்தது",
    high: "உயர்",
    medium: "நடுத்தரம்",
    low: "குறைவு",
    child: "குழந்தை",
    amma: "அம்மா",
    appa: "அப்பா",
    paati: "பாட்டி",
    title: "தலைப்பு",
    description: "விளக்கம்",
    assignee: "ஒதுக்கப்பட்டவர்",
    dueDate: "கடைசி தேதி",
    voiceTrigger: "குரல் தூண்டுதல்",
    save: "சேமி",
    cancel: "ரத்து செய்",
    noTasks: "பணிகள் இல்லை",
    markComplete: "முடிந்ததாக குறி",
    edit: "திருத்து",
    delete: "நீக்கு",
  };

  // Status colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  // Priority colors
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  // Add new task
  function addTask() {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: "pending",
        createdAt: new Date().toLocaleString(),
      };
      tasks = [...tasks, task];
      newTask = {
        title: "",
        description: "",
        priority: "medium",
        assignee: "",
        dueDate: "",
        voiceTrigger: "",
      };
      showAddTask = false;
    }
  }

  // Update task status
  function updateTaskStatus(taskId, newStatus) {
    tasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task));
  }

  // Delete task
  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  onMount(() => {
    // Load tasks from localStorage or API
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      filteredTasks = tasks;
    }
  });

  // Save tasks when they change
  $: if (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
</script>

<svelte:head>
  <title>📋 Task Board - Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {taLabels.taskBoard}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Family task management with voice triggers</p>
          </div>
        </div>

        <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg" on:click={() => (showAddTask = true)} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2 inline" />
          {taLabels.addTask}
        </button>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.search}</span>
          </label>
          <input type="text" bind:value={searchQuery} placeholder="பணிகளை தேடு..." class="input input-bordered w-full" />
        </div>

        <!-- Status Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterStatus}</span>
          </label>
          <select bind:value={selectedStatus} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="pending">{taLabels.pending}</option>
            <option value="in-progress">{taLabels.inProgress}</option>
            <option value="completed">{taLabels.completed}</option>
          </select>
        </div>

        <!-- Priority Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterPriority}</span>
          </label>
          <select bind:value={selectedPriority} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="high">{taLabels.high}</option>
            <option value="medium">{taLabels.medium}</option>
            <option value="low">{taLabels.low}</option>
          </select>
        </div>

        <!-- Assignee Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{taLabels.filterAssignee}</span>
          </label>
          <select bind:value={selectedAssignee} class="select select-bordered w-full">
            <option value="">{taLabels.all}</option>
            <option value="Child">{taLabels.child}</option>
            <option value="Amma">{taLabels.amma}</option>
            <option value="Appa">{taLabels.appa}</option>
            <option value="Paati">{taLabels.paati}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredTasks as task, index}
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300" use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <!-- Task Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {task.title}
              </h3>
              <div class="flex items-center space-x-2 mb-3">
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status === "pending" ? taLabels.pending : task.status === "in-progress" ? taLabels.inProgress : taLabels.completed}
                </span>
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority === "high" ? taLabels.high : task.priority === "medium" ? taLabels.medium : taLabels.low}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 ml-4">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {task.assignee === "Amma" ? "அ" : task.assignee === "Appa" ? "ஆ" : task.assignee === "Child" ? "கு" : "பா"}
              </div>
            </div>
          </div>

          <!-- Task Content -->
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
            {task.description}
          </p>

          <!-- Voice Trigger -->
          {#if task.voiceTrigger}
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:microphone" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span class="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Voice: "{task.voiceTrigger}"
                </span>
              </div>
            </div>
          {/if}

          <!-- Due Date -->
          {#if task.dueDate}
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Icon icon="heroicons:calendar-days" class="w-4 h-4" />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          {/if}

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              {#if task.status !== "completed"}
                <button class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors" on:click={() => updateTaskStatus(task.id, "completed")}>
                  {taLabels.markComplete}
                </button>
              {/if}
              <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors">
                {taLabels.edit}
              </button>
            </div>
            <button class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors" on:click={() => deleteTask(task.id)}>
              {taLabels.delete}
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredTasks.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:clipboard-document-list" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{taLabels.noTasks}</h3>
        <p class="text-gray-500 dark:text-gray-400">Add tasks using voice commands or the button above!</p>
      </div>
    {/if}
  </div>

  <!-- Add Task Modal -->
  {#if showAddTask}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{taLabels.addTask}</h3>

        <div class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.title}</span>
            </label>
            <input type="text" bind:value={newTask.title} placeholder="பணியின் தலைப்பு..." class="input input-bordered w-full" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.description}</span>
            </label>
            <textarea bind:value={newTask.description} placeholder="பணியின் விளக்கம்..." class="textarea textarea-bordered w-full" rows="3"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">{taLabels.priority}</span>
              </label>
              <select bind:value={newTask.priority} class="select select-bordered w-full">
                <option value="low">{taLabels.low}</option>
                <option value="medium">{taLabels.medium}</option>
                <option value="high">{taLabels.high}</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">{taLabels.assignee}</span>
              </label>
              <select bind:value={newTask.assignee} class="select select-bordered w-full">
                <option value="Amma">{taLabels.amma}</option>
                <option value="Appa">{taLabels.appa}</option>
                <option value="Child">{taLabels.child}</option>
                <option value="Paati">{taLabels.paati}</option>
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.dueDate}</span>
            </label>
            <input type="date" bind:value={newTask.dueDate} class="input input-bordered w-full" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{taLabels.voiceTrigger}</span>
            </label>
            <input type="text" bind:value={newTask.voiceTrigger} placeholder="குரல் தூண்டுதல் சொல்..." class="input input-bordered w-full" />
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button class="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-colors" on:click={addTask}>
            {taLabels.save}
          </button>
          <button class="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors" on:click={() => (showAddTask = false)}>
            {taLabels.cancel}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
