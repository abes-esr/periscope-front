import Notice from '@/store/classes/resultatsDeRecherche/Notice';
import {JsonTraitements} from '@/store/classes/traitements/JsonTraitements';
import {EndInterval, Interval} from '@/store/interfaces/VisualisationInterface';
//https://visjs.github.io/vis-timeline/examples/timeline/groups/nestedThreeLevels.html

interface Nom {
   exemplaires: any;
   datamin: any;
   datamax: any;
}

/**
 * Classe permettant d'alimenter l'état de collection d'une notice
 */
export class HoldingsTraitements {
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
            if(jsonData[key].length !== undefined){
               for (const keysStartYearIntervals in jsonData[key]) {
                  for (const keysEndYearInterval in jsonData[key][keysStartYearIntervals]) {
                     if(jsonData[key][keysStartYearIntervals][keysEndYearInterval].length !== undefined){
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
      let number= 0;
      for (const keysStartYearInterval in jsonDataIntervals) {
         interval.startYear = keysStartYearInterval;
         for (const keysEndYearInterval in jsonDataIntervals[keysStartYearInterval]) {
            interval.endYear = keysEndYearInterval;
            if(JSON.stringify(jsonDataIntervals[keysStartYearInterval][keysEndYearInterval]).length > 2){//Si la taille du JSON est supérieur à 2, alors il y a des informations complémentaires à la date de fin (objet non vide
               //TODO
               for (const object in jsonDataIntervals[keysStartYearInterval][keysEndYearInterval]){

               }


            } else {
               intervalArray.push(interval);
            }
         }
         console.log('passage' + number);
         number +=1;
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
