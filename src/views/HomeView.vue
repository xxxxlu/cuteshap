<template>
  <div class="home">
    <!-- Hero Carousel Section -->
    <b-carousel
      id="hero-carousel"
      indicators
      controls
      background="#fce4ec"
      img-width="1920"
      img-height="450"
      style="text-shadow: 1px 1px 2px #333;"
      interval="5000"
      class="full-width-carousel"
    >
      <b-carousel-slide
        caption="Welcome to CuteShop"
        text="Your One-Stop Destination for Premium Beauty Products"
        img-src="https://www.shopaholic.com.pk/cdn/shop/files/Fold_2_8c23f33d-f654-484d-9b66-aa36e7402166.jpg?v=1741933710&width=1000"
      >
        <b-button variant="custom-pink" to="/products" class="mt-3 px-4 py-2 btn-lg">Shop Now</b-button>
      </b-carousel-slide>
      
      <b-carousel-slide
        caption="New Arrivals"
        text="Discover Our Latest Beauty Collections"
        img-src="https://www.shopaholic.com.pk/cdn/shop/files/Fold_4_d495171b-faa4-4128-861c-b7b2372203d0.jpg?v=1741933739&width=800"
      >
        <b-button variant="custom-pink" to="/products" class="mt-3 px-4 py-2 btn-lg">Explore</b-button>
      </b-carousel-slide>
    </b-carousel>

    <b-container class="mt-5">

      <!-- Featured Categories -->
      <h2 class="section-title product-section-title">Shop By Category</h2>
      <b-row class="mb-5">
        <b-col md="3" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="brush" font-scale="3" variant="custom-pink" />
            </div>
            <h4>Makeup</h4>
            <p>Discover our premium collection of foundations, lipsticks, and more!</p>
            <b-button variant="outline-custom-pink" class="mt-3">View All</b-button>
          </b-card>
        </b-col>
        <b-col md="3" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="water" font-scale="3" variant="custom-pink" />
            </div>
            <h4>Skincare</h4>
            <p>Luxurious creams, serums and masks for beautiful skin!</p>
            <b-button variant="outline-custom-pink" class="mt-3">View All</b-button>
          </b-card>
        </b-col>
        <b-col md="3" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="flower1" font-scale="3" variant="custom-pink" />
            </div>
            <h4>Fragrances</h4>
            <p>Captivating scents from top quality brands!</p>
            <b-button variant="outline-custom-pink" class="mt-3">View All</b-button>
          </b-card>
        </b-col>
        <b-col md="3" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="droplet-half" font-scale="3" variant="custom-pink" />
            </div>
            <h4>Hair Care</h4>
            <p>Premium shampoos, treatments and styling products for gorgeous hair!</p>
            <b-button variant="outline-custom-pink" class="mt-3">View All</b-button>
          </b-card>
        </b-col>
      </b-row>

      <!-- New Arrivals -->
      <div class="section-header d-flex justify-content-between align-items-center mb-4">
        <h2 class="section-title product-section-title mb-0">New Arrivals</h2>
        <b-button variant="outline-custom-pink" to="/products">View All</b-button>
      </div>
      <b-row>
        <b-col v-for="product in featuredProducts" :key="product.id" lg="3" md="4" sm="6" class="mb-4">
          <b-card
            no-body
            class="product-card h-100 overflow-hidden border-0 shadow-sm"
          >
            <div class="product-img-container">
              <router-link :to="'/product/' + product.id">
                <b-img :src="product.image" :alt="product.name" fluid class="product-img" />
              </router-link>
              <div class="product-badges" v-if="product.isNew">
                <span class="badge badge-new">New</span>
              </div>
              <div class="product-actions">
                <b-button variant="light" class="rounded-circle p-2 mr-2" title="Add to Wishlist">
                  <b-icon icon="heart" variant="custom-pink" />
                </b-button>
                <b-button variant="light" class="rounded-circle p-2" title="Quick View">
                  <b-icon icon="eye" variant="custom-pink" />
                </b-button>
              </div>
            </div>
            <div class="p-3">
              <router-link :to="'/product/' + product.id" class="text-dark">
                <h5 class="product-title">{{ product.name }}</h5>
              </router-link>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <span class="price text-custom-pink font-weight-bold">{{ currency }}{{ product.price.toLocaleString() }}</span>
                  <span v-if="product.originalPrice > product.price" class="original-price ml-2">
                    {{ currency }}{{ product.originalPrice.toLocaleString() }}
                  </span>
                </div>
                <div class="product-rating mt-1">
                  <b-icon icon="star-fill" variant="warning" v-for="n in Math.floor(product.rating)" :key="'star-'+n" />
                  <b-icon icon="star-half" variant="warning" v-if="product.rating % 1 >= 0.5" />
                  <b-icon icon="star" variant="warning" v-for="n in (5 - Math.ceil(product.rating))" :key="'empty-'+n" />
                  <small class="text-muted ml-1">({{ product.reviews }})</small>
                </div>
              </div>
              <b-button variant="custom-pink" block @click="addToCart(product)">Add to Cart</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>


      <!-- Shop by Category Section -->
      <div v-for="category in categories" :key="category" class="my-5">
        <h2 class="section-title product-section-title mb-4">{{ category }} Collection</h2>
        <b-row>
          <b-col v-for="product in getProductsByCategory(category)" :key="product.id" cols="6" md="3" class="mb-4">
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
                <div class="d-flex justify-content-between">
                  <b-button variant="outline-secondary" size="sm"><i class="fas fa-eye" /> View</b-button>
                  <b-button variant="custom-pink" size="sm" @click="addToCart(product)"><i class="fas fa-cart-plus" /> Add</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <div class="text-center mt-3">
          <b-button variant="outline-custom-pink" class="px-4">View All {{ category }} Products</b-button>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section py-4 my-5 bg-light">
        <b-row class="text-center">
          <b-col md="3" sm="6" class="mb-4 mb-md-0">
            <div class="feature-item">
              <b-icon icon="truck" font-scale="2" variant="custom-pink" class="mb-3" />
              <h5>Free Shipping</h5>
              <p class="text-muted small">On orders over ₨3,000</p>
            </div>
          </b-col>
          <b-col md="3" sm="6" class="mb-4 mb-md-0">
            <div class="feature-item">
              <b-icon icon="arrow-repeat" font-scale="2" variant="custom-pink" class="mb-3" />
              <h5>Easy Returns</h5>
              <p class="text-muted small">30 day money back guarantee</p>
            </div>
          </b-col>
          <b-col md="3" sm="6" class="mb-4 mb-md-0">
            <div class="feature-item">
              <b-icon icon="shield-check" font-scale="2" variant="custom-pink" class="mb-3" />
              <h5>100% Authentic</h5>
              <p class="text-muted small">Genuine products guaranteed</p>
            </div>
          </b-col>
          <b-col md="3" sm="6">
            <div class="feature-item">
              <b-icon icon="headset" font-scale="2" variant="custom-pink" class="mb-3" />
              <h5>24/7 Support</h5>
              <p class="text-muted small">Dedicated customer service</p>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- Beauty Blog -->
      <div class="section-header d-flex justify-content-between align-items-center mb-4">
        <h2 class="section-title mb-0">Beauty Tips & News</h2>
        <b-button variant="outline-custom-pink" to="/blog">View All</b-button>
      </div>
      <b-row>
        <b-col md="4" class="mb-4">
          <b-card class="blog-post h-100 border-0 shadow-sm">
            <b-img src="https://www.shopaholic.com.pk/cdn/shop/files/4_1_ab0ab5da-4c5e-4b37-bea1-de35c9afec35.jpg?v=1741933810&width=1000" class="blog-img mb-3" />
            <div class="p-3">
              <div class="blog-date text-muted small mb-2">April 5, 2025</div>
              <h5>Summer Makeup Trends 2025</h5>
              <p class="blog-excerpt">Discover the hottest makeup trends for this summer, from glowing skin to bold lips...</p>
              <b-button variant="link" class="text-custom-pink p-0">Read More</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="blog-post h-100 border-0 shadow-sm">
            <b-img src="https://www.shopaholic.com.pk/cdn/shop/files/Sensative_Skin.webp?crop=center&height=1050&v=1737713216&width=700" class="blog-img mb-3" />
            <div class="p-3">
              <div class="blog-date text-muted small mb-2">April 2, 2025</div>
              <h5>Skincare Routine for Sensitive Skin</h5>
              <p class="blog-excerpt">Learn how to care for sensitive skin with these gentle but effective skincare tips...</p>
              <b-button variant="link" class="text-custom-pink p-0">Read More</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="blog-post h-100 border-0 shadow-sm">
            <b-img src="https://images.unsplash.com/photo-1599309329365-0a9ed45a1da3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" class="blog-img mb-3" />
            <div class="p-3">
              <div class="blog-date text-muted small mb-2">March 28, 2025</div>
              <h5>Halal Beauty Products Guide</h5>
              <p class="blog-excerpt">A comprehensive guide to halal beauty products available in Pakistan...</p>
              <b-button variant="link" class="text-custom-pink p-0">Read More</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Testimonials -->
      <h2 class="section-title mt-5 mb-4">What Our Customers Say</h2>
      <b-carousel
        id="testimonial-carousel"
        controls
        indicators
        background="#fce4ec"
        class="testimonial-carousel mb-5"
      >
        <b-carousel-slide>
          <b-row>
            <b-col md="4" class="mb-4 mb-md-0">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 5" :key="n" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"The makeup products are absolutely fantastic! The quality is top-notch and they last all day. Very happy with my purchase!"</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/women/11.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Ayesha Khan</strong><br>
                      <small>Lahore</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
            <b-col md="4" class="mb-4 mb-md-0">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 5" :key="'b'+n" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"Fast delivery and beautiful packaging! The skincare products have transformed my skin in just a few weeks. Will definitely order again!"</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/women/22.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Fatima Ahmed</strong><br>
                      <small>Karachi</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
            <b-col md="4">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 4" :key="'c'+n" />
                  <b-icon icon="star" variant="warning" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"The fragrances are exquisite and long-lasting. I've received so many compliments. The customer service was excellent too!"</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/men/32.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Ali Raza</strong><br>
                      <small>Islamabad</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
          </b-row>
        </b-carousel-slide>
        <b-carousel-slide>
          <b-row>
            <b-col md="4" class="mb-4 mb-md-0">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 5" :key="'d'+n" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"I'm in love with their natural hair care products! My hair feels so much healthier now. The prices are also very reasonable."</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/women/48.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Sarah Mehmood</strong><br>
                      <small>Peshawar</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
            <b-col md="4" class="mb-4 mb-md-0">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 4" :key="'e'+n" />
                  <b-icon icon="star" variant="warning" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"The online shopping experience was smooth and hassle-free. The products arrived well-packaged and exactly as described."</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/women/67.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Hina Tariq</strong><br>
                      <small>Faisalabad</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
            <b-col md="4">
              <b-card class="h-100 border-0 shadow-sm testimonial-card">
                <div class="testimonial-rating mb-2">
                  <b-icon icon="star-fill" variant="warning" v-for="n in 5" :key="'f'+n" />
                </div>
                <blockquote class="blockquote mb-0">
                  <p>"Their makeup brushes are of exceptional quality. Super soft and they don't shed at all. Will definitely recommend to friends!"</p>
                  <footer class="blockquote-footer d-flex align-items-center">
                    <b-img src="https://randomuser.me/api/portraits/women/33.jpg" class="rounded-circle mr-2" width="40" height="40" />
                    <div>
                      <strong>Amna Khalid</strong><br>
                      <small>Multan</small>
                    </div>
                  </footer>
                </blockquote>
              </b-card>
            </b-col>
          </b-row>
        </b-carousel-slide>
      </b-carousel>

      <!-- Newsletter -->
      <div class="newsletter-section my-5 p-5 text-center bg-light rounded">
        <h2 class="mb-3">Subscribe to Our Newsletter</h2>
        <p class="mb-4">Stay updated with our latest products, beauty tips, and exclusive offers!</p>
        <b-form inline class="justify-content-center">
          <b-form-input placeholder="Your Email Address" class="mr-2 mb-2 mb-md-0" style="min-width: 300px;" />
          <b-button variant="custom-pink">Subscribe</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {
      featuredProducts: [
        {
          id: 1,
          name: 'Luxury Foundation',
          price: 2500,
          originalPrice: 3000,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          reviews: 45,
          isNew: true
        },
        {
          id: 2,
          name: 'Matte Lipstick Collection',
          price: 1200,
          originalPrice: 1500,
          image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          reviews: 32,
          isNew: true
        },
        {
          id: 3,
          name: 'Premium Eyeshadow Palette',
          price: 3500,
          originalPrice: 4000,
          image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          reviews: 67,
          isNew: true
        },
        {
          id: 4,
          name: 'Volumizing Mascara',
          price: 1800,
          originalPrice: 1800,
          image: 'https://m.media-amazon.com/images/I/61t4jrIjciL._AC_UL640_FMwebp_QL65_.jpg',
          rating: 4.3,
          reviews: 28,
          isNew: true
        }
      ],
      bestSellers: [
        {
          id: 5,
          name: 'Hydrating Moisturizer',
          price: 2000,
          originalPrice: 2500,
          image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a8e9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          reviews: 112,
          discount: 20
        },
        {
          id: 6,
          name: 'Gentle Facial Cleanser',
          price: 1500,
          originalPrice: 1800,
          image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.5,
          reviews: 87,
          discount: 15
        },
        {
          id: 7,
          name: 'Rose Perfume',
          price: 4000,
          originalPrice: 5000,
          image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          reviews: 56,
          discount: 20
        },
        {
          id: 8,
          name: 'Hair Treatment Oil',
          price: 1700,
          originalPrice: 2000,
          image: 'https://images.unsplash.com/photo-1596462118800-ab7c546c946d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          reviews: 43,
          discount: 15
        }
      ]
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products'])
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', { product, quantity: 1 })
      this.$bvToast.toast(`${product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
/* Hero carousel styling */
.full-width-carousel {
  width: 100%;
  margin: 0;
  overflow: hidden;
}

#hero-carousel .carousel-caption {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  margin: 0 auto;
}

#hero-carousel h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

#hero-carousel .carousel-item img {
  object-fit: cover;
  height: 450px;
  width: 100%;
}

/* Section titles */
.section-title {
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--pink-primary);
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

/* Featured categories */
.category-card {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.feature-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Product cards */
.product-card {
  transition: all 0.3s ease;
  border-radius: 10px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.product-img-container {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-color: #f8f9fa;
}

.product-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.badge-new {
  background-color: var(--pink-primary);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
}

.badge-sale {
  background-color: #e91e63;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
}

.product-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.product-card:hover .product-actions {
  opacity: 1;
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

.price {
  font-size: 1.1rem;
}

.original-price {
  text-decoration: line-through;
  color: #6c757d;
  font-size: 0.9rem;
}

/* Feature items */
.feature-item {
  padding: 15px;
}

/* Blog posts */
.blog-post {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.blog-img {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.blog-excerpt {
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Testimonials */
.testimonial-carousel {
  border-radius: 10px;
  overflow: hidden;
}

.testimonial-card {
  padding: 20px;
  height: 100%;
}

.testimonial-rating {
  font-size: 14px;
}

/* Newsletter */
.newsletter-section {
  background-color: #fce4ec;
  border-radius: 10px;
}
</style>
