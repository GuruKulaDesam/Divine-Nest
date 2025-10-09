import { c as store_get, d as attr, a as ensure_array_like, s as stringify, u as unsubscribe_stores } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { c as currentRoute } from "./router.js";
import { e as escape_html } from "./context.js";
function ContactsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let filteredContacts, pageTitle, pageDescription;
    let contacts = [];
    let searchQuery = "";
    let selectedCategory = "all";
    const categories = ["family", "friends", "professional", "neighbors", "other"];
    function getCategoryIcon(category) {
      const icons = {
        family: "heroicons:heart",
        friends: "heroicons:user-group",
        professional: "heroicons:briefcase",
        neighbors: "heroicons:home",
        other: "heroicons:user"
      };
      return icons[category] || "heroicons:user";
    }
    function getCategoryColor(category) {
      const colors = {
        family: "text-red-500",
        friends: "text-blue-500",
        professional: "text-purple-500",
        neighbors: "text-green-500",
        other: "text-gray-500"
      };
      return colors[category] || "text-gray-500";
    }
    filteredContacts = contacts.filter((contact) => {
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery) || contact.email.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesRoute = true;
      if (store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/vendors") {
        matchesRoute = contact.category === "professional";
      } else if (store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/directory") {
        matchesRoute = contact.category === "professional" || contact.category === "neighbors";
      }
      const matchesCategory = selectedCategory === "all";
      console.log("Filtering contact:", contact.name, "category:", contact.category, "route:", store_get($$store_subs ??= {}, "$currentRoute", currentRoute), "matchesRoute:", matchesRoute, "matchesCategory:", matchesCategory);
      return matchesSearch && matchesRoute && matchesCategory;
    });
    pageTitle = store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/vendors" ? "Local Vendors" : store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/directory" ? "Local Directory" : "Personal Contacts";
    pageDescription = store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/vendors" ? "Find local service providers and businesses" : store_get($$store_subs ??= {}, "$currentRoute", currentRoute) === "/directory" ? "Browse local contacts and services" : "Manage your family and personal contacts";
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">${escape_html(pageTitle)}</h1> <p class="text-gray-600 dark:text-gray-300">${escape_html(pageDescription)}</p></div></div> <div class="flex gap-3"><button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-down-tray",
      class: "w-5 h-5 inline mr-2"
    });
    $$renderer2.push(`<!----> Import Contacts</button> <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> Add Contact</button> <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm text-sm">`);
    Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 inline mr-1" });
    $$renderer2.push(`<!----> Check DB</button></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Contacts</label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name, phone, or email..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.charAt(0).toUpperCase() + category.slice(1))}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredContacts);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let contact = each_array_1[$$index_1];
      $$renderer2.push(`<div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3"><img${attr("src", contact.avatar)}${attr("alt", contact.name)} class="w-12 h-12 rounded-full object-cover"/> <div><h3 class="font-semibold text-gray-900 dark:text-white">${escape_html(contact.name)}</h3> `);
      if (contact.relationship) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-gray-500 dark:text-gray-400">${escape_html(contact.relationship)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex items-center space-x-1">`);
      Icon($$renderer2, {
        icon: getCategoryIcon(contact.category),
        class: `w-4 h-4 ${stringify(getCategoryColor(contact.category))}`
      });
      $$renderer2.push(`<!----> <button class="text-red-500 hover:text-red-600 p-1">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></div> <div class="space-y-2">`);
      if (contact.phone) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-2">`);
        Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 text-green-500" });
        $$renderer2.push(`<!----> <a${attr("href", `tel:${stringify(contact.phone)}`)} class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500">${escape_html(contact.phone)}</a></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (contact.email) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-2">`);
        Icon($$renderer2, { icon: "heroicons:envelope", class: "w-4 h-4 text-blue-500" });
        $$renderer2.push(`<!----> <a${attr("href", `mailto:${stringify(contact.email)}`)} class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500">${escape_html(contact.email)}</a></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (contact.address) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-2">`);
        Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-4 h-4 text-red-500" });
        $$renderer2.push(`<!----> <span class="text-sm text-gray-600 dark:text-gray-300">${escape_html(contact.address)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (contact.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm text-gray-600 dark:text-gray-300">${escape_html(contact.notes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredContacts.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:user-group",
        class: "w-16 h-16 mx-auto text-gray-400 mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No contacts found</h3> <p class="text-gray-400 dark:text-gray-500">Add your first contact to get started</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  ContactsPage as default
};
