<script>
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "../utils/motion.js";
  import { _ } from "svelte-i18n";
  import { 
    products as initialProducts, 
    categoryOptions, 
    statusOptions, 
    sortOptions,
    getStatusColor,
    getStockColor,
    getStatusDisplayText
  } from "../data/products.js";

  // Product data
  let products = [...initialProducts];

  // Filter and search state
  let searchQuery = "";
  let selectedCategory = "all";
  let selectedStatus = "all";
  let selectedSortBy = "name";
  let showAddProductModal = false;
  let showDeleteConfirmModal = false;
  let selectedProduct = null;
  let productToDelete = null;

  // Icon background colors for different stat types
  const iconColors = {
    'heroicons:plus': 'from-blue-500 to-indigo-600',
    'heroicons:magnifying-glass': 'from-gray-500 to-slate-600',
    'heroicons:funnel': 'from-purple-500 to-pink-600',
    'heroicons:document-text': 'from-teal-500 to-cyan-600',
    'heroicons:arrow-up': 'from-green-500 to-emerald-600',
    'heroicons:arrow-down': 'from-red-500 to-pink-600',
    'heroicons:pencil-square': 'from-blue-500 to-indigo-600',
    'heroicons:trash': 'from-red-500 to-pink-600',
    'heroicons:cube': 'from-orange-500 to-red-600',
    'heroicons:exclamation-triangle': 'from-yellow-500 to-orange-600',
    'heroicons:x-mark': 'from-gray-500 to-slate-600'
  };

  // Computed filtered and sorted products
  $: filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  $: sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "stock":
        return Number(a.stock) - Number(b.stock);
      case "stock-desc":
        return Number(b.stock) - Number(a.stock);
      case "created":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "created-desc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Functions
  function openAddProductModal() {
    showAddProductModal = true;
  }

  function closeAddProductModal() {
    showAddProductModal = false;
    selectedProduct = null;
  }

  function editProduct(product) {
    selectedProduct = { ...product };
    showAddProductModal = true;
  }

  function openDeleteConfirmation(product) {
    productToDelete = product;
    showDeleteConfirmModal = true;
  }

  function closeDeleteConfirmation() {
    showDeleteConfirmModal = false;
    productToDelete = null;
  }

  function confirmDelete() {
    if (productToDelete) {
      products = products.filter((p) => p.id !== productToDelete.id);
      closeDeleteConfirmation();
    }
  }
</script>

