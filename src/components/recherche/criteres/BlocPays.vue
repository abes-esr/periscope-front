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
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-autocomplete @change="updateArrayBlocPays" v-model="paysEntered" :items="paysItems" multiple @input="searchInput = null" :search-input.sync="searchInput" item-text="text" item-value="id" label="rechercher un pays" class="style2" placeholder="pays à saisir" v-on="on">
                              <template v-slot:selection="{attrs, item, selected}">
                                 <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                                    <span class="pr-2">
                                       {{ item.text }}
                                    </span>
                                    <v-icon small @click="removeItemPays(item)">x</v-icon>
                                 </v-chip>
                              </template>
                           </v-autocomplete>
                        </template>
                        <span>Rechercher un pays avec l'auto-complétion. Vous pouvez naviguer dans la liste avec les flèches haut et bas du clavier puis valider la sélection avec la touche "Entrer". Vous pouvez saisir plusieurs pays</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="2" class="internalOperator">
                     <!--Internal Operator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator" v-on="on"></v-select>
                        </template>
                        <span>Cet opérateur logique permet de connecter les pays entre eux</span>
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
import {Ensemble, ListProvider, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';
import {DisplaySwitch, Movement, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {ValueError} from '@/store/exception/ValueError';

@Component
export default class ComponentPays extends Vue {
   id: PanelType = PanelType.COUNTRY;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<OperatorProvider>;
   list_internal_operator_to_select: Array<OperatorProvider>;
   external_operator_selected: Ensemble;
   internal_operator_selected: Ensemble;
   paysItems: Array<ListProvider>; //Bloc Pays
   paysEntered: Array<string>;
   paysExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   searchInput = null; // Pour supprimer le texte saisie à la recherche

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
   get isFirstDisplayedElement(): boolean {
      return this.$store.getters.isFirstDisplayedElement(this.id);
   }
   get isLastDisplayedElement(): boolean {
      return this.$store.getters.isLastDisplayedElement(this.id);
   }
   get isMoveUpAvailable(): boolean {
      return this.$store.getters.isMoveUpAvailable(this.id);
   }
   get getPaysItems(): Array<ListProvider> {
      return this.$store.state.blocPays._candidates;
   }
   get getPaysEntered(): Array<string> {
      return this.$store.state.blocPays._selected;
   }

   removeItemPays(value: ListProvider): void {
      let index: number = this.paysEntered.indexOf(value.id);
      if (index == -1) {
         throw new ValueError('Country selected ' + value + ' not found');
      }
      this.paysEntered.splice(index, 1);

      index = this.paysItems.findIndex((x) => x.id === value.id);
      if (index == -1) {
         throw new ValueError('Country ' + value + ' not found');
      }
      this.paysItems[index].value = false;

      this.$store.dispatch('updateSelectedPays', this.paysItems).catch((err) => {
         Logger.error(err);
      });
   }
   updateArrayBlocPays(items: Array<string>): void {
      for (let value of items) {
         const index = this.paysItems.findIndex((x) => x.id === value);
         if (index == -1) {
            throw new ValueError('Country ' + value + ' not found');
         }
         this.paysItems[index].value = true;
      }
      this.$store.dispatch('updateSelectedPays', this.paysItems).catch((err) => {
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
      this.$store.dispatch('resetBlocPays').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }
   reloadFromStore(): void {
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.list_internal_operator_to_select = this.getInternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.internal_operator_selected = this.getInternalOperatorSelected;
      this.paysItems = this.getPaysItems;
      this.paysEntered = this.getPaysEntered;
   }
}
</script>
