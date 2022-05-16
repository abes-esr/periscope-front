<template>
   <v-container class="outlined-app">
      <v-container style="padding: 5px; text-align: left">
         <v-row align-content="center" class="justify-space-between">
            <v-col cols="4">
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn class="outlined-app btnTableau" outlined small @click.stop="displayDrawer = !displayDrawer" v-on="on"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
                  </template>
                  <span>Afficher / Cacher les facettes</span>
               </v-tooltip>
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn class="outlined-app btnTableau" outlined small @click="clearSelection" v-on="on"><v-icon>mdi-checkbox-blank-off-outline</v-icon></v-btn>
                  </template>
                  <span>Vider la sélection</span>
               </v-tooltip>
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn class="outlined-app btnTableau" outlined small @click="clearSort" v-on="on"><v-icon>mdi-cancel</v-icon></v-btn>
                  </template>
                  <span>Réinitialiser les tris</span>
               </v-tooltip>
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn class="btnTableau" :disabled="isSelectionEmpty" outlined small v-on="on"><download-csv :delimiter="'\t'" :data="selected" name="periscope-export.tsv" :fields="getFieldsToExport"> Exporter </download-csv></v-btn>
                  </template>
                  <span>Exporter la sélection au format CSV</span>
               </v-tooltip>
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn class="outlined-app btnTableau" outlined small @click="sortColumns" v-on="on">Appliquer les tris</v-btn>
                  </template>
                  <span>Appliquer les tris</span>
               </v-tooltip>
            </v-col>
            <v-col cols="3">
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn icon color="primary" @click="previousPage" :disabled="isFirstPage" v-on="on"><v-icon>mdi-arrow-left</v-icon></v-btn>
                  </template>
                  <span>Aller à la page précédente</span>
               </v-tooltip>
               <v-chip color="primary" outlined>
                  <v-icon left>mdi-file-document-outline</v-icon>
                  Page {{ getCurrentPage }} sur {{ getMaxPage }}
               </v-chip>
               <v-tooltip top open-delay="700">
                  <template v-slot:activator="{on}">
                     <v-btn icon color="primary" @click="nextPage" :disabled="isLastPage" v-on="on"><v-icon>mdi-arrow-right</v-icon></v-btn>
                  </template>
                  <span>Aller à la page suivante</span>
               </v-tooltip>
            </v-col>
            <v-col cols="5">
               <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche approfondie" single-line hide-details style="margin: 0 !important; padding: 0 !important"></v-text-field>
            </v-col>
         </v-row>
         <v-row class="secondary-line">
            <v-col>Requête : {{ getMaxNotice }} notices ({{ getExecutionTime }} secondes)</v-col>
         </v-row>
      </v-container>
      <v-row style="margin-top: 10px" class="align-start justify-space-around">
         <v-navigation-drawer v-model="drawer" permanent style="margin-right: 1rem" v-bind:class="[displayDrawer ? 'd-flex' : 'd-none']">
            <v-expansion-panels multiple accordion>
               <v-expansion-panel v-for="f in facettes" :key="f.zone">
                  <v-expansion-panel-header>
                     {{ mappingLabelFacet[f.zone] }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="padding-left: 0.5em; margin-top: -0.5em">
                     <v-container fluid v-for="(val, i) in f.valeurs" :key="i" style="max-height: 2em; padding: 0">
                        <v-checkbox :label="convertFacetToLabel(f.zone, val.key) + ' (' + val.occurrence + ')'" @change="updateStoreFacet(f.zone, val.key)"></v-checkbox>
                     </v-container>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-navigation-drawer>

         <v-card class="d-flex flex-grow-1 flex-shrink-1" v-bind:class="[displayDrawer ? 'tabResultatSmallWidth' : 'tabResultatFullWidth']">
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
               @click:row="clickOnRow"
               @update:items-per-page="getItemPerPage"
               :footer-props="{
                  disablePagination: true,
                  pageText: '',
                  itemsPerPageText: 'nombre de notices affichées',
                  itemsPerPageOptions: [25, 250, 1000, getMaxNotice],
                  showFirstLastPage: false,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: '',
                  nextIcon: '',
               }"
            >
               <template v-for="h in headers" v-slot:[`header.${h.value}`]="{headers}">
                  <v-tooltip top v-bind:key="h.value" max-width="15vw" open-delay="700">
                     <template v-slot:activator="{on}">
                        <span v-on="on">{{ h.text }}</span>
                     </template>
                     <span>Cliquez sur la colonne pour trier par {{ h.text }} puis cliquez sur 'Appliquer les tris'</span>
                  </v-tooltip>
               </template>
               <template v-slot:expanded-item="{item}">
                  <td :colspan="headers.length">
                     <div class="v-data-table_line">Liste des établissements : {{ item.rcrList }}<br /></div>
                  </td>
               </template>
            </v-data-table>
         </v-card>
         <v-container>
            <v-row align-content="center" class="justify-space-between">
               <v-col cols="3">
                  <v-tooltip top open-delay="700">
                     <template v-slot:activator="{on}">
                        <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="goToTopOfPage" v-on="on"><v-icon>mdi-arrow-up</v-icon></v-btn>
                     </template>
                     <span>Aller en haut de la page</span>
                  </v-tooltip>
               </v-col>
               <v-col cols="3">
                  <v-tooltip top open-delay="700">
                     <template v-slot:activator="{on}">
                        <v-btn icon color="primary" @click="previousPage" :disabled="isFirstPage" v-on="on"><v-icon>mdi-arrow-left</v-icon></v-btn>
                     </template>
                     <span>Aller à la page précédente</span>
                  </v-tooltip>
                  <v-chip color="primary" outlined>
                     <v-icon left>mdi-file-document-outline</v-icon>
                     Page {{ getCurrentPage }} sur {{ getMaxPage }}
                  </v-chip>
                  <v-tooltip top open-delay="700">
                     <template v-slot:activator="{on}">
                        <v-btn icon color="primary" @click="nextPage" :disabled="isLastPage" v-on="on"><v-icon>mdi-arrow-right</v-icon></v-btn>
                     </template>
                     <span>Aller à la page suivante</span>
                  </v-tooltip>
               </v-col>
               <v-col cols="5" align-content="end">
                  <v-tooltip top open-delay="700">
                     <template v-slot:activator="{on}">
                        <v-btn class="outlined-app" style="margin-bottom: -1em" outlined small @click="goToTopOfPage" v-on="on"><v-icon>mdi-arrow-up</v-icon></v-btn>
                     </template>
                     <span>Aller en haut de la page</span>
                  </v-tooltip>
               </v-col>
            </v-row>
         </v-container>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {TableHeader} from '@/store/resultat/TableDefinition';
