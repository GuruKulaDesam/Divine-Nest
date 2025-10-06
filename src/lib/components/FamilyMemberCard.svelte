<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { theme } from "../stores/theme.js";
  import { familyMembers, monthlyRecharges, yearlyRenewals } from "../data/family.js";

  export let member;
  export let showDetails = false;
  export let onClick = null;

  // Calculate member's financial summary
  $: memberRecharges = monthlyRecharges.filter((r) => r.assignedTo.id === member.id);
  $: memberRenewals = yearlyRenewals.filter((r) => r.assignedTo.id === member.id);
  $: monthlyTotal = memberRecharges.reduce((sum, r) => sum + r.amount, 0);
  $: yearlyTotal = memberRenewals.reduce((sum, r) => sum + r.amount, 0);
  $: upcomingPayments = memberRecharges.filter((r) => r.status === "upcoming").length;
  $: overduePayments = memberRecharges.filter((r) => r.status === "overdue").length;

  // Get role-specific styling
  $: roleStyle = {
    appa: { bg: "bg-gradient-to-br from-blue-500 to-indigo-600", text: "text-blue-600", border: "border-blue-200" },
    amma: { bg: "bg-gradient-to-br from-pink-500 to-rose-600", text: "text-pink-600", border: "border-pink-200" },
    paati: { bg: "bg-gradient-to-br from-orange-500 to-amber-600", text: "text-orange-600", border: "border-orange-200" },
    thatha: { bg: "bg-gradient-to-br from-purple-500 to-violet-600", text: "text-purple-600", border: "border-purple-200" },
    akka: { bg: "bg-gradient-to-br from-green-500 to-emerald-600", text: "text-green-600", border: "border-green-200" },
    thambi: { bg: "bg-gradient-to-br from-cyan-500 to-teal-600", text: "text-cyan-600", border: "border-cyan-200" },
    chithi: { bg: "bg-gradient-to-br from-yellow-500 to-orange-600", text: "text-yellow-600", border: "border-yellow-200" },
    mama: { bg: "bg-gradient-to-br from-gray-500 to-slate-600", text: "text-gray-600", border: "border-gray-200" },
  }[member.role] || { bg: "bg-gradient-to-br from-gray-500 to-slate-600", text: "text-gray-600", border: "border-gray-200" };

  function handleCardClick() {
    if (onClick) {
      onClick(member);
    }
  }

  function getRoleDisplayName(role) {
    const roleNames = {
      appa: "Appa (Father)",
      amma: "Amma (Mother)",
      paati: "Paati (Grandmother)",
      thatha: "Thatha (Grandfather)",
      akka: "Akka (Elder Sister)",
      thambi: "Thambi (Younger Brother)",
      chithi: "Chithi (Aunt)",
      mama: "Mama (Uncle)",
    };
    return roleNames[role] || role.charAt(0).toUpperCase() + role.slice(1);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }
</script>

