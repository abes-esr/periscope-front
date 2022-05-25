<template>
  <v-expansion-panel class="outlined-app blocPanel">
    <v-row align="center">
      <!--External BlocOperator-->
      <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="!isFirstDisplayedElement">
        <v-tooltip top max-width="20vw" open-delay="700">
          <template v-slot:activator="{on}">
            <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="updateBlocExternalOperator" v-on="on"></v-select>
          </template>
          <span>Cet opérateur logique permet de connecter ce bloc de recherche avec le bloc précédent</span>
        </v-tooltip>
      </v-col>
      <v-col xs="2" sm="2" lg="2" class="externalOperator" v-if="isFirstDisplayedElement"></v-col>
      <v-col xs="8" sm="8" lg="8">
        <v-expansion-panel-header>
          <template v-slot:default="{open}">
            <v-row no-gutters>
              <v-col xs="12" sm="4" lg="3"> Recherche par Statut Bibliothèque </v-col>
              <v-col xs="12" sm="8" lg="9" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open || getStatutSelected.length === 0" key="0"> Selectionnez des statuts </span>
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
                  <v-select dense :label="statutSelected" :items="statutItems" class="style1" outlined v-model="statutSelected" @change="updateSelectedStatuts" v-on="on"></v-select>
                </template>
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

@Component
export default class ComponentStatut extends Vue {
  id: PanelType = PanelType.STATUT;
  external_operator_label: string;
  list_external_operator_to_select: Array<BlocOperator>;
  external_operator_selected: Operator;
  statutItems: Array<ListItem>; //Bloc Statut
  statutSelected = '';
  statutExternalBlocOperatorListToSelect: Array<BlocOperator>;

  constructor() {
    super();
    this.external_operator_label = '';
    this.list_external_operator_to_select = this.getExternalOperatorList;
    this.external_operator_selected = this.getExternalOperatorSelected;
    this.statutItems = this.getStatutItems;
    this.statutSelected = this.getStatutSelected;
    console.log(this.statutSelected.length);
  }

  /**
   * Retourne les opérateurs externes à sélectionner
   * @return Liste des opérateurs externes
   */
  get getExternalOperatorList(): Array<BlocOperator> {
    return this.$store.state.blocStatutBibliotheque._externalBlocOperatorListToSelect;
  }

  /**
   * Retourne l'opérateur externe du bloc sélectionné
   * @return L'opérateur externe
   */
  get getExternalOperatorSelected(): Operator {
    return this.$store.state.blocStatutBibliotheque._externalBlocOperator;
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
   * Retourne les statuts candidats
   * @return Liste des statuts
   */
  get getStatutItems(): Array<ListItem> {
    return this.$store.state.blocStatutBibliotheque._candidates;
  }

  /**
   * Retourne le statut selectionné
   * @return Liste des statuts
   */
  get getStatutSelected(): string {
    return this.$store.state.blocStatutBibliotheque._selected;
  }

  /******************** Methods ***************************/

  /**
   * Réinitialisation des valeurs du bloc
   */
  clearSelectedValues(): void {
    this.$store.dispatch('resetBlocStatut').catch((err) => {
      Logger.error(err);
    });
    this.reloadFromStore();
  }

  /**
   * Chargement des valeurs depuis le store
   */
  reloadFromStore(): void {
    this.list_external_operator_to_select = this.getExternalOperatorList;
    this.external_operator_selected = this.getExternalOperatorSelected;
    this.statutItems = this.getStatutItems;
    this.statutSelected = this.getStatutSelected;
  }

  /**
   * Mise à jour des statuts sélectionés
   */
  updateSelectedStatuts(): void {
    this.$store.dispatch('updateSelectedStatutBibliotheque', this.statutItems).catch((err) => {
      Logger.error(err);
    });
  }

  /******************** Events ***************************/

  /**
   * Mise à jour de l'opérateur externe du bloc
   */
  updateBlocExternalOperator(): void {
    this.$store.dispatch('updateSelectedExternalStatutBibliothequeOperator', this.external_operator_selected).catch((err) => {
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
