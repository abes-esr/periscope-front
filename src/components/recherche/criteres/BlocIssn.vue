<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row :align="getVerticalAlignValue(1)">
         <!--External Operator-->
         <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="!isFirstDisplayedElement">
            <v-tooltip top max-width="20vw" open-delay="700">
               <template v-slot:activator="{on}">
                  <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="eventUpdateBlocExternalOperator" v-on="on"></v-select>
               </template>
               <span>Cet opérateur logique permet de connecter ce bloc de recherche avec le bloc préccédent</span>
            </v-tooltip>
         </v-col>
         <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="isFirstDisplayedElement"></v-col>
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
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row :justify="getHorizontalJustifyValue(1)" style="height: 20em">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox
                              :search-input.sync="currentValue"
                              @keydown="checkValues"
                              @keyup="checkValues"
                              @blur="checkValues"
                              :rules="comboboxAlert"
                              multiple
                              outlined
                              small-chips
                              :label="comboboxLabel"
                              class="style2"
                              :placeholder="comboboxPlaceholder"
                              v-model="comboboxArrayTyped"
                              v-on="on"
                           >
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItem(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un numéro ISSN sous la forme XXXX-XXXX. Vous pouvez saisir plusieurs numéros ISSN à la suite ou copier/coller une liste de numéros ISSN</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <!--Internal Operator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les numéros ISSN entre eux</span>
                     </v-tooltip>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn small icon class="ma-0" fab color="teal" @click="clearSelectedValues()" v-on="on">
                     <v-icon>mdi-cancel</v-icon>
                  </v-btn>
               </template>
               <span>Réinitialiser le bloc</span>
            </v-tooltip>

            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn :disabled="!isMoveUpAvailable" small icon class="ma-0" fab color="teal" @click="moveUpPanel()" v-on="on">
                     <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
               </template>
               <span>Déplacer le bloc vers le haut</span>
            </v-tooltip>

            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn :disabled="isLastDisplayedElement" small icon class="ma-0" fab color="teal" @click="moveDownPanel()" v-on="on">
                     <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
               </template>
               <span>Déplacer le bloc vers le bas</span>
            </v-tooltip>

            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn small icon class="ma-0" fab color="red lighten-1" @click="removePanel()" v-on="on">
                     <v-icon>mdi-close</v-icon>
                  </v-btn>
               </template>
               <span>Supprimer le bloc</span>
            </v-tooltip>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, Movement, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/recherche/ComposantInterfaces';

@Component
export default class ComponentIssn extends Mixins(GlobalPropertiesMixin) {
   id: PanelType = PanelType.ISSN;
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
   currentValue: any;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre Issn';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.comboboxArrayTyped = this.getComboboxArrayTyped;
      this.comboboxLabel = 'ex : 1234-5678';
      this.comboboxPlaceholder = "Saisir des n° d'ISSN";
      this.currentValue = null;
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
      return this.$store.state.blocIssn._selected;
   }
   get isFirstDisplayedElement(): boolean {
      return this.$store.getters.isFirstDisplayedElement(this.id);
   }
   get isLastDisplayedElement(): boolean {
      return this.$store.getters.isLastDisplayedElement(this.id);
   }
   get isMoveUpAvailable(): boolean {
      return this.$store.getters.isMoveUpAvailable(this.id);
   }

   // Method
   private updateStore(): void {
      this.$store.dispatch('updateSelectedIssn', this.comboboxArrayTyped).catch((err) => {
         Logger.error(err);
      });
   }
   private addItem(value: string): boolean {
      this.comboboxArrayTyped.push(value.trim());
      this.updateStore();
      return true;
   }
   private removeItem(item: string): void {
      const index: number = this.comboboxArrayTyped.indexOf(item);
      if (index > -1) {
         this.comboboxArrayTyped.splice(index, 1);
      }
      this.updateStore();
   }

   private returnItem(): string {
      let chain = '';
      this.comboboxArrayTyped.forEach((element) => {
         chain += element + ', ';
      });
      return chain;
   }

   //Events v-combobox
   private checkValues(): void {
      //Logger.debug('----- DEBUT CHECK VALUES -----');
      //Logger.debug(JSON.stringify('Search value BEFORE validation: ' + this.currentValue));
      //Logger.debug(JSON.stringify('Values BEFORE validation : ' + JSON.stringify(this.comboboxArrayTyped)));

      if (this.currentValue != null) {
         for (let value of this.currentValue.trim().split(/\s+/)) {
            if (value.trim().match('^\\d{4}-\\d{4}$')) {
               if (this.addItem(value.trim())) {
                  this.comboboxAlert = [];
               } else {
                  //Logger.debug('------- BREAK --------');
                  return;
               }
            } else {
               this.currentValue = value;
               if (this.comboboxAlert.length === 0) {
                  this.comboboxAlert.push("L'ISSN doit être constitué de 4 chiffres suivis d'un - et de 4 chiffres : XXXX-XXXX");
               }
               //Logger.debug('------- BREAK --------');
               return;
            }
         }
         if (this.comboboxAlert.length === 0) {
            this.currentValue = null;
         }
      } else if (this.comboboxArrayTyped.length !== 0 && !this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1].match('^\\d{4}-\\d{4}$')) {
         this.currentValue = this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1];
         this.removeItem(this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1]);
         if (this.comboboxAlert.length === 0) {
            this.comboboxAlert.push("L'ISSN doit être constitué de 4 chiffres suivis d'un - et de 4 chiffres : XXXX-XXXX");
         }
      } else if (this.currentValue == null || (this.currentValue != null && this.currentValue.trim().length == 0)) {
         this.currentValue = null;
         this.comboboxAlert = [];
         this.updateStore();
      } else {
         if (this.comboboxAlert.length === 0) {
            this.comboboxAlert.push("L'ISSN doit être constitué de 4 chiffres suivis d'un - et de 4 chiffres : XXXX-XXXX");
         }
      }

      //Logger.debug(JSON.stringify('Search value AFTER validation: ' + this.currentValue));
      //Logger.debug(JSON.stringify('Values AFTER validation : ' + JSON.stringify(this.comboboxArrayTyped)));
      //Logger.debug('----- FIN CHECK VALUES -----');
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalIssnOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalIssnOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   //Events v-btn
   removePanel(): void {
      this.clearSelectedValues();
      const action: PanelDisplaySwitchProvider = {
         panelId: this.id,
         value: DisplaySwitch.OFF,
      };
      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
   moveUpPanel(): void {
      const action: PanelMovementProvider = {
         panelId: this.id,
         value: Movement.UP,
      };

      this.$store.dispatch('moveElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
   moveDownPanel(): void {
      const action: PanelMovementProvider = {
         panelId: this.id,
         value: Movement.DOWN,
      };
      this.$store.dispatch('moveElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
   clearSelectedValues(): void {
      this.$store.dispatch('resetBlocIssn').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }
   reloadFromStore(): void {
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.comboboxArrayTyped = this.getComboboxArrayTyped;
   }
}
</script>
