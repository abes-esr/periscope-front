<template>
   <v-navigation-drawer v-model="drawer" permanent style="margin-right: 1rem" v-bind:class="[displayDrawer ? 'd-flex' : 'd-none']">
      <v-expansion-panels multiple accordion>
         <v-expansion-panel v-for="p in panels" :key="p.id">
            <v-expansion-panel-header>
               {{ p.text }}
            </v-expansion-panel-header>
            <v-expansion-panel-content style="padding-left: 0.5em; margin-top: -0.5em">
               <v-container fluid v-for="(val, i) in p.elements" :key="i" style="max-height: 2em; padding: 0">
                  <p>val</p>
                  <p>i</p>
               </v-container>
            </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>
   </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ListItem, ListRcr, ListLabel, Panel} from '@/store/visualisation/VisualisationDefinition';

@Component
export default class ExemplaireViewerLeftPanel extends Vue {
   panels: Array<Panel>;
   drawer: any;
   displayDrawer: boolean;

   constructor() {
      super();
      this.panels = [
         {id: 0, text: 'Affichage', elements: this.getListStatusDisplayed},
         {id: 1, text: 'Tris', elements: this.getListSortDisplayed},
         {id: 2, text: 'Legende', elements: this.getListLegend},
         {id: 3, text: 'Etablissements', elements: this.getListRcr},
         {id: 4, text: 'Pôles', elements: this.getListPole},
      ];
      this.displayDrawer = false;
      this.drawer = null;
   }

   /**
    * Retourne les possibilités de restriction sur un titre
    * @return Liste des filtres possibles sur une collection
    */
   get getListStatusDisplayed(): Array<ListItem> {
      return [
         {id: 0, text: 'Afficher tous les statuts', value: false},
         {id: 1, text: 'Collection disponible', value: false},
         {id: 2, text: 'Collection lacunaire', value: false},
         {id: 3, text: 'Collection en erreur', value: false},
      ];
   }

   /**
    * Retourne la liste de tri
    * @Return Liste tri possibles sur un titre
    */
   get getListSortDisplayed(): Array<ListItem> {
      return [
         {id: 0, text: 'Trier par PCP', value: false},
         {id: 1, text: 'Trier par RCR', value: false},
         {id: 2, text: 'Trier par Date', value: false},
      ];
   }

   /**
    * Retourne la liste des légendes
    * @Return Liste des légendes
    */
   get getListLegend(): Array<ListItem> {
      return [
         {id: 0, text: 'Collection sans information de lacunes', value: false},
         {id: 1, text: 'Collection lacunaire', value: false},
         {id: 2, text: 'Erreur', value: false},
         {id: 2, text: 'Synthèse disponible', value: false},
         {id: 2, text: 'Synthèse lacunaire', value: false},
      ];
   }

   get getListPole(): Array<ListItem> {
      return [
         {id: 0, text: 'Pôle de conservation', value: false},
         {id: 1, text: 'Membre du plan de conservation', value: false},
      ];
   }

   /**
    * Retourne la liste des rcr associé à un titre
    * @Return Liste des rcr
    */
   get getListRcr(): Array<ListRcr> {
      //TODO pour un titre donné il faudra essayer de faire un ws qui ne parcoura que les 2 premiers niveaux de holdings, ou bien alors travailler a partir du retour de holdings deja implémenté
      return [
         {rcrNumber: 330636101, rcrDepartment: 33, rcrRegion: 'Nouvelle Aquitaine', rcrPcpAttachedOrNot: true, rcrPcpAttachedLabel: 'PCP Aquitaine'},
         {rcrNumber: 452345106, rcrDepartment: 45, rcrRegion: 'Centre-Val de Loire', rcrPcpAttachedOrNot: false, rcrPcpAttachedLabel: ''},
      ];
   }

   /**
    * TODO faire l'implémentation avec une liste en back
    * Retourne pour un rcr donné le département associé
    * @param rcr
    */
   get getDepartementOfRcr(rcr: number): number {
      return 0;
   }

   /**
    * TODO faire l'implémentation avec une liste en back
    * Retourne pour un rcr donné la région associé
    * @param rcr
    */
   get getRegionOfRcr(rcr: number): number {
      return 0;
   }

   //TODO dans le cadre du prototype pr accelerer les devpt je n'ai pas déporté en store les données
}
</script>
