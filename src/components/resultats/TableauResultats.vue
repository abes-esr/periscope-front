<template>
   <v-container class="outlined-app">
      <v-container>
         <v-row>
            <v-col cols="1">
               <v-btn class="outlined-app" style="margin-top: -2em" outlined small @click.stop="drawer = !drawer"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
            </v-col>
            <v-col style="margin-top: -2em" cols="11">
               <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche approfondie" single-line hide-details></v-text-field>
            </v-col>
         </v-row>
      </v-container>
      <v-card style="margin-top: -0.5em">
         <v-data-table
            @update:sort-asc="test()"
            @update:sort-desc="test()"
            :sort-by="orderLabels"
            :sort-desc="orderBooleans"
            dense
            multi-sort
            :custom-sort="customSort"
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
            :footer-props="{
               showFirstLastPage: true,
               firstIcon: 'mdi-arrow-collapse-left',
               lastIcon: 'mdi-arrow-collapse-right',
               prevIcon: 'mdi-minus',
               nextIcon: 'mdi-plus',
            }"
         >
            <template v-slot:expanded-item="{item}">
               <td :colspan="headers.length" style="text-align: left; padding-left: 9em">
                  Complément de titre : {{ item.titleComplement }}<br />
                  Qualifieur de titre : {{ item.keyTitleQualifer }}<br />
                  Liste des établissements : {{ item.rcrList }}<br />
               </td>
            </template>
         </v-data-table>
      </v-card>
      <v-navigation-drawer v-model="drawer" absolute temporary width="400">
         <v-expansion-panels accordion>
            <v-expansion-panel>
               <v-expansion-panel-header> Type / Support </v-expansion-panel-header>
               <v-expansion-panel-content style="padding-left: 2em; margin-top: -0.5em">
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Périodiques"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Imprimés"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Collections"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Electroniques"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Blogs"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Journaux"></v-checkbox>
                  </v-row>
                  <v-row>
                     <v-checkbox label="Autres"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Périodiques"></v-checkbox>
                  </v-row>
               </v-expansion-panel-content>
            </v-expansion-panel>
         </v-expansion-panels>
      </v-navigation-drawer>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ContentHeader, TableHeader} from '@/store/interfaces/TableInterfaces';

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
      console.log(this.orderLabels);
      console.log(this.orderBooleans);
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

   test() {
      setTimeout(() => {
         this.$store.dispatch('actualizeNoticesInCurrentPageAction');
      }, 1000);
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
      this.$store.dispatch('blocTriAction', arrayToSentAtStore);
      //Reconstruction du JSON à envoyer
      this.$store.dispatch('constructJsonAction');
      //TODO une action qui recharge les notices

      //TODO il ne peut retourner les items autrement
      return this.notices;
   }
}
</script>
