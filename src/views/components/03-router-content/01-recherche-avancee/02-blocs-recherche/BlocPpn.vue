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
                     <v-col xs="12" sm="4" lg="3"> Recherche par PPN </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || comboboxArrayTyped.length === 0" key="0"> Saisissez des n° de PPN </span>
                           <span v-else key="1">
                              {{ returnItem + ' | Entre PPN: ' + getInternalOperatorSelectedInString }}
                           </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center" style="height: 20em">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox :search-input.sync="currentValue" @keyup.enter="checkValues()" @blur="checkValues()" :rules="comboboxAlert" multiple outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="comboboxArrayTyped" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItem(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un numéro PPN puis valider avec la touche "Entrer". Vous pouvez saisir plusieurs numéros PPN à la suite ou copier/coller une liste de PPN. Attention, les doublons seront automatiquement ignorés</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <!--Internal BlocOperator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="updateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les PPN entre eux</span>
                     </v-tooltip></v-col
                  >
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
import {Operator, BlocOperator} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {AvailableSwitch, DisplaySwitch, Movement, PanelAvailableSwitchProvider, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ValueError} from '@/exception/ValueError';

@Component
export default class ComponentPpn extends Vue {
   id: PanelType = PanelType.PPN;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   list_internal_operator_to_select: Array<BlocOperator>;
   external_operator_selected: Operator;
   internal_operator_selected: Operator;
   comboboxAlert: Array<string> = [];
   comboboxLabel: string;
   comboboxPlaceholder: string;
   comboboxArrayTyped: Array<string> = [];
   currentValue: any;

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre PPN';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.comboboxArrayTyped = this.getPpnSelected;
      this.comboboxLabel = 'ex : 17877166X';
      this.comboboxPlaceholder = 'Saisir des n° de PPN';
      this.currentValue = null;
   }

   /**
    * Retourne les opérateurs externes à sélectionner
    * @return Liste des opérateurs externes
    */
   get getExternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPpn._externalBlocOperatorListToSelect;
   }

   /**
    * Retourne les opérateurs internes à sélectionner
    * @return Liste des opérateurs internes
    */
   get getInternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPpn._internalBlocOperatorListToSelect;
   }

   /**
    * Retourne l'opérateur interne du bloc sélectionné
    * @return L'opérateur interne
    */
   get getInternalOperatorSelected(): Operator {
      return this.$store.state.blocPpn._internalBlocOperator;
   }

   /**
    * Retourne l'opérateur externe du bloc sélectionné
    * @return L'opérateur externe
    */
   get getExternalOperatorSelected(): Operator {
      return this.$store.state.blocPpn._externalBlocOperator;
   }

   /**
    * Retourne les numéros PPN sélectionnés
    * @return Liste des numéros PPN sélectionnés
    */
   get getPpnSelected(): Array<string> {
      return this.$store.state.blocPpn._selected;
   }

   /**
    * Retourne les numéros PPN sélectionnés
    * @return Les numéros PPN sélectionnés séparés par des espaces
    */
   get returnItem(): string {
      let chain = '';
      this.comboboxArrayTyped.forEach((element) => {
         chain += element + ', ';
      });
      return chain;
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
      this.$store.dispatch('resetBlocPpn').catch((err) => {
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
      this.comboboxArrayTyped = this.getPpnSelected;
   }

   updateStore(): void {
      this.$store.dispatch('updateSelectedPpn', this.comboboxArrayTyped).catch((err) => {
         Logger.error(err);
      });
   }

   addItem(value: string): boolean {
      this.comboboxArrayTyped.push(value.trim());
      this.updateStore();
      return true;
   }

   /******************** Events ***************************/

   /**
    * Mise à jour de l'opérateur externe du bloc
    */
   updateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPpnOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Mise à jour de l'opérateur interne du bloc
    */
   updateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPpnOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Supprime un numéro PPN de la sélection
    * @param item Numéro PPN à supprimer
    * @throws ValueError si le numéro PPN n'a pas été trouvé
    */
   removeItem(item: string): void {
      const index: number = this.comboboxArrayTyped.indexOf(item);
      if (index == -1) {
         throw new ValueError('PPN ' + item + ' not found');
      }
      this.comboboxArrayTyped.splice(index, 1);
      this.updateStore();
   }

   /**
    * Vérifie la valeur courante
    */
   checkValues(): void {
      //Logger.debug('----- DEBUT CHECK VALUES -----');
      //Logger.debug(JSON.stringify('Search value BEFORE validation: ' + this.currentValue));
      //Logger.debug(JSON.stringify('Values BEFORE validation : ' + JSON.stringify(this.comboboxArrayTyped)));

      if (this.currentValue != null) {
         for (let value of this.currentValue.trim().split(/\s+/)) {
            if (value.trim().match('^\\d{8,9}X?$')) {
               if (this.addItem(value.trim())) {
                  this.comboboxAlert = [];
               } else {
                  //Logger.debug('------- BREAK --------');
                  return;
               }
            } else {
               this.currentValue = value;
               if (this.comboboxAlert.length === 0) {
                  this.comboboxAlert.push("Le PPN doit être constitué de 8 ou 9 chiffres suivis ou pas d'un X");
               }
               //Logger.debug('------- BREAK --------');
               return;
            }
         }
         if (this.comboboxAlert.length === 0) {
            this.currentValue = null;
         }
      } else if (this.comboboxArrayTyped.length !== 0) {
         this.currentValue = this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1];
         this.comboboxArrayTyped.pop();

         for (let value of this.currentValue.trim().split(/\s+/)) {
            if (value.trim().match('^\\d{8,9}X?$')) {
               if (this.addItem(value.trim())) {
                  this.comboboxAlert = [];
               } else {
                  //Logger.debug('------- BREAK --------');
                  return;
               }
            } else {
               this.currentValue = value;
               if (this.comboboxAlert.length === 0) {
                  this.comboboxAlert.push("Le PPN doit être constitué de 8 ou 9 chiffres suivis ou pas d'un X");
               }
               //Logger.debug('------- BREAK --------');
               return;
            }
         }
         if (this.comboboxAlert.length === 0) {
            this.currentValue = null;
         }
      } else if (this.currentValue == null || this.currentValue == undefined) {
         this.currentValue = null;
         this.comboboxAlert = [];
         this.updateStore();
      } else {
         if (this.comboboxAlert.length === 0) {
            this.comboboxAlert.push("Le PPN doit être constitué de 8 ou 9 chiffres suivis ou pas d'un X");
         }
      }
      //Logger.debug(JSON.stringify('Search value AFTER validation: ' + this.currentValue));
      //Logger.debug(JSON.stringify('Values AFTER validation : ' + JSON.stringify(this.comboboxArrayTyped)));
      //Logger.debug('----- FIN CHECK VALUES -----');
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