<div class="group relative rounded-xl border-2 {roleStyle.border} bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl" class:cursor-pointer={onClick} on:click={handleCardClick} on:keydown={(e) => e.key === "Enter" && handleCardClick()} role="button" tabindex="0">
  <!-- Member Avatar & Header -->
  <div class="relative p-4">
    <div class="flex items-center space-x-4">
      <!-- Avatar with role-specific gradient -->
      <div class="relative">
        <div class="w-16 h-16 rounded-full {roleStyle.bg} flex items-center justify-center text-3xl shadow-lg">
          {member.avatar}
        </div>
        <!-- Status indicator -->
        {#if overduePayments > 0}
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">!</div>
        {:else if upcomingPayments > 0}
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
            {upcomingPayments}
          </div>
        {:else}
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">✓</div>
        {/if}
      </div>

      <!-- Member Info -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p class="text-sm {roleStyle.text} font-medium">{getRoleDisplayName(member.role)}</p>
        <p class="text-xs text-gray-500">Age: {member.age} • {member.preferredLanguage.charAt(0).toUpperCase() + member.preferredLanguage.slice(1)}</p>
      </div>

      <!-- Expand arrow if details available -->
      {#if showDetails || onClick}
        <div class="text-gray-400 group-hover:text-gray-600 transition-colors">
          <Icon icon="heroicons:chevron-right" class="w-5 h-5" />
        </div>
      {/if}
    </div>
  </div>

  <!-- Financial Summary -->
  <div class="px-4 pb-4 space-y-3">
    <!-- Budget vs Spent -->
    <div class="bg-gray-50 rounded-lg p-3">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-600">Monthly Budget</span>
        <span class="text-sm font-bold {roleStyle.text}">{formatCurrency(member.monthlyBudget)}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">Allocated Bills</span>
        <span class="text-sm font-semibold text-gray-700">{formatCurrency(monthlyTotal)}</span>
      </div>
      <!-- Budget utilization bar -->
      <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div class="h-2 rounded-full transition-all duration-500 {monthlyTotal > member.monthlyBudget ? 'bg-red-500' : monthlyTotal > member.monthlyBudget * 0.8 ? 'bg-amber-500' : 'bg-green-500'}" style="width: {Math.min((monthlyTotal / member.monthlyBudget) * 100, 100)}%"></div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-2 text-center">
      <div class="bg-blue-50 rounded-lg p-2">
        <div class="text-lg font-bold text-blue-600">{memberRecharges.length}</div>
        <div class="text-xs text-blue-500">Monthly Bills</div>
      </div>
      <div class="bg-purple-50 rounded-lg p-2">
        <div class="text-lg font-bold text-purple-600">{memberRenewals.length}</div>
        <div class="text-xs text-purple-500">Yearly Bills</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-2">
        <div class="text-lg font-bold {upcomingPayments > 0 ? 'text-amber-600' : 'text-green-600'}">{upcomingPayments}</div>
        <div class="text-xs {upcomingPayments > 0 ? 'text-amber-500' : 'text-green-500'}">Due Soon</div>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
      <div class="flex items-center space-x-2">
        <Icon icon="heroicons:phone" class="w-3 h-3" />
        <span>{member.phoneNumber}</span>
      </div>
      <div class="flex items-center space-x-1">
        <Icon icon="simple-icons:whatsapp" class="w-3 h-3 text-green-600" />
        <Icon icon="heroicons:chat-bubble-left-right" class="w-3 h-3 text-blue-600" />
      </div>
    </div>
  </div>

  <!-- Detailed view (if showDetails is true) -->
  {#if showDetails}
    <div class="border-t border-gray-100 p-4 bg-gray-50/50">
      <h4 class="font-semibold text-gray-900 mb-3">Responsibilities & Bills</h4>

      <!-- Responsibilities -->
      <div class="mb-4">
        <h5 class="text-sm font-medium text-gray-700 mb-2">Primary Responsibilities:</h5>
        <div class="flex flex-wrap gap-1">
          {#each member.responsibilities as responsibility}
            <span class="px-2 py-1 bg-white rounded-full text-xs {roleStyle.text} border {roleStyle.border}">
              {responsibility}
            </span>
          {/each}
        </div>
      </div>

      <!-- Monthly Bills -->
      {#if memberRecharges.length > 0}
        <div class="mb-4">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Monthly Bills:</h5>
          <div class="space-y-2">
            {#each memberRecharges as recharge}
              <div class="flex justify-between items-center text-sm bg-white rounded-lg p-2 border">
                <span class="font-medium">{recharge.provider} {recharge.type}</span>
                <span class="font-semibold {roleStyle.text}">{formatCurrency(recharge.amount)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Yearly Bills -->
      {#if memberRenewals.length > 0}
        <div>
          <h5 class="text-sm font-medium text-gray-700 mb-2">Yearly Renewals:</h5>
          <div class="space-y-2">
            {#each memberRenewals as renewal}
              <div class="flex justify-between items-center text-sm bg-white rounded-lg p-2 border">
                <span class="font-medium">{renewal.provider} {renewal.type}</span>
                <span class="font-semibold {roleStyle.text}">{formatCurrency(renewal.amount)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .group:hover .group-hover\:text-gray-600 {
    color: #4b5563;
  }
</style>
