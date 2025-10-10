<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let activeTab = "visits";

  // Temple data for South Indian temples
  let temples = [
    {
      id: 1,
      name: "Marudamalai Murugan Temple",
      location: "Coimbatore",
      distance: "15 km",
      deity: "Lord Murugan",
      speciality: "Hill temple, peaceful environment",
      bestTime: "Early morning 6 AM - 8 AM",
      darshan: "Free",
      lastVisit: "2025-09-15",
      rating: 5,
      notes: "Perfect for morning prayers, less crowded",
    },
    {
      id: 2,
      name: "Perur Pateeswarar Temple",
      location: "Coimbatore",
      distance: "12 km",
      deity: "Lord Shiva",
      speciality: "Ancient Chola period temple",
      bestTime: "Evening 5 PM - 7 PM",
      darshan: "Free",
      lastVisit: "2025-08-20",
      rating: 5,
      notes: "Beautiful architecture, very peaceful",
    },
    {
      id: 3,
      name: "Meenakshi Amman Temple",
      location: "Madurai",
      distance: "200 km",
      deity: "Goddess Meenakshi & Lord Sundareswarar",
      speciality: "Famous temple with stunning architecture",
      bestTime: "Early morning 5 AM - 7 AM",
      darshan: "₹50 for special darshan",
      lastVisit: "2025-07-10",
      rating: 5,
      notes: "Must visit during Chithirai festival",
    },
    {
      id: 4,
      name: "Ramanathaswamy Temple",
      location: "Rameswaram",
      distance: "350 km",
      deity: "Lord Ramanathaswamy (Shiva)",
      speciality: "One of 12 Jyotirlingas, sacred pilgrimage",
      bestTime: "Early morning 4:30 AM - 6 AM",
      darshan: "₹25 for darshan",
      lastVisit: null,
      rating: 0,
      notes: "Plan 2-day trip, book accommodation in advance",
    },
  ];

  let plannedVisits = [
    {
      temple: "Ramanathaswamy Temple",
      date: "2025-10-15",
      participants: ["Paati", "Appa", "Amma", "Akka"],
      transport: "Car",
      accommodation: "Hotel Rameswaram Grand",
      budget: "₹8,000",
      status: "planned",
    },
    {
      temple: "Marudamalai Murugan Temple",
      date: "2025-10-08",
      participants: ["Family"],
      transport: "Car",
      accommodation: "Day trip",
      budget: "₹500",
      status: "confirmed",
    },
  ];

  let ritualPlanner = [
    {
      ritual: "Daily Morning Prayers",
      temple: "Home altar",
      time: "6:00 AM",
      participants: ["Paati", "Amma"],
      items: ["Flowers", "Incense", "Camphor", "Fruits"],
      completed: true,
    },
    {
      ritual: "Friday Lakshmi Pooja",
      temple: "Home altar",
      time: "7:00 PM",
      participants: ["Family"],
      items: ["Lotus flowers", "Turmeric", "Kumkum", "Coconut", "Sweets"],
      completed: false,
    },
    {
      ritual: "Monthly Pradosham",
      temple: "Perur Temple",
      time: "Evening",
      participants: ["Paati", "Appa"],
      items: ["Bilva leaves", "Milk", "Honey"],
      completed: false,
    },
  ];

  function getStatusColor(status) {
    switch (status) {
      case "planned":
        return "text-blue-600 bg-blue-100";
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  }
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-base-content mb-2">🛕 Temple Visits & Spiritual Journey</h1>
    <p class="text-base-content/60">Plan temple visits, track darshan timings, and organize spiritual practices</p>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Temples Visited</p>
            <p class="text-2xl font-bold text-orange-500">{temples.filter((t) => t.lastVisit !== null).length}</p>
          </div>
          <Icon icon="heroicons:building-storefront" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Planned Visits</p>
            <p class="text-2xl font-bold text-blue-500">{plannedVisits.length}</p>
          </div>
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Daily Rituals</p>
            <p class="text-2xl font-bold text-green-500">{ritualPlanner.filter((r) => r.completed).length}</p>
          </div>
          <Icon icon="heroicons:sparkles" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">This Month</p>
            <p class="text-2xl font-bold text-purple-500">3</p>
            <p class="text-xs text-base-content/60">visits planned</p>
          </div>
          <Icon icon="heroicons:map-pin" class="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'visits' ? 'tab-active' : ''}" on:click={() => (activeTab = "visits")}>
      <Icon icon="heroicons:building-storefront" class="w-4 h-4 mr-2" />
      Temple Visits
    </button>
    <button class="tab {activeTab === 'planner' ? 'tab-active' : ''}" on:click={() => (activeTab = "planner")}>
      <Icon icon="heroicons:calendar-days" class="w-4 h-4 mr-2" />
      Visit Planner
    </button>
    <button class="tab {activeTab === 'rituals' ? 'tab-active' : ''}" on:click={() => (activeTab = "rituals")}>
      <Icon icon="heroicons:sparkles" class="w-4 h-4 mr-2" />
      Ritual Tracker
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "visits"}
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-base-content">Temple Directory</h3>
        <button class="btn btn-primary">
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          Add Temple
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each temples as temple}
          <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
            <div class="card-body">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="card-title text-base-content">{temple.name}</h3>
                  <p class="text-sm text-base-content/60">{temple.location} • {temple.distance}</p>
                </div>
                <div class="flex items-center space-x-1">
                  {#each Array(temple.rating || 0) as _}
                    <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500 fill-current" />
                  {/each}
                </div>
              </div>

              <div class="space-y-2 mt-4">
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:user" class="w-4 h-4 text-base-content/60" />
                  <span class="text-sm text-base-content">{temple.deity}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:clock" class="w-4 h-4 text-base-content/60" />
                  <span class="text-sm text-base-content">{temple.bestTime}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:currency-rupee" class="w-4 h-4 text-base-content/60" />
                  <span class="text-sm text-base-content">{temple.darshan}</span>
                </div>
                {#if temple.lastVisit}
                  <div class="flex items-center space-x-2">
                    <Icon icon="heroicons:calendar" class="w-4 h-4 text-base-content/60" />
                    <span class="text-sm text-base-content">Last visit: {temple.lastVisit}</span>
                  </div>
                {/if}
              </div>

              <div class="mt-4">
                <p class="text-sm text-base-content/70">{temple.speciality}</p>
                {#if temple.notes}
                  <p class="text-xs text-base-content/60 mt-2 italic">💡 {temple.notes}</p>
                {/if}
              </div>

              <div class="card-actions justify-end mt-4">
                <button class="btn btn-sm btn-outline">View Details</button>
                <button class="btn btn-sm btn-primary">Plan Visit</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if activeTab === "planner"}
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-base-content">Planned Temple Visits</h3>
        <button class="btn btn-primary">
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          Plan New Visit
        </button>
      </div>

      <div class="space-y-4">
        {#each plannedVisits as visit}
          <div class="card bg-base-100 border border-base-300 shadow-sm">
            <div class="card-body">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-bold text-base-content">{visit.temple}</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p class="text-sm text-base-content/60">Date</p>
                      <p class="text-sm font-medium text-base-content">{visit.date}</p>
                    </div>
                    <div>
                      <p class="text-sm text-base-content/60">Participants</p>
                      <p class="text-sm font-medium text-base-content">{visit.participants.join(", ")}</p>
                    </div>
                    <div>
                      <p class="text-sm text-base-content/60">Transport</p>
                      <p class="text-sm font-medium text-base-content">{visit.transport}</p>
                    </div>
                    <div>
                      <p class="text-sm text-base-content/60">Budget</p>
                      <p class="text-sm font-medium text-base-content">{visit.budget}</p>
                    </div>
                  </div>
                  {#if visit.accommodation !== "Day trip"}
                    <div class="mt-2">
                      <p class="text-sm text-base-content/60">Accommodation</p>
                      <p class="text-sm font-medium text-base-content">{visit.accommodation}</p>
                    </div>
                  {/if}
                </div>
                <span class="badge {getStatusColor(visit.status)} capitalize">{visit.status}</span>
              </div>

              <div class="card-actions justify-end mt-4">
                <button class="btn btn-sm btn-outline">Edit Plan</button>
                <button class="btn btn-sm btn-secondary">View Checklist</button>
                {#if visit.status === "planned"}
                  <button class="btn btn-sm btn-primary">Confirm</button>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Trip Planning Checklist -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">🎒 Temple Visit Checklist</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 class="font-semibold text-base-content mb-2">Essential Items</h4>
              <ul class="space-y-1">
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Fresh flowers (jasmine, roses)</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Fruits (bananas, coconut)</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Incense sticks and camphor</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Kumkum and turmeric</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Change of clothes</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-base-content mb-2">Travel Preparation</h4>
              <ul class="space-y-1">
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Check temple timings</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Book accommodation (if overnight)</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Plan travel route</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Pack snacks and water</span>
                </li>
                <li class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-base-content">Carry sufficient cash</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "rituals"}
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-base-content">Daily Ritual Tracker</h3>
        <button class="btn btn-primary">
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          Add Ritual
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each ritualPlanner as ritual}
          <div class="card bg-base-100 border border-base-300 shadow-sm">
            <div class="card-body p-4">
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" class="checkbox checkbox-primary" bind:checked={ritual.completed} />
                  <div>
                    <h4 class="font-medium text-base-content">{ritual.ritual}</h4>
                    <p class="text-sm text-base-content/60">{ritual.temple}</p>
                  </div>
                </div>
                <span class="text-sm text-primary">{ritual.time}</span>
              </div>

              <div class="mt-3">
                <p class="text-sm text-base-content/60">Participants:</p>
                <p class="text-sm text-base-content">{ritual.participants.join(", ")}</p>
              </div>

              <div class="mt-3">
                <p class="text-sm text-base-content/60">Required items:</p>
                <div class="flex flex-wrap gap-1 mt-1">
                  {#each ritual.items as item}
                    <span class="badge badge-outline badge-sm">{item}</span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
