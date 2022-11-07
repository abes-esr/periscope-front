<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row align="center">
         <!--External BlocOperator-->
         <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="!isFirstDisplayedElement">
            <v-tooltip top max-width="20vw" open-delay="700">
               <template v-slot:activator="{on}">
                  <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="updateBlocExternalOperator" v-on="on"></v-select>
               </template>
               <span>Cet opérateur logique permet de connecter ce bloc de recherche avec le bloc préccédent</span>
            </v-tooltip>
         </v-col>
         <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="isFirstDisplayedElement"></v-col>
         <v-col xs="8" sm="8" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par PCP Régions </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || getRegionsChecked.length === 0" key="0"> Selectionnez des plans de conservations Régions </span>
                           <span v-else key="1">
                              {{ getRegionsChecked + ' | Entre Plans de conservation régions : ' + getInternalOperatorSelectedInString }}
                           </span>
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
                           <v-checkbox @change="updateCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m - 1].value" :label="regions[m - 1].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="updateCheckboxes()" v-for="m in 5" :key="m" v-model="regions[m + 4].value" :label="regions[m + 4].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="updateCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 9].value" :label="regions[m + 9].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                        <v-col xs="6" sm="3" class="margin-v-col-accueil">
                           <v-checkbox @change="updateCheckboxes()" v-for="m in 6" :key="m" v-model="regions[m + 15].value" :label="regions[m + 15].text" hide-details class="margin-v-checkbox-accueil"></v-checkbox>
                        </v-col>
                     </v-row>
                     <!--Internal BlocOperator-->
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="updateBlocInternalOperator" v-on="on"></v-select>
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
import {CheckboxItem, Operator, BlocOperator} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {AvailableSwitch, DisplaySwitch, Movement, PanelAvailableSwitchProvider, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

@Component
export default class ComponentPlanConservationRegions extends Vue {
   id: PanelType = PanelType.REGIONS;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   list_internal_operator_to_select: Array<BlocOperator>;
   external_operator_selected: Operator;
   internal_operator_selected: Operator;
   regions: Array<CheckboxItem>;
   switchAllSelected: boolean;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre PCP Regions';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.regions = this.getRegions;
      this.switchAllSelected = false;
   }

   /**
    * Retourne les opérateurs externes à sélectionner
    * @return Liste des opérateurs externes
    */
   get getExternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPcpRegions._externalBlocOperatorListToSelect;
   }

   /**
    * Retourne les opérateurs internes à sélectionner
    * @return Liste des opérateurs internes
    */
   get getInternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPcpRegions._internalBlocOperatorListToSelect;
   }

   /**
    * Retourne l'opérateur interne du bloc sélectionné
    * @return L'opérateur interne
    */
   get getInternalOperatorSelected(): Operator {
      return this.$store.state.blocPcpRegions._internalBlocOperator;
   }

   /**
    * Retourne l'opérateur externe du bloc sélectionné
    * @return L'opérateur externe
    */
   get getExternalOperatorSelected(): Operator {
      return this.$store.state.blocPcpRegions._externalBlocOperator;
   }

   /**
    * Retourne les PCP Régions candidats
    * @return Liste des PCP Régions
    */
   get getRegions(): Array<CheckboxItem> {
      let arrayReturned: Array<CheckboxItem> = this.$store.state.blocPcpRegions._candidates;
      if (arrayReturned.length === 0) {
         Logger.warn('Pcp region are empty');
      }
      return arrayReturned;
   }

   /**
    * Retourne les PCP Régions sélectionnées
    * @return Liste des PCP Régions
    */
   get getRegionsChecked(): Array<CheckboxItem> {
      return this.$store.getters.getCurrentArrayPcpRegionsElementsChecked;
   }

   /**
    * Vérifie si le bloc est le premier a être affiché
    * @return Vrai si le bloc est le premier a être affiché, Faux sinon
    */
   get isFirstDisplayedElement(): boolean {
      return this.$store.getters.isFirstDisplayedElement(this.id);
   }

   /**
    * Vérifie si le bloc est le dernier a être affiché
    * @return Vrai si le bloc est le dernier a être affiché, Faux sinon
    */
   get isLastDisplayedElement(): boolean {
      return this.$store.getters.isLastDisplayedElement(this.id);
   }

   /**
    * Vérifie si le bloc peut être remonté
    * @return Vrai si le bloc peut être remonté, Faux sinon
    */
   get isMoveUpAvailable(): boolean {
      return this.$store.getters.isMoveUpAvailable(this.id);
   }

   /**
    * Retourne l'opérateur interne sélectionné en chaîne de caractère
    * @return Chaîne de caractère de l'opérateur
    */
   get getInternalOperatorSelectedInString(): string {
      return BlocAbstract.convertBlocOperatorToLabel(this.internal_operator_selected);
   }

   /******************** Methods ***************************/

   /**
    * Réinitialisation des valeurs du bloc
    */
   clearSelectedValues(): void {
      this.switchAllSelected = false;
      this.$store.dispatch('resetBlocPcpRegions').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }

   /**
    * Chargement des valeurs depuis le store
    */
   reloadFromStore(): void {
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.regions = this.getRegions;
   }

   /******************** Events ***************************/

   /**
    * Mise à jour de l'opérateur externe du bloc
    */
   updateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPcpRegionsOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Mise à jour de l'opérateur interne du bloc
    */
   updateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPcpRegionsOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Mise à jour des PCP Régions sélectionnés
    */
   updateCheckboxes(): void {
      this.$store.dispatch('updateSelectedPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Sélectionne /Dé-sélectionne tout
    */
   selectAll(): void {
      if (this.switchAllSelected) {
         this.switchAllSelected = false;
         this.regions.forEach((x: CheckboxItem) => (x.value = false));
      } else {
         this.switchAllSelected = true;
         this.regions.forEach((x: CheckboxItem) => (x.value = true));
      }
      this.$store.dispatch('updateSelectedPcpRegions', this.regions).catch((err) => {
         Logger.error(err);
      });
   }

   /******************** Panel Events ***************************/

   /**
    * Supprime le panneau de recherche
    */
   removePanel(): void {
      this.clearSelectedValues();
      const action: PanelDisplaySwitchProvider = {
         panelId: this.id,
         value: DisplaySwitch.OFF,
      };
      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      const actionAvailable: PanelAvailableSwitchProvider = {
         panelId: this.id,
         value: AvailableSwitch.OFF,
      };
      this.$store.dispatch('switchElementAvailablePanel', actionAvailable).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }

   /**
    * Remonte le panneau
    */
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
   /**
    * Descendre le panneau
    */
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
}
</script>
