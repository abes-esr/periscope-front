import Notice from '@/store/classes/resultatsDeRecherche/Notice';
import {JsonTraitements} from '@/store/classes/traitements/JsonTraitements';
import {EndInterval, Interval} from '@/store/interfaces/VisualisationInterface';
import _ from 'lodash';
//https://visjs.github.io/vis-timeline/examples/timeline/groups/nestedThreeLevels.html

/**
 * Classe permettant d'alimenter l'état de collection d'une notice
 */
export class HoldingsTraitements {
   /**
    * Fonction de plus haut niveau qui boucle sur chaque exemplaire pour en récupérer l'état de collection
    * @param arrayOfRcrEpn Array with all Rcr and Epn for One Notice (type object)
    * @param jsonDataHoldings Json with contains all RcrEpn at the top level and the associated sub-information
    */
   static buildCollectionStateForAllRcrEpnOfNotice(arrayOfRcrEpn: any, jsonDataHoldings: any) {
      const myHashTable = {};

      for (const oneRcrEpnElement in arrayOfRcrEpn) {
         let indexOfIdInFinalObjects = 1;
         const processed = HoldingsTraitements.buildCollectionStateForOneRcrEpn(jsonDataHoldings[oneRcrEpnElement], oneRcrEpnElement, myHashTable, indexOfIdInFinalObjects);
      }
   }

