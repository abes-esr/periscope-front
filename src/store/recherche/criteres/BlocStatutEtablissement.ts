import {BlocAbstract} from "@/store/recherche/criteres/BlocAbstract";
import {Operator} from "@/store/recherche/BlocDefinition";

export class BlocStatutEtablissement extends BlocAbstract {
    _internalBlocOperator = Operator.Et;
    _selected: Array<string> = [];

    constructor(externalBlocOperator: number) {
        super(externalBlocOperator);
    }
}
