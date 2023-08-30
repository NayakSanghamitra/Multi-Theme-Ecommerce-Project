<template>
  <div class="product-details">
    <div v-if="product">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <img :src="product.image" alt="Product" class="img-fluid product-image" />
          </div>
          <div class="col-md-6">
            <h2 class="mb-3">{{ product.title }}</h2>
            <p class="mb-3">{{ product.description }}</p>
            <p class="mb-3">Price: ${{ product.price }}</p>
            <button @click="addToCart(product)" class="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
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

<style scoped>
.product-details {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.product-image {
  max-height: 400px;
  object-fit: contain;
}
</style>