   /**
    * Fonction qui construit l'ensemble de l'état pour un exemplaire
    * @param subJsonOfOneRcrEpn part of Json under Rcr:Epn string, who contains intervals (part of collection held), missings (gaps (=lacunes) reported, and all data for one "Exemplaire"
    * @param jsonKey the Rcr:Epn in string (= 1 exemplaire)
    * @param indexOfIdInFinalObjects numero de l'id des éléments envoyés à la librairie de visualisation de timeline
    */
   static buildCollectionStateForOneRcrEpn(subJsonOfOneRcrEpn: any, jsonKey: string, myHashTable: any, indexOfIdInFinalObjects: number) {
      let blue;
      let start;
      const debut = Number.NEGATIVE_INFINITY;

      let lacuneIntraYear = false; //Lacunes sur une année donnée ??
      let auMoinsUneLacIntra = false;

      let periodes = []; //Tableau des periodes pour un exemplaire
      let finalTextInInfobulle = '';

      const overrideOfOneRcrEpn = subJsonOfOneRcrEpn['override']; //TODO tmx, a quoi correspond override
      const missings959rOfOneRcrEpn = subJsonOfOneRcrEpn['missings959r']; //Aggregation des sous zones de la 959 UNMA au format texte de signalement de lacunes
      const loc316aOfOneRcrEpn = subJsonOfOneRcrEpn['loc316a']; //Zone de lacunes, au format texte, récupérée directement depuis le webservices Holdings (note sur l'exemplaire, à titre exceptionnel)
      //Booleen a adapter en typescript
      const fullacuneOfOneRcrEpn = subJsonOfOneRcrEpn.hasOwnProperty('gap'); //Zone de saisie libre au format texte de signalement de lacunes en %
      const commentsOfOneRcrEpn = subJsonOfOneRcrEpn['comments']; //Zone de saisie libre, commentaire sur la collection

      const arrayOfstartYearsInIntervalOfOneRcrEpnRaw = Object.keys(subJsonOfOneRcrEpn['intervals']); //Récupération de toutes les dates de début de la rubrique interval d'un Rcr:epn du json
      const arrayOfstartYearsInIntervalOfOneRcrEpnSorted = arrayOfstartYearsInIntervalOfOneRcrEpnRaw.sort(); //Tri des dates de début par ordre croissant

      const intras = {};

      const arrayWhichContainsErrorMessagesForDates = [];

      //Parcours des intervalles dates de début pour reconstruire état de collection et déterminer présence de lacunes
      arrayOfstartYearsInIntervalOfOneRcrEpnSorted.forEach((startYearSingleElement) => {
         const partOfJsonWithAllEndYearElementsForOneStartYear = subJsonOfOneRcrEpn['intervals'][startYearSingleElement]; //endings contient le sousJson avec les informations relatives à la fin d'une période déclarée (date ou plusieurs dates pour une date de début et informations complémentaires)

         //Si la date de début n'est pas au format YYYY, alimentation d'un message d'erreur dans le tableau des erreurs
         const regexWhichMatchYearInFourDigits = new RegExp('^\\d{4}$');
         if (!regexWhichMatchYearInFourDigits.test(startYearSingleElement)) {
            arrayWhichContainsErrorMessagesForDates[arrayWhichContainsErrorMessagesForDates.length] = 'format date incorrect : ' + startYearSingleElement + ' sur exemplaire ' + jsonKey;
         }

         const debut = parseInt(startYearSingleElement); //Mise de la date de début de l'intervalle dans une constante

         //Si la table qui stocke les périodes de intervals d'un exemplaire possède déja la période en cours de parcours
         if (myHashTable.hasOwnProperty(startYearSingleElement)) {
            //période deja existant dans la table, on lui rajoute la nouvelle période
            periodes = myHashTable[startYearSingleElement]['periodes'];
         } else {
            //période non présente dans la table, on crée un nouveau tableau pour représenter cette période
            periodes = [];
         }
         //Parcours des dates de fin, qui sont sous arbre d'une date de début (une date de début peut avoir une date de fin, pas de date de fin, plusieurs dates de fin)
         finalTextInInfobulle = finalTextInInfobulle + HoldingsTraitements.passageOnTheEndDates(debut, partOfJsonWithAllEndYearElementsForOneStartYear);

         const arrayEndYearsUnderOneStartYear = Object.keys(partOfJsonWithAllEndYearElementsForOneStartYear); //Tableau des dates de fin, recupère toutes les dates de fin situées sous une date de debut
         let endDate = "2147483647"; //Par défaut, on dit qu'il n'y a pas de date de fin

         for (const index in arrayEndYearsUnderOneStartYear) {
            lacuneIntraYear = false;

            endDate = arrayEndYearsUnderOneStartYear[index];
            if (!regexWhichMatchYearInFourDigits.test(endDate)) {
               arrayWhichContainsErrorMessagesForDates[arrayWhichContainsErrorMessagesForDates.length] = 'format date incorrect : ' + index + ' ex ' + jsonKey;
            }

            const laoulesfins = partOfJsonWithAllEndYearElementsForOneStartYear[endDate];
            if (laoulesfins instanceof Array) {
               //multiples identical time series means local lacks !
               lacuneIntraYear = true;
               auMoinsUneLacIntra = true;
            }

            let newSlice;
            const className = lacuneIntraYear ? 'blue' : 'red';

            if (endDate === '2147483647') {
               newSlice = new Object({
                  'id' : indexOfIdInFinalObjects++,
                  'start': debut.toString() + '-01-01',
                  'end': '2147483647',
                  'className': className,
                  'type': 'range',
               });
            } else {
               newSlice = new Object({
                  'id' : indexOfIdInFinalObjects++,
                  'start': debut.toString() + '-01-01',
                  'end': endDate + '-12-31',
                  'className': className,
                  'type': 'range',
               });
            }

            periodes.push(newSlice);
            if (newSlice['lac'] === true) {
               //console.log('intra lacune '+newSlice['d']+'-'+newSlice['f'])
               intras[newSlice['d']] = 1;

            }


         }
         if (debut === Number.NEGATIVE_INFINITY) {
            //stocker la cle5 pour examen en fin de boucle
            noStartDate.push(cle5);
         }
         //updates known limits
         if (debut < datamin) {
            datamin = debut;
         }


         if (myHashtable.hasOwnProperty(cle5)) {
            myHashtable[cle5]['periodes'] = periodes;
            myHashtable[cle5]['fullacune'] = fullacune;
         } else {
            myHashtable[cle5] = new Object({
               periodes: periodes,
               textetatcollection: '',
               fullacune: fullacune,
               pcp: aaData['pcp'],
               papc: aaData['papc']
            });
            g_element_count++;
         }

      });
   }

