import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: 'oilcard/rechargeFreight/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilRecharge',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/oilcard/oilRecharge/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilRecharge/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilRecharge',
    method: 'put',
    data: obj
  })
}

export function getcarObj() {
  return request({
    url: '/admin/dict/type/truck_attribute',
    method: 'get'
  })
}
export function expObj(str) {
  return request({
    url: '/oilcard/rechargeFreight/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
export function getselectByTruckIdObj(id) {
  return request({
    url: '/oilcard/oilCard/selectByTruckId/' + id,
    method: 'get'
  })
}
export function getallOilCardNumberObj() {
  return request({
    url: '/oilcard/oilCard/allOilCardNumber',
    method: 'post'
  })
}
export function getoilCardObj(id) {
  return request({
    url: '/oilcard/oilCard/' + id,
    method: 'get'
  })
}
export function passedObj(obj) {
  return request({
    url: '/oilcard/oilRecharge/isPassed',
    method: 'post',
    data: obj
  })
}
export function rechargeRObj(obj) {
  return request({
    url: '/oilcard/oilRecharge/rechargeR',
    method: 'post',
    data: obj
  })
}

export function bindingOrderObj(obj) {
  return request({
    url: '/oilcard/oilRecharge/bindingOrder/' + obj,
    method: 'post'
  })
}

export function getoilcardTypeObj() {
  return request({
    url: '/admin/dict/type/oilcard_type',
    method: 'get'
  })
}

export function getselectAllDriverObj() {
  return request({
    url: '/oilcard/oilCard/selectAllDriver',
    method: 'get'
  })
}
