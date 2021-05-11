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
                     <v-chip class="ma-2" outlined pill>
                        <v-icon left> mdi-book-open-page-variant-outline </v-icon>
                        L'annuaire des clés est disponible ici (lien à mettre)
                     </v-chip>
                     <!--Internal Operator-->
                  </v-col>
                  <v-col sm="2" style="padding-left: 0.5em; padding-top: 0.5em"> </v-col>
               </v-row>
            </v-expansion-panel-content>
         </v-col>
         <v-col xs="2" sm="2" lg="2">
            <v-btn small icon class="ma-0" fab color="teal" @click="clearSelectedValues()">
               <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn small icon class="ma-0" fab color="red lighten-1" @click="removePanel()">
               <v-icon>mdi-close</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {DisplaySwitch, PanelDisplaySwitchProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {Logger} from '@/store/utils/Logger';

@Component
export default class ComponentRequeteEnregistree extends Vue {
   id: PanelType = PanelType.HISTORY;
   requeteEntered: string;

   constructor() {
      super();
      this.requeteEntered = this.getRequeteEntered;
   }

   get getRequeteEntered(): string {
      return JSON.stringify(this.$store.state.blocRequeteDirecte._directRequest);
   }

   eventUpdateBlocRequete(): void {
      try {
         const json = JSON.parse(this.requeteEntered);
         this.$store.dispatch('updateSelectedRequeteDirecte', json).catch((err) => {
            Logger.error(err);
         });
      } catch (err) {
         Logger.error(err.message);
      }
   }

   //Events v-btn
   removePanel(): void {
      this.clearSelectedValues();
      const action: PanelDisplaySwitchProvider = {
         panelId: this.id,
         value: DisplaySwitch.OFF,
      };
      this.$store.dispatch('switchElementPanel', action).catch((err) => {
         Logger.error(err);
      });
      this.$emit('onChange'); // On notifie le composant parent
   }
   clearSelectedValues(): void {
      this.$store.dispatch('resetBlocRequeteDirecte').catch((err) => {
         Logger.error(err);
      });
      this.reloadFromStore();
   }
   reloadFromStore(): void {
      this.requeteEntered = this.getRequeteEntered;
   }
}
</script>

<style scoped></style>
