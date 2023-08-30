<template>
  <div>
    <div class="container">
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4 mb-3"
        >
          <div class="card h-100">
            <img
              :src="product.image"
              alt="Product"
              class="card-img-top"
              height="150"
              loading="lazy"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${{ product.price }}</h6>
              <div class="text-center mb-3">
                <router-link
                  :to="{ name: 'product-details', params: { id: product.id } }"
                  class="btn btn-primary btn-sm w-100"
                >
                  View Details
                </router-link>
              </div>
              <button
                @click="addToCart(product)"
                class="btn btn-primary btn-block w-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductList',
    data() {
      return {
        products: []
      };
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      addToCart(product) {
        this.$store.commit('addToCart', product);
        this.$router.push('/cart');
      }
    },
    created() {
      this.fetchProducts();
    }
  };
  </script>