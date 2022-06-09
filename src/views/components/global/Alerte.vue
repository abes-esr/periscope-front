<template>
   <div class="text-center errorWrapper">
      <v-snackbar outlined :color="getSnackbarColor" v-model="snackbarDisplayValue" :multi-line="getSnackbarMultiline" top :timeout="getSnackbarTimeout">
         <span class="errorLine" v-for="m in getSnackbarText" v-bind:key="m">{{ m }}</span>
         <template v-slot:action="{attrs}">
            <v-btn :color="getSnackbarColor" text v-bind="attrs" @click="closeSnackBar()"> Fermer </v-btn>
         </template>
      </v-snackbar>
   </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ComponentAlerte extends Vue {
   get snackbarDisplayValue(): boolean {
      return this.$store.state.composants._snackBarDisplay;
   }
   set snackbarDisplayValue(value: boolean) {
      this.$store.dispatch('updateSnackBarDisplay', value);
   }

   get getSnackbarMultiline(): boolean {
      return this.$store.state.composants._snackBarMultiline;
   }

   get getSnackbarColor(): string {
      return this.$store.state.composants._snackBarColor;
   }

   get getSnackbarTimeout(): number {
      if (this.$store.state.composants._snackBarSticky) {
         return -1;
      } else {
         return 2000;
      }
   }

   get getSnackbarText(): Array<string> {
      return this.$store.state.composants._snackBarText.split('\n');
   }

   /******************** Events ***************************/

   closeSnackBar(): void {
      this.$store.dispatch('updateSnackBarDisplay', false);
   }
}
</script>
