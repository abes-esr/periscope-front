import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Notice from '@/store/classes/Notice';

@Module({namespaced: true})
class ResultatDeRecherche extends VuexModule {
   private noticesStored: Array<Notice>;

   @Action({rawError: true})
   get noticesStoredResult(): Array<Notice> {
      return this.context.rootState.RequeteDeRecherche.notices;
   }

   @Action({rawError: true})
   public displayNotices(): void {
      console.log(JSON.parse(JSON.stringify(this.context.getters['noticesStoredResult'])));
      console.log(JSON.parse(JSON.stringify(this.context.rootState.RequeteDeRecherche)));
   }
}
export default ResultatDeRecherche;
