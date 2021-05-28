import {Intervalle} from '@/store/interfaces/VisualisationInterface';

export class Node {
   constructor(interval: Intervalle) {
      this.data = interval;
      this.maxRight = interval.maximum;
   }
   data: Intervalle;
   left: Node;
   right: Node;
   maxRight: number;
}
