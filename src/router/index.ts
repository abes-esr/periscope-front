import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Recherche from '@/views/Recherche.vue';
import Resultats from '@/views/Resultats.vue';
import AccueilAvance from '@/views/RechercheAvance.vue';
import ConditionsGenerales from '@/views/ConditionsGenerales.vue';
import MentionsLegales from '@/views/MentionsLegales.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Accueil',
      component: Recherche,
   },
   {
      path: '/recherche',
      name: 'Recherche',
      component: Recherche,
   },
   {
      path: '/conditions-generales',
      name: 'ConditionsGenerales',
      component: ConditionsGenerales,
   },
   {
      path: '/mentions-legales',
      name: 'MentionsLegales',
      component: MentionsLegales,
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
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
