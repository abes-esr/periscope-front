<template>
   <v-container>
      <v-row>
         <v-col>
            <component-header></component-header>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-stepper></component-stepper>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-liste-de-choix @onChange="renderPanelList" ref="listeChoix"></component-liste-de-choix>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-expansion-panels v-for="i in panel" :key="i.position">
               <component-ppn v-if="i.id === 0 && i.isDisplayed" @onChange="renderPanelList"></component-ppn>
               <component-issn v-if="i.id === 1 && i.isDisplayed" @onChange="renderPanelList"></component-issn>
               <component-rcr v-if="i.id === 2 && i.isDisplayed" @onChange="renderPanelList"></component-rcr>
               <component-plan-conservation-regions v-if="i.id === 3 && i.isDisplayed" @onChange="renderPanelList"></component-plan-conservation-regions>
               <component-plan-conservation-metiers v-if="i.id === 4 && i.isDisplayed" @onChange="renderPanelList"></component-plan-conservation-metiers>
               <component-mots-du-titre v-if="i.id === 5 && i.isDisplayed" @onChange="renderPanelList"></component-mots-du-titre>
               <component-editeur v-if="i.id === 6 && i.isDisplayed" @onChange="renderPanelList"></component-editeur>
               <component-langue v-if="i.id === 7 && i.isDisplayed" @onChange="renderPanelList"></component-langue>
               <component-pays v-if="i.id === 8 && i.isDisplayed" @onChange="renderPanelList"></component-pays>
               <component-pcp-rcr v-if="i.id === 9 && i.isDisplayed" @onChange="renderPanelList"></component-pcp-rcr>
               <component-requete-enregistree v-if="i.id === 10 && i.isDisplayed" @onChange="renderPanelList"></component-requete-enregistree>
            </v-expansion-panels>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-boutons-recherche @onChange="renderPanelList"></component-boutons-recherche>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-footer></component-footer>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentPpn from '@/views/components/recherche/criteres/BlocPpn.vue';
import ComponentHeader from '@/views/components/Header.vue';
import ComponentStepper from '@/views/components/Stepper.vue';
import ComponentListeDeChoix from '@/views/components/recherche/criteres/ListeDeChoix.vue';
import ComponentIssn from '@/views/components/recherche/criteres/BlocIssn.vue';
import ComponentRcr from '@/views/components/recherche/criteres/BlocRcr.vue';
import ComponentPlanConservationMetiers from '@/views/components/recherche/criteres/BlocPlanConservationMetiers.vue';
import ComponentMotsDuTitre from '@/views/components/recherche/criteres/BlocMotsDuTitre.vue';
import ComponentEditeur from '@/views/components/recherche/criteres/BlocEditeur.vue';
import ComponentLangue from '@/views/components/recherche/criteres/BlocLangue.vue';
import ComponentPays from '@/views/components/recherche/criteres/BlocPays.vue';
import ComponentPlanConservationRegions from '@/views/components/recherche/criteres/BlocPlanConservationRegions.vue';
import ComponentRequeteEnregistree from '@/views/components/recherche/criteres/BlocRequeteEnregistree.vue';
import ComponentBoutonsRecherche from '@/views/components/recherche/BoutonsRecherche.vue';
import {PanelProvider} from '@/store/composant/ComposantDefinition';
import ComponentFooter from '@/views/components/Footer.vue';
import ComponentPcpRcr from '@/views/components/recherche/criteres/BlocPcpRcr.vue';

@Component({
   components: {
      ComponentPlanConservationRegions,
      ComponentIssn,
      ComponentHeader,
      ComponentStepper,
      ComponentPpn,
      ComponentListeDeChoix,
      ComponentRcr,
      ComponentPlanConservationMetiers,
      ComponentMotsDuTitre,
      ComponentEditeur,
      ComponentLangue,
      ComponentPays,
      ComponentPcpRcr,
      ComponentRequeteEnregistree,
      ComponentBoutonsRecherche,
      ComponentFooter,
   },
})
export default class RechercheAvance extends Vue {
   panel: Array<PanelProvider>;

   constructor() {
      super();
      this.panel = this.getPanel;
      console.log('constructor');
   }

   //lifecycle
   beforeCreate(): void {
     console.log(this.$store.state.blocRcr._selected);
     console.log(JSON.stringify(this.$store.state.blocRequeteDirecte._historyOfAllRequests));
      console.log('beforecreate');
   }

   created(): void {
      console.log('created');
   }

   mounted(): void {
      console.log('mounted');
      this.panel = this.getPanel;
   }

   destroyed(): void {
     console.log('destroyed');
     this.$store.dispatch('switchIsClosed');
   }

   //end lifecycle

   computed(): void {
      console.log('computed');
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel;
   }

   renderPanelList(): void {
      this.panel = this.getPanel;
      (this.$refs.listeChoix as ComponentListeDeChoix).updateList(); // On update la liste de choix
   }
}
</script>
