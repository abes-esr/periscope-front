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
import router from '@/router';

@Component
export default class BoutonsRecherche extends Mixins(GlobalPropertiesMixin) {
   selectionEmpty: boolean;

   constructor() {
      super();
      this.selectionEmpty = this.isSelectionEmpty;
   }

   get isSelectionEmpty(): boolean {
      if (
         this.$store.state.blocPays._selected.length == 0 &&
         this.$store.state.blocLangue._selected == 0 &&
         this.$store.state.blocPcpRegions._selected.length == 0 &&
         this.$store.state.blocEditeur._selected.length == 0 &&
         this.$store.state.blocPcpMetiers._selected.length == 0 &&
         this.$store.state.blocIssn._selected.length == 0 &&
         this.$store.state.blocRcr._selected.length == 0 &&
         this.$store.state.blocMotsDuTitre._selected.length == 0 &&
         this.$store.state.blocPpn._selected.length == 0 &&
         this.$store.state.blocRequeteDirecte._directRequest.length == 0
      ) {
         return true;
      } else {
         return false;
      }
   }
   async clickSearch(): Promise<boolean> {
      this.$store.dispatch('constructJsonAction').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('resetPage').catch((err) => {
         Logger.error(err);
      });
      await this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            router.push('Resultat').catch((err) => {
               throw new Error(err);
            });
         })
         .catch((err) => {
            Logger.error(err);
         });

      return true;
   }

   resetSearch(): void {
      this.$store.dispatch('resetAllBlocs').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('resetSearchPanel').catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>
