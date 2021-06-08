<template>
   <v-container>
      <v-row>
         <v-col>
            <component-header></component-header>
         </v-col>
      </v-row>
      <v-row style="margin-bottom: 1em">
         <v-col>
            <component-stepper></component-stepper>
         </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 outlined-app">
         <v-col xs="2" sm="2" lg="2">
            <p>qsfe</p>
         </v-col>
         <v-col xs="10" sm="10" lg="10">
            <p>qsfe</p>
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
