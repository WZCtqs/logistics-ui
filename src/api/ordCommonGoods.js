import request from '@/router/axios'

export function common_type() {
  return request({
    url: '/admin/dict/type/common_type',
    method: 'get'
  })
}

export function order_status() {
  return request({
    url: '/admin/dict/type/order_status',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/order/ordCommonGoods/ ',
    method: 'post',
    data: obj
  })
}

export function fetchList(query) {
  return request({
    url: '/order/ordCommonGoods/managePage',
    method: 'get',
    params: query
  })
}

export function delObj(obj) {
  return request({
    url: '/order/ordCommonGoods/deleteBatches',
    method: 'delete',
    data: obj
  })
}

export function SubmitObj(obj) {
  return request({
    url: '/order/ordOrderLogistics/isEnd?orderId=' + obj,
    method: 'put'
    // data: obj
  })
}

export function getZYTruckObj(str) {
  return request({
    url: '/order/ordCommonGoods/getZYTruck/' + str,
    method: 'post'
  })
}

export function getDriverByPlateIdObj(id) {
  return request({
    url: '/order/ordCommonGoods/getDriverByPlateId/' + id,
    method: 'post'
  })
}

export function getTruckTeamObj() {
  return request({
    url: '/order/ordCommonGoods/getTruckTeam/',
    method: 'post'
  })
}

export function getTruckListByTeamIdObj(truckTeamId) {
  return request({
    url: '/order/ordCommonGoods/getTruckListByTeamId/' + truckTeamId,
    method: 'post'
  })
}

export function getDetailByIdObj(id) {
  return request({
    url: '/order/ordCommonGoods/' + id,
    method: 'get'
  })
}
export function getAllTruckObj() {
  return request({
    url: '/order/ordCommonGoods/allTruck',
    method: 'get'
  })
}
export function getAllTruTruckOwnObj() {
  return request({
    url: '/order/ordCommonGoods/allTruTruckOwn',
    method: 'get'
  })
}
export function getAllDriver() {
  return request({
    url: '/order/ordCommonGoods/allDriver',
    method: 'get'
  })
}

export function updateObj(obj) {
  return request({
    url: '/order/ordCommonGoods',
    method: 'put',
    data: obj
  })
}

export function updateObjT(obj) {
  return request({
    url: '/order/ordCommonGoods/addAnno',
    method: 'put',
    data: obj
  })
}

export function addObjYC(obj) {
  return request({
    url: '/order/ordExceptionFee',
    method: 'post',
    data: obj
  })
}

export function smsSendAgainObj(obj) {
  return request({
    url: '/order/ordOrder/smsSendAgain',
    method: 'get',
    params: obj
  })
}

export function sendNewByIdObj(id) {
  return request({
    url: '/order/ordCommonGoods/sendDriverInManagePage/' + id,
    method: 'put'
  })
}

export function sendNewObj(obj) {
  return request({
    url: '/order/ordCommonGoods/sendDriverWhenAdding',
    method: 'post',
    data: obj
  })
}

export function importObj(obj) {
  return request({
    url: '/order/ordCommonGoods/importPHOrd',
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function exportObj(obj) {
  return request({
    url: '/order/ordCommonGoods/ExportPHOrd?ids=' + obj,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function downloadPhImportModelObj() {
  return request({
    url: '/order/ordCommonGoods/downloadPhImportModel',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

// 订单中心
export function fetchCenterList(query) {
  return request({
    url: '/order/ordCommonGoods/centerPage',
    method: 'get',
    params: query
  })
}
export function ExportPHCenterObj(obj) {
  return request({
    url: '/order/ordCommonGoods/ExportPHCenter?ids=' + obj,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function getDistancesObj(str1, str2) {
  return request({
    url: '/order/ordOrder/getDistances?origin=' + str1 + '&destination=' + str2,
    method: 'get'
  })
}

export function ordAccountingRulesObj(str) {
  return request({
    url: '/order/ordAccountingRules/getList?objType=发货方&objName=' + str,
    method: 'post'
  })
}
export function ordCYSAccountingRulesObj(str) {
  return request({
    url: '/order/ordAccountingRules/getList?objType=承运商&objName=' + str,
    method: 'post'
  })
}

export function getDetailListByIdObj(id) {
  return request({
    url: '/order/ordAccountingRule/getList/?ruleId=' + id,
    method: 'post'
  })
}

export function getCustomerObj(id) {
  return request({
    url: '/order/ordCommonGoods/getCustomer',
    method: 'post'
  })
}

export function truck_type() {
  return request({
    url: '/admin/dict/type/truck_type',
    method: 'get'
  })
}
export function getGPSObj(obj) {
  return request({
    url: '/order/ordOrder/orderGPS/' + obj,
    method: 'get'
  })
}
export function getallCustomerObj() {
  return request({
    url: '/order/ordOrder/allCustomer',
    method: 'get'
  })
}
export function getRateValidation() {
  return request({
    url: '/order/ordOrder/getRate',
    method: 'get'
  })
}
export function addAbnormal(obj) {
  return request({
    url: '/order/ordExceptionFee',
    method: 'post',
    data: obj
  })
}
