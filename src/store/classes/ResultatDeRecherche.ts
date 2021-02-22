import {Action, Module, VuexModule} from 'vuex-module-decorators';
import Notice from '@/store/classes/Notice';

@Module
export default class ResultatDeRecherche extends VuexModule {
   private noticesStored: Array<Notice>;

   @Action({rawError: true})
   get noticesStoredResult(): Array<Notice> {
      return this.context.rootState.RequeteDeRecherche.notices;
   }

   @Action
   public displayNotices(): void {
      console.log(JSON.parse(JSON.stringify(this.context.rootState)));
   }
}

