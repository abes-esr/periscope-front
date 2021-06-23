<template>
   <v-container>
      <!-- https://visjs.github.io/vis-timeline/ !-->
      <div id="visualization" class="visualisationBloc"></div>
   </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {DataGroup, DataSet, Timeline} from 'vis-timeline/standalone';
import {TimelineItem, TimelineOptions} from 'vis-timeline';

@Component
export default class ComponentTimeline extends Vue {
   timeline: Timeline;
   @Prop() items!: DataSet;
   @Prop() groups!: DataGroup;

   constructor() {
      super();
   }

   mounted() {
      if (!this.timeline) {
         // DOM element where the Timeline will be attached
         const container: any = document.getElementById('visualization');
         if (container != null) {
            // Configuration for the Timeline
            let options: TimelineOptions = {
               align: 'left',
               autoResize: true,
               groupHeightMode: 'fitItems',
               showCurrentTime: false,
               locale: 'fr',
               showTooltips: true,
               //max: '2022-01-01', //TODO recupérer la date du jour ici (date max)
               min: '0000-01-01',
               horizontalScroll: true,
               moveable: true,
               zoomKey: 'shiftKey', //TODO ne fonctionne pas malgre la doc
               orientation: 'top',
               zoomMin: 1000,
               stack: false,
               stackSubgroups: true,
               cluster: { //Gestion des chevauchement de sequences
                  maxItems: 30,
                  titleTemplate: '',
                  showStipes: false,
                  fitOnDoubleClick: false,
               },
               tooltip: { //info bulles au survol, template
                  template: (item) => {
                     return '<h5>' + item.title + '</h5>';
                  }
               }
            };
            // Create a Timeline
            this.timeline = new Timeline(container, this.items, this.groups, options);
         }
      }
   }
}
</script>
