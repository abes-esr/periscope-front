<template>
   <v-container class="ma-0 pa-0" style="margin-bottom: 1em" fluid>
      <v-row style="max-height: 6em; height: 150px" align="center" justify="start" no-gutters>
         <v-col cols="auto" class="mr-auto" style='padding-left: 2em; padding-right: 2em'>
            <a><img src="@/assets/logo-periscope.svg" @click="$router.push({path: '/'})" style="max-width: 100%; max-height: 100%" alt="logo periscope" /></a>
         </v-col>
         <v-col md="auto">
            <a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance"><img alt="icone assistance" height="41px" src="@/assets/assistance.png" width="41px" style="margin-left: 1em" /></a>
         </v-col>
         <v-col cols="auto" style='padding-left: 2em; padding-right: 2em'>
            <a href="https://documentation.abes.fr/aideperiscope/" target="_blank" title="Documentation"><img alt="icone documentation" height="41px" src="@/assets/documentation.png" width="41px" style="margin-left: 1em" /></a>
         </v-col>
      </v-row>
      <component-alerte></component-alerte>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ComponentAlerte from '@/views/components/global/Alerte.vue';

@Component({
   components: {
      ComponentAlerte,
   },
})
export default class Header extends Vue {}
</script>
