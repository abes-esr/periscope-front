<template>
   <v-expansion-panel class="outlined-app blocPanel">
      <v-row align="center">
         <v-col xs="12">Titre 1</v-col>
         <v-col xs="12">Titre 2</v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class BlocTitre extends Vue {
   constructor() {
      super();
   }
}
</script>
