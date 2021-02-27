import request from '@/router/axios'

export function orderType() {
  return request({
    url: '/admin/dict/type/order_type',
    method: 'get'
  })
}

// 获取箱型列表
export function containerType() {
  return request({
    url: '/order/container/list',
    method: 'get'
  })
}
// 司机信息
export function fetchdriverSelect() {
  return request({
    url: '/order/ordOrder/driverList',
    method: 'get'
  })
}
// 顾客信息
export function fetchCustomerSelect() {
  return request({
    url: '/order/ordOrder/customerList',
    method: 'get'
  })
}
export function addObj(obj) {
  return request({
    url: '/order/ordOrder/',
    method: 'post',
    data: obj
  })
}
export function driverSelect(id) {
  return request({
    url: '/order/ordOrder/driver/' + id,
    method: 'get'
  })
}
export function customerSelect(id) {
  return request({
    url: '/order/ordOrder/customer/' + id,
    method: 'get'
  })
}
export function sealStatus() {
  return request({
    url: '/admin/dict/type/seal_status',
    method: 'get'
  })
}
export function selectByOrderId(id) {
  return request({
    url: '/order/ordOrder/selectByOrderId/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: '/order/ordOrder/',
    method: 'put',
    data: obj
  })
}
export function putObjT(obj) {
  return request({
    url: '/order/ordOrder/addAnno/',
    method: 'put',
    data: obj
  })
}
export function sendDriverObj(obj) {
  return request({
    url: '/order/ordOrder/addAndSend',
    method: 'post',
    data: obj
  })
}
export function sendDriverObj2(obj) {
  return request({
    url: '/order/ordOrder/ordAdditionalRecording',
    method: 'post',
    data: obj
  })
}

export function sendNewObj1(obj) {
  return request({
    url: '/order/ordOrder/ordAdditionalRecordingPH',
    method: 'post',
    data: obj
  })
}
export function sendDriverObj1(obj) {
  return request({
    url: '/order/ordOrder/sendDriver',
    method: 'get',
    params: obj
  })
}

export function getDistance(obj) {
  return request({
    url: '/order/ordOrder/getDistances',
    method: 'get',
    params: obj
  })
}

export function cityLimitArr(query) {
  return request({
    url: '/order/ordOrder/cityLimit',
    method: 'get',
    params: query
  })
}

export function uploadFiles(obj) {
  return request({
    url: '/order/ordFile/localUpload',
    method: 'post',
    data: obj
  })
}

export function ordAccountingRulesObj(obj1, obj2) {
  return request({
    url:
      '/order/ordAccountingRules/getList?objType=' + obj1 + '&objName=' + obj2,
    method: 'post'
  })
}

export function ordAccountingRulesObj1(obj1, obj2) {
  return request({
    url:
      '/order/ordAccountingRules/getList?objType=' +
      obj1 +
      '&ruleObjId=' +
      obj2,
    method: 'post'
  })
}

export function getDetailListByIdObj(id) {
  return request({
    url: '/order/ordAccountingRule/getList/?ruleId=' + id,
    method: 'post'
  })
}

export function getRateValidation() {
  return request({
    url: '/order/ordOrder/getRate',
    method: 'get'
  })
}

export function getAllEnableTruck() {
  return request({
    url: '/order/ordOrder/getAllEnableTruck',
    method: 'post',
    data: null
  })
}

export function getDriverByPlateId(params) {
  return request({
    url: '/order/ordCommonGoods/getDriverByPlateId/' + params,
    method: 'post'
  })
}
