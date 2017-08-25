import Vue from 'vue';
import Router from 'vue-router';
import Album from '@/pages/Album';
import Story from '@/pages/Story';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'album',
      component: Album,
      meta: { auth: true }
    },
    {
      path: '/album/:id',
      name: 'story',
      component: Story,
      meta: { auth: true }
    },
  ],
});
