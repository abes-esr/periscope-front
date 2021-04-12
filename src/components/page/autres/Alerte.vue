<template>
   <div class="text-center">
      <v-snackbar outlined color="error" v-model="getSnackbarDisplayValue" :multi-line="getSnackbarMultiline" top timeout="-1">
         {{ getSnackbarText }}
         <template v-slot:action="{attrs}">
            <v-btn color="red" text v-bind="attrs" @click="closeSnackBar()"> Fermer </v-btn>
         </template>
      </v-snackbar>
   </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Alerte extends Vue {
   get getSnackbarDisplayValue(): boolean {
      return this.$store.state.composants._snackBarDisplay;
   }

   get getSnackbarMultiline(): boolean {
      return this.$store.state.composants._snackBarMultiline;
   }

   get getSnackbarText(): string {
      return this.$store.state.composants._snackBarText;
   }

   closeSnackBar(): void {
      this.$store.dispatch('closeSnackBarAction', false);
   }
}
</script>
