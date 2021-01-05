<template>
   <v-container>
      <component-header></component-header>
      <component-recherche></component-recherche>
      <component-footer></component-footer>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentRecherche from '@/components/accueil_niv1/Recherche.vue';
import ComponentFooter from '@/components/accueil_niv1/Footer.vue';
import { namespace } from "vuex-class";

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

@Component({
   components: {
      ComponentHeader,
      ComponentRecherche,
      ComponentFooter,
   },
})
export default class Accueil extends Vue {
}
</script>
