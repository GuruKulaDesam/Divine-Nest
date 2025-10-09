<script lang="ts">
  export let events;
</script>

<h2 class="text-lg font-bold mb-4">🗓️ நிகழ்வுகள்</h2>
<ul class="space-y-2">
  {#each events as e}
    <li class="bg-green-50 p-3 rounded shadow">
      <p class="font-semibold">{e.title}</p>
      <p class="text-xs text-gray-500">📅 {e.date}</p>
    </li>
  {/each}
</ul>