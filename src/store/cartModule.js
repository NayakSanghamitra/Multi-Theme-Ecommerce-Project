const cartModule = {
    state: {
      items: []
    },
    mutations: {
      addToCart(state, product) {
        state.items.push(product);
      },
      removeFromCart(state, productId) {
        state.items = state.items.filter(item => item.id !== productId);
      }
    },
    getters: {
      cartTotal(state) {
        return state.items.reduce((total, item) => total + item.price, 0);
      }
    }
  };
  
  export default cartModule;