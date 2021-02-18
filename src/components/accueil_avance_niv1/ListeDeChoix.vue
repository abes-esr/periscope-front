<template>
   <v-container class="ma-0 pa-0 outlined-app">
     <v-row :align="getVerticalAlignValue(1)">
       <v-col cols="4">Ajouter un bloc de recherche</v-col>
       <v-col cols="8"><v-select dense outlined :items="items" label="Standard" style="margin: 0.5em 0.5em -1.1em 0"></v-select></v-col>
     </v-row>
   </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import GlobalPropertiesMixin from "@/mixins/globalProperties";

@Component
export default class ListeDeChoix extends Mixins(GlobalPropertiesMixin) {
  private items: Array<string> = [
    'Recherche par PPN',
    'Recherche par ISSN',
  ]
}
</script>

<style scoped></style>
