import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Recherche from '@/views/Recherche.vue';
import Resultats from '@/views/Resultats.vue';
import AccueilAvance from '@/views/RechercheAvance.vue';
import Test from '@/views/test.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Accueil',
      component: Recherche,
   },
   {  path: '/test',
      name: 'Test',
      component: Test,
   },
   {
      path: '/recherche',
      name: 'Recherche',
      component: Recherche,
   },
   {
      path: '/resultats',
      name: 'Resultats',
      component: Resultats,
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
