import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import {Logger} from '@/store/utils/Logger';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['Regions'];

// Handle all Vue errors
Vue.config.errorHandler = (error) => Logger.error(error.message, error.constructor.name);

const vue = new Vue({
   router,
   store,
   vuetify,
   render: (h) => h(App),
}).$mount('#app');

vue.$store.dispatch('loadCandidatesValue',false).catch((err) => {
   Logger.error(err);
});

/*vue.$store.dispatch('resetSearchPanel').catch((err) => {
   Logger.error(err);
});*/



