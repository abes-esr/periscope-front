<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e2e4ff">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m - 1].value" :label="metiers[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m + 3].value" :label="metiers[m + 3].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m + 7].value" :label="metiers[m + 7].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="metiers[m + 11].value" :label="metiers[m + 11].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {CheckboxesProvider} from '@/store/recherche/BlocInterfaces';

@Component
export default class Metiers extends Mixins(GlobalPropertiesMixin) {
   //Prop passée par le parent
   metiers: Array<CheckboxesProvider>;

   constructor() {
      super();
      this.metiers = this.getMetiers;
   }

   get getMetiers(): Array<CheckboxesProvider> {
      let arrayReturned = this.$store.state.blocPcpMetiers._arrayMetiers;
      if (arrayReturned.length === 0) {
         arrayReturned = [
            {id: 0, key: 'PCAM', text: 'Arts-et-Métiers', value: false},
            {id: 1, key: 'PCAS', text: 'Arts du spectacle', value: false},
            {id: 2, key: 'PCAnt', text: "Sciences de l'Antiquité et Archéologie", value: false},
            {id: 3, key: 'PCChimie', text: 'Chimie', value: false},
            {id: 4, key: 'PCDroit', text: 'Droit', value: false},
            {id: 5, key: 'PCEBCO', text: 'Europe balkanique, centrale et orientale', value: false},
            {id: 6, key: 'PCGer', text: 'Langues, littératures, civilisation germaniques', value: false},
            {id: 7, key: 'PCGéo', text: 'Géographie', value: false},
            {id: 8, key: 'PCIta', text: 'Etudes italiennes', value: false},
            {id: 9, key: 'PCMedieval', text: 'Médiéval', value: false},
            {id: 10, key: 'PCNum', text: 'Sciences du Numérique', value: false},
            {id: 11, key: 'PCMath', text: 'Mathématiques RNBM', value: false},
            {id: 12, key: 'PCMed', text: 'Médecine', value: false},
            {id: 13, key: 'PCPsy', text: 'Psychologie, Psychanalyse', value: false},
            {id: 14, key: 'PCSTAPS', text: 'STAPS', value: false},
            {id: 15, key: 'PCPhilo', text: 'Philosophie', value: false},
            {id: 16, key: 'PCPhy', text: 'Physique', value: false},
            //TODO 'PCLCen':['Lettres et Sciences Humaines Centre Val de Loire', 'geo' ], -> trouver correspondance
            //TODO 'PCEco':['Economie et gestion', ''] idem
         ];
      }
      return arrayReturned;
   }

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store.dispatch('blocPcpMetiersArrayMetiersAction', this.metiers);
      this.$store.dispatch('blocPcpMetiersArrayMetiersStringListAction', this.metiers);
   }
}
</script>
