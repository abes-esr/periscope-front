<template>
   <v-container>
      <v-row>
         <v-col>
            <v-select :items="ppnExternalBlocOperatorListToSelect" label="Par defaut, et" class="style1" outlined v-model="ppnExternalBlocOperatorSelected" @change="eventUpdateBlocPpnExternalOperator" dense></v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-combobox @click="eventUpdatePpn()" @change="eventUpdatePpn()" @blur="eventUpdatePpn()" @keyup.enter="eventUpdatePpn()" :rules="ppnAlert" multiple outlined small-chips label="ppn" class="style2" placeholder="saisir un n° ppn" v-model="ppnEntered" clearable>
               <template v-slot:selection="{item}">
                  <v-chip close @click:close="removeItemPpn(item)">
                     <span class="pr-2">{{ item }}</span>
                  </v-chip>
               </template>
            </v-combobox>
         </v-col>
         <v-col>
            <v-combobox @click="eventUpdateIssn()" @change="eventUpdateIssn()" @blur="eventUpdateIssn()" @keyup.enter="eventUpdateIssn()" :rules="issnAlert" multiple outlined small-chips label="issn" class="style2" placeholder="saisir un n° issn" v-model="issnEntered" clearable>
               <template v-slot:selection="{item}">
                  <v-chip close @click:close="removeItemIssn(item)">
                     <span class="pr-2">{{ item }}</span>
                  </v-chip>
               </template>
            </v-combobox>
         </v-col>
      </v-row>

      <v-row>
         <v-col>
            <v-expansion-panels flat class="outlined-app">
               <v-expansion-panel>
                  <v-expansion-panel-header> Rechercher par d'autres critères</v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <v-row>
                        <v-col>
                           <v-text-field @change="eventUpdateBlocTitre" @blur="eventUpdateBlocTitre" @keyup.enter="eventUpdateBlocTitre" clearable multiple outlined small-chips label="Mots du titre" placeholder="tapez un titre (optionnel)" class="style2" v-model="titreEntered"></v-text-field>
                        </v-col>
                     </v-row>
                     <v-row dense>
                        <v-col xs="12" sm="4">
                           <v-select :items="editeurExternalBlocOperatorListToSelect" label="et/ou/sauf" outlined v-model="editeurExternalOperatorSelected" @change="eventUpdateBlocEditeurExternalOperator" class="style2"></v-select>
                        </v-col>
                        <v-col xs="12" sm="8">
                           <v-combobox @change="eventUpdateBlocEditeur" @blur="eventUpdateBlocEditeur" @keyup.enter="eventUpdateBlocEditeur" multiple outlined small-chips label="Editeur" class="style2" placeholder="tapez un editeur (optionnel)" v-model="editeurEntered" clearable>
                              <template v-slot:selection="{item}">
                                 <v-chip close @click:close="removeItemEditeur(item)">
                                    <span class="pr-2">{{ item }}</span>
                                 </v-chip>
                              </template>
                           </v-combobox>
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
                                       {{ item.type }}
                                    </span>
                                    <v-icon small @click="removeItemLangue(item)">x</v-icon>
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
                                       {{ item.type }}
                                    </span>
                                    <v-icon small @click="removeItemPays(item)">x</v-icon>
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
import {ListProvider, OperatorProvider} from '@/store/recherche/BlocInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component
export default class VuePpn extends Vue {
   /*Attributs*/
   ppnExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc Ppn
   ppnExternalBlocOperatorSelected: number;
   ppnEntered: Array<string>;
   ppnAlert: Array<string>;
   issnEntered: Array<string>; //Bloc Issn
   issnAlert: Array<string>;
   titreEntered: string; //Bloc Mots du titre
   editeurExternalBlocOperatorListToSelect: Array<OperatorProvider>; //Bloc editeur
   editeurExternalOperatorSelected: number;
   editeurEntered: Array<string>;
   langueItems: Array<ListProvider>; //Bloc langue
   langueExternalBlocOperatorListToSelect: Array<OperatorProvider>;
   langueExternalOperatorSelected: number;
   langueEntered: Array<string>;
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
      this.ppnAlert = [];
      this.issnEntered = this.getIssnEntered;
      this.issnAlert = [];
      this.titreEntered = this.getTitreEntered;

      this.editeurExternalBlocOperatorListToSelect = this.getEditeurExternalBlocOperatorListToSelect;
      this.editeurExternalOperatorSelected = this.getEditeurExternalOperatorSelected;
      this.editeurEntered = this.getEditeurEntered;

