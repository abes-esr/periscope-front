<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(3)">
         <v-col xs="6" sm="3">
            <v-btn @click="resetSearch()" color="#E53935" dark large>Réinitialiser<v-icon dark right> mdi-cancel </v-icon></v-btn>
         </v-col>
         <v-col xs="6" sm="3">
            <v-btn :disabled="isSelectionEmpty" @click="clickSearch()" color="#4CAF50" class="white--text" large>Recherche<v-icon right> mdi-checkbox-marked-circle</v-icon></v-btn>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';

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
         Logger.error(err);
      });
   }

   resetSearch(): void {
      this.$store.dispatch('resetSearchForm').catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>
