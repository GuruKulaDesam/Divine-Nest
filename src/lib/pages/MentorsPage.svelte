<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let mentors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      subject: 'Mathematics',
      experience: '15 years',
      rating: 4.8,
      students: 245,
      specialization: 'Advanced Calculus, Algebra',
      availability: 'Mon-Fri: 6-8 PM',
      contact: '+91-98765-43210',
      email: 'rajesh.kumar@example.com',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mrs. Priya Sharma',
      subject: 'English Literature',
      experience: '12 years',
      rating: 4.9,
      students: 189,
      specialization: 'Shakespeare, Modern Literature',
      availability: 'Tue-Sat: 5-7 PM',
      contact: '+91-98765-43211',
      email: 'priya.sharma@example.com',
      status: 'active'
    },
    {
      id: 3,
      name: 'Mr. Arjun Patel',
      subject: 'Physics',
      experience: '18 years',
      rating: 4.7,
      students: 312,
      specialization: 'Quantum Physics, Mechanics',
      availability: 'Mon-Wed: 7-9 PM',
      contact: '+91-98765-43212',
      email: 'arjun.patel@example.com',
      status: 'active'
    }
  ];

  let searchQuery = '';
  let selectedSubject = 'all';
  let selectedRating = 'all';

  $: filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || mentor.subject === selectedSubject;
    const matchesRating = selectedRating === 'all' ||
                         (selectedRating === '4.5+' && mentor.rating >= 4.5) ||
                         (selectedRating === '4.0+' && mentor.rating >= 4.0);

    return matchesSearch && matchesSubject && matchesRating;
  });

  const subjects = ['all', ...new Set(mentors.map(m => m.subject))];
  const ratings = ['all', '4.0+', '4.5+'];

  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
  }

  function getStatusColor(status) {
    return status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100';
  }

  function getRatingColor(rating) {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Mentors</h1>
      <p class="text-base-content/70 mt-1">Connect with experienced mentors for academic guidance</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        Add Mentor
      </button>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Mentors</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name, subject..."
          class="input input-bordered w-full"
        />
      </div>

      <!-- Subject Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Subject</span>
        </label>
        <select bind:value={selectedSubject} class="select select-bordered w-full">
          {#each subjects as subject}
            <option value={subject}>
              {subject === 'all' ? 'All Subjects' : subject}
            </option>
          {/each}
        </select>
      </div>

      <!-- Rating Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Minimum Rating</span>
        </label>
        <select bind:value={selectedRating} class="select select-bordered w-full">
          {#each ratings as rating}
            <option value={rating}>
              {rating === 'all' ? 'All Ratings' : rating}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-blue-100 rounded-lg">
          <Icon icon="mdi:account-group" class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/70">Total Mentors</p>
          <p class="text-2xl font-bold text-base-content">{mentors.length}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-green-100 rounded-lg">
          <Icon icon="mdi:school" class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/70">Active Mentors</p>
          <p class="text-2xl font-bold text-base-content">{mentors.filter(m => m.status === 'active').length}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-yellow-100 rounded-lg">
          <Icon icon="mdi:account-multiple" class="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/70">Total Students</p>
          <p class="text-2xl font-bold text-base-content">{mentors.reduce((sum, m) => sum + m.students, 0)}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-purple-100 rounded-lg">
          <Icon icon="mdi:star" class="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/70">Avg Rating</p>
          <p class="text-2xl font-bold text-base-content">
            {(mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mentors Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredMentors as mentor}
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow">
        <!-- Header -->
        <div class="p-6 border-b border-base-300">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {mentor.name.charAt(0)}
              </div>
              <div>
                <h3 class="font-semibold text-base-content">{mentor.name}</h3>
                <p class="text-sm text-base-content/70">{mentor.subject}</p>
              </div>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(mentor.status)}">
              {mentor.status}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <!-- Rating & Experience -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium {getRatingColor(mentor.rating)}">
                {getRatingStars(mentor.rating)}
              </span>
              <span class="text-sm text-base-content/70">({mentor.rating})</span>
            </div>
            <span class="text-sm text-base-content/70">{mentor.experience}</span>
          </div>

          <!-- Specialization -->
          <div>
            <p class="text-sm font-medium text-base-content mb-1">Specialization</p>
            <p class="text-sm text-base-content/70">{mentor.specialization}</p>
          </div>

          <!-- Students -->
          <div class="flex items-center gap-2">
            <Icon icon="mdi:account-multiple" class="w-4 h-4 text-base-content/50" />
            <span class="text-sm text-base-content/70">{mentor.students} students</span>
          </div>

          <!-- Availability -->
          <div>
            <p class="text-sm font-medium text-base-content mb-1">Availability</p>
            <p class="text-sm text-base-content/70">{mentor.availability}</p>
          </div>

          <!-- Contact -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:phone" class="w-4 h-4 text-base-content/50" />
              <span class="text-sm text-base-content/70">{mentor.contact}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:email" class="w-4 h-4 text-base-content/50" />
              <span class="text-sm text-base-content/70">{mentor.email}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-6 border-t border-base-300 bg-base-200/50">
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm flex-1">
              <Icon icon="mdi:calendar" class="w-4 h-4" />
              Book Session
            </button>
            <button class="btn btn-outline btn-sm">
              <Icon icon="mdi:message" class="w-4 h-4" />
              Message
            </button>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-4 h-4" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>View Profile</a></li>
                <li><a>View Reviews</a></li>
                <li><a class="text-error">Report</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredMentors.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:account-search" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content mb-2">No mentors found</h3>
      <p class="text-base-content/70">Try adjusting your search criteria or filters</p>
    </div>
  {/if}
</div>