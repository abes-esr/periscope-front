<template>
   <v-container class="outlined-app">
      <v-row no-gutters>
         <v-col>
            <h2 v-html="title"></h2>
         </v-col>
      </v-row>
      <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(2)" class="ma-0 pa-0" dense>
         <v-col v-for="iteration in this.choixTousOuAucun" v-bind:key="iteration.id" xs="6" sm="1" align-self="end" class="ma-0 pa-0">
            <v-btn small depressed color="primary" v-on:click="changeAllValuesWhenClicked(iteration.text)" v-html="iteration.text"></v-btn>
         </v-col>
      </v-row>
      <v-row>
         <component-regions v-bind:prop_regions="regions"></component-regions>
      </v-row>
      <v-row>
         <component-metiers v-bind:prop_metiers="metiers"></component-metiers>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties.ts';
import ComponentRegions from '@/components/accueilSousElements_niv3/Regions.vue';
import ComponentMetiers from '@/components/accueilSousElements_niv3/Metiers.vue';
import {CheckboxesProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

@Component({
   components: {
      ComponentRegions,
      ComponentMetiers,
   },
})
export default class PlanConservation extends Mixins(GlobalPropertiesMixin) {
   private regions: Array<CheckboxesProvider>;
   private metiers: Array<CheckboxesProvider>;
   private choixTousOuAucun: Array<CheckboxesProvider> = [
      {id: 0, key: 'all', value: false, text: 'Tous'},
      {id: 1, key: 'none', value: false, text: 'Aucun'},
   ];

   created(): void {
      this.regions = this.$store.state.requeteRecherche.blocPcpRegions._arrayRegions;
      this.metiers = this.$store.state.requeteRecherche.blocPcpMetiers._arrayMetiers;
   }

   private title = 'Choisir un plan de conservation';

   /**
    * Méthode changeant l'ensemble des valeurs d'un tableau donné
    * @param arrayMember tableau passé en paramètre
    * @param booleanValue valeur du booléen d'un élément du tableau
    * @private
    */
   private arrayChangeAllBooleanValues(arrayMember: Array<CheckboxesProvider>, booleanValue: boolean): void {
      arrayMember.forEach((element) => (element.value = booleanValue));
      this.$store.commit('setBlocPcpRegionsArrayRegions', this.regions);
      this.$store.commit('setBlocPcpRegionsStringList', this.regions);
      this.$store.commit('setBlocPcpMetiersArrayMetiers', this.regions);
      this.$store.commit('setBlocPcpMetiersStringList', this.regions);
   }

   /**
    * Méthode changeant les valeurs des éléments au moment d'un clic
    * @param localText valeur d'un élement passé dans l'iteration du template
    * @private
    */
   private changeAllValuesWhenClicked(localText: string): void {
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
