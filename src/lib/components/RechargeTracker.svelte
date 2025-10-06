<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { theme } from "../stores/theme.js";
  import { monthlyRecharges, familyMembers, PaymentStatus } from "../data/family.js";

  export let viewMode = "grid"; // "grid" or "list"
  export let filterStatus = "all"; // "all", "upcoming", "paid", "overdue", "pending"
  export let sortBy = "dueDate"; // "dueDate", "amount", "provider", "type"

  let searchTerm = "";
  let showFilters = false;
  let recharges = [...monthlyRecharges];

  // Filter and sort recharges
  $: filteredRecharges = recharges
    .filter((recharge) => {
      // Status filter
      if (filterStatus !== "all" && recharge.status !== filterStatus) return false;

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return recharge.provider.toLowerCase().includes(search) || recharge.type.toLowerCase().includes(search) || recharge.assignedTo.name.toLowerCase().includes(search) || (recharge.number && recharge.number.includes(search));
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount;
        case "provider":
          return a.provider.localeCompare(b.provider);
        case "type":
          return a.type.localeCompare(b.type);
        case "dueDate":
        default:
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });

  // Summary statistics
  $: totalAmount = filteredRecharges.reduce((sum, r) => sum + r.amount, 0);
  $: upcomingCount = recharges.filter((r) => r.status === PaymentStatus.UPCOMING).length;
  $: overdueCount = recharges.filter((r) => r.status === PaymentStatus.OVERDUE).length;
  $: paidCount = recharges.filter((r) => r.status === PaymentStatus.PAID).length;

  function getStatusIcon(status) {
    switch (status) {
      case PaymentStatus.PAID:
        return "heroicons:check-circle";
      case PaymentStatus.PENDING:
        return "heroicons:clock";
      case PaymentStatus.OVERDUE:
        return "heroicons:exclamation-triangle";
      case PaymentStatus.UPCOMING:
        return "heroicons:calendar-days";
      default:
        return "heroicons:question-mark-circle";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case PaymentStatus.PAID:
        return "text-green-600 bg-green-50";
      case PaymentStatus.PENDING:
        return "text-yellow-600 bg-yellow-50";
      case PaymentStatus.OVERDUE:
        return "text-red-600 bg-red-50";
      case PaymentStatus.UPCOMING:
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "mobile":
        return "heroicons:device-phone-mobile";
      case "broadband":
        return "heroicons:wifi";
      case "dth":
        return "heroicons:tv";
      case "electricity":
        return "heroicons:bolt";
      case "water":
        return "heroicons:beaker";
      case "gas":
        return "heroicons:fire";
      case "streaming":
        return "heroicons:play-circle";
      default:
        return "heroicons:credit-card";
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays <= 7) return `Due in ${diffDays} days`;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  }

  function markAsPaid(rechargeId) {
    recharges = recharges.map((r) => (r.id === rechargeId ? { ...r, status: PaymentStatus.PAID } : r));
  }

  function markAsPending(rechargeId) {
    recharges = recharges.map((r) => (r.id === rechargeId ? { ...r, status: PaymentStatus.PENDING } : r));
  }

  function sendReminder(recharge) {
    // This would integrate with SMS/WhatsApp service
    alert(`Reminder sent to ${recharge.assignedTo.name} for ${recharge.provider} ${recharge.type}`);
  }
</script>

