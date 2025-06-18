<script>
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "../utils/motion.js";
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
  let selectedProduct = null;

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
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock":
        return Number(a.stock) - Number(b.stock);
      case "created":
        return new Date(b.createdAt) - new Date(a.createdAt);
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

  function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      products = products.filter((p) => p.id !== productId);
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
        <h1 class="text-3xl font-bold text-base-content">Products</h1>
        <p class="mt-2 text-sm text-base-content/60">
          Manage your product catalog and inventory.
        </p>
      </div>
      <button
        class="btn btn-primary shadow-lg hover:text-primary-content"
        on:click={openAddProductModal}
        use:motionHover
      >
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Add Product
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
            >Search Products</label
          >
          <div class="join w-full">
            <div class="join-item flex-1">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search by name, description, or SKU..."
                class="input input-bordered w-full"
              />
            </div>
            <button class="btn join-item hover:text-base-content">
              <Icon icon="heroicons:magnifying-glass" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-base-content mb-2"
            >Category</label
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
            >Status</label
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
        class="flex items-center justify-between mt-6 pt-6 border-t border-base-300"
      >
        <div class="flex items-center space-x-4">
          <span class="text-sm text-base-content/60">Sort by:</span>
          <select
            bind:value={selectedSortBy}
            class="select select-bordered select-sm"
          >
            {#each sortOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="text-sm text-base-content/60">
          {sortedProducts.length} of {products.length} products
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
              {product.stock} in stock
            </span>
          </div>

          <div
            class="flex items-center justify-between text-xs text-base-content/60"
          >
            <span>SKU: {product.sku}</span>
            <span>{product.category}</span>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions justify-end mt-3">
            <button
              class="btn btn-outline btn-primary btn-sm hover:text-primary-content"
              on:click={() => editProduct(product)}
            >
              <Icon icon="heroicons:pencil-square" class="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              class="btn btn-outline btn-error btn-sm hover:text-white"
              on:click={() => deleteProduct(product.id)}
            >
              <Icon icon="heroicons:trash" class="w-4 h-4 mr-1" />
              Delete
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
          No products found
        </h3>
        <p class="text-base-content/60 mb-6">
          Try adjusting your search or filter criteria.
        </p>
        <button
          class="btn btn-primary shadow-lg hover:text-primary-content"
          on:click={openAddProductModal}
        >
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          Add Your First Product
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
          {selectedProduct ? "Edit Product" : "Add New Product"}
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
            <span class="label-text">Product Name</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            placeholder="Enter product name"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select class="select select-bordered">
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <input
            type="number"
            step="0.01"
            class="input input-bordered"
            placeholder="0.00"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Stock Quantity</span>
          </label>
          <input type="number" class="input input-bordered" placeholder="0" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">SKU</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            placeholder="Enter SKU"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select class="select select-bordered">
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div class="form-control md:col-span-2">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            rows="3"
            class="textarea textarea-bordered"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div class="form-control md:col-span-2">
          <label class="label">
            <span class="label-text">Product Image URL</span>
          </label>
          <input
            type="url"
            class="input input-bordered"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline hover:text-base-content" on:click={closeAddProductModal}>
          Cancel
        </button>
        <button
          class="btn btn-primary shadow-lg hover:text-primary-content"
          on:click={closeAddProductModal}
        >
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  </div>
{/if}
