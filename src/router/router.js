import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../components/ProductList.vue') },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('../components/ProductDetails.vue')
    },
    { path: '/cart', component: () => import('../components/ShoppingCart.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;