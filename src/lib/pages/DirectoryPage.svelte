<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let directoryEntries = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      type: 'Doctor',
      specialty: 'General Medicine',
      phone: '+91-98765-43210',
      address: '123 Main Street, Kovai',
      rating: 4.8,
      reviews: 45,
      availability: 'Mon-Fri 9AM-6PM',
      emergency: true,
      verified: true
    },
    {
      id: 2,
      name: 'Priya Electricals',
      type: 'Electrician',
      specialty: 'Home Wiring & Repairs',
      phone: '+91-87654-32109',
      address: '456 Power Road, Kovai',
      rating: 4.6,
      reviews: 32,
      availability: '24/7 Emergency Service',
      emergency: true,
      verified: true
    },
    {
      id: 3,
      name: 'Sri Mariamman Temple',
      type: 'Temple',
      specialty: 'Hindu Temple',
      phone: '+91-76543-21098',
      address: '789 Temple Street, Kovai',
      rating: 4.9,
      reviews: 128,
      availability: 'Daily 5AM-9PM',
      emergency: false,
      verified: true
    },
    {
      id: 4,
      name: 'Kovai Public School',
      type: 'Education',
      specialty: 'Primary & Secondary Education',
      phone: '+91-65432-10987',
      address: '321 Education Avenue, Kovai',
      rating: 4.7,
      reviews: 89,
      availability: 'Mon-Sat 8AM-4PM',
      emergency: false,
      verified: true
    },
    {
      id: 5,
      name: 'City Hospital',
      type: 'Hospital',
      specialty: 'Multi-specialty Hospital',
      phone: '+91-54321-09876',
      address: '654 Health Boulevard, Kovai',
      rating: 4.5,
      reviews: 156,
      availability: '24/7 Emergency',
      emergency: true,
      verified: true
    }
  ];

  let selectedCategory = 'all';
  let searchQuery = '';
  let showEmergencyOnly = false;

  const categories = [
    { id: 'all', name: 'All Services', icon: 'mdi:view-list' },
    { id: 'doctor', name: 'Doctors', icon: 'mdi:doctor' },
    { id: 'hospital', name: 'Hospitals', icon: 'mdi:hospital' },
    { id: 'electrician', name: 'Electricians', icon: 'mdi:flash' },
    { id: 'plumber', name: 'Plumbers', icon: 'mdi:pipe' },
    { id: 'mechanic', name: 'Mechanics', icon: 'mdi:wrench' },
    { id: 'temple', name: 'Temples', icon: 'mdi:temple-hindu' },
    { id: 'education', name: 'Education', icon: 'mdi:school' },
    { id: 'grocery', name: 'Grocery Stores', icon: 'mdi:store' },
    { id: 'restaurant', name: 'Restaurants', icon: 'mdi:silverware' },
    { id: 'bank', name: 'Banks', icon: 'mdi:bank' },
    { id: 'police', name: 'Police Station', icon: 'mdi:police-badge' },
    { id: 'fire', name: 'Fire Station', icon: 'mdi:fire-truck' }
  ];

  $: filteredEntries = directoryEntries.filter(entry => {
    const matchesCategory = selectedCategory === 'all' || entry.type.toLowerCase() === selectedCategory;
    const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmergency = !showEmergencyOnly || entry.emergency;
    return matchesCategory && matchesSearch && matchesEmergency;
  });

  function getCategoryIcon(type) {
    const category = categories.find(c => c.id === type.toLowerCase());
    return category ? category.icon : 'mdi:help-circle';
  }

  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return {
      full: fullStars,
      half: hasHalfStar ? 1 : 0,
      empty: emptyStars
    };
  }

  function callNumber(phone) {
    window.open(`tel:${phone}`, '_self');
  }

  function getDirections(address) {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Community Directory</h1>
      <p class="text-base-content/60 mt-1">Find local services, emergency contacts, and community resources</p>
    </div>
    <div class="flex items-center gap-3">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={showEmergencyOnly}
          class="checkbox checkbox-primary"
        />
        <span class="text-sm font-medium">Emergency Services Only</span>
      </label>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:account-group" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Services</div>
      <div class="stat-value text-primary">{directoryEntries.length}</div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-secondary">
        <Icon icon="mdi:ambulance" class="w-8 h-8" />
      </div>
      <div class="stat-title">Emergency Services</div>
      <div class="stat-value text-secondary">{directoryEntries.filter(e => e.emergency).length}</div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-accent">
        <Icon icon="mdi:star" class="w-8 h-8" />
      </div>
      <div class="stat-title">Avg Rating</div>
      <div class="stat-value text-accent">
        {(directoryEntries.reduce((sum, entry) => sum + entry.rating, 0) / directoryEntries.length).toFixed(1)}
      </div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-info">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Verified</div>
      <div class="stat-value text-info">{directoryEntries.filter(e => e.verified).length}</div>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="bg-base-100 rounded-xl p-6 shadow-sm">
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1">
        <div class="relative">
          <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search by name, service, or address..."
            class="input input-bordered w-full pl-10"
          />
        </div>
      </div>
      <!-- Category Filter -->
      <div class="lg:w-64">
        <select bind:value={selectedCategory} class="select select-bordered w-full">
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Category Pills -->
  <div class="flex flex-wrap gap-2">
    {#each categories.slice(1) as category}
      <button
        class="btn btn-sm gap-2 {selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}"
        on:click={() => selectedCategory = category.id}
      >
        <Icon icon={category.icon} class="w-4 h-4" />
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Directory List -->
  <div class="space-y-4">
    {#each filteredEntries as entry}
      <div class="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <!-- Service Icon -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon icon={getCategoryIcon(entry.type)} class="w-6 h-6 text-primary" />
            </div>
          </div>

          <!-- Service Details -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-lg font-semibold text-base-content">{entry.name}</h3>
                  {#if entry.verified}
                    <Icon icon="mdi:check-circle" class="w-5 h-5 text-success" />
                  {/if}
                  {#if entry.emergency}
                    <span class="badge badge-error badge-sm">Emergency</span>
                  {/if}
                </div>

                <p class="text-base-content/70 mb-2">{entry.specialty}</p>
                <p class="text-sm text-base-content/60 mb-3">{entry.address}</p>

                <!-- Rating -->
                <div class="flex items-center gap-2 mb-3">
                  <div class="flex items-center">
                    {#each Array(getRatingStars(entry.rating).full) as _}
                      <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
                    {/each}
                    {#if getRatingStars(entry.rating).half}
                      <Icon icon="mdi:star-half-full" class="w-4 h-4 text-yellow-400" />
                    {/if}
                    {#each Array(getRatingStars(entry.rating).empty) as _}
                      <Icon icon="mdi:star-outline" class="w-4 h-4 text-gray-300" />
                    {/each}
                  </div>
                  <span class="text-sm text-base-content/60">
                    {entry.rating} ({entry.reviews} reviews)
                  </span>
                </div>

                <!-- Availability -->
                <p class="text-sm text-base-content/60 mb-4">
                  <Icon icon="mdi:clock-outline" class="w-4 h-4 inline mr-1" />
                  {entry.availability}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <button
                on:click={() => callNumber(entry.phone)}
                class="btn btn-primary btn-sm gap-2"
              >
                <Icon icon="mdi:phone" class="w-4 h-4" />
                Call
              </button>
              <button
                on:click={() => getDirections(entry.address)}
                class="btn btn-outline btn-sm gap-2"
              >
                <Icon icon="mdi:map-marker" class="w-4 h-4" />
                Directions
              </button>
              <div class="text-sm text-base-content/60">
                {entry.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredEntries.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:account-search" class="w-16 h-16 text-base-content/20 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/60 mb-2">No services found</h3>
      <p class="text-base-content/40">Try adjusting your search criteria or category filter</p>
    </div>
  {/if}
</div>