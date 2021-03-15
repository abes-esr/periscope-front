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

@Component
export default class BoutonsRecherche extends Mixins(GlobalPropertiesMixin) {
   clickSearch() {
      this.$store.dispatch('constructJsonAction');
      this.$store.dispatch('getNoticesAndErasePreviousNoticesAction', false);
   }

   resetStore() {
      this.$store.dispatch('resetAllBlocsAction');
      document.location.reload();
   }
}
</script>
