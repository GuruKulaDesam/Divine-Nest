<script lang="ts">
  export let recordings;
</script>

<h2 class="text-lg font-bold mb-4">🎙️ குரல் பதிவுகள்</h2>
<ul class="space-y-2">
  {#each recordings as r}
    <li class="bg-red-50 p-3 rounded shadow">
      <p>📁 {r.filePath}</p>
      <p class="text-xs text-gray-500">🕒 {r.startedAt} – {r.duration}s</p>
      {#if r.transcription}
        <p class="mt-2 text-sm italic">📝 {r.transcription}</p>
      {/if}
    </li>
  {/each}
</ul>