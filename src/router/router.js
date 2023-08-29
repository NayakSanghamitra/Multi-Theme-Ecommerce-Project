import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ProductDetails from '../components/ProductDetails.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', name: 'product-details', component: ProductDetails },
  { path: '/cart', component: ShoppingCart }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;