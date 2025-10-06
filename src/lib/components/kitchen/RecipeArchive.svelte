<script>
  import Icon from "@iconify/svelte";

  export let selectedProfile = "family";
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="text-center py-12">
    <Icon icon="heroicons:book-open" class="w-16 h-16 mx-auto text-blue-400 mb-4" />
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Recipe Archive</h2>
    <p class="text-gray-600 mb-1">செய்முறை संग्रह</p>
    <p class="text-gray-500 mb-6">Family recipes, Paati's wisdom & Tamil-English glossary</p>
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
      <p class="text-sm text-blue-800">
        <strong>Coming Soon!</strong> Digital recipe archive with voice notes, Paati's tips, emotional tags, and Tamil-English cooking glossary.
      </p>
    </div>
  </div>
</div>
