<script lang="ts">
  export let reminders;
</script>

<h2 class="text-lg font-bold mb-4">⏰ நினைவூட்டல்கள்</h2>
<ul class="space-y-2">
  {#each reminders as r}
    <li class="bg-blue-50 p-3 rounded shadow flex justify-between items-center">
      <div>
        <p>{r.message}</p>
        <p class="text-xs text-gray-500">🕒 {r.time}</p>
      </div>
      <button class="text-sm text-blue-600 hover:underline">Edit</button>
    </li>
  {/each}
</ul>