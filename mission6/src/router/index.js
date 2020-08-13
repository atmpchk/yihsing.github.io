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
        children: [
          {
            path: ':id',
            name: 'attraction.products.id',
            component: () => import('../views/attraction/Product.vue'),
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
    name: 'admin',
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
        path: 'pictures',
        name: 'admin.pictures',
        component: () => import('../views/admin/Pictures.vue'),
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

function isAuthenticated() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (token === '') {
    return false;
  }
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log('check auth');
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
