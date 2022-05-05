<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row align="center">
         <v-col xs="8" sm="8" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par PCP et RCR d'un même exemplaire </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || comboboxArrayTyped.length === 0" key="0"> Saisissez un PCP et un RCR </span>
                           <span v-else key="1"> {{ 'PCP :' + returnPcp() + ' & RCR : ' + returnRcr() }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center" style="height: 20em">
                  <v-col sm="6">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @blur="checkValuesAndAddRcrs()" :rules="comboboxAlert" :items="rcr_liste" item-text="label" outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="comboboxArrayTyped" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItem(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un numéro de RCR. Vous ne pouvez saisir / sélectionner qu'un numéro de RCR ou copier/coller un numéro RCR</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="6">
                     <!--Internal BlocOperator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @blur="checkValuesAndAddPcps()" :rules="comboboxAlert" :items="pcp_liste" item-text="label" outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="comboboxArrayTyped" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItem(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un code PCP. Vous ne pouvez saisir / sélectionner qu'un seul PCP</span>
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
                  <v-btn :disabled="!isMoveUpAvailable" small icon class="ma-0" fab color="teal" v-on="on">
                     <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
               </template>
               <span>Déplacer le bloc vers le haut</span>
            </v-tooltip>

            <v-tooltip top open-delay="700">
               <template v-slot:activator="{on}">
                  <v-btn :disabled="isLastDisplayedElement" small icon class="ma-0" fab color="teal" v-on="on">
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
import {BlocOperator, ListItem, Operator} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {ValueError} from '@/exception/ValueError';
import PcpLibProfileService from '@/service/PcpLibProfileService';

@Component
export default class ComponentPpn extends Vue {
   id: PanelType = PanelType.PCPRCR;
   external_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   external_operator_selected: Operator;
   internal_operator_selected: Operator;
   comboboxAlert: Array<string> = [];
   comboboxLabel: string;
   comboboxPlaceholder: string;
   comboboxArrayTyped: Array<string> = [];
   rcr_liste: Array<any> = [];
   rcrListLoad = false;
   pcp_liste: Array<any> = [];
   currentValue: any;

   constructor() {
      super();
      this.external_operator_label = '';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.external_operator_selected = this.getExternalOperatorSelected;
      this.comboboxArrayTyped = this.getPpnSelected;
      this.comboboxLabel = 'ex : 17877166X';
      this.comboboxPlaceholder = 'Saisir des n° de PPN';
      this.currentValue = null;
      this.pcp_liste = this.getPcp;
      this.updateRcrList();
   }

   /**
    * Retourne les opérateurs externes à sélectionner
    * @return Liste des opérateurs externes
    */
   get getExternalOperatorList(): Array<BlocOperator> {
      return this.$store.state.blocPcpRcr._externalBlocOperatorListToSelect;
   }

   /**
    * Retourne l'opérateur externe du bloc sélectionné
    * @return L'opérateur externe
    */
   get getExternalOperatorSelected(): Operator {
      return this.$store.state.blocPcpRcr._externalBlocOperator;
   }

   /**
    * Retourne les numéros PPN sélectionnés
    * @return Liste des numéros PPN sélectionnés
    */
   get getPpnSelected(): Array<string> {
      return this.$store.state.blocPpn._selected;
   }

   get getPcp(): Array<ListItem> {
      let arrayPcp = this.$store.state.blocPcpRcr._pcpCandidates;
      if (arrayPcp.length === 0) {
         Logger.warn('Pcp region are empty');
      }
      return arrayPcp;
   }
   /**
    * Retourne les numéros PPN sélectionnés
    * @return Les numéros PPN sélectionnés séparés par des espaces
    */
   get returnPcp(): string {
      let chain = '';
      return chain;
   }

   get returnRcr(): string {
      let chain = '';
      return chain;
   }

   /**
    * Vérifie la valeur courante
    */
   checkValuesAndAddRcrs(): void {
      // netoyage des données pour avoir que les rcrs
      this.comboboxArrayTyped = this.comboboxArrayTyped
         .map((item) => {
            console.log(item);
            if (item.split(' ')[0].match('^\\d{9}$')) {
               item = item.split(' ')[0];
               console.log(item);
               return item;
            } else {
               this.removeItem(item);
               return '';
            }
         })
         .filter((value) => value != '');
   }

   checkValuesAndAddPcps(): void {}

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

   /******************** Methods ***************************/

   updateRcrList(): void {
      if (!this.rcrListLoad) {
         PcpLibProfileService.getRcrName().then((response) => {
            this.rcr_liste = [];
            response.data.forEach((element: {rcr: string; label: string}) => {
               this.rcr_liste.push(element.rcr + ' ' + element.label);
            });
            this.rcrListLoad = true;
         });
      }
   }

   /**
    * Réinitialisation des valeurs du bloc
    */
   clearSelectedValues(): void {
      this.$store.dispatch('resetBlocPcpRcr').catch((err) => {
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
      this.$emit('onChange'); // On notifie le composant parent
   }
}
</script>
