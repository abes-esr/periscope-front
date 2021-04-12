<template>
   <v-container class="outlined-app">
      <v-row no-gutters>
         <v-col>
            <h2 v-html="title"></h2>
         </v-col>
      </v-row>
      <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(2)" class="ma-0 pa-0" dense>
         <v-col v-for="iteration in this.choixTousOuAucun" v-bind:key="iteration.id" xs="6" sm="1" align-self="end" class="ma-0 pa-0">
            <v-btn small depressed color="primary" @click="changeAllValuesWhenClicked(iteration.text)" v-html="iteration.text"></v-btn>
         </v-col>
      </v-row>
      <v-row>
         <component-regions></component-regions>
      </v-row>
      <v-row>
         <component-metiers></component-metiers>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties.ts';
import ComponentRegions from '@/components/recherche/Regions.vue';
import ComponentMetiers from '@/components/recherche/Metiers.vue';
import {CheckboxesProvider} from '@/store/recherche/BlocInterfaces';

@Component({
   components: {
      ComponentRegions,
      ComponentMetiers,
   },
})
export default class PlanConservation extends Mixins(GlobalPropertiesMixin) {
   regions: Array<CheckboxesProvider>;
   metiers: Array<CheckboxesProvider>;
   choixTousOuAucun: Array<CheckboxesProvider>;
   title: string;

   constructor() {
      super();
      this.regions = this.getArrayRegions;
      this.metiers = this.getArrayMetiers;
      this.choixTousOuAucun = this.getChoixTousOuAucun;
      this.title = 'Choisir un plan de conservation';
   }

   get getTitle(): string {
      return this.title;
   }
   get getChoixTousOuAucun(): Array<CheckboxesProvider> {
      return [
         {id: 0, key: 'all', value: false, text: 'Tous'},
         {id: 1, key: 'none', value: false, text: 'Aucun'},
      ];
   }
   get getArrayRegions(): Array<CheckboxesProvider> {
      return this.$store.state.blocPcpRegions._arrayRegions;
   }
   get getArrayMetiers(): Array<CheckboxesProvider> {
      return this.$store.state.blocPcpMetiers._arrayMetiers;
   }

   //Events v-btn
   /**
    * Méthode changeant l'ensemble des valeurs d'un tableau donné
    * @param arrayMember tableau passé en paramètre
    * @param booleanValue valeur du booléen d'un élément du tableau
    */
   arrayChangeAllBooleanValues(arrayMember: Array<CheckboxesProvider>, booleanValue: boolean): void {
      arrayMember.forEach((element) => (element.value = booleanValue));
      this.$store.dispatch('blocPcpRegionsArrayRegionsAction', this.regions);
      this.$store.dispatch('blocPcpRegionsArrayRegionsStringListAction', this.regions);
      this.$store.dispatch('blocPcpMetiersArrayMetiersAction', this.metiers);
      this.$store.dispatch('blocPcpMetiersArrayMetiersStringListAction', this.metiers);
   }

   /**
    * Méthode changeant les valeurs des éléments au moment d'un clic
    * @param localText valeur d'un element passé dans iteration du template
    */
   changeAllValuesWhenClicked(localText: string): void {
      switch (localText) {
         case 'Tous':
            this.arrayChangeAllBooleanValues(this.regions, true);
            this.arrayChangeAllBooleanValues(this.metiers, true);
            break;
         case 'Aucun':
            this.arrayChangeAllBooleanValues(this.regions, false);
            this.arrayChangeAllBooleanValues(this.metiers, false);
            break;
         default:
            break;
      }
   }
}
</script>
