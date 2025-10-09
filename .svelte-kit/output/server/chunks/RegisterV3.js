import { c as store_get, d as attr, b as attr_class, u as unsubscribe_stores } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
function RegisterV3($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let fullName = "";
    let email = "";
    let password = "";
    let agreeToTerms = false;
    let isLoading = false;
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#0ea5e9] p-4"><div class="relative w-full max-w-md"><div class="absolute inset-0 transform rotate-[-8deg] scale-[0.98] z-0"><div class="w-full h-full bg-white/20 backdrop-blur-lg rounded-2xl"></div></div> <div class="absolute inset-0 transform rotate-[4deg] scale-[0.98] z-0"><div class="w-full h-full bg-white/20 backdrop-blur-lg rounded-2xl"></div></div> <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 z-10"><div class="flex justify-center mb-8"><img src="/logo-light.svg" alt="Logo" class="h-10 dark:hidden"/> <img src="/logo-dark.svg" alt="Logo" class="h-10 hidden dark:block"/></div> <div class="text-center mb-8"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register"))}</h2> <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.already_have_account"))} <a href="/auth/login-v3" class="text-[#6366f1] hover:text-[#4f46e5] font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.sign_in"))}</a></p></div> <div class="space-y-3 mb-6"><button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">`);
    Icon($$renderer2, { icon: "logos:google-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.continue_with_google"))}</span></button> <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">`);
    Icon($$renderer2, { icon: "logos:github-icon", class: "h-5 w-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.continue_with_github"))}</span></button> <button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">`);
    Icon($$renderer2, { icon: "logos:facebook", class: "h-5 w-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.continue_with_facebook"))}</span></button></div> <div class="relative mb-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-gray-700"></div></div> <div class="relative flex justify-center text-sm"><span class="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.or"))}</span></div></div> <form class="space-y-4"><div><label for="full-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.full_name"))}</label> <div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:user",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="full-name" name="full-name" type="text" required${attr("value", fullName)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all" placeholder="John Doe"/></div></div> <div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.email"))}</label> <div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:envelope",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="email" name="email" type="email" autocomplete="email" required${attr("value", email)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all" placeholder="name@example.com"/></div></div> <div><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.password"))}</label> <div class="relative group"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:lock-closed",
      class: "h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors"
    });
    $$renderer2.push(`<!----></div> <input id="password" name="password" type="password" required${attr("value", password)} class="block w-full pl-10 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all" placeholder="••••••••"/></div></div> <div class="flex items-center"><input id="agree-terms" name="agree-terms" type="checkbox"${attr("checked", agreeToTerms, true)} required class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#6366f1] focus:ring-[#6366f1]/20 transition-colors"/> <label for="agree-terms" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.agree_terms"))}</label></div> <button type="submit"${attr_class("relative w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]", void 0, { "loading": isLoading })}${attr("disabled", isLoading, true)}>`);
    {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { icon: "heroicons:user-plus", class: "h-5 w-5 mr-2" });
      $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.create_account"))}`);
    }
    $$renderer2.push(`<!--]--></button></form></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  RegisterV3 as default
};
