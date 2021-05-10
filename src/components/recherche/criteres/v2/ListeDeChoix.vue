<template>
   <v-container class="ma-0 pa-0 outlined-app" fluid>
      <v-row :align="getVerticalAlignValue(1)">
         <v-col cols="4">Ajouter un bloc de recherche </v-col>
         <v-col cols="6">
            <v-card class="d-flex flex-wrap" flat>
               <div v-for="item in items" :key="item.id">
                  <v-switch class="ma-4" v-model="item.displayed" :label="item.label" :value="item.displayed" :disabled="!item.available" @change="updatePanel(item.id, item.displayed)"></v-switch>
               </div>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelProvider, PanelType} from '@/store/recherche/ComposantInterfaces';

@Component
export default class ListeDeChoix extends Mixins(GlobalPropertiesMixin) {
   panelSelected: PanelType;
   items: Array<PanelProvider>;
   sortedItems: Array<PanelProvider>;

   constructor() {
      super();
      this.items = this.getPanel;
      this.panelSelected = PanelType.REGIONS;
   }

   get getPanel(): Array<PanelProvider> {
      // On fait une copie avant de trier par id
      return Array.prototype.slice.call(this.$store.state.composants._panel).sort((obj1: PanelProvider, obj2: PanelProvider) => {
         if (obj1.id > obj2.id) {
            return 1;
         }

         if (obj1.id < obj2.id) {
            return -1;
         }

         return 0;
      });
   }

   updatePanel(id: number, value: any): void {
      const action: PanelDisplaySwitchProvider = {
         panelId: id,
         value: value ? DisplaySwitch.ON : DisplaySwitch.OFF,
      };

      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }

   updateList(): void {
      this.items = this.getPanel; // On update la liste de choix
   }
}
</script>

<style scoped></style>
