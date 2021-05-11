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
               <v-btn icon color="primary" style="margin-top: -1.8em" @click="previousPage" :disabled="isFirstPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
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
               <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="previousPage" :disabled="isFirstPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
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
import {TableHeader} from '@/store/resultat/TableInterfaces';
import {Logger} from '@/store/utils/Logger';
import {OrderType, TriInterface, TriType} from '@/store/recherche/TriInterface';
import Notice from '@/store/entity/Notice';

@Component
export default class TableauResultats extends Vue {
   totalNotices = 0;
   headers: Array<TableHeader>;
   notices: Array<Notice>;
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
   mappingLabelTri: {[key: string]: TriType} = {};

   constructor() {
      super();
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
      this.mappingLabelTri = this.getMappingLabel;
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
            value: TriType[TriType.ppn],
            sortable: true,
         },
         {
            text: 'Type',
            value: TriType[TriType.continiousType],
            sortable: true,
         },
         {
            text: 'ISSN',
            value: TriType[TriType.issn],
            sortable: true,
         },
         {
            text: 'Titre',
            value: TriType[TriType.keyTitle],
            sortable: true,
         },
         {
            text: 'Editeur',
            value: TriType[TriType.editor],
            sortable: true,
         },
         {
            text: 'Date début',
            value: TriType[TriType.startDate],
            sortable: true,
         },
         {
            text: 'Date de fin',
            value: TriType[TriType.endDate],
            sortable: true,
         },
         {
            text: 'Code PCP',
            value: TriType[TriType.pcpList],
            sortable: true,
         },
         {
            text: 'Localisations',
            value: TriType[TriType.nbLoc],
            sortable: true,
         },
         {
            text: 'Lien Sudoc',
            value: TriType[TriType.linkSudoc],
            sortable: false,
         },
      ];
   }

   get getMappingLabel(): {[key: string]: TriType} {
      return {
         ppn: TriType.ppn,
         continiousType: TriType.continiousType,
         issn: TriType.issn,
         keyTitle: TriType.keyTitle,
         editor: TriType.editor,
         startDate: TriType.startDate,
         endDate: TriType.endDate,
         pcpList: TriType.pcpList,
         nbLoc: TriType.nbLoc,
         linkSudoc: TriType.linkSudoc,
      };
   }

   get getNotices(): Array<Notice> {
      return this.$store.state.lotNotices._notices;
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
   get isFirstPage(): boolean {
      return this.$store.getters.isFirstPage();
   }
   get isLastPage(): boolean {
      return this.$store.getters.isLastPage();
   }

   //Lorsque l'utilisateur clique sur le bouton d'actualisation du tri
   async sortColumns(): Promise<boolean> {
      this.loading = true;
      this.$store.dispatch('resetPage').catch((err) => {
         Logger.error(err);
      });
      await this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            Logger.error(err);
         });

      return !this.loading;
   }

   async previousPage(): Promise<boolean> {
      this.loading = true;
      this.$store.dispatch('previousPage').catch((err) => {
         Logger.error(err);
      });

      await this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            Logger.error(err);
         });

      return !this.loading;
   }

   async nextPage(): Promise<boolean> {
      this.loading = true;
      this.$store.dispatch('nextPage').catch((err) => {
         Logger.error(err);
      });
      await this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            Logger.error(err);
         });

      return !this.loading;
   }

   goToTopOfPage(): void {
      scroll(0, 0);
   }

   //Lorsque l'utilisateur modifie le nombre de résultats voulus par page
   async getItemPerPage(val: number): Promise<boolean> {
      this.loading = true;
      this.$store.dispatch('resetPage').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updatePageSize', val).catch((err) => {
         Logger.error(err);
      });
      await this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.numberOfNoticesAskedForNewCall = val;
            this.loading = false;
         })
         .catch((err) => {
            Logger.error(err);
         });

      return !this.loading;
   }

   customSort(items: Array<TableHeader>, index: Array<string>, isDesc: Array<boolean>): Array<TableHeader> {
      const arrayToSentAtStore: Array<TriInterface> = [];
      for (let i = 0; i < index.length; i++) {
         const tri: TriInterface = {
            sort: this.mappingLabelTri[index[i]],
            order: !isDesc[i] ? OrderType.ASC : OrderType.DESC,
         };
         arrayToSentAtStore.push(tri);
      }

      //Envoi des critères de tri dans le bloc de tri
      this.$store.dispatch('updateSelectedTri', arrayToSentAtStore).catch((err) => {
         Logger.error(err);
      });

      //Reconstruction du JSON à envoyer
      this.$store.dispatch('constructJsonAction').catch((err) => {
         Logger.error(err);
      });
      return items;
   }
}
</script>
