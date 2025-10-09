import { c as store_get, d as attr, a as ensure_array_like, b as attr_class, s as stringify, u as unsubscribe_stores } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
    description: "High-quality wireless headphones with noise cancellation",
    sku: "ELEC-001",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Wearables",
    price: 199.99,
    stock: 23,
    status: "active",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
    description: "Advanced fitness tracking with heart rate monitoring",
    sku: "WEAR-002",
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 156,
    status: "active",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
    description: "Comfortable organic cotton t-shirt in various colors",
    sku: "CLTH-003",
    createdAt: "2024-01-05"
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 49.99,
    stock: 0,
    status: "out-of-stock",
    image: "https://images.unsplash.com/photo-1609592806598-04d4d5d6903c?w=150&h=150&fit=crop",
    description: "Fast wireless charging pad compatible with all devices",
    sku: "ELEC-004",
    createdAt: "2024-01-20"
  },
  {
    id: 5,
    name: "Leather Wallet",
    category: "Accessories",
    price: 79.99,
    stock: 12,
    status: "active",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&h=150&fit=crop",
    description: "Genuine leather wallet with RFID protection",
    sku: "ACC-005",
    createdAt: "2024-01-12"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 89.99,
    stock: 34,
    status: "active",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop",
    description: "Portable Bluetooth speaker with 20-hour battery life",
    sku: "ELEC-006",
    createdAt: "2024-01-08"
  }
];
const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Wearables", label: "Wearables" },
  { value: "Clothing", label: "Clothing" },
  { value: "Accessories", label: "Accessories" }
];
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "draft", label: "Draft" }
];
const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price", label: "Price (Low-High)" },
  { value: "price-desc", label: "Price (High-Low)" },
  { value: "stock", label: "Stock (Low-High)" },
  { value: "created", label: "Date Created" }
];
function getStatusColor(status) {
  switch (status) {
    case "active":
      return "badge badge-success badge-outline";
    case "out-of-stock":
      return "badge badge-error badge-outline";
    case "draft":
      return "badge badge-warning badge-outline";
    default:
      return "badge badge-neutral badge-outline";
  }
}
function getStockColor(stock) {
  if (Number(stock) === 0) return "text-error";
  if (Number(stock) < 20) return "text-warning";
  return "text-success";
}
function getStatusDisplayText(status) {
  switch (status) {
    case "active":
      return "Active";
    case "out-of-stock":
      return "Out of Stock";
    case "draft":
      return "Draft";
    default:
      return status;
  }
}
function ProductsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let filteredProducts, sortedProducts;
    let products$1 = [...products];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    let selectedSortBy = "name";
    filteredProducts = products$1.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesCategory && matchesStatus;
    });
    sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (selectedSortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
        case "stock":
          return Number(a.stock) - Number(b.stock);
        case "stock-desc":
          return Number(b.stock) - Number(a.stock);
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "created-desc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, { icon: "heroicons:cube", class: "w-full h-full text-primary" });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:shopping-cart",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(
      // Functions
      store_get($$store_subs ??= {}, "$_", $format)("products.title")
    )}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.description"))}</p></div> <button class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.add_product"))}</div></button></div></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:funnel",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="lg:col-span-2"><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.search_products"))}</label> <div class="join w-full"><div class="join-item flex-1"><input type="text"${attr("value", searchQuery)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("products.search_placeholder"))} class="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"/></div> <button class="btn join-item hover:text-base-content"><div class="p-1 rounded bg-base-200 group-hover:bg-base-300 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:magnifying-glass", class: "w-4 h-4" });
    $$renderer2.push(`<!----></div></button></div></div> <div><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.category"))}</label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categoryOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.status"))}</label> `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(statusOptions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let option = each_array_1[$$index_1];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="relative flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-base-300/50 gap-4"><div class="flex flex-wrap items-center gap-3"><span class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.sort_by"))}</span> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array_2 = ensure_array_like(sortOptions);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let option = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class(`btn btn-sm ${stringify(selectedSortBy === option.value ? "btn-primary" : "btn-ghost")} gap-2 group hover:shadow-md transition-all duration-200`)}><div${attr_class(`p-1 rounded ${stringify(selectedSortBy === option.value ? "bg-primary-content/10 group-hover:bg-primary-content/20" : "bg-base-200 group-hover:bg-base-300")} transition-colors duration-200`)}>`);
      if (option.value.includes("desc")) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:arrow-down", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
        Icon($$renderer2, { icon: "heroicons:arrow-up", class: "w-4 h-4" });
      }
      $$renderer2.push(`<!--]--></div> ${escape_html(option.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="text-sm text-base-content/60 flex items-center gap-2"><div class="p-1 rounded bg-base-200">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "w-4 h-4" });
    $$renderer2.push(`<!----></div> <span>${escape_html(sortedProducts.length)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("common.of"))} ${escape_html(products$1.length)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.products_found"))}</span></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(sortedProducts);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let product = each_array_3[$$index_3];
      $$renderer2.push(`<div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
      Icon($$renderer2, { icon: "heroicons:cube", class: "w-full h-full text-primary" });
      $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <figure class="relative h-48 bg-base-200"><img${attr("src", product.image)}${attr("alt", product.name)} class="w-full h-full object-cover"/> <div class="absolute top-2 right-2"><div${attr_class(`badge ${stringify(getStatusColor(product.status))} shadow-md`)}>${escape_html(getStatusDisplayText(product.status))}</div></div></figure> <div class="relative p-5"><div class="flex items-start justify-between mb-3"><h3 class="card-title text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">${escape_html(product.name)}</h3> <button class="btn btn-ghost btn-xs hover:text-base-content group"><div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:pencil-square", class: "w-4 h-4" });
      $$renderer2.push(`<!----></div></button></div> <p class="text-xs text-base-content/60 mb-4 line-clamp-2">${escape_html(product.description)}</p> <div class="flex items-center justify-between mb-4"><span class="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-200">$${escape_html(product.price)}</span> <span${attr_class(`text-sm font-medium ${stringify(getStockColor(product.stock))}`)}>${escape_html(product.stock)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.in_stock"))}</span></div> <div class="flex items-center justify-between text-xs text-base-content/60 mb-4"><span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.sku"))}: ${escape_html(product.sku)}</span> <span>${escape_html(product.category)}</span></div> <div class="card-actions justify-end"><button class="btn btn-outline btn-primary btn-sm hover:text-primary-content group"><div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">`);
      Icon($$renderer2, {
        icon: "heroicons:pencil-square",
        class: "w-4 h-4 mr-1 text-primary"
      });
      $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.edit"))}</button> <button class="btn btn-outline btn-error btn-sm hover:text-white group"><div class="p-1 rounded bg-error/10 group-hover:bg-error/20 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4 mr-1 text-error" });
      $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.delete"))}</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (sortedProducts.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 backdrop-blur-sm"><div class="absolute top-0 right-0 w-24 h-24 opacity-5">`);
      Icon($$renderer2, { icon: "heroicons:cube", class: "w-full h-full text-primary" });
      $$renderer2.push(`<!----></div> <div class="relative card-body text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:cube",
        class: "w-16 h-16 text-base-content/40 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.no_products_found"))}</h3> <p class="text-base-content/60 mb-6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.try_adjusting_search"))}</p> <button class="btn btn-primary shadow-md hover:text-primary-content group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1 rounded bg-primary-content/10 group-hover:bg-primary-content/20 transition-colors duration-300">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("products.add_first_product"))}</div></button></div></div>`);
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
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  ProductsPage as default
};
