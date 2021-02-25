import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {CheckboxesProvider, Ensemble} from '@/store/interfaces/BlocInterfaces';

export class BlocPcpMetiers extends BlocAbstract {
   _type = 'CriterionPcp'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / Ou entre les PCP
   _pcpStringArray: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés

   //Tableau des métiers, avec leur état coché non coché persistant
   _arrayMetiers: Array<CheckboxesProvider> = [
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
      {id: 10, key: 'PCNum', text: 'Sciences du Numériques', value: false},
      {id: 11, key: 'PCMath', text: 'Mathématiques RNBM', value: false},
      {id: 12, key: 'PCMed', text: 'Médecine', value: false},
      {id: 13, key: 'PCPsy', text: 'Psychologie, Psychanalyse', value: false},
      {id: 14, key: 'PCSTAPS', text: 'STAPS', value: false},
      {id: 15, key: 'PCPhilo', text: 'Philosophie', value: false},
      {id: 16, key: 'PCPhy', text: 'Physique', value: false},
      //TODO 'PCLCen':['Lettres et Sciences Humaines Centre Val de Loire', 'geo' ], -> trouver correspondance
      //TODO 'PCEco':['Economie et gestion', ''] idem
   ];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }
}