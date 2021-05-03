<template>
   <v-container class="ma-0 pa-0 outlined-app">
      <v-row :align="getVerticalAlignValue(1)">
         <v-col cols="4">Ajouter un bloc de recherche </v-col>
         <v-col cols="8"><v-select dense outlined :items="items" item-value="id" item-text="label" label="Choisissez votre bloc de recherche" style="margin: 0.5em 0.5em -1.1em 0" v-model="panelSelected" @change="updatePanel()" @input="updatePanel"></v-select></v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {ValueError} from '@/store/exception/ValueError';

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
      const pannels = this.$store.state.composants._panel;

      /**
       * On vérifie affiche les choix selon les critères suivants :
       * - si la recherche par historique est selectionné alors on désactive tous les autres choix
       * - Si un autre choix est sélectionné alors on désactive la recherche par historique
       * - Si un choix est déjà selectionné alors on le désactive
       */
      const index = pannels.findIndex((x) => x.id === PanelType.HISTORY);
      if (index == -1 || pannels[index].available) {
         let i: number;
         i = 0;
         while (i < pannels.length && (pannels[i].available || !pannels[index].available)) {
            i++;
         }

         if (i >= pannels.length) {
            return pannels.filter((x: {available: boolean}) => x.available);
         } else {
            return pannels.filter((x: {id: PanelType; available: boolean}) => x.available && x.id != PanelType.HISTORY);
         }
      } else {
         return pannels.filter((x: {available: boolean}) => x.available);
      }
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

   updateList() {
      this.items = this.getPanel; // On update la liste de choix
   }
}
</script>

<style scoped></style>