import {Logger} from '@/utils/Logger';
import {OrderType, TriDefinition, TriType} from '@/store/recherche/TriDefinition';
import Notice from '@/store/entity/Notice';
import {HttpRequestError} from '@/exception/HttpRequestError';
import Facet from '@/store/entity/Facet';
import {BlocLangue} from '@/store/recherche/criteres/BlocLangue';
import {BlocPays} from '@/store/recherche/criteres/BlocPays';

@Component
export default class TableauResultats extends Vue {
   totalNotices = 0;
   headers: Array<TableHeader>;
   notices: Array<Notice>;
   facettes: Array<Facet>;
   loading: boolean;
   singleExpand: false;
   singleSelect: boolean;
   expanded: Array<Notice>;
   selected: Array<Notice>;
   search: string;
   drawer: any;
   orderBooleans: Array<boolean>;
   orderLabels: Array<string>;
   numberOfNoticesAskedForNewCall: number;
   mappingLabelTri: {[key: string]: TriType} = {};
   mappingLabelFacet: {[key: string]: string} = {};
   displayDrawer: boolean;

   constructor() {
      super();
      this.totalNotices = 0;
      this.headers = this.getHeaders;
      this.notices = this.getNotices;
      this.facettes = this.getFacettes;
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
      this.mappingLabelTri = this.getMappingLabeltoTriType;
      this.mappingLabelFacet = this.getFacetLabelMapping;
      this.displayDrawer = true;
      console.log(this.$store.state.lotHoldings._ppn);
   }

   get getOrderSortBooleans(): Array<boolean> {
      return this.$store.getters.orderSortArrayResultBooleanElements;
   }

   get getOrderSortLabels(): Array<string> {
      return this.$store.getters.orderSortArrayResultLabelElements;
   }

