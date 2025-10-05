<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let trips = [
    {
      id: 1,
      title: "Ooty Hill Station Trip",
      type: "leisure",
      status: "planned",
      startDate: "2025-12-15",
      endDate: "2025-12-18",
      destination: "Ooty, Tamil Nadu",
      participants: ["Appa", "Amma", "Akka", "Paati"],
      budget: "₹25,000",
      bookingStatus: "In Progress",
      description: "Family vacation to enjoy cool weather and tea gardens",
      activities: ["Tea Garden Visit", "Botanical Garden", "Toy Train", "Lake Boating"],
      accommodation: "Hotel Taj Savoy",
      transport: "Private Car",
    },
    {
      id: 2,
      title: "Madurai Temple Visit",
      type: "spiritual",
      status: "upcoming",
      startDate: "2025-11-25",
      endDate: "2025-11-26",
      destination: "Madurai, Tamil Nadu",
      participants: ["Paati", "Amma", "Akka"],
      budget: "₹8,000",
      bookingStatus: "Confirmed",
      description: "Sacred pilgrimage to Meenakshi Amman Temple",
      activities: ["Temple Darshan", "Evening Aarti", "Local Shopping"],
      accommodation: "Dharamshala near Temple",
      transport: "Train",
    },
    {
      id: 3,
      title: "Pondicherry Beach Holiday",
      type: "leisure",
      status: "completed",
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      destination: "Pondicherry",
      participants: ["Entire Family"],
      budget: "₹18,000",
      bookingStatus: "Completed",
      description: "French colonial architecture and beach relaxation",
      activities: ["Beach Visit", "Aurobindo Ashram", "French Quarter Walk"],
      accommodation: "La Villa Helena",
      transport: "Private Car",
    },
  ];

  let communityEvents = [
    {
      id: 1,
      title: "Karthigai Deepam Celebration",
      date: "2025-11-14",
      location: "Community Hall, Anna Nagar",
      organizer: "Cultural Association",
      participants: 150,
      type: "cultural",
      description: "Traditional lamp lighting festival celebration",
    },
    {
      id: 2,
      title: "Tamil New Year Feast",
      date: "2025-04-14",
      location: "Temple Grounds",
      organizer: "Temple Committee",
      participants: 300,
      type: "cultural",
      description: "Community feast with traditional South Indian dishes",
    },
    {
      id: 3,
      title: "Classical Music Concert",
      date: "2025-12-20",
      location: "Music Academy",
      organizer: "Music Society",
      participants: 200,
      type: "cultural",
      description: "Carnatic music performance by renowned artists",
    },
  ];

  let leisureActivities = [
    {
      id: 1,
      title: "Weekly Family Movie Night",
      frequency: "Weekly",
      lastDone: "2025-10-05",
      nextScheduled: "2025-10-12",
      location: "Home",
      participants: ["Entire Family"],
      type: "entertainment",
    },
    {
      id: 2,
      title: "Weekend Park Visit",
      frequency: "Bi-weekly",
      lastDone: "2025-09-28",
      nextScheduled: "2025-10-12",
      location: "Guindy National Park",
      participants: ["Appa", "Amma", "Akka"],
      type: "outdoor",
    },
    {
      id: 3,
      title: "Shopping Mall Visit",
      frequency: "Monthly",
      lastDone: "2025-09-15",
      nextScheduled: "2025-10-15",
      location: "Express Avenue",
      participants: ["Amma", "Akka"],
      type: "shopping",
    },
  ];

  let activeTab = "overview";
  let showNewTripForm = false;

  let newTrip = {
    title: "",
    type: "leisure",
    startDate: "",
    endDate: "",
    destination: "",
    budget: "",
    description: "",
    participants: [],
  };

  function getStatusColor(status) {
    switch (status) {
      case "planned":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "upcoming":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "ongoing":
        return "text-green-600 bg-green-50 border-green-200";
      case "completed":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "spiritual":
        return "heroicons:sparkles";
      case "leisure":
        return "heroicons:camera";
      case "cultural":
        return "heroicons:musical-note";
      case "adventure":
        return "heroicons:bolt";
      case "business":
        return "heroicons:briefcase";
      default:
        return "heroicons:map-pin";
    }
  }

  function getTypeColor(type) {
    switch (type) {
      case "spiritual":
        return "text-purple-600";
      case "leisure":
        return "text-blue-600";
      case "cultural":
        return "text-amber-600";
      case "adventure":
        return "text-red-600";
      case "business":
        return "text-gray-600";
      default:
        return "text-green-600";
    }
  }

  function calculateDaysUntil(date) {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  }

  function addTrip() {
    const newId = trips.length + 1;
    trips = [
      ...trips,
      {
        id: newId,
        ...newTrip,
        status: "planned",
        bookingStatus: "In Progress",
        activities: [],
        accommodation: "",
        transport: "",
      },
    ];

    // Reset form
    newTrip = {
      title: "",
      type: "leisure",
      startDate: "",
      endDate: "",
      destination: "",
      budget: "",
      description: "",
      participants: [],
    };

    showNewTripForm = false;
  }

  $: stats = {
    totalTrips: trips.length,
    planned: trips.filter((t) => t.status === "planned").length,
    upcoming: trips.filter((t) => t.status === "upcoming").length,
    completed: trips.filter((t) => t.status === "completed").length,
    totalBudget: trips.reduce((sum, trip) => sum + parseInt(trip.budget.replace(/[₹,]/g, "") || 0), 0),
  };

  $: upcomingTrips = trips.filter((t) => t.status === "upcoming" || t.status === "planned");
  $: upcomingEvents = communityEvents.filter((e) => new Date(e.date) >= new Date());
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">✈️ Travel & Leisure</h1>
        <p class="text-base-content/60">Plan trips, track community events, and organize family leisure activities</p>
      </div>
      <button class="btn btn-primary" on:click={() => (showNewTripForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Plan New Trip
      </button>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Trips</p>
            <p class="text-2xl font-bold text-blue-500">{stats.totalTrips}</p>
          </div>
          <Icon icon="heroicons:map-pin" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Upcoming</p>
            <p class="text-2xl font-bold text-orange-500">{stats.upcoming + stats.planned}</p>
          </div>
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Completed</p>
            <p class="text-2xl font-bold text-green-500">{stats.completed}</p>
          </div>
          <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Budget</p>
            <p class="text-2xl font-bold text-purple-500">₹{stats.totalBudget.toLocaleString()}</p>
          </div>
          <Icon icon="heroicons:banknotes" class="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'overview' ? 'tab-active' : ''}" on:click={() => (activeTab = "overview")}>
      <Icon icon="heroicons:home" class="w-4 h-4 mr-2" />
      Overview
    </button>
    <button class="tab {activeTab === 'trips' ? 'tab-active' : ''}" on:click={() => (activeTab = "trips")}>
      <Icon icon="heroicons:map-pin" class="w-4 h-4 mr-2" />
      Travel Planning
    </button>
    <button class="tab {activeTab === 'leisure' ? 'tab-active' : ''}" on:click={() => (activeTab = "leisure")}>
      <Icon icon="heroicons:film" class="w-4 h-4 mr-2" />
      Leisure Activities
    </button>
    <button class="tab {activeTab === 'community' ? 'tab-active' : ''}" on:click={() => (activeTab = "community")}>
      <Icon icon="heroicons:users" class="w-4 h-4 mr-2" />
      Community Events
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Upcoming Trips -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Upcoming Trips</h3>
          <div class="space-y-3">
            {#each upcomingTrips.slice(0, 3) as trip}
              <div class="p-3 bg-base-200 rounded-lg border-l-4 {getStatusColor(trip.status)}">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center space-x-2">
                      <Icon icon={getTypeIcon(trip.type)} class="w-5 h-5 {getTypeColor(trip.type)}" />
                      <p class="font-medium text-base-content">{trip.title}</p>
                    </div>
                    <p class="text-sm text-base-content/60">{trip.destination}</p>
                    <p class="text-sm text-base-content/60">{trip.startDate} • {calculateDaysUntil(trip.startDate)}</p>
                  </div>
                  <span class="text-xs badge {getStatusColor(trip.status)}">{trip.status}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Community Events -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Upcoming Community Events</h3>
          <div class="space-y-3">
            {#each upcomingEvents.slice(0, 3) as event}
              <div class="p-3 bg-base-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-base-content">{event.title}</p>
                    <p class="text-sm text-base-content/60">{event.location}</p>
                    <p class="text-sm text-base-content/60">{event.date} • {calculateDaysUntil(event.date)}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium">{event.participants}</p>
                    <p class="text-xs text-base-content/60">participants</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "trips"}
    <div class="space-y-4">
      {#each trips as trip}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getTypeIcon(trip.type)} class="w-6 h-6 text-primary" />
                  <h4 class="font-bold text-base-content">{trip.title}</h4>
                  <span class="badge {getStatusColor(trip.status)} badge-sm">{trip.status}</span>
                  <span class="badge badge-outline badge-sm">{trip.type}</span>
                </div>
                <p class="text-base-content/80 mb-3">{trip.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span class="text-base-content/60">Destination:</span>
                    <p class="font-medium">{trip.destination}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Dates:</span>
                    <p class="font-medium">{trip.startDate} to {trip.endDate}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Budget:</span>
                    <p class="font-medium">{trip.budget}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Booking:</span>
                    <p class="font-medium">{trip.bookingStatus}</p>
                  </div>
                </div>
                <div class="mb-3">
                  <span class="text-base-content/60">Participants:</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    {#each trip.participants as participant}
                      <span class="badge badge-outline badge-sm">{participant}</span>
                    {/each}
                  </div>
                </div>
                {#if trip.activities.length > 0}
                  <div>
                    <span class="text-base-content/60">Activities:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      {#each trip.activities as activity}
                        <span class="badge badge-primary badge-sm">{activity}</span>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary">Edit</button>
                <button class="btn btn-sm btn-outline">Share</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "leisure"}
    <div class="space-y-4">
      {#each leisureActivities as activity}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h4 class="font-bold text-base-content mb-2">{activity.title}</h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Frequency:</span>
                    <p class="font-medium">{activity.frequency}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Last Done:</span>
                    <p class="font-medium">{activity.lastDone}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Next:</span>
                    <p class="font-medium">{activity.nextScheduled}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Location:</span>
                    <p class="font-medium">{activity.location}</p>
                  </div>
                </div>
                <div class="mt-2">
                  <span class="text-base-content/60">Participants:</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    {#each activity.participants as participant}
                      <span class="badge badge-outline badge-sm">{participant}</span>
                    {/each}
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <span class="badge badge-primary">{activity.type}</span>
                <button class="btn btn-sm btn-outline">Schedule</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "community"}
    <div class="space-y-4">
      {#each communityEvents as event}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-bold text-base-content mb-2">{event.title}</h4>
                <p class="text-base-content/80 mb-3">{event.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Date:</span>
                    <p class="font-medium">{event.date}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Location:</span>
                    <p class="font-medium">{event.location}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Organizer:</span>
                    <p class="font-medium">{event.organizer}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end space-y-2 ml-4">
                <span class="badge badge-secondary">{event.type}</span>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary">{event.participants}</p>
                  <p class="text-xs text-base-content/60">participants</p>
                </div>
                <button class="btn btn-sm btn-primary">Join</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Trip Modal -->
{#if showNewTripForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Plan New Trip</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Trip Title</span>
          </label>
          <input type="text" placeholder="e.g., Ooty Hill Station Trip" class="input input-bordered" bind:value={newTrip.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Trip Type</span>
            </label>
            <select class="select select-bordered" bind:value={newTrip.type}>
              <option value="leisure">Leisure</option>
              <option value="spiritual">Spiritual</option>
              <option value="cultural">Cultural</option>
              <option value="adventure">Adventure</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Budget</span>
            </label>
            <input type="text" placeholder="e.g., ₹25,000" class="input input-bordered" bind:value={newTrip.budget} />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Destination</span>
          </label>
          <input type="text" placeholder="e.g., Ooty, Tamil Nadu" class="input input-bordered" bind:value={newTrip.destination} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Start Date</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={newTrip.startDate} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">End Date</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={newTrip.endDate} />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="Describe the trip purpose and highlights..." bind:value={newTrip.description}></textarea>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewTripForm = false)}>Cancel</button>
        <button class="btn btn-primary" on:click={addTrip}>Plan Trip</button>
      </div>
    </div>
  </div>
{/if}
