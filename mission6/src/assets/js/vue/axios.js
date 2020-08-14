import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

function registerGlobally() {
  Vue.use(VueAxios, axios);
}

function setDefaultBaseUrl(url) {
  axios.defaults.baseURL = url;
}

function setDefaultBaseUrlFromEnv() {
  setDefaultBaseUrl(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/`);
}

function setDefaultAuthorizationToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export {
  registerGlobally,
  setDefaultBaseUrl,
  setDefaultBaseUrlFromEnv,
  setDefaultAuthorizationToken,
};
