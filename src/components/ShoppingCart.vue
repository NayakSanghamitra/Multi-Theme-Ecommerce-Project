<template>
  <div class="shopping-cart">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Shopping Cart</h2>
          <ul class="list-group">
            <li
              v-for="item in cart"
              :key="item.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img :src="item.image" alt="Product" class="img-fluid product-image mr-3" />
                <div>
                  <h5 class="mb-1">{{ item.title }}</h5>
                  <p class="mb-0">Price: ${{ item.price }}</p>
                </div>
              </div>
              <button
                @click="removeFromCart(item.id)"
                class="btn btn-sm btn-danger"
              >
                Remove
              </button>
            </li>
          </ul>
          <p class="mt-4">Total: ${{ cartTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
  methods: {
    removeFromCart(productId) {
      this.$store.commit('removeFromCart', productId);
    },
  },
};
</script>

<style scoped>
.product-image {
  max-width: 80px;
}
</style>