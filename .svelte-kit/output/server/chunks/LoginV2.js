import { d as attr, b as attr_class } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
function LoginV2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let rememberMe = false;
    let isLoading = false;
    $$renderer2.push(`<div class="min-h-screen flex"><div class="hidden lg:flex lg:w-1/2 relative"><div class="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#0ea5e9]"><div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover bg-center mix-blend-overlay opacity-20"></div></div> <div class="relative w-full flex items-center justify-center p-12 text-center"><div class="space-y-6"><img src="/logo-light.svg" alt="Logo" class="h-12 mx-auto filter brightness-0 invert"/> <h1 class="text-3xl font-bold text-white">Welcome to Dashboard</h1> <p class="text-lg text-white/80 max-w-md mx-auto">Streamline your workflow with our intuitive dashboard. Manage everything in one place.</p></div></div></div> <div class="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900"><div class="w-full max-w-md space-y-8 px-4"><div class="lg:hidden flex justify-center"><img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden"/> <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block"/></div> <div class="text-center"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2> <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Or <a href="/auth/register" class="text-[#6366f1] hover:text-[#4f46e5] font-medium">create a new account</a></p></div> <div class="space-y-3"><button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">`);
    Icon($$renderer2, { icon: "logos:google-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> <span>Continue with Google</span></button> <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">`);
    Icon($$renderer2, { icon: "logos:github-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> <span>Continue with GitHub</span></button></div> <div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-gray-700"></div></div> <div class="relative flex justify-center text-sm"><span class="px-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">Or continue with</span></div></div> <form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label> <div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:envelope",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all" placeholder="name@example.com"/></div></div> <div><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label> <div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:lock-closed",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="password" name="password" type="password" autocomplete="current-password" required${attr("value", password)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all" placeholder="••••••••"/></div></div> <div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me" name="remember-me" type="checkbox"${attr("checked", rememberMe, true)} class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors"/> <label for="remember-me" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label></div> <a href="#" class="text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors">Forgot password?</a></div> <button type="submit"${attr_class("relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]", void 0, { "loading": isLoading })}${attr("disabled", isLoading, true)}>`);
    {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, {
        icon: "heroicons:arrow-right-on-rectangle",
        class: "h-5 w-5 mr-2"
      });
      $$renderer2.push(`<!----> Sign in`);
    }
    $$renderer2.push(`<!--]--></button></form></div></div></div>`);
  });
}
export {
  LoginV2 as default
};
