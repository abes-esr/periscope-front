#CREATE : Création d'un store avec persistance des états
##ETAPE 1 : Créer un fichier store.ts avec la structure suivante :

```typescript
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	plugins: [createPersistedState()],
}
```

##ETAPE 2 : Créer une classe avec une donnée. Les membres n'ont pas de visibilité par defaut, sont précédés d'un underscore (non obligatoire), pas de getter ni de setter, accès direct, et que des méthodes statiques pour modifier les données directement passées en paramètre dans le store. Pas d'état interne aux classes.

```typescript
export class classeOuEstElement  {
   _ppnListString: string;

   constructor(elementAConstruction: string) {
      this._ppnListString = elementAConstruction;
   }
}
```

##ETAPE 3 : Intégrer dans le store la structure de donnée en état persistant
```typescript
	state: {
		classeOuEstElement: new ClasseOuEstElement('texte initial par exemple'),
	},
```
		

#PULL: Récupération des données du store pour les afficher dans un composant:
##ETAPE 1 : création d'un attribut, d'un constructeur dans un fichier .vue typescript, et le getter qui appelle l'état cible
```typescript
	element: string;
	constructor() {
		super();
		this.element = this.getValeurDepuisStore();
	}
```
##ETAPE 2 : création d'un getter qui recupère l'état depuis le store
```typescript
	get getValeurDuStore(): string {
		return this.$state.store.classeOuEstElement._elementEnMembreDeClasse;
	}
```
#PUSH: Mise à jour d'un élément du store à partir d'une interaction utilisateur dans un composant:

##ETAPE 1 : interaction utilisateur dans un fichier .vue, mettre en place des evenement avec la syntaxe @[nom_event]
Pour les @[noms], les noms sont dans la documentation vuetify pour chaque composant rubrique event
```
<composant @click="evenement()"></composant>
```

```typescript
evenement(): void {
	this.$store.dispatch('storeFonctionAction', this.membreAModifier);
}
```

##ETAPE 2 : écrire dans le store l'action (l'action appelle la mutation) dans le fichier store.ts
```typescript
storeFonctionAction(context, elementEnvoye: string){
	context.commit('storeFonctionMutation', elementEnvoye);
}
```
##ETAPE 3 : écrire dans le store la mutation (la mutation modifie l'état dans le store, basé sur les données de classe) dans le fichier store.ts
```typescript
storeFonctionMutation(state, elementEnvoye; string){
	state.classeOuEstElement._elementEnMembreDeClasse = elementEnvoye;
}
```