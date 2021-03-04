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
            <v-expansion-panels>
               <component-ppn v-if="getPpnPanelDisplayed()"></component-ppn>
               <component-issn v-if="getIssnPanelDisplayed()"></component-issn>
            </v-expansion-panels>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentPpn from '@/components/accueil_avance_niv1/ComponentPpn.vue';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';
import ComponentListeDeChoix from '@/components/accueil_avance_niv1/ListeDeChoix.vue';
import ComponentIssn from '@/components/accueil_avance_niv1/ComponentIssn.vue';

@Component({
   components: {
      ComponentIssn,
      ComponentHeader,
      ComponentStepper,
      ComponentPpn,
      ComponentListeDeChoix,
   },
})
export default class RechercheAvance extends Vue {
   getPpnPanelDisplayed(): boolean {
      return this.$store.state.composants._panelPpnDisplayed;
   }
   getIssnPanelDisplayed(): boolean {
      return this.$store.state.composants._panelIssnDisplayed;
   }
}
</script>
