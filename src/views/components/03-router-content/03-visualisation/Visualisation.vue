<template>
   <v-container fluid>
      <v-row>
         <v-col>
            <tableau-visualisation></tableau-visualisation>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TableauVisualisation from '@/views/components/03-router-content/03-visualisation/v2-current/Visualisation-v2.vue';

@Component({
   components: {
      TableauVisualisation,
   },
})
export default class Visualisation extends Vue {}
</script>