      this.langueItems = this.getLangueItems;
      this.langueEntered = this.getLangueEntered;
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
      return this.$store.state.blocPpn._selected;
   }

   get getIssnEntered(): Array<string> {
      return this.$store.state.blocIssn._selected;
   }

   get getTitreEntered(): string {
      let motsDuTitreInString = '';
      this.$store.state.blocMotsDuTitre._selected.forEach((element: string) => {
         motsDuTitreInString += element + ' ';
      });
      return motsDuTitreInString;
   }

   get getEditeurExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocEditeur._externalBlocOperatorListToSelect;
   }

   get getEditeurExternalOperatorSelected(): number {
      return this.$store.state.blocEditeur._externalBlocOperator;
   }

   get getEditeurEntered(): Array<string> {
      return this.$store.state.blocEditeur._selected;
   }

   get getLangueItems(): Array<ListProvider> {
      return this.$store.state.blocLangue._candidates;
   }

   get getLangueEntered(): Array<string> {
      return this.$store.state.blocLangue._selected;
   }

   get getLangueExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocLangue._externalBlocOperatorListToSelect;
   }

   get getLangueExternalOperatorSelected(): number {
      return this.$store.state.blocLangue._externalBlocOperator;
   }

   get getPaysItems(): Array<ListProvider> {
      return this.$store.state.blocPays._candidates;
   }

   get getPaysEntered(): Array<string> {
      return this.$store.state.blocPays._selected;
   }

   get getPaysExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocPays._externalBlocOperatorListToSelect;
   }

   get getPaysExternalOperatorSelected(): number {
      return this.$store.state.blocPays._externalBlocOperator;
   }

   /*EVENTS*/
   eventUpdatePpn(): void {
      this.ppnAlert = [];
      if (this.ppnEntered.length === 0) {
         this.ppnAlert = [];
         return;
      }
      if (this.ppnEntered.length > 1) {
         this.ppnEntered.pop();
      }

      this.ppnEntered.forEach((element) => {
         if (!element.match('^\\d{8,9}X?$')) {
            this.ppnEntered.pop();
            this.ppnAlert.push("Un ppn Contient 8 ou 9 chiffres suivis ou pas d'un X");
         } else {
            this.$store.dispatch('updateSelectedPpn', this.ppnEntered).catch((err) => {
               Logger.error(err);
            });
         }
      });
   }

   removeItemPpn(item: string): void {
      const index: number = this.ppnEntered.indexOf(item);
      if (index > -1) {
         this.ppnEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedPpn', this.ppnEntered).catch((err) => {
            Logger.error(err);
         });
      }
   }

   eventUpdateIssn(): void {
      this.issnAlert = [];
      if (this.issnEntered.length === 0) {
         this.issnAlert = [];
         return;
      }
      if (this.issnEntered.length > 1) {
         this.issnEntered.pop();
      }

      this.issnEntered.forEach((element) => {
         if (!element.match('^\\d{4}-\\d{4}$')) {
            this.issnEntered.pop();
            this.issnAlert.push("Un issn contient 4 chiffres suivi d'un - et 4 chiffres");
         } else {
            this.$store.dispatch('updateSelectedIssn', this.issnEntered).catch((err) => {
               Logger.error(err);
            });
         }
      });
   }

   removeItemIssn(item: string): void {
      const index: number = this.issnEntered.indexOf(item);
      if (index > -1) {
         this.issnEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedIssn', this.issnEntered).catch((err) => {
            Logger.error(err);
         });
      }
   }

   removeItemPays(item: string): void {
      const index: number = this.paysEntered.indexOf(item);
      if (index > -1) {
         this.paysEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedPays', this.paysEntered).catch((err) => {
            Logger.error(err);
         });
      }
   }

   removeItemLangue(item: string): void {
      const index: number = this.langueEntered.indexOf(item);
      if (index > -1) {
         this.langueEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedLangue', this.langueEntered).catch((err) => {
            Logger.error(err);
         });
      }
   }

   updateArrayBlocLangue(): void {
      this.$store.dispatch('updateSelectedLangue', this.langueEntered).catch((err) => {
         Logger.error(err);
      });
   }

   updateArrayBlocPays(): void {
      this.$store.dispatch('updateSelectedPays', this.paysEntered).catch((err) => {
         Logger.error(err);
      });
   }

   //Events de contrôle des champs
   eventUpdateBlocTitre(): void {
      if (String(this.titreEntered) === 'null') {
         this.$store.dispatch('updateSelectedMotsDuTitre', '').catch((err) => {
            Logger.error(err);
         });
      } else {
         this.$store.dispatch('updateSelectedMotsDuTitre', this.titreEntered);
      }
   }

   eventUpdateBlocEditeur(): void {
      if (this.editeurEntered.length > 1) {
         this.editeurEntered.pop();
      }
      this.$store.dispatch('updateSelectedEditeur', this.editeurEntered);
   }

   removeItemEditeur(item: string): void {
      const index: number = this.editeurEntered.indexOf(item);
      if (index > -1) {
         this.editeurEntered.splice(index, 1);
         this.$store.dispatch('updateSelectedPpn', this.editeurEntered);
      }
   }

   //Events sur les listes déroulante
   eventUpdateBlocPpnExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPpnOperator', this.ppnExternalBlocOperatorSelected);
   }

   eventUpdateBlocLangueExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalLangueOperator', this.langueExternalOperatorSelected);
   }

   eventUpdateBlocEditeurExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalEditeurOperator', this.editeurExternalOperatorSelected);
   }

   eventUpdateBlocPaysExternalOperator(): void {
      this.$store.dispatch('updateSelectedExternalPaysOperator', this.paysExternalOperatorSelected);
   }
}
</script>
