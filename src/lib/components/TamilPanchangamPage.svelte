<script lang="ts">
  import { onMount } from 'svelte';
  import { getPanchangam } from '../panchangam/panchangam.js';
  let date: string = new Date().toISOString().slice(0, 10);
  let latitude = 10.9541; // Default: Coimbatore
  let longitude = 76.9912;
  let tzOffset = 5.5;
  let panchangam: any = null;
  let loading = false;
  let error = '';

  async function fetchPanchangam() {
    loading = true;
    error = '';
    try {
      panchangam = await getPanchangam({
        date: new Date(date),
        latitude,
        longitude,
        tzOffset
      });
    } catch (e) {
      error = 'பஞ்சாங்கம் கணக்கிடுவதில் தோல்வி.';
      panchangam = null;
    }
    loading = false;
  }

  // Reactive statement to fetch data when inputs change
  $: if (date || latitude || longitude) {
    fetchPanchangam();
  }

  onMount(fetchPanchangam);
</script>

<div class="max-w-xl mx-auto p-4 bg-white rounded shadow">
  <h1 class="text-2xl font-bold mb-2">தமிழ் பஞ்சாங்கம் (Panchangam)</h1>
  <form class="flex flex-col gap-2 mb-4" on:submit|preventDefault={fetchPanchangam}>
    <label>தேதி (Date):
      <input type="date" bind:value={date} class="border rounded p-1 ml-2" />
    </label>
    <label>அகலாங்கு (Latitude):
      <input type="number" step="0.0001" bind:value={latitude} class="border rounded p-1 ml-2" />
    </label>
    <label>நெடுங்கு (Longitude):
      <input type="number" step="0.0001" bind:value={longitude} class="border rounded p-1 ml-2" />
    </label>
    <button class="bg-blue-600 text-white px-4 py-2 rounded self-start mt-2" type="submit">பஞ்சாங்கம் பெறு</button>
  </form>
  {#if loading}
    <div>ஏற்றுகிறது...</div>
  {:else if error}
    <div class="text-red-600">{error}</div>
  {:else if panchangam}
    <div class="space-y-2">
      <div><b>தேதி:</b> {date}</div>
      <div><b>இடம்:</b> {latitude}, {longitude} (UTC+{tzOffset})</div>
      <div><b>சூரிய உதயம்:</b> {panchangam.sunrise}</div>
      <div><b>சூரிய அஸ்தமனம்:</b> {panchangam.sunset}</div>
      <div><b>சந்திர உதயம்:</b> {panchangam.moonrise}</div>
      <div><b>சந்திர அஸ்தமனம்:</b> {panchangam.moonset}</div>
      <div><b>திதி:</b> {panchangam.tithi}</div>
      <div><b>நக்ஷத்திரம்:</b> {panchangam.nakshatra}</div>
      <div><b>யோகம்:</b> {panchangam.yoga}</div>
      <div><b>கரணம்:</b> {panchangam.karana}</div>
      <div><b>ராகு காலம்:</b> {panchangam.rahukalam}</div>
      <div><b>யமகண்டம்:</b> {panchangam.yamagandam}</div>
      <div><b>குளிகை:</b> {panchangam.gulikai}</div>
      <div><b>விழாக்கள்:</b> {panchangam.festivals?.join(', ') || 'இல்லை'}</div>
      {#if panchangam.specialNotes}
        <div><b>சிறப்பு குறிப்புகள்:</b> {panchangam.specialNotes}</div>
      {/if}
    </div>
  {/if}
</div>
