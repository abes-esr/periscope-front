<template>
   <v-container>
      <v-btn v-on:click="clickVisualisation">TEST - Chaîne globale</v-btn> <v-btn>Requête Solr</v-btn>
     <v-btn v-on:click="consommationApi">TEST - Consommation API</v-btn>
     <v-btn v-on:click="affichageMembre">TEST - Affichage membre classe</v-btn>
      <component-header></component-header>
      <component-recherche></component-recherche>
      <component-footer></component-footer>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentHeader from '@/components/accueil_niv1/Header.vue';
import ComponentRecherche from '@/components/accueil_niv1/Recherche.vue';
import ComponentFooter from '@/components/accueil_niv1/Footer.vue';
import { namespace } from "vuex-class";

//Classe importée
const RequeteDeRecherche = namespace('RequeteDeRecherche');

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

@Component({
   components: {
      ComponentHeader,
      ComponentRecherche,
      ComponentFooter,
   },
})
export default class Accueil extends Vue {
  @RequeteDeRecherche.Action
  private displayFinalRequest!: () => void;

  @RequeteDeRecherche.Action
  private getOneTest!: () => void;

   updated(): void {
      console.log('step');
   }
   get testReactive(): Array<Provider> {
      //Les getters des parents ne sont actuellement pas reactive
      return this.$store.state.RequeteDeRecherche.globalRegions;
   }
   private clickVisualisation(){
     this.displayFinalRequest();
   }

   //Utilisation d'un ws, et affectation des membres de classes avec le resultat (Test)
   private consommationApi(){
     this.getOneTest();
   }

   private affichageMembre(){
     window.alert(JSON.stringify(this.$store.state.RequeteDeRecherche.tutorials));
   }

}
</script>
