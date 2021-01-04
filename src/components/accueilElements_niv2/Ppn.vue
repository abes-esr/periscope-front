<template>
   <v-container>
      <v-select :items="optionsPpn" v-on:click="disableDefaultSlotValue0 = false" label="Par defaut, et" outlined v-model="optionsPpnSelected" dense>
         <template v-if="disableDefaultSlotValue0" slot="selection">
            <span style="color: grey">Et/ou/sauf</span>
         </template>
      </v-select>
      <span>{{ optionsPpnSelected }}</span>
      <span>{{ typeof optionsPpnSelected }}</span>

      <v-row>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="PPN" placeholder="saisir un n° de ppn" style="background-color: white; max-height: 2.5em" v-model="ppnTypedInStringType"> </v-text-field>
            <span>{{ ppnTypedInStringType }}</span>
            <span>{{ typeof ppnTypedInStringType }}</span>
         </v-col>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="ISSN" placeholder="saisir un n° issn" style="background-color: white; max-height: 2.5em" v-model="issnTypedInStringType"></v-text-field>
            <span>{{ issnTypedInStringType }}</span>
            <span>{{ typeof issnTypedInStringType }}</span>
         </v-col>
      </v-row>
      <v-expansion-panels flat class="outlined-app">
         <v-expansion-panel>
            <v-expansion-panel-header> Rechercher par d'autres critères </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-text-field clearable multiple outlined small-chips label="Mots du titre" placeholder="tapez un titre (optionnel)" style="background-color: white; max-height: 3.5em" v-model="titleWordsTyped"></v-text-field>
               <span>{{ titleWordsTyped }}</span>
               <span>{{ typeof titleWordsTyped }}</span>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsEditor" label="et/ou/sauf" outlined v-model="optionsEditorSelected" style="background-color: white; max-height: 3.5em"></v-select>
                     <span>{{ optionsEditorSelected }}</span>
                     <span>{{ typeof optionsEditorSelected }}</span>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Editeur" placeholder="tapez un editeur (optionnel)" style="background-color: white; max-height: 3.5em" v-model="editorTyped"></v-text-field>
                     <span>{{ editorTyped }}</span>
                     <span>{{ typeof editorTyped }}</span>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsLanguage" label="et/ou/sauf" outlined v-model="optionsLanguageSelected" style="background-color: white; max-height: 3.5em"></v-select>
                     <span>{{ optionsLanguageSelected }}</span>
                     <span>{{ typeof optionsLanguageSelected }}</span>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Langue du document" placeholder="tapez la langue (optionnel)" style="background-color: white; max-height: 3.5em" v-model="languageTyped"></v-text-field>
                     <span>{{ languageTyped }}</span>
                     <span>{{ typeof languageTyped }}</span>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="optionsCountry" label="et/ou/sauf" outlined style="background-color: white; max-height: 3.5em" v-model="optionsCountrySelected"></v-select>
                     <span>{{ optionsCountrySelected }}</span>
                     <span>{{ typeof optionsCountrySelected }}</span>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field outlined label="Pays de publication" placeholder="tapez un pays (optionnel)" style="background-color: white; max-height: 3.5em" v-model="countryTyped"></v-text-field>
                     <span>{{ countryTyped }}</span>
                     <span>{{ typeof countryTyped }}</span>
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
