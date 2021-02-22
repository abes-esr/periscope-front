<template>
   <v-expansion-panel class="outlined-app" style="padding: 0.5em 0.5em 0.5em 0.5em">
      <v-row :align="getVerticalAlignValue(1)">
         <!--External Operator-->
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em">
            <v-select dense :label="external_operator_label" :items="list_external_operator_to_select" class="style1" outlined v-model="external_operator_selected" @change="eventUpdateBlocExternalOperator"></v-select>
         </v-col>
         <v-col xs="8" sm="8" lg="8">
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
               <v-row :justify="getHorizontalJustifyValue(1)" style="height: 20em">
                  <v-col sm="10">
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
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em">
                     <v-select dense :label="internal_operator_label" :items="list_internal_operator_to_select" class="style1" outlined v-model="internal_operator_selected" @change="eventUpdateBlocInternalOperator"></v-select>
                  </v-col>
               </v-row>
               <v-alert dense outlined type="warning"> Au dela de <strong>15 PPN</strong>, nous vous recommandons pour des raisons d'affichage de <strong>charger une liste de PPN</strong> </v-alert>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
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

@Component
export default class ComponentPpn extends Mixins(GlobalPropertiesMixin) {
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
      this.external_operator_label = 'Autres blocs';
      this.internal_operator_label = 'Entre PPN';
      this.list_external_operator_to_select = this.$store.state.requeteRecherche.blocPpn.externalBlocOperatorListToSelect;
      this.list_internal_operator_to_select = this.$store.state.requeteRecherche.blocPpn.internalBlocOperatorListToSelect;
      this.external_operator_selected = this.$store.state.requeteRecherche.blocPpn.externalBlocOperator;
      this.internal_operator_selected = this.$store.state.requeteRecherche.blocPpn.internalBlocOperator;
      this.comboboxArrayTyped = this.$store.state.requeteRecherche.blocPpn.ppnListString;
      this.comboboxLabel = 'PPN saisis';
      this.comboboxPlaceholder = 'Saisir des n° de PPN';
   }

   //Events v-combobox
   private addItem(): void {
      if (this.comboboxArrayTyped.length !== 0) {
         const lastElement: string = this.comboboxArrayTyped[this.comboboxArrayTyped.length - 1];
         if (lastElement.match('^\\d{8,9}X?$')) {
            this.$store.state.requeteRecherche.setBlocPpnListString(this.comboboxArrayTyped);
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

   //Events v-select
   eventUpdateBlocExternalOperator(): void {
      this.$store.state.requeteRecherche.blocPpn.setBlocPpnExternalOperator(this.external_operator_selected);
   }

   eventUpdateBlocInternalOperator(): void {
      this.$store.state.requeteRecherche.blocPpn.setBlocPpnInternalOperator(this.internal_operator_selected);
   }
}
</script>
