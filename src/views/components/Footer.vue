<template>
   <v-container fluid>
      <v-row justify="center">
         <v-col xs="6" sm="6">
            <img src="@/assets/logoABES.jpg" alt="logo abes" />
         </v-col>
      </v-row>
      <v-row justify="center">
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
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {

   //Events
   conditionsGenerales(): void {
      this.$router.replace('conditions-generales');
   }
   mentionsLegales(): void {
      this.$router.replace('mentions-legales');
   }
   created() {
      let ckeditor = document.createElement('script');    ckeditor.setAttribute('src',"//cdn.ckeditor.com/4.6.2/full/ckeditor.js");
      document.head.appendChild(ckeditor);
   }
}

</script>


