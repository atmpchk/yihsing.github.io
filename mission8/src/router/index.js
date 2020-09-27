import Vue from 'vue';
import VueRouter from 'vue-router';
import Attraction from '../views/Attraction.vue';
import { setDefaultAuthorizationToken } from '../assets/js/vue/axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
        // children: [
        //   {
        //     path: ':id',
        //     name: 'attraction.products.id',
        //     component: () => import('../views/attraction/Product.vue'),
        //   },
        // ],
      },
      {
        path: 'product',
        name: 'attraction.product',
        component: () => import('../views/attraction/ProductDetail.vue'),
        children: [
          {
            path: ':id',
            name: 'attraction.product.id',
            component: () => import('../views/attraction/ProductDetail.vue'),
          },
        ],
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
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin.index',
        component: () => import('../views/admin/Index.vue'),
      },
      {
        path: 'products',
        name: 'admin.products',
        component: () => import('../views/admin/Products.vue'),
      },
      {
        path: 'orders',
        name: 'admin.orders',
        component: () => import('../views/admin/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'admin.coupons',
        component: () => import('../views/admin/Coupons.vue'),
      },
      {
        path: 'storages',
        name: 'admin.storages',
        component: () => import('../views/admin/Storages.vue'),
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

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: 0 };
}

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  scrollBehavior,
});

function isAuthenticated() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (token === '') {
    return false;
  }
  setDefaultAuthorizationToken(token);
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to call next()
  }
});

export default router;
