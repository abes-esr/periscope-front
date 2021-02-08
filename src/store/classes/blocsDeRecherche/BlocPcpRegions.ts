import {BlocAbstract} from '@/store/classes/blocsDeRecherche/BlocAbstract';

interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}

export class BlocPcpRegions extends BlocAbstract {
   private _type = 'CriterionPcp'; //Valeur fixe définie par l'API
   private _internalBlocOperator = 1; // ET / Ou entre les PCP
   private _pcpStringArray: Array<string> = []; //Tableau des codes PCP cochés / séléctionnés

   //Tableau des regions, avec leur état coché non coché persistant
   private _arrayRegions: Array<Provider> = [
      {id: 0, key: 'PCAq', text: 'Aquitaine', value: false},
      {id: 1, key: 'Au', text: 'Auvergne', value: false},
      {id: 2, key: 'Bo', text: 'Bourgogne', value: false},
      {id: 3, key: 'Br', text: 'Bretagne', value: false},
      {id: 4, key: 'Ca', text: 'Champagne-Ardenne', value: false},
      {id: 5, key: 'Cap', text: 'Champagne-Ardenne Picardie', value: false},
      {id: 6, key: 'Co', text: 'Corse', value: false},
      {id: 7, key: 'Fc', text: 'Franche-Comté', value: false},
      {id: 8, key: 'Lr', text: 'Languedoc-Roussillon', value: false},
      {id: 9, key: 'PCLim', text: 'Limousin', value: false},
      {id: 10, key: 'Lo', text: 'Lorraine', value: false},
      {id: 11, key: 'Mp', text: 'Midi-Pyrénées', value: false},
      {id: 12, key: 'Npc', text: 'Nord-Pas-de-Calais', value: false},
      {id: 13, key: 'Pca', text: 'PACA', value: false},
      {id: 14, key: 'Pc', text: 'Poitou-Charentes', value: false},
      {id: 15, key: 'Pdl', text: 'Pays de Loire', value: false},
      {id: 16, key: 'Pi', text: 'Picardie', value: false},
      {id: 17, key: 'Ra', text: 'Rhône-Alpes', value: false},
      {id: 18, key: 'Sam', text: 'Sciences Aix-Marseille', value: false},
      {id: 19, key: 'Scvdl', text: 'Sciences Centre Val de Loire', value: false},
      {id: 20, key: 'Udp', text: 'Université de Poitiers', value: false},
      {id: 21, key: 'Udr', text: 'Université de Rouen', value: false},
   ];

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

   get pcpStringArray(): Array<string> {
      return this._pcpStringArray;
   }

   set pcpStringArray(value: Array<string>) {
      this._pcpStringArray = value;
   }

   public pcpStringArrayClean(): void {
      this._pcpStringArray = [];
   }

   get arrayRegions(): Array<Provider> {
      return this._arrayRegions;
   }

   set arrayRegions(value: Array<Provider>) {
      this._arrayRegions = value;
   }
}
