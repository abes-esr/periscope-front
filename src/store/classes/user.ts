import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
interface Provider {
   id: number;
   key: string;
   text: string;
   value: boolean;
}


@Module({namespaced: true})
class User extends VuexModule {
   private globalRegions: Array<Provider>;

   public name = 'alice';
   public ppn = 20;
   @Mutation
   public setName(newName: string): void {
      this.name = newName;
   }
   @Mutation
   public setPpn(newValue: number): void {
      this.ppn = newValue;
   }
   @Action
   public updateName(newName: string): void {
      this.context.commit('setName', newName);
   }
   @Action
   public updatePpn(newValue: number): void {
      this.context.commit('setPpn', newValue);
   }

   get nameUpperCase(): string {
      return this.name + 'gezetter';
   }

   get ppnValue(): number {
      return this.ppn;
   }

   @Mutation
   public setRegions(newName: Array<Provider>): void {
      this.globalRegions = newName;
      console.log(this.globalRegions);
   }
   @Action
   public updateRegions(newName: Array<Provider>): void {
      this.context.commit('setRegions', newName)
   }

   get globalRegionsValue(): Array<Provider> {
      return this.globalRegions;
   }
}
export default User;
