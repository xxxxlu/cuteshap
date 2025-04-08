import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    currency: 'Rs.'
  },
  getters: {
    products: state => state.products,
    cart: state => state.cart,
    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartItemCount(state) {
      return state.cart.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    },
    // 获取所有产品类别
    productCategories(state) {
      const categories = new Set(state.products.map(product => product.category))
      return Array.from(categories)
    },
    // 按类别获取产品
    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category === category)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, { product, quantity }) {
      const existingProduct = state.cart.find(item => item.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity
        })
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
    initializeProducts({ commit }) {
      // In a real app, we would fetch from an API
      const products = [
        {
          id: 1,
          name: "Gabrini Single Highlighter - 05",
          price: 1895,
          originalPrice: 1990,
          description: "You can easily apply it to the area you want to brighten on your face with the help of an applicator and can use it easily thanks to its light structure and permanent feature.",
          category: "Makeup",
          image: "https://ext.same-assets.com/536794071/1615239722.jpeg",
          stock: 15
        },
        {
          id: 2,
          name: "Medicube Collagen Lifting Mask - 27g",
          price: 2500,
          originalPrice: 2700,
          description: "A hydrating sheet mask that boosts skin elasticity using hydrolyzed collagen and eight types of hyaluronic acid. It helps smooth fine lines, restore firmness, and enhance skin glow.",
          category: "Skincare",
          image: "https://ext.same-assets.com/4030201472/2163625982.jpeg",
          stock: 12
        },
        {
          id: 3,
          name: "Makeup Revolution Beam Bright Highlighter",
          price: 3699,
          originalPrice: 3899,
          description: "A versatile highlighter available in multiple shades that adds a luminous glow to the high points of your face for a radiant look.",
          category: "Makeup",
          image: "https://ext.same-assets.com/1889846748/3345868383.jpeg",
          stock: 8
        },
        {
          id: 4,
          name: "Makeup Obsession Palette Medium Basic Black Obsession",
          price: 1360,
          originalPrice: 1490,
          description: "A compact makeup palette with a selection of essential eyeshadow shades in a sleek black case, perfect for creating everyday looks.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/1224346584.jpeg",
          stock: 20
        },
        {
          id: 5,
          name: "Makeup Revolution Colour Play Contour Trio Palette Baked Sugar",
          price: 1799,
          originalPrice: 1950,
          description: "This trio palette features perfectly coordinated contour, blush, and highlight shades for sculpting and defining your face.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/786025551.jpeg",
          stock: 10
        },
        {
          id: 6,
          name: "Makeup Revolution Ultra Pro Glow",
          price: 4680,
          originalPrice: 4999,
          description: "An illuminating palette featuring multiple highlight shades to create the perfect glow for any skin tone.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/3352870667.jpeg",
          stock: 7
        },
        {
          id: 7,
          name: "Lamel Prep Grip Jelly Plumping Serum Primer",
          price: 2399,
          originalPrice: 2599,
          description: "A dual-action primer that hydrates the skin while creating the perfect base for makeup application with a plumping effect.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/1721694854.png",
          stock: 14
        },
        {
          id: 8,
          name: "Medicube Collagen Night Wrapping Mask - 75ml",
          price: 7500,
          originalPrice: 7900,
          description: "An overnight mask formulated with collagen that works while you sleep to hydrate, firm, and restore elasticity to the skin.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/3845595865.jpeg",
          stock: 5
        },
        {
          id: 9,
          name: "Gabrini HD Matte Foundation - 04",
          price: 2895,
          originalPrice: 3100,
          description: "A full-coverage, long-lasting matte foundation that blends seamlessly for a flawless, natural-looking finish.",
          category: "Makeup",
          image: "https://ext.same-assets.com/536794071/214815971.jpeg",
          stock: 18
        },
        {
          id: 10,
          name: "Gabrini Ultra Waterproof Pencil - 03",
          price: 695,
          originalPrice: 795,
          description: "A smudge-proof, long-wearing eyeliner pencil that delivers intense color and stays put throughout the day.",
          category: "Makeup",
          image: "https://m.media-amazon.com/images/I/61t4jrIjciL._AC_UL640_FMwebp_QL65_.jpg",
          stock: 25
        },
        {
          id: 11,
          name: "Medicube Deep Vita C Capsule Cream - 55g",
          price: 6990,
          originalPrice: 8800,
          description: "A vitamin C enriched cream that brightens skin tone, fades hyperpigmentation, and provides antioxidant protection against environmental damage.",
          category: "Skincare",
          image: "https://ext.same-assets.com/1889846748/341596530.jpeg",
          stock: 9
        },
        {
          id: 12,
          name: "Essence Juicy Glow Lip Mask",
          price: 1350,
          originalPrice: 1499,
          description: "A nourishing lip mask that provides intense hydration and a subtle tint for softer, smoother lips with a natural glow.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/2454781989.png",
          stock: 22
        },
        {
          id: 13,
          name: "Makeup Obsession Palette Large Luxe Total - White Obsession",
          price: 1830,
          originalPrice: 1999,
          description: "A versatile makeup palette with a range of neutral and shimmer eyeshadows in a sleek white case for creating various looks.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/3652549439.jpeg",
          stock: 11
        },
        {
          id: 14,
          name: "Makeup Obsession Palette Medium Luxe - Gold Obsession",
          price: 1660,
          originalPrice: 1799,
          description: "A luxurious palette with gold-toned eyeshadows ranging from subtle shimmers to bold metallics for creating elegant eye looks.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/3232753478.jpeg",
          stock: 13
        },
        {
          id: 15,
          name: "Makeup Obsession Palette Medium Luxe - Matte Obsession",
          price: 1660,
          originalPrice: 1799,
          description: "A collection of matte eyeshadows perfect for creating depth and dimension in everyday makeup looks.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2225149198/4096499196.jpeg",
          stock: 17
        },
        {
          id: 16,
          name: "L'Oreal Paris Skin Paradise Water-Infused Tinted Moisturizer",
          price: 3200,
          originalPrice: 3499,
          description: "A lightweight tinted moisturizer that provides sheer coverage while hydrating the skin for a fresh, dewy finish.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/2708331341.jpeg",
          stock: 8
        },
        {
          id: 17,
          name: "L'Oreal Paris Crystal Lip Gloss Dazzle Glow",
          price: 2699,
          originalPrice: 2899,
          description: "A high-shine lip gloss that adds dimension and a crystal-like sparkle to the lips without feeling sticky.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/1721694854.png",
          stock: 16
        },
        {
          id: 18,
          name: "Olay Red Super Serum X Niacinamide",
          price: 4900,
          originalPrice: 5100,
          description: "A powerful serum with niacinamide that targets dark spots, uneven skin tone, and improves overall skin texture for a brighter complexion.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/2183728205.jpeg",
          stock: 7
        },
        {
          id: 19,
          name: "Olay White Radiance Brightening Cream",
          price: 3850,
          originalPrice: 4050,
          description: "A skin-brightening moisturizer that helps reduce the appearance of dark spots and dullness for a more radiant complexion.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/1729437198.jpeg",
          stock: 9
        },
        {
          id: 20,
          name: "Hada Labo Hyaluronic Acid Solution Plus",
          price: 2990,
          originalPrice: 3200,
          description: "A hydrating toner formulated with multiple types of hyaluronic acid to deeply moisturize and plump the skin.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/822786952.jpeg",
          stock: 15
        },
        {
          id: 21,
          name: "Essence Apricot Oil Cuticle Nourishing Cream",
          price: 1099,
          originalPrice: 1299,
          description: "A nourishing cream enriched with apricot oil to moisturize and soften dry cuticles for healthier-looking nails.",
          category: "Nails",
          image: "https://ext.same-assets.com/1889846748/3115792126.jpeg",
          stock: 20
        },
        {
          id: 22,
          name: "E.L.F. Lip Exfoliator - Mint Mango",
          price: 1495,
          originalPrice: 1650,
          description: "A lip scrub that gently removes dry, flaky skin while conditioning the lips with a refreshing mint mango flavor.",
          category: "Skincare",
          image: "https://ext.same-assets.com/1889846748/181967884.jpeg",
          stock: 18
        },
        {
          id: 23,
          name: "Essence 24H Multi Blush Fresh Peach",
          price: 1250,
          originalPrice: 1399,
          description: "A long-lasting cream blush that applies smoothly and blends easily for a natural-looking flush of color.",
          category: "Makeup",
          image: "https://ext.same-assets.com/1889846748/3050631754.jpeg",
          stock: 14
        },
        {
          id: 24,
          name: "The Ordinary Buffet + Caffeine Solution Duo Pack",
          price: 6500,
          originalPrice: 6900,
          description: "A powerful duo featuring peptide complex serum and caffeine solution to target multiple signs of aging and reduce puffiness around the eyes.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/2183728205.jpeg",
          stock: 6
        },
        {
          id: 25,
          name: "Summer Friday Jet Lag Mask + Night Mouse - Duo",
          price: 5900,
          originalPrice: 6200,
          description: "A hydrating treatment set with a multi-tasking mask that soothes and brightens tired skin and a nourishing night mousse.",
          category: "Skincare",
          image: "https://ext.same-assets.com/4030201472/3236842524.jpeg",
          stock: 8
        },
        {
          id: 26,
          name: "Essence Coconut Milk Cleansing Water",
          price: 1350,
          originalPrice: 1500,
          description: "A gentle micellar water infused with coconut milk that removes makeup and impurities while maintaining skin's natural moisture balance.",
          category: "Skincare",
          image: "https://ext.same-assets.com/2187516946/3845595865.jpeg",
          stock: 19
        },
        {
          id: 27,
          name: "Lamel Baby Lip Blush Lip Oil",
          price: 1899,
          originalPrice: 2050,
          description: "A nourishing lip oil that provides a subtle tint of color while hydrating and smoothing the lips.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/961590463.png",
          stock: 21
        },
        {
          id: 28,
          name: "Essence Melting Gel Blush Fresh Tangerine",
          price: 1150,
          originalPrice: 1299,
          description: "A lightweight gel blush that melts into the skin for a natural, dewy flush of color with a fresh tangerine tint.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/742981158.png",
          stock: 17
        },
        {
          id: 29,
          name: "Gabrini Highlighter - 01",
          price: 1895,
          originalPrice: 1999,
          description: "A luminous highlighter that adds a radiant glow to the face, creating dimension and a healthy-looking complexion.",
          category: "Makeup",
          image: "https://ext.same-assets.com/536794071/758197420.jpeg",
          stock: 12
        },
        {
          id: 30,
          name: "Essence Baby Got Blush - Made With Love",
          price: 1199,
          originalPrice: 1349,
          description: "A finely-milled powder blush that delivers a soft wash of color for a natural-looking flush with a matte finish.",
          category: "Makeup",
          image: "https://ext.same-assets.com/2187516946/1721694854.png",
          stock: 15
        }
      ]

      // Add more products to make 35 total

      commit('setProducts', products)
    },
    addToCart({ commit }, payload) {
      // 确保payload和product对象都存在且有效
      if (!payload || !payload.product || typeof payload.product !== 'object') {
        console.error('Invalid product data provided to addToCart action:', payload)
        return
      }
      
      const { product, quantity = 1 } = payload
      
      // 确保产品有id字段
      if (!product.id) {
        console.error('Product does not have an id:', product)
        return
      }
      
      commit('addToCart', { product, quantity })
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('updateCartItemQuantity', { productId, quantity })
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
})
