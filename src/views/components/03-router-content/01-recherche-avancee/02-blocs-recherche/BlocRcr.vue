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
                     <v-col xs="12" sm="4" lg="3"> Recherche par RCR </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || arrayRcrSelected.length === 0" key="0"> Saisissez des n° de RCR d'une Bibliothèque</span>
                           <span v-else key="1">
                              {{ returnItem + ' | Entre RCR: ' + getInternalOperatorSelectedInString }}
                           </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center" style="height: 20em">
                  <v-col sm="5">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-autocomplete @change="checkValuesAndAddItems()" :items="rcr_liste" item-text="text" item-value="id" :filter="customFilter" multiple outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="arrayRcrSelected" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItem(item.id)">
                                    <span class="pr-2">{{ item.id }}</span>
                                 </v-chip>
                              </template>
                           </v-autocomplete>
                        </template>
                        <span>Saisir un numéro de RCR. Vous pouvez saisir plusieurs numéros de RCR à la suite ou copier/coller une liste de numéro RCR</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="5">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @change="checkValuesAddItemsAndClearSpace" @focus="resetCopyPasteRcr" multiple outlined small-chips :label="comboboxLabelCopyPaste" class="style2" :placeholder="comboboxPlaceholderCopyPaste" v-model="arrayRcrCopierColler" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip>
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un numéro de RCR. Vous pouvez saisir plusieurs numéros de RCR à la suite ou copier/coller une liste de numéro RCR</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <!--Internal BlocOperator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="updateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les numéros de RCR entre eux</span>
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
import {Operator, BlocOperator, ListItem} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {AvailableSwitch, DisplaySwitch, Movement, PanelAvailableSwitchProvider, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {ValueError} from '@/exception/ValueError';

@Component
export default class ComponentRcr extends Vue {
   id: PanelType = PanelType.RCR;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   list_internal_operator_to_select: Array<BlocOperator>;
   external_operator_selected: Operator;
   internal_operator_selected: Operator;
   comboboxLabel: string;
   comboboxPlaceholder: string;
   comboboxLabelCopyPaste: string;
   comboboxPlaceholderCopyPaste: string;
   arrayRcrSelected: Array<string> = [];
   arrayRcrCopierColler: Array<string> = [];
   rcr_liste: Array<any> = [];

   constructor() {
      super();
      this.external_operator_label = '';
      this.internal_operator_label = 'Entre RCR';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.arrayRcrSelected = this.getRcrSelected;
      this.arrayRcrCopierColler = this.getRcrCopyPasteSelected;
      this.comboboxLabel = 'ex : 123456789';
      this.comboboxPlaceholder = 'Saisir des n° de RCR';
      this.comboboxLabelCopyPaste = 'Copier coller des n° de RCR avec comme séparateur un espace';
      this.comboboxPlaceholderCopyPaste = 'ex : 111111111 222222222 333333333';
      this.rcr_liste = this.getRcrs;
   }

   /**
    * Retourne les opérateurs externes à sélectionner
    * @return Liste des opérateurs externes
    */
   get getExternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocRcr._externalBlocOperatorListToSelect;
   }

   /**
    * Retourne les opérateurs internes à sélectionner
    * @return Liste des opérateurs internes
    */
   get getInternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocRcr._internalBlocOperatorListToSelect;
   }

   /**
    * Retourne l'opérateur interne du bloc sélectionné
    * @return L'opérateur interne
    */
   get getInternalOperatorSelected(): Operator {
      return this.$store.state.blocRcr._internalBlocOperator;
   }

   /**
    * Retourne l'opérateur externe du bloc sélectionné
    * @return L'opérateur externe
    */
   get getExternalOperatorSelected(): Operator {
      return this.$store.state.blocRcr._externalBlocOperator;
   }

   /**
    * Retourne les numéros RCR sélectionnés
    * @return Liste des numéros RCR sélectionnés
    */
   get getRcrSelected(): Array<string> {
      return this.$store.state.blocRcr._selected;
   }

   /**
    * Retourne les numéros RCR sélectionnés dans copy paste
    * @return Liste des numéros RCR sélectionnés
    */
   get getRcrCopyPasteSelected(): Array<string> {
      return this.$store.state.blocRcr._selectedCopyPasteRcr;
   }

   get getRcrs(): Array<ListItem> {
      return this.$store.state.blocRcr._candidates;
   }

   /**
    * Retourne les numéros RCR sélectionnés
    * @return Les numéros RCR sélectionnés séparés par des espaces
    */
   get returnItem(): string {
      let chain = '';
      Array.from(new Set(this.arrayRcrSelected.concat(this.arrayRcrCopierColler))).forEach((element) => {
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

   updateStore(): void {
      this.$store.dispatch('updateSelectedRcr', this.arrayRcrSelected).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateSelectedRcrCopyPaste', this.arrayRcrCopierColler).catch((err) => {
         Logger.error(err);
      });
   }

   customFilter(item: ListItem, queryText: string): boolean {
      const textOne = item.text
         .toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '');
      const textTwo = item.value.toString();
      const searchText = queryText
         .toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '');
      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
   }

   /**
    * Réinitialisation des valeurs du bloc
    */
   clearSelectedValues(): void {
      this.$store.dispatch('resetBlocRcr').catch((err) => {
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
      this.arrayRcrSelected = this.getRcrSelected;
      this.arrayRcrCopierColler = this.getRcrCopyPasteSelected;
   }
   /******************** Events ***************************/

   /**
    * Mise à jour de l'opérateur externe du bloc
    */
   updateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalRcrOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Mise à jour de l'opérateur interne du bloc
    */
   updateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalRcrOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Supprime un numéro RCR de la sélection
    * @param item Numéro RCR à supprimer
    * @throws ValueError si le numéro RCR n'a pas été trouvé
    */
   removeItem(item: string): void {
      const index: number = this.arrayRcrSelected.indexOf(item);
      if (index == -1) {
         throw new ValueError('RCR ' + item + ' not found');
      }
      this.arrayRcrSelected.splice(index, 1);
      this.updateStore();
   }

   /**
    * Supprime un numéro RCR de la sélection copy paste
    * @param item Numéro RCR à supprimer
    * @throws ValueError si le numéro RCR n'a pas été trouvé
    */
   removeItemCopyPaste(item: string): void {
      const index: number = this.arrayRcrCopierColler.indexOf(item);
      if (index == -1) {
         throw new ValueError('RCR ' + item + ' not found');
      }
      this.arrayRcrCopierColler.splice(index, 1);
      this.updateStore();
   }

   /**
    * Vérifie la valeur courante
    */
   checkValuesAndAddItems(): void {
      // on enleve les doublons
      this.arrayRcrSelected = Array.from(new Set(this.arrayRcrSelected));

      this.updateStore();
   }

   /**
    * Vérifie la valeur courante
    */
   checkValuesAddItemsAndClearSpace(): void {
      // netoyage des données pour avoir que les rcrs
      this.arrayRcrCopierColler = this.arrayRcrCopierColler[0].split(' ').filter((el: string) => {
         return el.match('^\\d{9}$');
      });
      // on enleve les doublons
      this.arrayRcrCopierColler = Array.from(new Set(this.arrayRcrCopierColler));

      this.updateStore();
   }

   /**
    * reset  Copy Paste RCR
    */
   resetCopyPasteRcr(): void {
      this.arrayRcrCopierColler = [];
      this.updateStore();
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
