<template>
      <v-container>
         <v-row justify="center">
           <iframe src="http://localhost:8083/PCP_war_exploded/?ppnviewed=039237273&orderby=SORT_BY_PCP&collectionStatus=&tree=987352102%2C974112101%2C973022101%2C972332101%2C971202101%2C731372101%2C693872102%2C422182203%2C422182101%2C384212101%2C840072101%2C831372101%2C130555103%2C130012202%2C060882103%2C861942238%2C861942201%2C173002101%2C800212101%2C721812109%2C490076101%2C490072105%2C441092103%2C593502215%2C593502207%2C591782101%2C543952102%2C870856101%2C870852106%2C661362105%2C661362104%2C341722208%2C341722102%2C951272104%2C940682101%2C930792101%2C930662101%2C912282101%2C782972101%2C751162101%2C751125202%2C751075209%2C751065208%2C751055227%2C751052262%2C751052119%2C751045202%2C751015208%2C751015204%2C765402101%2C763512101%2C250562104%2C452342102%2C372612210%2C562602102%2C352382104%2C290192103%2C212312213%2C141182205%2C631132218%2C644452101%2C641022101%2C335222102%2C333182205%2C682242105%2C674822138%2C674822105%2C130012102%2C315552253%2C315552107%2C315552103%2C920712101%2C920502102%2C920462101%2C774682301%2C751132109%2C751062111%2C751052119%2C751052116" style="border:none;overflow: auto;min-height: 150vh"  width="100%"></iframe>
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
   drawer: any;
   groups: Array<Group>;
   items: Array<Items>;
   ppnNumber: '';

   constructor() {
      super();
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
      const rcrList: Array<string> = this.$store.getters.getLotHoldings._rcrList;
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
      switch (sequenceType) {
         case 'CONTINUE':
            return 'blue';
         case 'LACUNE':
            return 'yellow';
         case 'ERREUR':
            return 'red';
         default:
            return 'none';
      }
   }
}
</script>
<style>
div {
  height: 100%;
}
</style>
