import {Component, Vue} from 'vue-property-decorator';

//Interface provides types of elements in arrays
interface Provider {
   id: number;
   value: string;
}

// Object that can be called anywhere in the application
@Component
class GlobalPropertiesMixin extends Vue {
   private alignments: Array<Provider> = [
      //vertical alignment
      {id: 0, value: 'start'},
      {id: 1, value: 'center'},
      {id: 2, value: 'end'},
   ];

   private justify: Array<Provider> = [
      //horizontal alignment
      {id: 0, value: 'start'},
      {id: 1, value: 'center'},
      {id: 2, value: 'end'},
      {id: 3, value: 'space-around'},
      {id: 4, value: 'space-between'},
   ];

   private heightsCss: Array<Provider> = [
      //Specific heights for application
      {id: 0, value: 'height: 150px'},
   ];

   public getVerticalAlignValue(numberId: number): string {
      return this.alignments[numberId].value;
   }

   public getHorizontalJustifyValue(numberId: number): string {
      return this.justify[numberId].value;
   }

   public getHeightsCssValue(numberId: number): string {
      return this.heightsCss[numberId].value;
   }
}
export default GlobalPropertiesMixin;
