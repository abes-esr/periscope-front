import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/src/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {fr},
    current: 'fr',
  }
});
