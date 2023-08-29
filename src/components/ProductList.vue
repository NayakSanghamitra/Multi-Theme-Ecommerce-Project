<template>
    <div>
      <v-container>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            md="4"
          >
            <v-card class="mb-3">
              <img
                :src="product.image"
                alt="Product"
                height="200"
              />
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-subtitle>${{ product.price }}</v-card-subtitle>
              <v-card-actions>
                <router-link
                  :to="{ name: 'product-details', params: { id: product.id } }"
                >
                  Details
                </router-link>
                <v-btn @click="addToCart(product)" color="primary">
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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