<div class="space-y-8">
  <!-- Page header with enhanced styling -->
  <div
    class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"
    use:motionInView={{ animation: "fadeInDown" }}
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:cube" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:shopping-cart" class="w-full h-full text-secondary" />
    </div>
    
    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">{$_("products.title")}</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">
          {$_("products.description")}
        </p>
      </div>
      <button
        class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden"
        on:click={openAddProductModal}
        use:motionHover
      >
        <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative flex items-center">
          <div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">
            <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
          </div>
          {$_("products.add_product")}
        </div>
      </button>
    </div>
  </div>

  <!-- Enhanced Filters and Search -->
  <div
          class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"
    use:motionInView={{ animation: "fadeInUp" }}
  >
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-20 h-20 opacity-5">
      <Icon icon="heroicons:funnel" class="w-full h-full text-primary" />
    </div>
    
    <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="lg:col-span-2">
        <label class="block text-sm font-medium text-base-content mb-2"
          >{$_("products.search_products")}</label
        >
        <div class="join w-full">
          <div class="join-item flex-1">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder={$_("products.search_placeholder")}
              class="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <button class="btn join-item hover:text-base-content">
            <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 transition-colors duration-200">
              <Icon icon="heroicons:magnifying-glass" class="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-base-content mb-2"
          >{$_("products.category")}</label
        >
        <select
          bind:value={selectedCategory}
          class="select select-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
        >
          {#each categoryOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-base-content mb-2"
          >{$_("products.status")}</label
        >
        <select
          bind:value={selectedStatus}
          class="select select-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
        >
          {#each statusOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Sort and Results -->
    <div
      class="relative flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-base-300/50 gap-4"
    >
      <!-- Sort Options -->
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm font-medium text-base-content/70">{$_("products.sort_by")}</span>
        <div class="flex flex-wrap gap-2">
          {#each sortOptions as option}
            <button
              class="btn btn-sm {selectedSortBy === option.value ? 'btn-primary' : 'btn-ghost'} gap-2 group hover:shadow-md transition-all duration-200"
              on:click={() => selectedSortBy = option.value}
            >
              <div class="p-1 rounded {selectedSortBy === option.value ? 'bg-primary-content/10 group-hover:bg-primary-content/20' : 'bg-base-200 group-hover:bg-base-300'} transition-colors duration-200">
                {#if option.value.includes('desc')}
                  <Icon icon="heroicons:arrow-down" class="w-4 h-4" />
                {:else}
                  <Icon icon="heroicons:arrow-up" class="w-4 h-4" />
                {/if}
              </div>
              {option.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Results Count -->
      <div class="text-sm text-base-content/60 flex items-center gap-2">
        <div class="p-1 rounded bg-base-200">
          <Icon icon="heroicons:document-text" class="w-4 h-4" />
        </div>
        <span>{sortedProducts.length} {$_("common.of")} {products.length} {$_("products.products_found")}</span>
      </div>
    </div>
  </div>

  <!-- Enhanced Products Grid -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    use:motionInView={{ animation: "fadeInUp" }}
  >
    {#each sortedProducts as product (product.id)}
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"
        use:motionHover
      >
        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <Icon icon="heroicons:cube" class="w-full h-full text-primary" />
        </div>
        
        <!-- Glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        
        <!-- Product Image -->
        <figure class="relative h-48 bg-base-200">
          <img
            src={product.image}
            alt={product.name}
            class="w-full h-full object-cover"
            on:error={(event) => {
              const target = event.target;
              if (target instanceof HTMLImageElement) {
                target.src =
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop";
              }
            }}  
          />
          <div class="absolute top-2 right-2">
                          <div class="badge {getStatusColor(product.status)} shadow-md">
              {getStatusDisplayText(product.status)}
            </div>
          </div>
        </figure>

        <!-- Product Info -->
        <div class="relative p-5">
          <div class="flex items-start justify-between mb-3">
            <h3 class="card-title text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">{product.name}</h3>
            <button
              class="btn btn-ghost btn-xs hover:text-base-content group"
              on:click={() => editProduct(product)}
            >
              <div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon icon="heroicons:pencil-square" class="w-4 h-4" />
              </div>
            </button>
          </div>

          <p class="text-xs text-base-content/60 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-200"
              >${product.price}</span
            >
            <span class="text-sm font-medium {getStockColor(product.stock)}">
              {product.stock} {$_("products.in_stock")}
            </span>
          </div>

          <div
            class="flex items-center justify-between text-xs text-base-content/60 mb-4"
          >
            <span>{$_("products.sku")}: {product.sku}</span>
            <span>{product.category}</span>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-end">
            <button
              class="btn btn-outline btn-primary btn-sm hover:text-primary-content group"
              on:click={() => editProduct(product)}
            >
              <div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon icon="heroicons:pencil-square" class="w-4 h-4 mr-1 text-primary" />
              </div>
              {$_("products.edit")}
            </button>
            <button
              class="btn btn-outline btn-error btn-sm hover:text-white group"
              on:click={() => openDeleteConfirmation(product)}
            >
              <div class="p-1 rounded bg-error/10 group-hover:bg-error/20 transition-colors duration-200">
                <Icon icon="heroicons:trash" class="w-4 h-4 mr-1 text-error" />
              </div>
              {$_("products.delete")}
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Enhanced Empty State -->
  {#if sortedProducts.length === 0}
    <div
      class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 backdrop-blur-sm"
      use:motionInView={{ animation: "fadeInUp" }}
    >
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-24 h-24 opacity-5">
        <Icon icon="heroicons:cube" class="w-full h-full text-primary" />
      </div>
      
      <div class="relative card-body text-center py-12">
        <Icon
          icon="heroicons:cube"
          class="w-16 h-16 text-base-content/40 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-base-content mb-2">
          {$_("products.no_products_found")}
        </h3>
        <p class="text-base-content/60 mb-6">
          {$_("users.try_adjusting_search")}
        </p>
        <button
          class="btn btn-primary shadow-md hover:text-primary-content group relative overflow-hidden"
          on:click={openAddProductModal}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative flex items-center">
            <div class="p-1 rounded bg-primary-content/10 group-hover:bg-primary-content/20 transition-colors duration-300">
              <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
            </div>
            {$_("products.add_first_product")}
          </div>
        </button>
      </div>
    </div>
  {/if}
</div>

<!-- Add/Edit Product Modal -->
{#if showAddProductModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">
          {selectedProduct ? $_("products.edit_product") : $_("products.add_new_product")}
        </h3>
        <button
          class="btn btn-sm btn-circle btn-ghost hover:text-base-content"
          on:click={closeAddProductModal}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.product_name")}</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            placeholder={$_("products.product_name_placeholder")}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.category")}</span>
          </label>
          <select class="select select-bordered">
            <option value="">{$_("products.select_category")}</option>
            <option value="Electronics">{$_("products.electronics")}</option>
            <option value="Wearables">{$_("products.wearables")}</option>
            <option value="Clothing">{$_("products.clothing")}</option>
            <option value="Accessories">{$_("products.accessories")}</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.price")}</span>
          </label>
          <input
            type="number"
            step="0.01"
            class="input input-bordered"
            placeholder={$_("products.price_placeholder")}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.stock_quantity")}</span>
          </label>
          <input type="number" class="input input-bordered" placeholder={$_("products.stock_placeholder")} />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.sku")}</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            placeholder={$_("products.sku_placeholder")}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_("products.status")}</span>
          </label>
          <select class="select select-bordered">
            <option value="active">{$_("products.active")}</option>
            <option value="draft">{$_("products.draft")}</option>
            <option value="out-of-stock">{$_("products.out_of_stock")}</option>
          </select>
        </div>

        <div class="form-control md:col-span-2">
          <label class="label">
            <span class="label-text">{$_("products.description")}</span>
          </label>
          <textarea
            rows="3"
            class="textarea textarea-bordered"
            placeholder={$_("products.description_placeholder")}
          ></textarea>
        </div>

        <div class="form-control md:col-span-2">
          <label class="label">
            <span class="label-text">{$_("products.image_url")}</span>
          </label>
          <input
            type="url"
            class="input input-bordered"
            placeholder={$_("products.image_url_placeholder")}
          />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline hover:text-base-content" on:click={closeAddProductModal}>
          {$_("settings.cancel")}
        </button>
        <button
                      class="btn btn-primary shadow-md hover:text-primary-content"
          on:click={closeAddProductModal}
        >
          {selectedProduct ? $_("products.update_product") : $_("products.add_product")}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Add the Delete Confirmation Modal -->
{#if showDeleteConfirmModal && productToDelete}
  <div class="modal modal-open">
    <div class="modal-box max-w-md" use:motionInView={{ animation: "scaleIn" }}>
      <div class="flex items-center gap-3 mb-6">
        <div class="p-3 bg-error/10 rounded-full">
          <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-error" />
        </div>
        <h3 class="font-bold text-lg text-base-content">
          {$_("products.confirm_delete_product")}
        </h3>
      </div>

      <p class="text-base-content/70 mb-2">
        {$_("common.delete_confirmation_text")} <span class="font-semibold">"{productToDelete.name}"</span>?
      </p>
      <p class="text-sm text-base-content/60 mb-6">
        {$_("common.delete_warning")}
      </p>

      <div class="modal-action gap-2">
        <button 
          class="btn btn-ghost group" 
          on:click={closeDeleteConfirmation}
        >
          <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 transition-colors duration-200">
            <Icon icon="heroicons:x-mark" class="w-4 h-4 mr-2" />
          </div>
          {$_("common.cancel")}
        </button>
        <button 
          class="btn btn-error group" 
          on:click={confirmDelete}
        >
          <div class="p-1 rounded bg-error-content/10 group-hover:bg-error-content/20 transition-colors duration-200">
            <Icon icon="heroicons:trash" class="w-4 h-4 mr-2 text-error-content" />
          </div>
          {$_("common.delete")}
        </button>
      </div>
    </div>
  </div>
{/if}
