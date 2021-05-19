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
               <component-ppn v-if="i.id === 0 && i.displayed === true" @onChange="renderPanelList"></component-ppn>
               <component-issn v-if="i.id === 1 && i.displayed === true" @onChange="renderPanelList"></component-issn>
               <component-rcr v-if="i.id === 2 && i.displayed === true" @onChange="renderPanelList"></component-rcr>
               <component-plan-conservation-regions v-if="i.id === 3 && i.displayed === true" @onChange="renderPanelList"></component-plan-conservation-regions>
               <component-plan-conservation-metiers v-if="i.id === 4 && i.displayed === true" @onChange="renderPanelList"></component-plan-conservation-metiers>
               <component-mots-du-titre v-if="i.id === 5 && i.displayed === true" @onChange="renderPanelList"></component-mots-du-titre>
               <component-editeur v-if="i.id === 6 && i.displayed === true" @onChange="renderPanelList"></component-editeur>
               <component-langue v-if="i.id === 7 && i.displayed === true" @onChange="renderPanelList"></component-langue>
               <component-pays v-if="i.id === 8 && i.displayed === true" @onChange="renderPanelList"></component-pays>
               <component-requete-enregistree v-if="i.id === 9 && i.displayed === true" @onChange="renderPanelList"></component-requete-enregistree>
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
import ComponentPpn from '@/components/recherche/criteres/BlocPpn.vue';
import ComponentHeader from '@/components/page/Header.vue';
import ComponentStepper from '@/components/page/Stepper.vue';
import ComponentListeDeChoix from '@/components/recherche/criteres/ListeDeChoix.vue';
import ComponentIssn from '@/components/recherche/criteres/BlocIssn.vue';
import ComponentRcr from '@/components/recherche/criteres/BlocRcr.vue';
import ComponentPlanConservationMetiers from '@/components/recherche/criteres/BlocPlanConservationMetiers.vue';
import ComponentMotsDuTitre from '@/components/recherche/criteres/BlocMotsDuTitre.vue';
import ComponentEditeur from '@/components/recherche/criteres/BlocEditeur.vue';
import ComponentLangue from '@/components/recherche/criteres/BlocLangue.vue';
import ComponentPays from '@/components/recherche/criteres/BlocPays.vue';
import ComponentPlanConservationRegions from '@/components/recherche/criteres/BlocPlanConservationRegions.vue';
import ComponentRequeteEnregistree from '@/components/recherche/criteres/BlocRequeteEnregistree.vue';
import ComponentBoutonsRecherche from '@/components/recherche/BoutonsRecherche.vue';
import {PanelProvider} from '@/store/recherche/ComposantInterfaces';
import ComponentFooter from '@/components/page/Footer.vue';

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
   }

   computed(): void {
      this.panel = this.getPanel;
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
