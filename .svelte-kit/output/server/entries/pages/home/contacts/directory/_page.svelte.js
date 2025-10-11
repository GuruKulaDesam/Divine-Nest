import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function DirectoryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredEntries;
    let directoryEntries = [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        type: "Doctor",
        specialty: "General Medicine",
        phone: "+91-98765-43210",
        address: "123 Main Street, Kovai",
        rating: 4.8,
        reviews: 45,
        availability: "Mon-Fri 9AM-6PM",
        emergency: true,
        verified: true
      },
      {
        id: 2,
        name: "Priya Electricals",
        type: "Electrician",
        specialty: "Home Wiring & Repairs",
        phone: "+91-87654-32109",
        address: "456 Power Road, Kovai",
        rating: 4.6,
        reviews: 32,
        availability: "24/7 Emergency Service",
        emergency: true,
        verified: true
      },
      {
        id: 3,
        name: "Sri Mariamman Temple",
        type: "Temple",
        specialty: "Hindu Temple",
        phone: "+91-76543-21098",
        address: "789 Temple Street, Kovai",
        rating: 4.9,
        reviews: 128,
        availability: "Daily 5AM-9PM",
        emergency: false,
        verified: true
      },
      {
        id: 4,
        name: "Kovai Public School",
        type: "Education",
        specialty: "Primary & Secondary Education",
        phone: "+91-65432-10987",
        address: "321 Education Avenue, Kovai",
        rating: 4.7,
        reviews: 89,
        availability: "Mon-Sat 8AM-4PM",
        emergency: false,
        verified: true
      },
      {
        id: 5,
        name: "City Hospital",
        type: "Hospital",
        specialty: "Multi-specialty Hospital",
        phone: "+91-54321-09876",
        address: "654 Health Boulevard, Kovai",
        rating: 4.5,
        reviews: 156,
        availability: "24/7 Emergency",
        emergency: true,
        verified: true
      }
    ];
    let selectedCategory = "all";
    let searchQuery = "";
    let showEmergencyOnly = false;
    const categories = [
      { id: "all", name: "All Services", icon: "mdi:view-list" },
      { id: "doctor", name: "Doctors", icon: "mdi:doctor" },
      { id: "hospital", name: "Hospitals", icon: "mdi:hospital" },
      { id: "electrician", name: "Electricians", icon: "mdi:flash" },
      { id: "plumber", name: "Plumbers", icon: "mdi:pipe" },
      { id: "mechanic", name: "Mechanics", icon: "mdi:wrench" },
      { id: "temple", name: "Temples", icon: "mdi:temple-hindu" },
      { id: "education", name: "Education", icon: "mdi:school" },
      { id: "grocery", name: "Grocery Stores", icon: "mdi:store" },
      {
        id: "restaurant",
        name: "Restaurants",
        icon: "mdi:silverware"
      },
      { id: "bank", name: "Banks", icon: "mdi:bank" },
      {
        id: "police",
        name: "Police Station",
        icon: "mdi:police-badge"
      },
      { id: "fire", name: "Fire Station", icon: "mdi:fire-truck" }
    ];
    function getCategoryIcon(type) {
      const category = categories.find((c) => c.id === type.toLowerCase());
      return category ? category.icon : "mdi:help-circle";
    }
    function getRatingStars(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      return {
        full: fullStars,
        half: hasHalfStar ? 1 : 0,
        empty: emptyStars
      };
    }
    filteredEntries = directoryEntries.filter((entry) => {
      const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) || entry.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || entry.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEmergency = !showEmergencyOnly;
      return matchesSearch && matchesEmergency;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 class="text-3xl font-bold text-base-content">Community Directory</h1> <p class="text-base-content/60 mt-1">Find local services, emergency contacts, and community resources</p></div> <div class="flex items-center gap-3"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox"${attr("checked", showEmergencyOnly, true)} class="checkbox checkbox-primary"/> <span class="text-sm font-medium">Emergency Services Only</span></label></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Services</div> <div class="stat-value text-primary">${escape_html(directoryEntries.length)}</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-secondary">`);
    Icon($$renderer2, { icon: "mdi:ambulance", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Emergency Services</div> <div class="stat-value text-secondary">${escape_html(directoryEntries.filter((e) => e.emergency).length)}</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-accent">`);
    Icon($$renderer2, { icon: "mdi:star", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Avg Rating</div> <div class="stat-value text-accent">${escape_html((directoryEntries.reduce((sum, entry) => sum + entry.rating, 0) / directoryEntries.length).toFixed(1))}</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Verified</div> <div class="stat-value text-info">${escape_html(directoryEntries.filter((e) => e.verified).length)}</div></div></div> <div class="bg-base-100 rounded-xl p-6 shadow-sm"><div class="flex flex-col lg:flex-row gap-4"><div class="flex-1"><div class="relative">`);
    Icon($$renderer2, {
      icon: "mdi:magnify",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5"
    });
    $$renderer2.push(`<!----> <input type="text"${attr("value", searchQuery)} placeholder="Search by name, service, or address..." class="input input-bordered w-full pl-10"/></div></div> <div class="lg:w-64">`);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array_1 = ensure_array_like(categories.slice(1));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`btn btn-sm gap-2 ${stringify(selectedCategory === category.id ? "btn-primary" : "btn-outline")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(category.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-4"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredEntries);
    for (let $$index_4 = 0, $$length = each_array_2.length; $$index_4 < $$length; $$index_4++) {
      let entry = each_array_2[$$index_4];
      $$renderer2.push(`<div class="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"><div class="flex items-start gap-4"><div class="flex-shrink-0"><div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">`);
      Icon($$renderer2, {
        icon: getCategoryIcon(entry.type),
        class: "w-6 h-6 text-primary"
      });
      $$renderer2.push(`<!----></div></div> <div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-4"><div class="flex-1"><div class="flex items-center gap-2 mb-2"><h3 class="text-lg font-semibold text-base-content">${escape_html(entry.name)}</h3> `);
      if (entry.verified) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "mdi:check-circle", class: "w-5 h-5 text-success" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (entry.emergency) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="badge badge-error badge-sm">Emergency</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <p class="text-base-content/70 mb-2">${escape_html(entry.specialty)}</p> <p class="text-sm text-base-content/60 mb-3">${escape_html(entry.address)}</p> <div class="flex items-center gap-2 mb-3"><div class="flex items-center"><!--[-->`);
      const each_array_3 = ensure_array_like(Array(getRatingStars(entry.rating).full));
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        each_array_3[$$index_2];
        Icon($$renderer2, { icon: "mdi:star", class: "w-4 h-4 text-yellow-400" });
      }
      $$renderer2.push(`<!--]--> `);
      if (getRatingStars(entry.rating).half) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "mdi:star-half-full", class: "w-4 h-4 text-yellow-400" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      const each_array_4 = ensure_array_like(Array(getRatingStars(entry.rating).empty));
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        each_array_4[$$index_3];
        Icon($$renderer2, { icon: "mdi:star-outline", class: "w-4 h-4 text-gray-300" });
      }
      $$renderer2.push(`<!--]--></div> <span class="text-sm text-base-content/60">${escape_html(entry.rating)} (${escape_html(entry.reviews)} reviews)</span></div> <p class="text-sm text-base-content/60 mb-4">`);
      Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> ${escape_html(entry.availability)}</p></div></div> <div class="flex items-center gap-3"><button class="btn btn-primary btn-sm gap-2">`);
      Icon($$renderer2, { icon: "mdi:phone", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Call</button> <button class="btn btn-outline btn-sm gap-2">`);
      Icon($$renderer2, { icon: "mdi:map-marker", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Directions</button> <div class="text-sm text-base-content/60">${escape_html(entry.phone)}</div></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredEntries.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:account-search",
        class: "w-16 h-16 text-base-content/20 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/60 mb-2">No services found</h3> <p class="text-base-content/40">Try adjusting your search criteria or category filter</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  DirectoryPage($$renderer);
}
export {
  _page as default
};
