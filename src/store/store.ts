import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {CheckboxesProvider, Ensemble, ListProvider} from '@/store/recherche/BlocInterfaces';
import {SearchRequest} from '@/store/api/periscope/SearchRequest';
import {PeriscopeApi} from '@/store/api/periscope/PeriscopeApi';
import {LotNotices} from '@/store/resultat/LotNotices';
import Notice from '@/store/entity/Notice';
import {Composants} from './recherche/Composants';
import {Pagination} from '@/store/resultat/Pagination';
import {BlocRequeteEnregistree} from '@/store/recherche/BlocRequeteEnregistree';
import {Logger} from '@/store/utils/Logger';
import {BlocTri} from '@/store/recherche/criteres/BlocTri';
import {BlocMotDuTitre} from '@/store/recherche/criteres/BlocMotDuTitre';
import {BlocIssn} from '@/store/recherche/criteres/BlocIssn';
import {BlocPpn} from '@/store/recherche/criteres/BlocPpn';
import {BlocEditeur} from '@/store/recherche/criteres/BlocEditeur';
import {BlocLangue} from '@/store/recherche/criteres/BlocLangue';
import {BlocPays} from '@/store/recherche/criteres/BlocPays';
import {BlocRcr} from '@/store/recherche/criteres/BlocRcr';
import {BlocPcpMetiers} from '@/store/recherche/criteres/BlocPcpMetiers';
import {BlocPcpRegions} from '@/store/recherche/criteres/BlocPcpRegions';
import {DisplaySwitch, Movement, PanelDisplaySwitchProvider, PanelMovementProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {OrderType, TriInterface} from '@/store/recherche/TriInterface';
import {JsonGlobalSearchRequest} from '@/store/api/periscope/JsonInterfaces';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      //Requete de recherche
      blocPcpRegions: new BlocPcpRegions(Ensemble.Ou),
      blocPcpMetiers: new BlocPcpMetiers(Ensemble.Ou),
      blocRcr: new BlocRcr(Ensemble.Ou),
      blocPpn: new BlocPpn(Ensemble.Ou),
      blocIssn: new BlocIssn(Ensemble.Ou),
      blocMotsDuTitre: new BlocMotDuTitre(Ensemble.Ou),
      blocEditeur: new BlocEditeur(Ensemble.Ou),
      blocLangue: new BlocLangue(Ensemble.Ou),
      blocPays: new BlocPays(Ensemble.Ou),
      blocRequeteDirecte: new BlocRequeteEnregistree(),
      //Resultats de recherche
      lotNotices: new LotNotices(),
      //Composants
      composants: new Composants(),
      //Méthodes pour construire JSON à envoyer au back-end
      jsonTraitements: new SearchRequest(),
      //Bloc de tri multiples
      blocTri: new BlocTri(),
      pagination: new Pagination(),
   },
   mutations: {
      //Bloc de recherche PcpRegions
      mutationExternalPcpRegionsOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pcp Regions');
         state.blocPcpRegions._externalBlocOperator = operator;
      },
      resetExternalPcpRegionsOperator(state) {
         Logger.debug('Reset Operateur externe des Pcp Regions');
         state.blocPcpRegions._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalPcpRegionsOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pcp Regions');
         state.blocPcpRegions._internalBlocOperator = operator;
      },
      resetInternalPcpRegionsOperator(state) {
         Logger.debug('Reset Operateur interne des Pcp Regions');
         state.blocPcpRegions._internalBlocOperator = Ensemble.Et;
      },
      mutationPcpRegions(state, arraySent: Array<CheckboxesProvider>) {
         Logger.debug('Mutation des Pcp Regions');
         state.blocPcpRegions._candidates = arraySent;
         state.blocPcpRegions._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpRegions._selected.push(element.key) : ''));
      },
      loadCandidatesPcpRegions(state, force?: boolean) {
         if (force || state.blocPcpRegions._candidates.length == 0) {
            Logger.debug('Chargement des Pcp Regions');
            state.blocPcpRegions._candidates = [
               {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
               {id: 1, key: 'PCAuv', text: 'Auvergne', value: false},
               {id: 2, key: 'PCBo', text: 'Bourgogne', value: false},
               {id: 3, key: 'PCBre', text: 'Bretagne', value: false},
               {id: 4, key: 'PCCA', text: 'Champagne-Ardenne', value: false},
               {id: 5, key: 'PCCAPI', text: 'Champagne-Ardenne Picardie', value: false},
               {id: 6, key: 'PCCor', text: 'Corse', value: false},
               {id: 7, key: 'PCFC', text: 'Franche-Comté', value: false},
               {id: 8, key: 'PCLR', text: 'Languedoc-Roussillon', value: false},
               {id: 9, key: 'PCLim', text: 'Limousin', value: false},
               {id: 10, key: 'PCLor', text: 'Lorraine', value: false},
               {id: 11, key: 'PCMP', text: 'Midi-Pyrénées', value: false},
               {id: 12, key: 'PCNPDC', text: 'Nord-Pas-de-Calais', value: false},
               {id: 13, key: 'PCPACA', text: 'PACA', value: false},
               {id: 14, key: 'PCPCh', text: 'Poitou-Charentes', value: false},
               {id: 15, key: 'PCPL', text: 'Pays de Loire', value: false},
               {id: 16, key: 'PCPic', text: 'Picardie', value: false},
               {id: 17, key: 'PCRA', text: 'Rhône-Alpes', value: false},
               {id: 18, key: 'PCSAM', text: 'Sciences Aix-Marseille', value: false},
               {id: 19, key: 'PCScvdl', text: 'Sciences Centre Val de Loire', value: false},
               {id: 20, key: 'PCUdp', text: 'Université de Poitiers', value: false},
               {id: 21, key: 'PCUdr', text: 'Université de Rouen', value: false},
            ];
         }
      },
      resetPcpRegions(state) {
         Logger.debug('Reset des Pcp Regions');
         state.blocPcpRegions._selected = [];
         state.blocPcpRegions._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche PcpMetiers
      mutationExternalPcpMetiersOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pcp Metiers');
         state.blocPcpMetiers._externalBlocOperator = operator;
      },
      resetExternalPcpMetiersOperator(state) {
         Logger.debug('Reset Operateur externe des Pcp Metiers');
         state.blocPcpMetiers._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalPcpMetiersOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pcp Metiers');
         state.blocPcpMetiers._internalBlocOperator = operator;
      },
      resetInternalPcpMetiersOperator(state) {
         Logger.debug('Reset Operateur interne des Pcp Metiers');
         state.blocPcpMetiers._internalBlocOperator = Ensemble.Et;
      },
      mutationPcpMetiers(state, arraySent: Array<CheckboxesProvider>) {
         Logger.debug('Mutation des Pcp Metiers');
         state.blocPcpMetiers._candidates = arraySent;
         state.blocPcpMetiers._selected = [];
         arraySent.forEach((element: {value: boolean; key: string}) => (element.value ? state.blocPcpMetiers._selected.push(element.key) : ''));
      },
      loadCandidatesPcpMetiers(state, force?: boolean) {
         if (force || state.blocPcpMetiers._candidates.length == 0) {
            Logger.debug('Chargement des Pcp Metiers');
            state.blocPcpMetiers._candidates = [
               {id: 0, key: 'PCAM', text: 'Arts-et-Métiers', value: false},
               {id: 1, key: 'PCAS', text: 'Arts du spectacle', value: false},
               {id: 2, key: 'PCAnt', text: "Sciences de l'Antiquité et Archéologie", value: false},
               {id: 3, key: 'PCChimie', text: 'Chimie', value: false},
               {id: 4, key: 'PCDroit', text: 'Droit', value: false},
               {id: 5, key: 'PCEBCO', text: 'Europe balkanique, centrale et orientale', value: false},
               {id: 6, key: 'PCGer', text: 'Langues, littératures, civilisation germaniques', value: false},
               {id: 7, key: 'PCGéo', text: 'Géographie', value: false},
               {id: 8, key: 'PCIta', text: 'Etudes italiennes', value: false},
               {id: 9, key: 'PCMedieval', text: 'Médiéval', value: false},
               {id: 10, key: 'PCNum', text: 'Sciences du Numérique', value: false},
               {id: 11, key: 'PCMath', text: 'Mathématiques RNBM', value: false},
               {id: 12, key: 'PCMed', text: 'Médecine', value: false},
               {id: 13, key: 'PCPsy', text: 'Psychologie, Psychanalyse', value: false},
               {id: 14, key: 'PCSTAPS', text: 'STAPS', value: false},
               {id: 15, key: 'PCPhilo', text: 'Philosophie', value: false},
               {id: 16, key: 'PCPhy', text: 'Physique', value: false},
               //TODO 'PCLCen':['Lettres et Sciences Humaines Centre Val de Loire', 'geo' ], -> trouver correspondance
               //TODO 'PCEco':['Economie et gestion', ''] idem
            ];
         }
      },
      resetPcpMetiers(state) {
         Logger.debug('Reset des Pcp Metiers');
         state.blocPcpMetiers._selected = [];
         state.blocPcpMetiers._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche Rcr
      mutationExternalRcrOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Rcr');
         state.blocRcr._externalBlocOperator = operator;
      },
      resetExternalRcrOperator(state) {
         Logger.debug('Reset Operateur externe des Rcr');
         state.blocRcr._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalRcrOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Rcr');
         state.blocRcr._internalBlocOperator = operator;
      },
      resetInternalRcrOperator(state) {
         Logger.debug('Reset Operateur interne des Rcr');
         state.blocRcr._internalBlocOperator = Ensemble.Et;
      },
      mutationRcr(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Rcr');
         state.blocRcr._selected = arraySent;
      },
      resetRcr(state) {
         Logger.debug('Reset des Rcr');
         state.blocRcr._selected = [];
      },

      //Bloc de recherche Ppn
      mutationExternalPpnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Ppn');
         state.blocPpn._externalBlocOperator = operator;
      },
      resetExternalPpnOperator(state) {
         Logger.debug('Reset Operateur externe des Ppn');
         state.blocPpn._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalPpnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Ppn');
         state.blocPpn._internalBlocOperator = operator;
      },
      resetInternalPpnOperator(state) {
         Logger.debug('Reset Operateur interne des Ppn');
         state.blocPpn._internalBlocOperator = Ensemble.Et;
      },
      mutationPpn(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Ppn');
         state.blocPpn._selected = arraySent;
      },
      resetPpn(state) {
         Logger.debug('Reset des Ppn');
         state.blocPpn._selected = [];
      },

      //Bloc de recherche Issn
      mutationExternalIssnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Issn');
         state.blocIssn._externalBlocOperator = operator;
      },
      resetExternalIssnOperator(state) {
         Logger.debug('Reset Operateur externe des Issn');
         state.blocIssn._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalIssnOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Issn');
         state.blocIssn._internalBlocOperator = operator;
      },
      resetInternalIssnOperator(state) {
         Logger.debug('Reset Operateur interne des Issn');
         state.blocIssn._internalBlocOperator = Ensemble.Et;
      },
      mutationIssn(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Issn');
         state.blocIssn._selected = arraySent;
      },
      resetIssn(state) {
         Logger.debug('Reset des Issn');
         state.blocIssn._selected = [];
      },

      //Bloc de recherche Mots du titre
      mutationExternalMotsDuTitreOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Mots du titre');
         state.blocMotsDuTitre._externalBlocOperator = operator;
      },
      resetExternalMotsDuTitreOperator(state) {
         Logger.debug('Reset Operateur externe des Mots du titre');
         state.blocMotsDuTitre._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalMotsDuTitreOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Mots du titre');
         state.blocMotsDuTitre._internalBlocOperator = operator;
      },
      resetInternalMotsDuTitreOperator(state) {
         Logger.debug('Reset Operateur interne des Mots du titre');
         state.blocMotsDuTitre._internalBlocOperator = Ensemble.Et;
      },
      mutationMotsDuTitre(state, stringEntered: string) {
         Logger.debug('Mutation des Mots du titre');
         state.blocMotsDuTitre._selected = [];
         if (stringEntered === '') {
            state.blocMotsDuTitre._selected = [];
         } else {
            stringEntered.split(' ').forEach((element: string) => {
               state.blocMotsDuTitre._selected.push(String(element));
            });
         }
      },
      resetMotsDuTitre(state) {
         Logger.debug('Reset des Mots du titre');
         state.blocMotsDuTitre._selected = [];
      },

      //Bloc de recherche Editeur
      mutationExternalEditeurOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Editeurs');
         state.blocEditeur._externalBlocOperator = operator;
      },
      resetExternalEditeurOperator(state) {
         Logger.debug('Reset Operateur externe des Editeurs');
         state.blocEditeur._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalEditeurOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Editeurs');
         state.blocEditeur._internalBlocOperator = operator;
      },
      resetInternalEditeurOperator(state) {
         Logger.debug('Reset Operateur interne des Editeurs');
         state.blocEditeur._internalBlocOperator = Ensemble.Et;
      },
      mutationEditeur(state, arraySent: Array<string>) {
         Logger.debug('Mutation des Editeurs');
         state.blocEditeur._selected = arraySent;
      },
      resetEditeur(state) {
         Logger.debug('Reset des Editeurs');
         state.blocEditeur._selected = [];
      },

      //Bloc de recherche Langue
      mutationExternalLangueOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Langues');
         state.blocLangue._externalBlocOperator = operator;
      },
      resetExternalLangueOperator(state) {
         Logger.debug('Reset Operateur externe des Langues');
         state.blocLangue._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalLangueOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Langues');
         state.blocLangue._internalBlocOperator = operator;
      },
      resetInternalLangueOperator(state) {
         Logger.debug('Reset Operateur interne des Langues');
         state.blocLangue._internalBlocOperator = Ensemble.Et;
      },
      mutationLangue(state, arraySent: Array<ListProvider>) {
         Logger.debug('Mutation des Langues');
         state.blocLangue._candidates = arraySent;
         state.blocLangue._selected = [];
         arraySent.forEach((element: {value: boolean; id: string}) => (element.value ? state.blocLangue._selected.push(element.id) : ''));
      },
      loadCandidatesLangue(state, force?: boolean) {
         if (force || state.blocLangue._candidates.length == 0) {
            Logger.debug('Chargement des Langues');
            state.blocLangue._candidates = [
               {id: 'abk', text: 'Abkhaz', value: false},
               {id: 'ace', text: 'Achinese', value: false},
               {id: 'ach', text: 'Acoli', value: false},
               {id: 'ada', text: 'Adan', value: false},
               {id: 'ady', text: 'Adyghe', value: false},
               {id: 'aar', text: 'Afar', value: false},
               {id: 'afh', text: 'Afrihili', value: false},
               {id: 'afr', text: 'Afrikaans', value: false},
               {id: 'afa', text: 'Afro-asiatiques (diverses)', value: false},
               {id: 'ain', text: 'Ainou', value: false},
               {id: 'aka', text: 'Akan', value: false},
               {id: 'akk', text: 'Akkadien', value: false},
               {id: 'alb', text: 'Albanais', value: false},
               {id: 'ale', text: 'Aleoute', value: false},
               {id: 'alg', text: 'Algonquin', value: false},
               {id: 'ger', text: 'Allemand', value: false},
               {id: 'nds', text: 'allemand (bas) ou saxon (bas)', value: false},
               {id: 'gmh', text: 'Allemand (moyen haut)', value: false},
               {id: 'goh', text: 'Allemand (vieux haut)', value: false},
               {id: 'tut', text: 'Altaiques (autres langues)', value: false},
               {id: 'amh', text: 'Amharique', value: false},
               {id: 'eng', text: 'Anglais', value: false},
               {id: 'enm', text: 'Anglais (moyen)', value: false},
               {id: 'ang', text: 'Anglo-saxon', value: false},
               {id: 'apa', text: 'Apache', value: false},
               {id: 'ara', text: 'Arabe', value: false},
               {id: 'arg', text: 'aragonais', value: false},
               {id: 'arc', text: 'Arameen', value: false},
               {id: 'arp', text: 'Arapaho', value: false},
               {id: 'arn', text: 'Araucan', value: false},
               {id: 'arw', text: 'Arawak', value: false},
               {id: 'arm', text: 'Armenien', value: false},
               {id: 'art', text: 'Artificielles (diverses)', value: false},
               {id: 'asm', text: 'Assamais', value: false},
               {id: 'ast', text: 'Asturien ou Bable', value: false},
               {id: 'ath', text: 'Athapascan', value: false},
               {id: 'aus', text: 'Australian languages', value: false},
               {id: 'ava', text: 'Avar', value: false},
               {id: 'ave', text: 'Avestique', value: false},
               {id: 'awa', text: 'Awadhi', value: false},
               {id: 'aym', text: 'Aymara', value: false},
               {id: 'aze', text: 'Azeri', value: false},
               {id: 'bak', text: 'Bachkir', value: false},
               {id: 'ban', text: 'Balinais', value: false},
               {id: 'bal', text: 'Baloutchi', value: false},
               {id: 'bat', text: 'Baltique', value: false},
               {id: 'bam', text: 'Bambara', value: false},
               {id: 'bai', text: 'Bamileke (diverses)', value: false},
               {id: 'bad', text: 'Banda', value: false},
               {id: 'bnt', text: 'Bantou langues (autre)', value: false},
               {id: 'bas', text: 'Basa', value: false},
               {id: 'baq', text: 'Basque', value: false},
               {id: 'btk', text: 'Batak', value: false},
               {id: 'bej', text: 'Bedja', value: false},
               {id: 'bem', text: 'Bemba', value: false},
               {id: 'ben', text: 'Bengali', value: false},
               {id: 'ber', text: 'Berbere', value: false},
               {id: 'bho', text: 'Bhojpuri', value: false},
               {id: 'bis', text: 'Bislama', value: false},
               {id: 'bel', text: 'Bielorusse', value: false},
               {id: 'bih', text: 'Bihari', value: false},
               {id: 'bik', text: 'Bikol', value: false},
               {id: 'byn', text: 'bilen ou blin', value: false},
               {id: 'bin', text: 'Bini', value: false},
               {id: 'bur', text: 'Birman', value: false},
               {id: 'bla', text: "Blackfoot(= pied noir d'amerique", value: false},
               {id: 'bos', text: 'Bosnian', value: false},
               {id: 'bua', text: 'Buriat', value: false},
               {id: 'bra', text: 'Braj', value: false},
               {id: 'bre', text: 'Breton', value: false},
               {id: 'bug', text: 'Bugi', value: false},
               {id: 'bul', text: 'Bulgare', value: false},
               {id: 'cad', text: 'Caddo', value: false},
               {id: 'car', text: 'Caribe', value: false},
               {id: 'cat', text: 'Catalan', value: false},
               {id: 'cau', text: 'Caucasiennes (diverses)', value: false},
               {id: 'ceb', text: 'Cebuano', value: false},
               {id: 'cel', text: 'Celtiques (langues)', value: false},
               {id: 'cmc', text: 'Chamic langues', value: false},
               {id: 'cha', text: 'Chamorro', value: false},
               {id: 'shn', text: 'chan', value: false},
               {id: 'chr', text: 'Cherokee', value: false},
               {id: 'chy', text: 'Cheyenne', value: false},
               {id: 'chb', text: 'Chibcha', value: false},
               {id: 'chi', text: 'Chinois', value: false},
               {id: 'chn', text: 'Chinook', value: false},
               {id: 'chp', text: 'Chipewyan', value: false},
               {id: 'cho', text: 'Choctaw', value: false},
               {id: 'chk', text: 'chuuk', value: false},
               {id: 'cop', text: 'Copte', value: false},
               {id: 'kor', text: 'Coreen', value: false},
               {id: 'cor', text: 'Cornique', value: false},
               {id: 'cos', text: 'Corse', value: false},
               {id: 'cus', text: 'Couchitique', value: false},
               {id: 'cre', text: 'Cree', value: false},
               {id: 'cpe', text: 'Creoles et pidgins (anglais)', value: false},
               {id: 'crp', text: 'Creoles et pidgins (diverses)', value: false},
               {id: 'cpf', text: 'Creoles et pidgins (francais)', value: false},
               {id: 'cpp', text: 'Creoles et pidgins (portugais)', value: false},
               {id: 'scr', text: 'croate', value: false},
               {id: 'dak', text: 'Dakota', value: false},
               {id: 'dan', text: 'Danois', value: false},
               {id: 'dar', text: 'dargwa', value: false},
               {id: 'day', text: 'Dayak', value: false},
               {id: 'del', text: 'Delaware', value: false},
               {id: 'din', text: 'Dinka', value: false},
               {id: 'dyu', text: 'dioula', value: false},
               {id: 'mis', text: 'Diverses', value: false},
               {id: 'chg', text: 'djaghatai', value: false},
               {id: 'doi', text: 'Dogri', value: false},
               {id: 'dgr', text: 'Dogrib', value: false},
               {id: 'dua', text: 'Douala', value: false},
               {id: 'dra', text: 'Dravidien', value: false},
               {id: 'dzo', text: 'Dzongka', value: false},
               {id: 'sco', text: 'Ecossais', value: false},
               {id: 'efi', text: 'Efik', value: false},
               {id: 'egy', text: 'Egyptien', value: false},
               {id: 'eka', text: 'Ekajuk', value: false},
               {id: 'elx', text: 'Elamite', value: false},
               {id: 'myv', text: 'erza', value: false},
               {id: 'den', text: 'esclave (athapascan)', value: false},
               {id: 'spa', text: 'Espagnol', value: false},
               {id: 'epo', text: 'Esperanto', value: false},
               {id: 'est', text: 'Estonien', value: false},
               {id: 'ewe', text: 'Ewe', value: false},
               {id: 'ewo', text: 'Ewondo', value: false},
               {id: 'fan', text: 'Fang', value: false},
               {id: 'fat', text: 'Fanti', value: false},
               {id: 'fao', text: 'Feroien', value: false},
               {id: 'fij', text: 'Fidjien', value: false},
               {id: 'fil', text: 'filipino ou pilipino', value: false},
               {id: 'fiu', text: 'Finno-ougrien', value: false},
               {id: 'fin', text: 'Finnois', value: false},
               {id: 'fon', text: 'Fon', value: false},
               {id: 'fre', text: 'Francais', value: false},
               {id: 'fro', text: 'Francais (ancien)', value: false},
               {id: 'frm', text: 'Francais (moyen)', value: false},
               {id: 'fur', text: 'Friulian', value: false},
               {id: 'fry', text: 'Frison', value: false},
               {id: 'gaa', text: 'Ga', value: false},
               {id: 'gla', text: 'Gaelique', value: false},
               {id: 'glg', text: 'Galicien', value: false},
               {id: 'orm', text: 'Galla', value: false},
               {id: 'wel', text: 'Gallois', value: false},
               {id: 'lug', text: 'ganda', value: false},
               {id: 'gay', text: 'Gayo', value: false},
               {id: 'gba', text: 'Gbaya', value: false},
               {id: 'geo', text: 'Georgien', value: false},
               {id: 'gem', text: 'Germaniques (diverses)', value: false},
               {id: 'gon', text: 'Gond', value: false},
               {id: 'gor', text: 'Gorontalo', value: false},
               {id: 'got', text: 'Gothique', value: false},
               {id: 'guj', text: 'Gujarati', value: false},
               {id: 'grb', text: 'Grebo', value: false},
               {id: 'grc', text: 'Grec ancien', value: false},
               {id: 'gre', text: 'Grec moderne', value: false},
               {id: 'kal', text: 'groenlandais', value: false},
               {id: 'grn', text: 'Guarani', value: false},
               {id: 'gez', text: 'guèze', value: false},
               {id: 'gwi', text: "Gwich'in", value: false},
               {id: 'hai', text: 'Haida', value: false},
               {id: 'hat', text: 'haitien ou creole haitien', value: false},
               {id: 'hau', text: 'Haoussa', value: false},
               {id: 'haw', text: 'Hawaien', value: false},
               {id: 'heb', text: 'Hebreu', value: false},
               {id: 'her', text: 'Herero', value: false},
               {id: 'hil', text: 'Hiligaynon', value: false},
               {id: 'him', text: 'Himachali', value: false},
               {id: 'hin', text: 'Hindi', value: false},
               {id: 'hmo', text: 'Hiri Motu', value: false},
               {id: 'hit', text: 'Hittite', value: false},
               {id: 'hmn', text: 'Hmong', value: false},
               {id: 'hun', text: 'Hongrois', value: false},
               {id: 'hup', text: 'Hupa', value: false},
               {id: 'sah', text: 'iakoute', value: false},
               {id: 'iba', text: 'Iban', value: false},
               {id: 'ido', text: 'Ido', value: false},
               {id: 'ibo', text: 'Igbo', value: false},
               {id: 'ijo', text: 'Ijo', value: false},
               {id: 'ilo', text: 'Ilocano', value: false},
               {id: 'und', text: 'Inconnue', value: false},
               {id: 'cai', text: 'Indiennes (langues Amerique Centrale)', value: false},
               {id: 'nai', text: "indiennes d'Amerique du Nord (autres langues)", value: false},
               {id: 'sai', text: 'Indiennes (langues Amerique du sud)', value: false},
               {id: 'inc', text: 'Indo-aryen (groupe)', value: false},
               {id: 'ine', text: 'Indo-europeen (groupe)', value: false},
               {id: 'ind', text: 'Indonesien', value: false},
               {id: 'inh', text: 'Ingouche', value: false},
               {id: 'ina', text: 'Interlingua', value: false},
               {id: 'ile', text: 'Interlingue', value: false},
               {id: 'iku', text: 'Inuktitut', value: false},
               {id: 'ipk', text: 'Inupiaq', value: false},
               {id: 'ira', text: 'Iraniennes (diverses)', value: false},
               {id: 'gle', text: 'Irlandais', value: false},
               {id: 'sga', text: 'Irlandais ancien (---1100)', value: false},
               {id: 'mga', text: 'Irlandais moyen (ca. 1100-1500)', value: false},
               {id: 'iro', text: 'Iroquois', value: false},
               {id: 'ice', text: 'Islandais', value: false},
               {id: 'ita', text: 'Italien', value: false},
               {id: 'jpn', text: 'Japonais', value: false},
               {id: 'jav', text: 'Javanais', value: false},
               {id: 'jrb', text: 'Judeo-arabe', value: false},
               {id: 'lad', text: 'judéo-espagnol', value: false},
               {id: 'jpr', text: 'Judeo-persan', value: false},
               {id: 'kbd', text: 'kabardien', value: false},
               {id: 'kab', text: 'Kabyle', value: false},
               {id: 'kac', text: 'Kachin', value: false},
               {id: 'csb', text: 'kachoube', value: false},
               {id: 'xal', text: 'kalmouk', value: false},
               {id: 'kam', text: 'Kamba', value: false},
               {id: 'kan', text: 'Kanara', value: false},
               {id: 'kau', text: 'Kanouri', value: false},
               {id: 'kaa', text: 'Karakalpak', value: false},
               {id: 'krc', text: 'karatchai balkar', value: false},
               {id: 'kar', text: 'Karen', value: false},
               {id: 'kas', text: 'Kasmiri', value: false},
               {id: 'kaw', text: 'Kawi', value: false},
               {id: 'kaz', text: 'Kazakh', value: false},
               {id: 'kha', text: 'Khasi', value: false},
               {id: 'khm', text: 'Khmer', value: false},
               {id: 'khi', text: 'Khoin (langues)', value: false},
               {id: 'kho', text: 'Khotanais', value: false},
               {id: 'kik', text: 'Kikuyu', value: false},
               {id: 'kmb', text: 'Kimbundu', value: false},
               {id: 'kir', text: 'Kirghiz', value: false},
               {id: 'gil', text: 'kiribati', value: false},
               {id: 'tlh', text: 'klingon', value: false},
               {id: 'kom', text: 'Komi', value: false},
               {id: 'kon', text: 'Kongo', value: false},
               {id: 'kok', text: 'Konkani', value: false},
               {id: 'kos', text: 'Kusaie', value: false},
               {id: 'kum', text: 'Kumyk', value: false},
               {id: 'kpe', text: 'Kpele', value: false},
               {id: 'kro', text: 'Kru', value: false},
               {id: 'kur', text: 'Kurde', value: false},
               {id: 'kru', text: 'Kurukh', value: false},
               {id: 'kut', text: 'Kutenai', value: false},
               {id: 'kua', text: 'Kuanyama', value: false},
               {id: 'lah', text: 'Lahnda', value: false},
               {id: 'lam', text: 'Lamba', value: false},
               {id: 'sgn', text: 'Langage gestuel', value: false},
               {id: 'lao', text: 'Lao', value: false},
               {id: 'lat', text: 'Latin', value: false},
               {id: 'lav', text: 'Lette', value: false},
               {id: 'lez', text: 'Lezgian', value: false},
               {id: 'lim', text: 'limbourgeois', value: false},
               {id: 'lin', text: 'Lingala', value: false},
               {id: 'lit', text: 'Lituanien', value: false},
               {id: 'lin', text: 'Lingala', value: false},
               {id: 'lit', text: 'Lituanien', value: false},
               {id: 'jbo', text: 'lojban', value: false},
               {id: 'loz', text: 'Lozi', value: false},
               {id: 'lub', text: 'Louba', value: false},
               {id: 'lua', text: 'Luba-Lulua', value: false},
               {id: 'lui', text: 'Luiseno', value: false},
               {id: 'lun', text: 'Lunda', value: false},
               {id: 'luo', text: 'Luo (Kenya et Tanzanie)', value: false},
               {id: 'lus', text: 'Lushai', value: false},
               {id: 'ltz', text: 'luxembourgeois', value: false},
               {id: 'mac', text: 'Macedonien', value: false},
               {id: 'mad', text: 'Madourais', value: false},
               {id: 'mag', text: 'Magahi', value: false},
               {id: 'mai', text: 'Maithili', value: false},
               {id: 'mak', text: 'Makasar', value: false},
               {id: 'may', text: 'Malais', value: false},
               {id: 'mal', text: 'Malayalam', value: false},
               {id: 'map', text: 'Malayo-polynesien', value: false},
               {id: 'div', text: 'maldivien', value: false},
               {id: 'mlg', text: 'Malgache', value: false},
               {id: 'mlt', text: 'Maltais', value: false},
               {id: 'mdr', text: 'Mandar', value: false},
               {id: 'mnc', text: 'Manchu', value: false},
               {id: 'man', text: 'Mande', value: false},
               {id: 'mni', text: 'Manipuri', value: false},
               {id: 'glv', text: 'Manx new', value: false},
               {id: 'mno', text: 'Manobo', value: false},
               {id: 'mao', text: 'Maori', value: false},
               {id: 'mar', text: 'Marathi', value: false},
               {id: 'chm', text: 'Mari', value: false},
               {id: 'mah', text: 'Marshall', value: false},
               {id: 'mwr', text: 'Marvari', value: false},
               {id: 'mas', text: 'Masai', value: false},
               {id: 'myn', text: 'Maya', value: false},
               {id: 'men', text: 'Mende', value: false},
               {id: 'mic', text: 'Micmac', value: false},
               {id: 'min', text: 'Minangkabao', value: false},
               {id: 'mwl', text: 'mirandais', value: false},
               {id: 'moh', text: 'Mohawk', value: false},
               {id: 'mdf', text: 'moksa', value: false},
               {id: 'mol', text: 'Moldave', value: false},
               {id: 'mkh', text: 'Mon Khmer (diverses)', value: false},
               {id: 'lol', text: 'Mongo', value: false},
               {id: 'mon', text: 'Mongol', value: false},
               {id: 'mos', text: 'Mossi', value: false},
               {id: 'mun', text: 'Mounda', value: false},
               {id: 'mul', text: 'Multilingue', value: false},
               {id: 'mus', text: 'Muskogee', value: false},
               {id: 'nah', text: 'Nahuatl', value: false},
               {id: 'nap', text: 'napolitain', value: false},
               {id: 'nau', text: 'Nauru', value: false},
               {id: 'nav', text: 'Navaho', value: false},
               {id: 'nde', text: 'Ndebele (Zimbabwe)', value: false},
               {id: 'nbl', text: 'Ndebele (Afrique du Sud)', value: false},
               {id: 'ndo', text: 'Ndongo', value: false},
               {id: 'dut', text: 'Neerlandais', value: false},
               {id: 'dum', text: 'Neerlandais (moyen)', value: false},
               {id: 'nep', text: 'Nepalais', value: false},
               {id: 'new', text: 'Newari', value: false},
               {id: 'nwc', text: 'newari classique', value: false},
               {id: 'nia', text: 'Nias', value: false},
               {id: 'nic', text: 'Nigero-congolais', value: false},
               {id: 'ssa', text: 'Nilo-saharien (groupe)', value: false},
               {id: 'niu', text: 'Niuean', value: false},
               {id: 'nog', text: 'nogai ou nogay', value: false},
               {id: 'non', text: 'Norrois vieux', value: false},
               {id: 'nor', text: 'Norvegien', value: false},
               {id: 'nob', text: 'Norvegien Bokmal', value: false},
               {id: 'nno', text: 'Norvegien Nynorsk', value: false},
               {id: 'nub', text: 'Nubien', value: false},
               {id: 'nym', text: 'Nyamwezi', value: false},
               {id: 'nya', text: 'Nyanja', value: false},
               {id: 'nyn', text: 'Nyankole', value: false},
               {id: 'nyo', text: 'Nyoro', value: false},
               {id: 'nzi', text: 'Nzima', value: false},
               {id: 'oci', text: 'Occitan', value: false},
               {id: 'oji', text: 'Ojibwa', value: false},
               {id: 'ori', text: 'Oriya', value: false},
               {id: 'osa', text: 'Osage', value: false},
               {id: 'oss', text: 'Ossete', value: false},
               {id: 'oto', text: 'Otomang', value: false},
               {id: 'udm', text: 'oudmourte', value: false},
               {id: 'uga', text: 'Ougaritique', value: false},
               {id: 'uig', text: 'Ouigour', value: false},
               {id: 'urd', text: 'ourdu', value: false},
               {id: 'uzb', text: 'Ouzbek', value: false},
               {id: 'pus', text: 'Pachto', value: false},
               {id: 'pal', text: 'Pahlavi', value: false},
               {id: 'pau', text: 'Palauan', value: false},
               {id: 'pli', text: 'Pali', value: false},
               {id: 'pam', text: 'Pampanga', value: false},
               {id: 'pag', text: 'Pangasinan', value: false},
               {id: 'pap', text: 'Papiamento', value: false},
               {id: 'paa', text: 'Papou', value: false},
               {id: 'pan', text: 'Penjabi', value: false},
               {id: 'per', text: 'Persan moderne', value: false},
               {id: 'peo', text: 'Perse ancien (600-400 av. J.C.)', value: false},
               {id: 'ful', text: 'peul', value: false},
               {id: 'phn', text: 'Phoenician', value: false},
               {id: 'phi', text: 'Pilipino langues (autre)', value: false},
               {id: 'pon', text: 'Pohnpei', value: false},
               {id: 'pol', text: 'Polonais', value: false},
               {id: 'por', text: 'Portugais', value: false},
               {id: 'pra', text: 'Prakrit', value: false},
               {id: 'pro', text: 'Provencal (avant 1500)', value: false},
               {id: 'que', text: 'Quechua', value: false},
               {id: 'raj', text: 'Rajasthani', value: false},
               {id: 'rap', text: 'Rapanui', value: false},
               {id: 'rar', text: 'Rarotonga', value: false},
               {id: 'roh', text: 'Rhetoroman (groupe)', value: false},
               {id: 'roa', text: 'Romanes (diverses)', value: false},
               {id: 'rum', text: 'Roumain', value: false},
               {id: 'run', text: 'Rundi', value: false},
               {id: 'rus', text: 'Russe', value: false},
               {id: 'kin', text: 'rwanda', value: false},
               {id: 'sal', text: 'Salish (famille)', value: false},
               {id: 'sam', text: 'Samaritain', value: false},
               {id: 'smi', text: 'Sami', value: false},
               {id: 'smi', text: 'ex lapon', value: false},
               {id: 'smn', text: "Sami d'Inari", value: false},
               {id: 'smj', text: 'Sami de Lule', value: false},
               {id: 'sme', text: 'Sami du Nord', value: false},
               {id: 'sma', text: 'Sami du Sud', value: false},
               {id: 'sms', text: 'Sami Skolt', value: false},
               {id: 'smo', text: 'Samoa', value: false},
               {id: 'sad', text: 'Sandawe', value: false},
               {id: 'sag', text: 'Sango', value: false},
               {id: 'san', text: 'Sanskrit', value: false},
               {id: 'sat', text: 'Santali', value: false},
               {id: 'srd', text: 'Sardinian', value: false},
               {id: 'sas', text: 'Sasak', value: false},
               {id: 'sel', text: 'Selkoup', value: false},
               {id: 'sem', text: 'Semitiques (diverses)', value: false},
               {id: 'scc', text: 'Serbe', value: false},
               {id: 'srr', text: 'Serere', value: false},
               {id: 'sna', text: 'Shona', value: false},
               {id: 'scn', text: 'sicilien', value: false},
               {id: 'sid', text: 'Sidamo', value: false},
               {id: 'snd', text: 'Sindhi', value: false},
               {id: 'sin', text: 'Singhalais', value: false},
               {id: 'sit', text: 'Sino-tibetaines (langues)', value: false},
               {id: 'sio', text: 'Siou (famille)', value: false},
               {id: 'sla', text: 'Slaves (diverses)', value: false},
               {id: 'chu', text: "Slavon d'eglise", value: false},
               {id: 'slo', text: 'Slovaque', value: false},
               {id: 'slv', text: 'Slovene', value: false},
               {id: 'sog', text: 'Sogdien', value: false},
               {id: 'som', text: 'Somali', value: false},
               {id: 'son', text: 'Songhai', value: false},
               {id: 'snk', text: 'Soninke', value: false},
               {id: 'dsb', text: 'sorabe (bas)', value: false},
               {id: 'hsb', text: 'sorabe (haut)', value: false},
               {id: 'wen', text: 'sorabes (langues)', value: false},
               {id: 'sot', text: 'Sotho du Sud', value: false},
               {id: 'nso', text: 'Sotho du Nord', value: false},
               {id: 'sun', text: 'Soundanais', value: false},
               {id: 'sus', text: 'Soussou', value: false},
               {id: 'swe', text: 'Suedois', value: false},
               {id: 'suk', text: 'Sukuma', value: false},
               {id: 'sux', text: 'Sumerien', value: false},
               {id: 'swa', text: 'Swahili', value: false},
               {id: 'ssw', text: 'Swazi', value: false},
               {id: 'syr', text: 'Syriaque', value: false},
               {id: 'tgk', text: 'Tadjik', value: false},
               {id: 'tgl', text: 'Tagalog', value: false},
               {id: 'tah', text: 'Tahitien', value: false},
               {id: 'tmh', text: 'Tamashek', value: false},
               {id: 'tam', text: 'Tamoul', value: false},
               {id: 'tat', text: 'Tatar', value: false},
               {id: 'crh', text: 'tatar de Crime', value: false},
               {id: 'cze', text: 'Tcheque', value: false},
               {id: 'che', text: 'Tchetchene', value: false},
               {id: 'chv', text: 'Tchouvache', value: false},
               {id: 'tel', text: 'Telugu', value: false},
               {id: 'tem', text: 'Temne', value: false},
               {id: 'ter', text: 'Tereno', value: false},
               {id: 'tet', text: 'Tetum', value: false},
               {id: 'tha', text: 'Thai', value: false},
               {id: 'tai', text: 'Thai langues (autre)', value: false},
               {id: 'tib', text: 'Tibetain', value: false},
               {id: 'tig', text: 'Tigre', value: false},
               {id: 'tir', text: 'Tigrina', value: false},
               {id: 'tiv', text: 'Tiv', value: false},
               {id: 'tli', text: 'Tlingit', value: false},
               {id: 'tpi', text: 'Tok Pisin', value: false},
               {id: 'tkl', text: 'Tokelau', value: false},
               {id: 'tog', text: 'Tonga', value: false},
               {id: 'ton', text: 'Tonga (polynesien)', value: false},
               {id: 'tyv', text: 'Touva', value: false},
               {id: 'rom', text: 'tsigane', value: false},
               {id: 'tsi', text: 'Tsimshian', value: false},
               {id: 'tso', text: 'Tsonga', value: false},
               {id: 'tsn', text: 'Tswana', value: false},
               {id: 'tum', text: 'Tumbuka', value: false},
               {id: 'tup', text: 'Tupi (langues)', value: false},
               {id: 'tur', text: 'Turc', value: false},
               {id: 'ota', text: 'Turc ottoman (ecriture arabe)', value: false},
               {id: 'tuk', text: 'Turkmene', value: false},
               {id: 'tvl', text: 'Tuvalu', value: false},
               {id: 'twi', text: 'Twi', value: false},
               {id: 'ukr', text: 'Ukrainien', value: false},
               {id: 'umb', text: 'Umbuntu', value: false},
               {id: 'vai', text: 'Vai', value: false},
               {id: 'ven', text: 'Venda', value: false},
               {id: 'vie', text: 'Vietnamien', value: false},
               {id: 'vol', text: 'Volapuk', value: false},
               {id: 'vot', text: 'Vote', value: false},
               {id: 'wak', text: 'Wakash (groupe)', value: false},
               {id: 'wal', text: 'Walamo', value: false},
               {id: 'wln', text: 'Wallon', value: false},
               {id: 'war', text: 'Waray', value: false},
               {id: 'was', text: 'Washo', value: false},
               {id: 'wol', text: 'Wolof', value: false},
               {id: 'xho', text: "X'hosa", value: false},
               {id: 'sah', text: 'Yakut', value: false},
               {id: 'yao', text: 'Yao', value: false},
               {id: 'yap', text: 'Yap', value: false},
               {id: 'iii', text: 'yi de Sichuan', value: false},
               {id: 'yid', text: 'Yiddish', value: false},
               {id: 'yor', text: 'Yoruba', value: false},
               {id: 'ypk', text: 'Yupik langages', value: false},
               {id: 'znd', text: 'Zande', value: false},
               {id: 'zap', text: 'Zapoteque', value: false},
               {id: 'zen', text: 'Zenaga', value: false},
               {id: 'zha', text: 'Zhuang', value: false},
               {id: 'zul', text: 'Zoulou', value: false},
               {id: 'zun', text: 'Zuni', value: false},
            ];
         }
      },
      resetLangue(state) {
         Logger.debug('Reset des Langues');
         state.blocLangue._selected = [];
         state.blocLangue._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de recherche Pays
      mutationExternalPaysOperator(state, operator: number) {
         Logger.debug('Mutation Operateur externe des Pays');
         state.blocPays._externalBlocOperator = operator;
      },
      resetExternalPaysOperator(state) {
         Logger.debug('Reset Operateur externe des Pays');
         state.blocPays._externalBlocOperator = Ensemble.Ou;
      },
      mutationInternalPaysOperator(state, operator: number) {
         Logger.debug('Mutation Operateur interne des Pays');
         state.blocPays._internalBlocOperator = operator;
      },
      resetInternalPaysOperator(state) {
         Logger.debug('Reset Operateur interne des Pays');
         state.blocPays._internalBlocOperator = Ensemble.Et;
      },
      mutationPays(state, arraySent: Array<ListProvider>) {
         Logger.debug('Mutation des Pays');
         state.blocPays._candidates = arraySent;
         state.blocPays._selected = [];
         arraySent.forEach((element: {value: boolean; id: string}) => (element.value ? state.blocPays._selected.push(element.id) : ''));
      },
      loadCandidatesPays(state, force?: boolean) {
         if (force || state.blocPays._candidates.length == 0) {
            Logger.debug('Chargement des Pays');
            state.blocPays._candidates = [
               {id: 'AF', text: 'Afghanistan', value: false},
               {id: 'ZA', text: 'Afrique du Sud', value: false},
               {id: 'AX', text: 'Aland Iles', value: false},
               {id: 'AL', text: 'Albanie', value: false},
               {id: 'DZ', text: 'Algérie', value: false},
               {id: 'DE', text: 'Allemagne', value: false},
               {id: 'DD', text: "Allemagne de l'Est", value: false},
               {id: 'AD', text: 'Andorre', value: false},
               {id: 'AO', text: 'Angola', value: false},
               {id: 'AI', text: 'Anguilla', value: false},
               {id: 'AQ', text: 'Antarctique', value: false},
               {id: 'AG', text: 'Antigua et Barbuda', value: false},
               {id: 'AN', text: 'Antilles néerlandaises', value: false},
               {id: 'SA', text: 'Arabie Saoudite', value: false},
               {id: 'AR', text: 'Argentine', value: false},
               {id: 'AM', text: 'Arménie', value: false},
               {id: 'AW', text: 'Aruba', value: false},
               {id: 'AU', text: 'Australie', value: false},
               {id: 'AT', text: 'Autriche', value: false},
               {id: 'AZ', text: 'Azerbaïdjan', value: false},
               {id: 'BS', text: 'Bahamas', value: false},
               {id: 'BH', text: 'Bahrein', value: false},
               {id: 'BD', text: 'Bangladesh', value: false},
               {id: 'BB', text: 'Barbade', value: false},
               {id: 'BY', text: 'Bélarus', value: false},
               {id: 'BE', text: 'Belgique', value: false},
               {id: 'BZ', text: 'Bélize', value: false},
               {id: 'BJ', text: 'Bénin', value: false},
               {id: 'BM', text: 'Bermudes', value: false},
               {id: 'BT', text: 'Bhoutan', value: false},
               {id: 'BO', text: 'Bolivie', value: false},
               {id: 'BA', text: 'Bosnie-Herzégovine', value: false},
               {id: 'BW', text: 'Botswana', value: false},
               {id: 'BV', text: 'Bouvet (Ile)', value: false},
               {id: 'BR', text: 'Brésil', value: false},
               {id: 'BN', text: 'Brunei Darussalam', value: false},
               {id: 'BG', text: 'Bulgarie', value: false},
               {id: 'BF', text: 'Burkina Faso', value: false},
               {id: 'BI', text: 'Burundi', value: false},
               {id: 'KY', text: 'Caïmanes (Iles)', value: false},
               {id: 'KH', text: 'Cambodge', value: false},
               {id: 'CM', text: 'Cameroun', value: false},
               {id: 'CA', text: 'Canada', value: false},
               {id: 'CT', text: 'Canton et Enderbury (Iles)', value: false},
               {id: 'CV', text: 'Cap-Vert', value: false},
               {id: 'CF', text: 'Centrafricaine (République)', value: false},
               {id: 'CL', text: 'Chili', value: false},
               {id: 'CN', text: 'Chine', value: false},
               {id: 'CX', text: 'Christmas (Ile)', value: false},
               {id: 'CY', text: 'Chypre', value: false},
               {id: 'CC', text: 'Cocos (Keeling)(Iles)', value: false},
               {id: 'CO', text: 'Colombie', value: false},
               {id: 'KM', text: 'Comores', value: false},
               {id: 'CG', text: 'Congo', value: false},
               {id: 'CD', text: 'la République démocratique du Congo', value: false},
               {id: 'CK', text: 'Cook (Iles)', value: false},
               {id: 'KR', text: 'République de Corée', value: false},
               {id: 'KP', text: 'République populaire démocratique de Corée', value: false},
               {id: 'CR', text: 'Costa Rica', value: false},
               {id: 'CI', text: "Côte d'Ivoire", value: false},
               {id: 'HR', text: 'Croatie', value: false},
               {id: 'CU', text: 'Cuba', value: false},
               {id: 'DK', text: 'Danemark', value: false},
               {id: 'DJ', text: 'Djibouti', value: false},
               {id: 'DO', text: 'République Dominicaine', value: false},
               {id: 'DM', text: 'Dominique', value: false},
               {id: 'EG', text: 'Egypte', value: false},
               {id: 'SV', text: 'El Salvador', value: false},
               {id: 'AE', text: 'Emirats arabes unis', value: false},
               {id: 'EC', text: 'Equateur', value: false},
               {id: 'ER', text: 'Erythrée', value: false},
               {id: 'ES', text: 'Espagne', value: false},
               {id: 'EE', text: 'Estonie', value: false},
               {id: 'US', text: 'Etats-Unis', value: false},
               {id: 'ET', text: 'Ethiopie', value: false},
               {id: 'FK', text: 'Falkland (Iles) (Malvinas)', value: false},
               {id: 'FO', text: 'Feroe (Iles)', value: false},
               {id: 'FJ', text: 'Fidji', value: false},
               {id: 'FI', text: 'Finlande', value: false},
               {id: 'FR', text: 'France', value: false},
               {id: 'GA', text: 'Gabon', value: false},
               {id: 'GM', text: 'Gambie', value: false},
               {id: 'GE', text: 'Géorgie', value: false},
               {id: 'GS', text: 'Géorgie du sud et les Iles Sandwich du Sud', value: false},
               {id: 'GH', text: 'Ghana', value: false},
               {id: 'GI', text: 'Gibraltar', value: false},
               {id: 'GR', text: 'Grèce', value: false},
               {id: 'GD', text: 'Grenade', value: false},
               {id: 'GL', text: 'Groenland', value: false},
               {id: 'GP', text: 'Guadeloupe', value: false},
               {id: 'GU', text: 'Guam', value: false},
               {id: 'GT', text: 'Guatemala', value: false},
               {id: 'GG', text: 'Guernesey', value: false},
               {id: 'GN', text: 'Guinée', value: false},
               {id: 'GW', text: 'Guinée-Bissau', value: false},
               {id: 'GQ', text: 'Guinée équatoriale', value: false},
               {id: 'GY', text: 'Guyana', value: false},
               {id: 'GF', text: 'Guyane française', value: false},
               {id: 'HT', text: 'Haïti', value: false},
               {id: 'HM', text: 'Heard (Ile) et McDonald (Iles)', value: false},
               {id: 'HN', text: 'Honduras', value: false},
               {id: 'HK', text: 'Hong-Kong', value: false},
               {id: 'HU', text: 'Hongrie', value: false},
               {id: 'IM', text: 'Ile de Man', value: false},
               {id: 'UM', text: 'Iles mineures éloignées des Etats-Unis', value: false},
               {id: 'VG', text: 'Iles vierges britanniques', value: false},
               {id: 'VI', text: 'Iles vierges des Etats-Unis', value: false},
               {id: 'XX', text: 'pays inconnu', value: false},
               {id: 'IN', text: 'Inde', value: false},
               {id: 'ID', text: 'Indonésie', value: false},
               {id: 'IR', text: "République islamique d'Iran", value: false},
               {id: 'IQ', text: 'Iraq', value: false},
               {id: 'IE', text: 'Irlande', value: false},
               {id: 'IS', text: 'Islande', value: false},
               {id: 'IL', text: 'Israël', value: false},
               {id: 'IT', text: 'Italie', value: false},
               {id: 'JM', text: 'Jamaïque', value: false},
               {id: 'JP', text: 'Japon', value: false},
               {id: 'JE', text: 'Jersey', value: false},
               {id: 'JO', text: 'Jordanie', value: false},
               {id: 'KZ', text: 'Kazakhstan', value: false},
               {id: 'KE', text: 'Kenya', value: false},
               {id: 'KG', text: 'Kirghizistan', value: false},
               {id: 'KI', text: 'Kiribati', value: false},
               {id: 'KW', text: 'Koweït', value: false},
               {id: 'LA', text: 'République démocratique populaire du Laos', value: false},
               {id: 'LS', text: 'Lesotho', value: false},
               {id: 'LV', text: 'Lettonie', value: false},
               {id: 'LB', text: 'Liban', value: false},
               {id: 'LR', text: 'Libéria', value: false},
               {id: 'LY', text: 'Libyenne ou Jamahiriya arabe', value: false},
               {id: 'LI', text: 'Liechtenstein', value: false},
               {id: 'LT', text: 'Lituanie', value: false},
               {id: 'LU', text: 'Luxembourg', value: false},
               {id: 'MO', text: 'Macao', value: false},
               {id: 'MK', text: "l'ex-République yougoslave de Macédoine", value: false},
               {id: 'MG', text: 'Madagascar', value: false},
               {id: 'MY', text: 'Malaisie', value: false},
               {id: 'MW', text: 'Malawi', value: false},
               {id: 'MV', text: 'Maldives', value: false},
               {id: 'ML', text: 'Mali', value: false},
               {id: 'MT', text: 'Malte', value: false},
               {id: 'MP', text: 'Mariannes du nord (Iles)', value: false},
               {id: 'MA', text: 'Maroc', value: false},
               {id: 'MH', text: 'Marshall (Iles)', value: false},
               {id: 'MQ', text: 'Martinique', value: false},
               {id: 'MU', text: 'Maurice', value: false},
               {id: 'MR', text: 'Mauritanie', value: false},
               {id: 'YT', text: 'Mayotte', value: false},
               {id: 'MX', text: 'Mexique', value: false},
               {id: 'FM', text: 'Etats fédérés de Micronésie', value: false},
               {id: 'MD', text: 'République de Moldova', value: false},
               {id: 'MC', text: 'Monaco', value: false},
               {id: 'MN', text: 'Mongolie', value: false},
               {id: 'ME', text: 'Monténégro', value: false},
               {id: 'MS', text: 'Montserrat', value: false},
               {id: 'MZ', text: 'Mozambique', value: false},
               {id: 'ZZ', text: 'pays multiples', value: false},
               {id: 'MM', text: 'Myanmar', value: false},
               {id: 'NA', text: 'Namibie', value: false},
               {id: 'NR', text: 'Nauru', value: false},
               {id: 'NP', text: 'Népal', value: false},
               {id: 'NI', text: 'Nicaragua', value: false},
               {id: 'NE', text: 'Niger', value: false},
               {id: 'NG', text: 'Nigéria', value: false},
               {id: 'NU', text: 'Niué', value: false},
               {id: 'NF', text: 'Norfolk (Ile)', value: false},
               {id: 'NO', text: 'Norvège', value: false},
               {id: 'NC', text: 'Nouvelle-Calédonie', value: false},
               {id: 'NZ', text: 'Nouvelle-Zélande', value: false},
               {id: 'IO', text: "Territoire britannique de l'Océan indien", value: false},
               {id: 'OM', text: 'Oman', value: false},
               {id: 'UG', text: 'Ouganda', value: false},
               {id: 'UZ', text: 'Ouzbékistan', value: false},
               {id: 'PK', text: 'Pakistan', value: false},
               {id: 'PW', text: 'Palaos', value: false},
               {id: 'PS', text: 'Territoire Palestinien occupé', value: false},
               {id: 'PA', text: 'Panama', value: false},
               {id: 'PG', text: 'Papouasie-Nouvelle-Guinée', value: false},
               {id: 'PY', text: 'Paraguay', value: false},
               {id: 'NL', text: 'Pays-Bas', value: false},
               {id: 'PE', text: 'Pérou', value: false},
               {id: 'PH', text: 'Philippines', value: false},
               {id: 'PN', text: 'Pitcairn', value: false},
               {id: 'PL', text: 'Pologne', value: false},
               {id: 'PF', text: 'Polynésie française', value: false},
               {id: 'PR', text: 'Porto Rico', value: false},
               {id: 'PT', text: 'Portugal', value: false},
               {id: 'QA', text: 'Qatar', value: false},
               {id: 'RE', text: 'Réunion', value: false},
               {id: 'RO', text: 'Roumanie', value: false},
               {id: 'GB', text: 'Royaume-Uni', value: false},
               {id: 'RU', text: 'Fédération de Russie', value: false},
               {id: 'RW', text: 'Rwanda', value: false},
               {id: 'EH', text: 'Sahara occidental', value: false},
               {id: 'SH', text: 'Sainte-Hélène', value: false},
               {id: 'LC', text: 'Sainte-Lucie', value: false},
               {id: 'KN', text: 'Saint-Kitts-et-Nevis', value: false},
               {id: 'SM', text: 'Saint-Marin', value: false},
               {id: 'PM', text: 'Saint-Pierre-et-Miquelon', value: false},
               {id: 'VA', text: 'Saint-Siège, Etat de la Cité du Vatican', value: false},
               {id: 'VC', text: 'Saint-Vincent-et-les-Grenadines', value: false},
               {id: 'SB', text: 'Salomon (Iles)', value: false},
               {id: 'WS', text: 'Samoa', value: false},
               {id: 'AS', text: 'Samoa américaines', value: false},
               {id: 'ST', text: 'Sao Tomé-et-Principe', value: false},
               {id: 'SN', text: 'Sénégal', value: false},
               {id: 'RS', text: 'Serbie', value: false},
               {id: 'SC', text: 'Seychelles', value: false},
               {id: 'SL', text: 'Sierra Leone', value: false},
               {id: 'SG', text: 'Singapour', value: false},
               {id: 'SK', text: 'Slovaquie', value: false},
               {id: 'SI', text: 'Slovénie', value: false},
               {id: 'SO', text: 'Somalie', value: false},
               {id: 'SD', text: 'Soudan', value: false},
               {id: 'LK', text: 'Sri Lanka', value: false},
               {id: 'SE', text: 'Suède', value: false},
               {id: 'CH', text: 'Suisse', value: false},
               {id: 'SR', text: 'Suriname', value: false},
               {id: 'SJ', text: 'Svalbard et Ile Jan Mayen', value: false},
               {id: 'SZ', text: 'Swaziland', value: false},
               {id: 'SY', text: 'République arabe Syrienne', value: false},
               {id: 'TJ', text: 'Tadjikistan', value: false},
               {id: 'TW', text: 'Taïwan, Province de Chine', value: false},
               {id: 'TZ', text: 'République unie de Tanzanie', value: false},
               {id: 'TD', text: 'Tchad', value: false},
               {id: 'CS', text: 'Tchècoslovaquie', value: false},
               {id: 'CZ', text: 'République Tchèque', value: false},
               {id: 'TF', text: 'Terres australes et antarctiques françaises', value: false},
               {id: 'TH', text: 'Thaïlande', value: false},
               {id: 'TL', text: 'Timor-Leste', value: false},
               {id: 'TG', text: 'Togo', value: false},
               {id: 'TK', text: 'Tokelau', value: false},
               {id: 'TO', text: 'Tonga', value: false},
               {id: 'TT', text: 'Trinité-et-Tobago', value: false},
               {id: 'TN', text: 'Tunisie', value: false},
               {id: 'TM', text: 'Turkménistan', value: false},
               {id: 'TC', text: 'Turks et Caïques (Iles)', value: false},
               {id: 'TR', text: 'Turquie', value: false},
               {id: 'TV', text: 'Tuvalu', value: false},
               {id: 'SU', text: 'U.S.S.R.', value: false},
               {id: 'UA', text: 'Ukraine', value: false},
               {id: 'UY', text: 'Uruguay', value: false},
               {id: 'VU', text: 'Vanuatu', value: false},
               {id: 'VE', text: 'Venezuela', value: false},
               {id: 'VN', text: 'Viet-nam', value: false},
               {id: 'VD', text: 'Viet-nam (Sud)', value: false},
               {id: 'WF', text: 'Wallis et Futuna', value: false},
               {id: 'YE', text: 'Yémen', value: false},
               {id: 'YD', text: 'Yémen (Nord)', value: false},
               {id: 'YU', text: 'Yougoslavie', value: false},
               {id: 'ZR', text: 'Zaïre', value: false},
               {id: 'ZM', text: 'Zambie', value: false},
               {id: 'ZW', text: 'Zimbabwe', value: false},
            ];
         }
      },
      resetPays(state) {
         Logger.debug('Reset des Pays');
         state.blocPays._selected = [];
         state.blocPays._candidates.forEach((element: {value: boolean}) => (element.value = false));
      },

      //Bloc de requete directe
      mutationRequeteDirecte(state, element: JsonGlobalSearchRequest) {
         Logger.debug('Mutation des requetes directes');
         state.blocRequeteDirecte._directRequest = element;
      },
      addRequeteDirecteToHistory(state, element: JsonGlobalSearchRequest) {
         Logger.debug("Ajout requete dans l'historique");
         state.blocRequeteDirecte._historyOfAllRequests.push(element);
      },
      resetRequeteDirecte(state) {
         Logger.debug('Reset des requetes directes');
         state.blocRequeteDirecte._directRequest = {criteres: [], tri: []};
      },
      resetRequeteHistory(state) {
         Logger.debug("Reset de l'historique");
         state.blocRequeteDirecte._historyOfAllRequests = [];
      },

      mutationSearchRequest(state) {
         Logger.debug('Construction de la requête JSON');
         state.jsonTraitements._jsonSearchRequest = SearchRequest.constructJsonGlobalRequest(
            state.composants._panel,
            state.blocPcpRegions,
            state.blocPcpMetiers,
            state.blocRcr,
            state.blocPpn,
            state.blocIssn,
            state.blocMotsDuTitre,
            state.blocEditeur,
            state.blocLangue,
            state.blocPays,
            state.blocRequeteDirecte,
            state.blocTri
         );
      },

      //Tri multiples sur le tableau de résultats
      mutationTri(state, value: Array<TriInterface>) {
         Logger.debug('Mutation des tris');
         state.blocTri._array = value;
      },
      resetTri(state) {
         Logger.debug('Reset des tris');
         state.blocTri._array = [];
      },

      //Actions liées aux composants
      mutationStep(state, stepSent: number) {
         state.composants._stepperCurrentValue = stepSent;
      },
      mutationSnackBarDisplay(state, value: boolean) {
         state.composants._snackBarDisplay = value;
      },
      mutationPanelMovement(state, action: PanelMovementProvider) {
         Logger.debug('Mutation Panel Movement : ' + PanelType[action.panelId] + ' ' + Movement[action.value]);
         Composants.panelMovement(action.panelId, state.composants._panel, action.value);
      },
      mutationPanelDisplaySwitch(state, action: PanelDisplaySwitchProvider) {
         Logger.debug('Mutation Panel Display switch : ' + PanelType[action.panelId] + ' ' + DisplaySwitch[action.value]);
         Composants.switchPanelDisplay(action.panelId, state.composants._panel, action.value);
      },
      resetSearchPanel(state) {
         Logger.debug('Reset des panneaux de recherche');
         state.composants._panel = [
            {id: PanelType.PPN, position: 3, displayed: false, available: true, label: 'PPN'},
            {id: PanelType.ISSN, position: 4, displayed: false, available: true, label: 'ISSN'},
            {id: PanelType.RCR, position: 5, displayed: false, available: true, label: 'RCR'},
            {id: PanelType.REGIONS, position: 2, displayed: false, available: true, label: 'PCP Régions'},
            {id: PanelType.METIERS, position: 1, displayed: false, available: true, label: 'PCP Métiers'},
            {id: PanelType.WORDS, position: 6, displayed: false, available: true, label: 'Mots du Titre'},
            {id: PanelType.EDITOR, position: 7, displayed: false, available: true, label: 'Editeur'},
            {id: PanelType.LANG, position: 8, displayed: false, available: true, label: 'Langue'},
            {id: PanelType.COUNTRY, position: 9, displayed: false, available: true, label: 'Pays'},
            {id: PanelType.HISTORY, position: 0, displayed: false, available: true, label: 'Requête enregistrée'},
         ].sort((n1, n2) => {
            if (n1.position > n2.position) {
               return 1;
            }

            if (n1.position < n2.position) {
               return -1;
            }

            return 0;
         });
      },

      //Modification de la pagination
      mutationPageSize(state, element: number) {
         Logger.debug('Mutation de la taille des pages');
         state.pagination._sizeWanted = element;
      },
      mutationCurrentPage(state, page: number) {
         Logger.debug('Mutation de la pagination');
         if (page <= -1) {
            state.pagination._currentPage = 0;
            state.pagination._previousPage = -1;
            state.pagination._nextPage = 1;
         } else {
            state.pagination._currentPage = page;
            state.pagination._previousPage = state.pagination._currentPage - 1;
            state.pagination._nextPage = state.pagination._currentPage + 1;
         }
      },
      resetPage(state) {
         Logger.debug('Reset de la pagination');
         state.pagination._currentPage = 0;
         state.pagination._previousPage = -1;
         state.pagination._nextPage = 1;
      },

      // Notices
      mutationNotices(state, lotNoticesReceived) {
         Logger.debug('Mutation des Notices');
         //Contient les notices brutes
         lotNoticesReceived.forEach((obj: any) => state.lotNotices._notices.push(new Notice(obj)));
      },
      resetNotices(state) {
         Logger.debug('Reset des Notices');
         state.lotNotices._notices = [];
      },
   },
   actions: {
      //******************
      //       Reset
      //*******************
      resetBlocPcpRegions(context) {
         context.commit('resetExternalPcpRegionsOperator');
         context.commit('resetInternalPcpRegionsOperator');
         context.commit('resetPcpRegions');
      },
      resetBlocPcpMetiers(context) {
         context.commit('resetExternalPcpMetiersOperator');
         context.commit('resetInternalPcpMetiersOperator');
         context.commit('resetPcpMetiers');
      },
      resetBlocRcr(context) {
         context.commit('resetExternalRcrOperator');
         context.commit('resetInternalRcrOperator');
         context.commit('resetRcr');
      },
      resetBlocPpn(context) {
         context.commit('resetExternalPpnOperator');
         context.commit('resetInternalPpnOperator');
         context.commit('resetPpn');
      },
      resetBlocIssn(context) {
         context.commit('resetExternalIssnOperator');
         context.commit('resetInternalIssnOperator');
         context.commit('resetIssn');
      },
      resetBlocMotDuTitre(context) {
         context.commit('resetExternalMotsDuTitreOperator');
         context.commit('resetInternalMotsDuTitreOperator');
         context.commit('resetMotsDuTitre');
      },
      resetBlocEditeur(context) {
         context.commit('resetExternalEditeurOperator');
         context.commit('resetInternalEditeurOperator');
         context.commit('resetEditeur');
      },
      resetBlocLangue(context) {
         context.commit('resetExternalLangueOperator');
         context.commit('resetInternalLangueOperator');
         context.commit('resetLangue');
      },
      resetBlocPays(context) {
         context.commit('resetExternalPaysOperator');
         context.commit('resetInternalPaysOperator');
         context.commit('resetPays');
      },
      resetBlocRequeteDirecte(context) {
         context.commit('resetRequeteDirecte');
      },
      resetAllBlocs() {
         this.dispatch('resetBlocPcpRegions').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPcpMetiers').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocRcr').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPpn').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocIssn').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocMotDuTitre').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocEditeur').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocLangue').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocPays').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetBlocRequeteDirecte').catch((err) => {
            Logger.error(err);
         });
      },
      resetPage(context) {
         context.commit('resetPage');
      },
      resetNotices(context) {
         context.commit('resetNotices');
      },
      resetSearchPanel(context) {
         context.commit('resetSearchPanel');
      },
      resetTri(context) {
         context.commit('resetTri');
      },
      resetRequeteHistory(context) {
         context.commit('resetRequeteHistory');
      },

      //******************
      //       Update
      //*******************
      updateSelectedExternalPcpRegionsOperator(context, operator: number) {
         context.commit('mutationExternalPcpRegionsOperator', operator);
      },
      updateSelectedInternalPcpRegionsOperator(context, operator: number) {
         context.commit('mutationInternalPcpRegionsOperator', operator);
      },
      updateCandidatesPcpRegions(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('mutationPcpRegions', arraySent);
      },
      updateSelectedPcpRegions(context, arraySent: Array<string>) {
         context.commit('mutationPcpRegions', arraySent);
      },
      updateSelectedExternalPcpMetiersOperator(context, operator: number) {
         context.commit('mutationExternalPcpMetiersOperator', operator);
      },
      updateSelectedInternalPcpMetiersOperator(context, operator: number) {
         context.commit('mutationInternalPcpMetiersOperator', operator);
      },
      updateCandidatesPcpMetiers(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('mutationPcpMetiers', arraySent);
      },
      updateSelectedPcpMetiers(context, arraySent: Array<CheckboxesProvider>) {
         context.commit('mutationPcpMetiers', arraySent);
      },
      updateSelectedExternalRcrOperator(context, operator: number) {
         context.commit('mutationExternalRcrOperator', operator);
      },
      updateSelectedInternalRcrOperator(context, operator: number) {
         context.commit('mutationInternalRcrOperator', operator);
      },
      updateSelectedRcr(context, arraySent: Array<string>) {
         context.commit('mutationRcr', arraySent);
      },
      updateSelectedExternalPpnOperator(context, operator: number) {
         context.commit('mutationExternalPpnOperator', operator);
      },
      updateSelectedInternalPpnOperator(context, operator: number) {
         context.commit('mutationInternalPpnOperator', operator);
      },
      updateSelectedPpn(context, arraySent: Array<string>) {
         context.commit('mutationPpn', arraySent);
      },
      updateSelectedExternalIssnOperator(context, operator: number) {
         context.commit('mutationExternalIssnOperator', operator);
      },
      updateSelectedInternalIssnOperator(context, operator: number) {
         context.commit('mutationInternalIssnOperator', operator);
      },
      updateSelectedIssn(context, arraySent: Array<string>) {
         context.commit('mutationIssn', arraySent);
      },
      updateSelectedMotsDuTitre(context, stringEntered: string) {
         context.commit('mutationMotsDuTitre', stringEntered);
      },
      updateSelectedExternalMotsDuTitreOperator(context, externalOperator: number) {
         context.commit('mutationExternalMotsDuTitreOperator', externalOperator);
      },
      updateSelectedInternalMotsDuTitreOperator(context, internalOperator: number) {
         context.commit('mutationInternalMotsDuTitreOperator', internalOperator);
      },
      updateSelectedExternalEditeurOperator(context, externalOperator: number) {
         context.commit('mutationExternalEditeurOperator', externalOperator);
      },
      updateSelectedInternalEditeurOperator(context, internalOperator: number) {
         context.commit('mutationInternalEditeurOperator', internalOperator);
      },
      updateSelectedEditeur(context, arraySent: Array<string>) {
         context.commit('mutationEditeur', arraySent);
      },
      updateSelectedExternalLangueOperator(context, externalOperator: number) {
         context.commit('mutationExternalLangueOperator', externalOperator);
      },
      updateSelectedInternalLangueOperator(context, internalOperator: number) {
         context.commit('mutationInternalLangueOperator', internalOperator);
      },
      updateSelectedLangue(context, arraySent: Array<ListProvider>) {
         context.commit('mutationLangue', arraySent);
      },
      updateSelectedExternalPaysOperator(context, externalOperator: number) {
         context.commit('mutationExternalPaysOperator', externalOperator);
      },
      updateSelectedInternalPaysOperator(context, internalOperator: number) {
         context.commit('mutationInternalPaysOperator', internalOperator);
      },
      updateSelectedPays(context, arraySent: Array<ListProvider>) {
         context.commit('mutationPays', arraySent);
      },
      updateSelectedRequeteDirecte(context, element: JsonGlobalSearchRequest) {
         context.commit('mutationRequeteDirecte', element);

         //Conversion des critères de tri dans le bloc de tri
         const arrayTriStore: Array<TriInterface> = [];
         for (let i = 0; i < element.tri.length; i++) {
            const tri: TriInterface = {
               sort: SearchRequest.labelConverterFromBackToFront(element.tri[i].sort),
               order: !element.tri[i].order ? OrderType.ASC : OrderType.DESC,
            };
            arrayTriStore.push(tri);
         }
         context.commit('mutationTri', arrayTriStore);
      },
      addRequeteHistory(context, element: JsonGlobalSearchRequest) {
         context.commit('addRequeteDirecteToHistory', element);
      },
      updateSelectedTri(context, value: Array<string>) {
         context.commit('mutationTri', value);
      },

      //*******************
      //       Composants
      //*******************
      changeStepAction(context, stepSent: number) {
         context.commit('mutationStep', stepSent);
      },
      closeSnackBarAction(context, value: boolean) {
         context.commit('mutationSnackBarDisplay', value);
      },
      displayElementPanelAction(context, value: PanelDisplaySwitchProvider) {
         context.commit('displayElementPanelMutation', value);
      },
      moveElementPanel(context, value: PanelMovementProvider) {
         context.commit('mutationPanelMovement', value);
      },
      switchElementPanel(context, value: PanelDisplaySwitchProvider) {
         context.commit('mutationPanelDisplaySwitch', value);
      },

      //*******************
      //       Page
      //*******************
      updatePageSize(context, nbElements: number) {
         context.commit('mutationPageSize', nbElements);
      },
      nextPage(context) {
         context.commit('mutationCurrentPage', context.state.pagination._nextPage);
      },
      previousPage(context) {
         context.commit('mutationCurrentPage', context.state.pagination._previousPage);
      },

      //******************
      //       API
      //*******************
      loadCandidatesValue(context, force?: boolean) {
         context.commit('loadCandidatesPcpMetiers', force);
         context.commit('loadCandidatesPcpRegions', force);
         context.commit('loadCandidatesLangue', force);
         context.commit('loadCandidatesPays', force);
      },
      constructJsonAction(context) {
         return new Promise((resolve, reject) => {
            try {
               context.commit('mutationSearchRequest');
               resolve(true);
            } catch (err: any) {
               reject(err.message);
            }
         });
      },
      callPeriscopeAPI(context) {
         Logger.debug('PAGE:' + context.state.pagination._currentPage + '|SIZE:' + context.state.pagination._sizeWanted + '|REQUEST:' + JSON.stringify(context.state.jsonTraitements._jsonSearchRequest));
         //On place dans l'historique la requête qui va être envoyée au back-end
         this.dispatch('addRequeteHistory', context.state.jsonTraitements._jsonSearchRequest).catch((err) => {
            Logger.error(err);
         });
         //On envoie la requête au back-end
         return PeriscopeApi.findNoticeByCriteriaByPageAndSize(context.state.jsonTraitements._jsonSearchRequest, context.state.pagination._currentPage, context.state.pagination._sizeWanted)
            .then((res) => {
               context.commit('resetNotices');
               context.commit('mutationNotices', res);
            })
            .catch((err) => {
               //Si une erreur avec le ws est jetée, on affiche un message d'erreur
               Logger.error(err.message + ' : ' + err.debugMessage, err.constructor.name);
               context.state.composants._snackBarText = err.message + ' : ' + err.debugMessage;
               context.state.composants._snackBarDisplay = true;
               window.alert(err.message + ' : ' + err.debugMessage);
            });
      },
      doSearch() {
         this.dispatch('constructJsonAction')
            .then(() => {
               this.dispatch('resetPage').catch((err) => {
                  Logger.error(err);
                  return false;
               });
               this.dispatch('callPeriscopeAPI')
                  .then(() => {
                     router.push('/Resultat').catch((err) => {
                        throw new Error(err);
                     });
                  })
                  .catch((err) => {
                     Logger.error(err);
                     return false;
                  });
            })
            .catch((err) => {
               Logger.error(err);
               return false;
            });
         return true;
      },
      resetSearchForm() {
         this.dispatch('resetAllBlocs').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetSearchPanel').catch((err) => {
            Logger.error(err);
         });
         this.dispatch('resetTri').catch((err) => {
            Logger.error(err);
         });
      },

      //******************
      //       Debug
      //*******************
      displayStore() {
         Logger.debug(JSON.stringify(this.state));
      },
   },
   getters: {
      isSelectionEmpty: (state) => {
         if (
            state.blocPays._selected.length == 0 &&
            state.blocLangue._selected.length == 0 &&
            state.blocPcpRegions._selected.length == 0 &&
            state.blocEditeur._selected.length == 0 &&
            state.blocPcpMetiers._selected.length == 0 &&
            state.blocIssn._selected.length == 0 &&
            state.blocRcr._selected.length == 0 &&
            state.blocMotsDuTitre._selected.length == 0 &&
            state.blocPpn._selected.length == 0 &&
            state.blocRequeteDirecte._directRequest.criteres.length == 0
         ) {
            return true;
         } else {
            return false;
         }
      },
      getCurrentPage: (state) => () => {
         return state.pagination._currentPage;
      },
      isFirstDisplayedElement: (state) => (id: PanelType) => {
         return Composants.isFirstDisplayedElement(id, state.composants._panel);
      },
      isLastDisplayedElement: (state) => (id: PanelType) => {
         return Composants.isLastDisplayedElement(id, state.composants._panel);
      },
      isMoveUpAvailable: (state) => (id: PanelType) => {
         return Composants.isMoveUpAvailable(id, state.composants._panel);
      },
      isFirstPage: (state) => () => {
         if (state.pagination._currentPage == 0) {
            return true;
         } else {
            return false;
         }
      },
      isLastPage: (state) => () => {
         if (state.pagination._currentPage == state.pagination._maxPage) {
            return true;
         } else {
            return false;
         }
      },
      getArrayRegions: (state) => {
         return state.blocPcpRegions._candidates;
      },
      orderSortArrayResultLabelElements: (state) => {
         return BlocTri.getLabelElements(state.blocTri);
      },
      orderSortArrayResultBooleanElements: (state) => {
         return BlocTri.getBooleanElements(state.blocTri);
      },
      getCurrentPositionNoticesStartedDisplayed: (state) => {
         return (state.pagination._nextPage - 1) * state.pagination._sizeWanted + 1;
      },
      getCurrentPositionNoticesEndedDisplayed: (state) => {
         return state.pagination._nextPage * state.pagination._sizeWanted;
      },
      getCurrentArrayPcpRegionsElementsChecked: (state) => {
         const arrayReturned: Array<string> = [];
         state.blocPcpRegions._candidates.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },
      getCurrentArrayPcpMetiersElementsChecked: (state) => {
         const arrayReturned: Array<string> = [];
         state.blocPcpMetiers._candidates.forEach((element) => {
            if (element.value) {
               arrayReturned.push(element.text);
            }
         });
         return arrayReturned;
      },
   },
   plugins: [createPersistedState()],
});
