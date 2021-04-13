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
                     <v-col xs="12" sm="4" lg="3"> Recherche par Pays </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || getPaysEntered.length === 0" key="0"> Selectionnez des pays </span>
                           <span v-else key="1"> {{ getPaysEntered + ' | Entre les pays: ' + getInternalOperatorSelectedInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-combobox @change="updateArrayBlocPays" v-model="paysEntered" :items="paysItems" multiple outlined label="tapez un pays (optionnel)" class="style2" placeholder="pays à saisir">
                        <template v-slot:selection="{attrs, item, selected}">
                           <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                              <span class="pr-2">
                                 {{ item.text }}
                              </span>
                              <v-icon small @click="removeItemPays(item)">x</v-icon>
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
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('COUNTRY')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('COUNTRY')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('COUNTRY')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Ensemble, ListProvider, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component
export default class ComponentPays extends Vue {
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   paysItems: Array<ListProvider>; //Bloc Pays
   paysEntered: Array<string>;
   paysExternalBlocOperatorListToSelect: Array<OperatorProvider>;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre Pays';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.paysItems = this.getPaysItems;
      this.paysEntered = this.getPaysEntered;
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPays._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPays._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocPays._internalBlocOperator;
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
      return this.$store.state.blocPays._externalBlocOperator;
   }
   get isFirstElement(): boolean {
      return this.$store.getters.isFirstElement('COUNTRY');
   }
   get getPaysItems(): Array<ListProvider> {
      return this.$store.state.blocPays._candidates;
   }
   get getPaysEntered(): Array<string> {
      return this.$store.state.blocPays._selected;
   }

   removeItemPays(item: string): void {
      const index: number = this.paysEntered.indexOf(item);
      if (index > -1) {
         this.paysEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedPays', this.paysEntered).catch((err) => {
            Logger.error(err);
         });
      }
   }
   updateArrayBlocPays(): void {
      this.$store.dispatch('updateSelectedPays', this.paysEntered).catch((err) => {
         Logger.error(err);
      });
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPaysOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPaysOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   //Events v-btn
   closePanel(element: string) {
      this.$store.dispatch('switchElementPanelBooleanAtFalseMutation', element).catch((err) => {
         Logger.error(err);
      });
   }
   moveUpPanel(element: string) {
      this.$store.dispatch('moveUpElementPanelAction', element).catch((err) => {
         Logger.error(err);
      });
   }
   moveDownPanel(element: string) {
      this.$store.dispatch('moveDownElementPanelAction', element).catch((err) => {
         Logger.error(err);
      });
   }
   clearBloc() {
      this.paysEntered = [];
      this.$store.dispatch('updateSelectedPays', this.paysEntered).catch((err) => {
         Logger.error(err);
      });
   }
}
</script>
