<template>
   <v-container>
      <v-row :justify="getHorizontalJustifyValue(3)">
         <v-col xs="6" sm="3">
            <v-btn color="#E53935" dark large>Réinitialiser<v-icon dark right> mdi-cancel </v-icon></v-btn>
         </v-col>
         <v-col xs="6" sm="3">
            <v-btn color="#4CAF50" dark large>Recherche<v-icon dark right> mdi-checkbox-marked-circle</v-icon></v-btn>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';

interface Provider {
   id: number;
   key: string;
   value: string;
}

@Component
export default class BoutonsRecherche extends Mixins(GlobalPropertiesMixin) {}
</script>
