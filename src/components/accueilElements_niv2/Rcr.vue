<template>
   <v-container>
      <v-select dense label="Par defaut, ou" v-on:click="disableDefaultSlotValue0 = false" :items="optionsRcr" class="style1" outlined v-model="optionsRcrSelected">
         <template v-if="disableDefaultSlotValue0" slot="selection">
            <span style="color: grey">Et/ou/sauf</span>
         </template>
      </v-select>
      <v-row>
         <v-col>
            <v-combobox clearable multiple outlined small-chips label="Saisir le rcr d'une bibliothèque" class="style2" placeholder="rcr à saisir" v-model="rcrArrayTyped"></v-combobox>
         </v-col>
      </v-row>
      <v-select dense label="Pour ce lot de rcr (par defaut, ou)" v-on:click="disableDefaultSlotValue1 = false" :items="optionsLotRcr" class="style1" outlined v-model="optionsLotRcrSelected">
         <template v-if="disableDefaultSlotValue1" slot="selection">
            <span style="color: grey">Ou/Et</span>
         </template>
      </v-select>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const requeteDeRecherche = namespace('RequeteDeRecherche');

interface Provider {
   id: number;
   key: string;
   text: string;
   value: Ensemble;
}

interface RcrProvider {
   id: number;
   value: number;
}

enum Ensemble {
   Union, //0
   Intersection, //1
   Difference, //2
}

@Component
export default class VueRcr extends Vue {
   //Setter de classe globale
   @requeteDeRecherche.Action
   private updateGlobalOptionsRcrSelected!: (element: Ensemble) => void;

   @requeteDeRecherche.Action
   private updateGlobalRcrHandler!: (arraySent: Array<RcrProvider>) => void;

   @requeteDeRecherche.Action
   private updateGlobalOptionsLotRcrSelected!: (element: Ensemble) => void;

   //Lancé à chaque MAJ du composant (saisie utilisateur, etc..)
   updated(): void {
      this.updateGlobalOptionsRcrSelected(this.optionsRcrSelected);
      this.updateGlobalRcrHandler(this.rcrHandler);
      this.updateGlobalOptionsLotRcrSelected(this.optionsLotRcrSelected);
   }

   //Slots permettant d'avoir par defaut une valeur initiale Et/ou/sauf, Ou/Et dans la liste déroulante
   private disableDefaultSlotValue0 = true;
   private disableDefaultSlotValue1 = true;

   //Par defaut, ou
   private optionsRcr: Array<Provider> = this.$store.state.RequeteDeRecherche.optionsEtOuSaufParDefaut;
   private optionsRcrSelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsRcrSelected;

   //Saisir le rcr d'une bibliothèque
   private rcrArrayTyped = [];
   private rcrHandler: Array<RcrProvider> = this.$store.state.RequeteDeRecherche.globalRcrHandler;

   //Pour ce lot de rcr (par defaut, ou)
   private optionsLotRcr: Array<Provider> = this.$store.state.RequeteDeRecherche.optionsEtOuParDefaut;
   private optionsLotRcrSelected: Ensemble = this.$store.state.RequeteDeRecherche.globalOptionsLotRcrSelected;

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
         console.log(this.rcrHandler.length !== newArrayVal.length);
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
