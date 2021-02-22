<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(1)" style="background-color: #e2e4ff">
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="prop_metiers[m - 1].value" :label="prop_metiers[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="prop_metiers[m + 3].value" :label="prop_metiers[m + 3].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="prop_metiers[m + 7].value" :label="prop_metiers[m + 7].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
         <v-col xs="6" sm="3" class="margin-v-col-accueil">
            <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="prop_metiers[m + 11].value" :label="prop_metiers[m + 11].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {CheckboxesProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

@Component
export default class Metiers extends Mixins(GlobalPropertiesMixin) {
   //Prop passée par le parent
   @Prop({required: true}) prop_metiers: Array<CheckboxesProvider>;

   //Events
   private eventOnArrayCheckboxes(): void {
      this.$store.commit('setBlocPcpMetiersArrayMetiers', this.prop_metiers);
      this.$store.commit('setBlocPcpMetiersStringList', this.prop_metiers);
   }
}
</script>
