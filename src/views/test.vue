<template>
   <v-container>
      <div>{{ getNombre }}</div>
      <div @click="increaseNumber()">Increase</div>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Test extends Vue {
   private nombre: number;

   constructor() {
      super();
      this.nombre = 0;
   }

   get getNombre(): number {
      return this.$store.state.chainTyped;
   }

   increaseNumber(): void {
      this.$store
         .dispatch('addValueAction', 2)
         .then(() => {
            console.log('Increment ajouté');
            setTimeout(() => {
               this.nombre = this.$store.state.chainTyped;
            }, 1500);
         })
         .catch((error) => {
            console.error(error);
         });
   }
}
</script>
