import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilCard/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilCard',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/oilcard/oilCard/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilCard/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilCard',
    method: 'put',
    data: obj
  })
}
export function getplateNumberObj() {
  return request({
    url: '/oilcard/oilCard/selectPlateNumberlist',
    method: 'post'
  })
}
export function getoilcardObj() {
  return request({
    url: '/admin/dict/type/oilcard_type',
    method: 'get'
  })
}
export function getcarObj() {
  return request({
    url: '/admin/dict/type/truck_attribute',
    method: 'get'
  })
}
export function getoilplaceObj() {
  return request({
    url: '/oilcard/oilCard/allOpenCardPlace',
    method: 'post'
  })
}
export function expObj(str) {
  return request({
    url: '/oilcard/oilCard/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
export function gettestOilCardNumber2Obj(id) {
  return request({
    url: '/oilcard/oilCard/testOilCardNumber2/' + id,
    method: 'get'
  })
}
export function getselectByTruckIdObj(id) {
  return request({
    url: '/oilcard/oilCard/selectByTruckId/' + id,
    method: 'get'
  })
}
export function returnCardObj(obj) {
  return request({
    url: '/oilcard/oilCard/returnCard/',
    method: 'put',
    data: obj
  })
}
export function getselectAllDriverObj() {
  return request({
    url: '/oilcard/oilCard/selectAllDriver',
    method: 'get'
  })
}

export function gettestOilCardNumberObj(str) {
  return request({
    url: '/oilcard/oilCardManage/testOilCardNumber/' + str,
    method: 'get'
  })
}

export function getmajorNumberObj() {
  return request({
    url: '/oilcard/oilCardManage/getOilInfo',
    method: 'get'
  })
}
