<template>
    <div v-if="product">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <img :src="product.image" alt="Product" />
          </v-col>
          <v-col cols="12" md="6">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
            <v-btn @click="addToCart(product)" color="primary">
              Add to Cart
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      Loading...
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: null
      };
    },
    methods: {
      addToCart(product) {
        this.$store.commit('addToCart', product);
        this.$router.push('/cart');
      },
      async fetchProduct() {
        try {
          const productId = this.$route.params.id;
          const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    },
    created() {
      this.fetchProduct();
    }
  };
  </script>