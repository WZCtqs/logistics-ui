import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/ordOrder/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/order/ordOrder/',
    method: 'post',
    data: obj
  })
}

export function delObj(ids) {
  return request({
    url: '/order/ordOrder/' + ids,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/order/ordOrder/',
    method: 'put',
    data: obj
  })
}

export function truck_attribute() {
  return request({
    url: '/admin/dict/type/truck_attribute',
    method: 'get'
  })
}

export function order_status() {
  return request({
    url: '/admin/dict/type/order_status',
    method: 'get'
  })
}

export function order_type() {
  return request({
    url: '/admin/dict/type/order_type',
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/order/ordOrder/exportExcel/',
    method: 'get',
    params: str,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function sendDriverObj(obj) {
  return request({
    url: '/order/ordOrder/sendDriver',
    method: 'get',
    params: obj
  })
}

export function importObj(obj) {
  return request({
    url: '/order/ordOrder/importExcel',
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'multipartfile'
    }
  })
}

export function downloadObj() {
  return request({
    url: '/order/ordOrder/downloadCnImportModel',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function getRateValidation() {
  return request({
    url: '/order/ordOrder/getRate',
    method: 'get'
  })
}

