export class FiltresFacettes {
    _filters: Array<FacetteType>;

    constructor() {
        this._filters = [{"zone":"document_type", "valeurs":[]},{"zone":"support_type", "valeurs":[]},{"zone":"country", "valeurs":[]},{"zone":"language", "valeurs":[]}]
    }

    public clearList() {
        this._filters = [];
    }

    addElement(value: string) {
        if(value == "document_type"){
            this._filters[0].valeurs.push(value);
        }else if(value == "support_type"){
            this._filters[1].valeurs.push(value);
        }else if(value == "country"){
            this._filters[2].valeurs.push(value);
        }else if(value == "language"){
            this._filters[2].valeurs.push(value);
        }
    }

/*    public removeElement(zone: string, value: string) {

    }*/

    //TODO faire une méthode qui retire un élément selon sa valeur et son type
}

export interface FacetteType {
    zone: string;
    valeurs: Array<string>;
}
