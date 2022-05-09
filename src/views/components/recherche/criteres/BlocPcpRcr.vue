<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row align="center">
         <v-col xs="8" sm="8" lg="10">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="7"> Recherche par PCP et RCR d'un même exemplaire </v-col>
                     <v-col xs="12" sm="8" lg="4" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || (returnRcr === '' && returnPcp === '')" key="0"> Saisissez un PCP et un RCR </span>
                           <span v-else key="1">
                              <span v-if="returnPcp !== ''">{{ 'PCP : ' + returnPcp }}</span>
                              <span v-if="returnRcr !== '' && returnPcp !== ''"> & </span>
                              <span v-if="returnRcr !== ''">{{ 'RCR : ' + returnRcr }}</span>
                           </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="expansionPanelContent">
               <v-row justify="center">

                  <v-col sm="6">
                     <!--Internal BlocOperator-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @change="updatePcp" :items="pcp_liste" item-text="text" item-value="id" outlined small-chips :label="comboboxLabelPcp" class="style2" :placeholder="comboboxPcpPlaceholder" v-model="comboboxPcp" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItemPcp(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un code PCP. Vous ne pouvez saisir / sélectionner qu'un seul PCP</span>
                     </v-tooltip>
                  </v-col>
                  <v-col sm="6">
                     <!--Elements-->
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}">
                           <v-combobox @blur="checkValuesAndAddRcrs()" :items="rcr_liste" item-text="label" outlined small-chips :label="comboboxLabelRcr" class="style2" :placeholder="comboboxRcrPlaceholder" v-model="comboboxRcr" v-on="on">
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItemRcr(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
                        </template>
                        <span>Saisir un numéro de RCR. Vous ne pouvez saisir / sélectionner qu'un numéro de RCR ou copier/coller un numéro RCR</span>
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
import {BlocOperator, ListItem} from '@/store/recherche/BlocDefinition';
import {Logger} from '@/utils/Logger';
import {
   AvailableSwitch,
   DisplaySwitch,
   PanelAvailableSwitchProvider,
   PanelDisplaySwitchProvider,
   PanelType,
} from '@/store/composant/ComposantDefinition';
import {ValueError} from '@/exception/ValueError';
import PcpLibProfileService from '@/service/PcpLibProfileService';

@Component
export default class ComponentPcpRcr extends Vue {
   id: PanelType = PanelType.PCPRCR;
   external_operator_label: string;
   list_external_operator_to_select: Array<BlocOperator>;
   comboboxLabelRcr: string;
   comboboxLabelPcp: string;
   comboboxRcrPlaceholder: string;
   comboboxPcpPlaceholder: string;
   comboboxRcr: string;
   comboboxPcp: string;
   rcr_liste: Array<string> = [];
   rcrListLoad = false;
   pcp_liste: Array<ListItem> = [];
   currentValue: any;

   constructor() {
      super();
      this.external_operator_label = '';
      this.list_external_operator_to_select = this.getExternalOperatorList;
      this.comboboxRcr = this.getRcrSelected;
      this.comboboxPcp = this.getPcpSelected;
      this.comboboxLabelRcr = 'ex : 341725201';
      this.comboboxLabelPcp = 'ex : PCAq';
      this.comboboxRcrPlaceholder = 'Saisir un numéro Rcr';
      this.comboboxPcpPlaceholder = 'Choisir un Plan de conservation partagé';
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
    * Retourne le numéro rcr sauvegardé dans le store
    * @return numéro rcr du store
    */
   get getRcrSelected(): string {
      console.log('rcr : '+this.$store.state.blocPcpRcr._rcr);
      return this.$store.state.blocPcpRcr._rcr === undefined ? '' : this.$store.state.blocPcpRcr._rcr;
   }

   /**
    * Retourne le pcp sauvegardé dans le store
    * @return numéro pcp du store
    */
   get getPcpSelected(): string {
      console.log('pcp : '+this.$store.state.blocPcpRcr._pcp);
      return this.$store.state.blocPcpRcr._pcp === undefined ? '' : this.$store.state.blocPcpRcr._pcp;
   }

   get getPcp(): Array<ListItem> {
      return this.$store.state.blocPcpRcr._pcpCandidates.sort((p1: ListItem, p2: ListItem) => {
         if (p1.text.toUpperCase() > p2.text.toUpperCase()) {
            return 1;
         } else {
            return -1;
         }
      });
   }
   /**
    * Retourne le PCP sélectionné
    * @return Le PCP sélectionné
    */
   get returnPcp(): string {
      return this.comboboxPcp;
   }

   /**
    * Retourne le RCR sélectionné
    * @return le RCR sélectionné
    */
   get returnRcr(): string {
      return this.comboboxRcr;
   }

   /**
    * Vérifie la valeur courante
    */
   checkValuesAndAddRcrs(): void {
      // netoyage des données pour avoir que les rcrs
      if (this.comboboxRcr.split(' ')[0].match('^\\d{9}$')) {
         this.comboboxRcr = this.comboboxRcr.split(' ')[0];
      } else {
         this.comboboxRcr = '';
      }
      this.updateStoreRcr();
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

   updatePcp(item: ListItem): void {
      this.comboboxPcp = item.id;
      this.updateStorePcp();
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
      this.comboboxRcr = this.getRcrSelected;
      this.comboboxPcp = this.getPcpSelected;
   }

   updateStoreRcr(): void {
      this.$store.dispatch('updateSelectedPcpRcrRcr', this.comboboxRcr).catch((err) => {
         Logger.error(err);
      });
   }
   updateStorePcp(): void {
      this.$store.dispatch('updateSelectedPcpRcrPcp', this.comboboxPcp).catch((err) => {
         Logger.error(err);
      });
   }

   setRcr(value: string): boolean {
      this.comboboxRcr = value.trim();
      this.updateStoreRcr();
      return true;
   }

   setPcp(value: string): boolean {
      this.comboboxPcp = value.trim();
      this.updateStorePcp();
      return true;
   }

   /******************** Events ***************************/

   /**
    * Supprime un numéro RCR de la sélection
    * @param item Numéro RCR à supprimer
    * @throws ValueError si le numéro RCR n'a pas été trouvé
    */
   removeItemRcr(item: string): void {
      this.comboboxRcr = '';
      this.updateStoreRcr();
   }

   /**
    * Supprime le PCP de la sélection
    * @param value pcp à supprimer
    * @throws ValueError si le numéro PCP n'a pas été trouvé
    */
   removeItemPcp(value: string): void {
      this.comboboxPcp = '';
      this.updateStorePcp();
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
}
</script>
