<template>
   <v-container class="container">
      <v-row class="outlined-app">
         <v-col cols="10">
            <div class="notice">
               <p class="my-0">PPN {{ notice.ppn }} ISSN {{ notice.issn }} {{ notice.titre }} {{ notice.datePublication }}</p>
               <p class="my-0">{{ notice.ville }} {{ notice.editeur }} {{ notice.typeSupport }} {{ notice.periodicite }}</p>
            </div>
         </v-col>
         <v-col>
            <div class="lien">
               <a :href="'https://www.sudoc.fr/' + notice.ppn" target="_blank"><img src="@/assets/bouton_sudoc.png" alt="Voir la notice dans le Sudoc public" /></a>
            </div>
         </v-col>
      </v-row>

   </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PeriscopeApiAxios} from '@/service/periscope/PeriscopeApiAxios';
import {HttpRequestError} from '@/exception/HttpRequestError';
import {JsonDetailNotice} from '@/service/periscope/PeriscopeJsonDefinition';

@Component
export default class DetailNotice extends Vue {
   notice: JsonDetailNotice;

   constructor() {
      super();
      this.notice = {ppn: this.$store.state.lotHoldings._ppn, issn: '', titre: '', datePublication: '', editeur: '', ville: '', typeSupport: '', periodicite: ''};
   }

   mounted() {
      PeriscopeApiAxios.getInfosNotices(this.notice.ppn)
         .then((response) => {
            this.notice = {
               ppn: response.data.ppn,
               issn: response.data.issn,
               titre: response.data.titre,
               datePublication: response.data.datePublication,
               editeur: response.data.editeur,
               ville: response.data.ville,
               typeSupport: response.data.typeSupport,
               periodicite: response.data.periodicite,
            };
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

.notice {
   text-align: left;
   color: white;
   font-size: small;
}

.lien {
   text-align: right;
}
</style>
