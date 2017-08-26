// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import dotenv from 'dotenv';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-default/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';

import App from './App';
import router from './router';

dotenv.config();
Vue.config.env = process.env.NODE_ENV;

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

Vue.router = router;
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = (Vue.config.env === 'production') ? 'https://api.prisma.care/v1' : process.env.PRISMA_API_URL;

/* eslint global-require: "off" */
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'user/signin', method: 'POST', redirect: '/' },
  logoutData: { url: 'user/signout', method: 'POST', redirect: '/login', makeRequest: true },
  fetchData: { url: 'user', method: 'GET', enabled: true },
  authRedirect: { path: '/login' },
  refreshData: { enabled: false, interval: 0 },
  forbiddenRedirect: { path: '/403' },
  expiredToken: () => false,
  parseUserData: data => data.response
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
