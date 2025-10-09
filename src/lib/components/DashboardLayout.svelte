<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import RightTileBar from "./RightTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";

  // Handle actions from the right tile bar
  function handleRightTileAction(event) {
    const { action, tile } = event.detail;
    console.log(`Action triggered: ${action}`, tile);

    // Here you can implement the logic for each action
    // For example, opening modals, triggering saves, etc.
    switch (action) {
      case "save":
        // Implement save logic
        console.log("Save action triggered");
        break;
      case "submit":
        // Implement submit logic
        console.log("Submit action triggered");
        break;
      case "add":
        // Implement add logic
        console.log("Add action triggered");
        break;
      case "update":
        // Implement update logic
        console.log("Update action triggered");
        break;
      case "remove":
        // Implement remove logic
        console.log("Remove action triggered");
        break;
      case "sms":
        // Implement SMS logic
        console.log("SMS action triggered");
        break;
      case "emails":
        // Implement emails logic
        console.log("Emails action triggered");
        break;
      case "alarms":
        // Implement alarms logic
        console.log("Alarms action triggered");
        break;
      case "todos":
        // Implement todos logic
        console.log("Todos action triggered");
        break;
      case "checklists":
        // Implement checklists logic
        console.log("Checklists action triggered");
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  }
</script>

<div class="flex h-screen bg-base-200 mountain-background" data-theme="modern">
  <!-- Left Container -->
  <div class="flex-shrink-0">
    <LeftTileBar />
  </div>

  <!-- Middle Container -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Top Navigation Bar for sub-menus - Integrated with main content -->
    <div class="flex-shrink-0">
      <TopNavigationBar />
    </div>

    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-transparent">
      <div class="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28">
        <div class="content-container rounded-3xl bg-base-100/90 backdrop-blur-xl shadow-2xl border-0 p-6 sm:p-8">
          <slot />
        </div>
      </div>
    </main>
  </div>

  <!-- Right Container -->
  <div class="flex-shrink-0">
    <RightTileBar on:action={handleRightTileAction} />
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
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
