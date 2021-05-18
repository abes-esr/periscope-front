import {DisplaySwitch, Movement, PanelProvider, PanelType} from '@/store/recherche/ComposantInterfaces';
import {ValueError} from '@/store/exception/ValueError';
import {Logger} from '@/store/utils/Logger';

/**
 * Composant pour l'onglet de Recherche
 */
export class Composants {
   _stepperCurrentValue = 1;
   _snackBarDisplay = false;
   _snackBarMultiline = true;
   _snackBarText = '';
   _panel: Array<PanelProvider> = [];

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
               while (ii > 0 && !panel[ii].displayed) {
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
               while (ii < panel.length && !panel[ii].displayed) {
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
            break;
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
    * @param id
    * @param panel
    * @param value
    */
   static switchPanelDisplay(id: PanelType, panel: Array<PanelProvider>, value: DisplaySwitch): void {
      const index = panel.findIndex((x) => x.id === id);

      if (index == -1) {
         throw new ValueError('Panel ' + id + ' not found');
      }

      switch (value) {
         case DisplaySwitch.ON:
            panel[index].displayed = true;
            break;
         case DisplaySwitch.OFF:
            panel[index].displayed = false;
            break;
         default:
            throw new ValueError('Unable to decode panel display ' + value);
            break;
      }
   }

   static isFirstDisplayedElement(id: PanelType, panel: Array<PanelProvider>): boolean {
      let firstDisplayedIndex: number;
      firstDisplayedIndex = 0;
      while (firstDisplayedIndex < panel.length && !panel[firstDisplayedIndex].displayed) {
         firstDisplayedIndex++;
      }

      if (firstDisplayedIndex >= panel.length) {
         Logger.warn('No displayed panel found');
         return false;
      }

      //Logger.debug('First displayed pannel is ' + panel[firstDisplayedIndex].label);

      if (panel[firstDisplayedIndex].id === id) {
         return true;
      } else {
         return false;
      }
   }

   static isLastDisplayedElement(id: PanelType, panel: Array<PanelProvider>): boolean {
      let lastDisplayedIndex: number;
      lastDisplayedIndex = panel.length - 1;
      while (lastDisplayedIndex > 0 && !panel[lastDisplayedIndex].displayed) {
         lastDisplayedIndex--;
      }

      if (lastDisplayedIndex < 0) {
         Logger.warn('No displayed panel found');
         return false;
      }

      //Logger.debug('Last displayed pannel is ' + panel[lastDisplayedIndex].label);

      if (panel[lastDisplayedIndex].id === id) {
         return true;
      } else {
         return false;
      }
   }

   static isMoveUpAvailable(id: PanelType, panel: Array<PanelProvider>): boolean {
      // On cherche le premier
      let firstDisplayedIndex: number;
      firstDisplayedIndex = 0;
      while (firstDisplayedIndex < panel.length && !panel[firstDisplayedIndex].displayed) {
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
         while (secondDisplayedIndex < panel.length && !panel[secondDisplayedIndex].displayed) {
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
