<template>
   <v-container>
      <v-row justify="center">
         <iframe id="iframeid" :src="iFrameURL + '?ppnviewed=' + ppnNumber + '&orderby=' + orderBy + '&collectionStatus=' + collectionStatus + '&tree=' + tree" width="100%" allowfullscreen></iframe>
      </v-row>
   </v-container>
</template>
<script lang="js">
import {Component, Vue} from 'vue-property-decorator';
import Stepper from "@/views/components/Stepper";
@Component({
  components: {Stepper}
})
export default class TableauVisualisation extends Vue {
   ppnNumber;
   iFrameURL;
   orderBy;
   collectionStatus;
   tree;
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
<style>
iframe {
   height: 100vh;
}
</style>
