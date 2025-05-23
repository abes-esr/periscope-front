import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import {Logger} from '@/utils/Logger';
import VueClipboard from 'vue-clipboard2';
import JsonCSV from 'vue-json-csv';
import VueMatomo from 'vue-matomo';
import {HttpRequestError} from '@/exception/HttpRequestError';
import router from './router';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['Regions'];

// Handle all Vue errors
//Vue.config.errorHandler = (error, vm, info) => Logger.error(error.message, error.constructor.name, vm, info);
//console.log(process.env.VUE_APP_PERISCOPE_V2_API_URL);
Vue.use(VueClipboard); // Plugin pour l'historique
// utilisation de piwik/matomo uniquement en production
if (process.env.VUE_APP_PERISCOPE_V2_API_URL.includes('periscope.sudoc')) {
   Vue.use(VueMatomo, {
      host: 'https://piwik.abes.fr/',
      siteId: 10,
      trackerFileName: 'matomo',
      router: router,
      enableLinkTracking: true,
      requireConsent: false,
      trackInitialView: true,
      disableCookies: false,
      enableHeartBeatTimer: false,
      heartBeatTimerInterval: 15,
      debug: true,
      userId: undefined,
      cookieDomain: undefined,
      domains: undefined,
      preInitActions: [],
   });
}
Vue.component('downloadCsv', JsonCSV); // Plugin d'export au format CSV

const vue = new Vue({
   router: router,
   store,
   vuetify,
   render: (h) => h(App),
}).$mount('#app');

//Chargements initiaux et reset initiaux au lancement de l'application
vue.$store.dispatch('loadCandidatesValue', false).catch((err) => {
   Logger.error(err);
});
vue.$store.dispatch('resetSearchPanel', true).catch((err) => {
   Logger.error(err);
});
vue.$store.dispatch('resetNotices').catch((err) => {
   Logger.error(err);
});
vue.$store.dispatch('resetFacettes').catch((err) => {
   Logger.error(err);
});
vue.$store.dispatch('resetPage').catch((err) => {
   Logger.error(err);
});

//Si lien externe avec en paramètre de l'url PPN, Ordre de tri, Collection, Tree, pour atterrir directement sur la page, à tester
//TODO adapter à l'iframe pour periscope v2
if (vue.$route.query.ppnviewed) {
   Logger.debug('PPN= ' + vue.$route.query.ppnviewed);
   Logger.debug('OrderBy= ' + vue.$route.query.orderby);
   Logger.debug('Collection= ' + vue.$route.query.collectionStatus);
   Logger.debug('Tree= ' + vue.$route.query.tree);

   vue.$store.dispatch('updateCurrentPpn', vue.$route.query.ppnviewed).catch((err) => {
      Logger.error(err);
   });
   vue.$store.dispatch('doVisualisation').catch((err) => {
      Logger.error(err.message);
      if (err instanceof HttpRequestError) {
         Logger.debug('Erreur API : ' + err.debugMessage);
         vue.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter la requête. \n Erreur : " + err.message + ' \n Détails : ' + err.debugMessage).catch((err) => {
            Logger.error(err);
         });
      } else {
         vue.$store.dispatch('openErrorSnackBar', "Impossible d'exécuter l'action. \n Erreur : " + err.message).catch((err) => {
            Logger.error(err);
         });
      }
   });
}
