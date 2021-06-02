import {
   JsonCriteres,
   JsonEditeurProvider,
   JsonFacetteRequest,
   JsonGlobalSearchRequest,
   JsonIssnBlocProvider,
   JsonLanguesProvider,
   JsonMotsDuTitreProvider,
   JsonPaysProvider,
   JsonPcpBlocProvider,
   JsonPpnBlocProvider,
   JsonRcrBlocProvider,
   JsonTri,
   JsonTriProvider,
} from '@/service/periscope/PeriscopeJsonDefinition';
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
import {OrderType, TriType} from '@/store/recherche/TriDefinition';
import {ValueError} from '@/exception/ValueError';
import {PanelProvider, PanelType} from '@/store/composant/ComposantDefinition';

/**
 * Représente une requête de recherche pour l'API Periscope
 */
export class SearchRequest {
   /**
    * Objet Json contenant les critères de recherche, les tris et les facettes à envoyer dans les requêtes au back
    */
   _jsonSearchRequest: JsonGlobalSearchRequest;
   /**
    * Construit un objet JSON à partir des données du store
    */
   static constructJsonGlobalRequest(
      panel: Array<PanelProvider>,
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
      const criteria: Array<JsonCriteres> = [];
      const sort: Array<JsonTri> = [];
      const facettes: Array<JsonFacetteRequest> = [];

      //Construction d'une requête en cas de saisie directe de requête
      if (blocRequeteDirecte._directRequest.criteres.length !== 0) {
         blocRequeteDirecte._directRequest.criteres.forEach((element: any) => criteria.push(element));

         // Les tris contenus dans la requête ont été appliqués à la saisie dans le formulaire. cf :
         // store -> action 'updateSelectedRequeteDirecte'
         // Inutile donc de remplir les tris avec les tris contenus dans la requête
         //blocRequeteDirecte._directRequest.tri.forEach((element: any) => sort.push(element));
      }

      for (let i = 0; i < panel.length; i++) {
         // On respecte l'ordre des panneaux choisit par l'utilisateur
         //Logger.debug("Ordre "+i+ " : "+PanelType[panel[i].id])

         switch (panel[i].id) {
            case PanelType.REGIONS:
               //Construction de la partie pcpList Regions en JSON
               if (blocPcpRegions._selected.length !== 0) {
                  const pcpRegionsList: Array<string> = [];
                  blocPcpRegions._selected.forEach((element) => pcpRegionsList.push(element));
                  const pcpRegionsInternalOperators: Array<string> = [];
                  blocPcpRegions._selected.forEach(() => pcpRegionsInternalOperators.push(BlocAbstract.convertBlocOperatorToLabel(blocPcpRegions._internalBlocOperator)));

                  const pcpBlocJson: JsonPcpBlocProvider = {
                     type: 'CriterionPcp',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocPcpRegions._externalBlocOperator),
                     pcp: pcpRegionsList,
                     pcp_operator: pcpRegionsInternalOperators,
                  };

                  criteria.push(pcpBlocJson);
               }
               break;
            case PanelType.METIERS:
               //Construction de la partie pcpList Metiers en JSON
               if (blocPcpMetiers._selected.length !== 0) {
                  const pcpMetiersList: Array<string> = [];
                  blocPcpMetiers._selected.forEach((element) => pcpMetiersList.push(element));
                  const pcpMetiersInternalOperators: Array<string> = [];
                  blocPcpMetiers._selected.forEach(() => pcpMetiersInternalOperators.push(BlocAbstract.convertBlocOperatorToLabel(blocPcpMetiers._internalBlocOperator)));

                  const pcpBlocJson: JsonPcpBlocProvider = {
                     type: 'CriterionPcp',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocPcpRegions._externalBlocOperator),
                     pcp: pcpMetiersList,
                     pcp_operator: pcpMetiersInternalOperators,
                  };

                  criteria.push(pcpBlocJson);
               }
               break;
            case PanelType.RCR:
               //Construction de la partie Rcr en JSON
               if (blocRcr._selected.length !== 0) {
                  const rcrBlocJson: JsonRcrBlocProvider = {
                     type: 'CriterionRcr',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocRcr._externalBlocOperator),
                     rcr: blocRcr._selected,
                     rcr_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocRcr._internalBlocOperator, blocRcr._selected.length),
                  };
                  criteria.push(rcrBlocJson);
               }
               break;
            case PanelType.PPN:
               //Construction de la partie ppn en JSON
               if (blocPpn._selected.length !== 0) {
                  const ppnBlocJson: JsonPpnBlocProvider = {
                     type: 'CriterionPpn',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocPpn._externalBlocOperator),
                     ppn: blocPpn._selected,
                  };
                  criteria.push(ppnBlocJson);
               }
               break;
            case PanelType.ISSN:
               //Construction de la partie issn en JSON
               if (blocIssn._selected.length !== 0) {
                  const issnBlocJson: JsonIssnBlocProvider = {
                     type: 'CriterionIssn',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocIssn._externalBlocOperator),
                     issn: blocIssn._selected,
                  };
                  criteria.push(issnBlocJson);
               }
               break;
            case PanelType.WORDS:
               //Construction de la partie Mots du titre en JSON
               if (blocMotsDuTitre._selected.length !== 0) {
                  const titleWordsBlocJson: JsonMotsDuTitreProvider = {
                     type: 'CriterionTitleWords',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocMotsDuTitre._externalBlocOperator),
                     title_words: blocMotsDuTitre._selected,
                     title_words_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocMotsDuTitre._internalBlocOperator, blocMotsDuTitre._selected.length),
                  };
                  criteria.push(titleWordsBlocJson);
               }
               break;
            case PanelType.EDITOR:
               //Construction de la partie Editeur en JSON
               if (blocEditeur._selected.length !== 0) {
                  const editorBlocJson: JsonEditeurProvider = {
                     type: 'CriterionEditor',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocEditeur._externalBlocOperator),
                     editors: blocEditeur._selected,
                     editors_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocEditeur._internalBlocOperator, blocEditeur._selected.length),
                  };
                  criteria.push(editorBlocJson);
               }
               break;
            case PanelType.COUNTRY:
               //Construction de la partie Pays en JSON
               if (blocPays._selected.length !== 0) {
                  const paysBlocJson: JsonPaysProvider = {
                     type: 'CriterionCountry',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocPays._externalBlocOperator),
                     countries: blocPays._selected,
                     countries_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocPays._internalBlocOperator, blocPays._selected.length),
                  };
                  criteria.push(paysBlocJson);
               }
               break;
            case PanelType.LANG:
               //Construction de la partie Langue en JSON
               if (blocLangue._selected.length !== 0) {
                  const langueBlocJson: JsonLanguesProvider = {
                     type: 'CriterionLanguage',
                     bloc_operator: BlocAbstract.convertBlocOperatorToLabel(blocLangue._externalBlocOperator),
                     language: blocLangue._selected,
                     language_operator: BlocAbstract.getSameNumberOfIdenticalOperatorFromNumberOfElements(blocLangue._internalBlocOperator, blocLangue._selected.length),
                  };
                  criteria.push(langueBlocJson);
               }
               break;
         }
      }

      //Construction des tris
      for (let i = 0; i < blocTri._array.length; i++) {
         const triJson: JsonTriProvider = {
            sort: SearchRequest.convertTriToLabel(blocTri._array[i].sort),
            order: SearchRequest.convertTriOrderToLabel(blocTri._array[i].order),
         };
         sort.push(triJson);
      }

      // Construction des facettes
      let facetJson: JsonFacetteRequest = {
         zone: 'DOCUMENT_TYPE',
      };
      facettes.push(facetJson);

      facetJson = {
         zone: 'support_type',
      };
      facettes.push(facetJson);

      facetJson = {
         zone: 'country',
      };
      facettes.push(facetJson);

      facetJson = {
         zone: 'language',
      };
      facettes.push(facetJson);

      const jsonToReturn: JsonGlobalSearchRequest = {criteres: criteria, tri: sort, facettes: facettes};
      return jsonToReturn;
   }

   /**
    * Converti un tri en chaîne de caractère pour l'API
    * @param tri Tri à convertir en chaîne de caractère
    * @return Chaîne de caractère
    * @throws ValueError si le tri n'est pas reconnu
    */
   static convertTriToLabel(tri: TriType): string {
      switch (tri) {
         case TriType.ppn:
            return 'PPN';
         case TriType.continiousType:
            return 'DOCUMENT_TYPE';
         case TriType.issn:
            return 'ISSN';
         case TriType.title:
            return 'TITLE';
         case TriType.editor:
            return 'EDITOR';
         case TriType.startDate:
            return 'START_YEAR';
         case TriType.endDate:
            return 'END_YEAR';
         case TriType.pcpList:
            return 'PCP_LIST';
         case TriType.nbLoc:
            return 'NB_LOC';
         case TriType.linkSudoc:
            throw new ValueError('No converter found for sort ' + TriType[tri] + '');
         default:
            throw new ValueError('No converter found for sort ' + TriType[tri] + '');
      }
   }

   /**
    * Converti une chaîne de caractère du tri en objet TriType
    * @param tri chaîne de caractère à convertir
    * @return Objet TriType
    * @throws ValueError si la chaîne de caractère du tri n'est pas reconnue
    */
   static convertLabeltoTri(tri: string): TriType {
      switch (tri) {
         case 'PPN':
            return TriType.ppn;
         case 'DOCUMENT_TYPE':
            return TriType.continiousType;
         case 'ISSN':
            return TriType.issn;
         case 'TITLE':
            return TriType.title;
         case 'EDITOR':
            return TriType.editor;
         case 'START_YEAR':
            return TriType.startDate;
         case 'END_YEAR':
            return TriType.endDate;
         case 'PCP_LIST':
            return TriType.pcpList;
         case 'NB_LOC':
            return TriType.nbLoc;
         default:
            throw new ValueError('No converter found for sort ' + tri + '');
      }
   }

   /**
    * Converti l'ordre de tri en chaîne de caractère
    * @param order: Objet OrderType à convertir
    * @return Chaîne de caractère de l'ordre du tri
    * @throws ValueError si l'ordre du tri n'est pas reconnue
    */
   static convertTriOrderToLabel(order: OrderType): string {
      switch (order) {
         case OrderType.ASC:
            return 'ASC';
         case OrderType.DESC:
            return 'DESC';
         default:
            throw new ValueError('No converter found for order ' + OrderType[order] + '');
      }
   }

   /**
    * Vérifie l'intégrité d'un JSON en chaîne de caractère
    * @param value Chaîne de caractère du JSON
    * @return la valeur 'OK' ou le message d'erreur
    */
   static checkJsonIntegrity(value: string): string {
      try {
         const json: JsonGlobalSearchRequest = JSON.parse(value);

         if (!json.criteres) {
            return 'La propriété "criteres" est obligatoire';
         } else if (!Array.isArray(json.criteres)) {
            return 'La propriété "criteres" doit être un tableau de critères';
         }

         if (json.tri && !Array.isArray(json.tri)) {
            return 'La propriété "tri" doit être un tableau de tris';
         }

         return 'OK';
      } catch (err) {
         return 'Impossible de décoder le JSON : ' + err.message;
      }
   }
}
