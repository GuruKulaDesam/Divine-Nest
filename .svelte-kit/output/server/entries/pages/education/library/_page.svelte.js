import "clsx";
import { a as ensure_array_like, f as attr_style, s as stringify, b as attr_class } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function LibraryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredBooks;
    let searchTerm = "";
    let selectedCategory = "all";
    let books = [
      {
        id: 1,
        title: "Bhagavad Gita",
        author: "Vyasa",
        category: "spiritual",
        ownedBy: "Paati",
        status: "reading",
        progress: 60,
        shelf: "Tamil Spiritual"
      },
      {
        id: 2,
        title: "Thirukkural",
        author: "Thiruvalluvar",
        category: "spiritual",
        ownedBy: "Family",
        status: "available",
        progress: 0,
        shelf: "Tamil Classics"
      },
      {
        id: 3,
        title: "Ramayana",
        author: "Valmiki",
        category: "spiritual",
        ownedBy: "Appa",
        status: "completed",
        progress: 100,
        shelf: "Sanskrit Epics"
      },
      {
        id: 4,
        title: "Tamil Literature",
        author: "U.V. Swaminatha Iyer",
        category: "academic",
        ownedBy: "Akka",
        status: "reading",
        progress: 30,
        shelf: "Study Materials"
      },
      {
        id: 5,
        title: "Mathematics Grade 10",
        author: "NCERT",
        category: "academic",
        ownedBy: "Chellam",
        status: "reading",
        progress: 45,
        shelf: "School Books"
      },
      {
        id: 6,
        title: "Ponniyin Selvan - Volume 1",
        author: "Kalki",
        category: "historical",
        ownedBy: "Amma",
        status: "reading",
        progress: 75,
        shelf: "Tamil Historical Fiction"
      },
      {
        id: 7,
        title: "Sivagamiyin Sabadham",
        author: "Kalki",
        category: "historical",
        ownedBy: "Family",
        status: "available",
        progress: 0,
        shelf: "Tamil Historical Fiction"
      },
      {
        id: 8,
        title: "Amar Chitra Katha - Hanuman",
        author: "Anant Pai",
        category: "comics",
        ownedBy: "Kanna",
        status: "completed",
        progress: 100,
        shelf: "Children's Comics"
      },
      {
        id: 9,
        title: "Tinkle Digest",
        author: "Various",
        category: "comics",
        ownedBy: "Kanna",
        status: "reading",
        progress: 20,
        shelf: "Children's Comics"
      },
      {
        id: 10,
        title: "Autobiography of a Yogi",
        author: "Paramahansa Yogananda",
        category: "mystical",
        ownedBy: "Paati",
        status: "completed",
        progress: 100,
        shelf: "Spiritual Philosophy"
      }
    ];
    let readingGoals = [
      {
        person: "Paati",
        currentBooks: 2,
        goalBooks: 12,
        genre: "Spiritual & Philosophy"
      },
      {
        person: "Amma",
        currentBooks: 1,
        goalBooks: 8,
        genre: "Historical Fiction"
      },
      {
        person: "Appa",
        currentBooks: 1,
        goalBooks: 6,
        genre: "Spiritual & Business"
      },
      {
        person: "Akka",
        currentBooks: 2,
        goalBooks: 15,
        genre: "Academic & Literature"
      },
      {
        person: "Chellam",
        currentBooks: 1,
        goalBooks: 10,
        genre: "Academic & Comics"
      },
      {
        person: "Kanna",
        currentBooks: 2,
        goalBooks: 20,
        genre: "Comics & Stories"
      }
    ];
    let categories = [
      {
        name: "all",
        label: "All Books",
        icon: "heroicons:book-open",
        count: books.length
      },
      {
        name: "spiritual",
        label: "Spiritual",
        icon: "heroicons:sparkles",
        count: books.filter((b) => b.category === "spiritual").length
      },
      {
        name: "academic",
        label: "Academic",
        icon: "heroicons:academic-cap",
        count: books.filter((b) => b.category === "academic").length
      },
      {
        name: "historical",
        label: "Historical",
        icon: "heroicons:globe-alt",
        count: books.filter((b) => b.category === "historical").length
      },
      {
        name: "comics",
        label: "Comics",
        icon: "heroicons:face-smile",
        count: books.filter((b) => b.category === "comics").length
      },
      {
        name: "mystical",
        label: "Mystical",
        icon: "heroicons:moon",
        count: books.filter((b) => b.category === "mystical").length
      }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "reading":
          return "text-blue-600 bg-blue-100";
        case "completed":
          return "text-green-600 bg-green-100";
        case "available":
          return "text-gray-600 bg-gray-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function getCategoryColor(category) {
      switch (category) {
        case "spiritual":
          return "text-orange-600 bg-orange-100";
        case "academic":
          return "text-blue-600 bg-blue-100";
        case "historical":
          return "text-purple-600 bg-purple-100";
        case "comics":
          return "text-pink-600 bg-pink-100";
        case "mystical":
          return "text-indigo-600 bg-indigo-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    filteredBooks = books.filter((book) => {
      const matchesCategory = selectedCategory === "all";
      return matchesCategory;
    });
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold text-base-content mb-2">📚 Family Library &amp; Reading</h1> <p class="text-base-content/60">Role-based shelves, reading tracker, and lifelong learning</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"><!--[-->`);
    const each_array = ensure_array_like(
      // Get status color
      // Get category color
      readingGoals
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let goal = each_array[$$index];
      $$renderer2.push(`<div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between mb-2"><h3 class="font-semibold text-base-content">${escape_html(goal.person)}</h3> <span class="text-sm text-base-content/60">${escape_html(goal.currentBooks)}/${escape_html(goal.goalBooks)}</span></div> <div class="w-full bg-base-300 rounded-full h-2 mb-2"><div class="bg-primary h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(goal.currentBooks / goal.goalBooks * 100)}%`)}></div></div> <p class="text-xs text-base-content/60">${escape_html(goal.genre)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Library</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Reading Plans</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:squares-2x2", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Shelves</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex flex-wrap gap-4 items-center"><div class="flex-1 min-w-64"><div class="relative">`);
      Icon($$renderer2, {
        icon: "heroicons:magnifying-glass",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40"
      });
      $$renderer2.push(`<!----> <input type="text" placeholder="Search books, authors, or family member..." class="input input-bordered w-full pl-10"${attr("value", searchTerm)}/></div></div></div> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_1 = ensure_array_like(categories);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let category = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class(`btn btn-sm ${stringify(selectedCategory === category.name ? "btn-primary" : "btn-outline")}`)}>`);
        Icon($$renderer2, { icon: category.icon, class: "w-4 h-4 mr-1" });
        $$renderer2.push(`<!----> ${escape_html(category.label)} (${escape_html(category.count)})</button>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_2 = ensure_array_like(filteredBooks);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let book = each_array_2[$$index_2];
        $$renderer2.push(`<div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"><div class="card-body p-4"><div class="flex justify-between items-start mb-2"><span${attr_class(`badge ${stringify(getCategoryColor(book.category))} badge-sm`)}>${escape_html(book.category)}</span> <span${attr_class(`badge ${stringify(getStatusColor(book.status))} badge-sm`)}>${escape_html(book.status)}</span></div> <h3 class="card-title text-base text-base-content">${escape_html(book.title)}</h3> <p class="text-sm text-base-content/60 mb-2">by ${escape_html(book.author)}</p> <div class="space-y-2"><div class="flex items-center justify-between text-sm"><span class="text-base-content/60">Owner:</span> <span class="text-base-content">${escape_html(book.ownedBy)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-base-content/60">Shelf:</span> <span class="text-base-content text-xs">${escape_html(book.shelf)}</span></div> `);
        if (book.status === "reading") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div><div class="flex justify-between text-sm mb-1"><span class="text-base-content/60">Progress:</span> <span class="text-base-content">${escape_html(book.progress)}%</span></div> <div class="w-full bg-base-300 rounded-full h-1"><div class="bg-primary h-1 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(book.progress)}%`)}></div></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="card-actions justify-end mt-4">`);
        if (book.status === "available") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn btn-sm btn-primary">Start Reading</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (book.status === "reading") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="btn btn-sm btn-secondary">Update Progress</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<button class="btn btn-sm btn-outline">Mark as Re-reading</button>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  LibraryPage($$renderer);
}
export {
  _page as default
};
