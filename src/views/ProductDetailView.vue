<template>
  <div class="product-detail">
    <b-container v-if="product">
      <b-breadcrumb>
        <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
        <b-breadcrumb-item to="/products">Products</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ product.name }}</b-breadcrumb-item>
      </b-breadcrumb>

      <b-row>
        <b-col md="5">
          <b-img :src="product.image" :alt="product.name" fluid class="mb-3 product-detail-img" />
        </b-col>
        <b-col md="7">
          <h1 class="mb-3">{{ product.name }}</h1>
          <p class="mb-4">{{ product.description }}</p>

          <div class="product-price mb-4">
            <span class="price h4">{{ currency }}{{ product.price.toLocaleString() }}</span>
            <span v-if="product.originalPrice > product.price" class="original-price ml-3">
              {{ currency }}{{ product.originalPrice.toLocaleString() }}
            </span>
            <b-badge variant="success" class="ml-3" v-if="product.originalPrice > product.price">
              {{ Math.round((product.originalPrice - product.price) / product.originalPrice * 100) }}% OFF
            </b-badge>
          </div>

          <div class="mb-4">
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Availability:</strong> <span class="text-success">In Stock ({{ product.stock }} available)</span></p>
          </div>

          <div class="product-actions">
            <b-form-group label="Quantity:">
              <b-form-spinbutton v-model="quantity" min="1" :max="product.stock" class="mb-3" style="width: 150px;"/>
            </b-form-group>

            <b-button variant="custom-pink" class="mr-2" @click="addToCart" :disabled="product.stock <= 0">
              <b-icon icon="cart-plus" class="mr-1"/> Add to Cart
            </b-button>
            <b-button variant="success" to="/checkout" :disabled="product.stock <= 0">
              <b-icon icon="credit-card" class="mr-1"/> Buy Now
            </b-button>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <h3 class="section-title product-section-title">Product Details</h3>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Description" active>
                <b-card-text>
                  <p>{{ product.description }}</p>
                  <h5>Features:</h5>
                  <ul v-if="product.category === 'Makeup'">
                    <li>Long-lasting formula</li>
                    <li>Highly pigmented</li>
                    <li>Easy to apply</li>
                    <li>Smooth texture</li>
                    <li>Paraben-free</li>
                    <li>Not tested on animals</li>
                  </ul>
                  <ul v-else-if="product.category === 'Skincare'">
                    <li>Hydrating formula</li>
                    <li>Suitable for sensitive skin</li>
                    <li>Non-comedogenic</li>
                    <li>Dermatologist tested</li>
                    <li>Free from harmful chemicals</li>
                    <li>Anti-aging properties</li>
                  </ul>
                  <ul v-else>
                    <li>Premium quality</li>
                    <li>Long-lasting</li>
                    <li>Easy to use</li>
                    <li>Travel-friendly</li>
                    <li>Value for money</li>
                    <li>CuteShop brand</li>
                  </ul>
                </b-card-text>
              </b-tab>
              <b-tab title="Specifications">
                <b-card-text>
                  <b-row>
                    <b-col sm="3"><strong>Brand:</strong></b-col>
                    <b-col>{{ getBrandFromProductName(product.name) }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Product Type:</strong></b-col>
                    <b-col>{{ getProductType(product.name) }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Category:</strong></b-col>
                    <b-col>{{ product.category }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Size/Weight:</strong></b-col>
                    <b-col>{{ getProductSize(product.name) }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Made In:</strong></b-col>
                    <b-col>{{ product.name.includes('Medicube') ? 'Korea' : 'Various' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Expiry:</strong></b-col>
                    <b-col>36 months from manufacture date</b-col>
                  </b-row>
                </b-card-text>
              </b-tab>
              <b-tab title="Reviews">
                <b-card-text>
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary"/>
                      <div class="ml-3">
                        <h5 class="mb-0">Sarah Ahmad</h5>
                        <b-form-rating readonly value="5" variant="warning" class="p-0" size="sm"/>
                      </div>
                    </div>
                    <p>Love this product! The color payoff is amazing and it stays on all day. Will definitely repurchase.</p>
                  </div>
                  <hr >
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary"/>
                      <div class="ml-3">
                        <h5 class="mb-0">Aisha Khan</h5>
                        <b-form-rating readonly value="4" variant="warning" class="p-0" size="sm"/>
                      </div>
                    </div>
                    <p>Great value for money. The product is high quality and feels luxurious on the skin. Packaging is also beautiful.</p>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>

      <h3 class="section-title product-section-title mt-5">Related Products</h3>
      <b-row>
        <b-col v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" md="3" sm="6" class="mb-4">
          <b-card no-body class="product-card h-100 overflow-hidden">
            <div class="p-3">
              <router-link :to="'/product/' + relatedProduct.id">
                <b-img :src="relatedProduct.image" :alt="relatedProduct.name" fluid class="product-img"/>
              </router-link>
              <router-link :to="'/product/' + relatedProduct.id" class="text-dark">
                <h6>{{ relatedProduct.name }}</h6>
              </router-link>
              <div>
                <span class="price">{{ currency }}{{ relatedProduct.price.toLocaleString() }}</span>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <div class="text-center py-5">
        <b-spinner label="Loading..." variant="primary"/>
        <p class="mt-3">Loading product details...</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductDetailView',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products']),
    product() {
      if (!this.id || !this.products || !this.products.length) return null
      const productId = parseInt(this.id, 10)
      return this.products.find(p => p.id === productId)
    },
    relatedProducts() {
      if (!this.product) return []
      const productId = parseInt(this.id, 10)
      return this.products
        .filter(p => p.id !== productId && p.category === this.product.category)
        .slice(0, 4)
    }
  },
  methods: {
    addToCart() {
      if (!this.product) {
        this.$bvToast.toast('Product not found. Please try again.', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
        return
      }
      
      this.$store.dispatch('addToCart', { product: this.product, quantity: this.quantity })
      this.$bvToast.toast(`${this.product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    },
    getBrandFromProductName(name) {
      if (name.includes('Medicube')) return 'Medicube'
      if (name.includes('Gabrini')) return 'Gabrini'
      if (name.includes('Essence')) return 'Essence'
      if (name.includes('Makeup Revolution')) return 'Makeup Revolution'
      if (name.includes('Makeup Obsession')) return 'Makeup Obsession'
      if (name.includes('L\'Oreal')) return 'L\'Oreal Paris'
      if (name.includes('The Ordinary')) return 'The Ordinary'
      if (name.includes('Olay')) return 'Olay'
      if (name.includes('Hada Labo')) return 'Hada Labo'
      if (name.includes('E.L.F.')) return 'E.L.F.'
      if (name.includes('Lamel')) return 'Lamel'
      return name.split(' ')[0]
    },
    getProductType(name) {
      if (name.includes('Highlighter')) return 'Highlighter'
      if (name.includes('Foundation')) return 'Foundation'
      if (name.includes('Mask')) return 'Face Mask'
      if (name.includes('Palette')) return 'Makeup Palette'
      if (name.includes('Serum')) return 'Serum'
      if (name.includes('Cream')) return 'Cream'
      if (name.includes('Pencil')) return 'Eyeliner/Lipliner'
      if (name.includes('Gloss')) return 'Lip Gloss'
      if (name.includes('Blush')) return 'Blush'
      if (name.includes('Lip Oil')) return 'Lip Oil'
      return 'Beauty Product'
    },
    getProductSize(name) {
      const sizeMatch = name.match(/\d+g|\d+ml|\d+oz/)
      if (sizeMatch) return sizeMatch[0]
      return 'Standard Size'
    }
  }
}
</script>

<style scoped>
.product-detail-img {
  max-height: 400px;
  object-fit: contain;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-price {
  display: flex;
  align-items: center;
}

.original-price {
  text-decoration: line-through;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.product-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-section-title {
  color: var(--pink-dark);
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.product-section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--pink-primary);
}

.review {
  margin-bottom: 1.5rem;
  background-color: var(--background-light);
  padding: 15px;
  border-radius: 8px;
}

.breadcrumb {
  background-color: transparent;
  padding-left: 0;
  margin-bottom: 2rem;
}
</style>
