<template>
  <div class="cart-page">
    <b-container>
      <h1 class="page-title product-section-title text-center my-4">Shopping Cart</h1>

      <div v-if="cart.length > 0">
        <b-table
          striped
          hover
          responsive
          :items="cartItems"
          :fields="fields"
        >
          <template #cell(product)="data">
            <div class="d-flex align-items-center">
              <b-img :src="data.item.image" :alt="data.item.name" width="80" class="mr-3" />
              <div>
                <router-link :to="'/product/' + data.item.id" class="font-weight-bold">
                  {{ data.item.name }}
                </router-link>
              </div>
            </div>
          </template>

          <template #cell(price)="data">
            {{ currency }}{{ data.item.price.toLocaleString() }}
          </template>

          <template #cell(quantity)="data">
            <b-form-spinbutton
              v-model="data.item.quantity"
              min="1"
              :max="data.item.stock"
              @change="updateQuantity(data.item.id, data.item.quantity)"
              class="quantity-control"
            />
          </template>

          <template #cell(total)="data">
            {{ currency }}{{ (data.item.price * data.item.quantity).toLocaleString() }}
          </template>

          <template #cell(actions)="data">
            <b-button variant="outline-danger" size="sm" @click="removeFromCart(data.item.id)">
              <b-icon icon="trash" /> Remove
            </b-button>
          </template>
        </b-table>

        <div class="cart-summary mt-4">
          <b-row>
            <b-col md="6" offset-md="6">
              <b-card bg-variant="light" class="border-0 shadow-sm">
                <h4>Cart Summary</h4>
                <hr>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span class="font-weight-bold">{{ currency }}{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span class="font-weight-bold">{{ currency }}1,000</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="h5">Total:</span>
                  <span class="h5 font-weight-bold">{{ currency }}{{ (cartTotal + 1000).toLocaleString() }}</span>
                </div>
                <div class="d-grid">
                  <b-button variant="custom-pink" to="/checkout" class="btn-block">
                    Proceed to Checkout
                  </b-button>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <b-icon icon="cart-x" font-scale="5" variant="secondary" class="mb-4" />
        <h3>Your cart is empty</h3>
        <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
        <b-button variant="custom-pink" to="/" class="mt-3">
          Continue Shopping
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return {
      fields: [
        { key: 'product', label: 'Product' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'total', label: 'Total' },
        { key: 'actions', label: '' }
      ]
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['cart', 'cartTotal']),
    cartItems() {
      return this.cart.map(item => ({
        ...item,
        total: item.price * item.quantity
      }))
    }
  },
  methods: {
    updateQuantity(productId, quantity) {
      this.$store.dispatch('updateCartItemQuantity', { productId, quantity })
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId)
      this.$bvToast.toast('Product removed from cart.', {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: 2rem 0;
  background-color: var(--background-light);
}

.quantity-control {
  width: 100px;
  border-color: var(--pink-secondary);
}

.quantity-control:focus {
  border-color: var(--pink-primary);
  box-shadow: 0 0 0 0.2rem rgba(255, 94, 148, 0.25);
}

.cart-summary {
  margin-bottom: 2rem;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--pink-light);
}

.page-title {
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--pink-dark);
}

.product-section-title {
  color: var(--pink-dark);
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.product-section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--pink-primary);
}

h4 {
  color: var(--pink-dark);
  font-weight: 600;
}

table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(252, 228, 236, 0.3);
}

.table-hover tbody tr:hover {
  background-color: rgba(252, 228, 236, 0.5);
}

.btn-outline-danger {
  color: var(--pink-dark);
  border-color: var(--pink-dark);
}

.btn-outline-danger:hover {
  background-color: var(--pink-dark);
  border-color: var(--pink-dark);
  color: #fff;
}

.btn-custom-pink {
  background-color: var(--pink-primary);
  border-color: var(--pink-primary);
  color: white;
  transition: all 0.3s ease;
}

.btn-custom-pink:hover {
  background-color: var(--pink-dark);
  border-color: var(--pink-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  border-radius: 12px !important;
}

a {
  color: var(--pink-primary);
  transition: all 0.2s ease;
}

a:hover {
  color: var(--pink-dark);
  text-decoration: none;
}
</style>
