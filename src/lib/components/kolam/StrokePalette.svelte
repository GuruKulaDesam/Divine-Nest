<script>
  import Icon from "@iconify/svelte";
  import { kolamStore } from "$lib/stores/kolam";
  import { traditionalColors } from "$lib/data/samples";

  function selectColor(color) {
    kolamStore.update((state) => ({ ...state, selectedColor: color.hex }));
  }
</script>

<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
  <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
    <Icon icon="heroicons:swatch" class="w-5 h-5 mr-2 text-purple-600" />
    Color Palette
  </h3>

  <!-- Traditional Colors -->
  <div class="grid grid-cols-3 gap-3 mb-4">
    {#each traditionalColors as color}
      <button class="group relative p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 {color.hex === $kolamStore.selectedColor ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}" on:click={() => selectColor(color)} title="{color.name} ({color.tamil})">
        <div class="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto mb-2" style="background-color: {color.hex}"></div>
        <div class="text-xs font-medium text-gray-700 text-center">
          {color.name.split(" ")[0]}
        </div>
        <div class="text-xs text-gray-500 text-center">
          {color.tamil}
        </div>
        {#if color.hex === $kolamStore.selectedColor}
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
            <Icon icon="heroicons:check" class="w-3 h-3 text-white" />
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Custom Color Picker -->
  <div class="border-t border-gray-200 pt-4">
    <label for="custom-color" class="block text-sm font-medium text-gray-700 mb-2"> Custom Color </label>
    <input id="custom-color" type="color" bind:value={$kolamStore.selectedColor} class="w-full h-10 rounded-lg border-2 border-gray-300 cursor-pointer" />
  </div>

  <!-- Color Info -->
  <div class="mt-4 p-3 bg-gray-50 rounded-lg">
    <div class="flex items-center space-x-2">
      <div class="w-6 h-6 rounded border-2 border-gray-300" style="background-color: {$kolamStore.selectedColor}"></div>
      <div class="text-sm text-gray-700">
        <div class="font-medium">Selected Color</div>
        <div class="text-gray-500">{$kolamStore.selectedColor}</div>
      </div>
    </div>
  </div>
</div>
