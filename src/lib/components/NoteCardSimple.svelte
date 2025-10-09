<script lang="ts">
  export let note;
</script>

<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow mb-2">
  <p class="text-sm">{note.content}</p>
  <p class="text-xs text-gray-500 mt-1">🕒 {note.timestamp}</p>
</div>