<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let curricula = [
    {
      id: 1,
      title: 'CBSE Class 10 Mathematics',
      description: 'Complete mathematics curriculum for CBSE Class 10 students',
      grade: '10',
      subject: 'Mathematics',
      board: 'CBSE',
      academicYear: '2024-2025',
      totalChapters: 15,
      totalHours: 120,
      status: 'active',
      createdDate: '2024-01-15',
      lastUpdated: '2024-02-20'
    },
    {
      id: 2,
      title: 'CBSE Class 10 Science',
      description: 'Comprehensive science curriculum covering Physics, Chemistry, and Biology',
      grade: '10',
      subject: 'Science',
      board: 'CBSE',
      academicYear: '2024-2025',
      totalChapters: 18,
      totalHours: 140,
      status: 'active',
      createdDate: '2024-01-16',
      lastUpdated: '2024-02-18'
    },
    {
      id: 3,
      title: 'ICSE Class 9 English',
      description: 'English language and literature curriculum for ICSE Class 9',
      grade: '9',
      subject: 'English',
      board: 'ICSE',
      academicYear: '2024-2025',
      totalChapters: 12,
      totalHours: 90,
      status: 'draft',
      createdDate: '2024-02-01',
      lastUpdated: '2024-02-15'
    }
  ];

  let searchQuery = '';
  let selectedBoard = 'all';
  let selectedGrade = 'all';
  let selectedSubject = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;

  let newCurriculum = {
    title: '',
    description: '',
    grade: '10',
    subject: 'General',
    board: 'CBSE',
    academicYear: '2024-2025',
    totalChapters: 10,
    totalHours: 80
  };

  const boards = [
    { id: 'all', name: 'All Boards' },
    { id: 'cbse', name: 'CBSE' },
    { id: 'icse', name: 'ICSE' },
    { id: 'state', name: 'State Board' },
    { id: 'ib', name: 'IB' }
  ];

  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: '6', name: 'Grade 6' },
    { id: '7', name: 'Grade 7' },
    { id: '8', name: 'Grade 8' },
    { id: '9', name: 'Grade 9' },
    { id: '10', name: 'Grade 10' },
    { id: '11', name: 'Grade 11' },
    { id: '12', name: 'Grade 12' }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'english', name: 'English' },
    { id: 'social-studies', name: 'Social Studies' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'computer-science', name: 'Computer Science' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'draft', name: 'Draft' },
    { id: 'archived', name: 'Archived' }
  ];

  $: filteredCurricula = curricula.filter(curriculum => {
    const matchesSearch = curriculum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         curriculum.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         curriculum.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBoard = selectedBoard === 'all' || curriculum.board.toLowerCase() === selectedBoard;
    const matchesGrade = selectedGrade === 'all' || curriculum.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || curriculum.subject.toLowerCase().replace(' ', '-') === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || curriculum.status === selectedStatus;
    return matchesSearch && matchesBoard && matchesGrade && matchesSubject && matchesStatus;
  });

  function addCurriculum() {
    if (!newCurriculum.title || !newCurriculum.subject) return;

    const curriculum = {
      id: curricula.length + 1,
      ...newCurriculum,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    curricula = [...curricula, curriculum];
    resetNewCurriculum();
    showAddModal = false;
  }

  function resetNewCurriculum() {
    newCurriculum = {
      title: '',
      description: '',
      grade: '10',
      subject: 'General',
      board: 'CBSE',
      academicYear: '2024-2025',
      totalChapters: 10,
      totalHours: 80
    };
  }

  function deleteCurriculum(curriculumId) {
    curricula = curricula.filter(curriculum => curriculum.id !== curriculumId);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getBoardColor(board) {
    switch (board.toLowerCase()) {
      case 'cbse': return 'bg-blue-100 text-blue-800';
      case 'icse': return 'bg-purple-100 text-purple-800';
      case 'state': return 'bg-green-100 text-green-800';
      case 'ib': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Curriculum Management</h1>
      <p class="text-base-content/70 mt-1">Manage educational curricula and course structures</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Curriculum
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:book-open-page-variant" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Curricula</div>
      <div class="stat-value text-primary">{curricula.length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-success">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Curricula</div>
      <div class="stat-value text-success">{curricula.filter(c => c.status === 'active').length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-info">
        <Icon icon="mdi:file-document" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Chapters</div>
      <div class="stat-value text-info">{curricula.reduce((sum, c) => sum + c.totalChapters, 0)}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:clock-outline" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Hours</div>
      <div class="stat-value text-warning">{curricula.reduce((sum, c) => sum + c.totalHours, 0)}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-6 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Curricula</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, subject..."
          class="input input-bordered"
        />
      </div>

      <!-- Board Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Board</span>
        </label>
        <select bind:value={selectedBoard} class="select select-bordered">
          {#each boards as board}
            <option value={board.id}>{board.name}</option>
          {/each}
        </select>
      </div>

      <!-- Grade Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Grade</span>
        </label>
        <select bind:value={selectedGrade} class="select select-bordered">
          {#each grades as grade}
            <option value={grade.id}>{grade.name}</option>
          {/each}
        </select>
      </div>

      <!-- Subject Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Subject</span>
        </label>
        <select bind:value={selectedSubject} class="select select-bordered">
          {#each subjects as subject}
            <option value={subject.id}>{subject.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered">
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Curricula Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each filteredCurricula as curriculum (curriculum.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <h3 class="card-title text-lg">{curriculum.title}</h3>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Edit</a></li>
                <li><a>View Details</a></li>
                <li><a>Manage Chapters</a></li>
                <li><a class="text-error" on:click={() => deleteCurriculum(curriculum.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <p class="text-base-content/70 text-sm mb-4 line-clamp-2">{curriculum.description}</p>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:school" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">Grade {curriculum.grade} • {curriculum.subject}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:calendar" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">{curriculum.academicYear}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:book-open" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">{curriculum.totalChapters} chapters • {curriculum.totalHours} hours</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span class="badge {getBoardColor(curriculum.board)} badge-sm">{curriculum.board}</span>
            <span class="badge badge-outline badge-sm">Grade {curriculum.grade}</span>
            <span class="badge {getStatusColor(curriculum.status)} badge-sm">{curriculum.status}</span>
          </div>

          <div class="text-xs text-base-content/60 mb-4">
            Last updated: {curriculum.lastUpdated}
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">
              <Icon icon="mdi:eye" class="w-4 h-4" />
              View Details
            </button>
            <button class="btn btn-outline btn-sm">
              <Icon icon="mdi:pencil" class="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredCurricula.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:book-open-page-variant-off" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No curricula found</h3>
      <p class="text-base-content/50">Try adjusting your search or filter criteria</p>
    </div>
  {/if}
</div>

<!-- Add Curriculum Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-bold">Add New Curriculum</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form on:submit|preventDefault={addCurriculum} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Curriculum Title *</span>
              </label>
              <input
                type="text"
                bind:value={newCurriculum.title}
                placeholder="Enter curriculum title"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Subject *</span>
              </label>
              <select bind:value={newCurriculum.subject} class="select select-bordered" required>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Hindi">Hindi</option>
                <option value="Computer Science">Computer Science</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newCurriculum.description}
              placeholder="Curriculum description..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Board</span>
              </label>
              <select bind:value={newCurriculum.board} class="select select-bordered">
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Grade</span>
              </label>
              <select bind:value={newCurriculum.grade} class="select select-bordered">
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Academic Year</span>
              </label>
              <input
                type="text"
                bind:value={newCurriculum.academicYear}
                placeholder="2024-2025"
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Total Chapters</span>
              </label>
              <input
                type="number"
                bind:value={newCurriculum.totalChapters}
                min="1"
                class="input input-bordered"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Total Hours</span>
              </label>
              <input
                type="number"
                bind:value={newCurriculum.totalHours}
                min="1"
                class="input input-bordered"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => { showAddModal = false; resetNewCurriculum(); }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={addCurriculum}
          class="btn btn-primary"
          disabled={!newCurriculum.title || !newCurriculum.subject}
        >
          Add Curriculum
        </button>
      </div>
    </div>
  </div>
{/if}