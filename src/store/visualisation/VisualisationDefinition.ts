export interface Panel {
   id: number;
   text: string;
   elements: Array<ListItem>;
}

export interface ListLabel {
   label: string;
   elements: Array<ListItem>;
}

export interface ListItem {
   //Liste d'éléments à selectionner
   id: string;
   text: string;
   value: boolean;
}

export interface ListRcr {
   rcrNumber: number;
   rcrDepartment: number;
   rcrRegion: string;
   rcrPcpAttachedOrNot: boolean;
   rcrPcpAttachedLabel: string;
}
