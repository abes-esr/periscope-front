import {Mutation} from 'vuex-module-decorators';
import {Ensemble} from '@/store/classes/RequeteDeRecherche';

/**
 * {@link CriterionPcp} représente le JSON à envoyer à l'API Periscope pour rechercher
 * les notices à partir d'un ou plusieurs codes PCP.
 */

class CriterionPpn {
    private type = 'CriterionPpn'; //Valeur fixe définie par l'API
    private bloc_operator: string;
    private ppn: Array<string> = [];
    private ppn_operator: Array<string> = [];

    /**
     * Construit un objet CriterionPcp à partir d'un connecteur logique
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
     * Ajoute un code PCP
     * @param value Code PCP
     */
    @Mutation
    public addPpn(value: string,operator: Ensemble): void {
        this.ppn.push(value);
        if (operator == 0) {
            this.ppn_operator.push('ET');
        } else if (operator == 1) {
            this.ppn_operator.push('OU');
        } else if (operator == 2) {
            this.ppn_operator.push('SAUF');
        }
    }

    /**
     * Recupère les codes PCP
     */
    public get getPpn(): Array<string> {
        return this.ppn;
    }
}
export default CriterionPpn;
