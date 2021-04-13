<template>
   <v-container>
      <v-row>
         <v-col>
            <v-select @change="updateExternalOperateurEvent()" @blur="updateExternalOperateurEvent()" dense label="Par defaut, ou" :items="externalBlocOperatorListToSelect" class="style1" outlined v-model="externalOperatorSelected"></v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-combobox @click="addItem()" @change="addItem()" @blur="addItem()" @keyup.enter="addItem()" :rules="rcrAlert" multiple outlined small-chips label="Saisir le rcr d'une bibliothèque" class="style2" placeholder="rcr à saisir" v-model="rcrArrayTyped" clearable>
               <template v-slot:selection="{item}">
                  <v-chip close @click:close="removeItemRcr(item)">
                     <span class="pr-2">{{ item }}</span>
                  </v-chip>
               </template>
            </v-combobox>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-select @change="updateInternalOperateurEvent()" @blur="updateInternalOperateurEvent()" dense label="Pour ce lot de rcr (par defaut, ou)" :items="internalBlocOperatorListToSelect" class="style1" outlined v-model="internalOperatorSelected"> </v-select>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {OperatorProvider} from '@/store/recherche/BlocInterfaces';

@Component
export default class VueRcr extends Vue {
   externalBlocOperatorListToSelect: Array<OperatorProvider>;
   externalOperatorSelected: number;
   rcrArrayTyped: Array<string>;
   internalBlocOperatorListToSelect: Array<OperatorProvider>;
   internalOperatorSelected: number;
   rcrAlert: Array<string>; //Message d'erreur

   constructor() {
      super();
      this.externalBlocOperatorListToSelect = this.getExternalBlocOperatorListToSelect;
      this.externalOperatorSelected = this.getExternalOperatorSelected;
      this.rcrArrayTyped = this.getRcrArrayTyped;
      this.internalBlocOperatorListToSelect = this.getInternalBlocOperatorListToSelect;
      this.internalOperatorSelected = this.getInternalOperatorSelected;
      this.rcrAlert = [];
   }

   get getExternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocRcr._externalBlocOperatorListToSelect;
   }
   get getExternalOperatorSelected(): number {
      return this.$store.state.blocRcr._externalBlocOperator;
   }
   get getRcrArrayTyped(): Array<string> {
      return this.$store.state.blocRcr._selected;
   }
   get getInternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocRcr._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): number {
      return this.$store.state.blocRcr._internalBlocOperator;
   }

   //Events v-combobox
   addItem(): void {
      this.rcrAlert = [];
      if (this.rcrArrayTyped.length === 0) {
         this.rcrAlert = [];
         return;
      }

      //if the value of last element of array contains characters, it removes from list, return = get out of function
      if (!new RegExp('^\\d{8,9}X?$').test(this.rcrArrayTyped[this.rcrArrayTyped.length - 1])) {
         this.rcrArrayTyped.pop();
         this.rcrAlert.push("RCR : 8 ou 9 chiffres suivis ou non d'un X");
         return;
      }

      this.$store.dispatch('updateSelectedRcr', this.rcrArrayTyped);
   }

   removeItemRcr(item: string): void {
      const index: number = this.rcrArrayTyped.indexOf(item);
      if (index > -1) {
         this.rcrArrayTyped.splice(index, 1);
         this.$store.dispatch('updateSelectedRcr', this.rcrArrayTyped);
      }
   }

   //Events v-select
   updateExternalOperateurEvent(): void {
      this.$store.dispatch('updateSelectedExternalRcrOperator', this.externalOperatorSelected);
   }
   updateInternalOperateurEvent(): void {
      this.$store.dispatch('updateSelectedInternalRcrOperator', this.internalOperatorSelected);
   }
}
</script>
