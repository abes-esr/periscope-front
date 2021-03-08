import {PanelProvider} from '@/store/interfaces/PanelInterfaces';

export class Composants {
   _stepperCurrentValue = 1;

   _snackBarDisplay = false;
   _snackBarMultiline = true;
   _snackBarText = '';

   _panel: Array<PanelProvider> = [
      {text: 'PPN', displayed: false, label: 'Recherche par PPN'},
      {text: 'ISSN', displayed: false, label: 'Recherche par ISSN'},
      {text: 'RCR', displayed: false, label: 'Recherche par RCR'},
      {text: 'PCPM', displayed: false, label: 'Recherche par PCP Métiers'},
      {text: 'PCPR', displayed: false, label: 'Recherche par PCP Régions'},
      {text: 'WORDS', displayed: false, label: 'Recherche par Mots du Titre'},
      {text: 'EDITOR', displayed: false, label: 'Recherche par Editeur'},
      {text: 'LANG', displayed: false, label: 'Recherche par langue'},
      {text: 'COUNTRY', displayed: false, label: 'Recherche par pays'},
   ];

   static panelMovement(element: string, panel: Array<PanelProvider>, movement: string): void {
      const position = panel.findIndex(x => x.text === element);

      if (movement === 'UP') {
         if (position === 0) {
            return;
         } else {
            const x: PanelProvider = panel[position - 1];
            panel[position - 1] = panel[position];
            panel[position] = x;
         }
      } else if (movement === 'DOWN') {
         console.log(position);
         if (position === panel.filter(x => x.displayed).length - 1) {
            return;
         } else {
            const x: PanelProvider = panel[position + 1];
            panel[position + 1] = panel[position];
            panel[position] = x;
         }
      }
   }

   static panelSwitchBooleanAtTrue(element: string, panel: Array<PanelProvider>){
      const position = panel.findIndex(x => x.text === element);
      panel[position].displayed = true;
   }

   static panelSwitchBooleanAtFalse(element: string, panel: Array<PanelProvider>){
      const position = panel.findIndex(x => x.text === element);
      panel[position].displayed = false;
   }

   static isFirstElement(element: string, panel: Array<PanelProvider>): boolean{
      const position = panel.findIndex(x => x.text === element);
      return position === 0;
   }
}
