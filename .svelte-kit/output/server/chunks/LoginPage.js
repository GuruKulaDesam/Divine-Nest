import { d as attr, b as attr_class } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
function LoginPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let rememberMe = false;
    let isLoading = false;
    $$renderer2.push(`<div class="min-h-screen bg-base-100 flex items-center justify-center p-4 relative overflow-hidden svelte-hanouc"><div class="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#f8fafc] to-[#0ea5e9]/20 svelte-hanouc"><div class="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px] svelte-hanouc" style="mask-image: radial-gradient(white, transparent 70%)"></div></div> <div class="absolute top-0 -left-4 w-72 h-72 bg-[#6366f1]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob svelte-hanouc"></div> <div class="absolute top-0 -right-4 w-72 h-72 bg-[#0ea5e9]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 svelte-hanouc"></div> <div class="absolute -bottom-8 left-20 w-72 h-72 bg-[#14b8a6]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 svelte-hanouc"></div> <div class="max-w-md w-full relative svelte-hanouc"><div class="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 p-6 md:p-8 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-700/50 svelte-hanouc"><div class="flex justify-center mb-6 svelte-hanouc"><img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden svelte-hanouc"/> <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block svelte-hanouc"/></div> <div class="text-center mb-6 svelte-hanouc"><h1 class="text-xl font-semibold text-gray-900 dark:text-white svelte-hanouc">Welcome back</h1> <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 svelte-hanouc">Sign in to your account to continue</p></div> <form class="space-y-4 svelte-hanouc"><div class="svelte-hanouc"><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 svelte-hanouc">Email address</label> <div class="relative group svelte-hanouc"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none svelte-hanouc">`);
    Icon($$renderer2, {
      icon: "heroicons:envelope",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all svelte-hanouc" placeholder="name@example.com"/></div></div> <div class="svelte-hanouc"><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 svelte-hanouc">Password</label> <div class="relative group svelte-hanouc"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none svelte-hanouc">`);
    Icon($$renderer2, {
      icon: "heroicons:lock-closed",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="password" name="password" type="password" autocomplete="current-password" required${attr("value", password)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all svelte-hanouc" placeholder="••••••••"/></div></div> <div class="flex items-center justify-between svelte-hanouc"><div class="flex items-center svelte-hanouc"><input id="remember-me" name="remember-me" type="checkbox"${attr("checked", rememberMe, true)} class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors svelte-hanouc"/> <label for="remember-me" class="ml-2 block text-sm text-gray-600 dark:text-gray-400 svelte-hanouc">Remember me</label></div> <div class="text-sm svelte-hanouc"><a href="#" class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors svelte-hanouc">Forgot password?</a></div></div> <div class="svelte-hanouc"><button type="submit"${attr_class("relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] svelte-hanouc", void 0, { "loading": isLoading })}${attr("disabled", isLoading, true)}>`);
    {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, {
        icon: "heroicons:arrow-right-on-rectangle",
        class: "h-5 w-5 mr-2"
      });
      $$renderer2.push(`<!----> Sign in`);
    }
    $$renderer2.push(`<!--]--></button></div></form> <div class="relative my-6 svelte-hanouc"><div class="absolute inset-0 flex items-center svelte-hanouc"><div class="w-full border-t border-gray-200 dark:border-gray-700 svelte-hanouc"></div></div> <div class="relative flex justify-center text-sm svelte-hanouc"><span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 svelte-hanouc">Or continue with</span></div></div> <div class="grid grid-cols-3 gap-2 svelte-hanouc"><button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-hanouc">`);
    Icon($$renderer2, { icon: "logos:google-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button> <button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-hanouc">`);
    Icon($$renderer2, { icon: "logos:facebook", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button> <button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-hanouc">`);
    Icon($$renderer2, { icon: "logos:github-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button></div> <div class="text-center mt-6 text-sm svelte-hanouc"><p class="text-gray-600 dark:text-gray-400 svelte-hanouc">Don't have an account? <a href="/auth/register" class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors ml-1 svelte-hanouc">`);
    Icon($$renderer2, {
      icon: "heroicons:user-plus",
      class: "h-5 w-5 mr-1 inline-block"
    });
    $$renderer2.push(`<!----> Sign up</a></p></div></div></div></div>`);
  });
}
export {
  LoginPage as default
};
