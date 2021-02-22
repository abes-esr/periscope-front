<template>
   <v-container>
      <v-select :items="ppnExternalBlocOperatorListToSelect" label="Par defaut, et" class="style1" outlined v-model="ppnExternalBlocOperatorSelected" @change="eventUpdateBlocPpnExternalOperator" dense> </v-select>
      <v-row>
         <v-col>
            <v-text-field @change="regexPpnControlAndUpdateBloc" @blur="regexPpnControlAndUpdateBloc" @keyup.enter="regexPpnControlAndUpdateBloc" :rules="ppnAlert" dense multiple outlined small-chips label="PPN" placeholder="saisir un n° de ppn" class="style1" v-model="ppnEntered"> </v-text-field>
         </v-col>
         <v-col>
            <v-text-field @change="regexPpnControlAndUpdateBloc" @blur="regexIssnControlAndUpdateBloc" @keyup.enter="regexIssnControlAndUpdateBloc" :rules="issnAlert" dense multiple outlined small-chips label="ISSN" placeholder="saisir un n° issn" class="style1" v-model="issnEntered"></v-text-field>
         </v-col>
      </v-row>

      <v-expansion-panels flat class="outlined-app">
         <v-expansion-panel>
            <v-expansion-panel-header> Rechercher par d'autres critères </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-text-field @change="eventUpdateBlocTitre" @blur="eventUpdateBlocTitre" @keyup.enter="eventUpdateBlocTitre" clearable multiple outlined small-chips label="Mots du titre" placeholder="tapez un titre (optionnel)" class="style2" v-model="titreEntered"></v-text-field>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="editeurExternalBlocOperatorListToSelect" label="et/ou/sauf" outlined v-model="editeurExternalOperatorSelected" @change="eventUpdateBlocEditeurExternalOperator" class="style2"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-text-field @change="eventUpdateBlocEditeur" @blur="eventUpdateBlocEditeur" @keyup.enter="eventUpdateBlocEditeur" outlined label="Editeur" placeholder="tapez un editeur (optionnel)" class="style2" v-model="editeurEntered"></v-text-field>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="langueExternalBlocOperatorListToSelect" label="et/ou/sauf" outlined v-model="langueExternalOperatorSelected" @change="eventUpdateBlocLangueExternalOperator" class="style2"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-combobox @change="updateArrayBlocLangue" v-model="langueEntered" :items="langueItems" multiple outlined label="tapez une langue (optionnel)" class="style2" placeholder="langue à saisir">
                        <template v-slot:selection="{attrs, item, selected}">
                           <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                              <span class="pr-2">
                                 {{ item.text }}
                              </span>
                              <v-icon small @click="removeItem(item, langueEntered)">x</v-icon>
                           </v-chip>
                        </template>
                     </v-combobox>
                  </v-col>
               </v-row>
               <v-row dense>
                  <v-col xs="12" sm="4">
                     <v-select :items="paysExternalBlocOperatorListToSelect" label="et/ou/sauf" outlined v-model="paysExternalOperatorSelected" @change="eventUpdateBlocPaysExternalOperator" class="style2"></v-select>
                  </v-col>
                  <v-col xs="12" sm="8">
                     <v-combobox @change="updateArrayBlocPays" v-model="paysEntered" :items="paysItems" multiple outlined label="tapez un pays (optionnel)" class="style2" placeholder="pays à saisir">
                        <template v-slot:selection="{attrs, item, selected}">
                           <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                              <span class="pr-2">
                                 {{ item.text }}
                              </span>
                              <v-icon small @click="removeItem(item, paysEntered)">x</v-icon>
                           </v-chip>
                        </template>
                     </v-combobox>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>
   </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Ensemble, ListProvider, OperatorProvider } from "@/store/classes/blocsDeRecherche/BlocAbstract";

@Component
export default class VuePpn extends Vue {
   /*Attributs*/
   private ppnExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc Ppn
   private ppnExternalBlocOperatorSelected: Ensemble;
   private ppnEntered = '';
   private issnEntered = ''; //Bloc Issn
   private titreEntered = ''; //Bloc Mots du titre
   private editeurExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc editeur
   private editeurExternalOperatorSelected: Ensemble;
   private editeurEntered = '';
   private langueItems: Array<ListProvider>; //Bloc langue
   private langueExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   private langueExternalOperatorSelected: number;
   private langueEntered: Array<ListProvider>; //TODO etape3 nouveau getters
   private paysItems: Array<ListProvider>; //Bloc Pays
   private paysEntered: Array<ListProvider>;
   private paysExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   private paysExternalOperatorSelected: Ensemble;

