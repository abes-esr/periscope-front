import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionIssn} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs ISSN.
 */

class CriterionIssn {
    private type = 'CriterionIssn'; //Valeur fixe définie par l'API
    private bloc_operator: string;
    private issn: Array<string> = [];

    /**
     * Construit un objet CriterionIssn à partir d'un connecteur logique
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
     * Ajoute un code ISSN
     * @param value Code ISSN
     */
    @Mutation
    public addIssn(value: string): void {
        this.issn.push(value);
    }

    /**
     * Recupère les codes PCP
     */
    public get getIssn(): Array<string> {
        return this.issn;
    }
}
export default CriterionIssn;
