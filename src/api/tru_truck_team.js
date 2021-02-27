import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/truTruckTeam/selectAllTruckTeam',
    method: 'post',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/truTruckTeam/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/truck/truTruckTeam/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/truTruckTeam/delectIds/' + str,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/truck/truTruckTeam/',
    method: 'put',
    data: obj
  })
}

export function expObj(str) {
  return request({
    url: '/truck/truTruckTeam/export/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function switchStatus() {
  return request({
    url: '/admin/dict/type/switch_status',
    method: 'get'
  })
}

export function commonStatus() {
  return request({
    url: '/admin/dict/type/common_status',
    method: 'get'
  })
}

export function ispassed_status() {
  return request({
    url: '/admin/dict/type/ispassed_status',
    method: 'get'
  })
}

export function isstatus_status() {
  return request({
    url: '/admin/dict/type/isstatus_status',
    method: 'get'
  })
}

export function ispartner_status() {
  return request({
    url: '/admin/dict/type/ispartner_status',
    method: 'get'
  })
}

export function istrust_status() {
  return request({
    url: '/admin/dict/type/istrust_status',
    method: 'get'
  })
}

// export function addBlackList(obj) {
//   return request({
//     url: '/truck/truTruckTeam/setTrustById?ids=4&isTrust=1',
//     method: 'post'
//   })
// }

export function addBlackList(obj) {
  return request({
    url: '/truck/truTruckTeam/setTrustById',
    method: 'post',
    params: obj
  })
}

export function removeBlackList(obj) {
  return request({
    url: '/truck/truTruckTeam/setTrustById',
    method: 'post',
    params: obj
  })
}

export function selectAllTructObj() {
  return request({
    url: '/truck/truTruckTeam/selectAllTruct',
    method: 'post'
  })
}

export function selectAllTructBlackObj() {
  return request({
    url: '/truck/truTruckTeam/selectAllTructBlack',
    method: 'post'
  })
}
