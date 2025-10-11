import { b as attr_class, a as ensure_array_like, s as stringify } from "./index2.js";
import "./database.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function DirectoryDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let familyContacts = [];
    let newContact = {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: false,
      notes: "",
      importance: "Medium"
    };
    function getImportanceColor(importance) {
      switch (importance) {
        case "High":
          return "text-red-400";
        case "Medium":
          return "text-yellow-400";
        case "Low":
          return "text-green-400";
        default:
          return "text-gray-400";
      }
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-wrap gap-2 mb-6"><button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify(
      "bg-primary text-primary-content shadow-lg"
    )}`)}>👨‍👩‍👧‍👦 Family Contacts</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>🛍️ Vendors &amp; Services</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>🏥 Health Services</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>🏛️ Community Resources</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg"><h3 class="text-xl font-semibold text-base-content mb-4">Add Family Contact</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><input${attr("value", newContact.name)} placeholder="Full Name" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <input${attr("value", newContact.relationship)} placeholder="Relationship (e.g., Father, Mother, Brother)" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <input${attr("value", newContact.phone)} placeholder="Phone Number" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <input${attr("value", newContact.email)} placeholder="Email Address" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <input${attr("value", newContact.address)} placeholder="Address" class="input input-bordered w-full col-span-2 text-base-content placeholder-base-content/50"/> <div class="flex items-center space-x-2 col-span-2"><input type="checkbox" id="emergency"${attr("checked", newContact.emergencyContact, true)} class="checkbox checkbox-primary"/> <label for="emergency" class="text-base-content/80">Emergency Contact</label> `);
      $$renderer2.select(
        {
          value: newContact.importance,
          class: "select select-bordered ml-auto text-base-content"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "High" }, ($$renderer4) => {
            $$renderer4.push(`High Priority`);
          });
          $$renderer3.option({ value: "Medium" }, ($$renderer4) => {
            $$renderer4.push(`Medium Priority`);
          });
          $$renderer3.option({ value: "Low" }, ($$renderer4) => {
            $$renderer4.push(`Low Priority`);
          });
        }
      );
      $$renderer2.push(`</div> <textarea placeholder="Additional notes..." rows="2" class="textarea textarea-bordered w-full col-span-2 text-base-content placeholder-base-content/50">`);
      const $$body = escape_html(newContact.notes);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <button class="btn btn-primary mt-4">Add Family Contact</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      const each_array = ensure_array_like(familyContacts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let contact = each_array[$$index];
        $$renderer2.push(`<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"><div class="flex justify-between items-start mb-2"><div><h4 class="text-lg font-semibold text-white">${escape_html(contact.name)}</h4> <p class="text-white/70">${escape_html(contact.relationship)}</p></div> <div class="text-right">`);
        if (contact.emergencyContact) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs mb-1 block">Emergency</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <span${attr_class(`px-2 py-1 ${stringify(getImportanceColor(contact.importance))} bg-white/10 rounded text-xs`)}>${escape_html(contact.importance)}</span></div></div> `);
        if (contact.phone) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-white/80 text-sm mb-1">📞 ${escape_html(contact.phone)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (contact.email) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-white/80 text-sm mb-1">✉️ ${escape_html(contact.email)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (contact.address) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-white/60 text-sm mb-2">📍 ${escape_html(contact.address)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (contact.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-white/70 text-sm">${escape_html(contact.notes)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
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
export {
  DirectoryDashboard as D
};
