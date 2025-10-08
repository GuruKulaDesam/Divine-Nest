<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { navigate } from "../router.js";
  import { dropdownAnimations, motionHover } from "../utils/motion.js";

  export let isOpen = false;
  export let onClose = () => {};

  let dropdownElement;

  // Reminders quick actions
  const remindersActions = [
    {
      title: "Smart Reminders",
      description: "AI-powered reminder system",
      icon: "heroicons:clock",
      path: "/reminders",
      color: "text-blue-500",
    },
    {
      title: "Add Reminder",
      description: "Create a new reminder",
      icon: "heroicons:plus-circle",
      path: "/reminders",
      color: "text-green-500",
    },
    {
      title: "Today's Tasks",
      description: "View today's reminders",
      icon: "heroicons:calendar",
      path: "/reminders",
      color: "text-orange-500",
    },
  ];

  function handleActionClick(path) {
    navigate(path);
    onClose();
  }

  onMount(() => {
    if (isOpen && dropdownElement) {
      dropdownAnimations.open(dropdownElement);
    }
  });

  $: if (isOpen && dropdownElement) {
    dropdownAnimations.open(dropdownElement);
  } else if (!isOpen && dropdownElement) {
    dropdownAnimations.close(dropdownElement);
  }
</script>

<div bind:this={dropdownElement} class="absolute right-0 mt-2 w-80 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50">
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-base-300">
    <h3 class="text-lg font-semibold text-base-content">Reminders</h3>
    <button class="p-1 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary" on:click={onClose} aria-label="Close reminders menu">
      <Icon icon="heroicons:x-mark" class="w-4 h-4" />
    </button>
  </div>

  <!-- Reminders Actions -->
  <div class="py-2">
    {#each remindersActions as action (action.title)}
      <button class="w-full p-4 hover:bg-base-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary" on:click={() => handleActionClick(action.path)} use:motionHover aria-label="{action.title}: {action.description}">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <Icon icon={action.icon} class="w-5 h-5 {action.color}" />
          </div>
          <div class="flex-1 text-left">
            <p class="text-sm font-medium text-base-content">{action.title}</p>
            <p class="text-xs text-base-content/70">{action.description}</p>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-base-content/40" />
        </div>
      </button>
    {/each}
  </div>

  <!-- Footer -->
  <div class="p-3 border-t border-base-300 bg-base-50">
    <button class="w-full text-sm text-primary hover:text-primary-focus font-medium transition-colors" on:click={() => handleActionClick("/reminders")}> Open Full Reminders </button>
  </div>
</div>
