import {JsonReaderForTests} from '@/store/classes/appelsBackEnd/JsonReaderForTests';

class MockDataService {
   holdingsDataServiceReturnForPpn039226859() {
      return JsonReaderForTests.getHoldingJsonReturnedForPpn039226859();
   }
}

export default new MockDataService();
