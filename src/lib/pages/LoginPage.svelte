<script>
  import { onMount } from 'svelte';
  import { navigate } from '../router.js';
  import { motionInView, motionHover } from '../utils/motion.js';
  import Icon from '@iconify/svelte';
  
  let email = '';
  let password = '';
  let rememberMe = false;
  let isLoading = false;
  
  function handleSubmit() {
    isLoading = true;
    
    // Simulate login process
    setTimeout(() => {
      isLoading = false;
      navigate('/');
    }, 1500);
  }
</script>

<div class="min-h-screen bg-base-100 flex items-center justify-center p-4 relative overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#f8fafc] to-[#0ea5e9]/20">
    <div class="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]" style="mask-image: radial-gradient(white, transparent 70%)"></div>
  </div>
  
  <!-- Animated orbs -->
  <div class="absolute top-0 -left-4 w-72 h-72 bg-[#6366f1]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
  <div class="absolute top-0 -right-4 w-72 h-72 bg-[#0ea5e9]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
  <div class="absolute -bottom-8 left-20 w-72 h-72 bg-[#14b8a6]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

  <div class="max-w-md w-full relative">
    <!-- Glass card effect -->
    <div class="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 p-6 md:p-8 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-700/50" 
         use:motionInView={{ animation: 'fadeInUp' }}>
      <!-- Logo -->
      <div class="flex justify-center mb-6" use:motionInView={{ animation: 'fadeInDown' }}>
        <img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden" />
        <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block" />
      </div>
      
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white" use:motionInView={{ animation: 'fadeInUp', delay: 0.1 }}>Welcome back</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400" use:motionInView={{ animation: 'fadeInUp', delay: 0.2 }}>Sign in to your account to continue</p>
      </div>
      
      <!-- Form -->
      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <div use:motionInView={{ animation: 'fadeInUp', delay: 0.2 }}>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
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
              class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
              placeholder="name@example.com"
            />
          </div>
        </div>
        
        <div use:motionInView={{ animation: 'fadeInUp', delay: 0.3 }}>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="heroicons:lock-closed" class="h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              bind:value={password}
              class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div class="flex items-center justify-between" use:motionInView={{ animation: 'fadeInUp', delay: 0.3 }}>
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              bind:checked={rememberMe}
              class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label>
          </div>
          
          <div class="text-sm">
            <a href="#" class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors" use:motionHover>
              Forgot password?
            </a>
          </div>
        </div>
        
        <div use:motionInView={{ animation: 'fadeInUp', delay: 0.4 }}>
          <button
            type="submit"
            class="relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
            class:loading={isLoading}
            disabled={isLoading}
          >
            {#if !isLoading}
              <Icon icon="heroicons:arrow-right-on-rectangle" class="h-5 w-5 mr-2" />
              Sign in
            {/if}
          </button>
        </div>
      </form>
      
      <!-- Divider -->
      <div class="relative my-6" use:motionInView={{ animation: 'fadeInUp', delay: 0.5 }}>
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">Or continue with</span>
        </div>
      </div>
      
      <!-- Social logins -->
      <div class="grid grid-cols-3 gap-2" use:motionInView={{ animation: 'fadeInUp', delay: 0.6 }}>
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01]"
          use:motionHover
        >
          <Icon icon="logos:google-icon" class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01]"
          use:motionHover
        >
          <Icon icon="logos:facebook" class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01]"
          use:motionHover
        >
          <Icon icon="logos:github-icon" class="h-5 w-5" />
        </button>
      </div>
      
      <!-- Sign up link -->
      <div class="text-center mt-6 text-sm" use:motionInView={{ animation: 'fadeInUp', delay: 0.7 }}>
        <p class="text-gray-600 dark:text-gray-400">
          Don't have an account?
          <a 
            href="/auth/register" 
            on:click|preventDefault={() => navigate('/auth/register')}
            class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors ml-1"
            use:motionHover
          >
            <Icon icon="heroicons:user-plus" class="h-5 w-5 mr-1 inline-block" />
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
</style> 