<template>
   <v-container class="ma-0 pa-0 outlined-app">
      <v-row :align="getVerticalAlignValue(1)">
         <v-col cols="4"
            >Ajouter un bloc de recherche
            <v-btn small icon class="ma-0" fab color="teal" @click="clearAllBlocs()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
         </v-col>
         <v-col cols="8"><v-select dense outlined :items="labelsInList" label="Choisissez votre bloc de recherche" style="margin: 0.5em 0.5em -1.1em 0" v-model="panelSelected" @change="updatePanel()"></v-select></v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {PanelProvider} from '@/store/resultat/PanelInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component
export default class ListeDeChoix extends Mixins(GlobalPropertiesMixin) {
   panelSelected: string;
   items: Array<PanelProvider>;
   labelsInList: Array<string>;

   constructor() {
      super();
      this.items = this.getPanel;
      this.labelsInList = this.itemsLabelConverter(this.items);
      this.panelSelected = '';
   }

   get getPanel(): Array<PanelProvider> {
      return this.$store.state.composants._panel.filter((x: {displayed: boolean}) => !x.displayed);
   }

   itemsLabelConverter(array: Array<PanelProvider>): Array<string> {
      const arrayReturned: Array<string> = [];
      array.forEach((element: PanelProvider) => {
         arrayReturned.push(element.label);
      });
      return arrayReturned;
   }

   updatePanel() {
      switch (this.panelSelected) {
         case 'PPN':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'PPN').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'ISSN':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'ISSN').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'RCR':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'RCR').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'PCP Régions':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'REGIONS').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'PCP Métiers':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'METIERS').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'Mots du Titre':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'WORDS').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'Editeur':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'EDITOR').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'Langue':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'LANG').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'Pays':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'COUNTRY').catch((err) => {
               Logger.error(err);
            });
            break;
         case 'Requête enregistrée':
            this.$store.dispatch('switchElementPanelBooleanAtTrueAction', 'HISTORY').catch((err) => {
               Logger.error(err);
            });
            break;
      }
   }

   clearAllBlocs() {
      this.$store.dispatch('resetAllSelectedValue', []).catch((err) => {
         Logger.error(err);
      });
      this.$router.go(0);
   }
}
</script>

<style scoped></style>
