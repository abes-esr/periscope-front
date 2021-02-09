import {BlocAbstract, Ensemble, ListProvider, OperatorProvider} from '@/store/classes/blocsDeRecherche/BlocAbstract';

export class BlocLangue extends BlocAbstract {
   private _type = 'CriterionLangue'; //Valeur fixe définie par l'API
   private _internalBlocOperator = Ensemble.Ou; // ET / OU / SAUF entre les RCR
   private _langueEntered: Array<ListProvider> = [];
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
   private _langueListe: Array<ListProvider> = [
      {id: 'abk', text: 'Abkhaz'},
      {id: 'ace', text: 'Achinese'},
      {id: 'ach', text: 'Acoli'},
      {id: 'ada', text: 'Adan'},
      {id: 'ady', text: 'Adyghe'},
      {id: 'aar', text: 'Afar'},
      {id: 'afh', text: 'Afrihili'},
      {id: 'afr', text: 'Afrikaans'},
      {id: 'afa', text: 'Afro-asiatiques (diverses)'},
      {id: 'ain', text: 'Ainou'},
      {id: 'aka', text: 'Akan'},
      {id: 'akk', text: 'Akkadien'},
      {id: 'alb', text: 'Albanais'},
      {id: 'ale', text: 'Aleoute'},
      {id: 'alg', text: 'Algonquin'},
      {id: 'ger', text: 'Allemand'},
      {id: 'nds', text: 'allemand (bas) ou saxon (bas)'},
      {id: 'gmh', text: 'Allemand (moyen haut)'},
      {id: 'goh', text: 'Allemand (vieux haut)'},
      {id: 'tut', text: 'Altaiques (autres langues)'},
      {id: 'amh', text: 'Amharique'},
      {id: 'eng', text: 'Anglais'},
      {id: 'enm', text: 'Anglais (moyen)'},
      {id: 'ang', text: 'Anglo-saxon'},
      {id: 'apa', text: 'Apache'},
      {id: 'ara', text: 'Arabe'},
      {id: 'arg', text: 'aragonais'},
      {id: 'arc', text: 'Arameen'},
      {id: 'arp', text: 'Arapaho'},
      {id: 'arn', text: 'Araucan'},
      {id: 'arw', text: 'Arawak'},
      {id: 'arm', text: 'Armenien'},
      {id: 'art', text: 'Artificielles (diverses)'},
      {id: 'asm', text: 'Assamais'},
      {id: 'ast', text: 'Asturien ou Bable'},
      {id: 'ath', text: 'Athapascan'},
      {id: 'aus', text: 'Australian languages'},
      {id: 'ava', text: 'Avar'},
      {id: 'ave', text: 'Avestique'},
      {id: 'awa', text: 'Awadhi'},
      {id: 'aym', text: 'Aymara'},
      {id: 'aze', text: 'Azeri'},
      {id: 'bak', text: 'Bachkir'},
      {id: 'ban', text: 'Balinais'},
      {id: 'bal', text: 'Baloutchi'},
      {id: 'bat', text: 'Baltique'},
      {id: 'bam', text: 'Bambara'},
      {id: 'bai', text: 'Bamileke (diverses)'},
      {id: 'bad', text: 'Banda'},
      {id: 'bnt', text: 'Bantou langues (autre)'},
      {id: 'bas', text: 'Basa'},
      {id: 'baq', text: 'Basque'},
      {id: 'btk', text: 'Batak'},
      {id: 'bej', text: 'Bedja'},
      {id: 'bem', text: 'Bemba'},
      {id: 'ben', text: 'Bengali'},
      {id: 'ber', text: 'Berbere'},
      {id: 'bho', text: 'Bhojpuri'},
      {id: 'bis', text: 'Bislama'},
      {id: 'bel', text: 'Bielorusse'},
      {id: 'bih', text: 'Bihari'},
      {id: 'bik', text: 'Bikol'},
      {id: 'byn', text: 'bilen ou blin'},
      {id: 'bin', text: 'Bini'},
      {id: 'bur', text: 'Birman'},
      {id: 'bla', text: "Blackfoot(= pied noir d'amerique"},
      {id: 'bos', text: 'Bosnian'},
      {id: 'bua', text: 'Buriat'},
      {id: 'bra', text: 'Braj'},
      {id: 'bre', text: 'Breton'},
      {id: 'bug', text: 'Bugi'},
      {id: 'bul', text: 'Bulgare'},
      {id: 'cad', text: 'Caddo'},
      {id: 'car', text: 'Caribe'},
      {id: 'cat', text: 'Catalan'},
      {id: 'cau', text: 'Caucasiennes (diverses)'},
      {id: 'ceb', text: 'Cebuano'},
      {id: 'cel', text: 'Celtiques (langues)'},
      {id: 'cmc', text: 'Chamic langues'},
      {id: 'cha', text: 'Chamorro'},
      {id: 'shn', text: 'chan'},
      {id: 'chr', text: 'Cherokee'},
      {id: 'chy', text: 'Cheyenne'},
      {id: 'chb', text: 'Chibcha'},
      {id: 'chi', text: 'Chinois'},
      {id: 'chn', text: 'Chinook'},
      {id: 'chp', text: 'Chipewyan'},
      {id: 'cho', text: 'Choctaw'},
      {id: 'chk', text: 'chuuk'},
      {id: 'cop', text: 'Copte'},
      {id: 'kor', text: 'Coreen'},
      {id: 'cor', text: 'Cornique'},
      {id: 'cos', text: 'Corse'},
      {id: 'cus', text: 'Couchitique'},
      {id: 'cre', text: 'Cree'},
      {id: 'cpe', text: 'Creoles et pidgins (anglais)'},
      {id: 'crp', text: 'Creoles et pidgins (diverses)'},
      {id: 'cpf', text: 'Creoles et pidgins (francais)'},
      {id: 'cpp', text: 'Creoles et pidgins (portugais)'},
      {id: 'scr', text: 'croate'},
      {id: 'dak', text: 'Dakota'},
      {id: 'dan', text: 'Danois'},
      {id: 'dar', text: 'dargwa'},
      {id: 'day', text: 'Dayak'},
      {id: 'del', text: 'Delaware'},
      {id: 'din', text: 'Dinka'},
      {id: 'dyu', text: 'dioula'},
      {id: 'mis', text: 'Diverses'},
      {id: 'chg', text: 'djaghatai'},
      {id: 'doi', text: 'Dogri'},
      {id: 'dgr', text: 'Dogrib'},
      {id: 'dua', text: 'Douala'},
      {id: 'dra', text: 'Dravidien'},
      {id: 'dzo', text: 'Dzongka'},
      {id: 'sco', text: 'Ecossais'},
      {id: 'efi', text: 'Efik'},
      {id: 'egy', text: 'Egyptien'},
      {id: 'eka', text: 'Ekajuk'},
      {id: 'elx', text: 'Elamite'},
      {id: 'myv', text: 'erza'},
      {id: 'den', text: 'esclave (athapascan)'},
      {id: 'spa', text: 'Espagnol'},
      {id: 'epo', text: 'Esperanto'},
      {id: 'est', text: 'Estonien'},
      {id: 'ewe', text: 'Ewe'},
      {id: 'ewo', text: 'Ewondo'},
      {id: 'fan', text: 'Fang'},
      {id: 'fat', text: 'Fanti'},
      {id: 'fao', text: 'Feroien'},
      {id: 'fij', text: 'Fidjien'},
      {id: 'fil', text: 'filipino ou pilipino'},
      {id: 'fiu', text: 'Finno-ougrien'},
      {id: 'fin', text: 'Finnois'},
      {id: 'fon', text: 'Fon'},
      {id: 'fre', text: 'Francais'},
      {id: 'fro', text: 'Francais (ancien)'},
      {id: 'frm', text: 'Francais (moyen)'},
      {id: 'fur', text: 'Friulian'},
      {id: 'fry', text: 'Frison'},
      {id: 'gaa', text: 'Ga'},
      {id: 'gla', text: 'Gaelique'},
      {id: 'glg', text: 'Galicien'},
      {id: 'orm', text: 'Galla'},
      {id: 'wel', text: 'Gallois'},
      {id: 'lug', text: 'ganda'},
      {id: 'gay', text: 'Gayo'},
      {id: 'gba', text: 'Gbaya'},
      {id: 'geo', text: 'Georgien'},
      {id: 'gem', text: 'Germaniques (diverses)'},
      {id: 'gon', text: 'Gond'},
      {id: 'gor', text: 'Gorontalo'},
      {id: 'got', text: 'Gothique'},
      {id: 'guj', text: 'Gujarati'},
      {id: 'grb', text: 'Grebo'},
      {id: 'grc', text: 'Grec ancien'},
      {id: 'gre', text: 'Grec moderne'},
      {id: 'kal', text: 'groenlandais'},
      {id: 'grn', text: 'Guarani'},
      {id: 'gez', text: 'guèze'},
      {id: 'gwi', text: "Gwich'in"},
      {id: 'hai', text: 'Haida'},
      {id: 'hat', text: 'haitien ou creole haitien'},
      {id: 'hau', text: 'Haoussa'},
      {id: 'haw', text: 'Hawaien'},
      {id: 'heb', text: 'Hebreu'},
      {id: 'her', text: 'Herero'},
      {id: 'hil', text: 'Hiligaynon'},
      {id: 'him', text: 'Himachali'},
      {id: 'hin', text: 'Hindi'},
      {id: 'hmo', text: 'Hiri Motu'},
      {id: 'hit', text: 'Hittite'},
      {id: 'hmn', text: 'Hmong'},
      {id: 'hun', text: 'Hongrois'},
      {id: 'hup', text: 'Hupa'},
      {id: 'sah', text: 'iakoute'},
      {id: 'iba', text: 'Iban'},
      {id: 'ido', text: 'Ido'},
      {id: 'ibo', text: 'Igbo'},
      {id: 'ijo', text: 'Ijo'},
      {id: 'ilo', text: 'Ilocano'},
      {id: 'und', text: 'Inconnue'},
      {id: 'cai', text: 'Indiennes (langues Amerique Centrale)'},
      {id: 'nai', text: "indiennes d'Amerique du Nord (autres langues)"},
      {id: 'sai', text: 'Indiennes (langues Amerique du sud)'},
      {id: 'inc', text: 'Indo-aryen (groupe)'},
      {id: 'ine', text: 'Indo-europeen (groupe)'},
      {id: 'ind', text: 'Indonesien'},
      {id: 'inh', text: 'Ingouche'},
      {id: 'ina', text: 'Interlingua'},
      {id: 'ile', text: 'Interlingue'},
      {id: 'iku', text: 'Inuktitut'},
      {id: 'ipk', text: 'Inupiaq'},
      {id: 'ira', text: 'Iraniennes (diverses)'},
      {id: 'gle', text: 'Irlandais'},
      {id: 'sga', text: 'Irlandais ancien (---1100)'},
      {id: 'mga', text: 'Irlandais moyen (ca. 1100-1500)'},
      {id: 'iro', text: 'Iroquois'},
      {id: 'ice', text: 'Islandais'},
      {id: 'ita', text: 'Italien'},
      {id: 'jpn', text: 'Japonais'},
      {id: 'jav', text: 'Javanais'},
      {id: 'jrb', text: 'Judeo-arabe'},
      {id: 'lad', text: 'judéo-espagnol'},
      {id: 'jpr', text: 'Judeo-persan'},
      {id: 'kbd', text: 'kabardien'},
      {id: 'kab', text: 'Kabyle'},
      {id: 'kac', text: 'Kachin'},
      {id: 'csb', text: 'kachoube'},
      {id: 'xal', text: 'kalmouk'},
      {id: 'kam', text: 'Kamba'},
      {id: 'kan', text: 'Kanara'},
      {id: 'kau', text: 'Kanouri'},
      {id: 'kaa', text: 'Karakalpak'},
      {id: 'krc', text: 'karatchai balkar'},
      {id: 'kar', text: 'Karen'},
      {id: 'kas', text: 'Kasmiri'},
      {id: 'kaw', text: 'Kawi'},
      {id: 'kaz', text: 'Kazakh'},
      {id: 'kha', text: 'Khasi'},
      {id: 'khm', text: 'Khmer'},
      {id: 'khi', text: 'Khoin (langues)'},
      {id: 'kho', text: 'Khotanais'},
      {id: 'kik', text: 'Kikuyu'},
      {id: 'kmb', text: 'Kimbundu'},
      {id: 'kir', text: 'Kirghiz'},
      {id: 'gil', text: 'kiribati'},
      {id: 'tlh', text: 'klingon'},
      {id: 'kom', text: 'Komi'},
      {id: 'kon', text: 'Kongo'},
      {id: 'kok', text: 'Konkani'},
      {id: 'kos', text: 'Kusaie'},
      {id: 'kum', text: 'Kumyk'},
      {id: 'kpe', text: 'Kpele'},
      {id: 'kro', text: 'Kru'},
      {id: 'kur', text: 'Kurde'},
      {id: 'kru', text: 'Kurukh'},
      {id: 'kut', text: 'Kutenai'},
      {id: 'kua', text: 'Kuanyama'},
      {id: 'lah', text: 'Lahnda'},
      {id: 'lam', text: 'Lamba'},
      {id: 'sgn', text: 'Langage gestuel'},
      {id: 'lao', text: 'Lao'},
      {id: 'lat', text: 'Latin'},
      {id: 'lav', text: 'Lette'},
      {id: 'lez', text: 'Lezgian'},
      {id: 'lim', text: 'limbourgeois'},
      {id: 'lin', text: 'Lingala'},
      {id: 'lit', text: 'Lituanien'},
      {id: 'lin', text: 'Lingala'},
      {id: 'lit', text: 'Lituanien'},
      {id: 'jbo', text: 'lojban'},
      {id: 'loz', text: 'Lozi'},
      {id: 'lub', text: 'Louba'},
      {id: 'lua', text: 'Luba-Lulua'},
      {id: 'lui', text: 'Luiseno'},
      {id: 'lun', text: 'Lunda'},
      {id: 'luo', text: 'Luo (Kenya et Tanzanie)'},
      {id: 'lus', text: 'Lushai'},
      {id: 'ltz', text: 'luxembourgeois'},
      {id: 'mac', text: 'Macedonien'},
      {id: 'mad', text: 'Madourais'},
      {id: 'mag', text: 'Magahi'},
      {id: 'mai', text: 'Maithili'},
      {id: 'mak', text: 'Makasar'},
      {id: 'may', text: 'Malais'},
      {id: 'mal', text: 'Malayalam'},
      {id: 'map', text: 'Malayo-polynesien'},
      {id: 'div', text: 'maldivien'},
      {id: 'mlg', text: 'Malgache'},
      {id: 'mlt', text: 'Maltais'},
      {id: 'mdr', text: 'Mandar'},
      {id: 'mnc', text: 'Manchu'},
      {id: 'man', text: 'Mande'},
      {id: 'mni', text: 'Manipuri'},
      {id: 'glv', text: 'Manx new'},
      {id: 'mno', text: 'Manobo'},
      {id: 'mao', text: 'Maori'},
      {id: 'mar', text: 'Marathi'},
      {id: 'chm', text: 'Mari'},
      {id: 'mah', text: 'Marshall'},
      {id: 'mwr', text: 'Marvari'},
      {id: 'mas', text: 'Masai'},
      {id: 'myn', text: 'Maya'},
      {id: 'men', text: 'Mende'},
      {id: 'mic', text: 'Micmac'},
      {id: 'min', text: 'Minangkabao'},
      {id: 'mwl', text: 'mirandais'},
      {id: 'moh', text: 'Mohawk'},
      {id: 'mdf', text: 'moksa'},
      {id: 'mol', text: 'Moldave'},
      {id: 'mkh', text: 'Mon Khmer (diverses)'},
      {id: 'lol', text: 'Mongo'},
      {id: 'mon', text: 'Mongol'},
      {id: 'mos', text: 'Mossi'},
      {id: 'mun', text: 'Mounda'},
      {id: 'mul', text: 'Multilingue'},
      {id: 'mus', text: 'Muskogee'},
      {id: 'nah', text: 'Nahuatl'},
      {id: 'nap', text: 'napolitain'},
      {id: 'nau', text: 'Nauru'},
      {id: 'nav', text: 'Navaho'},
      {id: 'nde', text: 'Ndebele (Zimbabwe)'},
      {id: 'nbl', text: 'Ndebele (Afrique du Sud)'},
      {id: 'ndo', text: 'Ndongo'},
      {id: 'dut', text: 'Neerlandais'},
      {id: 'dum', text: 'Neerlandais (moyen)'},
      {id: 'nep', text: 'Nepalais'},
      {id: 'new', text: 'Newari'},
      {id: 'nwc', text: 'newari classique'},
      {id: 'nia', text: 'Nias'},
      {id: 'nic', text: 'Nigero-congolais'},
      {id: 'ssa', text: 'Nilo-saharien (groupe)'},
      {id: 'niu', text: 'Niuean'},
      {id: 'nog', text: 'nogai ou nogay'},
      {id: 'non', text: 'Norrois vieux'},
      {id: 'nor', text: 'Norvegien'},
      {id: 'nob', text: 'Norvegien Bokmal'},
      {id: 'nno', text: 'Norvegien Nynorsk'},
      {id: 'nub', text: 'Nubien'},
      {id: 'nym', text: 'Nyamwezi'},
      {id: 'nya', text: 'Nyanja'},
      {id: 'nyn', text: 'Nyankole'},
      {id: 'nyo', text: 'Nyoro'},
      {id: 'nzi', text: 'Nzima'},
      {id: 'oci', text: 'Occitan'},
      {id: 'oji', text: 'Ojibwa'},
      {id: 'ori', text: 'Oriya'},
      {id: 'osa', text: 'Osage'},
      {id: 'oss', text: 'Ossete'},
      {id: 'oto', text: 'Otomang'},
      {id: 'udm', text: 'oudmourte'},
      {id: 'uga', text: 'Ougaritique'},
      {id: 'uig', text: 'Ouigour'},
      {id: 'urd', text: 'ourdu'},
      {id: 'uzb', text: 'Ouzbek'},
      {id: 'pus', text: 'Pachto'},
      {id: 'pal', text: 'Pahlavi'},
      {id: 'pau', text: 'Palauan'},
      {id: 'pli', text: 'Pali'},
      {id: 'pam', text: 'Pampanga'},
      {id: 'pag', text: 'Pangasinan'},
      {id: 'pap', text: 'Papiamento'},
      {id: 'paa', text: 'Papou'},
      {id: 'pan', text: 'Penjabi'},
      {id: 'per', text: 'Persan moderne'},
      {id: 'peo', text: 'Perse ancien (600-400 av. J.C.)'},
      {id: 'ful', text: 'peul'},
      {id: 'phn', text: 'Phoenician'},
      {id: 'phi', text: 'Pilipino langues (autre)'},
      {id: 'pon', text: 'Pohnpei'},
      {id: 'pol', text: 'Polonais'},
      {id: 'por', text: 'Portugais'},
      {id: 'pra', text: 'Prakrit'},
      {id: 'pro', text: 'Provencal (avant 1500)'},
      {id: 'que', text: 'Quechua'},
      {id: 'raj', text: 'Rajasthani'},
      {id: 'rap', text: 'Rapanui'},
      {id: 'rar', text: 'Rarotonga'},
      {id: 'roh', text: 'Rhetoroman (groupe)'},
      {id: 'roa', text: 'Romanes (diverses)'},
      {id: 'rum', text: 'Roumain'},
      {id: 'run', text: 'Rundi'},
      {id: 'rus', text: 'Russe'},
      {id: 'kin', text: 'rwanda'},
      {id: 'sal', text: 'Salish (famille)'},
      {id: 'sam', text: 'Samaritain'},
      {id: 'smi', text: 'Sami'},
      {id: 'smi', text: 'ex lapon'},
      {id: 'smn', text: "Sami d'Inari"},
      {id: 'smj', text: 'Sami de Lule'},
      {id: 'sme', text: 'Sami du Nord'},
      {id: 'sma', text: 'Sami du Sud'},
      {id: 'sms', text: 'Sami Skolt'},
      {id: 'smo', text: 'Samoa'},
      {id: 'sad', text: 'Sandawe'},
      {id: 'sag', text: 'Sango'},
      {id: 'san', text: 'Sanskrit'},
      {id: 'sat', text: 'Santali'},
      {id: 'srd', text: 'Sardinian'},
      {id: 'sas', text: 'Sasak'},
      {id: 'sel', text: 'Selkoup'},
      {id: 'sem', text: 'Semitiques (diverses)'},
      {id: 'scc', text: 'Serbe'},
      {id: 'srr', text: 'Serere'},
      {id: 'sna', text: 'Shona'},
      {id: 'scn', text: 'sicilien'},
      {id: 'sid', text: 'Sidamo'},
      {id: 'snd', text: 'Sindhi'},
      {id: 'sin', text: 'Singhalais'},
      {id: 'sit', text: 'Sino-tibetaines (langues)'},
      {id: 'sio', text: 'Siou (famille)'},
      {id: 'sla', text: 'Slaves (diverses)'},
      {id: 'chu', text: "Slavon d'eglise"},
      {id: 'slo', text: 'Slovaque'},
      {id: 'slv', text: 'Slovene'},
      {id: 'sog', text: 'Sogdien'},
      {id: 'som', text: 'Somali'},
      {id: 'son', text: 'Songhai'},
      {id: 'snk', text: 'Soninke'},
      {id: 'dsb', text: 'sorabe (bas)'},
      {id: 'hsb', text: 'sorabe (haut)'},
      {id: 'wen', text: 'sorabes (langues)'},
      {id: 'sot', text: 'Sotho du Sud'},
      {id: 'nso', text: 'Sotho du Nord'},
      {id: 'sun', text: 'Soundanais'},
      {id: 'sus', text: 'Soussou'},
      {id: 'swe', text: 'Suedois'},
      {id: 'suk', text: 'Sukuma'},
      {id: 'sux', text: 'Sumerien'},
      {id: 'swa', text: 'Swahili'},
      {id: 'ssw', text: 'Swazi'},
      {id: 'syr', text: 'Syriaque'},
      {id: 'tgk', text: 'Tadjik'},
      {id: 'tgl', text: 'Tagalog'},
      {id: 'tah', text: 'Tahitien'},
      {id: 'tmh', text: 'Tamashek'},
      {id: 'tam', text: 'Tamoul'},
      {id: 'tat', text: 'Tatar'},
      {id: 'crh', text: 'tatar de Crime'},
      {id: 'cze', text: 'Tcheque'},
      {id: 'che', text: 'Tchetchene'},
      {id: 'chv', text: 'Tchouvache'},
      {id: 'tel', text: 'Telugu'},
      {id: 'tem', text: 'Temne'},
      {id: 'ter', text: 'Tereno'},
      {id: 'tet', text: 'Tetum'},
      {id: 'tha', text: 'Thai'},
      {id: 'tai', text: 'Thai langues (autre)'},
      {id: 'tib', text: 'Tibetain'},
      {id: 'tig', text: 'Tigre'},
      {id: 'tir', text: 'Tigrina'},
      {id: 'tiv', text: 'Tiv'},
      {id: 'tli', text: 'Tlingit'},
      {id: 'tpi', text: 'Tok Pisin'},
      {id: 'tkl', text: 'Tokelau'},
      {id: 'tog', text: 'Tonga'},
      {id: 'ton', text: 'Tonga (polynesien)'},
      {id: 'tyv', text: 'Touva'},
      {id: 'rom', text: 'tsigane'},
      {id: 'tsi', text: 'Tsimshian'},
      {id: 'tso', text: 'Tsonga'},
      {id: 'tsn', text: 'Tswana'},
      {id: 'tum', text: 'Tumbuka'},
      {id: 'tup', text: 'Tupi (langues)'},
      {id: 'tur', text: 'Turc'},
      {id: 'ota', text: 'Turc ottoman (ecriture arabe)'},
      {id: 'tuk', text: 'Turkmene'},
      {id: 'tvl', text: 'Tuvalu'},
      {id: 'twi', text: 'Twi'},
      {id: 'ukr', text: 'Ukrainien'},
      {id: 'umb', text: 'Umbuntu'},
      {id: 'vai', text: 'Vai'},
      {id: 'ven', text: 'Venda'},
      {id: 'vie', text: 'Vietnamien'},
      {id: 'vol', text: 'Volapuk'},
      {id: 'vot', text: 'Vote'},
      {id: 'wak', text: 'Wakash (groupe)'},
      {id: 'wal', text: 'Walamo'},
      {id: 'wln', text: 'Wallon'},
      {id: 'war', text: 'Waray'},
      {id: 'was', text: 'Washo'},
      {id: 'wol', text: 'Wolof'},
      {id: 'xho', text: "X'hosa"},
      {id: 'sah', text: 'Yakut'},
      {id: 'yao', text: 'Yao'},
      {id: 'yap', text: 'Yap'},
      {id: 'iii', text: 'yi de Sichuan'},
      {id: 'yid', text: 'Yiddish'},
      {id: 'yor', text: 'Yoruba'},
      {id: 'ypk', text: 'Yupik langages'},
      {id: 'znd', text: 'Zande'},
      {id: 'zap', text: 'Zapoteque'},
      {id: 'zen', text: 'Zenaga'},
      {id: 'zha', text: 'Zhuang'},
      {id: 'zul', text: 'Zoulou'},
      {id: 'zun', text: 'Zuni'},
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

   get internalBlocOperator(): Ensemble {
      return this._internalBlocOperator;
   }

   set internalBlocOperator(value: Ensemble) {
      this._internalBlocOperator = value;
   }

   get langueEntered(): Array<ListProvider> {
      return this._langueEntered;
   }

   set langueEntered(value: Array<ListProvider>) {
      this._langueEntered = value;
   }

   public langueStringArrayClean(): void {
      this._langueEntered = [];
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

   get langueListe(): Array<ListProvider> {
      return this._langueListe;
   }

   set langueListe(value: Array<ListProvider>) {
      this._langueListe = value;
   }
}
