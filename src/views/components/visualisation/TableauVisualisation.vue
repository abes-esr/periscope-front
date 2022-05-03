<template>
   <v-container>
      <v-row justify="center">
         <iframe id="iframeDivTaget" :src="'http://localhost:8083/PCP_war_exploded/?ppnviewed=' + ppnNumber + '&orderby=SORT_BY_PCP&collectionStatus=&tree='" style="border: none; overflow: auto; min-height: 90vh" width="100%"></iframe>
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

   constructor() {
      super();
      this.ppnNumber = this.$store.state.lotHoldings._ppn;
   }
}
</script>
