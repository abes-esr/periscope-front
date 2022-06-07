import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Resultats from '@/views/components/03-router-content/02-resultats/Resultats.vue';
import RechercheAvance from '@/views/components/03-router-content/01-recherche-avancee/RechercheAvancee.vue';
import HistoriqueRequetes from '@/views/components/03-router-content/04-historique/HistoriqueRequetes.vue';
import Visualisation from '@/views/components/03-router-content/03-visualisation/Visualisation.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Recherche',
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
      path: '/resultat',
      name: 'Resultats',
      component: Resultats,
      meta: {title: 'Periscope - Résultats'},
   },
   {
      path: '/visualisation',
      name: 'Visualisation',
      component: Visualisation,
      meta: {title: 'Periscope - Visualisation'},
   },
   {
      path: '/historiqueRequetes',
      name: 'HistoriqueRequetes',
      component: HistoriqueRequetes,
      meta: {title: 'Periscope - Historique'},
   },
   {
      // Redirection vers la page de recherche
      // /!\ Doit obligatoirement être en dernière position /!\
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
