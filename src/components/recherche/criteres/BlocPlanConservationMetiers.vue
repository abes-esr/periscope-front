<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row align="center">
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
                     <v-col xs="12" sm="4" lg="3"> Recherche par PCP Métiers </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || getMetiersChecked.length === 0" key="0"> Selectionnez des plans de conservations Métiers </span>
                           <span v-else key="1"> {{ getMetiersChecked + ' | Entre Plans de conservation métiers : ' + getInternalOperatorSelectedInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-row justify="center">
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m - 1].value" :label="metiers[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m + 3].value" :label="metiers[m + 3].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 4" :key="m" v-model="metiers[m + 7].value" :label="metiers[m + 7].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="metiers[m + 11].value" :label="metiers[m + 11].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                     </v-row>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les plans de conservation entre eux</span>
                     </v-tooltip>

                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-btn small icon class="ma-0" fab color="teal" @click="selectAll()" v-on="on">
                              <v-icon>mdi-checkbox-multiple-marked-outline</v-icon>
                           </v-btn>
                        </template>
                        <span>Selection / Déselection tous les plans de conservation</span>
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
import {Component, Vue} from 'vue-property-decorator';
import {CheckboxesProvider, Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, Movement, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/recherche/ComposantInterfaces';

@Component
export default class ComponentPlanConservationMetiers extends Vue {
   id: PanelType = PanelType.METIERS;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   metiers: Array<CheckboxesProvider>;
   switchAllSelected: boolean;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre PCP Metiers';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.metiers = this.getMetiers;
      this.switchAllSelected = false;
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPcpMetiers._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPcpMetiers._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocPcpMetiers._internalBlocOperator;
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
      return this.$store.state.blocPcpMetiers._externalBlocOperator;
   }
   get getMetiers(): Array<CheckboxesProvider> {
      let arrayReturned = this.$store.state.blocPcpMetiers._candidates;
      if (arrayReturned.length === 0) {
         Logger.warn('Pcp region are empty');
      }
      return arrayReturned;
   }
   get getMetiersChecked(): Array<CheckboxesProvider> {
      return this.$store.getters.getCurrentArrayPcpMetiersElementsChecked;
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

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store.dispatch('updateSelectedPcpMetiers', this.metiers).catch((err) => {
         Logger.error(err);
      });
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPcpMetiersOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPcpMetiersOperator', this.internal_operator_selected).catch((err) => {
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
   selectAll(): void {
      if (this.switchAllSelected) {
         this.switchAllSelected = false;
         this.metiers.forEach((x: CheckboxesProvider) => (x.value = false));
      } else {
         this.switchAllSelected = true;
         this.metiers.forEach((x: CheckboxesProvider) => (x.value = true));
      }
      this.$store.dispatch('updateSelectedPcpMetiers', this.metiers).catch((err) => {
         Logger.error(err);
      });
   }
   clearSelectedValues(): void {
      this.switchAllSelected = false;
      this.$store.dispatch('resetBlocPcpMetiers').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }

   reloadFromStore(): void {
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.metiers = this.getMetiers;
   }
}
</script>
