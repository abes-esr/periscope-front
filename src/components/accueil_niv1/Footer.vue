<template>
   <v-container fluid>
      <v-row :justify="getHorizontalJustifyValue(1)">
         <v-col xs="6" sm="6">
            <img src="@/assets/logoABES.jpg" />
         </v-col>
      </v-row>
      <v-row :justify="getHorizontalJustifyValue(1)">
         <v-col xs="6" sm="3">
            <a href="">Conditions générales d'utilisation</a>
         </v-col>
         <v-col xs="6" sm="3">
            <a href="https://stp.abes.fr/node/3?origine=periscope">Assistance</a>
         </v-col>
         <v-col xs="6" sm="3">
            <a href="">Mentions légales</a>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';

@Component
export default class Footer extends Mixins(GlobalPropertiesMixin) {}
</script>
