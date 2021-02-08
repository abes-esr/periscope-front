<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e6e6e6">
         <v-select :items="optionsPpn" label="Standard" dense></v-select>
      </v-row>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e6e6e6">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_regions[m - 1])" v-for="m in 5" :key="m" :value="prop_regions[m - 1].value" :label="prop_regions[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_regions[m + 4])" v-for="m in 5" :key="m" :value="prop_regions[m + 4].value" :label="prop_regions[m + 4].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_regions[m + 9])" v-for="m in 6" :key="m" :value="prop_regions[m + 9].value" :label="prop_regions[m + 9].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox v-on:click="changeValueOneCheckboxElement(prop_regions[m + 15])" v-for="m in 6" :key="m" :value="prop_regions[m + 15].value" :label="prop_regions[m + 15].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col>
            <p>{{ globalRegionsState }}</p>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {namespace} from 'vuex-class';

//Import de classe globale
const requeteDeRecherche = namespace('RequeteDeRecherche');

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

interface OptionsProvider {
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

enum Ensemble {
   Union, //0
   Intersection, //1
   Difference, //2
}

@Component
export default class Regions extends Mixins(GlobalPropertiesMixin) {
   private optionsPpn: Array<OptionsProvider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   //Setters de classe
   @requeteDeRecherche.Action
   public updateGlobalRegions!: (arraySent: Array<Provider>) => void;

   //Getters (computed par defaut)
   get globalRegionsState(): Array<Provider> {
      return this.$store.state.RequeteDeRecherche.blocPcpRegions.globalRegions;
   }

   //Props passées par le parent
   @Prop({required: true}) prop_regions: Array<Provider>;

   //Evenements du template
   private changeValueOneCheckboxElement(element: Provider): void {
      element.value = !element.value;
      this.updateGlobalRegions(this.prop_regions);
   }
}
</script>
