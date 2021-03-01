<template>
   <v-container class="outlined-app">
      <v-card>
         <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche approfondie" single-line hide-details></v-text-field>
         </v-card-title>
         <v-data-table
            dense
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
            multi-sort
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
}
</script>
