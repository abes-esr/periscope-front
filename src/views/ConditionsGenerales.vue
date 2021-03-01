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
import ComponentCgu from '@/components/autres/CguComponent.vue';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentFooter from '@/components/accueil_niv1/Footer.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';

import {Component, Vue} from 'vue-property-decorator';
@Component({
  components: {ComponentHeader, ComponentStepper, ComponentFooter, ComponentCgu}
})
export default class ConditionsGenerales extends Vue {}
</script>
