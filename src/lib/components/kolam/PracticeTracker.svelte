<script>
  import Icon from "@iconify/svelte";
  import { kolamStore } from "$lib/stores/kolam";

  $: progress = $kolamStore.strokes.length;
  $: targetStrokes = $kolamStore.currentPattern?.strokes || 10;
  $: completionPercentage = Math.min((progress / targetStrokes) * 100, 100);

  $: sessionTime = $kolamStore.sessionStartTime ? Math.floor((Date.now() - $kolamStore.sessionStartTime) / 1000 / 60) : 0;

  function getMotivationalMessage() {
    if (completionPercentage === 0) return "Start creating your kolam!";
    if (completionPercentage < 25) return "Great start! Keep going!";
    if (completionPercentage < 50) return "You're making beautiful progress!";
    if (completionPercentage < 75) return "Almost there! Stay focused!";
    if (completionPercentage < 100) return "Just a few more strokes!";
    return "Perfect! Kolam completed!";
  }
</script>

<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
  <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
    <Icon icon="heroicons:chart-bar" class="w-5 h-5 mr-2 text-purple-600" />
    Practice Progress
  </h3>

  <!-- Progress Bar -->
  <div class="mb-4">
    <div class="flex justify-between text-sm text-gray-600 mb-2">
      <span>Strokes: {progress} / {targetStrokes}</span>
      <span>{Math.round(completionPercentage)}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-3">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300" style="width: {completionPercentage}%"></div>
    </div>
  </div>

  <!-- Session Stats -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="bg-gray-50 rounded-lg p-3">
      <div class="flex items-center">
        <Icon icon="heroicons:clock" class="w-4 h-4 text-gray-500 mr-2" />
        <div>
          <div class="text-xs text-gray-500">Session Time</div>
          <div class="text-sm font-medium text-gray-900">{sessionTime} min</div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 rounded-lg p-3">
      <div class="flex items-center">
        <Icon icon="heroicons:bolt" class="w-4 h-4 text-gray-500 mr-2" />
        <div>
          <div class="text-xs text-gray-500">Strokes/Min</div>
          <div class="text-sm font-medium text-gray-900">
            {sessionTime > 0 ? Math.round(progress / sessionTime) : 0}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Motivational Message -->
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
    <div class="flex items-center">
      <Icon icon="heroicons:sparkles" class="w-5 h-5 text-purple-500 mr-2" />
      <p class="text-sm font-medium text-gray-800">{getMotivationalMessage()}</p>
    </div>
  </div>

  <!-- Achievements -->
  <div class="border-t border-gray-200 pt-4">
    <h4 class="text-sm font-medium text-gray-700 mb-3">Achievements</h4>
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full {progress >= 5 ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-2">
            {#if progress >= 5}
              <Icon icon="heroicons:check" class="w-3 h-3 text-green-600" />
            {:else}
              <Icon icon="heroicons:x-mark" class="w-3 h-3 text-gray-400" />
            {/if}
          </div>
          <span class="text-sm text-gray-700">First Steps (5 strokes)</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full {progress >= targetStrokes ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-2">
            {#if progress >= targetStrokes}
              <Icon icon="heroicons:check" class="w-3 h-3 text-green-600" />
            {:else}
              <Icon icon="heroicons:x-mark" class="w-3 h-3 text-gray-400" />
            {/if}
          </div>
          <span class="text-sm text-gray-700">Pattern Complete</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full {sessionTime >= 10 ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-2">
            {#if sessionTime >= 10}
              <Icon icon="heroicons:check" class="w-3 h-3 text-green-600" />
            {:else}
              <Icon icon="heroicons:x-mark" class="w-3 h-3 text-gray-400" />
            {/if}
          </div>
          <span class="text-sm text-gray-700">Dedicated Practice (10 min)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="border-t border-gray-200 pt-4 mt-4">
    <div class="flex space-x-2">
      <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors" on:click={() => kolamStore.update((state) => ({ ...state, strokes: [] }))}> Clear </button>
      <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors" on:click={() => kolamStore.update((state) => ({ ...state, strokes: state.strokes.slice(0, -1) }))} disabled={progress === 0}> Undo </button>
    </div>
  </div>
</div>
