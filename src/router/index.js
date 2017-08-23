import Vue from 'vue';
import Router from 'vue-router';
import AlbumOverview from '@/components/AlbumOverview';

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
