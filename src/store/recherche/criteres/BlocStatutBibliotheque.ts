import {BlocAbstract} from "@/store/recherche/criteres/BlocAbstract";
import {BlocStatutsBiblio, ListItem, Operator, EnumStatuts} from "@/store/recherche/BlocDefinition";

export class BlocStatutBibliotheque extends BlocAbstract {
    _internalBlocOperator = Operator.Et;
    _candidates: Array<BlocStatutsBiblio> = [];
    _selected: EnumStatuts;

    constructor(externalBlocOperator: number) {
        super(externalBlocOperator);
    }
}
