import "clsx";
import { I as Icon } from "./Icon.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils2.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
function HealthPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><div class="flex items-center space-x-3 mb-6">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Health Tracking</h1></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  HealthPage as default
};
