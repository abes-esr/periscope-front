export class BlocCountry{
  private _type = 'CriterionCountry'; //Valeur fixe définie par l'API
  private _internalBlocOperator: number; //Operateur interne entre les pays
  private _countries: Array<string> = [];

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get internalBlocOperator(): number {
    return this._internalBlocOperator;
  }

  set internalBlocOperator(value: number) {
    this._internalBlocOperator = value;
  }

  get countries(): Array<string> {
    return this._countries;
  }

  set countries(value: Array<string>) {
    this._countries = value;
  }
}
