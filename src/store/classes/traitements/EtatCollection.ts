import {Slice} from "@/store/classes/traitements/Slice";

export class EtatCollection {
   private periodes: Slice[];
   private textEtatCollection: string;
   private fulLacunes: boolean;
   private pcp: string;
   private papc: string;
   private textE316: string;

   constructor(periodes: Slice[], textEtatCollection: string, fulLacunes: boolean, pcp: string, papc: string) {
      this.periodes = periodes;
      this.textEtatCollection = textEtatCollection;
      this.fulLacunes = fulLacunes;
      this.pcp = pcp;
      this.papc = papc;
   }

   setPeriodes(periodes:[]) {
       this.periodes = periodes;
   }

   setTextEtatCollection(etatCollection: string) {
       this.textEtatCollection = etatCollection;
   }

   setFulLacunes(fulLacunes: boolean) {
       this.fulLacunes = fulLacunes;
   }

   setPcp(pcp: string) {
       this.pcp = pcp;
   }

   setPapc(papc: string) {
       this.papc = papc;
   }

   setTextE316(e316: string) {
    this.textE316 = e316;
   }

   getPeriodes() {
       return this.periodes;
   }

   getEtatCollection() {
       return this.textEtatCollection;
   }
}
