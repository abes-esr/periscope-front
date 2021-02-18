<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e6e6e6">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="prop_regions[m - 1].value" :label="prop_regions[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="prop_regions[m + 4].value" :label="prop_regions[m + 4].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="prop_regions[m + 9].value" :label="prop_regions[m + 9].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="prop_regions[m + 15].value" :label="prop_regions[m + 15].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {namespace} from 'vuex-class';
import {CheckboxesProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

//Import de classe globale
const RequeteDeRecherche = namespace('RequeteDeRecherche');

@Component
export default class Regions extends Mixins(GlobalPropertiesMixin) {
   //Setters de classe
   @RequeteDeRecherche.Action
   public updateBlocRegions!: (arraySent: Array<CheckboxesProvider>) => void;

   //Props passées par le parent
   @Prop({required: true}) prop_regions: Array<CheckboxesProvider>;

   //Events
   private eventOnArrayCheckboxes(): void {
      this.updateBlocRegions(this.prop_regions);
   }
}
</script>
