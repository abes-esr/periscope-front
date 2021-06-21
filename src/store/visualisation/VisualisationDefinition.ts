export interface Group {
   id: number;
   title: string;
   content: string;
   treeLevel: number;
   classname: string;
}

export interface Items {
   id: number;
   group: number;
   content: string;
   rcr: string;
   start: string;
   end: string;
   classname: string;
   type: string;
}
