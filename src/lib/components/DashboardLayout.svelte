<script>
  import Sidebar from "./Sidebar.svelte";
  import Header from "./Header.svelte";

  let sidebarOpen = false;

  function handleToggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function handleCloseSidebar() {
    sidebarOpen = false;
  }
</script>

<div class="flex h-screen bg-base-200 mountain-background" data-theme="modern">
  <!-- Sidebar - Fixed on desktop, overlay on mobile -->
  <Sidebar isOpen={sidebarOpen} on:close={handleCloseSidebar} />

  <!-- Main content area -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Header -->
    <Header {sidebarOpen} on:toggleSidebar={handleToggleSidebar} />

    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-transparent">
      <div class="p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</div>

<style>
  .mountain-background {
    position: relative;
    overflow: hidden;
  }

  .mountain-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(135, 206, 235, 0.3) 0%, transparent 50%), linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
    opacity: 0.5;
    z-index: -1;
  }

  /* Mountain silhouettes */
  .mountain-background::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(45deg, transparent 30%, #2d3748 30%, #2d3748 35%, transparent 35%), linear-gradient(135deg, transparent 20%, #1a202c 20%, #1a202c 25%, transparent 25%), linear-gradient(90deg, transparent 10%, #0f1419 10%, #0f1419 15%, transparent 15%);
    background-size:
      100% 100%,
      80% 80%,
      60% 60%;
    background-position:
      0% 100%,
      20% 100%,
      40% 100%;
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: -1;
  }
</style>
