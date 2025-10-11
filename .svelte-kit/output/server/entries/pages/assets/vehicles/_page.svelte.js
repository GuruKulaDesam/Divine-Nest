import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function VehiclesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let vehicles = [
      {
        id: 1,
        name: "Honda City",
        type: "Car",
        registrationNumber: "TN-01-AA-1234",
        make: "Honda",
        model: "City",
        year: 2020,
        color: "White",
        fuelType: "Petrol",
        mileage: 25e3,
        insuranceExpiry: "2024-03-15",
        nextService: "2024-02-01",
        status: "active"
      },
      {
        id: 2,
        name: "Royal Enfield Classic 350",
        type: "Motorcycle",
        registrationNumber: "TN-01-BB-5678",
        make: "Royal Enfield",
        model: "Classic 350",
        year: 2019,
        color: "Black",
        fuelType: "Petrol",
        mileage: 15e3,
        insuranceExpiry: "2024-06-20",
        nextService: "2024-01-25",
        status: "active"
      }
    ];
    function getTypeIcon(type) {
      const icons = {
        "Car": "heroicons:truck",
        "Motorcycle": "heroicons:bolt",
        "Bicycle": "heroicons:arrow-path-rounded-square",
        "Scooter": "heroicons:bolt",
        "Truck": "heroicons:truck",
        "Bus": "heroicons:truck"
      };
      return icons[type] || "heroicons:truck";
    }
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "badge-success";
        case "maintenance":
          return "badge-warning";
        case "inactive":
          return "badge-neutral";
        default:
          return "badge-neutral";
      }
    }
    function getFuelColor(fuelType) {
      switch (fuelType) {
        case "Petrol":
          return "text-blue-600";
        case "Diesel":
          return "text-green-600";
        case "Electric":
          return "text-purple-600";
        case "Hybrid":
          return "text-orange-600";
        default:
          return "text-gray-600";
      }
    }
    function getUpcomingServices() {
      const today = /* @__PURE__ */ new Date();
      return vehicles.filter((vehicle) => {
        const serviceDate = new Date(vehicle.nextService);
        const daysDiff = (serviceDate - today) / (1e3 * 60 * 60 * 24);
        return daysDiff <= 30 && daysDiff >= 0;
      }).length;
    }
    function getExpiringInsurances() {
      const today = /* @__PURE__ */ new Date();
      return vehicles.filter((vehicle) => {
        const expiryDate = new Date(vehicle.insuranceExpiry);
        const daysDiff = (expiryDate - today) / (1e3 * 60 * 60 * 24);
        return daysDiff <= 30 && daysDiff >= 0;
      }).length;
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Vehicle Management</h1> <p class="text-base-content/70 mt-2">Track your vehicles, maintenance, and insurance</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Vehicle</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:truck", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Vehicles</h3> <p class="text-2xl font-bold text-blue-600">${escape_html(vehicles.length)}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Active</h3> <p class="text-2xl font-bold text-green-600">${escape_html(vehicles.filter((v) => v.status === "active").length)}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-yellow-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-yellow-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Service Due</h3> <p class="text-2xl font-bold text-yellow-600">${escape_html(getUpcomingServices())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-red-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-6 h-6 text-red-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Insurance Expiring</h3> <p class="text-2xl font-bold text-red-600">${escape_html(getExpiringInsurances())}</p></div></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
    const each_array = ensure_array_like(vehicles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let vehicle = each_array[$$index];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg mr-4">`);
      Icon($$renderer2, {
        icon: getTypeIcon(vehicle.type),
        class: "w-6 h-6 text-blue-600"
      });
      $$renderer2.push(`<!----></div> <div><h3 class="font-bold text-lg">${escape_html(vehicle.name)}</h3> <p class="text-sm text-base-content/70">${escape_html(vehicle.registrationNumber)}</p></div></div> <span${attr_class(`badge ${stringify(getStatusColor(vehicle.status))}`)}>${escape_html(vehicle.status)}</span></div> <div class="grid grid-cols-2 gap-4 mb-4"><div><p class="text-sm text-base-content/70">Make &amp; Model</p> <p class="font-semibold">${escape_html(vehicle.make)} ${escape_html(vehicle.model)}</p></div> <div><p class="text-sm text-base-content/70">Year</p> <p class="font-semibold">${escape_html(vehicle.year)}</p></div> <div><p class="text-sm text-base-content/70">Fuel Type</p> <p${attr_class(`font-semibold ${stringify(getFuelColor(vehicle.fuelType))}`)}>${escape_html(vehicle.fuelType)}</p></div> <div><p class="text-sm text-base-content/70">Mileage</p> <p class="font-semibold">${escape_html(vehicle.mileage.toLocaleString())} km</p></div></div> <div class="space-y-2 mb-4"><div class="flex justify-between"><span class="text-sm text-base-content/70">Insurance Expiry</span> <span class="text-sm font-medium">${escape_html(vehicle.insuranceExpiry)}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Next Service</span> <span class="text-sm font-medium">${escape_html(vehicle.nextService)}</span></div></div> <div class="card-actions justify-end"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> View Details</button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> Edit</button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> Service</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Vehicle</th><th>Registration</th><th>Make/Model</th><th>Year</th><th>Fuel Type</th><th>Mileage</th><th>Insurance Expiry</th><th>Next Service</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_1 = ensure_array_like(vehicles);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let vehicle = each_array_1[$$index_1];
      $$renderer2.push(`<tr><td><div class="flex items-center">`);
      Icon($$renderer2, { icon: getTypeIcon(vehicle.type), class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> <div><div class="font-semibold">${escape_html(vehicle.name)}</div> <div class="text-sm text-base-content/70">${escape_html(vehicle.type)}</div></div></div></td><td class="font-mono text-sm">${escape_html(vehicle.registrationNumber)}</td><td>${escape_html(vehicle.make)} ${escape_html(vehicle.model)}</td><td>${escape_html(vehicle.year)}</td><td><span${attr_class(`${stringify(getFuelColor(vehicle.fuelType))} font-medium`)}>${escape_html(vehicle.fuelType)}</span></td><td>${escape_html(vehicle.mileage.toLocaleString())} km</td><td class="text-sm">${escape_html(vehicle.insuranceExpiry)}</td><td class="text-sm">${escape_html(vehicle.nextService)}</td><td><span${attr_class(`badge ${stringify(getStatusColor(vehicle.status))}`)}>${escape_html(vehicle.status)}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div></div> `);
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
  VehiclesPage($$renderer);
}
export {
  _page as default
};
