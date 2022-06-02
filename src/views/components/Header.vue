<template>
   <v-container class="ma-0 pa-0" style="margin-bottom: 1em" fluid>
      <v-row style="max-height: 6em; height: 150px" align="center" justify="center" no-gutters>
         <v-col xs="12" sm="6">
            <img src="@/assets/periscope.png" style="max-width: 100%; max-height: 100%" alt="logo periscope" />
         </v-col>
      </v-row>
      <component-alerte></component-alerte>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentAlerte from '@/views/components/Alerte.vue';

@Component({
   components: {
      ComponentAlerte,
   },
})
export default class Header extends Vue {}
</script>
