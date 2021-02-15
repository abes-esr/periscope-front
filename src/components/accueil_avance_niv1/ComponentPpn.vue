<template>
   <v-expansion-panel class="outlined-app" style="padding: 0.5em 0.5em 0.5em 0.5em">
      <v-row :align="getVerticalAlignValue(1)">
         <!--External Operator-->
         <v-col xs="12" sm="3" lg="2">
            <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected"></v-select>
         </v-col>
         <v-col xs="12" sm="7" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par PPN </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || blocPpn.ppnListString.length === 0" key="0"> Saisissez des n° de PPN </span>
                           <span v-else key="1"> {{ returnItem() + ' | Entre PPN: ' + blocPpn.internalBlocOperatorInString }} </span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" style="max-height: 100%">
                  <v-col>
                     <!--Elements-->
                     <v-combobox @change="addItem" @blur="addItem" @keyup.enter="addItem" :rules="comboboxAlert" clearable multiple outlined small-chips :label="comboboxLabel" class="style2" :placeholder="comboboxPlaceholder" v-model="comboboxArrayTyped">
                        <template v-slot:selection="{item}">
                           <v-chip close @click:close="removeItem(item)">
                              <span class="pr-2">{{ item }}</span>
                           </v-chip>
                        </template>
                     </v-combobox>
                     <!--Internal Operator-->
                  </v-col>
               </v-row>
               <v-row :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)">
                  <v-col style="padding-left: 0.5em; padding-top: 0.5em">
                     <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected"></v-select>
                  </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="12" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import {Ensemble, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

import {namespace} from 'vuex-class';
import {BlocPpn} from '@/store/classes/blocsDeRecherche/BlocPpn';

const requeteDeRecherche = namespace('RequeteDeRecherche');

@Component
export default class ComponentPpn extends Mixins(GlobalPropertiesMixin) {
   @requeteDeRecherche.State
   private blocPpn!: BlocPpn;

   @requeteDeRecherche.Action
   private updateBlocPpnStringList!: (arraySent: Array<string>) => void;

   private external_operator_label: string;
   private internal_operator_label: string;
   private list_external_operator_to_select: Array<OperatorProvider>;
   private list_internal_operator_to_select: Array<OperatorProvider>;
   private external_operator_selected: Ensemble;
   private internal_operator_selected: Ensemble;
   private comboboxAlert: Array<string> = [];
   private comboboxLabel: string;
   private comboboxPlaceholder: string;
   private comboboxArrayTyped: Array<string> = [];

   created(): void {
      this.external_operator_label = 'Avec autres blocs';
      this.internal_operator_label = 'Entre les éléments de ce bloc';
      this.list_external_operator_to_select = this.blocPpn.externalBlocOperatorListToSelect;
      this.list_internal_operator_to_select = this.blocPpn.internalBlocOperatorListToSelect;
      this.external_operator_selected = this.blocPpn.externalBlocOperator;
      this.internal_operator_selected = this.blocPpn.internalBlocOperator;
      this.comboboxArrayTyped = this.blocPpn.ppnListString;
      this.comboboxLabel = 'PPN saisis';
      this.comboboxPlaceholder = 'Saisir des n° de PPN';

      console.log(this.blocPpn.ppnListString);
   }

   private addItem(): void {
      if (this.comboboxArrayTyped.length !== 0) {
         const lastElement: string = this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1];
         if (lastElement.match('^\\d{8,9}X?$')) {
            this.updateBlocPpnStringList(this.comboboxArrayTyped);
            this.comboboxAlert = [];
         } else {
            this.removeItem(lastElement);
            this.comboboxAlert.push("Le PPN est constitué de 8 ou 9 chiffres suivis ou pas d'un X");
         }
      }
   }

   private removeItem(item: string): void {
      const index: number = this.comboboxArrayTyped.indexOf(item);
      if (index > -1) {
         this.comboboxArrayTyped.splice(index, 1);
      }
   }

   private returnItem(): string {
      let chain = '';
      this.comboboxArrayTyped.forEach((element) => {
         chain += element + ', ';
      });
      return chain;
   }
}
</script>
