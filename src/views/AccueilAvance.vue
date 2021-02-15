<template>
   <v-expansion-panels style="padding-top: 1em">
      <component-bloc></component-bloc>
   </v-expansion-panels>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
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
