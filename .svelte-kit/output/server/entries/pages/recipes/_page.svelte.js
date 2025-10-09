import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { e as escape_html } from "../../../chunks/context.js";
function RecipesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let recipes = [
      {
        id: 1,
        name: "Chicken Biryani",
        nameTamil: "கோழி பிரியாணி",
        category: "Main Course",
        cuisine: "Indian",
        prepTime: 30,
        cookTime: 45,
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "500g chicken",
          "2 cups basmati rice",
          "2 onions",
          "3 tomatoes",
          "Spices (cumin, coriander, turmeric, garam masala)",
          "2 tbsp oil",
          "Salt to taste"
        ],
        instructions: "1. Marinate chicken with spices. 2. Cook rice. 3. Prepare masala. 4. Layer and cook.",
        notes: "Traditional South Indian style biryani",
        status: "Active"
      },
      {
        id: 2,
        name: "Vegetable Sambar",
        nameTamil: "காய்கறி சாம்பார்",
        category: "Main Course",
        cuisine: "South Indian",
        prepTime: 15,
        cookTime: 25,
        servings: 6,
        difficulty: "Easy",
        ingredients: [
          "1 cup toor dal",
          "Mixed vegetables (drumstick, brinjal, pumpkin)",
          "2 tomatoes",
          "Tamarind",
          "Sambar powder",
          "Salt to taste"
        ],
        instructions: "1. Cook dal. 2. Prepare vegetables. 3. Add tamarind and spices. 4. Simmer together.",
        notes: "Perfect with rice and ghee",
        status: "Active"
      }
    ];
    let filteredRecipes = [...recipes];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedCuisine = "all";
    let selectedDifficulty = "all";
    const categories = [
      "Main Course",
      "Appetizer",
      "Dessert",
      "Beverage",
      "Snack",
      "Breakfast"
    ];
    const cuisines = [
      "Indian",
      "South Indian",
      "North Indian",
      "Chinese",
      "Italian",
      "Continental"
    ];
    const difficulties = ["Easy", "Medium", "Hard"];
    function getDifficultyColor(difficulty) {
      switch (difficulty) {
        case "Easy":
          return "bg-green-100 text-green-800";
        case "Medium":
          return "bg-yellow-100 text-yellow-800";
        case "Hard":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getStatusColor(status) {
      return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
    }
    {
      filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.nameTamil.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        const matchesCuisine = selectedCuisine === "all";
        const matchesDifficulty = selectedDifficulty === "all";
        return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Recipes</h1> <p class="text-base-content/70 mt-1">Manage your family recipes collection</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Recipe</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:chef-hat", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Recipes</div> <div class="stat-value text-primary">${escape_html(recipes.length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-secondary">`);
    Icon($$renderer2, { icon: "mdi:food-variant", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Categories</div> <div class="stat-value text-secondary">${escape_html(new Set(recipes.map((r) => r.category)).size)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-accent">`);
    Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Avg Prep Time</div> <div class="stat-value text-accent">${escape_html(recipes.length > 0 ? Math.round(recipes.reduce((sum, r) => sum + r.prepTime, 0) / recipes.length) : 0)}m</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Recipes</div> <div class="stat-value text-info">${escape_html(recipes.filter((r) => r.status === "Active").length)}</div></div></div> <div class="bg-base-100 p-6 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Recipes</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select({ value: selectedCategory, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Categories`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(categories);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let category = each_array[$$index];
        $$renderer3.option({ value: category }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(category)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Cuisine</span></label> `);
    $$renderer2.select({ value: selectedCuisine, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Cuisines`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(cuisines);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let cuisine = each_array_1[$$index_1];
        $$renderer3.option({ value: cuisine }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(cuisine)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Difficulty</span></label> `);
    $$renderer2.select({ value: selectedDifficulty, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Levels`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(difficulties);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let difficulty = each_array_2[$$index_2];
        $$renderer3.option({ value: difficulty }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(difficulty)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text opacity-0">Actions</span></label> <button class="btn btn-outline btn-block">Clear Filters</button></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(filteredRecipes);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let recipe = each_array_3[$$index_3];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><div><h3 class="card-title text-lg">${escape_html(recipe.name)}</h3> `);
      if (recipe.nameTamil) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70">${escape_html(recipe.nameTamil)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="flex flex-wrap gap-2 mb-3"><span class="badge badge-primary">${escape_html(recipe.category)}</span> <span class="badge badge-secondary">${escape_html(recipe.cuisine)}</span> <span${attr_class(`badge ${stringify(getDifficultyColor(recipe.difficulty))}`)}>${escape_html(recipe.difficulty)}</span> <span${attr_class(`badge ${stringify(getStatusColor(recipe.status))}`)}>${escape_html(recipe.status)}</span></div> <div class="grid grid-cols-2 gap-4 text-sm mb-4"><div class="flex items-center gap-1">`);
      Icon($$renderer2, {
        icon: "mdi:clock-outline",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>Prep: ${escape_html(recipe.prepTime)}m</span></div> <div class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "mdi:chef-hat", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span>Cook: ${escape_html(recipe.cookTime)}m</span></div> <div class="flex items-center gap-1">`);
      Icon($$renderer2, {
        icon: "mdi:account-group",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>Serves: ${escape_html(recipe.servings)}</span></div> <div class="flex items-center gap-1">`);
      Icon($$renderer2, {
        icon: "mdi:food-variant",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>${escape_html(recipe.ingredients.length)} ingredients</span></div></div> `);
      if (recipe.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70 italic">${escape_html(recipe.notes)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredRecipes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:chef-hat",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No recipes found</h3> <p class="text-base-content/50">Try adjusting your search or filters</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
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
  RecipesPage($$renderer);
}
export {
  _page as default
};
