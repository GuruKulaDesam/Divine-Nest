import "clsx";
import { n as store_set, c as store_get, d as attr, a as ensure_array_like, b as attr_class, s as stringify, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { w as writable } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function MembersPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let totalMembers, activeMembers, inactiveMembers, pendingMembers;
    let members = writable([
      {
        id: 1,
        name: "John Doe",
        tamilName: "ஜான் டோ",
        relationship: "Father",
        age: 45,
        phone: "+91-98765-43210",
        email: "john@example.com",
        address: "123 Main Street, City",
        occupation: "Engineer",
        bloodGroup: "O+",
        emergencyContact: "+91-98765-43211",
        status: "active",
        joinDate: "2023-01-15",
        notes: "Family head"
      },
      {
        id: 2,
        name: "Jane Doe",
        tamilName: "ஜேன் டோ",
        relationship: "Mother",
        age: 42,
        phone: "+91-98765-43212",
        email: "jane@example.com",
        address: "123 Main Street, City",
        occupation: "Teacher",
        bloodGroup: "A+",
        emergencyContact: "+91-98765-43213",
        status: "active",
        joinDate: "2023-01-15",
        notes: "Homemaker"
      }
    ]);
    let filteredMembers = writable([]);
    let searchQuery = "";
    let selectedStatus = "all";
    let selectedRelationship = "all";
    const relationships = [
      "Father",
      "Mother",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
      "Grandfather",
      "Grandmother",
      "Uncle",
      "Aunt",
      "Cousin",
      "Other"
    ];
    const statuses = [
      {
        id: "active",
        name: "Active",
        color: "text-green-600 bg-green-100"
      },
      {
        id: "inactive",
        name: "Inactive",
        color: "text-gray-600 bg-gray-100"
      },
      {
        id: "pending",
        name: "Pending",
        color: "text-yellow-600 bg-yellow-100"
      }
    ];
    function getStatusColor(status) {
      const statusObj = statuses.find((s) => s.id === status);
      return statusObj ? statusObj.color : "text-gray-600 bg-gray-100";
    }
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString();
    }
    {
      store_set(filteredMembers, store_get($$store_subs ??= {}, "$members", members).filter((member) => {
        const matchesSearch = !searchQuery;
        const matchesStatus = selectedStatus === "all";
        const matchesRelationship = selectedRelationship === "all";
        return matchesSearch && matchesStatus && matchesRelationship;
      }));
    }
    totalMembers = store_get($$store_subs ??= {}, "$members", members).length;
    activeMembers = store_get($$store_subs ??= {}, "$members", members).filter((m) => m.status === "active").length;
    inactiveMembers = store_get($$store_subs ??= {}, "$members", members).filter((m) => m.status === "inactive").length;
    pendingMembers = store_get($$store_subs ??= {}, "$members", members).filter((m) => m.status === "pending").length;
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Members Management</h1> <p class="text-base-content/70 mt-1">Manage family and community members</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:account-plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Member</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-blue-100 text-sm">Total Members</p> <p class="text-2xl font-bold">${escape_html(
      // Reset form
      totalMembers
    )}</p></div> `);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-green-100 text-sm">Active</p> <p class="text-2xl font-bold">${escape_html(activeMembers)}</p></div> `);
    Icon($$renderer2, { icon: "mdi:account-check", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-gray-100 text-sm">Inactive</p> <p class="text-2xl font-bold">${escape_html(inactiveMembers)}</p></div> `);
    Icon($$renderer2, { icon: "mdi:account-off", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-yellow-100 text-sm">Pending</p> <p class="text-2xl font-bold">${escape_html(pendingMembers)}</p></div> `);
    Icon($$renderer2, { icon: "mdi:account-clock", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body p-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Members</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Name, phone, email..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(statuses);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let status = each_array[$$index];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Relationship</span></label> `);
    $$renderer2.select(
      {
        value: selectedRelationship,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Relationships`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(relationships);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let relationship = each_array_1[$$index_1];
          $$renderer3.option({ value: relationship }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(relationship)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text opacity-0">Actions</span></label> <button class="btn btn-outline btn-block">Clear Filters</button></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body p-0">`);
    if (store_get($$store_subs ??= {}, "$filteredMembers", filteredMembers).length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:account-group-off",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No members found</h3> <p class="text-base-content/50 mt-1">Try adjusting your search or filters</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Name</th><th>Relationship</th><th>Contact</th><th>Status</th><th>Join Date</th><th>Actions</th></tr></thead><tbody><!--[-->`);
      const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$filteredMembers", filteredMembers));
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let member = each_array_2[$$index_2];
        $$renderer2.push(`<tr><td><div><div class="font-semibold">${escape_html(member.name)}</div> `);
        if (member.tamilName) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-sm text-base-content/60">${escape_html(member.tamilName)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (member.age) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-xs text-base-content/50">Age: ${escape_html(member.age)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td><span class="badge badge-outline">${escape_html(member.relationship)}</span></td><td><div class="text-sm">`);
        if (member.phone) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1">`);
          Icon($$renderer2, { icon: "mdi:phone", class: "w-4 h-4" });
          $$renderer2.push(`<!----> ${escape_html(member.phone)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (member.email) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1 mt-1">`);
          Icon($$renderer2, { icon: "mdi:email", class: "w-4 h-4" });
          $$renderer2.push(`<!----> <span class="truncate max-w-32">${escape_html(member.email)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td><span${attr_class(`badge ${stringify(getStatusColor(member.status))}`)}>${escape_html(statuses.find((s) => s.id === member.status)?.name)}</span></td><td>${escape_html(formatDate(member.joinDate))}</td><td><div class="dropdown dropdown-left"><button class="btn btn-ghost btn-sm">`);
        Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
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
function _page($$renderer) {
  MembersPage($$renderer);
}
export {
  _page as default
};