   /**
    * Parcours des dates de fin d'un exemplaire, qui va construire une partie de la chaine finale à partir de toutes les dates de debut des intervalles
    * Passage sur la partie du json directement sous une date de début qui fait partie d'une intervalle d'un exemplaire, qu'importe sa structure.
    * @param startYearElement La date de debut de l'intervalle
    * @param partOfJsonWithAllEndYearElementsAttachedToStartYearElement la structure située sous une date de début, comportant une ou plusieurs dates de fin
    */
   static passageOnTheEndDates(startYearElement: number, partOfJsonWithAllEndYearElementsAttachedToStartYearElement: any): string {
      let collectionStatusOfItem = ''; //Chaine de caractère concaténée des intervales d'un exemplaire qui seront affiché dans une infobulle
      const arrayOfEndKeys = Object.keys(partOfJsonWithAllEndYearElementsAttachedToStartYearElement); //Un tableau contenant les différentes dates de fin situées directement sous une date de début
      let arrayOfEndKeysSorted: string[] = []; //Le tableau des dates de fin triées par ordre croissant

      //Si il y a des dates de début directement situées sous les dates de fin qui ont été trouvées
      if (arrayOfEndKeys !== undefined) {
         arrayOfEndKeysSorted = arrayOfEndKeys.sort(); //Tri des dates de fin et mise dans un nouveau tableau trié
      }

      //Boucle sur les dates de fin d'une date de début
      for (const endDate in arrayOfEndKeysSorted) {
         const partOfJsonUnderOneEndDate = arrayOfEndKeysSorted[endDate]; //Récupération de la structure située sous une date de fin
         const timeSlice = partOfJsonWithAllEndYearElementsAttachedToStartYearElement[partOfJsonUnderOneEndDate]; //La structure située sous une date de fin, qui peut être un objet ou un tableau d'objets
         const end = parseInt(partOfJsonUnderOneEndDate); //On transforme cette partie en nombre, à partir d'ici plus besoin d'accès clé indice (?)

         //Analyse de la structure située sous une date de fin, est-elle un objet ou un tableau d'objets ?
         //Si la structure sous la date de fin est un tableau de dates de fin
         if (timeSlice instanceof Array) {
            //TMX bugfix with new DB table autorites.V_NOTICESBIBIO_TRI no respect 955 "natural" see ppn 037577409 year 1975 examplar 341292301:41252988201
            let sortedTimeSlice = []; //Tableau des dates de fin trié
            //TODO risque d'erreur sur la librairie utilisant cette fonction anonyme
            //Tri des élements d'un tableau de dates de fin par le startNo qui compose chacun des éléments Date de fin
            sortedTimeSlice = _.sortBy(timeSlice, function (o: {[x: string]: string}) {
               if (o['startNo'] !== undefined) {
                  return parseInt(o['startNo']);
               } else return 0;
            });
            for (let index = 0; index < sortedTimeSlice.length; index++) {
               collectionStatusOfItem = collectionStatusOfItem + HoldingsTraitements.timeSliceFormatHelper(startYearElement, end, sortedTimeSlice[index], true);
            }
            //Sinon si la structure sous la date de fin est directement un objet
         } else {
            collectionStatusOfItem = collectionStatusOfItem + HoldingsTraitements.timeSliceFormatHelper(startYearElement, end, timeSlice, true);
         }
      }
      return collectionStatusOfItem;
   }

