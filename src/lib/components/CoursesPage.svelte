<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let courses = [
    {
      id: 1,
      title: 'Mathematics',
      description: 'Advanced mathematics including calculus, algebra, and geometry',
      instructor: 'Dr. Rajesh Kumar',
      duration: '6 months',
      level: 'Intermediate',
      category: 'STEM',
      enrolled: 45,
      maxStudents: 50,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      schedule: 'Mon, Wed, Fri - 2:00 PM to 4:00 PM'
    },
    {
      id: 2,
      title: 'English Literature',
      description: 'Comprehensive study of classic and modern English literature',
      instructor: 'Prof. Meera Sharma',
      duration: '4 months',
      level: 'Beginner',
      category: 'Languages',
      enrolled: 32,
      maxStudents: 40,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-05-30',
      schedule: 'Tue, Thu - 10:00 AM to 12:00 PM'
    },
    {
      id: 3,
      title: 'Computer Science Fundamentals',
      description: 'Introduction to programming, algorithms, and data structures',
      instructor: 'Mr. Arjun Patel',
      duration: '8 months',
      level: 'Beginner',
      category: 'Technology',
      enrolled: 28,
      maxStudents: 35,
      status: 'upcoming',
      startDate: '2024-03-01',
      endDate: '2024-10-30',
      schedule: 'Mon, Wed, Sat - 9:00 AM to 11:00 AM'
    }
  ];

  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedLevel = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;

  let newCourse = {
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    category: 'General',
    maxStudents: 30,
    startDate: '',
    endDate: '',
    schedule: ''
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'mdi:school' },
    { id: 'stem', name: 'STEM', icon: 'mdi:calculator' },
    { id: 'languages', name: 'Languages', icon: 'mdi:translate' },
    { id: 'technology', name: 'Technology', icon: 'mdi:laptop' },
    { id: 'arts', name: 'Arts', icon: 'mdi:palette' },
    { id: 'business', name: 'Business', icon: 'mdi:briefcase' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' }
  ];

  $: filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  function addCourse() {
    if (!newCourse.title || !newCourse.instructor || !newCourse.startDate) return;

    const course = {
      id: courses.length + 1,
      ...newCourse,
      enrolled: 0,
      status: 'upcoming'
    };

    courses = [...courses, course];
    resetNewCourse();
    showAddModal = false;
  }

  function resetNewCourse() {
    newCourse = {
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      category: 'General',
      maxStudents: 30,
      startDate: '',
      endDate: '',
      schedule: ''
    };
  }

  function deleteCourse(courseId) {
    courses = courses.filter(course => course.id !== courseId);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getLevelColor(level) {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-emerald-100 text-emerald-800';
      case 'intermediate': return 'bg-amber-100 text-amber-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Course Management</h1>
      <p class="text-base-content/70 mt-1">Manage educational courses and enrollments</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Course
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:school" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Courses</div>
      <div class="stat-value text-primary">{courses.length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-success">
        <Icon icon="mdi:account-check" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Courses</div>
      <div class="stat-value text-success">{courses.filter(c => c.status === 'active').length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-info">
        <Icon icon="mdi:account-group" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Enrolled</div>
      <div class="stat-value text-info">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:calendar-clock" class="w-8 h-8" />
      </div>
      <div class="stat-title">Upcoming</div>
      <div class="stat-value text-warning">{courses.filter(c => c.status === 'upcoming').length}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-6 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Courses</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, instructor..."
          class="input input-bordered"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered">
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>

      <!-- Level Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Level</span>
        </label>
        <select bind:value={selectedLevel} class="select select-bordered">
          {#each levels as level}
            <option value={level.id}>{level.name}</option>
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

  <!-- Courses Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each filteredCourses as course (course.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <h3 class="card-title text-lg">{course.title}</h3>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Edit</a></li>
                <li><a>View Details</a></li>
                <li><a class="text-error" on:click={() => deleteCourse(course.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <p class="text-base-content/70 text-sm mb-4 line-clamp-2">{course.description}</p>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:account-tie" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">{course.instructor}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:clock-outline" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">{course.duration}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:calendar" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">{course.schedule}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span class="badge {getLevelColor(course.level)} badge-sm">{course.level}</span>
            <span class="badge badge-outline badge-sm">{course.category}</span>
            <span class="badge {getStatusColor(course.status)} badge-sm">{course.status}</span>
          </div>

          <div class="flex justify-between items-center text-sm mb-4">
            <span class="text-base-content/60">Enrolled: {course.enrolled}/{course.maxStudents}</span>
            <div class="w-20 bg-base-200 rounded-full h-2">
              <div
                class="bg-primary h-2 rounded-full"
                style="width: {(course.enrolled / course.maxStudents) * 100}%"
              ></div>
            </div>
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">
              <Icon icon="mdi:eye" class="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredCourses.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:school-off" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No courses found</h3>
      <p class="text-base-content/50">Try adjusting your search or filter criteria</p>
    </div>
  {/if}
</div>

<!-- Add Course Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-bold">Add New Course</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form on:submit|preventDefault={addCourse} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Course Title *</span>
              </label>
              <input
                type="text"
                bind:value={newCourse.title}
                placeholder="Enter course title"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Instructor *</span>
              </label>
              <input
                type="text"
                bind:value={newCourse.instructor}
                placeholder="Enter instructor name"
                class="input input-bordered"
                required
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newCourse.description}
              placeholder="Course description..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newCourse.category} class="select select-bordered">
                <option value="General">General</option>
                <option value="STEM">STEM</option>
                <option value="Languages">Languages</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Level</span>
              </label>
              <select bind:value={newCourse.level} class="select select-bordered">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Duration</span>
              </label>
              <input
                type="text"
                bind:value={newCourse.duration}
                placeholder="e.g., 6 months"
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Start Date *</span>
              </label>
              <input
                type="date"
                bind:value={newCourse.startDate}
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">End Date</span>
              </label>
              <input
                type="date"
                bind:value={newCourse.endDate}
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Max Students</span>
              </label>
              <input
                type="number"
                bind:value={newCourse.maxStudents}
                min="1"
                class="input input-bordered"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Schedule</span>
              </label>
              <input
                type="text"
                bind:value={newCourse.schedule}
                placeholder="e.g., Mon, Wed, Fri - 2:00 PM"
                class="input input-bordered"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => { showAddModal = false; resetNewCourse(); }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={addCourse}
          class="btn btn-primary"
          disabled={!newCourse.title || !newCourse.instructor || !newCourse.startDate}
        >
          Add Course
        </button>
      </div>
    </div>
  </div>
{/if}