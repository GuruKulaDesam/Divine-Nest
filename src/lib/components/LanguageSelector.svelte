<script>
  import Icon from "@iconify/svelte";
  import { languages, currentLanguage, setLanguage } from "$lib/i18n/index.js";

  let showDropdown = false;
  let selectedLanguage;

  // Subscribe to current language
  currentLanguage.subscribe(lang => {
    selectedLanguage = lang;
  });

  function handleLanguageSelect(lang) {
    setLanguage(lang);
    showDropdown = false;
  }

  // Get sorted languages with Indian languages first
  $: sortedLanguages = Object.entries(languages).sort(([a], [b]) => {
    const indianLanguages = ['hi', 'ta', 'te', 'kn', 'ml', 'bn', 'gu', 'mr', 'pa', 'or', 'as'];
    const aIsIndian = indianLanguages.includes(a);
    const bIsIndian = indianLanguages.includes(b);

    if (aIsIndian && !bIsIndian) return -1;
    if (!aIsIndian && bIsIndian) return 1;
    return a.localeCompare(b);
  });
</script>

<div class="relative">
  <!-- Language Selector Button -->
  <button
    class="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    on:click={() => showDropdown = !showDropdown}
  >
    <span class="text-lg">{languages[selectedLanguage]?.flag || '🌐'}</span>
    <span class="text-sm font-medium text-gray-700">
      {languages[selectedLanguage]?.name || 'Language'}
    </span>
    <Icon
      icon="mdi:chevron-down"
      class="w-4 h-4 text-gray-500 transition-transform {showDropdown ? 'rotate-180' : ''}"
    />
  </button>

  <!-- Dropdown Menu -->
  {#if showDropdown}
    <div class="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      <div class="py-1">
        {#each sortedLanguages as [code, lang]}
          <button
            class="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors {selectedLanguage === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}"
            on:click={() => handleLanguageSelect(code)}
          >
            <span class="text-lg">{lang.flag}</span>
            <span class="text-sm font-medium flex-1">{lang.name}</span>
            {#if selectedLanguage === code}
              <Icon icon="mdi:check" class="w-4 h-4 text-blue-600" />
            {/if}
          </button>
        {/each}
      </div>

      <!-- Language Groups Separator -->
      <div class="border-t border-gray-100 my-1"></div>
      <div class="px-4 py-2 text-xs text-gray-500 font-medium bg-gray-50">
        🇮🇳 Indian Languages • 🌍 Other Languages
      </div>
    </div>
  {/if}
</div>

<!-- Click outside to close -->
{#if showDropdown}
  <div
    class="fixed inset-0 z-40"
    on:click={() => showDropdown = false}
    on:keydown={(e) => { if (e.key === 'Escape') showDropdown = false; }}
    role="button"
    tabindex="0"
    aria-label="Close language selector"
  ></div>
{/if}

<style>
  /* Custom scrollbar for dropdown */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>