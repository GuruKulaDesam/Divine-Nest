<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let assessments = [
    {
      id: 1,
      title: 'Mathematics Mid-term Exam',
      subject: 'Mathematics',
      type: 'Exam',
      date: '2024-03-20',
      grade: 'A',
      score: 95,
      maxScore: 100,
      status: 'completed',
      feedback: 'Excellent work! Strong understanding of algebraic concepts.'
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Science',
      type: 'Assignment',
      date: '2024-03-25',
      grade: 'B+',
      score: 88,
      maxScore: 100,
      status: 'completed',
      feedback: 'Good analysis but needs more detailed methodology section.'
    },
    {
      id: 3,
      title: 'History Research Paper',
      subject: 'History',
      type: 'Project',
      date: '2024-04-10',
      grade: 'A-',
      score: 92,
      maxScore: 100,
      status: 'completed',
      feedback: 'Well-researched with excellent citations.'
    },
    {
      id: 4,
      title: 'English Literature Quiz',
      subject: 'English',
      type: 'Quiz',
      date: '2024-04-15',
      grade: 'Pending',
      score: null,
      maxScore: 50,
      status: 'upcoming',
      feedback: ''
    }
  ];

  let filteredAssessments = assessments;
  let searchQuery = '';
  let selectedSubject = 'all';
  let selectedType = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'Mathematics', name: 'Mathematics' },
    { id: 'Science', name: 'Science' },
    { id: 'English', name: 'English' },
    { id: 'History', name: 'History' },
    { id: 'Geography', name: 'Geography' },
    { id: 'Computer Science', name: 'Computer Science' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'Exam', name: 'Exam' },
    { id: 'Quiz', name: 'Quiz' },
    { id: 'Assignment', name: 'Assignment' },
    { id: 'Project', name: 'Project' },
    { id: 'Presentation', name: 'Presentation' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'in-progress', name: 'In Progress' }
  ];

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'Pending'];

  let newAssessment = {
    title: '',
    subject: 'Mathematics',
    type: 'Exam',
    date: '',
    maxScore: 100,
    status: 'upcoming'
  };

  $: {
    filteredAssessments = assessments.filter(assessment => {
      const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assessment.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || assessment.subject === selectedSubject;
      const matchesType = selectedType === 'all' || assessment.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || assessment.status === selectedStatus;
      return matchesSearch && matchesSubject && matchesType && matchesStatus;
    });
  }

  function addAssessment() {
    if (newAssessment.title.trim()) {
      const assessment = {
        ...newAssessment,
        id: Date.now(),
        grade: 'Pending',
        score: null,
        feedback: ''
      };
      assessments = [...assessments, assessment];
      newAssessment = { title: '', subject: 'Mathematics', type: 'Exam', date: '', maxScore: 100, status: 'upcoming' };
      showAddModal = false;
    }
  }

  function deleteAssessment(id) {
    assessments = assessments.filter(a => a.id !== id);
  }

  function getGradeColor(grade) {
    if (grade === 'Pending') return 'text-gray-500';
    const gradeValue = grade.charAt(0);
    switch (gradeValue) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D':
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getAverageScore() {
    const completedAssessments = assessments.filter(a => a.status === 'completed' && a.score !== null);
    if (completedAssessments.length === 0) return 0;
    const totalScore = completedAssessments.reduce((sum, a) => sum + (a.score / a.maxScore * 100), 0);
    return Math.round(totalScore / completedAssessments.length);
  }

  function getGradeDistribution() {
    const completed = assessments.filter(a => a.status === 'completed');
    const distribution = {};
    completed.forEach(assessment => {
      const grade = assessment.grade.charAt(0);
      distribution[grade] = (distribution[grade] || 0) + 1;
    });
    return distribution;
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Assessments</h1>
      <p class="text-base-content/60 mt-1">Track exams, quizzes, assignments, and academic performance</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Assessment
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-blue-500 rounded-full">
            <Icon icon="mdi:clipboard-list" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Total Assessments</h3>
            <p class="text-2xl font-bold text-blue-600">{assessments.length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-500 rounded-full">
            <Icon icon="mdi:chart-line" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Average Score</h3>
            <p class="text-2xl font-bold text-green-600">{getAverageScore()}%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-purple-500 rounded-full">
            <Icon icon="mdi:check-circle" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Completed</h3>
            <p class="text-2xl font-bold text-purple-600">{assessments.filter(a => a.status === 'completed').length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-orange-500 rounded-full">
            <Icon icon="mdi:calendar-clock" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Upcoming</h3>
            <p class="text-2xl font-bold text-orange-600">{assessments.filter(a => a.status === 'upcoming').length}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search assessments..."
      class="input input-bordered"
    />
    <select bind:value={selectedSubject} class="select select-bordered">
      {#each subjects as subject}
        <option value={subject.id}>{subject.name}</option>
      {/each}
    </select>
    <select bind:value={selectedType} class="select select-bordered">
      {#each types as type}
        <option value={type.id}>{type.name}</option>
      {/each}
    </select>
    <select bind:value={selectedStatus} class="select select-bordered">
      {#each statuses as status}
        <option value={status.id}>{status.name}</option>
      {/each}
    </select>
  </div>

  <!-- Assessments Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Date</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredAssessments as assessment}
              <tr>
                <td class="font-semibold">{assessment.title}</td>
                <td>{assessment.subject}</td>
                <td>
                  <span class="badge badge-outline">{assessment.type}</span>
                </td>
                <td>{new Date(assessment.date).toLocaleDateString()}</td>
                <td>
                  {#if assessment.score !== null}
                    {assessment.score}/{assessment.maxScore}
                    <span class="text-sm text-base-content/60">
                      ({Math.round((assessment.score / assessment.maxScore) * 100)}%)
                    </span>
                  {:else}
                    <span class="text-base-content/40">-</span>
                  {/if}
                </td>
                <td>
                  <span class="font-semibold {getGradeColor(assessment.grade)}">
                    {assessment.grade}
                  </span>
                </td>
                <td>
                  <span class="badge {getStatusColor(assessment.status)}">
                    {statuses.find(s => s.id === assessment.status)?.name}
                  </span>
                </td>
                <td>
                  <div class="dropdown dropdown-end">
                    <button class="btn btn-ghost btn-sm">
                      <Icon icon="mdi:dots-vertical" class="w-4 h-4" />
                    </button>
                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>Edit</a></li>
                      <li><a>View Details</a></li>
                      <li><a class="text-error" on:click={() => deleteAssessment(assessment.id)}>Delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if filteredAssessments.length === 0}
        <div class="text-center py-12">
          <Icon icon="mdi:clipboard-list-outline" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-base-content/60">No assessments found</h3>
          <p class="text-base-content/40">Add your first assessment to get started!</p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Grade Distribution Chart -->
  {#if assessments.filter(a => a.status === 'completed').length > 0}
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h3 class="card-title">Grade Distribution</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {#each Object.entries(getGradeDistribution()) as [grade, count]}
            <div class="text-center">
              <div class="text-3xl font-bold {getGradeColor(grade + '+')}">{count}</div>
              <div class="text-sm text-base-content/60">Grade {grade}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Add Assessment Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Add New Assessment</h3>

      <form on:submit|preventDefault={addAssessment} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-base-content mb-2">Title</label>
          <input
            type="text"
            bind:value={newAssessment.title}
            placeholder="Assessment title"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Subject</label>
            <select bind:value={newAssessment.subject} class="select select-bordered w-full">
              {#each subjects.slice(1) as subject}
                <option value={subject.id}>{subject.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Type</label>
            <select bind:value={newAssessment.type} class="select select-bordered w-full">
              {#each types.slice(1) as type}
                <option value={type.id}>{type.name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Date</label>
            <input
              type="date"
              bind:value={newAssessment.date}
              class="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Max Score</label>
            <input
              type="number"
              bind:value={newAssessment.maxScore}
              min="1"
              class="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-base-content mb-2">Status</label>
          <select bind:value={newAssessment.status} class="select select-bordered w-full">
            {#each statuses.slice(1) as status}
              <option value={status.id}>{status.name}</option>
            {/each}
          </select>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={() => showAddModal = false}>Cancel</button>
          <button type="submit" class="btn btn-primary">Add Assessment</button>
        </div>
      </form>
    </div>
  </div>
{/if}