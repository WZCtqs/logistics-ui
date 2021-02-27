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

export function addObjYC(obj) {
  return request({
    url: '/order/ordExceptionFee',
    method: 'post',
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
    method: 'put',
    data: obj
  })
}

export function selectByOrderId(id) {
  return request({
    url: '/order/ordOrder/selectByOrderId/' + id,
    method: 'get'
  })
}

export function getGpsmsg(id) {
  return request({
    url: '/order/ordOrder/orderGPS/' + id,
    method: 'get'
  })
}

export function upStream(obj) {
  return request({
    url: '/order/upStream/reportExcepFee/',
    method: 'post',
    data: obj
  })
}

export function smsSendAgain(obj) {
  return request({
    url: '/order/ordOrder/smsSendAgain',
    method: 'get',
    params: obj
  })
}

export function getoilCardObj(id) {
  return request({
    url: '/oilcard/oilCard/' + id,
    method: 'get'
  })
}

export function getOilCardNumberObj(id) {
  return request({
    url: 'oilcard/oilCard/getTruckOilCard/' + id,
    method: 'get'
  })
}

export function addObj1(obj) {
  return request({
    url: '/oilcard/oilRecharge',
    method: 'post',
    data: obj
  })
}

export function getallOilCardNumberObj() {
  return request({
    url: '/oilcard/oilCard/allOilCardNumber',
    method: 'post'
  })
}
