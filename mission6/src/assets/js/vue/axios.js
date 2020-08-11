import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

function setDefaultBaseUrl(url) {
  axios.defaults.baseURL = url;
}

function setDefaultBaseUrlFromEnv() {
  setDefaultBaseUrl(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/`);
}

export { setDefaultBaseUrl, setDefaultBaseUrlFromEnv };
