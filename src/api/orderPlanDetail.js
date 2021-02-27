import request from '@/router/axios'

export function orderType() {
  return request({
    url: '/admin/dict/type/order_type',
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
export function selectByOrderId(obj) {
  return request({
    url: '/order/upStream/selectByOrderId/' + obj,
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
export function sendDriverObj(obj) {
  return request({
    url: '/order/ordOrder/addAndSend',
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
export function ordAccountingRulesObj(str) {
  return request({
    url: '/order/ordAccountingRules/getList?objType=发货方&objName=' + str,
    method: 'post'
  })
}

export function getDetailListByIdObj(id) {
  return request({
    url: '/order/ordAccountingRule/getList/?ruleId=' + id,
    method: 'post'
  })
}
