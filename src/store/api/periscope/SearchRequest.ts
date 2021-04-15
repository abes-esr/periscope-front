import {JsonCriteres, JsonEditeurProvider, JsonGlobalSearchRequest, JsonIssnBlocProvider, JsonLanguesProvider, JsonMotsDuTitreProvider, JsonPaysProvider, JsonPcpBlocProvider, JsonPpnBlocProvider, JsonRcrBlocProvider, JsonTri, JsonTriProvider} from '@/store/api/periscope/JsonInterfaces';
import {BlocRequeteEnregistree} from '@/store/recherche/BlocRequeteEnregistree';
import {BlocPcpRegions} from '@/store/recherche/criteres/BlocPcpRegions';
import {BlocPcpMetiers} from '@/store/recherche/criteres/BlocPcpMetiers';
import {BlocRcr} from '@/store/recherche/criteres/BlocRcr';
import {BlocPpn} from '@/store/recherche/criteres/BlocPpn';
import {BlocIssn} from '@/store/recherche/criteres/BlocIssn';
import {BlocMotDuTitre} from '@/store/recherche/criteres/BlocMotDuTitre';
import {BlocEditeur} from '@/store/recherche/criteres/BlocEditeur';
import {BlocLangue} from '@/store/recherche/criteres/BlocLangue';
import {BlocPays} from '@/store/recherche/criteres/BlocPays';
import {BlocTri} from '@/store/recherche/criteres/BlocTri';
import {BlocAbstract} from '@/store/recherche/criteres/BlocAbstract';
import {Logger} from "@/store/utils/Logger";

/**
 * Représente une requête de recherche pour l'API Periscope
 */
export class SearchRequest {
   /**
    * Objet Json contenant les critères de recherche, a envoyer dans les requêtes au back
    */
   _jsonSearchRequest: JsonGlobalSearchRequest;
   /**
    * Construit un objet JSON à partir des données des blocs de recherche pour envoi au back-end
    */
   static constructJsonGlobalRequest(
      blocPcpRegions: BlocPcpRegions,
      blocPcpMetiers: BlocPcpMetiers,
      blocRcr: BlocRcr,
      blocPpn: BlocPpn,
      blocIssn: BlocIssn,
      blocMotsDuTitre: BlocMotDuTitre,
      blocEditeur: BlocEditeur,
      blocLangue: BlocLangue,
      blocPays: BlocPays,
      blocRequeteDirecte: BlocRequeteEnregistree,
      blocTri: BlocTri
   ): JsonGlobalSearchRequest {
      //Les blocs ne sont rajoutés que si il contiennent des données
      const criteria: Array<JsonCriteres> = [];
      const sort: Array<JsonTri> = [];

      //Construction de la partie PCP Regions et Metiers en JSON
      if (blocPcpRegions._selected.length !== 0 || blocPcpMetiers._selected.length !== 0) {
         const pcpRegionsAndMetiersList: Array<string> = [];
         blocPcpRegions._selected.forEach((element) => pcpRegionsAndMetiersList.push(element));
         blocPcpMetiers._selected.forEach((element) => pcpRegionsAndMetiersList.push(element));
         const pcpRegionsAndMetiersInternalOperators: Array<string> = [];
         blocPcpRegions._selected.forEach((element) => pcpRegionsAndMetiersInternalOperators.push(BlocAbstract.convertBlocOperatorInString(blocPcpRegions._internalBlocOperator)));
         blocPcpMetiers._selected.forEach((element) => pcpRegionsAndMetiersInternalOperators.push(BlocAbstract.convertBlocOperatorInString(blocPcpMetiers._internalBlocOperator)));

         const pcpBlocJson: JsonPcpBlocProvider = {
            type: 'CriterionPcp',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPcpRegions._externalBlocOperator),
            pcp: pcpRegionsAndMetiersList,
            pcp_operator: pcpRegionsAndMetiersInternalOperators,
         };

         criteria.push(pcpBlocJson);
      }

