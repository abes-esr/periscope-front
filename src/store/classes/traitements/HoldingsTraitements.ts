import {Slice} from '@/store/classes/traitements/Slice';
import {Stack} from '@/store/classes/traitements/Stack';
import {BinarySearchTree} from '@/store/classes/traitements/BinarySearchTree';
import {Collection} from '@/store/classes/traitements/Collection';
import {Intervalle} from '@/store/classes/traitements/Intervalle';
import {EtatCollection} from '@/store/classes/traitements/EtatCollection';

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
      let myHashTable: any[] = [];
      let dataMin = Number.POSITIVE_INFINITY;
      let noStartDate = {};
      const g_element_count = 0;

      for (const oneRcrEpnElement in arrayOfRcrEpn) {
         const processed = HoldingsTraitements.buildCollectionStateForOneRcrEpn(jsonDataHoldings[oneRcrEpnElement], oneRcrEpnElement, myHashTable, dataMin, noStartDate, g_element_count);
         myHashTable = processed.myHashTable;
         dataMin = processed.dataMin;
         noStartDate = processed.noStartDate;
      }
   }

   /**
    * Fonction qui construit l'ensemble de l'état pour un exemplaire
    * @param subJsonOfOneRcrEpn part of Json under Rcr:Epn string, who contains intervals (part of collection held), missings (gaps (=lacunes) reported, and all data for one "Exemplaire"
    * @param jsonKey the Rcr:Epn in string (= 1 exemplaire)
    * @param indexOfIdInFinalObjects numero de l'id des éléments envoyés à la librairie de visualisation de timeline
    */
   static buildCollectionStateForOneRcrEpn(subJsonOfOneRcrEpn: any, jsonKey: string, myHashTable: any, datamin: number, noStartDate: any, g_element_count: number) {
      let lacuneIntraYear = false; //Lacunes sur une année donnée
      let auMoinsUneLacIntra = false;

      let periodes: Slice[] = []; //Tableau des periodes pour un exemplaire
      let finalTextInInfobulle = '';

      //Booleen a adapter en typescript
      const fullacuneOfOneRcrEpn = 'gap' in subJsonOfOneRcrEpn; //Zone de saisie libre au format texte de signalement de lacunes en %

      const arrayOfstartYearsInIntervalOfOneRcrEpnRaw = Object.keys(subJsonOfOneRcrEpn['intervals']); //Récupération de toutes les dates de début de la rubrique interval d'un Rcr:epn du json
      const arrayOfstartYearsInIntervalOfOneRcrEpnSorted = arrayOfstartYearsInIntervalOfOneRcrEpnRaw.sort(); //Tri des dates de début par ordre croissant

      const intras: number[] = [];

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
         if (startYearSingleElement in myHashTable) {
            //période deja existant dans la table, on lui rajoute la nouvelle période
            periodes = myHashTable[startYearSingleElement].getPeriodes();
         } else {
            //période non présente dans la table, on crée un nouveau tableau pour représenter cette période
            periodes = [];
         }
         //Parcours des dates de fin, qui sont sous arbre d'une date de début (une date de début peut avoir une date de fin, pas de date de fin, plusieurs dates de fin)
         finalTextInInfobulle = finalTextInInfobulle + HoldingsTraitements.passageOnTheEndDates(debut, partOfJsonWithAllEndYearElementsForOneStartYear);

         const arrayEndYearsUnderOneStartYear = Object.keys(partOfJsonWithAllEndYearElementsForOneStartYear); //Tableau des dates de fin, recupère toutes les dates de fin situées sous une date de debut
         let endDate = '2147483647'; //Par défaut, on dit qu'il n'y a pas de date de fin

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
            if (endDate === '2147483647') {
               newSlice = new Slice(debut, 2147483647, lacuneIntraYear);
            } else {
               newSlice = new Slice(debut, Number.parseInt(endDate), lacuneIntraYear);
            }

            periodes.push(newSlice);
            if (newSlice.lac === true) {
               intras[newSlice.debut] = 1;
            }
         }
         if (debut === Number.NEGATIVE_INFINITY) {
            //stocker la cle5 pour examen en fin de boucle
            noStartDate.push(jsonKey);
         }
         //updates known limits
         if (debut < datamin) {
            datamin = debut;
         }

         if (jsonKey in myHashTable) {
            myHashTable[jsonKey].setPeriodes(periodes);
            myHashTable[jsonKey].setFulLacunes(fullacuneOfOneRcrEpn);
         } else {
            myHashTable[jsonKey] = new EtatCollection(periodes, '', fullacuneOfOneRcrEpn, subJsonOfOneRcrEpn['pcp'], subJsonOfOneRcrEpn['papc']);
            g_element_count++;
         }
      });

      HoldingsTraitements.calculLacunes(jsonKey, periodes, auMoinsUneLacIntra, subJsonOfOneRcrEpn, myHashTable, fullacuneOfOneRcrEpn, intras);

      finalTextInInfobulle = finalTextInInfobulle + HoldingsTraitements.constructInfoBulleLacunes(jsonKey, myHashTable, subJsonOfOneRcrEpn);

      return new Collection(myHashTable, datamin, noStartDate);
   }

   static calculLacunes(jsonKey: string, periodes: Slice[], auMoinsUneLacIntra: boolean, subJsonOfOneRcrEpn: any, myHashTable: any, fullacuneOfOneRcrEpn: any, intras: any): void {
      let start: string;
      const g_currentTime = new Date();
      const g_currentYear = g_currentTime.getFullYear();
      let stack = new Stack();
      periodes.reduce(this.mergeReduce, stack);

      if (auMoinsUneLacIntra || 'missings' in subJsonOfOneRcrEpn) {
         fullacuneOfOneRcrEpn = false;
      }

      if (fullacuneOfOneRcrEpn === false) {
         //if not fulllacune and exists 959, use stack to list maximum intervals, in ordered array and build balanced BST with createMinHeightBST().
         // Then we can repopulate "periodes" array with (maximized 959 + intra year gap)=orange and searchRange of BST between 2 consecutive 959=blue

         const noverlap = stack.toArray();

         const flatten: any[] = [];

         noverlap.forEach(function (slice) {
            flatten.push([slice.debut, slice.fin]);
         });

         const BST = new BinarySearchTree();
         BST.createMinHeightBST(flatten);

         //obtenir la liste des lacunes
         let keysmissingsdebut: string[] = [];
         if ('missings' in subJsonOfOneRcrEpn) {
            keysmissingsdebut = Object.keys(subJsonOfOneRcrEpn['missings']);
         }

         //inserer les cles des lacunes intra year avant le tri
         const intrasKeys = Object.keys(intras);
         for (const i in intrasKeys) {
            keysmissingsdebut.push(intrasKeys[i]);
         }

         const sortedmissings = keysmissingsdebut.sort();

         const manquantes: Slice[] = [];
         sortedmissings.forEach(function (missing) {
            start = missing;
            let ending = undefined;

            if (subJsonOfOneRcrEpn['missings']) {
               ending = subJsonOfOneRcrEpn['missings'][start];
            }

            if (ending === undefined) {
               //console.log('pas de fin pour intra year '+start);
               //on simule l intra year manquante
               manquantes.push(new Slice(parseInt(start), parseInt(start), false));
            } else {
               const keyend = Object.keys(ending);
               manquantes.push(new Slice(parseInt(start), parseInt(keyend[0]), false));
            }
         });
         //faire un merge des diferentes 959
         stack = new Stack();
         manquantes.reduce(this.mergeReduce, stack);

         const maxGapNOverlap = stack.toArray();

         //parcours des lacunes (orange) avec reconstruction des slice intercalaires (bleu) trouvées par searchRange
         let low = Number.NEGATIVE_INFINITY;
         let high = Number.POSITIVE_INFINITY;

         periodes = [];
         let blue: Slice[];
         maxGapNOverlap.forEach(function (slice) {
            high = slice.debut;
            blue = [];

            BST.searchRange(BST.root, new Intervalle(low + 1, high - 1), blue);

            if (blue.length > 0) {
               for (const j in blue) {
                  periodes.push(new Slice(blue[j].debut, blue[j].fin, false));
               }
            }
            low = slice.fin;
            periodes.push(new Slice(high, low, true));
         });

         //last
         blue = [];
         if (low + 1 <= g_currentYear) {
            BST.searchRange(BST.root, new Intervalle(low + 1, Number.POSITIVE_INFINITY), blue);

            if (blue.length > 0) {
               for (const j in blue) {
                  periodes.push(new Slice(blue[j].debut, blue[j].fin, false));
               }
            }
         }
         /**
          * mise à jour du tableau de résultat avec les nouvelles données calculées
          */
         if (jsonKey in myHashTable) {
            myHashTable[jsonKey].setPeriodes(periodes);
            myHashTable[jsonKey].setFulLacunes(false);
         }
      }
   }

   /**
    * Méthode de construction de la chaine représentant les lacunes dans l'infobulle
    * @param jsonKey clé rcr/epn
    * @param myHashTable tableau de résultat des informations à récupérer
    * @param subJsonOfOneRcrEpn données sources sur lesquelles récupérer les informations à mettre dans l'infobulle
    */
   static constructInfoBulleLacunes(jsonKey: string, myHashTable: any, subJsonOfOneRcrEpn: any): string {
      const overrideOfOneRcrEpn = subJsonOfOneRcrEpn['override']; //TODO tmx, a quoi correspond override
      const missings959rOfOneRcrEpn = subJsonOfOneRcrEpn['missings959r']; //Aggregation des sous zones de la 959 UNMA au format texte de signalement de lacunes
      const loc316aOfOneRcrEpn = subJsonOfOneRcrEpn['loc316a']; //Zone de lacunes, au format texte, récupérée directement depuis le webservices Holdings (note sur l'exemplaire, à titre exceptionnel)
      const commentsOfOneRcrEpn = subJsonOfOneRcrEpn['comments']; //Zone de saisie libre, commentaire sur la collection
      let finalTextInInfobulle = '';

      if (jsonKey in myHashTable) {
         if (commentsOfOneRcrEpn) {
            finalTextInInfobulle = finalTextInInfobulle + '[' + commentsOfOneRcrEpn + ']';
         }

         if ('gap' in subJsonOfOneRcrEpn) {
            finalTextInInfobulle = finalTextInInfobulle + '<font color="#D2691E">[' + subJsonOfOneRcrEpn['gap'] + ']</font>';
         }

         if (overrideOfOneRcrEpn) {
            myHashTable[jsonKey].setTextEtatCollection(overrideOfOneRcrEpn);
         } else {
            myHashTable[jsonKey].setTextEtatCollection(finalTextInInfobulle);
         }

         if (missings959rOfOneRcrEpn) {
            finalTextInInfobulle = myHashTable[jsonKey].getEtatCollection();
            finalTextInInfobulle = finalTextInInfobulle + '</br><font color="#D2691E">[ Lacunes signal&eacute;es : ' + missings959rOfOneRcrEpn + ' ]</font>';
            myHashTable[jsonKey].setTextEtatCollection(finalTextInInfobulle);
         }

         if (loc316aOfOneRcrEpn) {
            myHashTable[jsonKey].setTextE316(loc316aOfOneRcrEpn);
            myHashTable[jsonKey].setFulLacunes(true);
         }
      }
      return finalTextInInfobulle;
   }

   /**
    *
    * @param stack a Stack
    * @param slice an object whose first member [0] is debut time and second [1] end time
    * @returns
    */
   static mergeReduce(stack: Stack, slice: Slice): Stack {
      if (stack.isEmpty() || stack.peek().fin + 1 < slice.debut) stack.push(slice);
      else {
         const prev = stack.pop();
         if (prev !== null) {
            stack.push(new Slice(prev.debut, Math.max(prev.fin, slice.fin), slice.lac));
         }
      }
      return stack;
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
            //Tri des élements d'un tableau de dates de fin par le startNo qui compose chacun des éléments Date de fin
            sortedTimeSlice = timeSlice.sort(function (o: {[x: string]: string}) {
               if (o['startNo'] !== undefined) {
                  return parseInt(o['startNo']);
               } else return 0;
            });
            for (const value of sortedTimeSlice) {
               collectionStatusOfItem = collectionStatusOfItem + HoldingsTraitements.timeSliceFormatHelper(startYearElement, end, value, true);
            }
         } else {
            //Sinon si la structure sous la date de fin est directement un objet
            collectionStatusOfItem = collectionStatusOfItem + HoldingsTraitements.timeSliceFormatHelper(startYearElement, end, timeSlice, true);
         }
      }
      return collectionStatusOfItem;
   }

   /**
    * Fonction qui constuit la chaine de l'état de collection utilisée dans une info-bulle (sans les lacunes)
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
         if (end === 2147483647) {
            // a surveiller cela doit faire 2147483647, holdings produit cette valeur dans le json retourné quand une date de debut n'a pas de date de fin
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
}
