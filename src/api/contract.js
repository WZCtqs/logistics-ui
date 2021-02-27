import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/contract/pageList',
    method: 'post',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/contract/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/truck/contract/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/contract/delectIds/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/truck/contract/',
    method: 'put',
    data: obj
  })
}

export function expObj(str) {
  return request({
    url: '/truck/contract/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function isstatus_status() {
  return request({
    url: '/admin/dict/type/isstatus_status',
    method: 'get'
  })
}

export function contract_status() {
  return request({
    url: '/admin/dict/type/contract_status',
    method: 'get'
  })
}

export function contract_type() {
  return request({
    url: '/admin/dict/type/contract_type',
    method: 'get'
  })
}

export function selectAllCustomer() {
  return request({
    url: '/truck/truCustomer/selectAllCustomer',
    method: 'post',
    data: { isTrust: '0' }
  })
}

export function selectAllTruckTeam() {
  return request({
    url: '/truck/truTruckTeam/selectByTeamType/0',
    method: 'get'
  })
}

export function selectAllDriver() {
  return request({
    url: '/truck/truTruckTeam/selectByTeamType/1',
    method: 'get'
  })
}
export function getcustomerObj(id) {
  return request({
    url: '/truck/truCustomer/' + id,
    method: 'get'
  })
}

export function gettruckteamObj(id) {
  return request({
    url: '/truck/truTruckTeam/' + id,
    method: 'get'
  })
}

export function getdriverObj(id) {
  return request({
    url: '/truck/truDriver/' + id,
    method: 'get'
  })
}
