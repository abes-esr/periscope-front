<template>
   <v-container class="ma-0 pa-0">
      <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" no-gutters dense>
         <v-col>
            <v-stepper>
               <v-stepper-header>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-magnify" step="1" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-table" step="2" @click="changePage(2)">Résultats</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-tune" step="3" @click="changePage(3)">Visualisation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-file-export" step="4" @click="changePage(4)">Exports</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-backup-restore" step="5" @click="changePage(5)">Historique</v-stepper-step>
               </v-stepper-header>
            </v-stepper>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '../../mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';

@Component
export default class Stepper extends Mixins(GlobalPropertiesMixin) {
   constructor() {
      super();
   }

   get getStepCurrentNumber(): number {
      return this.$store.state.composants._stepperCurrentValue;
   }

   //Event
   changePage(stepNumber: number): void {
      switch (stepNumber) {
         case 1:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('Recherche').catch((err) => {
               Logger.error(err);
            });
            break;
         case 2:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$store.dispatch('constructJsonAction').catch((err) => {
               Logger.error(err);
            });
            this.$store.dispatch('resetPage').catch((err) => {
               Logger.error(err);
            });
            this.$store.dispatch('callPeriscopeAPI', 'Resultat').catch((err) => {
               Logger.error(err);
            });
            break;
         case 3:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('Visualisation').catch((err) => {
               Logger.error(err);
            });
            break;
         case 4:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('Export').catch((err) => {
               Logger.error(err);
            });
            break;
         case 5:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('HistoriqueRequetes').catch((err) => {
               Logger.error(err);
            });
            break;
      }
   }
}
</script>

<style scoped></style>
