<template>
   <v-container class="ma-0 pa-0 outlined-app">
      <v-row :align="getVerticalAlignValue(1)">
         <v-col cols="4">Ajouter un bloc de recherche </v-col>
         <v-col cols="8"><v-select dense outlined :items="items" item-value="id" item-text="label" label="Choisissez votre bloc de recherche" style="margin: 0.5em 0.5em -1.1em 0" v-model="panelSelected" @change="updatePanel()"></v-select></v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';
import {
  DisplaySwitch,
  PanelDisplaySwitchProvider,
  PanelProvider,
  PanelType
} from '@/store/recherche/ComposantInterfaces';

@Component
export default class ListeDeChoix extends Mixins(GlobalPropertiesMixin) {
   panelSelected: PanelType;
   items: Array<PanelProvider>;

   constructor() {
      super();
      this.items = this.getPanel;
      this.panelSelected = PanelType.REGIONS;
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel.filter((x: {displayed: boolean}) => !x.displayed);
   }

   updatePanel() {
      const action: PanelDisplaySwitchProvider = {
         panelId: this.panelSelected,
         value: DisplaySwitch.ON,
      };

      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>

<style scoped></style>
