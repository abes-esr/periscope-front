<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e2e4ff">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_metiers[m - 1])" v-for="m in 4" :key="m" :value="prop_metiers[m - 1].value" :label="prop_metiers[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_metiers[m + 3])" v-for="m in 4" :key="m" :value="prop_metiers[m + 3].value" :label="prop_metiers[m + 3].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_metiers[m + 7])" v-for="m in 4" :key="m" :value="prop_metiers[m + 7].value" :label="prop_metiers[m + 7].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_metiers[m + 11])" v-for="m in 5" :key="m" :value="prop_metiers[m + 11].value" :label="prop_metiers[m + 11].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {namespace} from 'vuex-class';

const requeteDeRecherche = namespace('RequeteDeRecherche');

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

@Component
export default class Metiers extends Mixins(GlobalPropertiesMixin) {
   //Setters de classe
   @requeteDeRecherche.Action
   public updateGlobalMetiers!: (arraySent: Array<Provider>) => void;

   //Prop passée par le parent
   @Prop({required: true}) prop_metiers: Array<Provider>;

   //Evenements
   private changeValueOneCheckboxElement(element: Provider): void {
      element.value = !element.value;
      this.updateGlobalMetiers(this.prop_metiers);
   }
}
</script>
