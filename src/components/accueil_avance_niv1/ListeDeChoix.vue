<template>
   <v-container class="ma-0 pa-0 outlined-app">
      <v-row :align="getVerticalAlignValue(1)">
         <v-col cols="4">Ajouter un bloc de recherche</v-col>
         <v-col cols="8"><v-select dense outlined :items="items" label="Choisissez votre bloc de recherche" style="margin: 0.5em 0.5em -1.1em 0" v-model="panelSelected" @change="updatePanel()"></v-select></v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {PanelProvider} from '@/store/interfaces/PanelInterfaces';

@Component
export default class ListeDeChoix extends Mixins(GlobalPropertiesMixin) {
   panelSelected: string;
   items: Array<PanelProvider>;

   constructor() {
      super();
      this.items = this.getPanel;
      this.panelSelected = '';
      console.log(this.items);
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel.filter((x: { displayed: boolean; }) => !x.displayed);
   }

   updatePanel() {
      switch (this.panelSelected) {
         case 'PPN':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'PPN');
            break;
         case 'ISSN':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'ISSN');
            break;
      }
   }
}
</script>

<style scoped></style>
