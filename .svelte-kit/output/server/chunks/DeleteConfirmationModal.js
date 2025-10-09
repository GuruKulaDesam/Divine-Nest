import { d as attr, c as store_get, u as unsubscribe_stores, l as bind_props } from "./index2.js";
import { k as fallback } from "./utils.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
function DeleteConfirmationModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isOpen = fallback($$props["isOpen"], false);
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let itemName = fallback($$props["itemName"], "");
    let confirmText = fallback($$props["confirmText"], "");
    let cancelText = fallback($$props["cancelText"], "");
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"><div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h3 id="modal-title" class="text-lg font-semibold text-gray-900">${escape_html(title || store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.title"))}</h3> <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("common.close"))}><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div> <div class="p-6"><div class="flex items-start"><div class="flex-shrink-0"><div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div></div> <div class="ml-3"><p class="text-sm text-gray-700">${escape_html(message || store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.message"))} `);
      if (itemName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="font-semibold text-gray-900">"${escape_html(itemName)}"</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></p></div></div></div> <div class="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">${escape_html(cancelText || store_get($$store_subs ??= {}, "$_", $format)("common.cancel"))}</button> <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">${escape_html(confirmText || store_get($$store_subs ??= {}, "$_", $format)("common.delete"))}</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { isOpen, title, message, itemName, confirmText, cancelText });
  });
}
export {
  DeleteConfirmationModal as D
};
