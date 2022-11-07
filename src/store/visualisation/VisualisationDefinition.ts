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
   start: Date;
   end: Date;
   className: string;
   type: string;
   title: string;
}
