<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { currentLanguage, languages, setLanguage } from '../i18n/index.js';
  import { dropdownAnimations, motionHover } from '../utils/motion.js';

  let isOpen = false;
  let dropdownElement;

  function toggleDropdown() {
    isOpen = !isOpen;
    
    setTimeout(() => {
      if (isOpen && dropdownElement) {
        dropdownAnimations.open(dropdownElement);
      } else if (!isOpen && dropdownElement) {
        dropdownAnimations.close(dropdownElement);
      }
    }, 10);
  }

  function selectLanguage(langCode) {
    setLanguage(langCode);
    isOpen = false;
  }

  function closeDropdown() {
    if (isOpen && dropdownElement) {
      dropdownAnimations.close(dropdownElement);
    }
    isOpen = false;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.language-switcher')) {
      closeDropdown();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative language-switcher">
  <button 
    class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors duration-200 flex items-center space-x-2"
    on:click={toggleDropdown}
    use:motionHover
  >
    <span class="text-lg">{$currentLanguage ? languages[$currentLanguage].flag : '🌐'}</span>
    <span class="hidden sm:block text-sm font-medium">
      {$currentLanguage ? languages[$currentLanguage].name : 'Language'}
    </span>
    <Icon icon="heroicons:chevron-down" class="w-4 h-4" />
  </button>
  
  {#if isOpen}
    <div 
      bind:this={dropdownElement}
      class="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 py-1 z-50"
    >
      {#each Object.entries(languages) as [code, lang]}
        <button 
          class="w-full flex items-center px-4 py-2 text-sm hover:bg-base-200 transition-colors duration-200 {$currentLanguage === code ? 'bg-primary/10 text-primary' : 'text-base-content'}"
          on:click={() => selectLanguage(code)}
        >
          <span class="text-lg mr-3">{lang.flag}</span>
          <span class="flex-1 text-left">{lang.name}</span>
          {#if $currentLanguage === code}
            <Icon icon="heroicons:check" class="w-4 h-4 text-primary" />
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div> 