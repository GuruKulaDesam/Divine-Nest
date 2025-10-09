<script>
  import Sidebar from "./Sidebar.svelte";
  import TopNavigation from "./TopNavigation.svelte";

  let sidebarOpen = true; // Keep sidebar open by default

  function handleToggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function handleCloseSidebar() {
    // Only close on mobile, keep open on desktop
    sidebarOpen = false;
  }
</script>

<div class="flex h-screen bg-base-200 mountain-background" data-theme="modern">
  <!-- Sidebar - Fixed on desktop, overlay on mobile -->
  <Sidebar isOpen={sidebarOpen} on:close={handleCloseSidebar} />

  <!-- Main content area -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Enhanced Header with integrated breadcrumb and navigation -->
    <TopNavigation {sidebarOpen} on:toggleSidebar={handleToggleSidebar} />

    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-transparent">
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="content-container rounded-3xl bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/20 p-6 sm:p-8">
          <slot />
        </div>
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

  .content-container {
    min-height: calc(100vh - 200px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .content-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 1.5rem;
    z-index: -1;
  }

  .content-container:hover {
    transform: translateY(-2px);
    shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
