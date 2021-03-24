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
import {Component, Mixins, Prop} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import { CheckboxesProvider } from "@/store/interfaces/BlocInterfaces";
@Component
export default class Regions extends Mixins(GlobalPropertiesMixin) {
   regions: Array<CheckboxesProvider>;

   constructor() {
      super();
      this.regions = this.getRegions;
   }

  get getRegions(): Array<CheckboxesProvider> {
    let arrayReturned: Array<CheckboxesProvider> = this.$store.state.blocPcpRegions._arrayRegions;
    if(arrayReturned.length === 0){
      arrayReturned = [
        {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
        {id: 1, key: 'PCAu', text: 'Auvergne', value: false},
        {id: 2, key: 'PCBo', text: 'Bourgogne', value: false},
        {id: 3, key: 'PCBr', text: 'Bretagne', value: false},
        {id: 4, key: 'PCCa', text: 'Champagne-Ardenne', value: false},
        {id: 5, key: 'PCCap', text: 'Champagne-Ardenne Picardie', value: false},
        {id: 6, key: 'PCCo', text: 'Corse', value: false},
        {id: 7, key: 'PCFc', text: 'Franche-Comté', value: false},
        {id: 8, key: 'PCLr', text: 'Languedoc-Roussillon', value: false},
        {id: 9, key: 'PCLim', text: 'Limousin', value: false},
        {id: 10, key: 'PCLo', text: 'Lorraine', value: false},
        {id: 11, key: 'PCMp', text: 'Midi-Pyrénées', value: false},
        {id: 12, key: 'PCNpc', text: 'Nord-Pas-de-Calais', value: false},
        {id: 13, key: 'PCPca', text: 'PACA', value: false},
        {id: 14, key: 'PCPc', text: 'Poitou-Charentes', value: false},
        {id: 15, key: 'PCPdl', text: 'Pays de Loire', value: false},
        {id: 16, key: 'PCPi', text: 'Picardie', value: false},
        {id: 17, key: 'PCRa', text: 'Rhône-Alpes', value: false},
        {id: 18, key: 'PCSam', text: 'Sciences Aix-Marseille', value: false},
        {id: 19, key: 'PCScvdl', text: 'Sciences Centre Val de Loire', value: false},
        {id: 20, key: 'PCUdp', text: 'Université de Poitiers', value: false},
        {id: 21, key: 'PCUdr', text: 'Université de Rouen', value: false},
      ];
    }
    return arrayReturned;
  }

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store.dispatch('blocPcpRegionsArrayRegionsAction', this.regions);
      this.$store.dispatch('blocPcpRegionsArrayRegionsStringListAction', this.regions);
   }
}
</script>
