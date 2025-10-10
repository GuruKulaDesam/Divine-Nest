<script>
  import ExpensesPage from "$lib/components/ExpensesPage.svelte";
</script>

<ExpensesPage />
<div class="mt-6 flex flex-col gap-2">
  <a href="/finances/expenses/parse-upi-sms" class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 transition">
    Try UPI SMS Parser Demo
  </a>
  <button class="inline-block bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition" on:click={() => showImport = true}>
    Import UPI SMS (Build History)
  </button>
</div>

<script lang="ts">
  import { parseUPISMS, ParsedTransaction } from '$lib/utils/upiSmsParser';
  import { onMount } from 'svelte';
  let showImport = false;
  let smsBulk = '';
  let importResults: ParsedTransaction[] = [];
  let importError = '';

  function handleBulkImport() {
    importError = '';
    importResults = [];
    if (!smsBulk.trim()) {
      importError = 'Paste one or more UPI SMS messages.';
      return;
    }
    const lines = smsBulk.split(/\n{2,}|\r{2,}/).map(s => s.trim()).filter(Boolean);
    const now = new Date();
    for (const msg of lines) {
      const parsed = parseUPISMS(msg, now);
      if (parsed) importResults.push(parsed);
    }
    if (importResults.length === 0) {
      importError = 'No valid UPI SMS found.';
    }
  }
</script>

{#if showImport}
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-black" on:click={() => showImport = false}>&times;</button>
      <h3 class="text-lg font-bold mb-2">Import UPI SMS (Bulk)</h3>
      <textarea class="w-full border rounded p-2 mb-2" rows="6" bind:value={smsBulk} placeholder="Paste multiple UPI SMS, separated by blank lines..."></textarea>
      <button class="bg-green-600 text-white px-4 py-2 rounded" on:click={handleBulkImport}>Parse & Import</button>
      {#if importError}
        <div class="text-red-600 mt-2">{importError}</div>
      {/if}
      {#if importResults.length}
        <div class="mt-4 border-t pt-2">
          <div class="font-semibold mb-1">Parsed Transactions:</div>
          <ul class="text-sm max-h-40 overflow-y-auto">
            {#each importResults as tx}
              <li class="mb-2 border-b pb-1">
                <b>₹{tx.amount}</b> | <b>{tx.transactionId}</b> | {tx.timestamp.toLocaleString()}<br />
                <span class="text-gray-500">{tx.rawText}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
{/if}
