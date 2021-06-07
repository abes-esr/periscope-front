import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Resultats from '@/views/page/Resultats.vue';
import RechercheAvance from '@/views/page/RechercheAvance.vue';
import ConditionsGenerales from '@/views/page/ConditionsGenerales.vue';
import MentionsLegales from '@/views/page/MentionsLegales.vue';
import HistoriqueRequetes from '@/views/page/HistoriqueRequetes.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: '/accueil',
      component: RechercheAvance,
      meta: {title: 'Periscope - Recherche'},
   },
   {
      path: '/recherche',
      name: 'Recherche',
      component: RechercheAvance,
      meta: {title: 'Periscope - Recherche'},
   },
   {
      path: '/conditions-generales',
      name: 'ConditionsGenerales',
      component: ConditionsGenerales,
      meta: {title: 'Periscope - Conditions générales'},
   },
   {
      path: '/mentions-legales',
      name: 'MentionsLegales',
      component: MentionsLegales,
      meta: {title: 'Periscope - Mentions légales'},
   },
   {
      path: '/resultat',
      name: 'Resultats',
      component: Resultats,
      meta: {title: 'Periscope - Résultats'},
   },
   {
      path: '/historiqueRequetes',
      name: 'HistoriqueRequetes',
      component: HistoriqueRequetes,
      meta: {title: 'Periscope - Historique'},
   },
   {
      // Redirection vers la page de recherche
      path: '*',
      name: 'Redirection Recherche',
      component: RechercheAvance,
      meta: {title: 'Periscope - Recherche'},
   },
];

const index = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

const DEFAULT_TITLE = 'Periscope v2.0';
index.afterEach((to) => {
   // Use next tick to handle index history correctly
   // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
   Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
   });
});

export default index;
