<template>
   <v-expansion-panel class="outlined-app" style="padding: 0.5em 0.5em 0.5em 0.5em; margin: 0.5em 0 0.5em 0">
      <v-row align="center">
         <!--External Operator-->
         <v-col xs="2" sm="2" lg="2" style="margin-right: -2em"></v-col>
         <v-col xs="8" sm="8" lg="8">
            <v-expansion-panel-header>
               <template v-slot:default="{open}">
                  <v-row no-gutters>
                     <v-col xs="12" sm="4" lg="3"> Recherche par requête JSON directe </v-col>
                     <v-col xs="12" sm="8" lg="9" class="text--secondary">
                        <v-fade-transition leave-absolute>
                           <span v-if="open || requeteEntered.length === 0" key="0">Collez une requête à partir de l'historique ou créez des requêtes plus complexes</span>
                        </v-fade-transition>
                     </v-col>
                  </v-row>
               </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <v-row justify="center">
                  <v-col sm="10">
                     <!--Elements-->
                     <v-text-field
                        @change="eventUpdateBlocRequete"
                        @blur="eventUpdateBlocRequete"
                        @keyup.enter="eventUpdateBlocRequete"
                        outlined
                        small-chips
                        label="Requête au format JSON"
                        placeholder="collez une requête à partir de l'historique ou d'un fichier"
                        class="style2"
                        v-model="requeteEntered"
                     ></v-text-field>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em"> </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal" @click="clearBloc()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveUpPanel('HISTORY')">
               <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="teal" @click="moveDownPanel('HISTORY')">
               <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="closePanel('HISTORY')">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ComponentRequeteEnregistree extends Vue {
   requeteEntered: string;

   constructor() {
      super();
      this.requeteEntered = this.getRequeteEntered;
   }

   get getRequeteEntered(): string {
      let requete = '';
      return requete;
   }

   eventUpdateBlocRequete(): void {
      this.$store.dispatch('blocRequeteDirecteAction', this.requeteEntered);
   }

   //Events v-btn
   closePanel(element: string) {
      this.$store.dispatch('switchElementPanelBooleanAtFalseMutation', element);
   }
   moveUpPanel(element: string) {
      this.$store.dispatch('moveUpElementPanelAction', element);
   }
   moveDownPanel(element: string) {
      this.$store.dispatch('moveDownElementPanelAction', element);
   }
   clearBloc() {
      this.requeteEntered = '';
      this.$store.dispatch('blocRequeteDirecteAction', this.requeteEntered);
   }
}
</script>

<style scoped></style>
