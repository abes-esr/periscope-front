import {JsonReaderForTests} from '@/store/classes/appelsBackEnd/JsonReaderForTests';

class MockDataService {
   holdingsDataServiceReturnForPpn039226859(): string {
      return JsonReaderForTests.getHoldingJsonReturnedForPpn039226859();
   }
}

export default new MockDataService();
