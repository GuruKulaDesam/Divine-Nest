import "clsx";
import { h as head, d as attr, a as ensure_array_like } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function ArchivePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems;
    let archivedItems = [];
    let searchTerm = "";
    let selectedCategory = "all";
    const categories = [
      { value: "all", label: "All Items" },
      { value: "documents", label: "Documents" },
      { value: "images", label: "Images" },
      { value: "assignments", label: "Assignments" },
      { value: "projects", label: "Projects" }
    ];
    filteredItems = archivedItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Education Archive - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Access archived educational materials and completed assignments"/>`);
    });
    $$renderer2.push(`<div class="max-w-6xl mx-auto p-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center gap-3 mb-6">`);
    Icon($$renderer2, {
      icon: "heroicons:archive-box",
      class: "w-8 h-8 text-indigo-600"
    });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold text-gray-800">Education Archive</h1></div> <div class="flex flex-col sm:flex-row gap-4 mb-6"><div class="flex-1"><input type="text"${attr("value", searchTerm)} placeholder="Search archived items..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/></div> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="space-y-4"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: item.type === "documents" ? "heroicons:document-text" : item.type === "images" ? "heroicons:photo" : item.type === "assignments" ? "heroicons:clipboard-document-list" : "heroicons:folder",
        class: "w-6 h-6 text-gray-600"
      });
      $$renderer2.push(`<!----> <div><p class="font-medium text-gray-800">${escape_html(item.title)}</p> <p class="text-sm text-gray-600">${escape_html(item.type)} • ${escape_html(item.date)} • ${escape_html(item.size)}</p></div></div> <div class="flex gap-2"><button class="text-indigo-600 hover:text-indigo-800 p-2" title="Download">`);
      Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <button class="text-gray-600 hover:text-gray-800 p-2" title="Restore">`);
      Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <button class="text-red-600 hover:text-red-800 p-2" title="Delete">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12 text-gray-500">`);
      Icon($$renderer2, {
        icon: "heroicons:archive-box",
        class: "w-16 h-16 mx-auto mb-4 text-gray-300"
      });
      $$renderer2.push(`<!----> <p class="text-lg font-medium">`);
      if (archivedItems.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`No archived items yet`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`No items match your search`);
      }
      $$renderer2.push(`<!--]--></p> <p class="text-sm">`);
      if (archivedItems.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`Completed educational materials will appear here`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Try adjusting your search or filter criteria`);
      }
      $$renderer2.push(`<!--]--></p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (archivedItems.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-8 p-4 bg-indigo-50 rounded-lg"><div class="flex items-center justify-between text-sm"><span class="text-indigo-700 font-medium">Archive Summary</span> <span class="text-indigo-600">${escape_html(archivedItems.length)} items • ${escape_html(archivedItems.reduce((sum, item) => sum + parseFloat(item.size), 0).toFixed(1))} MB total</span></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer) {
  ArchivePage($$renderer);
}
export {
  _page as default
};
