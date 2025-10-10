<script>
  import BeautyGuide from "$lib/components/BeautyGuide.svelte";
  import Icon from "@iconify/svelte";
</script>

<svelte:head>
  <title>அழகு வழிகாட்டி - Beauty Guide</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-rose-900 dark:to-purple-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center space-x-3">
        <Icon icon="heroicons:sparkles" class="w-8 h-8 text-rose-500" />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">அழகு வழிகாட்டி</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">Beauty Guide</p>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-4 py-6">
    <BeautyGuide />
  </div>
</div>
