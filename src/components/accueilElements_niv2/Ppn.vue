<template>
   <v-container>
      <v-select :items="optionsPpn" v-on:click="disableDefaultSlotValue0 = false" label="Par defaut, et" class="style1" outlined v-model="optionsPpnSelected" dense>
         <template v-if="disableDefaultSlotValue0" slot="selection">
            <span style="color: grey">Et/ou/sauf</span>
         </template>
      </v-select>
      <v-row>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="PPN" placeholder="saisir un n° de ppn" class="style1" v-model="ppnTypedInStringType"> </v-text-field>
         </v-col>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="ISSN" placeholder="saisir un n° issn" class="style1" v-model="issnTypedInStringType"></v-text-field>
         </v-col>
      </v-row>
      <v-expansion-panels flat class="outlined-app">
         <v-expansion-panel>
            <v-expansion-panel-header> Rechercher par d'autres critères </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-text-field clearable multiple outlined small-chips label="Mots du titre" placeholder="tapez un titre (optionnel)" class="style2" v-model="titleWordsTyped"></v-text-field>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsEditor" label="et/ou/sauf" outlined v-model="optionsEditorSelected" class="style2"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Editeur" placeholder="tapez un editeur (optionnel)" class="style2" v-model="editorTyped"></v-text-field>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsLanguage" label="et/ou/sauf" outlined v-model="optionsLanguageSelected" class="style2"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Langue du document" placeholder="tapez la langue (optionnel)" class="style2" v-model="languageTyped"></v-text-field>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsCountry" label="et/ou/sauf" outlined class="style2" v-model="optionsCountrySelected"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Pays de publication" placeholder="tapez un pays (optionnel)" class="style2" v-model="countryTyped"></v-text-field>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

//Import de classe
const requeteDeRecherche = namespace('RequeteDeRecherche');

interface OptionsProvider {
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

enum Ensemble {
   Union, //0
   Intersection, //1
   Difference, //2
}

@Component
export default class VuePpn extends Vue {
   //Setters de classe
   @requeteDeRecherche.Action
   private updateGlobalOptionsPpnSelected!: (element: Ensemble) => void;
   @requeteDeRecherche.Action
   private updateGlobalPpnTypedInNumber!: (element: number) => void;
   @requeteDeRecherche.Action
   private updateGlobalIssnTypedInNumber!: (element: number) => void;
   @requeteDeRecherche.Action
   private updateGlobalTitleWordsTyped!: (element: string) => void;
   @requeteDeRecherche.Action
   private updateGlobalOptionsEditorSelected!: (element: Ensemble) => void;
   @requeteDeRecherche.Action
   private updateGlobalEditorTyped!: (element: string) => void;
   @requeteDeRecherche.Action
   private updateGlobalOptionsLanguageSelected!: (element: Ensemble) => void;
   @requeteDeRecherche.Action
   private updateGlobalLanguageTyped!: (element: string) => void;
   @requeteDeRecherche.Action
   private updateGlobalOptionsCountrySelected!: (element: Ensemble) => void;
   @requeteDeRecherche.Action
   private updateGlobalCountryTyped!: (element: string) => void;

   //Slots
   private disableDefaultSlotValue0 = true;

   //A chaque creation
   created() {
      if (this.ppnTypedInStringType === '0') {
         this.ppnTypedInStringType = '';
      }
      if (this.issnTypedInStringType === '0') {
         this.issnTypedInStringType = '';
      }
   }

   //A Chaque modification, setters de classe
   updated() {
      this.updateGlobalOptionsPpnSelected(this.optionsPpnSelected);
      /*Setter qui transforme la chaine de caractère en nombre,
     cette dernière ne devant contenir que des nombres,
     et reinitialise la valeur du champ si l'utilisateur à saisi des alphanumériques
     Ne pas mettre d'attribut clearable sur les champs spécifiés
     */
      //PPN
      if (this.ppnTypedInStringType.match('\\D')) {
         this.ppnTypedInStringType = '';
      } else {
         this.updateGlobalPpnTypedInNumber(+this.ppnTypedInStringType);
      }
      //ISSN
      if (this.issnTypedInStringType.match('\\D')) {
         this.issnTypedInStringType = '';
      } else {
         this.updateGlobalIssnTypedInNumber(+this.issnTypedInStringType);
      }
      this.updateGlobalOptionsPpnSelected(this.optionsPpnSelected);
      this.updateGlobalTitleWordsTyped(this.titleWordsTyped);
      this.updateGlobalOptionsEditorSelected(this.optionsEditorSelected);
      this.updateGlobalEditorTyped(this.editorTyped);
      this.updateGlobalOptionsLanguageSelected(this.optionsLanguageSelected);
      this.updateGlobalLanguageTyped(this.languageTyped);
      this.updateGlobalOptionsCountrySelected(this.optionsCountrySelected);
      this.updateGlobalCountryTyped(this.countryTyped);
   }

   /*Attributs*/

   //Par defaut, et
   private optionsPpn: Array<OptionsProvider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   private optionsPpnSelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsPpnSelected;
   //N° de PPN
   private ppnTypedInStringType = String(this.$store.state.RequeteDeRecherche.globalPpnTypedInNumber);
   //N° de ISSN
   private issnTypedInStringType = String(this.$store.state.RequeteDeRecherche.globalIssnTypedInNumber);
   //Mots du titre
   private titleWordsTyped = String(this.$store.state.RequeteDeRecherche.globalTitleWordsTyped);
   //et / ou / sauf pour Editeur
   private optionsEditor: Array<OptionsProvider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   private optionsEditorSelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsEditorSelected;
   //Editeur tapé
   private editorTyped = String(this.$store.state.RequeteDeRecherche.globalEditorTyped);
   //Et / ou / sauf de la langue du document
   private optionsLanguage: Array<OptionsProvider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   private optionsLanguageSelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsLanguageSelected;
   //Langue du document tapé
   private languageTyped = String(this.$store.state.RequeteDeRecherche.globalLanguageTyped);
   //Et / ou / sauf du pays de publication
   private optionsCountry: Array<OptionsProvider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   private optionsCountrySelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsCountrySelected;
   //Pays de publication tapé
   private countryTyped = String(this.$store.state.RequeteDeRecherche.globalCountryTyped);
}
</script>
