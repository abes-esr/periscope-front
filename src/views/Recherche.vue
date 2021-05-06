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
            <component-recherche></component-recherche>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-btn @click="feedJson">Feed JSON</v-btn>
            <v-btn @click="callAxios">Call Axios</v-btn>
            <v-btn @click="clickVisualisation">Data Visualisation in console</v-btn>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <component-footer></component-footer>
         </v-col>
      </v-row>
      <component-snackbar></component-snackbar>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '@/components/page/Header.vue';
import ComponentRecherche from '@/components/recherche/Recherche.vue';
import ComponentFooter from '@/components/page/Footer.vue';
import ComponentStepper from '@/components/page/Stepper.vue';
import ComponentSnackbar from '@/components/page/autres/Alerte.vue';
import {Logger} from '@/store/utils/Logger';

@Component({
   components: {
      ComponentStepper,
      ComponentHeader,
      ComponentRecherche,
      ComponentFooter,
      ComponentSnackbar,
   },
})
export default class Recherche extends Vue {
   clickVisualisation(): void {
      this.$store
         .dispatch('displayStore')
         .then(() => {
            Logger.debug('Requête supérieure à 5 secondes');
            setTimeout(() => {
               Logger.debug('');
            }, 5000);
         })
         .catch((error) => {
            Logger.error(error);
         });
   }

   feedJson(): void {
      this.$store.dispatch('constructJsonAction');
   }

   callAxios(): void {
      this.$store.dispatch('getNoticesAndErasePreviousNoticesAction', true);
   }
}
</script>
