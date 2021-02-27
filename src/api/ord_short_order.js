import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/ordShortOrder/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/order/ordShortOrder/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/order/ordShortOrder/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/order/ordShortOrder/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/order/ordShortOrder',
    method: 'put',
    data: obj
  })
}

export function short_order_type() {
  return request({
    url: '/admin/dict/type/short_order_type',
    method: 'get'
  })
}

export function short_order_line() {
  return request({
    url: '/admin/dict/type/short_order_line',
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/order/ordShortOrder/exportExcel',
    method: 'get',
    params: str,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
export function importObj(obj) {
  return request({
    url: '/order/ordShortOrder/importExcel',
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'multipartfile'
    }
  })
}
export function downloadObj() {
  return request({
    url: '/order/ordShortOrder/downloadPdImportModel',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
