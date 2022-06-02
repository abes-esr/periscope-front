<template>
   <v-container fluid>
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
            <component-mentions-legales></component-mentions-legales>
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
import ComponentMentionsLegales from '@/views/components/mention/MentionsLegalesComponent.vue';
import ComponentHeader from '@/views/components/Header.vue';
import ComponentFooter from '@/views/components/Footer.vue';
import ComponentStepper from '@/views/components/Stepper.vue';

import {Component, Vue} from 'vue-property-decorator';

@Component({
   components: {ComponentHeader, ComponentStepper, ComponentFooter, ComponentMentionsLegales},
})
export default class MentionsLegales extends Vue {}
</script>
