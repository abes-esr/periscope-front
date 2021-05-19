<template>
   <v-container>
      <v-row>
         <v-col>
            <component-header></component-header>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-stepper></component-stepper>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-container class="ma-0 pa-0 outlined-app">
               <v-row align="center">
                  <v-col cols="12">Requetes Enregistrées</v-col>
                  <v-col cols="12">
                     <div v-for="(i, index) in requestsHistory" :key="index">
                        <v-input
                           >{{ i }}
                           <v-tooltip top open-delay="700">
                              <template v-slot:activator="{on}">
                                 <button type="button" v-clipboard:copy="JSON.stringify(i)" v-clipboard:success="onCopy" v-clipboard:error="onError" v-on="on"><v-icon>mdi-content-paste </v-icon></button>
                              </template>
                              <span>Copier dans le presse papier</span>
                           </v-tooltip>
                           <v-tooltip top open-delay="700">
                              <template v-slot:activator="{on}">
                                 <v-btn icon @click="restoreToSearchForm(JSON.stringify(i))" v-on="on"><v-icon>mdi-file-restore</v-icon></v-btn>
                              </template>
                              <span>Restaurer dans le formulaire de recherche</span>
                           </v-tooltip>
                        </v-input>
                     </div>
                  </v-col>
               </v-row>
            </v-container>
         </v-col>
      </v-row>
      <v-row>
         <v-col xs="6" sm="3">
            <v-btn @click="clearHistory()" color="#E53935" dark large>Vider l'historique<v-icon dark right> mdi-cancel </v-icon></v-btn>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '../components/page/Header.vue';
import ComponentStepper from '../components/page/Stepper.vue';
import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component({
   components: {
      ComponentHeader,
      ComponentStepper,
   },
})
export default class HistoriqueRequetes extends Vue {
   requestsHistory: Array<JsonGlobalSearchRequest>;

   constructor() {
      super();
      this.requestsHistory = this.getHistoryRequests;
   }

   get getHistoryRequests(): Array<JsonGlobalSearchRequest> {
      return this.$store.state.blocRequeteDirecte._historyOfAllRequests.reverse();
   }

   restoreToSearchForm(jsonString: string): void {
      this.$store.dispatch('resetSearchForm').catch((err) => {
         Logger.error(err);
      });

      try {
         const json = JSON.parse(jsonString);
         //TODO test la conformité du JSON

         this.$store
            .dispatch('updateSelectedRequeteDirecte', json)
            .then(() => {
               const action: PanelDisplaySwitchProvider = {
                  panelId: PanelType.HISTORY,
                  value: DisplaySwitch.ON,
               };
               this.$store.dispatch('switchElementPanel', action).catch((err) => {
                  Logger.error(err);
               });
            })
            .catch((err) => {
               Logger.error(err);
            });
      } catch (err) {
         Logger.error(err.message);
      }
   }

   onCopy(): void {
      Logger.debug('Copy to clipboard successfull');
   }

   onError(): void {
      Logger.error('Copy to clipboard has failed');
   }

   clearHistory(): void {
      this.$store.dispatch('resetRequeteHistory').catch((err) => {
         Logger.error(err);
      });
      this.requestsHistory = this.getHistoryRequests;
   }
}
</script>

<style scoped></style>
