import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilApply/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilApply/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/oilcard/oilApply/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilApply/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilApply/',
    method: 'put',
    data: obj
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
export function getplateNumberObj() {
  return request({
    url: '/oilcard/oilCard/selectPlateNumberlist',
    method: 'post'
  })
}
export function getplateNumberxObj() {
  return request({
    url: '/oilcard/oilCard/selectPlateNumberlistIsTrust',
    method: 'post'
  })
}
export function passedObj(obj) {
  return request({
    url: '/oilcard/oilApply/isPassed',
    method: 'post',
    data: obj
  })
}
export function bingingCardObj(obj) {
  return request({
    url: '/oilcard/oilApply/bindingCard',
    method: 'post',
    data: obj
  })
}

export function getOilMajorNumberObj() {
  return request({
    url: '/oilcard/oilMajor/OilMajorNumber',
    method: 'get'
  })
}

export function gettestOilCardNumber2Obj(str) {
  return request({
    url: '/oilcard/oilCard/testOilCardNumber2/' + str,
    method: 'get'
  })
}

export function getselectDriverPlateIdObj(plantId, ttId) {
  return request({
    url: '/oilcard/oilCard/selectDriverByPlateId/' + plantId + '?ttId=' + ttId,
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/oilApply/export/' + str,
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
export function getselectByDriverIdObj(id) {
  return request({
    url: '/oilcard/oilCard/selectByDriverId/' + id,
    method: 'get'
  })
}
export function isSendObj(obj) {
  return request({
    url: '/oilcard/oilApply/isSend',
    method: 'post',
    data: obj
  })
}

export function getoilCardObj(id) {
  return request({
    url: '/oilcard/oilCardManage/getOilCardNumByMajorNum?majorNum=' + id,
    method: 'get'
  })
}
