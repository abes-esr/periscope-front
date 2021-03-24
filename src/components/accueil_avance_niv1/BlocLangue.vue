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
                     <v-col xs="12" sm="4" lg="3"> Recherche par Langue </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || langueEntered.length === 0" key="0"> Selectionnez des langues </span>
                           <span v-else key="1"> {{ getLangueEntered + ' | Entre les langues: ' + getInternalOperatorSelectedInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-combobox @change="updateArrayBlocLangue" v-model="langueEntered" :items="langueItems" multiple outlined label="tapez une langue (optionnel)" class="style2" placeholder="langue à saisir">
                        <template v-slot:selection="{attrs, item, selected}">
                           <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                              <span class="pr-2">
                                 {{ item.text }}
                              </span>
                              <v-icon small @click="removeItemLangue(item)">x</v-icon>
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
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('LANG')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('LANG')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('LANG')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {CheckboxesProvider, Ensemble, ListProvider, OperatorProvider} from '@/store/interfaces/BlocInterfaces';

@Component
export default class ComponentLangue extends Vue {
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   langueItems: Array<ListProvider>;
   langueEntered: Array<string>;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre Langues';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.langueItems = this.getLangueItems;
      this.langueEntered = this.getLangueEntered;
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocLangue._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocLangue._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocLangue._internalBlocOperator;
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
      return this.$store.state.blocLangue._externalBlocOperator;
   }
   get isFirstElement(): boolean {
      return this.$store.getters.isFirstElement('LANG');
   }
   get getLangueItems(): Array<ListProvider> {
      return this.$store.state.blocLangue._langueListe;
   }
   get getLangueEntered(): Array<string> {
      return this.$store.state.blocLangue._languesEntered;
   }

   removeItemLangue(item: string): void {
      const index: number = this.langueEntered.indexOf(item);
      if (index > -1) {
         this.langueEntered.splice(index, 1);
         this.$store.dispatch('blocLangueLanguesEnteredAction', this.langueEntered);
      }
   }

   updateArrayBlocLangue(): void {
      this.$store.dispatch('blocLangueLanguesEnteredAction', this.langueEntered);
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('blocLangueExternalOperatorAction$', this.external_operator_selected);
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('blocLangueInternalOperatorAction', this.internal_operator_selected);
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
      this.langueEntered = [];
      this.$store.dispatch('blocLangueLanguesEnteredAction', this.langueEntered);
   }
}
</script>