   /**
    * Fonction qui constuit la chaine de l'état de collection utilisée dans une info-bulle
    * @param start date de debut d'un intervalle
    * @param end date de fin d'un intervalle
    * @param timeslice La structure située sous une date de fin, qui est ici obligatoirement un objet, contenant les précisions type startVOl, endVol
    * @param localgap Un flag qui permet de savoir si on est dans un objet ou dans un tableau d'objet
    */
   static timeSliceFormatHelper(start: number, end: number, timeslice: any, localgap: boolean) {
      let collectionStatusOfItem = '';

      const startVol = timeslice['startVol'];
      const startNo = timeslice['startNo'];
      const startMonth = timeslice['startMonth'];
      const startDay = timeslice['startDay'];
      const endVol = timeslice['endVol'];
      const endNo = timeslice['endNo'];
      const endMonth = timeslice['endMonth'];
      const endDay = timeslice['endDay'];

      const altYearDebut = timeslice['altYearDebut'];
      const altYearEnd = timeslice['altYearEnd'];

      let txtStart = '';
      let txtEnd = '';

      if (altYearDebut) {
         txtStart = '' + altYearDebut;
      } else {
         txtStart = '' + start;
      }

      if (altYearEnd) {
         txtEnd = '' + altYearEnd;
      } else {
         txtEnd = '' + end;
      }

      if (startMonth) {
         txtStart = startMonth + '-' + txtStart;
         if (startDay) {
            txtStart = startDay + '-' + txtStart;
         }
      }

      if (endMonth) {
         txtEnd = endMonth + '-' + txtEnd;
         if (endDay) {
            txtEnd = endDay + '-' + txtEnd;
         }
      }

      if (start === end) {
         if (endVol === undefined && endNo === undefined && endMonth === undefined && endDay === undefined) {
            if (startVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + startVol + ' ';
            if (startNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + startNo + ' ';
            collectionStatusOfItem = collectionStatusOfItem + '(' + txtStart + ') ;';
         } else {
            if (startVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + startVol + ' ';
            if (startNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + startNo + ' ';
            collectionStatusOfItem = collectionStatusOfItem + '(' + txtStart + ') - ';
            if (endVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + endVol + ' ';
            if (endNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + endNo + ' ';

            collectionStatusOfItem = collectionStatusOfItem + '(' + txtEnd + ') ;';
         }
      } else {
         if (end === 2147483647) { // a surveiller cela doit faire 2147483647, holdings produit cette valeur dans le json retourné quand une date de debut n'a pas de date de fin
            if (startVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + startVol + ' ';
            if (startNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + startNo + ' ';
            collectionStatusOfItem = collectionStatusOfItem + '(' + txtStart + ')-....';
         } else {
            if (startVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + startVol + ' ';
            if (startNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + startNo + ' ';
            collectionStatusOfItem = collectionStatusOfItem + '(' + txtStart + ') - ';
            if (endVol) collectionStatusOfItem = collectionStatusOfItem + 'vol. ' + endVol + ' ';
            if (endNo) collectionStatusOfItem = collectionStatusOfItem + 'no. ' + endNo + ' ';

            collectionStatusOfItem = collectionStatusOfItem + '(' + txtEnd + ') ;';
         }
      }

      //Si la structure de fin est un tableau d'objet
      if (localgap) {
         collectionStatusOfItem = '<font color="#D2691E">' + collectionStatusOfItem + '</font>';
      } else {
         if (start > end) {
            //inversion
            collectionStatusOfItem = '<font color="#BBBBBB">' + collectionStatusOfItem + '</font>';
         }
      }

      return collectionStatusOfItem;
   }

   //TODO abandon actuellement algorithme trop complexe
   /**
    * Algorithme récursif permettant de parcourir un JSON et ces sous niveaux.
    * @param jsonData Le json, de type objet
    * @param jsonLevel Le niveau de la donnée. Passer 1 en argument de la fonction pour obtenir 0 sur le niveau initial,
    * -1 sur le premier sous niveau, -2 sur le deuxième sous niveau, etc
    *
    * Arguments internes à la fonction :
    * key = la valeur de gauche d'un couple de donnée, "l'étiquette", le libellé
    * jsonData[key] = la valeur de droite d'un couple de donnée, la valeur de la donnée
    *
    * Quand la valeur d'un couple de donnée est de type objet, on rapelle la fonction
    */
   static recursiveJsonParsing(jsonData: any, jsonLevel: number, parentKeyArg: string, parentRubrique: string): void {
      //console.log(JsonTraitements.jsonParserAndReturnFirstLevelOnlyInArray(jsonData, ','));
      //console.log(JsonTraitements.jsonParserAndReturnFirstLevelOnlyInArray(jsonData.holdings, '":"","'));
      jsonLevel -= 1; //Le niveau dans le json auquel se situe la donnée. 0 étant le niveau le plus haut.
      const parentKey = parentKeyArg; //La valeur de la clé parente
      let rubrique = parentRubrique;
      if (parentKeyArg === 'missings' || parentKeyArg === 'intervals') {
         rubrique = parentKey;
      }

      console.log(jsonData['holdings']['010532201:122874595']);

      for (const key in jsonData) {
         //Construction des intervals

         //TODO à isoler dans une fonction séparée
         if (key === 'intervals') {
            console.log('LGHT' + jsonData[key]);
            if (jsonData[key].length !== undefined) {
               for (const keysStartYearIntervals in jsonData[key]) {
                  for (const keysEndYearInterval in jsonData[key][keysStartYearIntervals]) {
                     if (jsonData[key][keysStartYearIntervals][keysEndYearInterval].length !== undefined) {
                        for (const keysDetailsInterval in jsonData[key][keysStartYearIntervals][keysEndYearInterval]) {
                           console.log('INT_DET->' + keysDetailsInterval + jsonData[key][keysStartYearIntervals][keysEndYearInterval][keysDetailsInterval]);
                        }
                     }
                  }
                  //const interval = <Intervals>{startYear : '', endYear : '', endYearDetails: [], startYearDetails: []};
                  //interval.startYear = keysIntervals;
               }
            }
         }

         //console.log(jsonLevel + ':' + key + ':' + jsonData[key] + '(p)' + parentKey + '(r)' + parentRubrique);
         if (jsonData[key] instanceof Object && key !== 'intervals') {
            //et cle différent de 'intervals', 'missings', etc
            HoldingsTraitements.recursiveJsonParsing(jsonData[key], jsonLevel, key, rubrique);
            // JsonTraitements.jsonParserAndReturnFirstLevelOnlyInArray(jsonData[key], ',');
         }
      }
   }

   static constructionOfIntervalsPartInJson(jsonDataIntervals: any) {
      const intervalArray: Array<Interval> = [];
      const interval = <Interval>{};
      let number = 0;
      for (const keysStartYearInterval in jsonDataIntervals) {
         interval.startYear = keysStartYearInterval;
         for (const keysEndYearInterval in jsonDataIntervals[keysStartYearInterval]) {
            interval.endYear = keysEndYearInterval;
            if (JSON.stringify(jsonDataIntervals[keysStartYearInterval][keysEndYearInterval]).length > 2) {
               //Si la taille du JSON est supérieur à 2, alors il y a des informations complémentaires à la date de fin (objet non vide
               //TODO
               for (const object in jsonDataIntervals[keysStartYearInterval][keysEndYearInterval]) {
               }
            } else {
               intervalArray.push(interval);
            }
         }
         console.log('passage' + number);
         number += 1;
      }
      console.log(intervalArray);
   }

   /*Code Thomas
   static buildDataModel(newjson: any) {
      //var globales sur l'ensemble des exemplaires
      let datamin = Number.POSITIVE_INFINITY;
      let myHashtable = {}; //TODO TMX change to a map of items instead of an object of items
      g_element_count = 0; //reset
      const data = newjson['aaData']; //TODO TMX change to a map of items instead of an object of items

      let noStartDate = [];

      //store for tracing
      g_incorrectTimeRangeMsg = [];

      const jsonkeys = Object.keys(data);
      //use iterator json results
      for (const i in jsonkeys) {
         const processed = HoldingsTraitements.processExemplaires(data[jsonkeys[i]], jsonkeys[i], myHashtable, datamin, noStartDate);
         myHashtable = processed['myHashtable'];
         datamin = processed['datamin'];
         noStartDate = processed['noStartDate'];
      }
      if (newjson.iTotalRecords === 0) {
         alert('Pas d\'exemplaire déclaré sur ce titre');
         return null;
      }
      if (!g_element_count > 0) {
         //localized but maybe, no collection state, we exit !
         alert('Pas d\'état de collection déclaré sur ce titre');
         return null;
      }
      if (datamin === Number.POSITIVE_INFINITY) {
         alert('erreur indéfinie !');
      }
      if (noStartDate.length > 0) {
         myHashtable = cleanNoStartDate(myHashtable, noStartDate);
      }
      const retour: Nom = new class implements Nom {
         datamax: any;
         datamin: any;
         exemplaires: any;
      };
      retour['exemplaires'] = myHashtable;
      if (datamin === Number.NEGATIVE_INFINITY) {
         datamin = newjson.pubyearstart;
      }
      retour['datamin'] = datamin;
      retour['datamax'] = newjson.pubyearend;
      return retour;
   }
   */

   /**
    *
    * - add a record in the datamodel hashtable
    * - if needed, update datamin (= earliest known start date)
    * - if needed, update noStartDate list of "open on left" time range = with no start date
    * @param aaData
    * @param cle5
    * @param myHashtable
    * @param datamin
    * @param noStartDate
    *
    */
   /*static processExemplaires(aaData, cle5, myHashtable, datamin, noStartDate) {
      let blue;
      let start;
      let debut = Number.NEGATIVE_INFINITY;

      let lacuneIntraYear = false;
      let auMoinsUneLacIntra = false;

      let periodes = [];
      let s = '';

      const override = aaData['override'];
      const missings959r = aaData['missings959r'];
      const loc316a = aaData['loc316a'];
      let fullacune = aaData.hasOwnProperty('gap');
      const comments = aaData['comments'];

      const keysdebut = Object.keys(aaData['intervals']);
      const sorted = keysdebut.sort();

      const intras = {};


      // parcours des intervalles dates de début
      // pour reconstruire état de collection
      // et déterminer la présence de lacunes
      sorted.forEach(function (element) {
         start = element;
         const endings = aaData['intervals'][start];
         if (!YEAR_REGEXP.test(start)) {
            g_incorrectTimeRangeMsg[g_incorrectTimeRangeMsg.length] = 'format date incorrect : ' + start + ' ex ' + cle5;
         }
         debut = parseInt(start);
         if (myHashtable.hasOwnProperty(cle5)) {
            //exemplaire existant, on enrichit en ajoutant la nouvelle période
            periodes = myHashtable[cle5]['periodes'];
         } else {
            periodes = [];
         }
         // parcours des dates de fin
         s = s + endingsFormatHelper(debut, endings);

         const keysend = Object.keys(endings);
         let fin = Number.POSITIVE_INFINITY;

         for (let j in keysend) {

            lacuneIntraYear = false;

            fin = keysend[j];
            if (!YEAR_REGEXP.test(fin)) {
               g_incorrectTimeRangeMsg[g_incorrectTimeRangeMsg.length] = 'format date incorrect : ' + j + ' ex ' + cle5;
            }

            const laoulesfins = endings[fin];
            if (laoulesfins instanceof Array) {
               //multiples identical time series means local lacks !
               lacuneIntraYear = true;
               auMoinsUneLacIntra = true;
            }

            fin = parseInt(fin);

            let newSlice;

            if (fin === MAX_INT_SERVER) {

               newSlice = new Object({
                  'd': debut,
                  'f': Number.POSITIVE_INFINITY,
                  'lac': lacuneIntraYear
               });

            } else {

               newSlice = new Object({
                  'd': debut,
                  'f': fin,
                  'lac': lacuneIntraYear
               });


            }

            periodes.push(newSlice);
            if (newSlice['lac'] === true) {
               //console.log('intra lacune '+newSlice['d']+'-'+newSlice['f'])
               intras[newSlice['d']] = 1;

            }


         }
         if (debut === Number.NEGATIVE_INFINITY) {
            //stocker la cle5 pour examen en fin de boucle
            noStartDate.push(cle5);
         }
         //updates known limits
         if (debut < datamin) {
            datamin = debut;
         }


         if (myHashtable.hasOwnProperty(cle5)) {
            myHashtable[cle5]['periodes'] = periodes;
            myHashtable[cle5]['fullacune'] = fullacune;
         } else {
            myHashtable[cle5] = new Object({
               periodes: periodes,
               textetatcollection: '',
               fullacune: fullacune,
               pcp: aaData['pcp'],
               papc: aaData['papc']
            });
            g_element_count++;
         }
      });


      /!**
       * DEBUT DE PRISE EN COMPTE DES EVENTUELLES 959
       *!/
      let stack = new Stack();
      periodes.reduce(mergeReduce, stack);

      if (auMoinsUneLacIntra === true || (aaData.hasOwnProperty('missings') )) {
         fullacune = false;
      }


      if (fullacune === false) {
         //if not fulllacune and exists 959, use stack to list maximum intervals, in ordered array and build balanced BST with createMinHeightBST().
         // Then we can repopulate "periodes" array with (maximized 959 + intra year gap)=orange and searchRange of BST between 2 consecutide 959=blue


         const noverlap = stack.toArray();

         const flatten = [];

         noverlap.forEach(function (element) {
            flatten.push([element.d, element.f]);
         });




         const BST = new BinarySearchTree();
         BST.createMinHeightBST(flatten);


         //obtenir la liste des lacunes
         let keysmissingsdebut = [];
         if (aaData.hasOwnProperty('missings')) {
            keysmissingsdebut = Object.keys(aaData['missings']);
         }

         //console.log(cle5);

         //inserer les cles des lacunes intra year avant le tri
         const intrasKeys = Object.keys(intras);
         for (let i in intrasKeys) {
            keysmissingsdebut.push(intrasKeys[i]);
         }

         const sortedmissings = keysmissingsdebut.sort();

         const manquantes = [];
         sortedmissings.forEach(function (element) {
            start = element;
            let ending = undefined;

            if (aaData['missings']) {
               ending = aaData['missings'][start];
            }

            if (ending === undefined) {
               //console.log('pas de fin pour intra year '+start);
               //on simule l intra year manquante
               manquantes.push({
                  'd': parseInt(start),
                  'f': parseInt(start)
               });
            }

            else {
               const keyend = Object.keys(ending);
               manquantes.push({
                  'd': parseInt(start),
                  'f': parseInt(keyend[0])
               });
            }


         });
         //faire un merge des diferentes 959
         stack = new Stack();
         manquantes.reduce(mergeReduce, stack);

         const maxGapNOverlap = stack.toArray();

         //parcours des lacunes (orange) avec reconstruction des slice intercalaires (bleu) trouvées par searchRange
         let low = Number.NEGATIVE_INFINITY;
         let high = Number.POSITIVE_INFINITY;




         periodes = [];


         maxGapNOverlap.forEach(function (element) {

            high = element.d;
            blue = [];
            BST.searchRange(BST.root, [(low + 1), (high - 1)], blue);

            if (blue.length > 0) {
               for (let j in blue) {
                  //console.log('blue:('+blue[j][0]+'-'+blue[j][1]+')');
                  periodes.push({
                     'd': blue[j][0],
                     'f': blue[j][1],
                     'lac': false
                  });
               }
            }

            low = element.f;
            //console.log('orange:('+high+' '+low+')');
            periodes.push({
               'd': high,
               'f': low,
               'lac': true
            });
         });

         //last
         blue = [];
         if ((low + 1) <= g_currentYear) {//(end of last lack) <= g_currentYear
            BST.searchRange(BST.root, [(low + 1), Number.POSITIVE_INFINITY], blue);

            if (blue.length > 0) {
               for (let j in blue) {
                  //console.log('blue:('+blue[j][0]+'-'+blue[j][1]+')');
                  periodes.push({
                     'd': blue[j][0],
                     'f': blue[j][1],
                     'lac': false
                  });
               }
            }
         }


         /!**
          * !!! mettre à jour !!!
          *!/
         if (myHashtable.hasOwnProperty(cle5)) {
            myHashtable[cle5]['periodes'] = periodes;
            myHashtable[cle5]['fullacune'] = false;
         }


      }

      /!**
       * FIN DE PRISE EN COMPTE DES EVENTUELLES 959
       *!/


      if (myHashtable.hasOwnProperty(cle5)) {

         if (comments) {
            s = s + '[' + comments + ']';
         }

         if (aaData.hasOwnProperty('gap')) {
            s = s + '<font color="#D2691E">[' + aaData['gap'] + ']</font>';
         }

         if (override) {
            myHashtable[cle5]['textetatcollection'] = override;
         } else {
            myHashtable[cle5]['textetatcollection'] = s;
         }

         if (missings959r) {
            s = myHashtable[cle5]['textetatcollection'];
            s = s + '</br><font color="#D2691E">[ Lacunes signal&eacute;es : ' + missings959r + ' ]</font>';
            myHashtable[cle5]['textetatcollection'] = s;
         }

         if (loc316a) {
            myHashtable[cle5]['textE316'] = loc316a;
            myHashtable[cle5]['fullacune'] = true;
         }

      }

      const processed = {};
      processed['myHashtable'] = myHashtable;
      processed['datamin'] = datamin;
      processed['noStartDate'] = noStartDate;

      return processed;
   }*/
}
