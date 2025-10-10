import "clsx";
import { h as head, d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function LegacyPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems;
    let legacyItems = [];
    let searchQuery = "";
    let selectedCategory = "all";
    let categories = [
      { id: "jewelry", name: "Jewelry", tamil: "நகை" },
      { id: "documents", name: "Documents", tamil: "ஆவணங்கள்" },
      { id: "artifacts", name: "Artifacts", tamil: "பொருட்கள்" },
      { id: "property", name: "Property", tamil: "சொத்து" },
      { id: "books", name: "Books", tamil: "புத்தகங்கள்" },
      { id: "other", name: "Other", tamil: "மற்றவை" }
    ];
    function getCategoryName(categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      return category ? category.name : categoryId;
    }
    function getConditionColor(condition) {
      switch (condition) {
        case "excellent":
          return "text-green-600";
        case "good":
          return "text-blue-600";
        case "fair":
          return "text-yellow-600";
        case "poor":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    filteredItems = legacyItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Legacy Items - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Manage family legacy items, heirlooms, and valuable possessions"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white"><div class="flex items-center justify-between"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <div><h1 class="text-2xl font-bold">Legacy Items</h1> <p class="text-amber-100">Preserve and manage family heirlooms and valuable possessions</p></div></div> <button class="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Item</button></div></div> <div class="bg-base-100 rounded-xl p-6 shadow-sm"><div class="flex flex-wrap gap-4"><div class="form-control flex-1 min-w-64"><label class="label"><span class="label-text">Search Items</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select({ value: selectedCategory, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Categories`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(categories);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let category = each_array[$$index];
        $$renderer3.option({ value: category.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(category.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-base-100 rounded-xl p-4 shadow-sm"><div class="flex items-center gap-3"><div class="p-3 bg-amber-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-6 h-6 text-amber-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">Total Items</p> <p class="text-2xl font-bold">${escape_html(legacyItems.length)}</p></div></div></div> <div class="bg-base-100 rounded-xl p-4 shadow-sm"><div class="flex items-center gap-3"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">Excellent Condition</p> <p class="text-2xl font-bold">${escape_html(legacyItems.filter((item) => item.condition === "excellent").length)}</p></div></div></div> <div class="bg-base-100 rounded-xl p-4 shadow-sm"><div class="flex items-center gap-3"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">Documents</p> <p class="text-2xl font-bold">${escape_html(legacyItems.filter((item) => item.category === "documents").length)}</p></div></div></div> <div class="bg-base-100 rounded-xl p-4 shadow-sm"><div class="flex items-center gap-3"><div class="p-3 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/60">Jewelry Items</p> <p class="text-2xl font-bold">${escape_html(legacyItems.filter((item) => item.category === "jewelry").length)}</p></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<div class="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-base-content">${escape_html(item.name)}</h3> <p class="text-sm text-base-content/60">${escape_html(item.tamilName)}</p></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "heroicons:ellipsis-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-3"><div><span class="text-sm font-medium text-base-content/60">Category:</span> <span class="ml-2 px-2 py-1 bg-base-200 rounded-full text-xs">${escape_html(getCategoryName(item.category))}</span></div> <div><span class="text-sm font-medium text-base-content/60">Value:</span> <span class="ml-2 font-semibold text-green-600">${escape_html(item.value)}</span></div> <div><span class="text-sm font-medium text-base-content/60">Condition:</span> <span${attr_class(`ml-2 ${stringify(getConditionColor(item.condition))} capitalize`)}>${escape_html(item.condition)}</span></div> <div><span class="text-sm font-medium text-base-content/60">Location:</span> <span class="ml-2">${escape_html(item.location)}</span></div> `);
      if (item.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70">${escape_html(item.description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="pt-2 border-t border-base-300"><p class="text-xs text-base-content/50">${escape_html(item.notes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:sparkles",
        class: "w-16 h-16 text-base-content/20 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/60 mb-2">No legacy items found</h3> <p class="text-base-content/40">Add your first family heirloom or valuable possession</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  LegacyPage($$renderer);
}
export {
  _page as default
};
