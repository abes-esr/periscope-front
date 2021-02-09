<template>
   <v-container>
      <v-select dense label="Par defaut, ou" :items="externalBlocOperatorListToSelect" class="style1" outlined v-model="externalOperatorSelected"></v-select>
      <span>{{ externalOperatorSelected }}</span>
      <span>{{ typeof externalOperatorSelected }}</span>
      <v-combobox clearable multiple outlined small-chips label="Saisir le rcr d'une bibliothèque" class="style2" placeholder="rcr à saisir" v-model="rcrArrayTyped"></v-combobox>
      <span>{{ typeof rcrHandler }}</span> -> <span>{{ rcrHandler }}</span>
      <v-select dense label="Pour ce lot de rcr (par defaut, ou)" :items="internalBlocOperatorListToSelect" class="style1" outlined v-model="internalOperatorSelected"> </v-select>
      <span>{{ internalOperatorSelected }}</span>
      <span>{{ typeof internalOperatorSelected }}</span>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {RcrProvider} from '@/store/classes/blocsDeRecherche/BlocRcr';
import {OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

const requeteDeRecherche = namespace('RequeteDeRecherche');

@Component
export default class VueRcr extends Vue {
   //Setter de classe globale
   @requeteDeRecherche.Action
   private updateBlocRcr!: (arraySent: Array<RcrProvider>) => void;
   @requeteDeRecherche.Action
   private updateBlocRcrInternalOperatorSelected!: (operator: number) => void;
   @requeteDeRecherche.Action
   private updateBlocRcrExternalOperatorSelected!: (operator: number) => void;

   //Lancé à chaque MAJ du composant (saisie utilisateur, etc..)
   updated(): void {
      this.updateBlocRcr(this.rcrArrayTyped);
      this.updateBlocRcrInternalOperatorSelected(this.internalOperatorSelected);
      this.updateBlocRcrExternalOperatorSelected(this.externalOperatorSelected);
   }

   //Par defaut, ou
   private externalBlocOperatorListToSelect: Array<OperatorProvider> = this.$store.state.RequeteDeRecherche.blocRcr.externalBlocOperatorListToSelect;
   private externalOperatorSelected: number = this.$store.state.RequeteDeRecherche.blocRcr.externalBlocOperator;

   //Saisir le rcr d'une bibliothèque
   private rcrArrayTyped = [];
   private rcrHandler: Array<RcrProvider> = this.$store.state.RequeteDeRecherche.blocRcr.rcrHandler;

   //Pour ce lot de rcr (par defaut, ou)
   private internalBlocOperatorListToSelect: Array<OperatorProvider> = this.$store.state.RequeteDeRecherche.blocRcr.internalBlocOperatorListToSelect;
   private internalOperatorSelected: number = this.$store.state.RequeteDeRecherche.blocRcr.internalBlocOperator;

   /**
    * The global array of combobox component watched by this function, after each typed by user, this function
    * is launched to observe the final current array in combobox
    * @param newArrayVal
    */
   @Watch('rcrArrayTyped')
   rcrTyped(newArrayVal: []): void {
      if (newArrayVal.length === 0) {
         this.rcrHandler = [];
         return;
      }

      //if the value of last element of array contains characters, it removes from list, return = get out of function
      if (new RegExp('\\D').test(newArrayVal[newArrayVal.length - 1])) {
         newArrayVal.pop();
         return;
      }

      //if the value of last element of array contains only digits, and array target to fill length is different from current Array watched
      if (new RegExp('\\d').test(newArrayVal[newArrayVal.length - 1]) && this.rcrHandler.length !== newArrayVal.length) {
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
