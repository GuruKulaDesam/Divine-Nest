import { d as attr, b as attr_class } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
function LoginV3($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let rememberMe = false;
    let isLoading = false;
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#818cf8]/40 via-white to-[#60a5fa]/40 dark:from-[#312e81]/40 dark:via-gray-900 dark:to-[#1e3a8a]/40"><div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'30\\' height=\\'30\\' viewBox=\\'0 0 30 30\\' fill=\\'none\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\\' fill=\\'rgba(99,102,241,0.07)\\'%3E%3C/path%3E%3C/svg%3E')"></div> <div class="relative w-full max-w-md"><div class="absolute inset-0 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl transform -rotate-6 scale-105 opacity-75"></div> <div class="absolute inset-0 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transform rotate-3 scale-105 opacity-75"></div> <div class="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"><div class="flex justify-center mb-8"><div class="relative"><div class="absolute -inset-4 bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div> <img src="/logo-light.svg" alt="Logo" class="h-12 relative dark:hidden"/> <img src="/logo-dark.svg" alt="Logo" class="h-12 relative hidden dark:block"/></div></div> <div class="text-center mb-8"><h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] to-[#0ea5e9]">Welcome Back!</h2> <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Please sign in to your account</p></div> <form class="space-y-6"><div class="space-y-4"><div><div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:envelope",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="block w-full pl-10 pr-3 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border-0 rounded-xl focus:ring-2 focus:ring-[#6366f1] transition-all" placeholder="Email address"/></div></div> <div><div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:lock-closed",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="password" name="password" type="password" autocomplete="current-password" required${attr("value", password)} class="block w-full pl-10 pr-3 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border-0 rounded-xl focus:ring-2 focus:ring-[#6366f1] transition-all" placeholder="Password"/></div></div></div> <div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me" name="remember-me" type="checkbox"${attr("checked", rememberMe, true)} class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors"/> <label for="remember-me" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label></div> <a href="#" class="text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors">Forgot password?</a></div> <button type="submit"${attr_class("relative w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100", void 0, { "loading": isLoading })}${attr("disabled", isLoading, true)}>`);
    {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, {
        icon: "heroicons:arrow-right-on-rectangle",
        class: "h-5 w-5 mr-2"
      });
      $$renderer2.push(`<!----> Sign in`);
    }
    $$renderer2.push(`<!--]--></button> <div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-gray-700"></div></div> <div class="relative flex justify-center text-sm"><span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">Or continue with</span></div></div> <div class="grid grid-cols-2 gap-3"><button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.02]">`);
    Icon($$renderer2, { icon: "logos:google-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> Google</button> <button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.02]">`);
    Icon($$renderer2, { icon: "logos:github-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> GitHub</button></div></form> <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">Don't have an account? <a href="/auth/register" class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors">Sign up now</a></p></div></div></div>`);
  });
}
export {
  LoginV3 as default
};
