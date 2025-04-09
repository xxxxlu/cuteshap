<template>
  <div class="success-page">
    <b-container>
      <div class="text-center py-5">
        <div class="success-icon mb-4">
          <b-icon icon="check-circle-fill" font-scale="5" variant="success" />
        </div>
        <h1 class="page-title">Order Successful!</h1>
        <div class="success-message my-4">
          <p>Thank you for shopping with CuteShop. Your order has been placed successfully.</p>
          <p>Order confirmation has been sent to your email address.</p>
        </div>
        
        <div class="order-details p-4 my-5 mx-auto">
          <h4 class="mb-3">Order Details</h4>
          <div class="detail-row">
            <span class="detail-label">Order ID:</span>
            <span class="detail-value">CS-{{ generateOrderId() }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Order Date:</span>
            <span class="detail-value">{{ formatDate(new Date()) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Payment Method:</span>
            <span class="detail-value">Online Payment</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Shipping Method:</span>
            <span class="detail-value">Standard Delivery (3-5 days)</span>
          </div>
        </div>
        
        <div class="my-4">
          <b-button variant="custom-pink" to="/" class="mx-2">
            Continue Shopping
          </b-button>
          <b-button variant="outline-custom-pink" to="/account/orders" class="mx-2">
            View Orders
          </b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'SuccessView',
  methods: {
    generateOrderId() {
      // Generate a random order ID for demonstration
      return Math.floor(100000 + Math.random() * 900000);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  }
}
</script>

<style scoped>
.success-page {
  padding: 2rem 0;
  background-color: var(--background-light);
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.page-title {
  color: var(--pink-dark);
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.page-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--pink-primary);
}

.success-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(252, 228, 236, 0.6);
  color: var(--pink-primary);
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.order-details {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--pink-light);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: var(--text-secondary);
}

.detail-value {
  color: var(--text-primary);
}

h4 {
  color: var(--pink-dark);
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

.btn-custom-pink {
  background-color: var(--pink-primary);
  border-color: var(--pink-primary);
  color: white;
  transition: all 0.3s ease;
  padding: 0.5rem 1.5rem;
}

.btn-custom-pink:hover {
  background-color: var(--pink-dark);
  border-color: var(--pink-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
}

.btn-outline-custom-pink {
  color: var(--pink-primary);
  border-color: var(--pink-primary);
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
}

.btn-outline-custom-pink:hover {
  background-color: var(--pink-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
}
</style>
