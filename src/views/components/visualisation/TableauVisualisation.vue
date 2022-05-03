<template>
   <v-container>
      <v-row justify="center">
         <iframe id="iframeDivTaget" :src="iFrameURL + '?ppnviewed=' + ppnNumber + '&orderby=' + orderBy + '&collectionStatus=' + collectionStatus + '&tree=' + tree" style="border: none; overflow: auto; min-height: 100vh" width="100%"></iframe>
      </v-row>
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
   ppnNumber: '';
   iFrameURL: '';
   orderBy: string;
   collectionStatus: string;
   tree: string;
   constructor() {
      super();
      this.ppnNumber = this.$store.state.lotHoldings._ppn;
      this.iFrameURL = process.env.VUE_APP_TIMELINE_PERISCOPE_V1;
      this.orderBy = 'SORT_BY_PCP';
      this.collectionStatus = '';
      this.tree = '';
   }
}
</script>
