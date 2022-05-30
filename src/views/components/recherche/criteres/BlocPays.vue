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
                           <v-autocomplete @change="updatePays" v-model="paysEntered" :items="paysItems" multiple @input="searchInput = null" :search-input.sync="searchInput" item-text="text" item-value="id" label="rechercher un pays" class="style2" placeholder="pays à saisir" v-on="on">
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
                     <!--Internal BlocOperator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="updateBlocInternalOperator" v-on="on"></v-select>
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
import {Operator, ListItem, BlocOperator} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {
   AvailableSwitch,
   DisplaySwitch,
   Movement,
   PanelAvailableSwitchProvider,
   PanelDisplaySwitchProvider,
   PanelMovementProvider,
   PanelType,
} from '@/store/composant/ComposantDefinition';
import {ValueError} from '@/exception/ValueError';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';

@Component
export default class ComponentPays extends Vue {
   id: PanelType = PanelType.COUNTRY;
   external_operator_label: string;
   internal_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   list_internal_operator_to_select: Array<BlocOperator>;
   external_operator_selected: Operator;
   internal_operator_selected: Operator;
   paysItems: Array<ListItem>; //Bloc Pays
   paysEntered: Array<string>;
   paysExternalBlocOperatorListToSelect: Array<BlocOperator>;
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

   /**
    * Retourne les opérateurs externes à sélectionner
    * @return Liste des opérateurs externes
    */
   get getExternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPays._externalBlocOperatorListToSelect;
   }

   /**
    * Retourne les opérateurs internes à sélectionner
    * @return Liste des opérateurs internes
    */
   get getInternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPays._internalBlocOperatorListToSelect;
   }

   /**
    * Retourne l'opérateur interne du bloc sélectionné
    * @return L'opérateur interne
    */
   get getInternalOperatorSelected(): Operator {
      return this.$store.state.blocPays._internalBlocOperator;
   }

   /**
    * Retourne l'opérateur externe du bloc sélectionné
    * @return L'opérateur externe
    */
   get getExternalOperatorSelected(): Operator {
      return this.$store.state.blocPays._externalBlocOperator;
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
    * Retourne les pays candidats
    * @return Liste des pays
    */
   get getPaysItems(): Array<ListItem> {
      return this.$store.state.blocPays._candidates;
   }

   /**
    * Retourne les pays sélectionnées
    * @return Liste des pays
    */
   get getPaysEntered(): Array<string> {
      return this.$store.state.blocPays._selected;
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
      this.$store.dispatch('resetBlocPays').catch((err) => {
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
      this.paysItems = this.getPaysItems;
      this.paysEntered = this.getPaysEntered;
   }

   /**
    * Mise à jour des pays sélectionées
    */
   updateSelectedPays(): void {
      this.$store.dispatch('updateSelectedPays', this.paysItems).catch((err) => {
         Logger.error(err);
      });
   }

   /******************** Events ***************************/

   /**
    * Mise à jour de l'opérateur externe du bloc
    */
   updateBlocExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPaysOperator', this.external_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Mise à jour de l'opérateur interne du bloc
    */
   updateBlocInternalOperator(): void {
      this.$store.dispatch('updateSelectedInternalPaysOperator', this.internal_operator_selected).catch((err) => {
         Logger.error(err);
      });
   }

   /**
    * Supprime un pays de la sélection
    * @param value Pays à supprimer
    * @throws ValueError si le pays n'a pas été trouvé
    */
   removeItemPays(value: ListItem): void {
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
      this.updateSelectedPays();
   }

   /**
    * Mise à jour des pays sélectionnés
    */
   updatePays(items: Array<string>): void {
     this.paysItems.forEach((v) => {
       v.value = false;
     })
      for (let value of items) {
         const index = this.paysItems.findIndex((x) => x.id === value);
         if (index == -1) {
            throw new ValueError('Country ' + value + ' not found');
         }
         this.paysItems[index].value = true;
      }
      this.updateSelectedPays();
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
