<template>
   <v-row justify="center">
      <v-col cols="11">
         <v-expansion-panels>
            <component-bloc></component-bloc>
         </v-expansion-panels>
      </v-col>
   </v-row>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from "vue-property-decorator";
import {namespace} from 'vuex-class';
import ComponentBloc from '@/components/accueil_avance_niv1/ComponentPpn.vue';

const RequeteDeRecherche = namespace('RequeteDeRecherche');

@Component({
   components: {
      ComponentBloc,
   },
})
export default class AccueilAvance extends Vue {}
</script>
