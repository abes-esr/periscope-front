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
      <v-navigation-drawer v-model="drawer" absolute temporary width="400">
         <v-expansion-panels accordion>
            <v-expansion-panel>
               <v-expansion-panel-header> Publication vivante / morte </v-expansion-panel-header>
               <v-expansion-panel-content style="padding-left: 2em; margin-top: -0.5em">
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Vivante"></v-checkbox>
                  </v-row>
                  <v-row>
                     <v-checkbox label="Morte"></v-checkbox>
                  </v-row>
               </v-expansion-panel-content>
            </v-expansion-panel>
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
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
               <v-expansion-panel-header> ILN </v-expansion-panel-header>
               <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
               <v-expansion-panel-header> Etablissement </v-expansion-panel-header>
               <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
               <v-expansion-panel-header> Plan de conservation </v-expansion-panel-header>
               <v-expansion-panel-content style="padding-left: 2em; margin-top: -0.5em">
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Pôle de conservation"></v-checkbox>
                  </v-row>
                  <v-row style="max-height: 2em">
                     <v-checkbox label="Membre du plan"></v-checkbox>
                  </v-row>
                  <v-row>
                     <v-checkbox label="Non renseigné"></v-checkbox>
                  </v-row>
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
               <v-expansion-panel-header> Positionnement </v-expansion-panel-header>
               <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
               <v-expansion-panel-header style="background-color: dodgerblue; color: white"> Exporter la liste </v-expansion-panel-header>
               <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
