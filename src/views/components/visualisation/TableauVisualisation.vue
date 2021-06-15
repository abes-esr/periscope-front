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
            </v-col>
         </v-row>
      </v-container>
      <v-container style="border: 1px solid black">
         <!-- <v-navigation-drawer v-model="drawer" permanent style="margin-right: 1rem" v-bind:class="[displayDrawer ? 'd-flex' : 'd-none']">
            <v-expansion-panels multiple accordion>
               <v-expansion-panel   v-for="(item,i) in 3"
                                    :key="i">
                  <v-expansion-panel-header>
                    Item
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="padding-left: 0.5em; margin-top: -0.5em">
                     <v-container fluid  v-for="(item,i) in 5"
                                  :key="i" style="max-height: 2em; padding: 0">
                        <v-checkbox :disabled="true" label="Value"></v-checkbox>
                     </v-container>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-navigation-drawer>-->
         <component-timeline v-bind:items="items" v-bind:groups="groups" style="border: 1px solid grey"></component-timeline>
      </v-container>
   </v-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentTimeline from '@/views/components/visualisation/timeline/ComponentTimeline.vue';

@Component({
   components: {
      ComponentTimeline,
   },
})
export default class TableauVisualisation extends Vue {
   displayDrawer: boolean;
   drawer: any;
   groups: Array<any>;
   items: Array<any>;

   constructor() {
      super();
      this.displayDrawer = true;
      this.drawer = null;

      this.groups = [
         {
            id: 1,
            title: 'general',
            content: 'general',
            treeLevel: 1,
            classname: 'test'
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

      this.items = [
         {
            id: 341725201,
            group: 1,
            content: 'Etat de collection:no. 2 (jul-1972) - no. 5 (avr-1974) ;[Lacunes][ Lacunes signalées : no.4 (1973) ]',
            start: '2000-01-01',
            end: '2015-12-31',
            className: 'green',
            type: 'range',
         },
         {
            id: 2,
            group: 1,
            content: 'Item 1',
            rcr: '123456789',
            start: '2016-01-01',
            end: '2016-12-31',
            className: 'red',
            type: 'range',
         },
         {
            id: 3,
            group: 1,
            content: 'Item 1',
            rcr: '123456789',
            start: '2017-01-01',
            end: '2021-12-31',
            className: 'green',
            type: 'range',
         },
         {
            id: 4,
            group: 2,
            content: 'item 2',
            rcr: '123456789',
            start: '2000-01-01',
            end: '2015-12-31',
            className: 'blue',
            type: 'range',
         },
         {
            id: 5,
            group: 2,
            content: 'item 3',
            rcr: '123456789',
            start: '2017-01-01',
            end: '2019-12-31',
            className: 'blue',
            type: 'range',
         },
         {
            id: 6,
            group: 3,
            content: 'item 4',
            rcr: '123456789',
            start: '2010-01-01',
            end: '2018-12-31',
            className: 'yellow',
            type: 'range',
         },
      ];
   }
}
</script>

<style>
div.vis-group{
   max-height: 1.8em;
}
div.vis-label.vis-nested-group.vis-group-level-1{
   background-color: white;
   border: 1px solid black;
   font-max-size: 6px;
}
div.vis-label.vis-nested-group.vis-group-level-2{
   background-color: white;
   border: 1px solid black;
}
div.vis-label.vis-nested-group.vis-group-level-3{
   background-color: white;
   border: 1px solid black;
}
div.vis-inner{
   font-size: small;
}
</style>
