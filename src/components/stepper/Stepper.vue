<template>
   <v-container class="ma-0 pa-0">
      <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" no-gutters dense>
         <v-col>
            <v-stepper>
               <v-stepper-header>
                  <v-stepper-step :complete="current > 1" step="1" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="current > 1" step="2" @click="changePage(2)">Résultats</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="current > 2" step="3" @click="changePage(3)">Visualisation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="current > 3" step="4" @click="changePage(4)">Exports</v-stepper-step>
               </v-stepper-header>
            </v-stepper>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '../../mixins/globalProperties';

@Component
export default class Stepper extends Mixins(GlobalPropertiesMixin) {
   current: number;

   constructor() {
      super();
      this.current = this.getStepCurrentNumber;
   }

   get getStepCurrentNumber(): number {
      return this.$store.state.composants._stepperCurrentValue;
   }

   //Event
   changePage(stepNumber: number): void {
      switch (stepNumber) {
         case 1:
            this.$store.dispatch('changeStepAction', stepNumber);
            this.$router.replace('Recherche');
            break;
         case 2:
            this.$store.dispatch('changeStepAction', stepNumber);
            this.$store.dispatch('constructJsonAction');
            this.$store.dispatch('getNoticesAndErasePreviousNoticesAction');
            this.$router.replace('Resultats');
            break;
         case 3:
            this.$store.dispatch('changeStepAction', stepNumber);
            this.$router.replace('Visualisation');
            break;
         case 4:
            this.$store.dispatch('changeStepAction', stepNumber);
            this.$router.replace('Export');
            break;
      }
   }
}
</script>

<style scoped></style>
