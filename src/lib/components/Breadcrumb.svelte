<script>
  import Icon from "@iconify/svelte";

  export let currentPage = "";
  export let breadcrumbs = [];

  // Default breadcrumbs for tasks
  $: if (!breadcrumbs.length) {
    breadcrumbs = [
      { label: "Home", href: "/", icon: "heroicons:home" },
      { label: "Tasks", href: "/tasks/dashboard", icon: "heroicons:clipboard-document-list" }
    ];
  }

  // Add current page if provided
  $: if (currentPage && !breadcrumbs.some(b => b.label === currentPage)) {
    breadcrumbs = [...breadcrumbs, { label: currentPage, href: null }];
  }
</script>

<nav class="breadcrumb-nav bg-base-100 p-3 rounded-lg shadow-sm mb-4">
  <ul class="flex items-center space-x-2 text-sm">
    {#each breadcrumbs as crumb, index}
      <li class="flex items-center">
        {#if crumb.icon}
          <Icon icon={crumb.icon} class="w-4 h-4 mr-1 text-base-content/60" />
        {/if}
        {#if crumb.href && index < breadcrumbs.length - 1}
          <a href={crumb.href} class="text-primary hover:text-primary-focus transition-colors">
            {crumb.label}
          </a>
        {:else}
          <span class="text-base-content font-medium">{crumb.label}</span>
        {/if}
        {#if index < breadcrumbs.length - 1}
          <Icon icon="heroicons:chevron-right" class="w-4 h-4 mx-2 text-base-content/40" />
        {/if}
      </li>
    {/each}
  </ul>
</nav>