<template>
   <v-container fluid>
      <v-row :justify="getHorizontalJustifyValue(1)">
         <v-col xs="6" sm="6">
            <img src="@/assets/logoABES.jpg" />
         </v-col>
      </v-row>
      <v-row :justify="getHorizontalJustifyValue(1)">
         <v-col xs="6" sm="3">
            <a @click="conditionsGenerales()">Conditions générales d'utilisation</a>
         </v-col>
         <v-col xs="6" sm="3">
            <a href="https://stp.abes.fr/node/3?origine=periscope">Assistance</a>
         </v-col>
         <v-col xs="6" sm="3">
            <a @click="mentionsLegales()">Mentions légales</a>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';

@Component
export default class Footer extends Mixins(GlobalPropertiesMixin) {
   //Events
   conditionsGenerales(): void {
      this.$router.replace('conditions-generales');
   }
   mentionsLegales(): void {
      this.$router.replace('mentions-legales');
   }
}
</script>
