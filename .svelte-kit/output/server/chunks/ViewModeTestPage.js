import { e as escape_html } from "./context.js";
import "clsx";
function ViewModeTestPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let message = "Loading...";
    $$renderer2.push(`<div class="p-6 bg-blue-100 dark:bg-blue-900 rounded-xl"><h1 class="text-2xl font-bold text-blue-800 dark:text-blue-200">Test Page</h1> <p class="text-blue-700 dark:text-blue-300 mt-4">${escape_html(message)}</p> <p class="text-sm text-blue-600 dark:text-blue-400 mt-2">If you can see this, the route is working!</p></div>`);
  });
}
export {
  ViewModeTestPage as default
};
