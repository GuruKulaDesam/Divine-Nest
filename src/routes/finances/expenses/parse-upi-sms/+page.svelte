<script lang="ts">
  import { parseUPISMS } from '$lib/utils/upiSmsParser';
  import type { ParsedTransaction } from '$lib/utils/upiSmsParser';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // For demo: user pastes SMS text, app parses and shows result
  let smsText = '';
  let parsed: ParsedTransaction | null = null;
  let error = '';

  function handleParse() {
    error = '';
    parsed = null;
    if (!smsText.trim()) {
      error = 'Paste a UPI SMS message.';
      return;
    }
    const result = parseUPISMS(smsText, new Date());
    if (result) {
      parsed = result;
    } else {
      error = 'Could not parse this SMS.';
    }
  }
</script>

<div class="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
  <h2 class="text-lg font-bold mb-4">UPI SMS Parser Demo</h2>
  <textarea
    class="w-full border rounded p-2 mb-2"
    rows="4"
    bind:value={smsText}
    placeholder="Paste a UPI SMS here..."
  ></textarea>
  <button class="bg-blue-600 text-white px-4 py-2 rounded" on:click={handleParse}>
    Parse SMS
  </button>
  {#if error}
    <div class="text-red-600 mt-2">{error}</div>
  {/if}
  {#if parsed}
    <div class="mt-4 border-t pt-4">
      <div class="font-semibold">Parsed Transaction:</div>
      <ul class="mt-2 text-sm">
        <li><b>Amount:</b> ₹{parsed.amount}</li>
        <li><b>Txn ID:</b> {parsed.transactionId}</li>
        <li><b>Source:</b> {parsed.source}</li>
        <li><b>Category:</b> {parsed.category}</li>
        <li><b>Timestamp:</b> {parsed.timestamp.toLocaleString()}</li>
        <li><b>Raw SMS:</b> <pre class="bg-gray-100 p-2 rounded mt-1">{parsed.rawText}</pre></li>
      </ul>
    </div>
  {/if}
</div>

<style>
  textarea {
    font-family: inherit;
    font-size: 1rem;
  }
</style>
