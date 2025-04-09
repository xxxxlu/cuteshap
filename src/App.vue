<template>
  <div id="app">
    <header class="main-header">
      <b-navbar toggleable="lg" type="dark" variant="custom-pink">
        <b-container>
          <b-navbar-brand to="/">
            <img src="./assets/cuteshap-new.svg" alt="" style="width: 50px; height: 50px">
            CuteShop
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse" />

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/" exact>Home</b-nav-item>
              <b-nav-item to="/products">Products</b-nav-item>
              <b-nav-item to="/contact">Contact Us</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/favorites" class="mr-2">
                <b-icon icon="heart" font-scale="1.2" />
                <span class="ml-1">Wishlist</span>
              </b-nav-item>
              <b-nav-item to="/cart">
                <b-icon icon="bag" font-scale="1.2" />
                <span v-if="cartCount" class="cart-count">{{ cartCount }}</span>
                <span class="ml-1">Cart</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="bg-custom-pink text-white py-4 mt-5">
      <b-container>
        <b-row>
          <b-col md="4">
            <h5 class="footer-heading">Stay in Touch</h5>
            <p>Follow us on social media for beauty tips and promotions</p>
            <div class="social-links">
              <a href="#" class="text-white mr-3"><b-icon icon="facebook" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="twitter" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="instagram" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="tiktok" /></a>
            </div>
          </b-col>
          <b-col md="4">
            <h5 class="footer-heading">Quick Links</h5>
            <ul class="list-unstyled footer-links">
              <li><router-link to="/" class="text-white">Home</router-link></li>
              <li><router-link to="/products" class="text-white">All Products</router-link></li>
              <li><router-link to="/contact" class="text-white">Contact Us</router-link></li>
            </ul>
          </b-col>
          <b-col md="4">
            <h5 class="footer-heading">Contact Us</h5>
            <p><b-icon icon="envelope" /> cuteshop@cuteshop.club</p>
          </b-col>
        </b-row>
        <hr class="bg-white mt-4">
        <div class="text-center">
          <p>&copy; Copyright © 2025 | Powered by Data Network Solutions (SMC-Private) Limited</p>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartItemCount']),
    cartCount() {
      return this.cartItemCount
    }
  },
  created() {
    this.$store.dispatch('initializeProducts')
  }
}
</script>

<style>
:root {
  --pink-primary: #ff5e94;
  --pink-secondary: #ffb6c1;
  --pink-dark: #e91e63;
  --pink-light: #fce4ec;
  --text-primary: #333333;
  --text-secondary: #666666;
  --background-light: #fafafa;
}

.main-header {
  margin-bottom: 0;
}

.bg-custom-pink {
  background-color: var(--pink-primary) !important;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.btn-custom-pink {
  background-color: var(--pink-primary);
  border-color: var(--pink-primary);
  color: white;
}

.btn-custom-pink:hover {
  background-color: var(--pink-dark);
  border-color: var(--pink-dark);
}

.btn-outline-custom-pink {
  color: var(--pink-primary);
  border-color: var(--pink-primary);
}

.btn-outline-custom-pink:hover {
  background-color: var(--pink-primary);
  color: white;
}

.text-custom-pink {
  color: var(--pink-primary) !important;
}

.cart-count {
  display: inline-block;
  background-color: #fff;
  color: var(--pink-primary);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  margin-left: 5px;
}

footer {
  margin-top: 50px;
}

.footer-heading {
  font-weight: 600;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
}

.footer-heading:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: white;
}

.footer-links li {
  margin-bottom: 8px;
}

.social-links a {
  font-size: 1.5em;
  transition: all 0.3s;
  margin-right: 15px;
}

.social-links a:hover {
  opacity: 0.8;
  transform: translateY(-3px);
}

a.router-link-active {
  font-weight: bold;
}
</style>
