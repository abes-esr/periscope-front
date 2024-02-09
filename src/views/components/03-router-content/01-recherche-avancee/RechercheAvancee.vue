<template>
   <v-container fluid>
      <v-row>
         <v-col>
            <component-liste-de-choix @onChange="renderPanelList" ref="listeChoix"></component-liste-de-choix>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-expansion-panels v-for="i in panel" :key="i.id">
               <!-- TODO: essayé de comparer i.id === PanelType.PPN               -->
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
               <component-statut v-if="i.id === 10 && i.isDisplayed" @onChange="renderPanelList"></component-statut>
               <component-requete-enregistree v-if="i.id === 11 && i.isDisplayed" @onChange="renderPanelList"></component-requete-enregistree>
            </v-expansion-panels>
         </v-col>
      </v-row>
      <v-row justify="end">
         <v-col>
            <component-boutons-recherche @onChange="renderPanelList"></component-boutons-recherche>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentPpn from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocPpn.vue';
import ComponentListeDeChoix from '@/views/components/03-router-content/01-recherche-avancee/01-boutons-activation-blocs/PanneauActivationBlocs.vue';
import ComponentIssn from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocIssn.vue';
import ComponentRcr from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocRcr.vue';
import ComponentPlanConservationMetiers from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocPlanConservationMetiers.vue';
import ComponentMotsDuTitre from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocMotsDuTitre.vue';
import ComponentEditeur from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocEditeur.vue';
import ComponentLangue from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocLangue.vue';
import ComponentPays from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocPays.vue';
import ComponentPlanConservationRegions from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocPlanConservationRegions.vue';
import ComponentRequeteEnregistree from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocRequeteEnregistree.vue';
import ComponentBoutonsRecherche from '@/views/components/03-router-content/01-recherche-avancee/03-boutons-recherche/BoutonsRecherche.vue';
import {PanelProvider} from '@/store/composant/ComposantDefinition';
import ComponentPcpRcr from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocPcpRcr.vue';
import ComponentStatut from '@/views/components/03-router-content/01-recherche-avancee/02-blocs-recherche/BlocStatutBibliotheque.vue';
import {Logger} from '@/utils/Logger';

@Component({
   components: {
      ComponentPlanConservationRegions,
      ComponentIssn,
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
      ComponentStatut,
   },
})
export default class RechercheAvance extends Vue {
   panel: Array<PanelProvider>;

   constructor() {
      super();
      this.panel = this.getPanel;
   }

   mounted() {
      this.$store.dispatch('resetTree').catch((err) => {
         Logger.error(err.message);
      });
   }
   computed(): void {
      this.panel = this.getPanel;
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel;
   }

   renderPanelList(id: number): void {
      this.panel = this.getPanel;
      // on verifie que id n'est pas vide et que ce n'est pas la requete enregistree pour ne pas changer la position
      let displayPanel = this.panel.filter((panelProvider) => panelProvider.isDisplayed);
      if (id != undefined && id != 11) {
         this.panel.filter((panelProvider) => panelProvider.id === id)[0].position = displayPanel.length;
      }
      // On tri le tableau en fonction des nouvelles positions
      this.panel.sort((n1, n2) => {
         if (n1.position > n2.position) {
            return 1;
         }
         if (n1.position < n2.position) {
            return -1;
         }
         return 0;
      });
      for (let i = 0; i < displayPanel.length; i++) {
         this.panel.filter((panelProvider) => panelProvider.isDisplayed)[i].position = i;
      }
      (this.$refs.listeChoix as ComponentListeDeChoix).updateList(); // On update la liste de choix
   }
}
</script>
