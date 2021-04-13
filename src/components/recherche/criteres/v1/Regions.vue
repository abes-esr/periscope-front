<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e6e6e6">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m - 1].value" :label="regions[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m + 4].value" :label="regions[m + 4].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 9].value" :label="regions[m + 9].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 15].value" :label="regions[m + 15].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {CheckboxesProvider} from '@/store/recherche/BlocInterfaces';
import {ValueError} from '@/store/exception/ValueError';
import {Logger} from '@/store/utils/Logger';

@Component
export default class Regions extends Mixins(GlobalPropertiesMixin) {
   regions: Array<CheckboxesProvider>;

   constructor() {
      super();
      this.regions = this.getRegions;
   }

   get getRegions(): Array<CheckboxesProvider> {
      let arrayReturned: Array<CheckboxesProvider> = this.$store.state.blocPcpRegions._candidates;
      if (arrayReturned.length === 0) {
         throw new ValueError('Pcp region are empty');
      }
      return arrayReturned;
   }

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store.dispatch('updateCandidatesPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateSelectedPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }
}
</script>
