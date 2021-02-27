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
export function sendDriverObj(obj) {
  return request({
    url: '/order/ordOrder/addAndSend',
    method: 'post',
    data: obj
  })
}
