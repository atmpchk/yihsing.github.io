import Vue from 'vue';
import VueRouter from 'vue-router';
import Attraction from '../views/Attraction.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Attraction',
    component: Attraction,
    children: [
      {
        path: '',
        name: 'attraction.index',
        component: () => import('../views/attraction/Index.vue'),
      },
      {
        path: 'products',
        name: 'attraction.products',
        component: () => import('../views/attraction/Products.vue'),
      },
      {
        path: 'cart',
        name: 'attraction.cart',
        component: () => import('../views/attraction/Cart.vue'),
      },
      {
        path: 'checkOut',
        name: 'attraction.checkOut',
        component: () => import('../views/attraction/CheckOut.vue'),
      },
      {
        path: 'checkOutFinished',
        name: 'attraction.checkOutFinished',
        component: () => import('../views/attraction/CheckOutFinished.vue'),
      },
      {
        path: 'about',
        name: 'attraction.about',
        component: () => import('../views/attraction/About.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
