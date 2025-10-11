import { a as ensure_array_like, b as attr_class, s as stringify, h as head } from "../../../../chunks/index2.js";
import "../../../../chunks/home.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function EmergencyServices($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let emergencyContacts = [];
    let activeTab = "emergency";
    let disasterPrepChecklist = [
      {
        id: 1,
        item: "Emergency water supply (1 litre per person per day for 3 days)",
        completed: false
      },
      {
        id: 2,
        item: "Non-perishable food items for 3 days",
        completed: false
      },
      {
        id: 3,
        item: "First aid kit with essential medicines",
        completed: false
      },
      {
        id: 4,
        item: "Flashlights and extra batteries",
        completed: false
      },
      {
        id: 5,
        item: "Important documents in waterproof container",
        completed: false
      },
      { id: 6, item: "Cash in small denominations", completed: false },
      {
        id: 7,
        item: "Power bank for mobile phones",
        completed: false
      },
      {
        id: 8,
        item: "Whistle for emergency signaling",
        completed: false
      }
    ];
    const serviceCategories = [
      {
        id: "emergency",
        label: "Emergency Services",
        icon: "🚨",
        color: "bg-red-500"
      },
      {
        id: "medical",
        label: "Medical Vault",
        icon: "🏥",
        color: "bg-blue-500"
      },
      {
        id: "disaster",
        label: "Disaster Prep",
        icon: "🌪️",
        color: "bg-orange-500"
      },
      {
        id: "utilities",
        label: "Utility Services",
        icon: "⚡",
        color: "bg-green-500"
      }
    ];
    const utilityServices = [
      {
        name: "Electricity Board",
        number: "1912",
        description: "TNEB Power outage reporting"
      },
      {
        name: "Water Supply",
        number: "044-28520131",
        description: "Metrowater complaints"
      },
      {
        name: "Gas Leak",
        number: "1906",
        description: "Indane Gas emergency"
      },
      {
        name: "Police Control Room",
        number: "100",
        description: "Emergency police assistance"
      },
      {
        name: "Fire Service",
        number: "101",
        description: "Fire emergency response"
      },
      {
        name: "Ambulance",
        number: "108",
        description: "Medical emergency ambulance"
      },
      {
        name: "Women Helpline",
        number: "1091",
        description: "Women safety and assistance"
      },
      {
        name: "Child Helpline",
        number: "1098",
        description: "Child protection services"
      }
    ];
    const savedDisasterPrep = localStorage.getItem("disasterPrep");
    if (savedDisasterPrep) {
      disasterPrepChecklist = JSON.parse(savedDisasterPrep);
    }
    disasterPrepChecklist.filter((item) => item.completed).length;
    disasterPrepChecklist.length;
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-wrap gap-2 mb-6 border-b border-red-200 pb-4"><!--[-->`);
    const each_array = ensure_array_like(serviceCategories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(activeTab === category.id ? "bg-red-500 text-white shadow-md" : "bg-red-50 text-red-700 hover:bg-red-100")}`)}><span class="text-lg">${escape_html(category.icon)}</span> <span class="font-medium">${escape_html(category.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-red-50 border border-red-200 rounded-lg p-6"><h2 class="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2"><span>🚨</span> Emergency Quick Dial</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(utilityServices.filter((s) => ["100", "101", "108", "1091"].includes(s.number)));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let service = each_array_1[$$index_1];
        $$renderer2.push(`<button class="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl"><span class="text-2xl">${escape_html(service.name === "Police Control Room" ? "🚔" : service.name === "Fire Service" ? "🚒" : service.name === "Ambulance" ? "🚑" : "👩")}</span> <span class="font-semibold text-center">${escape_html(service.name)}</span> <span class="text-lg font-bold">${escape_html(service.number)}</span> <span class="text-xs opacity-90 text-center">${escape_html(service.description)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2> `);
      if (emergencyContacts.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-8 text-gray-500"><div class="text-4xl mb-4">📞</div> <p>No emergency contacts added yet</p> <p class="text-sm">Add contacts in the Home dashboard</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        const each_array_2 = ensure_array_like(emergencyContacts.filter((c) => ["medical", "police", "fire"].includes(c.type)));
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let contact = each_array_2[$$index_2];
          $$renderer2.push(`<div class="bg-gray-50 border border-gray-200 rounded-lg p-4"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-3"><span class="text-2xl">${escape_html(contact.type === "medical" ? "🏥" : contact.type === "police" ? "🚔" : "🚒")}</span> <div><h3 class="font-semibold text-gray-800">${escape_html(contact.name)}</h3> <p class="text-sm text-gray-600 capitalize">${escape_html(contact.type)}</p></div></div> <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-200">📞 Call</button></div> <div class="text-sm text-gray-700"><p><span class="font-medium">Phone:</span> ${escape_html(contact.phone)}</p> `);
          if (contact.address) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p><span class="font-medium">Address:</span> ${escape_html(contact.address)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (contact.notes) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p><span class="font-medium">Notes:</span> ${escape_html(contact.notes)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Home Services &amp; Emergency - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Emergency services, medical information vault, and disaster preparedness for South Indian families"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50"><div class="container mx-auto px-4 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-red-800 mb-2">🚨 Home Services &amp; Emergency</h1> <p class="text-lg text-red-600">Emergency preparedness and essential services for your South Indian household</p></div> `);
    EmergencyServices($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
