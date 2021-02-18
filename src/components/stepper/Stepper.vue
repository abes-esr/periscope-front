<template>
   <v-container class="ma-0 pa-0">
      <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" no-gutters dense>
         <v-col>
            <v-stepper alt-labels>
               <v-stepper-header>
                  <v-stepper-step step="1">Recherche</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2">Résultats</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">Visualisation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="4">Exports</v-stepper-step>
               </v-stepper-header>
            </v-stepper>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '../../mixins/globalProperties';

@Component
export default class Stepper extends Mixins(GlobalPropertiesMixin) {}
</script>

<style scoped></style>
