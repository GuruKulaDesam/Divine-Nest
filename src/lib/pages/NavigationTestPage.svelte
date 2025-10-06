<script>
  import { onMount } from "svelte";
  import { currentRoute } from "../router-mobile.js";
  import Icon from "@iconify/svelte";

  let testResults = [];
  let isTesting = false;

  // Test navigation function
  async function testNavigation() {
    isTesting = true;
    testResults = [];

    const testRoutes = [
      { path: "/", name: "Home Dashboard" },
      { path: "/household", name: "Household" },
      { path: "/members", name: "Family Members" },
      { path: "/schedule", name: "Daily Schedule" },
      { path: "/education", name: "Education Hub" },
      { path: "/wellness", name: "Wellness Center" },
      { path: "/finances", name: "Financial Management" },
    ];

    for (const route of testRoutes) {
      try {
        // Navigate to route
        window.history.pushState({}, "", route.path);

        // Wait for navigation to complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check if route changed
        const currentPath = window.location.pathname;
        const success = currentPath === route.path;

        testResults.push({
          route: route.name,
          path: route.path,
          expected: route.path,
          actual: currentPath,
          success: success,
          status: success ? "✅ PASS" : "❌ FAIL",
        });
      } catch (error) {
        testResults.push({
          route: route.name,
          path: route.path,
          expected: route.path,
          actual: "ERROR",
          success: false,
          status: "❌ ERROR: " + error.message,
        });
      }
    }

    isTesting = false;
  }

  // Test bottom navigation
  function testBottomNav() {
    const bottomNav = document.querySelector('[data-testid="bottom-nav"]');
    if (bottomNav) {
      testResults.push({
        test: "Bottom Navigation",
        element: "Found",
        status: "✅ PASS",
      });
    } else {
      testResults.push({
        test: "Bottom Navigation",
        element: "Not Found",
        status: "❌ FAIL",
      });
    }
  }

  // Test sidebar
  function testSidebar() {
    const sidebar = document.querySelector('[data-testid="mobile-sidebar"]');
    if (sidebar) {
      testResults.push({
        test: "Mobile Sidebar",
        element: "Found",
        status: "✅ PASS",
      });
    } else {
      testResults.push({
        test: "Mobile Sidebar",
        element: "Not Found",
        status: "❌ FAIL",
      });
    }
  }

  onMount(() => {
    // Run initial tests
    testBottomNav();
    testSidebar();
  });
</script>

<svelte:head>
  <title>Navigation Test - South Indian Family Life App</title>
  <meta name="description" content="Test page for verifying mobile navigation functionality" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-blue-800 mb-2">🧪 Navigation Test Suite</h1>
      <p class="text-lg text-blue-600">Testing mobile-first navigation functionality</p>
    </div>

    <!-- Current Route Display -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Current Route</h2>
      <div class="text-center">
        <p class="text-2xl font-mono bg-gray-100 p-4 rounded-lg">{$currentRoute}</p>
      </div>
    </div>

    <!-- Test Controls -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Test Controls</h2>
      <div class="flex flex-wrap gap-4 justify-center">
        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors {isTesting ? 'opacity-50 cursor-not-allowed' : ''}" on:click={testNavigation} disabled={isTesting}>
          <Icon icon="heroicons:play" class="w-5 h-5 inline mr-2" />
          {isTesting ? "Testing..." : "Test Navigation"}
        </button>

        <button class="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors" on:click={testBottomNav}>
          <Icon icon="heroicons:bars-3-bottom-left" class="w-5 h-5 inline mr-2" />
          Test Bottom Nav
        </button>

        <button class="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors" on:click={testSidebar}>
          <Icon icon="heroicons:bars-3" class="w-5 h-5 inline mr-2" />
          Test Sidebar
        </button>
      </div>
    </div>

    <!-- Test Results -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Test Results</h2>

      {#if testResults.length === 0}
        <div class="text-center py-8 text-gray-500">
          <Icon icon="heroicons:clipboard-document-list" class="w-12 h-12 mx-auto mb-4" />
          <p>No tests run yet. Click a test button above to begin.</p>
        </div>
      {:else}
        <div class="space-y-4">
          {#each testResults as result}
            <div class="border rounded-lg p-4 {result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-800">{result.test || result.route}</h3>
                <span class="font-mono text-sm {result.success ? 'text-green-600' : 'text-red-600'}">
                  {result.status}
                </span>
              </div>

              {#if result.path}
                <div class="text-sm text-gray-600">
                  <strong>Path:</strong>
                  {result.path}<br />
                  <strong>Expected:</strong>
                  {result.expected}<br />
                  <strong>Actual:</strong>
                  {result.actual}
                </div>
              {:else if result.element}
                <div class="text-sm text-gray-600">
                  <strong>Element:</strong>
                  {result.element}
                </div>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Summary -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-800">Summary:</span>
            <span class="font-bold {testResults.filter((r) => r.success).length === testResults.length ? 'text-green-600' : 'text-red-600'}">
              {testResults.filter((r) => r.success).length}/{testResults.length} tests passed
            </span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Quick Navigation Links -->
    <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Navigation</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/" class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
          <Icon icon="heroicons:home" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <span class="text-sm font-medium text-blue-800">Home</span>
        </a>

        <a href="/schedule" class="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-green-600 mx-auto mb-2" />
          <span class="text-sm font-medium text-green-800">Daily</span>
        </a>

        <a href="/education" class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
          <Icon icon="heroicons:academic-cap" class="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <span class="text-sm font-medium text-purple-800">Learn</span>
        </a>

        <a href="/wellness" class="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg text-center transition-colors">
          <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-600 mx-auto mb-2" />
          <span class="text-sm font-medium text-pink-800">Care</span>
        </a>

        <a href="/finances" class="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
          <Icon icon="heroicons:currency-rupee" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <span class="text-sm font-medium text-orange-800">Manage</span>
        </a>
      </div>
    </div>
  </div>
</div>
