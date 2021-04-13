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
                     <v-col xs="12" sm="4" lg="3"> Recherche par PCP Régions </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || getRegionsChecked.length === 0" key="0"> Selectionnez des plans de conservations Régions </span>
                           <span v-else key="1"> {{ getRegionsChecked + ' | Entre Plans de conservation régions : ' + getInternalOperatorSelectedInString }} </span>
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
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m - 1].value" :label="regions[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m + 4].value" :label="regions[m + 4].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 9].value" :label="regions[m + 9].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="eventOnArrayCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 15].value" :label="regions[m + 15].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                     </v-row>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em">
                     <v-select disabled dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator"></v-select>
                     <v-btn small icon class="ma-0" fab color="teal" @click="selectAll()">
                        <v-icon>mdi-expand-all</v-icon>
                     </v-btn>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal" @click="clearBloc()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('REGIONS')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('REGIONS')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('REGIONS')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {CheckboxesProvider, Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component
export default class ComponentPlanConservationRegions extends Vue {
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   regions: Array<CheckboxesProvider>;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre PCP Regions';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.regions = this.getRegions;
   }

   get getExternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPcpRegions._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocPcpRegions._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocPcpRegions._internalBlocOperator;
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
      return this.$store.state.blocPcpRegions._externalBlocOperator;
   }
   get getRegions(): Array<CheckboxesProvider> {
      let arrayReturned: Array<CheckboxesProvider> = this.$store.state.blocPcpRegions._candidates;
      if (arrayReturned.length === 0) {
         Logger.warn('Pcp region are empty');
      }
      return arrayReturned;
   }
   get getRegionsChecked(): Array<CheckboxesProvider> {
      return this.$store.getters.getCurrentArrayPcpRegionsElementsChecked;
   }
   get isFirstElement(): boolean {
      return this.$store.getters.isFirstElement('PCPR');
   }

   //Events
   eventOnArrayCheckboxes(): void {
      this.$store.dispatch('updateCandidatesPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPcpRegionsOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPcpRegionsOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
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
   selectAll() {
      this.regions.forEach((x: CheckboxesProvider) => (x.value = true));
      this.$store.dispatch('updateCandidatesPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateSelectedPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }
   clearBloc() {
      this.regions.forEach((x: CheckboxesProvider) => (x.value = false));
      this.$store.dispatch('updateCandidatesPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateSelectedPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }
}
</script>
