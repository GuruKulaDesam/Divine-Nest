<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '$lib/utils/motion';

  let privacyContent = '';
  let loading = true;

  onMount(async () => {
    try {
      // Load privacy policy content
      const response = await fetch('/PRIVACY_POLICY.md');
      if (response.ok) {
        privacyContent = await response.text();
      } else {
        privacyContent = `# Privacy Policy

We are committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your information.

## Information We Collect

- **Personal Information**: Name, email address, and other contact details you provide
- **Usage Data**: How you interact with our app and services
- **Device Information**: Device type, operating system, and app version

## How We Use Your Information

- To provide and maintain our services
- To communicate with you about updates and features
- To improve our app and develop new features
- To ensure security and prevent fraud

## Data Sharing

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at support@shivo.ai.

*Last updated: 2024*`;
      }
    } catch (error) {
      console.error('Error loading privacy policy:', error);
      privacyContent = 'Error loading privacy policy. Please try again later.';
    } finally {
      loading = false;
    }
  });

  // Convert markdown to simple HTML (basic implementation)
  function markdownToHtml(markdown) {
    return markdown
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  }
</script>

<svelte:head>
  <title>Privacy Policy - Divine Nest</title>
  <meta name="description" content="Privacy Policy for Divine Nest - South Indian Family App" />
</svelte:head>

<main class="privacy-policy-container">
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center space-x-3 mb-4">
        <Icon icon="heroicons:shield-check" class="w-8 h-8 text-green-600" />
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400">
        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
      </p>
    </div>

    <!-- Back Button -->
    <div class="mb-6">
      <button
        on:click={() => window.history.back()}
        class="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        use:motionHover
      >
        <Icon icon="heroicons:arrow-left" class="w-4 h-4" />
        <span>Back to Settings</span>
      </button>
    </div>

    <!-- Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8" use:motionInView>
      {#if loading}
        <div class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600 dark:text-gray-400">Loading privacy policy...</span>
        </div>
      {:else}
        <div class="prose prose-gray dark:prose-invert max-w-none">
          {@html markdownToHtml(privacyContent)}
        </div>
      {/if}
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:support@shivo.ai" class="text-blue-600 hover:underline">support@shivo.ai</a></p>
    </div>
  </div>
</main>

<style>
  .privacy-policy-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .privacy-policy-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  :global(.prose) {
    color: inherit;
  }

  :global(.prose h1) {
    color: inherit;
  }

  :global(.prose h2) {
    color: inherit;
  }

  :global(.prose h3) {
    color: inherit;
  }

  :global(.prose strong) {
    color: inherit;
  }

  :global(.prose p) {
    color: inherit;
  }

  :global(.prose li) {
    color: inherit;
  }
</style>