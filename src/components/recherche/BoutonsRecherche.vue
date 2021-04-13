<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(3)">
         <v-col xs="6" sm="3">
            <v-btn @click="resetStore()" color="#E53935" dark large>Réinitialiser<v-icon dark right> mdi-cancel </v-icon></v-btn>
         </v-col>
         <v-col xs="6" sm="3">
            <v-btn @click="clickSearch()" color="#4CAF50" dark large>Recherche<v-icon dark right> mdi-checkbox-marked-circle</v-icon></v-btn>
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
   clickSearch() {
      this.$store.dispatch('constructJsonAction').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('resetNoticesAndPaginationAction').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('getNoticesAction', 'Resultats').catch((err) => {
         Logger.error(err);
      });
   }

   resetStore() {
      this.$store.dispatch('resetAllSelectedValue').catch((err) => {
         Logger.error(err);
      });
      document.location.reload();
   }
}
</script>
