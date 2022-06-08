<template>
   <v-footer absolute padless color="#0f75bc">
      <v-row align="center" style="background-color: #0f75bc; color: white; font-size: 1em">
         <v-col cols="auto" class="mr-auto" lg="8" style='text-align: start; padding-left: 2em; padding-right: 2em' v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.sm">
            <span>
               Périscope permet d’explorer les données bibliographiques et d’exemplaires du Sudoc pour les publications
               en série. En combinant des recherches multi critères, il est possible de définir un corpus de titres et
               d'exporter les principales informations descriptives. La visualisation par frise chronologique des états
               de collection fait aussi de Périscope un outil d’aide à la décision en matière de désherbage,
               conservation, valorisation des collections.
            </span>
         </v-col>
         <v-col md="auto" style='text-align: start; padding-left: 2em'>
            <div><a href="https://documentation.abes.fr/sudoc/" style="color: white">Sudoc</a></div>
            <div><a href="https://documentation.abes.fr/aideperiscope/" style="color: white">Documentation</a></div>
            <div><a href="https://stp.abes.fr/node/3?origine=sudocpro" style="color: white">ABESstp</a></div>
         </v-col>
         <v-col cols="auto" style="padding-right: 2em; padding-left: 2em">
            <span style='padding-right: 1em'><a href="https://abes.fr/"><img src="@/assets/abes.png" /></a></span>
            <span><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/MESRI_logo.svg" /></a></span>
         </v-col>
      </v-row>
      <v-row align='center' style="background-color: #2c2968; color: white; font-size: 1em">
         <v-col cols="auto" class="mr-auto" style='text-align: start; padding-left: 2em'>
            <span>Periscope, comparez vos collections de périodiques — {{ new Date().getFullYear() }} </span>
         </v-col>
         <v-col cols="auto" style='text-align: start; padding-left: 2em; padding-right: 2em'>
            <span>
               <!--<a href="" style="color: white">Données personnelles</a> |-->
               <a href="https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html" style="color: white">C.G.U.</a>
               |
               <a href="https://abes.fr/pages-mentions-legales/periscope.sudoc.html" style="color: white">Mentions légales</a>
               |
               <a href="https://abes.fr/pages-accessibilite/periscope.html" style="color: white">Accessibilité</a>
               <!--<a href="https://status-all.abes.fr/" style="color: white">Disponibilité actuelle de l'application</a> |-->
            </span>
         </v-col>
      </v-row>
   </v-footer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
   constructor() {
      super();
      this.frontVersion();
   }

   frontVersion(): void {
      console.log(process.env.npm_package_version);
   }
}
</script>
