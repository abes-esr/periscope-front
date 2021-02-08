export abstract class BlocAbstract{
  protected _externalBlocOperator: number;

  get externalBlocOperator(): number {
    return this._externalBlocOperator;
  }

  set externalBlocOperator(value: number) {
    this._externalBlocOperator = value;
  }
}
