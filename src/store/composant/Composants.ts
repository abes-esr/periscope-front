import {
   AvailableSwitch,
   DisplaySwitch,
   Movement,
   PanelProvider,
   PanelType,
} from '@/store/composant/ComposantDefinition';
import {ValueError} from '@/exception/ValueError';
import {Logger} from '@/utils/Logger';

/**
 * Représente les valeurs des composants stockées dans le store et les traitements associés aux changements de valeurs
 */
export class Composants {
   _stepperCurrentValue = 1;
   _snackBarDisplay = false;
   _snackBarSticky = false;
   _snackBarMultiline = true;
   _snackBarColor = 'info';
   _snackBarText = '';
   _panel: Array<PanelProvider> = [];

   constructor() {
      this._panel = [
         {id: 11, position: 0, isDisplayed: false, isAvailable: true, label: 'Requêtes personnalisées'},
         {id: 4, position: 1, isDisplayed: false, isAvailable: true, label: 'PCPP thématiques'},
         {id: 3, position: 2, isDisplayed: false, isAvailable: true, label: 'PCPP régionaux'},
         {id: 0, position: 3, isDisplayed: false, isAvailable: true, label: 'PPN'},
         {id: 1, position: 4, isDisplayed: false, isAvailable: true, label: 'ISSN'},
         {id: 2, position: 5, isDisplayed: false, isAvailable: true, label: 'RCR'},
         {id: 5, position: 6, isDisplayed: false, isAvailable: true, label: 'Mots du Titre'},
         {id: 6, position: 7, isDisplayed: false, isAvailable: true, label: 'Editeur'},
         {id: 7, position: 8, isDisplayed: false, isAvailable: true, label: 'Langue'},
         {id: 8, position: 9, isDisplayed: false, isAvailable: true, label: 'Pays'},
         {id: 9, position: 10, isDisplayed: false, isAvailable: true, label: 'PCP & RCR (même exemplaire)'},
         {id: 10, position: 11, isDisplayed: false, isAvailable: true, label: 'Statut de l\'établissement'},
      ];
   }

   /**
    * Calcul un changement de position d'un panneau du module de recherche.
    * On applique le mouvement du panneau dont l'identifiant est passé en paramètre dans la liste des panneaux.
    *
    * @param id Identifiant du panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @param movement Mouvement à appliquer au panneau dont l'identifiant est passé en paramètre
    */
   static panelMovement(id: PanelType, panel: Array<PanelProvider>, movement: Movement): void {
      const index = panel.findIndex((x) => x.id === id);

      if (index == -1) {
         throw new ValueError('Panel ' + id + ' not found');
      }

      switch (movement) {
         case Movement.UP:
            if (panel[index].position === 0) {
               return;
            } else {
               // On cherche le panneau visible au dessus
               let ii: number = index - 1;
               while (ii > 0 && !panel[ii].isDisplayed) {
                  ii -= 1;
               }
               if (ii == -1) {
                  // On échange avec le premier
                  const x: number = panel[0].position;
                  panel[0].position = panel[index].position;
                  panel[index].position = x;
               } else {
                  // On échange avec un autre
                  const x: number = panel[ii].position;
                  panel[ii].position = panel[index].position;
                  panel[index].position = x;
               }
            }
            break;
         case Movement.DOWN:
            if (panel[index].position === panel.length - 1) {
               return;
            } else {
               // On cherche le panneau visible au dessous
               let ii: number = index + 1;
               while (ii < panel.length && !panel[ii].isDisplayed) {
                  ii += 1;
               }
               if (ii == panel.length + 1) {
                  // On échange avec le dernierr
                  const x: number = panel[panel.length - 1].position;
                  panel[panel.length - 1].position = panel[index].position;
                  panel[index].position = x;
               } else {
                  // On échange avec un autre
                  const x: number = panel[ii].position;
                  panel[ii].position = panel[index].position;
                  panel[index].position = x;
               }
            }
            break;
         default:
            throw new ValueError('Unable to decode panel movement ' + movement);
      }
      // On tri le tableau en fonction des nouvelles positions
      panel.sort((n1, n2) => {
         if (n1.position > n2.position) {
            return 1;
         }
         if (n1.position < n2.position) {
            return -1;
         }

         return 0;
      });
      //Logger.debug('Nouvelles positions :' + JSON.stringify(panel));
   }

   /**
    * Active ou désactive l'affichage d'un panneau de recherche
    * @param id Identifiant du panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @param value Interupteur d'affichage (ON/OFF)
    */
   static switchPanelDisplay(id: PanelType, panel: Array<PanelProvider>, value: DisplaySwitch): void {
      const index = panel.findIndex((x) => x.id === id);

      if (index == -1) {
         throw new ValueError('Panel ' + id + ' not found');
      }

      switch (value) {
         case DisplaySwitch.ON:
            panel[index].isDisplayed = true;
            break;
         case DisplaySwitch.OFF:
            panel[index].isDisplayed = false;
            break;
         default:
            throw new ValueError('Unable to decode panel display ' + value);
      }
   }

