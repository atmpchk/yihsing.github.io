import Vue from 'vue';
import App from './App.vue';
import router from './router';
import formatter from './assets/js/formatter';
import { setDefaultBaseUrlFromEnv } from './assets/js/vue/axios';
import './assets/js/jquery';
import './assets/js/vue/loading';

Vue.config.productionTip = false;

setDefaultBaseUrlFromEnv();

Vue.filter('formatCurrency', formatter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
