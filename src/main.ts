import Vue from 'vue';
import App from './App.vue';
import index from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import {Logger} from '@/utils/Logger';
import VueClipboard from 'vue-clipboard2';
import JsonCSV from 'vue-json-csv';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['Regions'];

// Handle all Vue errors
Vue.config.errorHandler = (error) => Logger.error(error.message, error.constructor.name);

Vue.use(VueClipboard); // Plugin pour l'historique
Vue.component('downloadCsv', JsonCSV); // Plugin d'export au format CSV

const vue = new Vue({
   router: index,
   store,
   vuetify,
   render: (h) => h(App),
}).$mount('#app');

// Chargement des valeurs candidates (PCP, langues, pays)
vue.$store.dispatch('loadCandidatesValue', false).catch((err) => {
   Logger.error(err);
});
// Reset du panneau de recherche
vue.$store.dispatch('resetSearchPanel', false).catch((err) => {
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

if (vue.$route.query.ppnviewed) {
   Logger.debug('PPN= ' + vue.$route.query.ppnviewed);
   Logger.debug('OrderBy= ' + vue.$route.query.orderby);
   Logger.debug('Collection= ' + vue.$route.query.collectionStatus);
   Logger.debug('Tree= ' + vue.$route.query.tree);
   index.push('/Resultat');
}
