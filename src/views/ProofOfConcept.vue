<template>
   <v-container>
      <v-row>
         <v-col>
            <component-header></component-header>
         </v-col>
      </v-row>
      <v-row>
         <v-col>Vue pour faire des tests graphiques</v-col>
      </v-row>
      <v-row>
         <component-visualisation></component-visualisation>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentVisualisation from '@/components/poc/Visualisation.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
   components: {
      ComponentHeader,
      ComponentVisualisation,
   },
})
export default class ProofOfConcept extends Vue {
   constructor() {
      super();
   }
}
</script>

<style scoped></style>
