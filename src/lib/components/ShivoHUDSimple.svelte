<script lang="ts">
  export let transcript = '';
  export let emotion = '';
</script>

<div class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80">
  <h3 class="text-lg font-bold mb-2">🎙️ Shivo Listening</h3>
  <p class="text-sm">🗣️ {transcript}</p>
  <p class="text-xs text-gray-500 mt-1">🧘 Mood: {emotion}</p>
</div>