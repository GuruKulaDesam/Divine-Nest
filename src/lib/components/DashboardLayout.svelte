<script>
  import Sidebar from './Sidebar.svelte';
  import Header from './Header.svelte';
  
  let sidebarOpen = false;
  
  function handleToggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  
  function handleCloseSidebar() {
    sidebarOpen = false;
  }
</script>

<div class="flex h-screen bg-base-200" data-theme="modern">
  <!-- Sidebar - Fixed on desktop, overlay on mobile -->
  <Sidebar 
    isOpen={sidebarOpen} 
    on:close={handleCloseSidebar}
  />
  
  <!-- Main content wrapper -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Header -->
    <Header 
      sidebarOpen={sidebarOpen} 
      on:toggleSidebar={handleToggleSidebar}
    />
    
    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-base-200">
      <div class="p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</div> 