   /**
    * Retourne l'entête des colones du tableau
    */
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
            value: TriType[TriType.title],
            sortable: true,
         },
         {
            text: 'Éditeur',
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

   /**
    * Retourne un tableau associatif qui fait la correspondance entre
    * une clé en chaîne de caractère et un tri
    * @return Tableau associatif chaîne de caractère / tri
    */
   get getMappingLabeltoTriType(): {[key: string]: TriType} {
      return {
         ppn: TriType.ppn,
         continiousType: TriType.continiousType,
         issn: TriType.issn,
         title: TriType.title,
         editor: TriType.editor,
         startDate: TriType.startDate,
         endDate: TriType.endDate,
         pcpList: TriType.pcpList,
         nbLoc: TriType.nbLoc,
         linkSudoc: TriType.linkSudoc,
      };
   }

   /**
    * Retourne un tableau associatif qui fait la correspondance entre
    * une clé en chaîne de caractère et une facette
    * @return Tableau associatif chaîne de caractère / facette
    */
   get getFacetLabelMapping(): {[key: string]: string} {
      return {
         document_type: 'Type de document',
         support_type: 'Type de support',
         country: 'Pays',
         language: 'Langue',
      };
   }
   get getNotices(): Array<Notice> {
      return this.$store.state.lotNotices._notices;
   }
   get getMaxNotice(): number {
      return this.$store.state.lotNotices._maxNotice;
   }
   get getExecutionTime(): number {
      return this.$store.state.lotNotices._executionTime;
   }
   get getFacettes(): Array<Facet> {
      return this.$store.state.lotFacettes._facettes;
   }
   get getNumberOfNoticesAskedForNewCall(): number {
      return this.$store.state.pagination._sizeWanted;
   }
   get getCurrentPage(): number {
      return this.$store.state.pagination._currentPage + 1;
   }
   get getMaxPage(): number {
      return this.$store.state.pagination._maxPage;
   }
   get isFirstPage(): boolean {
      return this.$store.getters.isFirstPage();
   }
   get isLastPage(): boolean {
      return this.$store.getters.isLastPage();
   }
   get isSelectionEmpty(): boolean {
      return this.selected.length == 0;
   }
   get getFieldsToExport(): Array<string> {
      return ['ppn', 'issn', 'continiousType', 'title', 'pcpList', 'nbLoc'];
   }

   /******************** Methods ***************************/

   /**
    * Mets à jour les filtres de facette dans le store
    * @param zone le type de facette (document_type, country...)
    * @param key la valeur du type (périodique, monographie...)
    */
   updateStoreFacet(zone: string, key: string): void {
      const arrayZoneAndKey: Array<string> = [];
      arrayZoneAndKey.push(zone);
      arrayZoneAndKey.push(key);
      this.$store.dispatch('updateCurrentFacets', arrayZoneAndKey);
      this.clicOnFacet();
   }

   /**
    * Retourne le libéllé à afficher en fonction de la facette et de la clé
    * @return Libellé à afficher
    */
   convertFacetToLabel(zone: string, key: string): string {
      if (zone === 'language') {
         return BlocLangue.getItemLabel(this.$store.state.blocLangue._candidates, key);
      } else if (zone === 'country') {
         return BlocPays.getItemLabel(this.$store.state.blocPays._candidates, key);
      } else {
         return key;
      }
   }

   /******************** Events ***************************/

   clickOnRow(value: Notice): void {
      this.$store.dispatch('changeStepAction', 3).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateCurrentPpn', value.ppn).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updateCurrentRcr', value.rcrList).catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('doVisualisationWithHoldingsV1').catch((err) => {
         Logger.error(err.message);
         if (err instanceof HttpRequestError) {
            Logger.debug('Erreur API : ' + err.debugMessage);
            this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
               Logger.error(err);
            });
         } else {
            this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
               Logger.error(err);
            });
         }
      });

      /*
   Code pour ouvrir / fermer le contenu de la ligne
    const index: number = this.expanded.indexOf(value);
    if (index > -1) {
       this.expanded.splice(index, 1);
    } else {
       this.expanded.push(value);
    }*/
   }

   /**
    * Action lorsque l'utilisateur clique sur le bouton d'actualisation du tri
    */
   sortColumns(): void {
      this.loading = true;
      this.$store
         .dispatch('doSearch')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            this.loading = false;
            Logger.error(err.message);
            if (err instanceof HttpRequestError) {
               Logger.debug('Erreur API : ' + err.debugMessage);
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                  Logger.error(err);
               });
            } else {
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                  Logger.error(err);
               });
            }
         });
   }

   /**
    * Action lorsque l'utilisateur clique sur une des facettes
    */
   clicOnFacet(): void {
      this.loading = true;
      this.$store
         .dispatch('doSearch')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            this.loading = false;
            Logger.error(err.message);
            if (err instanceof HttpRequestError) {
               Logger.debug('Erreur API : ' + err.debugMessage);
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                  Logger.error(err);
               });
            } else {
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                  Logger.error(err);
               });
            }
         });
   }

   /**
    * Action lorsque l'utilisateur clique sur le bouton de page précédente
    */
   previousPage(): void {
      this.loading = true;
      this.$store.dispatch('previousPage').catch((err) => {
         Logger.error(err);
      });

      this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            this.loading = false;
            Logger.error(err.message);
            if (err instanceof HttpRequestError) {
               Logger.debug('Erreur API : ' + err.debugMessage);
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                  Logger.error(err);
               });
            } else {
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                  Logger.error(err);
               });
            }
         });
   }

   /**
    * Action lorsque l'utilisateur clique sur le bouton de page suivante
    */
   nextPage(): void {
      this.loading = true;
      this.$store.dispatch('nextPage').catch((err) => {
         Logger.error(err);
      });
      this.$store
         .dispatch('callPeriscopeAPI')
         .then(() => {
            this.notices = this.getNotices;
            this.loading = false;
         })
         .catch((err) => {
            this.loading = false;
            Logger.error(err.message);
            if (err instanceof HttpRequestError) {
               Logger.debug('Erreur API : ' + err.debugMessage);
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                  Logger.error(err);
               });
            } else {
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                  Logger.error(err);
               });
            }
         });
   }

   /**
    * Action lorsque l'utilisateur clique sur le bouton de retour en haut de page
    */
   goToTopOfPage(): void {
      scroll(0, 0);
   }

   /**
    * Action lorsque l'utilisateur modifie le nombre de résultats voulus par page
    */
   getItemPerPage(val: number): void {
      this.loading = true;
      this.$store.dispatch('openInfoSnackBar', 'Affichage de ' + val + ' notices par page (Si plus de 1000 notices, patienter entre 30 secondes et 2 minutes)').catch((err) => {
         Logger.error(err);
      });
      this.$store.dispatch('updatePageSize', val).catch((err) => {
         Logger.error(err);
      });
      this.$store
         .dispatch('doSearch')
         .then(() => {
            this.notices = this.getNotices;
            this.numberOfNoticesAskedForNewCall = val;
            this.loading = false;
         })
         .catch((err) => {
            this.loading = false;
            Logger.error(err.message);
            if (err instanceof HttpRequestError) {
               Logger.debug('Erreur API : ' + err.debugMessage);
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
                  Logger.error(err);
               });
            } else {
               this.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
                  Logger.error(err);
               });
            }
         });
   }

   customSort(items: Array<TableHeader>, index: Array<string>, isDesc: Array<boolean>): Array<TableHeader> {
      const arrayToSentAtStore: Array<TriDefinition> = [];
      for (let i = 0; i < index.length; i++) {
         const tri: TriDefinition = {
            sort: this.mappingLabelTri[index[i]],
            order: !isDesc[i] ? OrderType.ASC : OrderType.DESC,
         };
         arrayToSentAtStore.push(tri);
      }

      //Envoi des critères de tri dans le bloc de tri
      this.$store.dispatch('updateSelectedTri', arrayToSentAtStore).catch((err) => {
         Logger.error(err);
      });
      return items;
   }

   clearSelection(): void {
      this.selected = [];
   }

   clearSort(): void {
      this.$store.dispatch('resetTri').catch((err) => {
         Logger.error(err);
      });

      this.orderBooleans = this.getOrderSortBooleans;
      this.orderLabels = this.getOrderSortLabels;
      this.sortColumns();
   }
}
</script>
