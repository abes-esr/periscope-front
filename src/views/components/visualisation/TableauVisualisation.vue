<template>
   <v-container>
      <v-row class="outlined-app">
         <v-col cols="1">
            <v-btn outlined small @click.stop="displayChart = !displayChart"><v-icon>mdi-arrow-down</v-icon></v-btn>
         </v-col>
         <v-col cols="1">
            <v-btn outlined small @click.stop="displayPanel = !displayPanel"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
         </v-col>
         <v-col cols="10"> Notice n°{{ ppnNumber }} </v-col>
      </v-row>
      <v-row v-if="displayChart">
         <v-container>
            <v-row>
               <v-col cols="2"> </v-col>
               <v-col cols="10">

               </v-col>
            </v-row>
            <v-row justify="center">
               <v-col><v-chip label small color="blue"> Collection sans information de lacunes </v-chip></v-col>
               <v-col> <v-chip label small color="yellow"> Collection lacunaire </v-chip></v-col>
               <v-col> <v-chip label small color="grey"> Erreur </v-chip></v-col>
               <v-col> <v-chip label small color="green"> Synthèse disponible </v-chip></v-col>
               <v-col>
                  <v-chip label small color="red"> Synthèse lacunaire </v-chip>
               </v-col>
            </v-row>
            <v-row>
               <v-col v-if="displayPanel" cols="3">
                  <p>test</p>
               </v-col>
               <v-col>
                  <component-timeline v-bind:items="items" v-bind:groups="groups" style="border: 1px solid grey"></component-timeline>
               </v-col>
            </v-row>
         </v-container>
      </v-row>
   </v-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentTimeline from '@/views/components/visualisation/timeline/ComponentTimeline.vue';
import {Group, Items} from '@/store/visualisation/VisualisationDefinition';
import {JsonSequenceItem} from '@/service/periscope/PeriscopeJsonDefinition';
import Holding from '@/store/entity/Holding';

@Component({
   components: {
      ComponentTimeline,
   },
})
export default class TableauVisualisation extends Vue {
   displayChart: boolean;
   displayPanel: boolean;
   drawer: any;
   groups: Array<Group>;
   items: Array<Items>;
   ppnNumber: '';

   constructor() {
      super();
      this.displayChart = false;
      this.displayPanel = false;
      this.drawer = null;
      this.ppnNumber = this.$store.state.lotHoldings._ppn;
      this.groups = this.getGroups;
      this.items = this.getItems;


      /*
      this.groups = [
         {
            id: 1,
            title: 'general',
            content: 'general',
            treeLevel: 1,
            classname: 'test',
         },
         {
            id: 2,
            title: '123456789',
            content: 'RCR 123456789',
            treeLevel: 2,
         },
         {
            id: 3,
            title: '987654321',
            content: 'RCR 987654321',
            treeLevel: 2,
         },
      ];
      */

      /*
      this.items = [
         {
            id: 1,
            group: 1,
            content: 'Item 1',
            start: '2000-01-01',
            end: '2015-12-31',
            className: 'green',
            type: 'range',
            title: 'Info complémentaire de la séquence',
         },
         {
            id: 2,
            group: 1,
            content: 'Item 2',
            rcr: '123456789',
            start: '2016-01-01',
            end: '2016-12-31',
            className: 'red',
            type: 'range',
         },
         {
            id: 3,
            group: 1,
            content: 'Item 3',
            rcr: '123456789',
            start: '2016-01-01',
            end: '2021-12-31',
            className: 'green',
            type: 'range',
         },
         {
            id: 4,
            group: 2,
            content: 'Item 4',
            rcr: '123456789',
            start: '2000-01-01',
            end: '2015-12-31',
            className: 'blue',
            type: 'range',
         },
         {
            id: 5,
            group: 2,
            content: 'Item 5',
            rcr: '123456789',
            start: '2017-01-01',
            end: '2019-12-31',
            className: 'blue',
            type: 'range',
         },
         {
            id: 6,
            group: 3,
            content: 'Item 6',
            rcr: '123456789',
            start: '2010-01-01',
            end: '2018-12-31',
            className: 'yellow',
            type: 'range',
         },
      ];
      */
   }

   showHoldings(): void {
      console.log(JSON.parse(JSON.stringify(this.$store.getters.getLotHoldings)));
   }

   sortRcrListFromHoldings(): Array<string> {
      const rcrList : Array<string> = this.$store.getters.getLotHoldings._rcrList;
      rcrList.sort((a: any, b: any) => a - b);
      return rcrList;
   }

   get getElement(): string {
      return '';
   }

   get getGroups(): Array<Group> {
      const group: Array<Group> = [];
      group.push({id: 1, title: '', content: '', treeLevel: 1, classname: 'test'});
      this.$store.getters.getLotHoldings._rcrList.forEach((holdingElement: string) => {
         group.push({id: +holdingElement, title: holdingElement, content: 'RCR: ' + holdingElement, treeLevel: 2, classname: 'test'});
      });
      return group;
   }

   get getItems(): Array<Items> {
      const items: Array<Items> = [];
      let elementSequenceCounter = 1;

      this.$store.getters.getLotHoldings._holdings[0].sequences.forEach((sequence: JsonSequenceItem) => {
         elementSequenceCounter += 1;
         items.push({id: elementSequenceCounter, group: +sequence.rcr, content: this.$store.getters.getLotHoldings._holdings[0].etatCollection, rcr: sequence.rcr.toString(), start: new Date(parseInt(sequence.anneeDebut), 1, 1), end: new Date(parseInt(sequence.anneeFin), 12, 31), className: 'green', type: 'range', title: ''});
      });

      const copy = this.$store.getters.getLotHoldings._holdings; //Copie du résultat d'holdings
      delete copy[0]; //Suppression du premier élément d'holdings

      copy.forEach((holding: Holding) => {
         holding.sequences.forEach((sequence: JsonSequenceItem) => {
            elementSequenceCounter += 1;
            items.push({id: elementSequenceCounter, group: +sequence.rcr, content: '', rcr: sequence.rcr.toString(), start: new Date(parseInt(sequence.anneeDebut), 1, 1), end: new Date(parseInt(sequence.anneeFin), 12, 31), className: this.getClassNameBySequenceType(sequence.typeSequence), type: 'range', title: holding.etatCollection});
         });
      });
      return items;
   }

   getClassNameBySequenceType(sequenceType: string): string {
      switch (sequenceType){
         case "CONTINUE": return 'blue';
         case "LACUNE": return 'yellow';
         case "ERREUR": return 'red';
         default: return 'none';
      }
   }
}
</script>
