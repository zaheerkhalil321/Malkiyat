import { PaymentMethods } from "@src/services/model";

type cachePaymentI = "banktransfer" | "creditdebit" | "voucher";

var cacheObj = {};
var cachePaymentMethods: { [key in cachePaymentI]: PaymentMethods[] } = {
  banktransfer: [],
  creditdebit: [],
  voucher: [],
};

function Cache(obj) {
  cacheObj[obj.type] = { ...obj };
}
function getCacheData() {
  return cacheObj;
}
function removeCacheData() {
  cacheObj = {};
}

function setCachePaymentMethods(key: cachePaymentI, list: PaymentMethods[]) {
  cachePaymentMethods[key] = list;
}
function getCachePaymentMethods(key: cachePaymentI) {
  return cachePaymentMethods[key];
}
function removeCachePaymentMethods() {
  cachePaymentMethods = {
    banktransfer: [],
    creditdebit: [],
    voucher: [],
  };
}

export {
  Cache,
  getCacheData,
  removeCacheData,
  setCachePaymentMethods,
  getCachePaymentMethods,
  removeCachePaymentMethods,
};
