<template>
   <v-container>
      <v-row>
         <v-col>
            <v-select :items="ppnExternalBlocOperatorListToSelect" label="Par defaut, et" class="style1" outlined v-model="ppnExternalBlocOperatorSelected" @change="eventUpdateBlocPpnExternalOperator" dense></v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="PPN" placeholder="saisir un n° de ppn" class="style1" v-model="ppnEntered"></v-text-field>
         </v-col>
         <v-col>
            <v-text-field dense multiple outlined small-chips label="ISSN" placeholder="saisir un n° issn" class="style1" v-model="issnEntered"></v-text-field>
         </v-col>
      </v-row>

      <v-row>
         <v-col>
            <v-expansion-panels flat class="outlined-app">
               <v-expansion-panel>
                  <v-expansion-panel-header> Rechercher par d'autres critères</v-expansion-panel-header>
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
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Ensemble, ListProvider, OperatorProvider} from '@/store/interfaces/BlocInterfaces';

@Component
export default class VuePpn extends Vue {
   /*Attributs*/
   ppnExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc Ppn
   ppnExternalBlocOperatorSelected: number;
   ppnEntered: Array<string>;
   issnEntered: Array<string>; //Bloc Issn
   titreEntered: Array<string>; //Bloc Mots du titre
   editeurExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc editeur
   editeurExternalOperatorSelected: number;
   editeurEntered: Array<string>;
   langueItems: Array<ListProvider>; //Bloc langue
   langueExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   langueExternalOperatorSelected: number;
   langueEntered: Array<string>; //TODO etape3 nouveau getters
   paysItems: Array<ListProvider>; //Bloc Pays
   paysEntered: Array<string>;
   paysExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   paysExternalOperatorSelected: number;

   //A chaque creation du composant
   constructor() {
      super();
      this.ppnExternalBlocOperatorListToSelect = this.getPpnExternalBlocOperatorListToSelect;
      this.ppnExternalBlocOperatorSelected = this.getPpnExternalBlocOperatorSelected;
      this.ppnEntered = this.getPpnEntered;
      this.issnEntered = this.getIssnEntered;
      this.titreEntered = this.getTitreEntered;

      this.editeurExternalBlocOperatorListToSelect = this.getEditeurExternalBlocOperatorListToSelect;
      this.editeurExternalOperatorSelected = this.getEditeurExternalOperatorSelected;
      this.editeurEntered = this.getEditeurEntered;

      this.langueItems = this.getLangueItems;
      this.langueEntered = this.getLangueEntered; //TODO etape2 nouveaux getters
      this.langueExternalBlocOperatorListToSelect = this.getLangueExternalBlocOperatorListToSelect;
      this.langueExternalOperatorSelected = this.getLangueExternalOperatorSelected;

      this.paysItems = this.getPaysItems;
      this.paysEntered = this.getPaysEntered;
      this.paysExternalBlocOperatorListToSelect = this.getPaysExternalBlocOperatorListToSelect;
      this.paysExternalOperatorSelected = this.getPaysExternalOperatorSelected;
   }