   //A chaque creation du composant
   created(): void {
      this.ppnExternalBlocOperatorListToSelect = this.$store.state.requeteRecherche.blocPpn.externalBlocOperatorListToSelect;
      this.ppnExternalBlocOperatorSelected = this.$store.state.requeteRecherche.blocPpn.externalBlocOperator;
      this.ppnEntered = this.$store.state.requeteRecherche.blocPpn.ppnEntered;
      this.issnEntered = this.$store.state.requeteRecherche.blocIssn.issnEntered;
      this.titreEntered = this.$store.state.requeteRecherche.blocMotDuTitre.titleWordsEnteredInString;

      this.editeurExternalBlocOperatorListToSelect = this.$store.state.requeteRecherche.blocEditeur.externalBlocOperatorListToSelect;
      this.editeurExternalOperatorSelected = this.$store.state.requeteRecherche.blocEditeur.externalBlocOperator;
      this.editeurEntered = this.$store.state.requeteRecherche.blocEditeur.editorEnteredEnteredInString;

      this.langueItems = this.$store.state.requeteRecherche.blocLangue.langueListe;
      this.langueEntered = this.$store.state.requeteRecherche.blocLangue.langueEntered; //TODO etape2 nouveaux getters
      this.langueExternalBlocOperatorListToSelect = this.$store.state.requeteRecherche.blocLangue.externalBlocOperatorListToSelect;
      this.langueExternalOperatorSelected = this.$store.state.requeteRecherche.blocLangue.externalBlocOperator;

      this.paysEntered = this.$store.state.requeteRecherche.blocPays.paysEntered;
      this.paysExternalBlocOperatorListToSelect = this.$store.state.requeteRecherche.blocPays.externalBlocOperatorListToSelect;
      this.paysExternalOperatorSelected = this.$store.state.requeteRecherche.blocPays.externalBlocOperator;
      this.paysItems = this.$store.state.requeteRecherche.blocPays.paysListe;
   }

   //A Chaque modification du composant -> updated, setters de classe
   //Déconseillé, utiliser plutôt les events
   //Ne fonctionne que sur les champs de saisie libre, pour les autres champs utiliser les events
   updated(): void {
      console.log('update');
   }
   computed(): void {
      console.log('computed');
   }

   /*EVENTS*/

   //v-combobox Events de mise à jour
   private removeItem(itemId: ListProvider, arrayTarget: Array<ListProvider>): void {
      const index = arrayTarget.indexOf(itemId, 0);
      if (index > -1) {
         arrayTarget.splice(index, 1);
      }
      //Attention sur les slots il faut spécifiquement appeler le mutateur d'état dans la méthode reliée à l'event
      //Pas dans updated
      this.$store.state.requeteRecherche.blocLangue.setBlocLangue(this.langueEntered);
      this.$store.state.requeteRecherche.blocPays.setBlocPays(this.paysEntered);
   }

   private updateArrayBlocLangue(): void {
      this.$store.state.requeteRecherche.blocLangue.setBlocLangue(this.limitArrayListNumberOfElementAndClearArrayIfEmpty(this.langueEntered, 9));
   }

   private updateArrayBlocPays(): void {
      this.$store.state.requeteRecherche.blocPays.setBlocPays(this.limitArrayListNumberOfElementAndClearArrayIfEmpty(this.paysEntered, 1));
   }

   private limitArrayListNumberOfElementAndClearArrayIfEmpty(array: Array<ListProvider>, sizeLimit: number): Array<ListProvider> {
      if (array.length === 0) {
         array = [];
         return array;
      }
      if (array.length > sizeLimit) {
         array.pop();
         return array;
      }
      return array;
   }
   //v-combobox fin des méthodes de mise a jour

   //Events de contrôle des champs
   private ppnAlert: Array<string> = []; //Message d'erreur
   private regexPpnControlAndUpdateBloc(): void {
      if (this.ppnEntered.match('^\\d{8,9}X?$')) {
         this.$store.state.requeteRecherche.blocPpn.setBlocPpn(this.ppnEntered);
         this.ppnAlert = [];
      } else {
         this.ppnEntered = '';
         this.ppnAlert.push("Le PPN est constitué de 8 ou 9 chiffres suivis ou pas d'un X");
      }
   }

   private issnAlert: Array<string> = [];
   private regexIssnControlAndUpdateBloc(): void {
      if (this.issnEntered.match('^\\d{4}-\\d{4}$')) {
         this.$store.state.requeteRecherche.blocIssn.setBlocIssn(this.issnEntered);
         this.issnAlert = [];
      } else {
         this.issnEntered = '';
         this.issnAlert.push("L'ISSN est constitué de 4 chiffres suivi d'un tiret suivi de 4 chiffres");
      }
   }

   private eventUpdateBlocTitre(): void {
      if (String(this.titreEntered) === 'null') {
         this.$store.state.requeteRecherche.blocMotDuTitre.setBlocTitre('');
      } else {
         this.$store.state.requeteRecherche.blocMotDuTitre.setBlocTitre(this.titreEntered);
      }
   }

   private eventUpdateBlocEditeur(): void {
      this.$store.state.requeteRecherche.blocEditeur.setBlocEditeur(this.editeurEntered);
   }

   //Events sur les listes déroulante
   eventUpdateBlocPpnExternalOperator(): void {
      this.$store.state.requeteRecherche.blocPpn.setBlocPpnExternalOperator(this.ppnExternalBlocOperatorSelected);
   }
   eventUpdateBlocLangueExternalOperator(): void {
      this.$store.state.requeteRecherche.blocLangue.setBlocLangueExternalOperatorSelected(this.langueExternalOperatorSelected);
   }
   eventUpdateBlocEditeurExternalOperator(): void {
      this.$store.state.requeteRecherche.blocEditeur.setBlocEditeurExternalOperatorSelected(this.editeurExternalOperatorSelected);
   }
   eventUpdateBlocPaysExternalOperator(): void {
      this.$store.state.requeteRecherche.blocPays.setBlocPaysExternalOperatorSelected(this.paysExternalOperatorSelected);
   }
}
</script>
