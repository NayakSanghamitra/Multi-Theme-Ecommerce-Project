<template>
    <div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Shopping Cart</h2>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="item in cart" :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>Price: ${{ item.price }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="removeFromCart(item.id)" color="error">
                      Remove
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <p>Total: ${{ cartTotal }}</p>
          </v-col>
        </v-row>
      </v-container>
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
      }
    },
    methods: {
      removeFromCart(productId) {
        this.$store.commit('removeFromCart', productId);
      }
    }
  };
  </script>