import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionRcr} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes RCR.
 */

class CriterionLangue {
    private type = 'CriterionLangue'; //Valeur fixe définie par l'API
    private bloc_operator: string;
    private langue: Array<string> = [];
    private langue_operator: Array<string> = [];

    /**
     * Construit un objet CriterionLangue à partir d'un connecteur logique
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
     * Ajoute un code Langue
     * @param value Code Langue
     * @param operator Connecteur logique
     */
    @Mutation
    public addLangue(value: string,operator: Ensemble): void {
        this.langue.push(value);
        if (operator) {
            if (operator == 0) {
                this.langue_operator.push('ET');
            } else if (operator == 1) {
                this.langue_operator.push('OU');
            } else if (operator == 2) {
                this.langue_operator.push('SAUF');
            }
        }
        else {
            this.langue_operator.push("OU")
        }
    }

    /**
     * Recupère les codes RCR
     */
    public get getLangue(): Array<string> {
        return this.langue;
    }

    /**
     * Recupère les connecteurs logiques entre les codes RCR
     */
    public get getLangueOperator(): Array<string> {
        return this.langue_operator;
    }
}
export default CriterionLangue;
