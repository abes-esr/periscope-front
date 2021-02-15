import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import AccueilAvance from '@/views/AccueilAvance.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Accueil',
      component: Accueil,
   },
   {
      path: '/v2',
      name: 'Accueil-v2',
      component: AccueilAvance,
   },
   {
      path: '/about',
      name: 'About',
      // TODO ne pas supprimer. Servira plus tard au lazy-loading.
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
   },
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
