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
            <component-liste-de-choix></component-liste-de-choix>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-expansion-panels>
               <v-row
                  ><v-col><component-bloc></component-bloc></v-col
               ></v-row>
               <v-row
                  ><v-col><component-bloc></component-bloc></v-col
               ></v-row>
            </v-expansion-panels>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import ComponentBloc from '@/components/accueil_avance_niv1/ComponentPpn.vue';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentStepper from '@/components/stepper/Stepper.vue';
import ComponentListeDeChoix from '@/components/accueil_avance_niv1/ListeDeChoix.vue';

const RequeteDeRecherche = namespace('RequeteDeRecherche');

@Component({
   components: {
      ComponentHeader,
      ComponentStepper,
      ComponentBloc,
      ComponentListeDeChoix,
   },
})
export default class RechercheAvance extends Vue {}
</script>
