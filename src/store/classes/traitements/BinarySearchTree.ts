import {Intervalle} from '@/store/interfaces/VisualisationInterface';
import {Node} from '@/store/classes/traitements/Node';

export class BinarySearchTree {
   private root: Node;

   /**
    * Méthode d'insertion d'un noeud dans l'arbre binaire
    * @param interval
    */
   insertNode(interval: Intervalle): void {
      //création d'un noeur à partir de l'intervalle en paramètre
      const node = new Node(interval);
      //noeud courant dans le parcours de l'arbre, on sort lorsqu'il passe à undefined
      let currentNode: Node;

      if (this.root === undefined) {
         this.root = node;
      } else {
         currentNode = this.root;
         while (currentNode !== undefined) {
            //update
            if (interval.maximum > currentNode.maxRight) {
               currentNode.maxRight = interval.maximum;
            }

            if (interval.minimum < currentNode.data.minimum) {
               if (currentNode.left === undefined) {
                  currentNode.left = node;
                  break;
               } else {
                  currentNode = currentNode.left;
               }
            } else if (interval.minimum > currentNode.data.minimum) {
               if (currentNode.right === undefined) {
                  currentNode.right = node;
                  break;
               } else {
                  currentNode = currentNode.right;
               }
            } else {
               console.log('Ignoring this value as the BST supposed to be a tree containing UNIQUE values');
               break;
            }
         }
      }
   }

   /**
    * Méthode permettant de chercher dans un arbre si un intervalle est présent par recherche opérationnelle
    * @param root noeud sur lequel chercher
    * @param interval intervalle à chercher
    * @param result noeud (et ses enfants) résultat de la recherche
    */
   searchRange(root: Node, interval: Intervalle, result: any): any {
      if (root === undefined) {
         return;
      }
      // Si p est à droite du point le plus à droite que n'importe quel intervalle
      // dans ce nœud et tous les fils, il n'y aura pas de correspondance
      if (interval.minimum > root.maxRight) {
         return;
      }

      // Recherche dans le fils gauche
      this.searchRange(root.left, interval, result);

      // Vérifier ce nœud
      if (this.overlapsWith(root.data, interval)) {
         result.push([Math.max(interval.minimum, root.data.minimum), Math.min(interval.maximum, root.data.maximum)]);
      }

      // Si la fin de l'intervalle est à gauche du début du noeud courant,
      // alors il ne peut pas être dans n'importe quel fils à droite
      if (interval.maximum < root.data.minimum) {
         return;
      }

      // Sinon, rechercher dans le fils droit
      this.searchRange(root.right, interval, result);
   }

   /**
    * Méthode permettant la création d'un arbre binaire minimal à partir d'un tableau trié
    * @param sortedArray le tableau trié à créer sous forme d'arbre
    */
   createMinHeightBST(sortedArray: any): void {
      let middle;
      if (sortedArray.length === 0) {
         return;
      } else if (sortedArray.length === 1) {
         middle = 0;
      } else {
         middle = Math.floor(sortedArray.length / 2);
      }

      this.insertNode(sortedArray[middle]);

      const leftArr = sortedArray.slice(0, middle);
      const rightArr = sortedArray.slice(middle + 1, sortedArray.length);

      this.createMinHeightBST(leftArr);
      this.createMinHeightBST(rightArr);
   }

   /**
    * Fonction déterminant si deux intervalles se chevauchent
    * @param i1 premier intervalle
    * @param i2 second intervalle
    * @Return : vrai si tout ou partie des deux intervalles ont une zone en commun, false s'ils sont disjoints
    */
   overlapsWith(i1: Intervalle, i2: Intervalle): boolean {
      return i1.minimum <= i2.maximum && i2.minimum <= i1.maximum;
   }


}
