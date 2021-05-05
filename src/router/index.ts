import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Recherche from '@/views/Recherche.vue';
import Resultats from '@/views/Resultats.vue';
import RechercheAvance from '@/views/RechercheAvance.vue';
import ConditionsGenerales from '@/views/ConditionsGenerales.vue';
import MentionsLegales from '@/views/MentionsLegales.vue';
import HistoriqueRequetes from "@/views/HistoriqueRequetes.vue";
import ProofOfConcept from "@/views/ProofOfConcept.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: '/accueil',
      component: RechercheAvance,
   },
   {
      path: '/recherche',
      name: 'Recherche',
      component: RechercheAvance,
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
      path: '/v1',
      name: 'AncienneRecherche',
      component: Recherche,
   },
   {
      path: '/historiqueRequetes',
      name: 'HistoriqueRequetes',
      component: HistoriqueRequetes,
   },
   {
      path: '/poc',
      name: 'ProofOfConcept',
      component: ProofOfConcept,
   }
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

export default router;
