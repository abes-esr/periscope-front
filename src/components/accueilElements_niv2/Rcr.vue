<template>
   <v-container>
      <v-row>
         <v-col>
            <v-select @change="updateExternalOperateurEvent()" @blur="updateExternalOperateurEvent()" dense label="Par defaut, ou" :items="externalBlocOperatorListToSelect" class="style1" outlined v-model="externalOperatorSelected"></v-select>
         </v-col>
      </v-row>
      <v-row>
         <v-col>
            <v-combobox @click="addItem()" @change="addItem()" @blur="addItem()" @keyup.enter="addItem()" :rules="rcrAlert" multiple outlined small-chips label="Saisir le rcr d'une bibliothèque" class="style2" placeholder="rcr à saisir" v-model="rcrArrayTyped" clearable></v-combobox>
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
import {OperatorProvider} from '@/store/interfaces/BlocInterfaces';

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
      return this.$store.state.blocRcr._rcrListString;
   }
   get getInternalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this.$store.state.blocRcr._internalBlocOperatorListToSelect;
   }
   get getInternalOperatorSelected(): number {
      return this.$store.state.blocRcr._internalBlocOperator;
   }

   //Events v-combobox
   addItem(): void {
      this.$store.dispatch('blocRcrRcrListStringAction', this.rcrArrayTyped);
   }

   //Events v-select
   updateExternalOperateurEvent(): void {
      this.$store.dispatch('blocRcrExternalOperatorAction', this.externalOperatorSelected);
   }
   updateInternalOperateurEvent(): void {
      this.$store.dispatch('blocRcrInternalOperatorAction', this.internalOperatorSelected);
   }

   /**
    * The global array of combobox component watched by this function, after each typed by user, this function
    * is launched to observe the final current array in combobox
    * @param newArrayVal
    */
   /*
   @Watch('rcrArrayTyped')
   rcrTyped(newArrayVal: []): void {
      if (newArrayVal.length === 0) {
         this.rcrHandler = [];
         this.rcrAlert = [];
         return;
      }

      //if the value of last element of array contains characters, it removes from list, return = get out of function
      if (new RegExp('\\D').test(newArrayVal[newArrayVal.length - 1])) {
         newArrayVal.pop();
         this.rcrAlert.push('Un RCR ne contient pas de caractères');
         return;
      }

      //if the value of last element of array contains only digits, and array target to fill length is different from current Array watched
      if (new RegExp('\\d').test(newArrayVal[newArrayVal.length - 1]) && this.rcrHandler.length !== newArrayVal.length) {
         this.rcrAlert = [];
         //conversion of string input (who contains only digits) in number type
         let newLastValConvertedInNumberType: number = +newArrayVal[newArrayVal.length - 1];
         //push element in rcrHandler array, with id value associated at rcr
         //console.log(this.rcrHandler.length !== newArrayVal.length);
         this.rcrHandler.push(
            new (class implements RcrProvider {
               id: number = newArrayVal.length - 1;
               value: number = newLastValConvertedInNumberType;
            })()
         );
      }
   }
    */
}
</script>
