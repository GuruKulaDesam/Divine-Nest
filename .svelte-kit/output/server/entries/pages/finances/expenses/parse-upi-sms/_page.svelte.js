import { e as escape_html } from "../../../../../chunks/escaping.js";
import "clsx";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let smsText = "";
    $$renderer2.push(`<div class="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10"><h2 class="text-lg font-bold mb-4">UPI SMS Parser Demo</h2> <textarea class="w-full border rounded p-2 mb-2 svelte-3s7r9n" rows="4" placeholder="Paste a UPI SMS here...">`);
    const $$body = escape_html(smsText);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <button class="bg-blue-600 text-white px-4 py-2 rounded">Parse SMS</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
