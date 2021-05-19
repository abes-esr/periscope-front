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
            <component-tableau-resultats></component-tableau-resultats>
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
import ComponentHeader from '@/components/page/Header.vue';
import ComponentStepper from '@/components/page/Stepper.vue';
import {Component, Vue} from 'vue-property-decorator';
import ComponentFooter from '@/components/page/Footer.vue';
import ComponentTableauResultats from '@/components/resultat/TableauResultats.vue';
import {Logger} from '@/store/utils/Logger';

@Component({
   components: {
      ComponentStepper,
      ComponentHeader,
      ComponentFooter,
      ComponentTableauResultats,
   },
})
export default class Resultats extends Vue {
   private clickVisualisation() {
      this.$store.dispatch('displayStore').catch((err) => {
         Logger.error(err);
      });
   }
}
</script>
