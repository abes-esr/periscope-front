import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';
import {CheckboxesProvider, Ensemble} from '@/store/interfaces/BlocInterfaces';

export class BlocPcpRegions extends BlocAbstract {
   _type = 'CriterionPcp'; //Valeur fixe définie par l'API
   _internalBlocOperator = Ensemble.Et; // ET / Ou entre les PCP
   _pcpStringArray: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés

   //Tableau des regions, avec leur état coché non coché persistant
   _arrayRegions: Array<CheckboxesProvider> = [
      {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
      {id: 1, key: 'PCAu', text: 'Auvergne', value: false},
      {id: 2, key: 'PCBo', text: 'Bourgogne', value: false},
      {id: 3, key: 'PCBr', text: 'Bretagne', value: false},
      {id: 4, key: 'PCCa', text: 'Champagne-Ardenne', value: false},
      {id: 5, key: 'PCCap', text: 'Champagne-Ardenne Picardie', value: false},
      {id: 6, key: 'PCCo', text: 'Corse', value: false},
      {id: 7, key: 'PCFc', text: 'Franche-Comté', value: false},
      {id: 8, key: 'PCLr', text: 'Languedoc-Roussillon', value: false},
      {id: 9, key: 'PCLim', text: 'Limousin', value: false},
      {id: 10, key: 'PCLo', text: 'Lorraine', value: false},
      {id: 11, key: 'PCMp', text: 'Midi-Pyrénées', value: false},
      {id: 12, key: 'PCNpc', text: 'Nord-Pas-de-Calais', value: false},
      {id: 13, key: 'PCPca', text: 'PACA', value: false},
      {id: 14, key: 'PCPc', text: 'Poitou-Charentes', value: false},
      {id: 15, key: 'PCPdl', text: 'Pays de Loire', value: false},
      {id: 16, key: 'PCPi', text: 'Picardie', value: false},
      {id: 17, key: 'PCRa', text: 'Rhône-Alpes', value: false},
      {id: 18, key: 'PCSam', text: 'Sciences Aix-Marseille', value: false},
      {id: 19, key: 'PCScvdl', text: 'Sciences Centre Val de Loire', value: false},
      {id: 20, key: 'PCUdp', text: 'Université de Poitiers', value: false},
      {id: 21, key: 'PCUdr', text: 'Université de Rouen', value: false},
   ];

   constructor(externalBlocOperator: number) {
      super(externalBlocOperator);
   }

   get internalBlocOperatorInArrayString(): Array<string> {
      const pcpInArrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this._pcpStringArray.forEach(() => pcpInArrayString.push('OU'));
            break;
         case Ensemble.Et:
            this._pcpStringArray.forEach(() => pcpInArrayString.push('ET'));
            break;
         case Ensemble.Sauf:
            this._pcpStringArray.forEach(() => pcpInArrayString.push('SAUF'));
            break;
         default:
            this._pcpStringArray.forEach(() => pcpInArrayString.push('UNDEFINED'));
            break;
      }
      return pcpInArrayString;
   }
}
