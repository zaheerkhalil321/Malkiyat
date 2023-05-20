import { AxiosResponse } from "axios";
import { MainResponse, userTransactions } from "./model";

interface CacheI {
  [key: string]: MainResponse<userTransactions>;
}

class cacheClass {
  private cache: CacheI = {};

  async checkCacheData(refNo: string, callBack: () => any) {
    if (this.cache![refNo] != null) {
      return this.cache![refNo];
    } else {
      const res = await callBack();
      if (res.status == 200) {
        this.cache![refNo] = res;
      }

      return res;
    }
  }
}
const cacheInstance = new cacheClass();
export default cacheInstance;
