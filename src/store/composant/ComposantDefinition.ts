/**
 * Définitions des structures de données utilisées dans les composants
 */
export interface PanelProvider {
   id: PanelType;
   position: number;
   isDisplayed: boolean;
   isAvailable: boolean;
   label: string;
}

export enum PanelType {
   PPN,
   ISSN,
   RCR,
   REGIONS,
   METIERS,
   WORDS,
   EDITOR,
   LANG,
   COUNTRY,
   PCPRCR,
   HISTORY,
}

export enum Movement {
   UP,
   DOWN,
}

export interface PanelMovementProvider {
   panelId: PanelType;
   value: Movement;
}

export enum DisplaySwitch {
   ON,
   OFF,
}

export interface PanelDisplaySwitchProvider {
   panelId: PanelType;
   value: DisplaySwitch;
}
export enum AvailableSwitch {
   ON,
   OFF,
}

export interface PanelAvailableSwitchProvider {
   panelId: PanelType;
   value: AvailableSwitch;
}
