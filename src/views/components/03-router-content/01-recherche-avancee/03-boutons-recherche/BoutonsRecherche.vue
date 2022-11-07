<template>
   <v-container fluid>
      <v-row justify="end">
         <v-col lg="2" md="4">
            <v-tooltip top max-width="20vw" open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn @click="resetSearch()" color="#cf4a1a" dark large v-on="on">Réinitialiser<v-icon dark right> mdi-cancel </v-icon></v-btn>
               </template>
               <span>Réinitialiser le formulaire de recherche. Tous les blocs seront vidés et supprimés</span>
            </v-tooltip>
         </v-col>
         <v-col xs="4" sm="2">
            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn :disabled="isSelectionEmpty" @click="clickSearch()" color="#0f75bc" class="white--text" large v-on="on">Rechercher<v-icon right>mdi-magnify</v-icon></v-btn>
               </template>
               <span>Lancer la recherche</span>
            </v-tooltip>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Logger} from '@/utils/Logger';
import {HttpRequestError} from '@/exception/HttpRequestError';

@Component
export default class BoutonsRecherche extends Vue {
   /**
    * Vérifie si le formulaire de recherche est vide
    * @return Vrai si le formulaire de recherche est vide, Faux sinon
    */
   get isSelectionEmpty(): boolean {
      return this.$store.getters.isSelectionEmpty;
   }

   /**
    * Action de recherche
    */
   clickSearch(): void {
      this.$store.dispatch('resetFiltresFacettes').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('changeStepAction', 2).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('doSearch').catch((err) => {
         Logger.error(err.message);
         if (err instanceof HttpRequestError) {
            Logger.debug('Erreur API : ' + err.debugMessage);
            this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
               Logger.error(err);
            });
         } else {
            this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
               Logger.error(err);
            });
         }
      });
      this.$store.dispatch('feedTree').catch((err) => {
         Logger.error(err.message);
      });
      this.$store.dispatch('openStickyInfoSnackBar', 'Recherche en cours...').catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Réinitialiser le formulaire de recherche
    */
   resetSearch(): void {
      this.$store.dispatch('resetSearchForm', true).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>
