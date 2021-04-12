<template>
   <v-expansion-panel class="outlined-app" style="padding: 0.5em 0.5em 0.5em 0.5em">
      <v-row :align="getVerticalAlignValue(1)">
         <!--External Operator-->
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em" v-if="!isFirstElement">
            <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="eventUpdateBlocExternalOperator"></v-select>
         </v-col>
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em" v-if="isFirstElement"></v-col>
         <v-col xs="8" sm="8" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par ISSN </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || comboboxArrayTyped.length === 0" key="0"> Saisissez des n° d'ISSN </span>
                           <span v-else key="1"> {{ returnItem() + ' | Entre ISSN: ' + getInternalOperatorSelectedInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row :justify="getHorizontalJustifyValue(1)" style="height: 20em">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-combobox @change="addItem" @blur="addItem" @keyup.enter="addItem" :rules="comboboxAlert" multiple outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="comboboxArrayTyped">
                        <template v-slot:selection="{item}">
                           <v-chip close @click:close="removeItem(item)">
                              <span class="pr-2">{{ item }}</span>
                           </v-chip>
                        </template>
                     </v-combobox>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em">
                     <v-select disabled dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator"></v-select>
                  </v-col>
               </v-row>
               <v-alert dense outlined type="warning"> Au dela de <strong>15 ISSN</strong>, nous vous recommandons pour des raisons d'affichage de <strong>charger une liste d'ISSN</strong> </v-alert>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal" @click="clearBloc()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('ISSN')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('ISSN')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('ISSN')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';

@Component
export default class ComponentIssn extends Mixins(GlobalPropertiesMixin) {
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   comboboxAlert: Array<string> = [];
   comboboxLabel: string;
   comboboxPlaceholder: string;
   comboboxArrayTyped: Array<string> = [];

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre Issn';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.comboboxArrayTyped = this.getComboboxArrayTyped;
      this.comboboxLabel = 'ISSN saisis';
      this.comboboxPlaceholder = "Saisir des n° d'ISSN";
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocIssn._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocIssn._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocIssn._internalBlocOperator;
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
      return this.$store.state.blocIssn._externalBlocOperator;
   }
   get getComboboxArrayTyped(): Array<string> {
      return this.$store.state.blocIssn._issnListString;
   }
   get isFirstElement(): boolean {
      return this.$store.getters.isFirstElement('ISSN');
   }

   //Events v-combobox
   private addItem(): void {
      if (this.comboboxArrayTyped.length !== 0) {
         const lastElement: string = this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1];
         if (lastElement.match('^\\d{4}-\\d{4}$')) {
            this.$store.dispatch('blocIssnListStringAction', this.comboboxArrayTyped);
            this.comboboxAlert = [];
         } else {
            this.removeItem(lastElement);
            this.comboboxAlert.push("L'ISSN est constitué de 4 chiffres suivis d'un - et de 4 chiffres");
         }
      }
   }

   private removeItem(item: string): void {
      const index: number = this.comboboxArrayTyped.indexOf(item);
      if (index > -1) {
         this.comboboxArrayTyped.splice(index, 1);
      }
   }

   private returnItem(): string {
      let chain = '';
      this.comboboxArrayTyped.forEach((element) => {
         chain += element + ', ';
      });
      return chain;
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('blocIssnExternalOperatorAction', this.external_operator_selected);
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('blocIssnInternalOperatorAction', this.internal_operator_selected);
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
      this.$store.dispatch('blocIssnListStringAction', []);
      this.comboboxArrayTyped = [];
   }
}
</script>
