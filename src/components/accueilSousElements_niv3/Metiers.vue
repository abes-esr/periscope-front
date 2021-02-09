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
         <v-col>
            <p>{{ typeof prop_metiers }}</p>
            <p>{{ prop_metiers }}</p>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {namespace} from 'vuex-class';
import {CheckboxesProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

const requeteDeRecherche = namespace('RequeteDeRecherche');

@Component
export default class Metiers extends Mixins(GlobalPropertiesMixin) {
   //Setters de classe
   @requeteDeRecherche.Action
   public updateBlocMetiers!: (arraySent: Array<CheckboxesProvider>) => void;

   //Prop passée par le parent
   @Prop({required: true}) prop_metiers: Array<CheckboxesProvider>;

   //Evenements
   private changeValueOneCheckboxElement(element: CheckboxesProvider): void {
      element.value = !element.value;
      this.updateBlocMetiers(this.prop_metiers);
   }
}
</script>
