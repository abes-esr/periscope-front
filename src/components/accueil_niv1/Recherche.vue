<template>
   <v-container class="outlined-app" style="background-color: #f8f9f9">
      <v-container class="ma-0 pa-0">
         <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" no-gutters dense>
            <v-col>
               <!--TODO effectuer une boucle v-for avec des variables dans un tableau-->
               <v-stepper alt-labels>
                  <v-stepper-header>
                     <v-stepper-step step="1"> Recherche </v-stepper-step>
                     <v-divider></v-divider>
                     <v-stepper-step step="2"> Résultats </v-stepper-step>
                     <v-divider></v-divider>
                     <v-stepper-step step="3"> Visualisation </v-stepper-step>
                     <v-divider></v-divider>
                     <v-stepper-step step="4"> Exports </v-stepper-step>
                  </v-stepper-header>
               </v-stepper>
            </v-col>
         </v-row>
      </v-container>
      <v-container>
         <component-plan-de-conservation></component-plan-de-conservation>
      </v-container>
      <v-container>
         <v-row>
            <v-col>
               <component-rcr class="outlined-app"></component-rcr>
            </v-col>
            <v-col>
               <component-ppn class="outlined-app"></component-ppn>
            </v-col>
         </v-row>
      </v-container>
      <v-container>
         <component-boutons-recherche></component-boutons-recherche>
      </v-container>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import ComponentPpn from '@/components/accueilElements_niv2/Ppn.vue';
import ComponentRcr from '@/components/accueilElements_niv2/Rcr.vue';
import ComponentBoutonsRecherche from '@/components/accueilElements_niv2/BoutonsRecherche.vue';
import ComponentPlanDeConservation from '@/components/accueilElements_niv2/PlanConservation.vue';

@Component({
   components: {
      ComponentPpn,
      ComponentRcr,
      ComponentBoutonsRecherche,
      ComponentPlanDeConservation,
   },
})
export default class Recherche extends Mixins(GlobalPropertiesMixin) {}
</script>
