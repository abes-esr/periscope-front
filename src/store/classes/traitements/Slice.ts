export class Slice {
   constructor(debut: number, fin: number, lac: boolean) {
      this.debut = debut;
      this.fin = fin;
      this.lac = lac;
   }

   public debut: number;
   public fin: number;
   public lac: boolean;
}
