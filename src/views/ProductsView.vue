<template>
  <div class="products">
    <div class="hero-section">
      <b-container fluid class="text-center py-5 bg-light">
        <h1 class="text-center my-4 page-title">Our Beauty Products</h1>
        <p class="lead">Discover our complete collection of beauty products</p>
      </b-container>
    </div>

    <b-container class="py-5">
      <b-row>
        <b-col lg="3" md="4" class="mb-4">
          <!-- Filters -->
          <div class="product-filter-section">
            <div class="card border-0 shadow-sm p-3 mb-4">
              <h4 class="mb-3">Categories</h4>
              <div class="category-filter">
                <b-form-group>
                  <b-form-radio-group
                    v-model="selectedCategory"
                    :options="['All', ...categories]"
                    stacked
                    name="category-filter"
                  />
                </b-form-group>
              </div>
            </div>

            <div class="product-filter-section mb-4">
              <div class="card border-0 shadow-sm p-3">
                <h4 class="mb-3">Price Range</h4>
                <div class="price-filter">
                  <b-form-group label="Min Price">
                    <b-form-input v-model="minPrice" type="number" placeholder="Min Price" />
                  </b-form-group>
                  <b-form-group label="Max Price">
                    <b-form-input v-model="maxPrice" type="number" placeholder="Max Price" />
                  </b-form-group>
                  <b-button variant="custom-pink" block class="mt-3" @click="applyPriceFilter">Apply</b-button>
                </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col lg="9" md="8">
          <!-- Sort and product count -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="mb-0">Showing <strong>{{ filteredProducts.length }}</strong> products</p>
            <div class="d-flex align-items-center">
              <span class="mr-2">Sort by:</span>
              <b-form-select v-model="sortOption" :options="sortOptions" size="sm" class="w-auto" />
            </div>
          </div>

          <!-- Product grid -->
          <b-row>
            <b-col v-for="product in sortedProducts" :key="product.id" lg="4" md="6" cols="12" class="mb-4">
              <b-card no-body class="h-100 product-card">
                <div class="product-img-container">
                  <b-card-img :src="product.image" alt="Product image" class="product-img" />
                  <span v-if="product.originalPrice > product.price" class="product-badge discount">Sale</span>
                  <span v-else class="product-badge new">New</span>
                </div>
                <b-card-body>
                  <div class="d-flex justify-content-between align-items-start">
                    <h5 class="product-title">{{ product.name }}</h5>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <span class="product-price mr-2">Rs. {{ product.price }}</span>
                    <span v-if="product.originalPrice > product.price" class="product-original-price">Rs. {{ product.originalPrice }}</span>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <b-button variant="outline-secondary" size="sm" :to="`/product/${product.id}`"><i class="fas fa-eye" /> View</b-button>
                    <b-button variant="custom-pink" size="sm" class="mt-2" @click="addToCart(product)">
                      <b-icon icon="bag-plus" /> Add to Cart
                    </b-button>
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  data() {
    return {
      selectedCategory: 'All',
      minPrice: '',
      maxPrice: '',
      currentPage: 1,
      itemsPerPage: 12,
      sortOption: 'default',
      sortOptions: [
        { value: 'default', text: 'Default' },
        { value: 'price-low-high', text: 'Price: Low to High' },
        { value: 'price-high-low', text: 'Price: High to Low' },
        { value: 'name-a-z', text: 'Name: A to Z' },
        { value: 'name-z-a', text: 'Name: Z to A' }
      ],
      appliedMinPrice: 0,
      appliedMaxPrice: Infinity
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    categories() {
      return this.$store.getters.productCategories
    },
    filteredProducts() {
      let filtered = [...this.products]
      
      // Filter by category
      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }
      
      // Filter by price
      filtered = filtered.filter(product => 
        product.price >= this.appliedMinPrice && 
        product.price <= this.appliedMaxPrice
      )
      
      return filtered
    },
    sortedProducts() {
      const products = [...this.filteredProducts]
      
      switch(this.sortOption) {
        case 'price-low-high':
          return products.sort((a, b) => a.price - b.price)
        case 'price-high-low':
          return products.sort((a, b) => b.price - a.price)
        case 'name-a-z':
          return products.sort((a, b) => a.name.localeCompare(b.name))
        case 'name-z-a':
          return products.sort((a, b) => b.name.localeCompare(a.name))
        default:
          return products
      }
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedProducts.slice(start, end)
    }
  },
  methods: {
    addToCart(product) {
      if (!product) {
        this.$bvToast.toast('Product not found. Please try again.', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
        return
      }
      
      this.$store.dispatch('addToCart', { product, quantity: 1 })
      this.$bvToast.toast(`${product.name} added to cart!`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    },
    applyPriceFilter() {
      this.appliedMinPrice = this.minPrice === '' ? 0 : Number(this.minPrice)
      this.appliedMaxPrice = this.maxPrice === '' ? Infinity : Number(this.maxPrice)
    }
  }
}
</script>

<style scoped>
.price-slider .custom-range::-webkit-slider-thumb {
  background: var(--pink-primary);
}

.product-filter-section {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.product-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-img-container {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.product-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  transition: transform 0.5s;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.product-badge.new {
  background-color: #f06292;
  color: white;
}

.product-badge.discount {
  background-color: #ff5722;
  color: white;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-weight: bold;
  color: #f06292;
}

.product-original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

/* Filter styles */
.category-filter label {
  font-weight: normal;
  cursor: pointer;
}

.price-filter .form-control {
  border-color: #ced4da;
}

.price-filter .form-control:focus {
  border-color: #f06292;
  box-shadow: 0 0 0 0.2rem rgba(240, 98, 146, 0.25);
}
</style>
