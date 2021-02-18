<template>
   <v-container>
      <v-select @change="updateExternalOperateurEvent()" @blur="updateExternalOperateurEvent()" dense label="Par defaut, ou" :items="externalBlocOperatorListToSelect" class="style1" outlined v-model="externalOperatorSelected"></v-select>
      <v-combobox @change="addItem()" @blur="addItem()" @keyup.enter="addItem()" :rules="rcrAlert" clearable multiple outlined small-chips label="Saisir le rcr d'une bibliothèque" class="style2" placeholder="rcr à saisir" v-model="rcrArrayTyped"></v-combobox>
      <v-select @change="updateInternalOperateurEvent()" @blur="updateInternalOperateurEvent()" dense label="Pour ce lot de rcr (par defaut, ou)" :items="internalBlocOperatorListToSelect" class="style1" outlined v-model="internalOperatorSelected"> </v-select>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {RcrProvider} from '@/store/classes/blocsDeRecherche/BlocRcr';
import {OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

const RequeteDeRecherche = namespace('RequeteDeRecherche');

@Component
export default class VueRcr extends Vue {
   @RequeteDeRecherche.Mutation
   private setBlocRcrInternalOperator!: (operator: number) => void;
   @RequeteDeRecherche.Mutation
   private setBlocRcrExternalOperator!: (operator: number) => void;

   //TODO ne plus passer par context.commit, se referer à setBlocRcrRcrHandler dans requeteDeRecherche pour la syntaxe
   @RequeteDeRecherche.Mutation
   private setBlocRcrRcrHandler!: (arraySent: Array<RcrProvider>) => void;
   @RequeteDeRecherche.Mutation
   private setBlocRcrRcrListString!: (arraySent: Array<RcrProvider>) => void;

   @RequeteDeRecherche.Getter
   getBlocRcrInternalOperatorListToSelect!: Array<OperatorProvider>;
   @RequeteDeRecherche.Getter
   getBlocRcrExternalOperatorListToSelect!: Array<OperatorProvider>;
   @RequeteDeRecherche.Getter
   getBlocRcrInternalOperatorSelected!: number;
   @RequeteDeRecherche.Getter
   getBlocRcrExternalOperatorSelected!: number;
   @RequeteDeRecherche.Getter
   getBlocRcrRcrHandler!: Array<RcrProvider>;
   @RequeteDeRecherche.Getter
   getBlocRcrArrayTyped!: Array<string>;

   //Par defaut, ou
   private externalBlocOperatorListToSelect: Array<OperatorProvider>;
   private externalOperatorSelected: number;

   //Saisir le rcr d'une bibliothèque
   private rcrArrayTyped: Array<string>;
   private rcrHandler: Array<RcrProvider>;

   //Pour ce lot de rcr (par defaut, ou)
   private internalBlocOperatorListToSelect: Array<OperatorProvider>;
   private internalOperatorSelected: number;

   created(): void {
      this.externalBlocOperatorListToSelect = this.getBlocRcrExternalOperatorListToSelect;
      this.externalOperatorSelected = this.getBlocRcrExternalOperatorSelected;
      this.rcrHandler = this.getBlocRcrRcrHandler;
      this.rcrArrayTyped = this.getBlocRcrArrayTyped;
      this.internalBlocOperatorListToSelect = this.getBlocRcrInternalOperatorListToSelect;
      this.internalOperatorSelected = this.getBlocRcrInternalOperatorSelected;
   }

   private rcrAlert: Array<string> = []; //Message d'erreur

   //Lancé à chaque MAJ du composant (saisie utilisateur)
   addItem(): void {
      this.setBlocRcrRcrHandler(this.rcrHandler);
      this.setBlocRcrRcrListString(this.rcrHandler);
   }

   //Events
   private updateExternalOperateurEvent(): void {
      this.setBlocRcrExternalOperator(this.externalOperatorSelected);
   }
   private updateInternalOperateurEvent(): void {
      this.setBlocRcrInternalOperator(this.internalOperatorSelected);
   }

   /**
    * The global array of combobox component watched by this function, after each typed by user, this function
    * is launched to observe the final current array in combobox
    * @param newArrayVal
    */
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
}
</script>
