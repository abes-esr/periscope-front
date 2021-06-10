<template>
   <div id="visualization" class="visualisationBloc"></div>
</template>
<style src="./style.css"></style>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {DataGroup, DataSet, Timeline} from 'vis-timeline/standalone';

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
            const options = {};
            // Create a Timeline
            this.timeline = new Timeline(container, this.items, this.groups, options);
            this.timeline.on('rangechanged', (e) => {
               this.$emit('range-changed', e);
            });
         }
      }
   }
}
</script>
