<script>
  import Icon from "@iconify/svelte";
  import { KitchenVendors } from "../../data/kitchenData.js";

  export let selectedProfile = "family";
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="text-center py-12">
    <Icon icon="heroicons:user-group" class="w-16 h-16 mx-auto text-purple-400 mb-4" />
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Vendor Manager</h2>
    <p class="text-gray-600 mb-1">விற்பனையாளர்கள் நிர्वाহन</p>
    <p class="text-gray-500 mb-6">Trusted suppliers, contacts & loyalty tracking</p>
    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
      <p class="text-sm text-purple-800">
        <strong>Coming Soon!</strong> Vendor contact management with loyalty tracking, seasonal suppliers, and bulk buying coordination.
      </p>
    </div>
  </div>
</div>
