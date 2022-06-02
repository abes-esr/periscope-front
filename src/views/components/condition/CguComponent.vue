<template>
   <v-container class="outlined-app" fluid>
      <v-container>
         <v-row>
            <v-col>
               <h3>Conditions générales d'utilisation</h3>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Acceptation des conditions d’utilisation</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  L'accès et l'utilisation du site sont soumis à l'acceptation et au respect des présentes Conditions Générales d'Utilisation (CGU). L'éditeur se réserve le droit de modifier, à tout moment et sans préavis, le site et des services ainsi que les présentes CGU, notamment pour s'adapter
                  aux évolutions du site par la mise à disposition de nouvelles fonctionnalités ou la suppression ou la modification de fonctionnalités existantes. Il est donc conseillé à l'utilisateur de se référer avant toute navigation à la dernière version des CGU, accessible à tout moment sur
                  le site. En cas de désaccord avec les CGU, aucun usage du site ne saurait être effectué par l'utilisateur.
               </p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Gestion du site, accès et navigation</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  L'éditeur met en œuvre les solutions techniques à sa disposition pour permettre l'accès au site 24 heures sur 24, 7 jours sur 7. Il pourra néanmoins à tout moment suspendre, limiter une catégorie déterminée d'internaute ou interrompre l'accès au site ou à certaines pages de
                  celui-ci afin de procéder à des mises à jour, des modifications de son contenu ou toute autre action jugée nécessaire au bon fonctionnement du site. Il pourra également supprimer toute information pouvant en perturber le fonctionnement ou entrant en contravention avec les lois
                  nationales ou internationales, ou avec les règles de la <a href="https://fr.wikipedia.org/wiki/N%C3%A9tiquette">Nétiquette</a>. La connexion et la navigation sur le site periscope.sudoc.fr valent acceptation sans réserve des présentes Conditions Générales d'Utilisation, quelques
                  soient les moyens techniques d'accès et les terminaux utilisés.
               </p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Responsabilités</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>L'éditeur n'est responsable que du contenu qu'il a lui-même édité. L'éditeur n'est pas responsable :</p>
               <ul>
                  <li>en cas de problèmes ou défaillances techniques, informatiques ou de compatibilité du site avec un matériel ou logiciel quel qu'il soit ;</li>
                  <li>des dommages directs ou indirects, matériels ou immatériels, prévisibles ou imprévisibles résultant de l'utilisation ou des difficultés d'utilisation du site ou de ses services ;</li>
                  <li>des caractéristiques intrinsèques de l'Internet, notamment celles relatives au manque de fiabilité et au défaut de sécurisation des informations y circulant ;</li>
                  <li>
                     des contenus ou activités illicites utilisant son site et ce, sans qu'il en ait pris dûment connaissance au sens de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique et du Règlement Général européen sur la Protection des Données (RGPD) relative à la
                     protection des personnes physiques à l'égard de traitement de données à caractère personnel.
                  </li>
               </ul>
               <p>Par ailleurs, le site ne saurait garantir l'exactitude, la complétude, et l'actualité des informations qui y sont diffusées.</p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Liens hypertextes</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>
                  Le site peut contenir des liens hypertextes pointant vers d'autres sites internet sur lesquels periscope.sudoc.fr n'exerce pas de contrôle. Malgré les vérifications préalables et régulières réalisées par l'éditeur, celui-ci décline tout responsabilité quant aux contenus qu'il est
                  possible de trouver sur ces sites. L'éditeur autorise la mise en place de liens hypertextes vers toute page ou document de son site. Sont exclus de cette autorisation les sites diffusant des informations à caractère illicite, violent, polémique, pornographique, xénophobe ou pouvant
                  porter atteinte à la sensibilité du plus grand nombre. Enfin, periscope.sudoc.fr se réserve le droit de faire supprimer à tout moment un lien hypertexte pointant vers son site, si le site l'estime non conforme à sa politique éditoriale.
               </p>
            </v-col>
         </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
         <v-row>
            <v-col>
               <h4>Loi applicable et juridiction compétente</h4>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <p>Les présentes Conditions Générales d'Utilisation sont régies par la loi française. En cas de différend et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.</p>
            </v-col>
         </v-row>
      </v-container>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Cgu extends Vue {}
</script>
