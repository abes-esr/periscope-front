import { BlocAbstract, CheckboxesProvider, Ensemble } from "@/store/classes/blocsDeRecherche/BlocAbstract";

export class BlocPcpMetiers extends BlocAbstract {
   private _type = 'CriterionPcp'; //Valeur fixe définie par l'API
   private _internalBlocOperator: number; // ET / Ou entre les PCP
   private _pcpStringArray: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés

   //Tableau des métiers, avec leur état coché non coché persistant
   private _arrayMetiers: Array<CheckboxesProvider> = [
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

   get type(): string {
      return this._type;
   }

   set type(value: string) {
      this._type = value;
   }

   get internalBlocOperator(): number {
      return this._internalBlocOperator;
   }

   set internalBlocOperator(value: number) {
      this._internalBlocOperator = value;
   }

   get internalBlocOperatorInString(): string {
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            return 'OU';
         case Ensemble.Et:
            return 'ET';
         case Ensemble.Sauf:
            return 'SAUF';
         default:
            return 'UNDEFINED';
      }
   }

   get pcpStringArray(): Array<string> {
      return this._pcpStringArray;
   }

   set pcpStringArray(value: Array<string>) {
      this._pcpStringArray = value;
   }

   public pcpStringArrayClean(): void {
      this._pcpStringArray = [];
   }

   get arrayMetiers(): Array<CheckboxesProvider> {
      return this._arrayMetiers;
   }

   set arrayMetiers(value: Array<CheckboxesProvider>) {
      this._arrayMetiers = value;
   }
}
