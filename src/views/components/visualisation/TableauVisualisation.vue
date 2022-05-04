<template>
   <v-container>
      <v-row justify="center">
         <iframe id="iframeid" :src="iFrameURL + '?ppnviewed=' + ppnNumber + '&orderby=' + orderBy + '&collectionStatus=' + collectionStatus + '&tree=' + tree" @transitionend="onMyFrameLoad"
                 width="100%"></iframe>
      </v-row>
   </v-container>
</template>
<script lang="js">
import {Component, Vue} from 'vue-property-decorator';
import ComponentTimeline from '@/views/components/visualisation/timeline/ComponentTimeline.vue';
import iframeResize from 'iframe-resizer/js/iframeResizer';

@Component({
   components: {
      ComponentTimeline,
   },
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
   onMyFrameLoad() {
    console.log('myframe is loaded');
    }
   updated(){
     iframeResize({ log: true }, '#myIframe')
   }
   /*get srcurl(){
     return iFrameURL + '?ppnviewed=' + ppnNumber + '&orderby=' + orderBy + '&collectionStatus=' + collectionStatus + '&tree=' + tree
   }*/

}


</script>
