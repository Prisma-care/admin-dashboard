import Vue from 'vue';
import Router from 'vue-router';
import AlbumOverview from '@/pages/AlbumOverview';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'album-overview',
      component: AlbumOverview,
      meta: { auth: true }
    },
  ],
});
