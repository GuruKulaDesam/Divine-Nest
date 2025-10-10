import { d as attr, a as ensure_array_like, s as stringify, b as attr_class, j as attr_style, h as head } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { a as getBooks } from "../../../chunks/education.js";
import { T as escape_html } from "../../../chunks/context.js";
function LibraryManager($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let books = [];
    let filteredBooks = [];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedOwner = "all";
    const categories = [
      {
        value: "spiritual",
        label: "Spiritual",
        icon: "heroicons:sparkles",
        color: "text-purple-500"
      },
      {
        value: "comics",
        label: "Comics",
        icon: "heroicons:face-smile",
        color: "text-pink-500"
      },
      {
        value: "historical",
        label: "Historical",
        icon: "heroicons:clock",
        color: "text-amber-500"
      },
      {
        value: "mythics",
        label: "Mythics",
        icon: "heroicons:star",
        color: "text-indigo-500"
      },
      {
        value: "mystics",
        label: "Mystics",
        icon: "heroicons:eye",
        color: "text-cyan-500"
      },
      {
        value: "academic",
        label: "Academic",
        icon: "heroicons:academic-cap",
        color: "text-green-500"
      }
    ];
    const owners = [
      { value: "amma", label: "Amma" },
      { value: "appa", label: "Appa" },
      { value: "paati", label: "Paati" },
      { value: "children", label: "Children" },
      { value: "family", label: "Family" }
    ];
    async function loadBooks() {
      try {
        books = await getBooks();
        applyFilters();
      } catch (error) {
        console.error("Error loading books:", error);
      }
    }
    loadBooks();
    function applyFilters() {
      let filtered = books;
      filteredBooks = filtered;
    }
    function getCategoryInfo(category) {
      return categories.find((c) => c.value === category) || categories[0];
    }
    function getProgressColor(progress) {
      if (progress >= 100) return "bg-green-500";
      if (progress >= 80) return "bg-blue-500";
      if (progress >= 60) return "bg-yellow-500";
      if (progress >= 40) return "bg-orange-500";
      return "bg-red-500";
    }
    function getStatusColor(status) {
      switch (status) {
        case "reading":
          return "bg-blue-100 text-blue-800";
        case "completed":
          return "bg-green-100 text-green-800";
        case "available":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    applyFilters();
    $$renderer2.push(`<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "text-green-500" });
    $$renderer2.push(`<!----> Family Library Manager</h2> <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "text-lg" });
    $$renderer2.push(`<!----> ${escape_html("Add Book")}</button></div> <div class="mb-6 p-4 bg-gray-50 rounded-xl"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Search</label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title or author..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"/></div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Category</label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Owned By</label> `);
    $$renderer2.select(
      {
        value: selectedOwner,
        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Owners`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(owners);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let owner = each_array_1[$$index_1];
          $$renderer3.option({ value: owner.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(owner.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="flex items-end"><button class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">Clear Filters</button></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_4 = ensure_array_like(filteredBooks);
    for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
      let book = each_array_4[$$index_5];
      $$renderer2.push(`<div class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><div class="p-3 bg-gray-50 rounded-lg">`);
      Icon($$renderer2, {
        icon: getCategoryInfo(book.category).icon,
        class: `${stringify(getCategoryInfo(book.category).color)} text-xl`
      });
      $$renderer2.push(`<!----></div> <div><span${attr_class(`inline-block px-2 py-1 text-xs font-medium rounded-full ${stringify(getStatusColor(book.status))}`)}>${escape_html(book.status)}</span></div></div> <div class="flex gap-1"><button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "text-sm" });
      $$renderer2.push(`<!----></button> <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "text-sm" });
      $$renderer2.push(`<!----></button></div></div> <div class="mb-4"><h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">${escape_html(book.title)}</h3> <p class="text-sm text-gray-600 mb-2">by ${escape_html(book.author)}</p> <p class="text-xs text-gray-500">Owned by: ${escape_html(owners.find((o) => o.value === book.ownedBy)?.label || book.ownedBy)}</p></div> `);
      if (book.totalPages) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><div class="flex justify-between text-sm mb-2"><span class="text-gray-600">Progress</span> <span class="font-medium">${escape_html(book.progress)}% (${escape_html(book.currentPage || 0)}/${escape_html(book.totalPages)} pages)</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`${stringify(getProgressColor(book.progress))} h-2 rounded-full transition-all duration-300`)}${attr_style(`width: ${stringify(book.progress)}%`)}></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (book.rating) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 mb-3"><!--[-->`);
        const each_array_5 = ensure_array_like(Array(5));
        for (let i = 0, $$length2 = each_array_5.length; i < $$length2; i++) {
          each_array_5[i];
          Icon($$renderer2, {
            icon: "heroicons:star",
            class: `text-sm ${stringify(i < book.rating ? "text-yellow-400" : "text-gray-300")}`
          });
        }
        $$renderer2.push(`<!--]--> <span class="text-sm text-gray-600 ml-2">${escape_html(book.rating)}/5</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex gap-2"><button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200">${escape_html(book.status === "reading" ? "Mark Available" : "Start Reading")}</button> `);
      if (book.status === "reading") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200">Mark Complete</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredBooks.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:book-open",
        class: "text-gray-300 text-6xl mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-medium text-gray-600 mb-2">${escape_html(books.length === 0 ? "No Books in Library" : "No Books Match Filters")}</h3> <p class="text-gray-500 mb-4">${escape_html(books.length === 0 ? "Add your first book to start building your family library" : "Try adjusting your search or filters")}</p> `);
      if (books.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">Add First Book</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Family Library - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Manage your family's book collection with role-based organization"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6"><div class="max-w-7xl mx-auto">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-8 p-6 bg-green-100 border border-green-200 rounded-xl"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: "heroicons:book-open",
        class: "text-green-600 text-2xl"
      });
      $$renderer2.push(`<!----> <div><h2 class="text-lg font-semibold text-green-800">Welcome to Family Library</h2> <p class="text-green-700">Organize books by category and family member roles</p></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mb-8"><h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "text-green-600" });
    $$renderer2.push(`<!----> 📚 Family Library</h1> <p class="text-gray-600 text-lg">Manage your collection of spiritual, historical, and academic books</p></div> `);
    LibraryManager($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
