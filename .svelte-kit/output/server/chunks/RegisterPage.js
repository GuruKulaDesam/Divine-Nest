import { c as store_get, d as attr, b as attr_class, u as unsubscribe_stores } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
function RegisterPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let fullName = "";
    let email = "";
    let password = "";
    let agreeToTerms = false;
    let isLoading = false;
    $$renderer2.push(`<div class="min-h-screen bg-base-100 flex items-center justify-center p-4 relative overflow-hidden svelte-rwrjw4"><div class="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#f8fafc] to-[#0ea5e9]/20 svelte-rwrjw4"><div class="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px] svelte-rwrjw4" style="mask-image: radial-gradient(white, transparent 70%)"></div></div> <div class="absolute top-0 -left-4 w-72 h-72 bg-[#6366f1]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob svelte-rwrjw4"></div> <div class="absolute top-0 -right-4 w-72 h-72 bg-[#0ea5e9]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 svelte-rwrjw4"></div> <div class="absolute -bottom-8 left-20 w-72 h-72 bg-[#14b8a6]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 svelte-rwrjw4"></div> <div class="max-w-md w-full relative svelte-rwrjw4"><div class="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 p-6 md:p-8 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-700/50 svelte-rwrjw4"><div class="flex justify-center mb-6 svelte-rwrjw4"><img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden svelte-rwrjw4"/> <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block svelte-rwrjw4"/></div> <div class="text-center mb-6 svelte-rwrjw4"><h1 class="text-xl font-semibold text-gray-900 dark:text-white svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register"))}</h1> <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register_description"))}</p></div> <form class="space-y-4 svelte-rwrjw4"><div class="svelte-rwrjw4"><label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.full_name"))}</label> <div class="relative group svelte-rwrjw4"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none svelte-rwrjw4">`);
    Icon($$renderer2, {
      icon: "heroicons:user",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="fullName" name="fullName" type="text" autocomplete="name" required${attr("value", fullName)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all svelte-rwrjw4" placeholder="John Doe"/></div></div> <div class="svelte-rwrjw4"><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.email"))}</label> <div class="relative group svelte-rwrjw4"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none svelte-rwrjw4">`);
    Icon($$renderer2, {
      icon: "heroicons:envelope",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all svelte-rwrjw4" placeholder="name@example.com"/></div></div> <div class="svelte-rwrjw4"><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.password"))}</label> <div class="relative group svelte-rwrjw4"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none svelte-rwrjw4">`);
    Icon($$renderer2, {
      icon: "heroicons:lock-closed",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="password" name="password" type="password" autocomplete="new-password" required${attr("value", password)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all svelte-rwrjw4" placeholder="••••••••"/></div></div> <div class="flex items-start svelte-rwrjw4"><div class="flex items-center h-5 svelte-rwrjw4"><input id="agree-terms" name="agree-terms" type="checkbox" required${attr("checked", agreeToTerms, true)} class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors svelte-rwrjw4"/></div> <label for="agree-terms" class="ml-2 block text-sm text-gray-600 dark:text-gray-400 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.agree_terms"))}</label></div> <div class="svelte-rwrjw4"><button type="submit"${attr_class("relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] svelte-rwrjw4", void 0, { "loading": isLoading })}${attr("disabled", !agreeToTerms, true)}>`);
    {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { icon: "heroicons:user-plus", class: "h-5 w-5 mr-2" });
      $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.create_account"))}`);
    }
    $$renderer2.push(`<!--]--></button></div></form> <div class="relative my-6 svelte-rwrjw4"><div class="absolute inset-0 flex items-center svelte-rwrjw4"><div class="w-full border-t border-gray-200 dark:border-gray-700 svelte-rwrjw4"></div></div> <div class="relative flex justify-center text-sm svelte-rwrjw4"><span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.or"))}</span></div></div> <div class="grid grid-cols-3 gap-2 svelte-rwrjw4"><button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-rwrjw4">`);
    Icon($$renderer2, { icon: "logos:google-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button> <button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-rwrjw4">`);
    Icon($$renderer2, { icon: "logos:github-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button> <button type="button" class="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:scale-[1.01] svelte-rwrjw4">`);
    Icon($$renderer2, { icon: "logos:facebook", class: "h-5 w-5" });
    $$renderer2.push(`<!----></button></div> <div class="text-center mt-6 text-sm svelte-rwrjw4"><p class="text-gray-600 dark:text-gray-400 svelte-rwrjw4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.already_have_account"))} <a href="/auth/login" class="font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors ml-1 svelte-rwrjw4">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-right-on-rectangle",
      class: "h-5 w-5 mr-1 inline-block"
    });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.sign_in"))}</a></p></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  RegisterPage as default
};
