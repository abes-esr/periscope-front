import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionTitleWords} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir des mots du titre.
 */

class CriterionTitleWords {
    private type = 'CriterionTitleWords'; //Valeur fixe définie par l'API
    private bloc_operator: string;
    private title_words: Array<string> = [];
    private title_words_operator: Array<string> = [];

    /**
     * Construit un objet CriterionTitleWords à partir d'un connecteur logique
     * @param operator Ensemble : connecteur logique du bloc
     */
    constructor(operator?: Ensemble) {
        //console.log(Ensemble.Union);
        if (operator) {
            if (operator == 0) {
                this.bloc_operator = 'ET';
            } else if (operator == 1) {
                this.bloc_operator = 'OU';
            } else if (operator == 2) {
                this.bloc_operator = 'SAUF';
            }
        } else {
            this.bloc_operator = 'ET'; //(1er bloc) Par défaut
        }
    }

    /**
     * Recupère le type de critère
     */
    public get getType(): string {
        return this.type;
    }

    /**
     * Recupère le connecteur logique du bloc
     */
    public get getBlocOperator(): string {
        return this.bloc_operator;
    }

    /**
     * Ajoute un mot du titre
     * @param value mot du titre
     */
    @Mutation
    public addTitleWord(value: string,operator: Ensemble): void {
        this.title_words.push(value);
        if (operator == 0) {
            this.title_words_operator.push('ET');
        } else if (operator == 1) {
            this.title_words_operator.push('OU');
        } else if (operator == 2) {
            this.title_words_operator.push('SAUF');
        }
    }

    /**
     * Recupère les mots du titre à rechercher
     */
    public get getTitleWords(): Array<string> {
        return this.title_words;
    }

    /**
     * Recupère les connecteurs logiques entre les mots du titre
     */
    public get getTitleWordsOperator(): Array<string> {
        return this.title_words_operator;
    }
}
export default CriterionTitleWords;
