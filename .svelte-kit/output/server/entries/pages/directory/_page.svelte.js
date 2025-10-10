import "clsx";
import Dexie from "dexie";
import { D as DirectoryDashboard } from "../../../chunks/DirectoryDashboard.js";
const directoryDB = new Dexie("DirectoryDB");
directoryDB.version(1).stores({
  // Family Contacts
  familyContacts: "++id, name, relationship, phone, email, address, emergencyContact, notes, lastContacted, importance",
  extendedFamily: "++id, name, relationship, phone, email, location, specialDates, notes",
  // Vendors & Service Providers
  vendors: "++id, name, category, service, phone, email, address, rating, notes, lastUsed, recommended",
  serviceProviders: "++id, name, type, specialty, phone, email, address, license, insurance, rating",
  // Health Services
  doctors: "++id, name, specialty, hospital, phone, email, address, experience, rating, emergency",
  hospitals: "++id, name, type, phone, email, address, emergency, specialties, rating",
  pharmacies: "++id, name, phone, email, address, hours, delivery, rating",
  healthServices: "++id, name, type, phone, email, address, services, rating",
  // Community Resources
  communityCenters: "++id, name, type, phone, email, address, services, programs",
  educationalInstitutions: "++id, name, type, phone, email, address, programs, rating",
  religiousCenters: "++id, name, type, phone, email, address, services, festivals",
  emergencyServices: "++id, name, type, phone, address, services, availability",
  // Local Amenities
  restaurants: "++id, name, cuisine, phone, email, address, rating, specialties, vegetarian",
  shops: "++id, name, type, phone, email, address, hours, specialties",
  transportation: "++id, name, type, phone, email, address, routes, schedule"
});
const {
  familyContacts,
  extendedFamily,
  vendors,
  serviceProviders,
  doctors,
  hospitals,
  pharmacies,
  healthServices,
  communityCenters,
  educationalInstitutions,
  religiousCenters,
  emergencyServices,
  restaurants,
  shops,
  transportation
} = directoryDB;
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200"><div class="container mx-auto px-4 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-base-content mb-2">📇 Directory</h1> <p class="text-base-content/70">Family Contacts &amp; Community Resources</p></div> `);
    DirectoryDashboard($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
