<template>
   <v-container class="outlined-app">
      <v-container>
         <v-row>
            <v-col cols="1">
               <v-btn class="outlined-app" style="margin-top: -2em" outlined small @click.stop="drawer = !drawer"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
            </v-col>
            <v-col cols="1">
               <v-btn class="outlined-app" style="margin-top: -2em" outlined small @click="sortColumns"><v-icon>mdi-sync</v-icon>Tri</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn icon color="primary" style="margin-top: -1.8em" @click="previousPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
               <v-chip color="primary" outlined style="margin-top: -1.7em">
                  <v-icon left>mdi-file-document-outline</v-icon>
                  Notices n° {{ getCurrentPositionNoticesStartedDisplayed }} à {{ getCurrentPositionNoticesEndedDisplayed }} sur ?????
               </v-chip>
              <v-btn icon color="primary" style="margin-top: -1.8em" @click="nextPage"><v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-col>
            <v-col style="margin-top: -2em" cols="6">
               <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche approfondie" single-line hide-details></v-text-field>
            </v-col>
         </v-row>
      </v-container>
      <v-card style="margin-top: -0.5em">
         <v-data-table
            :custom-sort="customSort"
            :sort-by="orderLabels"
            :sort-desc="orderBooleans"
            dense
            multi-sort
            :search="search"
            :headers="headers"
            :items="notices"
            :loading="loading"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            v-model="selected"
            loading-text="Chargement des notices... veuillez patienter"
            item-key="ppn"
            show-select
            show-expand
            :items-per-page="getNumberOfNoticesAskedForNewCall"
            @update:items-per-page="getItemPerPage"
            :footer-props="{
               disablePagination: true,
               pageText: '',
               itemsPerPageText: 'nombre de notices affichées',
               itemsPerPageOptions: [25, 50, 250, 1000],
               showFirstLastPage: false,
               firstIcon: 'mdi-arrow-collapse-left',
               lastIcon: 'mdi-arrow-collapse-right',
               prevIcon: '',
               nextIcon: '',
            }"
         >
            <template v-slot:expanded-item="{item}">
               <td :colspan="headers.length" style="text-align: left; padding-left: 9em">
                  Complément de titre : {{ item.titleComplement }}<br />
                  Qualifieur de titre : {{ item.keyTitleQualifer }}<br />
                  Liste des établissements : {{ item.rcrList }}<br />
               </td>
            </template>
            <template v-slot:footer>
               <div style="position: absolute" class="pa-0 pt-4 pl-2 ml-16">
                  <span style="font-size: 0.9em">Exporter de la notice n° </span>
                  <label for="exportNumberStart"></label>
                  <input style="max-width: 3em" class="outlined-app" type="text" id="exportNumberStart" name="name" required minlength="4" maxlength="8" size="10" />
                  <span style="font-size: 0.9em"> à </span>
                  <label for="exportNumberEnd"></label>
                  <input style="max-width: 3em" class="outlined-app" type="text" id="exportNumberEnd" name="name" required minlength="4" maxlength="8" size="10" />
               </div>
            </template>
         </v-data-table>
      </v-card>
      <v-container>
         <v-row justify="end" align="center">
            <v-col cols="1">
               <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="previousPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="1">
               <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="nextPage"><v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-col>
           <v-col cols="1">
             <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="goToTopOfPage"><v-icon>mdi-arrow-up</v-icon></v-btn>
           </v-col>
         </v-row>
      </v-container>
      <v-navigation-drawer v-model="drawer" absolute temporary width="400">
         <v-expansion-panels accordion>
            <v-expansion-panel>
               <v-expansion-panel-header> Type </v-expansion-panel-header>
               <v-expansion-panel-content style="padding-left: 2em; margin-top: -0.5em">
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Périodiques"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Collections"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Blogs"></v-checkbox>
                  </v-row>
                  <v-row>
                     <v-checkbox label="Journaux"></v-checkbox>
                  </v-row>
               </v-expansion-panel-content>
            </v-expansion-panel>
           <v-expansion-panel>
             <v-expansion-panel-header> Support </v-expansion-panel-header>
             <v-expansion-panel-content style="padding-left: 2em; margin-top: -0.5em">
               <v-row style="max-height: 2em">
                 <v-checkbox label="Imprimé"></v-checkbox>
               </v-row>
               <v-row style="max-height: 2em">
                 <v-checkbox label="Electronique"></v-checkbox>
               </v-row>
               <v-row>
                 <v-checkbox label="Autre"></v-checkbox>
               </v-row>
             </v-expansion-panel-content>
           </v-expansion-panel>
         </v-expansion-panels>
        <v-btn block elevation="0">Réinitialiser les filtres</v-btn>
      </v-navigation-drawer>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ContentHeader, TableHeader} from '@/store/resultat/TableInterfaces';
