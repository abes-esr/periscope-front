import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Recherche from '@/views/Recherche.vue';
import Resultats from '@/views/Resultats.vue';
import RechercheAvance from '@/views/RechercheAvance.vue';
import ConditionsGenerales from '@/views/ConditionsGenerales.vue';
import MentionsLegales from '@/views/MentionsLegales.vue';
import HistoriqueRequetes from "@/views/HistoriqueRequetes.vue";

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
      path: '/resultat',
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
   }
];

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
});

//this.$router.push({}).catch((err) => { throw new RouterError(err); });

export default router;
