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
            <component-liste-de-choix></component-liste-de-choix>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-expansion-panels v-for="i in panel" :key="i.id">
               <component-ppn v-if="i.text === 'PPN' && i.displayed === true"></component-ppn>
               <component-issn v-if="i.text === 'ISSN' && i.displayed === true"></component-issn>
               <component-rcr v-if="i.text === 'RCR' && i.displayed === true"></component-rcr>
               <component-plan-conservation-metiers></component-plan-conservation-metiers>
               <component-plan-conservation-regions></component-plan-conservation-regions>
               <component-mots-du-titre></component-mots-du-titre>
               <component-editeur></component-editeur>
               <component-langue></component-langue>
               <component-pays></component-pays>
            </v-expansion-panels>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentPpn from '@/components/accueil_avance_niv1/BlocPpn.vue';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';
import ComponentListeDeChoix from '@/components/accueil_avance_niv1/ListeDeChoix.vue';
import ComponentIssn from '@/components/accueil_avance_niv1/BlocIssn.vue';
import ComponentRcr from '@/components/accueil_avance_niv1/BlocRcr.vue';
import ComponentPlanConservationMetiers from '@/components/accueil_avance_niv1/BlocPlanConservationMetiers.vue';
import ComponentMotsDuTitre from '@/components/accueil_avance_niv1/BlocMotsDuTitre.vue';
import ComponentEditeur from '@/components/accueil_avance_niv1/BlocEditeur.vue';
import ComponentLangue from '@/components/accueil_avance_niv1/BlocLangue.vue';
import ComponentPays from '@/components/accueil_avance_niv1/BlocPays.vue';
import ComponentPlanConservationRegions from '@/components/accueil_avance_niv1/BlocPlanConservationRegions.vue';
import {PanelProvider} from '@/store/interfaces/PanelInterfaces';

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
   },
})
export default class RechercheAvance extends Vue {
   panel: Array<PanelProvider>;

   constructor() {
      super();
      this.panel = this.getPanel;
      console.log(JSON.parse(JSON.stringify(this.panel)));
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel;
   }
}
</script>
