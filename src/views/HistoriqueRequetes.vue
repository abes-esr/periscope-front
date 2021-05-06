<template>
   <v-container>
      <v-row>
         <v-col>
            <component-header></component-header>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-stepper></component-stepper>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-container class="ma-0 pa-0 outlined-app">
               <v-row align="center">
                  <v-col cols="12">Requetes Enregistrées</v-col>
                  <v-col cols="12">
                     <ul v-for="i in requestsHistory" v-bind:key="i">
                        <li>{{ i }}</li>
                     </ul>
                  </v-col>
               </v-row>
            </v-container>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '../components/page/Header.vue';
import ComponentStepper from '../components/page/Stepper.vue';

@Component({
   components: {
      ComponentHeader,
      ComponentStepper,
   },
})
export default class HistoriqueRequetes extends Vue {
   requestsHistory: Array<string>;

   constructor() {
      super();
      this.requestsHistory = this.getHistoryRequests;
   }

   get getHistoryRequests(): Array<string> {
      return this.$store.state.blocRequeteDirecte._historyOfAllRequests;
   }
}
</script>

<style scoped></style>
