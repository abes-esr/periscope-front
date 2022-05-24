<template>
   <v-container class="ma-0 pa-0">
      <v-row align="center" justify="center" no-gutters dense>
         <v-col>
            <v-stepper :value="getStep" non-linear>
               <v-stepper-header>
                  <v-stepper-step v-if="isSelectionEmpty" step="1" complete editable color="grey lighten-2" edit-icon="mdi-magnify" complete-icon="mdi-magnify" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-stepper-step v-else step="1" complete editable color="grey lighten-2" edit-icon="mdi-magnify" complete-icon="mdi-magnify" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step v-if="isSelectionEmpty" complete step="2" color="grey lighten-2" complete-icon="mdi-table">Résultats</v-stepper-step>
                  <v-stepper-step v-else step="2" complete editable color="grey lighten-2" edit-icon="mdi-table" complete-icon="mdi-table" @click="changePage(2)">Résultats</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step v-if="isPpnEmpty" disabled="" complete step="3" color="grey lighten-2" edit-icon="mdi-table" complete-icon="mdi-table">Visualisation</v-stepper-step>
                  <v-stepper-step v-else complete editable step="3" color="grey lighten-2" edit-icon="mdi-table" complete-icon="mdi-table" @click="changePage(3)">Visualisation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="4" complete editable color="grey lighten-2" edit-icon="mdi-history" complete-icon="mdi-history" @click="changePage(4)">Historique</v-stepper-step>
               </v-stepper-header>
            </v-stepper>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Logger} from '@/utils/Logger';
import {HttpRequestError} from '@/exception/HttpRequestError';
import router from '@/router';

@Component
export default class Stepper extends Vue {
   ppnEmpty: boolean;
   constructor() {
      super();
      this.ppnEmpty = this.isPpnEmpty;
   }

   get isSelectionEmpty(): boolean {
      return this.$store.getters.isSelectionEmpty;
   }

   get isPpnEmpty(): boolean {
      return this.$store.state.lotHoldings._ppn === 'unset';
   }

   get getStep(): number {
      return this.$store.state.composants._stepperCurrentValue;
   }
   /**
    * Action lorsque l'utilisateur clique sur une étape du stepper
    * @param stepNumber Etape sélectionnée
    */
   changePage(stepNumber: number): void {
      switch (stepNumber) {
         case 1:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('/Recherche').catch((err) => {
               Logger.error(err);
            });
            break;
         case 2:
            if (!this.isSelectionEmpty) {
               this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
                  Logger.error(err);
               });
               if (this.$store.getters.getMaxNotices === 1) {
                  router.push('/Resultat');
               } else {
                  this.$store.dispatch('doSearch').catch((err) => {
                     Logger.debug('Erreur API : ' + err.debugMessage);
                     Logger.error(err.message);
                     if (err instanceof HttpRequestError) {
                        this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                           Logger.error(err);
                        });
                     } else if (err.name !== 'NavigationDuplicated') {
                        this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                           Logger.error(err);
                        });
                     }
                  });
                  this.$store.dispatch('openStickyInfoSnackBar', 'Recherche en cours...').catch((err) => {
                     Logger.error(err);
                  });
               }
            }
            break;
         case 3:
            if (!this.isPpnEmpty) {
               this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
                  Logger.error(err);
               });
               this.$router.replace('/visualisation').catch((err) => {
                  Logger.error(err);
               });
            }
            break;
         case 4:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('/HistoriqueRequetes').catch((err) => {
               Logger.error(err);
            });
            break;
      }
   }
}
</script>
