import { a as ensure_array_like, s as stringify, d as attr, b as attr_class } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function AssetsDocumentsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchTerm = "";
    let selectedCategory = "all";
    const documentCategories = [
      {
        id: "warranty",
        name: "Warranties",
        icon: "heroicons:shield-check",
        color: "text-green-600"
      },
      {
        id: "purchase",
        name: "Purchase Bills",
        icon: "heroicons:receipt-percent",
        color: "text-blue-600"
      },
      {
        id: "insurance",
        name: "Insurance Papers",
        icon: "heroicons:document-check",
        color: "text-purple-600"
      },
      {
        id: "ownership",
        name: "Ownership Proofs",
        icon: "heroicons:identification",
        color: "text-orange-600"
      },
      {
        id: "manual",
        name: "User Manuals",
        icon: "heroicons:book-open",
        color: "text-gray-600"
      },
      {
        id: "service",
        name: "Service Records",
        icon: "heroicons:clipboard-document-list",
        color: "text-cyan-600"
      }
    ];
    const documents = [
      {
        id: 1,
        name: "Samsung Fridge Warranty",
        assetName: "Samsung Refrigerator",
        category: "warranty",
        issueDate: "2020-03-15",
        expiryDate: "2025-03-15",
        provider: "Samsung India",
        documentNumber: "WTY-SAM-2020-001234",
        status: "active",
        location: "Physical File - Cabinet A",
        digitalCopy: true,
        notes: "5-year comprehensive warranty. Covers compressor for 10 years."
      },
      {
        id: 2,
        name: "Honda Activa Registration",
        assetName: "Honda Activa 6G",
        category: "ownership",
        issueDate: "2022-01-20",
        expiryDate: "2042-01-20",
        provider: "RTO Chennai",
        documentNumber: "TN09BH1234",
        status: "active",
        location: "Safe Locker",
        digitalCopy: true,
        notes: "Original RC book. Insurance policy attached separately."
      },
      {
        id: 3,
        name: "Dining Table Purchase Bill",
        assetName: "Teak Wood Dining Table",
        category: "purchase",
        issueDate: "2018-12-10",
        expiryDate: null,
        provider: "Raman Furniture Works",
        documentNumber: "INV-2018-0876",
        status: "active",
        location: "Physical File - Cabinet B",
        digitalCopy: false,
        notes: "Custom made table. Includes wood quality certificate."
      },
      {
        id: 4,
        name: "Washing Machine Service Manual",
        assetName: "LG Washing Machine",
        category: "manual",
        issueDate: "2021-05-10",
        expiryDate: null,
        provider: "LG Electronics",
        documentNumber: "MAN-LG-WM-2021",
        status: "active",
        location: "Digital Only",
        digitalCopy: true,
        notes: "Downloaded from LG website. Includes troubleshooting guide."
      }
    ];
    let filteredDocuments = documents;
    function getStatusColor(status, expiryDate) {
      if (status === "expired") return "bg-red-100 text-red-800 border-red-200";
      if (expiryDate && isExpiringSoon(expiryDate)) return "bg-orange-100 text-orange-800 border-orange-200";
      return "bg-green-100 text-green-800 border-green-200";
    }
    function getStatusText(status, expiryDate) {
      if (status === "expired") return "Expired";
      if (expiryDate && isExpiringSoon(expiryDate)) return "Expiring Soon";
      return "Active";
    }
    function getCategoryInfo(categoryId) {
      return documentCategories.find((cat) => cat.id === categoryId) || {
        name: "Unknown",
        icon: "heroicons:question-mark-circle",
        color: "text-gray-500"
      };
    }
    function isExpiringSoon(expiryDate) {
      if (!expiryDate) return false;
      const today = /* @__PURE__ */ new Date();
      const expiry = new Date(expiryDate);
      const diffMonths = (expiry.getFullYear() - today.getFullYear()) * 12 + (expiry.getMonth() - today.getMonth());
      return diffMonths <= 3 && diffMonths >= 0;
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN");
    }
    {
      filteredDocuments = documents.filter((doc) => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || doc.provider.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        return matchesSearch && matchesCategory;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Documents &amp; Ownership</h1> <p class="text-gray-600 dark:text-gray-300">Manage proofs, warranties, and important papers</p></div></div> <button class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add Document</span></button></div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
    const each_array = ensure_array_like(
      // Add document logic would go here
      // Reset form
      documentCategories
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"><div class="text-center"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg w-fit mx-auto mb-3">`);
      Icon($$renderer2, {
        icon: category.icon,
        class: `w-6 h-6 ${stringify(category.color)}`
      });
      $$renderer2.push(`<!----></div> <h3 class="font-semibold text-gray-900 dark:text-white text-sm">${escape_html(category.name)}</h3> <p class="text-xs text-gray-600 dark:text-gray-400">${escape_html(documents.filter((doc) => doc.category === category.id).length)} docs</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Documents</label> <div class="relative">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
    });
    $$renderer2.push(`<!----> <input type="text"${attr("value", searchTerm)} placeholder="Search by document name, asset, or provider..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"/></div></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(documentCategories);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let category = each_array_1[$$index_1];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredDocuments);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let document = each_array_2[$$index_2];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"><div class="p-6"><div class="flex items-start justify-between mb-4"><div class="flex items-start space-x-3 flex-1"><div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">`);
      Icon($$renderer2, {
        icon: getCategoryInfo(document.category).icon,
        class: `w-5 h-5 ${stringify(getCategoryInfo(document.category).color)}`
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><h3 class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(document.name)}</h3> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(document.assetName)}</p> <div class="flex items-center space-x-2 mt-2"><span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">${escape_html(getCategoryInfo(document.category).name)}</span> <span${attr_class(`px-2 py-1 text-xs font-medium border rounded-full ${stringify(getStatusColor(document.status, document.expiryDate))}`)}>${escape_html(getStatusText(document.status, document.expiryDate))}</span></div></div></div> `);
      if (document.digitalCopy) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">`);
        Icon($$renderer2, {
          icon: "heroicons:cloud",
          class: "w-4 h-4 text-green-600 dark:text-green-400"
        });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="space-y-3"><div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Document Number:</span> <span class="font-mono text-gray-900 dark:text-white">${escape_html(document.documentNumber)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Provider:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(document.provider)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Issue Date:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatDate(document.issueDate))}</span></div> `);
      if (document.expiryDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Expiry Date:</span> <span${attr_class(`font-medium ${stringify(isExpiringSoon(document.expiryDate) ? "text-orange-600" : "text-gray-900 dark:text-white")}`)}>${escape_html(formatDate(document.expiryDate))} `);
        if (isExpiringSoon(document.expiryDate)) {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, {
            icon: "heroicons:exclamation-triangle",
            class: "w-4 h-4 inline ml-1 text-orange-500"
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Location:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(document.location)}</span></div> `);
      if (document.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="pt-3 border-t border-gray-200 dark:border-gray-700"><p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(document.notes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="flex space-x-2 mt-6"><button class="flex-1 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50">View Details</button> `);
      if (document.digitalCopy) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">Download</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">Scan Copy</button>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredDocuments.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:document-text",
        class: "w-8 h-8 text-gray-400"
      });
      $$renderer2.push(`<!----></div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3> <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  AssetsDocumentsPage as default
};
