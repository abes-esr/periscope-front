<template>
   <v-container fluid>
      <v-row>
         <v-col>
            <v-container class="ma-0 pa-0 outlined-app" fluid>
               <v-row align="center">
                  <v-col cols="1" style="font-weight: bolder">Requetes Enregistrées</v-col>
                  <v-col cols="12">
                     <v-timeline dense>
                        <v-timeline-item v-for="(i, index) in requestsHistory" :key="index" small fill-dot>
                           <v-input>
                              <div class="requestHistoryWrapper">
                                 <h4>Critères</h4>
                                 <span class="requestHistoryItem" v-for="c in i.criteres" :key="c">{{ c.type }}</span>
                              </div>
                              <div class="requestHistoryWrapper">
                                 <h4>Tris</h4>
                                 <span v-if="i.tri.length === 0" class="requestHistoryItem">Aucun</span>
                                 <span class="requestHistoryItem" v-for="t in i.tri" :key="t">{{ t.sort }}</span>
                              </div>
                              <div class="requestHistoryItem">
                                 <h4>Requête JSON</h4>
                                 <span class="requestHistoryRequest">{{ i }}</span>
                              </div>
                              <v-tooltip top open-delay="700">
                                 <template v-slot:activator="{on}">
                                    <button type="button" v-clipboard:copy="JSON.stringify(i)" v-clipboard:success="onCopy" v-clipboard:error="onError" v-on="on">
                                       <v-icon color="#cf4a1a">mdi-content-paste </v-icon>
                                    </button>
                                 </template>
                                 <span>Copier dans le presse papier</span>
                              </v-tooltip>
                              <v-tooltip top open-delay="700">
                                 <template v-slot:activator="{on}">
                                    <v-btn icon color="#cf4a1a"  @click="restoreToSearchForm(JSON.stringify(i))" v-on="on"><v-icon>mdi-file-restore</v-icon></v-btn>
                                 </template>
                                 <span>Restaurer dans le formulaire de recherche</span>
                              </v-tooltip>
                           </v-input>
                        </v-timeline-item>
                     </v-timeline>
                  </v-col>
               </v-row>
            </v-container>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
           <v-container style="justify-content: end" fluid>
             <v-row justify="end">
               <v-btn @click="clearHistory()" color="#cf4a1a" dark large>Vider l'historique<v-icon dark right> mdi-cancel </v-icon></v-btn>
             </v-row>
           </v-container>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {JsonGlobalSearchRequest} from '@/service/periscope/PeriscopeJsonDefinition';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelType} from '@/store/composant/ComposantDefinition';
import {Logger} from '@/utils/Logger';

@Component
export default class HistoriqueRequetes extends Vue {
   requestsHistory: Array<JsonGlobalSearchRequest>;

   constructor() {
      super();
      this.requestsHistory = this.getHistoryRequests;
   }

   get getHistoryRequests(): Array<JsonGlobalSearchRequest> {
      if (localStorage.history) {
         //récupération en priorité de l'historique contenu dans le local storage
         return JSON.parse(localStorage.history).reverse();
      }
      return this.$store.state.blocRequeteDirecte._historyOfAllRequests.reverse();
   }

   restoreToSearchForm(jsonString: string): void {
      this.$store.dispatch('resetSearchForm').catch((err) => {
         Logger.error(err);
      });

      try {
         this.$store
            .dispatch('updateSelectedRequeteDirecte', jsonString)
            .then(() => {
               const action: PanelDisplaySwitchProvider = {
                  panelId: PanelType.HISTORY,
                  value: DisplaySwitch.ON,
               };
               this.$store.dispatch('switchElementPanel', action).catch((err) => {
                  Logger.error(err);
               });
               this.$store.dispatch('openInfoSnackBar', 'Requête restaurée avec succès').catch((err) => {
                  Logger.error(err);
               });
            })
            .catch((err) => {
               Logger.error(err);
               this.$store.dispatch('openErrorSnackBar', 'Impossible de restaurer la requête. \n Erreur : ' + err.message).catch((err) => {
                  Logger.error(err);
               });
            });
      } catch (err) {
         Logger.error(err.message);
      }
   }

   onCopy(): void {
      Logger.debug('Copy to clipboard successfull');
      this.$store.dispatch('openInfoSnackBar', 'Copy to clipboard successfull').catch((err) => {
         Logger.error(err);
      });
   }

   onError(): void {
      Logger.error('Copy to clipboard has failed');
      this.$store.dispatch('openErrorSnackBar', 'Copy to clipboard has failed').catch((err) => {
         Logger.error(err);
      });
   }

   clearHistory(): void {
      this.$store.dispatch('resetRequeteHistory').catch((err) => {
         Logger.error(err);
      });
      this.requestsHistory = this.getHistoryRequests;
      this.$store.dispatch('openInfoSnackBar', 'Historique vidé').catch((err) => {
         Logger.error(err);
      });
   }
}
</script>
