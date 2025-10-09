<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let quizzes = [
    {
      id: 1,
      title: 'Mathematics Quiz - Algebra',
      subject: 'Mathematics',
      grade: '10th Grade',
      questions: 25,
      duration: 45,
      difficulty: 'Medium',
      status: 'Active',
      createdDate: '2024-01-15',
      attempts: 45,
      averageScore: 78
    },
    {
      id: 2,
      title: 'Science Quiz - Physics',
      subject: 'Physics',
      grade: '11th Grade',
      questions: 30,
      duration: 60,
      difficulty: 'Hard',
      status: 'Active',
      createdDate: '2024-01-10',
      attempts: 32,
      averageScore: 72
    },
    {
      id: 3,
      title: 'English Literature Quiz',
      subject: 'English',
      grade: '9th Grade',
      questions: 20,
      duration: 40,
      difficulty: 'Easy',
      status: 'Draft',
      createdDate: '2024-01-20',
      attempts: 0,
      averageScore: 0
    }
  ];

  let searchQuery = '';
  let selectedSubject = 'all';
  let selectedGrade = 'all';
  let selectedDifficulty = 'all';
  let selectedStatus = 'all';
  let showCreateModal = false;

  let newQuiz = {
    title: '',
    subject: '',
    grade: '',
    questions: 10,
    duration: 30,
    difficulty: 'Medium',
    description: ''
  };

  let subjects = [
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' }
  ];

  let grades = [
    { id: '6th', name: '6th Grade' },
    { id: '7th', name: '7th Grade' },
    { id: '8th', name: '8th Grade' },
    { id: '9th', name: '9th Grade' },
    { id: '10th', name: '10th Grade' },
    { id: '11th', name: '11th Grade' },
    { id: '12th', name: '12th Grade' }
  ];

  let difficulties = [
    { id: 'Easy', name: 'Easy' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Hard', name: 'Hard' }
  ];

  let statuses = [
    { id: 'Active', name: 'Active' },
    { id: 'Draft', name: 'Draft' },
    { id: 'Archived', name: 'Archived' }
  ];

  $: filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchesGrade = selectedGrade === 'all' || quiz.grade === selectedGrade;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesGrade && matchesDifficulty && matchesStatus;
  });

  function addQuiz() {
    if (!newQuiz.title || !newQuiz.subject || !newQuiz.grade) return;

    const quiz = {
      id: quizzes.length + 1,
      ...newQuiz,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      attempts: 0,
      averageScore: 0
    };

    quizzes = [...quizzes, quiz];
    showCreateModal = false;
    newQuiz = { title: '', subject: '', grade: '', questions: 10, duration: 30, difficulty: 'Medium', description: '' };
  }

  function deleteQuiz(quizId) {
    quizzes = quizzes.filter(quiz => quiz.id !== quizId);
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Draft': return 'text-yellow-600 bg-yellow-100';
      case 'Archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Quiz Center</h1>
      <p class="text-base-content/60 mt-1">Create and manage educational quizzes</p>
    </div>
    <button
      on:click={() => showCreateModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      Create Quiz
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-100">Total Quizzes</p>
          <p class="text-2xl font-bold">{quizzes.length}</p>
        </div>
        <Icon icon="heroicons:document-text" class="w-8 h-8 text-blue-200" />
      </div>
    </div>

    <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-green-100">Active Quizzes</p>
          <p class="text-2xl font-bold">{quizzes.filter(q => q.status === 'Active').length}</p>
        </div>
        <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-200" />
      </div>
    </div>

    <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-purple-100">Total Attempts</p>
          <p class="text-2xl font-bold">{quizzes.reduce((sum, q) => sum + q.attempts, 0)}</p>
        </div>
        <Icon icon="heroicons:user-group" class="w-8 h-8 text-purple-200" />
      </div>
    </div>

    <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-orange-100">Avg. Score</p>
          <p class="text-2xl font-bold">
            {quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.averageScore, 0) / quizzes.length) : 0}%
          </p>
        </div>
        <Icon icon="heroicons:chart-bar" class="w-8 h-8 text-orange-200" />
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-xl shadow-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
      <!-- Search -->
      <div class="md:col-span-2">
        <label class="label">
          <span class="label-text">Search Quizzes</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title or subject..."
          class="input input-bordered w-full"
        />
      </div>

      <!-- Subject Filter -->
      <div>
        <label class="label">
          <span class="label-text">Subject</span>
        </label>
        <select bind:value={selectedSubject} class="select select-bordered w-full">
          <option value="all">All Subjects</option>
          {#each subjects as subject}
            <option value={subject.name}>{subject.name}</option>
          {/each}
        </select>
      </div>

      <!-- Grade Filter -->
      <div>
        <label class="label">
          <span class="label-text">Grade</span>
        </label>
        <select bind:value={selectedGrade} class="select select-bordered w-full">
          <option value="all">All Grades</option>
          {#each grades as grade}
            <option value={grade.id}>{grade.name}</option>
          {/each}
        </select>
      </div>

      <!-- Difficulty Filter -->
      <div>
        <label class="label">
          <span class="label-text">Difficulty</span>
        </label>
        <select bind:value={selectedDifficulty} class="select select-bordered w-full">
          <option value="all">All Levels</option>
          {#each difficulties as difficulty}
            <option value={difficulty.id}>{difficulty.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered w-full">
          <option value="all">All Status</option>
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Quiz List -->
  <div class="bg-base-100 rounded-xl shadow-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Quiz Details</th>
            <th>Subject & Grade</th>
            <th>Questions</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredQuizzes as quiz}
            <tr class="hover">
              <td>
                <div>
                  <div class="font-semibold text-base-content">{quiz.title}</div>
                  <div class="text-sm text-base-content/60">Created: {formatDate(quiz.createdDate)}</div>
                </div>
              </td>
              <td>
                <div>
                  <div class="font-medium text-base-content">{quiz.subject}</div>
                  <div class="text-sm text-base-content/60">{quiz.grade}</div>
                </div>
              </td>
              <td>
                <div class="text-center">
                  <div class="font-semibold text-base-content">{quiz.questions}</div>
                  <div class="text-sm text-base-content/60">{quiz.duration} min</div>
                </div>
              </td>
              <td>
                <span class="badge badge-sm {getDifficultyColor(quiz.difficulty)}">
                  {quiz.difficulty}
                </span>
              </td>
              <td>
                <span class="badge badge-sm {getStatusColor(quiz.status)}">
                  {quiz.status}
                </span>
              </td>
              <td>
                <div class="text-center">
                  <div class="font-semibold text-base-content">{quiz.attempts} attempts</div>
                  <div class="text-sm text-base-content/60">
                    {#if quiz.attempts > 0}
                      Avg: {quiz.averageScore}%
                    {:else}
                      No attempts yet
                    {/if}
                  </div>
                </div>
              </td>
              <td>
                <div class="dropdown dropdown-left">
                  <button class="btn btn-ghost btn-sm">
                    <Icon icon="heroicons:ellipsis-vertical" class="w-4 h-4" />
                  </button>
                  <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Edit Quiz</a></li>
                    <li><a>View Results</a></li>
                    <li><a>Duplicate</a></li>
                    <li><a class="text-error" on:click={() => deleteQuiz(quiz.id)}>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if filteredQuizzes.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/20 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-base-content mb-2">No quizzes found</h3>
        <p class="text-base-content/60">Try adjusting your filters or create a new quiz.</p>
      </div>
    {/if}
  </div>
</div>

<!-- Create Quiz Modal -->
{#if showCreateModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-base-content">Create New Quiz</h3>
          <button
            on:click={() => showCreateModal = false}
            class="btn btn-ghost btn-sm"
          >
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addQuiz} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Quiz Title *</span>
            </label>
            <input
              type="text"
              bind:value={newQuiz.title}
              placeholder="Enter quiz title"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Subject *</span>
              </label>
              <select bind:value={newQuiz.subject} class="select select-bordered w-full" required>
                <option value="">Select Subject</option>
                {#each subjects as subject}
                  <option value={subject.name}>{subject.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Grade *</span>
              </label>
              <select bind:value={newQuiz.grade} class="select select-bordered w-full" required>
                <option value="">Select Grade</option>
                {#each grades as grade}
                  <option value={grade.id}>{grade.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Questions</span>
              </label>
              <input
                type="number"
                bind:value={newQuiz.questions}
                min="1"
                max="100"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Duration (min)</span>
              </label>
              <input
                type="number"
                bind:value={newQuiz.duration}
                min="5"
                max="180"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Difficulty</span>
              </label>
              <select bind:value={newQuiz.difficulty} class="select select-bordered w-full">
                {#each difficulties as difficulty}
                  <option value={difficulty.id}>{difficulty.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newQuiz.description}
              placeholder="Brief description of the quiz..."
              rows="3"
              class="textarea textarea-bordered w-full"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="submit" class="btn btn-primary flex-1">
              Create Quiz
            </button>
            <button
              type="button"
              on:click={() => showCreateModal = false}
              class="btn btn-ghost flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}