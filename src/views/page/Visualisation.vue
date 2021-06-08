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
                  <v-col cols="12">Visualisation</v-col>
               </v-row>
            </v-container>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '../components/Header.vue';
import ComponentStepper from '../components/Stepper.vue';

@Component({
   components: {
      ComponentHeader,
      ComponentStepper,
   },
})
export default class Visualisation extends Vue {
   test = 'test';

   constructor() {
      super();
      this.test = 'dhu';
   }
}
</script>
