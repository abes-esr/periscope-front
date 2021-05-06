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
            <component-cgu></component-cgu>
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
import ComponentCgu from '@/components/page/autres/CguComponent.vue';
import ComponentHeader from '@/components/page/Header.vue';
import ComponentFooter from '@/components/page/Footer.vue';
import ComponentStepper from '@/components/page/Stepper.vue';

import {Component, Vue} from 'vue-property-decorator';

@Component({
   components: {ComponentHeader, ComponentStepper, ComponentFooter, ComponentCgu},
})
export default class ConditionsGenerales extends Vue {}
</script>