   get getPpnExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocPpn._externalBlocOperatorListToSelect;
   }

   get getPpnExternalBlocOperatorSelected(): number {
      return this.$store.state.blocPpn._externalBlocOperator;
   }

   get getPpnEntered(): Array<string> {
      return this.$store.state.blocPpn._ppnListString;
   }

   get getIssnEntered(): Array<string> {
      return this.$store.state.blocIssn._issnListString;
   }

   get getTitreEntered(): Array<string> {
      return this.$store.state.blocMotsDuTitre._titleWordsEntered;
   }

   get getEditeurExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocEditeur._externalBlocOperatorListToSelect;
   }

   get getEditeurExternalOperatorSelected(): number {
      return this.$store.state.blocEditeur._externalBlocOperator;
   }

   get getEditeurEntered(): Array<string> {
      return this.$store.state.blocEditeur._editorsEntered;
   }

   get getLangueItems(): Array<ListProvider> {
      return this.$store.state.blocLangue._langueListe;
   }

   get getLangueEntered(): Array<string> {
      return this.$store.state.blocLangue._languesEntered;
   }

   get getLangueExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocLangue._externalBlocOperatorListToSelect;
   }

   get getLangueExternalOperatorSelected(): number {
      return this.$store.state.blocLangue._externalBlocOperator;
   }

   get getPaysItems(): Array<ListProvider> {
      return this.$store.state.blocPays._paysListe;
   }

   get getPaysEntered(): Array<string> {
      return this.$store.state.blocPays._paysEntered;
   }

   get getPaysExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocPays._externalBlocOperatorListToSelect;
   }

   get getPaysExternalOperatorSelected(): number {
      return this.$store.state.blocPays._externalBlocOperator;
   }

   /*EVENTS*/

   //v-combobox Events de mise à jour
   removeItem(itemId: ListProvider, arrayTarget: Array<ListProvider>): void {
      const index = arrayTarget.indexOf(itemId, 0);
      if (index > -1) {
         arrayTarget.splice(index, 1);
      }
      //Attention sur les slots il faut spécifiquement appeler le mutateur d'état dans la méthode reliée à l'event
      //Pas dans updated
      this.$store.state.requeteRecherche.blocLangue.setBlocLangue(this.langueEntered);
      this.$store.state.requeteRecherche.blocPays.setBlocPays(this.paysEntered);
   }

   updateArrayBlocLangue(): void {
      this.$store.dispatch('blocLangueLanguesEnteredAction', this.langueEntered);
   }

   updateArrayBlocPays(): void {
      this.$store.dispatch('blocPaysPaysEnteredAction', this.paysEntered);
   }

   /*limitArrayListNumberOfElementAndClearArrayIfEmpty(array: Array<ListProvider>, sizeLimit: number): Array<ListProvider> {
     if (array.length === 0) {
        array = [];
        return array;
     }
     if (array.length > sizeLimit) {
        array.pop();
        return array;
     }
     return array;
  }*/
   //v-combobox fin des méthodes de mise a jour

   //Events de contrôle des champs
   /*ppnAlert: Array<string> = ["Format de PPN Incorrect"]; //Message d'erreur
  regexPpnControlAndUpdateBloc(): void {
    this.ppnEntered.forEach((element) => {
     if (!element.match('^\\d{8,9}X?$')) {
        this.ppnEntered = [];
        this.ppnAlert.push(element);
     }});
  }

  issnAlert: Array<string> = ["Format d'ISSN Incorrect : "];
  regexIssnControlAndUpdateBloc(): void {
    this.issnEntered.forEach((element) => {
      if (!element.match('^\\d{4}-\\d{4}$')) {
        this.issnEntered = [];
        this.issnAlert.push(element);
      }
    })
  }*/

   eventUpdateBlocTitre(): void {
      if (String(this.titreEntered) === 'null') {
         this.$store.dispatch('blocMotsDuTitreTitleWordsEnteredAction', '');
      } else {
         this.$store.dispatch('blocMotsDuTitreTitleWordsEnteredAction', this.titreEntered);
      }
   }

   eventUpdateBlocEditeur(): void {
      this.$store.dispatch('blocEditeurEditorEnteredAction', this.editeurEntered);
   }

   //Events sur les listes déroulante
   eventUpdateBlocPpnExternalOperator(): void {
      this.$store
         .dispatch('blocPpnExternalOperatorAction', this.ppnExternalBlocOperatorSelected)
         .then(() => {
            setTimeout(() => {
               this.ppnExternalBlocOperatorSelected = this.getPpnExternalBlocOperatorSelected;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   eventUpdateBlocLangueExternalOperator(): void {
      this.$store
         .dispatch('blocLangueExternalOperatorAction', this.langueExternalOperatorSelected)
         .then(() => {
            setTimeout(() => {
               this.langueExternalOperatorSelected = this.getLangueExternalOperatorSelected;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   eventUpdateBlocEditeurExternalOperator(): void {
      this.$store
         .dispatch('blocEditeurExternalOperatorAction', this.editeurExternalOperatorSelected)
         .then(() => {
            setTimeout(() => {
               this.editeurExternalOperatorSelected = this.getEditeurExternalOperatorSelected;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   eventUpdateBlocPaysExternalOperator(): void {
      this.$store
         .dispatch('blocPaysExternalOperatorAction', this.paysExternalOperatorSelected)
         .then(() => {
            setTimeout(() => {
               this.paysExternalOperatorSelected = this.getPaysExternalOperatorSelected;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }
}
</script>
