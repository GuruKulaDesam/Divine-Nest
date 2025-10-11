import "clsx";
import { c as store_get, a as ensure_array_like, b as attr_class, s as stringify, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function ContactsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let filteredContacts;
    let activeSection = "overview";
    let selectedCategory = "all";
    let contacts = [];
    let searchQuery = "";
    const ContactsSections = [
      {
        id: "overview",
        name: "Contacts Overview",
        tamil: "தொடர்புகள் கண்ணோட்டம்",
        icon: "heroicons:phone",
        color: "green"
      },
      {
        id: "family",
        name: "Family Contacts",
        tamil: "குடும்ப தொடர்புகள்",
        icon: "heroicons:users",
        color: "blue"
      },
      {
        id: "professional",
        name: "Service Providers",
        tamil: "சேவை வழங்குநர்கள்",
        icon: "heroicons:wrench",
        color: "purple"
      },
      {
        id: "emergency",
        name: "Emergency Contacts",
        tamil: "அவசர தொடர்புகள்",
        icon: "heroicons:exclamation-triangle",
        color: "red"
      }
    ];
    const ContactCategories = {
      all: {
        name: "All Contacts",
        tamil: "அனைத்து தொடர்புகளும்",
        count: 0
      },
      family: { name: "Family", tamil: "குடும்பம்", count: 0 },
      friends: { name: "Friends", tamil: "நண்பர்கள்", count: 0 },
      professional: { name: "Professional", tamil: "தொழில்முறை", count: 0 },
      neighbors: { name: "Neighbors", tamil: "அண்டை வீட்டார்", count: 0 },
      other: { name: "Other", tamil: "மற்றவை", count: 0 }
    };
    {
      const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
      if (path.startsWith("/contacts/")) {
        const section = path.split("/")[2];
        if (section && ContactsSections.find((s) => s.id === section)) {
          activeSection = section;
        }
      }
    }
    ContactsSections.find((s) => s.id === activeSection);
    filteredContacts = contacts.filter((contact) => {
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery) || contact.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    {
      Object.keys(ContactCategories).forEach((key) => {
        ContactCategories[key].count = 0;
      });
      contacts.forEach((contact) => {
        if (ContactCategories[contact.category]) {
          ContactCategories[contact.category].count++;
        }
      });
      ContactCategories.all.count = contacts.length;
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-green-100 p-3 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-8 h-8 text-green-600" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">��� Contacts &amp; Directory</h1> <p class="text-lg text-gray-600">தொடர்புகள் &amp; அடைவு</p> <p class="text-sm text-gray-500">Manage family contacts and local service providers</p></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(
      // If no contacts exist, populate with local service providers
      Object.entries(ContactCategories)
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [categoryId, category] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedCategory === categoryId ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:user-group", class: "w-5 h-5" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(category.name)}</span> <span class="text-sm opacity-75">(${escape_html(category.count)})</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Total Contacts</p> <p class="text-2xl font-bold">${escape_html(ContactCategories.all.count)}</p> <p class="text-xs opacity-75">மொத்த தொடர்புகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Family</p> <p class="text-2xl font-bold">${escape_html(ContactCategories.family.count)}</p> <p class="text-xs opacity-75">குடும்பம்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Services</p> <p class="text-2xl font-bold">${escape_html(ContactCategories.professional.count)}</p> <p class="text-xs opacity-75">சேவைகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:wrench", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Emergency</p> <p class="text-2xl font-bold">${escape_html(contacts.filter((c) => c.category === "emergency").length)}</p> <p class="text-xs opacity-75">அவசரம்</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 opacity-80"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Contact Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(ContactsSections);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${stringify(activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : "text-gray-600 hover:bg-gray-50")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5 flex-shrink-0" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><p class="font-medium truncate">${escape_html(section.name)}</p> <p class="text-xs opacity-75 truncate">${escape_html(section.tamil)}</p></div> `);
      if (activeSection === section.id) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><div class="relative">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    });
    $$renderer2.push(`<!----> <input type="text" placeholder="Search contacts..."${attr("value", searchQuery)} class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"/></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white rounded-xl shadow-lg p-6">`);
    if (activeSection === "overview") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900">Contacts Overview</h2> <span class="text-sm text-gray-500">தொடர்புகள் கண்ணோட்டம்</span></div> `);
      if (filteredContacts.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-green-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-green-900 mb-3">Recent Contacts</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        const each_array_2 = ensure_array_like(filteredContacts.slice(0, 6));
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let contact = each_array_2[$$index_2];
          $$renderer2.push(`<div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center space-x-3 mb-2"><img${attr("src", contact.avatar)}${attr("alt", contact.name)} class="w-10 h-10 rounded-full"/> <div class="flex-1"><h4 class="font-semibold text-gray-900">${escape_html(contact.name)}</h4> <p class="text-sm text-gray-600">${escape_html(contact.relationship || contact.category)}</p></div></div> <div class="text-sm text-gray-600"><p>��� ${escape_html(contact.phone)}</p> `);
          if (contact.email) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p>✉️ ${escape_html(contact.email)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="bg-red-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-red-900 mb-3">Emergency Contacts</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_3 = ensure_array_like(contacts.filter((c) => c.category === "emergency" || c.relationship?.toLowerCase().includes("police") || c.relationship?.toLowerCase().includes("hospital")));
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let contact = each_array_3[$$index_3];
        $$renderer2.push(`<div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500"><div class="flex items-center space-x-3 mb-2">`);
        Icon($$renderer2, {
          icon: "heroicons:exclamation-triangle",
          class: "w-6 h-6 text-red-600"
        });
        $$renderer2.push(`<!----> <div><h4 class="font-semibold text-gray-900">${escape_html(contact.name)}</h4> <p class="text-sm text-gray-600">${escape_html(contact.relationship)}</p></div></div> <p class="text-lg font-bold text-red-600">${escape_html(contact.phone)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (activeSection === "family") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-4"><h2 class="text-2xl font-bold text-gray-900">Family Contacts</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        const each_array_4 = ensure_array_like(contacts.filter((c) => c.category === "family"));
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let contact = each_array_4[$$index_4];
          $$renderer2.push(`<div class="bg-blue-50 p-4 rounded-lg"><div class="flex items-center space-x-3 mb-3"><img${attr("src", contact.avatar)}${attr("alt", contact.name)} class="w-12 h-12 rounded-full"/> <div><h3 class="font-semibold text-gray-900">${escape_html(contact.name)}</h3> <p class="text-sm text-gray-600">${escape_html(contact.relationship)}</p></div></div> <div class="space-y-1 text-sm"><p>��� ${escape_html(contact.phone)}</p> `);
          if (contact.email) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p>✉️ ${escape_html(contact.email)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (contact.address) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p>��� ${escape_html(contact.address)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (activeSection === "professional") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="space-y-4"><h2 class="text-2xl font-bold text-gray-900">Service Providers</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          const each_array_5 = ensure_array_like(contacts.filter((c) => c.category === "professional"));
          for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
            let contact = each_array_5[$$index_5];
            $$renderer2.push(`<div class="bg-purple-50 p-4 rounded-lg"><div class="flex items-center space-x-3 mb-3"><img${attr("src", contact.avatar)}${attr("alt", contact.name)} class="w-12 h-12 rounded-full"/> <div><h3 class="font-semibold text-gray-900">${escape_html(contact.name)}</h3> <p class="text-sm text-gray-600">${escape_html(contact.relationship)}</p></div></div> <div class="space-y-1 text-sm"><p>��� ${escape_html(contact.phone)}</p> `);
            if (contact.email) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p>✉️ ${escape_html(contact.email)}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (contact.address) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p>��� ${escape_html(contact.address)}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (contact.notes) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="text-xs text-gray-500 mt-2">${escape_html(contact.notes)}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></div></div>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (activeSection === "emergency") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="space-y-4"><h2 class="text-2xl font-bold text-gray-900">Emergency Contacts</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
            const each_array_6 = ensure_array_like(contacts.filter((c) => c.category === "emergency" || c.relationship?.toLowerCase().includes("police") || c.relationship?.toLowerCase().includes("hospital") || c.relationship?.toLowerCase().includes("fire") || c.relationship?.toLowerCase().includes("ambulance")));
            for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
              let contact = each_array_6[$$index_6];
              $$renderer2.push(`<div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"><div class="flex items-center space-x-3 mb-3">`);
              Icon($$renderer2, {
                icon: "heroicons:exclamation-triangle",
                class: "w-8 h-8 text-red-600"
              });
              $$renderer2.push(`<!----> <div><h3 class="font-semibold text-gray-900">${escape_html(contact.name)}</h3> <p class="text-sm text-gray-600">${escape_html(contact.relationship)}</p></div></div> <div class="space-y-2"><p class="text-xl font-bold text-red-600">${escape_html(contact.phone)}</p> `);
              if (contact.address) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<p class="text-sm text-gray-600">��� ${escape_html(contact.address)}</p>`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]--> `);
              if (contact.notes) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<p class="text-xs text-gray-500 mt-2">${escape_html(contact.notes)}</p>`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]--></div></div>`);
            }
            $$renderer2.push(`<!--]--></div></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="text-center py-12">`);
            Icon($$renderer2, {
              icon: "heroicons:phone",
              class: "w-16 h-16 text-green-400 mx-auto mb-4"
            });
            $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3> <p class="text-gray-600">This contacts section is under development.</p></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  ContactsPage($$renderer);
}
export {
  _page as default
};
