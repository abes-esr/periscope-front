<template>
   <v-container class="ma-0 pa-0">
      <v-row align="center" justify="center" no-gutters dense>
         <v-col>
            <v-stepper>
               <v-stepper-header>
                  <v-stepper-step v-if="isSelectionEmpty" color="grey lighten-2" complete editable edit-icon="mdi-magnify" step="1" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-stepper-step v-else color="grey lighten-2" complete editable edit-icon="mdi-magnify" step="1" @click="changePage(1)">Recherche</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step v-if="isSelectionEmpty" color="grey lighten-2" complete complete-icon="mdi-table" step="2">Résultats</v-stepper-step>
                  <v-stepper-step v-else color="grey lighten-2" complete editable edit-icon="mdi-table" step="2" @click="changePage(2)">Résultats</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-table" step="3" @click="changePage(3)">Visualisation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step color="grey lighten-2" complete editable edit-icon="mdi-history" step="5" @click="changePage(5)">Historique</v-stepper-step>
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

@Component
export default class Stepper extends Vue {
   selectionEmpty: boolean;

   constructor() {
      super();
      this.selectionEmpty = this.isSelectionEmpty;
   }

   get isSelectionEmpty(): boolean {
      return this.$store.getters.isSelectionEmpty;
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
            break;
         case 3:
            this.$store.dispatch('changeStepAction', stepNumber).catch((err) => {
               Logger.error(err);
            });
            this.$router.replace('/visualisation').catch((err) => {
               Logger.error(err);
            });
            break;
         case 5:
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
