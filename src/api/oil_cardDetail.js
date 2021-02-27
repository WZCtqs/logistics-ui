import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilRecharge/getOilRechargeListByPage',
    method: 'get',
    params: query
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

export function expObj(str) {
  return request({
    url: '/oilcard/oilRecharge/export/' + str,
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

export function getoilcardTypeObj() {
  return request({
    url: '/admin/dict/type/oilCard_recharge_type',
    method: 'get'
  })
}
