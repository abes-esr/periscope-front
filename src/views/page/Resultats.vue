<template>
   <v-container fluid>
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
            <component-tableau-resultats></component-tableau-resultats>
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
import ComponentHeader from '@/views/components/Header.vue';
import ComponentStepper from '@/views/components/Stepper.vue';
import {Component, Vue} from 'vue-property-decorator';
import ComponentFooter from '@/views/components/Footer.vue';
import ComponentTableauResultats from '@/views/components/resultat/TableauResultats.vue';

@Component({
   components: {
      ComponentStepper,
      ComponentHeader,
      ComponentFooter,
      ComponentTableauResultats,
   },
})
export default class Resultats extends Vue {}
</script>
