<template>
   <v-footer absolute padless color="#0f75bc">
      <v-row align="center" style="background-color: #0f75bc; color: white; font-size: 1em">
         <v-col lg="6">
            <span
               >Cette application permet d’explorer les données bibliographiques et d’exemplaires du Sudoc pour les publications en série. En combinant des recherches multi critères, il est possible de définir un corpus de titres, dont on pourra exporter les informations descriptives principales. La
               visualisation par frise chronologique des états de collections est un outil d’aide à la décision en matière de désherbage, conservation, valorisation des collections.</span
            >
         </v-col>
         <v-col lg="2" style="text-align: left" offset-lg="1">
            <h2>Accès direct</h2>
            <div><a href="https://documentation.abes.fr/sudoc/" style="color: white">Sudoc</a></div>
            <div><a href="https://documentation.abes.fr/aideperiscope/" style="color: white">Documentation</a></div>
            <div><a href="https://stp.abes.fr/node/3?origine=sudocpro" style="color: white">ABESstp</a></div>
         </v-col>
         <v-col lg="3">
            <span style="margin-right: 1em"
               ><a href="https://abes.fr/"><img src="@/assets/abes.png" /></a
            ></span>
            <span
               ><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/logo-mesri.png" /></a
            ></span>
         </v-col>
      </v-row>
      <v-row align="center" style="background-color: #2c2968; color: white; font-size: 1em">
         <v-col lg="3">
            <span>Periscope, comparez vos collections de périodiques — {{ new Date().getFullYear() }}</span>
         </v-col>
         <v-col lg="4" offset-lg="5">
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
export default class Footer extends Vue {}
</script>
