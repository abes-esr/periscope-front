<template>
   <v-container fluid>
      <v-row justify="center">
         <iframe id="iframeid" :src="getUrl" width="100%" allowfullscreen></iframe>
      </v-row>
   </v-container>
</template>
<script lang="js">
import {Component, Vue} from 'vue-property-decorator';
import Stepper from "@/views/components/02-stepper/Stepper";
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
      this.ppnNumber = this.$route.query.ppnviewed ? this.$route.query.ppnviewed : this.$store.state.lotHoldings._ppn;
      this.iFrameURL = process.env.VUE_APP_TIMELINE_PERISCOPE_V1;
      this.orderBy = this.$route.query.orderby ? this.$route.query.orderby : 'SORT_BY_PCP';
      this.collectionStatus = this.$route.query.collectionStatus ? this.$route.query.collectionStatus : '';
      this.tree = this.$route.query.tree ? this.$route.query.tree : this.getTree;
   }

   get getTree() {
     return this.$store.state.tree.join('%2C');
   }

   get getUrl() {
     return this.iFrameURL + '?ppnviewed=' + this.ppnNumber + '&orderby=' + this.orderBy + '&collectionStatus=' + this.collectionStatus + '&tree=' + this.tree;
   }
}
</script>
<style>
iframe {
   height: 100vh;
}
</style>
