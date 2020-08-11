import Vue from 'vue';
import $ from 'jquery';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';
import formatter from './assets/js/formatter';

window.$ = $;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/`;

Vue.component('Loading', Loading);

Vue.filter('formatCurrency', formatter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
