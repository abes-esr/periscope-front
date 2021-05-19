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
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @change="eventUpdateBlocEditeur" @blur="eventUpdateBlocEditeur" @keyup.enter="eventUpdateBlocEditeur" multiple outlined small-chips label="ex : elsevier" class="style2" placeholder="ex : elsevier" v-model="editeurEntered" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItemEditeur(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un nom d'éditeur puis valider avec la touche "Entrer". Vous pouvez saisir plusieurs éditeurs. Attention, les doublons seront automatiquement ignorés</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <!--Internal Operator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les éditeurs entre eux</span>
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
import {Ensemble, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, Movement, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/recherche/ComposantInterfaces';

@Component
export default class ComponentEditeur extends Vue {
   id: PanelType = PanelType.EDITOR;
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
      return this.$store.state.blocEditeur._externalBlocOperatorListToSelect;
   }
   get getInternalOperatorList(): Array<OperatorProvider> {
      return this.$store.state.blocEditeur._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): Ensemble {
      return this.$store.state.blocEditeur._internalBlocOperator;
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
      return this.$store.state.blocEditeur._externalBlocOperator;
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

   get getEditeur(): Array<string> {
      return this.$store.state.blocEditeur._selected;
   }
   get getEditeurEnteredInString(): string {
      let editeursInString = '';
      this.$store.state.blocEditeur._selected.forEach((element: string) => {
         editeursInString += element + ' ';
      });
      return editeursInString;
   }

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalEditeurOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }
   eventUpdateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalEditeurOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   //Event combobox
   eventUpdateBlocEditeur(): void {
      this.$store.dispatch('updateSelectedEditeur', this.editeurEntered).catch((err) => {
         Logger.error(err);
      });
   }

   removeItemEditeur(item: string): void {
      const index: number = this.editeurEntered.indexOf(item);
      if (index > -1) {
         this.editeurEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedEditeur', this.editeurEntered).catch((err) => {
            Logger.error(err);
         });
      }
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
      this.$store.dispatch('resetBlocEditeur').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }
   reloadFromStore(): void {
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.editeurEntered = this.getEditeur;
   }
}
</script>
