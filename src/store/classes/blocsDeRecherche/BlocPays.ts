import {BlocAbstract, Ensemble, ListProvider, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocPays extends BlocAbstract {
   private _type = 'CriterionCountry'; //Valeur fixe définie par l'API
   private _internalBlocOperator: Ensemble = Ensemble.Ou; //Operateur interne entre les pays
   private _paysEntered: Array<ListProvider> = [];
   private _internalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];
   private _externalBlocOperatorListToSelect: Array<OperatorProvider> = [
      {id: 0, key: 'internalRcrOperatorOU', text: 'OU', value: Ensemble.Ou},
      {id: 1, key: 'internalRcrOperatorET', text: 'ET', value: Ensemble.Et},
      {id: 2, key: 'internalRcrOperatorSAUF', text: 'SAUF', value: Ensemble.Sauf},
   ];
   private _paysListe: Array<ListProvider> = [
      {id: 'AF', text: 'Afghanistan'},
      {id: 'ZA', text: 'Afrique du Sud'},
      {id: 'AX', text: 'Aland Iles'},
      {id: 'AL', text: 'Albanie'},
      {id: 'DZ', text: 'Algérie'},
      {id: 'DE', text: 'Allemagne'},
      {id: 'DD', text: "Allemagne de l'Est"},
      {id: 'AD', text: 'Andorre'},
      {id: 'AO', text: 'Angola'},
      {id: 'AI', text: 'Anguilla'},
      {id: 'AQ', text: 'Antarctique'},
      {id: 'AG', text: 'Antigua et Barbuda'},
      {id: 'AN', text: 'Antilles néerlandaises'},
      {id: 'SA', text: 'Arabie Saoudite'},
      {id: 'AR', text: 'Argentine'},
      {id: 'AM', text: 'Arménie'},
      {id: 'AW', text: 'Aruba'},
      {id: 'AU', text: 'Australie'},
      {id: 'AT', text: 'Autriche'},
      {id: 'AZ', text: 'Azerbaïdjan'},
      {id: 'BS', text: 'Bahamas'},
      {id: 'BH', text: 'Bahrein'},
      {id: 'BD', text: 'Bangladesh'},
      {id: 'BB', text: 'Barbade'},
      {id: 'BY', text: 'Bélarus'},
      {id: 'BE', text: 'Belgique'},
      {id: 'BZ', text: 'Bélize'},
      {id: 'BJ', text: 'Bénin'},
      {id: 'BM', text: 'Bermudes'},
      {id: 'BT', text: 'Bhoutan'},
      {id: 'BO', text: 'Bolivie'},
      {id: 'BA', text: 'Bosnie-Herzégovine'},
      {id: 'BW', text: 'Botswana'},
      {id: 'BV', text: 'Bouvet (Ile)'},
      {id: 'BR', text: 'Brésil'},
      {id: 'BN', text: 'Brunei Darussalam'},
      {id: 'BG', text: 'Bulgarie'},
      {id: 'BF', text: 'Burkina Faso'},
      {id: 'BI', text: 'Burundi'},
      {id: 'KY', text: 'Caïmanes (Iles)'},
      {id: 'KH', text: 'Cambodge'},
      {id: 'CM', text: 'Cameroun'},
      {id: 'CA', text: 'Canada'},
      {id: 'CT', text: 'Canton et Enderbury (Iles)'},
      {id: 'CV', text: 'Cap-Vert'},
      {id: 'CF', text: 'Centrafricaine (République)'},
      {id: 'CL', text: 'Chili'},
      {id: 'CN', text: 'Chine'},
      {id: 'CX', text: 'Christmas (Ile)'},
      {id: 'CY', text: 'Chypre'},
      {id: 'CC', text: 'Cocos (Keeling)(Iles)'},
      {id: 'CO', text: 'Colombie'},
      {id: 'KM', text: 'Comores'},
      {id: 'CG', text: 'Congo'},
      {id: 'CD', text: 'la République démocratique du Congo'},
      {id: 'CK', text: 'Cook (Iles)'},
      {id: 'KR', text: 'République de Corée'},
      {id: 'KP', text: 'République populaire démocratique de Corée'},
      {id: 'CR', text: 'Costa Rica'},
      {id: 'CI', text: "Côte d'Ivoire"},
      {id: 'HR', text: 'Croatie'},
      {id: 'CU', text: 'Cuba'},
      {id: 'DK', text: 'Danemark'},
      {id: 'DJ', text: 'Djibouti'},
      {id: 'DO', text: 'République Dominicaine'},
      {id: 'DM', text: 'Dominique'},
      {id: 'EG', text: 'Egypte'},
      {id: 'SV', text: 'El Salvador'},
      {id: 'AE', text: 'Emirats arabes unis'},
      {id: 'EC', text: 'Equateur'},
      {id: 'ER', text: 'Erythrée'},
      {id: 'ES', text: 'Espagne'},
      {id: 'EE', text: 'Estonie'},
      {id: 'US', text: 'Etats-Unis'},
      {id: 'ET', text: 'Ethiopie'},
      {id: 'FK', text: 'Falkland (Iles) (Malvinas)'},
      {id: 'FO', text: 'Feroe (Iles)'},
      {id: 'FJ', text: 'Fidji'},
      {id: 'FI', text: 'Finlande'},
      {id: 'FR', text: 'France'},
      {id: 'GA', text: 'Gabon'},
      {id: 'GM', text: 'Gambie'},
      {id: 'GE', text: 'Géorgie'},
      {id: 'GS', text: 'Géorgie du sud et les Iles Sandwich du Sud'},
      {id: 'GH', text: 'Ghana'},
      {id: 'GI', text: 'Gibraltar'},
      {id: 'GR', text: 'Grèce'},
      {id: 'GD', text: 'Grenade'},
      {id: 'GL', text: 'Groenland'},
      {id: 'GP', text: 'Guadeloupe'},
      {id: 'GU', text: 'Guam'},
      {id: 'GT', text: 'Guatemala'},
      {id: 'GG', text: 'Guernesey'},
      {id: 'GN', text: 'Guinée'},
      {id: 'GW', text: 'Guinée-Bissau'},
      {id: 'GQ', text: 'Guinée équatoriale'},
      {id: 'GY', text: 'Guyana'},
      {id: 'GF', text: 'Guyane française'},
      {id: 'HT', text: 'Haïti'},
      {id: 'HM', text: 'Heard (Ile) et McDonald (Iles)'},
      {id: 'HN', text: 'Honduras'},
      {id: 'HK', text: 'Hong-Kong'},
      {id: 'HU', text: 'Hongrie'},
      {id: 'IM', text: 'Ile de Man'},
      {id: 'UM', text: 'Iles mineures éloignées des Etats-Unis'},
      {id: 'VG', text: 'Iles vierges britanniques'},
      {id: 'VI', text: 'Iles vierges des Etats-Unis'},
      {id: 'XX', text: 'pays inconnu'},
      {id: 'IN', text: 'Inde'},
      {id: 'ID', text: 'Indonésie'},
      {id: 'IR', text: "République islamique d'Iran"},
      {id: 'IQ', text: 'Iraq'},
      {id: 'IE', text: 'Irlande'},
      {id: 'IS', text: 'Islande'},
      {id: 'IL', text: 'Israël'},
      {id: 'IT', text: 'Italie'},
      {id: 'JM', text: 'Jamaïque'},
      {id: 'JP', text: 'Japon'},
      {id: 'JE', text: 'Jersey'},
      {id: 'JO', text: 'Jordanie'},
      {id: 'KZ', text: 'Kazakhstan'},
      {id: 'KE', text: 'Kenya'},
      {id: 'KG', text: 'Kirghizistan'},
      {id: 'KI', text: 'Kiribati'},
      {id: 'KW', text: 'Koweït'},
      {id: 'LA', text: 'République démocratique populaire du Laos'},
      {id: 'LS', text: 'Lesotho'},
      {id: 'LV', text: 'Lettonie'},
      {id: 'LB', text: 'Liban'},
      {id: 'LR', text: 'Libéria'},
      {id: 'LY', text: 'Libyenne ou Jamahiriya arabe'},
      {id: 'LI', text: 'Liechtenstein'},
      {id: 'LT', text: 'Lituanie'},
      {id: 'LU', text: 'Luxembourg'},
      {id: 'MO', text: 'Macao'},
      {id: 'MK', text: "l'ex-République yougoslave de Macédoine"},
      {id: 'MG', text: 'Madagascar'},
      {id: 'MY', text: 'Malaisie'},
      {id: 'MW', text: 'Malawi'},
      {id: 'MV', text: 'Maldives'},
      {id: 'ML', text: 'Mali'},
      {id: 'MT', text: 'Malte'},
      {id: 'MP', text: 'Mariannes du nord (Iles)'},
      {id: 'MA', text: 'Maroc'},
      {id: 'MH', text: 'Marshall (Iles)'},
      {id: 'MQ', text: 'Martinique'},
      {id: 'MU', text: 'Maurice'},
      {id: 'MR', text: 'Mauritanie'},
      {id: 'YT', text: 'Mayotte'},
      {id: 'MX', text: 'Mexique'},
      {id: 'FM', text: 'Etats fédérés de Micronésie'},
      {id: 'MD', text: 'République de Moldova'},
      {id: 'MC', text: 'Monaco'},
      {id: 'MN', text: 'Mongolie'},
      {id: 'ME', text: 'Monténégro'},
      {id: 'MS', text: 'Montserrat'},
      {id: 'MZ', text: 'Mozambique'},
      {id: 'ZZ', text: 'pays multiples'},
      {id: 'MM', text: 'Myanmar'},
      {id: 'NA', text: 'Namibie'},
      {id: 'NR', text: 'Nauru'},
      {id: 'NP', text: 'Népal'},
      {id: 'NI', text: 'Nicaragua'},
      {id: 'NE', text: 'Niger'},
      {id: 'NG', text: 'Nigéria'},
      {id: 'NU', text: 'Niué'},
      {id: 'NF', text: 'Norfolk (Ile)'},
      {id: 'NO', text: 'Norvège'},
      {id: 'NC', text: 'Nouvelle-Calédonie'},
      {id: 'NZ', text: 'Nouvelle-Zélande'},
      {id: 'IO', text: "Territoire britannique de l'Océan indien"},
      {id: 'OM', text: 'Oman'},
      {id: 'UG', text: 'Ouganda'},
      {id: 'UZ', text: 'Ouzbékistan'},
      {id: 'PK', text: 'Pakistan'},
      {id: 'PW', text: 'Palaos'},
      {id: 'PS', text: 'Territoire Palestinien occupé'},
      {id: 'PA', text: 'Panama'},
      {id: 'PG', text: 'Papouasie-Nouvelle-Guinée'},
      {id: 'PY', text: 'Paraguay'},
      {id: 'NL', text: 'Pays-Bas'},
      {id: 'PE', text: 'Pérou'},
      {id: 'PH', text: 'Philippines'},
      {id: 'PN', text: 'Pitcairn'},
      {id: 'PL', text: 'Pologne'},
      {id: 'PF', text: 'Polynésie française'},
      {id: 'PR', text: 'Porto Rico'},
      {id: 'PT', text: 'Portugal'},
      {id: 'QA', text: 'Qatar'},
      {id: 'RE', text: 'Réunion'},
      {id: 'RO', text: 'Roumanie'},
      {id: 'GB', text: 'Royaume-Uni'},
      {id: 'RU', text: 'Fédération de Russie'},
      {id: 'RW', text: 'Rwanda'},
      {id: 'EH', text: 'Sahara occidental'},
      {id: 'SH', text: 'Sainte-Hélène'},
      {id: 'LC', text: 'Sainte-Lucie'},
      {id: 'KN', text: 'Saint-Kitts-et-Nevis'},
      {id: 'SM', text: 'Saint-Marin'},
      {id: 'PM', text: 'Saint-Pierre-et-Miquelon'},
      {id: 'VA', text: 'Saint-Siège, Etat de la Cité du Vatican'},
      {id: 'VC', text: 'Saint-Vincent-et-les-Grenadines'},
      {id: 'SB', text: 'Salomon (Iles)'},
      {id: 'WS', text: 'Samoa'},
      {id: 'AS', text: 'Samoa américaines'},
      {id: 'ST', text: 'Sao Tomé-et-Principe'},
      {id: 'SN', text: 'Sénégal'},
      {id: 'RS', text: 'Serbie'},
      {id: 'SC', text: 'Seychelles'},
      {id: 'SL', text: 'Sierra Leone'},
      {id: 'SG', text: 'Singapour'},
      {id: 'SK', text: 'Slovaquie'},
      {id: 'SI', text: 'Slovénie'},
      {id: 'SO', text: 'Somalie'},
      {id: 'SD', text: 'Soudan'},
      {id: 'LK', text: 'Sri Lanka'},
      {id: 'SE', text: 'Suède'},
      {id: 'CH', text: 'Suisse'},
      {id: 'SR', text: 'Suriname'},
      {id: 'SJ', text: 'Svalbard et Ile Jan Mayen'},
      {id: 'SZ', text: 'Swaziland'},
      {id: 'SY', text: 'République arabe Syrienne'},
      {id: 'TJ', text: 'Tadjikistan'},
      {id: 'TW', text: 'Taïwan, Province de Chine'},
      {id: 'TZ', text: 'République unie de Tanzanie'},
      {id: 'TD', text: 'Tchad'},
      {id: 'CS', text: 'Tchècoslovaquie'},
      {id: 'CZ', text: 'République Tchèque'},
      {id: 'TF', text: 'Terres australes et antarctiques françaises'},
      {id: 'TH', text: 'Thaïlande'},
      {id: 'TL', text: 'Timor-Leste'},
      {id: 'TG', text: 'Togo'},
      {id: 'TK', text: 'Tokelau'},
      {id: 'TO', text: 'Tonga'},
      {id: 'TT', text: 'Trinité-et-Tobago'},
      {id: 'TN', text: 'Tunisie'},
      {id: 'TM', text: 'Turkménistan'},
      {id: 'TC', text: 'Turks et Caïques (Iles)'},
      {id: 'TR', text: 'Turquie'},
      {id: 'TV', text: 'Tuvalu'},
      {id: 'SU', text: 'U.S.S.R.'},
      {id: 'UA', text: 'Ukraine'},
      {id: 'UY', text: 'Uruguay'},
      {id: 'VU', text: 'Vanuatu'},
      {id: 'VE', text: 'Venezuela'},
      {id: 'VN', text: 'Viet-nam'},
      {id: 'VD', text: 'Viet-nam (Sud)'},
      {id: 'WF', text: 'Wallis et Futuna'},
      {id: 'YE', text: 'Yémen'},
      {id: 'YD', text: 'Yémen (Nord)'},
      {id: 'YU', text: 'Yougoslavie'},
      {id: 'ZR', text: 'Zaïre'},
      {id: 'ZM', text: 'Zambie'},
      {id: 'ZW', text: 'Zimbabwe'},
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

   get internalBlocOperatorInArrayString(): Array<string> {
      const pcpInArrayString: Array<string> = [];
      switch (this._internalBlocOperator) {
         case Ensemble.Ou:
            this._paysEntered.forEach(() => pcpInArrayString.push('Ou'));
            break;
         case Ensemble.Et:
            this._paysEntered.forEach(() => pcpInArrayString.push('Et'));
            break;
         case Ensemble.Sauf:
            this._paysEntered.forEach(() => pcpInArrayString.push('Sauf'));
            break;
         default:
            this._paysEntered.forEach(() => pcpInArrayString.push('Undefined'));
            break;
      }
      return pcpInArrayString;
   }

   get paysEntered(): Array<ListProvider> {
      return this._paysEntered;
   }

   set paysEntered(value: Array<ListProvider>) {
      this._paysEntered = value;
   }

   get paysEnteredInArrayString(): Array<string> {
      const arrayString: Array<string> = [];
      this._paysEntered.forEach((element) => arrayString.push(element.id));
      return arrayString;
   }

   public paysStringArrayClean(): void {
      this._paysEntered = [];
   }

   get internalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this._internalBlocOperatorListToSelect;
   }

   set internalBlocOperatorListToSelect(value: Array<OperatorProvider>) {
      this._internalBlocOperatorListToSelect = value;
   }

   get externalBlocOperatorListToSelect(): Array<OperatorProvider> {
      return this._externalBlocOperatorListToSelect;
   }

   set externalBlocOperatorListToSelect(value: Array<OperatorProvider>) {
      this._externalBlocOperatorListToSelect = value;
   }

   get paysListe(): Array<ListProvider> {
      return this._paysListe;
   }

   set paysListe(value: Array<ListProvider>) {
      this._paysListe = value;
   }
}
