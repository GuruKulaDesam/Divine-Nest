<script>
  import { onMount } from 'svelte';
  import { navigate } from '../router.js';
  import { motionInView, motionHover } from '../utils/motion.js';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';
  
  let fullName = '';
  let email = '';
  let password = '';
  let agreeToTerms = false;
  let isLoading = false;
  
  function handleSubmit() {
    isLoading = true;
    
    // Simulate registration process
    setTimeout(() => {
      isLoading = false;
      navigate('/');
    }, 1500);
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#0ea5e9] p-4">
  <div class="relative w-full max-w-md">
    <!-- Decorative cards -->
    <div class="absolute inset-0 transform rotate-[-8deg] scale-[0.98] z-0">
      <div class="w-full h-full bg-white/20 backdrop-blur-lg rounded-2xl"></div>
    </div>
    <div class="absolute inset-0 transform rotate-[4deg] scale-[0.98] z-0">
      <div class="w-full h-full bg-white/20 backdrop-blur-lg rounded-2xl"></div>
    </div>

    <!-- Main card -->
    <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 z-10">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden" />
        <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block" />
      </div>

      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{$_('auth.register')}</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {$_('auth.already_have_account')} <a href="/auth/login-v3" class="text-[#6366f1] hover:text-[#4f46e5] font-medium">{$_('auth.sign_in')}</a>
        </p>
      </div>

      <!-- Social Logins -->
      <div class="space-y-3 mb-6">
        <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">
          <Icon icon="logos:google-icon" class="h-5 w-5" />
          <span>{$_('auth.continue_with_google')}</span>
        </button>
        <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">
          <Icon icon="logos:github-icon" class="h-5 w-5" />
          <span>{$_('auth.continue_with_github')}</span>
        </button>
        <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">
          <Icon icon="logos:facebook" class="h-5 w-5" />
          <span>{$_('auth.continue_with_facebook')}</span>
        </button>
      </div>

      <div class="relative mb-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">{$_('auth.or')}</span>
        </div>
      </div>

      <!-- Registration Form -->
      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="full-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{$_('auth.full_name')}</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="heroicons:user" class="h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
            </div>
            <input
              id="full-name"
              name="full-name"
              type="text"
              required
              bind:value={fullName}
              class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{$_('auth.email')}</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="heroicons:envelope" class="h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{$_('auth.password')}</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="heroicons:lock-closed" class="h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              bind:value={password}
              class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            bind:checked={agreeToTerms}
            required
            class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">
            {$_('auth.agree_terms')}
          </label>
        </div>

        <button
          type="submit"
          class="relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
          class:loading={isLoading}
          disabled={isLoading}
        >
          {#if !isLoading}
            <Icon icon="heroicons:user-plus" class="h-5 w-5 mr-2" />
            {$_('auth.create_account')}
          {/if}
        </button>
      </form>
    </div>
  </div>
</div> 