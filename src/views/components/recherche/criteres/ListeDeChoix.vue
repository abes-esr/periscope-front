<template>
   <div>
     <div style="color: #2c2968; font-size: 1.2em; margin-bottom: 1em"><strong>Il est possible de sélectionner plusieurs blocs de recherche</strong> (sauf 'PCP & RCR')</div>
      <v-container class="ma-0 pa-0 outlined-app blocPanel" fluid>
         <v-row justify="center" align="center">
            <v-col v-for="item in items" :key="item.id">
               <v-card class="d-flex" flat>
                  <div >
                     <v-tooltip top max-width="20vw" open-delay="700">
                        <template v-slot:activator="{on}" >
                           <div v-on="on">
                              <v-switch class="ma-4" v-model="item.isDisplayed" :label="item.label" :value="item.isDisplayed" :disabled="!item.isAvailable" @change="updatePanel(item.id, item.isDisplayed)"></v-switch>
                           </div>
                        </template>
                        <span>Activer / Désactiver le bloc de recherche par {{ item.label }}</span>
                     </v-tooltip>
                  </div>
               </v-card>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Logger} from '@/utils/Logger';
import {AvailableSwitch, DisplaySwitch, PanelAvailableSwitchProvider, PanelDisplaySwitchProvider, PanelProvider, PanelType} from '@/store/composant/ComposantDefinition';

@Component
export default class ListeDeChoix extends Vue {
   panelSelected: PanelType;
   items: Array<PanelProvider>;
   sortedItems: Array<PanelProvider>;

   constructor() {
      super();
      this.items = this.getPanel;
      this.panelSelected = PanelType.REGIONS;
   }

   /**
    * Retourne la liste des panneaux de recherche
    * @return Liste des panneaux de recherche
    */
   get getPanel(): Array<PanelProvider> {
      // On fait une copie avant de trier par id pour conserver un ordre d'affichage constant séparé du store
      return Array.prototype.slice.call(this.$store.state.composants._panel).sort((obj1: PanelProvider, obj2: PanelProvider) => {
         if (obj1.id > obj2.id) {
            return 1;
         }

         if (obj1.id < obj2.id) {
            return -1;
         }

         return 0;
      });
   }

   /**
    * Mise à jour des panneaux de recherche
    * @param id Identifiant du panneau à mettre à jour
    * @param value Valeur d'affichage
    */
   updatePanel(id: number, value: any): void {
      if (!value) {
         switch (id) {
            case PanelType.PPN:
               this.$store.dispatch('resetBlocPpn').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.ISSN:
               this.$store.dispatch('resetBlocIssn').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.REGIONS:
               this.$store.dispatch('resetBlocPcpRegions').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.METIERS:
               this.$store.dispatch('resetBlocPcpMetiers').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.RCR:
               this.$store.dispatch('resetBlocRcr').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.COUNTRY:
               this.$store.dispatch('resetBlocPays').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.PCPRCR:
               this.$store.dispatch('resetBlocPcpRcr').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.LANG:
               this.$store.dispatch('resetBlocLangue').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.EDITOR:
               this.$store.dispatch('resetBlocEditeur').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.WORDS:
               this.$store.dispatch('resetBlocMotDuTitre').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.HISTORY:
               this.$store.dispatch('resetBlocRequeteDirecte').catch((err) => {
                  Logger.error(err);
               });
               break;
            case PanelType.STATUT:
               this.$store.dispatch('resetBlocStatut').catch((err) => {
                  Logger.error(err);
               });
               break;
         }
      }
      const action: PanelDisplaySwitchProvider = {
         panelId: id,
         value: value ? DisplaySwitch.ON : DisplaySwitch.OFF,
      };

      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });

      //isAvaialbe

      const actionAvailable: PanelAvailableSwitchProvider = {
         panelId: id,
         value: value ? AvailableSwitch.ON : AvailableSwitch.OFF,
      };

      //
      this.$store.dispatch('switchElementAvailablePanel', actionAvailable).catch((err) => {
         Logger.error(err);
      });

      this.$emit('onChange'); // On notifie le composant parent
   }

   /**
    * Mise à jour de la liste des panneaux de recherche
    */
   updateList(): void {
      this.items = this.getPanel;
   }
}
</script>
