<template>
   <v-container class="container">
      <v-row class="outlined-app">
         <v-col cols="10">
            <p>PPN {{ notice.ppn }} ISSN {{ notice.issn }} {{ notice.titre }} {{ notice.datePublication }}</p>
            <p>{{ notice.ville }} {{ notice.editeur }} {{ notice.typeSupport }} {{ notice.periodicite }}</p>
            <a :href="'https://www.sudoc.fr/' + ppnNumber" target="_blank"><img src="@/assets/bouton_sudoc.png" alt="Voir la notice dans le Sudoc public" /></a>
         </v-col>
      </v-row>
   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PeriscopeApiAxios} from '@/service/periscope/PeriscopeApiAxios';
import {JsonNotice} from '@/service/periscope/PeriscopeJsonDefinition';
import {HttpRequestError} from '@/exception/HttpRequestError';

@Component
export default class DetailNotice extends Vue {
   notice: JsonNotice;
   ppnNumber: string;

   constructor() {
      super();
      this.ppnNumber = this.$store.state.lotHoldings._ppn;
      this.getNotice();
   }

   getNotice(): void {
      PeriscopeApiAxios.getInfosNotices(this.ppnNumber)
         .then((response) => {
            if (response.status == 200) {
               this.notice = {
                  ppn: response.data.ppn,
                  issn: response.data.issn,
                  titre: response.data.titre,
                  datePublication: response.data.dateDePublication,
                  editeur: response.data.editeur,
                  ville: response.data.ville,
                  typeSupport: response.data.typeSupport,
                  periodicite: response.data.perioricite,
               };
            }
         })
         .catch((err) => {
            if (err.response) {
               throw new HttpRequestError(err.response.data.status, err.response.data.message, err.response.data.debugMessage);
            } else {
               throw new HttpRequestError(err.status, err.message);
            }
         });
   }
}
</script>

<style scoped>
.container {
   background-color: #31669e;
}
</style>
