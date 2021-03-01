<template>
   <v-container class="outlined-app">
      <v-container>
         <v-row>
            <v-col>
               <h3>Mentions Légales</h3>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Editeur</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>Agence Bibliographique de l'Enseignement Supérieur (ABES) <br />Etablissement public à caractère administratif <br />Siret : 180 044 224 000 20 <br />227 avenue Professeur Jean-Louis Viala <br />CS 84308 <br />34193 MONTPELLIER CEDEX 5 <br />04.67.54.84.10</p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Directeur de publication</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>David Aymonin</p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Hebergeur</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>Centre Informatique National de l’Enseignement Supérieur (CINES) 950 rue de Saint-Priest 34097 MONTPELLIER CEDEX 5</p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Crédits</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>periscope.sudoc.fr a été conçu et développé par l'ABES</p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Présentation du site</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  Le site periscope.sudoc.fr a pour objet :
                  <br />La visualisation des états de collection du Sudoc. L’objectif de cette application est d’afficher le plus lisiblement possible les états de collection déclarés sur un titre. L’application Périscope s’adresse particulièrement aux gestionnaires de plans de conservation
                  partagée. Par extension, elle peut intéresser tous les professionnels spécialisés dans la gestion des périodiques référencés dans le Sudoc.
               </p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Contact</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  Pour toute question ou demande d'information concernant le site, ou tout signalement de contenu ou d'activités illicites, l'utilisateur peut contacter :
                  <br />Guichet d'assistance <br />Le secrétariat de l'ABES au +33 4 67 54 84 10
               </p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Propriété intellectuelle</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  La structuration du site mais aussi les textes, graphiques, images, photographies, sons, vidéos et applications informatiques qui le composent sont la propriété de l'éditeur et sont protégés comme tels par les lois en vigueur au titre de la propriété intellectuelle. Toute
                  représentation, reproduction, adaptation ou exploitation partielle ou totale des contenus, marques déposées et services proposés par le site, par quelque procédé que ce soit, sans l'autorisation préalable, expresse et écrite de l'éditeur, est strictement interdite et serait
                  susceptible de constituer une contrefaçon au sens des articles L. 335-2 et suivants du Code de la propriété intellectuelle. Et ce, à l'exception des éléments expressément désignés comme libres de droits sur le site. L'accès au site ne vaut pas reconnaissance d'un droit et, de
                  manière générale, ne confère aucun droit de propriété intellectuelle relatif à un élément du site, lesquels restent la propriété exclusive de l'éditeur. Il est interdit à l'utilisateur d'introduire des données sur le site qui modifieraient ou qui seraient susceptibles d'en modifier
                  le contenu ou l'apparence.
               </p>
            </v-col>
         </v-row>
      </v-container>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class MentionsLegalesComponent extends Vue {}
</script>
