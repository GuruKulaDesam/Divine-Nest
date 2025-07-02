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
  <!-- Page header -->
  <div
    class="border-b border-base-300 pb-6"
    use:motionInView={{ animation: "fadeInDown" }}
  >
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content">{$_("products.title")}</h1>
        <p class="mt-2 text-sm text-base-content/60">
          {$_("products.description")}
        </p>
      </div>
      <button
        class="btn btn-primary shadow-lg hover:text-primary-content group"
        on:click={openAddProductModal}
        use:motionHover
      >
        <div class="p-1 rounded bg-primary-content/10 group-hover:bg-primary-content/20">
          <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        </div>
        {$_("products.add_product")}
      </button>
    </div>
  </div>

  <!-- Filters and Search -->
  <div
    class="card bg-base-100 shadow-sm border border-base-300"
    use:motionInView={{ animation: "fadeInUp" }}
  >
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                class="input input-bordered w-full"
              />
            </div>
            <button class="btn join-item hover:text-base-content">
              <div class="p-1 rounded bg-base-200">
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
            class="select select-bordered w-full"
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
            class="select select-bordered w-full"
          >
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Sort and Results -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-base-300 gap-4"
      >
        <!-- Sort Options -->
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-sm font-medium text-base-content/70">{$_("products.sort_by")}</span>
          <div class="flex flex-wrap gap-2">
            {#each sortOptions as option}
              <button
                class="btn btn-sm {selectedSortBy === option.value ? 'btn-primary' : 'btn-ghost'} gap-2 group"
                on:click={() => selectedSortBy = option.value}
              >
                <div class="p-1 rounded {selectedSortBy === option.value ? 'bg-primary-content/10 group-hover:bg-primary-content/20' : 'bg-base-200 group-hover:bg-base-300'}">
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
  </div>

  <!-- Products Grid -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    use:motionInView={{ animation: "fadeInUp" }}
  >
    {#each sortedProducts as product (product.id)}
      <div
        class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200"
        use:motionHover
      >
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
            <div class="badge {getStatusColor(product.status)}">
              {getStatusDisplayText(product.status)}
            </div>
          </div>
        </figure>

        <!-- Product Info -->
        <div class="card-body p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="card-title text-sm line-clamp-2">{product.name}</h3>
            <button
              class="btn btn-ghost btn-xs hover:text-base-content"
              on:click={() => editProduct(product)}
            >
              <Icon icon="heroicons:pencil-square" class="w-4 h-4" />
            </button>
          </div>

          <p class="text-xs text-base-content/60 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div class="flex items-center justify-between mb-3">
            <span class="text-lg font-bold text-base-content"
              >${product.price}</span
            >
            <span class="text-sm font-medium {getStockColor(product.stock)}">
              {product.stock} {$_("products.in_stock")}
            </span>
          </div>

          <div
            class="flex items-center justify-between text-xs text-base-content/60"
          >
            <span>{$_("products.sku")}: {product.sku}</span>
            <span>{product.category}</span>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-end mt-3">
            <button
              class="btn btn-outline btn-primary btn-sm hover:text-primary-content group"
              on:click={() => editProduct(product)}
            >
              <div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20">
                <Icon icon="heroicons:pencil-square" class="w-4 h-4 mr-1 text-primary" />
              </div>
              {$_("products.edit")}
            </button>
            <button
              class="btn btn-outline btn-error btn-sm hover:text-white group"
              on:click={() => openDeleteConfirmation(product)}
            >
              <div class="p-1 rounded bg-error/10 group-hover:bg-error/20">
                <Icon icon="heroicons:trash" class="w-4 h-4 mr-1 text-error" />
              </div>
              {$_("products.delete")}
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Empty State -->
  {#if sortedProducts.length === 0}
    <div
      class="card bg-base-100 shadow-sm border border-base-300"
      use:motionInView={{ animation: "fadeInUp" }}
    >
      <div class="card-body text-center py-12">
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
          class="btn btn-primary shadow-lg hover:text-primary-content"
          on:click={openAddProductModal}
        >
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          {$_("products.add_first_product")}
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
          class="btn btn-primary shadow-lg hover:text-primary-content"
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
          <div class="p-1 rounded bg-base-200 group-hover:bg-base-300">
            <Icon icon="heroicons:x-mark" class="w-4 h-4 mr-2" />
          </div>
          {$_("common.cancel")}
        </button>
        <button 
          class="btn btn-error group" 
          on:click={confirmDelete}
        >
          <div class="p-1 rounded bg-error-content/10 group-hover:bg-error-content/20">
            <Icon icon="heroicons:trash" class="w-4 h-4 mr-2 text-error-content" />
          </div>
          {$_("common.delete")}
        </button>
      </div>
    </div>
  </div>
{/if}
