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
      obj.pcpList.forEach((element: string) => this.pcpList.push(element + ' '));
      if (obj.rcrList == null) {
         this.rcrList = [];
      } else {
         this.rcrList = obj.rcrList;
      }
      this.editor = obj.editeur;
      this.keyTitle = obj.titre_cle;
      this.keyShortedTitle = obj.titre_court;
      this.properTitle = obj.titre_propre;
      this.titleFromDifferentAuthor = obj.titre_different_auteur;
      this.parallelTitle = obj.titre_parallel;
      this.titleComplement = obj.complement_titre;
      this.sectionTitle = obj.section_titre;
      this.keyTitleQualifer = obj.qualitificatif;
      this.continiousType = obj.type;
      this.startDate = obj.date_debut;
      this.endDate = obj.date_fin;
   }

   ppn: number;
   issn: number;
   pcpList: Array<string> = [];
   rcrList: Array<string> = [];
   editor: string;
   keyTitle: string;
   keyShortedTitle: string;
   properTitle: string;
   titleFromDifferentAuthor: string;
   parallelTitle: string;
   titleComplement: string;
   sectionTitle: string;
   keyTitleQualifer: string;
   continiousType: string;
   startDate: string;
   endDate: string;
}
export default Notice;