      //Construction de la partie Rcr en JSON
      if (blocRcr._selected.length !== 0) {
         const rcrBlocJson: JsonRcrBlocProvider = {
            type: 'CriterionRcr',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocRcr._externalBlocOperator),
            rcr: blocRcr._selected,
            rcr_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocRcr._internalBlocOperator, blocRcr._selected.length),
         };
         criteria.push(rcrBlocJson);
      }

      //Construction de la partie PPN en JSON
      if (blocPpn._selected.length !== 0) {
         const ppnBlocJson: JsonPpnBlocProvider = {
            type: 'CriterionPpn',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPpn._externalBlocOperator),
            ppn: blocPpn._selected,
         };
         criteria.push(ppnBlocJson);
      }

      //Construction de la partie ISSN en JSON
      if (blocIssn._selected.length !== 0) {
         const issnBlocJson: JsonIssnBlocProvider = {
            type: 'CriterionIssn',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocIssn._externalBlocOperator),
            issn: blocIssn._selected,
         };
         criteria.push(issnBlocJson);
      }

      //Construction de la partie Mots du titre en JSON
      if (blocMotsDuTitre._selected.length !== 0) {
         const titleWordsBlocJson: JsonMotsDuTitreProvider = {
            type: 'CriterionTitleWords',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocMotsDuTitre._externalBlocOperator),
            title_words: blocMotsDuTitre._selected,
            title_words_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocMotsDuTitre._internalBlocOperator, blocMotsDuTitre._selected.length),
         };
         criteria.push(titleWordsBlocJson);
      }

      //Construction de la partie Editeur en JSON
      if (blocEditeur._selected.length !== 0) {
         const editorBlocJson: JsonEditeurProvider = {
            type: 'CriterionEditor',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocEditeur._externalBlocOperator),
            editors: blocEditeur._selected,
            editors_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocEditeur._internalBlocOperator, blocEditeur._selected.length),
         };
         criteria.push(editorBlocJson);
      }

      //Construction de la partie Pays en JSON
      if (blocPays._selected.length !== 0) {
         const paysBlocJson: JsonPaysProvider = {
            type: 'CriterionCountry',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPays._externalBlocOperator),
            countries: blocPays._selected,
            countries_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocPays._internalBlocOperator, blocPays._selected.length),
         };
         criteria.push(paysBlocJson);
      }

      //Construction de la partie Langue en JSON
      if (blocLangue._selected.length !== 0) {
         const langueBlocJson: JsonLanguesProvider = {
            type: 'CriterionLanguage',
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocLangue._externalBlocOperator),
            language: blocLangue._selected,
            language_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocLangue._internalBlocOperator, blocLangue._selected.length),
         };
         criteria.push(langueBlocJson);
      }

      //Construction d'une requête en cas de saisie directe de requête, effacement de l'ensemble des autres élements
      if (blocRequeteDirecte._directRequest.length !== 0) {
         //On retourne la chaîne directement
         return JSON.parse(blocRequeteDirecte._directRequest);
      }

      //Construction des tris
      for (let i = 0; i < blocTri._array.length; i++) {
         //TODO faire sauter la condition quand la date de fin sera indexable
         if (blocTri._array[i].sort != 'endDate') {
            const triJson: JsonTriProvider = {
               sort: SearchRequest.labelConverterFromFrontToBack(blocTri._array[i].sort),
               order: blocTri._array[i].order,
            };
            sort.push(triJson);
         }
      }

      //Construction du JSON de plus haut niveau
      const jsonToReturn: JsonGlobalSearchRequest = {criteres: criteria, tri: blocTri._array};

      return jsonToReturn;
   }

   static labelConverterFromFrontToBack(label: string): string {
      switch (label) {
         case 'ppn':
            return 'PPN';
         case 'continiousType':
            return 'CONTINIOUS_TYPE';
         case 'issn':
            return 'ISSN';
         case 'keyTitle':
            return 'KEY_TITLE';
         case 'editor':
            return 'EDITOR';
         case 'startDate':
            return 'PROCESSING_GLOBAL_DATA';
         case 'endDate':
            return 'currently unavailable';
         case 'pcpList':
            return 'PCP_LIST';
         case 'rcrLength':
            return 'NB_LOC';
         default:
            return 'UNDEFINED';
      }
   }

   static labelConverterFromBackToFront(label: string): string {
      switch (label) {
         case 'PPN':
            return 'ppn';
         case 'CONTINIOUS_TYPE':
            return 'continiousType';
         case 'ISSN':
            return 'issn';
         case 'KEY_TITLE':
            return 'keyTitle';
         case 'EDITOR':
            return 'editor';
         case 'PROCESSING_GLOBAL_DATA':
            return 'startDate';
         case 'currently unavailable':
            return 'endDate';
         case 'PCP_LIST':
            return 'pcpList';
         case 'NB_LOC':
            return 'rcrLength';
         default:
            return 'UNDEFINED';
      }
   }
}
