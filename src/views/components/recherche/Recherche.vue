<template>
   <v-container class="outlined-app">
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
import ComponentPpn from '@/views/components/recherche/criteres/v1/Ppn.vue';
import ComponentRcr from '@/views/components/recherche/criteres/v1/Rcr.vue';
import ComponentBoutonsRecherche from '@/views/components/recherche/BoutonsRecherche.vue';
import ComponentPlanDeConservation from '@/views/components/recherche/criteres/v1/PlanConservation.vue';

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
