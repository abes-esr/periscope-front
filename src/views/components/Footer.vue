<template>
     <v-footer absolute padless color="#0f75bc">
       <v-container fluid>
         <v-row align="center" style="background-color: #2c2968; color: white; font-size: 1em">
           <v-col lg="3">
             <span>Periscope, comparez vos collections de périodiques — {{ new Date().getFullYear() }}</span>
           </v-col>
           <v-col lg="3" offset-lg="6">
             <span>Données personnelles | C.G.U. | Mentions légales | Accessibilité</span>
           </v-col>
         </v-row>
       <v-row align="center" style="background-color: #2c2968; color: white; font-size: 1em">
         <v-col lg="3">
           <span>Periscope, comparez vos collections de périodiques — {{ new Date().getFullYear() }}</span>
         </v-col>
         <v-col lg="3" offset-lg="6">
           <span>Données personnelles | C.G.U. | Mentions légales | Accessibilité</span>
         </v-col>
       </v-row>
       </v-container>
     </v-footer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  link1: string;
  link2: string


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


