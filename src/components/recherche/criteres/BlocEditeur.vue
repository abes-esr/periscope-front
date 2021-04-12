<template>
   <v-expansion-panel class="outlined-app" style="padding: 0.5em 0.5em 0.5em 0.5em; margin: 0.5em 0 0.5em 0">
      <v-row align="center">
         <!--External Operator-->
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em" v-if="!isFirstElement">
            <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="eventUpdateBlocExternalOperator"></v-select>
         </v-col>
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em" v-if="isFirstElement"></v-col>
         <v-col xs="8" sm="8" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par Editeurs </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || getEditeurEnteredInString.length === 0" key="0"> Saisissez des éditeurs </span>
                           <span v-else key="1"> {{ getEditeurEnteredInString + ' | Entre les editeurs: ' + getInternalOperatorSelectedInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-combobox @change="eventUpdateBlocEditeur" @blur="eventUpdateBlocEditeur" @keyup.enter="eventUpdateBlocEditeur" multiple outlined small-chips label="Editeur" class="style2" placeholder="tapez un editeur (optionnel)" v-model="editeurEntered">
                        <template v-slot:selection="{item}">
                           <v-chip close @click:close="removeItemEditeur(item)">
                              <span class="pr-2">{{ item }}</span>
                           </v-chip>
                        </template>
                     </v-combobox>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em">
                     <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator"></v-select>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal" @click="clearBloc()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('EDITOR')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('EDITOR')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('EDITOR')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';

@Component
export default class ComponentEditeur extends Vue {
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   editeurEntered: Array<string>;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre editeurs';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.editeurEntered = this.getEditeur;
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocMotsDuTitre._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocMotsDuTitre._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocMotsDuTitre._internalBlocOperator;
   }
   get getInternalOperatorSelectedInString(): string {
      switch (this.internal_operator_selected) {
         case Ensemble.Et:
            return 'ET';
         case Ensemble.Ou:
            return 'OU';
         case Ensemble.Sauf:
            return 'SAUF';
         default:
            return 'NON DEFINI';
      }
   }
   get getExternalOperatorSelected(): Ensemble {
      return this.$store.state.blocMotsDuTitre._externalBlocOperator;
   }
   get isFirstElement(): boolean {
      return this.$store.getters.isFirstElement('EDITOR');
   }

   get getEditeur(): Array<string> {
      return this.$store.state.blocEditeur._editorsEntered;
   }
   get getEditeurEnteredInString(): string {
      let editeursInString = '';
      this.$store.state.blocEditeur._editorsEntered.forEach((element: string) => {
         editeursInString += element + ' ';
      });
      return editeursInString;
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('blocMotsDuTitreExternalOperatorAction', this.external_operator_selected);
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('blocMotsDuTitreInternalOperatorAction', this.internal_operator_selected);
   }

   //Event combobox
   eventUpdateBlocEditeur(): void {
      if (this.editeurEntered.length > 1) {
         this.editeurEntered.pop();
      }
      this.$store.dispatch('blocEditeurEditorEnteredAction', this.editeurEntered);
   }

   removeItemEditeur(item: string): void {
      const index: number = this.editeurEntered.indexOf(item);
      if (index > -1) {
         this.editeurEntered.splice(index, 1);
         this.$store.dispatch('blocEditeurEditorEnteredAction', this.editeurEntered);
      }
   }

   //Events v-btn
   closePanel(element: string) {
      this.$store.dispatch('switchElementPanelBooleanAtFalseMutation', element);
   }
   moveUpPanel(element: string) {
      this.$store.dispatch('moveUpElementPanelAction', element);
   }
   moveDownPanel(element: string) {
      this.$store.dispatch('moveDownElementPanelAction', element);
   }
   clearBloc() {
      this.editeurEntered = [];
      this.$store.dispatch('blocEditeurEditorEnteredAction', this.editeurEntered);
   }
}
</script>