import {Logger} from "@/store/utils/Logger";
//Permet de faire patienter un certain nombre de secondes avant l'exécution d'une fonction dans le code avec async await
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

@Component
export default class TableauResultats extends Vue {
   totalNotices = 0;
   headers: Array<TableHeader>;
   notices: Array<ContentHeader>;
   loading: boolean;
   singleExpand: false;
   singleSelect: boolean;
   expanded: [];
   selected: [];
   search: string;
   drawer: any;
   orderBooleans: Array<boolean>;
   orderLabels: Array<string>;
   numberOfNoticesAskedForNewCall: number;

   constructor() {
      super();
      Logger.debug("CTOR");
      this.totalNotices = 0;
      this.headers = this.getHeaders;
      this.notices = this.getNotices;
      this.loading = false;
      this.singleExpand = false;
      this.singleSelect = false;
      this.expanded = [];
      this.selected = [];
      this.search = '';
      this.drawer = null;
      this.orderBooleans = this.getOrderSortBooleans;
      this.orderLabels = this.getOrderSortLabels;
      this.numberOfNoticesAskedForNewCall = this.getNumberOfNoticesAskedForNewCall;
      Logger.debug(this.$store.getters.getRequestLaunchedToBackEnd);
   }

   get getOrderSortBooleans(): Array<boolean> {
      return this.$store.getters.orderSortArrayResultBooleanElements;
   }

   get getOrderSortLabels(): Array<string> {
      return this.$store.getters.orderSortArrayResultLabelElements;
   }

   get getHeaders(): Array<TableHeader> {
      return [
         {
            text: 'PPN',
            value: 'ppn',
         },
         {
            text: 'Type',
            value: 'continiousType',
         },
         {
            text: 'ISSN',
            value: 'issn',
         },
         {
            text: 'Titre',
            value: 'keyTitle',
         },
         {
            text: 'Editeur',
            value: 'editor',
         },
         {
            text: 'Date début',
            value: 'startDate',
         },
         {
            text: 'Date de fin',
            value: 'endDate',
         },
         {
            text: 'Code PCP',
            value: 'pcpList',
         },
         {
            text: 'Localisations',
            value: 'rcrLength',
         },
         {
            text: 'Lien sudoc',
            value: 'sudocLink',
         },
      ];
   }

   get getNotices(): Array<ContentHeader> {
      return this.$store.state.lotNotices._resultArrayContentNotices;
   }

   get getCurrentPositionNoticesStartedDisplayed(): number {
      return this.$store.getters.getCurrentPositionNoticesStartedDisplayed;
   }

   get getCurrentPositionNoticesEndedDisplayed(): number {
      return this.$store.getters.getCurrentPositionNoticesEndedDisplayed;
   }

   get getNumberOfNoticesAskedForNewCall(): number {
      return this.$store.state.pagination._sizeWanted;
   }

   //Lorsque l'utilisateur clique sur le bouton d'actualisation du tri
   sortColumns() {
      this.$store.dispatch('resetNoticesAndPaginationAction').catch(err => {Logger.error(err)});
      this.$store.dispatch('callPeriscopeAPI', 'current').catch(err => {Logger.error(err)});
   }

   previousPage() {
      this.$store.dispatch('previousPageDecrementPaginationAction').catch(err => {Logger.error(err)});
      this.$store.dispatch('callPeriscopeAPI', 'current').catch(err => {Logger.error(err)});
   }

   nextPage() {
      this.$store.dispatch('resetNoticesAction').catch(err => {Logger.error(err)});
      this.$store.dispatch('callPeriscopeAPI', 'current').catch(err => {Logger.error(err)});
   }

   goToTopOfPage(){
     scroll(0,0);
   }

   //Lorsque l'utilisateur modifie le nombre de résultats voulus par page
   getItemPerPage(val: number) {
      this.$store.dispatch('resetNoticesAndPaginationAction').catch(err => {Logger.error(err)});
      this.$store.dispatch('changeNumberOfElementsParPageAction', val).catch(err => {Logger.error(err)});
      this.$store.dispatch('callPeriscopeAPI', 'current').catch(err => {Logger.error(err)});
      this.numberOfNoticesAskedForNewCall = val;
   }

   customSort(items: Array<TableHeader>, index: Array<string>, isDesc: Array<boolean>) {
      const arrayToSentAtStore: Array<string> = [];
      for (let i = 0; i < index.length; i++) {
         arrayToSentAtStore.push(index[i]);
         if (!isDesc[i]) {
            arrayToSentAtStore.push('ASC');
         } else {
            arrayToSentAtStore.push('DESC');
         }
      }
      //Envoi des critères de tri dans le bloc de tri
      this.$store.dispatch('updateSelectedTri', arrayToSentAtStore);
      //Reconstruction du JSON à envoyer
      this.$store.dispatch('constructJsonAction');
      return items;
   }
}
</script>
