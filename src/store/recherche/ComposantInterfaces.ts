export interface PanelProvider {
   id: PanelType;
   position: number;
   displayed: boolean;
   available: boolean;
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
