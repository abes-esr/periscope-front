<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(3)">
         <v-col xs="6" sm="3">
            <v-tooltip top max-width="20vw" open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn @click="resetSearch()" color="#E53935" dark large v-on="on">Réinitialiser<v-icon dark right> mdi-cancel </v-icon></v-btn>
               </template>
               <span>Réinitialiser le formulaire de recherche. Tous les blocs seront vidés et supprimés</span>
            </v-tooltip>
         </v-col>
         <v-col xs="6" sm="3">
            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn :disabled="isSelectionEmpty" @click="clickSearch()" color="#4CAF50" class="white--text" large v-on="on">Recherche<v-icon right>mdi-magnify</v-icon></v-btn>
               </template>
               <span>Lancer la recherche</span>
            </v-tooltip>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';
import {HttpRequestError} from '@/store/exception/HttpRequestError';

@Component
export default class BoutonsRecherche extends Mixins(GlobalPropertiesMixin) {
   selectionEmpty: boolean;

   constructor() {
      super();
      this.selectionEmpty = this.isSelectionEmpty;
   }

   get isSelectionEmpty(): boolean {
      return this.$store.getters.isSelectionEmpty;
   }

   clickSearch(): void {
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
   }

   resetSearch(): void {
      this.$store.dispatch('resetSearchForm', true).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>
