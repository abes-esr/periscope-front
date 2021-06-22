/**
 * Représente une notice
 */
export class Notice {
   /**
    * Construit un objet Notice à partir d'un objet générique JSON
    * @param obj Objet provenant du JSON, les champs peuvent être nuls
    */
   constructor(obj: any = {}) {
      this.ppn = obj.ppn;
      this.issn = obj.issn;

      if (obj.pcpList == null) {
         this.pcpList = [];
      } else {
         obj.pcpList.forEach((element: string) => this.pcpList.push(element + ' '));
      }
      if (obj.rcrList == null) {
         this.rcrList = [];
      } else {
         this.rcrList = obj.rcrList;
      }

      this.editor = obj.editeur;
      this.title = obj.titre;
      this.continiousType = obj.typeDocument;
      this.startDate = obj.date_debut;

      if (obj.date_fin == null) {
         this.endDate = '-';
      } else {
         this.endDate = obj.date_fin;
      }

      if (obj.link) {
         this.linkSudoc = obj.link;
      }
      if (obj.nb_location) {
         this.nbLoc = obj.nb_location;
      }
   }

   ppn: number;
   issn: number;
   pcpList: Array<string> = [];
   rcrList: Array<string> = [];
   editor: string;
   title: string;
   continiousType: string;
   startDate: string;
   endDate: string;
   linkSudoc: string;
   nbLoc: number;
}
export default Notice;
