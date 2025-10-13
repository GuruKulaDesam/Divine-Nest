<script>
  import { onMount } from 'svelte';
  import { finances, financeActions } from '$lib/stores/finances';
  import { userProfile } from '$lib/stores/userProfile';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { Icon } from '@iconify/svelte';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar, Line, Doughnut } from 'svelte-chartjs';

  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  let currentUser = '';
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Reactive statements
  $: userRole = $userProfile?.role || 'Parent';
  $: filteredFinances = $finances.filter(finance =>
    finance.applicable_roles.includes(userRole)
  );

  $: monthlySummary = financeActions.getMonthlySummary(currentYear, currentMonth);
  $: budgetVsActual = financeActions.getBudgetVsActual(currentYear, currentMonth);

  $: incomeData = filteredFinances.filter(f => f.type === 'Income');
  $: expenseData = filteredFinances.filter(f => f.type === 'Expenses');
  $: budgetData = filteredFinances.filter(f => f.type === 'Budget');
  $: savingsData = filteredFinances.filter(f => f.type === 'Savings');

  // Chart configurations
  $: monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: Array.from({ length: 12 }, (_, i) => {
          const summary = financeActions.getMonthlySummary(currentYear, i);
          return summary.totalIncome;
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: Array.from({ length: 12 }, (_, i) => {
          const summary = financeActions.getMonthlySummary(currentYear, i);
          return summary.totalExpenses;
        }),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Savings',
        data: Array.from({ length: 12 }, (_, i) => {
          const summary = financeActions.getMonthlySummary(currentYear, i);
          return summary.totalSavings;
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  $: expenseBreakdownData = {
    labels: [...new Set(expenseData.map(e => e.category))],
    datasets: [{
      data: [...new Set(expenseData.map(e => e.category))].map(category =>
        expenseData.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)'
      ]
    }]
  };

  $: budgetComparisonData = {
    labels: budgetVsActual.budgets.map(b => b.category),
    datasets: [
      {
        label: 'Budgeted',
        data: budgetVsActual.budgets.map(b => b.budgeted),
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      },
      {
        label: 'Actual',
        data: budgetVsActual.budgets.map(b => b.actual),
        backgroundColor: 'rgba(239, 68, 68, 0.8)'
      }
    ]
  };

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('add') && lowerCommand.includes('income')) {
      window.location.href = '/finances/create';
    } else if (lowerCommand.includes('add') && lowerCommand.includes('expense')) {
      window.location.href = '/finances/create';
    } else if (lowerCommand.includes('view') && lowerCommand.includes('budget')) {
      // Scroll to budget section
      document.getElementById('budget-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lowerCommand.includes('show') && lowerCommand.includes('report')) {
      window.location.href = '/finances/review';
    }
  }

  onMount(() => {
    // Get current user
    userProfile.subscribe(profile => {
      currentUser = profile?.name || 'Family Member';
    });
  });
</script>

<svelte:head>
  <title>Finance Dashboard - Divine Nest</title>
  <meta name="description" content="Financial overview and analytics for family budget management" />
</svelte:head>

<div class="min-h-screen bg-base-200">
  <!-- Breadcrumb -->
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Finances', href: '/finances' },
      { label: 'Dashboard', href: '/finances/dashboard' }
    ]}
  />

  <!-- Header -->
  <div class="bg-base-100 shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-base-content flex items-center gap-2">
            <Icon icon="heroicons:currency-dollar" class="w-8 h-8 text-primary" />
            Finance Dashboard
          </h1>
          <p class="text-base-content/70 mt-1">
            Welcome back, {currentUser}! Here's your financial overview for {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Voice Input -->
          <VoiceInput
            placeholder="Say 'add income' or 'view budget'..."
            onResult={handleVoiceCommand}
            className="w-full sm:w-64"
          />

          <!-- Quick Actions -->
          <div class="dropdown dropdown-end">
            <button class="btn btn-primary">
              <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
              Quick Add
            </button>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/finances/create?type=Income">
                <Icon icon="heroicons:arrow-trending-up" class="w-4 h-4" />
                Add Income
              </a></li>
              <li><a href="/finances/create?type=Expenses">
                <Icon icon="heroicons:arrow-trending-down" class="w-4 h-4" />
                Add Expense
              </a></li>
              <li><a href="/finances/create?type=Budget">
                <Icon icon="heroicons:calculator" class="w-4 h-4" />
                Set Budget
              </a></li>
              <li><a href="/finances/create?type=Savings">
                <Icon icon="heroicons:piggy-bank" class="w-4 h-4" />
                Add Savings
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8">
    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Income -->
      <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total Income</p>
              <p class="text-2xl font-bold">₹{monthlySummary.totalIncome.toLocaleString()}</p>
            </div>
            <Icon icon="heroicons:arrow-trending-up" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <!-- Total Expenses -->
      <div class="card bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-100 text-sm font-medium">Total Expenses</p>
              <p class="text-2xl font-bold">₹{monthlySummary.totalExpenses.toLocaleString()}</p>
            </div>
            <Icon icon="heroicons:arrow-trending-down" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <!-- Net Income -->
      <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Net Income</p>
              <p class="text-2xl font-bold">₹{monthlySummary.netIncome.toLocaleString()}</p>
            </div>
            <Icon icon="heroicons:calculator" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <!-- Savings Rate -->
      <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Savings Rate</p>
              <p class="text-2xl font-bold">
                {monthlySummary.totalIncome > 0
                  ? Math.round((monthlySummary.totalSavings / monthlySummary.totalIncome) * 100)
                  : 0}%
              </p>
            </div>
            <Icon icon="heroicons:piggy-bank" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Monthly Trends -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
            Monthly Financial Trends
          </h3>
          <div class="h-64">
            <Line
              data={monthlyTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => '₹' + value.toLocaleString()
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <!-- Expense Breakdown -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:chart-pie" class="w-5 h-5" />
            Expense Breakdown
          </h3>
          <div class="h-64">
            <Doughnut
              data={expenseBreakdownData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => '₹' + context.parsed.toLocaleString()
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Budget vs Actual -->
    {#if budgetVsActual.budgets.length > 0}
      <div class="card bg-base-100 shadow-lg mb-8">
        <div class="card-body">
          <h3 class="card-title" id="budget-section">
            <Icon icon="heroicons:scale" class="w-5 h-5" />
            Budget vs Actual ({new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})
          </h3>
          <div class="h-64">
            <Bar
              data={budgetComparisonData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                    callbacks: {
                      label: (context) => context.dataset.label + ': ₹' + context.parsed.y.toLocaleString()
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => '₹' + value.toLocaleString()
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- Recent Transactions -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">
            <Icon icon="heroicons:clock" class="w-5 h-5" />
            Recent Transactions
          </h3>
          <a href="/finances/review" class="btn btn-ghost btn-sm">
            View All
            <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredFinances.slice(0, 10) as finance}
                <tr>
                  <td>
                    <div class="badge badge-outline {finance.type === 'Income' ? 'badge-success' : finance.type === 'Expenses' ? 'badge-error' : finance.type === 'Budget' ? 'badge-info' : 'badge-warning'}">
                      {finance.type}
                    </div>
                  </td>
                  <td>{finance.category}</td>
                  <td class="font-semibold">₹{finance.amount.toLocaleString()}</td>
                  <td>{finance.actor}</td>
                  <td>{new Date(finance.date).toLocaleDateString()}</td>
                  <td>
                    <a href="/finances/update/{finance.id}" class="btn btn-ghost btn-xs">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <div class="mt-8">
      <DiscussionForum
        tableName="finances"
        recordId="dashboard"
        title="Finance Discussion"
        description="Discuss financial matters, budgeting strategies, and money management tips"
      />
    </div>
  </div>
</div>