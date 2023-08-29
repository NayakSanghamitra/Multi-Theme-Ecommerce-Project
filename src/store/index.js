import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price, 0);
    }
  }
});