<div class="space-y-6">
  <!-- Header with Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Total Monthly</p>
          <p class="text-xl font-bold text-blue-600">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-amber-100 rounded-lg">
          <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Upcoming</p>
          <p class="text-xl font-bold text-amber-600">{upcomingCount}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-red-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-red-100 rounded-lg">
          <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Overdue</p>
          <p class="text-xl font-bold text-red-600">{overdueCount}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-green-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-green-100 rounded-lg">
          <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Paid</p>
          <p class="text-xl font-bold text-green-600">{paidCount}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="bg-white rounded-lg p-4 shadow-sm border">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <!-- Search -->
      <div class="relative flex-1 max-w-md">
        <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search recharges..." bind:value={searchTerm} class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <!-- View and Filter Controls -->
      <div class="flex items-center space-x-4">
        <!-- View Toggle -->
        <div class="flex items-center bg-gray-100 rounded-lg p-1">
          <button class="p-2 rounded-md transition-colors {viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}" on:click={() => (viewMode = "grid")}>
            <Icon icon="heroicons:squares-2x2" class="w-4 h-4" />
          </button>
          <button class="p-2 rounded-md transition-colors {viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}" on:click={() => (viewMode = "list")}>
            <Icon icon="heroicons:list-bullet" class="w-4 h-4" />
          </button>
        </div>

        <!-- Filter Toggle -->
        <button class="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" on:click={() => (showFilters = !showFilters)}>
          <Icon icon="heroicons:funnel" class="w-4 h-4" />
          <span class="text-sm">Filters</span>
        </button>
      </div>
    </div>

    <!-- Filter Panel -->
    {#if showFilters}
      <div class="mt-4 pt-4 border-t border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select bind:value={filterStatus} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <!-- Sort By -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select bind:value={sortBy} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="dueDate">Due Date</option>
              <option value="amount">Amount</option>
              <option value="provider">Provider</option>
              <option value="type">Type</option>
            </select>
          </div>

          <!-- Clear Filters -->
          <div class="flex items-end">
            <button
              class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              on:click={() => {
                searchTerm = "";
                filterStatus = "all";
                sortBy = "dueDate";
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Recharge Items -->
  <div class="space-y-4">
    {#if filteredRecharges.length === 0}
      <div class="text-center py-12 bg-white rounded-lg border">
        <Icon icon="heroicons:inbox" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No recharges found</h3>
        <p class="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    {:else if viewMode === "grid"}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredRecharges as recharge (recharge.id)}
          <div class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
            <div class="p-4">
              <!-- Header -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-gray-100 rounded-lg">
                    <Icon icon={getTypeIcon(recharge.type)} class="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{recharge.provider}</h3>
                    <p class="text-sm text-gray-500 capitalize">{recharge.type}</p>
                  </div>
                </div>
                <span class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(recharge.status)}">
                  {recharge.status}
                </span>
              </div>

              <!-- Details -->
              <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Amount</span>
                  <span class="text-sm font-semibold">{formatCurrency(recharge.amount)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Due Date</span>
                  <span class="text-sm font-medium">{formatDate(recharge.dueDate)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Assigned To</span>
                  <span class="text-sm font-medium">{recharge.assignedTo.name}</span>
                </div>
                {#if recharge.number}
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Number</span>
                    <span class="text-sm font-mono">{recharge.number}</span>
                  </div>
                {/if}
              </div>

              <!-- Actions -->
              <div class="flex space-x-2">
                {#if recharge.status !== PaymentStatus.PAID}
                  <button class="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors" on:click={() => markAsPaid(recharge.id)}> Mark Paid </button>
                {/if}
                <button class="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors" on:click={() => sendReminder(recharge)}>
                  <Icon icon="heroicons:paper-airplane" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- List View -->
      <div class="bg-white rounded-lg border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each filteredRecharges as recharge (recharge.id)}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="p-2 bg-gray-100 rounded-lg mr-3">
                        <Icon icon={getTypeIcon(recharge.type)} class="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{recharge.provider}</div>
                        <div class="text-sm text-gray-500 capitalize">{recharge.type}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(recharge.amount)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(recharge.dueDate)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recharge.assignedTo.name}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(recharge.status)}">
                      {recharge.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {#if recharge.status !== PaymentStatus.PAID}
                      <button class="text-green-600 hover:text-green-900" on:click={() => markAsPaid(recharge.id)}> Mark Paid </button>
                    {/if}
                    <button class="text-blue-600 hover:text-blue-900" on:click={() => sendReminder(recharge)}> Remind </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>
