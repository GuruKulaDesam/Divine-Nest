<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Loans Tracker";
  const pageDescription = "Track all family loans including EMI payments, due dates, and remaining balances";

  // Loan data structure
  interface LoanEntry {
    id: string;
    loanName: string;
    type: string;
    emiAmount: number;
    dueDate: string;
    remainingBalance: number;
    notes: string;
    status: "active" | "paid" | "overdue";
  }

  // Sample loan data
  let loans: LoanEntry[] = [
    {
      id: "1",
      loanName: "Home Loan",
      type: "Housing",
      emiAmount: 25000,
      dueDate: "2024-01-15",
      remainingBalance: 1500000,
      notes: "HDFC Bank - 20 year loan",
      status: "active",
    },
    {
      id: "2",
      loanName: "Car Loan",
      type: "Vehicle",
      emiAmount: 15000,
      dueDate: "2024-01-20",
      remainingBalance: 300000,
      notes: "ICICI Bank - 5 year loan",
      status: "active",
    },
    {
      id: "3",
      loanName: "Education Loan",
      type: "Education",
      emiAmount: 8000,
      dueDate: "2024-01-10",
      remainingBalance: 200000,
      notes: "SBI Bank - Student loan",
      status: "active",
    },
  ];

  // Form state
  let showAddForm = false;
  let editingLoan: LoanEntry | null = null;

  let newLoan = {
    loanName: "",
    type: "",
    emiAmount: "",
    dueDate: new Date().toISOString().split("T")[0],
    remainingBalance: "",
    notes: "",
  };

  // Loan types
  const loanTypes = ["Housing", "Vehicle", "Education", "Personal", "Business", "Medical", "Other"];

  function addLoan() {
    if (!newLoan.loanName || !newLoan.type || !newLoan.emiAmount || !newLoan.remainingBalance) return;

    const loan: LoanEntry = {
      id: Date.now().toString(),
      loanName: newLoan.loanName,
      type: newLoan.type,
      emiAmount: parseFloat(newLoan.emiAmount),
      dueDate: newLoan.dueDate,
      remainingBalance: parseFloat(newLoan.remainingBalance),
      notes: newLoan.notes,
      status: "active",
    };

    loans = [...loans, loan];
    resetForm();
    showAddForm = false;
  }

  function editLoan(loan: LoanEntry) {
    editingLoan = loan;
    newLoan = {
      loanName: loan.loanName,
      type: loan.type,
      emiAmount: loan.emiAmount.toString(),
      dueDate: loan.dueDate,
      remainingBalance: loan.remainingBalance.toString(),
      notes: loan.notes,
    };
    showAddForm = true;
  }

  function updateLoan() {
    if (!editingLoan) return;

    loans = loans.map((loan) =>
      loan.id === editingLoan!.id
        ? {
            ...loan,
            loanName: newLoan.loanName,
            type: newLoan.type,
            emiAmount: parseFloat(newLoan.emiAmount),
            dueDate: newLoan.dueDate,
            remainingBalance: parseFloat(newLoan.remainingBalance),
            notes: newLoan.notes,
          }
        : loan
    );

    resetForm();
    showAddForm = false;
    editingLoan = null;
  }

  function deleteLoan(id: string) {
    loans = loans.filter((loan) => loan.id !== id);
  }

  function resetForm() {
    newLoan = {
      loanName: "",
      type: "",
      emiAmount: "",
      dueDate: new Date().toISOString().split("T")[0],
      remainingBalance: "",
      notes: "",
    };
  }

  function cancelEdit() {
    resetForm();
    showAddForm = false;
    editingLoan = null;
  }

  // Calculate totals
  $: totalEMI = loans.reduce((sum, loan) => sum + loan.emiAmount, 0);
  $: totalBalance = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  $: activeLoans = loans.filter((loan) => loan.status === "active").length;
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
          <Icon icon="heroicons:credit-card" class="w-8 h-8 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</p>
              <p class="text-2xl font-bold text-green-600">₹{totalEMI.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
              <p class="text-2xl font-bold text-blue-600">₹{totalBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:document-check" class="w-6 h-6 text-purple-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Active Loans</p>
              <p class="text-2xl font-bold text-purple-600">{activeLoans}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Form -->
    {#if showAddForm}
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingLoan ? "Edit Loan" : "Add New Loan"}
        </h3>

        <form on:submit|preventDefault={editingLoan ? updateLoan : addLoan} class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Name</label>
            <input type="text" bind:value={newLoan.loanName} placeholder="e.g., Home Loan, Car Loan" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select bind:value={newLoan.type} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required>
              <option value="">Select type</option>
              {#each loanTypes as type}
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">EMI Amount (₹)</label>
            <input type="number" bind:value={newLoan.emiAmount} placeholder="25000" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
            <input type="date" bind:value={newLoan.dueDate} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Remaining Balance (₹)</label>
            <input type="number" bind:value={newLoan.remainingBalance} placeholder="1500000" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white" required />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea bind:value={newLoan.notes} placeholder="Additional notes about the loan..." rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"></textarea>
          </div>

          <div class="md:col-span-2 flex gap-3">
            <button type="submit" class="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
              {editingLoan ? "Update Loan" : "Add Loan"}
            </button>
            <button type="button" on:click={cancelEdit} class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"> Cancel </button>
          </div>
        </form>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex gap-3 mb-6">
      <button
        on:click={() => {
          showAddForm = !showAddForm;
          if (!showAddForm) cancelEdit();
        }}
        class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        {showAddForm ? "Cancel" : "Add Loan"}
      </button>
    </div>

    <!-- Loans Table -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden" use:motionInView>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Loan Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EMI Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Remaining Balance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-slate-600">
            {#each loans as loan (loan.id)}
              <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {loan.loanName}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {loan.type}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ₹{loan.emiAmount.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ₹{loan.remainingBalance.toLocaleString()}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                  {loan.notes || "-"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                    <button on:click={() => editLoan(loan)} class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button on:click={() => deleteLoan(loan.id)} class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if loans.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:credit-card" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No loans yet</h3>
          <p class="text-gray-500 dark:text-gray-400">Add your first loan to start tracking payments and balances.</p>
        </div>
      {/if}
    </div>
  </div>
</div>
