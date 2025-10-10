import "clsx";
import "../../chunks/theme.js";
import "../../chunks/database.js";
import "../../chunks/functions.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    console.log("SvelteKit Home Maker app starting...");
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"><div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4"><div class="text-center"><div class="animate-pulse"><div class="text-blue-500 text-6xl mb-4">🏠</div> <h1 class="text-2xl font-bold text-gray-900 mb-4">Home Maker</h1> <p class="text-gray-600 mb-6">Initializing your family dashboard...</p> <div class="flex justify-center space-x-2"><div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div> <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div> <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div></div></div></div></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