   /**
    * Désactive ou active les switches dans le panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @param value Interupteur d'affichage (ON/OFF)
    * @param isPcpRcr boolean permetant de savoir si c'est le switche du pcprcr (on ne veut pas pouvoir activer le bloc du pcp rcr avec d'autre critere)
    */
   static switchPanelAvailable(panel: Array<PanelProvider>, value: AvailableSwitch, isPcpRcr: boolean): void {
      if (isPcpRcr) {
         switch (value) {
            case AvailableSwitch.ON:
               panel.forEach((panelTypeKey) => {
                  if (panelTypeKey.id !== PanelType.PCPRCR) {
                     panelTypeKey.isAvailable = false;
                  }
               });
               break;
            case AvailableSwitch.OFF:
               panel.forEach((panelTypeKey) => {
                  if (panelTypeKey.id !== PanelType.PCPRCR) {
                     panelTypeKey.isAvailable = true;
                  }
               });
               break;
            default:
               throw new ValueError('Unable to decode panel available ' + value);
         }
      } else {
         const isNoSwitchAreDisplayOn: boolean =
            panel.filter((el) => {
               return el.isDisplayed;
            }).length === 0;
         switch (value) {
            case AvailableSwitch.ON:
               panel.forEach((panelTypeKey) => {
                  if (panelTypeKey.id === PanelType.PCPRCR) {
                     panelTypeKey.isAvailable = false;
                  }
               });
               break;
            case AvailableSwitch.OFF:
               if (isNoSwitchAreDisplayOn) {
                  panel.forEach((panelTypeKey) => {
                     if (panelTypeKey.id === PanelType.PCPRCR) {
                        panelTypeKey.isAvailable = true;
                     }
                  });
               }
               break;
            default:
               throw new ValueError('Unable to decode panel available ' + value);
         }
      }
   }

   /**
    * Retourne vrai si le panneau dont l'identifiant est passé en paramètre est le premier de la liste à être affiché
    * Faux sinon
    * @param id Identifiant du panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @return Vrai si le panneau est le premier, Faux sinon
    */
   static isFirstDisplayedElement(id: PanelType, panel: Array<PanelProvider>): boolean {
      let firstDisplayedIndex: number;
      firstDisplayedIndex = 0;
      while (firstDisplayedIndex < panel.length && !panel[firstDisplayedIndex].isDisplayed) {
         firstDisplayedIndex++;
      }

      if (firstDisplayedIndex >= panel.length) {
         Logger.warn('No displayed panel found');
         return false;
      }

      //Logger.debug('First displayed pannel is ' + panel[firstDisplayedIndex].label);

      return panel[firstDisplayedIndex].id === id;
   }

   /**
    * Retourne vrai si le panneau dont l'identifiant est passé en paramètre est le dernier de la liste à être affiché
    * Faux sinon
    * @param id Identifiant du panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @return Vrai si le panneau est le dernier, Faux sinon
    */
   static isLastDisplayedElement(id: PanelType, panel: Array<PanelProvider>): boolean {
      let lastDisplayedIndex: number;
      lastDisplayedIndex = panel.length - 1;
      while (lastDisplayedIndex > 0 && !panel[lastDisplayedIndex].isDisplayed) {
         lastDisplayedIndex--;
      }

      if (lastDisplayedIndex < 0) {
         Logger.warn('No displayed panel found');
         return false;
      }

      //Logger.debug('Last displayed pannel is ' + panel[lastDisplayedIndex].label);

      return panel[lastDisplayedIndex].id === id;
   }

   /**
    * Retourne vrai si le panneau dont l'identifiant est passé en paramètre peut être remonté
    * Faux sinon
    * Exemple : Si le panneau est le premier, il ne peut pas être remonté.
    * @param id Identifiant du panneau de recherche
    * @param panel Liste des panneaux de recherche (paramètre passé par référence -> les modifications sont appliquées)
    * @return Vrai si le panneau peut être remonté, Faux sinon
    */
   static isMoveUpAvailable(id: PanelType, panel: Array<PanelProvider>): boolean {
      // On cherche le premier
      let firstDisplayedIndex: number;
      firstDisplayedIndex = 0;
      while (firstDisplayedIndex < panel.length && !panel[firstDisplayedIndex].isDisplayed) {
         firstDisplayedIndex++;
      }
      if (firstDisplayedIndex >= panel.length) {
         Logger.warn('No displayed panel found');
         return true;
      }

      if (panel[firstDisplayedIndex].id === PanelType.HISTORY) {
         // Si le premier est l'historique, on cherche le deuxième
         let secondDisplayedIndex: number;
         secondDisplayedIndex = firstDisplayedIndex + 1;
         while (secondDisplayedIndex < panel.length && !panel[secondDisplayedIndex].isDisplayed) {
            secondDisplayedIndex++;
         }

         if (secondDisplayedIndex >= panel.length) {
            Logger.warn('No displayed panel found');
            return true;
         } else if (panel[secondDisplayedIndex].id === id) {
            return false;
         }
         return true;
      } else if (panel[firstDisplayedIndex].id === id) {
         return false;
      }
      return true;
   }
}
