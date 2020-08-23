import Vue from 'vue';

import {
  ValidationProvider, ValidationObserver, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zhTW from './zh_TW.json';

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

localize('tw', zhTW);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
