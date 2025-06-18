<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import DeleteConfirmationModal from '../components/DeleteConfirmationModal.svelte';
  
  // Project statuses - made reactive for i18n
  $: projectStatuses = [
    { id: 'on-planning', name: $_('projects.on_planning'), color: 'bg-gray-500', textColor: 'text-gray-700' },
    { id: 'todo', name: $_('projects.todo'), color: 'bg-blue-500', textColor: 'text-blue-700' },
    { id: 'on-progress', name: $_('projects.on_progress'), color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { id: 'in-review', name: $_('projects.in_review'), color: 'bg-purple-500', textColor: 'text-purple-700' },
    { id: 'testing', name: $_('projects.testing'), color: 'bg-orange-500', textColor: 'text-orange-700' },
    { id: 'completed', name: $_('projects.completed'), color: 'bg-green-500', textColor: 'text-green-700' }
  ];

  // Sample project data
  let projects = {
    'on-planning': [
      {
        id: 'p1',
        title: 'Design System Implementation',
        description: 'Create and implement a comprehensive design system for the application',
        priority: 'high',
        assignee: 'Sarah Johnson',
        dueDate: '2024-02-15',
        tags: ['Design', 'UI/UX']
      },
      {
        id: 'p2',
        title: 'Database Schema Design',
        description: 'Design the database schema for the new features',
        priority: 'medium',
        assignee: 'Mike Chen',
        dueDate: '2024-02-20',
        tags: ['Backend', 'Database']
      }
    ],
    'todo': [
      {
        id: 'p3',
        title: 'User Authentication System',
        description: 'Implement secure user authentication with JWT tokens',
        priority: 'high',
        assignee: 'Alex Rodriguez',
        dueDate: '2024-02-25',
        tags: ['Security', 'Backend']
      }
    ],
    'on-progress': [
      {
        id: 'p4',
        title: 'API Development',
        description: 'Develop RESTful APIs for the main features',
        priority: 'high',
        assignee: 'Emily Davis',
        dueDate: '2024-03-01',
        tags: ['API', 'Backend']
      }
    ],
    'in-review': [
      {
        id: 'p5',
        title: 'Frontend Components',
        description: 'Review and approve the new React components',
        priority: 'medium',
        assignee: 'David Wilson',
        dueDate: '2024-02-28',
        tags: ['Frontend', 'Review']
      }
    ],
    'testing': [
      {
        id: 'p6',
        title: 'Integration Testing',
        description: 'Perform comprehensive integration testing',
        priority: 'high',
        assignee: 'Lisa Brown',
        dueDate: '2024-03-05',
        tags: ['Testing', 'QA']
      }
    ],
    'completed': [
      {
        id: 'p7',
        title: 'Project Setup',
        description: 'Initial project setup and configuration',
        priority: 'low',
        assignee: 'Tom Anderson',
        dueDate: '2024-02-10',
        tags: ['Setup', 'Configuration']
      }
    ]
  };

  // State management
  let searchQuery = '';
  let showAddTaskModal = false;
  let selectedTask = null;
  let draggedTask = null;
  let draggedFromStatus = null;
  let showDeleteModal = false;
  let taskToDelete = null;
  let newTask = {
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  };

  // Computed filtered projects
  $: filteredProjects = Object.keys(projects).reduce((acc, status) => {
    acc[status] = projects[status].filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return acc;
  }, {});

  // Functions
  function openAddTaskModal() {
    showAddTaskModal = true;
    selectedTask = null;
    newTask = {
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    };
  }

  function closeAddTaskModal() {
    showAddTaskModal = false;
    selectedTask = null;
  }

  function addNewTask() {
    if (newTask.title.trim()) {
      const taskId = 'p' + Date.now();
      const task = {
        id: taskId,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
        tags: newTask.tags.filter(tag => tag.trim())
      };
      
      // Add to TODO column by default
      projects['todo'] = [...projects['todo'], task];
      projects = projects; // Trigger reactivity
      closeAddTaskModal();
    }
  }

  function viewTaskDetails(task) {
    selectedTask = task;
  }

  function closeTaskDetails() {
    selectedTask = null;
  }

  function deleteTask(taskId, status) {
    taskToDelete = { taskId, status };
    showDeleteModal = true;
  }

  function handleDeleteConfirm() {
    if (taskToDelete) {
      projects[taskToDelete.status] = projects[taskToDelete.status].filter(task => task.id !== taskToDelete.taskId);
      projects = projects; // Trigger reactivity
      taskToDelete = null;
    }
  }

  function handleDeleteCancel() {
    taskToDelete = null;
  }

  // Drag and drop functions
  function handleDragStart(e, task, status) {
    draggedTask = task;
    draggedFromStatus = status;
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e, targetStatus) {
    e.preventDefault();
    if (draggedTask && draggedFromStatus !== targetStatus) {
      // Remove from original status
      projects[draggedFromStatus] = projects[draggedFromStatus].filter(task => task.id !== draggedTask.id);
      // Add to target status
      projects[targetStatus] = [...projects[targetStatus], draggedTask];
      projects = projects; // Trigger reactivity
    }
    draggedTask = null;
    draggedFromStatus = null;
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getPriorityText(priority) {
    switch (priority) {
      case 'high': return $_('projects.high');
      case 'medium': return $_('projects.medium');
      case 'low': return $_('projects.low');
      default: return priority;
    }
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }
</script>

<div class="space-y-6">
  <!-- Page header -->
  <div class="border-b border-base-300 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content">{$_('projects.title')}</h1>
        <p class="mt-2 text-sm text-base-content/60">
          {$_('projects.description')}
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder={$_('projects.search_placeholder')}
            class="pl-10 pr-4 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-2.5 w-4 h-4 text-base-content/40" />
        </div>
        <!-- Add Task Button -->
        <button
          class="btn btn-primary shadow-lg hover:text-primary-content"
          on:click={openAddTaskModal}
          use:motionHover
        >
          <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
          {$_('projects.add_task')}
        </button>
      </div>
    </div>
  </div>

  <!-- Kanban Board -->
  <div class="overflow-x-auto" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="flex space-x-6 min-w-max pb-4">
      {#each projectStatuses as status}
        <div class="w-80 flex-shrink-0">
          <!-- Status Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full {status.color}"></div>
              <h3 class="font-semibold text-base-content">{status.name}</h3>
              <span class="bg-base-200 text-base-content/60 text-xs px-2 py-1 rounded-full">
                {filteredProjects[status.id]?.length || 0}
              </span>
            </div>
          </div>

          <!-- Task Cards -->
          <div
            class="bg-base-200 rounded-lg p-4 min-h-[500px]"
            on:dragover={handleDragOver}
            on:drop={(e) => handleDrop(e, status.id)}
          >
            <div class="space-y-3">
              {#each filteredProjects[status.id] || [] as task (task.id)}
                <div
                  class="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300 cursor-move hover:shadow-md transition-shadow duration-200"
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, task, status.id)}
                  use:motionHover
                >
                  <!-- Task Header -->
                  <div class="flex items-start justify-between mb-2">
                    <h4 class="font-medium text-base-content text-sm line-clamp-2 flex-1 mr-2">
                      {task.title}
                    </h4>
                    <div class="flex items-center space-x-1">
                      <button
                        class="p-1 text-base-content/40 hover:text-base-content"
                        on:click={() => viewTaskDetails(task)}
                      >
                        <Icon icon="heroicons:eye" class="w-4 h-4" />
                      </button>
                      <button
                        class="p-1 text-base-content/40 hover:text-red-500"
                        on:click={() => deleteTask(task.id, status.id)}
                      >
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Task Description -->
                  <p class="text-xs text-base-content/60 mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  <!-- Task Meta -->
                  <div class="space-y-2">
                    <!-- Priority -->
                    <div class="flex items-center justify-between">
                      <span class="text-xs px-2 py-1 rounded-full {getPriorityColor(task.priority)}">
                        {getPriorityText(task.priority)}
                      </span>
                      {#if task.dueDate}
                        <span class="text-xs text-base-content/60">
                          {formatDate(task.dueDate)}
                        </span>
                      {/if}
                    </div>

                    <!-- Assignee -->
                    {#if task.assignee}
                      <div class="flex items-center space-x-2">
                        <Icon icon="heroicons:user" class="w-3 h-3 text-base-content/40" />
                        <span class="text-xs text-base-content/70">{task.assignee}</span>
                      </div>
                    {/if}

                    <!-- Tags -->
                    {#if task.tags && task.tags.length > 0}
                      <div class="flex flex-wrap gap-1">
                        {#each task.tags as tag}
                          <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Add Task Modal -->
{#if showAddTaskModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{$_('projects.add_new_task')}</h3>
        <button
          class="btn btn-sm btn-circle btn-ghost hover:text-base-content"
          on:click={closeAddTaskModal}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('projects.task_title')}</span>
          </label>
          <input
            type="text"
            bind:value={newTask.title}
            placeholder={$_('projects.title_placeholder')}
            class="input input-bordered"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('projects.task_description')}</span>
          </label>
          <textarea
            bind:value={newTask.description}
            placeholder={$_('projects.description_placeholder')}
            rows="3"
            class="textarea textarea-bordered"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">{$_('projects.priority')}</span>
            </label>
            <select bind:value={newTask.priority} class="select select-bordered">
              <option value="low">{$_('projects.low')}</option>
              <option value="medium">{$_('projects.medium')}</option>
              <option value="high">{$_('projects.high')}</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{$_('projects.assignee')}</span>
            </label>
            <input
              type="text"
              bind:value={newTask.assignee}
              placeholder={$_('projects.select_assignee')}
              class="input input-bordered"
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('projects.due_date')}</span>
          </label>
          <input
            type="date"
            bind:value={newTask.dueDate}
            class="input input-bordered"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('projects.tags')}</span>
          </label>
          <input
            type="text"
            placeholder={$_('projects.tags_placeholder')}
            class="input input-bordered"
            on:keydown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                newTask.tags = [...newTask.tags, e.currentTarget.value.trim()];
                e.currentTarget.value = '';
              }
            }}
          />
          {#if newTask.tags.length > 0}
            <div class="flex flex-wrap gap-2 mt-2">
              {#each newTask.tags as tag, index}
                <span class="badge badge-primary gap-2">
                  {tag}
                  <button
                    class="btn btn-xs btn-circle"
                    on:click={() => newTask.tags = newTask.tags.filter((_, i) => i !== index)}
                  >
                    <Icon icon="heroicons:x-mark" class="w-3 h-3" />
                  </button>
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline hover:text-base-content" on:click={closeAddTaskModal}>
          {$_('common.cancel')}
        </button>
        <button
          class="btn btn-primary shadow-lg hover:text-primary-content"
          on:click={addNewTask}
        >
          {$_('projects.add_task')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Task Details Modal -->
{#if selectedTask}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{$_('projects.task_details')}</h3>
        <button
          class="btn btn-sm btn-circle btn-ghost hover:text-base-content"
          on:click={closeTaskDetails}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-base-content mb-2">{selectedTask.title}</h4>
          <p class="text-base-content/70">{selectedTask.description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-base-content/60">{$_('projects.priority')}</label>
            <p class="text-sm">
              <span class="px-2 py-1 rounded-full {getPriorityColor(selectedTask.priority)}">
                {getPriorityText(selectedTask.priority)}
              </span>
            </p>
          </div>

          <div>
            <label class="text-sm font-medium text-base-content/60">{$_('projects.assignee')}</label>
            <p class="text-sm">{selectedTask.assignee || $_('projects.unassigned')}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-base-content/60">{$_('projects.due_date')}</label>
            <p class="text-sm">{formatDate(selectedTask.dueDate) || $_('projects.no_due_date')}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-base-content/60">{$_('projects.tags')}</label>
            <div class="flex flex-wrap gap-1 mt-1">
              {#each selectedTask.tags || [] as tag}
                <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline hover:text-base-content" on:click={closeTaskDetails}>
          {$_('common.close')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
<DeleteConfirmationModal
  bind:isOpen={showDeleteModal}
  title={$_('deleteConfirmation.title')}
  message={$_('deleteConfirmation.message')}
  itemName={taskToDelete ? (filteredProjects[taskToDelete.status]?.find(t => t.id === taskToDelete.taskId)?.title || '') : ''}
  on:confirm={handleDeleteConfirm}
  on:cancel={handleDeleteCancel}
/> 