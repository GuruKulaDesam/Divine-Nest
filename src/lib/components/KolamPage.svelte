<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import KolamCanvas from "$lib/components/kolam/KolamCanvas.svelte";
  import StrokePalette from "$lib/components/kolam/StrokePalette.svelte";
  import SampleGallery from "$lib/components/kolam/SampleGallery.svelte";
  import PracticeTracker from "$lib/components/kolam/PracticeTracker.svelte";
  import { kolamStore } from "$lib/stores/kolam";

  function navigateBack() {
    goto("/");
  }

  // Initialize kolam store with default values
  $kolamStore = {
    currentPattern: null,
    strokes: [],
    selectedColor: "#8B4513",
    brushSize: 3,
    symmetryMode: true,
    practiceMode: "free",
    difficulty: "beginner",
    progress: {
      sessions: 0,
      totalStrokes: 0,
      completedPatterns: 0,
      timeSpent: 0,
    },
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="text-center flex-1">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">🎨 Kolangal</h1>
        <p class="text-lg text-gray-600">Tamil Kolam Art Practice</p>
        <p class="text-sm text-amber-700 italic">கோலம் • Rangoli • Traditional Art</p>
      </div>
      <button on:click={navigateBack} class="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
        <Icon icon="heroicons:arrow-left" class="w-5 h-5 mr-2 inline" />
        Back to Home
      </button>
    </div>

    <!-- Main Practice Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Left Panel: Tools and Settings -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Practice Mode Selector -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Icon icon="heroicons:play-circle" class="w-5 h-5 mr-2 text-amber-600" />
            Practice Mode
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="p-3 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-sm font-medium text-amber-800 {$kolamStore.practiceMode === 'free' ? 'border-amber-500 bg-amber-100' : ''}" on:click={() => ($kolamStore.practiceMode = "free")}>
              <Icon icon="heroicons:pencil" class="w-4 h-4 mx-auto mb-1" />
              Free Draw
            </button>
            <button class="p-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-sm font-medium text-blue-800 {$kolamStore.practiceMode === 'guided' ? 'border-blue-500 bg-blue-100' : ''}" on:click={() => ($kolamStore.practiceMode = "guided")}>
              <Icon icon="heroicons:light-bulb" class="w-4 h-4 mx-auto mb-1" />
              Guided
            </button>
            <button class="p-3 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-colors text-sm font-medium text-green-800 {$kolamStore.practiceMode === 'tutorial' ? 'border-green-500 bg-green-100' : ''}" on:click={() => ($kolamStore.practiceMode = "tutorial")}>
              <Icon icon="heroicons:academic-cap" class="w-4 h-4 mx-auto mb-1" />
              Tutorial
            </button>
            <button class="p-3 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors text-sm font-medium text-purple-800 {$kolamStore.practiceMode === 'challenge' ? 'border-purple-500 bg-purple-100' : ''}" on:click={() => ($kolamStore.practiceMode = "challenge")}>
              <Icon icon="heroicons:trophy" class="w-4 h-4 mx-auto mb-1" />
              Challenge
            </button>
          </div>
        </div>

        <!-- Stroke Palette -->
        <StrokePalette />

        <!-- Practice Tracker -->
        <PracticeTracker />
      </div>

      <!-- Center: Canvas Area -->
      <div class="lg:col-span-2">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center">
              <Icon icon="heroicons:rectangle-stack" class="w-5 h-5 mr-2 text-orange-600" />
              Kolam Canvas
            </h3>
            <div class="flex items-center space-x-2">
              <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Undo">
                <Icon icon="heroicons:arrow-uturn-left" class="w-4 h-4 text-gray-600" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Redo">
                <Icon icon="heroicons:arrow-uturn-right" class="w-4 h-4 text-gray-600" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Clear">
                <Icon icon="heroicons:trash" class="w-4 h-4 text-gray-600" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Save">
                <Icon icon="heroicons:document-check" class="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 min-h-[500px] flex items-center justify-center">
            <KolamCanvas />
          </div>

          <!-- Canvas Controls -->
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <label for="brush-size" class="text-sm font-medium text-gray-700">Brush Size:</label>
                <input id="brush-size" type="range" min="1" max="10" bind:value={$kolamStore.brushSize} class="w-20" />
                <span class="text-sm text-gray-600">{$kolamStore.brushSize}px</span>
              </div>
              <div class="flex items-center space-x-2">
                <label for="symmetry-toggle" class="text-sm font-medium text-gray-700">Symmetry:</label>
                <button id="symmetry-toggle" class="p-1 rounded {$kolamStore.symmetryMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}" on:click={() => ($kolamStore.symmetryMode = !$kolamStore.symmetryMode)}>
                  <Icon icon="heroicons:arrows-right-left" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <label for="difficulty-select" class="text-sm text-gray-600">Difficulty:</label>
              <select id="difficulty-select" bind:value={$kolamStore.difficulty} class="text-sm border border-gray-300 rounded px-2 py-1">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="master">Master</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sample Gallery -->
    <SampleGallery />

    <!-- Cultural Information Panel -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Icon icon="heroicons:information-circle" class="w-6 h-6 mr-2 text-blue-600" />
        About Tamil Kolam
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Significance -->
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
            <Icon icon="heroicons:sparkles" class="w-4 h-4 mr-2" />
            Spiritual Significance
          </h4>
          <p class="text-sm text-blue-700">Kolam represents the cycle of life, prosperity, and divine protection. Each dot and line carries symbolic meaning in Tamil culture.</p>
        </div>

        <!-- Materials -->
        <div class="bg-green-50 rounded-xl p-4">
          <h4 class="font-semibold text-green-800 mb-2 flex items-center">
            <Icon icon="heroicons:beaker" class="w-4 h-4 mr-2" />
            Traditional Materials
          </h4>
          <p class="text-sm text-green-700">Rice flour, limestone powder, natural pigments. Modern adaptations use colored powders and digital tools.</p>
        </div>

        <!-- Learning -->
        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold text-purple-800 mb-2 flex items-center">
            <Icon icon="heroicons:academic-cap" class="w-4 h-4 mr-2" />
            Learning Path
          </h4>
          <p class="text-sm text-purple-700">Start with simple dots and lines, progress to complex geometric patterns. Master symmetry and rhythm.</p>
        </div>
      </div>

      <!-- Tamil Quote -->
      <div class="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 text-center">
        <p class="text-lg font-medium text-amber-800 mb-2">"கோலம் போல் வாழ்க்கை"</p>
        <p class="text-sm text-amber-700">"Life should be as beautiful as a kolam"</p>
        <p class="text-xs text-amber-600 mt-1">- Tamil Proverb</p>
      </div>
    </div>
  </div>
</div>
