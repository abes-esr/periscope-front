<template>
   <v-container fluid>
      <v-row>
         <v-col>
            <component-tableau-resultats></component-tableau-resultats>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentTableauResultats from '@/views/components/03-router-content/02-resultats/TableauResultats.vue';

@Component({
   components: {
      ComponentTableauResultats,
   },
})
export default class Resultats extends Vue {}
</script>
