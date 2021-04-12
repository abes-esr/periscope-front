import {BlocPcpMetiers} from '@/store/api/periscope/criteres/BlocPcpMetiers';
import {BlocPcpRegions} from '@/store/api/periscope/criteres/BlocPcpRegions';
import {BlocRcr} from '@/store/api/periscope/criteres/BlocRcr';
import {BlocPpn} from '@/store/api/periscope/criteres/BlocPpn';
import {BlocIssn} from '@/store/api/periscope/criteres/BlocIssn';
import {BlocMotDuTitre} from '@/store/api/periscope/criteres/BlocMotDuTitre';
import {BlocEditeur} from '@/store/api/periscope/criteres/BlocEditeur';
import {BlocLangue} from '@/store/api/periscope/criteres/BlocLangue';
import {BlocPays} from '@/store/api/periscope/criteres/BlocPays';
import {JsonEditeurProvider, JsonGlobalSearchRequest, JsonIssnBlocProvider, JsonLanguesProvider, JsonMotsDuTitreProvider, JsonPaysProvider, JsonPcpBlocProvider, JsonPpnBlocProvider, JsonRcrBlocProvider} from '@/store/api/periscope/JsonInterfaces';
import {BlocAbstract} from '@/store/api/periscope/criteres/BlocAbstract';
import { TriTableauInterface } from "@/store/resultat/TriTableauInterface";
import { BlocTri } from "@/store/api/periscope/criteres/BlocTri";
import { BlocRequeteEnregistree } from "@/store/recherche/BlocRequeteEnregistree";

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
   static constructJsonGlobalRequest(blocPcpRegions: BlocPcpRegions, blocPcpMetiers: BlocPcpMetiers, blocRcr: BlocRcr, blocPpn: BlocPpn, blocIssn: BlocIssn, blocMotsDuTitre: BlocMotDuTitre, blocEditeur: BlocEditeur, blocLangue: BlocLangue, blocPays: BlocPays, blocRequeteDirecte: BlocRequeteEnregistree, blocTri: BlocTri): JsonGlobalSearchRequest {
      //Les blocs ne sont rajoutés que si il contiennent des données
      const criteres: Array<JsonGlobalSearchRequest> = [];

      //Construction de la partie PCP Regions et Metiers en JSON
      if (blocPcpRegions._pcpStringArray.length !== 0 || blocPcpMetiers._pcpStringArray.length !== 0) {
         const pcpRegionsAndMetiersList: Array<string> = [];
         blocPcpRegions._pcpStringArray.forEach((element) => pcpRegionsAndMetiersList.push(element));
         blocPcpMetiers._pcpStringArray.forEach((element) => pcpRegionsAndMetiersList.push(element));
         const pcpRegionsAndMetiersInternalOperators: Array<string> = [];
         blocPcpRegions._arrayRegions.forEach((element) => (element.value ? pcpRegionsAndMetiersInternalOperators.push(BlocAbstract.convertBlocOperatorInString(blocPcpRegions._internalBlocOperator)) : ''));
         blocPcpMetiers._arrayMetiers.forEach((element) => (element.value ? pcpRegionsAndMetiersInternalOperators.push(BlocAbstract.convertBlocOperatorInString(blocPcpMetiers._internalBlocOperator)) : ''));

         const pcpBlocJson: JsonPcpBlocProvider = {
            type: blocPcpRegions._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPcpRegions._externalBlocOperator),
            pcp: pcpRegionsAndMetiersList,
            pcp_operator: pcpRegionsAndMetiersInternalOperators,
         };

         criteres.push(pcpBlocJson);
      }

      //Construction de la partie Rcr en JSON
      if (blocRcr._rcrListString.length !== 0) {
         const rcrBlocJson: JsonRcrBlocProvider = {
            type: blocRcr._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocRcr._externalBlocOperator),
            rcr: blocRcr._rcrListString,
            rcr_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocRcr._internalBlocOperator, blocRcr._rcrListString.length),
         };
         criteres.push(rcrBlocJson);
      }

      //Construction de la partie PPN en JSON
      if (blocPpn._ppnListString.length !== 0) {
         const ppnBlocJson: JsonPpnBlocProvider = {
            type: blocPpn._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPpn._externalBlocOperator),
            ppn: blocPpn._ppnListString,
         };
         criteres.push(ppnBlocJson);
      }

      //Construction de la partie ISSN en JSON
      if (blocIssn._issnListString.length !== 0) {
         const issnBlocJson: JsonIssnBlocProvider = {
            type: blocIssn._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocIssn._externalBlocOperator),
            issn: blocIssn._issnListString,
         };
         criteres.push(issnBlocJson);
      }

      //Construction de la partie Mots du titre en JSON
      if (blocMotsDuTitre._titleWordsEntered.length !== 0) {
         const titleWordsBlocJson: JsonMotsDuTitreProvider = {
            type: blocMotsDuTitre._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocMotsDuTitre._externalBlocOperator),
            titleWords: blocMotsDuTitre._titleWordsEntered,
            title_words_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocMotsDuTitre._internalBlocOperator, blocMotsDuTitre._titleWordsEntered.length),
         };
         criteres.push(titleWordsBlocJson);
      }

      //Construction de la partie Editeur en JSON
      if (blocEditeur._editorsEntered.length !== 0) {
         const editorBlocJson: JsonEditeurProvider = {
            type: blocEditeur._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocEditeur._externalBlocOperator),
            editors: blocEditeur._editorsEntered,
            editors_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocEditeur._internalBlocOperator, blocEditeur._editorsEntered.length),
         };
         criteres.push(editorBlocJson);
      }

      //Construction de la partie Pays en JSON
      if (blocPays._paysEntered.length !== 0) {
         const paysBlocJson: JsonPaysProvider = {
            type: blocPays._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocPays._externalBlocOperator),
            countries: blocPays._paysEntered,
            countries_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocPays._internalBlocOperator, blocPays._paysEntered.length),
         };
         criteres.push(paysBlocJson);
      }

      //Construction de la partie Langue en JSON
      if (blocLangue._languesEntered.length !== 0) {
         const langueBlocJson: JsonLanguesProvider = {
            type: blocLangue._type,
            bloc_operator: BlocAbstract.convertBlocOperatorInString(blocLangue._externalBlocOperator),
            language: blocLangue._languesEntered,
            language_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocLangue._internalBlocOperator, blocLangue._languesEntered.length),
         };
         criteres.push(langueBlocJson);
      }

      //Construction d'une requête en cas de saisie directe de requête, effacement de l'ensemble des autres élements
      if(blocRequeteDirecte._directRequest.length !== 0){
         //On retourne la chaîne directement
         return JSON.parse(blocRequeteDirecte._directRequest);
      }

      //Construction du JSON de plus haut niveau
      const jsonToReturn: JsonGlobalSearchRequest = {criteres: criteres, tri: blocTri._array};
      return jsonToReturn;
   }
}
