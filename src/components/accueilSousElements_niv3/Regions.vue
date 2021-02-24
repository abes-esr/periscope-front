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
import {Component, Mixins, Prop} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {CheckboxesProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';
@Component
export default class Regions extends Mixins(GlobalPropertiesMixin) {
   //Props passées par le parent
   @Prop({required: true}) prop_regions: Array<CheckboxesProvider>;

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store
         .dispatch('blocPcpRegionsArrayRegionsAction', this.prop_regions)
         .then(() => {
            setTimeout(() => {
               this.prop_regions = this.$store.state.blocPcpRegions.arrayRegions;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
      this.$store
         .dispatch('blocPcpRegionsArrayRegionsStringListAction', this.prop_regions)
         .then(() => {
            setTimeout(() => {
               this.prop_regions = this.$store.state.blocPcpRegions.arrayRegions;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }
}
</script>
