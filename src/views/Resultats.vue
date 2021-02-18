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
            <v-btn v-on:click="clickVisualisation">Data Visualisation in console</v-btn>
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
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';
import {Component, Vue} from 'vue-property-decorator';
import ComponentFooter from '@/components/accueil_niv1/Footer.vue';
import {namespace} from 'vuex-class';

const ResultatDeRecherche = namespace('ResultatDeRecherche');

@Component({
   components: {
      ComponentStepper,
      ComponentHeader,
      ComponentFooter,
   },
})
export default class Resultats extends Vue {
   @ResultatDeRecherche.Action
   private displayNotices!: () => void;

   private clickVisualisation() {
      this.displayNotices();
   }
}
</script>
