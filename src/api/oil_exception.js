import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilException/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilException/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/oilcard/oilException/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilException/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilException',
    method: 'put',
    data: obj
  })
}

export function getexceptionTypeObj() {
  return request({
    url: '/admin/dict/type/oilexception_type',
    method: 'get'
  })
}

export function getattributeObj() {
  return request({
    url: '/admin/dict/type/truck_attribute',
    method: 'get'
  })
}

export function getstatusObj() {
  return request({
    url: '/admin/dict/type/oilexception_status',
    method: 'get'
  })
}

export function getplateNumberObj() {
  return request({
    url: '/oilcard/oilCard/selectPlateNumberlist',
    method: 'post'
  })
}

export function getoilObj() {
  return request({
    url: '/admin/dict/type/oilcard_type',
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/oilException/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
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

export function editStatusObj(obj) {
  return request({
    url: '/oilcard/oilException/editStatus/' + obj.exceptionId + '?cardNumber=' + obj.cardNumber + '&oilCardId=' + obj.oilCardId,
    method: 'post'
    // data: obj.cardNumber
  })
}

export function gettestOilCardNumber2Obj(str) {
  return request({
    url: '/oilcard/oilCard/testOilCardNumber2/' + str,
    method: 'get'
  })
}

export function getOilcardNumObj(id) {
  return request({
    url: '/oilcard/oilCard/getOilCardNum/' + id,
    method: 'get'
  })
}
