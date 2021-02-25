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
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentRecherche from '@/components/accueil_niv1/Recherche.vue';
import ComponentFooter from '@/components/accueil_niv1/Footer.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';

@Component({
   components: {
      ComponentStepper,
      ComponentHeader,
      ComponentRecherche,
      ComponentFooter,
   },
})
export default class Recherche extends Vue {
   clickVisualisation(): void {
      this.$store
         .dispatch('displayStore')
         .then(() => {
            console.log('Requête supérieure à 5 secondes');
            setTimeout(() => {
               console.log('');
            }, 5000);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   feedJson(): void {
      this.$store.dispatch('constructJsonAction');
   }

   callAxios(): void {
     this.$store.dispatch('getNoticesAndErasePreviousNoticesAction');
   }
}
</script>
