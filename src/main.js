// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-default/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import { VueAuth, AuthBearer } from '@websanova/vue-auth';

import App from './App';
import router from './router';


Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
/* eslint global-require: "off" */
Vue.use(VueAuth, {
  auth: AuthBearer,
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
