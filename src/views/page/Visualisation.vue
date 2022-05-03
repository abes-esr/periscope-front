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
            <tableau-visualisation></tableau-visualisation>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-footer></component-footer>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '../components/Header.vue';
import ComponentStepper from '../components/Stepper.vue';
import TableauVisualisation from '@/views/components/visualisation/TableauVisualisation.vue';
import ComponentFooter from '@/views/components/Footer.vue';
import DetailNotice from '@/views/components/visualisation/DetailNotice.vue';

@Component({
   components: {
      DetailNotice,
      ComponentHeader,
      ComponentStepper,
      ComponentFooter,
      TableauVisualisation,
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
