import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function CommunityPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredPosts;
    let communityPosts = [
      {
        id: 1,
        author: "Rajesh Kumar",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        title: "Traditional South Indian Wedding Planning Tips",
        content: "Sharing some insights on planning traditional weddings in our community...",
        category: "Events",
        likes: 24,
        comments: 8,
        timestamp: "2 hours ago",
        tags: ["wedding", "tradition", "family"]
      },
      {
        id: 2,
        author: "Priya Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        title: "Best Places for South Indian Cuisine in Kovai",
        content: "Here are my favorite restaurants serving authentic South Indian food...",
        category: "Food",
        likes: 31,
        comments: 12,
        timestamp: "4 hours ago",
        tags: ["food", "restaurants", "authentic"]
      },
      {
        id: 3,
        author: "Arun Prasad",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
        title: "Temple Visit Schedule for This Month",
        category: "Religion",
        likes: 18,
        comments: 5,
        timestamp: "6 hours ago",
        tags: ["temple", "schedule", "spiritual"]
      }
    ];
    let selectedCategory = "all";
    let searchQuery = "";
    const categories = [
      { id: "all", name: "All Posts", icon: "mdi:forum" },
      { id: "general", name: "General", icon: "mdi:chat" },
      { id: "events", name: "Events", icon: "mdi:calendar" },
      { id: "food", name: "Food", icon: "mdi:food" },
      { id: "religion", name: "Religion", icon: "mdi:temple-hindu" },
      { id: "education", name: "Education", icon: "mdi:school" },
      { id: "health", name: "Health", icon: "mdi:heart" },
      { id: "business", name: "Business", icon: "mdi:briefcase" }
    ];
    function getCategoryIcon(category) {
      const cat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
      return cat ? cat.icon : "mdi:chat";
    }
    function getCategoryColor(category) {
      const colors = {
        "Events": "bg-blue-100 text-blue-800",
        "Food": "bg-green-100 text-green-800",
        "Religion": "bg-orange-100 text-orange-800",
        "General": "bg-gray-100 text-gray-800",
        "Education": "bg-purple-100 text-purple-800",
        "Health": "bg-red-100 text-red-800",
        "Business": "bg-indigo-100 text-indigo-800"
      };
      return colors[category] || "bg-gray-100 text-gray-800";
    }
    filteredPosts = communityPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 class="text-3xl font-bold text-base-content">Community Forum</h1> <p class="text-base-content/60 mt-1">Connect with fellow community members and share experiences</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> New Post</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:forum", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Posts</div> <div class="stat-value text-primary">${escape_html(communityPosts.length)}</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-secondary">`);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Members</div> <div class="stat-value text-secondary">127</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-accent">`);
    Icon($$renderer2, { icon: "mdi:heart", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Likes</div> <div class="stat-value text-accent">${escape_html(communityPosts.reduce((sum, post) => sum + post.likes, 0))}</div></div> <div class="stat bg-base-100 rounded-xl shadow-sm"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:comment", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Comments</div> <div class="stat-value text-info">${escape_html(communityPosts.reduce((sum, post) => sum + post.comments, 0))}</div></div></div> <div class="bg-base-100 rounded-xl p-6 shadow-sm"><div class="flex flex-col lg:flex-row gap-4"><div class="flex-1"><div class="relative">`);
    Icon($$renderer2, {
      icon: "mdi:magnify",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5"
    });
    $$renderer2.push(`<!----> <input type="text"${attr("value", searchQuery)} placeholder="Search posts, topics, or tags..." class="input input-bordered w-full pl-10"/></div></div> <div class="lg:w-64">`);
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
    const each_array_2 = ensure_array_like(filteredPosts);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let post = each_array_2[$$index_3];
      $$renderer2.push(`<div class="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"><div class="flex items-start gap-4"><img${attr("src", post.avatar)}${attr("alt", post.author)} class="w-12 h-12 rounded-full"/> <div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-4"><div class="flex-1"><div class="flex items-center gap-2 mb-2"><h3 class="font-semibold text-base-content">${escape_html(post.author)}</h3> <span class="text-sm text-base-content/60">${escape_html(post.timestamp)}</span></div> <h4 class="text-lg font-medium text-base-content mb-2">${escape_html(post.title)}</h4> `);
      if (post.content) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-base-content/80 mb-3">${escape_html(post.content)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex items-center gap-4"><span${attr_class(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stringify(getCategoryColor(post.category))}`)}>`);
      Icon($$renderer2, { icon: getCategoryIcon(post.category), class: "w-3 h-3 mr-1" });
      $$renderer2.push(`<!----> ${escape_html(post.category)}</span> `);
      if (post.tags.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex gap-1"><!--[-->`);
        const each_array_3 = ensure_array_like(post.tags);
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let tag = each_array_3[$$index_2];
          $$renderer2.push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-base-200 text-base-content/70">#${escape_html(tag)}</span>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="flex items-center gap-4 mt-4 pt-4 border-t border-base-300"><button class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-red-500">`);
      Icon($$renderer2, { icon: "mdi:heart", class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(post.likes)}</button> <button class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-blue-500">`);
      Icon($$renderer2, { icon: "mdi:comment", class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(post.comments)}</button> <button class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-green-500">`);
      Icon($$renderer2, { icon: "mdi:share", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Share</button></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredPosts.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:forum-outline",
        class: "w-16 h-16 text-base-content/20 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/60 mb-2">No posts found</h3> <p class="text-base-content/40">Try adjusting your search or category filter</p></div>`);
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
function _page($$renderer) {
  CommunityPage($$renderer);
}
export {
  _page as default
};
