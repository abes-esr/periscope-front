import {Slice} from '@/store/classes/traitements/holdings/Slice';

export class Stack {
   private count = 0;
   private storage: Array<Slice> = [];

   push(value: Slice): void {
      this.storage[this.count] = value;
      this.count++;
   }

   pop(): Slice | null {
      // Check to see if the stack is empty
      if (this.count === 0) {
         return null;
      }
      this.count--;
      const result = this.storage[this.count];
      delete this.storage[this.count];
      return result;
   }

   size(): number {
      return this.count;
   }

   isEmpty(): boolean {
      return this.count === 0;
   }

   peek(): Slice {
      return this.storage[this.count - 1];
   }

   toArray(): Array<Slice> {
      const result = [];

      for (let j = 1; j <= this.count; j++) {
         result.push(this.storage[j - 1]);
      }

      return result;
   }

   /**
    *
    * @param stack a Stack
    * @param slice an object whose first member [0] is debut time and second [1] end time
    * @returns
    */
   mergeReduce(slice: Slice) {
      // +1 year for joining consecutive years
      if (this.isEmpty() || this.peek().fin + 1 < slice.debut) this.push(slice);
      else {
         const prev = this.pop();
         if (prev !== null) {
            this.push(new Slice(prev.debut, Math.max(prev.fin, slice.fin), slice.lac));
         }
      }
   }
}
